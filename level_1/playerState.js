const states = {
    STILL: 0,
    REACHDOWN: 1,
    RUNNING: 2,
    JUMPING: 3,
    FALLING: 4,
    DIVING: 5,
    REACHUP: 6,
    HIT: 7,
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
        this.player.maxFrame = 0;
        this.player.frameY = 0;
    }
    handleInput(input) {
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
            this.player.setState(states.RUNNING, 1);
        } else if (input.includes('ArrowUp')) {
            this.player.setState(states.JUMPING, 1);
        }
    }
}


export class Reachdown extends State {
    constructor(player) {
        super('REACHDOWN');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.maxFrame = 5;
        this.player.frameY = 4;
    }
    handleInput(input) {
        if (!input.includes('s')) {
            this.player.setState(states.RUNNING, 1);
        } else if (input.includes('ArrowUp')) {
            this.player.setState(states.JUMPING, 1);
        }
    }
}

export class Running extends State {
    constructor(player) {
        super('RUNNING');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.maxFrame = 5;
        this.player.frameY = 0;
    }
    handleInput(input) {
        if (input.includes('s')) {
            this.player.setState(states.REACHDOWN, 1);
        } else if (input.includes('ArrowUp')) {
            this.player.setState(states.JUMPING, 1);
        } else if (input.includes('w')) {
            this.player.setState(states.REACHUP, 1);
        } 
    }
}

export class Jumping extends State {
    constructor(player) {
        super('JUMPING');
        this.player = player;
    }
    enter() {
        if (this.player.onGround()) this.player.vy -= 20;
        this.player.frameX = 0;
        this.player.maxFrame = 5;
        this.player.frameY = 3;
    }
    handleInput(input) {
        if (this.player.vy > this.player.weight) {
            this.player.setState(states.FALLING, 1);
        } else if (input.includes('ArrowDown')) {
            this.player.setState(states.DIVING, 0);
        } else if (input.includes('w')) {
            this.player.setState(states.REACHUP, 1)
        } 
    }
}

export class Falling extends State {
    constructor(player) {
        super('FALLING');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.maxFrame = 5;
        this.player.frameY = 2;
    }
    handleInput(input) {
        if (this.player.onGround()) {
            this.player.setState(states.RUNNING, 1);
        } else if (input.includes('ArrowDown')) {
            this.player.setState(states.DIVING, 0);
        }
    }
}

export class Diving extends State {
    constructor(player) {
        super('DIVING');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.maxFrame = 5;
        this.player.frameY = 2;
        this.player.vy = 15;
    }
    handleInput(input) {
        if (this.player.onGround()) {
            this.player.setState(states.RUNNING, 1);
        } else if (input.includes('ArrowDown')) {
            this.player.setState(states.DIVING, 0);
        }
    }
}


export class Reachup extends State {
    constructor(player) {
        super('REACHUP');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.maxFrame = 5;
        this.player.frameY = 1;
    }
    handleInput(input) {
        if (!input.includes('w')) {
            this.player.setState(states.RUNNING, 1);
        } else if (input.includes('ArrowUp')) {
            this.player.setState(states.JUMPING, 1);
        }
    }
}


export class Hit extends State {
    constructor(player) {
        super('HIT');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.maxFrame = 5; // change this if needed
        this.player.frameY = 0; // change this to index if conision animation
    }
    handleInput(input) {
        if (this.player.frameX >= 5 && this.player.onGround()) {
            this.player.setState(states.RUNNING, 1);
        } else if (this.player.frameX >= 5 && !this.player.onGround()) {
            this.player.setState(states.FALLING, 1);
        }
    }
}