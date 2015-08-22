var Game = function(game){

};

Game.prototype.preload = function() {

    // TODO: Load resources

}

Game.prototype.shutdown = function() {

}

Game.prototype.create = function() {

    this.startingOffsetY = 0;
    this.startingOffsetX = 0;

    console.log("Entering Game");

    var button = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    button.onDown.add(this.movePlayer, this);

    button = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    button.onDown.add(this.movePlayer, this);

    button = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    button.onDown.add(this.movePlayer, this);

    button = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    button.onDown.add(this.movePlayer, this);

    button = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
    button.onDown.add(this.transform, this);

    this.game.stage.backgroundColor = '#DDDDDD';

    this.activePlayer = null;

    this.loadLevel();

    versioning(this.game);
}

Game.prototype.update = function() {

}


var KEY_Z = 90;
Game.prototype.transform = function (key){
    console.log("Move: " +key.keyCode );

    if (key.keyCode == KEY_Z) {
        this.activePlayer.transform();
    }
}

var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
Game.prototype.movePlayer = function (key){

    if (key.keyCode == undefined) return;

    console.log("Move: " +key.keyCode );

    if (key.keyCode == KEY_UP){
        this.activePlayer.moveUp(1);

    } else if (key.keyCode == KEY_DOWN){
        this.activePlayer.moveDown(1);

    } else if(key.keyCode == KEY_LEFT){
        this.activePlayer.moveLeft(1);

    } else if(key.keyCode == KEY_RIGHT){
        this.activePlayer.moveRight(1);

    }
}

Game.prototype.loadLevel = function() {

    for (var i = 0; i < COLUMNS; i++) {
        for (var j = 0; j < ROWS; j++) {
            var tile = new Tile(this.game, i * TILE_SIZE + this.startingOffsetX, TILE_SIZE * j + this.startingOffsetY);
            this.game.add.existing(tile);
        }
    }

    var dino = new Dino(this.game, 6, 3);

    this.game.add.existing(dino);

    this.activePlayer = dino;
}