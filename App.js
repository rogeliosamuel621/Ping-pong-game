var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var x = canvas.width/2;
var y = canvas.height-35;
var dx = 5;
var dy = -5;
var paddleX = 350;
var paddleWidth = 100;
var paddleHeight = 15;
var right = false;
var left = false;
var blockRows = 3;
var blockColumns = 6;
var blockWidth = 100;
var blockHeight = 30;
var blockPadding = 10;
var blockMarginTop = 30;
var blockMarginLeft = 70;

var blocks = [];
for(c=0; c<blockColumns; c++) {
    blocks[c] = [];
    for(r=0; r<blockRows; r++) {
        blocks[c][r] = { x: 0, y: 0, status: 1};
    }
}

document.addEventListener("keydown", doing, false);
document.addEventListener("keyup", stop, false);

function doing(e) {

    if(e.keyCode == 39) {
        right = true;
    }
    else if(e.keyCode == 37) {
        left = true;
    }
}

function stop(e) {

    if(e.keyCode == 39) {
        right = false;
    }
    else if(e.keyCode == 37) {
        left = false;
    }
}

class Player{
    constructor(score, lives) {
        this.Score = score,
        this.Lives = lives,
        this.moveThePaddle();
    }

    moveThePaddle() {

        if(right && paddleX < canvas.width-paddleWidth) {
            paddleX += 9;
        }
        else if(left && paddleX > 0) {
            paddleX -= 9;
        }
    }
}

function frame1() {
    const player = new Player();
    requestAnimationFrame(frame1);
}

frame1();

class Interface{
    constructor() {
        this.ballRadius = 10;
        this.drawBall();
        this.drawPaddle();
        this.drawBlocks();
        this.bounce();
        this.Crush();
    }

    drawBall() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(x, y, this.ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.closePath();

        x += dx;
        y += dy;
    }

    drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, 460, paddleWidth, paddleHeight);
        ctx.fillStyle = "#ffffff"
        ctx.fill();
        ctx.closePath();
    }

    drawBlocks() {

        for(let c=0; c<blockColumns; c++) { //printing
            for(let r=0; r<blockRows; r++) {

                if(blocks[c][r].status == 1) {
                    var blockX = (c*(blockWidth+blockPadding))+blockMarginLeft;
                    var BlockY = (r*(blockHeight+blockPadding))+blockMarginTop;

                    blocks[c][r].x = blockX;
                    blocks[c][r].y = BlockY;

                    ctx.beginPath();
                    ctx.rect(blockX,BlockY,blockWidth, blockHeight);
                    ctx.fillStyle = '#ffffff';
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    //function that makes the ball bounces
    bounce() {
        if(y+dy < this.ballRadius) {//if it goues up
            dy = -dy;
        }
        else if(y+dy > canvas.height-this.ballRadius-paddleHeight) { //if it goes to the bottom
            if(x > paddleX && x < paddleX + paddleWidth) { //if it toches the paddle
                dy = -dy;
            }
        }

        if(x+dx > canvas.width-this.ballRadius || x+dx < this.ballRadius) { //if it goes to the sides
            dx = -dx;
        }
    }

    Crush() {
        for(c=0; c<blockColumns; c++) {
            for(r=0; r<blockRows; r++) {
                var b = blocks[c][r];
                if(b.status == 1) {
                    if(x > b.x && x < b.x+blockWidth && y > b.y && y < b.y+blockHeight) {
                        dy = -dy;
                        b.status = 0;
                    }
                }
            }
        }
    }
}

function frame2() {
    const interface = new Interface();
    requestAnimationFrame(frame2)
}

frame2();