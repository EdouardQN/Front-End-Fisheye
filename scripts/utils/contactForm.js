// Form
const modalForm = document.querySelector('.modal-form');
const form = document.querySelector('.contactForm');
const openForm = document.querySelector('.contact_button');
const closeForm = document.querySelector('.close_modal');
const prenomForm = document.querySelector('#prenom');
const nomForm = document.querySelector('#nom');
const emailForm = document.querySelector('#email');
const messageForm = document.querySelector('#message');
// Arias hidden
const headerMain = document.querySelector('.header-main');
const photograph = document.querySelector('.photograph-header');
const dropdown = document.querySelector('.dropdown-sort');
const galeryPhotograph = document.querySelector('.photograph-galery');
const details = document.querySelector('.photograph-details');

let ariasHidden = [headerMain, photograph, dropdown, galeryPhotograph, details];

function setAriaHiddenTrue(){
    for (let i=0; i<ariasHidden.length; i++){
        ariasHidden[i].setAttribute("aria-hidden", true);
    }
}

function setAriaHiddenFalse(){
    for (let i=0; i<ariasHidden.length; i++){
        ariasHidden[i].setAttribute("aria-hidden", false);
    }
}

openForm.addEventListener("click", () => {
    modalForm.showModal();
    modalForm.style.display = "flex";
    modalForm.setAttribute("aria-hidden", false);
    document.body.style.overflow = 'hidden';
    setAriaHiddenTrue();
})

function closeContactForm(){
    modalForm.close();
    modalForm.style.display = "none";
    modalForm.setAttribute("aria-hidden", true);
    document.body.style.overflow = 'scroll';
    setAriaHiddenFalse();
}

closeForm.addEventListener("click", closeContactForm);

document.body.addEventListener("keydown", (e) => {
    if (e.keyCode === 27 || e.key === "Escape"){
        closeContactForm();
    }
})

function sendData(){
    event.preventDefault();
    closeContactForm();
    console.log("Envoie des données : ");
    console.log("prenom : ", prenomForm.value);
    console.log("nom : ", nomForm.value);
    console.log("email : ", emailForm.value);
    console.log("message : ", messageForm.value);
    form.reset();
    
}