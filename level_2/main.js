import {Player} from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { SkiMan, Stone1, Stone2 } from './enemies.js';
import { UI } from './UI.js';




window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 700;


    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.speed = 0;
            this.maxSpeed = 5;
            this.background = new Background(this);
            this.enemies = [];
            this.collisions = [];
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.fontColor = 'black';
            this.time = 0;
            this.gameOver = false;
            this.lives = 5; // change here for lives
            this.gameStarted = false;

            // Adjust game settings based on difficulty
    //        switch (difficulty) {
    //            case 'easy':
    //                this.maxTime = 30000; // 30 seconds
    //                this.maxSpeed = 4;
    //                break;
    //            case 'medium':
    //                this.maxTime = 20000; // 20 seconds
    //                this.maxSpeed = 6;
    //                break;
    //            case 'hard':
    //                this.maxTime = 10000; // 10 seconds
    //                this.maxSpeed = 8;
    //                break;
    //            default:
    //                this.maxTime = 20000; // default 20 seconds
    //                this.maxSpeed = 2; // default speed
    //        }

        }
        update(deltaTime){
            if (this.gameStarted) {  // Only update the time if the game has started
                this.time += deltaTime;
                this.speed += 0.0003 * deltaTime;
            }
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            // handleEnemies
            if (this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1)
            });
            // handle collisions sprites
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
                if (collision.markedForDeletion) this.collisions.splice(index, 1);
            });



        }
        draw(context){
            

            this.background.draw(context);

            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });

            this.collisions.forEach(collision => {
                collision.draw(context);
            });
            this.UI.draw(context);

        }
        addEnemy(){
            if(this.speed > 0 && Math.random() < 0.5) this.enemies.push(new Stone1(this));
            if(this.speed > 0 && Math.random() < 0.4) this.enemies.push(new Stone2(this));
            if(this.speed > 0 && Math.random() < 0.3) this.enemies.push(new SkiMan(this));
            console.log(this.enemies)


        }

    
    }

    const game = new Game(canvas.width, canvas.height)
    console.log(game);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver) requestAnimationFrame(animate);

    }
    animate(0);

    window.addEventListener('keydown', function(event) {
        if (!game.gameStarted) {
            game.gameStarted = true;
        }
    });
});