const gameboard = document.getElementById('gameboard');
const context = gameboard.getContext('2d');
const scoretext = document.getElementById('scoreVal');
const Width=gameboard.width;
const Height=gameboard.height;
const Food=20;
let foodx;
let foody;
let xvel=20;
let yvel=0;
let score=0;
let active=true;
let snake = [{x:Food*3,y:0},{x:Food*2,y:0},
    {x:Food*1,y:0},
    {x:Food,y:0},
    {x:0,y:0}
];
window.addEventListener('keydown',keypress)
startGame();
function startGame(){
    context.fillStyle = '#212121';
    // fillRect(xStart,yStart,width,height)
    context.fillRect(0,0,Width,Height);
    createFood();
    displayFood();
     drawSnake();
    // moveSnake();
    // clearBoard();
    // drawSnake();
    nextTick();
}
function clearBoard(){
    context.fillStyle = '#212121';
     context.fillRect(0,0,Width,Height);
}
function createFood(){
foodx=Math.floor(Math.random()*Width/Food)*Food;
foody=Math.floor(Math.random()*Height/Food)*Food;
}
function displayFood(){
    //  context.beginPath();
//   context.arc(10, 10, 10, 1, Math.PI * 2); // x=100, y=100, radius=50
//   context.fillStyle = '#ff5722'; // Orange color
//   context.fill(); // Fill the circle
//   context.closePath();
  context.fillStyle="red";
  context.fillRect(foodx,foody,Food,Food);  
}
function drawSnake(){
    context.fillStyle="yellow";
    context.strokeStyle="black";
    snake.forEach((snakepar)=>{
        context.fillRect(snakepar.x,snakepar.y,Food,Food);
        context.strokeRect(snakepar.x,snakepar.y,Food,Food);
    })
}
function moveSnake(){
    const head={
        x:snake[0].x+xvel,y:snake[0].y+yvel
    }
    snake.unshift(head);
    if(snake[0].x==foodx && snake[0].y==foody){
        score +=1;
        scoretext.textContent=score;
        createFood();
    }
    else
    snake.pop();
}
function nextTick(){
    if(active){
    setTimeout(()=>{
clearBoard();
displayFood();
moveSnake();
drawSnake();
checkGameOver();
nextTick();
    },200);
}
else{
    clearBoard();
    context.font="bold 50px serif";
    context.fillStyle="white";
    context.textAlign="center";
    context.fillText("Game Over!!",Width/2,Height/2);
    
}
}
function keypress(event){
    active=true;
    const left=37;
    const up=38;
    const right=39;
    const down=40;
    switch(true){
        case(event.keyCode==left && xvel!=Food):
        xvel=-Food;
        yvel=0;
        break;
        case(event.keyCode==right && xvel!=-Food):
        xvel=Food;
        yvel=0;
        break;
        case(event.keyCode==up && yvel!=Food):
        xvel=0;
        yvel=-Food;
        break;
        case(event.keyCode==down && yvel!=-Food):
        xvel=0;
        yvel=Food;
        break;
    }
}
function checkGameOver(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=Width):
        case(snake[0].y<0):
        case(snake[0].y>=Height):
        active=false;
        break;
    }
}