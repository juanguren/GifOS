
// Instatiating DOM elements

// NOTE TOOL BAR
let btnCreate = document.querySelector("#create-gif");
let btnTheme = document.querySelector("#choose-theme");
let toggleMenu = document.querySelector(".dropdown-content");

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

// NOTE SEARCH 
let searchBar = document.querySelector("#search-input");
let toggleBar = document.querySelector(".search-toggle");

/* SECTION Events for GIF search toggle */

window.addEventListener("mouseup", (e) =>{
    if (e.target != toggleBar && e.target.parentNode != toggleBar) {
        toggleBar.style.display = "none";
        searchToggleStatus = false;
    }
})

searchBar.addEventListener("click", searchClicked);

let searchToggleStatus = false; 

function searchClicked(e) {
    if (!searchToggleStatus) {
        toggleBar.style.display = "block";
        searchToggleStatus = true;
    } 
}

// SECTION GIF search 
searchBar.addEventListener("keyup", gifSearch);

function gifSearch(e) {
    console.log(e.target.value);
}
