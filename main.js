"use strict";

/* when a click happens outside the 'Pick a Coffee!' input box this function will set user input to an empty string.*/
document.addEventListener('click', function(event) {
    const predictiveInput = document.getElementById('predictive');
    if (event.target !== predictiveInput && !predictiveInput.contains(event.target)) {
        predictiveInput.value = '';
    }
});


// Function to render a single coffee as an HTML table row
//REPLACING TABLE DATA WITH DIVS
function renderCoffee(coffee) {
    let html = '<div class="coffee">';
    html += `<span style="font-size: 20px">${coffee.name} </span>`;
    html += `<span style="color: rgba(139,69,19,0.89)">${coffee.roast}</span>`;
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



/*----------------------------------------------------------------------------------------------------------------------
this code ensures that a new coffee entry is added to the list only if both the roast and name inputs are provided.
If the inputs are valid, it updates the display with the new entry, and if not, it alerts the user to enter both values.
----------------------------------------------------------------------------------------------------------------------*/
// Function to handle form submission and append input as a new div
function addCoffeeToList(e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Get values from the form
    const newRoast = document.getElementById('new-roast').value;
    const newName = document.getElementById('to-do').value;

    // Validate if the input is not empty
    if (newRoast.trim() !== '' && newName.trim() !== '') {
        // Create a new coffee object and add it to the coffees array
        const newCoffee = {
            name: newName, roast: newRoast.toLowerCase() };
        coffees.push(newCoffee);

        // Render the updated list of coffees
        tbody.innerHTML = renderCoffees(coffees);

        // Clear the form input
        document.getElementById('new-roast').value = '';
        document.getElementById('to-do').value = '';
    } else {
        // Show an alert if either input is empty
        alert('Please enter both roast and name.');
    }
}

// Get reference to the form with id 'new'
const newCoffeeForm = document.getElementById('new');

// Add event listener to the 'add-btn' button for form submission
document.querySelector('.add-btn').addEventListener('click', addCoffeeToList);




/*----------------------------------------------------------------------------------------------------------------------
this script  below allows users to dynamically filter and display a list of coffees based on both the selected roast and
 the text entered in the predictive text input. The filtering occurs as the user types,
 and the display is updated accordingly.
----------------------------------------------------------------------------------------------------------------------*/
// Initial value of the input field
const initialValue = document.getElementById("predictive").value;

// Call updateCoffees with the initial value
updateCoffees(initialValue);

// Add an event listener to the input field for changes
document.getElementById("predictive").addEventListener("input", function () {
    // Call updateCoffees with the updated value
    updateCoffees(this.value);
});

// Add event listener to the submit button for form submission
document.getElementById('submit').addEventListener('click', function (e) {
    e.preventDefault();

    // Get the input value
    const inputText = document.getElementById('predictive').value.trim().toLowerCase();

    // Call updateCoffees with the input value
    updateCoffees(inputText);
});

function updateCoffees(inputText) {
    // Trim and convert to lowercase
    const trimmedInput = inputText.trim().toLowerCase();
    let filteredCoffees = [];

    const selectedRoast = roastSelection.value;

    if (trimmedInput === '') {
        // If the input is empty, show all coffees based on the 'roast-selection' option
        if (selectedRoast.toLowerCase() === 'all') {
            // If 'All' is selected, include all coffees in the filtered list
            filteredCoffees = coffees;
        } else {
            // Otherwise, filter coffees based on the selected roast
            filteredCoffees = coffees.filter(coffee => coffee.roast === selectedRoast);
        }
    } else {
        // If the input is not empty, filter coffees based on the input text
        filteredCoffees = coffees.filter(coffee => coffee.name.toLowerCase().includes(trimmedInput));
    }

    // Update the HTML content of tbody with the filtered coffees
    tbody.innerHTML = renderCoffees(filteredCoffees);
}