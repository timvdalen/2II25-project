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

function Tree(node, _treeid) {
	this.root = node;
	this.treeid = _treeid;
	this.nodes = [];		// may be depricated later
	this.nodes.push(node);// may be depricated later
	this.edges = [];
	
	this.add(edge) {
		if (edge.node1.treeid == this.id) {
			if (edge.node2.treeid == this.id) {
				//internal edge
				edges.push(edge);
				return -1; //no tree should be removed
			} else {
				newnode = edge.node2;
				oldnode = edge.node1;
				return this.attach(oldnode, newnode);
				//toch return newnode.treeid; //tree of the newnode is merged with this one and can be removed
			}
		}
		else if (edge.node2.treeid == this.id) {
			newnode = edge.node1;
			oldnode = edge.node2;
			return this.attach(oldnode, newnode);
			//return newnode.treeid; //tree of the newnode is merged with this one and can be removed
		} else {
			// edge is not part of this tree
			return -1; //this tree is not changed and should not affect other trees.
		}
	}
	
	this.rootify = function(parent, child) {
		// set child node as new root node of it's own subtree
		var links = (trees[child.treeid]).edges.filter(linksto(child));
		var neighbours = (this.nodes.slice(0)).filter(linkedto(parent, links));
		for (var i = 0; i < neighbours.length; i++) {
			if (neighbours[i] == parent) neighbours.splice(index, 1);//remove parent
			else {
				this.rootify(child, neighbours[i]);
			}
		}
		newnode.children = neighbours;
	}
	
	this.setid = function(root, id) {
		root.treeid = id;
		for (var i = 0; i < root.children.length; i++) {
			this.setid(root.children[i], id);
		}
	}
	
	this.addsubtree = function(node) {
		nodes.push(node);
		node.treeid = treeid;
		for (var i = 0; i < node.children.length; i++) {
			this.addsubtree(node.children[i]);
		}
	}
	
	this.attach = function(oldnode, newnode) {	
		// set newly attached node as new root node of it's own tree
		oldnode.children.push(newnode);
		this.rootify(oldnode, newnode);
		
		// add nodes to this tree 
		this.addsubtree(newnode);
		
		// return: id of the removed tree
		return newnode.treeid;
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