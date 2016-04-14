/*
 jQWidgets v3.8.2 (2015-Aug)
 Copyright (c) 2011-2015 jQWidgets.
 License: http://jqwidgets.com/license/
 */

(function (a) {
    a.jqx.jqxWidget("jqxDraw", "", {});
    a.extend(a.jqx._jqxDraw.prototype, {defineInstance: function () {
        var d = {renderEngine: ""};
        a.extend(true, this, d);
        var e = ["clear", "on", "off", "removeElement", "attr", "getAttr", "line", "circle", "rect", "path", "pieslice", "text", "measureText"];
        for (var c in e) {
            this._addFn(a.jqx._jqxDraw.prototype, e[c])
        }
    }, _addFn: function (d, c) {
        if (d[c]) {
            return
        }
        d[c] = function () {
            return this.renderer[c].apply(this.renderer, arguments)
        }
    }, createInstance: function (c) {
    }, _initRenderer: function (c) {
        return a.jqx.createRenderer(this, c)
    }, _internalRefresh: function () {
        var c = this;
        if (a.jqx.isHidden(c.host)) {
            return
        }
        if (!c.renderer) {
            c.host.empty();
            c._initRenderer(c.host)
        }
        var e = c.renderer;
        if (!e) {
            return
        }
        var d = e.getRect();
        c._render({x: 1, y: 1, width: d.width, height: d.height});
        if (e instanceof a.jqx.HTML5Renderer) {
            e.refresh()
        }
    }, _saveAsImage: function (e, f, c, d) {
        return a.jqx._widgetToImage(this, e, f, c, d)
    }, _render: function (d) {
        var c = this;
        var e = c.renderer;
        c._plotRect = d
    }, refresh: function () {
        this._internalRefresh()
    }, getSize: function () {
        var c = this._plotRect;
        return{width: c.width, height: c.height}
    }, saveAsPNG: function (e, c, d) {
        return this._saveAsImage("png", e, c, d)
    }, saveAsJPEG: function (e, c, d) {
        return this._saveAsImage("jpeg", e, c, d)
    }})
})(jqxBaseFramework);
(function (a) {
    a.jqx.toGreyScale = function (c) {
        if (c.indexOf("#") == -1) {
            return c
        }
        var d = a.jqx.cssToRgb(c);
        d[0] = d[1] = d[2] = Math.round(0.3 * d[0] + 0.59 * d[1] + 0.11 * d[2]);
        var e = a.jqx.rgbToHex(d[0], d[1], d[2]);
        return"#" + e[0] + e[1] + e[2]
    }, a.jqx.adjustColor = function (f, e) {
        if (typeof(f) != "string") {
            return"#000000"
        }
        if (f.indexOf("#") == -1) {
            return f
        }
        var h = a.jqx.cssToRgb(f);
        var d = a.jqx.rgbToHsl(h);
        d[2] = Math.min(1, d[2] * e);
        d[1] = Math.min(1, d[1] * e * 1.1);
        h = a.jqx.hslToRgb(d);
        var f = "#";
        for (var j = 0; j < 3; j++) {
            var k = Math.round(h[j]);
            k = a.jqx.decToHex(k);
            if (k.toString().length == 1) {
                f += "0"
            }
            f += k
        }
        return f.toUpperCase()
    };
    a.jqx.decToHex = function (c) {
        return c.toString(16)
    };
    a.jqx.hexToDec = function (c) {
        return parseInt(c, 16)
    };
    a.jqx.rgbToHex = function (e, d, c) {
        return[a.jqx.decToHex(e), a.jqx.decToHex(d), a.jqx.decToHex(c)]
    };
    a.jqx.hexToRgb = function (d, f, c) {
        return[a.jqx.hexToDec(d), a.jqx.hexToDec(f), a.jqx.hexToDec(c)]
    };
    a.jqx.cssToRgb = function (c) {
        if (c.indexOf("rgb") <= -1) {
            return a.jqx.hexToRgb(c.substring(1, 3), c.substring(3, 5), c.substring(5, 7))
        }
        return c.substring(4, c.length - 1).split(",")
    };
    a.jqx.hslToRgb = function (d) {
        var f = parseFloat(d[0]);
        var e = parseFloat(d[1]);
        var c = parseFloat(d[2]);
        if (e == 0) {
            r = g = b = c
        } else {
            var i = c < 0.5 ? c * (1 + e) : c + e - c * e;
            var j = 2 * c - i;
            r = a.jqx.hueToRgb(j, i, f + 1 / 3);
            g = a.jqx.hueToRgb(j, i, f);
            b = a.jqx.hueToRgb(j, i, f - 1 / 3)
        }
        return[r * 255, g * 255, b * 255]
    };
    a.jqx.hueToRgb = function (e, d, c) {
        if (c < 0) {
            c += 1
        }
        if (c > 1) {
            c -= 1
        }
        if (c < 1 / 6) {
            return e + (d - e) * 6 * c
        } else {
            if (c < 1 / 2) {
                return d
            } else {
                if (c < 2 / 3) {
                    return e + (d - e) * (2 / 3 - c) * 6
                }
            }
        }
        return e
    };
    a.jqx.rgbToHsl = function (j) {
        var c = parseFloat(j[0]) / 255;
        var i = parseFloat(j[1]) / 255;
        var k = parseFloat(j[2]) / 255;
        var m = Math.max(c, i, k), e = Math.min(c, i, k);
        var f, o, d = (m + e) / 2;
        if (m == e) {
            f = o = 0
        } else {
            var n = m - e;
            o = d > 0.5 ? n / (2 - m - e) : n / (m + e);
            switch (m) {
                case c:
                    f = (i - k) / n + (i < k ? 6 : 0);
                    break;
                case i:
                    f = (k - c) / n + 2;
                    break;
                case k:
                    f = (c - i) / n + 4;
                    break
            }
            f /= 6
        }
        return[f, o, d]
    };
    a.jqx.swap = function (c, e) {
        var d = c;
        c = e;
        e = d
    };
    a.jqx.getNum = function (c) {
        if (!a.isArray(c)) {
            if (isNaN(c)) {
                return 0
            }
        } else {
            for (var d = 0; d < c.length; d++) {
                if (!isNaN(c[d])) {
                    return c[d]
                }
            }
        }
        return 0
    };
    a.jqx._ptdist = function (d, f, c, e) {
        return Math.sqrt((c - d) * (c - d) + (e - f) * (e - f))
    };
    a.jqx._ptrnd = function (d) {
        if (!document.createElementNS) {
            if (Math.round(d) == d) {
                return d
            }
            return a.jqx._rnd(d, 1, false, true)
        }
        var c = a.jqx._rnd(d, 0.5, false, true);
        if (Math.abs(c - Math.round(c)) != 0.5) {
            return c > d ? c - 0.5 : c + 0.5
        }
        return c
    };
    a.jqx._ptRotate = function (e, k, d, j, h) {
        var c = Math.sqrt(Math.pow(Math.abs(e - d), 2) + Math.pow(Math.abs(k - j), 2));
        var f = Math.asin((e - d) / c);
        var i = f + h;
        e = d + Math.cos(i) * c;
        k = j + Math.sin(i) * c;
        return{x: e, y: k}
    };
    a.jqx._rup = function (d) {
        var c = Math.round(d);
        if (d > c) {
            c++
        }
        return c
    };
    a.jqx.log = function (d, c) {
        return Math.log(d) / (c ? Math.log(c) : 1)
    };
    a.jqx._mod = function (d, c) {
        var e = Math.abs(d > c ? c : d);
        var f = 1;
        if (e != 0) {
            while (e * f < 100) {
                f *= 10
            }
        }
        d = d * f;
        c = c * f;
        return(d % c) / f
    };
    a.jqx._rnd = function (e, h, f, d) {
        if (isNaN(e)) {
            return e
        }
        var c = e - ((d == true) ? e % h : a.jqx._mod(e, h));
        if (e == c) {
            return c
        }
        if (f) {
            if (e > c) {
                c += h
            }
        } else {
            if (c > e) {
                c -= h
            }
        }
        return c
    };
    a.jqx.commonRenderer = {pieSlicePath: function (l, k, i, t, C, D, e) {
        if (!t) {
            t = 1
        }
        var n = Math.abs(C - D);
        var q = n > 180 ? 1 : 0;
        if (n >= 360) {
            D = C + 359.99
        }
        var s = C * Math.PI * 2 / 360;
        var j = D * Math.PI * 2 / 360;
        var A = l, z = l, h = k, f = k;
        var o = !isNaN(i) && i > 0;
        if (o) {
            e = 0
        }
        if (e + i > 0) {
            if (e > 0) {
                var m = n / 2 + C;
                var B = m * Math.PI * 2 / 360;
                l += e * Math.cos(B);
                k -= e * Math.sin(B)
            }
            if (o) {
                var w = i;
                A = l + w * Math.cos(s);
                h = k - w * Math.sin(s);
                z = l + w * Math.cos(j);
                f = k - w * Math.sin(j)
            }
        }
        var v = l + t * Math.cos(s);
        var u = l + t * Math.cos(j);
        var d = k - t * Math.sin(s);
        var c = k - t * Math.sin(j);
        var p = "";
        if (o) {
            p = "M " + z + "," + f;
            p += " a" + i + "," + i;
            p += " 0 " + q + ",1 " + (A - z) + "," + (h - f);
            p += " L" + v + "," + d;
            p += " a" + t + "," + t;
            p += " 0 " + q + ",0 " + (u - v) + "," + (c - d)
        } else {
            p = "M " + u + "," + c;
            p += " a" + t + "," + t;
            p += " 0 " + q + ",1 " + (v - u) + "," + (d - c);
            p += " L" + l + "," + k + " Z"
        }
        return p
    }, measureText: function (q, h, i, p, n) {
        var f = n._getTextParts(q, h, i);
        var k = f.width;
        var c = f.height;
        if (false == p) {
            c /= 0.6
        }
        var d = {};
        if (isNaN(h)) {
            h = 0
        }
        if (h == 0) {
            d = {width: a.jqx._rup(k), height: a.jqx._rup(c)}
        } else {
            var m = h * Math.PI * 2 / 360;
            var e = Math.abs(Math.sin(m));
            var l = Math.abs(Math.cos(m));
            var j = Math.abs(k * e + c * l);
            var o = Math.abs(k * l + c * e);
            d = {width: a.jqx._rup(o), height: a.jqx._rup(j)}
        }
        if (p) {
            d.textPartsInfo = f
        }
        return d
    }, alignTextInRect: function (t, p, c, u, o, q, k, s, f, e) {
        var m = f * Math.PI * 2 / 360;
        var d = Math.sin(m);
        var l = Math.cos(m);
        var n = o * d;
        var j = o * l;
        if (k == "center" || k == "" || k == "undefined") {
            t = t + c / 2
        } else {
            if (k == "right") {
                t = t + c
            }
        }
        if (s == "center" || s == "middle" || s == "" || s == "undefined") {
            p = p + u / 2
        } else {
            if (s == "bottom") {
                p += u - q / 2
            } else {
                if (s == "top") {
                    p += q / 2
                }
            }
        }
        e = e || "";
        var h = "middle";
        if (e.indexOf("top") != -1) {
            h = "top"
        } else {
            if (e.indexOf("bottom") != -1) {
                h = "bottom"
            }
        }
        var i = "center";
        if (e.indexOf("left") != -1) {
            i = "left"
        } else {
            if (e.indexOf("right") != -1) {
                i = "right"
            }
        }
        if (i == "center") {
            t -= j / 2;
            p -= n / 2
        } else {
            if (i == "right") {
                t -= j;
                p -= n
            }
        }
        if (h == "top") {
            t -= q * d;
            p += q * l
        } else {
            if (h == "middle") {
                t -= q * d / 2;
                p += q * l / 2
            }
        }
        t = a.jqx._rup(t);
        p = a.jqx._rup(p);
        return{x: t, y: p}
    }};
    a.jqx.svgRenderer = function () {
    };
    a.jqx.svgRenderer.prototype = {_svgns: "http://www.w3.org/2000/svg", init: function (h) {
        var f = "<table id=tblChart cellspacing='0' cellpadding='0' border='0' align='left' valign='top'><tr><td colspan=2 id=tdTop></td></tr><tr><td id=tdLeft></td><td><div class='chartContainer' onselectstart='return false;'></div></td></tr></table>";
        h.append(f);
        this.host = h;
        var c = h.find(".chartContainer");
        c[0].style.width = h.width() + "px";
        c[0].style.height = h.height() + "px";
        var j;
        try {
            var d = document.createElementNS(this._svgns, "svg");
            d.setAttribute("id", "svgChart");
            d.setAttribute("version", "1.1");
            d.setAttribute("width", "100%");
            d.setAttribute("height", "100%");
            d.setAttribute("overflow", "hidden");
            c[0].appendChild(d);
            this.canvas = d
        } catch (i) {
            return false
        }
        this._id = new Date().getTime();
        this.clear();
        this._layout();
        this._runLayoutFix();
        return true
    }, getType: function () {
        return"SVG"
    }, refresh: function () {
    }, _runLayoutFix: function () {
        var c = this;
        this._fixLayout()
    }, _fixLayout: function () {
        var i = a(this.canvas).position();
        var e = (parseFloat(i.left) == parseInt(i.left));
        var c = (parseFloat(i.top) == parseInt(i.top));
        if (a.jqx.browser.msie) {
            var e = true, c = true;
            var f = this.host;
            var d = 0, h = 0;
            while (f && f.position && f[0].parentNode) {
                var j = f.position();
                d += parseFloat(j.left) - parseInt(j.left);
                h += parseFloat(j.top) - parseInt(j.top);
                f = f.parent()
            }
            e = parseFloat(d) == parseInt(d);
            c = parseFloat(h) == parseInt(h)
        }
        if (!e) {
            this.host.find("#tdLeft")[0].style.width = "0.5px"
        }
        if (!c) {
            this.host.find("#tdTop")[0].style.height = "0.5px"
        }
    }, _layout: function () {
        var d = a(this.canvas).offset();
        var c = this.host.find(".chartContainer");
        this._width = Math.max(a.jqx._rup(this.host.width()) - 1, 0);
        this._height = Math.max(a.jqx._rup(this.host.height()) - 1, 0);
        c[0].style.width = this._width;
        c[0].style.height = this._height;
        this._fixLayout()
    }, getRect: function () {
        return{x: 0, y: 0, width: this._width, height: this._height}
    }, getContainer: function () {
        var c = this.host.find(".chartContainer");
        return c
    }, clear: function () {
        while (this.canvas.childElementCount > 0) {
            this.removeElement(this.canvas.firstElementChild)
        }
        this._defaultParent = undefined;
        this._defs = document.createElementNS(this._svgns, "defs");
        this._gradients = {};
        this.canvas.appendChild(this._defs)
    }, removeElement: function (e) {
        if (undefined == e) {
            return
        }
        this.removeHandler(e);
        try {
            while (e.firstChild) {
                this.removeElement(e.firstChild)
            }
            if (e.parentNode) {
                e.parentNode.removeChild(e)
            } else {
                this.canvas.removeChild(e)
            }
        } catch (d) {
            var c = d
        }
    }, _openGroups: [], beginGroup: function () {
        var c = this._activeParent();
        var d = document.createElementNS(this._svgns, "g");
        c.appendChild(d);
        this._openGroups.push(d);
        return d
    }, endGroup: function () {
        if (this._openGroups.length == 0) {
            return
        }
        this._openGroups.pop()
    }, _activeParent: function () {
        return this._openGroups.length == 0 ? this.canvas : this._openGroups[this._openGroups.length - 1]
    }, createClipRect: function (e) {
        var f = document.createElementNS(this._svgns, "clipPath");
        var d = document.createElementNS(this._svgns, "rect");
        this.attr(d, {x: e.x, y: e.y, width: e.width, height: e.height, fill: "none"});
        this._clipId = this._clipId || 0;
        f.id = "cl" + this._id + "_" + (++this._clipId).toString();
        f.appendChild(d);
        this._defs.appendChild(f);
        return f
    }, getWindowHref: function () {
        var d = a.jqx.browser;
        if (d && d.browser == "msie" && d.version < 10) {
            return""
        }
        var c = window.location.href;
        if (!c) {
            return c
        }
        c = c.replace(/([\('\)])/g, "\\$1");
        c = c.replace(/#.*$/, "");
        return c
    }, setClip: function (e, d) {
        var c = "url(" + this.getWindowHref() + "#" + d.id + ")";
        return this.attr(e, {"clip-path": c})
    }, _clipId: 0, addHandler: function (c, e, d) {
        if (a(c).on) {
            a(c).on(e, d)
        } else {
            a(c).bind(e, d)
        }
    }, removeHandler: function (c, e, d) {
        if (a(c).off) {
            a(c).off(e, d)
        } else {
            a(c).unbind(e, d)
        }
    }, on: function (c, e, d) {
        this.addHandler(c, e, d)
    }, off: function (c, e, d) {
        this.removeHandler(c, e, d)
    }, shape: function (c, f) {
        var d = document.createElementNS(this._svgns, c);
        if (!d) {
            return undefined
        }
        for (var e in f) {
            d.setAttribute(e, f[e])
        }
        this._activeParent().appendChild(d);
        return d
    }, _getTextParts: function (t, j, k) {
        var h = {width: 0, height: 0, parts: []};
        if (undefined === t) {
            return h
        }
        var o = 0.6;
        var u = t.toString().split("<br>");
        var q = this._activeParent();
        var m = document.createElementNS(this._svgns, "text");
        this.attr(m, k);
        for (var l = 0; l < u.length; l++) {
            var d = u[l];
            var f = m.ownerDocument.createTextNode(d);
            m.appendChild(f);
            q.appendChild(m);
            var s;
            try {
                s = m.getBBox()
            } catch (p) {
            }
            var n = a.jqx._rup(s.width);
            var c = a.jqx._rup(s.height * o);
            m.removeChild(f);
            h.width = Math.max(h.width, n);
            h.height += c + (l > 0 ? 4 : 0);
            h.parts.push({width: n, height: c, text: d})
        }
        q.removeChild(m);
        return h
    }, _measureText: function (f, e, d, c) {
        return a.jqx.commonRenderer.measureText(f, e, d, c, this)
    }, measureText: function (e, d, c) {
        return this._measureText(e, d, c, false)
    }, text: function (z, t, s, E, C, K, M, L, v, m, d) {
        var B = this._measureText(z, K, M, true);
        var l = B.textPartsInfo;
        var j = l.parts;
        var D;
        if (!v) {
            v = "center"
        }
        if (!m) {
            m = "center"
        }
        if (j.length > 1 || L) {
            D = this.beginGroup()
        }
        if (L) {
            var k = this.createClipRect({x: a.jqx._rup(t) - 1, y: a.jqx._rup(s) - 1, width: a.jqx._rup(E) + 2, height: a.jqx._rup(C) + 2});
            this.setClip(D, k)
        }
        var q = this._activeParent();
        var O = 0, n = 0;
        var c = 0.6;
        O = l.width;
        n = l.height;
        if (isNaN(E) || E <= 0) {
            E = O
        }
        if (isNaN(C) || C <= 0) {
            C = n
        }
        var u = E || 0;
        var J = C || 0;
        if (!K || K == 0) {
            s += n;
            if (m == "center" || m == "middle") {
                s += (J - n) / 2
            } else {
                if (m == "bottom") {
                    s += J - n
                }
            }
            if (!E) {
                E = O
            }
            if (!C) {
                C = n
            }
            var q = this._activeParent();
            var p = 0;
            for (var I = j.length - 1; I >= 0; I--) {
                var A = document.createElementNS(this._svgns, "text");
                this.attr(A, M);
                this.attr(A, {cursor: "default"});
                var H = A.ownerDocument.createTextNode(j[I].text);
                A.appendChild(H);
                var P = t;
                var o = j[I].width;
                var f = j[I].height;
                if (v == "center") {
                    P += (u - o) / 2
                } else {
                    if (v == "right") {
                        P += (u - o)
                    }
                }
                this.attr(A, {x: a.jqx._rup(P), y: a.jqx._rup(s + p), width: a.jqx._rup(o), height: a.jqx._rup(f)});
                q.appendChild(A);
                p -= j[I].height + 4
            }
            if (D) {
                this.endGroup();
                return D
            }
            return A
        }
        var F = a.jqx.commonRenderer.alignTextInRect(t, s, E, C, O, n, v, m, K, d);
        t = F.x;
        s = F.y;
        var G = this.shape("g", {transform: "translate(" + t + "," + s + ")"});
        var e = this.shape("g", {transform: "rotate(" + K + ")"});
        G.appendChild(e);
        var p = 0;
        for (var I = j.length - 1; I >= 0; I--) {
            var N = document.createElementNS(this._svgns, "text");
            this.attr(N, M);
            this.attr(N, {cursor: "default"});
            var H = N.ownerDocument.createTextNode(j[I].text);
            N.appendChild(H);
            var P = 0;
            var o = j[I].width;
            var f = j[I].height;
            if (v == "center") {
                P += (l.width - o) / 2
            } else {
                if (v == "right") {
                    P += (l.width - o)
                }
            }
            this.attr(N, {x: a.jqx._rup(P), y: a.jqx._rup(p), width: a.jqx._rup(o), height: a.jqx._rup(f)});
            e.appendChild(N);
            p -= f + 4
        }
        q.appendChild(G);
        if (D) {
            this.endGroup()
        }
        return G
    }, line: function (e, h, d, f, i) {
        var c = this.shape("line", {x1: e, y1: h, x2: d, y2: f});
        this.attr(c, i);
        return c
    }, path: function (d, e) {
        var c = this.shape("path");
        c.setAttribute("d", d);
        if (e) {
            this.attr(c, e)
        }
        return c
    }, rect: function (c, j, d, f, i) {
        c = a.jqx._ptrnd(c);
        j = a.jqx._ptrnd(j);
        d = Math.max(1, a.jqx._rnd(d, 1, false));
        f = Math.max(1, a.jqx._rnd(f, 1, false));
        var e = this.shape("rect", {x: c, y: j, width: d, height: f});
        if (i) {
            this.attr(e, i)
        }
        return e
    }, circle: function (c, h, e, f) {
        var d = this.shape("circle", {cx: c, cy: h, r: e});
        if (f) {
            this.attr(d, f)
        }
        return d
    }, pieSlicePath: function (d, j, i, f, h, e, c) {
        return a.jqx.commonRenderer.pieSlicePath(d, j, i, f, h, e, c)
    }, pieslice: function (l, j, i, e, h, c, k, d) {
        var f = this.pieSlicePath(l, j, i, e, h, c, k);
        var m = this.shape("path");
        m.setAttribute("d", f);
        if (d) {
            this.attr(m, d)
        }
        return m
    }, attr: function (c, e) {
        if (!c || !e) {
            return
        }
        for (var d in e) {
            if (d == "textContent") {
                c.textContent = e[d]
            } else {
                c.setAttribute(d, e[d])
            }
        }
    }, removeAttr: function (c, e) {
        if (!c || !e) {
            return
        }
        for (var d in e) {
            if (d == "textContent") {
                c.textContent = ""
            } else {
                c.removeAttribute(e[d])
            }
        }
    }, getAttr: function (d, c) {
        return d.getAttribute(c)
    }, _gradients: {}, _toLinearGradient: function (f, k, l) {
        var d = "grd" + this._id + f.replace("#", "") + (k ? "v" : "h");
        var c = "url(" + this.getWindowHref() + "#" + d + ")";
        if (this._gradients[c]) {
            return c
        }
        var e = document.createElementNS(this._svgns, "linearGradient");
        this.attr(e, {x1: "0%", y1: "0%", x2: k ? "0%" : "100%", y2: k ? "100%" : "0%", id: d});
        for (var h = 0; h < l.length; h++) {
            var j = l[h];
            var n = document.createElementNS(this._svgns, "stop");
            var m = "stop-color:" + a.jqx.adjustColor(f, j[1]);
            this.attr(n, {offset: j[0] + "%", style: m});
            e.appendChild(n)
        }
        this._defs.appendChild(e);
        this._gradients[c] = true;
        return c
    }, _toRadialGradient: function (f, l, k) {
        var d = "grd" + this._id + f.replace("#", "") + "r" + (k != undefined ? k.key : "");
        var c = "url(" + this.getWindowHref() + "#" + d + ")";
        if (this._gradients[c]) {
            return c
        }
        var e = document.createElementNS(this._svgns, "radialGradient");
        if (k == undefined) {
            this.attr(e, {cx: "50%", cy: "50%", r: "100%", fx: "50%", fy: "50%", id: d})
        } else {
            this.attr(e, {cx: k.x, cy: k.y, r: k.outerRadius, id: d, gradientUnits: "userSpaceOnUse"})
        }
        for (var h = 0; h < l.length; h++) {
            var j = l[h];
            var n = document.createElementNS(this._svgns, "stop");
            var m = "stop-color:" + a.jqx.adjustColor(f, j[1]);
            this.attr(n, {offset: j[0] + "%", style: m});
            e.appendChild(n)
        }
        this._defs.appendChild(e);
        this._gradients[c] = true;
        return c
    }};
    a.jqx.vmlRenderer = function () {
    };
    a.jqx.vmlRenderer.prototype = {init: function (j) {
        var h = "<div class='chartContainer' style=\"position:relative;overflow:hidden;\"><div>";
        j.append(h);
        this.host = j;
        var c = j.find(".chartContainer");
        c[0].style.width = j.width() + "px";
        c[0].style.height = j.height() + "px";
        var f = true;
        try {
            for (var d = 0; d < document.namespaces.length; d++) {
                if (document.namespaces[d].name == "v" && document.namespaces[d].urn == "urn:schemas-microsoft-com:vml") {
                    f = false;
                    break
                }
            }
        } catch (k) {
            return false
        }
        if (a.jqx.browser.msie && parseInt(a.jqx.browser.version) < 9 && (document.childNodes && document.childNodes.length > 0 && document.childNodes[0].data && document.childNodes[0].data.indexOf("DOCTYPE") != -1)) {
            if (f) {
                document.namespaces.add("v", "urn:schemas-microsoft-com:vml")
            }
            this._ie8mode = true
        } else {
            if (f) {
                document.namespaces.add("v", "urn:schemas-microsoft-com:vml");
                document.createStyleSheet().cssText = "v\\:* { behavior: url(#default#VML); display: inline-block; }"
            }
        }
        this.canvas = c[0];
        this._width = Math.max(a.jqx._rup(c.width()), 0);
        this._height = Math.max(a.jqx._rup(c.height()), 0);
        c[0].style.width = this._width + 2;
        c[0].style.height = this._height + 2;
        this._id = new Date().getTime();
        this.clear();
        return true
    }, getType: function () {
        return"VML"
    }, refresh: function () {
    }, getRect: function () {
        return{x: 0, y: 0, width: this._width, height: this._height}
    }, getContainer: function () {
        var c = this.host.find(".chartContainer");
        return c
    }, clear: function () {
        while (this.canvas.childElementCount > 0) {
            this.removeHandler(this.canvas.firstElementChild);
            this.canvas.removeChild(this.canvas.firstElementChild)
        }
        this._gradients = {};
        this._defaultParent = undefined
    }, removeElement: function (c) {
        if (c != null) {
            this.removeHandler(c);
            c.parentNode.removeChild(c)
        }
    }, _openGroups: [], beginGroup: function () {
        var c = this._activeParent();
        var d = document.createElement("v:group");
        d.style.position = "absolute";
        d.coordorigin = "0,0";
        d.coordsize = this._width + "," + this._height;
        d.style.left = 0;
        d.style.top = 0;
        d.style.width = this._width;
        d.style.height = this._height;
        c.appendChild(d);
        this._openGroups.push(d);
        return d
    }, endGroup: function () {
        if (this._openGroups.length == 0) {
            return
        }
        this._openGroups.pop()
    }, _activeParent: function () {
        return this._openGroups.length == 0 ? this.canvas : this._openGroups[this._openGroups.length - 1]
    }, createClipRect: function (c) {
        var d = document.createElement("div");
        d.style.height = (c.height + 1) + "px";
        d.style.width = (c.width + 1) + "px";
        d.style.position = "absolute";
        d.style.left = c.x + "px";
        d.style.top = c.y + "px";
        d.style.overflow = "hidden";
        this._clipId = this._clipId || 0;
        d.id = "cl" + this._id + "_" + (++this._clipId).toString();
        this._activeParent().appendChild(d);
        return d
    }, setClip: function (d, c) {
    }, _clipId: 0, addHandler: function (c, e, d) {
        if (a(c).on) {
            a(c).on(e, d)
        } else {
            a(c).bind(e, d)
        }
    }, removeHandler: function (c, e, d) {
        if (a(c).off) {
            a(c).off(e, d)
        } else {
            a(c).unbind(e, d)
        }
    }, on: function (c, e, d) {
        this.addHandler(c, e, d)
    }, off: function (c, e, d) {
        this.removeHandler(c, e, d)
    }, _getTextParts: function (q, h, j) {
        var f = {width: 0, height: 0, parts: []};
        var o = 0.6;
        var s = q.toString().split("<br>");
        var p = this._activeParent();
        var l = document.createElement("v:textbox");
        this.attr(l, j);
        p.appendChild(l);
        for (var k = 0; k < s.length; k++) {
            var d = s[k];
            var e = document.createElement("span");
            e.appendChild(document.createTextNode(d));
            l.appendChild(e);
            if (j && j["class"]) {
                e.className = j["class"]
            }
            var n = a(l);
            var m = a.jqx._rup(n.width());
            var c = a.jqx._rup(n.height() * o);
            if (c == 0 && a.jqx.browser.msie && parseInt(a.jqx.browser.version) < 9) {
                var t = n.css("font-size");
                if (t) {
                    c = parseInt(t);
                    if (isNaN(c)) {
                        c = 0
                    }
                }
            }
            l.removeChild(e);
            f.width = Math.max(f.width, m);
            f.height += c + (k > 0 ? 2 : 0);
            f.parts.push({width: m, height: c, text: d})
        }
        p.removeChild(l);
        return f
    }, _measureText: function (f, e, d, c) {
        if (Math.abs(e) > 45) {
            e = 90
        } else {
            e = 0
        }
        return a.jqx.commonRenderer.measureText(f, e, d, c, this)
    }, measureText: function (e, d, c) {
        return this._measureText(e, d, c, false)
    }, text: function (u, p, o, D, z, J, L, K, t, k) {
        var E;
        if (L && L.stroke) {
            E = L.stroke
        }
        if (E == undefined) {
            E = "black"
        }
        var v = this._measureText(u, J, L, true);
        var f = v.textPartsInfo;
        var c = f.parts;
        var M = v.width;
        var l = v.height;
        if (isNaN(D) || D == 0) {
            D = M
        }
        if (isNaN(z) || z == 0) {
            z = l
        }
        var B;
        if (!t) {
            t = "center"
        }
        if (!k) {
            k = "center"
        }
        if (c.length > 0 || K) {
            B = this.beginGroup()
        }
        if (K) {
            var d = this.createClipRect({x: a.jqx._rup(p), y: a.jqx._rup(o), width: a.jqx._rup(D), height: a.jqx._rup(z)});
            this.setClip(B, d)
        }
        var n = this._activeParent();
        var s = D || 0;
        var I = z || 0;
        if (Math.abs(J) > 45) {
            J = 90
        } else {
            J = 0
        }
        var A = 0, H = 0;
        if (t == "center") {
            A += (s - M) / 2
        } else {
            if (t == "right") {
                A += (s - M)
            }
        }
        if (k == "center") {
            H = (I - l) / 2
        } else {
            if (k == "bottom") {
                H = I - l
            }
        }
        if (J == 0) {
            o += l + H;
            p += A
        } else {
            p += M + A;
            o += H
        }
        var m = 0, N = 0;
        var e;
        for (var G = c.length - 1; G >= 0; G--) {
            var C = c[G];
            var q = (M - C.width) / 2;
            if (J == 0 && t == "left") {
                q = 0
            } else {
                if (J == 0 && t == "right") {
                    q = M - C.width
                } else {
                    if (J == 90) {
                        q = (l - C.width) / 2
                    }
                }
            }
            var j = m - C.height;
            H = J == 90 ? q : j;
            A = J == 90 ? j : q;
            e = document.createElement("v:textbox");
            e.style.position = "absolute";
            e.style.left = a.jqx._rup(p + A);
            e.style.top = a.jqx._rup(o + H);
            e.style.width = a.jqx._rup(C.width);
            e.style.height = a.jqx._rup(C.height);
            if (J == 90) {
                e.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";
                e.style.height = a.jqx._rup(C.height) + 5
            }
            var F = document.createElement("span");
            F.appendChild(document.createTextNode(C.text));
            if (L && L["class"]) {
                F.className = L["class"]
            }
            e.appendChild(F);
            n.appendChild(e);
            m -= C.height + (G > 0 ? 2 : 0)
        }
        if (B) {
            this.endGroup();
            return n
        }
        return e
    }, shape: function (c, f) {
        var d = document.createElement(this._createElementMarkup(c));
        if (!d) {
            return undefined
        }
        for (var e in f) {
            d.setAttribute(e, f[e])
        }
        this._activeParent().appendChild(d);
        return d
    }, line: function (f, i, e, h, j) {
        var c = "M " + f + "," + i + " L " + e + "," + h + " X E";
        var d = this.path(c);
        this.attr(d, j);
        return d
    }, _createElementMarkup: function (c) {
        var d = "<v:" + c + ' style=""></v:' + c + ">";
        if (this._ie8mode) {
            d = d.replace('style=""', 'style="behavior: url(#default#VML);"')
        }
        return d
    }, path: function (d, e) {
        var c = document.createElement(this._createElementMarkup("shape"));
        c.style.position = "absolute";
        c.coordsize = this._width + " " + this._height;
        c.coordorigin = "0 0";
        c.style.width = parseInt(this._width);
        c.style.height = parseInt(this._height);
        c.style.left = 0 + "px";
        c.style.top = 0 + "px";
        c.setAttribute("path", d);
        this._activeParent().appendChild(c);
        if (e) {
            this.attr(c, e)
        }
        return c
    }, rect: function (c, j, d, e, i) {
        c = a.jqx._ptrnd(c);
        j = a.jqx._ptrnd(j);
        d = a.jqx._rup(d);
        e = a.jqx._rup(e);
        var f = this.shape("rect", i);
        f.style.position = "absolute";
        f.style.left = c;
        f.style.top = j;
        f.style.width = d;
        f.style.height = e;
        f.strokeweight = 0;
        if (i) {
            this.attr(f, i)
        }
        return f
    }, circle: function (c, h, e, f) {
        var d = this.shape("oval");
        c = a.jqx._ptrnd(c - e);
        h = a.jqx._ptrnd(h - e);
        e = a.jqx._rup(e);
        d.style.position = "absolute";
        d.style.left = c;
        d.style.top = h;
        d.style.width = e * 2;
        d.style.height = e * 2;
        if (f) {
            this.attr(d, f)
        }
        return d
    }, updateCircle: function (e, c, f, d) {
        if (c == undefined) {
            c = parseFloat(e.style.left) + parseFloat(e.style.width) / 2
        }
        if (f == undefined) {
            f = parseFloat(e.style.top) + parseFloat(e.style.height) / 2
        }
        if (d == undefined) {
            d = parseFloat(e.width) / 2
        }
        c = a.jqx._ptrnd(c - d);
        f = a.jqx._ptrnd(f - d);
        d = a.jqx._rup(d);
        e.style.left = c;
        e.style.top = f;
        e.style.width = d * 2;
        e.style.height = d * 2
    }, pieSlicePath: function (m, l, j, u, E, F, e) {
        if (!u) {
            u = 1
        }
        var o = Math.abs(E - F);
        var s = o > 180 ? 1 : 0;
        if (o > 360) {
            E = 0;
            F = 360
        }
        var t = E * Math.PI * 2 / 360;
        var k = F * Math.PI * 2 / 360;
        var B = m, A = m, h = l, f = l;
        var p = !isNaN(j) && j > 0;
        if (p) {
            e = 0
        }
        if (e > 0) {
            var n = o / 2 + E;
            var D = n * Math.PI * 2 / 360;
            m += e * Math.cos(D);
            l -= e * Math.sin(D)
        }
        if (p) {
            var z = j;
            B = a.jqx._ptrnd(m + z * Math.cos(t));
            h = a.jqx._ptrnd(l - z * Math.sin(t));
            A = a.jqx._ptrnd(m + z * Math.cos(k));
            f = a.jqx._ptrnd(l - z * Math.sin(k))
        }
        var w = a.jqx._ptrnd(m + u * Math.cos(t));
        var v = a.jqx._ptrnd(m + u * Math.cos(k));
        var d = a.jqx._ptrnd(l - u * Math.sin(t));
        var c = a.jqx._ptrnd(l - u * Math.sin(k));
        u = a.jqx._ptrnd(u);
        j = a.jqx._ptrnd(j);
        m = a.jqx._ptrnd(m);
        l = a.jqx._ptrnd(l);
        var i = Math.round(E * 65535);
        var C = Math.round((F - E) * 65536);
        if (j < 0) {
            j = 1
        }
        var q = "";
        if (p) {
            q = "M" + B + " " + h;
            q += " AE " + m + " " + l + " " + j + " " + j + " " + i + " " + C;
            q += " L " + v + " " + c;
            i = Math.round((E - F) * 65535);
            C = Math.round(F * 65536);
            q += " AE " + m + " " + l + " " + u + " " + u + " " + C + " " + i;
            q += " L " + B + " " + h
        } else {
            q = "M" + m + " " + l;
            q += " AE " + m + " " + l + " " + u + " " + u + " " + i + " " + C
        }
        q += " X E";
        return q
    }, pieslice: function (m, k, j, f, i, c, l, e) {
        var h = this.pieSlicePath(m, k, j, f, i, c, l);
        var d = this.path(h, e);
        if (e) {
            this.attr(d, e)
        }
        return d
    }, _keymap: [
        {svg: "fill", vml: "fillcolor"},
        {svg: "stroke", vml: "strokecolor"},
        {svg: "stroke-width", vml: "strokeweight"},
        {svg: "stroke-dasharray", vml: "dashstyle"},
        {svg: "fill-opacity", vml: "fillopacity"},
        {svg: "stroke-opacity", vml: "strokeopacity"},
        {svg: "opacity", vml: "opacity"},
        {svg: "cx", vml: "style.left"},
        {svg: "cy", vml: "style.top"},
        {svg: "height", vml: "style.height"},
        {svg: "width", vml: "style.width"},
        {svg: "x", vml: "style.left"},
        {svg: "y", vml: "style.top"},
        {svg: "d", vml: "v"},
        {svg: "display", vml: "style.display"}
    ], _translateParam: function (c) {
        for (var d in this._keymap) {
            if (this._keymap[d].svg == c) {
                return this._keymap[d].vml
            }
        }
        return c
    }, attr: function (d, f) {
        if (!d || !f) {
            return
        }
        for (var e in f) {
            var c = this._translateParam(e);
            if (undefined == f[e]) {
                continue
            }
            if (c == "fillcolor" && f[e].indexOf("grd") != -1) {
                d.type = f[e]
            } else {
                if (c == "fillcolor" && f[e] == "transparent") {
                    d.style.filter = "alpha(opacity=0)";
                    d["-ms-filter"] = "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"
                } else {
                    if (c == "opacity" || c == "fillopacity") {
                        if (d.fill) {
                            d.fill.opacity = f[e]
                        }
                    } else {
                        if (c == "textContent") {
                            d.children[0].innerText = f[e]
                        } else {
                            if (c == "dashstyle") {
                                d.dashstyle = f[e].replace(",", " ")
                            } else {
                                if (c.indexOf("style.") == -1) {
                                    d[c] = f[e]
                                } else {
                                    d.style[c.replace("style.", "")] = f[e]
                                }
                            }
                        }
                    }
                }
            }
        }
    }, removeAttr: function (c, e) {
        if (!c || !e) {
            return
        }
        for (var d in e) {
            c.removeAttribute(e[d])
        }
    }, getAttr: function (e, d) {
        var c = this._translateParam(d);
        if (c == "opacity" || c == "fillopacity") {
            if (e.fill) {
                return e.fill.opacity
            } else {
                return 1
            }
        }
        if (c.indexOf("style.") == -1) {
            return e[c]
        }
        return e.style[c.replace("style.", "")]
    }, _gradients: {}, _toRadialGradient: function (c, e, d) {
        return c
    }, _toLinearGradient: function (j, m, n) {
        if (this._ie8mode) {
            return j
        }
        var e = "grd" + j.replace("#", "") + (m ? "v" : "h");
        var f = "#" + e + "";
        if (this._gradients[f]) {
            return f
        }
        var h = document.createElement(this._createElementMarkup("fill"));
        h.type = "gradient";
        h.method = "linear";
        h.angle = m ? 0 : 90;
        var d = "";
        for (var k = 0; k < n.length; k++) {
            var l = n[k];
            if (l > 0) {
                d += ", "
            }
            d += l[0] + "% " + a.jqx.adjustColor(j, l[1])
        }
        h.colors = d;
        var c = document.createElement(this._createElementMarkup("shapetype"));
        c.appendChild(h);
        c.id = e;
        this.canvas.appendChild(c);
        return f
    }};
    a.jqx.HTML5Renderer = function () {
    };
    a.jqx.ptrnd = function (d) {
        if (Math.abs(Math.round(d) - d) == 0.5) {
            return d
        }
        var c = Math.round(d);
        if (c < d) {
            c = c - 1
        }
        return c + 0.5
    };
    a.jqx.HTML5Renderer.prototype = {_elements: {}, init: function (c) {
        try {
            this.host = c;
            this.host.append("<canvas id='__jqxCanvasWrap' style='width:100%; height: 100%;'/>");
            this.canvas = c.find("#__jqxCanvasWrap");
            this.canvas[0].width = c.width();
            this.canvas[0].height = c.height();
            this.ctx = this.canvas[0].getContext("2d")
        } catch (d) {
            return false
        }
        return true
    }, getType: function () {
        return"HTML5"
    }, getContainer: function () {
        if (this.canvas && this.canvas.length == 1) {
            return this.canvas
        }
        return undefined
    }, getRect: function () {
        return{x: 0, y: 0, width: this.canvas[0].width - 1, height: this.canvas[0].height - 1}
    }, beginGroup: function () {
    }, endGroup: function () {
    }, setClip: function () {
    }, createClipRect: function (c) {
    }, addHandler: function (c, e, d) {
    }, removeHandler: function (c, e, d) {
    }, on: function (c, e, d) {
        this.addHandler(c, e, d)
    }, off: function (c, e, d) {
        this.removeHandler(c, e, d)
    }, clear: function () {
        this._elements = {};
        this._maxId = 0;
        this._renderers._gradients = {};
        this._gradientId = 0
    }, removeElement: function (c) {
        if (undefined == c) {
            return
        }
        if (this._elements[c.id]) {
            delete this._elements[c.id]
        }
    }, _maxId: 0, shape: function (c, f) {
        var d = {type: c, id: this._maxId++};
        for (var e in f) {
            d[e] = f[e]
        }
        this._elements[d.id] = d;
        return d
    }, attr: function (c, e) {
        for (var d in e) {
            c[d] = e[d]
        }
    }, removeAttr: function (c, e) {
        for (var d in e) {
            delete c[e[d]]
        }
    }, rect: function (c, j, d, f, i) {
        if (isNaN(c)) {
            throw'Invalid value for "x"'
        }
        if (isNaN(j)) {
            throw'Invalid value for "y"'
        }
        if (isNaN(d)) {
            throw'Invalid value for "width"'
        }
        if (isNaN(f)) {
            throw'Invalid value for "height"'
        }
        var e = this.shape("rect", {x: c, y: j, width: d, height: f});
        if (i) {
            this.attr(e, i)
        }
        return e
    }, path: function (c, e) {
        var d = this.shape("path", e);
        this.attr(d, {d: c});
        return d
    }, line: function (d, f, c, e, h) {
        return this.path("M " + d + "," + f + " L " + c + "," + e, h)
    }, circle: function (c, h, e, f) {
        var d = this.shape("circle", {x: c, y: h, r: e});
        if (f) {
            this.attr(d, f)
        }
        return d
    }, pieSlicePath: function (d, j, i, f, h, e, c) {
        return a.jqx.commonRenderer.pieSlicePath(d, j, i, f, h, e, c)
    }, pieslice: function (l, j, i, f, h, c, k, d) {
        var e = this.path(this.pieSlicePath(l, j, i, f, h, c, k), d);
        this.attr(e, {x: l, y: j, innerRadius: i, outerRadius: f, angleFrom: h, angleTo: c});
        return e
    }, _getCSSStyle: function (d) {
        var k = document.styleSheets;
        try {
            for (var f = 0; f < k.length; f++) {
                for (var c = 0; k[f].cssRules && c < k[f].cssRules.length; c++) {
                    if (k[f].cssRules[c].selectorText.indexOf(d) != -1) {
                        return k[f].cssRules[c].style
                    }
                }
            }
        } catch (h) {
        }
        return{}
    }, _getTextParts: function (s, h, j) {
        var n = "Arial";
        var t = "10pt";
        var o = "";
        if (j && j["class"]) {
            var c = this._getCSSStyle(j["class"]);
            if (c.fontSize) {
                t = c.fontSize
            }
            if (c.fontFamily) {
                n = c.fontFamily
            }
            if (c.fontWeight) {
                o = c.fontWeight
            }
        }
        this.ctx.font = o + " " + t + " " + n;
        var f = {width: 0, height: 0, parts: []};
        var m = 0.6;
        var q = s.toString().split("<br>");
        for (var k = 0; k < q.length; k++) {
            var e = q[k];
            var l = this.ctx.measureText(e).width;
            var p = document.createElement("span");
            p.font = this.ctx.font;
            p.textContent = e;
            document.body.appendChild(p);
            var d = p.offsetHeight * m;
            document.body.removeChild(p);
            f.width = Math.max(f.width, a.jqx._rup(l));
            f.height += d + (k > 0 ? 4 : 0);
            f.parts.push({width: l, height: d, text: e})
        }
        return f
    }, _measureText: function (f, e, d, c) {
        return a.jqx.commonRenderer.measureText(f, e, d, c, this)
    }, measureText: function (e, d, c) {
        return this._measureText(e, d, c, false)
    }, text: function (o, n, l, d, p, h, i, e, j, m, f) {
        var q = this.shape("text", {text: o, x: n, y: l, width: d, height: p, angle: h, clip: e, halign: j, valign: m, rotateAround: f});
        if (i) {
            this.attr(q, i)
        }
        q.fontFamily = "Arial";
        q.fontSize = "10pt";
        q.fontWeight = "";
        q.color = "#000000";
        if (i && i["class"]) {
            var c = this._getCSSStyle(i["class"]);
            q.fontFamily = c.fontFamily || q.fontFamily;
            q.fontSize = c.fontSize || q.fontSize;
            q.fontWeight = c.fontWeight || q.fontWeight;
            q.color = c.color || q.color
        }
        var k = this._measureText(o, 0, i, true);
        this.attr(q, {textPartsInfo: k.textPartsInfo, textWidth: k.width, textHeight: k.height});
        if (d <= 0 || isNaN(d)) {
            this.attr(q, {width: k.width})
        }
        if (p <= 0 || isNaN(p)) {
            this.attr(q, {height: k.height})
        }
        return q
    }, _toLinearGradient: function (d, j, h) {
        if (this._renderers._gradients[d]) {
            return d
        }
        var c = [];
        for (var f = 0; f < h.length; f++) {
            c.push({percent: h[f][0] / 100, color: a.jqx.adjustColor(d, h[f][1])})
        }
        var e = "gr" + this._gradientId++;
        this.createGradient(e, j ? "vertical" : "horizontal", c);
        return e
    }, _toRadialGradient: function (d, h) {
        if (this._renderers._gradients[d]) {
            return d
        }
        var c = [];
        for (var f = 0; f < h.length; f++) {
            c.push({percent: h[f][0] / 100, color: a.jqx.adjustColor(d, h[f][1])})
        }
        var e = "gr" + this._gradientId++;
        this.createGradient(e, "radial", c);
        return e
    }, _gradientId: 0, createGradient: function (e, d, c) {
        this._renderers.createGradient(e, d, c)
    }, _renderers: {_gradients: {}, createGradient: function (e, d, c) {
        this._gradients[e] = {orientation: d, colorStops: c}
    }, setStroke: function (c, d) {
        c.strokeStyle = d.stroke || "transparent";
        c.lineWidth = d["stroke-width"] || 1;
        if (d["fill-opacity"] != undefined) {
            c.globalAlpha = d["fill-opacity"]
        } else {
            if (d.opacity != undefined) {
                c.globalAlpha = d.opacity
            } else {
                c.globalAlpha = 1
            }
        }
        if (c.setLineDash) {
            if (d["stroke-dasharray"]) {
                c.setLineDash(d["stroke-dasharray"].split(","))
            } else {
                c.setLineDash([])
            }
        }
    }, setFillStyle: function (o, f) {
        o.fillStyle = "transparent";
        if (f["fill-opacity"] != undefined) {
            o.globalAlpha = f["fill-opacity"]
        } else {
            if (f.opacity != undefined) {
                o.globalAlpha = f.opacity
            } else {
                o.globalAlpha = 1
            }
        }
        if (f.fill && f.fill.indexOf("#") == -1 && this._gradients[f.fill]) {
            var m = this._gradients[f.fill].orientation != "horizontal";
            var j = this._gradients[f.fill].orientation == "radial";
            var d = a.jqx.ptrnd(f.x);
            var n = a.jqx.ptrnd(f.y);
            var c = a.jqx.ptrnd(f.x + (m ? 0 : f.width));
            var k = a.jqx.ptrnd(f.y + (m ? f.height : 0));
            var l;
            if ((f.type == "circle" || f.type == "path") && j) {
                x = a.jqx.ptrnd(f.x);
                y = a.jqx.ptrnd(f.y);
                r1 = f.innerRadius || 0;
                r2 = f.outerRadius || f.r || 0;
                l = o.createRadialGradient(x, y, r1, x, y, r2)
            }
            if (!j) {
                if (isNaN(d) || isNaN(c) || isNaN(n) || isNaN(k)) {
                    d = 0;
                    n = 0;
                    c = m ? 0 : o.canvas.width;
                    k = m ? o.canvas.height : 0
                }
                l = o.createLinearGradient(d, n, c, k)
            }
            var e = this._gradients[f.fill].colorStops;
            for (var h = 0; h < e.length; h++) {
                l.addColorStop(e[h].percent, e[h].color)
            }
            o.fillStyle = l
        } else {
            if (f.fill) {
                o.fillStyle = f.fill
            }
        }
    }, rect: function (c, d) {
        if (d.width == 0 || d.height == 0) {
            return
        }
        c.fillRect(a.jqx.ptrnd(d.x), a.jqx.ptrnd(d.y), d.width, d.height);
        c.strokeRect(a.jqx.ptrnd(d.x), a.jqx.ptrnd(d.y), d.width, d.height)
    }, circle: function (c, d) {
        if (d.r == 0) {
            return
        }
        c.beginPath();
        c.arc(a.jqx.ptrnd(d.x), a.jqx.ptrnd(d.y), d.r, 0, Math.PI * 2, false);
        c.closePath();
        c.fill();
        c.stroke()
    }, _parsePoint: function (d) {
        var c = this._parseNumber(d);
        var e = this._parseNumber(d);
        return({x: c, y: e})
    }, _parseNumber: function (e) {
        var f = false;
        for (var c = this._pos; c < e.length; c++) {
            if ((e[c] >= "0" && e[c] <= "9") || e[c] == "." || (e[c] == "-" && !f)) {
                f = true;
                continue
            }
            if (!f && (e[c] == " " || e[c] == ",")) {
                this._pos++;
                continue
            }
            break
        }
        var d = parseFloat(e.substring(this._pos, c));
        if (isNaN(d)) {
            return undefined
        }
        this._pos = c;
        return d
    }, _pos: 0, _cmds: "mlcaz", _lastCmd: "", _isRelativeCmd: function (c) {
        return a.jqx.string.contains(this._cmds, c)
    }, _parseCmd: function (c) {
        for (var d = this._pos; d < c.length; d++) {
            if (a.jqx.string.containsIgnoreCase(this._cmds, c[d])) {
                this._pos = d + 1;
                this._lastCmd = c[d];
                return this._lastCmd
            }
            if (c[d] == " ") {
                this._pos++;
                continue
            }
            if (c[d] >= "0" && c[d] <= "9") {
                this._pos = d;
                if (this._lastCmd == "") {
                    break
                } else {
                    return this._lastCmd
                }
            }
        }
        return undefined
    }, _toAbsolutePoint: function (c) {
        return{x: this._currentPoint.x + c.x, y: this._currentPoint.y + c.y}
    }, _currentPoint: {x: 0, y: 0}, path: function (E, N) {
        var B = N.d;
        this._pos = 0;
        this._lastCmd = "";
        var n = undefined;
        this._currentPoint = {x: 0, y: 0};
        E.beginPath();
        var I = 0;
        while (this._pos < B.length) {
            var H = this._parseCmd(B);
            if (H == undefined) {
                break
            }
            if (H == "M" || H == "m") {
                var F = this._parsePoint(B);
                if (F == undefined) {
                    break
                }
                E.moveTo(F.x, F.y);
                this._currentPoint = F;
                if (n == undefined) {
                    n = F
                }
                continue
            }
            if (H == "L" || H == "l") {
                var F = this._parsePoint(B);
                if (F == undefined) {
                    break
                }
                E.lineTo(F.x, F.y);
                this._currentPoint = F;
                continue
            }
            if (H == "A" || H == "a") {
                var j = this._parseNumber(B);
                var h = this._parseNumber(B);
                var L = this._parseNumber(B) * (Math.PI / 180);
                var P = this._parseNumber(B);
                var f = this._parseNumber(B);
                var q = this._parsePoint(B);
                if (this._isRelativeCmd(H)) {
                    q = this._toAbsolutePoint(q)
                }
                if (j == 0 || h == 0) {
                    continue
                }
                var k = this._currentPoint;
                var K = {x: Math.cos(L) * (k.x - q.x) / 2 + Math.sin(L) * (k.y - q.y) / 2, y: -Math.sin(L) * (k.x - q.x) / 2 + Math.cos(L) * (k.y - q.y) / 2};
                var l = Math.pow(K.x, 2) / Math.pow(j, 2) + Math.pow(K.y, 2) / Math.pow(h, 2);
                if (l > 1) {
                    j *= Math.sqrt(l);
                    h *= Math.sqrt(l)
                }
                var t = (P == f ? -1 : 1) * Math.sqrt(((Math.pow(j, 2) * Math.pow(h, 2)) - (Math.pow(j, 2) * Math.pow(K.y, 2)) - (Math.pow(h, 2) * Math.pow(K.x, 2))) / (Math.pow(j, 2) * Math.pow(K.y, 2) + Math.pow(h, 2) * Math.pow(K.x, 2)));
                if (isNaN(t)) {
                    t = 0
                }
                var J = {x: t * j * K.y / h, y: t * -h * K.x / j};
                var D = {x: (k.x + q.x) / 2 + Math.cos(L) * J.x - Math.sin(L) * J.y, y: (k.y + q.y) / 2 + Math.sin(L) * J.x + Math.cos(L) * J.y};
                var C = function (i) {
                    return Math.sqrt(Math.pow(i[0], 2) + Math.pow(i[1], 2))
                };
                var z = function (m, i) {
                    return(m[0] * i[0] + m[1] * i[1]) / (C(m) * C(i))
                };
                var O = function (m, i) {
                    return(m[0] * i[1] < m[1] * i[0] ? -1 : 1) * Math.acos(z(m, i))
                };
                var G = O([1, 0], [(K.x - J.x) / j, (K.y - J.y) / h]);
                var p = [(K.x - J.x) / j, (K.y - J.y) / h];
                var o = [(-K.x - J.x) / j, (-K.y - J.y) / h];
                var M = O(p, o);
                if (z(p, o) <= -1) {
                    M = Math.PI
                }
                if (z(p, o) >= 1) {
                    M = 0
                }
                if (f == 0 && M > 0) {
                    M = M - 2 * Math.PI
                }
                if (f == 1 && M < 0) {
                    M = M + 2 * Math.PI
                }
                var z = (j > h) ? j : h;
                var A = (j > h) ? 1 : j / h;
                var w = (j > h) ? h / j : 1;
                E.translate(D.x, D.y);
                E.rotate(L);
                E.scale(A, w);
                E.arc(0, 0, z, G, G + M, 1 - f);
                E.scale(1 / A, 1 / w);
                E.rotate(-L);
                E.translate(-D.x, -D.y);
                continue
            }
            if ((H == "Z" || H == "z") && n != undefined) {
                E.lineTo(n.x, n.y);
                this._currentPoint = n;
                continue
            }
            if (H == "C" || H == "c") {
                var e = this._parsePoint(B);
                var d = this._parsePoint(B);
                var c = this._parsePoint(B);
                E.bezierCurveTo(e.x, e.y, d.x, d.y, c.x, c.y);
                this._currentPoint = c;
                continue
            }
        }
        E.fill();
        E.stroke();
        E.closePath()
    }, text: function (A, G) {
        var p = a.jqx.ptrnd(G.x);
        var o = a.jqx.ptrnd(G.y);
        var v = a.jqx.ptrnd(G.width);
        var t = a.jqx.ptrnd(G.height);
        var s = G.halign;
        var k = G.valign;
        var D = G.angle;
        var c = G.rotateAround;
        var f = G.textPartsInfo;
        var e = f.parts;
        var E = G.clip;
        if (E == undefined) {
            E = true
        }
        A.save();
        if (!s) {
            s = "center"
        }
        if (!k) {
            k = "center"
        }
        if (E) {
            A.rect(p, o, v, t);
            A.clip()
        }
        var H = G.textWidth;
        var l = G.textHeight;
        var q = v || 0;
        var C = t || 0;
        A.fillStyle = G.color;
        A.font = G.fontWeight + " " + G.fontSize + " " + G.fontFamily;
        if (!D || D == 0) {
            o += l;
            if (k == "center" || k == "middle") {
                o += (C - l) / 2
            } else {
                if (k == "bottom") {
                    o += C - l
                }
            }
            if (!v) {
                v = H
            }
            if (!t) {
                t = l
            }
            var n = 0;
            for (var B = e.length - 1; B >= 0; B--) {
                var u = e[B];
                var I = p;
                var m = e[B].width;
                var d = e[B].height;
                if (s == "center") {
                    I += (q - m) / 2
                } else {
                    if (s == "right") {
                        I += (q - m)
                    }
                }
                A.fillText(u.text, I, o + n);
                n -= u.height + (B > 0 ? 4 : 0)
            }
            A.restore();
            return
        }
        var z = a.jqx.commonRenderer.alignTextInRect(p, o, v, t, H, l, s, k, D, c);
        p = z.x;
        o = z.y;
        var j = D * Math.PI * 2 / 360;
        A.translate(p, o);
        A.rotate(j);
        var n = 0;
        var F = f.width;
        for (var B = e.length - 1; B >= 0; B--) {
            var I = 0;
            if (s == "center") {
                I += (F - e[B].width) / 2
            } else {
                if (s == "right") {
                    I += (F - e[B].width)
                }
            }
            A.fillText(e[B].text, I, n);
            n -= e[B].height + 4
        }
        A.restore()
    }}, refresh: function () {
        this.ctx.clearRect(0, 0, this.canvas[0].width, this.canvas[0].height);
        for (var c in this._elements) {
            var d = this._elements[c];
            this._renderers.setFillStyle(this.ctx, d);
            this._renderers.setStroke(this.ctx, d);
            this._renderers[this._elements[c].type](this.ctx, d)
        }
    }};
    a.jqx.createRenderer = function (c, e) {
        var d = c;
        var f = d.renderer = null;
        if (document.createElementNS && (d.renderEngine != "HTML5" && d.renderEngine != "VML")) {
            f = new a.jqx.svgRenderer();
            if (!f.init(e)) {
                if (d.renderEngine == "SVG") {
                    throw"Your browser does not support SVG"
                }
                return null
            }
        }
        if (f == null && d.renderEngine != "HTML5") {
            f = new a.jqx.vmlRenderer();
            if (!f.init(e)) {
                if (d.renderEngine == "VML") {
                    throw"Your browser does not support VML"
                }
                return null
            }
            d._isVML = true
        }
        if (f == null && (d.renderEngine == "HTML5" || d.renderEngine == undefined)) {
            f = new a.jqx.HTML5Renderer();
            if (!f.init(e)) {
                throw"Your browser does not support HTML5 Canvas"
            }
        }
        d.renderer = f;
        return f
    }, a.jqx._widgetToImage = function (o, j, f, m, h) {
        var k = o;
        if (!k) {
            return false
        }
        if (f == undefined || f == "") {
            f = "image." + j
        }
        var l = k.renderEngine;
        var d = k.enableAnimations;
        k.enableAnimations = false;
        k.renderEngine = "HTML5";
        if (k.renderEngine != l) {
            try {
                k.refresh()
            } catch (i) {
                k.renderEngine = l;
                k.refresh();
                k.enableAnimations = d;
                return false
            }
        }
        var c = k.renderer.getContainer()[0];
        var n = a.jqx.exportImage(c, j, f, m, h);
        if (k.renderEngine != l) {
            k.renderEngine = l;
            k.refresh();
            k.enableAnimations = d
        }
        return n
    };
    a.jqx.getByPriority = function (c) {
        var e = undefined;
        for (var d = 0; d < c.length && e == undefined; d++) {
            if (e == undefined && c[d] != undefined) {
                e = c[d]
            }
        }
        return e
    };
    a.jqx.exportImage = function (f, o, h, s, k) {
        if (!f) {
            return false
        }
        var m = o.toLowerCase() === "pdf";
        if (m) {
            o = "jpeg"
        }
        if (h == undefined || h == "") {
            h = "image." + o
        }
        if (s == undefined || s == "") {
            throw"Please specifiy export server"
        }
        var u = true;
        try {
            if (f) {
                var i = f.toDataURL("image/" + o);
                if (m) {
                    if (!a.jqx.pdfExport) {
                        a.jqx.pdfExport = {orientation: "portrait", paperSize: "a4"}
                    }
                    var j = 595;
                    switch (a.jqx.pdfExport.paperSize) {
                        case"legal":
                            var j = 612;
                            if (a.jqx.pdfExport.orientation !== "portrait") {
                                j = 1008
                            }
                            break;
                        case"letter":
                            var j = 612;
                            if (a.jqx.pdfExport.orientation !== "portrait") {
                                j = 792
                            }
                            break;
                        case"a3":
                            var j = 841;
                            if (a.jqx.pdfExport.orientation !== "portrait") {
                                j = 1190
                            }
                            break;
                        case"a4":
                            var j = 595;
                            if (a.jqx.pdfExport.orientation !== "portrait") {
                                j = 842
                            }
                            break;
                        case"a5":
                            var j = 420;
                            if (a.jqx.pdfExport.orientation !== "portrait") {
                                j = 595
                            }
                            break
                    }
                    var l = a(f).width();
                    var p = l * 72 / 96;
                    if (p >= j - 20) {
                        p = j - 20
                    }
                    var q = new pdfDataExport(a.jqx.pdfExport.orientation, "pt", a.jqx.pdfExport.paperSize);
                    q.addImage(i, "JPEG", 10, 10, p, 0);
                    q.save(h);
                    return
                }
                i = i.replace("data:image/" + o + ";base64,", "");
                if (k) {
                    a.ajax({dataType: "string", url: s, type: "POST", data: {content: i, fname: h}, async: false, success: function (v, e, w) {
                        u = true
                    }, error: function (v, e, w) {
                        u = false
                    }})
                } else {
                    var d = document.createElement("form");
                    d.method = "POST";
                    d.action = s;
                    d.style.display = "none";
                    document.body.appendChild(d);
                    var t = document.createElement("input");
                    t.name = "fname";
                    t.value = h;
                    t.style.display = "none";
                    var c = document.createElement("input");
                    c.name = "content";
                    c.value = i;
                    c.style.display = "none";
                    d.appendChild(t);
                    d.appendChild(c);
                    d.submit();
                    document.body.removeChild(d);
                    u = true
                }
            }
        } catch (n) {
            u = false
        }
        return u
    }
})(jqxBaseFramework);
(function (a) {
    a.jqx.jqxWidget("jqxChart", "", {});
    a.extend(a.jqx._jqxChart.prototype, {defineInstance: function () {
        var c = {title: "Title", description: "Description", source: [], seriesGroups: [], categoryAxis: null, xAxis: {}, valueAxis: null, renderEngine: "", enableAnimations: true, enableAxisTextAnimation: false, backgroundImage: "", background: "#FFFFFF", padding: {left: 5, top: 5, right: 5, bottom: 5}, backgroundColor: "#FFFFFF", showBorderLine: true, borderLineWidth: 1, borderLineColor: null, borderColor: null, titlePadding: {left: 5, top: 5, right: 5, bottom: 10}, showLegend: true, legendLayout: null, enabled: true, colorScheme: "scheme01", animationDuration: 500, showToolTips: true, toolTipShowDelay: 500, toolTipDelay: 500, toolTipHideDelay: 4000, toolTipMoveDuration: 300, toolTipFormatFunction: null, toolTipAlignment: "dataPoint", localization: undefined, columnSeriesOverlap: false, rtl: false, legendPosition: null, greyScale: false, axisPadding: 5, enableCrosshairs: false, crosshairsColor: "#BCBCBC", crosshairsDashStyle: "2,2", crosshairsLineWidth: 1, enableEvents: true, _itemsToggleState: [], _isToggleRefresh: false, drawBefore: null, draw: null};
        a.extend(true, this, c);
        this._createColorsCache()
    }, _defaultLineColor: "#BCBCBC", _touchEvents: {mousedown: a.jqx.mobile.getTouchEventName("touchstart"), click: a.jqx.mobile.getTouchEventName("touchstart"), mouseup: a.jqx.mobile.getTouchEventName("touchend"), mousemove: a.jqx.mobile.getTouchEventName("touchmove"), mouseenter: "mouseenter", mouseleave: "mouseleave"}, _getEvent: function (c) {
        if (this._isTouchDevice) {
            return this._touchEvents[c]
        } else {
            return c
        }
    }, destroy: function () {
        this.host.remove()
    }, createInstance: function (e) {
        if (!a.jqx.dataAdapter) {
            throw"jqxdata.js is not loaded"
        }
        var d = this;
        d._refreshOnDownloadComlete();
        d._isTouchDevice = a.jqx.mobile.isTouchDevice();
        d.addHandler(d.host, d._getEvent("mousemove"), function (i) {
            if (d.enabled == false) {
                return
            }
            var h = i.pageX || i.clientX || i.screenX;
            var l = i.pageY || i.clientY || i.screenY;
            var k = d.host.offset();
            if (d._isTouchDevice) {
                var j = a.jqx.position(i);
                h = j.left;
                l = j.top
            }
            h -= k.left;
            l -= k.top;
            d.onmousemove(h, l)
        });
        d.addHandler(d.host, d._getEvent("mouseleave"), function (j) {
            if (d.enabled == false) {
                return
            }
            var h = d._mouseX;
            var k = d._mouseY;
            var i = d._plotRect;
            if (i && h >= i.x && h <= i.x + i.width && k >= i.y && k <= i.y + i.height) {
                return
            }
            d._cancelTooltipTimer();
            d._hideToolTip(0);
            d._unselect()
        });
        d.addHandler(d.host, "click", function (i) {
            if (d.enabled == false) {
                return
            }
            var h = i.pageX || i.clientX || i.screenX;
            var l = i.pageY || i.clientY || i.screenY;
            var k = d.host.offset();
            if (d._isTouchDevice) {
                var j = a.jqx.position(i);
                h = j.left;
                l = j.top
            } else {
            }
            h -= k.left;
            l -= k.top;
            d._mouseX = h;
            d._mouseY = l;
            if (!isNaN(d._lastClickTs)) {
                if ((new Date()).valueOf() - d._lastClickTs < 100) {
                    return
                }
            }
            this._hostClickTimer = setTimeout(function () {
                if (!d._isTouchDevice) {
                    d._cancelTooltipTimer();
                    d._hideToolTip();
                    d._unselect()
                }
                if (d._pointMarker && d._pointMarker.element) {
                    var n = d.seriesGroups[d._pointMarker.gidx];
                    var m = n.series[d._pointMarker.sidx];
                    d._raiseItemEvent("click", n, m, d._pointMarker.iidx)
                }
            }, 100)
        });
        var f = d.element.style;
        if (f) {
            var c = false;
            if (f.width != null) {
                c |= f.width.toString().indexOf("%") != -1
            }
            if (f.height != null) {
                c |= f.height.toString().indexOf("%") != -1
            }
            if (c) {
                a.jqx.utilities.resize(this.host, function () {
                    if (d.timer) {
                        clearTimeout(d.timer)
                    }
                    var h = 1;
                    d.timer = setTimeout(function () {
                        var i = d.enableAnimations;
                        d.enableAnimations = false;
                        d.refresh();
                        d.enableAnimations = i
                    }, h)
                }, false, true)
            }
        }
    }, _refreshOnDownloadComlete: function () {
        var e = this;
        var f = this.source;
        if (f instanceof a.jqx.dataAdapter) {
            var h = f._options;
            if (h == undefined || (h != undefined && !h.autoBind)) {
                f.autoSync = false;
                f.dataBind()
            }
            var d = this.element.id;
            if (f.records.length == 0) {
                var c = function () {
                    if (e.ready) {
                        e.ready()
                    }
                    e.refresh()
                };
                f.unbindDownloadComplete(d);
                f.bindDownloadComplete(d, c)
            } else {
                if (e.ready) {
                    e.ready()
                }
            }
            f.unbindBindingUpdate(d);
            f.bindBindingUpdate(d, function () {
                e.refresh()
            })
        }
    }, propertyChangedHandler: function (c, d, f, e) {
        if (this.isInitialized == undefined || this.isInitialized == false) {
            return
        }
        if (d == "source") {
            this._refreshOnDownloadComlete()
        }
        this.refresh()
    }, _initRenderer: function (c) {
        if (!a.jqx.createRenderer) {
            throw"Please include jqxdraw.js"
        }
        return a.jqx.createRenderer(this, c)
    }, _internalRefresh: function () {
        var c = this;
        if (a.jqx.isHidden(c.host)) {
            return
        }
        c._stopAnimations();
        if (!c.renderer || (!c._isToggleRefresh && !c._isUpdate)) {
            c._hideToolTip(0);
            c._isVML = false;
            c.host.empty();
            c._measureDiv = undefined;
            c._initRenderer(c.host)
        }
        var e = c.renderer;
        if (!e) {
            return
        }
        var d = e.getRect();
        c._render({x: 1, y: 1, width: d.width, height: d.height});
        this._raiseEvent("refreshBegin", {instance: this});
        if (e instanceof a.jqx.HTML5Renderer) {
            e.refresh()
        }
        c._isUpdate = false;
        this._raiseEvent("refreshEnd", {instance: this})
    }, saveAsPDF: function (e, c, d) {
        return this._saveAsImage("pdf", e, c, d)
    }, saveAsPNG: function (e, c, d) {
        return this._saveAsImage("png", e, c, d)
    }, saveAsJPEG: function (e, c, d) {
        return this._saveAsImage("jpeg", e, c, d)
    }, _saveAsImage: function (e, f, c, d) {
        return a.jqx._widgetToImage(this, e, f, c, d)
    }, refresh: function () {
        this._internalRefresh()
    }, update: function () {
        this._isUpdate = true;
        this._internalRefresh()
    }, _seriesTypes: ["line", "stackedline", "stackedline100", "spline", "stackedspline", "stackedspline100", "stepline", "stackedstepline", "stackedstepline100", "area", "stackedarea", "stackedarea100", "splinearea", "stackedsplinearea", "stackedsplinearea100", "steparea", "stackedsteparea", "stackedsteparea100", "rangearea", "splinerangearea", "steprangearea", "column", "stackedcolumn", "stackedcolumn100", "rangecolumn", "scatter", "stackedscatter", "stackedscatter100", "bubble", "stackedbubble", "stackedbubble100", "pie", "donut", "candlestick", "ohlc", "waterfall", "stackedwaterfall"], _render: function (E) {
        var n = this;
        var K = n.renderer;
        n._colorsCache.clear();
        if (!n._isToggleRefresh && n._isUpdate && n._renderData) {
            n._renderDataClone()
        }
        n._renderData = [];
        K.clear();
        n._unselect();
        n._hideToolTip(0);
        var o = n.backgroundImage;
        if (o == undefined || o == "") {
            n.host.css({"background-image": ""})
        } else {
            n.host.css({"background-image": (o.indexOf("(") != -1 ? o : "url('" + o + "')")})
        }
        n._rect = E;
        var aa = n.padding || {left: 5, top: 5, right: 5, bottom: 5};
        var s = K.createClipRect(E);
        var N = K.beginGroup();
        K.setClip(N, s);
        var aj = K.rect(E.x, E.y, E.width - 2, E.height - 2);
        if (o == undefined || o == "") {
            K.attr(aj, {fill: n.backgroundColor || n.background || "white"})
        } else {
            K.attr(aj, {fill: "transparent"})
        }
        if (n.showBorderLine != false) {
            var H = n.borderLineColor == undefined ? n.borderColor : n.borderLineColor;
            if (H == undefined) {
                H = n._defaultLineColor
            }
            var p = this.borderLineWidth;
            if (isNaN(p) || p < 0 || p > 10) {
                p = 1
            }
            K.attr(aj, {"stroke-width": p, stroke: H})
        } else {
            if (a.jqx.browser.msie && a.jqx.browser.version < 9) {
                K.attr(aj, {"stroke-width": 1, stroke: n.backgroundColor || "white"})
            }
        }
        if (a.isFunction(n.drawBefore)) {
            n.drawBefore(K, E)
        }
        var X = {x: aa.left, y: aa.top, width: E.width - aa.left - aa.right, height: E.height - aa.top - aa.bottom};
        n._paddedRect = X;
        var f = n.titlePadding || {left: 2, top: 2, right: 2, bottom: 2};
        var m;
        if (n.title && n.title.length > 0) {
            var U = n.toThemeProperty("jqx-chart-title-text", null);
            m = K.measureText(n.title, 0, {"class": U});
            K.text(n.title, X.x + f.left, X.y + f.top, X.width - (f.left + f.right), m.height, 0, {"class": U}, true, "center", "center");
            X.y += m.height;
            X.height -= m.height
        }
        if (n.description && n.description.length > 0) {
            var V = n.toThemeProperty("jqx-chart-title-description", null);
            m = K.measureText(n.description, 0, {"class": V});
            K.text(n.description, X.x + f.left, X.y + f.top, X.width - (f.left + f.right), m.height, 0, {"class": V}, true, "center", "center");
            X.y += m.height;
            X.height -= m.height
        }
        if (n.title || n.description) {
            X.y += (f.bottom + f.top);
            X.height -= (f.bottom + f.top)
        }
        var c = {x: X.x, y: X.y, width: X.width, height: X.height};
        n._plotRect = c;
        n._buildStats(c);
        var J = n._isPieOnlySeries();
        var u = n.seriesGroups;
        var G;
        var F = {xAxis: {}, valueAxis: {}};
        for (var ab = 0; ab < u.length && !J; ab++) {
            if (u[ab].type == "pie" || u[ab].type == "donut") {
                continue
            }
            var B = n._getXAxis(ab);
            if (!B) {
                throw"seriesGroup[" + ab + "] is missing xAxis definition"
            }
            var ag = B == n._getXAxis() ? -1 : ab;
            F.xAxis[ag] = 0
        }
        var W = n.axisPadding;
        if (isNaN(W)) {
            W = 5
        }
        var t = {left: 0, right: 0, leftCount: 0, rightCount: 0};
        var q = [];
        for (ab = 0; ab < u.length; ab++) {
            var af = u[ab];
            if (af.type == "pie" || af.type == "donut" || af.spider == true || af.polar == true) {
                q.push({width: 0, position: 0, xRel: 0});
                continue
            }
            G = af.orientation == "horizontal";
            var B = n._getXAxis(ab);
            var ag = B == n._getXAxis() ? -1 : ab;
            var l = n._getValueAxis(ab);
            var Q = l == n._getValueAxis() ? -1 : ab;
            var T = !G ? l.axisSize : B.axisSize;
            var k = {x: 0, y: c.y, width: c.width, height: c.height};
            var S = G ? n._getXAxis(ab).position : l.position;
            if (!T || T == "auto") {
                if (G) {
                    T = this._renderXAxis(ab, k, true, c).width;
                    if ((F.xAxis[ag] & 1) == 1) {
                        T = 0
                    } else {
                        if (T > 0) {
                            F.xAxis[ag] |= 1
                        }
                    }
                } else {
                    T = n._renderValueAxis(ab, k, true, c).width;
                    if ((F.valueAxis[Q] & 1) == 1) {
                        T = 0
                    } else {
                        if (T > 0) {
                            F.valueAxis[Q] |= 1
                        }
                    }
                }
            }
            if (S != "left" && n.rtl == true) {
                S = "right"
            }
            if (S != "right") {
                S = "left"
            }
            if (t[S + "Count"] > 0 && t[S] > 0 && T > 0) {
                t[S] += W
            }
            q.push({width: T, position: S, xRel: t[S]});
            t[S] += T;
            t[S + "Count"]++
        }
        var z = Math.max(1, Math.max(E.width, E.height));
        var ae = {top: 0, bottom: 0, topCount: 0, bottomCount: 0};
        var Y = [];
        for (ab = 0; ab < u.length; ab++) {
            var af = u[ab];
            if (af.type == "pie" || af.type == "donut" || af.spider == true || af.polar == true) {
                Y.push({height: 0, position: 0, yRel: 0});
                continue
            }
            G = af.orientation == "horizontal";
            var l = this._getValueAxis(ab);
            var Q = l == n._getValueAxis() ? -1 : ab;
            var B = n._getXAxis(ab);
            var ag = B == n._getXAxis() ? -1 : ab;
            var ad = !G ? B.axisSize : l.axisSize;
            var S = G ? l.position : B.position;
            if (!ad || ad == "auto") {
                if (G) {
                    ad = n._renderValueAxis(ab, {x: 0, y: 0, width: z, height: 0}, true, c).height;
                    if ((F.valueAxis[Q] & 2) == 2) {
                        ad = 0
                    } else {
                        if (ad > 0) {
                            F.valueAxis[Q] |= 2
                        }
                    }
                } else {
                    ad = n._renderXAxis(ab, {x: 0, y: 0, width: z, height: 0}, true).height;
                    if ((F.xAxis[ag] & 2) == 2) {
                        ad = 0
                    } else {
                        if (ad > 0) {
                            F.xAxis[ag] |= 2
                        }
                    }
                }
            }
            if (S != "top") {
                S = "bottom"
            }
            if (ae[S + "Count"] > 0 && ae[S] > 0 && ad > 0) {
                ae[S] += W
            }
            Y.push({height: ad, position: S, yRel: ae[S]});
            ae[S] += ad;
            ae[S + "Count"]++
        }
        n._createAnimationGroup("series");
        var v = (n.showLegend != false);
        var D = !v ? {width: 0, height: 0} : n._renderLegend(n.legendLayout ? n._rect : X, true);
        if (this.legendLayout && (!isNaN(this.legendLayout.left) || !isNaN(this.legendLayout.top))) {
            D = {width: 0, height: 0}
        }
        if (X.height < ae.top + ae.bottom + D.height || X.width < t.left + t.right) {
            K.endGroup();
            return
        }
        c.height -= ae.top + ae.bottom + D.height;
        c.x += t.left;
        c.width -= t.left + t.right;
        c.y += ae.top;
        var I = [];
        if (!J) {
            var ah = n._getXAxis().tickMarksColor || n._defaultLineColor;
            for (ab = 0; ab < u.length; ab++) {
                var af = u[ab];
                if (af.polar == true || af.spider == true || af.type == "pie" || af.type == "donut") {
                    continue
                }
                G = af.orientation == "horizontal";
                var ag = n._getXAxis(ab) == n._getXAxis() ? -1 : ab;
                var Q = n._getValueAxis(ab) == n._getValueAxis() ? -1 : ab;
                var k = {x: c.x, y: 0, width: c.width, height: Y[ab].height};
                if (Y[ab].position != "top") {
                    k.y = c.y + c.height + Y[ab].yRel
                } else {
                    k.y = c.y - Y[ab].yRel - Y[ab].height
                }
                if (G) {
                    if ((F.valueAxis[Q] & 4) == 4) {
                        continue
                    }
                    if (!n._isGroupVisible(ab)) {
                        continue
                    }
                    n._renderValueAxis(ab, k, false, c);
                    F.valueAxis[Q] |= 4
                } else {
                    I.push(k);
                    if ((F.xAxis[ag] & 4) == 4) {
                        continue
                    }
                    if (!n._isGroupVisible(ab)) {
                        continue
                    }
                    n._renderXAxis(ab, k, false, c);
                    F.xAxis[ag] |= 4
                }
            }
        }
        if (v) {
            var C = n.legendLayout ? n._rect : X;
            var R = X.x + a.jqx._ptrnd((X.width - D.width) / 2);
            var P = c.y + c.height + ae.bottom;
            var T = X.width;
            var ad = D.height;
            if (n.legendLayout) {
                if (!isNaN(n.legendLayout.left)) {
                    R = n.legendLayout.left
                }
                if (!isNaN(n.legendLayout.top)) {
                    P = n.legendLayout.top
                }
                if (!isNaN(n.legendLayout.width)) {
                    T = n.legendLayout.width
                }
                if (!isNaN(n.legendLayout.height)) {
                    ad = n.legendLayout.height
                }
            }
            if (R + T > C.x + C.width) {
                T = C.x + C.width - R
            }
            if (P + ad > C.y + C.height) {
                ad = C.y + C.height - P
            }
            n._renderLegend({x: R, y: P, width: T, height: ad})
        }
        n._hasHorizontalLines = false;
        if (!J) {
            for (ab = 0; ab < u.length; ab++) {
                var af = u[ab];
                if (af.polar == true || af.spider == true || af.type == "pie" || af.type == "donut") {
                    continue
                }
                G = u[ab].orientation == "horizontal";
                var k = {x: c.x - q[ab].xRel - q[ab].width, y: c.y, width: q[ab].width, height: c.height};
                if (q[ab].position != "left") {
                    k.x = c.x + c.width + q[ab].xRel
                }
                var ag = n._getXAxis(ab) == n._getXAxis() ? -1 : ab;
                var Q = n._getValueAxis(ab) == n._getValueAxis() ? -1 : ab;
                if (G) {
                    I.push(k);
                    if ((F.xAxis[ag] & 8) == 8) {
                        continue
                    }
                    if (!n._isGroupVisible(ab)) {
                        continue
                    }
                    n._renderXAxis(ab, k, false, c);
                    F.xAxis[ag] |= 8
                } else {
                    if ((F.valueAxis[Q] & 8) == 8) {
                        continue
                    }
                    if (!n._isGroupVisible(ab)) {
                        continue
                    }
                    n._renderValueAxis(ab, k, false, c);
                    F.valueAxis[Q] |= 8
                }
            }
        }
        if (c.width <= 0 || c.height <= 0) {
            return
        }
        n._plotRect = {x: c.x, y: c.y, width: c.width, height: c.height};
        for (ab = 0; ab < u.length; ab++) {
            this._drawPlotAreaLines(ab, true, {gridLines: false, tickMarks: false, alternatingBackground: true});
            this._drawPlotAreaLines(ab, false, {gridLines: false, tickMarks: false, alternatingBackground: true})
        }
        for (ab = 0; ab < u.length; ab++) {
            this._drawPlotAreaLines(ab, true, {gridLines: true, tickMarks: true, alternatingBackground: false});
            this._drawPlotAreaLines(ab, false, {gridLines: true, tickMarks: true, alternatingBackground: false})
        }
        var M = false;
        for (ab = 0; ab < u.length && !M; ab++) {
            var af = u[ab];
            if (af.annotations !== undefined || a.isFunction(af.draw) || a.isFunction(af.drawBefore)) {
                M = true;
                break
            }
        }
        var O = K.beginGroup();
        if (!M) {
            var L = K.createClipRect({x: c.x - 2, y: c.y, width: c.width + 4, height: c.height});
            K.setClip(O, L)
        }
        for (ab = 0; ab < u.length; ab++) {
            var af = u[ab];
            var d = false;
            for (var ai in n._seriesTypes) {
                if (n._seriesTypes[ai] == af.type) {
                    d = true;
                    break
                }
            }
            if (!d) {
                throw'Invalid serie type "' + af.type + '"'
            }
            if (a.isFunction(af.drawBefore)) {
                af.drawBefore(K, E, ab, this)
            }
            if (af.polar == true || af.spider == true) {
                if (af.type.indexOf("pie") == -1 && af.type.indexOf("donut") == -1) {
                    n._renderSpiderAxis(ab, c)
                }
            }
            n._renderAxisBands(ab, c, true);
            n._renderAxisBands(ab, c, false)
        }
        for (ab = 0; ab < u.length; ab++) {
            var af = u[ab];
            if (n._isColumnType(af.type)) {
                n._renderColumnSeries(ab, c)
            } else {
                if (af.type.indexOf("pie") != -1 || af.type.indexOf("donut") != -1) {
                    n._renderPieSeries(ab, c)
                } else {
                    if (af.type.indexOf("line") != -1 || af.type.indexOf("area") != -1) {
                        n._renderLineSeries(ab, c)
                    } else {
                        if (af.type.indexOf("scatter") != -1 || af.type.indexOf("bubble") != -1) {
                            n._renderScatterSeries(ab, c)
                        } else {
                            if (af.type.indexOf("candlestick") != -1 || af.type.indexOf("ohlc") != -1) {
                                n._renderCandleStickSeries(ab, c, af.type.indexOf("ohlc") != -1)
                            }
                        }
                    }
                }
            }
            if (af.annotations) {
                if (!this._moduleAnnotations) {
                    throw"Please include 'jqxchart.annotations.js'"
                }
                for (var Z = 0; Z < af.annotations.length; Z++) {
                    n._renderAnnotation(ab, af.annotations[Z], c)
                }
            }
            if (a.isFunction(af.draw)) {
                n.draw(K, E, ab, this)
            }
        }
        K.endGroup();
        if (n.enabled == false) {
            var ac = K.rect(E.x, E.y, E.width, E.height);
            K.attr(ac, {fill: "#777777", opacity: 0.5, stroke: "#00FFFFFF"})
        }
        if (a.isFunction(n.draw)) {
            n.draw(K, E)
        }
        K.endGroup();
        n._startAnimation("series");
        if (B && B.rangeSelector) {
            if (!this._moduleRangeSelector) {
                throw"Please include 'jqxchart.rangeselector.js'"
            }
            var e = [];
            if (!this._isSelectorRefresh) {
                n.removeHandler(a(document), n._getEvent("mousemove"), n._onSliderMouseMove);
                n.removeHandler(a(document), n._getEvent("mousedown"), n._onSliderMouseDown);
                n.removeHandler(a(document), n._getEvent("mouseup"), n._onSliderMouseUp)
            }
            for (ab = 0; ab < n.seriesGroups.length; ab++) {
                var A = this._getXAxis(ab);
                if (e.indexOf(A) == -1) {
                    if (this._renderXAxisRangeSelector(ab, I[ab])) {
                        e.push(A)
                    }
                }
            }
        }
    }, _isPieOnlySeries: function () {
        var d = this.seriesGroups;
        if (d.length == 0) {
            return false
        }
        for (var c = 0; c < d.length; c++) {
            if (d[c].type != "pie" && d[c].type != "donut") {
                return false
            }
        }
        return true
    }, _renderChartLegend: function (T, C, Q, v) {
        var l = this;
        var D = l.renderer;
        var I = {x: C.x + 3, y: C.y + 3, width: C.width - 6, height: C.height - 6};
        var E = {width: I.width, height: 0};
        var G = 0, F = 0;
        var q = 20;
        var m = 0;
        var h = 10;
        var O = 10;
        var w = 0;
        for (var N = 0; N < T.length; N++) {
            var J = T[N].css;
            if (!J) {
                J = l.toThemeProperty("jqx-chart-legend-text", null)
            }
            q = 20;
            var A = T[N].text;
            var k = D.measureText(A, 0, {"class": J});
            if (k.height > q) {
                q = k.height
            }
            if (k.width > w) {
                w = k.width
            }
            if (v) {
                if (N != 0) {
                    F += q
                }
                if (F > I.height) {
                    F = 0;
                    G += w + 2 * O + h;
                    w = k.width;
                    E.width = G + w
                }
            } else {
                if (G != 0) {
                    G += O
                }
                if (G + 2 * h + k.width > I.width && k.width < I.width) {
                    G = 0;
                    F += q;
                    q = 20;
                    m = I.width;
                    E.height = F + q
                }
            }
            var K = false;
            if (k.width > C.width) {
                K = true;
                var s = C.width;
                var R = A;
                var V = R.split(/\s+/).reverse();
                var n = [];
                var u = "";
                var p = [];
                while (undefined != (word = V.pop())) {
                    n.push(word);
                    u = n.join(" ");
                    var B = l.renderer.measureText(u, 0, {"class": J});
                    if (B.width > s && p.length > 0) {
                        n.pop();
                        n = [word];
                        u = n.join(" ")
                    }
                    p.push({text: u})
                }
                k.width = 0;
                var c = 0;
                for (var H = 0; H < p.length; H++) {
                    var U = p[H].text;
                    var B = l.renderer.measureText(U, 0, {"class": J});
                    k.width = Math.max(k.width, B.width);
                    c += k.height
                }
                k.height = c
            }
            var z = I.x + G + k.width < C.x + C.width && I.y + F + k.height < C.y + C.height;
            if (l.legendLayout) {
                var z = I.x + G + k.width < l._rect.x + l._rect.width && I.y + F + k.height < l._rect.y + l._rect.height
            }
            if (!Q && z) {
                var j = T[N].seriesIndex;
                var o = T[N].groupIndex;
                var d = T[N].itemIndex;
                var W = T[N].fillColor;
                var S = T[N].lineColor;
                var f = l._isSerieVisible(o, j, d);
                var P = D.beginGroup();
                var M = f ? T[N].opacity : 0.1;
                if (K) {
                    var R = A;
                    var s = C.width;
                    var V = R.split(/\s+/).reverse();
                    var n = [];
                    var u = "";
                    var e = 0;
                    var p = [];
                    while (undefined != (word = V.pop())) {
                        n.push(word);
                        u = n.join(" ");
                        var B = l.renderer.measureText(u, 0, {"class": J});
                        if (B.width > s && p.length > 0) {
                            n.pop();
                            e += B.height;
                            n = [word];
                            u = n.join(" ")
                        }
                        p.push({text: u, dy: e})
                    }
                    for (var H = 0; H < p.length; H++) {
                        var U = p[H].text;
                        e = p[H].dy;
                        var B = l.renderer.measureText(U, 0, {"class": J});
                        if (v) {
                            l.renderer.text(U, I.x + G + 1.5 * h, I.y + F + e, k.width, q, 0, {"class": J}, false, "left", "center")
                        } else {
                            l.renderer.text(U, I.x + G + 1.5 * h, I.y + F + e, k.width, q, 0, {"class": J}, false, "center", "center")
                        }
                    }
                    var L = D.rect(I.x + G, I.y + F + h / 2 + e / 2, h, h);
                    if (v) {
                        F += e
                    }
                    l.renderer.attr(L, {fill: W, "fill-opacity": M, stroke: S, "stroke-width": 1, "stroke-opacity": T[N].opacity})
                } else {
                    var L = D.rect(I.x + G, I.y + F + h / 2, h, h);
                    l.renderer.attr(L, {fill: W, "fill-opacity": M, stroke: S, "stroke-width": 1, "stroke-opacity": T[N].opacity});
                    if (v) {
                        l.renderer.text(A, I.x + G + 1.5 * h, I.y + F, k.width, k.height + h / 2, 0, {"class": J}, false, "left", "center")
                    } else {
                        l.renderer.text(A, I.x + G + 1.5 * h, I.y + F, k.width, q, 0, {"class": J}, false, "center", "center")
                    }
                }
                l.renderer.endGroup();
                l._setLegendToggleHandler(o, j, d, P)
            }
            if (v) {
            } else {
                G += k.width + 2 * h;
                if (m < G) {
                    m = G
                }
            }
        }
        if (Q) {
            E.height = a.jqx._ptrnd(F + q + 5);
            E.width = a.jqx._ptrnd(m);
            return E
        }
    }, isSerieVisible: function (e, c, d) {
        return this._isSerieVisible(e, c, d)
    }, _isSerieVisible: function (h, c, e) {
        while (this._itemsToggleState.length < h + 1) {
            this._itemsToggleState.push([])
        }
        var f = this._itemsToggleState[h];
        while (f.length < c + 1) {
            f.push(isNaN(e) ? true : [])
        }
        var d = f[c];
        if (isNaN(e)) {
            return d
        }
        if (!a.isArray(d)) {
            f[c] = d = []
        }
        while (d.length < e + 1) {
            d.push(true)
        }
        return d[e]
    }, isGroupVisible: function (c) {
        return this._isGroupVisible(c)
    }, _isGroupVisible: function (f) {
        var e = false;
        var d = this.seriesGroups[f].series;
        if (!d) {
            return e
        }
        for (var c = 0; c < d.length; c++) {
            if (this._isSerieVisible(f, c)) {
                e = true;
                break
            }
        }
        return e
    }, _toggleSerie: function (j, c, f, d) {
        var i = !this._isSerieVisible(j, c, f);
        if (d != undefined) {
            i = d
        }
        var k = this.seriesGroups[j];
        var h = k.series[c];
        this._raiseEvent("toggle", {state: i, seriesGroup: k, serie: h, elementIndex: f});
        if (isNaN(f)) {
            this._itemsToggleState[j][c] = i
        } else {
            var e = this._itemsToggleState[j][c];
            if (!a.isArray(e)) {
                e = []
            }
            while (e.length < f) {
                e.push(true)
            }
            e[f] = i
        }
        this._isToggleRefresh = true;
        this.update();
        this._isToggleRefresh = false
    }, showSerie: function (e, c, d) {
        this._toggleSerie(e, c, d, true)
    }, hideSerie: function (e, c, d) {
        this._toggleSerie(e, c, d, false)
    }, _setLegendToggleHandler: function (k, d, i, f) {
        var j = this.seriesGroups[k];
        var h = j.series[d];
        var c = h.enableSeriesToggle;
        if (c == undefined) {
            c = j.enableSeriesToggle != false
        }
        if (c) {
            var e = this;
            this.renderer.addHandler(f, "click", function (l) {
                e._toggleSerie(k, d, i)
            })
        }
    }, _renderLegend: function (d, f) {
        var p = this;
        var e = [];
        for (var z = 0; z < p.seriesGroups.length; z++) {
            var v = p.seriesGroups[z];
            if (v.showLegend == false) {
                continue
            }
            for (var t = 0; t < v.series.length; t++) {
                var n = v.series[t];
                if (n.showLegend == false) {
                    continue
                }
                var w = p._getSerieSettings(z, t);
                var q;
                if (v.type == "pie" || v.type == "donut") {
                    var l = p._getXAxis(z);
                    var j = n.legendFormatSettings || v.legendFormatSettings || l.formatSettings || n.formatSettings || v.formatSettings;
                    var o = n.legendFormatFunction || v.legendFormatFunction || l.formatFunction || n.formatFunction || v.formatFunction;
                    var k = p._getDataLen(z);
                    for (var u = 0; u < k; u++) {
                        q = p._getDataValue(u, n.displayText, z);
                        q = p._formatValue(q, j, o, z, t, u);
                        var m = p._getColors(z, t, u);
                        e.push({groupIndex: z, seriesIndex: t, itemIndex: u, text: q, css: n.displayTextClass, fillColor: m.fillColor, lineColor: m.lineColor, opacity: w.opacity})
                    }
                    continue
                }
                var j = n.legendFormatSettings || v.legendFormatSettings;
                var o = n.legendFormatFunction || v.legendFormatFunction;
                q = p._formatValue(n.displayText || n.dataField || "", j, o, z, t, NaN);
                var m = p._getSeriesColors(z, t);
                var h = this._get([n.legendFillColor, n.legendColor, m.fillColor]);
                var c = this._get([n.legendLineColor, n.legendColor, m.lineColor]);
                e.push({groupIndex: z, seriesIndex: t, text: q, css: n.displayTextClass, fillColor: h, lineColor: c, opacity: w.opacity})
            }
        }
        return p._renderChartLegend(e, d, f, (p.legendLayout && p.legendLayout.flow == "vertical"))
    }, _getInterval: function (e, d) {
        var c = this._get([e.unitInterval, d]);
        if (!isNaN(e.step)) {
            c = e.step * d
        }
        return c
    }, _renderXAxis: function (e, A, S, d) {
        var h = this;
        var s = h._getXAxis(e);
        var R = h.seriesGroups[e];
        var Y = R.orientation == "horizontal";
        var I = {width: 0, height: 0};
        var Q = h._getAxisSettings(s);
        if (!s || !Q.visible || R.type == "spider") {
            return I
        }
        if (!h._isGroupVisible(e) || this._isPieGroup(e)) {
            return I
        }
        var X = h._alignValuesWithTicks(e);
        while (h._renderData.length < e + 1) {
            h._renderData.push({})
        }
        if (h.rtl) {
            s.flip = true
        }
        var C = Y ? A.height : A.width;
        var z = s.text;
        var u = h._calculateXOffsets(e, C);
        var U = u.axisStats;
        var j = s.rangeSelector;
        var G = 0;
        if (j) {
            if (!this._moduleRangeSelector) {
                throw"Please include 'jqxchart.rangeselector.js'"
            }
            G = this._selectorGetSize(s)
        }
        var F = (Y && s.position == "right") || (!Y && s.position == "top");
        if (!S && j) {
            if (Y) {
                A.width -= G;
                if (s.position != "right") {
                    A.x += G
                }
            } else {
                A.height -= G;
                if (s.position == "top") {
                    A.y += G
                }
            }
        }
        var k = {rangeLength: u.rangeLength, itemWidth: u.itemWidth, intervalWidth: u.intervalWidth, data: u, settings: Q, isMirror: F, rect: A};
        h._renderData[e].xAxis = k;
        var H = U.interval;
        if (isNaN(H)) {
            return
        }
        if (Y) {
            Q.title.angle -= 90;
            Q.labels.angle -= 90
        }
        var m = this._getInterval(Q.gridLines, H);
        var L = this._getInterval(Q.tickMarks, H);
        var D = this._getInterval(Q.labels, H);
        var M;
        var W = U.min;
        var t = U.max;
        var O = u.padding;
        var T = s.flip == true || h.rtl;
        if (s.type == "date") {
            Q.gridLines.offsets = this._generateDTOffsets(W, t, C, O, m, H, U.dateTimeUnit, X, NaN, false, T);
            Q.tickMarks.offsets = this._generateDTOffsets(W, t, C, O, L, H, U.dateTimeUnit, X, NaN, false, T);
            M = this._generateDTOffsets(W, t, C, O, D, H, U.dateTimeUnit, X, NaN, true, T)
        } else {
            Q.gridLines.offsets = this._generateOffsets(W, t, C, O, m, H, X, NaN, false, T);
            Q.tickMarks.offsets = this._generateOffsets(W, t, C, O, L, H, X, NaN, false, T);
            M = this._generateOffsets(W, t, C, O, D, H, X, NaN, true, T)
        }
        var n = h.renderer.getRect();
        var l = n.width - A.x - A.width;
        var p = h._getDataLen(e);
        var o;
        if (h._elementRenderInfo && h._elementRenderInfo.length > e) {
            o = h._elementRenderInfo[e].xAxis
        }
        var q = [];
        var K;
        if (Q.labels.formatFunction) {
            K = Q.labels.formatFunction
        }
        var w;
        if (Q.labels.formatSettings) {
            w = a.extend({}, Q.labels.formatSettings)
        }
        if (s.type == "date") {
            if (s.dateFormat && !K) {
                if (w) {
                    w.dateFormat = w.dateFormat || s.dateFormat
                } else {
                    w = {dateFormat: s.dateFormat}
                }
            } else {
                if (!K && (!w || (w && !w.dateFormat))) {
                    K = this._getDefaultDTFormatFn(s.baseUnit || "day")
                }
            }
        }
        for (var P = 0; P < M.length; P++) {
            var N = M[P].value;
            var J = M[P].offset;
            var V = undefined;
            if (s.type != "date" && U.useIndeces && s.dataField) {
                V = Math.round(N);
                N = h._getDataValue(V, s.dataField);
                if (N == undefined) {
                    N = ""
                }
            }
            var z = h._formatValue(N, w, K, e, undefined, V);
            if (z == undefined || z.toString() == "") {
                if (isNaN(V)) {
                    V = P
                }
                if (V >= U.filterRange.min && V <= U.filterRange.max) {
                    z = U.useIndeces ? (U.min + V).toString() : (N == undefined ? "" : N.toString())
                }
            }
            var c = {key: N, text: z, targetX: J, x: J};
            if (o && o.itemOffsets[N]) {
                c.x = o.itemOffsets[N].x;
                c.y = o.itemOffsets[N].y
            }
            q.push(c)
        }
        var E = h._getAnimProps(e);
        var v = E.enabled && q.length < 500 ? E.duration : 0;
        if (h.enableAxisTextAnimation == false) {
            v = 0
        }
        var B = {items: q, renderData: k};
        var f = h._renderAxis(Y, F, Q, {x: A.x, y: A.y, width: A.width, height: A.height}, d, H, false, true, B, S, v);
        if (Y) {
            f.width += G
        } else {
            f.height += G
        }
        return f
    }, _animateAxisText: function (h, k) {
        var d = h.items;
        var e = h.textSettings;
        for (var f = 0; f < d.length; f++) {
            var j = d[f];
            if (!j) {
                continue
            }
            if (!j.visible) {
                continue
            }
            var c = j.targetX;
            var l = j.targetY;
            if (!isNaN(j.x) && !isNaN(j.y)) {
                c = j.x + (c - j.x) * k;
                l = j.y + (l - j.y) * k
            }
            if (j.element) {
                this.renderer.removeElement(j.element);
                j.element = undefined
            }
            j.element = this.renderer.text(j.text, c, l, j.width, j.height, e.angle, {"class": e.style}, false, e.halign, e.valign, e.textRotationPoint)
        }
    }, _getPolarAxisCoords: function (f, c) {
        var k = this.seriesGroups[f];
        var s = c.x + a.jqx.getNum([k.offsetX, c.width / 2]);
        var q = c.y + a.jqx.getNum([k.offsetY, c.height / 2]);
        var m = Math.min(c.width, c.height);
        var h = k.radius;
        if (this._isPercent(h)) {
            h = parseFloat(h) / 100 * m / 2
        }
        if (isNaN(h)) {
            h = m / 2 * 0.6
        }
        var j = this._alignValuesWithTicks(f);
        var p = this._get([k.startAngle, k.minAngle, 0]) - 90;
        if (isNaN(p)) {
            p = 0
        } else {
            p = 2 * Math.PI * p / 360
        }
        var o = this._get([k.endAngle, k.maxAngle, 360]) - 90;
        if (isNaN(o)) {
            o = 2 * Math.PI
        } else {
            o = 2 * Math.PI * o / 360
        }
        if (p > o) {
            var n = p;
            p = o;
            o = n
        }
        var w = a.jqx._rnd(Math.abs(p - o) / (Math.PI * 2), 0.001, true);
        var t = Math.PI * 2 * h * w;
        var i = this._calcGroupOffsets(f, c).xoffsets;
        if (!i) {
            return
        }
        var l = !(Math.abs(Math.abs(o - p) - Math.PI * 2) > 0.00001);
        if (k.spider) {
            axisStats = this._getXAxisStats(f, this._getXAxis(f), t);
            var u = axisStats.interval;
            if (isNaN(u) || u == 0) {
                u = 1
            }
            var e = (axisStats.max - axisStats.min) / u + (l ? 1 : 0);
            e = Math.round(e);
            if (e > 2) {
                var d = Math.cos(Math.abs(o - p) / 2 / e);
                d = a.jqx._rnd(d, 0.01);
                if (d == 0) {
                    d = 1
                }
                var v = h / d;
                if (v > h && j) {
                    h = v
                }
            }
        }
        h = a.jqx._ptrnd(h);
        return{x: s, y: q, r: h, adjR: this._get([v, h]), itemWidth: i.itemWidth, rangeLength: i.rangeLength, valuesOnTicks: j, startAngle: p, endAngle: o, isClosedCircle: l, axisSize: t}
    }, _toPolarCoord: function (l, h, j, f) {
        var d = Math.abs(l.startAngle - l.endAngle) / (Math.PI * 2);
        var c = (j - h.x) * 2 * Math.PI * d / Math.max(1, h.width) + l.startAngle;
        var e = ((h.height + h.y) - f) * l.r / Math.max(1, h.height);
        var k = l.x + e * Math.cos(c);
        var i = l.y + e * Math.sin(c);
        return{x: a.jqx._ptrnd(k), y: a.jqx._ptrnd(i)}
    }, _renderSpiderAxis: function (D, m) {
        var at = this;
        var k = at._getXAxis(D);
        var aE = this._getAxisSettings(k);
        if (!k || !aE.visible) {
            return
        }
        var aa = at.seriesGroups[D];
        var V = at._getPolarAxisCoords(D, m);
        if (!V) {
            return
        }
        var P = a.jqx._ptrnd(V.x);
        var O = a.jqx._ptrnd(V.y);
        var w = V.adjR;
        var ab = V.startAngle;
        var Z = V.endAngle;
        if (w < 1) {
            return
        }
        var az = a.jqx._rnd(Math.abs(ab - Z) / (Math.PI * 2), 0.001, true);
        var l = Math.PI * 2 * w * az;
        var d = V.isClosedCircle;
        var B = this._renderData[D].xoffsets;
        if (!B.rangeLength) {
            return
        }
        var W = B.axisStats.interval;
        if (isNaN(W) || W < 1) {
            W = 1
        }
        var aw = aa.orientation == "horizontal";
        var ad = (aw && k.position == "right") || (!aw && k.position == "top");
        while (at._renderData.length < D + 1) {
            at._renderData.push({})
        }
        var ax = {rangeLength: B.rangeLength, itemWidth: B.itemWidth, data: B, rect: m, settings: aE};
        at._renderData[D].xAxis = ax;
        at._renderData[D].polarCoords = V;
        var aC = true;
        for (var U = 0; U < D; U++) {
            var E = at._renderData[U].xAxis;
            var c = at._renderData[U].polarCoords;
            var H = at._getXAxis(U);
            var Y = false;
            for (var S in V) {
                if (V[S] != c[S]) {
                    Y = true;
                    break
                }
            }
            if (!Y || H != k) {
                aC = false
            }
        }
        var f = aE.gridLines;
        var X = aE.tickMarks;
        var C = aE.labels;
        var ag = this._getInterval(f, W);
        var aH = this._getInterval(X, W);
        var aq = this._getInterval(C, W);
        var K = at._alignValuesWithTicks(D);
        var ah = at.renderer;
        var al;
        var ai = B.axisStats;
        var aG = ai.min;
        var u = ai.max;
        var z = this._getPaddingSize(B.axisStats, k, K, l, true, d, false);
        var am = k.flip == true || at.rtl;
        if (k.type == "date") {
            f.offsets = this._generateDTOffsets(aG, u, l, z, ag, W, k.baseUnit, true, 0, false, am);
            X.offsets = this._generateDTOffsets(aG, u, l, z, aH, W, k.baseUnit, true, 0, false, am);
            al = this._generateDTOffsets(aG, u, l, z, aq, W, k.baseUnit, true, 0, true, am)
        } else {
            f.offsets = this._generateOffsets(aG, u, l, z, ag, W, true, 0, false, am);
            X.offsets = this._generateOffsets(aG, u, l, z, aH, W, true, 0, false, am);
            al = this._generateOffsets(aG, u, l, z, aq, W, true, 0, false, am)
        }
        var an = at.renderer.getRect();
        var aA = an.width - m.x - m.width;
        var ak = at._getDataLen(D);
        var v;
        if (at._elementRenderInfo && at._elementRenderInfo.length > D) {
            v = at._elementRenderInfo[D].xAxis
        }
        var av = [];
        var aj = this._getDataLen(D);
        for (var U = 0; U < al.length; U++) {
            var J = al[U].offset;
            var L = al[U].value;
            if (k.type != "date" && ai.useIndeces && k.dataField) {
                var aB = Math.round(L);
                if (aB >= aj) {
                    continue
                }
                L = at._getDataValue(aB, k.dataField);
                if (L == undefined) {
                    L = ""
                }
            }
            var au = at._formatValue(L, C.formatSettings, C.formatFunction, D, undefined, aB);
            if (au == undefined || au.toString() == "") {
                au = ai.useIndeces ? (ai.min + U).toString() : (L == undefined ? "" : L.toString())
            }
            var e = {key: L, text: au, targetX: J, x: J};
            if (v && v.itemOffsets[L]) {
                e.x = v.itemOffsets[L].x;
                e.y = v.itemOffsets[L].y
            }
            av.push(e)
        }
        var aD = {items: av, renderData: ax};
        var n = {stroke: f.color, fill: "none", "stroke-width": f.width, "stroke-dasharray": f.dashStyle || ""};
        if (!aa.spider) {
            if (az == 1) {
                ah.circle(P, O, w, n)
            } else {
                var I = -ab / Math.PI * 180;
                var aI = -Z / Math.PI * 180;
                this.renderer.pieslice(P, O, 0, w, Math.min(I, aI), Math.max(I, aI), undefined, n)
            }
        }
        var Q = av.length;
        var o = 2 * Math.PI / (Q);
        var ap = ab;
        var h, G;
        if (f.visible && aC) {
            if (!K && !d) {
                f.offsets.unshift({offset: -z.right})
            }
            for (var U = 0; U < f.offsets.length; U++) {
                var p = f.offsets[U].offset;
                if (!K) {
                    if (d) {
                        p += z.right / 2
                    } else {
                        p += z.right
                    }
                }
                var F = ap + p * 2 * Math.PI * az / Math.max(1, l);
                if (F - Z > 0.01) {
                    continue
                }
                var t = a.jqx._ptrnd(P + w * Math.cos(F));
                var s = a.jqx._ptrnd(O + w * Math.sin(F));
                ah.line(P, O, t, s, n)
            }
        }
        if (X.visible && aC) {
            var T = 5;
            var q = {stroke: X.color, fill: "none", "stroke-width": X.width, "stroke-dasharray": X.dashStyle || ""};
            if (!K && !d) {
                X.offsets.unshift({offset: -z.right})
            }
            for (var U = 0; U < X.offsets.length; U++) {
                var p = X.offsets[U].offset;
                if (!K) {
                    if (d) {
                        p += z.right / 2
                    } else {
                        p += z.right
                    }
                }
                var F = ap + p * 2 * Math.PI * az / Math.max(1, l);
                if (F - Z > 0.01) {
                    continue
                }
                var af = {x: P + w * Math.cos(F), y: O + w * Math.sin(F)};
                var ae = {x: P + (w + T) * Math.cos(F), y: O + (w + T) * Math.sin(F)};
                ah.line(a.jqx._ptrnd(af.x), a.jqx._ptrnd(af.y), a.jqx._ptrnd(ae.x), a.jqx._ptrnd(ae.y), q)
            }
        }
        var ar = [];
        if (aa.spider) {
            var A = [];
            if (k.type == "date") {
                A = this._generateDTOffsets(aG, u, l, z, W, W, k.baseUnit, true, 0, false, am)
            } else {
                A = this._generateOffsets(aG, u, l, z, W, W, true, 0, false, am)
            }
            if (!K && !d) {
                A.unshift({offset: -z.right})
            }
            for (var U = 0; U < A.length; U++) {
                var p = A[U].offset;
                if (!K) {
                    if (d) {
                        p += z.right / 2
                    } else {
                        p += z.right
                    }
                }
                var F = ap + p * 2 * Math.PI * az / Math.max(1, l);
                if (F - Z > 0.01) {
                    continue
                }
                ar.push(F)
            }
            ax.offsetAngles = ar
        }
        var ac = at._renderSpiderValueAxis(D, m, (K ? V.adjR : V.r), ar);
        if (!ac) {
            ac = []
        }
        if (aa.spider) {
            if (!K) {
                for (var U = 0; U < ac.length; U++) {
                    ac[U] = ac[U] * V.adjR / V.r
                }
            }
            ac.push(w);
            this._renderSpiderLines(P, O, ac, V, ar, n)
        }
        if (aC && C.visible) {
            ax.polarLabels = [];
            for (var U = 0; U < av.length; U++) {
                var p = av[U].x;
                var F = ap + p * 2 * Math.PI * az / Math.max(1, l);
                F = (360 - F / (2 * Math.PI) * 360) % 360;
                if (F < 0) {
                    F = 360 + F
                }
                var ao = ah.measureText(av[U].text, 0, {"class": aE.labels.style});
                var R = (K ? V.adjR : V.r) + (X.visible ? 7 : 2);
                var ay = aE.labels;
                var aF;
                if (ay.autoRotate) {
                    var N = a.jqx._ptRotate(P - ao.width / 2, O - R - ao.height, P, O, -F / 180 * Math.PI);
                    var M = a.jqx._ptRotate(P + ao.width / 2, O - R, P, O, -F / 180 * Math.PI);
                    ao.width = Math.abs(N.x - M.x);
                    ao.height = Math.abs(N.y - M.y);
                    aF = {x: Math.min(N.x, M.x), y: Math.min(N.y, M.y)}
                } else {
                    aF = this._adjustTextBoxPosition(P, O, ao, R, F, false, false, false)
                }
                ax.polarLabels.push({x: aF.x, y: aF.y, value: av[U].text});
                ah.text(av[U].text, aF.x, aF.y, ao.width, ao.height, ay.autoRotate ? 90 - F : ay.angle, {"class": ay.style}, false, ay.halign, ay.valign)
            }
        }
    }, _renderSpiderLines: function (l, h, z, o, f, c) {
        var s = this.renderer;
        var t = o.startAngle;
        var q = o.endAngle;
        var k = o.isClosedCircle;
        for (var u = 0; u < z.length; u++) {
            var e = z[u];
            var d = undefined, p = undefined;
            for (var v = 0; v < f.length; v++) {
                var w = f[v];
                var n = a.jqx._ptrnd(l + e * Math.cos(w));
                var m = a.jqx._ptrnd(h + e * Math.sin(w));
                if (d) {
                    s.line(d.x, d.y, n, m, c)
                }
                d = {x: n, y: m};
                if (!p) {
                    p = {x: n, y: m}
                }
            }
            if (p && k) {
                s.line(d.x, d.y, p.x, p.y, c)
            }
        }
    }, _renderSpiderValueAxis: function (e, F, S, R) {
        var k = this;
        var w = this.seriesGroups[e];
        var G = this._getPolarAxisCoords(e, F);
        if (!G) {
            return
        }
        var O = a.jqx._ptrnd(G.x);
        var M = a.jqx._ptrnd(G.y);
        S = S || G.r;
        var h = G.startAngle;
        var Y = G.endAngle;
        var W = a.jqx._rnd(Math.abs(h - Y) / (Math.PI * 2), 0.001, true);
        if (S < 1) {
            return
        }
        S = a.jqx._ptrnd(S);
        var f = this._getValueAxis(e);
        settings = this._getAxisSettings(f);
        if (!f || false == settings.visible) {
            return
        }
        var K = this._stats.seriesGroups[e].mu;
        var C = settings.labels;
        var B = C.formatSettings;
        var c = w.type.indexOf("stacked") != -1 && w.type.indexOf("100") != -1;
        if (c && !B) {
            B = {sufix: "%"}
        }
        var z = this._get([C.step, C.unitInterval / K]);
        if (isNaN(z)) {
            z = 1
        }
        z = Math.max(1, Math.round(z));
        this._calcValueAxisItems(e, S, z);
        var d = settings.gridLines;
        var D = settings.tickMarks;
        var t = this._getInterval(d, K);
        var P = this._getInterval(D, K);
        var m = settings.labels;
        var l = {stroke: d.color, fill: "none", "stroke-width": 1, "stroke-dasharray": d.dashStyle || ""};
        var p = this._renderData[e].valueAxis;
        var A = p.items;
        if (A.length && settings.line.visible) {
            var o = O + Math.cos(h) * S;
            var Z = M + Math.sin(h) * S;
            if (R.indexOf(h) == -1) {
                var U = a.extend({}, l);
                U["stroke-width"] = settings.line.lineWidth;
                U.stroke = settings.line.color;
                U["stroke-dasharray"] = settings.line.dashStyle;
                this.renderer.line(O, M, o, Z, U)
            }
        }
        A = A.reverse();
        var J = this.renderer;
        p.polarLabels = [];
        for (var X = 0; X < A.length - 1; X++) {
            var Q = A[X];
            if (isNaN(Q)) {
                continue
            }
            var E = (m.formatFunction) ? m.formatFunction(Q) : this._formatNumber(Q, B);
            var j = J.measureText(E, 0, {"class": m.style});
            var N = O + (f.showTickMarks != false ? 3 : 2);
            var L = M - p.itemWidth * X - j.height / 2;
            var v = h;
            var I = a.jqx._ptRotate(N, L, O, M, v);
            var H = a.jqx._ptRotate(N + j.width, L + j.height, O, M, v);
            N = Math.min(I.x, H.x);
            L = Math.min(I.y, H.y);
            j.width = Math.abs(I.x - H.x);
            j.height = Math.abs(I.y - H.y);
            p.polarLabels.push({x: N, y: L, value: E});
            J.text(E, N, L, j.width, j.height, m.autoRotate ? (90 + h * 180 / Math.PI) : m.angle, {"class": m.style}, false, m.halign, m.valign)
        }
        var s = f.logarithmicScale == true;
        var u = s ? A.length : p.rangeLength;
        aIncrement = 2 * Math.PI / u;
        var T = [];
        if (d.visible || w.spider) {
            var l = {stroke: d.color, fill: "none", "stroke-width": 1, "stroke-dasharray": d.dashStyle || ""};
            for (var X = 0; X < u; X += t) {
                var L = a.jqx._ptrnd(S * X / u);
                if (w.spider) {
                    T.push(L);
                    continue
                }
                if (W != 1) {
                    var n = -h / Math.PI * 180;
                    var V = -Y / Math.PI * 180;
                    this.renderer.pieslice(O, M, 0, L, Math.min(n, V), Math.max(n, V), undefined, l)
                } else {
                    J.circle(O, M, L, l)
                }
            }
        }
        if (D.visible) {
            tickMarkSize = 5;
            var l = {stroke: D.color, fill: "none", "stroke-width": 1, "stroke-dasharray": D.dashStyle || ""};
            var q = O - Math.round(tickMarkSize / 2);
            var o = q + tickMarkSize;
            for (var X = 0; X < u; X += P) {
                if (d.visible && (X % t) == 0) {
                    continue
                }
                var L = a.jqx._ptrnd(M - S * X / u);
                J.line(a.jqx._ptrnd(q), L, a.jqx._ptrnd(o), L, l)
            }
        }
        return T
    }, _renderAxis: function (K, G, T, C, d, I, o, Y, F, X, e) {
        if (T.customDraw && !X) {
            return{width: NaN, height: NaN}
        }
        var z = T.title, p = T.labels, f = T.gridLines, D = T.tickMarks, S = T.padding;
        var q = D.visible ? D.size : 0;
        var U = 2;
        var J = {width: 0, height: 0};
        var t = {width: 0, height: 0};
        if (K) {
            J.height = t.height = C.height
        } else {
            J.width = t.width = C.width
        }
        if (!X && G) {
            if (K) {
                C.x -= C.width
            }
        }
        var n = F.renderData;
        var c = n.itemWidth;
        if (z.visible && z.text != undefined && z != "") {
            var s = z.angle;
            var j = this.renderer.measureText(z.text, s, {"class": z.style});
            t.width = j.width;
            t.height = j.height;
            if (!X) {
                this.renderer.text(z.text, C.x + z.offset.x + (K ? (!G ? U + S.left : -S.right - U + 2 * C.width - t.width) : 0), C.y + z.offset.y + (!K ? (!G ? C.height - U - t.height - S.bottom : S.top + U) : 0), K ? t.width : C.width, !K ? t.height : C.height, s, {"class": z.style}, true, z.halign, z.valign, z.rotationPoint)
            }
        }
        var O = 0;
        var A = Y ? -c / 2 : 0;
        if (Y && !K) {
            p.halign = "center"
        }
        var Q = C.x;
        var P = C.y;
        var H = p.textOffset;
        if (H) {
            if (!isNaN(H.x)) {
                Q += H.x
            }
            if (!isNaN(H.y)) {
                P += H.y
            }
        }
        if (!K) {
            Q += A;
            if (G) {
                P += t.height > 0 ? t.height + 3 * U : 2 * U;
                P += q - (Y ? q : q / 4)
            } else {
                P += Y ? q : q / 4
            }
            P += S.top
        } else {
            Q += S.left + U + (t.width > 0 ? t.width + U : 0) + (G ? C.width - t.width : 0);
            P += A
        }
        var W = 0;
        var N = 0;
        var u = F.items;
        n.itemOffsets = {};
        if (this._isToggleRefresh || !this._isUpdate) {
            e = 0
        }
        var m = false;
        var l = 0;
        for (var V = 0; V < u.length && p.visible; V++, O += c) {
            if (!u[V]) {
                continue
            }
            var B = u[V].text;
            if (!isNaN(u[V].targetX)) {
                O = u[V].targetX
            }
            var j = this.renderer.measureText(B, p.angle, {"class": p.style});
            if (j.width > N) {
                N = j.width
            }
            if (j.height > W) {
                W = j.height
            }
            l += K ? W : N;
            if (!X) {
                if ((K && O > C.height + 2) || (!K && O > C.width + 2)) {
                    break
                }
                var M = K ? Q + (G ? (t.width == 0 ? q : q - U) : 0) : Q + O;
                var L = K ? P + O : P;
                n.itemOffsets[u[V].key] = {x: M, y: L};
                if (!m) {
                    if (!isNaN(u[V].x) || !isNaN(u[V].y) && e) {
                        m = true
                    }
                }
                u[V].targetX = M;
                u[V].targetY = L;
                u[V].width = !K ? c : C.width - S.left - S.right - 2 * U - q - ((t.width > 0) ? t.width + U : 0);
                u[V].height = K ? c : C.height - S.top - S.bottom - 2 * U - q - ((t.height > 0) ? t.height + U : 0);
                u[V].visible = true
            }
        }
        n.avgWidth = u.length == 0 ? 0 : l / u.length;
        if (!X) {
            var v = {items: u, textSettings: p};
            if (isNaN(e) || !m) {
                e = 0
            }
            this._animateAxisText(v, e == 0 ? 1 : 0);
            if (e != 0) {
                var k = this;
                this._enqueueAnimation("series", undefined, undefined, e, function (i, h, w) {
                    k._animateAxisText(h, w)
                }, v)
            }
        }
        J.width += 2 * U + q + t.width + N + (K && t.width > 0 ? U : 0);
        J.height += 2 * U + q + t.height + W + (!K && t.height > 0 ? U : 0);
        if (!K) {
            J.height += S.top + S.bottom
        } else {
            J.width += S.left + S.right
        }
        var E = {};
        if (!X && T.line.visible) {
            var R = {stroke: T.line.color, "stroke-width": T.line.width, "stroke-dasharray": T.line.dashStyle || ""};
            if (K) {
                var M = C.x + C.width + (G ? S.left : -S.right);
                M = a.jqx._ptrnd(M);
                this.renderer.line(M, C.y, M, C.y + C.height, R)
            } else {
                var L = a.jqx._ptrnd(C.y + (G ? C.height - S.bottom : S.top));
                this.renderer.line(a.jqx._ptrnd(C.x), L, a.jqx._ptrnd(C.x + C.width + 1), L, R)
            }
        }
        J.width = a.jqx._rup(J.width);
        J.height = a.jqx._rup(J.height);
        return J
    }, _drawPlotAreaLines: function (k, A, h) {
        var E = this.seriesGroups[k];
        var d = E.orientation != "horizontal";
        if (!this._renderData || this._renderData.length <= k) {
            return
        }
        var J = A ? "valueAxis" : "xAxis";
        var w = this._renderData[k][J];
        if (!w) {
            return
        }
        var n = this._renderData.axisDrawState;
        if (!n) {
            n = this._renderData.axisDrawState = {}
        }
        var B = "", j;
        if (A) {
            B = "valueAxis_" + ((E.valueAxis) ? k : "") + (d ? "swap" : "");
            j = this._getValueAxis(k)
        } else {
            B = "xAxis_" + ((E.xAxis || E.categoryAxis) ? k : "") + (d ? "swap" : "");
            j = this._getXAxis(k)
        }
        if (n[B]) {
            n = n[B]
        } else {
            n = n[B] = {}
        }
        if (!A) {
            d = !d
        }
        var H = w.settings;
        if (!H) {
            return
        }
        if (H.customDraw) {
            return
        }
        var G = H.gridLines, q = H.tickMarks, v = H.padding;
        var f = w.rect;
        var l = this._plotRect;
        if (!G || !q) {
            return
        }
        var p = 0.5;
        var e = [];
        var c = {stroke: G.color, "stroke-width": G.width, "stroke-dasharray": G.dashStyle || ""};
        var D = A ? f.y + f.height : f.x;
        var o = G.offsets;
        if (A && !j.flip) {
            o = a.extend([], o);
            o = o.reverse()
        }
        if (o && o.length > 0) {
            for (var C = 0; C < o.length; C++) {
                if (d) {
                    F = a.jqx._ptrnd(f.y + o[C].offset);
                    if (F < f.y - p) {
                        break
                    }
                } else {
                    F = a.jqx._ptrnd(f.x + o[C].offset);
                    if (F > f.x + f.width + p) {
                        break
                    }
                }
                if (h.gridLines && G.visible != false && n.gridLines != true) {
                    if (d) {
                        this.renderer.line(a.jqx._ptrnd(l.x), F, a.jqx._ptrnd(l.x + l.width), F, c)
                    } else {
                        this.renderer.line(F, a.jqx._ptrnd(l.y), F, a.jqx._ptrnd(l.y + l.height), c)
                    }
                }
                e[F] = true;
                if (h.alternatingBackground && (G.alternatingBackgroundColor || G.alternatingBackgroundColor2) && n.alternatingBackground != true) {
                    var m = ((C % 2) == 0) ? G.alternatingBackgroundColor2 : G.alternatingBackgroundColor;
                    if (m) {
                        var I;
                        if (d) {
                            I = this.renderer.rect(a.jqx._ptrnd(l.x), D, a.jqx._ptrnd(l.width - 1), F - D, c)
                        } else {
                            I = this.renderer.rect(D, a.jqx._ptrnd(l.y), F - D, a.jqx._ptrnd(l.height), c)
                        }
                        this.renderer.attr(I, {"stroke-width": 0, fill: m, opacity: G.alternatingBackgroundOpacity || 1})
                    }
                    D = F
                }
            }
        }
        var c = {stroke: q.color, "stroke-width": q.width, "stroke-dasharray": q.dashStyle || ""};
        if (h.tickMarks && q.visible && n.tickMarks != true) {
            var u = q.size;
            var o = q.offsets;
            for (var C = 0; C < o.length; C++) {
                var F = a.jqx._ptrnd((d ? f.y + o[C].offset : f.x + o[C].offset));
                if (e[F - 1]) {
                    F--
                } else {
                    if (e[F + 1]) {
                        F++
                    }
                }
                if (d) {
                    if (F > f.y + f.height + p) {
                        break
                    }
                } else {
                    if (F > f.x + f.width + p) {
                        break
                    }
                }
                var z = !w.isMirror ? -u : u;
                if (d) {
                    var t = f.x + f.width + (j.position == "right" ? v.left : -v.right);
                    if (!A) {
                        t = f.x + (w.isMirror ? v.left : -v.right + f.width)
                    }
                    this.renderer.line(t, F, t + z, F, c)
                } else {
                    var s = f.y + (w.isMirror ? f.height : 0);
                    s += w.isMirror ? -v.bottom : v.top;
                    s = a.jqx._ptrnd(s);
                    this.renderer.line(F, s, F, s - z, c)
                }
            }
        }
        n.tickMarks = n.tickMarks || h.tickMarks;
        n.gridLines = n.gridLines || h.gridLines;
        n.alternatingBackground = n.alternatingBackground || h.alternatingBackground
    }, _calcValueAxisItems: function (k, e, m) {
        var o = this._stats.seriesGroups[k];
        if (!o || !o.isValid) {
            return false
        }
        var A = this.seriesGroups[k];
        var c = A.orientation == "horizontal";
        var h = this._getValueAxis(k);
        var n = h.valuesOnTicks != false;
        var f = h.dataField;
        var p = o.intervals;
        var u = e / p;
        var w = o.min;
        var t = o.mu;
        var d = h.logarithmicScale == true;
        var l = h.logarithmicScaleBase || 10;
        var j = A.type.indexOf("stacked") != -1 && A.type.indexOf("100") != -1;
        if (d) {
            t = !isNaN(h.unitInterval) ? h.unitInterval : 1
        }
        if (!n) {
            p = Math.max(p - 1, 1)
        }
        while (this._renderData.length < k + 1) {
            this._renderData.push({})
        }
        this._renderData[k].valueAxis = {};
        var s = this._renderData[k].valueAxis;
        s.itemWidth = s.intervalWidth = u;
        s.items = [];
        var q = s.items;
        for (var z = 0; z <= p; z++) {
            var v = 0;
            if (d) {
                if (j) {
                    v = o.max / Math.pow(l, p - z)
                } else {
                    v = w * Math.pow(l, z)
                }
            } else {
                v = n ? w + z * t : w + (z + 0.5) * t
            }
            if (z % m != 0) {
                q.push(NaN);
                continue
            }
            q.push(v)
        }
        s.rangeLength = d && !j ? o.intervals : (o.intervals) * t;
        if (h.flip != true) {
            q = q.reverse()
        }
        return true
    }, _renderValueAxis: function (h, B, P, f) {
        var O = this.seriesGroups[h];
        var T = O.orientation == "horizontal";
        var t = this._getValueAxis(h);
        if (!t) {
            throw"SeriesGroup " + h + " is missing valueAxis definition"
        }
        var I = {width: 0, height: 0};
        if (!this._isGroupVisible(h) || this._isPieOnlySeries() || O.type == "spider") {
            return I
        }
        var S = t.valuesOnTicks != false;
        var J = this._stats.seriesGroups[h];
        var k = J.mu;
        var H = t.logarithmicScale == true;
        var E = t.logarithmicScaleBase || 10;
        if (H) {
            k = !isNaN(t.unitInterval) ? t.unitInterval : 1
        }
        if (k == 0) {
            k = 1
        }
        var M = this._getAxisSettings(t);
        var s = M.title, w = M.labels;
        var p = this._get([w.step, w.unitInterval / k]);
        if (isNaN(p)) {
            p = 1
        }
        p = Math.max(1, Math.round(p));
        if (!this._calcValueAxisItems(h, (T ? B.width : B.height), p) || !M.visible) {
            return I
        }
        if (!T) {
            s.angle = (!this.rtl ? -90 : 90);
            if (s.rotationPoint == "centercenter") {
                if (s.valign == "top") {
                    s.rotationPoint = "rightcenter"
                } else {
                    if (s.valign == "bottom") {
                        s.rotationPoint = "leftcenter"
                    }
                }
            }
        }
        var j = w.formatSettings;
        var d = O.type.indexOf("stacked") != -1 && O.type.indexOf("100") != -1;
        if (d && !j) {
            j = {sufix: "%"}
        }
        var q = [];
        var l = this._renderData[h].valueAxis;
        var n;
        if (this._elementRenderInfo && this._elementRenderInfo.length > h) {
            n = this._elementRenderInfo[h].valueAxis
        }
        for (var N = 0; N < l.items.length; N++) {
            var L = l.items[N];
            if (isNaN(L)) {
                q.push(undefined);
                continue
            }
            var A = (w.formatFunction) ? w.formatFunction(L) : this._formatNumber(L, j);
            var c = {key: L, text: A};
            if (n && n.itemOffsets[L]) {
                c.x = n.itemOffsets[L].x;
                c.y = n.itemOffsets[L].y
            }
            q.push(c)
        }
        if (H && k != 1) {
            var o = [];
            for (var N = 0; N < q.length; N++) {
                if (N % k == 0) {
                    o.push(q[q.length - N - 1])
                } else {
                    o.push(undefined)
                }
            }
            q = o.reverse()
        }
        var e = M.gridLines;
        var m = H ? k : this._getInterval(e, k);
        var D = T ? B.width : B.height;
        var R = J.logarithmic ? J.minPow : J.min;
        var u = J.logarithmic ? J.maxPow : J.max;
        var Q = (t.flip == true);
        if (e.visible || t.alternatingBackgroundColor || t.alternatingBackgroundColor2) {
            e.offsets = this._generateOffsets(R, u, D, {left: 0, right: 0}, m, k, true, 0, false, !Q);
            if (H && !isNaN(e.step)) {
                var o = [];
                for (var N = 0; N < e.offsets.length; N += e.step) {
                    o.push(e.offsets[N])
                }
                e.offsets = o
            }
        }
        var z = M.tickMarks;
        var K = H ? k : this._getInterval(z, k);
        if (z.visible) {
            z.offsets = this._generateOffsets(R, u, D, {left: 0, right: 0}, K, k, true, 0, false, !Q);
            if (H && !isNaN(z.step)) {
                var o = [];
                for (var N = 0; N < z.offsets.length; N += z.step) {
                    o.push(z.offsets[N])
                }
                z.offsets = o
            }
        }
        var G = (T && t.position == "top") || (!T && t.position == "right") || (!T && this.rtl && t.position != "left");
        var C = {items: q, renderData: l};
        var F = this._getAnimProps(h);
        var v = F.enabled && q.length < 500 ? F.duration : 0;
        if (this.enableAxisTextAnimation == false) {
            v = 0
        }
        l.settings = M;
        l.isMirror = G;
        l.rect = B;
        return this._renderAxis(!T, G, M, B, f, k, H, S, C, P, v)
    }, _generateOffsets: function (p, t, w, n, z, e, c, u, v, j) {
        var h = [];
        var o = 1;
        if (e < 1) {
            o = 1000000;
            p *= o;
            t *= o;
            e *= o
        }
        var k = t - p;
        var m = w - n.left - n.right;
        if (k == 0) {
            if (v || c) {
                h.push({offset: n.left + m / 2, value: p / o})
            } else {
                h.push({offset: 0, value: p / o})
            }
            return h
        }
        var A = m / k;
        var d = A * e;
        var f = n.left;
        if (!c) {
            if (!v) {
                t += e
            }
        }
        for (var s = p; s <= t; s += e, f += d) {
            h.push({offset: f, value: s / o})
        }
        if (!c && h.length > 1) {
            if (isNaN(u)) {
                u = v ? 0 : d / 2
            }
            for (var s = 0; s < h.length; s++) {
                h[s].offset -= u;
                if (h[s].offset <= 2) {
                    h[s].offset = 0
                }
                if (h[s].offset >= w - 2) {
                    h[s].offset = w
                }
            }
        }
        if (z > e) {
            var q = [];
            var l = Math.round(z / e);
            for (var s = 0; s < h.length; s++) {
                if ((s % l) == 0) {
                    q.push({offset: h[s].offset, value: h[s].value})
                }
            }
            h = q
        }
        if (j) {
            for (var s = 0; s < h.length; s++) {
                h[s].offset = w - h[s].offset
            }
        }
        return h
    }, _generateDTOffsets: function (s, v, C, p, D, d, q, c, z, A, j) {
        if (!q) {
            q = "day"
        }
        var h = [];
        if (s > v) {
            return h
        }
        if (s == v) {
            if (A) {
                h.push({offset: c ? C / 2 : p.left, value: s})
            } else {
                if (c) {
                    h.push({offset: C / 2, value: s})
                }
            }
            return h
        }
        var l = C - p.left - p.right;
        var B = s;
        var m = p.left;
        var f = m;
        d = Math.max(d, 1);
        var o = d;
        var e = Math.min(1, d);
        if (d > 1 && q != "millisecond") {
            d = 1
        }
        while (a.jqx._ptrnd(f) <= a.jqx._ptrnd(p.left + l + (c ? 0 : p.right))) {
            h.push({offset: f, value: B});
            var E = new Date(B.valueOf());
            if (q == "millisecond") {
                E.setMilliseconds(B.getMilliseconds() + d)
            } else {
                if (q == "second") {
                    E.setSeconds(B.getSeconds() + d)
                } else {
                    if (q == "minute") {
                        E.setMinutes(B.getMinutes() + d)
                    } else {
                        if (q == "hour") {
                            var n = E.valueOf();
                            E.setHours(B.getHours() + d);
                            if (n == E.valueOf()) {
                                E.setHours(B.getHours() + d + 1)
                            }
                        } else {
                            if (q == "day") {
                                E.setDate(B.getDate() + d)
                            } else {
                                if (q == "month") {
                                    E.setMonth(B.getMonth() + d)
                                } else {
                                    if (q == "year") {
                                        E.setFullYear(B.getFullYear() + d)
                                    }
                                }
                            }
                        }
                    }
                }
            }
            B = E;
            f = m + (B.valueOf() - s.valueOf()) * e / (v.valueOf() - s.valueOf()) * l
        }
        if (j) {
            for (var u = 0; u < h.length; u++) {
                h[u].offset = C - h[u].offset
            }
        }
        if (o > 1 && q != "millisecond") {
            var t = [];
            for (var u = 0; u < h.length; u += o) {
                t.push({offset: h[u].offset, value: h[u].value})
            }
            h = t
        }
        if (!c && !A && h.length > 1) {
            var t = [];
            t.push({offset: 0, value: undefined});
            for (var u = 1; u < h.length; u++) {
                t.push({offset: h[u - 1].offset + (h[u].offset - h[u - 1].offset) / 2, value: undefined})
            }
            var w = t.length;
            if (w > 1) {
                t.push({offset: t[w - 1].offset + (t[w - 1].offset - t[w - 2].offset)})
            } else {
                t.push({offset: C, value: undefined})
            }
            h = t
        }
        if (D > d) {
            var t = [];
            var k = Math.round(D / o);
            for (var u = 0; u < h.length; u++) {
                if ((u % k) == 0) {
                    t.push({offset: h[u].offset, value: h[u].value})
                }
            }
            h = t
        }
        return h
    }, _hasStackValueReversal: function (f, v) {
        var k = this.seriesGroups[f];
        var l = -1 != k.type.indexOf("stacked");
        if (!l) {
            return false
        }
        var c = -1 != k.type.indexOf("waterfall");
        var t = this._getDataLen(f);
        var w = 0;
        var n = false;
        var z = [];
        for (var q = 0; q < k.series.length; q++) {
            z[q] = this._isSerieVisible(f, q)
        }
        for (var s = 0; s < t; s++) {
            var o = (c && s != 0) ? w : v;
            var e = 0, u = 0;
            var d = undefined;
            if (!c) {
                n = false
            }
            for (var p = 0; p < k.series.length; p++) {
                if (!z[p]) {
                    continue
                }
                val = this._getDataValueAsNumber(s, k.series[p].dataField, f);
                if (isNaN(val)) {
                    continue
                }
                if (k.series[p].summary) {
                    var h = this._getDataValue(s, k.series[p].summary, f);
                    if (undefined !== h) {
                        continue
                    }
                }
                var m = !n ? val < v : val < 0;
                n = true;
                if (d == undefined) {
                    d = m
                }
                if (m != d) {
                    return true
                }
                d = m;
                w += val
            }
        }
        return false
    }, _getValueAxis: function (c) {
        var d = c == undefined ? this.valueAxis : this.seriesGroups[c].valueAxis || this.valueAxis;
        if (!d) {
            d = this.valueAxis = {}
        }
        return d
    }, _buildStats: function (M) {
        var Z = {seriesGroups: []};
        this._stats = Z;
        for (var v = 0; v < this.seriesGroups.length; v++) {
            var F = this.seriesGroups[v];
            Z.seriesGroups[v] = {};
            var I = this._getXAxis(v);
            var q = this._getValueAxis(v);
            var t = this._getXAxisStats(v, I, (F.orientation == "vertical") ? M.width : M.height);
            var C = Z.seriesGroups[v];
            C.isValid = true;
            var N = (F.orientation == "horizontal") ? M.width : M.height;
            var P = q.logarithmicScale == true;
            var O = q.logarithmicScaleBase;
            if (isNaN(O)) {
                O = 10
            }
            var J = -1 != F.type.indexOf("stacked");
            var f = J && -1 != F.type.indexOf("100");
            var L = -1 != F.type.indexOf("range");
            var V = F.type.indexOf("waterfall") != -1;
            if (V && !this._moduleWaterfall) {
                throw"Please include 'jqxchart.waterfall.js'"
            }
            if (f) {
                C.psums = [];
                C.nsums = []
            }
            var w = NaN, R = NaN;
            var e = NaN, h = NaN;
            var u = q ? q.baselineValue : NaN;
            if (isNaN(u)) {
                u = P && !f ? 1 : 0
            }
            var k = false;
            if (u != 0 && J) {
                k = this._hasStackValueReversal(v, u);
                if (k) {
                    u = 0
                }
            }
            if (J && V) {
                k = this._hasStackValueReversal(v, u)
            }
            var E = this._getDataLen(v);
            var d = 0;
            var aa = NaN;
            var o = [];
            if (V) {
                for (var m = 0; m < F.series.length; m++) {
                    o.push(NaN)
                }
            }
            var A = NaN;
            for (var Y = 0; Y < E && C.isValid; Y++) {
                if (I.rangeSelector) {
                    var l = I.dataField ? this._getDataValue(Y, I.dataField, v) : Y;
                    if (l && t.isDateTime) {
                        l = this._castAsDate(l, I.dateFormat)
                    }
                    if (l && (l.valueOf() < t.min.valueOf() || l.valueOf() > t.max.valueOf())) {
                        continue
                    }
                }
                var ab = q.minValue;
                var H = q.maxValue;
                if (q.baselineValue) {
                    if (isNaN(ab)) {
                        ab = u
                    } else {
                        ab = Math.min(u, ab)
                    }
                    if (isNaN(H)) {
                        H = u
                    } else {
                        H = Math.max(u, H)
                    }
                }
                var z = 0, B = 0;
                for (var m = 0; m < F.series.length; m++) {
                    if (!this._isSerieVisible(v, m)) {
                        continue
                    }
                    var K = NaN, U = NaN, D = NaN;
                    if (F.type.indexOf("candle") != -1 || F.type.indexOf("ohlc") != -1) {
                        var c = ["Open", "Low", "Close", "High"];
                        for (var W in c) {
                            var n = this._getDataValueAsNumber(Y, F.series[m]["dataField" + c[W]], v);
                            if (isNaN(n)) {
                                continue
                            }
                            D = isNaN(U) ? n : Math.min(D, n);
                            U = isNaN(U) ? n : Math.max(U, n)
                        }
                    } else {
                        if (L) {
                            var ac = this._getDataValueAsNumber(Y, F.series[m].dataFieldFrom, v);
                            var G = this._getDataValueAsNumber(Y, F.series[m].dataFieldTo, v);
                            U = Math.max(ac, G);
                            D = Math.min(ac, G)
                        } else {
                            K = this._getDataValueAsNumber(Y, F.series[m].dataField, v);
                            if (V) {
                                if (this._isSummary(v, Y)) {
                                    var X = this._getDataValue(Y, F.series[m].summary, v);
                                    if (X !== undefined) {
                                        continue
                                    }
                                }
                                if (!J) {
                                    if (isNaN(o[m])) {
                                        o[m] = K
                                    } else {
                                        K += o[m]
                                    }
                                    o[m] = K
                                } else {
                                    if (!isNaN(A)) {
                                        K += A
                                    }
                                    A = K
                                }
                            }
                            if (isNaN(K) || (P && K <= 0)) {
                                continue
                            }
                            D = U = K
                        }
                    }
                    if ((isNaN(H) || U > H) && ((isNaN(q.maxValue)) ? true : U <= q.maxValue)) {
                        H = U
                    }
                    if ((isNaN(ab) || D < ab) && ((isNaN(q.minValue)) ? true : D >= q.minValue)) {
                        ab = D
                    }
                    if (!isNaN(K) && J && !V) {
                        if (K > u) {
                            z += K
                        } else {
                            if (K < u) {
                                B += K
                            }
                        }
                    }
                }
                if (!f) {
                    if (!isNaN(q.maxValue)) {
                        z = Math.min(q.maxValue, z)
                    }
                    if (!isNaN(q.minValue)) {
                        B = Math.max(q.minValue, B)
                    }
                }
                if (P && f) {
                    for (var m = 0; m < F.series.length; m++) {
                        if (!this._isSerieVisible(v, m)) {
                            aa = 0.01;
                            continue
                        }
                        var K = this._getDataValueAsNumber(Y, F.series[m].dataField, v);
                        if (isNaN(K) || K <= 0) {
                            aa = 0.01;
                            continue
                        }
                        var S = z == 0 ? 0 : K / z;
                        if (isNaN(aa) || S < aa) {
                            aa = S
                        }
                    }
                }
                var s = z - B;
                if (d < s) {
                    d = s
                }
                if (f) {
                    C.psums[Y] = z;
                    C.nsums[Y] = B
                }
                if (H > R || isNaN(R)) {
                    R = H
                }
                if (ab < w || isNaN(w)) {
                    w = ab
                }
                if (z > e || isNaN(e)) {
                    e = z
                }
                if (B < h || isNaN(h)) {
                    h = B
                }
            }
            if (f) {
                e = e == 0 ? 0 : Math.max(e, -h);
                h = h == 0 ? 0 : Math.min(h, -e)
            }
            if (w == R) {
                if (w == 0) {
                    R = -1
                } else {
                    if (w < 0) {
                        R = 0
                    } else {
                        w = 0
                    }
                }
            }
            var T = {gmin: w, gmax: R, gsumP: e, gsumN: h, gbase: u, isLogAxis: P, logBase: O, minPercent: aa, gMaxRange: d, isStacked: J, isStacked100: f, isWaterfall: V, hasStackValueReversal: k, valueAxis: q, valueAxisSize: N};
            C.context = T
        }
        this._mergeCommonValueAxisStats();
        for (var Y = 0; Y < Z.seriesGroups.length; Y++) {
            var C = Z.seriesGroups[Y];
            var Q = this._calcOutputGroupStats(C.context);
            for (var W in Q) {
                C[W] = Q[W]
            }
            delete C.context
        }
    }, _mergeCommonValueAxisStats: function () {
        var h = {};
        for (var f = 0; f < this.seriesGroups.length; f++) {
            if (this.seriesGroups[f].valueAxis) {
                continue
            }
            var e = this._stats.seriesGroups[f].context;
            if (isNaN(h.gmin) || h.gmin > e.gmin) {
                h.gmin = e.gmin
            }
            if (isNaN(h.gmax) || h.gmax < e.gmax) {
                h.gmax = e.gmax
            }
            if (isNaN(h.gsumP) || h.gsumP < e.gsumP) {
                h.gsumP = e.gsumP
            }
            if (isNaN(h.gsumN) || h.gsumN < e.gsumN) {
                h.gsumN = e.gsumN
            }
            if (isNaN(h.logBase) || h.logBase > e.logBase) {
                h.logBase = e.logBase
            }
            if (isNaN(h.minPercent) || h.minPercent > e.minPercent) {
                h.minPercent = e.minPercent
            }
        }
        for (var f = 0; f < this.seriesGroups.length; f++) {
            if (this.seriesGroups[f].valueAxis) {
                continue
            }
            var c = this._stats.seriesGroups[f].context;
            for (var d in h) {
                c[d] = h[d]
            }
        }
    }, _calcOutputGroupStats: function (i) {
        var d = i.gmin, h = i.gmax, D = i.gsumP, E = i.gsumN, C = i.gbase, e = i.isLogAxis, l = i.logBase, w = i.minPercent, m = i.gMaxRange, n = i.isStacked, j = i.isStacked100, f = i.isWaterfall, q = i.hasStackValueReversal, B = i.valueAxis, z = i.valueAxisSize;
        var v = i.valueAxis.unitInterval;
        if (!v) {
            v = this._calcInterval(n ? E : d, n ? D : h, Math.max(z / 80, 2))
        }
        if (d == h) {
            d = C;
            h = 2 * h
        }
        var k = NaN;
        var c = 0;
        var t = 0;
        if (e) {
            if (j) {
                k = 0;
                var u = 1;
                c = t = a.jqx.log(100, l);
                while (u > w) {
                    u /= l;
                    c--;
                    k++
                }
                d = Math.pow(l, c)
            } else {
                if (n && !f) {
                    h = Math.max(h, D)
                }
                t = a.jqx._rnd(a.jqx.log(h, l), 1, true);
                h = Math.pow(l, t);
                c = a.jqx._rnd(a.jqx.log(d, l), 1, false);
                d = Math.pow(l, c)
            }
            v = l
        }
        if (d < E) {
            E = d
        }
        if (h > D) {
            D = h
        }
        var A = e ? d : a.jqx._rnd(n && !f ? E : d, v, false);
        var s = e ? h : a.jqx._rnd(n && !f ? D : h, v, true);
        if (j && s > 100) {
            s = 100
        }
        if (j && !e) {
            s = (s > 0) ? 100 : 0;
            A = (A < 0) ? -100 : 0;
            v = B.unitInterval;
            if (isNaN(v) || v <= 0 || v >= 100) {
                v = 10
            }
            if ((100 % v) != 0) {
                for (; v >= 1; v--) {
                    if ((100 % v) == 0) {
                        break
                    }
                }
            }
        }
        if (isNaN(s) || isNaN(A) || isNaN(v)) {
            return{}
        }
        if (isNaN(k)) {
            k = parseInt(((s - A) / (v == 0 ? 1 : v)).toFixed())
        }
        if (e && !j) {
            k = t - c;
            m = Math.pow(l, k)
        }
        if (k < 1) {
            return{}
        }
        var o = {min: A, max: s, logarithmic: e, logBase: l, base: e ? A : C, minPow: c, maxPow: t, mu: v, maxRange: m, intervals: k, hasStackValueReversal: q};
        return o
    }, _getDataLen: function (d) {
        var c = this.source;
        if (d != undefined && d != -1 && this.seriesGroups[d].source) {
            c = this.seriesGroups[d].source
        }
        if (c instanceof a.jqx.dataAdapter) {
            c = c.records
        }
        if (c) {
            return c.length
        }
        return 0
    }, _getDataValue: function (c, f, e) {
        var d = this.source;
        if (e != undefined && e != -1) {
            d = this.seriesGroups[e].source || d
        }
        if (d instanceof a.jqx.dataAdapter) {
            d = d.records
        }
        if (!d || c < 0 || c > d.length - 1) {
            return undefined
        }
        if (a.isFunction(f)) {
            return f(c, d)
        }
        return(f && f != "") ? d[c][f] : d[c]
    }, _getDataValueAsNumber: function (c, f, d) {
        var e = this._getDataValue(c, f, d);
        if (this._isDate(e)) {
            return e.valueOf()
        }
        if (typeof(e) != "number") {
            e = parseFloat(e)
        }
        if (typeof(e) != "number") {
            e = undefined
        }
        return e
    }, _isPieGroup: function (c) {
        var d = this.seriesGroups[c];
        if (!d || !d.type) {
            return false
        }
        return d.type.indexOf("pie") != -1 || d.type.indexOf("donut") != -1
    }, _renderPieSeries: function (f, d) {
        var h = this._getDataLen(f);
        var j = this.seriesGroups[f];
        var o = this._calcGroupOffsets(f, d).offsets;
        for (var t = 0; t < j.series.length; t++) {
            var m = j.series[t];
            if (m.customDraw) {
                continue
            }
            var A = this._getSerieSettings(f, t);
            var k = m.colorScheme || j.colorScheme || this.colorScheme;
            var v = this._getAnimProps(f, t);
            var c = v.enabled && h < 5000 && !this._isToggleRefresh && this._isVML != true ? v.duration : 0;
            if (a.jqx.mobile.isMobileBrowser() && (this.renderer instanceof a.jqx.HTML5Renderer)) {
                c = 0
            }
            var w = this._get([m.minAngle, m.startAngle]);
            if (isNaN(w) || w < 0 || w > 360) {
                w = 0
            }
            var C = this._get([m.maxAngle, m.endAngle]);
            if (isNaN(C) || C < 0 || C > 360) {
                C = 360
            }
            var q = {rect: d, minAngle: w, maxAngle: C, groupIndex: f, serieIndex: t, settings: A, items: []};
            for (var z = 0; z < h; z++) {
                var p = o[t][z];
                if (!p.visible) {
                    continue
                }
                var u = p.fromAngle;
                var e = p.toAngle;
                var B = this.renderer.pieslice(p.x, p.y, p.innerRadius, p.outerRadius, u, c == 0 ? e : u, p.centerOffset);
                var l = {element: B, displayValue: p.displayValue, itemIndex: z, visible: p.visible, x: p.x, y: p.y, innerRadius: p.innerRadius, outerRadius: p.outerRadius, fromAngle: u, toAngle: e, centerOffset: p.centerOffset};
                q.items.push(l)
            }
            this._animatePieSlices(q, 0);
            var n = this;
            this._enqueueAnimation("series", undefined, undefined, c, function (s, i, D) {
                n._animatePieSlices(i, D)
            }, q)
        }
    }, _sliceSortFunction: function (d, c) {
        return d.fromAngle - c.fromAngle
    }, _animatePieSlices: function (n, c) {
        var l;
        if (this._elementRenderInfo && this._elementRenderInfo.length > n.groupIndex && this._elementRenderInfo[n.groupIndex].series && this._elementRenderInfo[n.groupIndex].series.length > n.serieIndex) {
            l = this._elementRenderInfo[n.groupIndex].series[n.serieIndex]
        }
        var K = 360 * c;
        var O = this.seriesGroups[n.groupIndex];
        var z = this._getLabelsSettings(n.groupIndex, n.serieIndex, NaN);
        var R = z.visible;
        var m = [];
        for (var M = 0; M < n.items.length; M++) {
            var E = n.items[M];
            if (!E.visible) {
                continue
            }
            var d = E.fromAngle;
            var F = E.fromAngle + c * (E.toAngle - E.fromAngle);
            if (l && l[E.displayValue]) {
                var j = l[E.displayValue].fromAngle;
                var B = l[E.displayValue].toAngle;
                d = j + (d - j) * c;
                F = B + (F - B) * c
            }
            m.push({index: M, from: d, to: F})
        }
        if (l) {
            m.sort(this._sliceSortFunction)
        }
        var w = NaN;
        for (var M = 0; M < m.length; M++) {
            var E = n.items[m[M].index];
            if (E.labelElement) {
                this.renderer.removeElement(E.labelElement)
            }
            var d = m[M].from;
            var F = m[M].to;
            if (l) {
                if (!isNaN(w) && d > w) {
                    d = w
                }
                w = F;
                if (M == m.length - 1 && F != m[0].from) {
                    F = n.maxAngle + m[0].from
                }
            }
            var P = this.renderer.pieSlicePath(E.x, E.y, E.innerRadius, E.outerRadius, d, F, E.centerOffset);
            this.renderer.attr(E.element, {d: P});
            var J = this._getColors(n.groupIndex, n.serieIndex, E.itemIndex, "radialGradient", E.outerRadius);
            var N = n.settings;
            this.renderer.attr(E.element, {fill: J.fillColor, stroke: J.lineColor, "stroke-width": N.stroke, "fill-opacity": N.opacity, "stroke-opacity": N.opacity, "stroke-dasharray": "none" || N.dashStyle});
            var I = O.series[n.serieIndex];
            if (R) {
                var t = d, L = F;
                var C = Math.abs(t - L);
                var Q = C > 180 ? 1 : 0;
                if (C > 360) {
                    t = 0;
                    L = 360
                }
                var h = t * Math.PI * 2 / 360;
                var v = L * Math.PI * 2 / 360;
                var D = C / 2 + t;
                D = D % 360;
                var e = D * Math.PI * 2 / 360;
                var f;
                if (z.autoRotate == true) {
                    f = D < 90 || D > 270 ? 360 - D : 180 - D
                }
                var u = z.linesEnabled;
                var k = this._showLabel(n.groupIndex, n.serieIndex, E.itemIndex, {x: 0, y: 0, width: 0, height: 0}, "center", "center", true, false, false, f);
                var A = z.radius || E.outerRadius + Math.max(k.width, k.height);
                if (this._isPercent(A)) {
                    A = parseFloat(A) / 100 * Math.min(this._plotRect.width, this._plotRect.height) / 2
                }
                A += E.centerOffset;
                var H = a.jqx.getNum([I.offsetX, O.offsetX, n.rect.width / 2]);
                var G = a.jqx.getNum([I.offsetY, O.offsetY, n.rect.height / 2]);
                var p = n.rect.x + H;
                var o = n.rect.y + G;
                var q = this._adjustTextBoxPosition(p, o, k, A, D, E.outerRadius > A, z.linesAngles != false, z.autoRotate == true);
                E.labelElement = this._showLabel(n.groupIndex, n.serieIndex, E.itemIndex, {x: q.x, y: q.y, width: k.width, height: k.height}, "left", "top", false, false, false, f);
                if (A > E.outerRadius + 5 && u != false) {
                    E.labelArrowPath = this._updateLebelArrowPath(E.labelArrowPath, p, o, A, E.outerRadius, e, z.linesAngles != false, J, N)
                }
            }
            if (c == 1) {
                this._installHandlers(E.element, "pieslice", n.groupIndex, n.serieIndex, E.itemIndex)
            }
        }
    }, _updateLebelArrowPath: function (f, l, i, k, m, j, p, c, h) {
        var e = a.jqx._ptrnd(l + (k - 0) * Math.cos(j));
        var o = a.jqx._ptrnd(i - (k - 0) * Math.sin(j));
        var d = a.jqx._ptrnd(l + (m + 2) * Math.cos(j));
        var n = a.jqx._ptrnd(i - (m + 2) * Math.sin(j));
        var q = "M " + e + "," + o + " L" + d + "," + n;
        if (p) {
            q = "M " + e + "," + o + " L" + d + "," + o + " L" + d + "," + n
        }
        if (f) {
            this.renderer.attr(f, {d: q})
        } else {
            f = this.renderer.path(q, {})
        }
        this.renderer.attr(f, {fill: "none", stroke: c.lineColor, "stroke-width": h.stroke, "stroke-opacity": h.opacity, "stroke-dasharray": "none" || h.dashStyle});
        return f
    }, _adjustTextBoxPosition: function (f, e, o, i, u, c, j, p) {
        var d = u * Math.PI * 2 / 360;
        var l = a.jqx._ptrnd(f + i * Math.cos(d));
        var k = a.jqx._ptrnd(e - i * Math.sin(d));
        if (p) {
            var m = o.width;
            var q = o.height;
            var v = Math.atan(q / m) % (Math.PI * 2);
            var z = d % (Math.PI * 2);
            var t = 0, s = 0;
            var n = 0;
            if (z <= v) {
                n = m / 2 * Math.cos(d)
            } else {
                if (z >= v && z < Math.PI - v) {
                    n = (q / 2) * Math.sin(d)
                } else {
                    if (z >= Math.PI - v && z < Math.PI + v) {
                        n = m / 2 * Math.cos(d)
                    } else {
                        if (z >= Math.PI + v && z < 2 * Math.PI - v) {
                            n = q / 2 * Math.sin(d)
                        } else {
                            if (z >= 2 * Math.PI - v && z < 2 * Math.PI) {
                                n = m / 2 * Math.cos(d)
                            }
                        }
                    }
                }
            }
            i += Math.abs(n) + 3;
            var l = a.jqx._ptrnd(f + i * Math.cos(d));
            var k = a.jqx._ptrnd(e - i * Math.sin(d));
            l -= o.width / 2;
            k -= o.height / 2;
            return{x: l, y: k}
        }
        if (!c) {
            if (!j) {
                if (u >= 0 && u < 45 || u >= 315 && u < 360) {
                    k -= o.height / 2
                } else {
                    if (u >= 45 && u < 135) {
                        k -= o.height;
                        l -= o.width / 2
                    } else {
                        if (u >= 135 && u < 225) {
                            k -= o.height / 2;
                            l -= o.width
                        } else {
                            if (u >= 225 && u < 315) {
                                l -= o.width / 2
                            }
                        }
                    }
                }
            } else {
                if (u >= 90 && u < 270) {
                    k -= o.height / 2;
                    l -= o.width
                } else {
                    k -= o.height / 2
                }
            }
        } else {
            l -= o.width / 2;
            k -= o.height / 2
        }
        return{x: l, y: k}
    }, _isColumnType: function (c) {
        return(c.indexOf("column") != -1 || c.indexOf("waterfall") != -1)
    }, _getColumnGroupsCount: function (d) {
        var f = 0;
        d = d || "vertical";
        var h = this.seriesGroups;
        for (var e = 0; e < h.length; e++) {
            var c = h[e].orientation || "vertical";
            if (this._isColumnType(h[e].type) && c == d) {
                f++
            }
        }
        return f
    }, _getColumnGroupIndex: function (j) {
        var c = 0;
        var d = this.seriesGroups[j].orientation || "vertical";
        for (var f = 0; f < j; f++) {
            var h = this.seriesGroups[f];
            var e = h.orientation || "vertical";
            if (this._isColumnType(h.type) && e == d) {
                c++
            }
        }
        return c
    }, _renderAxisBands: function (h, F, N) {
        var C = N ? this._getXAxis(h) : this._getValueAxis(h);
        var w = this.seriesGroups[h];
        var A = N ? undefined : w.bands;
        if (!A) {
            for (var S = 0; S < h; S++) {
                var p = N ? this._getXAxis(S) : this._getValueAxis(S);
                if (p == C) {
                    return
                }
            }
            A = C.bands
        }
        if (!a.isArray(A)) {
            return
        }
        var q = F;
        var Y = w.orientation == "horizontal";
        if (Y) {
            q = {x: F.y, y: F.x, width: F.height, height: F.width}
        }
        this._calcGroupOffsets(h, q);
        for (var S = 0; S < A.length; S++) {
            var d = A[S];
            var W = this._get([d.minValue, d.from]);
            var B = this._get([d.maxValue, d.to]);
            var v = N ? this.getXAxisDataPointOffset(W, h) : this.getValueAxisDataPointOffset(W, h);
            var X = N ? this.getXAxisDataPointOffset(B, h) : this.getValueAxisDataPointOffset(B, h);
            var D = Math.abs(v - X);
            var M;
            if (w.polar || w.spider) {
                var u = this._renderData[h];
                var e = u.polarCoords;
                if (!N) {
                    var I = this._toPolarCoord(e, F, F.x, u.baseOffset);
                    var H = this._toPolarCoord(e, F, F.x, v);
                    var G = this._toPolarCoord(e, F, F.x, X);
                    var t = a.jqx._ptdist(I.x, I.y, H.x, H.y);
                    var s = a.jqx._ptdist(I.x, I.y, G.x, G.y);
                    var m = Math.round(-e.startAngle * 360 / (2 * Math.PI));
                    var T = Math.round(-e.endAngle * 360 / (2 * Math.PI));
                    if (m > T) {
                        var L = m;
                        m = T;
                        T = L
                    }
                    if (w.spider) {
                        var J = u.xAxis.offsetAngles;
                        var K = "";
                        var P = [s, t];
                        var E = J;
                        if (e.isClosedCircle) {
                            E = a.extend([], J);
                            E.push(E[0])
                        }
                        for (var O in P) {
                            for (var Q = 0; Q < E.length; Q++) {
                                var V = O == 0 ? Q : J.length - Q - 1;
                                var n = e.x + P[O] * Math.cos(E[V]);
                                var l = e.y + P[O] * Math.sin(E[V]);
                                if (K == "") {
                                    K += "M "
                                } else {
                                    K += " L"
                                }
                                K += a.jqx._ptrnd(n) + "," + a.jqx._ptrnd(l)
                            }
                            if (O == 0) {
                                var n = e.x + P[1] * Math.cos(E[V]);
                                var l = e.y + P[1] * Math.sin(E[V]);
                                K += " L" + a.jqx._ptrnd(n) + "," + a.jqx._ptrnd(l)
                            }
                        }
                        K += " Z";
                        M = this.renderer.path(K)
                    } else {
                        M = this.renderer.pieslice(e.x, e.y, t, s, m, T)
                    }
                } else {
                    if (w.spider) {
                        p1 = this.getPolarDataPointOffset(W, this._stats.seriesGroups[h].max, h);
                        p2 = this.getPolarDataPointOffset(B, this._stats.seriesGroups[h].max, h);
                        var K = "M " + e.x + "," + e.y;
                        K += " L " + p1.x + "," + p1.y;
                        K += " L " + p2.x + "," + p2.y;
                        M = this.renderer.path(K)
                    } else {
                        var f = [];
                        var o = {x: Math.min(v, X), y: F.y, width: D, height: F.height};
                        this._columnAsPieSlice(f, 0, F, e, o);
                        M = f[0]
                    }
                }
            } else {
                var c = {x: Math.min(v, X), y: q.y, width: D, height: q.height};
                if (!N) {
                    c = {x: q.x, y: Math.min(v, X), width: q.width, height: D}
                }
                if (Y) {
                    var L = c.x;
                    c.x = c.y;
                    c.y = L;
                    L = c.width;
                    c.width = c.height;
                    c.height = L
                }
                if (D == 0 || D == 1) {
                    M = this.renderer.line(a.jqx._ptrnd(c.x), a.jqx._ptrnd(c.y), a.jqx._ptrnd(c.x + (Y ? 0 : c.width)), a.jqx._ptrnd(c.y + (Y ? c.height : 0)))
                } else {
                    M = this.renderer.rect(c.x, c.y, c.width, c.height)
                }
            }
            var Z = d.fillColor || d.color || "#AAAAAA";
            var U = d.lineColor || Z;
            var z = d.lineWidth;
            if (isNaN(z)) {
                z = 1
            }
            var R = d.opacity;
            if (isNaN(R) || R < 0 || R > 1) {
                R = 1
            }
            this.renderer.attr(M, {fill: Z, "fill-opacity": R, stroke: U, "stroke-opacity": R, "stroke-width": z, "stroke-dasharray": d.dashStyle})
        }
    }, _getColumnGroupWidth: function (n, i, p) {
        var f = this.seriesGroups[n];
        var m = f.type.indexOf("stacked") != -1;
        var e = m ? 1 : f.series.length;
        var l = this._getColumnGroupsCount(f.orientation);
        if (isNaN(l) || 0 == l) {
            l = 1
        }
        var o = i.rangeLength >= 1 ? i.itemWidth : p * 0.9;
        var d = f.columnsMinWidth;
        if (isNaN(d)) {
            d = 1
        }
        if (!isNaN(f.columnsMaxWidth)) {
            d = Math.min(f.columnsMaxWidth, d)
        }
        if (d > o && i.length > 0) {
            o = Math.max(o, p * 0.9 / i.length)
        }
        var j = d;
        if (!m) {
            var h = f.seriesGapPercent;
            if (isNaN(h) || h < 0) {
                h = 10
            }
            h /= 100;
            var c = d;
            c *= (1 + h);
            j += f.series.length * c
        }
        var k = Math.max(o / l, j);
        return{requiredWidth: j, availableWidth: o, targetWidth: k}
    }, _getColumnSerieWidthAndOffset: function (e, f) {
        var o = this.seriesGroups[e];
        var z = o.series[f];
        var d = o.orientation == "horizontal";
        var c = this._plotRect;
        if (d) {
            c = {x: c.y, y: c.x, width: c.height, height: c.width}
        }
        var A = this._calcGroupOffsets(e, c);
        if (!A || A.xoffsets.length == 0) {
            return
        }
        var n = true;
        var B = this._getColumnGroupsCount(o.orientation);
        if (o.type == "candlestick" || o.type == "ohlc") {
            B = 1
        }
        var u = this._getColumnGroupIndex(e);
        var v = this._getColumnGroupWidth(e, A.xoffsets, d ? c.height : c.width);
        var j = 0;
        var h = v.targetWidth;
        if (this.columnSeriesOverlap == true || (Math.round(h) > Math.round(v.availableWidth / B))) {
            B = 1;
            u = 0
        }
        if (n) {
            j -= (h * B) / 2
        }
        j += h * u;
        var G = o.columnsGapPercent;
        if (G <= 0) {
            G = 0
        }
        if (isNaN(G) || G >= 100) {
            G = 25
        }
        G /= 100;
        var m = h * G;
        if (m + v.requiredWidth > v.targetWidth) {
            m = Math.max(0, v.targetWidth - v.requiredWidth)
        }
        if (Math.round(h) > Math.round(v.availableWidth)) {
            m = 0
        }
        h -= m;
        j += m / 2;
        var C = o.seriesGapPercent;
        if (isNaN(C) || C < 0) {
            C = 10
        }
        var p = o.type.indexOf("stacked") != -1;
        var w = h;
        if (!p) {
            w /= o.series.length
        }
        var D = this._get([o.seriesGap, (h * C / 100) / (o.series.length - 1)]);
        if (o.polar == true || o.spider == true || p || o.series.length <= 1) {
            D = 0
        }
        var q = D * (o.series.length - 1);
        if (o.series.length > 1 && q > h - o.series.length * 1) {
            q = h - o.series.length * 1;
            D = q / Math.max(1, (o.series.length - 1))
        }
        var i = w - (q / o.series.length);
        var F = 0;
        var k = o.columnsMaxWidth;
        if (!isNaN(k)) {
            if (i > k) {
                F = i - k;
                i = k
            }
        }
        var E = F / 2;
        var l = 0;
        if (!p) {
            var H = (h - (i * o.series.length) - q) / 2;
            var t = Math.max(0, f);
            l = H + i * f + t * D
        } else {
            l = F / 2
        }
        return{width: i, offset: j + l}
    }, _renderColumnSeries: function (h, d) {
        var l = this.seriesGroups[h];
        if (!l.series || l.series.length == 0) {
            return
        }
        var k = this._getDataLen(h);
        var f = l.orientation == "horizontal";
        var D = d;
        if (f) {
            D = {x: d.y, y: d.x, width: d.height, height: d.width}
        }
        var t = this._calcGroupOffsets(h, D);
        if (!t || t.xoffsets.length == 0) {
            return
        }
        var o;
        if (l.polar == true || l.spider == true) {
            o = this._getPolarAxisCoords(h, D)
        }
        var v = {groupIndex: h, rect: d, vertical: !f, seriesCtx: [], renderData: t, polarAxisCoords: o};
        v.columnGroupWidth = this._getColumnGroupWidth(h, t.xoffsets, f ? D.height : D.width);
        var j = this._getGroupGradientType(h);
        for (var w = 0; w < l.series.length; w++) {
            var p = l.series[w];
            if (p.customDraw) {
                continue
            }
            var B = p.dataField;
            var z = this._getAnimProps(h, w);
            var c = z.enabled && !this._isToggleRefresh && t.xoffsets.length < 100 ? z.duration : 0;
            var m = this._getColumnSerieWidthAndOffset(h, w);
            var u = this._isSerieVisible(h, w);
            var n = this._getSerieSettings(h, w);
            var E = this._getColors(h, w, NaN, this._getGroupGradientType(h), 4);
            var e = [];
            if (a.isFunction(p.colorFunction) && !o) {
                for (var C = t.xoffsets.first; C <= t.xoffsets.last; C++) {
                    e.push(this._getColors(h, w, C, j, 4))
                }
            }
            var A = {seriesIndex: w, serieColors: E, itemsColors: e, settings: n, columnWidth: m.width, xAdjust: m.offset, isVisible: u};
            v.seriesCtx.push(A)
        }
        this._animColumns(v, c == 0 ? 1 : 0);
        var q = this;
        this._enqueueAnimation("series", undefined, undefined, c, function (s, i, F) {
            q._animColumns(i, F)
        }, v)
    }, _getPercent: function (e, d, c, f) {
        if (isNaN(e)) {
            e = d
        }
        if (!isNaN(c) && !isNaN(e) && e < c) {
            e = c
        }
        if (!isNaN(f) && !isNaN(e) && e > f) {
            e = f
        }
        if (isNaN(e)) {
            return NaN
        }
        return e
    }, _getColumnVOffsets: function (p, l, f, G, z, d) {
        var t = this.seriesGroups[l];
        var K = this._getPercent(t.columnsTopWidthPercent, 100, 0, 100);
        var A = this._getPercent(t.columnsBottomWidthPercent, 100, 0, 100);
        if (K == 0 && A == 0) {
            A = 100
        }
        var M = this._getPercent(t.columnsNeckHeightPercent, NaN, 0, 100) / 100;
        var H = this._getPercent(t.columnsNeckWidthPercent, 100, 0, 100) / 100;
        var v = [];
        var L = NaN;
        for (var u = 0; u < f.length; u++) {
            var Q = f[u];
            var m = Q.seriesIndex;
            var J = t.series[m];
            var q = p.offsets[m][G].from;
            var S = p.offsets[m][G].to;
            var C = p.xoffsets.data[G];
            var j;
            var k = Q.isVisible;
            if (!k) {
                S = q
            }
            var c = this._elementRenderInfo;
            if (k && c && c.length > l && c[l].series.length > m) {
                var I = p.xoffsets.xvalues[G];
                j = c[l].series[m][I];
                if (j && !isNaN(j.from) && !isNaN(j.to)) {
                    q = j.from + (q - j.from) * d;
                    S = j.to + (S - j.to) * d;
                    C = j.xoffset + (C - j.xoffset) * d
                }
            }
            if (!j) {
                S = q + (S - q) * (z ? 1 : d)
            }
            if (isNaN(q)) {
                q = isNaN(L) ? p.baseOffset : L
            }
            if (!isNaN(S) && z) {
                L = S
            } else {
                L = q
            }
            if (isNaN(S)) {
                S = q
            }
            var F = {from: q, to: S, xOffset: C};
            if (K != 100 || A != 100) {
                F.funnel = true;
                F.toWidthPercent = K;
                F.fromWidthPercent = A
            }
            v.push(F)
        }
        if (z && v.length > 1 && !(this._elementRenderInfo && this._elementRenderInfo.length > l)) {
            var n = 0, o = 0, N = -Infinity, B = Infinity, O = Infinity, E = -Infinity;
            for (var P = 0; P < v.length; P++) {
                var Q = f[P];
                if (Q.isVisible) {
                    if (v[P].to >= v[P].from) {
                        o += v[P].to - v[P].from;
                        O = Math.min(O, v[P].from);
                        E = Math.max(E, v[P].to)
                    } else {
                        n += v[P].from - v[P].to;
                        N = Math.max(N, v[P].from);
                        B = Math.min(B, v[P].to)
                    }
                }
            }
            var R = n;
            var w = o;
            n *= d;
            o *= d;
            var e = 0, h = 0;
            for (var P = 0; P < v.length; P++) {
                if (v[P].to >= v[P].from) {
                    var D = v[P].to - v[P].from;
                    if (D + h > o) {
                        D = Math.max(0, o - h);
                        v[P].to = v[P].from + D
                    }
                    if (K != 100 || A != 100) {
                        v[P].funnel = true;
                        if (!isNaN(M) && w * M >= h) {
                            v[P].fromWidthPercent = H * 100
                        } else {
                            v[P].fromWidthPercent = (Math.abs(v[P].from - O) / w) * (K - A) + A
                        }
                        if (!isNaN(M) && w * M >= (0 + (h + D))) {
                            v[P].toWidthPercent = H * 100
                        } else {
                            v[P].toWidthPercent = (Math.abs(v[P].to - O) / w) * (K - A) + A
                        }
                    }
                    h += D
                } else {
                    var D = v[P].from - v[P].to;
                    if (D + e > n) {
                        D = Math.max(0, n - e);
                        v[P].to = v[P].from - D
                    }
                    if (K != 100 || A != 100) {
                        v[P].funnel = true;
                        if (!isNaN(M) && R * M >= e) {
                            v[P].fromWidthPercent = H * 100
                        } else {
                            v[P].fromWidthPercent = (Math.abs(v[P].from - N) / R) * (K - A) + A
                        }
                        if (!isNaN(M) && R * M >= (0 + (e + D))) {
                            v[P].toWidthPercent = H * 100
                        } else {
                            v[P].toWidthPercent = (Math.abs(v[P].to - N) / R) * (K - A) + A
                        }
                    }
                    e += D
                }
            }
        }
        return v
    }, _columnAsPieSlice: function (c, h, n, p, s) {
        var f = this._toPolarCoord(p, n, s.x, s.y);
        var i = this._toPolarCoord(p, n, s.x, s.y + s.height);
        var o = a.jqx._ptdist(p.x, p.y, i.x, i.y);
        var l = a.jqx._ptdist(p.x, p.y, f.x, f.y);
        var e = n.width;
        var q = Math.abs(p.startAngle - p.endAngle) * 180 / Math.PI;
        var d = -((s.x - n.x) * q) / e;
        var k = -((s.x + s.width - n.x) * q) / e;
        var m = p.startAngle;
        m = 360 * m / (Math.PI * 2);
        d -= m;
        k -= m;
        if (c && !isNaN(h)) {
            if (c[h] != undefined) {
                var j = this.renderer.pieSlicePath(p.x, p.y, o, l, k, d, 0);
                j += " Z";
                this.renderer.attr(c[h], {d: j})
            } else {
                c[h] = this.renderer.pieslice(p.x, p.y, o, l, k, d, 0)
            }
        }
        return{fromAngle: k, toAngle: d, innerRadius: o, outerRadius: l}
    }, _animColumns: function (ag, d) {
        var p = ag.groupIndex;
        var B = this.seriesGroups[p];
        var u = ag.renderData;
        var Y = B.type.indexOf("waterfall") != -1;
        var F = this._getXAxis(p);
        var H = B.type.indexOf("stacked") != -1;
        var e = ag.polarAxisCoords;
        var A = this._getGroupGradientType(p);
        var s = ag.columnGroupWidth.targetWidth;
        var w = -1;
        for (var Z = 0; Z < B.series.length; Z++) {
            if (this._isSerieVisible(p, Z)) {
                w = Z;
                break
            }
        }
        var ah = NaN, t = NaN;
        for (var Z = 0; Z < ag.seriesCtx.length; Z++) {
            var af = ag.seriesCtx[Z];
            if (isNaN(ah) || ah > af.xAdjust) {
                ah = af.xAdjust
            }
            if (isNaN(t) || t < af.xAdjust + af.columnWidth) {
                t = af.xAdjust + af.columnWidth
            }
        }
        var q = Math.abs(t - ah);
        var X = ag.renderData.xoffsets;
        var Q = -1;
        var N = {};
        var P = B.skipOverlappingPoints == true;
        for (var ab = X.first; ab <= X.last; ab++) {
            var T = X.data[ab];
            if (isNaN(T)) {
                continue
            }
            if (Q != -1 && Math.abs(T - Q) < q && P) {
                continue
            } else {
                Q = T
            }
            var E = this._getColumnVOffsets(u, p, ag.seriesCtx, ab, H, d);
            var K = false;
            if (Y) {
                for (var C = 0; C < B.series.length; C++) {
                    if (B.series[C].summary && X.xvalues[ab][B.series[C].summary]) {
                        K = true
                    }
                }
            }
            for (var C = 0; C < ag.seriesCtx.length; C++) {
                var af = ag.seriesCtx[C];
                var m = af.seriesIndex;
                var D = B.series[m];
                var v = E[C].from;
                var ai = E[C].to;
                var J = E[C].xOffset;
                if (!af.elements) {
                    af.elements = {}
                }
                if (!af.labelElements) {
                    af.labelElements = {}
                }
                var k = af.elements;
                var z = af.labelElements;
                var f = (ag.vertical ? ag.rect.x : ag.rect.y) + af.xAdjust;
                var ac = af.settings;
                var U = af.itemsColors.length != 0 ? af.itemsColors[ab - u.xoffsets.first] : af.serieColors;
                var h = this._isSerieVisible(p, m);
                if (!h) {
                    continue
                }
                var T = a.jqx._ptrnd(f + J);
                var O = {x: T, width: af.columnWidth};
                if (E[C].funnel) {
                    O.fromWidthPercent = E[C].fromWidthPercent;
                    O.toWidthPercent = E[C].toWidthPercent
                }
                var l = true;
                if (ag.vertical) {
                    O.y = v;
                    O.height = ai - v;
                    if (O.height < 0) {
                        O.y += O.height;
                        O.height = -O.height;
                        l = false
                    }
                } else {
                    O.x = v < ai ? v : ai;
                    O.width = Math.abs(v - ai);
                    l = v - ai < 0;
                    O.y = T;
                    O.height = af.columnWidth
                }
                var n = v - ai;
                if (isNaN(n)) {
                    continue
                }
                n = Math.abs(n);
                var G = undefined;
                var M = k[ab] == undefined;
                if (!e) {
                    if (E[C].funnel) {
                        var W = this._getTrapezoidPath(a.extend({}, O), ag.vertical, l);
                        if (M) {
                            k[ab] = this.renderer.path(W, {})
                        } else {
                            this.renderer.attr(k[ab], {d: W})
                        }
                    } else {
                        if (M) {
                            k[ab] = this.renderer.rect(O.x, O.y, ag.vertical ? O.width : 0, ag.vertical ? 0 : O.height)
                        } else {
                            if (ag.vertical == true) {
                                this.renderer.attr(k[ab], {x: O.x, y: O.y, height: n})
                            } else {
                                this.renderer.attr(k[ab], {x: O.x, y: O.y, width: n})
                            }
                        }
                    }
                } else {
                    G = this._columnAsPieSlice(k, ab, ag.rect, e, O);
                    var U = this._getColors(p, m, undefined, "radialGradient", G.outerRadius)
                }
                if (n < 1 && (d != 1 || e)) {
                    this.renderer.attr(k[ab], {display: "none"})
                } else {
                    this.renderer.attr(k[ab], {display: "block"})
                }
                if (M) {
                    this.renderer.attr(k[ab], {fill: U.fillColor, "fill-opacity": ac.opacity, "stroke-opacity": ac.opacity, stroke: U.lineColor, "stroke-width": ac.stroke, "stroke-dasharray": ac.dashStyle})
                }
                this.renderer.removeElement(z[ab]);
                if (!h || (n == 0 && d < 1)) {
                    continue
                }
                if (Y && this._get([D.showWaterfallLines, B.showWaterfallLines]) != false) {
                    if (!H || (H && C == w)) {
                        var aa = H ? -1 : C;
                        if (d == 1 && !isNaN(u.offsets[C][ab].from) && !isNaN(u.offsets[C][ab].to)) {
                            var L = N[aa];
                            if (L != undefined) {
                                var ae = {x: L.x, y: a.jqx._ptrnd(L.y)};
                                var ad = {x: T, y: ae.y};
                                var R = B.columnsTopWidthPercent / 100;
                                if (isNaN(R)) {
                                    R = 1
                                } else {
                                    if (R > 1 || R < 0) {
                                        R = 1
                                    }
                                }
                                var V = B.columnsBottomWidthPercent / 100;
                                if (isNaN(V)) {
                                    V = 1
                                } else {
                                    if (V > 1 || V < 0) {
                                        V = 1
                                    }
                                }
                                var o = ag.vertical ? O.width : O.height;
                                ae.x = ae.x - o / 2 + o / 2 * R;
                                if (K) {
                                    var c = o * R / 2;
                                    ad.x = ad.x + o / 2 - (F.flip ? -c : c)
                                } else {
                                    var c = o * V / 2;
                                    ad.x = ad.x + o / 2 - (F.flip ? -c : c)
                                }
                                if (!ag.vertical) {
                                    this._swapXY([ae]);
                                    this._swapXY([ad])
                                }
                                this.renderer.line(ae.x, ae.y, ad.x, ad.y, {stroke: L.color, "stroke-width": ac.stroke, "stroke-opacity": ac.opacity, "fill-opacity": ac.opacity, "stroke-dasharray": ac.dashStyle})
                            }
                        }
                    }
                    if (d == 1 && n != 0) {
                        N[H ? -1 : C] = {y: ai, x: (ag.vertical ? O.x + O.width : O.y + O.height), color: U.lineColor}
                    }
                }
                if (e) {
                    var S = this._toPolarCoord(e, ag.rect, O.x + O.width / 2, O.y);
                    var o = this._showLabel(p, m, ab, O, undefined, undefined, true);
                    var I = G.outerRadius + 10;
                    labelOffset = this._adjustTextBoxPosition(e.x, e.y, o, I, (G.fromAngle + G.toAngle) / 2, true, false, false);
                    z[ab] = this._showLabel(p, m, ab, {x: labelOffset.x, y: labelOffset.y}, undefined, undefined, false, false, false)
                } else {
                    z[ab] = this._showLabel(p, m, ab, O, undefined, undefined, false, false, l)
                }
                if (d == 1) {
                    this._installHandlers(k[ab], "column", p, m, ab)
                }
            }
        }
    }, _getTrapezoidPath: function (j, k, h) {
        var n = "";
        var c = j.fromWidthPercent / 100;
        var d = j.toWidthPercent / 100;
        if (!k) {
            var f = j.width;
            j.width = j.height;
            j.height = f;
            f = j.x;
            j.x = j.y;
            j.y = f
        }
        var l = j.x + j.width / 2;
        var m = [
            {x: l - j.width * (!h ? c : d) / 2, y: j.y + j.height},
            {x: l - j.width * (!h ? d : c) / 2, y: j.y},
            {x: l + j.width * (!h ? d : c) / 2, y: j.y},
            {x: l + j.width * (!h ? c : d) / 2, y: j.y + j.height}
        ];
        if (!k) {
            this._swapXY(m)
        }
        n += "M " + a.jqx._ptrnd(m[0].x) + "," + a.jqx._ptrnd(m[0].y);
        for (var e = 1; e < m.length; e++) {
            n += " L " + a.jqx._ptrnd(m[e].x) + "," + a.jqx._ptrnd(m[e].y)
        }
        n += " Z";
        return n
    }, _swapXY: function (e) {
        for (var d = 0; d < e.length; d++) {
            var c = e[d].x;
            e[d].x = e[d].y;
            e[d].y = c
        }
    }, _renderCandleStickSeries: function (f, d, w) {
        var o = this;
        var j = o.seriesGroups[f];
        if (!j.series || j.series.length == 0) {
            return
        }
        var e = j.orientation == "horizontal";
        var A = d;
        if (e) {
            A = {x: d.y, y: d.x, width: d.height, height: d.width}
        }
        var p = o._calcGroupOffsets(f, A);
        if (!p || p.xoffsets.length == 0) {
            return
        }
        var B = A.width;
        var m;
        if (j.polar || j.spider) {
            m = o._getPolarAxisCoords(f, A);
            B = 2 * m.r
        }
        var i = o._alignValuesWithTicks(f);
        var h = o._getGroupGradientType(f);
        var k = [];
        for (var t = 0; t < j.series.length; t++) {
            k[t] = o._getColumnSerieWidthAndOffset(f, t)
        }
        for (var t = 0; t < j.series.length; t++) {
            if (!this._isSerieVisible(f, t)) {
                continue
            }
            var z = o._getSerieSettings(f, t);
            var n = j.series[t];
            if (n.customDraw) {
                continue
            }
            var l = a.isFunction(n.colorFunction) ? undefined : o._getColors(f, t, NaN, h);
            var q = {rect: d, inverse: e, groupIndex: f, seriesIndex: t, symbolType: n.symbolType, symbolSize: n.symbolSize, "fill-opacity": z.opacity, "stroke-opacity": z.opacity, "stroke-width": z.stroke, "stroke-dasharray": z.dashStyle, gradientType: h, colors: l, renderData: p, polarAxisCoords: m, columnsInfo: k, isOHLC: w, items: [], self: o};
            var u = o._getAnimProps(f, t);
            var c = u.enabled && !o._isToggleRefresh && p.xoffsets.length < 5000 ? u.duration : 0;
            o._animCandleStick(q, 0);
            var v;
            o._enqueueAnimation("series", undefined, undefined, c, function (D, s, C) {
                o._animCandleStick(s, C)
            }, q)
        }
    }, _animCandleStick: function (w, c) {
        var t = ["Open", "Low", "Close", "High"];
        var f = w.columnsInfo[w.seriesIndex].width;
        var k = w.self.seriesGroups[w.groupIndex];
        var A = w.renderData.xoffsets;
        var H = -1;
        var p = Math.abs(A.data[A.last] - A.data[A.first]);
        p *= c;
        var d = NaN, u = NaN;
        for (var C = 0; C < w.columnsInfo.length; C++) {
            var B = w.columnsInfo[C];
            if (isNaN(d) || d > B.offset) {
                d = B.offset
            }
            if (isNaN(u) || u < B.offset + B.width) {
                u = B.offset + B.width
            }
        }
        var o = Math.abs(u - d);
        var E = k.skipOverlappingPoints != false;
        for (var D = A.first; D <= A.last; D++) {
            var n = A.data[D];
            if (isNaN(n)) {
                continue
            }
            if (H != -1 && Math.abs(n - H) < o && E) {
                continue
            }
            var F = Math.abs(A.data[D] - A.data[A.first]);
            if (F > p) {
                break
            }
            H = n;
            var G = w.items[D] = w.items[D] || {};
            for (var C in t) {
                var I = w.self._getDataValueAsNumber(D, k.series[w.seriesIndex]["dataField" + t[C]], w.groupIndex);
                if (isNaN(I)) {
                    break
                }
                var m = w.renderData.offsets[w.seriesIndex][D][t[C]];
                if (isNaN(m)) {
                    break
                }
                G[t[C]] = m
            }
            n += w.inverse ? w.rect.y : w.rect.x;
            if (w.polarAxisCoords) {
                var v = this._toPolarCoord(w.polarAxisCoords, this._plotRect, n, m);
                n = v.x;
                m = v.y
            }
            n = a.jqx._ptrnd(n);
            for (var h in t) {
                G[h] = a.jqx._ptrnd(G[h])
            }
            var l = w.colors;
            if (!l) {
                l = w.self._getColors(w.groupIndex, w.seriesIndex, D, w.gradientType)
            }
            if (!w.isOHLC) {
                var z = G.lineElement;
                if (!z) {
                    z = w.inverse ? this.renderer.line(G.Low, n, G.High, n) : this.renderer.line(n, G.Low, n, G.High);
                    this.renderer.attr(z, {fill: l.fillColor, "fill-opacity": w["fill-opacity"], "stroke-opacity": w["fill-opacity"], stroke: l.lineColor, "stroke-width": w["stroke-width"], "stroke-dasharray": w["stroke-dasharray"]});
                    G.lineElement = z
                }
                var s = G.stickElement;
                n -= f / 2;
                if (!s) {
                    var e = l.fillColor;
                    if (G.Close <= G.Open && l.fillColorAlt) {
                        e = l.fillColorAlt
                    }
                    s = w.inverse ? this.renderer.rect(Math.min(G.Open, G.Close), n, Math.abs(G.Close - G.Open), f) : this.renderer.rect(n, Math.min(G.Open, G.Close), f, Math.abs(G.Close - G.Open));
                    this.renderer.attr(s, {fill: e, "fill-opacity": w["fill-opacity"], "stroke-opacity": w["fill-opacity"], stroke: l.lineColor, "stroke-width": w["stroke-width"], "stroke-dasharray": w["stroke-dasharray"]});
                    G.stickElement = s
                }
                if (c == 1) {
                    this._installHandlers(s, "column", w.groupIndex, w.seriesIndex, D)
                }
            } else {
                var q = "M" + n + "," + G.Low + " L" + n + "," + G.High + " M" + (n - f / 2) + "," + G.Open + " L" + n + "," + G.Open + " M" + (n + f / 2) + "," + G.Close + " L" + n + "," + G.Close;
                if (w.inverse) {
                    q = "M" + G.Low + "," + n + " L" + G.High + "," + n + " M" + G.Open + "," + (n - f / 2) + " L" + G.Open + "," + n + " M" + G.Close + "," + n + " L" + G.Close + "," + (n + f / 2)
                }
                var z = G.lineElement;
                if (!z) {
                    z = this.renderer.path(q, {});
                    this.renderer.attr(z, {fill: l.fillColor, "fill-opacity": w["fill-opacity"], "stroke-opacity": w["fill-opacity"], stroke: l.lineColor, "stroke-width": w["stroke-width"], "stroke-dasharray": w["stroke-dasharray"]});
                    G.lineElement = z
                }
                if (c == 1) {
                    this._installHandlers(z, "column", w.groupIndex, w.seriesIndex, D)
                }
            }
        }
    }, _renderScatterSeries: function (f, E, G) {
        var v = this.seriesGroups[f];
        if (!v.series || v.series.length == 0) {
            return
        }
        var h = v.type.indexOf("bubble") != -1;
        var w = v.orientation == "horizontal";
        var o = E;
        if (w) {
            o = {x: E.y, y: E.x, width: E.height, height: E.width}
        }
        var p = this._calcGroupOffsets(f, o);
        if (!p || p.xoffsets.length == 0) {
            return
        }
        var O = o.width;
        var d;
        if (v.polar || v.spider) {
            d = this._getPolarAxisCoords(f, o);
            O = 2 * d.r
        }
        var W = this._alignValuesWithTicks(f);
        var u = this._getGroupGradientType(f);
        if (!G) {
            G = "to"
        }
        for (var j = 0; j < v.series.length; j++) {
            var U = this._getSerieSettings(f, j);
            var L = v.series[j];
            if (L.customDraw) {
                continue
            }
            var B = L.dataField;
            var n = a.isFunction(L.colorFunction);
            var M = this._getColors(f, j, NaN, u);
            var V = NaN, A = NaN;
            if (h) {
                for (var T = p.xoffsets.first; T <= p.xoffsets.last; T++) {
                    var D = this._getDataValueAsNumber(T, (L.radiusDataField || L.sizeDataField), f);
                    if (typeof(D) != "number") {
                        throw"Invalid radiusDataField value at [" + T + "]"
                    }
                    if (!isNaN(D)) {
                        if (isNaN(V) || D < V) {
                            V = D
                        }
                        if (isNaN(A) || D > A) {
                            A = D
                        }
                    }
                }
            }
            var l = L.minRadius || L.minSymbolSize;
            if (isNaN(l)) {
                l = O / 50
            }
            var F = L.maxRadius || L.maxSymbolSize;
            if (isNaN(F)) {
                F = O / 25
            }
            if (l > F) {
                F = l
            }
            var N = L.radius;
            if (isNaN(N) && !isNaN(L.symbolSize)) {
                N = (L.symbolType == "circle") ? L.symbolSize / 2 : L.symbolSize
            } else {
                N = 5
            }
            var H = this._getAnimProps(f, j);
            var C = H.enabled && !this._isToggleRefresh && p.xoffsets.length < 5000 ? H.duration : 0;
            var z = {groupIndex: f, seriesIndex: j, symbolType: L.symbolType, symbolSize: L.symbolSize, "fill-opacity": U.opacity, "stroke-opacity": U.opacity, "stroke-width": U.stroke, "stroke-dasharray": U.dashStyle, items: [], polarAxisCoords: d};
            for (var T = p.xoffsets.first; T <= p.xoffsets.last; T++) {
                var D = this._getDataValueAsNumber(T, B, f);
                if (typeof(D) != "number") {
                    continue
                }
                var K = p.xoffsets.data[T];
                var I = p.xoffsets.xvalues[T];
                var J = p.offsets[j][T][G];
                if (isNaN(K) || isNaN(J)) {
                    continue
                }
                if (w) {
                    var R = K;
                    K = J;
                    J = R + E.y
                } else {
                    K += E.x
                }
                var P = N;
                if (h) {
                    var q = this._getDataValueAsNumber(T, (L.radiusDataField || L.sizeDataField), f);
                    if (typeof(q) != "number") {
                        continue
                    }
                    P = l + (F - l) * (q - V) / Math.max(1, A - V);
                    if (isNaN(P)) {
                        P = l
                    }
                }
                p.offsets[j][T].radius = P;
                var m = NaN, Q = NaN;
                var t = 0;
                var c = this._elementRenderInfo;
                if (I != undefined && c && c.length > f && c[f].series.length > j) {
                    var e = c[f].series[j][I];
                    if (e && !isNaN(e.to)) {
                        m = e.to;
                        Q = e.xoffset;
                        t = N;
                        if (w) {
                            var R = Q;
                            Q = m;
                            m = R + E.y
                        } else {
                            Q += E.x
                        }
                        if (h) {
                            t = l + (F - l) * (e.valueRadius - V) / Math.max(1, A - V);
                            if (isNaN(t)) {
                                t = l
                            }
                        }
                    }
                }
                if (n) {
                    M = this._getColors(f, j, T, u)
                }
                z.items.push({from: t, to: P, itemIndex: T, fill: M.fillColor, stroke: M.lineColor, x: K, y: J, xFrom: Q, yFrom: m})
            }
            this._animR(z, 0);
            var k = this;
            var S;
            this._enqueueAnimation("series", undefined, undefined, C, function (X, i, s) {
                k._animR(i, s)
            }, z)
        }
    }, _animR: function (o, h) {
        var j = o.items;
        var p = o.symbolType || "circle";
        var d = o.symbolSize;
        for (var f = 0; f < j.length; f++) {
            var n = j[f];
            var l = n.x;
            var k = n.y;
            var c = Math.round((n.to - n.from) * h + n.from);
            if (!isNaN(n.yFrom)) {
                k = n.yFrom + (k - n.yFrom) * h
            }
            if (!isNaN(n.xFrom)) {
                l = n.xFrom + (l - n.xFrom) * h
            }
            if (o.polarAxisCoords) {
                var m = this._toPolarCoord(o.polarAxisCoords, this._plotRect, l, k);
                l = m.x;
                k = m.y
            }
            l = a.jqx._ptrnd(l);
            k = a.jqx._ptrnd(k);
            c = a.jqx._ptrnd(c);
            var e = n.element;
            if (p == "circle") {
                if (!e) {
                    e = this.renderer.circle(l, k, c);
                    this.renderer.attr(e, {fill: n.fill, "fill-opacity": o["fill-opacity"], "stroke-opacity": o["fill-opacity"], stroke: n.stroke, "stroke-width": o["stroke-width"], "stroke-dasharray": o["stroke-dasharray"]});
                    n.element = e
                }
                if (this._isVML) {
                    this.renderer.updateCircle(e, undefined, undefined, c)
                } else {
                    this.renderer.attr(e, {r: c, cy: k, cx: l})
                }
            } else {
                if (e) {
                    this.renderer.removeElement(e)
                }
                n.element = e = this._drawSymbol(p, l, k, n.fill, o["fill-opacity"], n.stroke, o["stroke-opacity"] || o["fill-opacity"], o["stroke-width"], o["stroke-dasharray"], d || c)
            }
            if (n.labelElement) {
                this.renderer.removeElement(n.labelElement)
            }
            n.labelElement = this._showLabel(o.groupIndex, o.seriesIndex, n.itemIndex, {x: l - c, y: k - c, width: 2 * c, height: 2 * c});
            if (h >= 1) {
                this._installHandlers(e, "circle", o.groupIndex, o.seriesIndex, n.itemIndex)
            }
        }
    }, _showToolTip: function (p, n, J, C, f) {
        var z = this;
        var m = z._getXAxis(J);
        var c = z._getValueAxis(J);
        if (z._ttEl && J == z._ttEl.gidx && C == z._ttEl.sidx && f == z._ttEl.iidx) {
            return
        }
        var l = z.seriesGroups[J];
        var q = l.series[C];
        var j = z.enableCrosshairs && !(l.polar || l.spider);
        if (z._pointMarker) {
            p = parseInt(z._pointMarker.x + 5);
            n = parseInt(z._pointMarker.y - 5)
        } else {
            j = false
        }
        var k = j && z.showToolTips == false;
        p = a.jqx._ptrnd(p);
        n = a.jqx._ptrnd(n);
        var K = z._ttEl == undefined;
        if (l.showToolTips == false || q.showToolTips == false) {
            return
        }
        var i = z._get([q.toolTipFormatSettings, l.toolTipFormatSettings, c.toolTipFormatSettings, z.toolTipFormatSettings]);
        var v = z._get([q.toolTipFormatFunction, l.toolTipFormatFunction, c.toolTipFormatFunction, z.toolTipFormatFunction]);
        var o = z._getColors(J, C, f);
        var w = z._getDataValue(f, m.dataField, J);
        if (m.dataField == undefined || m.dataField == "") {
            w = f
        }
        if (m.type == "date") {
            w = z._castAsDate(w, (i ? i.dateFormat : undefined) || m.dateFormat)
        }
        var u = "";
        if (a.isFunction(v)) {
            var A = {};
            var E = 0;
            for (var d in q) {
                if (d.indexOf("dataField") == 0) {
                    A[d.substring(9, d.length).toLowerCase()] = z._getDataValue(f, q[d], J);
                    E++
                }
            }
            if (E == 0) {
                A = z._getDataValue(f, undefined, J)
            } else {
                if (E == 1) {
                    A = A[""]
                }
            }
            u = v(A, f, q, l, w, m)
        } else {
            u = z._getFormattedValue(J, C, f, i, v);
            var e = this._getAxisSettings(m);
            var O = e.toolTipFormatSettings;
            var h = e.toolTipFormatFunction;
            if (!h && !O && m.type == "date") {
                h = this._getDefaultDTFormatFn(m.baseUnit || "day")
            }
            var N = z._formatValue(w, O, h, J, C, f);
            if (!z._isPieGroup(J)) {
                var s = (m.displayText || m.dataField || "");
                if (s.length > 0) {
                    u = s + ": " + N + "<br>" + u
                } else {
                    u = N + "<br>" + u
                }
            } else {
                w = z._getDataValue(f, q.displayText || q.dataField, J);
                N = z._formatValue(w, O, h, J, C, f);
                u = N + ": " + u
            }
        }
        if (!z._ttEl) {
            z._ttEl = {}
        }
        z._ttEl.sidx = C;
        z._ttEl.gidx = J;
        z._ttEl.iidx = f;
        rect = z.renderer.getRect();
        if (j) {
            var G = a.jqx._ptrnd(z._pointMarker.x);
            var F = a.jqx._ptrnd(z._pointMarker.y);
            if (z._ttEl.vLine && z._ttEl.hLine) {
                z.renderer.attr(z._ttEl.vLine, {x1: G, x2: G});
                z.renderer.attr(z._ttEl.hLine, {y1: F, y2: F})
            } else {
                var D = z.crosshairsColor || z._defaultLineColor;
                z._ttEl.vLine = z.renderer.line(G, z._plotRect.y, G, z._plotRect.y + z._plotRect.height, {stroke: D, "stroke-width": z.crosshairsLineWidth || 1, "stroke-dasharray": z.crosshairsDashStyle || ""});
                z._ttEl.hLine = z.renderer.line(z._plotRect.x, F, z._plotRect.x + z._plotRect.width, F, {stroke: D, "stroke-width": z.crosshairsLineWidth || 1, "stroke-dasharray": z.crosshairsDashStyle || ""})
            }
        }
        if (!k && z.showToolTips != false) {
            var H = q.toolTipClass || l.toolTipClass || this.toThemeProperty("jqx-chart-tooltip-text", null);
            var L = q.toolTipBackground || l.toolTipBackground || "#FFFFFF";
            var M = q.toolTipLineColor || l.toolTipLineColor || o.lineColor;
            var B = this.getItemCoord(J, C, f);
            var I = 0;
            if (z._pointMarker && z._pointMarker.element) {
                I = q.symbolSizeSelected;
                if (isNaN(I)) {
                    I = q.symbolSize
                }
                if (isNaN(I) || I > 50 || I < 0) {
                    I = l.symbolSize
                }
                if (isNaN(I) || I > 50 || I < 0) {
                    I = 6
                }
            }
            z._createTooltip(B, l, u, {css: H, fill: L, stroke: M, symbolSize: I})
        }
    }, _fitTooltip: function (d, k, l, m, f) {
        var e = {};
        var c = 2 + f / 2;
        var h = 7;
        if (k.x - l.width - h - c > d.x && k.y + k.height / 2 - l.height / 2 > d.y && k.y + k.height / 2 + l.height / 2 < d.y + d.height) {
            e.left = {arrowLocation: "right", x: k.x - l.width - h - c, y: k.y + k.height / 2 - l.height / 2, width: l.width + h, height: l.height}
        }
        if (k.x + k.width + l.width + h + c < d.x + d.width && k.y + k.height / 2 - l.height / 2 > d.y && k.y + k.height / 2 + l.height / 2 < d.y + d.height) {
            e.right = {arrowLocation: "left", x: k.x + k.width + c, y: k.y + k.height / 2 - l.height / 2, width: l.width + h, height: l.height}
        }
        if (k.y - l.height - c - h > d.y && k.x + k.width / 2 - l.width / 2 > d.x && k.x + k.width / 2 + l.width / 2 < d.x + d.width) {
            e.top = {arrowLocation: "bottom", x: k.x + k.width / 2 - l.width / 2, y: k.y - l.height - c - h, width: l.width, height: l.height + h}
        }
        if (k.y + k.height + l.height + h + c < d.y + d.height && k.x + k.width / 2 - l.width / 2 > d.x && k.x + k.width / 2 + l.width / 2 < d.x + d.width) {
            e.bottom = {arrowLocation: "top", x: k.x + k.width / 2 - l.width / 2, y: k.y + k.height + c, width: l.width, height: l.height + h}
        }
        if (k.width > k.height || ((m.type.indexOf("stackedcolumn") != -1 || m.type.indexOf("stackedwaterfall") != -1) && m.orientation != "horizontal")) {
            if (e.left) {
                return e.left
            }
            if (e.right) {
                return e.right
            }
        } else {
            if (e.top) {
                return e.top
            }
            if (e.bottom) {
                return e.bottom
            }
        }
        for (var j in e) {
            if (e[j]) {
                return e[j]
            }
        }
        return{arrowLocation: ""}
    }, _createTooltip: function (E, k, w, z) {
        var q = this;
        var v = k.type;
        var C = false;
        var D = q._ttEl.box;
        if (!D) {
            C = true;
            D = q._ttEl.box = document.createElement("div");
            D.style.position = "absolute";
            D.style.cursor = "default";
            a(D).css("z-index", 9999999);
            a(document.body).append(D);
            var c = document.createElement("div");
            c.id = "arrowOuterDiv";
            c.style.width = "0px";
            c.style.height = "0px";
            c.style.position = "absolute";
            a(h).css("z-index", 9999999 + 1);
            var h = document.createElement("div");
            h.id = "arrowInnerDiv";
            h.style.width = "0px";
            h.style.height = "0px";
            h.style.position = "absolute";
            var u = document.createElement("div");
            u.id = "contentDiv";
            u.style.position = "absolute";
            a(u).addClass("jqx-rc-all jqx-button");
            a(u).appendTo(a(D));
            a(c).appendTo(a(D));
            a(h).appendTo(a(D));
            a(h).css("z-index", 9999999 + 2)
        }
        if (!w || w.length == 0) {
            a(D).fadeTo(0, 0);
            return
        }
        u = a(D).find("#contentDiv")[0];
        c = a(D).find("#arrowOuterDiv")[0];
        h = a(D).find("#arrowInnerDiv")[0];
        u.style.backgroundColor = z.fill;
        u.style.borderColor = z.stroke;
        var m = "<span class='" + z.css + "'>" + w + "</span>";
        a(u).html(m);
        var p = this._measureHtml(m, "jqx-rc-all jqx-button");
        rect = q._plotRect;
        if (p.width > rect.width || p.height > rect.height) {
            return
        }
        var o = {width: p.width, height: p.height};
        arrowLocation = "";
        var B = 5;
        var s = 7;
        var t = q._isColumnType(v);
        x = Math.max(E.x, rect.x);
        y = Math.max(E.y, rect.y);
        if (q.toolTipAlignment == "dataPoint") {
            if (v.indexOf("pie") != -1 || v.indexOf("donut") != -1) {
                var l = (E.fromAngle + E.toAngle) / 2;
                l = l * (Math.PI / 180);
                var f = (!isNaN(E.innerRadius) && E.innerRadius > 0) ? (E.innerRadius + E.outerRadius) / 2 : E.outerRadius * 0.75;
                x = E.x = E.center.x + Math.cos(l) * f;
                y = E.y = E.center.y - Math.sin(l) * f;
                E.width = E.height = 1
            } else {
                if (t && (k.polar || k.spider)) {
                    E.width = E.height = 1
                }
            }
            var A = this._fitTooltip(this._plotRect, E, o, k, z.symbolSize);
            if (A.arrowLocation != "") {
                arrowLocation = A.arrowLocation;
                x = A.x;
                y = A.y;
                o.width = A.width;
                o.height = A.height
            }
        } else {
            arrowLocation = ""
        }
        if (arrowLocation == "top" || arrowLocation == "bottom") {
            o.height += s;
            x -= s / 2;
            if (arrowLocation == "bottom") {
                y -= s
            }
        } else {
            if (arrowLocation == "left" || arrowLocation == "right") {
                o.width += s;
                y -= s / 2;
                if (arrowLocation == "right") {
                    x -= s
                }
            }
        }
        if (x + o.width > rect.x + rect.width) {
            arrowLocation = "";
            x = rect.x + rect.width - o.width
        }
        if (y + o.height > rect.y + rect.height) {
            arrowLocation = "";
            y = rect.y + rect.height - o.height
        }
        var i = {x: 0, y: 0}, e = {x: 0, y: 0};
        a(u).css({width: p.width, height: p.height, left: 0, top: 0});
        c.style["margin-top"] = c.style["margin-left"] = 0;
        h.style["margin-top"] = h.style["margin-left"] = 0;
        u.style["margin-top"] = u.style["margin-left"] = 0;
        var j = s + "px solid";
        var d = s + "px solid transparent";
        switch (arrowLocation) {
            case"left":
                i = {x: 0, y: (p.height - s) / 2};
                contentPostion = {x: s, y: 0};
                u.style["margin-left"] = s + "px";
                c.style["margin-left"] = 0 + "px";
                c.style["margin-top"] = i.y + "px";
                c.style["border-left"] = "";
                c.style["border-right"] = j + " " + z.stroke;
                c.style["border-top"] = d;
                c.style["border-bottom"] = d;
                h.style["margin-left"] = 1 + "px";
                h.style["margin-top"] = i.y + "px";
                h.style["border-left"] = "";
                h.style["border-right"] = j + " " + z.fill;
                h.style["border-top"] = d;
                h.style["border-bottom"] = d;
                break;
            case"right":
                i = {x: o.width - s, y: (p.height - s) / 2};
                contentPostion = {x: 0, y: 0};
                c.style["margin-left"] = i.x + "px";
                c.style["margin-top"] = i.y + "px";
                c.style["border-left"] = j + " " + z.stroke;
                c.style["border-right"] = "";
                c.style["border-top"] = d;
                c.style["border-bottom"] = d;
                h.style["margin-left"] = i.x - 1 + "px";
                h.style["margin-top"] = i.y + "px";
                h.style["border-left"] = j + " " + z.fill;
                h.style["border-right"] = "";
                h.style["border-top"] = d;
                h.style["border-bottom"] = d;
                break;
            case"top":
                i = {x: o.width / 2 - s / 2, y: 0};
                contentPostion = {x: 0, y: s};
                u.style["margin-top"] = contentPostion.y + "px";
                c.style["margin-left"] = i.x + "px";
                c.style["border-top"] = "";
                c.style["border-bottom"] = j + " " + z.stroke;
                c.style["border-left"] = d;
                c.style["border-right"] = d;
                h.style["margin-left"] = i.x + "px";
                h.style["margin-top"] = 1 + "px";
                h.style["border-top"] = "";
                h.style["border-bottom"] = j + " " + z.fill;
                h.style["border-left"] = d;
                h.style["border-right"] = d;
                break;
            case"bottom":
                i = {x: o.width / 2 - s / 2, y: o.height - s};
                contentPostion = {x: 0, y: 0};
                c.style["margin-left"] = i.x + "px";
                c.style["margin-top"] = i.y + "px";
                c.style["border-top"] = j + " " + z.stroke;
                c.style["border-bottom"] = "";
                c.style["border-left"] = d;
                c.style["border-right"] = d;
                h.style["margin-left"] = i.x + "px";
                h.style["margin-top"] = i.y - 1 + "px";
                h.style["border-top"] = j + " " + z.fill;
                h.style["border-bottom"] = "";
                h.style["border-left"] = d;
                h.style["border-right"] = d;
                break
        }
        if (arrowLocation == "") {
            a(c).hide();
            a(h).hide()
        } else {
            a(c).show();
            a(h).show()
        }
        a(D).css({width: o.width + "px", height: o.height + "px"});
        var n = q.host.coord();
        if (C) {
            a(D).fadeOut(0, 0);
            D.style.left = x + n.left + "px";
            D.style.top = y + n.top + "px"
        }
        a(D).clearQueue();
        a(D).animate({left: x + n.left, top: y + n.top, opacity: 1}, q.toolTipMoveDuration, "easeInOutCirc");
        a(D).fadeTo(400, 1)
    }, _measureHtml: function (d, c) {
        var f = this._measureDiv;
        if (!f) {
            this._measureDiv = f = document.createElement("div");
            f.style.position = "absolute";
            f.style.cursor = "default";
            f.style.overflow = "hidden";
            f.style.display = "none";
            a(f).addClass(c);
            this.host.append(f)
        }
        a(f).html(d);
        var e = {width: a(f).width() + 2, height: a(f).height() + 2};
        if (a.jqx.browser && a.jqx.browser.mozilla) {
            e.height += 3
        }
        return e
    }, _hideToolTip: function (c) {
        if (!this._ttEl) {
            return
        }
        if (this._ttEl.box) {
            if (c == 0) {
                a(this._ttEl.box).hide()
            } else {
                a(this._ttEl.box).fadeOut()
            }
        }
        this._hideCrosshairs();
        this._ttEl.gidx = undefined
    }, _hideCrosshairs: function () {
        if (!this._ttEl) {
            return
        }
        if (this._ttEl.vLine) {
            this.renderer.removeElement(this._ttEl.vLine);
            this._ttEl.vLine = undefined
        }
        if (this._ttEl.hLine) {
            this.renderer.removeElement(this._ttEl.hLine);
            this._ttEl.hLine = undefined
        }
    }, _get: function (c) {
        return a.jqx.getByPriority(c)
    }, _getAxisSettings: function (h) {
        if (!h) {
            return{}
        }
        var n = this;
        var m = h.gridLines || {};
        var p = {visible: (h.showGridLines != false && m.visible != false), color: n._get([m.color, h.gridLinesColor, n._defaultLineColor]), unitInterval: n._get([m.unitInterval, m.interval, h.gridLinesInterval]), step: n._get([m.step, h.gridLinesStep]), dashStyle: n._get([m.dashStyle, h.gridLinesDashStyle]), width: n._get([m.lineWidth, 1]), offsets: [], alternatingBackgroundColor: h.alternatingBackgroundColor, alternatingBackgroundColor2: h.alternatingBackgroundColor2, alternatingBackgroundOpacity: h.alternatingBackgroundOpacity};
        var e = h.tickMarks || {};
        var j = {visible: (h.showTickMarks != false && e.visible != false), color: n._get([e.color, h.tickMarksColor, n._defaultLineColor]), unitInterval: n._get([e.unitInterval, e.interval, h.tickMarksInterval]), step: n._get([e.step, h.tickMarksStep]), dashStyle: n._get([e.dashStyle, h.tickMarksDashStyle]), width: n._get([e.lineWidth, 1]), size: n._get([e.size, 4]), offsets: []};
        var f = h.title || {};
        var d = {visible: n._get([f.visible, true]), text: n._get([h.description, f.text]), style: n._get([h.descriptionClass, f["class"], n.toThemeProperty("jqx-chart-axis-description", null)]), halign: n._get([h.horizontalDescriptionAlignment, f.horizontalAlignment, "center"]), valign: n._get([h.verticalDescriptionAlignment, f.verticalAlignment, "center"]), angle: 0, rotationPoint: n._get([f.rotationPoint, "centercenter"]), offset: n._get([f.offset, {x: 0, y: 0}])};
        var k = h.line || {};
        var c = {visible: n._get([k.visible, true]), color: n._get([k.color, p.color, n._defaultLineColor]), dashStyle: n._get([k.dashStyle, p.dashStyle, ""]), width: n._get([k.lineWidth, 1])};
        var l = h.padding || {};
        l = {left: l.left || 0, right: l.right || 0, top: l.top || 0, bottom: l.bottom || 0};
        var i = this._getAxisLabelsSettings(h);
        var o = {visible: this._get([h.visible, h.showValueAxis, h.showXAxis, h.showCategoryAxis, true]), customDraw: this._get([h.customDraw, false]), gridLines: p, tickMarks: j, line: c, title: d, labels: i, padding: l, toolTipFormatFunction: this._get([h.toolTipFormatFunction, h.formatFunction, i.formatFunction]), toolTipFormatSettings: this._get([h.toolTipFormatSettings, h.formatSettings, i.formatSettings])};
        return o
    }, _getAxisLabelsSettings: function (e) {
        var c = this;
        var f = e.labels || {};
        var d = {visible: c._get([e.showLabels, f.visible, true]), unitInterval: c._get([f.unitInterval, f.interval, e.labelsInterval]), step: c._get([f.step, e.labelsStep]), angle: c._get([e.textRotationAngle, f.angle, 0]), style: c._get([e["class"], f["class"], c.toThemeProperty("jqx-chart-axis-text", null)]), halign: c._get([e.horizontalTextAlignment, f.horizontalAlignment, "center"]), valign: c._get([e.verticalTextAlignment, f.verticalAlignment, "center"]), textRotationPoint: c._get([e.textRotationPoint, f.rotationPoint, "auto"]), textOffset: c._get([e.textOffset, f.offset, {x: 0, y: 0}]), autoRotate: c._get([e.labelsAutoRotate, f.autoRotate, false]), formatSettings: c._get([e.formatSettings, f.formatSettings, undefined]), formatFunction: c._get([e.formatFunction, f.formatFunction, undefined])};
        return d
    }, _getLabelsSettings: function (q, m, j, v) {
        var k = this.seriesGroups[q];
        var u = k.series[m];
        var n = isNaN(j) ? undefined : this._getDataValue(j, u.dataField, q);
        var l = v || ["Visible", "Offset", "Angle", "HorizontalAlignment", "VerticalAlignment", "Class", "BackgroundColor", "BorderColor", "BorderOpacity", "Padding", "Opacity", "BackgroundOpacity", "LinesAngles", "LinesEnabled", "AutoRotate", "Radius"];
        var t = {};
        for (var h = 0; h < l.length; h++) {
            var o = l[h];
            var d = "labels" + o;
            var c = "label" + o;
            var p = o.substring(0, 1).toLowerCase() + o.substring(1);
            var e = undefined;
            if (k.labels && typeof(k.labels) == "object") {
                e = k.labels[p]
            }
            if (u.labels && typeof(u.labels) == "object" && undefined != u.labels[p]) {
                e = u.labels[p]
            }
            e = this._get([u[d], u[c], e, k[d], k[c]]);
            if (a.isFunction(e)) {
                t[p] = e(n, j, u, k)
            } else {
                t[p] = e
            }
        }
        t["class"] = t["class"] || this.toThemeProperty("jqx-chart-label-text", null);
        t.visible = this._get([t.visible, u.showLabels, k.showLabels, u.labels != undefined ? true : undefined, k.labels != undefined ? true : undefined]);
        var f = t.padding || 1;
        t.padding = {left: this._get([f.left, isNaN(f) ? 1 : f]), right: this._get([f.right, isNaN(f) ? 1 : f]), top: this._get([f.top, isNaN(f) ? 1 : f]), bottom: this._get([f.bottom, isNaN(f) ? 1 : f])};
        return t
    }, _showLabel: function (L, G, i, c, z, k, f, m, d, H) {
        var o = this.seriesGroups[L];
        var u = o.series[G];
        var E = {width: 0, height: 0}, t;
        if (isNaN(i)) {
            return
        }
        var K = this._getLabelsSettings(L, G, i);
        if (!K.visible) {
            return f ? E : undefined
        }
        if (c.width < 0 || c.height < 0) {
            return f ? E : undefined
        }
        var j = K.angle;
        if (!isNaN(H)) {
            j = H
        }
        var l = K.offset || {};
        var I = {x: l.x, y: l.y};
        if (isNaN(I.x)) {
            I.x = 0
        }
        if (isNaN(I.y)) {
            I.y = 0
        }
        z = z || K.horizontalAlignment || "center";
        k = k || K.verticalAlignment || "center";
        var B = this._getFormattedValue(L, G, i, undefined, undefined, true);
        var v = c.width;
        var J = c.height;
        if (m == true && z != "center") {
            z = z == "right" ? "left" : "right"
        }
        if (d == true && k != "center" && k != "middle") {
            k = k == "top" ? "bottom" : "top";
            I.y *= -1
        }
        E = this.renderer.measureText(B, j, {"class": K["class"]});
        if (f) {
            return E
        }
        var s = 0, p = 0;
        if (v > 0) {
            if (z == "" || z == "center") {
                s += (v - E.width) / 2
            } else {
                if (z == "right") {
                    s += (v - E.width)
                }
            }
        }
        if (J > 0) {
            if (k == "" || k == "center") {
                p += (J - E.height) / 2
            } else {
                if (k == "bottom") {
                    p += (J - E.height)
                }
            }
        }
        s += c.x + I.x;
        p += c.y + I.y;
        var q = this._plotRect;
        if (s <= q.x) {
            s = q.x + 2
        }
        if (p <= q.y) {
            p = q.y + 2
        }
        var n = {width: Math.max(E.width, 1), height: Math.max(E.height, 1)};
        if (p + n.height >= q.y + q.height) {
            p = q.y + q.height - (t ? (n.height + t.height) / 2 : n.height) - 2
        }
        if (s + n.width >= q.x + q.width) {
            s = q.x + q.width - n.width - 2
        }
        var e;
        var D = K.backgroundColor;
        var F = K.borderColor;
        if (D || F) {
            e = this.renderer.beginGroup();
            var C = K.padding;
            var c = this.renderer.rect(s - C.left, p - C.top, E.width + C.left + C.right, E.height + C.bottom + C.bottom, {fill: D || "transparent", "fill-opacity": K.backgroundOpacity || 1, stroke: F || "transparent", "stroke-opacity": K.borderOpacity, "stroke-width": 1})
        }
        var A = this.renderer.text(B, s, p, E.width, E.height, j, {"class": K["class"], opacity: K.opacity || 1}, false, "center", "center");
        if (this._isVML) {
            this.renderer.removeElement(A);
            this.renderer.getContainer()[0].appendChild(A)
        }
        if (e) {
            this.renderer.endGroup()
        }
        return e || A
    }, _getAnimProps: function (k, h) {
        var f = this.seriesGroups[k];
        var d = !isNaN(h) ? f.series[h] : undefined;
        var c = this.enableAnimations == true;
        if (f.enableAnimations) {
            c = f.enableAnimations == true
        }
        if (d && d.enableAnimations) {
            c = d.enableAnimations == true
        }
        var j = this.animationDuration;
        if (isNaN(j)) {
            j = 1000
        }
        var e = f.animationDuration;
        if (!isNaN(e)) {
            j = e
        }
        if (d) {
            var i = d.animationDuration;
            if (!isNaN(i)) {
                j = i
            }
        }
        if (j > 5000) {
            j = 1000
        }
        return{enabled: c, duration: j}
    }, _isColorTransition: function (h, e, f, i) {
        if (i - 1 < f.xoffsets.first) {
            return false
        }
        var c = this._getColors(h, e, i, this._getGroupGradientType(h));
        var d = this._getColors(h, e, i - 1, this._getGroupGradientType(h));
        return(c.fillColor != d.fillColor)
    }, _renderLineSeries: function (m, T) {
        var K = this.seriesGroups[m];
        if (!K.series || K.series.length == 0) {
            return
        }
        var v = K.type.indexOf("area") != -1;
        var N = K.type.indexOf("stacked") != -1;
        var f = N && K.type.indexOf("100") != -1;
        var ah = K.type.indexOf("spline") != -1;
        var w = K.type.indexOf("step") != -1;
        var R = K.type.indexOf("range") != -1;
        var ai = K.polar == true || K.spider == true;
        if (ai) {
            w = false
        }
        if (w && ah) {
            return
        }
        var D = this._getDataLen(m);
        var af = T.width / D;
        var am = K.orientation == "horizontal";
        var F = this._getXAxis(m).flip == true;
        var C = T;
        if (am) {
            C = {x: T.y, y: T.x, width: T.height, height: T.width}
        }
        var G = this._calcGroupOffsets(m, C);
        if (!G || G.xoffsets.length == 0) {
            return
        }
        if (!this._linesRenderInfo) {
            this._linesRenderInfo = {}
        }
        this._linesRenderInfo[m] = {};
        for (var p = K.series.length - 1; p >= 0; p--) {
            var j = this._getSerieSettings(m, p);
            var ak = {groupIndex: m, serieIndex: p, swapXY: am, isArea: v, isSpline: ah, isRange: R, isPolar: ai, settings: j, segments: [], pointsLength: 0};
            var l = this._isSerieVisible(m, p);
            if (!l) {
                this._linesRenderInfo[m][p] = ak;
                continue
            }
            var M = K.series[p];
            if (M.customDraw) {
                continue
            }
            var B = a.isFunction(M.colorFunction);
            var X = G.xoffsets.first;
            var J = X;
            var Q = this._getColors(m, p, NaN, this._getGroupGradientType(m));
            var ae = false;
            var z;
            do {
                var Z = [];
                var W = [];
                var u = [];
                var S = -1;
                var s = 0, q = 0;
                var U = NaN;
                var H = NaN;
                var al = NaN;
                if (G.xoffsets.length < 1) {
                    continue
                }
                var V = this._getAnimProps(m, p);
                var O = V.enabled && !this._isToggleRefresh && G.xoffsets.length < 10000 && this._isVML != true ? V.duration : 0;
                var A = X;
                z = false;
                var e = this._getColors(m, p, X, this._getGroupGradientType(m));
                for (var ag = X; ag <= G.xoffsets.last; ag++) {
                    X = ag;
                    var aa = G.xoffsets.data[ag];
                    var Y = G.xoffsets.xvalues[ag];
                    if (isNaN(aa)) {
                        continue
                    }
                    aa = Math.max(aa, 1);
                    s = aa;
                    q = G.offsets[p][ag].to;
                    var ad = G.offsets[p][ag].from;
                    if (isNaN(q) || isNaN(ad)) {
                        if (M.emptyPointsDisplay == "connect") {
                            continue
                        } else {
                            if (M.emptyPointsDisplay == "zero") {
                                if (isNaN(q)) {
                                    q = G.baseOffset
                                }
                                if (isNaN(ad)) {
                                    ad = G.baseOffset
                                }
                            } else {
                                z = true;
                                break
                            }
                        }
                    }
                    if (B && this._isColorTransition(m, p, G, X)) {
                        if (Z.length > 1) {
                            X--;
                            break
                        }
                    }
                    var d = this._elementRenderInfo;
                    if (d && d.length > m && d[m].series.length > p) {
                        var h = d[m].series[p][Y];
                        var al = a.jqx._ptrnd(h ? h.to : undefined);
                        var L = a.jqx._ptrnd(C.x + (h ? h.xoffset : undefined));
                        u.push(am ? {y: L, x: al, index: ag} : {x: L, y: al, index: ag})
                    }
                    J = ag;
                    if (j.stroke < 2) {
                        if (q - C.y <= 1) {
                            q = C.y + 1
                        }
                        if (ad - C.y <= 1) {
                            ad = C.y + 1
                        }
                        if (C.y + C.height - q <= 1) {
                            q = C.y + C.height - 1
                        }
                        if (C.y + C.height - q <= 1) {
                            ad = C.y + C.height - 1
                        }
                    }
                    if (!v && f) {
                        if (q <= C.y) {
                            q = C.y + 1
                        }
                        if (q >= C.y + C.height) {
                            q = C.y + C.height - 1
                        }
                        if (ad <= C.y) {
                            ad = C.y + 1
                        }
                        if (ad >= C.y + C.height) {
                            ad = C.y + C.height - 1
                        }
                    }
                    aa = Math.max(aa, 1);
                    s = aa + C.x;
                    if (K.skipOverlappingPoints == true && !isNaN(U) && Math.abs(U - s) <= 1) {
                        continue
                    }
                    if (w && !isNaN(U) && !isNaN(H)) {
                        if (H != q) {
                            Z.push(am ? {y: s, x: a.jqx._ptrnd(H)} : {x: s, y: a.jqx._ptrnd(H)})
                        }
                    }
                    Z.push(am ? {y: s, x: a.jqx._ptrnd(q), index: ag} : {x: s, y: a.jqx._ptrnd(q), index: ag});
                    W.push(am ? {y: s, x: a.jqx._ptrnd(ad), index: ag} : {x: s, y: a.jqx._ptrnd(ad), index: ag});
                    U = s;
                    H = q;
                    if (isNaN(al)) {
                        al = q
                    }
                }
                if (Z.length == 0) {
                    X++;
                    continue
                }
                var I = Z[Z.length - 1].index;
                if (B) {
                    Q = this._getColors(m, p, I, this._getGroupGradientType(m))
                }
                var n = C.x + G.xoffsets.data[A];
                var ac = C.x + G.xoffsets.data[J];
                if (v && K.alignEndPointsWithIntervals == true) {
                    var E = F ? -1 : 1;
                    if (n > C.x) {
                        n = C.x
                    }
                    if (ac < C.x + C.width) {
                        ac = C.x + C.width
                    }
                    if (F) {
                        var ab = n;
                        n = ac;
                        ac = ab
                    }
                }
                ac = a.jqx._ptrnd(ac);
                n = a.jqx._ptrnd(n);
                var o = G.baseOffset;
                al = a.jqx._ptrnd(al);
                var k = a.jqx._ptrnd(q) || o;
                if (R) {
                    Z = Z.concat(W.reverse())
                }
                ak.pointsLength += Z.length;
                var c = {lastItemIndex: I, colorSettings: Q, pointsArray: Z, pointsStart: u, left: n, right: ac, pyStart: al, pyEnd: k, yBase: o, labelElements: [], symbolElements: []};
                ak.segments.push(c)
            } while (X < G.xoffsets.length - 1 || z);
            this._linesRenderInfo[m][p] = ak
        }
        var P = this._linesRenderInfo[m];
        var aj = [];
        for (var ag in P) {
            aj.push(P[ag])
        }
        aj = aj.sort(function (an, i) {
            return an.serieIndex - i.serieIndex
        });
        if (v && N) {
            aj.reverse()
        }
        for (var ag = 0; ag < aj.length; ag++) {
            var ak = aj[ag];
            this._animateLine(ak, O == 0 ? 1 : 0);
            var t = this;
            this._enqueueAnimation("series", undefined, undefined, O, function (an, i, ao) {
                t._animateLine(i, ao)
            }, ak)
        }
    }, _animateLine: function (A, c) {
        var E = A.settings;
        var h = A.groupIndex;
        var j = A.serieIndex;
        var l = this.seriesGroups[h];
        var u = l.series[j];
        var z = this._getSymbol(h, j);
        var q = this._getLabelsSettings(h, j, NaN, ["Visible"]).visible;
        var s = 0;
        for (var e = 0; e < A.segments.length; e++) {
            var w = A.segments[e];
            var B = this._calculateLine(h, A.pointsLength, s, w.pointsArray, w.pointsStart, w.yBase, c, A.isArea, A.swapXY);
            s += w.pointsArray.length;
            if (B == "") {
                continue
            }
            var t = B.split(" ");
            var C = t.length;
            var k = B;
            if (k != "") {
                k = this._buildLineCmd(B, A.isRange, w.left, w.right, w.pyStart, w.pyEnd, w.yBase, A.isArea, A.isPolar, A.isSpline, A.swapXY)
            } else {
                k = "M 0 0"
            }
            var n = w.colorSettings;
            if (!w.pathElement) {
                w.pathElement = this.renderer.path(k, {"stroke-width": E.stroke, stroke: n.lineColor, "stroke-opacity": E.opacity, "fill-opacity": E.opacity, "stroke-dasharray": E.dashStyle, fill: A.isArea ? n.fillColor : "none"});
                this._installHandlers(w.pathElement, "path", h, j, w.lastItemIndex)
            } else {
                this.renderer.attr(w.pathElement, {d: k})
            }
            if (w.labelElements) {
                for (var D = 0; D < w.labelElements.length; D++) {
                    this.renderer.removeElement(w.labelElements[D])
                }
                w.labelElements = []
            }
            if (w.symbolElements) {
                for (var D = 0; D < w.symbolElements.length; D++) {
                    this.renderer.removeElement(w.symbolElements[D])
                }
                w.symbolElements = []
            }
            if (w.pointsArray.length == t.length) {
                if (z != "none" || q) {
                    var F = u.symbolSize;
                    for (var D = 0; D < t.length; D++) {
                        var v = t[D].split(",");
                        v = {x: parseFloat(v[0]), y: parseFloat(v[1])};
                        if (z != "none") {
                            var p = this._getColors(h, j, w.pointsArray[D].index, this._getGroupGradientType(h));
                            var f = this._drawSymbol(z, v.x, v.y, p.fillColorSymbol, E.opacity, p.lineColorSymbol, E.opacity, 1, undefined, F);
                            w.symbolElements.push(f)
                        }
                        if (q) {
                            var m = (D > 0 ? t[D - 1] : t[D]).split(",");
                            m = {x: parseFloat(m[0]), y: parseFloat(m[1])};
                            var o = (D < t.length - 1 ? t[D + 1] : t[D]).split(",");
                            o = {x: parseFloat(o[0]), y: parseFloat(o[1])};
                            v = this._adjustLineLabelPosition(h, j, w.pointsArray[D].index, v, m, o);
                            if (v) {
                                var d = this._showLabel(h, j, w.pointsArray[D].index, {x: v.x, y: v.y, width: 0, height: 0});
                                w.labelElements.push(d)
                            }
                        }
                    }
                }
            }
            if (c == 1 && z != "none") {
                for (var D = 0; D < w.symbolElements.length; D++) {
                    if (isNaN(w.pointsArray[D].index)) {
                        continue
                    }
                    this._installHandlers(w.symbolElements[D], "symbol", h, j, w.pointsArray[D].index)
                }
            }
        }
    }, _adjustLineLabelPosition: function (k, i, e, j, h, f) {
        var c = this._showLabel(k, i, e, {width: 0, height: 0}, "", "", true);
        if (!c) {
            return
        }
        var d = {x: j.x - c.width / 2, y: 0};
        d.y = j.y - 1.5 * c.height;
        return d
    }, _calculateLine: function (j, z, q, p, o, h, f, B, d) {
        var A = this.seriesGroups[j];
        var n;
        if (A.polar == true || A.spider == true) {
            n = this._getPolarAxisCoords(j, this._plotRect)
        }
        var u = "";
        var v = p.length;
        if (!B && o.length == 0) {
            var t = z * f;
            v = t - q
        }
        var k = NaN;
        for (var w = 0; w < v + 1 && w < p.length; w++) {
            if (w > 0) {
                u += " "
            }
            var l = p[w].y;
            var m = p[w].x;
            var c = !B ? l : h;
            var e = m;
            if (o && o.length > w) {
                c = o[w].y;
                e = o[w].x;
                if (isNaN(c) || isNaN(e)) {
                    c = l;
                    e = m
                }
            }
            k = e;
            if (v <= p.length && w > 0 && w == v) {
                e = p[w - 1].x;
                c = p[w - 1].y
            }
            if (d) {
                m = a.jqx._ptrnd((m - c) * (B ? f : 1) + c);
                l = a.jqx._ptrnd(l)
            } else {
                m = a.jqx._ptrnd((m - e) * f + e);
                l = a.jqx._ptrnd((l - c) * f + c)
            }
            if (n) {
                var s = this._toPolarCoord(n, this._plotRect, m, l);
                m = s.x;
                l = s.y
            }
            u += m + "," + l
        }
        return u
    }, _buildLineCmd: function (m, k, h, s, p, c, t, o, u, e, l) {
        var f = m;
        var d = l ? t + "," + h : h + "," + t;
        var j = l ? t + "," + s : s + "," + t;
        if (o && !u && !k) {
            f = d + " " + m + " " + j
        }
        if (e) {
            f = this._getBezierPoints(f)
        }
        var n = f.split(" ");
        if (n.length == 0) {
            return""
        }
        if (n.length == 1) {
            var q = n[0].split(",");
            return"M " + n[0] + " L" + (parseFloat(q[0]) + 1) + "," + (parseFloat(q[1]) + 1)
        }
        var i = n[0].replace("M", "");
        if (o && !u) {
            if (!k) {
                f = "M " + d + " L " + i + " " + f
            } else {
                f = "M " + i + " L " + i + (e ? "" : (" L " + i + " ")) + f
            }
        } else {
            if (!e) {
                f = "M " + i + " L " + i + " " + f
            }
        }
        if (u || k) {
            f += " Z"
        }
        return f
    }, _getSerieSettings: function (j, c) {
        var i = this.seriesGroups[j];
        var h = i.type.indexOf("area") != -1;
        var f = i.type.indexOf("line") != -1;
        var d = i.series[c];
        var l = d.dashStyle || i.dashStyle || "";
        var e = d.opacity || i.opacity;
        if (isNaN(e) || e < 0 || e > 1) {
            e = 1
        }
        var k = d.lineWidth;
        if (isNaN(k) && k != "auto") {
            k = i.lineWidth
        }
        if (k == "auto" || isNaN(k) || k < 0 || k > 15) {
            if (h) {
                k = 2
            } else {
                if (f) {
                    k = 3
                } else {
                    k = 1
                }
            }
        }
        return{stroke: k, opacity: e, dashStyle: l}
    }, _getColors: function (z, s, e, f, c) {
        var m = this.seriesGroups[z];
        var q = m.series[s];
        var d = this._get([q.useGradientColors, m.useGradientColors, m.useGradient, true]);
        var n = this._getSeriesColors(z, s, e);
        if (!n.fillColor) {
            n.fillColor = u;
            n.fillColorSelected = a.jqx.adjustColor(u, 1.1);
            n.fillColorAlt = a.jqx.adjustColor(u, 4);
            n.fillColorAltSelected = a.jqx.adjustColor(u, 3);
            n.lineColor = n.symbolColor = a.jqx.adjustColor(u, 0.9);
            n.lineColorSelected = n.symbolColorSelected = a.jqx.adjustColor(u, 0.9)
        }
        var k = [
            [0, 1.4],
            [100, 1]
        ];
        var h = [
            [0, 1],
            [25, 1.1],
            [50, 1.4],
            [100, 1]
        ];
        var p = [
            [0, 1.3],
            [90, 1.2],
            [100, 1]
        ];
        var l = NaN;
        if (!isNaN(c)) {
            l = c == 2 ? k : h
        }
        if (d) {
            var t = {};
            for (var v in n) {
                t[v] = n[v]
            }
            n = t;
            if (f == "verticalLinearGradient" || f == "horizontalLinearGradient") {
                var j = f == "verticalLinearGradient" ? l || k : l || h;
                var o = ["fillColor", "fillColorSelected", "fillColorAlt", "fillColorAltSelected"];
                for (var A in o) {
                    var u = n[o[A]];
                    if (u) {
                        n[o[A]] = this.renderer._toLinearGradient(u, f == "verticalLinearGradient", j)
                    }
                }
            } else {
                if (f == "radialGradient") {
                    var w;
                    var l = k;
                    if ((m.type == "pie" || m.type == "donut" || m.polar) && e != undefined && this._renderData[z] && this._renderData[z].offsets[s]) {
                        w = this._renderData[z].offsets[s][e];
                        l = p
                    }
                    n.fillColor = this.renderer._toRadialGradient(n.fillColor, l, w);
                    n.fillColorSelected = this.renderer._toRadialGradient(n.fillColorSelected, l, w)
                }
            }
        }
        return n
    }, _installHandlers: function (d, h, j, i, e) {
        if (!this.enableEvents) {
            return false
        }
        var k = this;
        var f = this.seriesGroups[j];
        var l = this.seriesGroups[j].series[i];
        var c = f.type.indexOf("line") != -1 || f.type.indexOf("area") != -1;
        if (!c) {
            this.renderer.addHandler(d, "mousemove", function (o) {
                var n = k._selected;
                if (n && n.isLineType && n.linesUnselectMode == "click" && !(n.group == j && n.series == i)) {
                    return
                }
                var m = o.pageX || o.clientX || o.screenX;
                var q = o.pageY || o.clientY || o.screenY;
                var p = k.host.offset();
                m -= p.left;
                q -= p.top;
                if (k._mouseX == m && k._mouseY == q) {
                    return
                }
                if (k._ttEl) {
                    if (k._ttEl.gidx == j && k._ttEl.sidx == i && k._ttEl.iidx == e) {
                        return
                    }
                }
                k._startTooltipTimer(j, i, e)
            });
            this.renderer.addHandler(d, "mouseout", function (n) {
                if (!isNaN(k._lastClickTs) && (new Date()).valueOf() - k._lastClickTs < 100) {
                    return
                }
                if (e != undefined) {
                    k._cancelTooltipTimer()
                }
                if (c) {
                    return
                }
                var m = k._selected;
                if (m && m.isLineType && m.linesUnselectMode == "click" && !(m.group == j && m.series == i)) {
                    return
                }
                k._unselect()
            })
        }
        this.renderer.addHandler(d, "mouseover", function (n) {
            var m = k._selected;
            if (m && m.isLineType && m.linesUnselectMode == "click" && !(m.group == j && m.series == i)) {
                return
            }
            k._select(d, h, j, i, e, e)
        });
        this.renderer.addHandler(d, "click", function (m) {
            clearTimeout(k._hostClickTimer);
            k._lastClickTs = (new Date()).valueOf();
            if (c && (h != "symbol" && h != "pointMarker")) {
                return
            }
            if (k._isColumnType(f.type)) {
                k._unselect()
            }
            if (isNaN(e)) {
                return
            }
            k._raiseItemEvent("click", f, l, e)
        })
    }, _getHorizontalOffset: function (C, u, l, k) {
        var d = this._plotRect;
        var j = this._getDataLen(C);
        if (j == 0) {
            return{index: undefined, value: l}
        }
        var q = this._calcGroupOffsets(C, this._plotRect);
        if (q.xoffsets.length == 0) {
            return{index: undefined, value: undefined}
        }
        var o = l;
        var n = k;
        var A = this.seriesGroups[C];
        var m;
        if (A.polar || A.spider) {
            m = this._getPolarAxisCoords(C, d)
        }
        var f = this._getXAxis(C).flip == true;
        var c, p, z, h;
        for (var v = q.xoffsets.first; v <= q.xoffsets.last; v++) {
            var w = q.xoffsets.data[v];
            var e = q.offsets[u][v].to;
            var s = 0;
            if (m) {
                var t = this._toPolarCoord(m, d, w + d.x, e);
                w = t.x;
                e = t.y;
                s = a.jqx._ptdist(o, n, w, e)
            } else {
                if (A.orientation == "horizontal") {
                    w += d.y;
                    var B = e;
                    e = w;
                    w = B;
                    s = a.jqx._ptdist(o, n, w, e)
                } else {
                    w += d.x;
                    s = Math.abs(o - w)
                }
            }
            if (isNaN(c) || c > s) {
                c = s;
                p = v;
                z = w;
                h = e
            }
        }
        return{index: p, value: q.xoffsets.data[p], polarAxisCoords: m, x: z, y: h}
    }, onmousemove: function (m, l) {
        if (this._mouseX == m && this._mouseY == l) {
            return
        }
        this._mouseX = m;
        this._mouseY = l;
        if (!this._selected) {
            return
        }
        var D = this._selected.group;
        var u = this._selected.series;
        var A = this.seriesGroups[D];
        var p = A.series[u];
        var c = this._plotRect;
        if (this.renderer) {
            c = this.renderer.getRect();
            c.x += 5;
            c.y += 5;
            c.width -= 10;
            c.height -= 10
        }
        if (m < c.x || m > c.x + c.width || l < c.y || l > c.y + c.height) {
            this._hideToolTip();
            this._unselect();
            return
        }
        var f = A.orientation == "horizontal";
        var c = this._plotRect;
        if (A.type.indexOf("line") != -1 || A.type.indexOf("area") != -1) {
            var j = this._getHorizontalOffset(D, this._selected.series, m, l);
            var z = j.index;
            if (z == undefined) {
                return
            }
            if (this._selected.item != z) {
                var t = this._linesRenderInfo[D][u].segments;
                var v = 0;
                while (z > t[v].lastItemIndex) {
                    v++;
                    if (v >= t.length) {
                        return
                    }
                }
                var d = t[v].pathElement;
                var E = t[v].lastItemIndex;
                this._unselect(false);
                this._select(d, "path", D, u, z, E)
            }
            var o = this._getSymbol(this._selected.group, this._selected.series);
            if (o == "none") {
                o = "circle"
            }
            var q = this._calcGroupOffsets(D, c);
            var e = q.offsets[this._selected.series][z].to;
            var w = e;
            if (A.type.indexOf("range") != -1) {
                w = q.offsets[this._selected.series][z].from
            }
            var n = f ? m : l;
            if (!isNaN(w) && Math.abs(n - w) < Math.abs(n - e)) {
                l = w
            } else {
                l = e
            }
            if (isNaN(l)) {
                return
            }
            m = j.value;
            if (f) {
                var B = m;
                m = l;
                l = B + c.y
            } else {
                m += c.x
            }
            if (j.polarAxisCoords) {
                m = j.x;
                l = j.y
            }
            l = a.jqx._ptrnd(l);
            m = a.jqx._ptrnd(m);
            if (this._pointMarker && this._pointMarker.element) {
                this.renderer.removeElement(this._pointMarker.element);
                this._pointMarker.element = undefined
            }
            if (isNaN(m) || isNaN(l)) {
                return
            }
            var k = this._getSeriesColors(D, u, z);
            var h = p.opacity;
            if (isNaN(h) || h < 0 || h > 1) {
                h = A.opacity
            }
            if (isNaN(h) || h < 0 || h > 1) {
                h = 1
            }
            var C = p.symbolSizeSelected;
            if (isNaN(C)) {
                C = p.symbolSize
            }
            if (isNaN(C) || C > 50 || C < 0) {
                C = A.symbolSize
            }
            if (isNaN(C) || C > 50 || C < 0) {
                C = 6
            }
            if (this.showToolTips || this.enableCrosshairs) {
                this._pointMarker = {type: o, x: m, y: l, gidx: D, sidx: u, iidx: z};
                this._pointMarker.element = this._drawSymbol(o, m, l, k.fillColorSymbolSelected, h, k.lineColorSymbolSelected, h, 1, undefined, C);
                this._installHandlers(this._pointMarker.element, "pointMarker", D, u, z)
            }
            this._startTooltipTimer(D, this._selected.series, z)
        }
    }, _drawSymbol: function (k, n, l, d, o, m, h, i, c, q) {
        var f;
        var j = q || 6;
        var e = j / 2;
        switch (k) {
            case"none":
                return undefined;
            case"circle":
                f = this.renderer.circle(n, l, j / 2);
                break;
            case"square":
                j = j - 1;
                e = j / 2;
                f = this.renderer.rect(n - e, l - e, j, j);
                break;
            case"diamond":
                var p = "M " + (n - e) + "," + (l) + " L" + (n) + "," + (l - e) + " L" + (n + e) + "," + (l) + " L" + (n) + "," + (l + e) + " Z";
                f = this.renderer.path(p);
                break;
            case"triangle_up":
            case"triangle":
                var p = "M " + (n - e) + "," + (l + e) + " L " + (n + e) + "," + (l + e) + " L " + (n) + "," + (l - e) + " Z";
                f = this.renderer.path(p);
                break;
            case"triangle_down":
                var p = "M " + (n - e) + "," + (l - e) + " L " + (n) + "," + (l + e) + " L " + (n + e) + "," + (l - e) + " Z";
                f = this.renderer.path(p);
                break;
            case"triangle_left":
                var p = "M " + (n - e) + "," + (l) + " L " + (n + e) + "," + (l + e) + " L " + (n + e) + "," + (l - e) + " Z";
                f = this.renderer.path(p);
                break;
            case"triangle_right":
                var p = "M " + (n - e) + "," + (l - e) + " L " + (n - e) + "," + (l + e) + " L " + (n + e) + "," + (l) + " Z";
                f = this.renderer.path(p);
                break;
            default:
                f = this.renderer.circle(n, l, j)
        }
        this.renderer.attr(f, {fill: d, "fill-opacity": o, stroke: m, "stroke-width": i, "stroke-opacity": h, "stroke-dasharray": c || ""});
        return f
    }, _getSymbol: function (h, c) {
        var d = ["circle", "square", "diamond", "triangle_up", "triangle_down", "triangle_left", "triangle_right"];
        var f = this.seriesGroups[h];
        var e = f.series[c];
        var i;
        if (e.symbolType != undefined) {
            i = e.symbolType
        }
        if (i == undefined) {
            i = f.symbolType
        }
        if (i == "default") {
            return d[c % d.length]
        } else {
            if (i != undefined) {
                return i
            }
        }
        return"none"
    }, _startTooltipTimer: function (l, k, e, j, i, c, h) {
        this._cancelTooltipTimer();
        var m = this;
        var f = m.seriesGroups[l];
        var d = this.toolTipShowDelay || this.toolTipDelay;
        if (isNaN(d) || d > 10000 || d < 0) {
            d = 500
        }
        if (this._ttEl || (true == this.enableCrosshairs && false == this.showToolTips)) {
            d = 0
        }
        if (!isNaN(c)) {
            d = c
        }
        clearTimeout(this._tttimerHide);
        if (isNaN(j)) {
            j = m._mouseX
        }
        if (isNaN(i)) {
            i = m._mouseY - 3
        }
        if (d == 0) {
            m._showToolTip(j, i, l, k, e)
        }
        this._tttimer = setTimeout(function () {
            if (d != 0) {
                m._showToolTip(j, i, l, k, e)
            }
            var n = m.toolTipHideDelay;
            if (!isNaN(h)) {
                n = h
            }
            if (isNaN(n)) {
                n = 4000
            }
            m._tttimerHide = setTimeout(function () {
                m._hideToolTip();
                m._unselect()
            }, n)
        }, d)
    }, _cancelTooltipTimer: function () {
        clearTimeout(this._tttimer)
    }, _getGroupGradientType: function (d) {
        var c = this.seriesGroups[d];
        if (c.type.indexOf("area") != -1) {
            return c.orientation == "horizontal" ? "horizontalLinearGradient" : "verticalLinearGradient"
        } else {
            if (this._isColumnType(c.type) || c.type.indexOf("candle") != -1) {
                if (c.polar) {
                    return"radialGradient"
                }
                return c.orientation == "horizontal" ? "verticalLinearGradient" : "horizontalLinearGradient"
            } else {
                if (c.type.indexOf("scatter") != -1 || c.type.indexOf("bubble") != -1 || this._isPieGroup(d)) {
                    return"radialGradient"
                }
            }
        }
        return undefined
    }, _select: function (i, m, p, o, j, n) {
        if (this._selected) {
            if ((this._selected.item != j || this._selected.series != o || this._selected.group != p)) {
                this._unselect()
            } else {
                return
            }
        }
        var l = this.seriesGroups[p];
        var q = l.series[o];
        if (l.enableSelection == false || q.enableSelection == false) {
            return
        }
        var h = l.type.indexOf("line") != -1 && l.type.indexOf("area") == -1;
        this._selected = {element: i, type: m, group: p, series: o, item: j, iidxBase: n, isLineType: h, linesUnselectMode: q.linesUnselectMode || l.linesUnselectMode};
        var c = this._getColors(p, o, n || j, this._getGroupGradientType(p));
        var d = c.fillColorSelected;
        if (h) {
            d = "none"
        }
        var f = this._getSerieSettings(p, o);
        var e = (m == "symbol") ? c.lineColorSymbolSelected : c.lineColorSelected;
        d = (m == "symbol") ? c.fillColorSymbolSelected : d;
        var k = (m == "symbol") ? 1 : f.stroke;
        if (this.renderer.getAttr(i, "fill") == c.fillColorAlt) {
            d = c.fillColorAltSelected
        }
        this.renderer.attr(i, {stroke: e, fill: d, "stroke-width": k});
        this._raiseItemEvent("mouseover", l, q, j)
    }, _unselect: function () {
        var p = this;
        if (p._selected) {
            var o = p._selected.group;
            var n = p._selected.series;
            var h = p._selected.item;
            var l = p._selected.iidxBase;
            var k = p._selected.type;
            var j = p.seriesGroups[o];
            var q = j.series[n];
            var f = j.type.indexOf("line") != -1 && j.type.indexOf("area") == -1;
            var c = p._getColors(o, n, l || h, p._getGroupGradientType(o));
            var d = c.fillColor;
            if (f) {
                d = "none"
            }
            var e = p._getSerieSettings(o, n);
            var m = (k == "symbol") ? c.lineColorSymbol : c.lineColor;
            d = (k == "symbol") ? c.fillColorSymbol : d;
            if (this.renderer.getAttr(p._selected.element, "fill") == c.fillColorAltSelected) {
                d = c.fillColorAlt
            }
            var i = (k == "symbol") ? 1 : e.stroke;
            p.renderer.attr(p._selected.element, {stroke: m, fill: d, "stroke-width": i});
            p._selected = undefined;
            if (!isNaN(h)) {
                p._raiseItemEvent("mouseout", j, q, h)
            }
        }
        if (p._pointMarker) {
            if (p._pointMarker.element) {
                p.renderer.removeElement(p._pointMarker.element);
                p._pointMarker.element = undefined
            }
            p._pointMarker = undefined;
            p._hideCrosshairs()
        }
    }, _raiseItemEvent: function (h, i, f, d) {
        var e = f[h] || i[h];
        var j = 0;
        for (; j < this.seriesGroups.length; j++) {
            if (this.seriesGroups[j] == i) {
                break
            }
        }
        if (j == this.seriesGroups.length) {
            return
        }
        var c = {event: h, seriesGroup: i, serie: f, elementIndex: d, elementValue: this._getDataValue(d, f.dataField, j)};
        if (e && a.isFunction(e)) {
            e(c)
        }
        this._raiseEvent(h, c)
    }, _raiseEvent: function (e, d) {
        var f = new a.Event(e);
        f.owner = this;
        d.event = e;
        f.args = d;
        var c = this.host.trigger(f);
        return c
    }, _calcInterval: function (e, l, k) {
        var o = Math.abs(l - e);
        var m = o / k;
        var h = [1, 2, 3, 4, 5, 10, 15, 20, 25, 50, 100];
        var c = [0.5, 0.25, 0.125, 0.1];
        var d = 0.1;
        var j = h;
        if (m < 1) {
            j = c;
            d = 10
        }
        var n = 0;
        do {
            n = 0;
            if (m >= 1) {
                d *= 10
            } else {
                d /= 10
            }
            for (var f = 1; f < j.length; f++) {
                if (Math.abs(j[n] * d - m) > Math.abs(j[f] * d - m)) {
                    n = f
                } else {
                    break
                }
            }
        } while (n == j.length - 1);
        return j[n] * d
    }, _renderDataClone: function () {
        if (!this._renderData || this._isToggleRefresh) {
            return
        }
        var e = this._elementRenderInfo = [];
        if (this._isSelectorRefresh) {
            return
        }
        for (var k = 0; k < this._renderData.length; k++) {
            var d = this._getXAxis(k).dataField;
            while (e.length <= k) {
                e.push({})
            }
            var c = e[k];
            var h = this._renderData[k];
            if (!h.offsets) {
                continue
            }
            if (h.valueAxis) {
                c.valueAxis = {itemOffsets: {}};
                for (var l in h.valueAxis.itemOffsets) {
                    c.valueAxis.itemOffsets[l] = h.valueAxis.itemOffsets[l]
                }
            }
            if (h.xAxis) {
                c.xAxis = {itemOffsets: {}};
                for (var l in h.xAxis.itemOffsets) {
                    c.xAxis.itemOffsets[l] = h.xAxis.itemOffsets[l]
                }
            }
            c.series = [];
            var j = c.series;
            var n = this._isPieGroup(k);
            for (var o = 0; o < h.offsets.length; o++) {
                j.push({});
                for (var f = 0; f < h.offsets[o].length; f++) {
                    if (!n) {
                        j[o][h.xoffsets.xvalues[f]] = {value: h.offsets[o][f].value, valueRadius: h.offsets[o][f].valueRadius, xoffset: h.xoffsets.data[f], from: h.offsets[o][f].from, to: h.offsets[o][f].to}
                    } else {
                        var m = h.offsets[o][f];
                        j[o][m.displayValue] = {value: m.value, x: m.x, y: m.y, fromAngle: m.fromAngle, toAngle: m.toAngle}
                    }
                }
            }
        }
    }, getPolarDataPointOffset: function (e, d, h) {
        var f = this._renderData[h];
        if (!f) {
            return{x: NaN, y: NaN}
        }
        var j = this.getValueAxisDataPointOffset(d, h);
        var c = this.getXAxisDataPointOffset(e, h);
        var i = this._toPolarCoord(f.polarCoords, f.xAxis.rect, c, j);
        return{x: i.x, y: i.y}
    }, _getDataPointOffsetDiff: function (l, k, c, h, i, e, j) {
        var f = this._getDataPointOffset(l, c, h, i, e, j);
        var d = this._getDataPointOffset(k, c, h, i, e, j);
        return Math.abs(f - d)
    }, _getXAxisRenderData: function (e) {
        if (e >= this._renderData.length) {
            return
        }
        var f = this.seriesGroups[e];
        var d = this._renderData[e].xAxis;
        if (!d) {
            return
        }
        if (f.xAxis == undefined) {
            for (var c = 0; c <= e; c++) {
                if (this.seriesGroups[c].xAxis == undefined) {
                    break
                }
            }
            d = this._renderData[c].xAxis
        }
        return d
    }, getXAxisDataPointOffset: function (l, n) {
        var m = this.seriesGroups[n];
        if (isNaN(l)) {
            return NaN
        }
        renderData = this._getXAxisRenderData(n);
        if (!renderData) {
            return NaN
        }
        var h = renderData.data.axisStats;
        var k = h.min.valueOf();
        var c = h.max.valueOf();
        var i = c - k;
        if (i == 0) {
            i = 1
        }
        if (l.valueOf() > c || l.valueOf() < k) {
            return NaN
        }
        var d = this._getXAxis(n);
        var e = m.orientation == "horizontal" ? "height" : "width";
        var p = m.orientation == "horizontal" ? "y" : "x";
        var j = (l.valueOf() - k) / i;
        var o = renderData.rect[e] - renderData.data.padding.left - renderData.data.padding.right;
        if (m.polar || m.spider) {
            var f = this._renderData[n].polarCoords;
            if (f.isClosedCircle) {
                o = renderData.data.axisSize
            }
        }
        return this._plotRect[p] + renderData.data.padding.left + o * (d.flip ? (1 - j) : j)
    }, getValueAxisDataPointOffset: function (i, j) {
        var l = this._getValueAxis(j);
        if (!l) {
            return NaN
        }
        var k = this._renderData[j];
        if (!k) {
            return NaN
        }
        var h = l.flip == true;
        var e = k.logBase;
        var f = k.scale;
        var c = k.gbase;
        var d = k.baseOffset;
        return this._getDataPointOffset(i, c, e, f, d, h)
    }, _getDataPointOffset: function (h, d, e, j, f, c) {
        var i;
        if (isNaN(h)) {
            h = d
        }
        if (!isNaN(e)) {
            i = (a.jqx.log(h, e) - a.jqx.log(d, e)) * j
        } else {
            i = (h - d) * j
        }
        if (this._isVML) {
            i = Math.round(i)
        }
        if (c) {
            i = f + i
        } else {
            i = f - i
        }
        return i
    }, _calcGroupOffsets: function (n, O) {
        var C = this.seriesGroups[n];
        while (this._renderData.length < n + 1) {
            this._renderData.push({})
        }
        if (this._renderData[n] != null && this._renderData[n].offsets != undefined) {
            return this._renderData[n]
        }
        if (this._isPieGroup(n)) {
            return this._calcPieSeriesGroupOffsets(n, O)
        }
        var q = this._getValueAxis(n);
        if (!q || !C.series || C.series.length == 0) {
            return this._renderData[n]
        }
        var D = q.flip == true;
        var R = q.logarithmicScale == true;
        var Q = q.logarithmicScaleBase || 10;
        var W = [];
        var I = C.type.indexOf("stacked") != -1;
        var e = I && C.type.indexOf("100") != -1;
        var N = C.type.indexOf("range") != -1;
        var X = this._isColumnType(C.type);
        var ac = C.type.indexOf("waterfall") != -1;
        var v = this._getDataLen(n);
        var u = C.baselineValue || q.baselineValue || 0;
        if (e) {
            u = 0
        }
        var aj = this._stats.seriesGroups[n];
        if (!aj || !aj.isValid) {
            return
        }
        var am = aj.hasStackValueReversal;
        if (am) {
            u = 0
        }
        if (ac && I) {
            if (am) {
                return
            } else {
                u = aj.base
            }
        }
        if (u > aj.max) {
            u = aj.max
        }
        if (u < aj.min) {
            u = aj.min
        }
        var t = (e || R) ? aj.maxRange : aj.max - aj.min;
        var aq = aj.min;
        var F = aj.max;
        var P = O.height / (R ? aj.intervals : t);
        var al = 0;
        if (e) {
            if (aq * F < 0) {
                t /= 2;
                al = -(t + u) * P
            } else {
                al = -u * P
            }
        } else {
            al = -(u - aq) * P
        }
        if (D) {
            al = O.y - al
        } else {
            al += O.y + O.height
        }
        var ak = [];
        var ag = [];
        var V = [];
        var ao, K;
        if (R) {
            ao = a.jqx.log(F, Q) - a.jqx.log(u, Q);
            if (I) {
                ao = aj.intervals;
                u = e ? 0 : aq
            }
            K = aj.intervals - ao;
            if (!D) {
                al = O.y + ao / aj.intervals * O.height
            }
        }
        al = a.jqx._ptrnd(al);
        var d = (aq * F < 0) ? O.height / 2 : O.height;
        var o = [];
        var Z = [];
        var ar = I && (X || R);
        var ap = [];
        for (var af = 0; af < v; af++) {
            if (!ac) {
                Z = []
            }
            for (var ae = 0; ae < C.series.length; ae++) {
                if (!I && R) {
                    o = []
                }
                var G = C.series[ae];
                var H = G.dataField;
                var au = G.dataFieldFrom;
                var S = G.dataFieldTo;
                var ab = G.radiusDataField || G.sizeDataField;
                while (W.length <= ae) {
                    W.push([])
                }
                while (W[ae].length <= af) {
                    W[ae].push({})
                }
                var m = this._isSerieVisible(n, ae);
                if (C.type.indexOf("candle") != -1 || C.type.indexOf("ohlc") != -1) {
                    var c = ["Open", "Close", "High", "Low"];
                    for (var an in c) {
                        var s = "dataField" + c[an];
                        if (G[s]) {
                            W[ae][af][c[an]] = this._getDataPointOffset(this._getDataValueAsNumber(af, G[s], n), u, R ? Q : NaN, P, al, D)
                        }
                    }
                    continue
                }
                while (Z.length <= af) {
                    Z.push(0)
                }
                var at = NaN;
                if (N) {
                    at = this._getDataValueAsNumber(af, au, n);
                    if (isNaN(at)) {
                        at = u
                    }
                }
                var M = NaN;
                if (N) {
                    M = this._getDataValueAsNumber(af, S, n)
                } else {
                    M = this._getDataValueAsNumber(af, H, n)
                }
                var l = this._getDataValueAsNumber(af, ab, n);
                if (I) {
                    Z[af] += m ? M : 0
                }
                if (!m) {
                    M = NaN
                }
                if (isNaN(M) || (R && M <= 0)) {
                    W[ae][af] = {from: undefined, to: undefined};
                    continue
                }
                var L;
                if (I) {
                    if (ar) {
                        L = (M >= u) ? ak : ag
                    } else {
                        M = Z[af]
                    }
                }
                var ai = P * (M - u);
                if (N) {
                    ai = P * (M - at)
                }
                if (I && ar) {
                    if (!ap[af]) {
                        ap[af] = true;
                        ai = P * (M - u)
                    } else {
                        ai = P * M
                    }
                }
                if (R) {
                    while (o.length <= af) {
                        o.push({p: {value: 0, height: 0}, n: {value: 0, height: 0}})
                    }
                    var E = (N || N) ? at : u;
                    var ad = M > E ? o[af].p : o[af].n;
                    ad.value += M;
                    if (e) {
                        M = ad.value / (aj.psums[af] + aj.nsums[af]) * 100;
                        ai = (a.jqx.log(M, Q) - aj.minPow) * P
                    } else {
                        ai = a.jqx.log(ad.value, Q) - a.jqx.log(E, Q);
                        ai *= P
                    }
                    ai -= ad.height;
                    ad.height += ai
                }
                var U = al;
                if (N) {
                    var w = 0;
                    if (R) {
                        w = (a.jqx.log(at, Q) - a.jqx.log(u, Q)) * P
                    } else {
                        w = (at - u) * P
                    }
                    U += D ? w : -w
                }
                if (I) {
                    if (e && !R) {
                        var B = (aj.psums[af] - aj.nsums[af]);
                        if (M > u) {
                            ai = (aj.psums[af] / B) * d;
                            if (aj.psums[af] != 0) {
                                ai *= M / aj.psums[af]
                            }
                        } else {
                            ai = (aj.nsums[af] / B) * d;
                            if (aj.nsums[af] != 0) {
                                ai *= M / aj.nsums[af]
                            }
                        }
                    }
                    if (ar) {
                        if (isNaN(L[af])) {
                            L[af] = U
                        }
                        U = L[af]
                    }
                }
                if (isNaN(V[af])) {
                    V[af] = 0
                }
                var ah = V[af];
                ai = Math.abs(ai);
                var Y = ai;
                if (ai >= 1) {
                    h_new = this._isVML ? Math.round(ai) : a.jqx._ptrnd(ai) - 1;
                    if (Math.abs(ai - h_new) > 0.5) {
                        ai = Math.round(ai)
                    } else {
                        ai = h_new
                    }
                }
                ah += ai - Y;
                if (!I) {
                    ah = 0
                }
                if (Math.abs(ah) > 0.5) {
                    if (ah > 0) {
                        ai -= 1;
                        ah -= 1
                    } else {
                        ai += 1;
                        ah += 1
                    }
                }
                V[af] = ah;
                if (ae == C.series.length - 1 && e) {
                    var A = 0;
                    for (var aa = 0; aa < ae; aa++) {
                        A += Math.abs(W[aa][af].to - W[aa][af].from)
                    }
                    A += ai;
                    if (A < d) {
                        if (ai > 0.5) {
                            ai = a.jqx._ptrnd(ai + d - A)
                        } else {
                            var aa = ae - 1;
                            while (aa >= 0) {
                                var J = Math.abs(W[aa][af].to - W[aa][af].from);
                                if (J > 1) {
                                    if (W[aa][af].from > W[aa][af].to) {
                                        W[aa][af].from += d - A
                                    }
                                    break
                                }
                                aa--
                            }
                        }
                    }
                }
                if (D) {
                    ai *= -1
                }
                var T = M < u;
                if (N) {
                    T = at > M
                }
                var p = isNaN(at) ? M : {from: at, to: M};
                if (T) {
                    if (ar) {
                        L[af] += ai
                    }
                    W[ae][af] = {from: U, to: U + ai, value: p, valueRadius: l}
                } else {
                    if (ar) {
                        L[af] -= ai
                    }
                    W[ae][af] = {from: U, to: U - ai, value: p, valueRadius: l}
                }
            }
        }
        var z = this._renderData[n];
        z.baseOffset = al;
        z.gbase = u;
        z.logBase = R ? Q : NaN;
        z.scale = P;
        z.offsets = !ac ? W : this._applyWaterfall(W, v, n, al, u, R ? Q : NaN, P, D, I);
        z.xoffsets = this._calculateXOffsets(n, O.width);
        return this._renderData[n]
    }, _isPercent: function (c) {
        return(typeof(c) === "string" && c.length > 0 && c.indexOf("%") == c.length - 1)
    }, _calcPieSeriesGroupOffsets: function (e, c) {
        var B = this;
        var n = this._getDataLen(e);
        var o = this.seriesGroups[e];
        var C = this._renderData[e] = {};
        var I = C.offsets = [];
        for (var E = 0; E < o.series.length; E++) {
            var v = o.series[E];
            var G = this._get([v.minAngle, v.startAngle]);
            if (isNaN(G) || G < 0 || G > 360) {
                G = 0
            }
            var O = this._get([v.maxAngle, v.endAngle]);
            if (isNaN(O) || O < 0 || O > 360) {
                O = 360
            }
            var f = O - G;
            var p = v.initialAngle || 0;
            if (p < G) {
                p = G
            }
            if (p > O) {
                p = O
            }
            var d = v.centerOffset || 0;
            var M = a.jqx.getNum([v.offsetX, o.offsetX, c.width / 2]);
            var L = a.jqx.getNum([v.offsetY, o.offsetY, c.height / 2]);
            var A = Math.min(c.width, c.height) / 2;
            var z = p;
            var h = v.radius;
            if (B._isPercent(h)) {
                h = parseFloat(h) / 100 * A
            }
            if (isNaN(h)) {
                h = A * 0.4
            }
            var m = v.innerRadius;
            if (B._isPercent(m)) {
                m = parseFloat(m) / 100 * A
            }
            if (isNaN(m) || m >= h) {
                m = 0
            }
            I.push([]);
            var j = 0;
            var k = 0;
            for (var H = 0; H < n; H++) {
                var N = this._getDataValueAsNumber(H, v.dataField, e);
                if (isNaN(N)) {
                    continue
                }
                if (!this._isSerieVisible(e, E, H) && v.hiddenPointsDisplay != true) {
                    continue
                }
                if (N > 0) {
                    j += N
                } else {
                    k += N
                }
            }
            var u = j - k;
            if (u == 0) {
                u = 1
            }
            for (var H = 0; H < n; H++) {
                var N = this._getDataValueAsNumber(H, v.dataField, e);
                if (isNaN(N)) {
                    I[E].push({});
                    continue
                }
                var F = v.displayText || v.displayField;
                var l = this._getDataValue(H, F, e);
                if (l == undefined) {
                    l = H
                }
                var K = 0;
                var D = this._isSerieVisible(e, E, H);
                if (D || v.hiddenPointsDisplay == true) {
                    K = Math.abs(N) / u * f
                }
                var t = c.x + M;
                var q = c.y + L;
                var J = d;
                if (a.isFunction(d)) {
                    J = d({seriesIndex: E, seriesGroupIndex: e, itemIndex: H})
                }
                if (isNaN(J)) {
                    J = 0
                }
                var w = {key: e + "_" + E + "_" + H, value: N, displayValue: l, x: t, y: q, fromAngle: z, toAngle: z + K, centerOffset: J, innerRadius: m, outerRadius: h, visible: D};
                I[E].push(w);
                z += K
            }
        }
        return C
    }, _isPointSeriesOnly: function () {
        for (var c = 0; c < this.seriesGroups.length; c++) {
            var d = this.seriesGroups[c];
            if (d.type.indexOf("line") == -1 && d.type.indexOf("area") == -1 && d.type.indexOf("scatter") == -1 && d.type.indexOf("bubble") == -1) {
                return false
            }
        }
        return true
    }, _hasColumnSeries: function () {
        var e = ["column", "ohlc", "candlestick", "waterfall"];
        for (var d = 0; d < this.seriesGroups.length; d++) {
            var f = this.seriesGroups[d];
            for (var c in e) {
                if (f.type.indexOf(e[c]) != -1) {
                    return true
                }
            }
        }
        return false
    }, _alignValuesWithTicks: function (h) {
        var c = this._isPointSeriesOnly();
        var d = this.seriesGroups[h];
        var f = this._getXAxis(h);
        var e = f.valuesOnTicks == undefined ? c : f.valuesOnTicks != false;
        if (h == undefined) {
            return e
        }
        if (d.valuesOnTicks == undefined) {
            return e
        }
        return d.valuesOnTicks
    }, _getYearsDiff: function (d, c) {
        return c.getFullYear() - d.getFullYear()
    }, _getMonthsDiff: function (d, c) {
        return 12 * (c.getFullYear() - d.getFullYear()) + c.getMonth() - d.getMonth()
    }, _getDateDiff: function (h, f, e, c) {
        var d = 0;
        if (e != "year" && e != "month") {
            d = f.valueOf() - h.valueOf()
        }
        switch (e) {
            case"year":
                d = this._getYearsDiff(h, f);
                break;
            case"month":
                d = this._getMonthsDiff(h, f);
                break;
            case"day":
                d /= (24 * 3600 * 1000);
                break;
            case"hour":
                d /= (3600 * 1000);
                break;
            case"minute":
                d /= (60 * 1000);
                break;
            case"second":
                d /= (1000);
                break;
            case"millisecond":
                break
        }
        if (e != "year" && e != "month" && c != false) {
            d = a.jqx._rnd(d, 1, true)
        }
        return d
    }, _getBestDTUnit: function (m, s, t, e, k) {
        var h = "day";
        var o = s.valueOf() - m.valueOf();
        if (o < 1000) {
            h = "second"
        } else {
            if (o < 3600000) {
                h = "minute"
            } else {
                if (o < 86400000) {
                    h = "hour"
                } else {
                    if (o < 2592000000) {
                        h = "day"
                    } else {
                        if (o < 31104000000) {
                            h = "month"
                        } else {
                            h = "year"
                        }
                    }
                }
            }
        }
        var q = [
            {key: "year", cnt: o / (1000 * 60 * 60 * 24 * 365)},
            {key: "month", cnt: o / (1000 * 60 * 60 * 24 * 30)},
            {key: "day", cnt: o / (1000 * 60 * 60 * 24)},
            {key: "hour", cnt: o / (1000 * 60 * 60)},
            {key: "minute", cnt: o / (1000 * 60)},
            {key: "second", cnt: o / 1000},
            {key: "millisecond", cnt: o}
        ];
        var n = -1;
        for (var l = 0; l < q.length; l++) {
            if (q[l].key == h) {
                n = l;
                break
            }
        }
        var c = -1, p = -1;
        for (; n < q.length; n++) {
            if (q[n].cnt / 100 > e) {
                break
            }
            var d = this._estAxisInterval(m, s, t, e, q[n].key, k);
            var f = this._getDTIntCnt(m, s, d, q[n].key);
            if (c == -1 || c < f) {
                c = f;
                p = n
            }
        }
        h = q[p].key;
        return h
    }, _getXAxisStats: function (h, m, E) {
        var k = this._getDataLen(h);
        var c = m.type == "date" || m.type == "time";
        if (c && !this._autoDateFormats) {
            if (!this._autoDateFormats) {
                this._autoDateFormats = []
            }
            var o = this._testXAxisDateFormat();
            if (o) {
                this._autoDateFormats.push(o)
            }
        }
        var n = c ? this._castAsDate(m.minValue, m.dateFormat) : this._castAsNumber(m.minValue);
        var q = c ? this._castAsDate(m.maxValue, m.dateFormat) : this._castAsNumber(m.maxValue);
        var z = n, C = q;
        var f, p;
        var d = m.type == undefined || m.type == "auto";
        var j = (d || m.type == "basic");
        var A = 0, e = 0;
        for (var D = 0; D < k && m.dataField; D++) {
            var w = this._getDataValue(D, m.dataField, h);
            w = c ? this._castAsDate(w, m.dateFormat) : this._castAsNumber(w);
            if (isNaN(w)) {
                continue
            }
            if (c) {
                A++
            } else {
                e++
            }
            if (isNaN(f) || w < f) {
                f = w
            }
            if (isNaN(p) || w >= p) {
                p = w
            }
        }
        if (d && ((!c && e == k) || (c && A == k))) {
            j = false
        }
        if (j) {
            f = 0;
            p = k - 1
        }
        if (isNaN(z)) {
            z = f
        }
        if (isNaN(C)) {
            C = p
        }
        if (c) {
            if (!this._isDate(z)) {
                z = this._isDate(C) ? C : new Date()
            }
            if (!this._isDate(C)) {
                C = this._isDate(z) ? z : new Date()
            }
        } else {
            if (isNaN(z)) {
                z = 0
            }
            if (isNaN(C)) {
                C = j ? k - 1 : z
            }
        }
        if (f == undefined) {
            f = z
        }
        if (p == undefined) {
            p = C
        }
        var s = m.rangeSelector;
        if (s) {
            var t = s.minValue || z;
            if (t && c) {
                t = this._castAsDate(t, s.dateFormat || m.dateFormat)
            }
            var v = s.maxValue || C;
            if (v && c) {
                v = this._castAsDate(v, s.dateFormat || m.rangeSelector)
            }
            if (z < t) {
                z = t
            }
            if (C < t) {
                C = v
            }
            if (z > v) {
                z = t
            }
            if (C > v) {
                C = v
            }
        }
        var F = m.unitInterval;
        var u, G;
        if (c) {
            u = m.baseUnit;
            if (!u) {
                u = this._getBestDTUnit(z, C, h, E)
            }
            G = u == "hour" || u == "minute" || u == "second" || u == "millisecond"
        }
        var F = m.unitInterval;
        if (isNaN(F) || F <= 0) {
            F = this._estAxisInterval(z, C, h, E, u)
        }
        var B = {min: z, max: C};
        var l = this.seriesGroups[h];
        if (!c && (l.polar || l.spider)) {
            z = a.jqx._rnd(z, F, false);
            C = a.jqx._rnd(C, F, true)
        }
        return{min: z, max: C, dsRange: {min: f, max: p}, filterRange: B, useIndeces: j, isDateTime: c, isTimeUnit: G, dateTimeUnit: u, interval: F}
    }, _getDefaultDTFormatFn: function (e) {
        var c = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var d;
        if (e == "year" || e == "month" || e == "day") {
            d = function (f) {
                return f.getDate() + "-" + c[f.getMonth()] + "-" + f.getFullYear()
            }
        } else {
            d = function (f) {
                return f.getDate() + "-" + c[f.getMonth()] + "-" + f.getFullYear() + "<br>" + f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds()
            }
        }
        return d
    }, _getDTIntCnt: function (h, d, e, k) {
        var f = 0;
        var i = new Date(h);
        var j = new Date(d);
        if (e <= 0) {
            return 1
        }
        while (i.valueOf() < j.valueOf()) {
            if (k == "millisecond") {
                i.setMilliseconds(i.getMilliseconds() + e)
            } else {
                if (k == "second") {
                    i.setSeconds(i.getSeconds() + e)
                } else {
                    if (k == "minute") {
                        i.setMinutes(i.getMinutes() + e)
                    } else {
                        if (k == "hour") {
                            var c = i.valueOf();
                            i.setHours(i.getHours() + e);
                            if (c === i.valueOf()) {
                                i.setHours(i.getHours() + e + 1)
                            }
                        } else {
                            if (k == "day") {
                                i.setDate(i.getDate() + e)
                            } else {
                                if (k == "month") {
                                    i.setMonth(i.getMonth() + e)
                                } else {
                                    if (k == "year") {
                                        i.setFullYear(i.getFullYear() + e)
                                    }
                                }
                            }
                        }
                    }
                }
            }
            f++
        }
        return f
    }, _estAxisInterval: function (f, k, o, c, l, d) {
        var e = [1, 2, 5, 10, 15, 20, 50, 100, 200, 500];
        var j = 0;
        var h = c / ((!isNaN(d) && d > 0) ? d : 50);
        if (this._renderData && this._renderData.length > o && this._renderData[o].xAxis && !isNaN(this._renderData[o].xAxis.avgWidth)) {
            var q = Math.max(1, this._renderData[o].xAxis.avgWidth);
            if (q != 0 && isNaN(d)) {
                h = 0.9 * c / q
            }
        }
        if (h <= 1) {
            return Math.max(k - f)
        }
        var p = 0;
        while (true) {
            var n = j >= e.length ? Math.pow(10, 3 + j - e.length) : e[j];
            if (this._isDate(f) && this._isDate(k)) {
                p = this._getDTIntCnt(f, k, n, l)
            } else {
                p = (k - f) / n
            }
            if (p <= h) {
                break
            }
            j++
        }
        var m = this.seriesGroups[o];
        if (m.spider || m.polar) {
            if (2 * n > k - f) {
                n = k - f
            }
        }
        return n
    }, _getPaddingSize: function (n, f, h, d, p, i, q) {
        var j = n.min;
        var l = n.max;
        var c = n.interval;
        var e = n.dateTimeUnit;
        if (p) {
            var m = (d / Math.max(1, l - j + c)) * c;
            if (i) {
                return{left: 0, right: m}
            } else {
                if (h) {
                    return{left: 0, right: 0}
                }
                return{left: m / 2, right: m / 2}
            }
        }
        if (h && !q) {
            return{left: 0, right: 0}
        }
        if (this._isDate(j) && this._isDate(l)) {
            var o = this._getDTIntCnt(j, l, Math.min(c, l - j), e);
            var k = d / Math.max(2, o);
            return{left: k / 2, right: k / 2}
        }
        var o = Math.max(1, l - j);
        if (o == 1) {
            sz = d / 4;
            return{left: sz, right: sz}
        }
        var k = d / (o + 1);
        return{left: k / 2, right: k / 2}
    }, _calculateXOffsets: function (f, G) {
        var F = this.seriesGroups[f];
        var o = this._getXAxis(f);
        var z = [];
        var m = [];
        var n = this._getDataLen(f);
        var e = this._getXAxisStats(f, o, G);
        var w = e.min;
        var D = e.max;
        var c = e.isDateTime;
        var H = e.isTimeUnit;
        var E = this._hasColumnSeries();
        var d = F.polar || F.spider;
        var A = this._get([F.startAngle, F.minAngle, 0]);
        var u = this._get([F.endAngle, F.maxAngle, 360]);
        var q = d && !(Math.abs(Math.abs(u - A) - 360) > 0.0001);
        var l = this._alignValuesWithTicks(f);
        var t = this._getPaddingSize(e, o, l, G, d, q, E);
        var J = D - w;
        var C = e.filterRange;
        if (J == 0) {
            J = 1
        }
        var I = G - t.left - t.right;
        if (d && l) {
            t.left = t.right = 0
        }
        var j = -1, p = -1;
        for (var B = 0; B < n; B++) {
            var v = (o.dataField === undefined) ? B : this._getDataValue(B, o.dataField, f);
            if (e.useIndeces) {
                if (B < C.min || B > C.max) {
                    z.push(NaN);
                    m.push(undefined);
                    continue
                }
                z.push(a.jqx._ptrnd(t.left + (B - w) / J * I));
                m.push(v);
                if (j == -1) {
                    j = B
                }
                if (p == -1 || p < B) {
                    p = B
                }
                continue
            }
            v = c ? this._castAsDate(v, o.dateFormat) : this._castAsNumber(v);
            if (isNaN(v) || v < C.min || v > C.max) {
                z.push(NaN);
                m.push(undefined);
                continue
            }
            var s = 0;
            if (!c || (c && H)) {
                diffFromMin = v - w;
                s = (v - w) * I / J
            } else {
                s = (v.valueOf() - w.valueOf()) / (D.valueOf() - w.valueOf()) * I
            }
            s = a.jqx._ptrnd(t.left + s);
            z.push(s);
            m.push(v);
            if (j == -1) {
                j = B
            }
            if (p == -1 || p < B) {
                p = B
            }
        }
        if (o.flip == true) {
            for (var B = 0; B < z.length; B++) {
                if (!isNaN(z[B])) {
                    z[B] = G - z[B]
                }
            }
        }
        if (H || c) {
            J = this._getDateDiff(w, D, o.baseUnit);
            J = a.jqx._rnd(J, 1, false)
        }
        var k = Math.max(1, J);
        var h = I / k;
        if (j == p && k == 1) {
            z[j] = t.left + I / 2
        }
        return{axisStats: e, data: z, xvalues: m, first: j, last: p, length: p == -1 ? 0 : p - j + 1, itemWidth: h, intervalWidth: h * e.interval, rangeLength: J, useIndeces: e.useIndeces, padding: t, axisSize: I}
    }, _getXAxis: function (c) {
        if (c == undefined || this.seriesGroups.length <= c) {
            return this.categoryAxis || this.xAxis
        }
        return this.seriesGroups[c].categoryAxis || this.seriesGroups[c].xAxis || this.categoryAxis || this.xAxis
    }, _isGreyScale: function (f, c) {
        var e = this.seriesGroups[f];
        var d = e.series[c];
        if (d.greyScale == true) {
            return true
        } else {
            if (d.greyScale == false) {
                return false
            }
        }
        if (e.greyScale == true) {
            return true
        } else {
            if (e.greyScale == false) {
                return false
            }
        }
        return this.greyScale == true
    }, _getSeriesColors: function (h, d, f) {
        var c = this._getSeriesColorsInternal(h, d, f);
        if (this._isGreyScale(h, d)) {
            for (var e in c) {
                c[e] = a.jqx.toGreyScale(c[e])
            }
        }
        return c
    }, _getColorFromScheme: function (q, n, c) {
        var e = "#000000";
        var p = this.seriesGroups[q];
        var k = p.series[n];
        if (this._isPieGroup(q)) {
            var d = this._getDataLen(q);
            e = this._getItemColorFromScheme(k.colorScheme || p.colorScheme || this.colorScheme, n * d + c, q, n)
        } else {
            var o = 0;
            for (var h = 0; h <= q; h++) {
                for (var f in this.seriesGroups[h].series) {
                    if (h == q && f == n) {
                        break
                    } else {
                        o++
                    }
                }
            }
            var m = this.colorScheme;
            if (p.colorScheme) {
                m = p.colorScheme;
                sidex = seriesIndex
            }
            if (m == undefined || m == "") {
                m = this.colorSchemes[0].name
            }
            if (!m) {
                return e
            }
            for (var h = 0; h < this.colorSchemes.length; h++) {
                var l = this.colorSchemes[h];
                if (l.name == m) {
                    while (o > l.colors.length) {
                        o -= l.colors.length;
                        if (++h >= this.colorSchemes.length) {
                            h = 0
                        }
                        l = this.colorSchemes[h]
                    }
                    e = l.colors[o % l.colors.length]
                }
            }
        }
        return e
    }, _createColorsCache: function () {
        this._colorsCache = {get: function (c) {
            if (this._store[c]) {
                return this._store[c]
            }
        }, set: function (d, c) {
            if (this._size < 10000) {
                this._store[d] = c;
                this._size++
            }
        }, clear: function () {
            this._store = {};
            this._size = 0
        }, _size: 0, _store: {}}
    }, _getSeriesColorsInternal: function (n, e, c) {
        var h = this.seriesGroups[n];
        var p = h.series[e];
        if (!a.isFunction(p.colorFunction) && h.type != "pie" && h.type != "donut") {
            c = NaN
        }
        var i = n + "_" + e + "_" + (isNaN(c) ? "NaN" : c);
        if (this._colorsCache.get(i)) {
            return this._colorsCache.get(i)
        }
        var d = {lineColor: "#222222", lineColorSelected: "#151515", lineColorSymbol: "#222222", lineColorSymbolSelected: "#151515", fillColor: "#222222", fillColorSelected: "#333333", fillColorSymbol: "#222222", fillColorSymbolSelected: "#333333", fillColorAlt: "#222222", fillColorAltSelected: "#333333"};
        var j;
        if (a.isFunction(p.colorFunction)) {
            var k = !isNaN(c) ? this._getDataValue(c, p.dataField, n) : NaN;
            if (h.type.indexOf("range") != -1 && !isNaN(c)) {
                var f = this._getDataValue(c, p.dataFieldFrom, n);
                var m = this._getDataValue(c, p.dataFieldTo, n);
                k = {from: f, to: m}
            }
            j = p.colorFunction(k, c, p, h);
            if (typeof(j) == "object") {
                for (var l in j) {
                    d[l] = j[l]
                }
            } else {
                d.fillColor = j
            }
        } else {
            for (var l in d) {
                if (p[l]) {
                    d[l] = p[l]
                }
            }
            if (!p.fillColor && !p.color) {
                d.fillColor = this._getColorFromScheme(n, e, c)
            } else {
                p.fillColor = p.fillColor || p.color
            }
        }
        var o = {fillColor: {baseColor: "fillColor", adjust: 1}, fillColorSelected: {baseColor: "fillColor", adjust: 1.1}, fillColorSymbol: {baseColor: "fillColor", adjust: 1}, fillColorSymbolSelected: {baseColor: "fillColorSymbol", adjust: 2}, fillColorAlt: {baseColor: "fillColor", adjust: 4}, fillColorAltSelected: {baseColor: "fillColor", adjust: 3}, lineColor: {baseColor: "fillColor", adjust: 0.95}, lineColorSelected: {baseColor: "lineColor", adjust: 0.95}, lineColorSymbol: {baseColor: "lineColor", adjust: 1}, lineColorSymbolSelected: {baseColor: "lineColorSelected", adjust: 1}};
        for (var l in d) {
            if (typeof(j) != "object" || !j[l]) {
                if (p[l]) {
                    d[l] = p[l]
                }
            }
        }
        for (var l in d) {
            if (typeof(j) != "object" || !j[l]) {
                if (!p[l]) {
                    d[l] = a.jqx.adjustColor(d[o[l].baseColor], o[l].adjust)
                }
            }
        }
        this._colorsCache.set(i, d);
        return d
    }, _getItemColorFromScheme: function (e, h, m, l) {
        if (e == undefined || e == "") {
            e = this.colorSchemes[0].name
        }
        for (var k = 0; k < this.colorSchemes.length; k++) {
            if (e == this.colorSchemes[k].name) {
                break
            }
        }
        var f = 0;
        while (f <= h) {
            if (k == this.colorSchemes.length) {
                k = 0
            }
            var c = this.colorSchemes[k].colors.length;
            if (f + c <= h) {
                f += c;
                k++
            } else {
                var d = this.colorSchemes[k].colors[h - f];
                if (this._isGreyScale(m, l) && d.indexOf("#") == 0) {
                    d = a.jqx.toGreyScale(d)
                }
                return d
            }
        }
    }, getColorScheme: function (c) {
        for (var d = 0; d < this.colorSchemes.length; d++) {
            if (this.colorSchemes[d].name == c) {
                return this.colorSchemes[d].colors
            }
        }
        return undefined
    }, addColorScheme: function (d, c) {
        for (var e = 0; e < this.colorSchemes.length; e++) {
            if (this.colorSchemes[e].name == d) {
                this.colorSchemes[e].colors = c;
                return
            }
        }
        this.colorSchemes.push({name: d, colors: c})
    }, removeColorScheme: function (c) {
        for (var d = 0; d < this.colorSchemes.length; d++) {
            if (this.colorSchemes[d].name == c) {
                this.colorSchemes.splice(d, 1);
                break
            }
        }
    }, colorSchemes: [
        {name: "scheme01", colors: ["#307DD7", "#AA4643", "#89A54E", "#71588F", "#4198AF"]},
        {name: "scheme02", colors: ["#7FD13B", "#EA157A", "#FEB80A", "#00ADDC", "#738AC8"]},
        {name: "scheme03", colors: ["#E8601A", "#FF9639", "#F5BD6A", "#599994", "#115D6E"]},
        {name: "scheme04", colors: ["#D02841", "#FF7C41", "#FFC051", "#5B5F4D", "#364651"]},
        {name: "scheme05", colors: ["#25A0DA", "#309B46", "#8EBC00", "#FF7515", "#FFAE00"]},
        {name: "scheme06", colors: ["#0A3A4A", "#196674", "#33A6B2", "#9AC836", "#D0E64B"]},
        {name: "scheme07", colors: ["#CC6B32", "#FFAB48", "#FFE7AD", "#A7C9AE", "#888A63"]},
        {name: "scheme08", colors: ["#3F3943", "#01A2A6", "#29D9C2", "#BDF271", "#FFFFA6"]},
        {name: "scheme09", colors: ["#1B2B32", "#37646F", "#A3ABAF", "#E1E7E8", "#B22E2F"]},
        {name: "scheme10", colors: ["#5A4B53", "#9C3C58", "#DE2B5B", "#D86A41", "#D2A825"]},
        {name: "scheme11", colors: ["#993144", "#FFA257", "#CCA56A", "#ADA072", "#949681"]},
        {name: "scheme12", colors: ["#105B63", "#EEEAC5", "#FFD34E", "#DB9E36", "#BD4932"]},
        {name: "scheme13", colors: ["#BBEBBC", "#F0EE94", "#F5C465", "#FA7642", "#FF1E54"]},
        {name: "scheme14", colors: ["#60573E", "#F2EEAC", "#BFA575", "#A63841", "#BFB8A3"]},
        {name: "scheme15", colors: ["#444546", "#FFBB6E", "#F28D00", "#D94F00", "#7F203B"]},
        {name: "scheme16", colors: ["#583C39", "#674E49", "#948658", "#F0E99A", "#564E49"]},
        {name: "scheme17", colors: ["#142D58", "#447F6E", "#E1B65B", "#C8782A", "#9E3E17"]},
        {name: "scheme18", colors: ["#4D2B1F", "#635D61", "#7992A2", "#97BFD5", "#BFDCF5"]},
        {name: "scheme19", colors: ["#844341", "#D5CC92", "#BBA146", "#897B26", "#55591C"]},
        {name: "scheme20", colors: ["#56626B", "#6C9380", "#C0CA55", "#F07C6C", "#AD5472"]},
        {name: "scheme21", colors: ["#96003A", "#FF7347", "#FFBC7B", "#FF4154", "#642223"]},
        {name: "scheme22", colors: ["#5D7359", "#E0D697", "#D6AA5C", "#8C5430", "#661C0E"]},
        {name: "scheme23", colors: ["#16193B", "#35478C", "#4E7AC7", "#7FB2F0", "#ADD5F7"]},
        {name: "scheme24", colors: ["#7B1A25", "#BF5322", "#9DA860", "#CEA457", "#B67818"]},
        {name: "scheme25", colors: ["#0081DA", "#3AAFFF", "#99C900", "#FFEB3D", "#309B46"]},
        {name: "scheme26", colors: ["#0069A5", "#0098EE", "#7BD2F6", "#FFB800", "#FF6800"]},
        {name: "scheme27", colors: ["#FF6800", "#A0A700", "#FF8D00", "#678900", "#0069A5"]}
    ], _formatValue: function (i, k, d, h, c, f) {
        if (i == undefined) {
            return""
        }
        if (this._isObject(i) && !this._isDate(i) && !d) {
            return""
        }
        if (d) {
            if (!a.isFunction(d)) {
                return i.toString()
            }
            try {
                return d(i, f, c, h)
            } catch (j) {
                return j.message
            }
        }
        if (this._isNumber(i)) {
            return this._formatNumber(i, k)
        }
        if (this._isDate(i)) {
            return this._formatDate(i, k)
        }
        if (k) {
            return(k.prefix || "") + i.toString() + (k.sufix || "")
        }
        return i.toString()
    }, _getFormattedValue: function (h, j, C, q, f, m) {
        var A = this.seriesGroups[h];
        var o = A.series[j];
        var n = "";
        var k = q, l = f;
        if (!l) {
            l = o.formatFunction || A.formatFunction
        }
        if (!k) {
            k = o.formatSettings || A.formatSettings
        }
        if (!o.formatFunction && o.formatSettings) {
            l = undefined
        }
        var p = {}, v = 0;
        for (var c in o) {
            if (c.indexOf("dataField") == 0) {
                p[c.substring(9).toLowerCase()] = this._getDataValue(C, o[c], h);
                v++
            }
        }
        if (v == 0) {
            p = this._getDataValue(C, undefined, h)
        }
        if (A.type.indexOf("waterfall") != -1 && this._isSummary(h, C)) {
            p = this._renderData[h].offsets[j][C].value;
            v = 0
        }
        if (l && a.isFunction(l)) {
            try {
                return l(v == 1 ? p[""] : p, C, o, A)
            } catch (B) {
                return B.message
            }
        }
        if (v == 1 && this._isPieGroup(h)) {
            return this._formatValue(p[""], k, l, h, j, C)
        }
        if (v > 0) {
            var w = 0;
            for (var c in p) {
                if (w > 0 && n != "") {
                    n += "<br>"
                }
                var u = "dataField" + (c.length > 0 ? c.substring(0, 1).toUpperCase() + c.substring(1) : "");
                var t = "displayText" + (c.length > 0 ? c.substring(0, 1).toUpperCase() + c.substring(1) : "");
                var z = o[t] || o[u];
                var d = p[c];
                if (undefined != d) {
                    d = this._formatValue(d, k, l, h, j, C)
                } else {
                    continue
                }
                if (m === true) {
                    n += d
                } else {
                    n += z + ": " + d
                }
                w++
            }
        } else {
            if (undefined != p) {
                n = this._formatValue(p, k, l, h, j, C)
            }
        }
        return n || ""
    }, _isNumberAsString: function (e) {
        if (typeof(e) != "string") {
            return false
        }
        e = a.trim(e);
        for (var c = 0; c < e.length; c++) {
            var d = e.charAt(c);
            if ((d >= "0" && d <= "9") || d == "," || d == ".") {
                continue
            }
            if (d == "-" && c == 0) {
                continue
            }
            if ((d == "(" && c == 0) || (d == ")" && c == e.length - 1)) {
                continue
            }
            return false
        }
        return true
    }, _castAsDate: function (h, d) {
        if (h instanceof Date && !isNaN(h)) {
            return h
        }
        if (typeof(h) == "string") {
            var c;
            if (d) {
                c = a.jqx.dataFormat.parsedate(h, d);
                if (this._isDate(c)) {
                    return c
                }
            }
            if (a.jqx.dataFormat) {
                c = a.jqx.dataFormat.tryparsedate(h, undefined, false);
                if (this._isDate(c)) {
                    return c
                }
            }
            if (this._autoDateFormats) {
                for (var f = 0; f < this._autoDateFormats.length; f++) {
                    c = a.jqx.dataFormat.parsedate(h, this._autoDateFormats[f]);
                    if (this._isDate(c)) {
                        return c
                    }
                }
            }
            var e = this._detectDateFormat(h);
            if (e) {
                c = a.jqx.dataFormat.parsedate(h, e);
                if (this._isDate(c)) {
                    this._autoDateFormats.push(e);
                    return c
                }
            }
            c = new Date(h);
            if (this._isDate(c)) {
                if (h.indexOf(":") == -1) {
                    c.setHours(0, 0, 0, 0)
                }
            }
            return c
        }
        return undefined
    }, _castAsNumber: function (d) {
        if (d instanceof Date && !isNaN(d)) {
            return d.valueOf()
        }
        if (typeof(d) == "string") {
            if (this._isNumber(d)) {
                d = parseFloat(d)
            } else {
                if (!/[a-zA-Z]/.test(d)) {
                    var c = new Date(d);
                    if (c != undefined) {
                        d = c.valueOf()
                    }
                }
            }
        }
        return d
    }, _isNumber: function (c) {
        if (typeof(c) == "string") {
            if (this._isNumberAsString(c)) {
                c = parseFloat(c)
            }
        }
        return typeof c === "number" && isFinite(c)
    }, _isDate: function (c) {
        return c instanceof Date && !isNaN(c.getDate())
    }, _isBoolean: function (c) {
        return typeof c === "boolean"
    }, _isObject: function (c) {
        return(c && (typeof c === "object" || a.isFunction(c))) || false
    }, _formatDate: function (e, d) {
        var c = e.toString();
        if (d) {
            if (d.dateFormat) {
                c = a.jqx.dataFormat.formatDate(e, d.dateFormat)
            }
            c = (d.prefix || "") + c + (d.sufix || "")
        }
        return c
    }, _formatNumber: function (p, f) {
        if (!this._isNumber(p)) {
            return p
        }
        f = f || {};
        var t = ".";
        var q = "";
        var u = this;
        if (u.localization) {
            t = u.localization.decimalSeparator || u.localization.decimalseparator || t;
            q = u.localization.thousandsSeparator || u.localization.thousandsseparator || q
        }
        if (f.decimalSeparator) {
            t = f.decimalSeparator
        }
        if (f.thousandsSeparator) {
            q = f.thousandsSeparator
        }
        var o = f.prefix || "";
        var s = f.sufix || "";
        var k = f.decimalPlaces;
        if (isNaN(k)) {
            k = ((p * 100 != parseInt(p) * 100) ? 2 : 0)
        }
        var n = f.negativeWithBrackets || false;
        var j = (p < 0);
        if (j && n) {
            p *= -1
        }
        var e = p.toString();
        var c;
        var m = Math.pow(10, k);
        e = (Math.round(p * m) / m).toString();
        if (isNaN(e)) {
            e = ""
        }
        c = e.lastIndexOf(".");
        if (k > 0) {
            if (c < 0) {
                e += t;
                c = e.length - 1
            } else {
                if (t !== ".") {
                    e = e.replace(".", t)
                }
            }
            while ((e.length - 1 - c) < k) {
                e += "0"
            }
        }
        c = e.lastIndexOf(t);
        c = (c > -1) ? c : e.length;
        var h = e.substring(c);
        var d = 0;
        for (var l = c; l > 0; l--, d++) {
            if ((d % 3 === 0) && (l !== c) && (!j || (l > 1) || (j && n))) {
                h = q + h
            }
            h = e.charAt(l - 1) + h
        }
        e = h;
        if (j && n) {
            e = "(" + e + ")"
        }
        return o + e + s
    }, _defaultNumberFormat: {prefix: "", sufix: "", decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, negativeWithBrackets: false}, _calculateControlPoints: function (i, h) {
        var f = i[h], o = i[h + 1], e = i[h + 2], l = i[h + 3], d = i[h + 4], k = i[h + 5];
        var n = 0.4;
        var q = Math.sqrt(Math.pow(e - f, 2) + Math.pow(l - o, 2));
        var c = Math.sqrt(Math.pow(d - e, 2) + Math.pow(k - l, 2));
        var j = (q + c);
        if (j == 0) {
            j = 1
        }
        var p = n * q / j;
        var m = n - p;
        return[e + p * (f - d), l + p * (o - k), e - m * (f - d), l - m * (o - k)]
    }, _getBezierPoints: function (e) {
        var d = "";
        var k = [], f = [];
        var j = e.split(" ");
        for (var h = 0; h < j.length; h++) {
            var l = j[h].split(",");
            k.push(parseFloat(l[0]));
            k.push(parseFloat(l[1]));
            if (isNaN(k[k.length - 1]) || isNaN(k[k.length - 2])) {
                continue
            }
        }
        var c = k.length;
        if (c <= 1) {
            return""
        } else {
            if (c == 2) {
                d = "M" + a.jqx._ptrnd(k[0]) + "," + a.jqx._ptrnd(k[1]) + " L" + a.jqx._ptrnd(k[0] + 1) + "," + a.jqx._ptrnd(k[1] + 1) + " ";
                return d
            }
        }
        for (var h = 0; h < c - 4; h += 2) {
            f = f.concat(this._calculateControlPoints(k, h))
        }
        for (var h = 2; h < c - 5; h += 2) {
            d += " C" + a.jqx._ptrnd(f[2 * h - 2]) + "," + a.jqx._ptrnd(f[2 * h - 1]) + " " + a.jqx._ptrnd(f[2 * h]) + "," + a.jqx._ptrnd(f[2 * h + 1]) + " " + a.jqx._ptrnd(k[h + 2]) + "," + a.jqx._ptrnd(k[h + 3]) + " "
        }
        if (c < 4 || (Math.abs(k[0] - k[2]) < 3 || Math.abs(k[1] - k[3]) < 3) || this._isVML) {
            d = "M" + a.jqx._ptrnd(k[0]) + "," + a.jqx._ptrnd(k[1]) + " L" + a.jqx._ptrnd(k[2]) + "," + a.jqx._ptrnd(k[3]) + " " + d
        } else {
            d = "M" + a.jqx._ptrnd(k[0]) + "," + a.jqx._ptrnd(k[1]) + " Q" + a.jqx._ptrnd(f[0]) + "," + a.jqx._ptrnd(f[1]) + " " + a.jqx._ptrnd(k[2]) + "," + a.jqx._ptrnd(k[3]) + " " + d
        }
        if (Math.abs(k[c - 2] - k[c - 4]) < 3 || Math.abs(k[c - 1] - k[c - 3]) < 3 || this._isVML) {
            d += " L" + a.jqx._ptrnd(k[c - 2]) + "," + a.jqx._ptrnd(k[c - 1]) + " "
        } else {
            d += " Q" + a.jqx._ptrnd(f[c * 2 - 10]) + "," + a.jqx._ptrnd(f[c * 2 - 9]) + " " + a.jqx._ptrnd(k[c - 2]) + "," + a.jqx._ptrnd(k[c - 1]) + " "
        }
        return d
    }, _animTickInt: 50, _createAnimationGroup: function (c) {
        if (!this._animGroups) {
            this._animGroups = {}
        }
        this._animGroups[c] = {animations: [], startTick: NaN}
    }, _startAnimation: function (e) {
        var f = new Date();
        var c = f.getTime();
        this._animGroups[e].startTick = c;
        this._runAnimation();
        this._enableAnimTimer()
    }, _enqueueAnimation: function (f, e, d, i, h, c, j) {
        if (i < 0) {
            i = 0
        }
        if (j == undefined) {
            j = "easeInOutSine"
        }
        this._animGroups[f].animations.push({key: e, properties: d, duration: i, fn: h, context: c, easing: j})
    }, _stopAnimations: function () {
        clearTimeout(this._animtimer);
        this._animtimer = undefined;
        this._animGroups = undefined
    }, _enableAnimTimer: function () {
        if (!this._animtimer) {
            var c = this;
            this._animtimer = setTimeout(function () {
                c._runAnimation()
            }, this._animTickInt)
        }
    }, _runAnimation: function (t) {
        if (this._animGroups) {
            var w = new Date();
            var l = w.getTime();
            var s = {};
            for (var n in this._animGroups) {
                var v = this._animGroups[n].animations;
                var o = this._animGroups[n].startTick;
                var k = 0;
                for (var q = 0; q < v.length; q++) {
                    var z = v[q];
                    var c = (l - o);
                    if (z.duration > k) {
                        k = z.duration
                    }
                    var u = z.duration > 0 ? c / z.duration : 1;
                    var m = u;
                    if (z.easing && z.duration != 0) {
                        m = a.easing[z.easing](u, c, 0, 1, z.duration)
                    }
                    if (u > 1) {
                        u = 1;
                        m = 1
                    }
                    if (z.fn) {
                        z.fn(z.key, z.context, m);
                        continue
                    }
                    var h = {};
                    for (var n = 0; n < z.properties.length; n++) {
                        var e = z.properties[n];
                        var f = 0;
                        if (u == 1) {
                            f = e.to
                        } else {
                            f = easeParecent * (e.to - e.from) + e.from
                        }
                        h[e.key] = f
                    }
                    this.renderer.attr(z.key, h)
                }
                if (o + k > l) {
                    s[n] = ({startTick: o, animations: v})
                }
            }
            this._animGroups = s;
            if (this.renderer instanceof a.jqx.HTML5Renderer) {
                this.renderer.refresh()
            }
        }
        this._animtimer = null;
        for (var n in this._animGroups) {
            this._enableAnimTimer();
            break
        }
    }, _fixCoords: function (e, f) {
        var c = this.seriesGroups[f].orientation == "horizontal";
        if (!c) {
            return e
        }
        var d = e.x;
        e.x = e.y;
        e.y = d + this._plotRect.y - this._plotRect.x;
        var d = e.width;
        e.width = e.height;
        e.height = d;
        return e
    }, getItemCoord: function (c, e, w) {
        var l = this;
        if (!l._isSerieVisible(c, e) || !l._renderData || l._renderData.length <= c) {
            return{x: NaN, y: NaN}
        }
        var t = l.seriesGroups[c];
        var k = t.series[e];
        var p = l._getItemCoord(c, e, w);
        if (l._isPieGroup(c)) {
            var j = this._plotRect;
            var q = p.fromAngle * (Math.PI / 180);
            var f = p.toAngle * (Math.PI / 180);
            x1 = j.x + p.center.x + Math.cos(q) * p.outerRadius;
            x2 = j.x + p.center.x + Math.cos(f) * p.outerRadius;
            y1 = j.y + p.center.y - Math.sin(q) * p.outerRadius;
            y2 = j.y + p.center.y - Math.sin(f) * p.outerRadius;
            var i = Math.min(x1, x2);
            var n = Math.abs(x2 - x1);
            var h = Math.min(y1, y2);
            var m = Math.abs(y2 - y1);
            p = {x: i, y: h, width: n, height: m, center: p.center, centerOffset: p.centerOffset, innerRadius: p.innerRadius, outerRadius: p.outerRadius, fromAngle: p.fromAngle, toAngle: p.toAngle};
            return p
        }
        if (t.type.indexOf("column") != -1 || t.type.indexOf("waterfall") != -1) {
            var z = this._getColumnSerieWidthAndOffset(c, e);
            p.height = Math.abs(p.y.to - p.y.from);
            p.y = Math.min(p.y.to, p.y.from);
            p.x += z.offset;
            p.width = z.width
        } else {
            if (t.type.indexOf("ohlc") != -1 || t.type.indexOf("candlestick") != -1) {
                var z = this._getColumnSerieWidthAndOffset(c, e);
                var h = p.y;
                var v = Math.min(h.Open, h.Close, h.Low, h.High);
                var u = Math.max(h.Open, h.Close, h.Low, h.High);
                p.height = Math.abs(u - v);
                p.y = v;
                p.x += z.offset;
                p.width = z.width
            } else {
                if (t.type.indexOf("line") != -1 || t.type.indexOf("area") != -1) {
                    p.width = p.height = 0;
                    p.y = p.y.to
                } else {
                    if (t.type.indexOf("bubble") != -1 || t.type.indexOf("scatter") != -1) {
                        p.center = {x: p.x, y: p.y.to};
                        var d = p.y.radius;
                        if (k.symbolType != "circle" && k.symbolType != undefined) {
                            d /= 2
                        }
                        p.y = p.y.to;
                        p.radius = d;
                        p.width = 2 * d;
                        p.height = 2 * d
                    }
                }
            }
        }
        p = this._fixCoords(p, c);
        if (t.polar || t.spider) {
            var o = this._toPolarCoord(this._renderData[c].polarCoords, this._plotRect, p.x, p.y);
            p.x = o.x;
            p.y = o.y;
            if (p.center) {
                p.center = this._toPolarCoord(this._renderData[c].polarCoords, this._plotRect, p.center.x, p.center.y)
            }
        }
        if (t.type.indexOf("bubble") != -1 || t.type.indexOf("scatter") != -1) {
            p.x -= d;
            p.y -= d
        }
        return p
    }, _getItemCoord: function (p, k, c) {
        var f = this.seriesGroups[p], m, l;
        if (!f || !this._renderData) {
            return{x: NaN, y: NaN}
        }
        var h = f.series[k];
        if (!h) {
            return{x: NaN, y: NaN}
        }
        var j = this._plotRect;
        if (this._isPieGroup(p)) {
            var n = this._renderData[p].offsets[k][c];
            if (!n) {
                return{x: NaN, y: NaN}
            }
            var d = (n.fromAngle + n.toAngle) / 2 * (Math.PI / 180);
            m = j.x + n.x + Math.cos(d) * n.outerRadius;
            l = j.y + n.y - Math.sin(d) * n.outerRadius;
            return{x: m, y: l, center: {x: n.x, y: n.y}, centerOffset: n.centerOffset, innerRadius: n.innerRadius, outerRadius: n.outerRadius, fromAngle: n.fromAngle, toAngle: n.toAngle}
        } else {
            m = j.x + this._renderData[p].xoffsets.data[c];
            l = this._renderData[p].offsets[k][c];
            if (isNaN(m) || !l) {
                return{x: NaN, y: NaN}
            }
        }
        var o = {};
        for (var e in l) {
            o[e] = l[e]
        }
        return{x: m, y: o}
    }, _detectDateFormat: function (k, f) {
        var e = {en_US_d: "M/d/yyyy", en_US_D: "dddd, MMMM dd, yyyy", en_US_t: "h:mm tt", en_US_T: "h:mm:ss tt", en_US_f: "dddd, MMMM dd, yyyy h:mm tt", en_US_F: "dddd, MMMM dd, yyyy h:mm:ss tt", en_US_M: "MMMM dd", en_US_Y: "yyyy MMMM", en_US_S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss", en_CA_d: "dd/MM/yyyy", en_CA_D: "MMMM-dd-yy", en_CA_f: "MMMM-dd-yy h:mm tt", en_CA_F: "MMMM-dd-yy h:mm:ss tt", ISO: "yyyy-MM-dd hh:mm:ss", ISO2: "yyyy-MM-dd HH:mm:ss", d1: "dd.MM.yyyy", d2: "dd-MM-yyyy", zone1: "yyyy-MM-ddTHH:mm:ss-HH:mm", zone2: "yyyy-MM-ddTHH:mm:ss+HH:mm", custom: "yyyy-MM-ddTHH:mm:ss.fff", custom2: "yyyy-MM-dd HH:mm:ss.fff", de_DE_d: "dd.MM.yyyy", de_DE_D: "dddd, d. MMMM yyyy", de_DE_t: "HH:mm", de_DE_T: "HH:mm:ss", de_DE_f: "dddd, d. MMMM yyyy HH:mm", de_DE_F: "dddd, d. MMMM yyyy HH:mm:ss", de_DE_M: "dd MMMM", de_DE_Y: "MMMM yyyy", fr_FR_d: "dd/MM/yyyy", fr_FR_D: "dddd d MMMM yyyy", fr_FR_t: "HH:mm", fr_FR_T: "HH:mm:ss", fr_FR_f: "dddd d MMMM yyyy HH:mm", fr_FR_F: "dddd d MMMM yyyy HH:mm:ss", fr_FR_M: "d MMMM", fr_FR_Y: "MMMM yyyy", it_IT_d: "dd/MM/yyyy", it_IT_D: "dddd d MMMM yyyy", it_IT_t: "HH:mm", it_IT_T: "HH:mm:ss", it_IT_f: "dddd d MMMM yyyy HH:mm", it_IT_F: "dddd d MMMM yyyy HH:mm:ss", it_IT_M: "dd MMMM", it_IT_Y: "MMMM yyyy", ru_RU_d: "dd.MM.yyyy", ru_RU_D: "d MMMM yyyy '?.'", ru_RU_t: "H:mm", ru_RU_T: "H:mm:ss", ru_RU_f: "d MMMM yyyy '?.' H:mm", ru_RU_F: "d MMMM yyyy '?.' H:mm:ss", ru_RU_Y: "MMMM yyyy", cs_CZ_d: "d.M.yyyy", cs_CZ_D: "d. MMMM yyyy", cs_CZ_t: "H:mm", cs_CZ_T: "H:mm:ss", cs_CZ_f: "d. MMMM yyyy H:mm", cs_CZ_F: "d. MMMM yyyy H:mm:ss", cs_CZ_M: "dd MMMM", cs_CZ_Y: "MMMM yyyy", he_IL_d: "dd MMMM yyyy", he_IL_D: "dddd dd MMMM yyyy", he_IL_t: "HH:mm", he_IL_T: "HH:mm:ss", he_IL_f: "dddd dd MMMM yyyy HH:mm", he_IL_F: "dddd dd MMMM yyyy HH:mm:ss", he_IL_M: "dd MMMM", he_IL_Y: "MMMM yyyy", hr_HR_d: "d.M.yyyy.", hr_HR_D: "d. MMMM yyyy.", hr_HR_t: "H:mm", hr_HR_T: "H:mm:ss", hr_HR_f: "d. MMMM yyyy. H:mm", hr_HR_F: "d. MMMM yyyy. H:mm:ss", hr_HR_M: "d. MMMM", hu_HU_d: "yyyy.MM.dd.", hu_HU_D: "yyyy. MMMM d.", hu_HU_t: "H:mm", hu_HU_T: "H:mm:ss", hu_HU_f: "yyyy. MMMM d. H:mm", hu_HU_F: "yyyy. MMMM d. H:mm:ss", hu_HU_M: "MMMM d.", hu_HU_Y: "yyyy. MMMM", jp_JP_d: "gg y/M/d", jp_JP_D: "gg y'?'M'?'d'?'", jp_JP_t: "H:mm", jp_JP_T: "H:mm:ss", jp_JP_f: "gg y'?'M'?'d'?' H:mm", jp_JP_F: "gg y'?'M'?'d'?' H:mm:ss", jp_JP_M: "M'?'d'?'", jp_JP_Y: "gg y'?'M'?'", lt_LT_d: "yyyy.MM.dd", lt_LT_D: "yyyy 'm.' MMMM d 'd.'", lt_LT_t: "HH:mm", lt_LT_T: "HH:mm:ss", lt_LT_f: "yyyy 'm.' MMMM d 'd.' HH:mm", lt_LT_F: "yyyy 'm.' MMMM d 'd.' HH:mm:ss", lt_LT_M: "MMMM d 'd.'", lt_LT_Y: "yyyy 'm.' MMMM", sa_IN_d: "dd-MM-yyyy", sa_IN_D: "dd MMMM yyyy dddd", sa_IN_t: "HH:mm", sa_IN_T: "HH:mm:ss", sa_IN_f: "dd MMMM yyyy dddd HH:mm", sa_IN_F: "dd MMMM yyyy dddd HH:mm:ss", sa_IN_M: "dd MMMM", basic_y: "yyyy", basic_ym: "yyyy-MM", basic_d: "yyyy-MM-dd", basic_dhm: "yyyy-MM-dd hh:mm", basic_bhms: "yyyy-MM-dd hh:mm:ss", basic2_ym: "MM-yyyy", basic2_d: "MM-dd-yyyy", basic2_dhm: "MM-dd-yyyy hh:mm", basic2_dhms: "MM-dd-yyyy hh:mm:ss", basic3_ym: "yyyy/MM", basic3_d: "yyyy/MM/dd", basic3_dhm: "yyyy/MM/dd hh:mm", basic3_bhms: "yyyy/MM/dd hh:mm:ss", basic4_ym: "MM/yyyy", basic4_d: "MM/dd/yyyy", basic4_dhm: "MM/dd/yyyy hh:mm", basic4_dhms: "MM/dd/yyyy hh:mm:ss"};
        if (f) {
            e = a.extend({}, e, f)
        }
        var d = [];
        if (!a.isArray(k)) {
            d.push(k)
        } else {
            d = k
        }
        for (var h in e) {
            e[h] = {format: e[h], count: 0}
        }
        for (var l = 0; l < d.length; l++) {
            value = d[l];
            if (value == null || value == undefined) {
                continue
            }
            for (var h in e) {
                var c = a.jqx.dataFormat.parsedate(value, e[h].format);
                if (c != null) {
                    e[h].count++
                }
            }
        }
        var m = {key: undefined, count: 0};
        for (var h in e) {
            if (e[h].count > m.count) {
                m.key = h;
                m.count = e[h].count
            }
        }
        return m.key ? e[m.key].format : ""
    }, _testXAxisDateFormat: function (k) {
        var m = this;
        var e = m._getXAxis(k);
        var d = m._getDataLen(k);
        var f = {};
        if (m.localization && m.localization.patterns) {
            for (var l in m.localization.patterns) {
                f["local_" + l] = m.localization.patterns[l]
            }
        }
        var j = [];
        for (var h = 0; h < d && h < 10; h++) {
            value = m._getDataValue(h, e.dataField, k);
            if (value == null || value == undefined) {
                continue
            }
            j.push(value)
        }
        var c = m._detectDateFormat(j, f);
        return c
    }})
})(jqxBaseFramework);
(function (a) {
    a.extend(a.jqx._jqxChart.prototype, {_moduleApi: true, getItemsCount: function (h, c) {
        var e = this.seriesGroups[h];
        if (!this._isSerieVisible(h, c)) {
            return 0
        }
        var f = this._renderData;
        if (!e || !f || f.length <= h) {
            return 0
        }
        var d = e.series[c];
        if (!d) {
            return 0
        }
        return f[h].offsets[c].length
    }, getXAxisRect: function (d) {
        var c = this._renderData;
        if (!c || c.length <= d) {
            return undefined
        }
        if (!c[d].xAxis) {
            return undefined
        }
        return c[d].xAxis.rect
    }, getXAxisLabels: function (m) {
        var e = [];
        var n = this._renderData;
        if (!n || n.length <= m) {
            return e
        }
        n = n[m].xAxis;
        if (!n) {
            return e
        }
        var l = this.seriesGroups[m];
        if (l.polar || l.spider) {
            for (var f = 0; f < n.polarLabels.length; f++) {
                var k = n.polarLabels[f];
                e.push({offset: {x: k.x, y: k.y}, value: k.value})
            }
            return e
        }
        var d = this._getXAxis(m);
        var j = this.getXAxisRect(m);
        var c = d.position == "top" || d.position == "right";
        var h = l.orientation == "horizontal";
        for (var f = 0; f < n.data.length; f++) {
            if (h) {
                e.push({offset: {x: j.x + (c ? 0 : j.width), y: j.y + n.data.data[f]}, value: n.data.xvalues[f]})
            } else {
                e.push({offset: {x: j.x + n.data.data[f], y: j.y + (c ? j.height : 0)}, value: n.data.xvalues[f]})
            }
        }
        return e
    }, getValueAxisRect: function (d) {
        var c = this._renderData;
        if (!c || c.length <= d) {
            return undefined
        }
        if (!c[d].valueAxis) {
            return undefined
        }
        return c[d].valueAxis.rect
    }, getValueAxisLabels: function (k) {
        var d = [];
        var l = this._renderData;
        if (!l || l.length <= k) {
            return d
        }
        l = l[k].valueAxis;
        if (!l) {
            return d
        }
        var m = this._getValueAxis(k);
        var c = m.position == "top" || m.position == "right";
        var j = this.seriesGroups[k];
        var f = j.orientation == "horizontal";
        if (j.polar || j.spider) {
            for (var e = 0; e < l.polarLabels.length; e++) {
                var h = l.polarLabels[e];
                d.push({offset: {x: h.x, y: h.y}, value: h.value})
            }
            return d
        }
        for (var e = 0; e < l.items.length; e++) {
            if (f) {
                d.push({offset: {x: l.itemOffsets[l.items[e]].x + l.itemWidth / 2, y: l.rect.y + (c ? l.rect.height : 0)}, value: l.items[e]})
            } else {
                d.push({offset: {x: l.rect.x + l.rect.width, y: l.itemOffsets[l.items[e]].y + l.itemWidth / 2}, value: l.items[e]})
            }
        }
        return d
    }, getPlotAreaRect: function () {
        return this._plotRect
    }, getRect: function () {
        return this._rect
    }, showToolTip: function (h, d, f, c, e) {
        var i = this.getItemCoord(h, d, f);
        if (isNaN(i.x) || isNaN(i.y)) {
            return
        }
        this._startTooltipTimer(h, d, f, i.x, i.y, c, e)
    }, hideToolTip: function (d) {
        if (isNaN(d)) {
            d = 0
        }
        var c = this;
        c._cancelTooltipTimer();
        setTimeout(function () {
            c._hideToolTip(0)
        }, d)
    }})
})(jqxBaseFramework);
(function (a) {
    a.extend(a.jqx._jqxChart.prototype, {_moduleAnnotations: true, _renderAnnotation: function (h, j, d) {
        var l = this.seriesGroups[h];
        var t = this.renderer;
        if (isNaN(h)) {
            return
        }
        var n = this._get([this.getXAxisDataPointOffset(j.xValue, h), j.x]);
        var m = this._get([this.getValueAxisDataPointOffset(j.yValue, h), j.y]);
        var A = this._get([this.getXAxisDataPointOffset(j.xValue2, h), j.x2]);
        var f = this._get([this.getValueAxisDataPointOffset(j.yValue2, h), j.y2]);
        if (l.polar || l.spider) {
            var u = this.getPolarDataPointOffset(j.xValue, j.yValue, h);
            if (u && !isNaN(u.x) && !isNaN(u.y)) {
                n = u.x;
                m = u.y
            } else {
                n = j.x;
                m = j.y
            }
        }
        if (isNaN(m) || isNaN(n)) {
            return false
        }
        if (l.orientation == "horizontal") {
            var B = n;
            n = m;
            m = B;
            B = A;
            A = f;
            f = B
        }
        if (j.offset) {
            if (!isNaN(j.offset.x)) {
                n += j.offset.x;
                A += j.offset.x
            }
            if (!isNaN(j.offset.y)) {
                m += j.offset.y;
                f += j.offset.y
            }
        }
        var s = this._get([j.width, A - n]);
        var q = this._get([j.height, f - m]);
        var e;
        switch (j.type) {
            case"rect":
                e = t.rect(n, m, s, q);
                break;
            case"circle":
                e = t.rect(n, m, j.radius);
                break;
            case"line":
                e = t.rect(n, m, A, f);
                break;
            case"path":
                e = t.path(j.path);
                break
        }
        t.attr(e, {fill: j.fillColor, stroke: j.lineColor, opacity: this._get([j.fillOpacity, j.opacity]), "stroke-opacity": this._get([j.lineOpacity, j.opacity]), "stroke-width": j.lineWidth, "stroke-dasharray": j.dashStyle || "none"});
        var z;
        if (j.text) {
            var o = j.text;
            var C = 0, k = 0;
            if (o.offset) {
                if (!isNaN(o.offset.x)) {
                    C += o.offset.x
                }
                if (!isNaN(o.offset.y)) {
                    k += o.offset.y
                }
            }
            z = t.text(o.value, n + C, m + k, NaN, NaN, o.angle, {}, o.clip === true, o.horizontalAlignment || "center", o.verticalAlignment || "center", o.rotationPoint || "centermiddle");
            t.attr(z, {fill: o.fillColor, stroke: o.lineColor, "class": o["class"]})
        }
        var c = ["click", "mouseenter", "mouseleave"];
        var p = this;
        for (var w = 0; w < c.length; w++) {
            var v = this._getEvent(c[w]) || c[w];
            if (e) {
                this.renderer.addHandler(e, v, function () {
                    p._raiseAnnotationEvent(j, v)
                })
            }
            if (z) {
                this.renderer.addHandler(z, v, function () {
                    p._raiseAnnotationEvent(j, v)
                })
            }
        }
    }, _raiseAnnotationEvent: function (c, d) {
        this._raiseEvent("annotation_" + d, {annotation: c})
    }})
})(jqxBaseFramework);
(function (a) {
    a.extend(a.jqx._jqxChart.prototype, {_moduleRangeSelector: true, _renderXAxisRangeSelector: function (p, n) {
        var s = this;
        s._isTouchDevice = a.jqx.mobile.isTouchDevice();
        var i = s.seriesGroups[p];
        var e = s._getXAxis(p);
        var l = e ? e.rangeSelector : undefined;
        if (!s._isSelectorRefresh) {
            var q = (l && l.renderTo) ? l.renderTo : s.host;
            q.find(".rangeSelector").remove()
        }
        if (!e || e.visible == false || i.type == "spider") {
            return false
        }
        if (!s._isGroupVisible(p)) {
            return false
        }
        if (!l) {
            return false
        }
        var h = i.orientation == "horizontal";
        if (l.renderTo) {
            h = false
        }
        if (s.rtl) {
            e.flip = true
        }
        var d = h ? this.host.height() : this.host.width();
        d -= 4;
        var o = this._getXAxisStats(p, e, d);
        var k = e.position;
        if (l.renderTo && l.position) {
            k = l.position
        }
        if (!this._isSelectorRefresh) {
            var m = l.renderTo;
            var c = "<div class='rangeSelector jqx-disableselect' style='position: absolute; background-color: transparent;' onselectstart='return false;'></div>";
            var f = a(c).appendTo(m ? m : this.host.find(".chartContainer"));
            if (!m) {
                var j = this.host.coord();
                selectorSize = this._selectorGetSize(e);
                if (!h) {
                    f.css("left", j.left + 1);
                    f.css("top", j.top + n.y + (k != "top" ? n.height : -selectorSize));
                    f.css("height", selectorSize);
                    f.css("width", d)
                } else {
                    f.css("left", j.left + 1 + n.x + (k != "right" ? -selectorSize : n.width));
                    f.css("top", j.top);
                    f.css("height", d);
                    f.css("width", selectorSize);
                    n.height = selectorSize
                }
            } else {
                f.css({width: m.width(), height: m.height()});
                n.width = m.width();
                n.height = m.height()
            }
            this._refreshSelector(p, e, o, f, n, h)
        }
        this._isSelectorRefresh = false;
        return true
    }, _refreshSelector: function (h, f, e, F, d, c) {
        var k = {};
        var z = f.rangeSelector;
        var m = this.seriesGroups[h];
        for (var B in z) {
            k[B] = z[B]
        }
        delete k.padding;
        var u = k.minValue;
        var A = k.maxValue;
        if (undefined == u) {
            u = Math.min(e.min.valueOf(), e.dsRange.min.valueOf())
        }
        if (undefined == A) {
            A = Math.max(e.max.valueOf(), e.dsRange.max.valueOf())
        }
        if (this._isDate(e.min)) {
            u = new Date(u)
        }
        if (this._isDate(e.max)) {
            A = new Date(A)
        }
        var n = f.position;
        if (z.renderTo && z.position) {
            n = z.position
        }
        k.dataField = f.dataField;
        k.rangeSelector = undefined;
        k.type = f.type;
        k.baseUnit = z.baseUnit || f.baseUnit;
        k.minValue = u;
        k.maxValue = A;
        k.flip = f.flip;
        k.position = n;
        var l = 5;
        var t = 2, E = 2, D = 2, H = 2;
        if (!z.renderTo) {
            t = c ? 0 : d.x;
            E = c ? 0 : this._rect.width - d.x - d.width;
            D = c ? d.y : l;
            H = c ? this._paddedRect.height - this._plotRect.height : l
        }
        var p = z.padding;
        if (p == undefined && !z.renderTo) {
            p = {left: t, top: D, right: E, bottom: H}
        } else {
            p = {left: ((p && p.left) ? p.left : t), top: ((p && p.top) ? p.top : D), right: ((p && p.right) ? p.right : E), bottom: ((p && p.bottom) ? p.bottom : H)}
        }
        var w = f.rangeSelector.dataField;
        for (var B = 0; undefined == w && B < this.seriesGroups.length; B++) {
            for (var v = 0; undefined == w && v < this.seriesGroups[B].series.length; v++) {
                w = this.seriesGroups[B].series[v].dataField
            }
        }
        var o = {padding: p, title: z.title || "", description: z.description || "", titlePadding: z.titlePadding, colorScheme: z.colorScheme || this.colorScheme, backgroundColor: z.backgroundColor || this.backgroundColor || "transparent", backgroundImage: z.backgroundImage || "", showBorderLine: z.showBorderLine || (z.renderTo ? true : false), borderLineWidth: z.borderLineWidth || this.borderLineWidth, borderLineColor: z.borderLineColor || this.borderLineColor, rtl: z.rtl || this.rtl, greyScale: z.greyScale || this.greyScale, showLegend: false, enableAnimations: false, enableEvents: false, showToolTips: false, source: this.source, xAxis: k, seriesGroups: [
            {orientation: c ? "horizontal" : "vertical", valueAxis: {visible: false}, type: f.rangeSelector.serieType || "area", series: [
                {dataField: w, opacity: 0.8, lineWidth: 1}
            ]}
        ]};
        F.empty();
        F.jqxChart(o);
        var q = this;
        F.on(q._getEvent("mousemove"), function () {
            q._unselect();
            q._hideToolTip()
        });
        var C = F.jqxChart("getInstance");
        if (!C._plotRect) {
            return
        }
        var G = C._paddedRect;
        G.height = C._plotRect.height;
        if (!c && n == "top") {
            G.y += C._renderData[0].xAxis.rect.height
        } else {
            if (c) {
                var s = C._renderData[0].xAxis.rect.width;
                G.width -= s;
                if (n != "right") {
                    G.x += s
                }
            }
        }
        q._createSliderElements(h, F, G, z);
        q.addHandler(a(document), q._getEvent("mousemove") + "." + q.element.id, q._onSliderMouseMove, {self: this, groupIndex: h, renderTo: F, swapXY: c});
        q.addHandler(a(F), q._getEvent("mousedown"), q._onSliderMouseDown, {self: this, groupIndex: h, renderTo: F, swapXY: c});
        q.addHandler(a(F), q._getEvent("mouseup"), q._onSliderMouseUp, {self: this, groupIndex: h, renderTo: F, swapXY: c})
    }, _createSliderElements: function (u, n, o, p) {
        n.find(".slider").remove();
        var t = p.colorSelectedRange || "blue";
        var i = p.colorUnselectedRange || "white";
        var c = a("<div class='slider' style='position: absolute;'></div>");
        c.css({background: t, opacity: 0.1, left: o.x, top: o.y, width: o.width, height: o.height});
        c.appendTo(n);
        if (!this._sliders) {
            this._sliders = []
        }
        while (this._sliders.length < u + 1) {
            this._sliders.push({})
        }
        var l = "<div class='slider' style='position: absolute;  background: " + i + "; opacity: 0.5;'></div>";
        var d = "<div class='slider' style='position: absolute; background: grey; opacity: 0.5;'></div>";
        var j = "<div class='slider jqx-rc-all' style='position: absolute; background: white; border-style: solid; border-width: 1px; border-color: grey;'></div>";
        this._sliders[u] = {element: c, host: n, fullRect: {x: c.coord().left, y: c.coord().top, width: o.width, height: o.height}, rect: o, left: a(l), right: a(l), leftTop: a(d), rightTop: a(d), leftBorder: a(d), leftBar: a(j), rightBorder: a(d), rightBar: a(j)};
        this._sliders[u].left.appendTo(n);
        this._sliders[u].right.appendTo(n);
        this._sliders[u].leftTop.appendTo(n);
        this._sliders[u].rightTop.appendTo(n);
        this._sliders[u].leftBorder.appendTo(n);
        this._sliders[u].rightBorder.appendTo(n);
        this._sliders[u].leftBar.appendTo(n);
        this._sliders[u].rightBar.appendTo(n);
        var s = this._renderData[u].xAxis;
        var f = s.data.axisStats;
        var q = f.min.valueOf();
        var h = f.max.valueOf();
        var k = this._valueToOffset(u, q);
        var m = this._valueToOffset(u, h);
        if (k > m) {
            var e = m;
            m = k;
            k = e
        }
        if (this.seriesGroups[u].orientation != "horizontal") {
            c.css({left: Math.round(o.x + k), top: o.y, width: Math.round(m - k), height: o.height})
        } else {
            c.css({top: Math.round(o.y + k), left: o.x, height: Math.round(m - k), width: o.width})
        }
        this._setSliderPositions(u, k, m)
    }, _setSliderPositions: function (f, t, i) {
        var v = this.seriesGroups[f];
        var e = this._getXAxis(f);
        var p = e.rangeSelector;
        var c = v.orientation == "horizontal";
        if (e.rangeSelector.renderTo) {
            c = false
        }
        var k = e.position;
        if (p.renderTo && p.position) {
            k = p.position
        }
        var m = (c && k == "right") || (!c && k == "top");
        var o = this._sliders[f];
        var s = c ? "top" : "left";
        var h = c ? "left" : "top";
        var j = c ? "height" : "width";
        var q = c ? "width" : "height";
        var l = c ? "y" : "x";
        var n = c ? "x" : "y";
        var d = o.rect;
        o.left.css(s, d[l]);
        o.left.css(h, d[n]);
        o.left.css(j, t);
        o.left.css(q, d[q]);
        o.right.css(s, d[l] + i);
        o.right.css(h, d[n]);
        o.right.css(j, d[j] - i + 1);
        o.right.css(q, d[q]);
        o.leftTop.css(s, d[l]);
        o.leftTop.css(h, d[n] + (((c && k == "right") || (!c && k != "top")) ? 0 : d[q]));
        o.leftTop.css(j, t);
        o.leftTop.css(q, 1);
        o.rightTop.css(s, d[l] + i);
        o.rightTop.css(h, d[n] + (((c && k == "right") || (!c && k != "top")) ? 0 : d[q]));
        o.rightTop.css(j, d[j] - i + 1);
        o.rightTop.css(q, 1);
        o.leftBorder.css(s, d[l] + t);
        o.leftBorder.css(h, d[n]);
        o.leftBorder.css(j, 1);
        o.leftBorder.css(q, d[q]);
        var u = d[q] / 4;
        if (u > 20) {
            u = 20
        }
        if (u < 3) {
            u = 3
        }
        o.leftBar.css(s, d[l] + t - 3);
        o.leftBar.css(h, d[n] + d[q] / 2 - u / 2);
        o.leftBar.css(j, 5);
        o.leftBar.css(q, u);
        o.rightBorder.css(s, d[l] + i);
        o.rightBorder.css(h, d[n]);
        o.rightBorder.css(j, 1);
        o.rightBorder.css(q, d[q]);
        o.rightBar.css(s, d[l] + i - 3);
        o.rightBar.css(h, d[n] + d[q] / 2 - u / 2);
        o.rightBar.css(j, 5);
        o.rightBar.css(q, u)
    }, _resizeState: {}, _onSliderMouseDown: function (e) {
        var c = e.data.self;
        var d = c._sliders[e.data.groupIndex];
        if (!d) {
            return
        }
        if (c._resizeState.state == undefined) {
            c._testAndSetReadyResize(e)
        }
        if (c._resizeState.state != "ready") {
            return
        }
        c._resizeState.state = "resizing"
    }, _valueToOffset: function (o, m) {
        var n = this.seriesGroups[o];
        var e = this._sliders[o];
        var d = e.host.jqxChart("getInstance");
        var p = d._renderData[0].xAxis;
        var i = p.data.axisStats;
        var l = i.min.valueOf();
        var c = i.max.valueOf();
        var j = c - l;
        if (j == 0) {
            j = 1
        }
        var f = this._getXAxis(o);
        var h = n.orientation == "horizontal" ? "height" : "width";
        var k = (m.valueOf() - l) / j;
        return e.fullRect[h] * (f.flip ? (1 - k) : k)
    }, _offsetToValue: function (q, h) {
        var e = this._sliders[q];
        var p = this.seriesGroups[q];
        var f = this._getXAxis(q);
        var i = p.orientation == "horizontal" ? "height" : "width";
        var k = e.fullRect[i];
        if (k == 0) {
            k = 1
        }
        var l = h / k;
        var d = e.host.jqxChart("getInstance");
        var o = d._renderData[0].xAxis;
        var j = o.data.axisStats;
        var m = j.min.valueOf();
        var c = j.max.valueOf();
        var n = h / k * (c - m) + m;
        if (f.flip == true) {
            n = c - h / k * (c - m)
        }
        if (this._isDate(j.min) || this._isDate(j.max)) {
            n = new Date(n)
        } else {
            if (f.dataField == undefined) {
                n = Math.round(n)
            }
            if (n < j.min) {
                n = j.min
            }
            if (n > j.max) {
                n = j.max
            }
        }
        return n
    }, _onSliderMouseUp: function (q) {
        var l = q.data.self;
        var h = q.data.groupIndex;
        var c = q.data.swapXY;
        var n = l._sliders[h];
        if (!n) {
            return
        }
        if (l._resizeState.state != "resizing") {
            return
        }
        l._resizeState = {};
        l.host.css("cursor", "default");
        var i = !c ? "left" : "top";
        var d = !c ? "width" : "height";
        var p = !c ? "x" : "y";
        var o = n.element.coord()[i];
        var e = o + (!c ? n.element.width() : n.element.height());
        var j = l._offsetToValue(h, o - n.fullRect[p]);
        var s = l._offsetToValue(h, e - n.fullRect[p]);
        var k = n.host.jqxChart("getInstance");
        var m = k._renderData[0].xAxis;
        var u = m.data.axisStats;
        if (!u.isTimeUnit && (s.valueOf() - j.valueOf()) > 86400000) {
            j.setHours(0, 0, 0, 0);
            s.setDate(s.getDate() + 1);
            s.setHours(0, 0, 0, 0)
        }
        var f = l._getXAxis(h);
        if (f.flip) {
            var t = j;
            j = s;
            s = t
        }
        f.minValue = j;
        f.maxValue = s;
        l._isSelectorRefresh = true;
        var v = l.enableAnimations;
        l._raiseEvent("rangeSelectionChanging", {instance: l, minValue: j, maxValue: s});
        l.enableAnimations = false;
        l.update();
        l.enableAnimations = v;
        l._raiseEvent("rangeSelectionChanged", {instance: l, minValue: j, maxValue: s})
    }, _onSliderMouseMove: function (w) {
        var q = w.data.self;
        var A = w.data.renderTo;
        var k = w.data.groupIndex;
        var t = q._sliders[k];
        var e = w.data.swapXY;
        if (!t) {
            return
        }
        var h = t.fullRect;
        var j = t.element;
        var B = a.jqx.position(w);
        var u = j.coord();
        var s = e ? "left" : "top";
        var o = !e ? "left" : "top";
        var i = e ? "width" : "height";
        var f = !e ? "width" : "height";
        var v = !e ? "x" : "y";
        if (q._resizeState.state == "resizing") {
            if (q._resizeState.side == "left") {
                var p = Math.round(B[o] - u[o]);
                var n = h[v];
                if (u[o] + p >= n && u[o] + p <= n + h[f]) {
                    var l = parseInt(j.css(o));
                    var d = Math.max(2, (e ? j.height() : j.width()) - p);
                    j.css(f, d);
                    j.css(o, l + p)
                }
            } else {
                if (q._resizeState.side == "right") {
                    var c = e ? j.height() : j.width();
                    var p = Math.round(B[o] - u[o] - c);
                    var n = h[v];
                    if (u[o] + c + p >= n && u[o] + p + c <= n + h[f]) {
                        var d = Math.max(2, c + p);
                        j.css(f, d)
                    }
                } else {
                    if (q._resizeState.side == "move") {
                        var c = e ? j.height() : j.width();
                        var l = parseInt(j.css(o));
                        var p = Math.round(B[o] - q._resizeState.startPos);
                        if (u[o] + p >= h[v] && u[o] + p + c <= h[v] + h[f]) {
                            q._resizeState.startPos = B[o];
                            j.css(o, l + p)
                        }
                    }
                }
            }
            var z = parseInt(j.css(o)) - t.rect[v];
            var m = z + (e ? j.height() : j.width());
            q._setSliderPositions(k, z, m)
        } else {
            q._testAndSetReadyResize(w)
        }
    }, _testAndSetReadyResize: function (c) {
        var t = c.data.self;
        var m = c.data.renderTo;
        var q = c.data.groupIndex;
        var d = t._sliders[q];
        var i = c.data.swapXY;
        var o = d.fullRect;
        var f = d.element;
        var h = a.jqx.position(c);
        var j = f.coord();
        var l = i ? "left" : "top";
        var s = !i ? "left" : "top";
        var k = i ? "width" : "height";
        var n = !i ? "width" : "height";
        var e = !i ? "x" : "y";
        var p = t._isTouchDevice ? 30 : 5;
        if (h[l] >= j[l] && h[l] <= j[l] + o[k]) {
            if (Math.abs(h[s] - j[s]) <= p) {
                m.css("cursor", i ? "row-resize" : "col-resize");
                t._resizeState = {state: "ready", side: "left"}
            } else {
                if (Math.abs(h[s] - j[s] - (!i ? f.width() : f.height())) <= p) {
                    m.css("cursor", i ? "row-resize" : "col-resize");
                    t._resizeState = {state: "ready", side: "right"}
                } else {
                    if (h[s] + p > j[s] && h[s] - p < j[s] + (!i ? f.width() : f.height())) {
                        m.css("cursor", "pointer");
                        t._resizeState = {state: "ready", side: "move", startPos: h[s]}
                    } else {
                        m.css("cursor", "default");
                        t._resizeState = {}
                    }
                }
            }
        } else {
            m.css("cursor", "default");
            t._resizeState = {}
        }
    }, _selectorGetSize: function (c) {
        if (c.rangeSelector.renderTo) {
            return 0
        }
        return c.rangeSelector.size || this._paddedRect.height / 3
    }})
})(jqxBaseFramework);
(function (a) {
    a.extend(a.jqx._jqxChart.prototype, {_moduleWaterfall: true, _isSummary: function (e, c) {
        var f = this.seriesGroups[e];
        for (var d = 0; d < f.series.length; d++) {
            if (undefined === f.series[d].summary) {
                continue
            }
            summaryValue = this._getDataValue(c, f.series[d].summary, e);
            if (undefined !== summaryValue) {
                return true
            }
        }
        return false
    }, _applyWaterfall: function (C, D, l, h, E, m, G, f, s) {
        var q = this.seriesGroups[l];
        if (C.length == 0) {
            return C
        }
        var w = h;
        var c = {};
        var d = [];
        var e = undefined;
        var H = [];
        for (var A = 0; A < q.series.length; A++) {
            H.push(this._isSerieVisible(l, A))
        }
        var u = {};
        for (var B = 0; B < D; B++) {
            var o = h;
            var p = 0;
            var n = this._isSummary(l, B);
            for (var A = 0; A < C.length; A++) {
                if (!H[A]) {
                    continue
                }
                var F = 0;
                if (n) {
                    F = o == h ? E : 0;
                    C[A][B].value = c[A];
                    C[A][B].summary = true;
                    e = C[A][B].value < F;
                    if (f) {
                        e = !e
                    }
                    var v = 0;
                    if (!isNaN(m)) {
                        v = this._getDataPointOffsetDiff(C[A][B].value + p, p == 0 ? E : p, F || E, m, G, h, f)
                    } else {
                        v = this._getDataPointOffsetDiff(C[A][B].value, F, F, NaN, G, h, f)
                    }
                    C[A][B].to = o + (e ? v : -v);
                    C[A][B].from = o;
                    if (s) {
                        p += C[A][B].value;
                        o = C[A][B].to
                    }
                    continue
                }
                var z = s ? -1 : A;
                if (isNaN(C[A][B].value)) {
                    continue
                }
                if (undefined === u[z]) {
                    F = E;
                    u[z] = true
                }
                e = C[A][B].value < F;
                if (f) {
                    e = !e
                }
                var t = NaN, v = NaN;
                if (!s) {
                    t = B == 0 ? h : C[A][d[A]].to
                } else {
                    t = w
                }
                var v = 0;
                if (!isNaN(m)) {
                    v = this._getDataPointOffsetDiff(C[A][B].value + (isNaN(c[z]) ? 0 : c[z]), isNaN(c[z]) ? E : c[z], F || E, m, G, t, f)
                } else {
                    v = this._getDataPointOffsetDiff(C[A][B].value, F, F, NaN, G, h, f)
                }
                C[A][B].to = w = t + (e ? v : -v);
                C[A][B].from = t;
                if (isNaN(c[z])) {
                    c[z] = C[A][B].value
                } else {
                    c[z] += C[A][B].value
                }
                if (z == -1) {
                    if (isNaN(c[A])) {
                        c[A] = C[A][B].value
                    } else {
                        c[A] += C[A][B].value
                    }
                }
                if (!s) {
                    d[A] = B
                }
            }
        }
        return C
    }})
})(jqxBaseFramework);