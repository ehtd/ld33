var Tile = function(game, x, y) {
    var tileSize = 90;
    Phaser.Sprite.call(this, game, x, y, 'tile');
};

Tile.prototype = Object.create(Phaser.Sprite.prototype);
Tile.prototype.constructor = Tile;

Tile.prototype.update = function() {

    // TODO: ?
};