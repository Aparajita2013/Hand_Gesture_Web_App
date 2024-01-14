//https://teachablemachine.withgoogle.com/models/0wa9ko-_X/
prediction_1 = ""

Webcam.set({
    width: 350,
    heigth: 300,
    image_format: "png",
    png_quality: 90
});

Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="capture_image" src="' + data_uri + '"/>';
    })
}

console.log("ml5 version: ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/0wa9ko-_X/model.json", modelloaded);

function modelloaded() {
    console.log("modelloaded")
}


function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "prediction  is " + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("capture_image");
    classifier.classify(img, gotresult);
}

function gotresult(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        prediction_1 = results[0].label
        document.getElementById("result_gesture_name").innerHTML = prediction_1;
        speak()

        if (prediction_1 == "Best") {
            document.getElementById("update_gesture").innerHTML = "&#128077;"
        }
         if (prediction_1 == "Amazing") {
            document.getElementById("update_gesture").innerHTML = "&#128076;"
         }
         if (prediction_1 == "Victory") {
            document.getElementById("update_gesture").innerHTML = "&#9996;"
        }
    }
}