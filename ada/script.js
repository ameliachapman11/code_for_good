// BudgetWise - Main JavaScript File
// This file handles the main form functionality and user interactions
// It processes form submission and redirects users to the shopping page

// Wait for the page to fully load before running our code
// This ensures all HTML elements are available before JavaScript tries to access them
document.addEventListener('DOMContentLoaded', function() {
    console.log('BudgetWise loaded successfully!');
    
    // Get reference to the main budget form element
    const budgetForm = document.getElementById('budgetForm');
    
    // Add event listener to handle form submission
    // This listens for when the user clicks the submit button or presses Enter
    budgetForm.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior (which would refresh the page)
        event.preventDefault();
        
        // Get the current values from the form input fields
        const budgetValue = document.getElementById('budget').value;
        const shoppingListValue = document.getElementById('shoppingList').value;
        
        // Validate that both fields have been filled out
        if (budgetValue && shoppingListValue) {
            // If both fields have values, redirect to the shopping page with the data
            redirectToShoppingPage(budgetValue, shoppingListValue);
        } else {
            // If either field is empty, show an error message to the user
            alert('Please fill in both the budget and shopping list fields!');
        }
    });
    
    // Function to redirect to the shopping page with the user's budget and shopping list data
    function redirectToShoppingPage(budget, shoppingList) {
        // Encode the shopping list to handle special characters and spaces
        // This ensures the data is properly transmitted via URL parameters
        const encodedList = encodeURIComponent(shoppingList);
        
        // Redirect to the shopping page, passing budget and list as URL parameters
        // The shopping page will extract these parameters and process the list with AI
        window.location.href = `shopping.html?budget=${budget}&list=${encodedList}`;
    }
    
});

// Additional helper functions for future enhancements
// These functions are available for potential future features but not currently used

// Function to format currency with proper decimal places
// Could be used for different currencies in the future
function formatCurrency(amount, currency = '£') {
    return `${currency}${parseFloat(amount).toFixed(2)}`;
}

// Function to validate budget input (ensures it's a positive number)
// This could be used for more advanced form validation
function validateBudget(budget) {
    const num = parseFloat(budget);
    return !isNaN(num) && num >= 0;
}

// Function to validate shopping list (ensures it's not empty)
// This could be used for more advanced form validation
function validateShoppingList(list) {
    return list.trim().length > 0;
}

// Example of how to add more features in the future:
// - Save entries to localStorage for persistence
// - Delete entries functionality
// - Edit entries functionality
// - Calculate total budget across multiple entries
// - Export data to CSV or PDF
// - Add categories to shopping items
// - Price estimation for items
// - Integration with grocery store APIs
