
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
    if (misGifosClick === "true") {
        gifBox.classList.add("hide");
    } else if (misGifosClick === "false") {
        gifBox.classList.remove("hide");
    }
}

hideGifBox();

// ======= Hide "create GIF box" based on the user´s click on "Comenzar"

let openCamera = document.querySelector(".btn-start");
let recordVideo = document.querySelector(".create-container1");

openCamera.addEventListener("click", () =>{
    gifBox.classList.add("hide");
    if (gifBox.classList.contains("hide")) {
        recordVideo.classList.remove("hide");
        getMedia(constraints);
    }
});

// ========== Open the camera and display source to the DOM ============

let videoTest = document.getElementById("videoTest");
let videoCapture = document.querySelector(".btn-capture");
let camera = document.querySelector(".btn-camera");
let img = document.createElement("img");
let savedGifs = [];

class sessionGifs{
    constructor(id, length, src){
        this.id = id;
        this.length = length;
        this.src = src;
    }
}

const constraints = {
    audio: false,
    video: {
        height: {max: 480}
    }
}

async function getMedia(constraints) {
    let stream = null;
    let gifId = 0;
    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        /* use the stream */
        videoTest.srcObject = stream;
        videoTest.play();

        recorder = new GifRecorder(stream, {
            frameRate: 1,
            quality: 10
        });
        videoCapture.addEventListener("click", () =>{
            recorder.record();
        });
        camera.addEventListener("click", () =>{
            recorder.stop(function(blob) {
            console.log(blob);
            if (blob) {
                gifId++;
                let gifUrl = URL.createObjectURL(blob);
                
                let gifs = new sessionGifs(gifId, "", gifUrl);
                savedGifs.push(gifs);
                console.log(gifs);
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


//============= Record video capture ================

    
