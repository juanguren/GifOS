
/**
 * TODO
 *     1. THEMES
 *          - The class "btn-active" can´t be on in day theme during normal reload
 *          - Create conditionals for each button during the night theme:
 *              ! Active
 *              ! Normal
 *              ! Hover  
 */



 // ============ Number of app visits (Accumulator) ==================

function pageVisits() {
    let getPageCount = localStorage.getItem("load");
    if (getPageCount) {
        getPageCount++;
        localStorage.setItem("load", getPageCount);
    } else{
    let pageVisitCount = 1;
    localStorage.setItem("load", pageVisitCount);
    }
    showPageVisits();
}
pageVisits();

function showPageVisits() {
    let data = document.getElementById("visit-count");
    let pageLoads = localStorage.getItem("load");

    data.innerText = pageLoads;
}

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
// TODO Change IDs for a class (Ids are unique)
let btnsSuggest = document.querySelectorAll(".btnSuggest"); // Nodelist of buttons overlapping suggested gifs
let topBar = document.getElementById("top-bar"); // Bar at the very top of the application
let topHeader = document.getElementById("top-header");
let suggestedGifs = document.querySelectorAll(".gif");

// This function changes various elements from the DOM, the ones WITHOUT ANY ASSOCIATED EVENT. Using classes from the night stylesheet.
let buttonsNight = () =>{
    let btnCreate = document.getElementById("btn-create-gif");

    btnThemes.classList.add("btn-night");
    btnCreate.classList.add("btn-night");
    // Selecting the nodelist buttons
    verMasBtns.forEach((button) =>{
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
let themeChange = false;

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
    newStyle.href = "modular/dark-mode/style/style.css";
    document.body.appendChild(newStyle);
    themeNight.classList.add("btnTheme-night"); // Class found in the night stylesheet

    misGifos.style.color = "white";
    logo.setAttribute("src", "assets/gifOF_logo_dark.png");
    themeChange = true;
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
    verMasBtns.forEach((button) =>{
        button.classList.replace("btnSuggestNight", "btnSuggestDay");
    });

    topBar.classList.replace("upperBar-night", "upperBar-day");
    topHeader.classList.replace("topHeader-night", "topHeader-day");

    // Selecting the suggested gifs header
    suggestedGifs.forEach((element) =>{
        element.classList.replace("gifNight", "gifDay");
    });
    themeChange = false;
}

// ====== "Crear GIFS" - Link to page section

let btnCreateGif = document.getElementById("btn-create-gif");

btnCreateGif.addEventListener("click", () =>{
    location.href = "app_sections/mis_guifos/mis_guifos/mis_guifos.html";
    let checkLocalValue = localStorage.getItem("Mis_Gifos_Was_Clicked");
    if (checkLocalValue) {
        localStorage.setItem("Mis_Gifos_Was_Clicked", false);
    }
})

// ====== "Mis Gifos" - Link to (modifyied) page section

let myGifs = document.getElementById("myGifs");

myGifs.addEventListener("click", () =>{
    let myGifsClick = true;
    localStorage.setItem("Mis_Gifos_Was_Clicked", myGifsClick);
})


// SECTION Search

let searchForm = document.querySelector(".search-box");
let searchBar = document.querySelector("#search-input");
let toggleBar = document.querySelector(".search-toggle");
let btnSearch = document.querySelector("#button-search");
let searchIcon = document.querySelector("#lens-img");

let searchToggleStatus = false; // This boolean helps identify the search toogle status for display purposes

// Capture outside clicks for closing the search coincidences menu in the search form

window.addEventListener("mouseup", (e) =>{
    if (e.target != toggleBar && e.target.parentNode != toggleBar) {
        toggleBar.style.display = "none";
        searchToggleStatus = false;
    }
})

// Toggle search coincidences menu based on user click

searchBar.addEventListener("click", searchClicked);

function searchClicked(e) {
    if (!searchToggleStatus) {
        toggleBar.style.display = "block";

        searchToggleStatus = true;
    }     
}

// Activate/Deactivate search button based on user input 

searchBar.addEventListener("keyup", activateType);

function activateType(e) {
    if (e.target.value == "" || e.target.value == " ") {
        if (btnSearch.classList.contains("btn-active")) {
            btnSearch.classList.replace("btn-active", "btn-inactive");
            searchIcon.src = "assets/lupa_inactive.svg";
        }
    } else{
        btnSearch.classList.remove("btn-inactive");
        btnSearch.classList.add("btn-active");
        searchIcon.src = "assets/lupa.svg";
    }
}

//  NOTE GIPHYs API AHEAD:

const key = `bH9JKYtKhbwDfbW2bL9icFJreuoFFMwb`;
let searchResultTag = document.getElementById("searchTag");

// Saves search queries
let savedSearches = [];
function saveQuery(name, value) {
    let existing = JSON.parse(sessionStorage.getItem(name));
    if (existing) {
        existing.unshift(value);
        sessionStorage.setItem(name, JSON.stringify(existing));
        postHistory();
    } else{
        savedSearches.push(value);
        sessionStorage.setItem(name, JSON.stringify(savedSearches));
        postHistory();
    }
}

// Appends those queries ☝️ to the DOM (Search history)
let savedHistory;

function postHistory() {
    let history = JSON.parse(sessionStorage.getItem("Search History"));

    let divHistory = document.querySelector(".search-history");
    let alertMessage = document.querySelector("#history-alertMessage");
    if (history.length > 8) {
        alertMessage.innerText = "Ouch! This app only saves 9 search results";
        alertMessage.style.color = "crimson";            
        setTimeout(() => {
            alertMessage.style.display = "none";         
        }, 3000);
    } else{
        let p = document.createElement("p");
        p.innerText = history[0];
        let hashtag = "#";
        let final = hashtag.concat(history[0]);
        let buttons = document.createElement("button");
        buttons.classList.add("button-history");
        buttons.innerText = final;
        divHistory.appendChild(buttons);
        savedHistory = document.querySelectorAll(".button-history");
        searchHistory();
    }
}

/**
 * ================= Searches based on previously saved queries ==================
 */

function searchHistory() {
    savedHistory.forEach((button) =>{
        button.addEventListener("click", lookUp);
        async function lookUp(params) {
            let searchText = button.innerText;
            let query = searchText.replace("#", "");
            
            let data = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${query}&limit=16&offset=0&rating=G&lang=es`);
            let res = await data.json();
            let response = res.data;

            location.href = "#search-scroll";

            searchResultTag.innerText = query.toUpperCase();
            searchResultTag.style.color = "crimson";

            createGifsOnDemand(response);
        }
    })
}

//============ GIF SUGGESTIONS (4) =========================

let images = document.querySelectorAll(".gif-image");
let gifTitles;
let closeBtns;
let verMasBtns;

async function getGifsRandom(url) { // Devolver promesa con .then fuera de la función
    let data = await fetch(url);
    let response = await data.json();
    if (data.ok) {
        let gifRandom = response.data;
        let gifUrl = gifRandom.images.fixed_height_downsampled.url;
        let gifTitle = gifRandom.title;
        let div = document.createElement("div"); // TODO Call a function that creates the GIF element
        div.classList.add("gif");
        if (themeChange) {
            div.classList.add("gifNight");
        } else{
            div.classList.add("gifDay");
        }
        let divContent = `<h5 id="suggest-text">${gifTitle}</h5>
                <img src="assets/button3.svg" alt="close button 2" class="btn-close">
                <img src="${gifUrl}" alt="${gifTitle}" class="gif-image"> 
                <button class="btnSuggestDay btnSuggest">Ver mas</button>`;
        div.innerHTML = divContent;
        let gifContainer = document.querySelector(".gif-suggestion");
        gifContainer.appendChild(div);

        closeBtns = document.querySelectorAll(".btn-close");
        verMasBtns = document.querySelectorAll(".btnSuggest");
        gifTitles = document.querySelectorAll("#suggest-text");
    }
}
for(let i = 0; i<= 3; i++){
    getGifsRandom(`https://api.giphy.com/v1/gifs/random?api_key=${key}&limit=4&rating=G`);
        //.then()
}

/**
 *============= Search Coincidendes=================
 */

let textAI = document.querySelectorAll(".searchPredict");

searchBar.addEventListener("keyup", gifSearch);

async function gifSearch(e) {
    let query = e.target.value;
    let data = await fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=${key}&q=${query}`);
    let res = await data.json();
    if (data.ok) {
        if (e.target.value == "" || e.target.value == " ") {
            console.log("Don´t delete that much!");
        } else{
            let suggestedValue = res.data;
            for(let i = 0; i<= 2; i++){
                textAI[i].innerText = suggestedValue[i].name;
            } 
        }
    }
}

let trendsSection = document.querySelector("#trends");
let searchDiv = document.querySelector("#search");
let suggestedQuery;

/**
 * ============= Search Queries based on "Search Coincidences" ☝️ =================
 */

textAI.forEach((prediction) =>{
    prediction.addEventListener("click", (e) =>{
        suggestedQuery = e.target.innerText;
        let data = fetch(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${suggestedQuery}&limit=16&offset=0&rating=G&lang=es`)
            .then(data => data.json())
            .then((res) =>{
                location.href = "#search-scroll";

                let searchQuery = searchBar.value;
                const predictionResults = res.data;
                searchResultTag.innerText = suggestedQuery.toUpperCase();
                searchResultTag.style.color = "crimson";

                createGifsOnDemand(predictionResults); // GIF creator function
                saveQuery("Search History", suggestedQuery);
            }).catch((err) =>{
                return err;
            });
    })
})

/**
 * ============= Search Results by main Input =========================
*/

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

        location.href = "#search-scroll";

        searchResultTag.innerText = searchQuery.toUpperCase();
        searchResultTag.style.color = "crimson";

        const resultsAll = res.data;
        createGifsOnDemand(resultsAll); // GIF creator function
        saveQuery("Search History", searchQuery);
    }
}

/**
 * ========================= This function appends GIFs to the DOM =======================
 * 
 * @param {*fetched Object from searches} data 
 */

function createGifsOnDemand(data) {
        trendsSection.style.display = "none";
        let resultNodeList = [];
        searchDiv.innerHTML = ""; // Cleans inner code to prevent multiple results appending one after the other
        if (data) {
            for(i in data){
                let resultsUrl = data[i].images.fixed_height_downsampled.url
                let img = document.createElement("img");
                img.src = resultsUrl;
                img.alt = data[i].title;
                img.classList.add("searchGif");
                searchDiv.appendChild(img);
                let section1 = document.querySelector(".searchContainer");
                section1.classList.replace("searchInactive", "searchActive");
                resultNodeList = document.querySelectorAll(".searchGif");
            }
            // The following code adds various spans to the selected img´s:
            let resultArray = Array.from(resultNodeList);
            resultArray[4].classList.add("gif-span1");
            resultArray[9].classList.add("gif-span2");
            resultArray[14].classList.add("gif-span3");
        } else{
            console.log("Data not found");
        }
        
}

// ========================== Delete GIF ===========================================

let gifContainer = document.querySelector(".gif-suggestion");

setTimeout(() => {
    closeBtns.forEach((btn) =>{
        btn.addEventListener("click", (e) =>{
        e.preventDefault();
        if (confirm("¿Seguro deseas eliminarlo?")) {
            let gifParent = e.target.parentElement;
            appendNewGif(); // NEW GIF ADDED
            gifContainer.removeChild(gifParent);
        } else{
            console.log("OK!");
        }
    })
})
}, 2600);

// THIS FUNCTION CREATES AND APPENDS 1 NEW GIF EVERY TIME 1 IS DELETED.

let newCloseBtns;
let newVermasBtns;

let appendNewGif = () =>{

    let data = fetch(`https://api.giphy.com/v1/gifs/random?api_key=${key}&limit=16&rating=G`)
    .then(data => data.json())
    .then((res) =>{
        const resData = res.data;
        const resUrl = resData.images.fixed_height_downsampled.url;
        const resTitle = resData.title;
        let div = document.createElement("div");
        div.classList.add("gif");
        let h5 = `<h5 id="suggest-text">${resTitle}</h5>
                <img src="assets/button3.svg" alt="close button 2" class="btn-close newClose">
                <img src="${resUrl}" alt="${resTitle}" class="gif-image"> 
                <button class="btnSuggestDay btnSuggest newBtn">Ver mas</button>`;
        setTimeout(() => {
            newCloseBtns = document.querySelectorAll(".newClose");
            newDiscoversBtns = document.querySelectorAll(".newBtn");
            searchByNewGif(newDiscoversBtns);
            deleteNewRandomGifs(newCloseBtns);
        }, 0);
        
        if (themeChange) {
            div.classList.add("gifNight");
        } else{
            div.classList.add("gifDay");
        }
        div.innerHTML = h5;
        gifContainer.appendChild(div);
    });
}

/**
 * // ================ Event function for deleting newly created GIFs =============
 * 
 * @param {Node List} closeButtons 
 */
function deleteNewRandomGifs(closeButtons) {
    closeButtons.forEach((button) =>{
        button.addEventListener("click", (e) =>{
            if (confirm("¿Seguro deseas eliminarlo?")) {
                let gifParent = e.target.parentElement;
                appendNewGif(); // NEW GIF ADDED
                gifContainer.removeChild(gifParent);
            } else{
                console.log("OK!");
            }
        })
    })
}

/**
 * // ================ Searches based on GIfs created after deleting one of the originals =============
 * 
 * @param {Node List} buttons 
 */
function searchByNewGif(buttons) {
    buttons.forEach((element) =>{
        element.addEventListener("click", (e) =>{
            let parent = e.target.parentElement;
            let textChild = parent.firstChild.innerText;
            let data = fetch(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${textChild}&limit=16&offset=0&rating=G&lang=es`)
                .then(res => res.json())
                .then((data) =>{
                    location.href = "#search-scroll";

                    let query = data.data;
                    searchResultTag.innerText = textChild.toUpperCase();
                    searchResultTag.style.color = "crimson";
                    createGifsOnDemand(query);
                    saveQuery("Search History", textChild);
                })
        })
    })
}

// ============= Searches based on the four (4) original GIFs appended to the DOM =================

// TODO Sustainable alternative to setTimeout (async or promise)
setTimeout(() => {
    verMasBtns.forEach((button) =>{
        button.addEventListener("click", (e) =>{
            let parent = e.target.parentElement;
            let searchQuery = parent.firstChild.innerText;

            let data = fetch(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${searchQuery}&limit=16&offset=0&rating=G&lang=es`)
                .then(res => res.json())
                .then((data) =>{
                    searchResultTag.innerText = searchQuery.toUpperCase();
                    searchResultTag.style.color = "crimson";
                    let query = data.data;
                    if (query.length == 0) {
                        console.log("hmm data is empty");
                    } else{
                        location.href = "#search-scroll";
                        createGifsOnDemand(query);
                        saveQuery("Search History", searchQuery);
                    }
            })
        })
    });
}, 2600);

// SECTION GIF TRENDS

let gifTrendsDiv = document.querySelector(".gif-trends"); // "Gif Trends" div: Used below for the populating function too
let newGifToggle = [];

async function getTrends(url){
    let data = await fetch(url);
    let response = await data.json();
    if (data.ok) {
        let gifTrendsAll = [];
        let trendResponse = response.data;
        for(element in trendResponse){
            let trendGif = trendResponse[element].images.fixed_height_downsampled.url;
            let newGif = document.createElement("img");
            newGif.src = trendGif;
            newGif.classList.add("trendGif");
            gifTrendsDiv.appendChild(newGif);
            gifTrendsAll = document.querySelectorAll(".trendGif");

            newGifToggle.push(newGif); // Save DOM img´s for the toggle function above
        }
        gifTrendsArray = Array.from(gifTrendsAll);
        // How to make this 3 recurrent?
        gifTrendsArray[4].classList.add("gif-span1");
        gifTrendsArray[9].classList.add("gif-span2");
        gifTrendsArray[14].classList.add("gif-span3");

        toggleOver();
    }
}

getTrends(`https://api.giphy.com/v1/gifs/trending?api_key=${key}&limit=16&rating=G`); 

// ========================= Trend Hashtag Toggle =====================

function toggleOver() {
    newGifToggle.forEach((gif) =>{
        gif.addEventListener("mouseover", () =>{
            let newDiv = document.createElement("div");
            newDiv.classList.add("hover-rectangle");
            let hoverRectangle = document.querySelectorAll(".hover-rectangle");
            //gifTrendsDiv.appendChild(newDiv);
        })
    })
}
