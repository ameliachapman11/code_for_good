// Budget Tracker JavaScript
// This file handles form submission and displays budget entries

// Wait for the page to fully load before running our code
document.addEventListener('DOMContentLoaded', function() {
    console.log('Budget Tracker loaded successfully!');
    
    // Get reference to the form
    const budgetForm = document.getElementById('budgetForm');
    
    // Add event listener to the form for when it's submitted
    budgetForm.addEventListener('submit', function(event) {
        // Prevent the form from refreshing the page
        event.preventDefault();
        
        // Get the values from the form inputs
        const budgetValue = document.getElementById('budget').value;
        const shoppingListValue = document.getElementById('shoppingList').value;
        
        // Check if both fields have values
        if (budgetValue && shoppingListValue) {
            // Redirect to shopping page with budget and list data
            redirectToShoppingPage(budgetValue, shoppingListValue);
        } else {
            // Show an error message if fields are empty
            alert('Please fill in both the budget and shopping list fields!');
        }
    });
    
    // Function to redirect to shopping page with budget and list data
    function redirectToShoppingPage(budget, shoppingList) {
        // Encode the shopping list to handle special characters
        const encodedList = encodeURIComponent(shoppingList);
        
        // Redirect to shopping page with parameters
        window.location.href = `shopping.html?budget=${budget}&list=${encodedList}`;
    }
    
});

// Additional helper functions for future enhancements

// Function to format currency (could be used for different currencies)
function formatCurrency(amount, currency = '£') {
    return `${currency}${parseFloat(amount).toFixed(2)}`;
}

// Function to validate budget input (ensures it's a positive number)
function validateBudget(budget) {
    const num = parseFloat(budget);
    return !isNaN(num) && num >= 0;
}

// Function to validate shopping list (ensures it's not empty)
function validateShoppingList(list) {
    return list.trim().length > 0;
}

// Example of how to add more features in the future:
// - Save entries to localStorage
// - Delete entries
// - Edit entries
// - Calculate total budget
// - Export data
