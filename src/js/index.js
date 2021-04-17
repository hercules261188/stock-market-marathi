const path = "./" 
// const path = "https://pratik-choudhari.github.io/stock-market-marathi/" 

function generateHTML(mappings){
    let bodyTag = document.getElementById("body");
    let innerhtml = `<ul>`;

    mappings.forEach(function(lesson){
        let li_elements = `<li id="container" class="list-group-item"><h4>${lesson.title}<br><small class="text-muted">${lesson.description}</small></h4><ul class="list-group">`
        lesson.lessons.forEach(single_lesson_data => {
            li_elements += `
                        <li class="list-group-item">
                            <a id="${String(lesson.topic_id)+ "."+String(single_lesson_data.lesson_id)}" 
                            href="#">${single_lesson_data.title}</a>
                        </li>
                        `
        })
        li_elements += "</ul></li>"
        innerhtml += li_elements
    })
    innerhtml += "</ul>"
    bodyTag.innerHTML += innerhtml

    let anchors = document.getElementsByTagName("a")

    for(let pointer=0; pointer<anchors.length; pointer++){
        if (anchors[pointer].id != "exclude"){
        anchors[pointer].href = `content.html?lesson_identifier=${anchors[pointer].id}`
        }
}}

// read mappings file
fetch(`${path}data/mappings.json`)
    .then(response => response.json())
    .then(generateHTML);