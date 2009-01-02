/*
Script: Transform.js

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
		The transformation matrix is applied to all drawing operations prior
		to their being rendered. It is also applied when creating the clip region.
		
		The transformations must be performed in reverse order. For instance,
		if a scale transformation that doubles the width is applied, followed
		by a rotation transformation that rotates drawing operations by a
		quarter turn, and a rectangle twice as wide as it is tall is then
		drawn on the canvas, the actual result will be a square.
	*/

  	/*
  	Property: scale
		Method must add the scaling transformation described by the arguments
		to the transformation matrix. The x argument represents the scale factor
		in the horizontal direction and the y argument represents the scale
		factor in the vertical direction. The factors are multiples.
	*/
	scale: function(x,y){
		this.arcScaleX *= x;
		this.arcScaleY *= y;

		this.matMult([
			[x, 0, 0],
			[0, y, 0],
			[0, 0, 1]
		]);
	},

  	/*
  	Property: rotate
		Method must add the rotation transformation described by the argument
		to the transformation matrix. The angle argument represents a clockwise
		rotation angle expressed in radians.
	*/
	rotate: function(ang){
		this.rot += ang;
		var c = ang.cos(),
			s = ang.sin();
			
		this.matMult([
			[ c, s, 0],
			[-s, c, 0],
			[ 0, 0, 1]
		]);
	},

  	/*
  	Property: translate
		Method must add the translation transformation described by the arguments
		to the transformation matrix. The x argument represents the translation
		distance in the horizontal direction and the y argument represents the
		translation distance in the vertical direction. The arguments are in
		coordinate space units.
	*/
	translate: function(x, y){
		this.matMult([
			[1, 0, 0],
			[0, 1, 0],
			[x, y, 1]
		]);
	},

  	/*
  	Property: transform
		Method must multiply the current transformation matrix with the matrix described
		by the inputs.
	*/
 	transform: function(m11, m12, m21, m22, dx, dy){
		this.matMult([
			[m11, m21, dx],
			[m12, m22, dy],
			[  0,   0,  1]
		]);
	},

  	/*
  	Property: setTransform
  		Method must reset the current transform to the identity matrix, and then invoke
  		the transform method with the same arguments.
  	*/
	setTransform: function(){
		this.m = [
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 1]
		];

		this.transform.apply(this, arguments);
	},

	/*
		Property: matMult
			Method to multiply 3x3 matrice. Currently takes input and multiplies against
			the transform matrix and saves the result to the transform matrix.

			This is an optimized multiplication method. Will only multiply if the input
			value is not zero. Thus, minimizing multiplications and additions.
	*/
	matMult: function(b){
		var m = this.m,
			o = [[0, 0, 0],
				 [0, 0, 0],
				 [0, 0, 0]];

		for (var i = 3; i--;){
			var b0 = b[0][i], b1 = b[1][i], b2 = b[2][i];
			if (b0) this.sum(o[0], this.dotmult(b0, m[i]));
			if (b1) this.sum(o[1], this.dotmult(b1, m[i]));
			if (b2) this.sum(o[2], this.dotmult(b2, m[i]));
		}

		this.m = o;
	},

	dotmult: function(x,y){
		return y.map(function(val){ return x * val; });
	},

	sum: function(o,v){
		o[0] += v[0];
		o[1] += v[1];
		o[2] += v[2];
	}

});