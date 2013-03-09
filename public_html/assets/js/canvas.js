var canvas = document.getElementById("graph");
var g = canvas.getContext("2d");
var color1 = '#000000';
var color2 = '#AA0000';

g.font = "30px Arial"
g.fillText(canvas.width, 10, 10);

function Node() {
	
}

function drawNode(x, y, size, weight) {
	g.beginPath();
	g.arc(x, y, size, 0, 2 * Math.PI, false);
	g.fillStyle = weight * color1 + (1-weight) * color2;
	g.fill();
	g.lineWidth = 2;
	g.strokeStyle = color1;
	g.stroke();
}

