const modal = document.querySelector('.modal-form');
const form = document.querySelector('.contactForm');
const openForm = document.querySelector('.contact_button');
const closeForm = document.querySelector('.close_modal');
const submitModal = document.querySelector('.submit_button');

const prenomForm = document.querySelector('#prenom');
const nomForm = document.querySelector('#nom');
const emailForm = document.querySelector('#email');
const messageForm = document.querySelector('#message');

openForm.addEventListener("click", () => {
    modal.showModal();
    modal.style.display = "flex";
})

closeForm.addEventListener("click", (e) => {
    if (e.keyCode == 27){
        modal.close();
        modal.style.display = "none";
    }
    modal.close();
    modal.style.display = "none";
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


// async function getPhotographer(){
//     let data = fetch('../../data/photographers.json')
//         .then(response => response.json())
//         .catch(error => console.error(error));
//         return data;
// }

// function displayPhotographerName(data){
//     for (let i=0; i< data.length; i++){
//         console.log(data);
//     }
//     return data;
// }

// async function display(){
//     const dataPhotographers = await getPhotographer();
//     let photographName = displayPhotographerName(dataPhotographers);
// }

// display();

