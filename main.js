// canvas setting
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, spaceImage, gameOverImage, bulletImage;
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

    bulletList.push(this);
  };

  this.update = function () {
    this.y -= 7;
  };
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

function update() {
  if (39 in keysDown) {
    // right
    spaceshipX += 5; // spaceship speed
  }

  if (37 in keysDown) {
    // left
    spaceshipX -= 5; // spaceship speed
  }

  if (spaceshipX <= 0) {
    spaceshipX = 0;
  }

  if (spaceshipX >= canvas.width - 60) {
    spaceshipX = canvas.width - 60;
  }

  // 총알의 y좌표 업데이트 하는 함수 호출
  for (let i = 0; i < bulletList.length; i++) {
    bulletList[i].update();
  }
}

// ui를 그려주는 함수만들기
function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // drawImage(image, dx, dy, dwidth, Dheight)
  ctx.drawImage(spaceImage, spaceshipX, spaceshipY);

  for (let i = 0; i < bulletList.length; i++) {
    ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
  }
}

// 이미지 호출
function main() {
  update(); // 자표 값을 업데이트하고
  render(); // 그려주고
  requestAnimationFrame(main); // 이미지를 계속 호출
}

// 함수 선언
loadImage();
setupKeyboardListener();
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
