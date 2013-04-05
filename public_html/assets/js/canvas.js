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
	for(var i=0; i<graph.nodes.length; i++){
		var node = graph.nodes[i];
		if(node.inBounds(x, y, t)){
			return node;
		}
	}
	return null;
}

function findEdge(x, y){
	for(var i=0; i<graph.edges.length; i++){
		var edge = graph.edges[i];
		if(edge.inBounds(x, y, t)){
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
		for(var i=0; i<graph.nodes.length; i++){
			graph.nodes[i].mouseover = false;
		}
		render();
	}
	
	var edge = findEdge(loc.x, loc.y);
	if(edge != null){
		edge.mouseover = true;
		render();
	}else{
		for(var i=0; i<graph.edges.length; i++){
			graph.edges[i].mouseover = false;
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

var t;

function Transformation(_x, _y, _scale) {
	this.x = _x;
	this.y = _y;
	this.scale = _scale;
}

function render(transformation){
	g.save();
	g.setTransform(1, 0, 0, 1, 0, 0); //just to be sure future drawing transformations
	g.clearRect(0, 0, canvas.width, canvas.height);
	g.restore();

	g.translate(t.x, t.y);
	g.scale(t.scale);
	
	if (graph != null) graph.draw(g, t);
}

function initCanvas(){
	var width = $("#graph").width();
	var height = $("#graph").height();
	
	canvas.width = width;
	canvas.height = height;

	g = canvas.getContext("2d");
	
	//VERY TEMPORARY REPLACE WITH SCROLLING MECHANICS
	// todo: SCALING, SCROLLING, note: KEEP IN MIND MOUSEOVERS, remove: EDGE MOUSEOVER (optional)
	t = new Transformation(300,300,1);
	render(t);
}

$(function(){
	canvas = $("#graph")[0];
	
	graph = new Graph();

	initCanvas();

	for(var i=0; i<movies.length; i++){
		var movie = movies[i];
		var img = jQuery("<img>").attr("src", movie.poster).load({
			movie: movie,
			i: i
		}, function(e){
			var node = new Node(e.data.movie, $(this)[0], 200*(e.data.i+1), 50, 50);
			graph.addWithoutEdge(node);
			if (graph.nodes.length > 0) {
				graph.addEdge(new Edge(node, graph.nodes[0], graph.nodes.length));
			}
			graph.fix(node);
			
			/*graph.nodes.push(node);
			if (graph.nodes.length > 1) {
				graph.edges.push(new Edge(node, graph.nodes[0], 3));
			}
			graph.reconstruct();*/
			render();
		});
		$("#images_preload").append(img);
	}
	
	showMovie(movies[0]);
	
	$("#graph").click(graphClick);
	$("#graph").mousemove(graphMove);
	$(window).resize(initCanvas);
});
