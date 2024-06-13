class Enemy {
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.frameTimer = 0;
        this.markedForDeletion = false;
    }
    update(deltaTime){
        // movement
        this.y -= this.speedY + this.game.speed;
        this.x += this.speedX;

        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        // check if off screen
        if (this.y + this.height  > this.game.height) this.markedForDeletion = true;

    }
    draw(context){
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)

    }
}

export class SkiMan extends Enemy {
    constructor(game){
        super();
        this.fps = 7;
        this.frameInterval = 1000/this.fps;
        this.game = game;
        this.width = 100;
        this.height = 55;
        this.x = this.game.width;
        this.y = -50 + Math.random()* (this.game.height - this.height);
        this.image = document.getElementById('skiman');
        this.speedY = 0;
        this.speedX = -3;
        this.maxFrame = 3;
    }

}

export class Stone1 extends Enemy {
    constructor(game){
        super();
        this.fps = 2;
        this.frameInterval = 1000/this.fps;
        this.game = game;
        this.width = 50;
        this.height = 50;
        this.x = 70 + Math.random() * (430 - this.width - 70);
        this.y = 650;
        this.image = document.getElementById('stone1');
        this.speedY = 0;
        this.speedX = 0;
        this.maxFrame = 0;
    }

}


export class Stone2 extends Enemy {
    constructor(game){
        super();
        this.fps = 2;
        this.frameInterval = 1000/this.fps;
        this.game = game;
        this.width = 100;
        this.height = 50;
        this.x = 70 + Math.random() * (430 - this.width - 70);
        this.y = 650;
        this.image = document.getElementById('stone2');
        this.speedY = 0;
        this.speedX = 0;
        this.maxFrame = 0;
    }

}

