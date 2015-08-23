var Sheep = function(game, tileX, tileY, hole, movements) {

    this.tileX = tileX;
    this.tileY = tileY;
    this.hole = hole;
    this.movements = movements;

    this.id = SHEEP_PLACEHOLDER;

    this.ballForm = false;

    Phaser.Sprite.call(this, game, tileX * TILE_SIZE + TILE_SIZE/2, tileY * TILE_SIZE + TILE_SIZE/2, 'sheep');

    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
};

Sheep.prototype = Object.create(Phaser.Sprite.prototype);
Sheep.prototype.constructor = Tile;

Sheep.prototype.update = function() {
    this.x = this.tileX * TILE_SIZE + TILE_SIZE/2;
    this.y = this.tileY * TILE_SIZE + TILE_SIZE/2;

};

Sheep.prototype.moveToHole = function() {

    if (this.movements.length > 0) {
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

Sheep.prototype.moveUp = function(value, maxValue) {
    this.tileY -= value;
};

Sheep.prototype.moveDown = function(value, maxValue) {
    this.tileY += value;
};

Sheep.prototype.moveLeft = function(value, maxValue) {
    this.tileX -= value;
};

Sheep.prototype.moveRight = function(value, maxValue) {
    this.tileX += value;
};

Sheep.prototype.toString = function() {
    return SHEEP_PLACEHOLDER;
};