
// Instatiating DOM elements

// SECTION TOOL BAR
let btnCreate = document.querySelector("#create-gif");
let btnTheme = document.querySelector("#choose-theme");
let toggleMenu = document.querySelector(".dropdown-content");

// SECTION SEARCH
let searchBar = document.querySelector("#search-input");


// Event for "Crear GIFS" (btnCreate)
btnCreate.addEventListener("click", createGif);

function createGif() {
    console.log("1 clicked");
}

// Event for "Elegir Tema" (btnTheme & toggleMenu)
btnTheme.addEventListener("click", chooseTheme);
toggleMenu.classList.add("not-show");

function chooseTheme() {    
    if (toggleMenu.classList.contains("not-show")) {
        toggleMenu.classList.toggle("show");
    }
}

/* NOTE Events for GIF search */

// Toggle search menu
searchBar.addEventListener("click", searchClicked);

function searchClicked(e) {
    console.log(1);
}

// GIF search 
searchBar.addEventListener("keyup", gifSearch);

function gifSearch(e) {
    console.log(e.target.value);
}
