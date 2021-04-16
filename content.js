const params = new URLSearchParams(window.location.search)
let lesson = params.get("lesson_identifier").split(".")
const topic_id = parseInt(lesson[0])
const lesson_id = parseInt(lesson[1])

function generateHTML(mappings){
    let bodyTag = document.getElementById("body");
    let inner = "";

    let flag=true
    let topic_data;
    mappings.forEach(element => {
        if ((element.topic_id == topic_id) && flag){
            topic_data = element;
            flag=false;
        }
    });
    let lesson_data;
    flag=true;
    topic_data.lessons.forEach(element => {
        console.log(element);
        if ((element.lesson_id == lesson_id) && flag){
            lesson_data = element;
            flag=false;
        }
    });
    inner += `<h2>${topic_data.title}</h2><h3>${lesson_data.title}</h3>`

    console.log(lesson_data)

    lesson_data.audio.forEach(element => {
        inner += `<audio id="${element}" src="/data/audio/${element}"></audio>
        <button id="${element}" onClick="play_audio(this)">play</button>
        <button id="${element}" onClick="pause_audio(this)">pause</button><br>`
    })

    bodyTag.innerHTML = inner;
}


// read mappings file
fetch("/data/mappings.json")
    .then(response => response.json())
    .then(generateHTML);