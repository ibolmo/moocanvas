/*
Script: Canvas.js
	Contains the Canvas class.

Dependencies:
	MooTools, <http://mootools.net/>
		Element, and its dependencies

Author:
	Olmo Maldonado, <http://ibolmo.com/>

Credits:
	Lightly based from Ralph Sommerer's work: <http://blogs.msdn.com/sompost/archive/2006/02/22/536967.aspx>
	Moderately based from excanvas: <http://excanvas.sourceforge.net/>
	Great thanks to Inviz, <http://inviz.ru/>, for his optimizing help.

License:
	MIT License, <http://en.wikipedia.org/wiki/MIT_License>
*/

/*
Class: Canvas
	Creates the element <canvas> and extends the element with getContext if not defined.

Syntax:
	>var myCanvas = new Canvas([el,][ props]);

Arguments:
	el    - (element, optional) An unextended canvas Element to extend if necessary.
	props - (object, optional) All the particular properties for an Element. 

Returns:
	(element) A new Canvas Element extended with getContext if necessary.

Example:
	[javascript]
		var cv = new Canvas();
		var ctx = cv.getContext('2d');
		$(document.body).adopt(cv);
	[/javascript]
*/

if (Browser.Engine.trident){
	document.createStyleSheet().cssText = 
		'canvas {text-align:left;display:inline-block;}' +
		'canvas div, canvas div * {position:absolute;overflow:hidden}' +
		'canvas div * {width:10px;height:10px;}' +
		'v\\:*, o\\:*{behavior:url(#default#VML)}';
}

Element.Constructors.canvas = function(props){
	return new Canvas(props);
};
	
// Todo, replace when functions can be inherited
$.Element = $.element;
$.element = function(el, nocash){
    if ((/^canvas$/i).test(el.tagName) && !el.getContext) {
    	var clone = new Canvas({ id: el.id, width: el.width, height: el.height });
    	if (el.parentNode) el.parentNode.replaceChild(clone, el);
    	el = clone;
    } else {
    	el = $.Element(el, nocash);
    }
    return el;
};

var Canvas = new Native({
    
    name: 'Canvas',

	initialize: function(){
		var params = Array.link(arguments, {properties: Object.type, element: Element.type });
		var props = $extend({width: 300, height: 150}, params.properties);
		var el = (params.element || $.Element(document.createElement('canvas'))).set(props);
		if (el.getContext) return el;
		el.attachEvent('onpropertychange', Canvas.changeproperty);
		el.attachEvent('onresize', Canvas.resize);
		el.getContext = function(){
			return this.context = this.context || new CanvasRenderingContext2D(el);
		};
		return el.setStyles({
			width: props.width,
			height: props.height
		});
	}

});

Canvas.changeproperty = function(e){
	var property = e.propertyName;
	if (property == 'width' || property == 'height'){
		e = e.srcElement;
		e.style[property] = e[property];
		e.getContext().clearRect();
	}
};

Canvas.resize = function(e){
	e = e.srcElement;
	var efC = e.firstChild;
	if (efC){
		efC.style.width = e.width;
		efC.style.height = e.height;
	}
};

/*
Private Class: CanvasRenderingContext2D
	Context2D class with all the Context methods specified by the WHATWG, <http://www.whatwg.org/specs/web-apps/current-work/#the-canvas>

Arguments:
	el - (element) An Element requesting the context2d.
*/
var CanvasRenderingContext2D = new Class({

	initialize: function(el){
		this.element = new Element('div').setStyles({
			width: el.clientWidth,
			height: el.clientHeight
		}).inject(el);

		this.m = [
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 1]
		];
		this.l = 0;
		this.rot = 0;
		this.state = [];
		this.path = [];

		// from excanvas, subpixel rendering.
		this.Z = 10;
		this.Z2 = this.Z / 2;
		this.miterLimit = this.Z * 1;
	},
    
	arcScaleX: 1,
	arcScaleY: 1,
	currentX: 0,
	currentY: 0,
	lineWidth: 1,
	strokeStyle: '#000',
	fillStyle: '#fff',
	globalAlpha: 1,
	globalCompositeOperation: 'source-over',
	lineCap: 'butt',
	lineJoin: 'miter',
	shadowBlur: 0,
	shadowColor: '#000',
	shadowOffsetX: 0,
	shadowOffsetY: 0,

	getCoords: function(x,y){
		var m = this.m, Z = this.Z, Z2 = this.Z2;
		return {
			x: Z * (x * m[0][0] + y * m[1][0] + m[2][0]) - Z2,
			y: Z * (x * m[0][1] + y * m[1][1] + m[2][1]) - Z2,
			toString: function(){ return this.x.round() + ',' + this.y.round() }
		};
	}

});
