/*
Script: State.js

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
	Property: states
		Each context maintains a stack of drawing states.
		Drawing states consist of:
			The current transformation matrix.
			The current clip region.
			The current values of the 'states'
	*/
	states: [
	    'arcScaleX',
	    'arcScaleY',
	    'currentX',
	    'currentY',
	    
		'strokeStyle',
		'fillStyle',
		'globalAlpha',
		'lineWidth',
		'lineCap',
		'lineJoin',
		'miterLimit',
		'shadowOffsetX',
		'shadowOffsetY',
		'shadowBlur',
		'shadowColor',
		'globalCompositeOperation'
	],

	/*
	Property: save
		Method pushes a copy of the current drawing state onto the drawing
		state stack.
	*/
	save: function(){
		var copy = {};
		this.states.each(function(prop){
			copy[prop] = this[prop];
		}, this);
		this.dStack.push(copy);
		this.mStack.push(this.m);
	},

	/*
	Property: restore
		Method pops the top entry in the drawing state stack, and resets
		the drawing state it describes. If there is no saved state, the method
		does nothing.
	*/
	restore: function(){
		var saved = this.dStack.pop();
		this.states.each(function(prop){
			this[prop] = saved[prop];
		}, this);
		this.m = this.mStack.pop();
	},

	mStack: [],
	dStack: []
});