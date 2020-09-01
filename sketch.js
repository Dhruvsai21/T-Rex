var trexRun, trex, ground1, ground, inviground, gameState, PLAY, END, obstacleGroup, cloudGroup, cloud, cloud9, score1, obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, rand, score, PLAY, END, gameState, trexDead, gameDone, resButton, gameOver, restart; 

function preload()
{
  trexRun = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  ground = loadImage("ground2.png");
  cloud = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  trexDead = loadAnimation("trex_collided.png");
  gameDone = loadImage("gameOver.png");
  resButton = loadImage("restart.png");
}
function setup() {
  
createCanvas(600,200);

  trex = createSprite(50,180,20,50);
  trex.addAnimation("running",trexRun);
  trex.addAnimation("collided", trexDead);
  trex.scale = 0.5;
  ground1 = createSprite(200,180,400,20);
  ground1.addImage("movGround", ground);
  //ground.x= ground.width/2;
  //ground.velocityX = -3;
  inviground = createSprite(200,195,400,10);
  inviground.visible = false;
  cloudGroup = createGroup();
  obstacleGroup = createGroup();
  score = 0;
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  gameOver = createSprite(300,100,20,20);
  gameOver.addImage("gameIsDone", gameDone);
  gameOver.scale = 0.5
  gameOver.visible = false;
  restart = createSprite(300,130,20,20);
  restart.addImage("restartButton", resButton);
  restart.scale = 0.5;
  restart.visible = false;
  
}

function draw() 
{  
 
  background(180);
  
 
  
  text("SCORE:" + score, 500,50)
  
 // trex.collide(inviground);
  
  if (gameState === PLAY)
  {
  if((keyDown("space")) && (trex.y>=160))
    {
  trex.velocityY = -13;
    }
  
  trex.velocityY = trex.velocityY + 0.8;
  
   score = score+Math.round(getFrameRate()/60);
  
  ground1.velocityX = -6;
  if (ground1.x<0)
    {
  ground1.x= ground1.width/2;
    }
    
    
    if(obstacleGroup.isTouching(trex))
    {
     gameState = END;
    }
  
  }  else if(gameState === END)
  {
    
    gameOver.visible = true;
    restart.visible = true;
    
    trex.velocityY = 0;
    ground1.velocityX = 0;
    
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    trex.changeAnimation("collided", trexDead);
    
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
   
    if (mousePressedOver(restart))
    {
     reset();
    }
  }
  
  
  
  spawnClouds();
  spawnObstacles();
  drawSprites();
}

function reset()
{
  gameState = PLAY;
  score = 0;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
  trex.changeAnimation("running", trexRun);
}

function spawnClouds()
{
  if(frameCount % 60 === 0)
  {
  cloud9 = createSprite(700,150,20,20);
  cloud9.addImage("movcloud", cloud);
  cloud9.velocityX = -5;
  cloud9.y = Math.round(random(35,120));
  cloud9.lifetime = 150;
  cloud9.scale = 0.5;  
  cloud9.depth = trex.depth;
  trex.depth = trex.depth+1;
  cloudGroup.add(cloud9);
  }
}  

function spawnObstacles()
{
    if(frameCount % 60 === 0)
  {
  obstacle = createSprite(700,170,20,20);
  //obstacle.addImage("movobstacle", obstacle);
   rand = Math.round(random(1,6)); 
    
    switch(rand)
    {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;        
      
      default : break;        
    }
    
    
    
  obstacle.velocityX = -(6 + (score/100*2));
 
  obstacle.lifetime = 150;
  obstacle.scale = 0.5;  
  
  obstacleGroup.add(obstacle);
  }
}


