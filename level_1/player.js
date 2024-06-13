import { Still, Reachdown, Running, Jumping, Falling, Diving, Reachup, Hit } from "./playerState.js";
import { CollisionAnimation } from "./collisionAnimation.js";
import { FloatingMessage } from "./floatingMessage.js";

export class Player {
    constructor(game){
        this.game = game;
        this.width = 120;
        this.height = 91;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame;
        this.fps = 15;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.states = [new Still(this), new Reachdown(this), new Running(this), new Jumping(this), new Falling(this), new Diving(this), new Reachup(this), new Hit(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
    }

    update(input, deltaTime){
        this.checkCollisionReward();
        this.checkCollisionPunishment();
        this.checkCollisionEnemy();
        this.currentState.handleInput(input);
        // horizontal movement
        this.x += this.speed;
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        // vertical movement
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
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
        //if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);

    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }
    checkCollisionReward() {
        if (this.currentState instanceof Reachdown) {
            this.game.rewards.forEach(reward => {
                if (
                    reward.x < this.x + this.width &&
                    reward.x + reward.width > this.x &&
                    reward.y < this.y + this.height &&
                    reward.y + reward.height > this.y
                ) {
                    reward.markedForDeletion = true;
                    this.game.score++;
                    this.game.floatingMessages.push(new FloatingMessage('+1', reward.x, reward.y, 110, 50));
                }
            });
        }
    }
    checkCollisionPunishment() {
        if (this.currentState instanceof Reachdown) {
            this.game.punishments.forEach(punishment => {
                if (
                    punishment.x < this.x + this.width &&
                    punishment.x + punishment.width > this.x &&
                    punishment.y < this.y + this.height &&
                    punishment.y + punishment.height > this.y
                ) {
                    punishment.markedForDeletion = true;
                    this.game.score--;
                    this.game.floatingMessages.push(new FloatingMessage('-1', punishment.x, punishment.y, 110, 50));
                }
            });
        }
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
                this.setState(7, 0)
                this.game.lives--;
                if (this.game.lives <= 0) this.game.gameOver = true;
            }
        });
    }
    
}