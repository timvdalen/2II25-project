function Edge(_node1, _node2, _weight) {
	this.node1 = _node1;
	this.node2 = _node2;
	this.mouseover = false;
	this.weight = _weight;
	
	this.node1.degree++;
	this.node1.weight += this.weight;
	this.node2.degree++;
	this.node1.weight += this.weight;
	
	this.draw = function(g) {
		var color;
		var size;
		if (this.mouseover) {
			color = '#AA0000';
			size = this.weight + 2;
		} else {
			color = '#000000';
			size = this.weight;
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
