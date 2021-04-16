const params = new URLSearchParams(window.location.search)
let lesson = params.get("lesson_identifier").split(".")
const topic_id = parseInt(lesson[0])
const lesson_id = parseInt(lesson[1])

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
    let inner = "";

    let topic_data = array_match(mappings, "topic_id", topic_id)

    let lesson_data = array_match(topic_data.lessons, "lesson_id", lesson_id)

    inner += `<h1>${topic_data.title}</h1><h3>${lesson_data.title}</h3><ul class="list-group"><li class="list-group-item"><h5>Audio</h5></li>`

    for (let i=0; i<lesson_data.audio.length;i++){
        let element = lesson_data.audio[i]
        inner += `<li class="list-group-item"><p>Audio clip-${i+1}</p><audio id="${element}" src="/data/audio/${element}"></audio>
        <button id="${element}" onClick="play_audio(this)" class="btn btn-primary">play</button>
        <button id="${element}" onClick="pause_audio(this)" class="btn btn-secondary">pause</button><br></li>`
    }
    inner += `<li class="list-group-item"><h5>Images</h5></li>`
    for (let i=0; i<lesson_data.image.length;i++){
        let element = lesson_data.image[i]
        inner += `<li class="list-group-item"><p>image-${i+1}</p><img id="${element}" class="img-fluid rounded mx-auto d-block" src="/data/images/${element}"></img>`
    }
    inner += "</ul>"
    bodyTag.innerHTML = inner;
}


// read mappings file
fetch("https://pratik-choudhari.github.io/stock-market-marathi/data/mappings.json")
    .then(response => response.json())
    .then(generateHTML);