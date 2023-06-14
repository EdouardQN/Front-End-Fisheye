//code JavaScript lié à la page photographer.html

//récupération de l'id du photographe passé en url 
function getPhotographerId(){return new URL(location.href).searchParams.get("id");}

async function getPhotographer(){
    let photographers = fetch('../../data/photographers.json').then(response => response.json()).catch(error => console.error(error));
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
        divImg.classList.add('photograph-img');
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", "Image Photographe");
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
    var contentMedia, displayMedia, sample, heartIcon, nbLikes = 0;
    var tabMedia= [], headingMedia = [], spanMedia = [];

    var factory = new Factory();

    function getPhotographerDomMedia(){
        let div = [];
        let divMediaDetails = [];
        for (let i = 0; i<media.length; i++){
            headingMedia[i] = document.createElement('h3');
            spanMedia[i] = document.createElement('span');
            heartIcon = document.createElement('button');
            heartIcon.innerHTML = `<ion-icon name="heart"></ion-icon>`;
            div[i] = document.createElement('div');
            tabMedia.push(factory.createMedia(media[i]));

            if (tabMedia[i].hasOwnProperty('image')){
                contentMedia = tabMedia[i].image;
                displayMedia = document.createElement('img');
                div[i].classList.add('photograph-image');
            }
            else if (tabMedia[i].hasOwnProperty('video')){
                contentMedia = tabMedia[i].video;
                displayMedia = document.createElement('video');
                displayMedia.setAttribute('controls', '');
                div[i].classList.add('photograph-video');
            }            
            sample = `../../assets/samples/${userMediaDisplay}/${contentMedia}`;
            headingMedia[i].innerText = tabMedia[i].title;
            spanMedia[i].innerText = tabMedia[i].likes;
            divMediaDetails[i] = document.createElement('div');
            divMediaDetails[i].classList.add('media-details');
            displayMedia.setAttribute("src", sample);
            displayMedia.setAttribute("style", "object-fit:cover; width:250px; height:250px");
            divMediaDetails[i].appendChild(headingMedia[i]);
            divMediaDetails[i].appendChild(spanMedia[i]);
            divMediaDetails[i].append(heartIcon);
            div[i].appendChild(displayMedia);
            div[i].append(divMediaDetails[i]);
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
let userMediaDisplay;
const header = document.querySelector('.photograph-header');
const galery = document.querySelector('.photograph-galery');
const dropDown = document.querySelector('.dropdown-container');
const dropPopularity = document.querySelector('.dropdown-popularity');
const dropDate = document.querySelector('.dropdown-date');
const dropTitle = document.querySelector('.dropdown-title');

async function init(){
    //fetch
    const data = await getPhotographer();
    //Récupération données photographe / ses médias, séparés en 2 tableaux d'objects
    const photographerContent = getPhotographerContent(data);
    userMediaDisplay = photographerContent[1]; // mettre ailleurs ?
    const photographerMedia = getPhotographerMedia(data);
    //factory functions qui utilisent leur tableau correspondant au dessus
    const photographerModel = photographerFactory(photographerContent);
    let mediaModel = mediaFactory(photographerMedia);
    //DOM Maniplation
    const userCardDOM = photographerModel.getPhotographerDomContent();
    const pictureCardDom = photographerModel.getPhotographerPicture();
    const tarifCardDom = photographerModel.getPhotographerTarif();
    let mediaCardDom = mediaModel.getPhotographerDomMedia();
    const likesDom = mediaModel.getPhotographerLikes();
    header.appendChild(userCardDOM);
    header.appendChild(pictureCardDom);

    for (let i=0; i<mediaCardDom.length; i++){
        galery.append(mediaCardDom[i]);
        let btnLike = mediaCardDom[i].children[1].lastChild;
        btnLike.addEventListener("click", (event) => {

            if (event.target.classList.contains('media_liked')){
                console.log('already liked');
            }
            else{
                mediaCardDom[i].children[1].childNodes[1].innerText++;
                event.target.classList.add('media_liked');
            }
        })           
    }

    dropPopularity.addEventListener("click", () => {
   
        let sortByPopularity = mediaModel.tabMedia.sort(
            (previousPopularity, actualPopularity) => actualPopularity.likes - previousPopularity.likes
        );
        galery.innerHTML = "";
        mediaModel = mediaFactory(sortByPopularity);
        mediaCardDom = mediaModel.getPhotographerDomMedia();
        for (let i=0; i<mediaCardDom.length; i++){
            galery.append(mediaCardDom[i]);
        } 
    })

    dropDate.addEventListener("click", () => {

        let sortByDate = mediaModel.tabMedia.sort(
               (previousDate, actualDate) => new Date(actualDate.date) - new Date(previousDate.date)
        );
        galery.innerHTML = "";
        // Une date ne se trie pas bien
        // console.log(sortByDate);
        mediaModel = mediaFactory(sortByDate);
        mediaCardDom = mediaModel.getPhotographerDomMedia();
        for (let i=0; i<mediaCardDom.length; i++){
            galery.append(mediaCardDom[i]);
        }         
    })

    dropTitle.addEventListener("click", () => {
        let sortByTitle = mediaModel.tabMedia.sort(
            (previousTitle, actualTitle) => {
                if (previousTitle.title < actualTitle.title) {return -1;}
                if (previousTitle.title > actualTitle.title) {return 1;}
                return 0;
            }          
        ); 
        galery.innerHTML = "";
        console.log(sortByTitle);
        mediaModel = mediaFactory(sortByTitle);
        mediaCardDom = mediaModel.getPhotographerDomMedia();
        for (let i=0; i<mediaCardDom.length; i++){
            galery.append(mediaCardDom[i]);
        }         
    })
}

init();


