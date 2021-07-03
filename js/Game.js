  class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      car1 = createSprite(150,300);
      car1.addImage(car1Img);
      car2 = createSprite(350,350);
      car2.addImage(car2Img);
  
      cars = [car1, car2];
    }
  
    play(){
      form.hide();
      spawnObstacles();
      Player.getPlayerInfo();
     
      
      if(allPlayers !== undefined){

        background(rgb(198,135,103));
        image(raceTrack, 0, -displayHeight*4, displayWidth, displayHeight*5);
        
        var index = 0;
  
        var x = 175 ;
        var y;
  
        for(var plr in allPlayers){
          index = index + 1 ;
  
          x = x + 200;
          y = displayHeight - allPlayers[plr].distance;
          cars[index-1].x = x;
          cars[index-1].y = y;
  
         
          if (index === player.index){
            
            fill("green");
            ellipse(x,y,60,60);
            camera.position.x = displayWidth/2;
            camera.position.y = cars[index-1].y;
          }
         
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
  
      if(player.distance > 3860){
        gameState = 2;
        player.rank +=1
        Player.updateCarsAtEnd(player.rank)
      }
      function spawnObstacles()
      {
        if(frameCount%80 === 0){
           obstacles = createSprite(Math.round(random(75, 400)), 0);
           obstacles.velocityY = 6;
           var rand = Math.round(random(1, 2));
        if(rand === 1){
           obstacles.addImage(cone)
        }else 
        if(rand === 2){
           obstacles.addImage(barrior)
        }
        obstacles.lifetime = 200;
        obstaclesGroup.add(obstacles);
        }
    }
      drawSprites();
    }
  
  }