class Rewards {
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.frameTimer = 0;
        this.markedForDeletion = false;
    }
    update(deltaTime){
        // movement
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        // check if off screen
        if (this.x + this.width  < 0) this.markedForDeletion = true;

    }
    draw(context){
        //if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)

    }
}


export class GroundFlower extends Rewards {
    constructor(game){
        super();
        this.fps = 2;
        this.frameInterval = 1000/this.fps;
        this.game = game;
        this.width = 60;
        this.height = 44;
        this.x = this.game.width;
        this.y = this.game.height - this.height - 80;
        this.image = document.getElementById('ground_flower');
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 5;
    }

}