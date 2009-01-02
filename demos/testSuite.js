var testSuite = {
	initialize: function(element) {
		var excanvas = !!$$('script[src=excanvas.js]').length;
		
		element = $(element);
		this.testCases.each(function(testCase, title){
			//if (title.test(/resi|globalComposite/)) return;
			
			var test = new Element('canvas', {
				width: 300,
				height: 200,
				id: title
			});
									
			new Element('div', {'class': 'testCase'}).adopt(
				new Element('h3', {html: title}),
				test
			).inject(this)

			if (excanvas) test = G_vmlCanvasManager.initElement(test);
			
			testCase.call(test.getContext("2d"), test);
		}, element);
		
		new Element('div', {style: 'clear:both;'}).inject(element);
	},
	
	circle: function(x, y, rad) {
		var kappa = 0.67; //0.5522847498;
		this.moveTo(x - rad, y);
		var rad0 = kappa * rad * 2;
		this.bezierCurveTo(x - rad, y - rad0, x + rad, y - rad0, x + rad, y);
		this.bezierCurveTo(x + rad, y + rad0, x - rad, y + rad0, x - rad, y);						
	},
	
	pie: function(x, y, rad) {
		this.beginPath();
		this.moveTo(x, x);
		this.arc(x, y, rad, 0, Math.PI * 2 * 3 / 4, false);
		this.lineTo(x, y);
		this.stroke();
	},
	
	testCases: new Hash({
		
		greenTriangle: function() {
			this.fillStyle = 'red';
			this.fillRect(100,  50,  50,  50);
			this.fillRect( 50,  50,  50,  50);
			this.fillRect( 50, 100,  50,  50);
			this.fillStyle = 'green';
			this.fillRect(100, 100, 100, 100);
			this.fillStyle = 'silver';
			this.moveTo(200,100);
			this.arc(100, 100, 100, 0, Math.PI/2, true);
			this.fill();	
		},
		
		triangles: function() {
			var t = 20;
			var d = 100;
			var y = d * Math.sqrt(3/4);
			var x1 = t * 2;
			var x2 = x1 + d + t * 2;
			var y1 = t;
			
			// control start
			this.beginPath();
			// triangle 1
			this.moveTo(d/2+x1,  0+y1);
			this.lineTo(d+x1,  y+y1);
			this.lineTo(0+x1, y+y1);
			this.lineTo(d/2+x1,  0+y1);
			this.strokeStyle = 'red';
			this.lineWidth = t/2;
			this.stroke();
			// triangle 2
			this.beginPath();
			this.moveTo(d/2+x2,  0+y1);
			this.lineTo(d+x2,  y+y1);
			this.lineTo(0+x2, y+y1);
			this.lineTo(d/2+x2,  0+y1);
			this.strokeStyle = 'red';
			this.lineWidth = t/2;
			this.stroke();
			
			// test start
			this.beginPath();
			// triangle 1
			this.moveTo(d/2+x1,  0+y1);
			this.lineTo(d+x1,  y+y1);
			this.lineTo(0+x1, y+y1);
			this.closePath();
			// triangle 2
			this.moveTo(d/2+x2,  0+y1);
			this.lineTo(d+x2,  y+y1);
			this.lineTo(0+x2, y+y1);
			this.closePath();
			// paint
			this.strokeStyle = 'green';
			this.lineWidth = t;
			this.stroke();
		
		},
		
		rectS: function() {
			for(var i = 1; i < 10; i++) {
				this.strokeStyle = "rgba(255, 0, 0, " + (1 - i * 0.1) + ")";
				this.beginPath();
				this.rect(10 * i, 5 * i, 20 * i, 10*i);
				this.stroke()
			}
		},
		
		rectF: function() {
			for(var i = 1; i < 10; i++) {
				this.fillStyle = "rgba(255, 0, 0, " + (1 - i * 0.1) + ")";
				this.beginPath();
				this.rect(10 * i, 5 * i, 20 * i, 10*i);
				this.fill();
			}
		},
		
		arcS: function() {
			this.strokeStyle = "#f00";
			this.beginPath();
			this.arc(150, 100, 4, 0, 6 * Math.PI / 4, false);
			this.stroke();
			
			this.strokeStyle = "#00f";
			for(var i = 1; i < 20; i++){
				this.beginPath();
				this.arc(150, 100, 6 * i, i * Math.PI / 8, i * Math.PI / 8 + 2 * Math.PI / 3, true);
				this.stroke()
			}	
		},
		
		arcF: function() {
			for(var i = 0; i < 10; i++){
				this.fillStyle = "rgba(255, 0, 0, " + (1 - i * 0.1) + ")";
				this.beginPath();
				this.arc(20 + 20 * i, 20 + i * 10, 5 + 10 * i, 0, (i == 0 ? 2 * Math.PI : i * 2 * Math.PI / 10), true);
				this.fill()
			}
		},
		
		pass: function() {
			this.strokeStyle = 'navy';
			this.fillStyle = 'red';
			// control
			this.fillRect(375, 105, 10, 10);
			// P
			this.beginPath();
			this.lineWidth = 10;
			this.translate(10, 10);
			this.moveTo(0, 200);
			this.arc(0, 50, 50, Math.PI/2, 3*Math.PI/2, true);
			this.lineTo(0, 100);
			this.stroke();
			// A
			this.translate(75, 0);
			this.scale(0.1, 0.1);
			this.lineWidth = 100;
			this.beginPath();
			this.moveTo(0, 2000);
			this.lineTo(500, 0);
			this.lineTo(1000, 2000);
			this.moveTo(250, 1000);
			this.lineTo(750, 1000);
			this.stroke();
			// S
			this.beginPath();
			this.scale(10, 10);
			this.translate(125, 0);
			this.moveTo(100, 50);
			this.arc(50, 50, 50, 0, Math.PI/2, true);
			this.arc(50, 150, 50, -Math.PI/2, Math.PI, false);
			this.lineWidth = 10;
			this.stroke();
			// S
			this.translate(120, 0);
			this.stroke();		
		},
		
		demo0: function() {
			this.fillStyle = '#FD0';
			this.fillRect(0,0, 75, 75);
			this.fillStyle = '#6C0';
			this.fillRect(75, 0, 75, 75);
			this.fillStyle = '#09F';
			this.fillRect(0, 75, 75, 75);
			this.fillStyle = '#F30';
			this.fillRect(75, 75, 75, 75);
			
			this.fillStyle = '#FFF';
			this.globalAlpha = 0.2;
			
			for(var i = 0; i < 7; ++i){
				this.beginPath();
				this.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);
				this.fill()
			}
			this.globalAlpha = 1;
		},
		
		demo1: function() {
			this.fillStyle = 'rgb(255, 221, 0)';
			this.fillRect(0, 0, 150, 37.5);
			this.fillStyle = 'rgb(102, 204, 0)';
			this.fillRect(0, 37.5, 150, 37.5);
			this.fillStyle = 'rgb(0, 153, 255)';
			this.fillRect(0, 75, 150, 37.5);
			this.fillStyle = 'rgb(255, 51, 0)';
			this.fillRect(0, 112.5, 150, 37.5);
			
			for(var i = 0; i < 10; ++i){
				this.fillStyle = 'rgba(255, 255, 255, ' + (i + 1) / 10 + ')';
				for(var j = 0; j < 4; ++j){
					this.fillRect(5 + i * 14, 5 + j * 37.5, 14, 27.5);
				}
			}						
		},
		
		bezier: function() {
			this.beginPath();
			this.moveTo(75, 40);
			this.bezierCurveTo(75, 37, 70, 25, 50, 25);
			this.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
			this.bezierCurveTo(20, 80, 40, 102, 75, 120);
			this.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
			this.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
			this.bezierCurveTo(85, 25, 75, 35, 75, 40);
			this.stroke()
		},
		
		bezier2: function() {
			this.strokeStyle = "#f80";
			this.beginPath();
			for(var i = 0; i < 10; ++i){
				this.moveTo(10, 10);
				this.bezierCurveTo(10 + 20 * i, 210, 150 + 10 * i, 10, 290, 190);
			}
			this.stroke()	
	 	},
		
		quad: function() {
			this.beginPath();
			this.moveTo(75, 25);
			this.quadraticCurveTo(25, 25, 25, 62.5);
			this.quadraticCurveTo(25, 100, 50, 100);
			this.quadraticCurveTo(50, 120, 30, 125);
			this.quadraticCurveTo(60, 120, 65, 100);
			this.quadraticCurveTo(125, 100, 125, 62.5);
			this.quadraticCurveTo(125, 25, 75, 25);
			this.closePath();
			this.stroke()						
		},
		
		quadraticCurve: function() {
			this.strokeStyle = 'black';
			this.lineWidth = 1;
			this.beginPath();
			this.moveTo(50, 50);
			this.quadraticCurveTo(0, 0, 25, 75);
			this.quadraticCurveTo(50, 0, 50, 50);
			this.stroke();
		},
		
		lines: function() {
			var lineCap = ['butt', 'round', 'square'];
			this.strokeStyle = '#09f';
			this.beginPath();
			this.moveTo(10, 10);
			this.lineTo(140, 10);
			this.moveTo(10, 140);
			this.lineTo(140, 140);
			this.stroke();
			
			this.strokeStyle = 'black';
			for(var i = 0; i < lineCap.length; ++i){
				this.lineWidth = 15;
				this.lineCap = lineCap[i];
				this.beginPath();
				this.moveTo(25 * i + 50, 10);
				this.lineTo(25 * i + 50, 140);
				this.stroke();
			}
		},
		
		lineJoin: function() {
			var ctx = this;
			var lineJoin = ['round','bevel','miter'];
			ctx.lineWidth = 10;
			for (i = 0; i < lineJoin.length; i++){
				ctx.lineJoin = lineJoin[i];
				ctx.beginPath();
				ctx.moveTo(-5, 5 + i * 40);
				ctx.lineTo(35, 45 + i * 40);
				ctx.lineTo(75, 5 + i * 40);
				ctx.lineTo(115, 45 + i * 40);
				ctx.lineTo(155, 5 + i * 40);
				ctx.stroke();
			}
		},
	
		lineWidth: function() {
			this.strokeStyle = 'black';
			this.lineWidth = 1;
			for (var i = 0; i < 100; i++) {
				this.beginPath();
				this.moveTo(49 + i / 100, i);
				this.lineTo(49 + i / 100, i + 1);
				this.closePath();
				this.stroke();
			}
			
			for (var i = 0; i < 100; i++) {
				this.beginPath();
				this.moveTo(i, 49 + i / 100);
				this.lineTo(i + 1, 49 + i / 100);
				this.closePath();
				this.stroke();
			}	
		},
		
		transform: function() {
			this.save();
			this.translate(80, 30);
			this.strokeStyle = 'green';
			this.scale(3, 1);
			this.rotate(Math.PI / 6);
			this.strokeRect(0, 0, 50, 50);
			testSuite.pie.call(this, 75, 75, 20);
			this.restore();
			
			this.save();
			this.translate(150, 10);
			this.rotate(Math.PI / 6);
			this.scale(2, 1);
			this.strokeStyle = 'blue';
			this.strokeRect(0, 0, 50, 50);
			testSuite.pie.call(this, 75, 75, 20);
			this.restore();
			
			this.save();
			this.translate(20, 100);
			this.scale(2, 1);
			this.strokeStyle = 'red';
			this.strokeRect(0, 0, 50, 50);
			testSuite.pie.call(this, 75, 75, 20);
			this.restore();
			
			this.strokeStyle = '#f80';
			this.beginPath();
			testSuite.circle.call(this, 150, 100, 50);
			this.moveTo(100, 100);
			
			this.lineTo(100, 50);
			this.lineTo(200, 50);
			this.lineTo(200, 150);
			this.lineTo(100, 150);
			this.lineTo(100, 100)
			this.stroke();
			
			var col = ['#FD0', '#6C0', '#09F', '#F30'];
			for(var i = 0; i < col.length; ++i){
				this.strokeStyle = col[i];
				this.lineWidth = 1.5;
				this.save();
				this.translate(50 + 50 * i, 120);
				this.rotate(i * Math.PI / 6);
				this.scale(1 + i * 0.5, 1 + i * 0.5);
				testSuite.pie.call(this, 0, 0, 20);
				this.restore();
			}
		},
	 	
		linearGradient: function() {
			var g = this.createLinearGradient(0, 0, 300, 200);
			g.addColorStop(0, '#00f');
			g.addColorStop(1, '#f0f');
			this.fillStyle = g;
			this.fillRect(0, 0, 300, 200);
		},
		
		linearGradientAlpha: function() {
			var g1 = this.createLinearGradient(0, 0, 300, 200);
			g1.addColorStop(0.0, 'rgba(0, 255, 0, 0.0)');
			g1.addColorStop(1.0, 'rgba(0, 255, 0, 1.0)');
			
			var g2 = this.createLinearGradient(0, 0, 300, 200);
			g2.addColorStop(0.0, 'rgba(0, 255, 0, 1.0)');
			g2.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
			this.fillStyle = g1;
			this.fillRect(0, 0, 300, 100);
			this.fillStyle = g2;
			this.fillRect(0, 100, 300, 100);	
		},
		
		rotate: function(){
			var ctx = this;
			var t = 1;
			animation = setInterval( function(){
				ctx.clearRect(0, 0, 36, 36); // clear canvas
				ctx.save();						
				ctx.translate(18, 18);
				ctx.rotate(t*(Math.PI / 8));	
				var color = 0, i = 0;
				for (i=0; i < 8; i++){ // draw individual dots
					color = Math.floor(255 / 8 * i);
					ctx.fillStyle = ctx.fillStyle = "rgb(" + color + "," + color + "," + color + ")";  
					ctx.rotate(-Math.PI / 4);
					ctx.beginPath();
					ctx.arc(0, 14, 4, 0, Math.PI*2, true);
					ctx.fill();
				}
	    		ctx.restore(); 
				t++;			
			}, 125);
		},
		
		reflection: function(cv) {
			var context = this;
			var img = new Image();
			img.onload = function(){
				context.drawImage(img, 0, -123);
				
				context.save();
				context.rotate(Math.PI);
				context.scale(-1,1);
				context.drawImage(img, 0, -323);
				context.restore();
				context.globalCompositeOperation = 'destination-out';
				
				var gradient = context.createLinearGradient(0, 0, 0, 50);
				gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
				gradient.addColorStop(1, 'rgba(255, 255, 255, 1.0)');
				context.rect(0, 100, 203, 50);
				context.fillStyle = gradient;
				context.fill();
			};
			
			img.src = 'linux.jpg';
		},
		
		radialGradient: function() {
			var ctx = this;
			
			// Create gradients
			var radgrad = ctx.createRadialGradient(45,45,10,52,50,30);
			radgrad.addColorStop(0, '#A7D30C');
			radgrad.addColorStop(0.9, '#019F62');
			radgrad.addColorStop(1, 'rgba(1,159,98,0)');
			
			var radgrad2 = ctx.createRadialGradient(105,105,20,112,120,50);
			radgrad2.addColorStop(0, '#FF5F98');
			radgrad2.addColorStop(0.75, '#FF0188');
			radgrad2.addColorStop(1, 'rgba(255,1,136,0)');
			
			var radgrad3 = ctx.createRadialGradient(95,15,15,102,20,40);
			radgrad3.addColorStop(0, '#00C9FF');
			radgrad3.addColorStop(0.8, '#00B5E2');
			radgrad3.addColorStop(1, 'rgba(0,201,255,0)');
			
			var radgrad4 = ctx.createRadialGradient(0,150,50,0,140,90);
			radgrad4.addColorStop(0, '#F4F201');
			radgrad4.addColorStop(0.8, '#E4C700');
			radgrad4.addColorStop(1, 'rgba(228,199,0,0)');
			
			// draw shapes
			ctx.fillStyle = radgrad4;
			ctx.fillRect(0,0,150,150);
			ctx.fillStyle = radgrad3;
			ctx.fillRect(0,0,150,150);
			ctx.fillStyle = radgrad2;
			ctx.fillRect(0,0,150,150);
			ctx.fillStyle = radgrad;
			ctx.fillRect(0,0,150,150);	
		},
		
		gradient: function() {
			var g = this.createLinearGradient(20, 80, 80, 20);
			g.addColorStop(0, '#f00');
			g.addColorStop(0.5, '#ff0');
			g.addColorStop(1, '#00f');
			this.fillStyle = g;
			
			for(var i = 0; i < 6; ++i){
				for(var j = 0; j < 6; ++j){
					this.fillRect(25 * j, 25 * i, 20, 20);
				}
			}
			
			var r = this.createRadialGradient(200, 40, 20, 220, 60, 60);
			r.addColorStop(0, '#f00');
			r.addColorStop(0.5, '#ff0');
			r.addColorStop(1, '#00f');
			this.fillStyle = r;
			
			for(var i = 0; i < 6; ++i){
				for(var j = 0; j < 6; ++j){
					this.fillRect(150 + 25 * i, 25 * j, 20, 20);
				}
			}
		},
		
		image: function() {
			var ctx = this;
			var img = new Image();
			img.onload = function() {
				for (var i = 0; i < 4; i++) {
					for (var j = 0; j < 3; j++) {
						ctx.drawImage(img, j * 50, i * 38, 50, 38);
					}
				}
			}
			img.src = 'Canvas_rhino.jpg';
		},
		
		pattern: function() {
			var ctx = this;
			var img = new Image();
			img.onload = function() {		
				var p = ctx.createPattern(img, "repeat");
				ctx.fillStyle = p;
				for(var i = 0; i < 8; ++i){
					ctx.save();
					for(var j = 0; j < 8; ++j){
						ctx.fillRect(22 * j, 22 * i, 21, 21);
						ctx.translate(i, 0)
					}
					ctx.restore()
				}
			}
			img.src = 'linux.jpg';
		},
		
		flowerPower: function(cv) {
			var phi = 1.61803399;
			this.save();
			this.translate(cv.width / 2.0, cv.height / 2.0);
			var i = 0;
			var then = new Date();
			for (var i = 0; i < 300; i++){
				var theta = (i * phi * Math.PI * 0.05);
				var r = 0.4 * i;
				var xc = r * Math.cos(theta);
				var yc = r * Math.sin(theta);
				var rho = (i / 150.0) * Math.PI;
				var alpha = (i + 50) / 700;
				var red = Math.floor(192.0 + (63.0 * Math.sin(rho)));
				var green = Math.floor(192.0 + (63.0 * Math.cos(rho)));
				var blue = Math.floor(Math.sqrt(red));
				this.beginPath();
				this.fillStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + (1.0 - alpha) + ")";
				this.arc(xc, yc, alpha * 40.0, 0, 2 * Math.PI, 0);
				this.fill();
				this.arc(xc, yc, alpha * 40.0, 0, 2 * Math.PI, 0);
				this.strokeStyle = "rgba(0, 0, 0, " + alpha + ")";
				this.stroke();
				this.closePath();
			}
			this.restore();
		},
		
		resizing: function(cv) {
			// Safari is known not to handle resizing well, expect this to
			// compare to Firefox
			var size = 80, img = new Image();
			img.src = "ff.jpg";
			
			(function () {
				size = (size + 1) % 800;
				cv.width = Number(size + 200);
				cv.height = Number((size + 200) / 2);
				
				// Firefox autoclears the canvas at this point
				this.save();
				this.translate(50, 50);
				this.scale(0.1, 0.1);
				this.rotate(size/800 * Math.PI * 8);
				this.drawImage(img, 0, -75);
				this.restore();
				
				this.save();
				this.beginPath();
				this.moveTo(0, 0);
				this.lineTo(cv.width, cv.height);
				this.moveTo(20, 20);
				this.lineTo(80, 20);
				this.lineTo(80, 80);
				this.lineTo(20, 80);
				this.stroke();
				this.closePath();
				this.restore();
				
				this.save();
				this.beginPath();
				this.scale(size / 300, size / 200);
				this.arc(100, 50, 20, 0, Math.PI, true);
				this.fill();
				this.restore();
				
			}).periodical(50, this)
		}
		
	})
	
};

(function(){
	
var compositeTypes = [
  'source-over','source-in','source-out','source-atop',
  'destination-over','destination-in','destination-out','destination-atop',
  'lighter','darker','copy','xor'
];

compositeTypes.each(function(type){
	testSuite.testCases['globalComposite: ' + type] = function(){
		var ctx = this;
		
		// draw rectangle
		ctx.fillStyle = "#09f";
		ctx.fillRect(15,15,70,70);
		
		// set composite property
		ctx.globalCompositeOperation = type;
		
		// draw circle
		ctx.fillStyle = "#f30";
		ctx.beginPath();
		ctx.arc(75,75,35,0,Math.PI*2,true);
		ctx.fill();
	};
});

})();

window.addEvent('domready', testSuite.initialize.pass('tests', testSuite));
