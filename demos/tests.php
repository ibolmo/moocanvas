<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
	<head>
		<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
		<title>MooCanvas - Canvas Test Cases</title>
		<link rel="stylesheet" href="../assets/site.css" type="text/css" media="screen" charset="utf-8" />
	<?php if (strpos(@$_SERVER['HTTP_USER_AGENT'], 'MSIE') !== false && in_array(@$_SERVER['REMOTE_ADDR'], array('127.0.0.1'))): ?>
	    <script src="../../moobugger/debugger.js" type="text/javascript" charset="utf-8"></script>
	<?php endif ?>
		<script src="../assets/mootools-1.2.3-core-nc.js" type="text/javascript" charset="utf-8"></script>
    <?php if (key_exists('excanvas', $_REQUEST)): ?>
        <script src="excanvas.js" type="text/javascript" charset="utf-8"></script>        
    <?php else: ?>
		<script src="../Canvas/Canvas.js" type="text/javascript" charset="utf-8"></script>
		<script src="../Canvas/Path.js" type="text/javascript" charset="utf-8"></script>
		<script src="../Canvas/Transform.js" type="text/javascript" charset="utf-8"></script>
		<script src="../Canvas/Rects.js" type="text/javascript" charset="utf-8"></script>
		<script src="../Canvas/Image.js" type="text/javascript" charset="utf-8"></script>
		<script src="../Canvas/State.js" type="text/javascript" charset="utf-8"></script>
		<script src="../Canvas/Gradient.js" type="text/javascript" charset="utf-8"></script>
		<script src="../Canvas/Pattern.js" type="text/javascript" charset="utf-8"></script>
    <?php endif ?>
		<script src="testSuite.js" type="text/javascript" charset="utf-8"></script>
		<style type="text/css" media="screen">
			body {
				margin: 0 auto;
				width: 100%;
				text-align: center;
			}
			
			#container { width: 95%; text-align: left; }
			
			#tests {
				width: 100%;
				margin: 0 auto;
			}
			.testCase {
				float: left;
				margin: 10px;
			}
			
			canvas {
				background: #fff;
				border: 5px solid #4e564e;
			}
		</style>
	</head>
	<body>
		<div id="container">
			<h2>Tests</h2>
			<p>Tests are (nearly) identical from their original authors. Some modifications were made for the <a href="testSuite.js">testSuite.js</a>.</p>
			<p>To run these tests using <a href="http://excanvas.sourceforge.net/">excanvas.js</a> click <a href="?excanvas">here</a></p>
			<p>Thank you to the following sources, from which some of these tests originated from:</p>
			<ul>
				<li><a href="http://annevankesteren.nl/test/html/canvas/">http://annevankesteren.nl/test/html/canvas/</a></li>
				<li><a href="http://www.hixie.ch/tests/adhoc/html/canvas/">http://www.hixie.ch/tests/adhoc/html/canvas/</a></li>
				<li><a href="http://developer.mozilla.org/en/docs/Drawing_Graphics_with_Canvas">http://developer.mozilla.org/en/docs/Drawing_Graphics_with_Canvas</a>
				<li><a href="http://research.microsoft.com/users/som/blog/canvas-test.htm">http://research.microsoft.com/users/som/blog/canvas-test.htm</a>
				<li><a href="http://excanvas.sourceforge.net/">http://excanvas.sourceforge.net/</a></li>
			</ul>
			<div id="tests"></div>
		</div>
	</body>
</html>
