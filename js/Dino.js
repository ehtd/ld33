var Dino = function(game, tileX, tileY) {

    this.tileX = tileX;
    this.tileY = tileY;

    this.ballForm = false;
    this.faceLeft = false;

    this.id = DINO_PLACEHOLDER;

    Phaser.Sprite.call(this, game, tileX * TILE_SIZE + OFFSET_X + TILE_SIZE/2, tileY * TILE_SIZE + OFFSET_Y + TILE_SIZE/2, 'dino');

    this.animations.add('leftIdle', [3], 30, 1);
    this.animations.add('rightIdle', [0], 30, 1);
    this.animations.add('walkRight', [0,1,0,2], 30, 1);
    this.animations.add('walkLeft', [3,4,3,4], 30, 1);

    this.animations.add('happy', [6,7], 10, 1);
    this.animations.add('sad', [8, 9], 10, 1);

    var eat = this.animations.add('eat', [10,11,10,11,10,11], 10, 1);

    this.events.onAnimationComplete.add(function(){
        this.flip();
    }, this);

    this.animations.add('ball', [5], 10, 1);

    this.animations.play('leftIdle');
    this.anchor.x = 0.4;
    this.anchor.y = 0.7;
};

Dino.prototype = Object.create(Phaser.Sprite.prototype);
Dino.prototype.constructor = Tile;

Dino.prototype.updatePosition = function() {
    var x = this.tileX * TILE_SIZE + OFFSET_X + TILE_SIZE/2;
    var y = this.tileY * TILE_SIZE+ OFFSET_Y + TILE_SIZE/2;

    this.game.add.tween(this).to({x:x, y:y},
        130,
        Phaser.Easing.Cubic.InOut).start();
};

Dino.prototype.transform = function() {
    this.ballForm = !this.ballForm;

    if (this.ballForm) {
        this.animations.play('ball');
        this.anchor.x = 0.5;
        this.anchor.y = 0.6;
    }
    else {
        this.flip()
    }
};

Dino.prototype.flip = function() {
    if (this.faceLeft) {
        this.animations.play('leftIdle');
        this.anchor.x = 0.4;
        this.anchor.y = 0.7;
    }
    else {
        this.animations.play('rightIdle');
        this.anchor.x = 0.6;
        this.anchor.y = 0.7;
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
    this.animations.play('eat', 10, false);
};

Dino.prototype.sad = function() {
    this.animations.play('sad', 5, true);
};

Dino.prototype.happy = function() {
    this.animations.play('happy', 5, true);
};

Dino.prototype.toString = function() {
    return DINO_PLACEHOLDER;
};