const buttonCatalog = document.getElementById("catalog-button")

const catalogIsHidden = document.getElementById("catalog")
const catalogList = document.getElementById("catalog-list")


const catalogTransition= () =>{
    if(catalogIsHidden.classList.contains("is-hidden")){
        catalogIsHidden.classList.remove("is-hidden")
        setTimeout(() => {
            catalogList.classList.add('show');
        }, 500);
    }else{
        catalogList.classList.remove('show');
        setTimeout(() => {
            catalogIsHidden.classList.add("is-hidden")
        }, 500);
    }
}
buttonCatalog.addEventListener('click', catalogTransition)

const computerComponentsButton = document.getElementById("computer-components-button")

const computerComponentsIsHidden = document.getElementById("computer-components")
const computerComponetnsList = document.getElementById("computer-components-list")

const computerComponentsTransition= () =>{
    if(computerComponentsIsHidden.classList.contains("is-hidden")){
        computerComponentsIsHidden.classList.remove("is-hidden")
        setTimeout(() => {
            computerComponetnsList.classList.add('show');
        }, 500);
    }else{
        computerComponetnsList.classList.remove('show');
        setTimeout(() => {
            computerComponentsIsHidden.classList.add("is-hidden")
        }, 500);
    }
}
computerComponentsButton.addEventListener('click',computerComponentsTransition)

const peripheryButton = document.getElementById("periphery-button");
const peripheryIsHidden = document.getElementById("periphery");
const peripheryList = document.querySelector(".periphery-list"); // Use querySelector for class

const peripheryTransition = () => {
    if (peripheryIsHidden.classList.contains("is-hidden")) {
        peripheryIsHidden.classList.remove("is-hidden");
        setTimeout(() => {
            peripheryList.classList.add('show');
        }, 500); 
    } else {
        peripheryList.classList.remove('show');
        setTimeout(() => {
            peripheryIsHidden.classList.add("is-hidden");
        }, 500);
    }
};

peripheryButton.addEventListener('click', peripheryTransition);

const monitorsButton = document.getElementById("monitors-button");
const monitorsIsHidden = document.getElementById("monitors");
const monitorsList = document.querySelector(".monitors-list"); // Use querySelector for class

const monitorsTransition = () => {
    if (monitorsIsHidden.classList.contains("is-hidden")) {
        monitorsIsHidden.classList.remove("is-hidden");
        setTimeout(() => {
            monitorsList.classList.add('show');
        }, 500); 
    } else {
        monitorsList.classList.remove('show');
        setTimeout(() => {
            monitorsIsHidden.classList.add("is-hidden");
        }, 500); 
    }
};

monitorsButton.addEventListener('click', monitorsTransition);


const pcCaseButton = document.getElementById("pc-case-button");
const pcCaseDiv = document.getElementById("pc-case");
const pcCaseList = document.getElementById("pc-case-list");

const pcCaseTransition = () => {
    if (pcCaseDiv.classList.contains("is-hidden")) {
        pcCaseDiv.classList.remove("is-hidden");
        setTimeout(() => {
            pcCaseList.classList.add('show');
        }, 500); // Adjust if needed
    } else {
        pcCaseList.classList.remove('show');
        setTimeout(() => {
            pcCaseDiv.classList.add("is-hidden");
        }, 500); // Adjust if needed
    }
};

pcCaseButton.addEventListener('click', pcCaseTransition);

const computersButton = document.getElementById("computers-button");
const computersDiv = document.getElementById("computers");
const computersList = document.getElementById("computers-list");

const computersTransition = () => {
    if (computersDiv.classList.contains("is-hidden")) {
        computersDiv.classList.remove("is-hidden");
        setTimeout(() => {
            computersList.classList.add('show');
        }, 500); // Adjust the delay to match the CSS transition duration if necessary
    } else {
        computersList.classList.remove('show');
        setTimeout(() => {
            computersDiv.classList.add("is-hidden");
        }, 500); // Adjust the delay to match the CSS transition duration if necessary
    }
};

computersButton.addEventListener('click', computersTransition);

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.computer-components-list-link');
    

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            
            const targetId = this.getAttribute('href').substring(1); // Get the target ID
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Scroll to the target element
                targetElement.scrollIntoView({ behavior: 'smooth' });

                // Remove 'is-hidden' class to show the target element
                targetElement.classList.remove('is-hidden');
                
                // Optionally add a class for smooth visibility transition
                targetElement.classList.add('show');
            }
        });
    });
});
