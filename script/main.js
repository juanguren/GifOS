

// Instatiating DOM elements
let btnCreate = document.querySelector("#create-gif");
let btnTheme = document.querySelector("#choose-theme");

// Event for "Crear GIFS"
btnCreate.addEventListener("click", createGif);

function createGif() {
    console.log("1 clicked");
}

// Event for "Elegir Tema"

btnTheme.addEventListener("click", chooseTheme);

function chooseTheme() {
    console.log("2 clicked");
    
}