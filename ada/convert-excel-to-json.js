// Script to convert Excel file to JSON
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Path to the Excel file
const excelFilePath = '../food_items_with_price_and_emissions.xlsx';
const outputFilePath = './food-data.json';

try {
    console.log('🔄 Converting Excel file to JSON...');
    
    // Read the Excel file
    const workbook = XLSX.readFile(excelFilePath);
    
    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    console.log(`📊 Found ${jsonData.length} rows in the Excel file`);
    console.log('📋 Sample data:', jsonData[0]);
    
    // Write to JSON file
    fs.writeFileSync(outputFilePath, JSON.stringify(jsonData, null, 2));
    
    console.log(`✅ Successfully converted to ${outputFilePath}`);
    console.log(`📁 File size: ${fs.statSync(outputFilePath).size} bytes`);
    
} catch (error) {
    console.error('❌ Error converting Excel file:', error.message);
    process.exit(1);
}
