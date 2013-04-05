function Edge(_node1, _node2, _relation) {
	this.node1 = _node1;
	this.node2 = _node2;
	this.mouseover = false;
	this.relation = _relation;
	
	this.node1.degree++;
	this.node1.weight += this.relation.weight;
	this.node2.degree++;
	this.node1.weight += this.relation.weight;
	
	this.draw = function(g) {
		var color, size;
		if (this.mouseover) {
			color = '#AA0000';
			size = (this.relation.weight*4) + 2;
		} else {
			color = '#000000';
			size = this.relation.weight * 4;
		}
		
		x1 = this.node1.x;
		y1 = this.node1.y;
		x2 = this.node2.x;
		y2 = this.node2.y;
		
		g.save();
		g.moveTo(x1,y1);
		g.lineTo(x2,y2);
		g.lineWidth = size;
		g.strokeStyle = color;
		g.stroke();
		g.restore();
		
		if(this.mouseover){
			var x, y, start, length, text, rot;
			start = (x1 < x2);
			x = x2-x1;
			y = y2-y1;
			
			length = Math.sqrt(x*x + y*y);
			text = this.relation.description + ": " + this.relation.object;
			
			g.save();
			g.font = '10pt arial';
			g.textAlign = 'left';
			g.fillStyle = '#000000';
			rot = (Math.PI/2) - Math.atan(x/y) + (start ? Math.PI : 0);
			g.rotate(rot);
			g.fillText(text, ((length-g.measureText(text).width)/2) + (start ? x1 : x2), (start ? y1 : y2) - (start ? 50 : 0));
			g.restore();
		}
	}
	
	this.inBounds = function(x0, y0, t) {
		// linker node (x1,y1)
		if( this.node1.x < this.node2.x ){
			x1 = this.node1.x;
			y1 = this.node1.y;
			x2 = this.node2.x;
			y2 = this.node2.y;
		}else{
			x2 = this.node1.x;
			y2 = this.node1.y;
			x1 = this.node2.x;
			y1 = this.node2.y;
		}
				
		//functie opstellen
		dydx = ( y1 - y2 ) / ( x1 - x2 );
		b = y1 - dydx * x1;
		f = dydx * (x0 - t.x) + b;
		
		return x1 < (x0 - t.x) && (x0 - t.x) < x2 && Math.abs(f - (y0 - t.y)) < 3; // 3 kan nog afhankelijk van dydx
	}
}
