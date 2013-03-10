function Node() {
	
}

function drawNode(g, x, y, size, weight) {
	var color1 = '#000000';
	var color2 = '#AA0000';

	g.beginPath();
	g.arc(x, y, size, 0, 2 * Math.PI, false);
	g.fillStyle = color2;
	g.fill();
	g.lineWidth = 2;
	g.strokeStyle = color1;
	g.stroke();
}

$(function(){
	var canvas = $("#graph")[0];
	 var width = $("#graph").width();
	 var heigh = $("#graph").height();
	
	canvas.width = width
	canvas.height = height

	var g = canvas.getContext("2d");

	g.font = "30px Arial"
	g.fillText(canvas.width, 10, 40);
	g.fillText(canvas.height, 100, 40);
	
	drawNode(g, 200, 30, 6, 1);
	drawNode(g, 250, 30, 8, 1);
	drawNode(g, 300, 30, 10, 1);
	drawNode(g, 350, 30, 8, 1);
	drawNode(g, 400, 30, 6, 1);
});



