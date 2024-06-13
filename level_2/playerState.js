const states = {
    STILL: 0,
    RUNNING: 1,
}

class State {
    constructor(state) {
        this.state = state;
    }
}

export class Still extends State {
    constructor(player) {
        super('STILL');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.maxFrame = 1;
        this.player.frameY = 0;
    }
    handleInput(input) {
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
            this.player.setState(states.RUNNING, 1);
        }
    }
}


export class Running extends State {
    constructor(player) {
        super('RUNNING');
        this.player = player;
    }
    enter() {
        this.player.width = 63;
        this.player.frameX = 0;
        this.player.maxFrame = 1;
        this.player.frameY = 1;
    }
    handleInput(input) {

    }
}

