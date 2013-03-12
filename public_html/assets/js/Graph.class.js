//var nodes = [];
//var edges = [];

// returns an edge filter
function linksto(node) {
	function links(element, index, array) {
		return (node == element.moviea || node == element.movieb);
	}
	return links;
} 

// returns a node filter
function linkedto(node, links) {
	function linked(element, index, array) {
		var link = false;
		for (int i = 0; i < links.length; i++) {
			if (element != node && (element == links[i].moviea || element == links[i].movieb)) link = true;
		}
		return link;
	}
	return linked;
}
	
function compareNodes(a, b) {
	if (a.degree < b.degree) {
		return 1;
	} else if (a.degree > b.degree) {
		return -1;
	} else if (a.degree == b.degree) {
		if (a.weight < b.weight) {
			return 1;
		} else if (a.weight > b.weight) {
			return -1;
		} else {
			return = 0;
		}
	}
}

function getAngle(ax, ay, bx, by) {
	var dx = bx - ax;
	var dy = by - ay;
	return Math.atan2(dy, dx);
}

function getCoordinates(angle, r) {
	return [r*Math.cos(angle),r*Math.sin(angle)];
}

function processNode(_node, _parent, _neighbours) {
	hub = _node;
	var todo = _neighbours.slice(0);
	var node;
	var edgelength;
	var angle = 0;
	var root = true;
	if (_parent != null) {
		root = false;
		angle = getAngle(hub.x, hub.y, _parent.x, _parent.y;
	}
	var step = (2 * Math.PI) / _node.degree;
	while (todo.length > 0) {
		// assign positions to neighbouring nodes, as far away from the parent -> hub connection
		node = todo.pop();
		edgelength = node.degree * 50;
		angle += step;
		// set position
		var pos = getCoordinates(angle, edgelength);
		node.x = _parent.x + pos[0];
		node.y = _parent.y + pos[1];
	}
}

var todo;

function processBranch(node, parent) {
	if (todo.length > 0) {
		links = edges.filter(linksto(node));
		neighbours = todo.filter(linkedto(node, links));
		for (var i = 0; i < neighbours.length; i++) {
			processNode(node, parent, neighbours);
			processBranch(neighbours[i], node);
		}
	} else {
		return;
	}
}

function Graph() {
	this.reconstruct = function() {
		nodes.sort(compareNodes);
		
		var todo = nodes.slice(0);
		var root = todo.pop();
		
		root.x = canvas.width / 2;
		root.y = canvas.width / 2;
		
		if (todo.length > 0) {
			links = edges.filter(linksto(root));
			neighbours = todo.filter(linkedto(root, links));
			for (var i = 0; i < neighbours.length; i++) {
				processNode(root, null, neighbours);
				processBranch(neighbours[i], node);
			}
		} 
	}
	
	this.reconstruct();
	
	this.draw = function(g) {		
		for(var i = 0; i < edges.length; i++) {
			edges[i].draw(g);
		}
		
		for(var i = 0; i < nodes.length; i++) {
			nodes[i].draw(g);
		}
	}
}