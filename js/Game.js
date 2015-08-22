var Game = function(game){

};

Game.prototype.preload = function() {

    // TODO: Load resources

};

Game.prototype.shutdown = function() {

};

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

    this.grid = this.initializeGrid();

    this.loadLevel();

    versioning(this.game);
};

Game.prototype.update = function() {

};


var KEY_Z = 90;
Game.prototype.transform = function (key){
    console.log("Move: " +key.keyCode );

    if (key.keyCode == KEY_Z) {
        this.activePlayer.transform();
    }
};

var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
Game.prototype.movePlayer = function (key){

    if (this.activePlayer == null) return;
    if (key.keyCode == undefined) return;

    console.log("Move: " +key.keyCode );

    if (key.keyCode == KEY_UP) {
        if (this.isValidMovement(this.activePlayer.tileX, this.activePlayer.tileY - 1)) {
            this.activePlayer.moveUp(1, this.maxMovementUp(this.activePlayer));
        }
    }
    else if (key.keyCode == KEY_DOWN) {
        if (this.isValidMovement(this.activePlayer.tileX, this.activePlayer.tileY + 1)) {
            this.activePlayer.moveDown(1, this.maxMovementDown(this.activePlayer));
        }
    }
    else if(key.keyCode == KEY_LEFT) {
        if (this.isValidMovement(this.activePlayer.tileX - 1, this.activePlayer.tileY)) {
            this.activePlayer.moveLeft(1, this.maxMovementLeft(this.activePlayer));
        }

    }
    else if(key.keyCode == KEY_RIGHT) {
        if (this.isValidMovement(this.activePlayer.tileX + 1, this.activePlayer.tileY)) {
            this.activePlayer.moveRight(1, this.maxMovementRight(this.activePlayer));
        }

    }
};

Game.prototype.maxMovementRight = function(player)
{
    return COLUMNS - 1;
};

Game.prototype.maxMovementLeft = function(player)
{
    return 0;
};

Game.prototype.maxMovementUp = function(player)
{
    return 0;
};

Game.prototype.maxMovementDown = function(player)
{
    return ROWS - 1;
};

Game.prototype.isValidMovement = function(x,y) {
    console.log("x: "+x+" y: "+ y);
    if (x < 0 || x >= COLUMNS) return false;
    if (y < 0 || y >= ROWS) return false;

    return true;
};

Game.prototype.loadLevel = function() {

    for (var i = 0; i < COLUMNS; i++) {
        for (var j = 0; j < ROWS; j++) {
            var tile = new Tile(this.game, i * TILE_SIZE + this.startingOffsetX, TILE_SIZE * j + this.startingOffsetY);
            this.game.add.existing(tile);
        }
    }

    var dino = new Dino(this.game, 6, 3);
    this.game.add.existing(dino);
    this.grid[3][6] = dino;

    var sheep = new Sheep(this.game, 3, 3);
    this.game.add.existing(sheep);
    this.grid[3][3] = sheep;

    this.printGrid(this.grid);
    this.activePlayer = dino;
};

// TODO: Move to other file
Game.prototype.initializeGrid = function () {

    var grid = [];

    for (var j = 0; j < ROWS; j++) {
        var column = [];

        for (var i = 0; i < COLUMNS; i++) {
            column.push(EMPTY_PLACEHOLDER);
        }

        grid.push(column);
    }

    return grid;
}

Game.prototype.printGrid = function(grid){

    for (var j = 0; j < ROWS; j++) {

        var s = '';
        for (var i = 0; i < COLUMNS; i++) {
            s += grid[j][i];
        }
        console.log(s);

    }
    console.log('\n');
}