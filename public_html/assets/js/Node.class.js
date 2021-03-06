function Node(_movie, _img, _x, _y, _size) {
	this.movie = _movie;
	this.image = _img;
	this.x = _x;
	this.y = _y;
	this.size = _size;
	this.mouseover = false;
	this.degree = 0;
	this.weight = 0;
	this.treeid = -1;
	this.children = [];
	
	this.offset = 0;
	
	this.draw = function(g, t) {
		var color;
		var size;
		var x;
		var y;
		if (this.mouseover) {
			color = '#AA0000';
			size = this.size + 12;
			x = this.x - size;
			y = this.y - size;
		} else {
			color = '#000000';
			size = this.size;
			x = this.x - size;
			y = this.y - size;
		}
		
		g.save();
		g.beginPath();
		g.arc(x + size, y + size, size, 0, 2 * Math.PI);
		g.closePath();

		var ratio = this.image.height/this.image.width;
		
		g.clip();
		g.drawImage(this.image, x, y, size*2, size*ratio*2);
		g.beginPath();
		g.arc(x + size, y + size, size, 0, 2 * Math.PI);
		g.clip();
		g.lineWidth = 6;
		g.strokeStyle = color;
		g.stroke();
		g.closePath();
		g.restore();
	}
	
	this.inBounds = function(x, y, t) {
		var dx = x - t.x - this.offset - this.x;
		var dy = y - t.y - this.y;
		return ((this.size * t.scale) > Math.sqrt(dx*dx + dy*dy));
	}
}
