var Dino = function(game, tileX, tileY) {

    this.tileX = tileX;
    this.tileY = tileY;

    this.ballForm = false;
    this.faceLeft = false;

    this.id = DINO_PLACEHOLDER;

    Phaser.Sprite.call(this, game, tileX * TILE_SIZE + OFFSET_X, tileY * TILE_SIZE + OFFSET_Y, 'dino');

    this.anchor.x = 0.3;
    this.anchor.y = 0.3;
};

Dino.prototype = Object.create(Phaser.Sprite.prototype);
Dino.prototype.constructor = Tile;

Dino.prototype.updatePosition = function() {
    var x = this.tileX * TILE_SIZE + OFFSET_X;
    var y = this.tileY * TILE_SIZE+ OFFSET_Y;

    this.game.add.tween(this).to({x:x, y:y},
        130,
        Phaser.Easing.Cubic.InOut).start();
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

    this.updatePosition();
};

Dino.prototype.moveDown = function(value, maxValue) {
    if (this.ballForm) {
        this.tileY = maxValue;
        this.transform();
    }
    else {
        this.tileY += value;
    }
    this.updatePosition();
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
    this.updatePosition();
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
    this.updatePosition();
};

Dino.prototype.eatSheep = function(value, maxValue) {
    // TODO: eat animation, sound
    console.log("Eating sheep");
};

Dino.prototype.toString = function() {
    return DINO_PLACEHOLDER;
};