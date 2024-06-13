import {Player} from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, GroundEnemy, TreeEnemy, CarEnemy} from './enemies.js';
import { GroundFlower } from './rewards.js';
import { UI } from './UI.js';



window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 500;


    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 90;
            this.speed = 0;
            this.maxSpeed = 5;
            this.background = new Background(this);
            this.enemies = [];
            this.punishments = [];
            this.trees = [];
            this.rewards = [];
            this.collisions = [];
            this.floatingMessages = [];
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.rewardTimer = 0;
            this.rewardInterval = 1000;
            this.debug = true;
            this.score = 0;
            this.fontColor = 'black';
            this.time = 0;
            this.maxTime = 20000; // change here for time of game
            this.gameOver = false;
            this.lives = 5; // change here for lives

            // Adjust game settings based on difficulty
            switch (difficulty) {
                case 'easy':
                    this.maxTime = 30000; // 30 seconds
                    this.maxSpeed = 5;
                    break;
                case 'medium':
                    this.maxTime = 20000; // 20 seconds
                    this.maxSpeed = 7;
                    break;
                case 'hard':
                    this.maxTime = 20000; // 10 seconds
                    this.maxSpeed = 10;
                    break;
                default:
                    this.maxTime = 20000; // default 20 seconds
                    this.maxSpeed = 2; // default speed
            }

        }
        update(deltaTime){
            this.time += deltaTime;
            if (this.time > this.maxTime) this.gameOver = true;
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
            //handle trees
            if (this.enemyTimer > this.enemyInterval){
                this.addTreeWithReward();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.trees.forEach(tree => {
                tree.update(deltaTime);
                if (tree.markedForDeletion) this.trees.splice(this.trees.indexOf(tree), 1)
            });
            //handle punishment
            if (this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.punishments.forEach(punishment => {
                punishment.update(deltaTime);
                if (punishment.markedForDeletion) this.punishments.splice(this.punishments.indexOf(punishment), 1)
            });
            //handle rewards
            if (this.rewardTimer > this.rewardInterval){
                this.addReward();
                this.rewardTimer = 0;
            } else {
                this.rewardTimer += deltaTime;
            }
            this.rewards.forEach(reward => {
                reward.update(deltaTime);
                if (reward.markedForDeletion) this.rewards.splice(this.rewards.indexOf(reward), 1)
            });
            // handle floating messages
            this.floatingMessages.forEach(message => {
                message.update();
            });
            // handle collisions sprites
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
                if (collision.markedForDeletion) this.collisions.splice(index, 1);
            });
            this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);


        }
        draw(context){
            this.background.draw(context);
            this.trees.forEach(tree => {
                tree.draw(context);
            });
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.punishments.forEach(punishment => {
                punishment.draw(context);
            });
            this.rewards.forEach(reward => {
                reward.draw(context);
            });
            this.collisions.forEach(collision => {
                collision.draw(context);
            });
            this.floatingMessages.forEach(message => {
                message.draw(context);
            });
            this.UI.draw(context);

        }
        addEnemy(){
            if(this.speed > 0 && Math.random() < 0.2) this.punishments.push(new GroundEnemy(this));
            if(this.speed > 0 && Math.random() < 0.2) this.trees.push(new TreeEnemy(this));
            if(this.speed > 0 && Math.random() < 0.3) this.enemies.push(new FlyingEnemy(this));
            if(this.speed > 0 && Math.random() < 0.1) this.enemies.push(new CarEnemy(this));
            //console.log(this.enemies)

        }
        addReward(){
            if(this.speed > 0 && Math.random() < 0.5) this.rewards.push(new GroundFlower(this));

        }
        addTreeWithReward(){
            const tree = new TreeEnemy(this);
            if (Math.random() < 0.1){
                const reward = new GroundFlower(this);
                reward.x = tree.x + tree.width / 2 - reward.height;
                tree.setReward(reward);
                this.rewards.push(reward);
            }
            this.trees.push(tree);
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
});