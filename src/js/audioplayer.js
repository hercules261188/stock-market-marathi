function play_audio(element){
    var id_ = element.id
    console.log(id_)
    var audio = document.getElementById(id_)
    audio.play()
}

function pause_audio(element){
    var id_ = element.id
    var audio = document.getElementById(id_)
    audio.pause()
}