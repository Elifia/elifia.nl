
var Tile = function(x,y,w,h)
{
	this.pos = {'x': x, 'y': y};
	this.size = {'x': w, 'y': h};
};

Tile.prototype.draw = function()
{
	drawRect('#fff', this.pos.x, this.pos.y, this.size.x, this.size.y);
};
