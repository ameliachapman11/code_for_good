// Load the actual Excel data that was pre-converted to JSON
let foodTable = [];

// Function to load the JSON data from the converted Excel file
async function loadFoodData() {
    try {
        const response = await fetch('./food-data.json');
        const data = await response.json();
        foodTable = data;
        console.log('✅ Loaded real Excel data:', foodTable.length, 'items');
        return data;
    } catch (error) {
        console.warn('⚠️ Could not load food-data.json, using fallback data');
        // Fallback data if JSON file doesn't load
        foodTable = [
            { CommonValues: "Apples", PRICE: 2.50, EMISSIONS: 0.4 },
            { CommonValues: "Bananas", PRICE: 1.80, EMISSIONS: 0.3 },
            { CommonValues: "Bread", PRICE: 1.20, EMISSIONS: 0.8 },
            { CommonValues: "Chicken", PRICE: 4.50, EMISSIONS: 2.1 },
            { CommonValues: "Milk", PRICE: 1.10, EMISSIONS: 0.6 }
        ];
        return foodTable;
    }
}

// Function to convert XLSX file to a JSON array (now loads from JSON file)
function convertXLSXToTable(filePath) {
    // This function is kept for compatibility but now returns the loaded data
    return foodTable;
}

// Initialize the food data when the script loads
loadFoodData();

// Function to find and output the emissions and price of a selected food item
function findPriceAndEmissions(food, foodTable) {
    for (const row of foodTable) {
        if (row['CommonValues'].toLowerCase() === food.toLowerCase()) {
            return { price: row['PRICE'], emissions: row['EMISSIONS'] };
        }
    }
    return null;
}

// NEW FUNCTIONS ADDED FOR ALTERNATIVE OPTIONS SYSTEM

// Function to find similar food items using the existing food table
function findSimilarFoodItems(originalItem, foodTable) {
    // Get the original item's data
    const originalData = findPriceAndEmissions(originalItem, foodTable);
    if (!originalData) return [];
    
    // Find items with similar characteristics (same category, similar price range)
    const similarItems = [];
    const priceRange = originalData.price * 0.5; // 50% price range
    
    for (const row of foodTable) {
        if (row['CommonValues'].toLowerCase() !== originalItem.toLowerCase()) {
            const itemPrice = row['PRICE'];
            const priceDiff = Math.abs(itemPrice - originalData.price);
            
            // If price is within range, add to similar items
            if (priceDiff <= priceRange) {
                similarItems.push({
                    name: row['CommonValues'],
                    price: row['PRICE'],
                    emissions: row['EMISSIONS']
                });
            }
        }
    }
    
    // Return up to 2 similar items
    return similarItems.slice(0, 2);
}

// Function to get all food items from the table
function getAllFoodItems(foodTable) {
    return foodTable.map(row => ({
        name: row['CommonValues'],
        price: row['PRICE'],
        emissions: row['EMISSIONS']
    }));
}

// Function to find items by category (if category info exists in the data)
function findItemsByCategory(category, foodTable) {
    // This is a simple implementation - you might need to adjust based on your data structure
    return foodTable.filter(row => {
        const name = row['CommonValues'].toLowerCase();
        // Simple category detection based on common food names
        if (category === 'fruit' && (name.includes('apple') || name.includes('banana') || name.includes('orange'))) {
            return true;
        }
        if (category === 'meat' && (name.includes('chicken') || name.includes('beef') || name.includes('pork'))) {
            return true;
        }
        if (category === 'dairy' && (name.includes('milk') || name.includes('cheese') || name.includes('yogurt'))) {
            return true;
        }
        return false;
    }).map(row => ({
        name: row['CommonValues'],
        price: row['PRICE'],
        emissions: row['EMISSIONS']
    }));
}
// All functions are now available globally for use in shopping.html

