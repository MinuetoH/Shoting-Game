// canvas setting
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, spaceImage, gameOverImage, bulletImage, enemyImage;
let gameOver = false; // true이면 게임이 끝
let score= 0;

let spaceshipX = canvas.width / 2 - 30; // 우주선 좌표 X
let spaceshipY = canvas.height - 60; // 우주선 좌표 Y

let bulletList = []; // 총알들을 저장하는 리스트
function Bullet() {
  // 총알의 정의
  this.x = 0;
  this.y = 0;

  this.init = function () {
    this.x = spaceshipX + 18;
    this.y = spaceshipY;
    this.alive=true;  // true : 살아있음

    bulletList.push(this);
  };

  this.update = function () {
    this.y -= 7;        // 총알이 나가는 속도
  };

  this.checkHit = function(){
    for(let i=0; i < enemyList.length; i++){
      if(this.y <= enemyList[i].y && this.x >= enemyList[i].x-18 && this.x <= enemyList[i].x+60){
        //총알에 죽데되면 적군의 우주선이 없어지고 점수 획득
        score++; 
        this.alive=false; //죽은 총알
        enemyList.splice(i,1);  //우주선 잘라내기

      }
    }
    
  } 
}

function generateRandomValue(min,max){
  let randomNum = Math.floor(Math.random()*(max-min+1))+min;
  return randomNum;
}

let enemyList = [];
function Enemy(){
  this.x = 0;
  this.y = 0;
  this.init = function(){
    this.y = 0;
    this.x = generateRandomValue(0,canvas.width-60);
    enemyList.push(this);
  }
  this.update = function(){
    this.y += 2;    //적군의 속도 조절

    if(this.y >= canvas.height-60){
      gameOver = true;
    }
  }
}

function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "Images/background.jpg";

  spaceImage = new Image();
  spaceImage.src = "images/spaceship.png";

  gameOverImage = new Image();
  gameOverImage.src = "Images/gameover.jpg";

  bulletImage = new Image();
  bulletImage.src = "Images/bullet.png";

  enemyImage = new Image();
  enemyImage.src = "Images/enemyship.png";
}

// 키 동작
let keysDown = {};
function setupKeyboardListener() {
  document.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true;
  });
  document.addEventListener("keyup", function () {
    delete keysDown[event.keyCode];

    if (event.keyCode == 32) {
      createBullet();
    }
  });
}

// 총알 생성
function createBullet() {
  console.log("총알 생성");
  let b = new Bullet(); // 총알 한발 생성
  b.init();
  console.log("새로운 총알 리스트", bulletList);
}

// 적군 생성
function createEnemy(){
  const interval = setInterval(function(){  //(호출하고 싶은 함수, 1초마다)
    let e = new Enemy();
    e.init();
  },1000) 
}

function update() {
  if (39 in keysDown) {
    // right
    spaceshipX += 5; // spaceship speed
  }

  if (37 in keysDown) {
    // left
    spaceshipX -= 5; // spaceship speed
  }

  if (spaceshipX <= 0) {    spaceshipX = 0;
  }

  if (spaceshipX >= canvas.width - 60) {
    spaceshipX = canvas.width - 60;
  }

  // 총알의 y좌표 업데이트 하는 함수 호출
  for (let i = 0; i < bulletList.length; i++) {
    if(bulletList[i].alive){
      bulletList[i].update();
      bulletList[i].checkHit();
    }
    
  }
  
  // 적군의 y좌표
  for(let i = 0; i < enemyList.length; i++){
    enemyList[i].update();
  }
}

// ui를 그려주는 함수만들기
function render() {
   // drawImage(image, dx, dy, dwidth, Dheight)
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceImage, spaceshipX, spaceshipY);
  ctx.fillText(`Score:${score}`,20,20);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
    

  for (let i = 0; i < bulletList.length; i++) {
    if(bulletList[i].alive){
      ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
   }
 }

  for(let i = 0; i < enemyList.length; i++) {
    ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
  }
}

// 이미지 호출
function main() {
  if(!gameOver){
    update(); // 자표 값을 업데이트하고
    render(); // 그려주고
    requestAnimationFrame(main); // 이미지를 계속 호출
  }
  else{
    ctx.drawImage(gameOverImage,10,100,380,380);
  }
    
}

// 함수 선언
loadImage();
setupKeyboardListener();
createEnemy();
main();

// 방향키를 누르면
// 우주선의 x,y 자표가 바뀌고
// 다시 render 그려준다.

// 총알 만들기
// 1. 키 버튼 누르면 촐알 발사
// 2. 총알 발사 = 총알의 y값이 --, x값은? 키 버튼을 누른 순간의 우주선 x자표
// 3. 발사된 총알들은 총알 배열에 저장한다.
// 4. 모든 총알들은 x,y, 좌표값이 잇어야한다.
// 5. 총알 배열을 가지고 render 그려준다.

// 적군 만들기
// x, y, init, update
// 적군은 위치가 랜덤하다.
// 적군은 밑으로 내려온다. y좌표가 증가한다.
// 1초마다 하나씩 생성된다.
// 적군과 총알이 만나면 우주선이 사라진다. 점수 1점 획득

// 적군이 죽는다.
// 적군이 총알에 닿는다.  총알.y <= 적군.y and 총알.x >= 적군.x and 총알.x <= 적군.x+60 (=닿는다)






















