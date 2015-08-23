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

var TILE_SIZE = 90;
var COLUMNS = 9;
var ROWS = 7;

var SHEEP_PLACEHOLDER = "[S]";
var DINO_PLACEHOLDER = "[D]";
var ROMANS_PLACEHOLDER = "[^]";
var HOLE_PLACEHOLDER = "[O]";
var EMPTY_PLACEHOLDER = "[.]";