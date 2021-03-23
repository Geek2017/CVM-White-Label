/*!
 * Signature Pad v1.3.4 | https://github.com/szimek/signature_pad
 * (c) 2014 Szymon Nowak | Released under the MIT license
 */
var SignaturePad = function(a) { "use strict"; var b = function(a, b) { var c = b || {};
        this.velocityFilterWeight = c.velocityFilterWeight || .7, this.minWidth = c.minWidth || .5, this.maxWidth = c.maxWidth || 2.5, this.dotSize = c.dotSize || function() { return (this.minWidth + this.maxWidth) / 2 }, this.penColor = c.penColor || "black", this.backgroundColor = c.backgroundColor || "rgba(0,0,0,0)", this.onEnd = c.onEnd, this.onBegin = c.onBegin, this._canvas = a, this._ctx = a.getContext("2d"), this.clear(), this._handleMouseEvents(), this._handleTouchEvents() };
    b.prototype.clear = function() { var a = this._ctx,
            b = this._canvas;
        a.fillStyle = this.backgroundColor, a.clearRect(0, 0, b.width, b.height), a.fillRect(0, 0, b.width, b.height), this._reset() }, b.prototype.toDataURL = function() { var a = this._canvas; return a.toDataURL.apply(a, arguments) }, b.prototype.fromDataURL = function(a) { var b = this,
            c = new Image,
            d = window.devicePixelRatio || 1,
            e = this._canvas.width / d,
            f = this._canvas.height / d;
        this._reset(), c.src = a, c.onload = function() { b._ctx.drawImage(c, 0, 0, e, f) }, this._isEmpty = !1 }, b.prototype._strokeUpdate = function(a) { var b = this._createPoint(a);
        this._addPoint(b) }, b.prototype._strokeBegin = function(a) { this._reset(), this._strokeUpdate(a), "function" == typeof this.onBegin && this.onBegin(a) }, b.prototype._strokeDraw = function(a) { var b = this._ctx,
            c = "function" == typeof this.dotSize ? this.dotSize() : this.dotSize;
        b.beginPath(), this._drawPoint(a.x, a.y, c), b.closePath(), b.fill() }, b.prototype._strokeEnd = function(a) { var b = this.points.length > 2,
            c = this.points[0];!b && c && this._strokeDraw(c), "function" == typeof this.onEnd && this.onEnd(a) }, b.prototype._handleMouseEvents = function() { var b = this;
        this._mouseButtonDown = !1, this._canvas.addEventListener("mousedown", function(a) { 1 === a.which && (b._mouseButtonDown = !0, b._strokeBegin(a)) }), this._canvas.addEventListener("mousemove", function(a) { b._mouseButtonDown && b._strokeUpdate(a) }), a.addEventListener("mouseup", function(a) { 1 === a.which && b._mouseButtonDown && (b._mouseButtonDown = !1, b._strokeEnd(a)) }) }, b.prototype._handleTouchEvents = function() { var b = this;
        this._canvas.style.msTouchAction = "none", this._canvas.addEventListener("touchstart", function(a) { var c = a.changedTouches[0];
            b._strokeBegin(c) }), this._canvas.addEventListener("touchmove", function(a) { a.preventDefault(); var c = a.changedTouches[0];
            b._strokeUpdate(c) }), a.addEventListener("touchend", function(a) { var c = a.target === b._canvas;
            c && b._strokeEnd(a) }) }, b.prototype.isEmpty = function() { return this._isEmpty }, b.prototype._reset = function() { this.points = [], this._lastVelocity = 0, this._lastWidth = (this.minWidth + this.maxWidth) / 2, this._isEmpty = !0, this._ctx.fillStyle = this.penColor }, b.prototype._createPoint = function(a) { var b = this._canvas.getBoundingClientRect(); return new c(a.clientX - b.left, a.clientY - b.top) }, b.prototype._addPoint = function(a) { var b, c, e, f, g = this.points;
        g.push(a), g.length > 2 && (3 === g.length && g.unshift(g[0]), f = this._calculateCurveControlPoints(g[0], g[1], g[2]), b = f.c2, f = this._calculateCurveControlPoints(g[1], g[2], g[3]), c = f.c1, e = new d(g[1], b, c, g[2]), this._addCurve(e), g.shift()) }, b.prototype._calculateCurveControlPoints = function(a, b, d) { var e = a.x - b.x,
            f = a.y - b.y,
            g = b.x - d.x,
            h = b.y - d.y,
            i = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
            j = { x: (b.x + d.x) / 2, y: (b.y + d.y) / 2 },
            k = Math.sqrt(e * e + f * f),
            l = Math.sqrt(g * g + h * h),
            m = i.x - j.x,
            n = i.y - j.y,
            o = l / (k + l),
            p = { x: j.x + m * o, y: j.y + n * o },
            q = b.x - p.x,
            r = b.y - p.y; return { c1: new c(i.x + q, i.y + r), c2: new c(j.x + q, j.y + r) } }, b.prototype._addCurve = function(a) { var b, c, d = a.startPoint,
            e = a.endPoint;
        b = e.velocityFrom(d), b = this.velocityFilterWeight * b + (1 - this.velocityFilterWeight) * this._lastVelocity, c = this._strokeWidth(b), this._drawCurve(a, this._lastWidth, c), this._lastVelocity = b, this._lastWidth = c }, b.prototype._drawPoint = function(a, b, c) { var d = this._ctx;
        d.moveTo(a, b), d.arc(a, b, c, 0, 2 * Math.PI, !1), this._isEmpty = !1 }, b.prototype._drawCurve = function(a, b, c) { var d, e, f, g, h, i, j, k, l, m, n, o = this._ctx,
            p = c - b; for (d = Math.floor(a.length()), o.beginPath(), f = 0; d > f; f++) g = f / d, h = g * g, i = h * g, j = 1 - g, k = j * j, l = k * j, m = l * a.startPoint.x, m += 3 * k * g * a.control1.x, m += 3 * j * h * a.control2.x, m += i * a.endPoint.x, n = l * a.startPoint.y, n += 3 * k * g * a.control1.y, n += 3 * j * h * a.control2.y, n += i * a.endPoint.y, e = b + i * p, this._drawPoint(m, n, e);
        o.closePath(), o.fill() }, b.prototype._strokeWidth = function(a) { return Math.max(this.maxWidth / (a + 1), this.minWidth) }; var c = function(a, b, c) { this.x = a, this.y = b, this.time = c || (new Date).getTime() };
    c.prototype.velocityFrom = function(a) { return this.time !== a.time ? this.distanceTo(a) / (this.time - a.time) : 1 }, c.prototype.distanceTo = function(a) { return Math.sqrt(Math.pow(this.x - a.x, 2) + Math.pow(this.y - a.y, 2)) }; var d = function(a, b, c, d) { this.startPoint = a, this.control1 = b, this.control2 = c, this.endPoint = d }; return d.prototype.length = function() { var a, b, c, d, e, f, g, h, i = 10,
            j = 0; for (a = 0; i >= a; a++) b = a / i, c = this._point(b, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x), d = this._point(b, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y), a > 0 && (g = c - e, h = d - f, j += Math.sqrt(g * g + h * h)), e = c, f = d; return j }, d.prototype._point = function(a, b, c, d, e) { return b * (1 - a) * (1 - a) * (1 - a) + 3 * c * (1 - a) * (1 - a) * a + 3 * d * (1 - a) * a * a + e * a * a * a }, b }(document);