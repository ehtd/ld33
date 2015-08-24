var Game = function(game){

};

Game.prototype.preload = function() {

    // TODO: Load resources

};

Game.prototype.shutdown = function() {

};

Game.prototype.create = function() {

    this.sheepCanMove = true;

    this.sfx = {
        beee: this.game.add.audio("bee"),
        munch: this.game.add.audio("munch")
    };

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

    button = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
    button.onDown.add(this.restartLevel, this);

    button = this.game.input.keyboard.addKey(Phaser.Keyboard.L);
    button.onDown.add(function(){
        this.game.state.start(CONSTANT_STATES.MENU);
    }, this);

    this.game.stage.backgroundColor = '#679C1D';

    this.drawTiles();

    this.fail = this.game.add.sprite(this.game.world.centerX, 250, 'fail');
    this.fail.anchor.setTo(0.5, 0.5);
    this.fail.visible = false;

    this.complete = this.game.add.sprite(this.game.world.centerX, 250, 'complete');
    this.complete.anchor.setTo(0.5, 0.5);
    this.complete.visible = false;

    var r = this.game.add.sprite(10, 20, 'r');
    var l = this.game.add.sprite(this.game.world.centerX, 780, 'l');
    l.anchor.setTo(0.5, 0.5);

    this.lockedControls = false;

    this.startLevel();
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

    if (this.lockedControls == true) return;

    //console.log("Move: " +key.keyCode );

    this.sheepCanMove = true;

    if (key.keyCode == KEY_UP) {
        if (this.isValidMovement(this.activePlayer.tileX, this.activePlayer.tileY - 1)) {
            this.activePlayer.moveUp(1, this.minUpPosition(this.activePlayer));
            this.checkSheepCollision();
        }
    }
    else if (key.keyCode == KEY_DOWN) {
        if (this.isValidMovement(this.activePlayer.tileX, this.activePlayer.tileY + 1)) {
            this.activePlayer.moveDown(1, this.maxUpPosition(this.activePlayer));
            this.checkSheepCollision();
        }
    }
    else if(key.keyCode == KEY_LEFT) {
        if (this.isValidMovement(this.activePlayer.tileX - 1, this.activePlayer.tileY)) {
            this.activePlayer.moveLeft(1, this.minLeftPosition(this.activePlayer));
            this.checkSheepCollision();
        }

    }
    else if(key.keyCode == KEY_RIGHT) {
        if (this.isValidMovement(this.activePlayer.tileX + 1, this.activePlayer.tileY)) {
            this.activePlayer.moveRight(1, this.maxRightPosition(this.activePlayer));
            this.checkSheepCollision();
        }

    }

    this.checkForAliveSheeps();

    // TODO: Move only after a successful movement?
    this.sheepGroup.forEachAlive(function(sheep) {

        if (this.sheepCanMove == false) return;

        var xDistance = Math.abs(sheep.tileX - this.activePlayer.tileX);
        var yDistance = Math.abs(sheep.tileY - this.activePlayer.tileY);
        //console.log("mx: "+xDistance+" my: "+yDistance);

        if (xDistance <= 1 && yDistance <= 1) {
            sheep.panic();
        }
        else {
            sheep.calm();
            sheep.moveToHole();
        }

        // Check if sheep approached dino and be scared
        var xDistance = Math.abs(sheep.tileX - this.activePlayer.tileX);
        var yDistance = Math.abs(sheep.tileY - this.activePlayer.tileY);

        if (xDistance <= 1 && yDistance <= 1) {
            sheep.panic();
        }

        // TODO: Add delay
    }, this);

    for (var i = 0, len = this.sheepGroup.children.length; i < len; i++) {

        if (this.sheepGroup.children[i].escaped == true) {
            this.fail.visible = true;
            this.activePlayer.sad();
            var time = Phaser.Timer.SECOND * 3;
            this.lockedControls = true;
            this.game.time.events.add(time, this.restartLevel, this);
            break;
        }
        console.log(this.sheepGroup.children[i]);
    }


};

Game.prototype.checkSheepCollision = function() {
    //this.printGrid(this.grid);
    var gridItem = this.grid[this.activePlayer.tileY][this.activePlayer.tileX];
    if (gridItem == EMPTY_PLACEHOLDER) return;

    if (gridItem.id == SHEEP_PLACEHOLDER) {
        gridItem.die();
        gridItem.kill();
        this.activePlayer.eatSheep();

    }
};

Game.prototype.checkForAliveSheeps = function() {
    var aliveSheeps = this.sheepGroup.countLiving();

    //console.log("Sheeps alive: "+aliveSheeps);

    if (aliveSheeps <= 0 ){
        this.sheepCanMove = false;
        this.winLevel();
    }
};

Game.prototype.winLevel = function() {
    console.log("Level cleared!");

    this.activePlayer.happy();
    this.lockedControls = true;
    this.complete.visible = true;

    var time = Phaser.Timer.SECOND * 3;
    this.game.time.events.add(time, this.nextLevel, this);

    //this.nextLevel();
};

Game.prototype.failLevel = function() {
    //console.log("Sheep escaped!");
    //this.fail.visible = true;
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
    //console.log("x: "+x+" y: "+ y);
    if (x < 0 || x >= COLUMNS) return false;
    if (y < 0 || y >= ROWS) return false;

    return true;
};

Game.prototype.drawTiles = function() {
    for (var i = 0; i < COLUMNS; i++) {
        for (var j = 0; j < ROWS; j++) {
            var tile = new Tile(this.game, i * TILE_SIZE + OFFSET_X, TILE_SIZE * j + OFFSET_Y);
            this.game.add.existing(tile);
        }
    }
};

Game.prototype.restartLevel = function() {
    console.log("Restarting level");

    this.cleanLevel();
    this.startLevel();
};

Game.prototype.cleanLevel = function() {
    this.activePlayer.destroy();
    this.activePlayer = null;

    this.sheepGroup.destroy(true, false);
    this.holeGroup.destroy(true, false);

    this.grid = [];

    this.complete.visible = false;
    this.fail.visible = false;
    this.lockedControls = false;
};

Game.prototype.nextLevel = function() {
    this.game.currentLevel++;
    this.restartLevel();
};

Game.prototype.startLevel = function() {

    this.grid = this.initializeGrid();

    this.sheepGroup = this.game.add.group();
    this.holeGroup = this.game.add.group();

    this.loadLevel();
};


Game.prototype.loadLevel = function() {

    var levelToLoad = this.game.currentLevel;

    if (this.game.currentLevel == 1) {
        this.loadLevel1();
    }
    else if (this.game.currentLevel == 2) {
        this.loadLevel2();
    }
    else if (this.game.currentLevel == 3) {
        this.loadLevel3();
    }
    else if (this.game.currentLevel == 4) {
        this.loadLevel4();
    }
    else if (this.game.currentLevel == 5) {
        this.loadLevel5();
    }
    else if (this.game.currentLevel == 6) {
        this.loadLevel6();
    }
    else {
        this.game.state.start(CONSTANT_STATES.END);
    }
};

Game.prototype.loadLevel1 = function() {
    var hole = this.addHole(5, 5);

    this.addDino(3, 3);

    var movements = [LEFT, LEFT, LEFT, DOWN, DOWN];
    this.addSheep(8,3,movements, hole);
};

Game.prototype.loadLevel2 = function() {
    var hole = this.addHole(8, 6);

    this.addDino(1, 1);

    var movements = [DOWN, DOWN];
    this.addSheep(8,4,movements, hole);
};

Game.prototype.loadLevel3 = function() {
    var hole1 = this.addHole(0, 0);
    var hole2 = this.addHole(0, 6);
    var hole3 = this.addHole(8, 6);

    this.addDino(4, 3);

    var movements = [DOWN, DOWN, DOWN, DOWN];
    this.addSheep(8,2,movements, hole3);

    var movements = [UP,UP,UP];
    this.addSheep(0,3,movements, hole1);

    var movements = [LEFT,LEFT];
    this.addSheep(2,6,movements, hole2);
};

Game.prototype.loadLevel4 = function() {
    var hole1 = this.addHole(4, 3);
    var hole2 = this.addHole(3, 3);
    var hole3 = this.addHole(5, 3);

    this.addDino(1, 6);

    var movements = [LEFT,LEFT,LEFT];
    this.addSheep(8,3,movements, hole3);

    var movements = [RIGHT,RIGHT,RIGHT];
    this.addSheep(0,3,movements, hole1);

    var movements = [RIGHT,RIGHT,RIGHT, DOWN, DOWN];
    this.addSheep(1,1,movements, hole2);
};

Game.prototype.loadLevel5 = function() {
    var hole1 = this.addHole(2, 0);
    var hole2 = this.addHole(3, 3);
    var hole3 = this.addHole(8, 3);

    this.addDino(3, 0);

    var movements = [DOWN, DOWN, DOWN];
    this.addSheep(8,0,movements, hole3);

    var movements = [LEFT,LEFT, LEFT, LEFT, LEFT];
    this.addSheep(7,0,movements, hole3);

    var movements = [UP, UP, UP];
    this.addSheep(3,6,movements, hole1);

    var movements = [RIGHT,RIGHT, DOWN, DOWN];
    this.addSheep(1,1,movements, hole2);
};

Game.prototype.loadLevel6 = function() {
    var hole1 = this.addHole(8, 5);
    var hole2 = this.addHole(2, 6);
    var hole3 = this.addHole(0, 0);
    var hole4 = this.addHole(0, 3);

    this.addDino(8, 2);

    var movements = [DOWN, DOWN, DOWN, DOWN];
    this.addSheep(2,2,movements, hole2);

    var movements = [UP, UP, UP];
    this.addSheep(0,6,movements, hole4);

    var movements = [DOWN, DOWN, DOWN, DOWN, DOWN];
    this.addSheep(8,0,movements, hole1);

    var movements = [LEFT,LEFT, LEFT, LEFT, LEFT, LEFT, LEFT];
    this.addSheep(7,0,movements, hole3);

};


Game.prototype.addDino = function(x, y) {
    var dino = new Dino(this.game, x, y);
    this.game.add.existing(dino);
    this.activePlayer = dino;
};

Game.prototype.addHole = function(x, y) {
    var hole = new Hole(this.game, x, y);
    this.game.add.existing(hole);
    this.grid[y][x] = hole;
    this.holeGroup.add(hole);
    return hole;
};

Game.prototype.addSheep = function(x,y, movements, hole) {
    var sheep = new Sheep(this.game, x, y, hole, movements, this.grid, this.failLevel);
    this.game.add.existing(sheep);
    this.sheepGroup.add(sheep);
    this.grid[y][x] = sheep;
}

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
};