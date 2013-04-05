
function Section(_level, _r, _node, _lparent, _rparent) {
	this.r = _r;
	this.node = _node;
	this.lparent = _lparent;
	this.rparent = _rparent;
	this.level = _level;
	
	// node.level == ring.level - 1
	this.leftangle = Math.PI;
	this.rightangle = -Math.PI;
	this.slots = [];
	
	this.init = function() {
		this.tangentlimit();
		this.bisectorlimit();
		this.divide();
		this.assignpos();
	}
	
	this.tangentlimit = function() {
		if (this.level > 1) {
			// tangentlimit should be the starting point for the limits
			// calculate next radius
			var nextr = radius(this.level+1);

			// middle angle
			var mid;
			if (this.node.x == 0) {
				mid = Math.atan(this.node.y / this.node.x);
			} else {
				if (this.node.y > 0) mid = Math.PI / 2;
				else mid = -Math.PI / 2; // if this.node.y == 0, SHIT;
			}
			
			// difference
			var dif = Math.acos(this.r / nextr);
			
			// limit
			this.leftangle = mid - dif;
			this.rightangle = mid + dif;
		}
	}
	
	this.bisectorlimit = function() {
		if (this.lparent) {
			// step 1
			// left and right neighbours are on circle
			// bisector will go through middle of line between left and right
			// ring sections from lower levels should allready be assigned positions
			var lbisx = (this.node.x + this.lparent.x) / 2;
			var lbisy = (this.node.y + this.lparent.y) / 2;
			// step 2
			// the roots x and y coordinates will be kept at the origin
			// calculating the magnitude of vectors is trivial, it's r for all
			// take dot product of vectors and divide by magnitudes
			var lcosa = (lbisx * this.node.x + lbisy * this.node.y) / (2 * this.r)
			// step 3
			// set limitangles /*if more limiting*/
			var a = Math.acos(lcosa);
			if (a < this.leftangle) this.leftangle = a;
		}
	
		if (this.rparent) {
			// step 1
			var rbisx = (this.node.x + this.rparent.x) / 2;
			var rbisy = (this.node.y + this.rparent.y) / 2;
			// step 2
			var rcosa = (this.node.x * rbisx + this.node.y * rbisy) / (2 * this.r)
			// step 3
			var a = Math.acos(rcosa);
			if (a > this.rightangle) this.rightangle = a;
		}
	}
	
	this.divide = function() {
		var range = this.leftangle - this.rightangle;
		var step = range / (this.node.children.length + 1);
		for (var i = 0; i < this.node.children.length; i++) {
			this.slots[i] = this.leftangle + step / 2 + step * i;
		}
	}
	
	this.assignpos = function() {
		console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASIGN");
		console.log(this.node.children.length);
		for (var i = 0; i < this.node.children.length; i ++) {
			this.node.children[i].x = this.r * Math.cos(this.slots[i]);
			this.node.children[i].y = this.r * Math.sin(this.slots[i]);
			console.log(" + assign position + ");
			console.log(this.node.children[i].x + ", " + this.node.children[i].y);
			console.log(this.node.children[i]);
			console.log(" + end assign position + ");
		}
	}
}

function radius(lvl) {
	return (lvl * 120);
}

function Ring(_root, _level, _previousring) {
	this.root = _root;
	this.level = _level;
	this.nodes = [];
	this.sections = [];
	this.r = radius(this.level);
	this.previousring = _previousring;
	
	this.add = function(node) {
		var id = this.nodes.length;
		var left = null;
		
		i = id-1;
		while (i >= 0) {
			if (this.nodes[i].children.length > 0) {
				left = this.nodes[i];
				this.sections[i].rparent = node;
				// SECTION ALTERED UPDATE SECTION LIMITS
				i--;
				continue;
			}
		}
	
		this.nodes.push(node);
		this.sections[id] = new Section(this.level+1, radius(this.level+1), node, left, null);
		this.sections[id].init();
	}
}

function Visualisation(_root) {
	this.root = _root;
	this.rings = [];
	console.log("treestructure");
	console.log(this.root);
	
	this.makeRings = function (node, level) {
		if (!this.rings[level]) this.rings[level] = new Ring(this.root, level, this.rings[level-1]);
		this.rings[level].add(node);
		/*
		console.log("makerings");
		console.log(level);
		console.log(node);
		console.log(this.rings[level].nodes);
		console.log("endmakerings");
		*/
		for (var i = 0; i < node.children.length; i++) {
			this.makeRings(node.children[i], level+1);
		}
	}
	
	this.update = function () {
		this.root.x = 0;
		this.root.y = 0;
		this.makeRings(this.root, 0);
		//for (var i = 0; i < this.root.children.length; i++) this.makeRings(this.root.children[i], 1);
	}
}
