window.addEvent('domready', function() {
	var SScroll = new SmoothScroll({}, window);
	
	Navigation.start();
	Mailto.start();
	
	if($('download')) Download.start();
	
	$('startExample').addEvent('click', function() {
		var stats = $('ex-status');
		var example = $('example');
		if(stats.innerHTML == 'start') {
			stats.innerHTML = 'hide';
			if(!example.getElement('canvas')) {
				example.adopt(new Canvas({
					id: 'cv',
					width: 400,
					height: 300
				}));
				
				load();
			}
		} else {
			stats.innerHTML = 'start';
			example.empty();
			$clear(timeOut);
		}
	});
});

var Navigation = {
	start: function(SScroll) {
		this.scroll = new Fx.Scroll(window);
		
		this.nav = $('content-navigation');
		
		this.h2s = $$('a[href="#top"]').map(function(el) {
			return el.getParent().getElement('h2')
		});
		this.titles = this.h2s.map(function(el) {
			return el.innerHTML;
		}, this);
		
		this.titles.each(function(title, i) {
			new Element('a', { href: 'javascript:void(0)',
				events: {
					click: function(e) {
						this.scroll.toElement(this.h2s[this.titles.indexOf(e.target.innerHTML)]);
						return false;
					}.bind(this)	
				}
			}).setStyle('border-left', (i == 0) ? '' : '1px solid #fff').set('html', title).inject(this.nav)
		}, this);
	}	
};

var Mailto = {
	start: function(email) {
		$$('.mailto').each(function(el) {
			el.addEvents({
				mouseenter: function(e) {
					e.target.setAttribute('href', 'mailto:' + (email || ('0lz0,zbld0nbdo[at]gmbil.com'.replace(/0/g, 'o').replace(/z/g, 'm').replace(/,/g, '.').replace(/\[at\]/g, '@').replace(/b/g, 'a'))));
				},
				
				mouseleave: function(e) {
					e.target.setAttribute('href', 'javascript:void(0)');
				}	
			});
		});
	}	
};

/*
Script: Download

Credits:
	Adapted from http://mootools.net/download

Notes:
	Thanks Valerio :).
*/
var Download = {
	start: function(){
		Download.trs = $$('tr.option');
		Download.chks = $$('#download div.check');
		Download.radios = $$('#options div.check');
		
		Download.fx = [];
		Download.parse();
		
		[].extend(Download.chks).extend(Download.radios).each(function(chk){
			chk.inputElement = chk.getElement('input').setStyle('display', 'none');
		});
		
		Download.chks.each(function(chk){
			if (chk.inputElement.checked) Download.select(chk);
		});
		
		Download.select(Download.chks[0]);
		Download.select(Download.radios[0]);
	},

	select: function(chk){
		chk.inputElement.checked = 'checked';
		
		Download.fx[chk.index].start({
			'background-color': '#1B241B',
			'color': '#FFF'
		});
		
		chk.addClass('selected');
		
		if (chk.deps){
			chk.deps.each(function(id){
				if (!$(id).hasClass('selected')) Download.select($(id));
			});
		} else {
			Download.radios.each(function(other){
				if (other == chk) return;
				Download.deselect(other);
			});
		}
	},
	
	all: function(){
		Download.chks.each(function(chk){
			Download.select(chk);
		});
	},
	
	none: function(){
		Download.chks.each(function(chk){
			Download.deselect(chk);
		});
	},

	deselect: function(chk){
		chk.inputElement.checked = false;
		Download.fx[chk.index].start({
			'background-color': '#161d16',
			'color': '#4e564e'
		});
		chk.removeClass('selected');
		
		if (chk.deps){
			Download.chks.each(function(other){
				if (other == chk) return;
				if (other.deps.contains(chk.id) && other.hasClass('selected')) Download.deselect(other);
			});
		}
	},

	parse: function(){
		Download.trs.each(function(tr, i){
			Download.fx[i] = new Fx.Morph(tr, {wait: false, duration: 300});

			var chk = tr.getElement('div.check');
			chk.index = i;
			var dp = chk.getProperty('deps');
			if (dp) chk.deps = dp.split(',');

			tr.onclick = function(){
				if (Download.isQuick && tr.hasClass('file')){
					Download.quicks.each(function(lee, e){
						if (lee.chosen) Download.quickFx[e].start('0 0');
					});
					Download.isQuick = false;
				}
				
				if (!chk.hasClass('selected')) Download.select(chk);
				else if (tr.hasClass('file')) Download.deselect(chk);
			};
			
			tr.addEvent('mouseenter', function(){
				if (!chk.hasClass('selected')){
					Download.fx[i].start({
						'background-color': '#182119',
						'color': '#5e9660'
					});
				}
			});
			
			tr.addEvent('mouseleave', function(){
				if (!chk.hasClass('selected')){
					Download.fx[i].start({
						'background-color': '#161d16',
						'color': '#4e564e'
					});
				}
			});

		});
	}
};

var yctx;
var particles = [];
var NUM_PARTICLES = 20;
var timeOut;

function Particle() {
	this.x = Math.random() * canvas.width;
	this.y = Math.random() * canvas.height;

	this.xvel = Math.random() * 5 - 2.5;
	this.yvel = Math.random() * 5 - 2.5;
}

Particle.prototype.update = function() {
	this.x += this.xvel;
	this.y += this.yvel;

	this.yvel += 0.1;

	if (this.x > canvas.width || this.x < 0) {
		this.xvel = -this.xvel;
	}

	if (this.y > canvas.height || this.y < 0) {
		this.yvel = -this.yvel;
	}
}

function loop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for(var i = 0; i < NUM_PARTICLES; i++) {
		particles[i].update();

		ctx.beginPath();
		ctx.moveTo(particles[i].x, particles[i].y);
		ctx.lineTo(particles[i].x - particles[i].xvel,
							 particles[i].y - particles[i].yvel);
		ctx.stroke();
		ctx.closePath();
	}

	timeOut = setTimeout(loop, 10);
}

function load() {
	canvas = document.getElementById("cv");
	ctx = canvas.getContext("2d");

	for(var i = 0; i < NUM_PARTICLES; i++) {
		particles[i] = new Particle();
	}

	ctx.lineWidth = "2";
	ctx.strokeStyle = "rgb(255, 255, 255)";
	loop();
}
