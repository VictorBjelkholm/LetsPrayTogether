var game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
	update: update,
	preload: preload,
  create: create,
  render: render
});

var circle;
var floor;

function createSelectionAroundUnit(unit) {
	var pos = unit.world;
	return game.add.sprite(pos.x - 17, pos.y - 17, 'selection');
}

function Unit(type) {
    this.type = "priest";
		this.selected = false;
		this.gameObject = null;
		this.selection = null;

    this.gameObject = game.add.sprite(game.world.centerX, game.world.centerY, 'unit');
    this.gameObject.inputEnabled = true;
    this.gameObject.input.useHandCursor = true;

    this.select = function() {
				if(!this.selected) {
					this.selected = true;
					this.selection = createSelectionAroundUnit(this.gameObject);
				}
    };

		this.deselect = function() {
			if(this.selected) {
				this.selected = false;
				this.selection.kill();
			}
		}

    this.gameObject.events.onInputDown.add(this.select, this);
}

function preload () {
    game.load.image('unit', 'assets/unit.png');
    game.load.image('selection', 'assets/selection.png');
}

var units = [];

function deselectUnits() {
	for(var i = 0; i < units.length; i++)	{
		units[i].deselect();
	}
}

function unitsSelected() {
	for(var i = 0; i < units.length; i++)	{
		if(units[i].selected) {
			return true;
		}
	}
	return false;
}

function isOverUnit() {
	for(var i = 0; i < units.length; i++)	{
		if(units[i].gameObject.input.pointerOver()) {
			return true;
		}
	}
	return false;
}

function create() {
		var unit = new Unit();
		units.push(unit)
}


function update() {
	if(game.input.mousePointer.isDown && !isOverUnit()) {
		if(unitsSelected()) {
			deselectUnits();
		}
	}
}

function render () {
}
