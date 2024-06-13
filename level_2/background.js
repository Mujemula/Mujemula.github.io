class Layer {
    constructor(game, width, height, speedModifier, image){
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;

    }
    update(){
        if (this.y < -this.height) this.y = 0;
        else this.y -= this.game.speed * this.speedModifier;

    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x, this.y + this.height, this.width, this.height);

    }
}

export class Background {
    constructor(game){
        this.game = game;
        this.width = 500;
        this.height = 1667;
        this.layer1image = document.getElementById('layer1');
        this.layer2image = document.getElementById('layer2');
        this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1image);
        this.layer2 = new Layer(this.game, this.width, this.height, 1, this.layer2image);
        this.backgroundLayers = [this.layer1, this.layer2];
    }
    update(){
        this.backgroundLayers.forEach(layer => {
            layer.update();
        })
    }
    draw(context){
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        })
    }
}