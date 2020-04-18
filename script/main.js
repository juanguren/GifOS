
/**
 * TODO
 *     1. THEMES
 *          - The class "btn-active" can´t be on in day theme during normal reload
 *          - Create conditionals for each button during the night theme:
 *              ! Active
 *              ! Normal
 *              ! Hover  
 */

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

let btnsSuggest = document.querySelectorAll("#btnSuggest"); // Nodelist of buttons overlapping suggested gifs
let topBar = document.getElementById("top-bar"); // Bar at the very top of the application
let topHeader = document.getElementById("top-header");
let suggestedGifs = document.querySelectorAll(".gif");

// NOTE This function changes various elements from the DOM, the ones WITHOUT ANY ASSOCIATED EVENT. Using classes from the night stylesheet.
let buttonsNight = () =>{
    let btnCreate = document.getElementById("btn-create-gif");

    btnThemes.classList.add("btn-night");
    btnCreate.classList.add("btn-night");
    // Selecting the nodelist buttons
    btnsSuggest.forEach((button) =>{
        button.classList.replace("btnSuggestDay", "btnSuggestNight");
    });

    topBar.classList.replace("upperBar-day", "upperBar-night");
    topHeader.classList.replace("topHeader-day", "topHeader-night");
    // Selecting the suggested gifs header
    suggestedGifs.forEach((element) =>{
        element.classList.replace("gifDay", "gifNight");
    });
}

// Instantiating DOM elements
let themeDay = document.querySelector(".theme-day");
let themeNight = document.querySelector(".theme-night");
let logo = document.querySelector(".logo").firstElementChild.firstChild;
let misGifos = document.querySelector(".gif-options").lastElementChild;

// Creating element for appending the new stylesheet
let newStyle = document.createElement("link");

themeNight.addEventListener("click", nightChange);

function nightChange() {

    themeNight.classList.replace("theme-inactive", "theme-active");
    if (themeDay.classList.contains("theme-active")) {
        themeDay.classList.replace("theme-active", "theme-inactive");
    }
    // Changing stylesheet to night
    newStyle.rel = "stylesheet";
    newStyle.href = "../modular/dark-mode/style/style.css";
    document.body.appendChild(newStyle);
    themeNight.classList.add("btnTheme-night"); // Class found in the night stylesheet

    misGifos.style.color = "white";
    logo.setAttribute("src", "assets/gifOF_logo_dark.png");
    buttonsNight();
}

themeDay.addEventListener("click", dayChange);

function dayChange() {
    themeDay.classList.replace("theme-inactive", "theme-active");
    themeNight.classList.replace("theme-active", "theme-inactive");
    logo.src = "assets/gifOF_logo.png";
    misGifos.style.color = "#110038";
    // Removes night stylesheet from body
    document.body.removeChild(newStyle);

    // Selecting the nodelist buttons
    btnsSuggest.forEach((button) =>{
        button.classList.replace("btnSuggestNight", "btnSuggestDay");
    });

    topBar.classList.replace("upperBar-night", "upperBar-day");
    topHeader.classList.replace("topHeader-night", "topHeader-day");

    // Selecting the suggested gifs header
    suggestedGifs.forEach((element) =>{
        element.classList.replace("gifNight", "gifDay");
    });
}


// SECTION Search

let searchForm = document.querySelector(".search-box");
let searchBar = document.querySelector("#search-input");
let toggleBar = document.querySelector(".search-toggle");
let btnSearch = document.querySelector("#button-search");
let searchIcon = document.querySelector("#lens-img");

// This boolean helps identify the search toogle status for display purposes
let searchToggleStatus = false; 

window.addEventListener("mouseup", (e) =>{
    if (e.target != toggleBar && e.target.parentNode != toggleBar) {
        toggleBar.style.display = "none";

        btnSearch.classList.remove("btn-active");
        btnSearch.classList.add("btn-inactive");

        searchIcon.src = "assets/lupa_inactive.svg";

        searchToggleStatus = false;
    }
})

searchBar.addEventListener("click", searchClicked);

function searchClicked(e) {
    if (!searchToggleStatus) {
        toggleBar.style.display = "block";
        
        btnSearch.classList.remove("btn-inactive");
        btnSearch.classList.add("btn-active");

        searchIcon.src = "assets/lupa.svg";

        searchToggleStatus = true;
    }     
}

//  NOTE GIPHYs API:

const key = `bH9JKYtKhbwDfbW2bL9icFJreuoFFMwb`;
let searchResult = document.querySelectorAll("#gif-image");
let gifTitles = document.querySelectorAll("#suggest-text");

// Search Coincidences
searchBar.addEventListener("keyup", gifSearch);

function gifSearch(e) {
    //console.log(e.target.value);
}

// Search Results (4)
searchForm.addEventListener("submit", searchGIF);

async function searchGIF(e) {
    e.preventDefault();
    let searchQuery = searchBar.value;
    
    let data = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${searchQuery}&limit=16&offset=0&rating=G&lang=es`);
    let res = await data.json();

    data.ok ? console.log("Response is ok") : console.log("Response error. Maybe check the url being fetched");
    if (searchQuery == "" || searchQuery == " ") {
        console.log("NO SPACES");
    } else{
        const gifData = res.data;
        let resultArray = Array.from(searchResult);
        let titleArray = Array.from(gifTitles);
        for(let i = 0; i<= 3; i++){
            let gifTitle = gifData[i].title;
            let gifImage = gifData[i].images.downsized_medium.url;
            resultArray[i].src = gifImage;
            resultArray[i].alt = gifTitle;
            titleArray[i].innerText = gifTitle; // TODO Increase title span on grid
        }      
    }
}

// Delete

let deleteGif = document.querySelectorAll("#btn-close");
deleteGif.forEach((btn) =>{
    btn.addEventListener("click", (e) =>{
        e.preventDefault();
        console.log(e.target.id);
    })
})

// Discover More


// SECTION GIF TRENDS

let gifTrendsDiv = document.querySelector(".gif-trends");

//NOTE Giphy´s API

async function getTrends(url){
    let data = await fetch(url);
    let response = await data.json();
    if (data.ok) {
        let trendResponse = response.data;
        for(element in trendResponse){
            let trendGif = trendResponse[element].images.downsized_medium.url;
            let newGif = document.createElement("img");
            newGif.src = trendGif;
            //gifTrendsDiv.appendChild(newGif);
        }
    }
}

getTrends(`https://api.giphy.com/v1/gifs/trending?api_key=${key}&limit=16&rating=G`); 


// Trend Hashtag Toggle

let trendsToggle = document.querySelectorAll(".gif-trends img");
trendsToggle.forEach((image) =>{
    image.addEventListener("mouseover", () =>{
        console.log("MOUSEOVER");
    })
})