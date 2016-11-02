
var Particle = function(parent, col, x, y, r, vx, vy)
{
	this.parent = parent;
	
	this.pos = {'x': x, 'y': y};
	this.radius = r;
	this.velocity = {'x': vx, 'y': vy};
	
	this.colour = col;
	this.life = 1;
}

Particle.prototype.draw = function()
{
	if( this.life > 0 )
	{
		drawCircle(this.colour, this.pos.x, this.pos.y, this.radius, this.life);
	}
};

Particle.prototype.update = function()
{
	this.life -= 0.02; 
	if( this.life <= 0 )
	{
		players[this.parent].particles.splice(this, 1);
		delete this;
	}
	
	this.pos.x += this.velocity.x;
	this.pos.y += this.velocity.y;
};
