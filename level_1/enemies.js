class Enemy {
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        //this.fps = 2;
        //this.frameInterval = 1000/this.fps;
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

export class FlyingEnemy extends Enemy {
    constructor(game){
        super();
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.game = game;
        this.width = 55;
        this.height = 44;
        this.x = this.game.width + Math.random() * this.game.width *0.5;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() +1 ;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = document.getElementById('enemy_bee');
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime){
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);

    }

}

export class GroundEnemy extends Enemy {
    constructor(game){
        super();
        this.fps = 2;
        this.frameInterval = 1000/this.fps;
        this.game = game;
        this.width = 60;
        this.height = 44;
        this.x = this.game.width;
        this.y = this.game.height - this.height - 80;
        this.image = document.getElementById('ground_rotten_flower');
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 5;
    }

}

export class CarEnemy extends Enemy {
    constructor(game){
        super();
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.game = game;
        this.width = 150;
        this.height = 100;
        this.x = this.game.width + Math.random() * this.game.width *0.5;
        this.y = this.game.height - this.height - 110;
        this.speedX = Math.random() +1 ;
        this.speedY = 0;
        this.maxFrame = 1;
        this.image = document.getElementById('car');
    }

}

export class TreeEnemy extends Enemy {
    constructor(game){
        super();
        this.fps = 2;
        this.frameInterval = 1000/this.fps;
        this.game = game;
        this.width = 120;
        this.height = 240;
        this.x = this.game.width;
        this.y = this.game.height - this.height - 130;
        this.image = document.getElementById('tree');
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 1;


    }

    setReward(reward) {
        this.reward = reward;
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
        if (this.reward && !this.reward.markedForDeletion) {
            this.reward.draw(context);
        }
    }

}


