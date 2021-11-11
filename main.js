function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
}

function setup(){
    canvas=createCanvas(400,400);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}

function draw(){
    strokeWeight(5);
    stroke("black");
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}

function clearCanvas(){
    background("white");
}

function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        confidence=Math.round(results[0].confidence*100)

        document.getElementById("label").innerHTML="Label: "+ results[0].label;
        document.getElementById("percent").innerHTML="Accuracy: " + confidence + " %";

        utterThis=new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }
}