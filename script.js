const moveSound=new Audio('/music/music.mp3');
// const backgroundMusic=new Audio('/music/music.mp3');
const eatfood = new Audio('/music/food.mp3');
const gameover=new Audio('/music/gameover.mp3');
let initialDire={x:0,y:0};
let score=0;
let snakeArr=[
    {
        x:3,
        y:3
    }
];
let food= {
    x:8,
    y:11
};
let laststandtime=0;

function main(ctime){
    window.requestAnimationFrame(main)
    if((ctime-laststandtime)/1000<1/5){
        return;
    }
    laststandtime=ctime
    game();
}
function isCollide(snakeArr){
    //If snake collide with itself
    for (let i = 1; i < snakeArr.length-1; i++) {
        if(snakeArr[0].x===snakeArr[i].x&&snakeArr[0].y===snakeArr[i].y){
            return true;
        }
        
    }
    //if snake collide with walls
    if(snakeArr[0].x>18||snakeArr[0].x<=0||snakeArr[0].y>18||snakeArr[0].y<=0){
        return true;
    }
    return false;
}
function game(){
    // backgroundMusic.play();

    //When snake collide then what happens
    if(isCollide(snakeArr)){
        // gameover.play();
        // backgroundMusic.pause();
        alert("Game Over...Press any key to play again!!");
        initialDire={x:0,y:0};
        snakeArr=[{x:3,y:3}];
        // backgroundMusic.play();
        score=0;
    } 
    //Updating the Snake array when eat food
    if(snakeArr[0].x===food.x&&snakeArr[0].y===food.y){
        score +=1;
        document.getElementById("printScore").innerHTML="Score :" + score;
        snakeArr.unshift({x:snakeArr[0].x+initialDire.x,y:snakeArr[0].y+initialDire.y})
        //Generating new food on random location as x and y are simply coordinates
        let a=2,b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //loop to run the snake
    for (let i = snakeArr.length-2; i>=0; i--) {
        snakeArr[i+1]={...snakeArr[i]};     
    }
    snakeArr[0].x+=initialDire.x;
    snakeArr[0].y+=initialDire.y;




    //Displaying the snake head
    gameArea.innerHTML="";
    snakeArr.forEach((ele,ind)=>{
        let snake=document.createElement('div');
        snake.style.gridRowStart=ele.y;
        snake.style.gridColumnStart=ele.x;
        if(ind==0){

            snake.classList.add('head');
        }
        else{
            snake.classList.add('snakeBody')
        }
        gameArea.appendChild(snake);
    })
    //Displaying the food
    let foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food')
    gameArea.appendChild(foodElement);


}

window.requestAnimationFrame(main);
//on pressing keys these operations performed
window.addEventListener("keydown",event=>{
    initialDire={x:0,y:1};
    moveSound.play();
    switch (event.key) {
        case "ArrowUp":
            // moveSound.play();
            initialDire.x=0;
            initialDire.y=-1;
            break;
        case "ArrowDown":
            // moveSound.play();
            initialDire.x=0;
            initialDire.y=1;
            break;
        case "ArrowLeft":
            // moveSound.play();
           initialDire.x=-1;
            initialDire.y=0;
            break; 
        case "ArrowRight":
            // moveSound.play();
            initialDire.x=1;
            initialDire.y=0;
            break;   
        default:
            break;
    }
})


