/**
 * @author Perlou
 * @touch.js
 */

document.addEventListener("touchmove", function(ev) {
	ev.preventDefault()
}, !1);

function MScroll(a, c, b, d, f) {
	if ("string" == typeof a) this.obj = document.getElementById(a);
	else if ("object" == typeof a) this.obj = a;
	else return;
	var e = this;
	this.oScroll = this.obj.children[0];
	this.sDirection = c;
	this.offMove = d;
	this.offOver = f;
	this.resize();
	this.timer = this.lastDis = this.dis = this.iStartT = this.iStart = this.iScroll = 0;
	this.iBack = 50;
	b && (this.oBar = document.createElement("div"), this.oBar.style.cssText = "width:4px;height:20px;position:absolute;background:rgba(0,0,0,.6);border-radius:2px; opacity:0;transition:.5s opacity;", this.oBar.style.cssText += "x" == c ? "left:0;bottom:0;height: 4px;" : "right:0;top:0;", this.obj.appendChild(this.oBar), this.scrollWrap = "x" == c ? this.obj.clientWidth : this.obj.clientHeight, this.scale = "x" == c ? this.oScroll.offsetWidth / this.obj.clientWidth : this.oScroll.offsetHeight / this.obj.clientHeight, "x" == c ? this.oBar.style.width = this.scrollWrap / this.scale + "px" : this.oBar.style.height = this.scrollWrap / this.scale + "px");
	this.obj.addEventListener("touchstart", function(a) {
		e.fnStart(a);
		a.preventDefault()
	}, !1);
	this.obj.addEventListener("touchmove", function(a) {
		e.fnMove(a);
		a.preventDefault()
	}, !1);
	this.obj.addEventListener("touchend", function(a) {
		e.fnEnd(a);
		a.preventDefault()
	}, !1)
}

MScroll.prototype = {
	fnStart: function(a) {
		clearInterval(this.timer);
		this.iStart = "x" == this.sDirection ? a.changedTouches[0].pageX : a.changedTouches[0].pageY;
		this.iStartT = this.iScroll;
		if (this.onscrollstart) this.onscrollstart();
		this.oBar && (this.oBar.style.opacity = "1")
	},
	fnMove: function(a) {
		a = "x" == this.sDirection ? a.changedTouches[0].pageX : a.changedTouches[0].pageY;
		this.lastDis = this.dis;
		this.dis = a - this.iStart;
		this.iScroll = this.iStartT + this.dis;
		!this.offOver && this.iScroll > this.iBack && (this.iScroll = this.iBack);
		!this.offOver && this.iScroll < -this.iMaxT - this.iBack && (this.iScroll = -this.iMaxT - this.iBack);
		this.setCss()
	},
	fnEnd: function() {
		var a = this.iScroll - 3 * (this.lastDis - this.dis);
		!this.offOver && 0 < a ? this.tweenMove(0 - this.iScroll, "backOut") : !this.offOver && a < -this.iMaxT ? this.tweenMove(-this.iMaxT - this.iScroll, "backOut") : this.tweenMove(a - this.iScroll, "easeOut");
		if (this.onscrollend) this.onscrollend()
	},
	tween: {
		easeOut: function(a, c, b, d) {
			return -b * (a /= d) * (a - 2) + c
		},
		backOut: function(a, c, b, d, f) {
			"undefined" == typeof f && (f = 3.70158);
			return b * ((a = a / d - 1) * a * ((f + 1) * a + f) + 1) + c
		}
	},
	miaovMove: function(a, c) {
		var b = this;
		a += this.iScroll;
		clearInterval(this.timer);
		this.timer = setInterval(function() {
			if (2 < Math.abs(a - b.iScroll)) {
				var d = (a - b.iScroll) / 15,
					d = 0 < d ? Math.ceil(d) : Math.floor(d);
				b.iScroll += d
			} else b.iScroll = a, clearInterval(b.timer), c && c.call(b), b.oBar && (b.oBar.style.opacity = 0);
			b.setCss()
		}, 20)
	},
	tweenMove: function(a, c, b) {
		if ("miaovEase" == c) this.miaovMove(a, b);
		else {
			var d = 0,
				f = this.iScroll,
				e = this;
			clearInterval(this.timer);
			this.timer = setInterval(function() {
				d++;
				20 < d ? (clearInterval(e.timer), e.oBar && (e.oBar.style.opacity = 0), b && b.call(e)) : (e.iScroll = e.tween[c](d, f, a, 20), e.setCss())
			}, 20)
		}
	},
	setCss: function() {
		this.iScroll = parseInt(this.iScroll);
		this.offMove || (this.oScroll.style.WebkitTransform = this.oScroll.style.transform = "x" == this.sDirection ? "translateX(" + this.iScroll + "px)" : "translateY(" + this.iScroll + "px)");
		this.oBar && (this.oBar.style.WebkitTransform = this.oBar.style.transform = "x" == this.sDirection ? "translateX(" + -this.iScroll / this.scale + "px)" : "translateY(" + -this.iScroll / this.scale + "px)");
		if (this.onscroll) this.onscroll()
	},
	resize: function() {
		this.iMaxT = "x" == this.sDirection ? this.oScroll.offsetWidth - this.obj.clientWidth : this.oScroll.offsetHeight - this.obj.clientHeight;
		0 > this.iMaxT && (this.iMaxT = 0);
		this.oBar && (this.scrollWrap = "x" == this.sDirection ? this.obj.clientWidth : this.obj.clientHeight, this.scale = "x" == this.sDirection ? this.oScroll.offsetWidth / this.obj.clientWidth : this.oScroll.offsetHeight / this.obj.clientHeight, "x" == this.sDirection ? this.oBar.style.width = this.scrollWrap / this.scale + "px" : this.oBar.style.height = this.scrollWrap / this.scale + "px")
	}
};

module.exports = MScroll; 