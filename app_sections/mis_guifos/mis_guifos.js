
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