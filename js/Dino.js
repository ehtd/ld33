var Dino = function(game, tileX, tileY) {

    this.tileX = tileX;
    this.tileY = tileY;

    this.ballForm = false;

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
        this.loadTexture('dino');
        this.anchor.x = 0.3;
        this.anchor.y = 0.3;
    }
}

Dino.prototype.moveUp = function(value) {
    this.tileY -= value;
}

Dino.prototype.moveDown = function(value) {
    this.tileY += value;
}

Dino.prototype.moveLeft = function(value) {
    this.tileX -= value;
}

Dino.prototype.moveRight = function(value) {
    this.tileX += value;
}
