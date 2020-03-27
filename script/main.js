
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

function chooseTheme() {    
    
}

// NOTE SEARCH 
let searchBar = document.querySelector("#search-input");
let toggleBar = document.querySelector(".search-toggle");
let btnSearch = document.querySelector("#button-search");
let glassIcon = document.querySelector("#lens-img");

/* SECTION Events for GIF search toggle */
let searchToggleStatus = false; 

window.addEventListener("mouseup", (e) =>{
    if (e.target != toggleBar && e.target.parentNode != toggleBar) {
        toggleBar.style.display = "none";

        btnSearch.classList.remove("btn-active");
        btnSearch.classList.add("btn-inactive");

        glassIcon.src = "assets/lupa_inactive.svg";

        searchToggleStatus = false;
    }
})

searchBar.addEventListener("click", searchClicked);

function searchClicked(e) {
    if (!searchToggleStatus) {
        toggleBar.style.display = "block";
        
        btnSearch.classList.remove("btn-inactive");
        btnSearch.classList.add("btn-active");

        glassIcon.src = "assets/lupa.svg";

        searchToggleStatus = true;
    }     
}

// SECTION GIF search 
searchBar.addEventListener("keyup", gifSearch);

function gifSearch(e) {
    console.log(e.target.value);
}
