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

function compareFoods(foods, chosenFood, foodTable) {
    // Get info for each food
    const foodInfo = foods
        .map(food => findPriceAndEmissions(food, foodTable))
        .filter(info => info !== null);

    if (foodInfo.length === 0) {
        return { emissionsSavings: 0, priceDifference: 0 };
    }

    // Extract emissions and prices
    const emissions = foodInfo.map(info => Number(info.emissions));
    const prices = foodInfo.map(info => Number(info.price));

    const chosenFoodEmissions = findPriceAndEmissions(chosenFood, foodTable)?.emissions;
    const chosenFoodPrice = findPriceAndEmissions(chosenFood, foodTable)?.price;
    // Calculate savings
    let emissionsSavings = Math.max(...emissions) - chosenFoodEmissions;
    let priceDifference = Math.max(...prices) - chosenFoodPrice;
    if (emissionsSavings < 0) {
        emissionsSavings = 0
    }
    if (priceDifference < 0) {
        priceDifference = 0
    }
    return { emissionsSavings, priceDifference };
}


const recorded_total_savings = [0, 0];
function totalSavings (foods, chosenFood, foodTable, recorded_total_savings, ) {
    recorded_total_savings[0] += compareFoods(foods, chosenFood, foodTable).emissionsSavings
    recorded_total_savings[1] += compareFoods(foods, chosenFood, foodTable).priceDifference
    return recorded_total_savings
}
totalSavings(['avocados', 'cucumber', 'raspberries'], 'cucumber', foodTable, recorded_total_savings);
totalSavings(['avocados', 'cucumber', 'raspberries'], 'cucumber', foodTable, recorded_total_savings);

const savings = totalSavings(['avocados', 'cucumber', 'raspberries'], 'cucumber', foodTable, recorded_total_savings);

console.log(`You have saved: £${savings[1]} and ${savings[0]} emissions`);

// User input: initial and chosen food
const initialFood = 'avocados'; // change as needed
const chosenFood = 'cucumber'; // change as needed

function compareTwoFoods(initialFood, chosenFood, foodTable) {
    const initial = findPriceAndEmissions(initialFood, foodTable);
    const chosen = findPriceAndEmissions(chosenFood, foodTable);
    if (!initial || !chosen) {
        return null;
    }
    const emissionsSavings = Number(initial.emissions) - Number(chosen.emissions);
    const priceSavings = Number(initial.price) - Number(chosen.price);
    return { emissionsSavings, priceSavings };
}

const savings2 = compareTwoFoods(initialFood, chosenFood, foodTable);
if (savings2) {
    console.log(`By choosing ${chosenFood} instead of ${initialFood}, you save £${savings2.priceSavings} and ${savings2.emissionsSavings} emissions.`);
} else {
    console.log('One or both foods not found in the data.');
}

document.getElementById('price-savings').innerHTML = recorded_total_savings[1];
document.getElementById('emissions-savings').innerHTML = recorded_total_savings[0];
