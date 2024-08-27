const mouseInterface = document.getElementById('mouse-interface'); 
const dpiSelect = document.getElementById('mousedpi');
const connectionSelect = document.getElementById('mouseconnection');
const sensorSelect = document.getElementById('mousesensor');
const buttonsSelect = document.getElementById('mousebuttons');

const showSelection = (event) => {
    console.log(event.target.value); 
}

mouseInterface.addEventListener('change', showSelection); 
dpiSelect.addEventListener('change', showSelection);
connectionSelect.addEventListener('change', showSelection);
sensorSelect.addEventListener('change', showSelection);
buttonsSelect.addEventListener('change', showSelection);