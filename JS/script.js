const play = document.querySelector(".play");
const pause = document.querySelector(".pause");
const up = document.querySelector(".up");
const down = document.querySelector(".down");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const canvas = document.querySelector(".board");
const ctx = canvas.getContext("2d");

let scale = 14;
let row = canvas.width/scale;
let col = canvas.height/scale;

let direction = "right";
let enterCount = true;

let score = 0;    
let snake = [];
snake[0]={
  x:Math.floor(Math.random()*row)*scale,
  y:Math.floor(Math.random()*col)*scale
};

let food ={
    x:Math.floor(Math.random()*row)*scale,
    y:Math.floor(Math.random()*col)*scale
  };

ctx.fillStyle= "#f00";
ctx.strokeStyle= "#300";
ctx.fillRect(150,160,scale,scale);
ctx.strokeRect(150,160,scale,scale);
ctx.fillStyle= "#0d0";
  ctx.strokeStyle= "#030";
ctx.fillRect(180,160,scale,scale);
ctx.strokeRect(180,160,scale,scale);

up.addEventListener("click",() =>{
  if(direction != "down") direction = "up";
});
down.addEventListener("click",() =>{
  if(direction != "up")  direction = "down";
});
left.addEventListener("click",() =>{
  if(direction != "right")  direction = "left";
});
right.addEventListener("click",() =>{
  if(direction != "left") direction = "right";
});

let illusion ;
document.onkeydown= (event) =>{
  if(event.key=="ArrowUp" && direction != "down"){
    direction = "up";
  }else if(event.key=="ArrowDown" && direction != "up"){
    direction = "down";
  }else if(event.key=="ArrowLeft" && direction != "right"){
    direction = "left";
  }else if(event.key=="ArrowRight" && direction != "left"){
    direction = "right";
  }else if(event.key == "Enter"){
    if(enterCount){
      enterCount = false;
      play.style.visibility="hidden";
      pause.style.visibility="visible";
    illusion = setInterval(moveSnake,100);
  }
  }else if(event.key == " "){
    clearInterval(illusion);
    enterCount = true;
    play.style.visibility="visible";
    pause.style.visibility="hidden";
  }
};

function moveSnake(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let i=0;i<snake.length;i++){
    ctx.fillStyle= "#f00";
    ctx.strokeStyle= "#300";
    ctx.fillRect(snake[i].x,snake[i].y,scale,scale);
    ctx.strokeRect(snake[i].x,snake[i].y,scale,scale);
  }
  ctx.fillStyle= "#0d0";
  ctx.strokeStyle= "#030";
  ctx.fillRect(food.x,food.y,scale,scale);
  ctx.strokeRect(food.x,food.y,scale,scale);
  let newX = snake[0].x;
  let newY = snake[0].y;
  switch(direction){
    case "up":
      newY-=14;
      break;
    case "down":
      newY+=14
      break;
    case "left":
      newX-=14;
      break;
    case "right":
      newX+=14;
      break;
    default:
      console.log("do nothing!")
  }
  if(newX>canvas.width-14){
    newX = 0;
  }
  if(newY>canvas.height-14){
    newY = 0;
  }
  if(newX<0){
    newX= canvas.width;
  }
  if(newY<0){
    newY = canvas.height;
  }

  let newSnake = {
    x: newX,
    y: newY
  }

  if(snake[0].x==food.x && snake[0].y==food.y){
    score+=1;
    food={
      x:Math.floor(Math.random()*row)*scale,
      y:Math.floor(Math.random()*col)*scale
    }
  }else{
    snake.pop();
  }  

  for(let i=0;i<snake.length;i++){
    if(newSnake.x == snake[i].x && newSnake.y == snake[i].y){
      clearInterval(illusion);
      gameOver();
    }
  }
  snake.unshift(newSnake);
  }

  function gameOver(){
    const game_over = document.querySelector(".gameOver");
    const score_append = document.querySelector(".score");
    let score_ele = document.createElement("h2");
    score_ele.textContent = "- "+score;
    score_append.appendChild(score_ele);
    game_over.style.visibility = "visible";
  }

  function reloader(){
    window.location.reload();
  }

  play.addEventListener("click",() =>{
    enterCount = false;
    play.style.visibility="hidden";
    pause.style.visibility="visible";
    illusion = setInterval(moveSnake,100);
  });

  pause.addEventListener("click",() =>{
    clearInterval(illusion);
    enterCount = true;
    play.style.visibility="visible";
    pause.style.visibility="hidden";
  });