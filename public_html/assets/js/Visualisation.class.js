
function Section(_r, _node, _lparent, _rparent) {
	this.r = _r;
	this.node = _node;
	this.lparent = _lparent;
	this.rparent = _rparent;
	
	// node.level == ring.level - 1
	this.leftangle = Math.PI;
	this.rightangle = -Math.PI;
	this.slots = [];
	
	/* // tangentlimit will be disregarded for now
	this.tangentlimit = function() {
		//tangentlimit should be the starting point for the limits
		
	}
	*/
	
	this.init = function() {
		this.bisectorlimit();
		this.divide();
		this.assignpos();
	}
	
	this.bisectorlimit = function() {
		// left and right neighbours are on circle
		// bisector will go through middle of line between left and right
		// ring sections from lower levels should allready be assigned positions
		var lbisx = (this.node.x + lparent.x) / 2;
		var lbisy = (this.node.y + lparent.y) / 2;
		var rbisx = (this.node.x + rparent.x) / 2;
		var rbisy = (this.node.y + rparent.y) / 2;
		// the roots x and y coordinates will be kept at the origin
		// calculating the magnitude of vectors is trivial, it's r for all
		// take dot product of vectors and divide by magnitudes
		var lcosa = (lbisx * this.node.x + lbisy * this.node.y) / (2 * this.r)
		var rcosa = (this.node.x * rbisx + this.node.y * rbisy) / (2 * this.r)
		// set limitangles /*if more limiting*/
		this.leftangle = Math.acos(lcosa);
		this.rightangle = Math.acos(rcosa);
	}
	
	this.divide = function() {
		var range = leftangle - rightangle;
		var step = range / (this.node.children.length + 1);
		for (var i = 0; i < this.node.children.length; i++) {
			this.slots[i] = step / 2 + step * i;
		}
	}
	
	this.assignpos = function() {
		for (var i = 0; i < this.node.children.length; i ++) {
			this.node.children[i].x = this.r * cos(this.slots[i]);
			this.node.children[i].y = this.r * sin(this.slots[i]);
		}
	}
}

function Ring(_root, _level, _previousring) {
	this.root = _root;
	this.level = _level;
	this.nodes = [];
	this.sections = [];
	this.r = ringr(this.level);
	this.previousring = _previousring;
	
	this.ringr = function(lvl) {
		return (lvl * 80);
	}
	
	this.add = function(node) {
		var id = nodes.length;
		var left = null;
		
		i = id-1;
		while (i >= 0) {
			if (nodes[i].children.length > 0) {
				left = nodes[i];
				sections[i].rparent = node;
				// SECTION ALTERED UPDATE SECTION LIMITS
				i--;
				continue;
			}
		}
	
		this.nodes.push(node);
		sections[id] = new Section(this.ringr(this.level+1), node, left, null);
		sections[id].init();
	}
}

function Visualisation(_root) {
	this.root = _root;
	this.rings = [];
	
	this.makeRings = function (node, level) {
		if (!this.rings[level]) this.rings[level] = new Ring(this.root, level, rings[level-1]);
		this.rings[level].add(node);
		for (var i = 0; i < node.children.length; i++) {
			this.makeRings(node.children[i], level+1);
		}
	}
	
	this.update = function () {
		this.root.x = 0;
		this.root.y = 0;
		for (var i = 0; i < this.root.children.length; i++) this.makeRings(node.children[i], 1);
	}
}
