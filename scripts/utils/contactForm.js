// Form
const modal = document.querySelector('.modal-form');
const form = document.querySelector('.contactForm');
const openForm = document.querySelector('.contact_button');
const closeForm = document.querySelector('.close_modal');
const submitModal = document.querySelector('.submit_button');
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

openForm.addEventListener("click", () => {
    modal.showModal();
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", false);
    document.body.style.overflow = 'hidden';
    for (let i=0; i<ariasHidden.length; i++){
        ariasHidden[i].setAttribute("aria-hidden", true);
    }
})

closeForm.addEventListener("click", () => {
    modal.close();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", true);
    document.body.style.overflow = 'scroll';
    for (let i=0; i<ariasHidden.length; i++){
        ariasHidden[i].setAttribute("aria-hidden", false);
    }
})

modal.addEventListener("keydown", (e) => {
    if (e.keyCode == 27){
        modal.close();
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", true);
        document.body.style.overflow = 'scroll';
        for (let i=0; i<ariasHidden.length; i++){
            ariasHidden[i].setAttribute("aria-hidden", false);
        }
    }
})

function sendData(){
    event.preventDefault();
    modal.close();
    modal.style.display = "none";
    console.log("Envoie des données : ");
    console.log("prenom : ", prenomForm.value);
    console.log("nom : ", nomForm.value);
    console.log("email : ", emailForm.value);
    console.log("message : ", messageForm.value);
    form.reset();
    
}
