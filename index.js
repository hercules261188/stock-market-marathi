
function generateHTML(mappings){
    let bodyTag = document.getElementById("body");
    let innerhtml = `<ul>`;

    mappings.forEach(function(lesson){
        let li_elements = `<li><h3>${lesson.title} - ${lesson.description}</h3><ul>`
        lesson.lessons.forEach(single_lesson_data => {
            li_elements += `
                        <li>
                            <a id="${String(lesson.topic_id)+ "."+String(single_lesson_data.lesson_id)}" 
                            href="#">${single_lesson_data.title}</a>
                        </li>
                        `
        })
        li_elements += "</ul></li>"
        innerhtml += li_elements
    })
    innerhtml += "</ul>"
    bodyTag.innerHTML = innerhtml

    let anchors = document.getElementsByTagName("a")

    for(let pointer=0; pointer<anchors.length; pointer++){
        anchors[pointer].href = `content.html?lesson_identifier=${anchors[pointer].id}`
}}

// read mappings file
fetch("/data/mappings.json")
    .then(response => response.json())
    .then(generateHTML);