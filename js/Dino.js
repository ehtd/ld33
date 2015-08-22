var Dino = function(game, tileX, tileY) {

    this.tileX = tileX;
    this.tileY = tileY;

    this.ballForm = false;
    this.faceLeft = false;

    Phaser.Sprite.call(this, game, tileX * TILE_SIZE, tileY * TILE_SIZE, 'dino');

    this.anchor.x = 0.3;
    this.anchor.y = 0.3;
};

Dino.prototype = Object.create(Phaser.Sprite.prototype);
Dino.prototype.constructor = Tile;

Dino.prototype.update = function() {
    this.x = this.tileX * TILE_SIZE;
    this.y = this.tileY * TILE_SIZE;

};

Dino.prototype.transform = function() {
    this.ballForm = !this.ballForm;

    if (this.ballForm) {
        this.loadTexture('dinoBall');
        this.anchor.x = 0.1;
        this.anchor.y = 0.1;
    }
    else {
        this.flip()
    }
};

Dino.prototype.flip = function() {
    if (this.faceLeft) {
        this.loadTexture('dinoLeft');
        this.anchor.x = 0.1;
        this.anchor.y = 0.3;
    }
    else {
        this.loadTexture('dino');
        this.anchor.x = 0.3;
        this.anchor.y = 0.3;
    }
};

Dino.prototype.moveUp = function(value, maxValue) {
    if (this.ballForm) {
        this.tileY = maxValue;
        this.transform();
    }
    else {
        this.tileY -= value;
    }

};

Dino.prototype.moveDown = function(value, maxValue) {
    if (this.ballForm) {
        this.tileY = maxValue;
        this.transform();
    }
    else {
        this.tileY += value;
    }

};

Dino.prototype.moveLeft = function(value, maxValue) {
    if (this.ballForm) {
        this.tileX = maxValue;
        this.faceLeft = true;
        this.transform();
    }
    else {
        this.tileX -= value;
        this.faceLeft = true;
        this.flip();
    }

};

Dino.prototype.moveRight = function(value, maxValue) {
    if (this.ballForm) {
        this.tileX = maxValue;
        this.faceLeft = false;
        this.transform();
    }
    else {
        this.tileX += value;
        this.faceLeft = false;
        this.flip();
    }

};
