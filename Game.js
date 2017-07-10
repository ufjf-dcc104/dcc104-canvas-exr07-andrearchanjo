var canvas;
var ctx;
var map;
var pc;
var dt;
var images;
var anterior = 0;
var frame = 0;
var i = 1;//posiçao inicial em relação à cells (2)
var j = 1;//posiçao inicial em relação à cells (2)
var subirLevel = false;
var level = 1;
var totalLevel = 2;
var life = 130;

function init(){
  canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 580;
  canvas.height = 580;
  ctx = canvas.getContext("2d");
  images = new ImageLoader();
  images.load("pc","pc.png");
  images.load("mina", "mina.png");
  images.load("tesouro", "tesouro.png");
  map = new Map(Math.floor(canvas.height/40), Math.floor(canvas.width/40));
  map.images = images;
  map.setRandom([
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,3,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
  ]);
  pc = new Sprite();
  pc.y = (i+0.5)*map.SIZE;
  pc.x = (j+0.5)*map.SIZE;
  pc.images = images;
  initControls();
  requestAnimationFrame(passo);
}

function passo(t){
  if(level != totalLevel){
    if(subirLevel){
      init();
      subirLevel = false;
    }
    if(life >=0){
      dt = (t-anterior)/1000;
      requestAnimationFrame(passo);
  
      ctx.clearRect(0,0, canvas.width, canvas.height);

      life = life - dt*5;

      pc.mover(map, dt);

      map.desenhar(ctx, images);
      pc.desenhar(ctx);

      showInformation(ctx);

      anterior = t;
      //ctx.restore();
      frame = (frame<9)?frame:1;
      //images.drawFrame(ctx,"pc",8,Math.floor(frame),0,0,64);
      frame+=2*dt;
    } else {
      ctx.clearRect(0,0, canvas.width, canvas.height);
      ctx.font = "15px Arial";
      ctx.fillStyle = "Black";
      ctx.fillText("Você perdeu!", 250, 250);
    }
  }else {
    ctx.clearRect(0,0, canvas.width, canvas.height);
      ctx.font = "15px Arial";
      ctx.fillStyle = "Black";
      ctx.fillText("Você venceu!", 250, 250);
  }
}

function showInformation(ctx){
  
  if(life >= 0){
    ctx.font = "15px Arial";
    ctx.fillStyle = "Blue";
    ctx.fillText("Life", 440, 15);
    ctx.fillStyle = "Orange";
    ctx.fillRect(440, 20, life, 10);
    ctx.strokeRect(440, 20, life, 10);
  }
}

function initControls(){
  addEventListener('keydown', function(e){
    switch (e.keyCode) {
      case 37: //esquerda
        pc.vx = -100;
        pc.vy = 0;
        pc.pose = 2;
        e.preventDefault();
        break;
      case 38: //cima
        pc.vx = 0;
        pc.vy = -100;
        pc.pose = 3;
        e.preventDefault();
        break;
      case 39: //direita
        pc.vx = 100;
        pc.vy = 0;
        pc.pose = 0;
        e.preventDefault();
        break;
      case 40: //baixo
        pc.vx = 0;
        pc.vy = 100;
        pc.pose = 1;
        e.preventDefault();
        break;
      default:

    }
  });
  addEventListener('keyup', function(e){
    switch (e.keyCode) {
      case 37: //esquerda
        pc.vx = 0;
        pc.pose = 6;
        break;
      case 38: //cima
        pc.vy = 0;
        pc.pose = 7;
        break;
      case 39: //direita
        pc.vx = 0;
        pc.pose = 4;
        break;
      case 40: //baixo
        pc.vy = 0;
        pc.pose = 5;
        break;
      default:

    }
  });
}
