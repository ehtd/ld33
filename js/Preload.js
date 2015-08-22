var Preload = function(game) {

};

Preload.prototype.preload = function() {

    // TODO: Load resources

}

Preload.prototype.create = function() {

    console.log("Finish preload");
    this.game.state.start(CONSTANT_STATES.GAME);
}