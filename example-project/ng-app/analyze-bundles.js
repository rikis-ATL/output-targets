#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Bundle Size Analysis Script
 * Compares bundle sizes between individual and bulk import builds
 */

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

function analyzeBundle(distPath, buildType) {
  const buildPath = path.join(distPath, `ng-app-${buildType}`, 'browser');
  
  if (!fs.existsSync(buildPath)) {
    console.log(`❌ Build not found: ${buildPath}`);
    return null;
  }

  const files = fs.readdirSync(buildPath).filter(file => file.endsWith('.js'));
  let totalSize = 0;
  const bundleInfo = {
    buildType,
    files: [],
    totalSize: 0,
    mainBundle: null
  };

  files.forEach(file => {
    const filePath = path.join(buildPath, file);
    const size = getFileSize(filePath);
    totalSize += size;
    
    const fileInfo = {
      name: file,
      size: size,
      formattedSize: formatBytes(size)
    };
    
    bundleInfo.files.push(fileInfo);
    
    // Find the main bundle (usually the largest or contains "main")
    if (file.includes('main') || (!bundleInfo.mainBundle && size > 0)) {
      bundleInfo.mainBundle = fileInfo;
    }
  });

  bundleInfo.totalSize = totalSize;
  bundleInfo.formattedTotalSize = formatBytes(totalSize);

  return bundleInfo;
}

function compareBundles() {
  const distPath = path.join(__dirname, 'dist');
  
  console.log('🔍 Bundle Size Analysis\n');
  console.log('='.repeat(50));
  
  const individualBundle = analyzeBundle(distPath, 'individual');
  const bulkBundle = analyzeBundle(distPath, 'bulk');

  if (!individualBundle && !bulkBundle) {
    console.log('❌ No bundles found. Please run the build commands first:');
    console.log('   npm run build:individual');
    console.log('   npm run build:bulk');
    return;
  }

  if (individualBundle) {
    console.log('\n📦 Individual Import Bundle:');
    console.log(`   Total Size: ${individualBundle.formattedTotalSize}`);
    console.log(`   Main Bundle: ${individualBundle.mainBundle?.formattedSize || 'N/A'}`);
    console.log(`   Files: ${individualBundle.files.length}`);
  }

  if (bulkBundle) {
    console.log('\n📦 Bulk Import Bundle:');
    console.log(`   Total Size: ${bulkBundle.formattedTotalSize}`);
    console.log(`   Main Bundle: ${bulkBundle.mainBundle?.formattedSize || 'N/A'}`);
    console.log(`   Files: ${bulkBundle.files.length}`);
  }

  if (individualBundle && bulkBundle) {
    const sizeDifference = bulkBundle.totalSize - individualBundle.totalSize;
    const percentDifference = ((sizeDifference / bulkBundle.totalSize) * 100).toFixed(1);
    
    console.log('\n📊 Comparison:');
    console.log('='.repeat(30));
    
    if (sizeDifference > 0) {
      console.log(`✅ Tree shaking saved: ${formatBytes(sizeDifference)} (${percentDifference}%)`);
      console.log(`   Individual bundle is ${percentDifference}% smaller`);
    } else {
      console.log(`⚠️  No size difference detected`);
      console.log(`   This might indicate tree shaking is not working as expected`);
    }

    console.log('\n📋 Detailed Breakdown:');
    console.log('   Individual Import:');
    individualBundle.files.forEach(file => {
      console.log(`     ${file.name}: ${file.formattedSize}`);
    });
    
    console.log('   Bulk Import:');
    bulkBundle.files.forEach(file => {
      console.log(`     ${file.name}: ${file.formattedSize}`);
    });
  }

  console.log('\n💡 Tree Shaking Status:');
  if (individualBundle && bulkBundle && (bulkBundle.totalSize - individualBundle.totalSize) > 1000) {
    console.log('   ✅ Tree shaking is working! Individual imports result in smaller bundles.');
  } else if (individualBundle && bulkBundle) {
    console.log('   ⚠️  Tree shaking benefits are minimal or not detected.');
    console.log('       This could mean:');
    console.log('       - Both tests import similar components');
    console.log('       - Bundle optimization is already effective');
    console.log('       - Tree shaking configuration needs adjustment');
  } else {
    console.log('   ❓ Cannot determine tree shaking status (missing builds)');
  }

  console.log('\n' + '='.repeat(50));
}

compareBundles();