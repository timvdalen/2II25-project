function Node(_movie, _img, _x, _y){
	this.movie = _movie;
	this.image = _img;
	this.x = _x;
	this.y = _y;
	this.size = 50;
	this.mouseover = false;
	
	this.draw = function(g){
		var color;
		var size;
		if(this.mouseover){
			color = '#AA0000';
			size = this.size + 10;
		}else{
			color = '#000000';
			size = this.size;
		}

		g.save();
		g.beginPath();
		g.arc(this.x + size, this.y + size, size, 0, 2 * Math.PI);
		g.closePath();

		//var image_x = this.x;// + this.size;
		//var image_y = this.y;// + this.size/4;
		var ratio = this.image.height/this.image.width;
		
		g.clip();
		g.drawImage(this.image, this.x, this.y, size*2, size*ratio*2);
		g.beginPath();
		g.arc(this.x + size, this.y + size, size, 0, 2 * Math.PI);
		g.clip();
		g.lineWidth = 6;
		g.strokeStyle = color;
		g.stroke();
		g.closePath();
		g.restore();
	}
	
	this.inBounds = function(x, y){
		return (x >= this.x && x <= (this.x + this.size*2) && y >= this.y && y <= (this.y + this.size*2));
	}
}
