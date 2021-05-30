var superman, asteroid, star, supermanstand_img, supermanfly_img, asteroid_img, star_img;
var sound1;
var ground;
var sky, sky_img;
var score=0;
var start=0;
var gameState = 1;
var gameover, gameover_img;


function preload(){
  supermanstand_img=loadImage("supermanstanding.png");
  supermanfly_img=loadImage("supermanflying.png");
  asteroid_img=loadImage("asteroid.png");
  star_img=loadImage("star.png");
  starcollect=loadSound("starcollect.mp3");
  sky_img=loadImage("darksky.jpg");
  gameover_img=loadImage("gameover.png");
  
}

function setup() {
  createCanvas(1600,1600);

  sky=createSprite(800,400,1600,1600);
  sky.addImage("sky", sky_img);
  sky.scale=20;
  sky.velocityY=-5;

  superman=createSprite(750,1527,50,50);
  superman.addImage("superman", supermanstand_img);
  superman.addImage("supermanfly", supermanfly_img);
  superman.scale=0.2;

  ground=createSprite(750,1600,1600,50);
  ground.shapeColor="brown";

  supermanGroup=new Group();
  starGroup=new Group();
  asteroidGroup=new Group();

  supermanGroup.add(superman);
  
}

function draw() {
 background("black");
 if (gameState===1){
  if (keyDown("e")){
    superman.changeImage("supermanfly");
    superman.velocityY=-5;
    start=1;
  }
  if (start===1){
    spawnStars();
    spawnAsteroids();
  }
  if (superman.y<=400){
    superman.velocityY=0;
  }
  if (sky.y<0){
    sky.y=sky.height/2;
  }
  if (keyDown("d")){
    superman.velocityX=7;
  }
  if (keyDown("a")){
    superman.velocityX=-7;
  }

  if (starGroup.isTouching(superman)){
    starGroup.destroyEach();
    starcollect.play();
    score = score+1
  }

  if (asteroidGroup.isTouching(superman)){
    starGroup.destroyEach();
    gameState=0;
  }

 }else if (gameState===0){
  asteroidGroup.destroyEach();
  starGroup.destroyEach();
  supermanGroup.destroyEach();
  sky.velocityY=0;
  superman.velocityX=0;
  gameover=createSprite(700,400,50,50);
  gameover.addImage("gameover", gameover_img);
 }

  

  
  
  drawSprites();
  textSize(30); 
  fill("white");
  text("Score: "+ score, 200,100);
}

function spawnStars(){
  if (frameCount % 120 === 0) {
    star = createSprite(600,100,40,10);
   star.x = Math.round(random(400,1200));
   star.addImage("star", star_img);
   star.scale = 0.1;
   star.velocityY = 3;
   
    //assign lifetime to the variable
   star.lifetime = 520;
   
   //adjust the depth
   star.depth = superman.depth;
   superman.depth = superman.depth + 1;
   
   //add to group
   starGroup.add(star); 
}
}
function spawnAsteroids(){
  if (frameCount % 300 === 0) {
   asteroid = createSprite(600,50,40,10);
   asteroid.x = Math.round(random(400,1200));
   asteroid.addImage("asteroid", asteroid_img);
   asteroid.scale = 0.2;
   asteroid.velocityY = 5;
   
    //assign lifetime to the variable
   asteroid.lifetime = 520;
   
   //add to group
   asteroidGroup.add(asteroid); 
}
}

