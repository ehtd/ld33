var Romans = function(game, tileX, tileY) {

    this.tileX = tileX;
    this.tileY = tileY;

    this.id = ROMANS_PLACEHOLDER;

    this.ballForm = false;

    // TODO: ADD OFFSETS
    Phaser.Sprite.call(this, game, tileX * TILE_SIZE + TILE_SIZE/2, tileY * TILE_SIZE + TILE_SIZE/2, 'romans');

    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
};

Romans.prototype = Object.create(Phaser.Sprite.prototype);
Romans.prototype.constructor = Tile;

Romans.prototype.update = function() {
    this.x = this.tileX * TILE_SIZE + TILE_SIZE/2;
    this.y = this.tileY * TILE_SIZE + TILE_SIZE/2;

};

Romans.prototype.moveUp = function(value, maxValue) {
    if (this.ballForm) {
        this.tileY = maxValue;
        this.transform();
    }
    else {
        this.tileY -= value;
    }

};

Romans.prototype.moveDown = function(value, maxValue) {
    if (this.ballForm) {
        this.tileY = maxValue;
        this.transform();
    }
    else {
        this.tileY += value;
    }

};

Romans.prototype.moveLeft = function(value, maxValue) {
    if (this.ballForm) {
        this.tileX = maxValue;
        this.transform();
    }
    else {
        this.tileX -= value;
    }

};

Romans.prototype.moveRight = function(value, maxValue) {
    if (this.ballForm) {
        this.tileX = maxValue;
        this.transform();
    }
    else {
        this.tileX += value;
    }

};

Romans.prototype.toString = function() {
    return ROMANS_PLACEHOLDER;
};