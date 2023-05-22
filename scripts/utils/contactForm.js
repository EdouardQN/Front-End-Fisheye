const modal = document.querySelector('.modal');
const form = document.querySelector('.contactForm');
const openModal = document.querySelector('.contact_button');
const closeModal = document.querySelector('.close_modal');
const submitModal = document.querySelector('.submit_button');

const prenomForm = document.querySelector('#prenom');
const nomForm = document.querySelector('#nom');
const emailForm = document.querySelector('#email');
const messageForm = document.querySelector('#message');

openModal.addEventListener("click", () => {
    modal.showModal();
    modal.style.visibility = "visible";
})

closeModal.addEventListener("click", () => {
    modal.close();
    modal.style.visibility = "hidden";
})

function sendData(){
    event.preventDefault();
    modal.close();
    modal.style.visibility = "hidden";
    console.log("Envoie des données : ");
    console.log("prenom : ", prenomForm.value);
    console.log("nom : ", nomForm.value);
    console.log("email : ", emailForm.value);
    console.log("message : ", messageForm.value);
    form.reset();
    
}


async function getPhotographer(){
    let data = fetch('../../data/photographers.json')
        .then(response => response.json())
        .catch(error => console.error(error));
        return data;
}

function displayPhotographerName(data){
    for (let i=0; i< data.length; i++){
        console.log(data);
    }
    return data;
}

async function display(){
    const dataPhotographers = await getPhotographer();
    let photographName = displayPhotographerName(dataPhotographers);
}

display();

