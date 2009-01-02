/*
Script: Gradient.js

Dependencies:
	Canvas.js

Author:
	Olmo Maldonado, <http://ibolmo.com/>

Credits:
	Lightly based from Ralph Sommerer's work: <http://blogs.msdn.com/sompost/archive/2006/02/22/536967.aspx>
	Moderately based from excanvas: <http://excanvas.sourceforge.net/>
	Many thanks to Inviz, <http://inviz.ru/>, for his optimizing help.

License:
	MIT License, <http://en.wikipedia.org/wiki/MIT_License>
*/

CanvasRenderingContext2D.implement({
	/*
	Property: createLinearGradient
		Method takes four arguments, representing the start point (x0, y0)
		and end point (x1, y1) of the gradient, in coordinate space units,
		and must return a linear CanvasGradient initialised with that line.

		Linear gradients must be rendered such that at the starting point
		on the canvas the color at offset 0 is used, that at the ending point
		the color at offset 1 is used, that all points on a line perpendicular
		to the line between the start and end points have the color at the point
		where those two lines cross (interpolation happening as described above),
		and that any points beyond the start or end points are a transparent black.
	*/
	createLinearGradient: function(x0, y0, x1, y1){
		return new CanvasGradient(x0, y0, x1, y1, this);
	},

	/*
	Property: createRadialGradient
		Method takes six arguments, the first three representing the start circle
		with origin (x0, y0) and radius r0, and the last three representing the
		end circle with origin (x1, y1) and radius r1. The values are in coordinate
		space units. The method must return a radial CanvasGradient initialised with
		those two circles.

		Radial gradients must be rendered such that a cone is created from the two
		circles, so that at the circumference of the starting circle the color at
		offset 0 is used, that at the circumference around the ending circle the
		color at offset 1 is used, that the circumference of a circle drawn a certain
		fraction of the way along the line between the two origins with a radius the
		same fraction of the way between the two radii has the color at that offset
		(interpolation happening as described above), that the end circle appear to
		be above the start circle when the end circle is not completely enclosed by
		the start circle, that the end circle be filled by the color at offset 1, and
		that any points not described by the gradient are a transparent black.
	*/
	createRadialGradient: function(x0, y0, r0, x1, y1, r1){
		return $extend(new CanvasGradient(x0, y0, x1, y1, this), {
			r0: r0,
			r1: r1
		});
	}

});

/*
Private Class: CanvasGradient
	CanvasGradient class for the gradients. Defines stops.

Arguments:
	x0  - (number) Coordinate "from" x-point
	y0  - (number) Coordinate "from" y-point
	x1  - (number) Coordinate "to" x-point
	y1  - (number) Coordinate "to" y-point
	ctx - (number) Context object to reference (for the processColor dependency). Temporary until proper color processing is implemented.
*/
var CanvasGradient = new Class({

	initialize: function(x0, y0, x1, y1, ctx){
		this.angle = ((y1 - y0) / ((x1 - x0).pow(2) + (y1 - y0).pow(2)).sqrt()).acos();
		this.ctx = ctx;
	},

	/*
	Property: addColorStop
		Method adds a new stop to a gradient. If the offset is less than
		0 or greater than 1 then an INDEX_SIZE_ERR exception must be raised.
		If the color cannot be parsed as a CSS color, then a SYNTAX_ERR
		exception must be raised. Otherwise, the gradient must be updated
		with the new stop information.
	*/
	addColorStop: function(off, col){
		col = this.processColor(col);

		if (off == 1 || off == 0){
			this['col' + off] = col;
		} else {
			if(!this.stops) this.stops = [];
			this.stops.push([off, col.color]);
		}
	},

	processColor: function(col){ //path
		var a = this.ctx.globalAlpha || 1;
		if (col.substr(0, 3) == 'rgb'){
			if (col.charAt(3) == "a") a*= col.match(/([\d.]*)\)$/)[1];
			col = col.rgbToHex();
		}
		return {
			color: col,
			opacity: a
		};
	}

});
