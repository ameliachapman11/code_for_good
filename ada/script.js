// Budget Tracker JavaScript
// This file handles form submission and displays budget entries

// Wait for the page to fully load before running our code
document.addEventListener('DOMContentLoaded', function() {
    console.log('Budget Tracker loaded successfully!');
    
    // Get references to the form and the entries list
    const budgetForm = document.getElementById('budgetForm');
    const entriesList = document.getElementById('entriesList');
    
    // Add event listener to the form for when it's submitted
    budgetForm.addEventListener('submit', function(event) {
        // Prevent the form from refreshing the page
        event.preventDefault();
        
        // Get the values from the form inputs
        const budgetValue = document.getElementById('budget').value;
        const shoppingListValue = document.getElementById('shoppingList').value;
        
        // Check if both fields have values
        if (budgetValue && shoppingListValue) {
            // Create a new budget entry
            createBudgetEntry(budgetValue, shoppingListValue);
            
            // Clear the form after successful submission
            budgetForm.reset();
            
            // Show a success message (optional)
            console.log('Budget entry added successfully!');
        } else {
            // Show an error message if fields are empty
            alert('Please fill in both the budget and shopping list fields!');
        }
    });
    
    // Function to create and display a new budget entry
    function createBudgetEntry(budget, shoppingList) {
        // Create a new div element for the entry
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
        
        // Create the budget display element
        const budgetElement = document.createElement('div');
        budgetElement.className = 'entry-budget';
        budgetElement.textContent = `Budget: £${budget}`;
        
        // Create the shopping list display element
        const listElement = document.createElement('div');
        listElement.className = 'entry-list';
        listElement.textContent = `Shopping List: ${shoppingList}`;
        
        // Add the budget and list elements to the entry div
        entryDiv.appendChild(budgetElement);
        entryDiv.appendChild(listElement);
        
        // Add the new entry to the top of the entries list
        entriesList.insertBefore(entryDiv, entriesList.firstChild);
        
        // Show the entries section if it was hidden
        showEntriesSection();
    }
    
    // Function to show the entries section and hide empty message
    function showEntriesSection() {
        // Remove any existing empty message
        const emptyMessage = document.querySelector('.empty-message');
        if (emptyMessage) {
            emptyMessage.remove();
        }
        
        // Show the entries section
        const entriesSection = document.querySelector('.entries-section');
        entriesSection.style.display = 'block';
    }
    
    // Function to show empty message when no entries exist
    function showEmptyMessage() {
        // Check if there are any entries
        const entries = document.querySelectorAll('.entry');
        
        if (entries.length === 0) {
            // Create and show empty message
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = 'No budget entries yet. Add your first entry above!';
            entriesList.appendChild(emptyMessage);
        }
    }
    
    // Show empty message when page loads
    showEmptyMessage();
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
