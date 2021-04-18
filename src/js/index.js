/*
Landing page js
This file injects html into index.html and uses DOM manipulation by appending and creating
child nodes
*/


const path = "./" 
// const path = "https://pratik-choudhari.github.io/stock-market-marathi/"
const url = `${path}data/mappings.json`

function generateHTML(mappings){
    let bodyTag = document.getElementById("body");

    let topics_list = document.createElement('ul')

    mappings.forEach(function(lesson){
        let single_topic = document.createElement('li')
        single_topic.className = "list-group-item"
        single_topic.id = "container"

        let topic_title = document.createElement("h4")
        topic_title.textContent = String(lesson.title)

        let date = document.createElement("p")
        date.id = "date"
        date.textContent = lesson.date

        let description = document.createElement("small")
        description.className = "text-muted text-responsive"
        description.textContent = lesson.description

        topic_title.appendChild(date)
        topic_title.appendChild(description)

        single_topic.appendChild(topic_title)

        let lessons_list = document.createElement("ul")
        lessons_list.className = "list-group"

        lesson.lessons.forEach(single_lesson_data => {
            let single_lesson = document.createElement('li')
            single_lesson.className = "list-group-item"

            let single_lesson_link = document.createElement("a")
            single_lesson_link.href = "#"
            single_lesson_link.id = String(lesson.topic_id)+ "."+String(single_lesson_data.lesson_id)
            single_lesson_link.textContent = single_lesson_data.title

            single_lesson.appendChild(single_lesson_link)

            lessons_list.appendChild(single_lesson)
        })
        single_topic.appendChild(lessons_list)
        topics_list.appendChild(single_topic)

    })
    bodyTag.appendChild(topics_list)

    let anchors = document.querySelectorAll(`a:not([id="exclude"]`)

    anchors.forEach(element => {
        element.href = `content.html?lesson_identifier=${element.id}`
    })
}

// read mappings file
fetch(url)
    .then(response => response.json())
    .then(generateHTML);