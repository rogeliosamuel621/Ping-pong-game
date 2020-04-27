var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var x = canvas.width/2;
var y = canvas.height-35;
var dx = 5;
var dy = -5;

class Player{
    constructor(score, lives) {
        this.Score = score,
        this.Lives = lives
    }

    moveThePaddle() {

    }
}

class Interface{
    constructor() {
        this.blockRows = 3;
        this.blockColumns = 6;
        this.blockWidth = 100;
        this.blockHeight = 30;
        this.blockPadding = 10;
        this.blockMarginTop = 30;
        this.blockMarginLeft = 70;
        this.drawBall();
        this.drawPaddle();
        this.drawBlocks();
    }

    drawBall() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI*2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.closePath();

        x += dx;
        y += dy;
    }

    drawPaddle() {
        ctx.beginPath();
        ctx.rect(350, 460, 100, 15);
        ctx.fillStyle = "#ffffff"
        ctx.fill();
        ctx.closePath();
    }

    drawBlocks() {

        var blocks = []; //Filling the dinamic matriz
        for(let c=0; c<this.blockColumns; c++) {

            blocks[c] = [];
            for(let r=0; r<this.blockRows; r++) {
                blocks[c][r] = { x: 0, y: 0 };
            }
        }

        for(let c=0; c<this.blockColumns; c++) {

            for(let r=0; r<this.blockRows; r++) {

                var blockX = (c*(this.blockWidth+this.blockPadding))+this.blockMarginLeft;
                var BlockY = (r*(this.blockHeight+this.blockPadding))+this.blockMarginTop;

                blocks[c][r].x = blockX;
                blocks[c][r].y = BlockY;

                ctx.beginPath();
                ctx.rect(blockX,BlockY,this.blockWidth, this.blockHeight);
                ctx.fillStyle = '#ffffff';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function frame() {
    const interface = new Interface();
    requestAnimationFrame(frame)
}

frame();