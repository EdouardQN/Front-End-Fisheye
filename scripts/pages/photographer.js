//code JavaScript lié à la page photographer.html

function getPhotographerId(){
    return new URL(location.href).searchParams.get("id");
}

async function getPhotographer(){
    
    let photographers = 
        fetch('../../data/photographers.json')
        .then(response => response.json())
        .catch(error => console.error(error))
        ;
        return photographers;
}

function getPhotographerContent(json){
    let contenuPhotographer = []; 
    //boucle les photographes pour trouver l'id
    for (let i =0; i<json.photographers.length; i++){
        //pas de stricte égalité car le type n'est pas le même
        if (json.photographers[i].id == photographerId){
            contenuPhotographer.push(photographerId);
            contenuPhotographer.push(json.photographers[i].name);
            contenuPhotographer.push(json.photographers[i].city);
            contenuPhotographer.push(json.photographers[i].country);
            contenuPhotographer.push(json.photographers[i].tagline);
            contenuPhotographer.push(json.photographers[i].price);
            contenuPhotographer.push(json.photographers[i].portrait);
        }
    }
    return contenuPhotographer;
}

function getPhotographerMedia(json){
    let x = 0;
    let contenuMedia = [];
    //boucle les datas img etc lorsque l'id du photographe correspond
    for (let j = 0; j<json.media.length; j++){

        if (json.media[j].photographerId == photographerId){
            contenuMedia[x] = json.media[j];
            x++;
        }
    }
    return contenuMedia;
}


function photographerFactory(content){

    //details du photographe
    const id = content[0];
    const name = content[1];   
    const city = content[2];  
    const country = content[3];
    const tagline = content[4];
    const price = content[5];
    const portrait = content[6];
    const picture = `../../assets/photographers/${portrait}`;

    function getPhotographerDomContent(){

        const div = document.createElement('div');
        div.classList.add('photograph-content');

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const h4 = document.createElement('h4');
        h4.textContent = city + ', ' + country;

        const span = document.createElement('span');
        span.textContent = tagline;

        div.appendChild(h2);
        div.appendChild(h4);
        div.appendChild(span);

        return (div);
    }
    function getPhotographerPicture(){

        const divImg = document.createElement('div');
        divImg.classList.add('photograph-img');

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);

        divImg.appendChild(img);

        return (divImg);
    }

    return { id, name, city, country, tagline, price, portrait, picture, getPhotographerDomContent, getPhotographerPicture }
}

function mediaFactory(media){
      
    //condition pour voir si c'est une image ou une vidéo à faire  if hasOwnProperty() image --> new Image, else new Video
    console.log(media);
    const photo = media[0].image;
    const title = media[0].title
    console.log(title);

    function getPhotographerMedia(){

    }

}



const photographerId = getPhotographerId();
const header = document.querySelector('.photograph-header');
const galery = document.querySelector('.photograph-galery');

async function init(){
    const data = await getPhotographer();
    const photographerContent = getPhotographerContent(data);
    const photographerMedia = getPhotographerMedia(data);

    const photographerModel = photographerFactory(photographerContent);
    const mediaModel = mediaFactory(photographerMedia);

    const userCardDOM = photographerModel.getPhotographerDomContent();
    const pictureCardDom = photographerModel.getPhotographerPicture();
    // const mediaCardDom = mediaModel.getPhotographerMedia();

    header.appendChild(userCardDOM);
    header.appendChild(pictureCardDom);

    // galery.appendChild(mediaCardDom);

}

init();

