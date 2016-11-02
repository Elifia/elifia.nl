
var Player = function(i, type)
{
	this.id = i;
	this.particles = [];
	
	this.health = 100;
	this.stamina = 100;
	this.staminacooldown = 0;
	
	this.pos = {'x': (i * 400 - 525) % 900 + 300, 'y': 500};
	this.size = {'x': 50, 'y': 50};
	this.angle = 0;
	
	this.drag = {'ground': 0.90, 'air': 0.99};
	this.gravity = 0.5;
	this.speed = 0.5;
	this.velocity = {'x': 0, 'y': 0};
	
	this.onGround = false;
	this.flying = false;
	this.actionsDisabled = false;
	this.disabled = {};
	
	/*Chrome buttons:
	
		0:  cross
		1:  circle
		2:  square
		3:  triangle
		4:  L1
		5:  R1
		6:  L2
		7:  R2
		8:  share
		9:  options
		10: L3
		11: R3
		12: up
		13: down
		14: left
		15: right
		16: PS
		17: touchpad
	*/
	this.input = {'axes': gamePads[this.id].axes, 'buttons': gamePads[this.id].buttons, 'prevButtons': []};
	for(var i = 0; i < this.input.buttons.length; i++)
	{
		this.input.prevButtons[i] = {'pressed': this.input.buttons[i].pressed};
	}
	
	this.types = [
		{
			'name': 'electricity',
			'colour': '#8bf',
			'moves': [
				'jump',
				'blink',
				'none',
				'fly',
				'shield',
				'bolt',
				'none',
				'EMP'
			]
		},
		{
			'name': 'fire',
			'colour': '#f55',
			'moves': [
				'jump',
				'roll',
				'none',
				'jet',
				'shield',
				'fireball',
				'none',
				'eruption'
			]
		},
		{
			'name': 'earth',
			'colour': '#b74',
			'moves': [
				'jump',
				'dash',
				'none',
				'hop',
				'shield',
				'sandslash',
				'none',
				'tremor'
			]
		},
		{
			'name': 'ice',
			'colour': '#acf',
			'moves': [
				'jump',
				'roll',
				'none',
				'flylong',
				'shield',
				'laser',
				'none',
				'frostmissile'
			]
		}
	]
	
	this.type = this.types[type];
};

Player.prototype.draw = function()
{
	drawRect(this.type.colour, this.pos.x, this.pos.y, this.size.x, this.size.y, this.angle);
	/*if(this.flying) 
	{
		drawLightning(this.type.colour, this.pos.x + this.size.x*1, this.pos.y + this.size.y/2, 50, 30);
		drawLightning(this.type.colour, this.pos.x + this.size.x*0, this.pos.y + this.size.y/2, 50, 150);
	}*/
	
	$('.playerinfo.player-'+this.id+' .status .stamina > div').width(this.stamina+'%');
	$('.playerinfo.player-'+this.id+' .status .health > div').width(this.health+'%');
	
	for(var i = 0; i < this.particles.length; i++)
	{
		this.particles[i].draw();
	}
};

Player.prototype.update = function()
{
	if(!this.flying) 
	{
		this.velocity.y += this.gravity;
	}
	
	if(this.stamina < 0)
	{
		this.stamina = 0;
		this.staminacooldown = 120;
	}
	
	if(this.staminacooldown <= 0)
	{
		this.stamina = Math.min(this.stamina + 0.75, 100);
	}
	else
	{
		this.staminacooldown--;
	}
	
	if(this.onGround || this.flying)
	{
		if(this.onGround)
		{
			for(var key in this.disabled)
			{
				if( this.disabled[key] === 1 ) this.disabled[key] = false;
			}
		}
		
		if( !this.actionsDisabled && Math.abs(this.input.axes[0]) > 0.1 )
		{
			this.velocity.x += this.input.axes[0] * this.speed;
		}
		
		if( this.flying && !this.actionsDisabled && Math.abs(this.input.axes[1]) > 0.1 )
		{
			this.velocity.y += this.input.axes[1] * this.speed;
		}
	
		this.velocity.x *= this.drag.ground;
		this.velocity.y *= this.drag.ground;
	}
	else
	{
		if( Math.abs(this.input.axes[0]) > 0.1)
		{
			this.velocity.x += this.input.axes[0] * this.speed / 10;
		}
	
		this.velocity.x *= this.drag.air;
		this.velocity.y *= this.drag.air;
	}
	if(!this.actionsDisabled && this.stamina > 0)
	{
		for(var i = 0; i <= 7; i++)
		{
			if( this.input.buttons[i].pressed && !this.input.prevButtons[i].pressed )
			{
				if( this.type.moves[i] in this )
				{
					this[this.type.moves[i]]();
				}
				else console.log(this.type.moves[i]);
			}
		}
	}
	
	this.pos.x += this.velocity.x;
	this.pos.y += this.velocity.y;
	
	this.onGround = false;
	
	for(var i = 0; i < this.input.buttons.length; i++)
	{
		this.input.prevButtons[i] = {'pressed': this.input.buttons[i].pressed};
	}
	
	for(var i = 0; i < this.particles.length; i++)
	{
		this.particles[i].update();
	}
};

Player.prototype.collision = function()
{
	this.boundaryCollision();
	
	for(var i = 0; i < gameObjects.length; i++)
	{
		if( gameObjects[i] !== this )
		{
			this.handleCollision( gameObjects[i] );
		}
	}
	
	this.boundaryCollision();
};

//Collision with edge of canvas
Player.prototype.boundaryCollision = function()
{
	if( this.pos.x < 0 )
	{
		this.pos.x = 0;
		this.velocity.x = 0;
	}
	/*if( this.pos.y < 0 )
	{
		this.pos.y = 0;
		this.velocity.y = 0;
	}*/
	if( this.pos.x + this.size.x > c.width )
	{
		this.pos.x = c.width - this.size.x;
		this.velocity.x = 0;
	}
	if( this.pos.y + this.size.y > c.height )
	{
		this.pos.y = c.height - this.size.y;
		this.velocity.y = 0;
		this.onGround = true;
	}
};

//Rectangular Collision Detection
Player.prototype.handleCollision = function(other)
{	
	var d = {'x': this.pos.x + this.size.x/2 - other.pos.x - other.size.x/2, 'y': this.pos.y + this.size.y/2 - other.pos.y - other.size.y/2}; //Calculate the distance between the objects
	var md = {'x': this.size.x/2 + other.size.x/2, 'y': this.size.y/2 + other.size.y/2}; //Calculate how close to each other the objects must be to be intersecting
	var intersect = {'x': md.x - Math.abs(d.x), 'y': md.y - Math.abs(d.y)}; //Calculate the intersection depth (negative if no intersection)
	
	if( Math.abs(d.x) < md.x && Math.abs(d.y) < md.y ) //Intersection is happening
	{
		if(intersect.x < intersect.y) //Collision will be handled on the x-axis
		{
			if(d.x > 0) //this is to the right of other
			{
				if( "collision" in other ) //other can be moved
				{
					this.pos.x += intersect.x/2;
					other.pos.x -= intersect.x/2;
					if(this.velocity.x < other.velocity.x)
					{
						this.velocity.x += other.velocity.x;
						other.velocity.x = this.velocity.x - other.velocity.x;
						this.velocity.x -= other.velocity.x;
					}
				}
				else
				{
					this.pos.x += intersect.x;
					if(this.velocity.x < 0 ) this.velocity.x = 0;
				}
			}
			else //this is to the left of other
			{
				if( "collision" in other ) //other can be moved
				{
					this.pos.x -= intersect.x/2;
					other.pos.x += intersect.x/2;
					if(this.velocity.x > other.velocity.x)
					{
						this.velocity.x += other.velocity.x;
						other.velocity.x = this.velocity.x - other.velocity.x;
						this.velocity.x -= other.velocity.x;
					}
				}
				else
				{
					this.pos.x -= intersect.x;
					if(this.velocity.x > 0 ) this.velocity.x = 0;
				}
			}
		}
		else
		{
			if(d.y > 0) //this is below other
			{
				if( "collision" in other && !this.onGround ) //other can be moved and so can this
				{
					this.pos.y += intersect.y/2;
					other.pos.y -= intersect.y/2;
					if(this.velocity.y < other.velocity.y)
					{
						this.velocity.y += other.velocity.y;
						other.velocity.y = this.velocity.y - other.velocity.y;
						this.velocity.y -= other.velocity.y;
					}
					other.onGround = true;
				}
				else if("collision" in other && this.onGround) //other can be moved but this cannot
				{
					other.pos.y -= intersect.y;
					if(other.velocity.y > 0 ) other.velocity.y = 0;
					other.onGround = true;
				}
				else
				{
					this.pos.y += intersect.y;
					if(this.velocity.y < 0 ) this.velocity.y = 0;
				}
			}
			else //this is above other
			{
				if( "collision" in other && !other.onGround) //other can be moved
				{
					this.pos.y -= intersect.y/2;
					other.pos.y += intersect.y/2;
					if(this.velocity.y > other.velocity.y)
					{
						this.velocity.y += other.velocity.y;
						other.velocity.y = this.velocity.y - other.velocity.y;
						this.velocity.y -= other.velocity.y;
					}
				}
				else
				{
					this.pos.y -= intersect.y;
					if(this.velocity.y > 0 ) this.velocity.y = 0;
				}
				this.onGround = true;
			}
		}
	}
};


//Octagonal Collision Detection
/*
this.hitbox = [
	{'x': this.size.x*0.1, 'y': 0},
	{'x': this.size.x*0.9, 'y': 0},
	{'x': this.size.x, 'y': this.size.y*0.1},
	{'x': this.size.x, 'y': this.size.y*0.9},
	{'x': this.size.x*0.1, 'y': this.size.y},
	{'x': this.size.x*0.9, 'y': this.size.y},
	{'x': 0, 'y': this.size.y*0.1},
	{'x': 0, 'y': this.size.y*0.9}
];
Player.prototype.handleCollision = function(other)
{	
	if ( this.pointCollision(addV2(this.hitbox[0],this.pos), other) || this.pointCollision(addV2(this.hitbox[1],this.pos), other) )
	{
		this.pos.y = other.pos.y + other.size.y;
		this.velocity.y = 0;
	}
	if ( this.pointCollision(addV2(this.hitbox[2],this.pos), other) || this.pointCollision(addV2(this.hitbox[3],this.pos), other) )
	{
		this.pos.x = other.pos.x - this.size.x;
		this.velocity.x = 0;
	}
	if ( this.pointCollision(addV2(this.hitbox[4],this.pos), other) || this.pointCollision(addV2(this.hitbox[5],this.pos), other) )
	{
		this.pos.y = other.pos.y - this.size.y;
		this.velocity.y = 0;
		this.onGround = true;
	}
	if ( this.pointCollision(addV2(this.hitbox[6],this.pos), other) || this.pointCollision(addV2(this.hitbox[7],this.pos), other) )
	{
		this.pos.x = other.pos.x + other.size.x;
		this.velocity.x = 0;
	}
};


Player.prototype.pointCollision = function(a,b)
{
	return ( a.x > b.x && a.x < b.x + b.w && a.y > b.y && a.y < b.y + b.h ) 
};
*/
