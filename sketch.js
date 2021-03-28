var PLAY=1;
var END=0;
var gameState=PLAY;
var robot;
var ground, invisibleGround, groundImage;
var Panda,PandaImg;
var Orangutan, OrangutanImg;
var Rhino,RhinoImg;
var sea,seaImg;
var Woollymammoth,WoollymammothImg;
var Dinosaur,DinosaurImg;
var Dodo,DodoImg;
var score = 0;








var newImage;

function preload(){
  
 // groundImage = loadImage("ground2.png");
  backgroundImg = loadImage("Background.png");
RobotImg = loadImage("Robot.png");
Ground1Img = loadImage("ground2.png");
  RhinoImg = loadImage("Rhino.png");
  PandaImg = loadImage("Panda.png");
  SeaImg = loadImage("Sea.png");
  WoollymammothImg = loadImage("Woollymammoth.png");
  DinosaurImg = loadImage("Dinosaur.png");
  DodoImg = loadImage("dodo.png");
  RestartImg = loadImage("restart.png");
  GameoverImg = loadImage("gameOver.png");
jumpsound = loadSound("jump.mp3");
checksound = loadSound("checkPoint.mp3");
diesound = loadSound("die.mp3");
text1img = loadImage("Text1.png");

  


  OrangutanImg = loadImage("Orangutan.png");

}

function setup() {
  createCanvas(2000, 1000);

  gameOver = createSprite(700,200);
  gameOver.addImage(GameoverImg);
  
  restart = createSprite(700,300);
  restart.addImage(RestartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
 ground = createSprite(900,350,1000,900);
  ground.addImage("ground",backgroundImg);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  ground.scale=3;
  //invisibleGround = createSprite(200,190,400,10);
  //invisibleGround.visible = false;
  
  robot = createSprite(150,600,50,50);
  robot.addImage("robot",RobotImg);
  robot.scale = 0.2;
 
  ground1 = createSprite(200,650,1000,100);
  ground1.addImage("ground1",Ground1Img);
  ground1.x = ground1.width /2;
  ground1.velocityX = -9;
  
  obstaclesGroup = new Group ();

  extinctGroup = new Group();
  //sound1.play();
}

function draw() {
background(255);
image (text1img,200,400);

text("score: "+score,1200,100);
if(gameState===PLAY){
  
  console.log(robot.y);
  
  if (ground.x < 0){
 ground.x = ground.width/2;
}

if(keyDown("space")&&robot.y>=560.9){
  robot.velocityY = -30;
  jumpsound.play()
}
 robot.velocityY=robot.velocityY+1.5; 

 if (ground1.x < 0){
  ground1.x = ground1.width/2;
} 


SpawnEndageredSpecies();
ExtinctSpecies();

if(robot.isTouching(obstaclesGroup)){
  score=score+1;
}
if(robot.isTouching(extinctGroup)){ 
gameState=END;                             
diesound.play()




}
}

  else if (gameState === END) {
    gameOver.visible = true;
   restart.visible = true;
   textSize(25);
   
   if(mousePressedOver(restart)) {
    reset();
  }
    
    ground1.velocityX = 0;
    robot.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
     extinctGroup.setVelocityXEach(0);
    
    //change the trex animation
   
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    extinctGroup.setLifetimeEach(-1);

}
robot.collide(ground1);

  drawSprites();
}

function SpawnEndageredSpecies(){

  if(frameCount % 150 === 0) {
    var obstacle = createSprite(2000,600,10,40);
    obstacle.velocityX = -9;
    var rand = Math.round(random(1,3));
    switch(rand) {
 
      case 1: obstacle.addImage(RhinoImg);
              break;
      case 2: obstacle.addImage(PandaImg);
              break;
      case 3: obstacle.addImage(OrangutanImg);
              break;

      //case 5: obstacle.addImage(obstacle5);
              //break;
     // case 6: obstacle.addImage(obstacle6);
             // break;
      default: break;
    }  
    obstacle.scale = 0.3;
    obstacle.lifetime = 200;
  
    obstaclesGroup.add(obstacle);

  }                           
}

function ExtinctSpecies(){
  if(frameCount % 500 === 0) {
    var obstacle1 = createSprite(2000,600,10,40);
    obstacle1.velocityX = -9;
    var rand = Math.round(random(1,4));
    switch(rand) {
 
      case 1: obstacle1.addImage(SeaImg);
              break;
      case 2: obstacle1.addImage(WoollymammothImg);
              break;
      case 3: obstacle1.addImage(DodoImg);
              break;
         case 4: obstacle1.addImage(DinosaurImg);
              break;

     
      default: break;
    }  
    obstacle1.scale = 0.5;
    obstacle1.lifetime = 300;
  
    extinctGroup.add(obstacle1);

}
}
function reset(){
gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  extinctGroup.destroyEach();
  
  
  
  
  
  score = 0; 
}
