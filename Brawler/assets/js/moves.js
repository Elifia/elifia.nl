
Player.prototype.jump = function()
{
	if(this.onGround)
	{
		this.stamina -= 10;
		this.staminacooldown = 60;
		this.velocity.y -= 13;
	}
}

Player.prototype.roll = function()
{
	if( this.onGround && Math.abs(this.input.axes[0]) > 0.1 )
	{
		this.stamina -= 20;
		this.staminacooldown = 60;
		this.actionsDisabled = true;
		var t = 40;
		var rot = 360 / t;
		var i = this.id;
		
		if(this.input.axes[0] > 0)
		{
			var animation = setInterval(function()
			{
				if( t <= 0 ) 
				{
					clearInterval(animation);
					players[i].actionsDisabled = false;
				}
				else
				{
					players[i].angle += rot;
					players[i].velocity.x += players[i].onGround ? 0.75 : 0.075;
					t--;
				}
			}
			,1000/60);
		}
		else if(this.input.axes[0] < 0)
		{
			var animation = setInterval(function()
			{
				if( t <= 0 ) 
				{
					clearInterval(animation);
					players[i].actionsDisabled = false;
				}
				else
				{
					players[i].angle -= rot;
					players[i].velocity.x -= players[i].onGround ? 0.75 : 0.075;
					t--;
				}
			}
			,1000/60);
		}
		
		
		
		
	}
}

Player.prototype.dash = function()
{
	if( this.onGround && Math.abs(this.input.axes[0]) > 0.1 )
	{
		this.stamina -= 20;
		this.staminacooldown = 60;
		if(this.input.axes[0] > 0)
		{
			this.velocity.x += 20;
			for(var i = 0; i < 5; i++)
			{
				this.particles.push(new Particle(this.id, 'rgb(200,'+Math.floor(Math.random() * 100 + 100)+',100)', this.pos.x + this.size.x/2, this.pos.y + this.size.y, 10, (Math.random()+0.5)*-2, (Math.random()+0.5)*-1));
			}
		}
		else if(this.input.axes[0] < 0)
		{
			this.velocity.x -= 20;
			for(var i = 0; i < 5; i++)
			{
				this.particles.push(new Particle(this.id, 'rgb(200,'+Math.floor(Math.random() * 100 + 100)+',100)', this.pos.x + this.size.x/2, this.pos.y + this.size.y, 10, (Math.random()+0.5)*2, (Math.random()+0.5)*-1));
			}
		}
	}
}

Player.prototype.blink = function()
{
	if(!this.disabled.blink)
	{
		var vlen = Math.sqrt( Math.pow(this.input.axes[0],2) + Math.pow(this.input.axes[1],2) );
		if(vlen > 0.1)
		{
			this.stamina -= 20;
			this.staminacooldown = 60;
			this.disabled.blink = 1;
			
			for(var i = 0; i < 15; i++)
			{
				var brightness = Math.floor(Math.random() * 100);
				this.particles.push(new Particle(this.id, 'rgb('+(50+brightness)+','+(100+brightness)+','+(150+brightness)+')', this.pos.x + this.size.x/2, this.pos.y + this.size.y/2, 10, (Math.random()-0.5)*2, (Math.random()-0.5)*2));
			}
			
			this.pos.x += this.input.axes[0] / vlen * 250;
			this.pos.y += this.input.axes[1] / vlen * 250;
			//this.velocity.x = 0;
			this.velocity.y = 0;
			
			this.collision();
			for(var i = 0; i < 15; i++)
			{
				var brightness = Math.floor(Math.random() * 100);
				this.particles.push(new Particle(this.id, 'rgb('+(50+brightness)+','+(100+brightness)+','+(150+brightness)+')', this.pos.x + this.size.x/2, this.pos.y + this.size.y/2, 10, (Math.random()-0.5)*2, (Math.random()-0.5)*2));
			}
		}
	}
}

Player.prototype.hop = function()
{
	if(this.onGround)
	{
		this.stamina -= 20;
		this.staminacooldown = 60;
		this.velocity.y -= 22;
		
		for(var i = 0; i < 15; i++)
		{
			this.particles.push(new Particle(this.id, 'rgb(200,'+Math.floor(Math.random() * 100 + 100)+',100)', this.pos.x + this.size.x/2, this.pos.y + this.size.y, 10, (Math.random()-0.5)*2, (Math.random()+0.5)*-1));
		}
	}
}

Player.prototype.jet = function()
{
	if(!this.disabled.jet)
	{
		this.stamina -= 30;
		this.staminacooldown = 60;
		this.disabled.jet = 2;
		var i = this.id;
		var boost = 1;
		if( this.velocity.y < -3 )
		{
			this.velocity.y = -3;
		}
		var animation = setInterval(function()
		{
			players[i].velocity.y -= boost;
			boost -= 0.015;
			players[i].particles.push(new Particle(i, 'rgb(255,'+Math.floor(Math.random() * 150 + 25)+',0)', players[i].pos.x + players[i].size.x/2, players[i].pos.y + players[i].size.y, 10, (Math.random()-0.5)*3, (Math.random()+0.5)*1));
		}
		,1000/60);
		setTimeout(function()
		{
			clearInterval(animation);
			players[i].disabled.jet = 1;
		}
		,1000);
	}
}

Player.prototype.fly = function()
{
	if(!this.disabled.fly)
	{
		this.stamina -= 30;
		this.staminacooldown = 60;
		this.disabled.fly = 2;
		this.flying = true;
		var i = this.id;
		var animation = setInterval(function()
		{
			var brightness = Math.floor(Math.random() * 100);
			players[i].particles.push(new Particle(i, 'rgb('+(50+brightness)+','+(100+brightness)+','+(150+brightness)+')', players[i].pos.x + players[i].size.x*1, players[i].pos.y + players[i].size.y/2, 10, (Math.random()+0.5)*2, (Math.random()-0.1)*2));
			players[i].particles.push(new Particle(i, 'rgb('+(50+brightness)+','+(100+brightness)+','+(150+brightness)+')', players[i].pos.x + players[i].size.x*0, players[i].pos.y + players[i].size.y/2, 10, (Math.random()+0.5)*-3, (Math.random()-0.25)*2));
		}
		,1000/60);
		setTimeout(function()
		{
			clearInterval(animation);
			players[i].disabled.fly = 1;
			players[i].flying = false;
		}
		,2000);
	}
}

Player.prototype.flylong = function()
{
	if(!this.disabled.fly)
	{
		this.stamina -= 50;
		this.staminacooldown = 60;
		this.disabled.fly = 2;
		this.flying = true;
		var i = this.id;
		var animation = setInterval(function()
		{
			var brightness = Math.floor(Math.random() * 100);
			players[i].particles.push(new Particle(i, 'rgb('+(50+brightness)+','+(100+brightness)+','+(150+brightness)+')', players[i].pos.x + players[i].size.x*1, players[i].pos.y + players[i].size.y/2, 10, (Math.random()+0.5)*2, (Math.random()-0.1)*2));
			players[i].particles.push(new Particle(i, 'rgb('+(50+brightness)+','+(100+brightness)+','+(150+brightness)+')', players[i].pos.x + players[i].size.x*0, players[i].pos.y + players[i].size.y/2, 10, (Math.random()+0.5)*-3, (Math.random()-0.25)*2));
		}
		,1000/60);
		setTimeout(function()
		{
			clearInterval(animation);
			players[i].disabled.fly = 1;
			players[i].flying = false;
		}
		,8000);
	}
}
