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

    this.drawTiles();

    this.grid = this.initializeGrid();

    this.sheepGroup = this.game.add.group();

    this.loadLevel();

    versioning(this.game);
};

Game.prototype.update = function() {

};


var KEY_Z = 90;
Game.prototype.transform = function (key){
    //console.log("Move: " +key.keyCode );

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

    //console.log("Move: " +key.keyCode );

    if (key.keyCode == KEY_UP) {
        if (this.isValidMovement(this.activePlayer.tileX, this.activePlayer.tileY - 1)) {
            this.activePlayer.moveUp(1, this.minUpPosition(this.activePlayer));
        }
    }
    else if (key.keyCode == KEY_DOWN) {
        if (this.isValidMovement(this.activePlayer.tileX, this.activePlayer.tileY + 1)) {
            this.activePlayer.moveDown(1, this.maxUpPosition(this.activePlayer));
        }
    }
    else if(key.keyCode == KEY_LEFT) {
        if (this.isValidMovement(this.activePlayer.tileX - 1, this.activePlayer.tileY)) {
            this.activePlayer.moveLeft(1, this.minLeftPosition(this.activePlayer));
        }

    }
    else if(key.keyCode == KEY_RIGHT) {
        if (this.isValidMovement(this.activePlayer.tileX + 1, this.activePlayer.tileY)) {
            this.activePlayer.moveRight(1, this.maxRightPosition(this.activePlayer));
        }

    }

    this.sheepGroup.forEach(function(sheep){
        sheep.moveToHole();
    }, this);
};

Game.prototype.maxRightPosition = function(dino)
{
    var maxRightPosition = dino.tileX + 1;

    while (maxRightPosition < COLUMNS - 1
    && this.availableSpaceInGrid(this.grid, maxRightPosition, dino.tileY)) {
        maxRightPosition++;
    }
    //console.log("max right position: ", maxRightPosition);
    return maxRightPosition;
};

Game.prototype.minLeftPosition = function(dino)
{
    var minLeftPosition = dino.tileX - 1;

    while (minLeftPosition > 0
           && this.availableSpaceInGrid(this.grid, minLeftPosition, dino.tileY)) {
        minLeftPosition--;
    }
    //console.log("max left position: ", minLeftPosition);
    return minLeftPosition;
};

Game.prototype.minUpPosition = function(dino)
{
    var minUpPosition = dino.tileY - 1;

    while (minUpPosition > 0
    && this.availableSpaceInGrid(this.grid, dino.tileX, minUpPosition)) {
        minUpPosition--;
    }
    //console.log("min up position: ", minUpPosition);
    return minUpPosition;
};

Game.prototype.maxUpPosition = function(dino)
{
    var maxUpPosition = dino.tileY + 1;

    while (maxUpPosition < ROWS - 1
    && this.availableSpaceInGrid(this.grid, dino.tileX, maxUpPosition)) {
        maxUpPosition++;
    }
    //console.log("max up position: ", maxUpPosition);
    return maxUpPosition;
};

Game.prototype.clearElementInGrid = function(grid, x,y) {
    grid[y][x] = EMPTY_PLACEHOLDER;
    //this.printGrid(grid);
}

Game.prototype.updateDinoInGrid = function(grid, x,y) {
    grid[y][x] = DINO_PLACEHOLDER;
    //this.printGrid(grid);
}

Game.prototype.isValidMovement = function(x,y) {
    console.log("x: "+x+" y: "+ y);
    if (x < 0 || x >= COLUMNS) return false;
    if (y < 0 || y >= ROWS) return false;

    return true;
};

Game.prototype.drawTiles = function() {
    for (var i = 0; i < COLUMNS; i++) {
        for (var j = 0; j < ROWS; j++) {
            var tile = new Tile(this.game, i * TILE_SIZE + this.startingOffsetX, TILE_SIZE * j + this.startingOffsetY);
            this.game.add.existing(tile);
        }
    }
};

Game.prototype.loadLevel = function() {



    var dino = new Dino(this.game, 6, 2);
    this.game.add.existing(dino);
    this.activePlayer = dino;

    var hole = new Hole(this.game, 2, 2);
    this.game.add.existing(hole);
    this.grid[2][2] = hole;

    var sheep = new Sheep(this.game, 3, 3, hole);
    this.game.add.existing(sheep);
    this.sheepGroup.add(sheep);
    this.grid[3][3] = sheep;

    var sheep = new Sheep(this.game, 8, 6, hole);
    this.game.add.existing(sheep);
    this.sheepGroup.add(sheep);
    this.grid[6][8] = sheep;
};

Game.prototype.dinoCollideWithElement = function(dino) {
    var elementInGrid = this.grid[dino.tileY][dino.tileY];

    if (elementInGrid == EMPTY_PLACEHOLDER) {
        return false;
    }

    return true;
};

// TODO: Move to other file

Game.prototype.availableSpaceInGrid = function(grid, x, y) {
    var elementInGrid = this.grid[y][x];

    // TODO: Get stuck in hole?
    if (elementInGrid == EMPTY_PLACEHOLDER || elementInGrid == HOLE_PLACEHOLDER) {
        return true;
    }
    return false;
}

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