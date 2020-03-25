
// Instatiating DOM elements

// SECTION SEARCH
let searchBar = document.querySelector("#search-input");
let toggleBar = document.querySelector(".search-toggle"); /* NOTE NEW */

/* NOTE Events for GIF search */

/* NOTE NEW (START) */

window.addEventListener("mouseup", (e) =>{
    if (e.target != toggleBar && e.target.parentNode != toggleBar) {
        toggleBar.style.display = "none";
        searchToggleStatus = false;
    }
})

// Toggle search menu

searchBar.addEventListener("click", searchClicked);

let searchToggleStatus = false; 

function searchClicked(e) {
    if (!searchToggleStatus) {
        toggleBar.style.display = "block";
        searchToggleStatus = true;
    } 
}
/* NOTE NEW (END) */


// GIF search 
searchBar.addEventListener("keyup", gifSearch);

function gifSearch(e) {
    console.log(e.target.value);
}
