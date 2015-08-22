var Game = function(game){

};

Game.prototype.preload = function() {

    // TODO: Load resources

}

Game.prototype.shutdown = function() {

}

Game.prototype.create = function() {

    console.log("Entering Game");

    this.game.stage.backgroundColor = '#DDDDDD';
    versioning(this.game);
}

Game.prototype.update = function() {

}