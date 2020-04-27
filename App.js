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
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.x = this.canvas.with/2;
        this.y = this.canvas.height-30;
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
        this.ctx.beginPath();
        this.ctx.arc(400, 430, 10, 0, Math.PI*2);
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawPaddle() {
        this.ctx.beginPath();
        this.ctx.rect(350, 460, 100, 15);
        this.ctx.fillStyle = "#ffffff"
        this.ctx.fill();
        this.ctx.closePath();
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

                this.ctx.beginPath();
                this.ctx.rect(blockX,BlockY,this.blockWidth, this.blockHeight);
                this.ctx.fillStyle = '#ffffff';
                this.ctx.fill();
                this.ctx.closePath();
            }
        }
    }
}

const interface = new Interface();