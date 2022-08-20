
// canvas setting
let canvas;
let ctx;
canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas);

let backgroundImage, spaceImage, gameOverImage
let spaceshipX = canvas.width/2-30 // 우주선 좌표 X
let spaceshipY = canvas.height-60 // 우주선 좌표 Y

function loadImage(){
    backgroundImage = new Image();
    backgroundImage.src = "Images/background.jpg"

    spaceImage = new Image();
    spaceImage.src = "images/spaceship.png"

    gameOverImage = new Image();
    gameOverImage.src = "Images/bullet.jpg"
}

// ui를 그려주는 함수만들기
function render(){
    ctx.drawImage(backgroundImage,0,0,canvas.width,canvas.height); // drawImage(image, dx, dy, dwidth, Dheight)
    ctx.drawImage(spaceImage,spaceshipX,spaceshipY); 


}

// 이미지 호출
function main(){
    render()
    requestAnimationFrame(main) // 이미지를 계속 호출
}

loadImage();
main();