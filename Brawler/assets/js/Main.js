
if( "getGamepads" in navigator ) 
{
	var c;
	var ctx;
	var gameObjects = [];
	var gamePads = [];
	var controllers = [];
	var players = [];
	var types = ['Electricity', 'Fire', 'Earth', 'Ice'];
	var flavour = ['electric','on fire','dirt','ice-cold'];
	var choices = [];
	var framecount = 0;
	var keys = [];
	var mouse = [];

	for(var i = 0; i < 100; i++)
	{
		keys[i] = 0;
	}
	
	$(document).ready(function()
	{
		c = $('#Game')[0];
		ctx = c.getContext("2d");
		
		update = setInterval(function()
		{
			framecount++;
			gamePads = navigator.getGamepads();
			
			for(var i = -1; i < controllers.length; i++)
			{
				if(controllers[i])
				{
					if( "update" in controllers[i] ) 
					{
						controllers[i].update();
					}
				}
			}
			
			for(var i = -1; i < controllers.length; i++)
			{
				if(controllers[i])
				{ 
					if(players[i])
					{
						players[i].input = controllers[i];
					}
					else
					{
						if(controllers[i].buttons['jump'] > .5 && !controllers[i].prev['jump'] > .5)
						{
							players[i] = new Player(i, choices[i]);
							gameObjects.push( players[i] );
							$('.playerinfo.player-'+i+' .choices').hide();
							$('.playerinfo.player-'+i+' .status').html('<span class="choice-'+choices[i]+'">Player '+ (i+1) +' is '+flavour[choices[i]]+'!<span>');
							$('.playerinfo.player-'+i+' .status').append('<div class="health"><div style="width: 100%;"></div></div>');
							$('.playerinfo.player-'+i+' .status').append('<div class="stamina"><div style="width: 100%;"></div></div>');
						}
						else if(controllers[i].buttons['left'] > .5 && !controllers[i].prev['left'] > .5)
						{
							choices[i] = (choices[i] - 1 + 4) % 4;
							$('.playerinfo.player-'+i+' .choice').attr('class','choice choice-'+choices[i]).text(types[choices[i]]);
						}
						else if(controllers[i].buttons['right'] > .5 && !controllers[i].prev['right'] > .5)
						{
							choices[i] = (choices[i] + 1) % 4;
							$('.playerinfo.player-'+i+' .choice').attr('class','choice choice-'+choices[i]).text(types[choices[i]]);
						}
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
			console.log(controllers);
		});
		
		gameObjects.push( new Tile(300,350,200,50) );
		gameObjects.push( new Tile(700,350,200,50) );
	 
		gamePads = navigator.getGamepads();
		

		addPlayer(-1);
		for(var i = 0; i < gamePads.length; i++)
		{
			if(gamePads[i])
			{
				addPlayer(i);
			}
		}

		$(document).on("mousedown", function(e)
		{
			if(e.button === 2) e.preventDefault();
			mouse[e.button] = 1;
		});

		$(document).on("mouseup", function(e)
		{
			mouse[e.button] = 0;
		});

		$(document).on("keydown", function(e)
		{
			if(e.keyCode < 100) e.preventDefault();
			keys[e.keyCode] = 1;
		});

		$(document).on("keyup", function(e)
		{
			keys[e.keyCode] = 0;
		});
		
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
		choices[i] = (i+4)%4;
		$("#Players .connectMessage").before(
			'<div class="playerinfo player-' + i + '">'+
				'<div>'+
					'<div class="status">Player ' + (i+1) + ' connected!</div>'+
					'<div class="choices">'+
						'<div>Choose an element:</div>'+
						'<div><- <span class="choice choice-'+choices[i]+'">'+types[choices[i]]+'</span> -></div>'+
					'</div>'+
				'</div>'+
			'<div>'
		);
		
		var elem = $('#Players').find('.playerinfo').sort(cmp);
		$('#Players').prepend(elem);
		
		function cmp(a, b) {
			return a.className > b.className;
		}
		
		controllers[i] = new Controller(i);
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
		if( controllers[i] )
		{
			delete controllers[i];
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
 
