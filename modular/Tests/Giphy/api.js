

// Key: bH9JKYtKhbwDfbW2bL9icFJreuoFFMwb

let imgs = document.querySelectorAll(".container img");

async function getGIFS(url) {
    let search = await fetch(url);
    let res = await search.json();
    if (query == " " || query == "") {
        console.log("Empty");
    } else{
        //console.log(res.data[0].images.downsized_medium.url);
        let finalImg = Array.from(imgs);
        const first = res.data;
        console.log(first);
        for(i in first){
            console.log(first[i].images.downsized_medium.url);
            for(i in finalImg){
                finalImg[i].src = first[i].images.downsized_medium.url;
            }
        }
    }
    
}

let query = prompt("Enter keyword");

getGIFS(`https://api.giphy.com/v1/gifs/search?api_key=bH9JKYtKhbwDfbW2bL9icFJreuoFFMwb&q=${query}&limit=25&offset=0&rating=G&lang=en`);