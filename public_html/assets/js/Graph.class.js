// returns an edge filter
function linksto(node) {
	function links(element, index, array) {
		return (node == element.node1 || node == element.node2);
	}
	return links;
} 

// returns a node filter
function linkedto(node, links) {
	function linked(element, index, array) {
		var link = false;
		for (var i = 0; i < links.length; i++) {
			if (element != node && (element == links[i].node1 || element == links[i].node2)) link = true;
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
			return 0;
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

function processBranch(node) {
	
}

function Graph() {
	this.x = 0;
	this.y = 0;
	this.nodes = [];
	this.edges = [];
	this.trees = [];
	this.treeids = [];
	
	var todo;

	this.order() {
		this.nodes.sort(compareNodes);
		todo = this.nodes.slice(0);
	}
	
	this.addnode = function(node) {
		nodes.push(node);
		trees.push(new Tree(node, treeids.length);
		treeids.push(trees.length-1); //trees[treeids[i]] will yield the tree with id i.
	}
	
	this.addedge = function(edge) {
		edges.push(edge);
		var atree = trees[treeids[edge.node1.treeid]];
		var btree = trees[treeids[edge.node2.treeid]];
		if (atree.nodes.length >= btree.nodes.length) {
			var merge = atree.add(edge);
			if (merge != -1) deletetree(merge);
		} else /*if (atree.nodes.length < btree.nodes.length)*/ {
			var merge = btree.add(edge);
			if (merge != -1) deletetree(merge);
		}
	}
	
	this.deletetree = function(treeid) {
		for (var i = treeid; i < trees.length-1; i++) {
			trees[i] = trees[i+1];
			treeids[trees[i].treeid] = i;
		}
		trees.pop();
	}
	
	this.draw = function(g) {	
		for (var i = 0; i < this.edges.length; i++) {
			this.edges[i].draw(g);
		}
		
		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].draw(g);
		}
	}
}