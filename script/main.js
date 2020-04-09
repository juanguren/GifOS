
// SECTION TOOL BAR EVENTS

// Theme Toggle
let btnThemes = document.querySelector("#btn-choose-theme");
let themes = document.querySelector("#theme-dropdown");

btnThemes.addEventListener("click", clickToggle);

let btnThemesClicked = false;

function clickToggle(e) {
    if (!btnThemesClicked) {
        themes.classList.replace("inactive", "active");
        btnThemesClicked = true;
    } else{
        themes.classList.replace("active", "inactive");
        btnThemesClicked = false;
    }
}

// Theme Selection

let themeDay = document.querySelector(".theme-day");
let themeNight = document.querySelector(".theme-night");

themeNight.addEventListener("click", nightChange);

function nightChange() {
    themeNight.classList.replace("theme-inactive", "theme-active");
    if (themeDay.classList.contains("theme-active")) {
        themeDay.classList.replace("theme-active", "theme-inactive");
    }
}

themeDay.addEventListener("click", dayChange);

function dayChange() {
    themeDay.classList.replace("theme-inactive", "theme-active");
    themeNight.classList.replace("theme-active", "theme-inactive");
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
