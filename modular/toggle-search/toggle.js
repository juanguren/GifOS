
// Instatiating DOM elements

// SECTION SEARCH
let searchBar = document.querySelector("#search-input");


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
