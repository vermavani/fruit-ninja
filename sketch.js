//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife, knifeImage ;
var fruit1,fruit1Image,fruit2,fruit2Image,fruit3,fruit3Image,
    fruit4,fruit4Image;
    
var  alien1,alienImage,alien2,alien2Image;
var score = 0;

function preload(){
  //add images
  knifeImage = loadImage("knife.png");
  
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  
  alien1Image = loadImage("alien1.png");
   alien2Image = loadImage("alien2.png");
  
  knifeSound = loadSound("knifeSwoosh.mp3")
  gameSound = loadSound("gameover.mp3")
  gameoverImage = loadImage("gameover.png")

}

function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  //craeting game over image
  gameover = createSprite(290,260,20,20)
  gameover.addImage(gameoverImage)
  gameover.scale = 2.5;

  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  //score
  score=0;
  
  //create fruit and monster Group variable here
  fruitGroup = createGroup();
  monsterGroup = createGroup();
  
}

function draw() {
  background("lightblue");
  
  //play game state
  if(gameState===PLAY){
    gameover.visible = false;
    knife.visible = true;
    
    //calling fruit and monster function
    fruit();
    monster();
    
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
    
    //destroy and add score when knife touches fruits
    if(fruitGroup.isTouching(knife)){
       fruitGroup.destroyEach();
       knifeSound.play();
       score = score + 2;

     }
    
    //end the game if monster touches knife
    if (monsterGroup.isTouching(knife)){
       gameState = END;
       gameSound.play();
       monsterGroup.destroyEach();

     }
 
  }
   //gamestate end
  else if (gameState === END){
   
    gameover.visible = true;
    knife.visible = false;
  
    fruitGroup.setVelocityXEach(0);
    fruitGroup.destroyEach();
    
    monsterGroup.setVelocityXEach(0);
    monsterGroup.destroyEach();
  }
  drawSprites();
  
  //Display score
  fill("yellow");
  textSize(35);
  text("Score : "+ score,230,50);
}
//create function of fruit
function fruit(){
  
  if(frameCount % 60 === 0){
    var fruit=createSprite(600,300,10,10);
    fruit.velocityX = -(score/4 + 10);
    fruit.scale = 0.3;
    
    position = Math.round(random(1,2))
    if(position === 1){
       fruit.x = 600;
       }
    else if(position === 2){
      fruit.x = 10;
      fruit.velocityX = 8;
      fruit.setLifetime = 300;
    }
    
    var rand = Math.round(random(1,4))
    switch(rand){
      case 1: fruit.addImage(fruit1Image)
              break;
      case 2: fruit.addImage(fruit2Image)
              break;
      case 3: fruit.addImage(fruit3Image)
              break;
              default: break;
    }
    
    fruit.y = Math.round(random(50,340));
    fruit.setLifetime = 100;
    fruitGroup.add(fruit);
    
  }
  
}
//create function of monster
function monster(){

  
  if(frameCount % 140 === 0){
    
    var monster = createSprite(600,300,10,10)
    monster.velocityX = -(score/10 + 15);
    monster.scale = 0.9;
    
    position = Math.round(random(1,2))
    if(position === 1){
       monster.x = 600;
       }
    else if(position === 2){
      monster.x = 10;
      monster.velocityX = 8;
    }
    
  
  var rand = Math.round(random(1,2))
  switch (rand){
          
    case 1: monster.addImage(alien1Image);
            break;
    case 2: monster.addImage(alien2Image);
            break;   
            
            default: break;
          
          }
   
    monster.y = Math.round(random(30,340))
    monster.setLifetime = 100;
    monsterGroup.add(monster);
}

}







