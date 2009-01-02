var Draw = new Class({

	initialize: function(id){
		//var element = new Element('canvas', {height: 270, width: 270, id: id}).inject('toast');
		//if (window.G_vmlCanvasManager) element = G_vmlCanvasManager.initElement(element);
		var element = new Canvas({id: id, height: 270, width: 270}).inject('toast');
		this.element = $(element);
		this.canvas = this.element.getContext('2d');
	},

	inject: function(where, how){
		this.element.inject(where, how);
		return this;
	},

	setFillColor: function(color){
		this.canvas.fillStyle = color;
		return this;
	},

	setFillGradient: function(height, colors){
		var gradient = this.canvas.createLinearGradient(0, 0, 0, height);
		for (var p in colors) gradient.addColorStop(parseInt(p), colors[p]);
		this.setFillColor(gradient);
		return this;
	},

	move: function(p){
		this.canvas.moveTo(p.x, p.y);
		return this;
	},

	begin: function(p){
		this.canvas.beginPath();
		return this;
	},

	close: function(){
		this.canvas.closePath();
		return this;
	},

	translate: function(p){
		this.canvas.translate(p.x, p.y);
		return this;
	},

	arc: function(center, radius, start, end){
		this.canvas.arc(center.x, center.y, radius, Math.radians(start), Math.radians(end), false);
		return this;
	},

	line: function(p){
		this.canvas.lineTo(p.x, p.y);
		return this;
	},

	curve: function(p, c){
		this.canvas.quadraticCurveTo(c.x, c.y, p.x, p.y);
		return this;
	},

	box: function(options){
		options = $extend({radius: 5, height: 200, width: 200}, options);
		var height = options.height, width = options.width, radius = options.radius;

		var tl = options['top-left-radius'];
		var tr = options['top-right-radius'];
		var bl = options['bottom-left-radius'];
		var br = options['bottom-right-radius'];

		tl = $pick(tl, radius);
		tr = $pick(tr, radius);
		bl = $pick(bl, radius);
		br = $pick(br, radius);

		this.begin().move({x: 0, y: height - tl});
		this.line({x: 0, y: tl}).curve({x: tl, y: 0}, {x: 0, y: 0});
		this.line({x: width - tr, y: 0}).curve({x: width, y: tr}, {x: width, y: 0});
		this.line({x: width, y: height - br}).curve({x: width - br, y: height}, {x: width, y: height});
		this.line({x: bl, y: height}).curve({x: 0, y: height - bl}, {x: 0, y: height});

		this.close();

		return this;
	},

	fill: function(color){
		this.canvas.fill();
		return this;
	}

});

Math.radians = function(degrees){
	return degrees * (Math.PI / 180);
};