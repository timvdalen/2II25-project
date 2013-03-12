//var nodes = [];
//var edges = [];
var canvas;
var g;
var graph;

function showMovie(movie){
	$("#movie-title").text(movie.title);
	$("#movie-image").attr("src", movie.poster);
	$("#movie-overview").text(movie.overview);
	if(movie.trailer_link != ""){
		$("#movie-trailer").data("link", movie.trailer_link).text("Watch trailer").show();
	}else{
		$("#movie-trailer").hide();
	}
	initCanvas();
}

function getCursorPosition(e) {
	var x;
	var y;
	if(e.pageX != undefined && e.pageY != undefined){
		x = e.pageX;
		y = e.pageY;
	}else{
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;
	
	return {x: x, y: y};
}

function findNode(x, y){
	for(var i=0; i<nodes.length; i++){
		var node = nodes[i];
		if(node.inBounds(x, y)){
			return node;
		}
	}
	return null;
}

function findEdge(x, y){
	for(var i=0; i<edges.length; i++){
		var edge = edges[i];
		if(edge.inBounds(x, y)){
			return edge;
		}
	}
	return null;
}

function graphMove(e){
	var loc = getCursorPosition(e);
	
	var node = findNode(loc.x, loc.y);
	if(node != null){
		node.mouseover = true;
		render();
	}else{
		for(var i=0; i<nodes.length; i++){
			nodes[i].mouseover = false;
		}
		render();
	}
	
	var edge = findEdge(loc.x, loc.y);
	if(edge != null){
		edge.mouseover = true;
		render();
	}else{
		for(var i=0; i<edges.length; i++){
			edges[i].mouseover = false;
		}
		render();
	}
}

function graphClick(e){
	var loc = getCursorPosition(e);
	var node = findNode(loc.x, loc.y);
	if(node != null){
		showMovie(node.movie);
	}
}

function render(){
	g.save();
	g.setTransform(1, 0, 0, 1, 0, 0); //just to be sure future drawing transformations
	g.clearRect(0, 0, canvas.width, canvas.height);
	g.restore();
	
	graph.draw(g);
}

function initCanvas(){
	var width = $("#graph").width();
	var height = $("#graph").height();
	
	canvas.width = width;
	canvas.height = height;

	g = canvas.getContext("2d");

	render();
}

$(function(){
	canvas = $("#graph")[0];

	initCanvas();

	for(var i=0; i<movies.length; i++){
		var movie = movies[i];
		var img = jQuery("<img>").attr("src", movie.poster).load({
			movie: movie,
			i: i
		}, function(e){
			var node = new Node(e.data.movie, $(this)[0], 200*(e.data.i+1), 50, 50);
			nodes.push(node);
			if (nodes.length > 1) {
				edges.push(new Edge(node, nodes[0], 3));
			}
			graph.reconstruct();
		});
		$("#images_preload").append(img);
	}
	
	graph = new Graph();
	
	showMovie(movies[0]);
	
	$("#graph").click(graphClick);
	$("#graph").mousemove(graphMove);
	$(window).resize(initCanvas);
});
