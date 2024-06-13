import { Still, Running} from "./playerState.js";
import { CollisionAnimation } from "./collisionAnimation.js";

export class Player {
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 90;
        this.x = 200;
        this.y = -this.game.height - this.height;
        this.vy = 0;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame;
        this.fps = 5;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 8;
        this.states = [new Still(this), new Running(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
    }

    update(input, deltaTime){
        this.checkCollisionEnemy();
        this.currentState.handleInput(input);

        // horizontal movement
        this.x += this.speed;
        if (input.includes('ArrowRight')) this.x += this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if (this.x < 50) this.x = 50;
        if (this.x > 450 - this.width) this.x = 450 - this.width;
        // vertical movement
        this.y += this.vy;
        if (input.includes('ArrowUp')) this.vy = -this.maxSpeed;
        else if (input.includes('ArrowDown')) this.vy = this.maxSpeed;
        else this.vy = 0;
        if (this.y < 0) this.y = 0;
        if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;
        // sprite animation
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0
        } else {
            this.frameTimer += deltaTime;
        }


    }
    draw(context){
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);

    }

    //}
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }
    checkCollisionEnemy() {
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ) {
                enemy.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                //this.setState(7, 0)
                this.game.lives--;
                if (this.game.lives <= 0) this.game.gameOver = true;
            }
        });
    }
    
}