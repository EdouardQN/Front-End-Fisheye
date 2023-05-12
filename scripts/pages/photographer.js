//code JavaScript lié à la page photographer.html

//récupération de l'id du photographe passé en url 
function getPhotographerId(){return new URL(location.href).searchParams.get("id");}

async function getPhotographer(){
    let photographers = fetch('../../data/photographers.json')
        .then(response => response.json())
        .catch(error => console.error(error));
        return photographers;
}

function getPhotographerContent(json){
    let contenuPhotographer = []; 
    for (let i =0; i<json.photographers.length; i++){
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
    for (let j = 0; j<json.media.length; j++){
        if (json.media[j].photographerId == photographerId){
            contenuMedia[x] = json.media[j];
            x++;
        }
    }
    return contenuMedia;
}

function photographerFactory(content){
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
        const h2 = document.createElement( 'h2' );
        const h4 = document.createElement('h4');
        const span = document.createElement('span');

        div.classList.add('photograph-content');
        h2.textContent = name;
        h4.textContent = city + ', ' + country;
        span.textContent = tagline;

        div.appendChild(h2);
        div.appendChild(h4);
        div.appendChild(span);
        return (div);
    }
    function getPhotographerPicture(){
        const divImg = document.createElement('div');
        const img = document.createElement( 'img' );

        divImg.classList.add('photograph-img');
        img.setAttribute("src", picture);

        divImg.appendChild(img);

        return (divImg);
    }

    function getPhotographerTarif(){
        const tarif = document.querySelector('.photograph-tarif');
        tarif.innerText = `${price}€ / jour`;
        return tarif;
    }

    return { id, name, city, country, tagline, price, portrait, picture, getPhotographerDomContent, getPhotographerPicture, getPhotographerTarif }
}

var Factory = function(){
    this.createMedia = function (json){
        var createMedia;
        if (json.hasOwnProperty('image')){
            createMedia = new Image(json.image);
        }
        else if (json.hasOwnProperty('video')){
            createMedia = new Video(json.video);
        }
        createMedia.date = json.date;
        createMedia.likes = json.likes;
        createMedia.photographerid = json.photographerId;
        createMedia.price = json.price;
        createMedia.title = json.title;
        return createMedia;
    }
}

var Image = function(type){
    this.image = type;
}

var Video = function(type){
    this.video = type;
}

function mediaFactory(media){
    var tabMedia= [];
    var contentMedia;
    // const sample = `../../assets/samples/${}`;
    var nbLikes = 0;
    var factory = new Factory();

    function getPhotographerDomMedia(){
        let div = [];
        for (let i = 0; i<media.length; i++){
            div[i] = document.createElement('div');
            tabMedia.push(factory.createMedia(media[i]));
            if (tabMedia[i].hasOwnProperty('image')){
                contentMedia = tabMedia[i].image;
                div[i].classList.add('photograph-image');
            }
            else if (tabMedia[i].hasOwnProperty('video')){
                contentMedia = tabMedia[i].video;
                div[i].classList.add('photograph-video');
            }            
            div[i].innerText = contentMedia;
            nbLikes += media[i].likes;
        }
        return (div);
    }

    function getPhotographerLikes(){
        const likes = document.querySelector('.photograph-likes');
        likes.innerText = nbLikes;
        return likes;
    }
    return {tabMedia, nbLikes, factory, getPhotographerDomMedia, getPhotographerLikes};
}

const photographerId = getPhotographerId();
const header = document.querySelector('.photograph-header');
const galery = document.querySelector('.photograph-galery');

async function init(){
    //fetch
    const data = await getPhotographer();
    //Récupération données photographe / ses médias, séparés en 2 tableaux d'objects
    const photographerContent = getPhotographerContent(data);
    const photographerMedia = getPhotographerMedia(data);
    //factory functions qui utilisent leur tableau correspondant au dessus
    const photographerModel = photographerFactory(photographerContent);
    const mediaModel = mediaFactory(photographerMedia);
    //DOM Maniplation
    const userCardDOM = photographerModel.getPhotographerDomContent();
    const pictureCardDom = photographerModel.getPhotographerPicture();
    const tarifCardDom = photographerModel.getPhotographerTarif();
    const mediaCardDom = mediaModel.getPhotographerDomMedia();
    const likesDom = mediaModel.getPhotographerLikes();
    header.appendChild(userCardDOM);
    header.appendChild(pictureCardDom);
    for (let i=0; i<mediaCardDom.length; i++){

        galery.append(mediaCardDom[i]);
    }
}

init();

