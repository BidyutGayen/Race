const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
let player = {speed : 5, score:0};

let keys = { ArrowUp : false, ArrowDown : false, ArrowRight : false,ArrowLeft : false}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e){
    keys[e.key] = true;
    e.preventDefault();
      
}

function keyUp(e){
    keys[e.key] = false;
    e.preventDefault();
    
}

 
let car = document.createElement('div');

function isCollide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right)) ;   

}

function moveLines(){
let lines = document.querySelectorAll('.lines');
lines.forEach(function(item){

if(item.y >= 800){
    item.y -= 850;
}

item.y += player.speed;
item.style.top = item.y+ "px";
})

}

function endgame(){
    player.start=false;
    startScreen.classList.remove('hide');
    gameArea.innerHTML="";
    gameArea.classList.add('hide');
   
    
}

function moveEnemy(car){
let enemy = document.querySelectorAll('.enemy');
enemy.forEach(function(item){

if(isCollide(car, item)){
  endgame();
    
}

if(item.y >= 800){
    item.y -= 850;
    item.style.left = Math.floor(Math.random()*350)+"px";
}

item.y += player.speed;
item.style.top = item.y+ "px";
})

}

function gamePlay(){
    let road = gameArea.getBoundingClientRect();

    if(player.start){

       // moveLines();
       // moveEnemy(car);
      // moveLines();
        if(keys.ArrowUp && player.y > (road.top + 100) ){player.y-=player.speed}
        if(keys.ArrowDown && player.y < (road.bottom - 100)){player.y+=player.speed}
        if(keys.ArrowLeft && player.x>0){player.x-=player.speed}
        if(keys.ArrowRight && player.x < (road.width - 50) ){player.x+=player.speed}
        
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        // window.requestAnimationFrame(gamePlay);
        player.score++;
        score.innerHTML = "Score = " + player.score;
      // moveEnemy(car);
      //  moveLines();
      
        window.requestAnimationFrame(gamePlay);
       moveLines();
       moveEnemy(car);
    }
}

function start(){
    gameArea.classList.remove('hide');
    startScreen.classList.add('hide');

    gameArea.innerHTML="";

                for(let x=0;x<5;x++){
    let roadLine = document.createElement('div');
    roadLine.setAttribute('class','lines');
    roadLine.y = (x*150);
    roadLine.style.top =roadLine.y+ "px";
    gameArea.appendChild(roadLine);
    
    }


    player.start = true;
    player.score= 0;
   // window.requestAnimationFrame(gamePlay);
    
car.setAttribute('class','car');
gameArea.appendChild(car);
    

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

        for(let x=0;x<5;x++){
    let enemyCar = document.createElement('div');
    enemyCar.setAttribute('class','enemy');
    enemyCar.y = (x*150);
    enemyCar.style.top =enemyCar.y+ "px";
    enemyCar.style.left = Math.floor(Math.random()*350)+"px";
    gameArea.appendChild(enemyCar);
    }
   window.requestAnimationFrame(gamePlay);
}



startScreen.addEventListener('click',start);








