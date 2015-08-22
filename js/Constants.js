var VERSION = "v. 0.0.1";

var CONSTANT_STATES = {
    GAME:'GameState',
    BOOT:'Boot',
    PRELOAD:'Preload'
};

versioning = function(game) {
    var style = { font: "14px Arial", fill: "#000000", align: "center" };
    var text = game.add.text(775, 620, VERSION, style);
}
