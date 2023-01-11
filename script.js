Webcam.set({
  width:350,
  height:300,
  image_format: 'png',
  png_quality: 90
});

var camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
  Webcam.snap(function(data_uri){
     document.getElementById("snapshot").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
  });
}

var classifer = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/zFfX9cEzA/model.json', modelLoaded);

function modelLoaded(){
  console.log("Model Loaded!");
}

function check(){
  img = document.getElementById('captured_image');
  classifer.classify(img, gotResult);
}

function speak(){
  var synth = window.speechSynthesis;
  speak_data_1 = "The prediction is"+prediction;
  var utterThis = new SpeechSynthesisUtterance(speak_data_1);
  synth.speak(utterThis);
}

function gotResult(error, results){
  if (error){
     console.error(error);
  }else{
     console.log(results)
     prediction = results[0].label;
     speak();
     if (results[0].label == "Amazing"){
        document.getElementById("mainLabel").innerHTML = "Prediction - <br>👌";
     }else if (results[0].label == "Best"){
        document.getElementById("mainLabel").innerHTML = "Prediction - <br>👍";
     }else if (results[0].label == "Victory"){
        document.getElementById("mainLabel").innerHTML = "Prediction - <br>✌️";
     }
  }
}