import { execSync } from 'child_process';

try {
  execSync('npm install xlsx', { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to install xlsx:', error);
}
import XLSX from 'xlsx';
import fs from 'fs';
// Function to convert XLSX file to a JSON array (table)
function convertXLSXToTable(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    return jsonData;
}
const filePath = './food_items_with_price_and_emissions.xlsx';
const foodTable = convertXLSXToTable(filePath);

function findPriceAndEmissions(food, foodTable) {
    for (const row of foodTable) {
        if (row['CommonValues'].toLowerCase() === food.toLowerCase()) {
            return { price: row['PRICE'], emissions: row['EMISSIONS'] };
        }
    }
    return null;
}

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
