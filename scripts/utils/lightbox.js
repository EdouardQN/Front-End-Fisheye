const lightbox = document.querySelector('.lightbox');
const close = document.querySelector('.lightbox_close');
const next = document.querySelector('.lightbox_next');
const divMedias = document.querySelector('.photograph-galery');
let node = divMedias.childNodes;
console.log(node);
// Utilisation de for..of
for(var value of node.values()) {
    console.log(value);
  }
let number = 0;

close.addEventListener("click", () =>{
    lightbox.style.display = "none";

})

function openLightbox(){
    lightbox.style.display = "flex";
}

function currentSlide(index){
    number = index;
    console.log(number);
    return number;
}

next.addEventListener("click", () => { 
    number++;
    console.log(divMedias);
    console.log(number);
})