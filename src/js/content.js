const params = new URLSearchParams(window.location.search)
let lesson = params.get("lesson_identifier").split(".")
const topic_id = parseInt(lesson[0])
const lesson_id = parseInt(lesson[1])

// const path = "./" 
const path = "https://pratik-choudhari.github.io/stock-market-marathi/" 

function array_match(arr, key, id_){
    let temp_data;
    flag=true;
    arr.forEach(element => {
        console.log(element);
        if ((element[key] == id_) && flag){
            temp_data = element;
            flag=false;
        }
    });
    return temp_data;
}

function generateHTML(mappings){
    let bodyTag = document.getElementById("body");
    let inner = "<ul>";

    let topic_data = array_match(mappings, "topic_id", topic_id)

    let lesson_data = array_match(topic_data.lessons, "lesson_id", lesson_id)

    inner += `<h3 class="content-h">${topic_data.title}</h3><h4 class="content-h">${lesson_data.title}</h4>
                <ul class="list-group"><hr class="my-4">`

    if (lesson_data.audio.length > 0){
        inner += `<li class="list-group-item"><h5>Audio</h5></li>`

        for (let i=0; i<lesson_data.audio.length;i++){
            let element = lesson_data.audio[i]
            inner += `<li class="list-group-item"><p>Audio Clip-${i+1}</p><audio preload="true" id="${element}" src="${path}data/audio/${element}"></audio>
            <button id="${element}" onClick="play_audio(this)" class="btn btn-primary">play</button>
            <button id="${element}" onClick="pause_audio(this)" class="btn btn-secondary">pause</button><br></li>`
        }
        inner += `</ul>`
    }
    if (lesson_data.image.length > 0){
        inner += `<ul class="list-group"><li class="list-group-item"><h5>Images</h5></li>`
        for (let i=0; i<lesson_data.image.length;i++){
            let element = lesson_data.image[i]
            inner += `<li class="list-group-item"><p>Image-${i+1}</p><img id="${element}" class="img-fluid rounded mx-auto d-block" src="${path}data/images/${element}"></img>`
        }
        inner += "</ul>"
    }
    if (lesson_data.video.length > 0){
        inner += `<ul class="list-group"><li class="list-group-item"><h5>Videos</h5></li>`
        for (let i=0; i<lesson_data.video.length;i++){
            let element = lesson_data.video[i]
            inner += `<li class="list-group-item"><p>Video-${i+1}</p><iframe src="${element}" 
            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </iframe> `
        }
        inner += "</ul>"
    }
    inner += "</ul>"
    bodyTag.innerHTML = inner;
}

// read mappings file
fetch(`${path}data/mappings.json`)
    .then(response => response.json())
    .then(generateHTML);