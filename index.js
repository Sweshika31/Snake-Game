//Game constants and variables

let inputDir={x:0, y:0};
const foodSound=new Audio('datafiles/food.mp3');
const musicSound=new Audio("datafiles/music.mp3");
const moveSound=new Audio('datafiles/move.wav');
const gameOverSound= new Audio('datafiles/gameover.wav');

let speed=9;
let lastPaintTime=0;
let score=0;

let snakeArr=[
    {x:3, y:5}
]
food={x:8, y:3};


//Game function

function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    
    gameEngine();
}

function isCollide(snake){
    //if snake bumps into itself

    for(let i=1; i<snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }

    // if snake bumps into the wall
    if(snake[0].x>=20 || snake[0].x<=0 || snake[0].y>=20 || snake[0].y<=0){
        return true;
     }
    
}

function gameEngine(){
    musicSound.play();
    //part 1 updating the snake array and food

    if(isCollide(snakeArr)){
        musicSound.pause();
        gameOverSound.play();    
        inputDir={x:0, y:0};
        alert("Game Over!! . Press any Key to Restart.");
        snakeArr=[{x:3, y:5}];
        // musicSound.play();
        score=0;
    }

    // if snake ate the food, increment the score and regenerate the food

    if(snakeArr[0].y===food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score+=1;
        if (score>highscoreval){
            highscoreval=score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highScoreBox.innerHTML="High Score: "+ highscoreval;
        }
        scoreBox.innerHTML="Your Score:"+score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
        let a= 1;
        let b= 18;
        food={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }

    // moving the snake

    for(let i=snakeArr.length-2; i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;

    //part 2 display snake and food

    //display the snake

    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index ===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //display the food

    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}




//main logic starts here

let highscore=localStorage.getItem("highscore");
if(highscore ===null){
    highscoreval=0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
}
else{
    highscoreval=JSON.parse(highscore);
    highScoreBox.innerHTML="High Score: "+ highscoreval;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0, y:1} //start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
            break;

        default:
            break;
    }
})