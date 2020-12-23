
var PLAY = 1;
var END = 0;
var gameState = PLAY;
      
var ground,groundImage,invisibleGround;
var monkey , monkeyImage;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;

var score = 0;
var count = 0;
function preload(){
  //load images
monkeyImage =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  groundImage = loadImage("jungle.jpg")
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);

 //to create ground
  ground = createSprite(500,190,400,10);
  ground.velocityX = -3;
  ground.addImage(groundImage);
  ground.x = ground.width/2;
  ground.visible = "false";
  
  //to create monkey
  monkey = createSprite(width/3.5,height-400,20,20);
  monkey.addAnimation("moving",monkeyImage);
  monkey.scale = 0.2;
  
  //to create invisible ground
  invisibleGround = createSprite(width/2,height-80,width,195);
  invisibleGround.visible = false;
  //to create generate the radmon number
  
  
  //to create groups
  FoodGroup = new Group;
  obstacleGroup = new Group;
  
  monkey.debug=true;
}


function draw() {
background(225);
   
  if(gameState === PLAY){
    
    //to repeat the background
  if (ground.x < 250){
    ground.x = ground.width/2;
  }
   
  //when the space key is pressed the monkey should jump
  if(keyDown("space")&& monkey.y > 159){
    monkey.velocityY = -12;
}
  
  //add gravity to monkey
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //monkey should on ground
  monkey.collide(invisibleGround);
   food();
  obstacles(); 
  
  //when food group is touching the size should increase
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score + 2 ;
    switch(score){
      case 10 : monkey.scale = 0.12;
                break;
      case 20 : monkey.scale = 0.14;
                break;
      case 30 : monkey.scale = 0.16;
                break;
      case 40 : monkey.scale = 0.20;
                break;
                default: break;
    }
  } 
  
  
  //when obstacle group is touching the size should decrease
  if(obstacleGroup.isTouching(monkey)){
    
    monkey.scale = 0.1;
    count = count+1;
  }
  if(count>1 && monkey.scale === 0.1){
     
   gameState=END;
  }
    
}
  
  else if(gameState === END){
    monkey.velocityX = 0;
    ground.velocityX = 0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
   
  } 
  //to draw sprites
  drawSprites();
  
 //to create score
  stroke("white");
  textSize(30);
  fill("white");
  text("score:"+score,width-150,50)
   //calling obstacles and food 
  
  
  
}
  
  
  


function food(){
  if(frameCount % 80 === 0){
    //banana.y = Math.round(random(120,200));
    banana = createSprite(400,150,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 110;
    
    FoodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount % 300 === 0){
  obstacle = createSprite(700,400,20,20);
  obstacle.addImage(obstaceImage);
  obstacle.scale = 0.2;
  obstacle.velocityX = -3;
  obstacle.lifetime = 150;
  
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
  obstacleGroup.add(obstacle);
  }
}

