var Sheep = function(game, tileX, tileY, hole, movements, grid, callback) {

    this.tileX = tileX;
    this.tileY = tileY;
    this.hole = hole;
    this.movements = movements;
    this.grid = grid;
    this.objectReference = null;
    this.afraid = false;
    this.callback = callback;

    this.id = SHEEP_PLACEHOLDER;

    Phaser.Sprite.call(this, game, tileX * TILE_SIZE + TILE_SIZE/2 + OFFSET_X, tileY * TILE_SIZE + TILE_SIZE/2 + OFFSET_Y, 'sheep');

    this.animations.add('normal', [0], 0, 1);
    this.animations.add('scared', [0, 1, 2, 3], 30, 1);

    this.animations.play('normal');

    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
};

Sheep.prototype = Object.create(Phaser.Sprite.prototype);
Sheep.prototype.constructor = Tile;

Sheep.prototype.updatePosition = function() {
    var x = this.tileX * TILE_SIZE + TILE_SIZE/2 + OFFSET_X;
    var y = this.tileY * TILE_SIZE + TILE_SIZE/2 + OFFSET_Y;

    this.game.add.tween(this).to({x:x, y:y},
        130,
        Phaser.Easing.Cubic.InOut).start();
};

Sheep.prototype.saveReference = function() {
    //this.printGrid(this.grid);
    this.objectReference = this.grid[this.tileY][this.tileX];
    this.grid[this.tileY][this.tileX] = EMPTY_PLACEHOLDER;
    //this.printGrid(this.grid);
};

Sheep.prototype.updateGridWithReference = function() {
    //this.printGrid(this.grid);
    if (this.grid[this.tileY][this.tileX] == HOLE_PLACEHOLDER) {
        this.callback();
    } else {
        this.grid[this.tileY][this.tileX] = this.objectReference;
    }
    this.objectReference = null;
    //this.printGrid(this.grid);
};

Sheep.prototype.die = function() {
    this.grid[this.tileY][this.tileX] = EMPTY_PLACEHOLDER;
};

Sheep.prototype.panic = function() {
    this.afraid = true;
    this.animations.play('scared');
    //console.log("Sheep is afraid");
};

Sheep.prototype.calm = function() {
    this.afraid = false;
    this.animations.play('normal');
    //console.log("Sheep is calm");
};

Sheep.prototype.moveToHole = function() {

    if (this.movements.length > 0 && this.afraid == false) {
        var action = this.movements.shift();

        if (action == UP) {
            this.moveUp(1);
        }
        else if (action == DOWN) {
            this.moveDown(1);
        }
        else if (action == LEFT) {
            this.moveLeft(1);
        }
        else if (action == RIGHT) {
            this.moveRight(1);
        }
    }
};

Sheep.prototype.moveUp = function(value) {
    this.saveReference();
    this.tileY -= value;
    this.updateGridWithReference();
    this.updatePosition();
};

Sheep.prototype.moveDown = function(value) {
    this.saveReference();
    this.tileY += value;
    this.updateGridWithReference();
    this.updatePosition();
};

Sheep.prototype.moveLeft = function(value) {
    this.saveReference();
    this.tileX -= value;
    this.updateGridWithReference();
    this.updatePosition();
};

Sheep.prototype.moveRight = function(value) {
    this.saveReference();
    this.tileX += value;
    this.updateGridWithReference();
    this.updatePosition();
};

Sheep.prototype.toString = function() {
    return SHEEP_PLACEHOLDER;
};

Sheep.prototype.printGrid = function(grid){

    for (var j = 0; j < ROWS; j++) {

        var s = '';
        for (var i = 0; i < COLUMNS; i++) {
            s += grid[j][i];
        }
        console.log(s);

    }
    console.log('\n');
};