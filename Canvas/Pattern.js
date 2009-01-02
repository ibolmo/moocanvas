/*
Script: Pattern.js

Dependencies:
	Canvas.js

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
	Property: createPattern
		The first argument gives the image to use as the pattern (either
		an HTMLImageElement or an HTMLCanvasElement). Modifying this image
		after calling the createPattern() method must not affect the pattern.
		The second argument must be a string with one of the following values:
		repeat, repeat-x, repeat-y, no-repeat. If the empty string or null is
		specified, repeat must be assumed. If an unrecognised value is given,
		then the user agent must raise a SYNTAX_ERR exception. User agents
		must recognise the four values described above exactly (e.g. they must
		not do case folding). The method must return a CanvasPattern object
		suitably initialised.
	 */
	createPattern: function(img, rep){
		return new CanvasPattern(img, rep);
	}

});

/*
Class: CanvasPattern
	Patterns must be painted so that the top left of the first image is
	anchored at the origin of the coordinate space, and images are then
	repeated horizontally to the left and right (if the repeat-x  string
	was specified) or vertically up and down (if the repeat-y string was
	specified) or in all four directions all over the canvas (if the repeat
	string was specified). The images are not be scaled by this process;
	one CSS pixel of the image must be painted on one coordinate space unit.
	Of course, patterns must only actually painted where the stroking or
	filling effect requires that they be drawn, and are affected by the
	current transformation matrix.
*/
var CanvasPattern = new Class({

	initialize: function(img, rep){
		this.img = img;
		this.rep = rep;
	}

});