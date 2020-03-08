
// Instatiating DOM elements
let btnCreate = document.querySelector("#create-gif");
let btnTheme = document.querySelector("#choose-theme");
var toggleMenu = document.querySelector(".dropdown-content");

// Event for "Crear GIFS"
btnCreate.addEventListener("click", createGif);

function createGif() {
    console.log("1 clicked");
}

// Event for "Elegir Tema"

btnTheme.addEventListener("click", chooseTheme);
toggleMenu.classList.add("not-show");

function chooseTheme() {    
    if (toggleMenu.classList.contains("not-show")) {
        toggleMenu.classList.toggle("show");
    }
    
}

