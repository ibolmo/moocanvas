Introduction 
------------

MooTools Canvas is a byproduct of [Google's Excanvas](http://excanvas.sourceforge.net/) and a script by [Ralph Sommerer](http://research.microsoft.com/users/som/blog/canvas-test.htm). In retrospect, I can't tell where one ends and one begins. Moreover, there hasn't been a single line of code that I haven't personally modified for performance, file-size reduction, or programming-style maintenance.
				
Thanks to MooTools, the new Canvas class is: small, modular, and lightweight.


Example
-------

    var cv = new Canvas();
    var ctx = cv.getContext('2d');
    $(document.body).adopt(cv);

*More information on the [site](http://ibolmo.com/projects/moocanvas/)