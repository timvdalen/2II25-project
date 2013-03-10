function Node(_movie, _img, _x, _y, _size) {
	this.movie = _movie;
	this.image = _img;
	this.x = _x;
	this.y = _y;
	this.size = _size;
	this.mouseover = false;
	this.degree = 0;
	this.weight = 0;
	
	this.draw = function(g) {
		var color;
		var size;
		var x;
		var y;
		if (this.mouseover) {
			color = '#AA0000';
			size = this.size + 12;
			x = this.x - 12;
			y = this.y - 12;
		} else {
			color = '#000000';
			size = this.size;
			x = this.x;
			y = this.y;
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
	
	this.inBounds = function(x, y) {
		return (x >= this.x && x <= (this.x + this.size*2) && y >= this.y && y <= (this.y + this.size*2));
	}
	
	/*this.inBounds = function(x, y) {
		var dx = x - this.x;
		var dy = y - this.y;
		return Math.sqrt(dx*dx + dy*dy);
	}*/
}
