#!/bin/bash

# Compare Angular Tree Shaking: Old vs Individual Import Patterns
# This script builds both Angular apps and compares their bundle sizes

echo "🔄 Building Angular Apps for Bundle Comparison..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Build ng-app-old (traditional pattern)
echo -e "${YELLOW}📦 Building ng-app-old (Traditional Import Pattern)...${NC}"
cd ng-app-old
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ ng-app-old build successful${NC}"
    OLD_SIZE=$(du -sh dist/ng-app-old | cut -f1)
    OLD_MAIN_SIZE=$(ls -lh dist/ng-app-old/browser/main*.js | awk '{print $5}' | head -1)
else
    echo -e "${RED}❌ ng-app-old build failed${NC}"
    OLD_SIZE="Build failed"
    OLD_MAIN_SIZE="N/A"
fi
cd ..

echo ""

# Build ng-app-individual (tree shaking pattern)  
echo -e "${YELLOW}🌳 Building ng-app-individual (Individual Import Pattern)...${NC}"
cd ng-app-individual
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ ng-app-individual build successful${NC}"
    INDIVIDUAL_SIZE=$(du -sh dist/ng-app-individual | cut -f1)
    INDIVIDUAL_MAIN_SIZE=$(ls -lh dist/ng-app-individual/browser/main*.js | awk '{print $5}' | head -1)
else
    echo -e "${RED}❌ ng-app-individual build failed${NC}"
    INDIVIDUAL_SIZE="Build failed"
    INDIVIDUAL_MAIN_SIZE="N/A"
fi
cd ..

echo ""
echo "📊 Bundle Size Comparison Results:"
echo "================================="
echo ""
echo -e "${RED}📦 Traditional Pattern (ng-app-old):${NC}"
echo "   Total Bundle: $OLD_SIZE"
echo "   Main Bundle:  $OLD_MAIN_SIZE"
echo ""
echo -e "${GREEN}🌳 Individual Pattern (ng-app-individual):${NC}" 
echo "   Total Bundle: $INDIVIDUAL_SIZE"
echo "   Main Bundle:  $INDIVIDUAL_MAIN_SIZE"
echo ""

# Show import pattern differences
echo -e "${BLUE}📋 Import Pattern Comparison:${NC}"
echo ""
echo -e "${RED}Old Pattern (ng-app-old):${NC}"
echo "   import { MyButton, MyCheckbox, MyInput } from 'component-library-angular';"
echo "   → Imports from monolithic proxies.ts file"
echo "   → All components bundled together"
echo ""
echo -e "${GREEN}Individual Pattern (ng-app-individual):${NC}"
echo "   import { MyButton } from 'component-library-angular/src/directives/my-button';"
echo "   import { MyCheckbox } from 'component-library-angular/src/directives/my-checkbox';"
echo "   import { MyInput } from 'component-library-angular/src/directives/my-input';"
echo "   → Imports from individual component files"
echo "   → Only used components bundled"
echo ""

echo -e "${YELLOW}💡 Notes:${NC}"
echo "- Tree shaking benefits increase with larger component libraries"
echo "- Real-world apps using fewer components will see larger savings"
echo "- Individual imports enable better bundle optimization"
echo ""

echo -e "${BLUE}🚀 Run the apps:${NC}"
echo "   cd ng-app-old && npm start        # Traditional pattern"  
echo "   cd ng-app-individual && npm start # Individual pattern"
echo ""