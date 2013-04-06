var canvas;
var g;
var graph;

var t;
var view;
var dragging = false;

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

function graphUp(e) {
	if (view != null) {
		view.up(e);
	}
}

function graphDown(e) {
	if (view != null) {
		view.adjust(e);
	}
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
	
	if (dragging && view != null) view.adjust(e); 
}

function graphClick(e){
	var loc = getCursorPosition(e);
	var node = findNode(loc.x, loc.y);
	if(node != null){
		showMovie(node.movie);
	}
}

function Transformation(_x, _y, _scale) {
	this.x = _x;
	this.y = _y;
	this.scale = _scale;
	
	this.exe = function() {
		g.translate(t.x, t.y);
		g.scale(t.scale, t.scale);
	}
}

function View(_t) {
	this.trans = _t;
	this.lastloc;
	
	this.up = function(e) {
		dragging = false;
		var loc = getCursorPosition(e);
		this.lastloc = null;
	}
	
	this.adjust = function(e) {
		var loc = getCursorPosition(e);
		if (dragging = true) {
			if (this.lastloc != null) {
				this.trans.x = this.trans.x + loc.x - this.lastloc.x;
				this.trans.y = this.trans.y + loc.y - this.lastloc.y;
			} else {
				this.lastloc = loc;
			}
			if (this.lastloc.x != loc.x || this.lastloc.y != loc.y) this.lastloc = loc;
		} else {
			dragging = true;
			this.lastloc = loc;
		}
	}
	
	this.exe = function() {
		t.x = t.x + this.trans.x;
		t.y = t.y + this.trans.y;
	}
}

function render(){
	g.save();
	g.setTransform(1, 0, 0, 1, 0, 0); //just to be sure future drawing transformations
	g.clearRect(0, 0, canvas.width, canvas.height);
	g.restore();
	
	if (graph != null) {
		t.x = canvas.width / 2;
		t.y = canvas.height / 2;
		view.exe();
		g.setTransform(1, 0, 0, 1, 0, 0);
		t.exe();
		graph.draw(g, t);
	}
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
	t.exe();
	if (view == null) view = new View(new Transformation(0,0,1));
	render(t);
}

$(function(){
	canvas = $("#graph")[0];
	
	graph = new Graph();

	initCanvas();
	
	var info = new Movie("", "", "Hi there, welcome!", "", "This is Cinetre.es. To get started, add a movie from the bar above or import a few from your favorite source. Drag around the canvas to the left (or top, if you're on a mobile device) to explore your graphs! Once you've selected a movie, I'll find a few related movies for you. You can click a movie in that graph to get some more info about it. Move your move over a relation between two movies to see how they relate to each other.", "");
	showMovie(info);
	
	$("#graph").click(graphClick);
	$("#graph").mousemove(graphMove);
	$("#graph").mousedown(graphDown);
	$("#graph").mouseup(graphUp);
	$(window).resize(initCanvas);
});
