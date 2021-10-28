status = ""
objects = []
Object_name = ""
function preload() {

}

function setup() {
    canvas = createCanvas(500, 450)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()

}

function draw() {
    image(video, 0, 0, 500, 450)
    if (status != "") {
        object_detector.detect(video, gotResults)
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status:Objects Detected";
            fill("red");
            percent = floor(objects[i].confidence * 100);
            textSize(20);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y - 5)
            noFill()
            stroke("red")
            rect(objects[i].x - 100, objects[i].y, objects[i].width - 50, objects[i].height)


            if (objects[i].label == Object_name) {
                console.log("found")
                document.getElementById("number_of_objects").innerHTML = Object_name + " Detected";
                synth=window.speechSynthesis
                utterthis=new SpeechSynthesisUtterance(Object_name+" Found")
                synth.speak(utterthis)
            } else {
                console.log("not found")
                document.getElementById("number_of_objects").innerHTML = Object_name + " Not Detected";
                synth=window.speechSynthesis
                utterthis=new SpeechSynthesisUtterance(Object_name+" Not Found")
                synth.speak(utterthis)
            }
        }
    }
}

function Compare() {
    object_detector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Object";
    Object_name = document.getElementById("Object_name").value
    console.log(Object_name);
}

function modelLoaded() {
    console.log("model Loaded")
    status = true;
}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(results)
        objects = results
    }
}