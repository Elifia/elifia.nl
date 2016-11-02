
function drawRect( col, x, y, w, h, angle )
{
	ctx.translate(x+w/2,y+h/2);
	if(angle)
	{
		ctx.rotate(angle*Math.PI/180);
	}
	
	ctx.strokeStyle = col;
	
	ctx.beginPath();
	
	ctx.moveTo( -w/2, -h/2 );
	ctx.lineTo( w/2-1, -h/2 );
	ctx.lineTo( w/2-1, h/2-1 );
	ctx.lineTo( -w/2, h/2-1 );
	ctx.lineTo( -w/2, -h/2 );
	
	ctx.stroke();
	
	ctx.closePath();
	
	if(angle)
	{
		ctx.rotate(-angle*Math.PI/180);
	}
	ctx.translate(-x-w/2,-y-h/2);
}

function drawCircle( col, x, y, r, opacity )
{
	ctx.strokeStyle = col;
	ctx.globalAlpha = opacity;
	
	ctx.beginPath();
	
	ctx.arc(x, y, r, 0, 2 * Math.PI, false);
	
	ctx.stroke();
	
	ctx.closePath();
	
	ctx.globalAlpha = 1;
}

function drawLightning( col, x, y, l, angle)
{
	ctx.translate(x,y);
	ctx.rotate(-angle*Math.PI/180);
	
	ctx.strokeStyle = col;
	
	ctx.beginPath();
	
	ctx.moveTo( 0,0 );
	if( framecount % 20 < 10)
	{
		ctx.lineTo(l/5, l/30);
		recursiveLightning(l/5, l/30, l, 5);
	}
	else
	{
		ctx.lineTo(l/5, -l/30);
		recursiveLightning(l/5, -l/30, l, 5);
	}
	
	ctx.stroke();
	
	ctx.closePath();
	
	ctx.rotate(angle*Math.PI/180);
	ctx.translate(-x,-y);
}

function recursiveLightning(x, y, l, d)
{
	ctx.moveTo(x,y);
	ctx.lineTo(x+l/10, y*3);
	ctx.moveTo(x,y);
	ctx.lineTo(x+l/5, -y);
	
	if(d > 0)
	{
		recursiveLightning(x+l/5, -y, l, d-1);
	}
}
