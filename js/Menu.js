var Menu = function(game) {

};

Menu.prototype.create = function() {
    console.log("Loaded menu");
    this.game.stage.backgroundColor = '#679C1D';

    this.game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.ENTER
    ]);

    for (var i = 0; i < COLUMNS; i++) {
        for (var j = 0; j < ROWS; j++) {
            var tile = new Tile(this.game, i * TILE_SIZE + OFFSET_X, TILE_SIZE * j + OFFSET_Y);
            this.game.add.existing(tile);
        }
    }

    var logo = this.game.add.sprite(this.game.world.centerX, 250, 'logo');
    logo.anchor.setTo(0.5, 0.5);

    // Add instructions
    var z = this.game.add.sprite(760, 660, 'z');
    z.anchor.setTo(0.5, 0.5);

    var arrows = this.game.add.sprite(230, 650, 'arrows');
    arrows.anchor.setTo(0.5, 0.5);

    var enter = this.game.add.sprite(this.game.world.centerX, 750, 'enter');
    enter.anchor.setTo(0.5, 0.5);

    versioning(this.game);
};

Menu.prototype.update = function(){
    if (this.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
        this.game.state.start(CONSTANT_STATES.GAME);
    }
}