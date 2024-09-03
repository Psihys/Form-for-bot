
const inputs = document.querySelectorAll('input');


const showInputs = (event) => {
    console.log(event.target.value); 
}


inputs.forEach(input => {
    input.addEventListener('change', showInputs);
});
// Select all select elements
const selects = document.querySelectorAll('select');

// Function to handle the change event
const showSelection = (event) => {
    console.log(event.target.value); 
}

// Attach the event listener to each select element
selects.forEach(select => {
    select.addEventListener('change', showSelection);
});
// Select all checkbox elements
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Function to handle the change event
const showCheckBox = (event) => {
    console.log(`${event.target.name}: ${event.target.checked}`); 
}

// Attach the event listener to each checkbox element
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', showCheckBox);
});
