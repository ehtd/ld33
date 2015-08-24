var VERSION = "v 0.1.0";

var CONSTANT_STATES = {
    GAME:'GameState',
    BOOT:'Boot',
    PRELOAD:'Preload',
    MENU: 'Menu',
    END: 'End'
};

versioning = function(game) {
    var style = { font: "14px Arial", fill: "#AAAAAA", align: "center" };
    var text = game.add.text(950, 780, VERSION, style);
};

var TILE_SIZE = 90;
var COLUMNS = 9;
var ROWS = 7;
var OFFSET_X = (1000 - (TILE_SIZE * COLUMNS))/2;
var OFFSET_Y = 130;

// Grid keys
var SHEEP_PLACEHOLDER = "[S]";
var DINO_PLACEHOLDER = "[D]";
var ROMANS_PLACEHOLDER = "[^]";
var HOLE_PLACEHOLDER = "[O]";
var EMPTY_PLACEHOLDER = "[.]";

// Movement keys
var UP = "u";
var DOWN = "d";
var LEFT = "l";
var RIGHT = "r";
