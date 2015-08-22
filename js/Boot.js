var Boot = function(game) {

};

Boot.prototype.preload = function() {

    //TODO: Preloader

}

Boot.prototype.create = function() {

    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;
    console.log("Finish boot");

    this.game.state.start(CONSTANT_STATES.PRELOAD);
}