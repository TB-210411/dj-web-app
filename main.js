function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on("pose",gotPoses);
}
song1="";
song2="";
LeftWristX=0;
LeftWristY=0;
RightWristX=0;
RightWristY=0;
scoreRightWrist=0;
scoreLeftWrist=0;
song1status="";
song2status="";
function preload(){
    song1=loadSound("song.mp3");
    song2=loadSound("Bones.mp3");
}

function modelLoaded(){
    console.log("PoseNet is initialized");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        LeftWristX=results[0].pose.leftWrist.x;
        LeftWristY=results[0].pose.leftWrist.y;
        RightWristX=results[0].pose.rightWrist.x;
        RightWristY=results[0].pose.rightWrist.y;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;

    }
}
function draw(){
    image(video,0,0,600,500);
    song1status=song1.isPlaying();
    song2status=song2.isPlaying();
  fill("red");
  stroke("red");
  if(scoreRightWrist>0.2){
      circle(RightWristX,RightWristY,20);
      song2.stop();
      if(song1status==false){
          song1.play();
          document.getElementById("song").innerHTML="Playing- 2 Dumb kids";
      }
  }
  if(scoreLeftWrist>0.2){
    circle(LeftWristX,LeftWristY,20);
    song1.stop();
    if(song2status==false){
        song2.play();
        document.getElementById("song").innerHTML="Playing- Bones";
    }
}
}

