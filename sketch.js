var player,playerWalking,playerAttack,playerIdle,badGuy1,badGuy2,badGuy3,badGuyIMG,badGuyIMGRev;
var bg,bgImage;
var block,blockIMG;
var gameState = "play";
var block1, block2, block3, block4,block5,block6,block7,blockIMG;
var map1, map2, map3, endprize;
var mapCount = 0;
var Chest,chestIMG,openChest;
var mapIMG;

function preload(){
  bgImage = loadImage("bg.jpg");
  /*playerWalking = loadAnimation("goodguywalk/goodguywalk1.png","goodguywalk/goodguywalk2.png","goodguywalk/goodguywalk3.png","goodguywalk/goodguywalk4.png"
  ,"goodguywalk/goodguywalk5.png","goodguywalk/goodguywalk6.png","goodguywalk/goodguywalk7.png","goodguywalk/goodguywalk8.png","goodguywalk/goodguywalk9.png","goodguywalk/goodguywalk10.png");*/
  //playerWalking = loadAnimation("goodguywalk/goodguywalk1.png");

  playerWalking = loadAnimation("goodguywalk/goodguywalk2.png","goodguywalk/goodguywalk3.png","goodguywalk/goodguywalk4.png");
  reverse_playerWalking = loadAnimation("goodguywalk/reverse_goodguywalk2.png","goodguywalk/reverse_goodguywalk3.png","goodguywalk/reverse_goodguywalk4.png")

  chestIMG = loadAnimation("TreasureChestclosed.png");
  openChest = loadAnimation("TreasureChestopen.png");
  mapIMG = loadImage("map.png");
  blockIMG = loadImage("grassIMG.png");
  playerIdle = loadAnimation("goodguywalk/playeridle.png");
  badGuyIMG = loadImage("BadGuyIMG.png");
}


function setup(){
  createCanvas(displayWidth,displayHeight-111);
  bg = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
  bg.addImage(bgImage);
  bg.scale = 5;
 
  
  player = createSprite(200,200,20,20);
  player.addAnimation("walking",playerWalking);

  badGuy1 = createSprite(160,340,10,10);
  badGuy1.addImage(badGuyIMG);
  badGuy2 = createSprite(470,140,10,10);
  badGuy2.addImage(badGuyIMG);
  badGuy3 = createSprite(750,540,10,10);
  badGuy3.addImage(badGuyIMG);

  
  spawnBlocks();
  //block = createSprite(200,250,50,50);

  map1 = createSprite(120,340,10,10);
  map1.shapeColor = "red";
  map1.addImage(mapIMG);
  map1.scale = 0.07;

  map2 = createSprite(525,140,10,10);
  map2.shapeColor = "red";
  map2.addImage(mapIMG);
  map2.scale = 0.07;
  
  map3 = createSprite(800,540,10,10);
  map3.shapeColor = "red";
  map3.addImage(mapIMG);
  map3.scale = 0.07;

  Chest = createSprite(1570,246,20,20);
  //Chest.addAnimation("Closedchest",chestIMG);
  Chest.addAnimation("chestIMG",chestIMG)
  Chest.scale = 0.3;
  Chest.addAnimation("openChest",openChest);
}



function draw(){
  if(gameState === "play"){
      background(0);
     player.addAnimation("idle",playerIdle)
     player.addAnimation("reverse_walking",reverse_playerWalking)
      player.setVelocity(0,0);
      if(player.velocityX==0){
        player.changeAnimation("idle",playerIdle)
      }
      
        
      if(player.isTouching(map1)){
        console.log("Touching map1");
        map1.destroy();
        mapCount++
      }

      if(player.isTouching(map2)){
        console.log("Touching map2");
        map2.destroy();
        mapCount++
      }

      if(player.isTouching(map3)){
        console.log("Touching map3");
        map3.destroy();
        mapCount++
      }
  
      bg.velocityX = -3;

     if(bg.x<350){
      bg.x = displayWidth/2;
    }
    
  

      if(keyDown("D")){
        player.velocityX = 3;  
        player.changeAnimation("walking",playerWalking)   
        player.scale = 0.9
        
      }
  
      if(keyDown("A")){
        player.velocityX = -3;
        player.changeAnimation("reverse_walking",reverse_playerWalking) 
        player.scale = 0.9
        
       
      }
      if(keyDown("space")){
        player.velocityX=0;
        
      }
      if(keyDown("W")){
        player.velocityY = -12;
        
      }
      player.velocityY = player.velocityY+3.5;
        
      if(gameState=="moving"){
        player.addAnimation("Walking",playerWalking);
        player.changeAnimation("Walking",playerWalking);
      }
      

      player.collide(block1);
      player.collide(block_1_2);
      player.collide(block2);
      player.collide(block3);
      player.collide(block4);
      player.collide(block5);
      player.collide(block6);
      player.collide(block7);

    if(player.y>950||player.isTouching(Chest)){
      gameState = "end";
      Chest.changeAnimation("openChest",openChest);
    }
    drawSprites();
    text(mouseX+","+mouseY, 20, 20);
    textSize(30);
    text("Map Count:"+mapCount,1672, 62);
  }
  if(gameState ==="end"){
     if(player.y>950 || (player.isTouching(Chest)&&mapCount < 3)){
        background(0);
        fill("white");
        text("Game Over",500,500);
        text("Better luck next time!", 500, 550);
        text("Press R To Restart",900,480);
      }else if(player.isTouching(Chest)&&mapCount === 3){
        console.log("Player Won")
        background(255);
        textSize(40);
        fill("Black");
        stroke("Red");
        strokeWeight(5);
        text("Winner",900,440);
        text("Press R To Restart",900,480);
      } 
      
    }
    if(keyDown("r")){
      gameState = "play";
      mapCount = 0;
      player.x = 200;
      player.y = 200;

    }
  }

  function spawnBlocks(){
    block1 = createSprite(60, 250, -250, 50);
    block1.addImage(blockIMG);
    block1.scale = 0.2;
    block_1_2 = createSprite(130,250,-250,50);
    block_1_2.addImage(blockIMG);
    block_1_2.scale = 0.2;
    block2 = createSprite(350, 300, 50, 50);
    block2.addImage(blockIMG);
    block2.scale = 0.2;
    block3 = createSprite(150, 400, 150, 50);
    block3.addImage(blockIMG);
    block3.scale = 0.2;
    block4 = createSprite(500, 200, 150, 50);
    block4.addImage(blockIMG);
    block4.scale = 0.2;
    block5 = createSprite(800, 600, 150, 50);
    block5.addImage(blockIMG);
    block5.scale = 0.2;
    block6 = createSprite(1242, 457, 150, 50);
    block6.addImage(blockIMG);
    block6.scale = 0.2;
    block7 = createSprite(1570, 325, 150, 50);
    block7.addImage(blockIMG);
    block7.scale = 0.2;
    
  }