function Node(_movie, _img, _x, _y){
	this.movie = _movie;
	this.image = _img;
	this.x = _x;
	this.y = _y;
	this.size = 50;
	this.selected = false;
	
	this.draw = function(g){
		var color1;
		if(this.selected){
			color1 = '#0000FF';
		}else{
			color1 = '#000000';
		}
		var color2 = '#AA0000';

		g.beginPath();
		g.arc(this.x + this.size, this.y + this.size, this.size, 0, 2 * Math.PI);
		g.fillStyle = color2;
		g.fill();
		g.lineWidth = 2;
		g.strokeStyle = color1;
		g.stroke();
		
		var image_x = this.x + this.size/2;
		var image_y = this.y + this.size/4;
		var ratio = this.image.height/this.image.width;
		
		g.drawImage(this.image, image_x, image_y, this.size, this.size*ratio);
	}
	
	this.inBounds = function(x, y){
		return (x >= this.x && x <= (this.x + this.size*2) && y >= this.y && y <= (this.y + this.size*2));
	}
}
