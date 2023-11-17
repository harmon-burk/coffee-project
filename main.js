"use strict";

// Function to render a single coffee as an HTML table row
//REPLACING TABLE DATA WITH DIVS
function renderCoffee(coffee) {
    let html = '<div class="coffee">';
    html += `<div style="font-size: 20px">${coffee.name}</div>`;
    html += `<div>${coffee.roast}</div>`;
    html += '</div>';
    return html;
}

// Function to render an array of coffees as HTML table rows
function renderCoffees(coffees) {
    let html = '';
    for (let i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

// Function to update the displayed coffees based on the selected roast
function updateCoffees(e) {
    e.preventDefault();
    const selectedRoast = roastSelection.value;
    let filteredCoffees = [];

    if (selectedRoast.toLowerCase() === 'all') {
        // If 'All' is selected, include all coffees in the filtered list
        filteredCoffees = coffees;
    } else {
        // Otherwise, filter coffees based on the selected roast
        filteredCoffees = coffees.filter(coffee => coffee.roast === selectedRoast);
    }

    // Update the HTML content of tbody with the filtered coffees
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

// Array of coffee objects
const coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

// Get references to HTML elementsGETTING REAL DUMB
const tbody = document.querySelector('#coffees');
const submitButton = document.querySelector('#submit');
const roastSelection = document.querySelector('#roast-selection');

// Initial rendering of all coffees
tbody.innerHTML = renderCoffees(coffees);

// Add event listener to the submit button to update coffees on click
submitButton.addEventListener('click', updateCoffees);