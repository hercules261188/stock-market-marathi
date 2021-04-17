const path = "./" 
// const path = "https://pratik-choudhari.github.io/stock-market-marathi/"
const url = `${path}data/mappings.json`

function generateHTML(mappings){
    let bodyTag = document.getElementById("body");
    let innerhtml = ``;

    mappings.forEach(function(lesson){
        innerhtml += "<ul>";
        let li_elements = `<li id="container" class="list-group-item">
                                <h4 class="">${lesson.title}
                                    <p id="date">${lesson.date}</p>
                                    <small class="text-muted text-responsive">${lesson.description}</small>
                                </h4>
                                <ul class="list-group">`
        lesson.lessons.forEach(single_lesson_data => {
            let element_id = String(lesson.topic_id)+ "."+String(single_lesson_data.lesson_id)
            li_elements += `
                        <li class="list-group-item">
                            <a id="${element_id}" href="#" class="text-responsive">${single_lesson_data.title}</a>
                        </li>
                        `
        })
        li_elements += `</ul>
                        </li>
                        </ul>`
        innerhtml += li_elements
    })
    // innerhtml += "</ul>"
    bodyTag.innerHTML += innerhtml

    let anchors = document.getElementsByTagName("a")

    for(let pointer=0; pointer<anchors.length; pointer++){
        if (anchors[pointer].id != "exclude"){
        anchors[pointer].href = `content.html?lesson_identifier=${anchors[pointer].id}`
        }
}}

// read mappings file
fetch(url)
    .then(response => response.json())
    .then(generateHTML);