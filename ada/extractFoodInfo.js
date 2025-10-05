import * as XLSX from 'xlsx';
import fs from 'fs';

// Function to convert XLSX file to a JSON array
function convertXLSXToTable(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    return jsonData;
}
const filePath = './food_items_with_price_and_emissions.xlsx';
const foodTable = convertXLSXToTable(filePath);

// Function to find and output the emissions and price of a selected food item
function findPriceAndEmissions(food, foodTable) {
    for (const row of foodTable) {
        if (row['CommonValues'].toLowerCase() === food.toLowerCase()) {
            return { price: row['PRICE'], emissions: row['EMISSIONS'] };
        }
    }
    return null;
}
