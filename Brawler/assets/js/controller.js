
var Controller = function(i)
{
	this.id = i;
	if(this.id === -1)
	{
		
	}
	else
	{
		this.gamepad = navigator.getGamepads()[this.id];
	}
	this.axes = [];
	this.buttons = [];
	this.prev = [];
	this.map();
}

Controller.prototype.update = function()
{
	for(var j = 0; j < Object.keys(this.buttons).length; j++)
	{
		this.prev[Object.keys(this.buttons)[j]] = this.buttons[Object.keys(this.buttons)[j]];
	}
	if(this.id === -1)
	{

	}
	else
	{
		this.gamepad = navigator.getGamepads()[this.id];
	}
	this.map();
}

Controller.prototype.map = function()
{
	if(this.id === -1)
	{
		this.axes[0] = keys[39] - keys[37] + keys[68] - keys[65];
		this.axes[0] = this.axes[0] < -1 ? -1 : this.axes[0] > 1 ? 1 : this.axes[0];
		this.axes[1] = keys[40] - keys[38] + keys[83] - keys[87];
		this.axes[1] = this.axes[1] < -1 ? -1 : this.axes[1] > 1 ? 1 : this.axes[1];
		this.buttons['left'] = keys[37] + keys[65];
		this.buttons['right'] = keys[39] + keys[68];
		this.buttons['up'] = keys[38] + keys[87];
		this.buttons['down'] = keys[40] + keys[83];
		this.buttons['jump'] = keys[32]; //space
		this.buttons['dodge'] = keys[69]; //E
		this.buttons['misc'] = keys[66]; //B
		this.buttons['mobility'] = keys[81] //Q
		this.buttons['light'] = mouse[0]; //left click
		this.buttons['heavy'] = mouse[2]; //right click
		this.buttons['shield'] = mouse[1]; //middle click
		this.buttons['parry'] = keys[16]; //shift
	}
	else
	{
		this.axes = this.gamepad.axes;

		if(this.gamepad.id.indexOf("Sony Computer Entertainment") > -1)
		{
			this.buttons['left'] = this.gamepad.buttons[14].value;
			this.buttons['right'] = this.gamepad.buttons[15].value;
			this.buttons['up'] = this.gamepad.buttons[12].value;
			this.buttons['down'] = this.gamepad.buttons[13].value;
			this.buttons['jump'] = this.gamepad.buttons[0].value;
			this.buttons['dodge'] = this.gamepad.buttons[1].value;
			this.buttons['misc'] = this.gamepad.buttons[2].value;
			this.buttons['mobility'] = this.gamepad.buttons[3].value;
			this.buttons['light'] = this.gamepad.buttons[5].value;
			this.buttons['heavy'] = this.gamepad.buttons[7].value;
			this.buttons['shield'] = this.gamepad.buttons[4].value;
			this.buttons['parry'] = this.gamepad.buttons[6].value;
		}
		else
		{
			this.buttons['left'] = -this.gamepad.axes[4];
			this.buttons['right'] = this.gamepad.axes[4];
			this.buttons['up'] = -this.gamepad.axes[5];
			this.buttons['down'] = this.gamepad.axes[5];
			this.buttons['jump'] = this.gamepad.buttons[0].value;
			this.buttons['dodge'] = this.gamepad.buttons[2].value;
			this.buttons['misc'] = this.gamepad.buttons[1].value;
			this.buttons['mobility'] = this.gamepad.buttons[3].value;
			this.buttons['light'] = this.gamepad.buttons[6].value;
			this.buttons['heavy'] = this.gamepad.buttons[7].value;
			this.buttons['shield'] = this.gamepad.buttons[4].value;
			this.buttons['parry'] = this.gamepad.buttons[5].value;
		}
	}
}