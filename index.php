<?php
$files = array(
	array(
		'name' => 'Canvas',
		'depends' => 'Canvas',
		'description' => 'Adds canvas element with the getContext, if browser is IE',
		'file' => 'Canvas/Canvas.js'
	),
	array(
		'name' => 'Paths',
		'depends' => 'Canvas',
		'description' => 'Functionality for Paths as described by WHATWG',
		'file' => 'Canvas/Path.js',
	),
	array(
		'name' => 'Rectangles',
		'depends' => 'Canvas,Paths',
		'description' => 'Uses Paths to create rectangular shapes',
		'file' => 'Canvas/Rects.js'
	),
	array(
		'name' => 'Transforms',
		'depends' => 'Canvas',
		'description' => 'Transform current paths',
		'file' => 'Canvas/Transform.js'
	),
	array(
		'name' => 'Image',
		'depends' => 'Canvas',
		'description' => 'Adds the functionality of placing images in the canvas element',
		'file' => 'Canvas/Image.js'
	),
	array(
		'name' => 'State',
		'depends' => 'Canvas',
		'description' => 'Need to save states? You get the idea.',
		'file' => 'Canvas/State.js'	
	),
	array(
		'name' => 'Gradient',
		'depends' => 'Canvas',
		'description' => 'Adds support for Gradients (minimally supported)',
		'file' => 'Canvas/Gradient.js'
	),
	array(
		'name' => 'Pattern',
		'depends' => 'Canvas',
		'description' => 'Adds support for Patterns (minimally supported)',
		'file' => 'Canvas/Pattern.js'
	)
);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<meta name="author" content="Olmo Maldonado, olmo-maldonado.com" />
		<meta name="copyright" content="copyright 2007 olmo-maldonado.com" />
		<meta name="description" content="MooTools Canvas, a MooTools script for adding canvas support to Internet Explorer" />
		<meta name="keywords" content="canvas, mootools, excanvas, small, compact, fast, mootools, plug-in, internet explorer, support, compatibility" />
		<meta name="robots" content="all" />
		<title>MooCanvas, MooTools-style excanvas</title>
		<link rel="stylesheet" href="assets/site.css" type="text/css" media="screen" title="site css" charset="utf-8" />
		<script src="assets/mootools-1.2.3-core-yc.js" type="text/javascript" charset="utf-8"></script>
		<script src="assets/moocanvas.site.js" type="text/javascript" charset="utf-8"></script>
		<script src="assets/site.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div id="container">
			<h1 id="mootools_canvas">MooTools Canvas</h1>
			<a id="top"></a>
			<div id="content-navigation"></div><br />
			<div id="content-intro">
				<h2>Introduction</h2>
				<p>
					MooTools Canvas is a byproduct of <a href="http://excanvas.sourceforge.net/">Google's Excanvas</a> and a script by <a href="http://research.microsoft.com/users/som/blog/canvas-test.htm">Ralph Sommerer</a>. In retrospect, I can't tell where one ends and one begins. Moreover, there hasn't been a single line of code that I haven't personally modified for performance, file-size reduction, or programming-style maintenance.
				</p>
				<p>
					Thanks to MooTools, the new Canvas class is: small, modular, and lightweight.
				</p>
				<a href="#top" class="anchor">Top</a>
			</div>
			<div id="content-example">
				<h2>Example</h2>
				<p>
					Below is the first example provided by the <a href="http://excanvas.sourceforge.net/">excanvas</a> team as a showcase. For more extensive examples, scroll downwards to the Tests.
				<p>
				</p>
					Click <a href="javascript:void(0)" id="startExample">here</a> to <span id="ex-status">start</span> the example.
				</p>
				<div id="example"></div>
				<p>
					One difference between excanvas and MooTools Canvas is that excanvas will automatically try to extend 
					all the canvas elements with the getContext method if it was not available. MooTools Canvas, however,
					will not. Therefore, you must instantiate a new Canvas with the id and any properties you want the
					element to have.
				</p>
				<pre>var myCanvas = new Canvas({
	id: 'myCanvasId',
	width: 300,
	height: 200
});
				
// myCanvas is now a &lt;canvas> element. You can choose what you will do with that element. 
myCanvas.inject(document.body); // for instance</pre>
				<p>
					Why? You may ask. Because embedded elements like the canvas tag (which are not native to HTML standard)
					will not have the same methods as native Elements. To keep with this convention, I made a conscious
					decision not to automatically instantiate. You're welcome to do it, however.
				</p>
				<p>Here's an example of creating a new &lt;canvas> Element.</p>
				<pre>var ctx = new Canvas('myCanvasId').getContext('2d');</pre>
				<a href="#top" class="anchor">Top</a>
			</div>
			<div id="change-log">
				<h2>Changeset</h2>
				<p>
					<p><em><strong>Sept 13, 2008</strong></em></p>
					<ul>
					    <li>Implemented new test with excanvas feature for the Canvas Test Page</li>
					    <li>Fixed rotate issue (I hope). Thanks for the help Greg Houston</li>
					    <li>Fixed a couple of missing states from save. Thanks Chris Price.</li>
					</ul>
				</p>
				<p>
					<p><em><strong>Jan 19, 2008</strong></em></p>
					<ul>
						<li>I've updated the MooCanvas code to work with MooTools' <a href="http://dev.mootools.net/changeset/1283">Element constructor hook.</a> Unfortunately, this will break your code :P. Enjoy the new syntax, however.</li>
						<li>Accordingly, updated all the documentation.</li>
						<li>Extensive work on optimizing for speed vs. readability. Amazingly, I think I had my cake and ate it too. Judge for yourself and read the source code.</li>
						<li>There were some random issues with gradient (don't be surprised if there's still more -- I know of a couple) but the obvious were fixed thanks to Valerio's test cases.</li>
					</ul>
				</p>
				<a href="#top" class="anchor">Top</a>
			</div>
			<div id="content-testing">
				<h2>Testing</h2>
				<p>
					Interestingly, this is not my first attempt to port <a href="http://excanvas.sourceforge.net/">Google's Excanvas</a>. In fact, this is my third iteration. The
					first went up in flames, when work took priority and the trash can was very tempting. The second had a short shelve
					life span due to numerous errors that I found as I was building a Test Suite. In the process of making a Test Suite I
					came across <a href="http://research.microsoft.com/users/som/blog/canvas-test.htm">Raplh Sommerer's work</a> on his original version of vml-emulated-canvas. From there the third iteration arose.
					By now, the Google team had patched their original release with the new 0002 release. Having prior experience with excanvas
					and realizing that Sommerer's work had a critical weakness, I decided to merge the best part of both worlds. To be successful,
					however, I relied heavily on the <a href="demos/tests.php">Canvas Test Page.</a>
				</p>
				<p> 
					Please do not be discouraged, if you think the page is slow in loading. The images that the tests use, are loaded dynamically. As a result, the browser has to wait for the image to load before processing the next test.
				</p>
				<a href="#top" class="anchor">Top</a>
			</div>
			<div id="known-issues">
				<h2>Known Issues</h2>
				<p>
					Even after generous testing there are still some issues that have yet been resolved. Not that they're impossible, but that I lack the time or test cases to investigate. As mentioned above, the more test cases you submit the faster I can get to the problem and the faster we can move forward. You'll find the issues knows below, and the temporary fixes (if any).
				</p>
				<ul>
				    <li>
				    	<ul>
				    	    <li><strong>Issue</strong>: reflection.js does not work with moocanvas</li>
				    	    <li><strong>Problem</strong>: ctx.scale(1,-1);</li>
				    	    <li><strong>Reason</strong>: Turns out there's a bug with an un-initialized rotate (other than 0). The way the code works, at the moment, is that scale doesn't rotate/flip and so the rotate is set to 0, and the particular code that would flip/rotate requires that private variable 'rot' is not 0. It's a matter of tinkering to get it to work.</li>
				    	    <li><strong>Workaround</strong>: For now you can try to: ctx.rotate(Math.PI); ctx.scale(-1,1); you'll also have to account for the offset. </li>
				    	</ul>
				    </li><br />
				    <li>
				    	<ul>
				    	    <li><strong>Issue</strong>: globalComposition does not work</li>
				    	    <li><strong>Problem</strong>: ctx.globalComposition = ''; does nothing</li>
				    	    <li><strong>Reason</strong>: There's no global composition for VML. The only solution is to use Microsoft's proprietary CSS property: 'filter'. I've already played with filter and the results are positive, but I need to automate the process.</li>
				    	    <li><strong>Workaround</strong>: None at the moment.</li>
				    	</ul>
				    </li>
				</ul>
				<p>
					If you find an issue let me <a href="javascript:void(0)" class="mailto">know</a>. I can prescribe a workaround or add it here for people to ponder about -- or if you're lucky and you provide me a test case I can see if I can fix it ASAP.
				</p>
				<a href="#top" class="anchor">Top</a>
			</div>
			<div id="content-demos">
				<h2 id="demos">Demos</h2>
				<p>Here's a listing of demos. If you'd like to contribute to the demos list, please send a <a href="javascript:void(0)" class="mailto">message</a>.<p>
				<ul>
					<li><a href="demos/example1.html">Sprites demo, by Excanvas team</a></li>
					<li><a href="demos/example2.html">3D-Cube demo, by Excanvas team</a></li>
					<li><a href="demos/tests.php">Test Page</a></li>
				</ul>
				<div style="clear:both"></div>
				<a href="#top" class="anchor">Top</a>
			</div>
			<div id="content-requirements">
				<h2>Requirements</h2>
				<p>
					1. MooTools Canvas is meant to be used when adding the canvas element for Internet Explorer.
				</p>
				<p> 
					2. MooTools Canvas requires MooTools v1.12+. Specifically it requires Element, and its dependencies.
				</p>
				<a href="#top" class="anchor">Top</a>
			</div>
			<div id="content-download">
				<h2>Download Latest Release</h2>
				<div class="block download">
					<h2 class="section">Choose the Components you need</h2>
					<form action="get.php" method="post">
						<div id="advanced">
							<table id="download" class="download">			
								<?php foreach($files as $file) { ?>	
								<tr class="option file">
									<td class="check">
										<div class="check" id="<?php echo $file['name']; ?>" deps="<?php echo $file['depends']; ?>">
											<input type="checkbox" name="files[]" value="<?php echo $file['file'] ?>" />
										</div>
									</td>
									<td class="name"><?php echo $file['name']; ?></td>
									<td class="description">
										<p>
											<?php echo $file['description']; ?>
										</p>
									</td>
								</tr>
								<?php } ?>
							</table>
						</div>
				
						<h2 class="section">Choose compression type</h2>
						<div id="compression">
							<table id="options">
								<tr class="option">
									<td class="check">
										<div class="check">
											<input type="radio" name="compression" value="packer" />
										</div>
									</td>
									<td class="name">Packer Compression</td>
									<td class="description">The highest compression. Uses <a href="http://joliclic.free.fr/php/javascript-packer/en/">the php5 version</a> of <a href="http://dean.edwards.name/packer/">Dean Edwards Packer</a>.</td>
								</tr>
								<tr class="option">
									<td class="check">
										<div class="check">
											<input type="radio" name="compression" value="nodocs" />	
										</div>
									</td>
									<td class="name">No Documentation</td>
									<td class="description">Uncompressed, removes only documentation</td>
								</tr>
								<tr class="option">
									<td class="check">
										<div class="check">
											<input type="radio" name="compression" value="none" />
										</div>
									</td>
									<td class="name">No Compression</td>
									<td class="description">Full Source, includes documentation. Recommended while testing &amp; building.</td>
								</tr>
							</table>
						</div>
						<p class="submit"><input type="image" src="images/get.gif" height="33" width="125" value="submit" /></p>
					</form>
				</div>
				<a href="#top" class="anchor">Top</a>
			</div>
			<div id="footer">
				Copyright &copy; 2008 - Olmo Maldonado, <a href="http://ibolmo.com/">http://ibolmo.com/</a>
			</div>
		</div>
	</body>
</html>

