var Preload = function(game) {

};

Preload.prototype.preload = function() {

    // TODO: Load resources
    this.load.image('tile', 'assets/graphics/tile.png');
    this.load.image('dino', 'assets/graphics/dino.png');
    this.load.image('dinoLeft', 'assets/graphics/dinoLeft.png');
    this.load.image('dinoBall', 'assets/graphics/dinoBall.png');
    this.load.image('sheep', 'assets/graphics/sheep.png');
};

Preload.prototype.create = function() {

    console.log("Finish preload");
    this.game.state.start(CONSTANT_STATES.GAME);
};