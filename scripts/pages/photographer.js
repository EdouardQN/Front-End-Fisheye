//code JavaScript lié à la page photographer.html

function getPhotographerId(){
    return new URL(location.href).searchParams.get("id");
}

async function getPhotographer(){
    
    let photographers = 
        await fetch('../../data/photographers.json')
        .then(response => response.json())
        .catch(error => console.error(error))
        ;
        
        //boucle les photographes pour trouver l'id
        for (let i =0; i<photographers.photographers.length; i++){
            //pas de stricte égalité car le type n'est pas le même
            if (photographerId == photographers.photographers[i].id){
                idToDisplay = photographers.photographers[i].id;
                console.log("id : ", idToDisplay);
                console.log("name : ", photographers.photographers[i].name);
                console.log("city : ", photographers.photographers[i].city);
                console.log("country : ", photographers.photographers[i].country);
                console.log("tagline : ", photographers.photographers[i].tagline);
                console.log("portrait : ", photographers.photographers[i].portrait);
            }
        }

        //ne pas mettre dans la boucle for, évidemment i va se reset à 0 à chaque bouclage ...
        let x = 0;
        // console.log(photographers.media);
        //boucle les datas img etc lorsque l'id du photographe correspond
        for (let j = 0; j<photographers.media.length; j++){

            if (photographers.media[j].photographerId == idToDisplay){
                contenuMedia[x] = photographers.media[j];
                x++;
            }
        }
        console.log(contenuMedia.length);

        return idToDisplay, contenuMedia;
    
    
}
let contenuMedia = [];
let idToDisplay = 0;

const photographerId = getPhotographerId();
console.log(photographerId);
const photographer =  getPhotographer();
console.log(photographer);

console.log("id url", photographerId);
console.log("contenu média", contenuMedia);