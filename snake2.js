//30 * 30
var snake = {
    body: [{ x: 40, y: 0 }, { x: 30, y: 0 }, { x: 20, y: 0 }, { x: 10, y: 0 }, { x: 0, y: 0 }],
    bodysize: 5,
    direct: 'right'
};
var lastDirect = 'right';
var foodPosition = { x: 50, y: 50 };
var start = document.getElementById('startbtn');
var score = document.getElementById('score');
var myScore = 0;

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var time
function gameStart() {
    start.style = 'display:none';
    time = setInterval(moving, 100);
}
function moving() {
    if (canvas.getContext) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); //清理畫布
        ctx.fillStyle = '#FF8587';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        setFood();
        direction();
        for (i = 0; i < snake.body.length; i++) {
            ctx.fillRect(snake.body[i].x, snake.body[i].y, 10, 10);
            ctx.strokeRect(snake.body[i].x, snake.body[i].y, 10, 10);
        }
        if (snake.body.length > snake.bodysize) {
            snake.body.pop();
        }
        gameOver();
    } else {
        alert('瀏覽器不支援canvas')
    }
}

function direction() {
    if (snake.direct == 'left') {
        snake.body.unshift({ x: snake.body[0].x - 10, y: snake.body[0].y });
    }
    else if (snake.direct == 'up') {
        snake.body.unshift({ x: snake.body[0].x, y: snake.body[0].y - 10 });
    }
    else if (snake.direct == 'right') {
        snake.body.unshift({ x: snake.body[0].x + 10, y: snake.body[0].y });
    }
    else if (snake.direct == 'down') {
        snake.body.unshift({ x: snake.body[0].x, y: snake.body[0].y + 10 });
    }
}
function gameOver() {
    if (snake.body[0].x < 0 || snake.body[0].x > 290 || snake.body[0].y < 0 || snake.body[0].y > 290) {
        alert('game over');
        reset();
    }
    for (i = 1; i < snake.body.length; i++) {
        if (snake.body[0].x == snake.body[i].x && snake.body[0].y == snake.body[i].y) {
            alert('game over');
            reset();
        }
    }
}
function setFood() {
    if (snake.body[0].x == foodPosition.x && snake.body[0].y == foodPosition.y) {
        eatting();
        randomFood();
        for (i = 0; i < snake.body.length; i++) {
            if (foodPosition.x == snake.body[i].x && foodPosition.y == snake.body[i].y) {
                randomFood();
            }
        }
        ctx.fillRect(foodPosition.x, foodPosition.y, 10, 10);
    } else {
        ctx.fillRect(foodPosition.x, foodPosition.y, 10, 10);
    }
    function randomFood() {
        foodPosition.x = Math.floor(Math.random() * 30) * 10;
        foodPosition.y = Math.floor(Math.random() * 30) * 10;
    }
}
function eatting() {
    snake.body.push({ x: foodPosition.x, y: foodPosition.y });
    snake.bodysize++;
    myScore++;
    score.innerHTML = myScore;
}
function reset() {
    snake = {
        body: [{ x: 40, y: 0 }, { x: 30, y: 0 }, { x: 20, y: 0 }, { x: 10, y: 0 }, { x: 0, y: 0 }],
        bodysize: 5,
        direct: 'right'
    };
    lastDirect = 'right';
    myScore = 0;
    score.innerHTML = myScore;
    start.style = 'display:flex';
    ctx.clearRect(0, 0, canvas.width, canvas.height); //清理畫布
    clearInterval(time);
}
document.addEventListener('keydown', function (e) {
    if (e.keyCode == 37) {
        if (lastDirect == 'right') {
            snake.direct = 'right'
        } else {
            snake.direct = 'left';
            lastDirect = 'left';
        }
    }
    else if (e.keyCode == 38) {
        if (lastDirect == 'down') {
            snake.direct = 'down'
        } else {
            snake.direct = 'up';
            lastDirect = 'up';
        }
    }
    else if (e.keyCode == 39) {
        if (lastDirect == 'left') {
            snake.direct = 'left'
        } else {
            snake.direct = 'right';
            lastDirect = 'right';
        }
    }
    else if (e.keyCode == 40) {
        if (lastDirect == 'up') {
            snake.direct = 'up'
        } else {
            snake.direct = 'down';
            lastDirect = 'down';
        }
    }
})