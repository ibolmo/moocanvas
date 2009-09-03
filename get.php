<?php

if(!array_key_exists('files', $_POST)) {
	exit();
}
$files = array();
foreach($_POST['files'] as $file) {
	$files[] = @file_get_contents($file);
}

header('Content-Type: text/javascript');
header('Content-Disposition: attachment; filename="moocanvas.js"');
echo cache_compress($files, $_POST['compression']);

function cache_compress($build, $compress = 'packer') {
	$copyright = "//MooCanvas, My Object Oriented Canvas Element. Copyright (c) 2008 Olmo Maldonado, ";
	$copyright.= "<http://ibolmo.com/>, MIT Style License.";
	switch (strtolower($compress)){
		case 'packer': {
			require 'assets/class.JavaScriptPacker.php';
			$packer = new JavaScriptPacker(implode("\r\n", $build), 62, true, false);
			$build = $packer->pack();
			$build = $copyright."\r\n".$build;
			break;
		}

		case 'nodocs': {
			$build = implode("\r\n", $build);
			$build = preg_replace('@\/\*(.*?)\*\/@ms', '', $build);
			$build = str_replace("\t\n", "\n", $build);
			$build = str_replace("\n\n\n", "\n", $build);
			$build = str_replace("\n\n\n", "\n\n", $build);

			$build = $copyright."\r\n".$build;
			break;
		}

		default: {
			$build = $copyright."\r\n".implode("\r\n", $build);
			break;
		}
	}

	return $build;
}
?>
