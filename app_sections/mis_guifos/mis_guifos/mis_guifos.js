
// ============ Number of app visits (Accumulator) ==================

function pageVisits() {
    let getPageCount = localStorage.getItem("load");
    let data = document.getElementById("visit-count");
    data.innerText = getPageCount;
}
pageVisits();


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
let menuOptions = document.querySelector(".gif-options");
let logoContainer = document.getElementById("logo-container");
let logoArrow = document.getElementById("logo-arrow");

let misGifosClick = localStorage.getItem("Mis_Gifos_Was_Clicked");

let hideGifBox = () =>{
    if (misGifosClick === "true") {
        gifBox.classList.add("hide");
    } else if (misGifosClick === "false") {
        gifBox.classList.remove("hide");
        menuOptions.classList.add("hide");
        logoContainer.classList.add("logo-grid");
        logoArrow.classList.remove("hide");
    }
}

hideGifBox();

logoArrow.addEventListener("click", () =>{
    location.href = "../../../index.html";
})

/* 
* ======= Hide "create GIF box" based on the user´s click on "Comenzar"
* and display the "Video Testing" Box, the one capturing the userMedia
*/

let openCamera = document.querySelector(".btn-start");
let recordVideo = document.querySelector(".menu1");

openCamera.addEventListener("click", () =>{
    gifBox.classList.add("hide");
    if (gifBox.classList.contains("hide")) {
        recordVideo.classList.remove("hide");
        getMedia(constraints);
    }
});

// =============== Close the "Video Testing" Box based on the user´s click on the close button ============

let btnCloseTest = document.querySelector(".btn-close");
let btnCloseCapture = document.querySelector(".btn-close1");
let gifRecordBox = document.querySelector(".create-container1");
let boxTitle = document.querySelector(".box-instructions h5");
let timerDiv = document.querySelector(".record-timer");

btnCloseTest.addEventListener("click", () =>{
    recordVideo.classList.add("hide");
    gifBox.classList.remove("hide");
    stream.stop();
});

btnCloseCapture.addEventListener("click", () =>{
    btnCapture.classList.remove("hide");
    btnStop.classList.add("hide");
    camera.classList.replace("btn-lens", "btn-camera");
    timerDiv.classList.add("hide");

    boxTitle.innerText = "Un Chequeo Antes de Empezar";
    btnCapture.innerText = "Capturar";

});

// ========== Open the camera and display source to the DOM ============

let videoTest = document.getElementById("videoTest");
let videoRecord = document.getElementById("videoRecord");
let btnCapture = document.querySelector(".btn-capture");
let btnStop = document.querySelector(".btn-stop");
let camera = document.querySelector(".btn-camera");
let stream = null;
let savedGifs = [];
let newForm = new FormData(); // Form capturing the generated Blob after stopping the video recording

class sessionGifs{
    constructor(id, lengthx, src){
        this.id = id;
        this.lengthx = lengthx;
        this.src = src;
    }
}

const constraints = {
    audio: false,
    video: {
        height: {max: 480}
    }
}

async function getMedia(constraints){
    let recording = false;
    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        /* use the stream */
        videoTest.srcObject = stream;
        videoTest.play();

        let recorder = new GifRecorder(stream, {
            type: "gif",
            frameRate: 1,
            quality: 10
        });
        btnCapture.addEventListener("click", async (e) =>{
            recorder.record(); // Starts recording
            await new Promise((res, rej) => {
                if (recorder) {
                    res("OK");
                }
                else {
                    rej("Video recording couldn´t initialize");
                }
            }).then((res) =>{
                console.log(res);
                btnCloseCapture.classList.remove("hide");
                btnCloseTest.classList.add("hide");
                
                changeScreenToCapture(e.target); // Changes style of window
            }).catch(rej => console.log(rej));
        });
        btnStop.addEventListener("click", () =>{

            recorder.stop(function(blob) {
            if (blob && blob.size > 0) { // size> 0 handles the error of multiple clicks at "Listo" button
                let gifUrl = URL.createObjectURL(blob);

                newForm.append("file", blob);

                getGifOverview(gifUrl);
            } else{
                console.log("The video wasn´t saved correctly");
            }
        });
    })
      
    } catch(err) {
        /* handle the error */
        console.log(err);
        gifBox.classList.remove("hide");
        recordVideo.classList.add("hide");
    }
}


//============= Change to the window that captures the users GIF ================

function changeScreenToCapture(button){
    button.classList.add("hide");
    btnStop.classList.remove("hide");
    camera.classList.replace("btn-camera", "btn-lens");
    timerDiv.classList.remove("hide");

    boxTitle.innerText = "Capturando Tu Guifo...";
    button.innerText = "Listo";
}

//============= Change to the window that lets the user have an overview of the recorded GIF ================
let gifOverview = document.querySelector(".overview-container");

function getGifOverview(gifUrl){
    new Promise((resolve, reject) =>{
        if (gifUrl) {
            resolve(gifUrl + " Is OK");
        } else if(!gifUrl){
            reject("Gif wasn´t recorded correctly");
        }
    }).then((ok) =>{
        console.log(ok);
        recordVideo.classList.add("hide");
        stream.stop();

        gifOverview.classList.remove("hide");
        let gifOverviewImage = document.getElementById("overview-gif");
        gifOverviewImage.src = gifUrl;
    }).catch(err => console.log(err));
}

/**
*  ============ Sends the generated form (.gif) to Giphy via POST method ===========
* 
* @param {File object} file 
*/

const key = `bH9JKYtKhbwDfbW2bL9icFJreuoFFMwb`;

let gifPOST = document.getElementById("uploadGif");

gifPOST.addEventListener("click", sendGifAsForm);

let gifLoads = document.querySelector(".gif-loading");
let gifLoadsMessage = document.getElementById("upload-message");
let uploadingGif = document.querySelector(".uploading-container");
let gifId;

async function sendGifAsForm() {

    gifOverview.classList.add("hide");
    uploadingGif.classList.remove("hide");

    const options = {
        //headers: headers,
        method: "POST",
        //mode: "no-cors", // deals with redirecting to external resources coming from a core page/resource. no-cors: deactives that for communicating just with the local page.
        body: newForm
    }
    try {
        let data = await fetch(`https://upload.giphy.com/v1/gifs?api_key=${key}`, options);
        let response = await data.json();
        
        if (data.ok) {
            console.log(response);
            gifId = response.data.id;

            uploadSuccesfulScreen(gifId);
        } else{
            throw new Error("NO");
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * =============== Repeat Capture (Click in button "Repetir Captura") ============
 */

let btnRepeatCapture = document.getElementById("repeat-capture");

btnRepeatCapture.addEventListener("click", () =>{
    gifOverview.classList.add("hide");
    gifRecordBox.classList.remove("hide");

    btnCapture.classList.remove("hide");
    btnStop.classList.add("hide");
    camera.classList.replace("btn-lens", "btn-camera");
    timerDiv.classList.add("hide");

    boxTitle.innerText = "Un Chequeo Antes de Empezar";
    btnCapture.innerText = "Capturar";

    gifLoadsMessage.innerText = "";

    getMedia(constraints);
});

function uploadSuccesfulScreen(gifId) {
    console.log("Loading screen " + gifId);
    uploadingGif.classList.add("hide");

    fetch(`https://api.giphy.com/v1/gifs?api_key=${key}&ids=${gifId}`)
        .then(data => data.json())
        .then((res) =>{
            if (res.meta.status == 200) {
                let gif = res.data[0];
                showFinalResult(gif);
            }else{
                console.log("Data wasn´t fetched correctly");
            }
        });
}

let resultsWindow = document.querySelector(".results-container");
let finalGif = document.getElementById("resulting-gif");
let stringUrlGif = document.getElementById("gif-url-copy");

function showFinalResult(data) {
    resultsWindow.classList.remove("hide");

    const gifUrl = data.images.fixed_height_downsampled.url;
    // TODO
    let gifs = new sessionGifs(gifId, "", gifUrl);
    savedGifs.push(gifs);   
        
    saveGifToLocalStorage();    
    appendGifs();

    finalGif.src = gifUrl;
    stringUrlGif.innerText = gifUrl;
}

let copyGifBtn = document.getElementById("gif-copy");
let copySuccessMsg = document.getElementById("copy-success");
let downloadGifBtn = document.getElementById("gif-download");

copyGifBtn.addEventListener("click", copyGifUrl);

function copyGifUrl(){
    copySuccessMsg.style.color = "crimson";
    window.navigator.clipboard.writeText(stringUrlGif.innerHTML) ? copySuccessMsg.innerText = "Copiado!" : console.log("NO");
    
    setTimeout(() => {
       copySuccessMsg.innerText = ""; 
    }, 2000);
}

function saveGifToLocalStorage() {
    let existingGif = JSON.parse(localStorage.getItem("My_Gifs"));
    if (existingGif) {
        existingGif.forEach((gif) =>{
            let saved = new sessionGifs(gif.id, "", gif.src);
            savedGifs.push(saved);
        })
        localStorage.setItem("My_Gifs", JSON.stringify(savedGifs));
    } else{
        localStorage.setItem("My_Gifs", JSON.stringify(savedGifs));
    }
}

let closeResultsWindow = document.getElementById("results-close");

closeResultsWindow.addEventListener("click", () =>{
    resultsWindow.classList.add("hide");
})

function appendGifs() {
    let myGifsSection = document.querySelector(".myGifs-content");
    let alt = 1;
    savedGifs.map((elements) =>{
        let img = document.createElement("img");
        img.src = elements.src;
        img.alt = `Mi GIF #${alt++}`;  
        myGifsSection.appendChild(img);
    });
    console.log(myGifsSection);
}

