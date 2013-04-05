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

// compares nodes for sorting
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

function Tree(node, _treeid, trees) {
	this.root = node;
	this.treeid = _treeid;
	this.nodes = [];		// may be depricated later
	this.nodes.push(node);// may be depricated later
	this.edges = [];
	this.othertrees = trees;
	
	this.add = function(edge) {
		if (edge.node1.treeid == this.treeid) {
			if (edge.node2.treeid == this.treeid) {
				//internal edge
				this.edges.push(edge);
				return -1; //no tree should be removed
			} else {
				var newnode = edge.node2;
				var oldnode = edge.node1;
				return this.attach(oldnode, newnode);
				//toch return newnode.treeid; //tree of the newnode is merged with this one and can be removed
			}
		}
		else if (edge.node2.treeid == this.treeid) {
			var newnode = edge.node1;
			var oldnode = edge.node2;
			return this.attach(oldnode, newnode);
			//return newnode.treeid; //tree of the newnode is merged with this one and can be removed
		} else {
			console.log("edgenode1: " + edge.node1.treeid);
			console.log("edgenode2: " + edge.node2.treeid);
			console.log("this.treeid: " + this.treeid);
			// edge is not part of this tree
			return -1; //this tree is not changed and should not affect other trees.
		}
	}
	
	this.todo = [];
	
	this.rootify = function(parent, child) {
		var i = todo.indexOf(child);
		if (i != -1) {
			todo.splice(i, 1);
			// set child node as new root node of it's own subtree
			var links = (this.othertrees[child.treeid]).edges.filter(linksto(child));
			var neighbours = (this.nodes.slice(0)).filter(linkedto(parent, links));
			for (var i = 0; i < neighbours.length; i++) {
				if (neighbours[i] == parent) neighbours.splice(index, 1);//remove parent
				else {
					this.rootify(child, neighbours[i]);
				}
			}
			child.children = neighbours;
		}
	}
	
	this.setid = function(root, id) {
		root.treeid = id;
		for (var i = 0; i < root.children.length; i++) {
			this.setid(root.children[i], id);
		}
	}
	
	this.addsubtree = function(node) {
		this.nodes.push(node);
		node.treeid = this.treeid;
		for (var i = 0; i < node.children.length; i++) {
			this.addsubtree(node.children[i]);
		}
	}
	
	this.attach = function(oldnode, newnode) {	
		// set newly attached node as new root node of it's own tree
		oldnode.children.push(newnode);
		this.todo = this.nodes.slice(0);
		this.rootify(oldnode, newnode);
		
		// add nodes to this tree 
		console.log("add from " + newnode.treeid + " to " + oldnode.treeid);
		var merge = newnode.treeid;
		this.addsubtree(newnode);
		
		// return: id of the removed tree
		console.log("move to delete tree " + merge);
		return merge;
	}
	
/*
	this.maketree = function(node) {
		var todo = this.nodes.slice(0);
		
	}
	
	this.
	
	this.reconstruct = function(node) {
		for (var i = 0; i < node.children.length; i++) {
			reconstruct(node.children[i]);
		}
	}
*/
}