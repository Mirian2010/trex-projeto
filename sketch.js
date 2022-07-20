var PLAY = 1
var END = 0
var gamestate = PLAY
var trex, trex_running, edges;
var groundImage;
var solo;
var soloinvisível
var grupocactos
var gruponuvens
var pontos=0

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  nuvemimg = loadImage("cloud.png")
  cacto1 = loadImage("obstacle1.png")
  cacto2 = loadImage("obstacle2.png")
  cacto3 = loadImage("obstacle3.png")
  cacto4 = loadImage("obstacle4.png")
  cacto5 = loadImage("obstacle5.png")
  cacto6 = loadImage("obstacle6.png")
  trex_colidiu = loadImage("trex_collided.png")
  gameoverimg = loadImage("gameOver.png")
  restart = loadImage("restart.png")
  sompulo = loadSound("jump.mp3")
  somcheckpoint = loadSound("checkpoint.mp3")
  sommorte = loadSound("die.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  

  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("colidiu", trex_colidiu)
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  trex.setCollider("circle",5,10,40)
  trex.debug = false
  solo = createSprite(200,height-20,400,20)
  
  solo.addImage("solo",groundImage)

  soloinvisível = createSprite(200,height-10,400,20)
  soloinvisível.visible = false
  grupocactos = new Group()
  gruponuvens = new Group()
  gameover = createSprite(width/2,height/2)
  gameover.addImage(gameoverimg)
  recomeçar = createSprite(width/2,height/2+40)
  recomeçar.addImage(restart)
  recomeçar.scale = 0.5
}


function draw(){
  //definir a cor do plano de fundo 
  background(180);
  text("pontuação: "+ pontos, 500,50)
  if (gamestate === PLAY){
    gameover.visible = false
    recomeçar.visible = false
    solo.velocityX = -2
    pontos= pontos + Math.round(frameCount/60)
    if(keyDown("space") && trex.y>=160){
      trex.velocityY = -10;
      sompulo.play()
      
    }
    gerarnuvem()
      gerarcactos()
    trex.velocityY = trex.velocityY + 0.5;
    if(grupocactos.isTouching(trex)){
      gamestate = END
      sommorte.play()
    }
  }
  else if(gamestate === END){
    gameover.visible = true
    recomeçar.visible = true
    solo.velocityX = 0
    trex.velocityY = 0
    trex.changeAnimation("colidiu", trex_colidiu)
    grupocactos.setVelocityXEach(0)
    gruponuvens.setVelocityXEach(0)
    gruponuvens.setLifetimeEach(-1)
  }
  
  if (solo.x<0){
    solo.x = solo.width/2
  }
  //registrando a posição y do trex
  
  
  //pular quando tecla de espaço for pressionada
  
  
 //impedir que o trex caia
 if(mousePressedOver(recomeçar)){
 console.log("reiniciar o jogo")
 reset()
 }

  trex.collide(soloinvisível)
  drawSprites();
}
function reset(){
  gamestate = PLAY
  grupocactos.destroyEach()
  gruponuvens.destroyEach()
  pontos=0
  gameover.visible = false
  recomeçar.visible = false
  trex.changeAnimation("running", trex_running)
}
function gerarnuvem(){
  if (frameCount %60 ===0){
    nuvem = createSprite(width+20,height/2,40,10)
    nuvem.velocityX = -5 
    nuvem.addImage(nuvemimg)  
    nuvem.scale = 0.4
    nuvem.y = Math.round(random(10,80))
    console.log(trex.depth)
    console.log(nuvem.depth)
    nuvem.depth = trex.depth
    trex.depth = trex.depth+1
    nuvem.lifetime = 200
    gruponuvens.add(nuvem)
  }
 
}
function gerarcactos(){
  if (frameCount %60 ===0){
    cacto = createSprite(width,height-35,10,40)
  cacto.velocityX = -6
  var rand = Math.round(random(1,6))
  switch(rand){
    case 1: cacto.addImage(cacto1)
    break
    case 2: cacto.addImage(cacto2)
    break
    case 3: cacto.addImage(cacto3)
    break
    case 4: cacto.addImage(cacto4)
    break
    case 5: cacto.addImage(cacto5)
    break
    case 6: cacto.addImage(cacto6)
    break
    default:break
  }
  cacto.scale = 0.8
  grupocactos.add(cacto)
  }
  
}