# Alternative Options Feature

## How It Works

The shopping list now includes an intelligent alternative options system that helps users make better choices for their budget and environmental impact.

### Features

1. **AI-Powered Alternatives**: Uses Anthropic Claude API to find similar food items in the same category
2. **Price & Emissions Display**: Shows cost and carbon footprint for each option
3. **Interactive Cards**: Users can click on any of the 3 cards (original + 2 alternatives)
4. **Progressive Processing**: Goes through each item in the shopping list one by one
5. **Visual Feedback**: Highlights current item and shows processed items

### User Flow

1. User enters shopping list on main page
2. List gets cleaned by AI and displayed
3. For each item, 3 cards appear on the left:
   - **Original item** (highlighted in green)
   - **Alternative 1** (similar item from same category)
   - **Alternative 2** (another similar item)
4. User clicks on their preferred option
5. List updates and moves to next item
6. Process repeats until all items are processed

### Technical Details

- **Food Database**: Located in `extractFoodInfo.js`
- **AI Integration**: Uses Anthropic Claude API for smart alternatives
- **Fallback System**: Simple category-based alternatives if AI fails
- **Responsive Design**: Cards adapt to different screen sizes

### Files Modified

- `shopping.html`: Added alternative cards UI and logic
- `extractFoodInfo.js`: Created food database and helper functions
- CSS: Added styling for cards and item states

### API Key

The system uses the Anthropic API key embedded in the code. In production, this should be moved to environment variables for security.

### Testing

1. Start the proxy server: `npm start`
2. Start the web server: `python3 -m http.server 8000`
3. Open: http://localhost:8000/shopping.html
4. Enter a shopping list with items like "apples, bread, chicken"
5. Watch the alternative options appear for each item
