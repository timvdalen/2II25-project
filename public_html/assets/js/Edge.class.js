function Edge(_node1, _node2, _weight) {
	this.node1 = _node1;
	this.node2 = _node2;
	this.mouseover = false;
	this.weight = _weight;
	
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
	
	this.inBounds = function(x0, y0) {
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
		f = dydx * x0 + b;
		
		return x1 < x0 && x0 <x2 && abs(f - y0) < 3; // 3 kan nog afhankelijk van dydx
	}
}
