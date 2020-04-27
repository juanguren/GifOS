
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

// ======================= Theme Selection ==========================


// ======================= Hide "create GIF box" based on "Mis gifos" click ==========================

let gifBox = document.querySelector(".create-container");

let hideGifBox = () =>{
    let misGifosClick = localStorage.getItem("Mis_Gifos_Was_Clicked");
    console.log(misGifosClick);
    if (misGifosClick) {
        gifBox.style.display = "none";
    }
}

hideGifBox();

// ======================= Show "create GIF box" based on "Crear GIFS" click ==========================

