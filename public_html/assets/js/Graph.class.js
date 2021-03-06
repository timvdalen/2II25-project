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
	
	this.findNode = function(node){
		for(var i = 0; i < this.nodes.length; i++){
			if(node.movie.title == this.nodes[i].movie.title){
				return this.nodes[i];
			}
		}
		this.addNode(node);
		return node;
	}
	this.addWithoutEdge = this.findNode;

	this.order = function() {
		this.nodes.sort(compareNodes);
		todo = this.nodes.slice(0);
	}
	
	this.addNode = function(node) {
		this.nodes.push(node);
		this.trees.push(new Tree(node, this.treeids.length, this.trees, this.treeids));
		this.treeids.push(this.trees.length-1); //trees[treeids[i]] will yield the tree with id i.
		node.treeid = this.treeids.length-1;
	}
	
	this.addEdge = function(edge) {		
		edge.node1 = this.findNode(edge.node1);
		edge.node2 = this.findNode(edge.node2);
		
		this.edges.push(edge);
		var atree = this.trees[this.treeids[edge.node1.treeid]];
		var btree = this.trees[this.treeids[edge.node2.treeid]];
		if (atree.nodes.length >= btree.nodes.length) {
			var merge = atree.add(edge);
			if (merge != -1) this.deletetree(merge);
		} else /*if (atree.nodes.length < btree.nodes.length)*/ {
			var merge = btree.add(edge);
			if (merge != -1) this.deletetree(merge);
		}
	}

	this.deletetree = function(treeid) {
		for (var i = treeid; i < this.trees.length-1; i++) {
			this.trees[i] = this.trees[i+1];
			this.treeids[this.trees[i].treeid] = i;
		}
		this.trees.pop();
	}
	
	this.fix = function(_node) {
		var node = this.findNode(_node);
		// assign positions to a nodes tree
		v = new Visualisation(this.trees[this.treeids[node.treeid]].root)
		v.update();
	}

	this.draw = function(g, t) {	
		var spacing = 300;
		var space = 0;
		
		for (var t = 0; t < this.trees.length; t++) {
			for (var i = 0; i < this.trees[t].edges.length; i++) {
				this.trees[t].edges[i].offset = space;
				this.trees[t].edges[i].draw(g, t);
			}
			
			for (var i = 0; i < this.trees[t].nodes.length; i++) {
				this.trees[t].nodes[i].offset = space;
				this.trees[t].nodes[i].draw(g, t);
			}
			
			g.translate(300, 0);
			space += spacing;
		}
	}
}
