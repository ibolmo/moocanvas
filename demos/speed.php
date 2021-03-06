<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
	<head>
		<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
		<title>speed</title>
		<link rel="stylesheet" href="../assets/site.css" type="text/css" media="screen" title="no title" charset="utf-8" />
		<style type="text/css" media="screen">
			canvas {
				border:2px solid #f00;
				background: black;	
			}
		</style>
		<script src="../assets/mootools.js" type="text/javascript" charset="utf-8"></script>
    <?php if (key_exists('excanvas', $_REQUEST)): ?>
        <script src="excanvas.js" type="text/javascript" charset="utf-8"></script>        
    <?php else: ?>
		<script src="../Canvas/Canvas.js" type="text/javascript" charset="utf-8"></script>
		<script src="../Canvas/Path.js" type="text/javascript" charset="utf-8"></script>
		<script src="../Canvas/Rects.js" type="text/javascript" charset="utf-8"></script>
    <?php endif ?>
		<script type="text/javascript" charset="utf-8">
			window.addEvent('domready', function() {
				var w = 255,
					h = 255,
					cv = $('cv');
					
				var log = new Element('ul').inject(document.body);
				
				var HCookie = new Hash.Cookie('ExCanvasSpeedTest'),
					results = HCookie.get('results');
				if(results) {
					results.each(function(result) {
						log.adopt(new Element('li').set('html', result));
					});
					log.adopt(new Element('li').set('html', '-----------------'));
				}
				
				var ctx = cv.getContext('2d'),
					x, y, pixels = w, num = 20, j = 0, clear = false,
					start = $time();
					
				ctx.lineWidth = "1";
				
				var start = $time(), end,
				test = function() {
					j++;
					
					if(clear) ctx.clearRect();
					
					for(var i = 0; i < pixels; i++) {
						ctx.strokeStyle = "rgb(" + (j*i % 255) + ", "+ (64*i*j % 255) + ", " + (i % 255) + ")";
						x = i;
						y = j * Math.floor(h / num);
					
						ctx.beginPath();
						ctx.moveTo(x, y);
						ctx.lineTo(x + 1, y + 1);
						ctx.stroke();
						ctx.closePath();
					}
					
					if(j < num) test();
					else {
						end = $time() - start;
						log.adopt(new Element('li').set('html', end + ' ms, or ' + (end / (num * pixels)).round(3) + 'ms per pixel'));
						
						if(!$('run')) {
							$(document.body).adopt(
								new Element('input', {
									id: 'run',
									type: 'button',
									value: 'run again and clearRect',
									events: {
										click: function() {
											clear = true;
											ctx.clearRect();
											j = 0;
											start = $time();
											test();	
										}	
									}	
								}),
								new Element('input', {
									id: 'save',
									type: 'button',
									value: 'save results',
									events: {
										click: function() {
											HCookie.extend({
												results: log.getChildren().map(function(result) {
													return result.innerHTML;
												})
											});
										}	
									}	
								}),
								new Element('input', {
									id: 'clear',
									type: 'button',
									value: 'clear cookie',
									events: {
										click: function() {
											HCookie.empty();	
										}
									}	
								})
							);
						}
					}
				};
				test();
			});
		</script>
	</head>
	<body style="margin: 0 auto; padding: 50px;">
		<div style="border:2px solid #0f0">
			<canvas id="cv" width="255" height="255"></canvas>
		</div>
	</body>
</html>
