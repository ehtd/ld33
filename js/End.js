var End = function(game) {

};

End.prototype.create = function() {
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

    var finished = this.game.add.sprite(this.game.world.centerX, 450, 'finished');
    finished.anchor.setTo(0.5, 0.5);

    var dino = new Dino(this.game, 4, 5);
    this.game.add.existing(dino);
    dino.play('happy', 5, true);

    var enter = this.game.add.sprite(this.game.world.centerX, 780, 'enter');
    enter.anchor.setTo(0.5, 0.5);

};

End.prototype.update = function(){
    if (this.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
        this.game.currentLevel = 1;
        this.game.state.start(CONSTANT_STATES.MENU);
    }
}