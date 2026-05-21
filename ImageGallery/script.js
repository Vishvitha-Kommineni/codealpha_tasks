const images = document.querySelectorAll(".gallery img");

const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightbox-img");

let currentIndex = 0;

function openImage(src){

    lightbox.style.display = "flex";

    lightboxImg.src = src;

    currentIndex = [...images].findIndex(img => img.src === src);
}

function closeImage(){

    lightbox.style.display = "none";
}

function changeImage(direction){

    currentIndex += direction;

    if(currentIndex < 0){
        currentIndex = images.length - 1;
    }

    if(currentIndex >= images.length){
        currentIndex = 0;
    }

    lightboxImg.src = images[currentIndex].src;
}