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
	
	this.inBounds = function(x, y) {
		return 0;
	}
}
