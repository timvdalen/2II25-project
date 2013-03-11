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

function Graph() {
	nodes.sort(compareNodes);
	
	this.reconstruct() {
		nodes.sort(compareNodes);
	}
	
	this.draw(g) {
		var todo = nodes.slice(0);
		var links; //edges to neighbours
		var neighbours;
		var node;
		var pos;
		while (todo.length > 0) {
			node = todo.pop();
			pos = 
			node.x = pos[0];
			node.y = pos[1];
			node.draw(g);
			links = edges.filter(linksto(node));
			neighbours = todo.filter(linkedto(node, links));
		}
		
		for(int i = 0; i < edges.length; i++) {
			edges[i].draw(g);
		}
	}
}