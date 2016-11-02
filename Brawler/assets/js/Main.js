
if( "getGamepads" in navigator ) 
{
	var c;
	var ctx;
	var gameObjects = [];
	var gamePads = [];
	var players = [];
	var types = ['Electricity', 'Fire', 'Earth', 'Ice'];
	var flavour = ['electric','on fire','dirt','ice-cold'];
	var choices = [];
	var prev = [];
	var framecount = 0;
	
	$(document).ready(function()
	{
		c = $('#Game')[0];
		ctx = c.getContext("2d");
		
		update = setInterval(function()
		{
			framecount++;
			gamePads = navigator.getGamepads();
			
			for(var i = 0; i < gamePads.length; i++)
			{
				if(gamePads[i])
				{ 
					if(players[i])
					{
						players[i].input.axes = gamePads[i].axes;
						players[i].input.buttons = gamePads[i].buttons;
					}
					else
					{
						if(gamePads[i].buttons[0].pressed && !prev[i].buttons[0].pressed)
						{
							players[i] = new Player(i, choices[i]);
							gameObjects.push( players[i] );
							$('.playerinfo.player-'+i+' .choices').hide();
							$('.playerinfo.player-'+i+' .status').html('<span class="choice-'+choices[i]+'">Player '+i+' is '+flavour[choices[i]]+'!<span>');
							$('.playerinfo.player-'+i+' .status').append('<div class="health"><div style="width: 100%;"></div></div>');
							$('.playerinfo.player-'+i+' .status').append('<div class="stamina"><div style="width: 100%;"></div></div>');
						}
						else if(gamePads[i].buttons[14].pressed && !prev[i].buttons[14].pressed)
						{
							choices[i] = (choices[i] - 1 + 4) % 4;
							$('.playerinfo.player-'+i+' .choice').attr('class','choice choice-'+choices[i]).text(types[choices[i]]);
						}
						else if(gamePads[i].buttons[15].pressed && !prev[i].buttons[15].pressed)
						{
							choices[i] = (choices[i] + 1) % 4;
							$('.playerinfo.player-'+i+' .choice').attr('class','choice choice-'+choices[i]).text(types[choices[i]]);
						}
					}
					for(var j = 0; j < gamePads[i].buttons.length; j++)
					{
						prev[i].buttons[j] = {'pressed': gamePads[i].buttons[j].pressed};
					}
					
				}
			}
			
			for(var i = 0; i < gameObjects.length; i++)
			{
				if( "update" in gameObjects[i] ) 
				{
					gameObjects[i].update();
				}
			}
			
			for(var i = 0; i < gameObjects.length; i++)
			{
				if( "collision" in gameObjects[i] ) 
				{
					gameObjects[i].collision();
				}
			}
			
			ctx.clearRect(0, 0, c.width, c.height);
			
			for(var i = 0; i < gameObjects.length; i++)
			{
				if( "draw" in gameObjects[i] ) 
				{
					gameObjects[i].draw();
				}
			}
		}
		,1000/60);
		
		$(window).on('click', function()
		{
			//console.log(gamePads)
		});
		
		gameObjects.push( new Tile(300,350,200,50) );
		gameObjects.push( new Tile(700,350,200,50) );
	 
		gamePads = navigator.getGamepads();
		
		for(var i = 0; i < gamePads.length; i++)
		{
			if(gamePads[i])
			{
				addPlayer(i);
			}
		}
		
		$(window).on("gamepadconnected", function(e) {
			var i = e.originalEvent.gamepad.index;
			addPlayer(i);
		});
		
		$(window).on("gamepaddisconnected", function(e) {
			var i = e.originalEvent.gamepad.index;
			removePlayer(i)
		});
		
	});
	
	function addPlayer(i)
	{
		choices[i] = i%4;
		$("#Players .connectMessage").before(
			'<div class="playerinfo player-' + i + '">'+
				'<div>'+
					'<div class="status">Player ' + i + ' connected!</div>'+
					'<div class="choices">'+
						'<div>Choose an element:</div>'+
						'<div><- <span class="choice choice-'+choices[i]+'">'+types[choices[i]]+'</span> -></div>'+
					'</div>'+
				'</div>'+
			'<div>'
		);
		prev[i] = {'buttons': []}; 
		for(var j = 0; j < gamePads[i].buttons.length; j++)
		{
			prev[i].buttons[j] = {'pressed': gamePads[i].buttons[j].pressed};
		}
		
		var elem = $('#Players').find('.playerinfo').sort(cmp);
		$('#Players').prepend(elem);
		
		function cmp(a, b) {
			return a.className > b.className;
		}
		
		//players[i] = new Player(i, i);
		//gameObjects.push( players[i] );
	}
	
	function removePlayer(i)
	{
		$(".playerinfo.player-"+i).remove();
		if( players[i] )
		{
			gameObjects.splice( gameObjects.indexOf( players[i] ), 1 );
			delete players[i];
		}
	}
	
	function addV2(a, b)
	{
		return {'x': a.x+b.x,'y': a.y+b.y};
	}
	
	function subV2(a, b)
	{
		return {'x': a.x-b.x,'y': a.y-b.y};
	}
	
	function clone(obj){
		return JSON.parse(JSON.stringify(obj));
	}
}
 
