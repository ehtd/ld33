var Hole = function(game, tileX, tileY) {

    this.tileX = tileX;
    this.tileY = tileY;

    this.id = HOLE_PLACEHOLDER;

    this.ballForm = false;

    Phaser.Sprite.call(this, game, tileX * TILE_SIZE + TILE_SIZE/2, tileY * TILE_SIZE + TILE_SIZE/2, 'hole');

    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
};

Hole.prototype = Object.create(Phaser.Sprite.prototype);
Hole.prototype.constructor = Tile;

Hole.prototype.update = function() {
    this.x = this.tileX * TILE_SIZE + TILE_SIZE/2;
    this.y = this.tileY * TILE_SIZE + TILE_SIZE/2;

};

Hole.prototype.toString = function() {
    return HOLE_PLACEHOLDER;
};