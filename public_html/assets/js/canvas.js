function Node() {
	
}

function drawNode(x, y, size, weight) {
	var color1 = '#000000';
	var color2 = '#AA0000';

	g.beginPath();
	g.arc(x, y, size, 0, 2 * Math.PI, false);
	g.fillStyle = weight * color1 + (1-weight) * color2;
	g.fill();
	g.lineWidth = 2;
	g.strokeStyle = color1;
	g.stroke();
}

$(function(){
	var canvas = $("#graph")[0];
	canvas.width = $("#graph").width();
	canvas.height = $("#graph").height();

	var g = canvas.getContext("2d");

	g.font = "30px Arial"
	g.fillText($("#graph").width(), 10, 10);
});
