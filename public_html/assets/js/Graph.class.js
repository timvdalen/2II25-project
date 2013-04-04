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

	this.order = function() {
		this.nodes.sort(compareNodes);
		todo = this.nodes.slice(0);
	}
	
	this.addnode = function(node) {
		this.nodes.push(node);
		this.trees.push(new Tree(node, this.treeids.length, this.trees));
		this.treeids.push(this.trees.length-1); //trees[treeids[i]] will yield the tree with id i.
		node.treeid = this.trees.length-1;
	}
	
	this.addedge = function(edge) {
		this.edges.push(edge);
		var atree = this.trees[this.treeids[edge.node1.treeid]];
		var btree = this.trees[this.treeids[edge.node2.treeid]];
		if (atree.nodes.length >= btree.nodes.length) {
			var merge = atree.add(edge);
			if (merge != -1) this.deletetree(merge);
			console.log(merge);
		} else /*if (atree.nodes.length < btree.nodes.length)*/ {
			var merge = btree.add(edge);
			if (merge != -1) this.deletetree(merge);
			console.log(merge);
		}
	}
	
	this.deletetree = function(treeid) {
		for (var i = treeid; i < this.trees.length-1; i++) {
			this.trees[i] = this.trees[i+1];
			this.treeids[trees[i].treeid] = i;
		}
		this.trees.pop();
	}
	
	this.fix = function(node) {
		// assign positions to a nodes tree
		console.log(node.treeid);
		console.log(this.treeids[node.treeid]);
		console.log(this.trees[this.treeids[node.treeid]]);
		v = new Visualisation(this.trees[this.treeids[node.treeid]].root)
		console.log(this.trees[this.treeids[node.treeid]].nodes);
		v.update();
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