/*
content page js
This file injects html into content.html and uses DOM manipulation by appending and creating
child nodes
*/

const path = "./" 
// const path = "https://pratik-choudhari.github.io/stock-market-marathi/"
const url = `${path}data/mappings.json`

const params = new URLSearchParams(window.location.search)
const lesson = params.get("lesson_identifier").split(".")
const topic_id = parseInt(lesson[0])
const lesson_id = parseInt(lesson[1])


function array_match(arr, arrKey, idToMatch){
    let temp_data;
    flag=true;
    for(let pointer=0;pointer<arr.length;pointer++){
        var element = arr[pointer];
        if (element[arrKey] == idToMatch){
            temp_data = element;
            break;
        }
    }
    return temp_data;
}

function generateHTML(mappings){
    let bodyTag = document.getElementById("body");
    let inner = "";
    let container = document.createElement("div")

    let topic_data = array_match(mappings, "topic_id", topic_id)

    let lesson_data = array_match(topic_data.lessons, "lesson_id", lesson_id)

    let topic_title = document.createElement("h3")
    topic_title.className = "content-h"
    topic_title.textContent = topic_data.title

    let lesson_title = document.createElement("h4")
    lesson_title.className = "content-h"
    lesson_title.textContent = lesson_data.title

    let aud_img_list = document.createElement("ul")
    aud_img_list.className = "list-group"

    let hr_line = document.createElement("hr")
    hr_line.className = "my-4"

    container.appendChild(topic_title)
    container.appendChild(lesson_title)
    container.appendChild(hr_line)

    if (lesson_data.audio.length > 0){
        let audio_heading = document.createElement("li")
        audio_heading.className = "list-group-item"

        let hh = document.createElement("h5")
        hh.textContent =  "Audio"
        audio_heading.appendChild(hh)
        aud_img_list.appendChild(audio_heading)

        for (let i=0; i<lesson_data.audio.length;i++){
            let element = lesson_data.audio[i]

            let audio_wrap = document.createElement("li")
            audio_wrap.className = "list-group-item"

            let hh = document.createElement("p")
            hh.textContent = `Audio Clip-${i+1}`
            audio_wrap.appendChild(hh)
            

            let audio_file = document.createElement("audio")
            audio_file.preload =  "false"
            audio_file.id = element
            audio_file.src = `${path}data/audio/${element}`

            let play_bt = document.createElement("button")
            play_bt.textContent = "play"
            play_bt.id = element
            play_bt.className = "btn btn-primary"
            play_bt.setAttribute("onClick", "play_audio(this)")

            let pause_bt = document.createElement("button")
            pause_bt.textContent = "pause"
            pause_bt.id = element
            pause_bt.className = "btn btn-secondary"
            pause_bt.setAttribute("onClick", "pause_audio(this)")

            audio_wrap.appendChild(audio_file)
            audio_wrap.appendChild(play_bt)
            audio_wrap.appendChild(pause_bt)

            aud_img_list.appendChild(audio_wrap)
        }
    }
    if (lesson_data.image.length > 0){
        let images_list = document.createElement("ul")
        images_list.className = "list-group"

        let image_title = document.createElement("li")
        image_title.className = "list-group-item"
        let hh = document.createElement("h5")
        hh.textContent =  "Images"
        image_title.appendChild(hh)
        aud_img_list.appendChild(image_title)

        for (let i=0; i<lesson_data.image.length;i++){
            let element = lesson_data.image[i]

            let image_wrap = document.createElement("li")
            image_wrap.className = "list-group-item"
            let hh = document.createElement("p")
            hh.textContent = `Image-${i+1}`
            image_wrap.appendChild(hh)

            let image = document.createElement("img")
            image.id = `${element}`
            image.className = "img-fluid rounded mx-auto d-block"
            image.src = `${path}data/images/${element}`
            
            image_wrap.appendChild(image)
            aud_img_list.appendChild(image_wrap)
        }
    }
    if (lesson_data.video.length > 0){
        let videos_list = document.createElement("ul")
        videos_list.className = "list-group"

        let video_title = document.createElement("li")
        video_title.className = "list-group-item"
        let hh = document.createElement("h5")
        hh.setAttribute("textContent", "Videos")
        video_title.appendChild(hh)
        aud_img_list.appendChild(video_title)

        for (let i=0; i<lesson_data.video.length;i++){
            let element = lesson_data.video[i]

            let video_wrap = document.createElement("li")
            video_wrap.className = "list-group-item"
            video_wrap.appendChild(document.createElement("p").setAttribute("textContent", `Video-${i+1}`))

            let video = document.createElement("iframe").setAttribute("src", `${element}`)
            video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            video.setAttribute("allowfullscreen")

            video_wrap.appendChild(video)
            aud_img_list.appendChild(video_wrap)
        }
    }
    container.appendChild(aud_img_list)
    bodyTag.appendChild(container)
}

// read mappings file
fetch(url)
    .then(response => response.json())
    .then(generateHTML);