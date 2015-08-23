var Preload = function(game) {

};

Preload.prototype.preload = function() {

    // TODO: Load resources
    this.load.image('tile', 'assets/graphics/tile.png');
    this.load.spritesheet('dino', 'assets/graphics/dino.png', 148, 110);
    this.load.spritesheet('sheep', 'assets/graphics/sheep.png', 96, 96);
    this.load.image('hole', 'assets/graphics/hole.png');
    this.load.image('logo', 'assets/graphics/logo.png');
    this.load.image('arrows', 'assets/graphics/arrows.png');
    this.load.image('r', 'assets/graphics/r.png');
    this.load.image('z', 'assets/graphics/z.png');
    this.load.image('enter', 'assets/graphics/enter.png');
    this.load.image('l', 'assets/graphics/l.png');

    this.load.image('fail', 'assets/graphics/fail.png');
    this.load.image('complete', 'assets/graphics/complete.png');
};

Preload.prototype.create = function() {

    console.log("Finish preload");
    this.game.state.start(CONSTANT_STATES.GAME);
};