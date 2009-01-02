/*
Script: Rects.js

Dependencies:
	Canvas.js, Path.js

Author:
	Olmo Maldonado, <http://ibolmo.com/>

Credits:
	Lightly based from Ralph Sommerer's work: <http://blogs.msdn.com/sompost/archive/2006/02/22/536967.aspx>
	Moderately based from excanvas: <http://excanvas.sourceforge.net/>
	Great thanks to Inviz, <http://inviz.ru/>, for his optimizing help.

License:
	MIT License, <http://en.wikipedia.org/wiki/MIT_License>
*/

CanvasRenderingContext2D.implement({

	/*
	Property: clearRect
		Clears the pixels in the specified rectangle.
		If height or width are zero has no effect.

		If no arguments, clears all of the canvas

		Currently, clearRect clears all of the canvas.
	 */
	clearRect: function(x, y, w, h){
	    this.element.innerHTML = '';
		this.m = [
			[1, 0 ,0],
			[0, 1, 0],
			[0, 0, 1]
		];
	},

	/*
	Property: fillRect
		Paints the specified rectangle using fillStyle.
		If height or width are zero, this method has no effect.
	 */
	fillRect: function(x, y, w, h){
		this.rect(x, y, w, h);
		this.fill();
	},

	/*
		Draws a rectangular outline of the specified size.
		If width or height are zero: ??
	 */
	strokeRect: function(x, y, w, h){
		this.rect(x, y, w, h);
		this.stroke();
	}

});