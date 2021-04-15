
function generateHTML(mappings){
    let bodyTag = document.getElementById("body");
    let inner = "";
    mappings.forEach(function(lesson){
        let audioFiles = lesson.audio
        let imageFiles = lesson.images

        audioFiles.forEach(function(fileName){
            inner += `<h1>hurray audio ${fileName}</h1><br>`
        })

        imageFiles.forEach(function(fileName){
            inner += `<h1>hurray image ${fileName}</h1><br>`
        })
    })
    bodyTag.innerHTML = inner
}

// read mappings file
fetch("/data/mappings.json")
    .then(response => response.json())
    .then(generateHTML);