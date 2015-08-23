var Sheep = function(game, tileX, tileY) {

    this.tileX = tileX;
    this.tileY = tileY;

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

Sheep.prototype.moveUp = function(value, maxValue) {
    if (this.ballForm) {
        this.tileY = maxValue;
        this.transform();
    }
    else {
        this.tileY -= value;
    }

};

Sheep.prototype.moveDown = function(value, maxValue) {
    if (this.ballForm) {
        this.tileY = maxValue;
        this.transform();
    }
    else {
        this.tileY += value;
    }

};

Sheep.prototype.moveLeft = function(value, maxValue) {
    if (this.ballForm) {
        this.tileX = maxValue;
        this.transform();
    }
    else {
        this.tileX -= value;
    }

};

Sheep.prototype.moveRight = function(value, maxValue) {
    if (this.ballForm) {
        this.tileX = maxValue;
        this.transform();
    }
    else {
        this.tileX += value;
    }

};

Sheep.prototype.toString = function() {
    return SHEEP_PLACEHOLDER;
};