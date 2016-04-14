/*
 jQWidgets v3.8.2 (2015-Aug)
 Copyright (c) 2011-2015 jQWidgets.
 License: http://jqwidgets.com/license/
 */

(function (a) {
    a.jqx.jqxWidget("jqxChart", "", {});
    a.extend(a.jqx._jqxChart.prototype, {defineInstance: function () {
        var b = {title: "Title", description: "Description", source: [], seriesGroups: [], categoryAxis: null, xAxis: {}, valueAxis: null, renderEngine: "", enableAnimations: true, enableAxisTextAnimation: false, backgroundImage: "", background: "#FFFFFF", padding: {left: 5, top: 5, right: 5, bottom: 5}, backgroundColor: "#FFFFFF", showBorderLine: true, borderLineWidth: 1, borderLineColor: null, borderColor: null, titlePadding: {left: 5, top: 5, right: 5, bottom: 10}, showLegend: true, legendLayout: null, enabled: true, colorScheme: "scheme01", animationDuration: 500, showToolTips: true, toolTipShowDelay: 500, toolTipDelay: 500, toolTipHideDelay: 4000, toolTipMoveDuration: 300, toolTipFormatFunction: null, toolTipAlignment: "dataPoint", localization: undefined, columnSeriesOverlap: false, rtl: false, legendPosition: null, greyScale: false, axisPadding: 5, enableCrosshairs: false, crosshairsColor: "#BCBCBC", crosshairsDashStyle: "2,2", crosshairsLineWidth: 1, enableEvents: true, _itemsToggleState: [], _isToggleRefresh: false, drawBefore: null, draw: null};
        a.extend(true, this, b);
        this._createColorsCache()
    }, _defaultLineColor: "#BCBCBC", _touchEvents: {mousedown: a.jqx.mobile.getTouchEventName("touchstart"), click: a.jqx.mobile.getTouchEventName("touchstart"), mouseup: a.jqx.mobile.getTouchEventName("touchend"), mousemove: a.jqx.mobile.getTouchEventName("touchmove"), mouseenter: "mouseenter", mouseleave: "mouseleave"}, _getEvent: function (b) {
        if (this._isTouchDevice) {
            return this._touchEvents[b]
        } else {
            return b
        }
    }, destroy: function () {
        this.host.remove()
    }, createInstance: function (d) {
        if (!a.jqx.dataAdapter) {
            throw"jqxdata.js is not loaded"
        }
        var c = this;
        c._refreshOnDownloadComlete();
        c._isTouchDevice = a.jqx.mobile.isTouchDevice();
        c.addHandler(c.host, c._getEvent("mousemove"), function (g) {
            if (c.enabled == false) {
                return
            }
            var f = g.pageX || g.clientX || g.screenX;
            var j = g.pageY || g.clientY || g.screenY;
            var i = c.host.offset();
            if (c._isTouchDevice) {
                var h = a.jqx.position(g);
                f = h.left;
                j = h.top
            }
            f -= i.left;
            j -= i.top;
            c.onmousemove(f, j)
        });
        c.addHandler(c.host, c._getEvent("mouseleave"), function (h) {
            if (c.enabled == false) {
                return
            }
            var f = c._mouseX;
            var i = c._mouseY;
            var g = c._plotRect;
            if (g && f >= g.x && f <= g.x + g.width && i >= g.y && i <= g.y + g.height) {
                return
            }
            c._cancelTooltipTimer();
            c._hideToolTip(0);
            c._unselect()
        });
        c.addHandler(c.host, "click", function (g) {
            if (c.enabled == false) {
                return
            }
            var f = g.pageX || g.clientX || g.screenX;
            var j = g.pageY || g.clientY || g.screenY;
            var i = c.host.offset();
            if (c._isTouchDevice) {
                var h = a.jqx.position(g);
                f = h.left;
                j = h.top
            } else {
            }
            f -= i.left;
            j -= i.top;
            c._mouseX = f;
            c._mouseY = j;
            if (!isNaN(c._lastClickTs)) {
                if ((new Date()).valueOf() - c._lastClickTs < 100) {
                    return
                }
            }
            this._hostClickTimer = setTimeout(function () {
                if (!c._isTouchDevice) {
                    c._cancelTooltipTimer();
                    c._hideToolTip();
                    c._unselect()
                }
                if (c._pointMarker && c._pointMarker.element) {
                    var l = c.seriesGroups[c._pointMarker.gidx];
                    var k = l.series[c._pointMarker.sidx];
                    c._raiseItemEvent("click", l, k, c._pointMarker.iidx)
                }
            }, 100)
        });
        var e = c.element.style;
        if (e) {
            var b = false;
            if (e.width != null) {
                b |= e.width.toString().indexOf("%") != -1
            }
            if (e.height != null) {
                b |= e.height.toString().indexOf("%") != -1
            }
            if (b) {
                a.jqx.utilities.resize(this.host, function () {
                    if (c.timer) {
                        clearTimeout(c.timer)
                    }
                    var f = 1;
                    c.timer = setTimeout(function () {
                        var g = c.enableAnimations;
                        c.enableAnimations = false;
                        c.refresh();
                        c.enableAnimations = g
                    }, f)
                }, false, true)
            }
        }
    }, _refreshOnDownloadComlete: function () {
        var d = this;
        var e = this.source;
        if (e instanceof a.jqx.dataAdapter) {
            var f = e._options;
            if (f == undefined || (f != undefined && !f.autoBind)) {
                e.autoSync = false;
                e.dataBind()
            }
            var c = this.element.id;
            if (e.records.length == 0) {
                var b = function () {
                    if (d.ready) {
                        d.ready()
                    }
                    d.refresh()
                };
                e.unbindDownloadComplete(c);
                e.bindDownloadComplete(c, b)
            } else {
                if (d.ready) {
                    d.ready()
                }
            }
            e.unbindBindingUpdate(c);
            e.bindBindingUpdate(c, function () {
                d.refresh()
            })
        }
    }, propertyChangedHandler: function (b, c, e, d) {
        if (this.isInitialized == undefined || this.isInitialized == false) {
            return
        }
        if (c == "source") {
            this._refreshOnDownloadComlete()
        }
        this.refresh()
    }, _initRenderer: function (b) {
        if (!a.jqx.createRenderer) {
            throw"Please include jqxdraw.js"
        }
        return a.jqx.createRenderer(this, b)
    }, _internalRefresh: function () {
        var b = this;
        if (a.jqx.isHidden(b.host)) {
            return
        }
        b._stopAnimations();
        if (!b.renderer || (!b._isToggleRefresh && !b._isUpdate)) {
            b._hideToolTip(0);
            b._isVML = false;
            b.host.empty();
            b._measureDiv = undefined;
            b._initRenderer(b.host)
        }
        var d = b.renderer;
        if (!d) {
            return
        }
        var c = d.getRect();
        b._render({x: 1, y: 1, width: c.width, height: c.height});
        this._raiseEvent("refreshBegin", {instance: this});
        if (d instanceof a.jqx.HTML5Renderer) {
            d.refresh()
        }
        b._isUpdate = false;
        this._raiseEvent("refreshEnd", {instance: this})
    }, saveAsPDF: function (d, b, c) {
        return this._saveAsImage("pdf", d, b, c)
    }, saveAsPNG: function (d, b, c) {
        return this._saveAsImage("png", d, b, c)
    }, saveAsJPEG: function (d, b, c) {
        return this._saveAsImage("jpeg", d, b, c)
    }, _saveAsImage: function (d, e, b, c) {
        return a.jqx._widgetToImage(this, d, e, b, c)
    }, refresh: function () {
        this._internalRefresh()
    }, update: function () {
        this._isUpdate = true;
        this._internalRefresh()
    }, _seriesTypes: ["line", "stackedline", "stackedline100", "spline", "stackedspline", "stackedspline100", "stepline", "stackedstepline", "stackedstepline100", "area", "stackedarea", "stackedarea100", "splinearea", "stackedsplinearea", "stackedsplinearea100", "steparea", "stackedsteparea", "stackedsteparea100", "rangearea", "splinerangearea", "steprangearea", "column", "stackedcolumn", "stackedcolumn100", "rangecolumn", "scatter", "stackedscatter", "stackedscatter100", "bubble", "stackedbubble", "stackedbubble100", "pie", "donut", "candlestick", "ohlc", "waterfall", "stackedwaterfall"], _render: function (C) {
        var m = this;
        var I = m.renderer;
        m._colorsCache.clear();
        if (!m._isToggleRefresh && m._isUpdate && m._renderData) {
            m._renderDataClone()
        }
        m._renderData = [];
        I.clear();
        m._unselect();
        m._hideToolTip(0);
        var n = m.backgroundImage;
        if (n == undefined || n == "") {
            m.host.css({"background-image": ""})
        } else {
            m.host.css({"background-image": (n.indexOf("(") != -1 ? n : "url('" + n + "')")})
        }
        m._rect = C;
        var Y = m.padding || {left: 5, top: 5, right: 5, bottom: 5};
        var q = I.createClipRect(C);
        var L = I.beginGroup();
        I.setClip(L, q);
        var ah = I.rect(C.x, C.y, C.width - 2, C.height - 2);
        if (n == undefined || n == "") {
            I.attr(ah, {fill: m.backgroundColor || m.background || "white"})
        } else {
            I.attr(ah, {fill: "transparent"})
        }
        if (m.showBorderLine != false) {
            var F = m.borderLineColor == undefined ? m.borderColor : m.borderLineColor;
            if (F == undefined) {
                F = m._defaultLineColor
            }
            var o = this.borderLineWidth;
            if (isNaN(o) || o < 0 || o > 10) {
                o = 1
            }
            I.attr(ah, {"stroke-width": o, stroke: F})
        } else {
            if (a.jqx.browser.msie && a.jqx.browser.version < 9) {
                I.attr(ah, {"stroke-width": 1, stroke: m.backgroundColor || "white"})
            }
        }
        if (a.isFunction(m.drawBefore)) {
            m.drawBefore(I, C)
        }
        var V = {x: Y.left, y: Y.top, width: C.width - Y.left - Y.right, height: C.height - Y.top - Y.bottom};
        m._paddedRect = V;
        var e = m.titlePadding || {left: 2, top: 2, right: 2, bottom: 2};
        var l;
        if (m.title && m.title.length > 0) {
            var S = m.toThemeProperty("jqx-chart-title-text", null);
            l = I.measureText(m.title, 0, {"class": S});
            I.text(m.title, V.x + e.left, V.y + e.top, V.width - (e.left + e.right), l.height, 0, {"class": S}, true, "center", "center");
            V.y += l.height;
            V.height -= l.height
        }
        if (m.description && m.description.length > 0) {
            var T = m.toThemeProperty("jqx-chart-title-description", null);
            l = I.measureText(m.description, 0, {"class": T});
            I.text(m.description, V.x + e.left, V.y + e.top, V.width - (e.left + e.right), l.height, 0, {"class": T}, true, "center", "center");
            V.y += l.height;
            V.height -= l.height
        }
        if (m.title || m.description) {
            V.y += (e.bottom + e.top);
            V.height -= (e.bottom + e.top)
        }
        var b = {x: V.x, y: V.y, width: V.width, height: V.height};
        m._plotRect = b;
        m._buildStats(b);
        var H = m._isPieOnlySeries();
        var s = m.seriesGroups;
        var E;
        var D = {xAxis: {}, valueAxis: {}};
        for (var Z = 0; Z < s.length && !H; Z++) {
            if (s[Z].type == "pie" || s[Z].type == "donut") {
                continue
            }
            var z = m._getXAxis(Z);
            if (!z) {
                throw"seriesGroup[" + Z + "] is missing xAxis definition"
            }
            var ae = z == m._getXAxis() ? -1 : Z;
            D.xAxis[ae] = 0
        }
        var U = m.axisPadding;
        if (isNaN(U)) {
            U = 5
        }
        var r = {left: 0, right: 0, leftCount: 0, rightCount: 0};
        var p = [];
        for (Z = 0; Z < s.length; Z++) {
            var ad = s[Z];
            if (ad.type == "pie" || ad.type == "donut" || ad.spider == true || ad.polar == true) {
                p.push({width: 0, position: 0, xRel: 0});
                continue
            }
            E = ad.orientation == "horizontal";
            var z = m._getXAxis(Z);
            var ae = z == m._getXAxis() ? -1 : Z;
            var k = m._getValueAxis(Z);
            var O = k == m._getValueAxis() ? -1 : Z;
            var R = !E ? k.axisSize : z.axisSize;
            var f = {x: 0, y: b.y, width: b.width, height: b.height};
            var Q = E ? m._getXAxis(Z).position : k.position;
            if (!R || R == "auto") {
                if (E) {
                    R = this._renderXAxis(Z, f, true, b).width;
                    if ((D.xAxis[ae] & 1) == 1) {
                        R = 0
                    } else {
                        if (R > 0) {
                            D.xAxis[ae] |= 1
                        }
                    }
                } else {
                    R = m._renderValueAxis(Z, f, true, b).width;
                    if ((D.valueAxis[O] & 1) == 1) {
                        R = 0
                    } else {
                        if (R > 0) {
                            D.valueAxis[O] |= 1
                        }
                    }
                }
            }
            if (Q != "left" && m.rtl == true) {
                Q = "right"
            }
            if (Q != "right") {
                Q = "left"
            }
            if (r[Q + "Count"] > 0 && r[Q] > 0 && R > 0) {
                r[Q] += U
            }
            p.push({width: R, position: Q, xRel: r[Q]});
            r[Q] += R;
            r[Q + "Count"]++
        }
        var u = Math.max(1, Math.max(C.width, C.height));
        var ac = {top: 0, bottom: 0, topCount: 0, bottomCount: 0};
        var W = [];
        for (Z = 0; Z < s.length; Z++) {
            var ad = s[Z];
            if (ad.type == "pie" || ad.type == "donut" || ad.spider == true || ad.polar == true) {
                W.push({height: 0, position: 0, yRel: 0});
                continue
            }
            E = ad.orientation == "horizontal";
            var k = this._getValueAxis(Z);
            var O = k == m._getValueAxis() ? -1 : Z;
            var z = m._getXAxis(Z);
            var ae = z == m._getXAxis() ? -1 : Z;
            var ab = !E ? z.axisSize : k.axisSize;
            var Q = E ? k.position : z.position;
            if (!ab || ab == "auto") {
                if (E) {
                    ab = m._renderValueAxis(Z, {x: 0, y: 0, width: u, height: 0}, true, b).height;
                    if ((D.valueAxis[O] & 2) == 2) {
                        ab = 0
                    } else {
                        if (ab > 0) {
                            D.valueAxis[O] |= 2
                        }
                    }
                } else {
                    ab = m._renderXAxis(Z, {x: 0, y: 0, width: u, height: 0}, true).height;
                    if ((D.xAxis[ae] & 2) == 2) {
                        ab = 0
                    } else {
                        if (ab > 0) {
                            D.xAxis[ae] |= 2
                        }
                    }
                }
            }
            if (Q != "top") {
                Q = "bottom"
            }
            if (ac[Q + "Count"] > 0 && ac[Q] > 0 && ab > 0) {
                ac[Q] += U
            }
            W.push({height: ab, position: Q, yRel: ac[Q]});
            ac[Q] += ab;
            ac[Q + "Count"]++
        }
        m._createAnimationGroup("series");
        var t = (m.showLegend != false);
        var B = !t ? {width: 0, height: 0} : m._renderLegend(m.legendLayout ? m._rect : V, true);
        if (this.legendLayout && (!isNaN(this.legendLayout.left) || !isNaN(this.legendLayout.top))) {
            B = {width: 0, height: 0}
        }
        if (V.height < ac.top + ac.bottom + B.height || V.width < r.left + r.right) {
            I.endGroup();
            return
        }
        b.height -= ac.top + ac.bottom + B.height;
        b.x += r.left;
        b.width -= r.left + r.right;
        b.y += ac.top;
        var G = [];
        if (!H) {
            var af = m._getXAxis().tickMarksColor || m._defaultLineColor;
            for (Z = 0; Z < s.length; Z++) {
                var ad = s[Z];
                if (ad.polar == true || ad.spider == true || ad.type == "pie" || ad.type == "donut") {
                    continue
                }
                E = ad.orientation == "horizontal";
                var ae = m._getXAxis(Z) == m._getXAxis() ? -1 : Z;
                var O = m._getValueAxis(Z) == m._getValueAxis() ? -1 : Z;
                var f = {x: b.x, y: 0, width: b.width, height: W[Z].height};
                if (W[Z].position != "top") {
                    f.y = b.y + b.height + W[Z].yRel
                } else {
                    f.y = b.y - W[Z].yRel - W[Z].height
                }
                if (E) {
                    if ((D.valueAxis[O] & 4) == 4) {
                        continue
                    }
                    if (!m._isGroupVisible(Z)) {
                        continue
                    }
                    m._renderValueAxis(Z, f, false, b);
                    D.valueAxis[O] |= 4
                } else {
                    G.push(f);
                    if ((D.xAxis[ae] & 4) == 4) {
                        continue
                    }
                    if (!m._isGroupVisible(Z)) {
                        continue
                    }
                    m._renderXAxis(Z, f, false, b);
                    D.xAxis[ae] |= 4
                }
            }
        }
        if (t) {
            var A = m.legendLayout ? m._rect : V;
            var P = V.x + a.jqx._ptrnd((V.width - B.width) / 2);
            var N = b.y + b.height + ac.bottom;
            var R = V.width;
            var ab = B.height;
            if (m.legendLayout) {
                if (!isNaN(m.legendLayout.left)) {
                    P = m.legendLayout.left
                }
                if (!isNaN(m.legendLayout.top)) {
                    N = m.legendLayout.top
                }
                if (!isNaN(m.legendLayout.width)) {
                    R = m.legendLayout.width
                }
                if (!isNaN(m.legendLayout.height)) {
                    ab = m.legendLayout.height
                }
            }
            if (P + R > A.x + A.width) {
                R = A.x + A.width - P
            }
            if (N + ab > A.y + A.height) {
                ab = A.y + A.height - N
            }
            m._renderLegend({x: P, y: N, width: R, height: ab})
        }
        m._hasHorizontalLines = false;
        if (!H) {
            for (Z = 0; Z < s.length; Z++) {
                var ad = s[Z];
                if (ad.polar == true || ad.spider == true || ad.type == "pie" || ad.type == "donut") {
                    continue
                }
                E = s[Z].orientation == "horizontal";
                var f = {x: b.x - p[Z].xRel - p[Z].width, y: b.y, width: p[Z].width, height: b.height};
                if (p[Z].position != "left") {
                    f.x = b.x + b.width + p[Z].xRel
                }
                var ae = m._getXAxis(Z) == m._getXAxis() ? -1 : Z;
                var O = m._getValueAxis(Z) == m._getValueAxis() ? -1 : Z;
                if (E) {
                    G.push(f);
                    if ((D.xAxis[ae] & 8) == 8) {
                        continue
                    }
                    if (!m._isGroupVisible(Z)) {
                        continue
                    }
                    m._renderXAxis(Z, f, false, b);
                    D.xAxis[ae] |= 8
                } else {
                    if ((D.valueAxis[O] & 8) == 8) {
                        continue
                    }
                    if (!m._isGroupVisible(Z)) {
                        continue
                    }
                    m._renderValueAxis(Z, f, false, b);
                    D.valueAxis[O] |= 8
                }
            }
        }
        if (b.width <= 0 || b.height <= 0) {
            return
        }
        m._plotRect = {x: b.x, y: b.y, width: b.width, height: b.height};
        for (Z = 0; Z < s.length; Z++) {
            this._drawPlotAreaLines(Z, true, {gridLines: false, tickMarks: false, alternatingBackground: true});
            this._drawPlotAreaLines(Z, false, {gridLines: false, tickMarks: false, alternatingBackground: true})
        }
        for (Z = 0; Z < s.length; Z++) {
            this._drawPlotAreaLines(Z, true, {gridLines: true, tickMarks: true, alternatingBackground: false});
            this._drawPlotAreaLines(Z, false, {gridLines: true, tickMarks: true, alternatingBackground: false})
        }
        var K = false;
        for (Z = 0; Z < s.length && !K; Z++) {
            var ad = s[Z];
            if (ad.annotations !== undefined || a.isFunction(ad.draw) || a.isFunction(ad.drawBefore)) {
                K = true;
                break
            }
        }
        var M = I.beginGroup();
        if (!K) {
            var J = I.createClipRect({x: b.x - 2, y: b.y, width: b.width + 4, height: b.height});
            I.setClip(M, J)
        }
        for (Z = 0; Z < s.length; Z++) {
            var ad = s[Z];
            var c = false;
            for (var ag in m._seriesTypes) {
                if (m._seriesTypes[ag] == ad.type) {
                    c = true;
                    break
                }
            }
            if (!c) {
                throw'Invalid serie type "' + ad.type + '"'
            }
            if (a.isFunction(ad.drawBefore)) {
                ad.drawBefore(I, C, Z, this)
            }
            if (ad.polar == true || ad.spider == true) {
                if (ad.type.indexOf("pie") == -1 && ad.type.indexOf("donut") == -1) {
                    m._renderSpiderAxis(Z, b)
                }
            }
            m._renderAxisBands(Z, b, true);
            m._renderAxisBands(Z, b, false)
        }
        for (Z = 0; Z < s.length; Z++) {
            var ad = s[Z];
            if (m._isColumnType(ad.type)) {
                m._renderColumnSeries(Z, b)
            } else {
                if (ad.type.indexOf("pie") != -1 || ad.type.indexOf("donut") != -1) {
                    m._renderPieSeries(Z, b)
                } else {
                    if (ad.type.indexOf("line") != -1 || ad.type.indexOf("area") != -1) {
                        m._renderLineSeries(Z, b)
                    } else {
                        if (ad.type.indexOf("scatter") != -1 || ad.type.indexOf("bubble") != -1) {
                            m._renderScatterSeries(Z, b)
                        } else {
                            if (ad.type.indexOf("candlestick") != -1 || ad.type.indexOf("ohlc") != -1) {
                                m._renderCandleStickSeries(Z, b, ad.type.indexOf("ohlc") != -1)
                            }
                        }
                    }
                }
            }
            if (ad.annotations) {
                if (!this._moduleAnnotations) {
                    throw"Please include 'jqxchart.annotations.js'"
                }
                for (var X = 0; X < ad.annotations.length; X++) {
                    m._renderAnnotation(Z, ad.annotations[X], b)
                }
            }
            if (a.isFunction(ad.draw)) {
                m.draw(I, C, Z, this)
            }
        }
        I.endGroup();
        if (m.enabled == false) {
            var aa = I.rect(C.x, C.y, C.width, C.height);
            I.attr(aa, {fill: "#777777", opacity: 0.5, stroke: "#00FFFFFF"})
        }
        if (a.isFunction(m.draw)) {
            m.draw(I, C)
        }
        I.endGroup();
        m._startAnimation("series");
        if (z && z.rangeSelector) {
            if (!this._moduleRangeSelector) {
                throw"Please include 'jqxchart.rangeselector.js'"
            }
            var d = [];
            if (!this._isSelectorRefresh) {
                m.removeHandler(a(document), m._getEvent("mousemove"), m._onSliderMouseMove);
                m.removeHandler(a(document), m._getEvent("mousedown"), m._onSliderMouseDown);
                m.removeHandler(a(document), m._getEvent("mouseup"), m._onSliderMouseUp)
            }
            for (Z = 0; Z < m.seriesGroups.length; Z++) {
                var v = this._getXAxis(Z);
                if (d.indexOf(v) == -1) {
                    if (this._renderXAxisRangeSelector(Z, G[Z])) {
                        d.push(v)
                    }
                }
            }
        }
    }, _isPieOnlySeries: function () {
        var c = this.seriesGroups;
        if (c.length == 0) {
            return false
        }
        for (var b = 0; b < c.length; b++) {
            if (c[b].type != "pie" && c[b].type != "donut") {
                return false
            }
        }
        return true
    }, _renderChartLegend: function (S, B, P, u) {
        var k = this;
        var C = k.renderer;
        var H = {x: B.x + 3, y: B.y + 3, width: B.width - 6, height: B.height - 6};
        var D = {width: H.width, height: 0};
        var F = 0, E = 0;
        var p = 20;
        var l = 0;
        var f = 10;
        var N = 10;
        var v = 0;
        for (var M = 0; M < S.length; M++) {
            var I = S[M].css;
            if (!I) {
                I = k.toThemeProperty("jqx-chart-legend-text", null)
            }
            p = 20;
            var z = S[M].text;
            var j = C.measureText(z, 0, {"class": I});
            if (j.height > p) {
                p = j.height
            }
            if (j.width > v) {
                v = j.width
            }
            if (u) {
                if (M != 0) {
                    E += p
                }
                if (E > H.height) {
                    E = 0;
                    F += v + 2 * N + f;
                    v = j.width;
                    D.width = F + v
                }
            } else {
                if (F != 0) {
                    F += N
                }
                if (F + 2 * f + j.width > H.width && j.width < H.width) {
                    F = 0;
                    E += p;
                    p = 20;
                    l = H.width;
                    D.height = E + p
                }
            }
            var J = false;
            if (j.width > B.width) {
                J = true;
                var q = B.width;
                var Q = z;
                var U = Q.split(/\s+/).reverse();
                var m = [];
                var s = "";
                var o = [];
                while (undefined != (word = U.pop())) {
                    m.push(word);
                    s = m.join(" ");
                    var A = k.renderer.measureText(s, 0, {"class": I});
                    if (A.width > q && o.length > 0) {
                        m.pop();
                        m = [word];
                        s = m.join(" ")
                    }
                    o.push({text: s})
                }
                j.width = 0;
                var b = 0;
                for (var G = 0; G < o.length; G++) {
                    var T = o[G].text;
                    var A = k.renderer.measureText(T, 0, {"class": I});
                    j.width = Math.max(j.width, A.width);
                    b += j.height
                }
                j.height = b
            }
            var w = H.x + F + j.width < B.x + B.width && H.y + E + j.height < B.y + B.height;
            if (k.legendLayout) {
                var w = H.x + F + j.width < k._rect.x + k._rect.width && H.y + E + j.height < k._rect.y + k._rect.height
            }
            if (!P && w) {
                var h = S[M].seriesIndex;
                var n = S[M].groupIndex;
                var c = S[M].itemIndex;
                var V = S[M].fillColor;
                var R = S[M].lineColor;
                var e = k._isSerieVisible(n, h, c);
                var O = C.beginGroup();
                var L = e ? S[M].opacity : 0.1;
                if (J) {
                    var Q = z;
                    var q = B.width;
                    var U = Q.split(/\s+/).reverse();
                    var m = [];
                    var s = "";
                    var d = 0;
                    var o = [];
                    while (undefined != (word = U.pop())) {
                        m.push(word);
                        s = m.join(" ");
                        var A = k.renderer.measureText(s, 0, {"class": I});
                        if (A.width > q && o.length > 0) {
                            m.pop();
                            d += A.height;
                            m = [word];
                            s = m.join(" ")
                        }
                        o.push({text: s, dy: d})
                    }
                    for (var G = 0; G < o.length; G++) {
                        var T = o[G].text;
                        d = o[G].dy;
                        var A = k.renderer.measureText(T, 0, {"class": I});
                        if (u) {
                            k.renderer.text(T, H.x + F + 1.5 * f, H.y + E + d, j.width, p, 0, {"class": I}, false, "left", "center")
                        } else {
                            k.renderer.text(T, H.x + F + 1.5 * f, H.y + E + d, j.width, p, 0, {"class": I}, false, "center", "center")
                        }
                    }
                    var K = C.rect(H.x + F, H.y + E + f / 2 + d / 2, f, f);
                    if (u) {
                        E += d
                    }
                    k.renderer.attr(K, {fill: V, "fill-opacity": L, stroke: R, "stroke-width": 1, "stroke-opacity": S[M].opacity})
                } else {
                    var K = C.rect(H.x + F, H.y + E + f / 2, f, f);
                    k.renderer.attr(K, {fill: V, "fill-opacity": L, stroke: R, "stroke-width": 1, "stroke-opacity": S[M].opacity});
                    if (u) {
                        k.renderer.text(z, H.x + F + 1.5 * f, H.y + E, j.width, j.height + f / 2, 0, {"class": I}, false, "left", "center")
                    } else {
                        k.renderer.text(z, H.x + F + 1.5 * f, H.y + E, j.width, p, 0, {"class": I}, false, "center", "center")
                    }
                }
                k.renderer.endGroup();
                k._setLegendToggleHandler(n, h, c, O)
            }
            if (u) {
            } else {
                F += j.width + 2 * f;
                if (l < F) {
                    l = F
                }
            }
        }
        if (P) {
            D.height = a.jqx._ptrnd(E + p + 5);
            D.width = a.jqx._ptrnd(l);
            return D
        }
    }, isSerieVisible: function (d, b, c) {
        return this._isSerieVisible(d, b, c)
    }, _isSerieVisible: function (f, b, d) {
        while (this._itemsToggleState.length < f + 1) {
            this._itemsToggleState.push([])
        }
        var e = this._itemsToggleState[f];
        while (e.length < b + 1) {
            e.push(isNaN(d) ? true : [])
        }
        var c = e[b];
        if (isNaN(d)) {
            return c
        }
        if (!a.isArray(c)) {
            e[b] = c = []
        }
        while (c.length < d + 1) {
            c.push(true)
        }
        return c[d]
    }, isGroupVisible: function (b) {
        return this._isGroupVisible(b)
    }, _isGroupVisible: function (e) {
        var d = false;
        var c = this.seriesGroups[e].series;
        if (!c) {
            return d
        }
        for (var b = 0; b < c.length; b++) {
            if (this._isSerieVisible(e, b)) {
                d = true;
                break
            }
        }
        return d
    }, _toggleSerie: function (h, b, e, c) {
        var g = !this._isSerieVisible(h, b, e);
        if (c != undefined) {
            g = c
        }
        var i = this.seriesGroups[h];
        var f = i.series[b];
        this._raiseEvent("toggle", {state: g, seriesGroup: i, serie: f, elementIndex: e});
        if (isNaN(e)) {
            this._itemsToggleState[h][b] = g
        } else {
            var d = this._itemsToggleState[h][b];
            if (!a.isArray(d)) {
                d = []
            }
            while (d.length < e) {
                d.push(true)
            }
            d[e] = g
        }
        this._isToggleRefresh = true;
        this.update();
        this._isToggleRefresh = false
    }, showSerie: function (d, b, c) {
        this._toggleSerie(d, b, c, true)
    }, hideSerie: function (d, b, c) {
        this._toggleSerie(d, b, c, false)
    }, _setLegendToggleHandler: function (j, c, h, e) {
        var i = this.seriesGroups[j];
        var f = i.series[c];
        var b = f.enableSeriesToggle;
        if (b == undefined) {
            b = i.enableSeriesToggle != false
        }
        if (b) {
            var d = this;
            this.renderer.addHandler(e, "click", function (g) {
                d._toggleSerie(j, c, h)
            })
        }
    }, _renderLegend: function (c, e) {
        var o = this;
        var d = [];
        for (var v = 0; v < o.seriesGroups.length; v++) {
            var t = o.seriesGroups[v];
            if (t.showLegend == false) {
                continue
            }
            for (var q = 0; q < t.series.length; q++) {
                var m = t.series[q];
                if (m.showLegend == false) {
                    continue
                }
                var u = o._getSerieSettings(v, q);
                var p;
                if (t.type == "pie" || t.type == "donut") {
                    var k = o._getXAxis(v);
                    var h = m.legendFormatSettings || t.legendFormatSettings || k.formatSettings || m.formatSettings || t.formatSettings;
                    var n = m.legendFormatFunction || t.legendFormatFunction || k.formatFunction || m.formatFunction || t.formatFunction;
                    var j = o._getDataLen(v);
                    for (var r = 0; r < j; r++) {
                        p = o._getDataValue(r, m.displayText, v);
                        p = o._formatValue(p, h, n, v, q, r);
                        var l = o._getColors(v, q, r);
                        d.push({groupIndex: v, seriesIndex: q, itemIndex: r, text: p, css: m.displayTextClass, fillColor: l.fillColor, lineColor: l.lineColor, opacity: u.opacity})
                    }
                    continue
                }
                var h = m.legendFormatSettings || t.legendFormatSettings;
                var n = m.legendFormatFunction || t.legendFormatFunction;
                p = o._formatValue(m.displayText || m.dataField || "", h, n, v, q, NaN);
                var l = o._getSeriesColors(v, q);
                var f = this._get([m.legendFillColor, m.legendColor, l.fillColor]);
                var b = this._get([m.legendLineColor, m.legendColor, l.lineColor]);
                d.push({groupIndex: v, seriesIndex: q, text: p, css: m.displayTextClass, fillColor: f, lineColor: b, opacity: u.opacity})
            }
        }
        return o._renderChartLegend(d, c, e, (o.legendLayout && o.legendLayout.flow == "vertical"))
    }, _getInterval: function (d, c) {
        var b = this._get([d.unitInterval, c]);
        if (!isNaN(d.step)) {
            b = d.step * c
        }
        return b
    }, _renderXAxis: function (d, w, Q, c) {
        var f = this;
        var q = f._getXAxis(d);
        var P = f.seriesGroups[d];
        var W = P.orientation == "horizontal";
        var G = {width: 0, height: 0};
        var O = f._getAxisSettings(q);
        if (!q || !O.visible || P.type == "spider") {
            return G
        }
        if (!f._isGroupVisible(d) || this._isPieGroup(d)) {
            return G
        }
        var V = f._alignValuesWithTicks(d);
        while (f._renderData.length < d + 1) {
            f._renderData.push({})
        }
        if (f.rtl) {
            q.flip = true
        }
        var A = W ? w.height : w.width;
        var v = q.text;
        var s = f._calculateXOffsets(d, A);
        var S = s.axisStats;
        var h = q.rangeSelector;
        var E = 0;
        if (h) {
            if (!this._moduleRangeSelector) {
                throw"Please include 'jqxchart.rangeselector.js'"
            }
            E = this._selectorGetSize(q)
        }
        var D = (W && q.position == "right") || (!W && q.position == "top");
        if (!Q && h) {
            if (W) {
                w.width -= E;
                if (q.position != "right") {
                    w.x += E
                }
            } else {
                w.height -= E;
                if (q.position == "top") {
                    w.y += E
                }
            }
        }
        var j = {rangeLength: s.rangeLength, itemWidth: s.itemWidth, intervalWidth: s.intervalWidth, data: s, settings: O, isMirror: D, rect: w};
        f._renderData[d].xAxis = j;
        var F = S.interval;
        if (isNaN(F)) {
            return
        }
        if (W) {
            O.title.angle -= 90;
            O.labels.angle -= 90
        }
        var l = this._getInterval(O.gridLines, F);
        var J = this._getInterval(O.tickMarks, F);
        var B = this._getInterval(O.labels, F);
        var K;
        var U = S.min;
        var r = S.max;
        var M = s.padding;
        var R = q.flip == true || f.rtl;
        if (q.type == "date") {
            O.gridLines.offsets = this._generateDTOffsets(U, r, A, M, l, F, S.dateTimeUnit, V, NaN, false, R);
            O.tickMarks.offsets = this._generateDTOffsets(U, r, A, M, J, F, S.dateTimeUnit, V, NaN, false, R);
            K = this._generateDTOffsets(U, r, A, M, B, F, S.dateTimeUnit, V, NaN, true, R)
        } else {
            O.gridLines.offsets = this._generateOffsets(U, r, A, M, l, F, V, NaN, false, R);
            O.tickMarks.offsets = this._generateOffsets(U, r, A, M, J, F, V, NaN, false, R);
            K = this._generateOffsets(U, r, A, M, B, F, V, NaN, true, R)
        }
        var m = f.renderer.getRect();
        var k = m.width - w.x - w.width;
        var o = f._getDataLen(d);
        var n;
        if (f._elementRenderInfo && f._elementRenderInfo.length > d) {
            n = f._elementRenderInfo[d].xAxis
        }
        var p = [];
        var I;
        if (O.labels.formatFunction) {
            I = O.labels.formatFunction
        }
        var u;
        if (O.labels.formatSettings) {
            u = a.extend({}, O.labels.formatSettings)
        }
        if (q.type == "date") {
            if (q.dateFormat && !I) {
                if (u) {
                    u.dateFormat = u.dateFormat || q.dateFormat
                } else {
                    u = {dateFormat: q.dateFormat}
                }
            } else {
                if (!I && (!u || (u && !u.dateFormat))) {
                    I = this._getDefaultDTFormatFn(q.baseUnit || "day")
                }
            }
        }
        for (var N = 0; N < K.length; N++) {
            var L = K[N].value;
            var H = K[N].offset;
            var T = undefined;
            if (q.type != "date" && S.useIndeces && q.dataField) {
                T = Math.round(L);
                L = f._getDataValue(T, q.dataField);
                if (L == undefined) {
                    L = ""
                }
            }
            var v = f._formatValue(L, u, I, d, undefined, T);
            if (v == undefined || v.toString() == "") {
                if (isNaN(T)) {
                    T = N
                }
                if (T >= S.filterRange.min && T <= S.filterRange.max) {
                    v = S.useIndeces ? (S.min + T).toString() : (L == undefined ? "" : L.toString())
                }
            }
            var b = {key: L, text: v, targetX: H, x: H};
            if (n && n.itemOffsets[L]) {
                b.x = n.itemOffsets[L].x;
                b.y = n.itemOffsets[L].y
            }
            p.push(b)
        }
        var C = f._getAnimProps(d);
        var t = C.enabled && p.length < 500 ? C.duration : 0;
        if (f.enableAxisTextAnimation == false) {
            t = 0
        }
        var z = {items: p, renderData: j};
        var e = f._renderAxis(W, D, O, {x: w.x, y: w.y, width: w.width, height: w.height}, c, F, false, true, z, Q, t);
        if (W) {
            e.width += E
        } else {
            e.height += E
        }
        return e
    }, _animateAxisText: function (f, h) {
        var c = f.items;
        var d = f.textSettings;
        for (var e = 0; e < c.length; e++) {
            var g = c[e];
            if (!g) {
                continue
            }
            if (!g.visible) {
                continue
            }
            var b = g.targetX;
            var j = g.targetY;
            if (!isNaN(g.x) && !isNaN(g.y)) {
                b = g.x + (b - g.x) * h;
                j = g.y + (j - g.y) * h
            }
            if (g.element) {
                this.renderer.removeElement(g.element);
                g.element = undefined
            }
            g.element = this.renderer.text(g.text, b, j, g.width, g.height, d.angle, {"class": d.style}, false, d.halign, d.valign, d.textRotationPoint)
        }
    }, _getPolarAxisCoords: function (e, b) {
        var i = this.seriesGroups[e];
        var p = b.x + a.jqx.getNum([i.offsetX, b.width / 2]);
        var o = b.y + a.jqx.getNum([i.offsetY, b.height / 2]);
        var k = Math.min(b.width, b.height);
        var f = i.radius;
        if (this._isPercent(f)) {
            f = parseFloat(f) / 100 * k / 2
        }
        if (isNaN(f)) {
            f = k / 2 * 0.6
        }
        var h = this._alignValuesWithTicks(e);
        var n = this._get([i.startAngle, i.minAngle, 0]) - 90;
        if (isNaN(n)) {
            n = 0
        } else {
            n = 2 * Math.PI * n / 360
        }
        var m = this._get([i.endAngle, i.maxAngle, 360]) - 90;
        if (isNaN(m)) {
            m = 2 * Math.PI
        } else {
            m = 2 * Math.PI * m / 360
        }
        if (n > m) {
            var l = n;
            n = m;
            m = l
        }
        var t = a.jqx._rnd(Math.abs(n - m) / (Math.PI * 2), 0.001, true);
        var q = Math.PI * 2 * f * t;
        var g = this._calcGroupOffsets(e, b).xoffsets;
        if (!g) {
            return
        }
        var j = !(Math.abs(Math.abs(m - n) - Math.PI * 2) > 0.00001);
        if (i.spider) {
            axisStats = this._getXAxisStats(e, this._getXAxis(e), q);
            var r = axisStats.interval;
            if (isNaN(r) || r == 0) {
                r = 1
            }
            var d = (axisStats.max - axisStats.min) / r + (j ? 1 : 0);
            d = Math.round(d);
            if (d > 2) {
                var c = Math.cos(Math.abs(m - n) / 2 / d);
                c = a.jqx._rnd(c, 0.01);
                if (c == 0) {
                    c = 1
                }
                var s = f / c;
                if (s > f && h) {
                    f = s
                }
            }
        }
        f = a.jqx._ptrnd(f);
        return{x: p, y: o, r: f, adjR: this._get([s, f]), itemWidth: g.itemWidth, rangeLength: g.rangeLength, valuesOnTicks: h, startAngle: n, endAngle: m, isClosedCircle: j, axisSize: q}
    }, _toPolarCoord: function (j, f, h, e) {
        var c = Math.abs(j.startAngle - j.endAngle) / (Math.PI * 2);
        var b = (h - f.x) * 2 * Math.PI * c / Math.max(1, f.width) + j.startAngle;
        var d = ((f.height + f.y) - e) * j.r / Math.max(1, f.height);
        var i = j.x + d * Math.cos(b);
        var g = j.y + d * Math.sin(b);
        return{x: a.jqx._ptrnd(i), y: a.jqx._ptrnd(g)}
    }, _renderSpiderAxis: function (A, k) {
        var ap = this;
        var g = ap._getXAxis(A);
        var aB = this._getAxisSettings(g);
        if (!g || !aB.visible) {
            return
        }
        var X = ap.seriesGroups[A];
        var S = ap._getPolarAxisCoords(A, k);
        if (!S) {
            return
        }
        var M = a.jqx._ptrnd(S.x);
        var L = a.jqx._ptrnd(S.y);
        var t = S.adjR;
        var Y = S.startAngle;
        var W = S.endAngle;
        if (t < 1) {
            return
        }
        var aw = a.jqx._rnd(Math.abs(Y - W) / (Math.PI * 2), 0.001, true);
        var h = Math.PI * 2 * t * aw;
        var c = S.isClosedCircle;
        var w = this._renderData[A].xoffsets;
        if (!w.rangeLength) {
            return
        }
        var T = w.axisStats.interval;
        if (isNaN(T) || T < 1) {
            T = 1
        }
        var at = X.orientation == "horizontal";
        var aa = (at && g.position == "right") || (!at && g.position == "top");
        while (ap._renderData.length < A + 1) {
            ap._renderData.push({})
        }
        var au = {rangeLength: w.rangeLength, itemWidth: w.itemWidth, data: w, rect: k, settings: aB};
        ap._renderData[A].xAxis = au;
        ap._renderData[A].polarCoords = S;
        var az = true;
        for (var R = 0; R < A; R++) {
            var B = ap._renderData[R].xAxis;
            var b = ap._renderData[R].polarCoords;
            var E = ap._getXAxis(R);
            var V = false;
            for (var P in S) {
                if (S[P] != b[P]) {
                    V = true;
                    break
                }
            }
            if (!V || E != g) {
                az = false
            }
        }
        var e = aB.gridLines;
        var U = aB.tickMarks;
        var z = aB.labels;
        var ad = this._getInterval(e, T);
        var aE = this._getInterval(U, T);
        var an = this._getInterval(z, T);
        var H = ap._alignValuesWithTicks(A);
        var ae = ap.renderer;
        var ai;
        var af = w.axisStats;
        var aD = af.min;
        var r = af.max;
        var u = this._getPaddingSize(w.axisStats, g, H, h, true, c, false);
        var aj = g.flip == true || ap.rtl;
        if (g.type == "date") {
            e.offsets = this._generateDTOffsets(aD, r, h, u, ad, T, g.baseUnit, true, 0, false, aj);
            U.offsets = this._generateDTOffsets(aD, r, h, u, aE, T, g.baseUnit, true, 0, false, aj);
            ai = this._generateDTOffsets(aD, r, h, u, an, T, g.baseUnit, true, 0, true, aj)
        } else {
            e.offsets = this._generateOffsets(aD, r, h, u, ad, T, true, 0, false, aj);
            U.offsets = this._generateOffsets(aD, r, h, u, aE, T, true, 0, false, aj);
            ai = this._generateOffsets(aD, r, h, u, an, T, true, 0, false, aj)
        }
        var ak = ap.renderer.getRect();
        var ax = ak.width - k.x - k.width;
        var ah = ap._getDataLen(A);
        var s;
        if (ap._elementRenderInfo && ap._elementRenderInfo.length > A) {
            s = ap._elementRenderInfo[A].xAxis
        }
        var ar = [];
        var ag = this._getDataLen(A);
        for (var R = 0; R < ai.length; R++) {
            var G = ai[R].offset;
            var I = ai[R].value;
            if (g.type != "date" && af.useIndeces && g.dataField) {
                var ay = Math.round(I);
                if (ay >= ag) {
                    continue
                }
                I = ap._getDataValue(ay, g.dataField);
                if (I == undefined) {
                    I = ""
                }
            }
            var aq = ap._formatValue(I, z.formatSettings, z.formatFunction, A, undefined, ay);
            if (aq == undefined || aq.toString() == "") {
                aq = af.useIndeces ? (af.min + R).toString() : (I == undefined ? "" : I.toString())
            }
            var d = {key: I, text: aq, targetX: G, x: G};
            if (s && s.itemOffsets[I]) {
                d.x = s.itemOffsets[I].x;
                d.y = s.itemOffsets[I].y
            }
            ar.push(d)
        }
        var aA = {items: ar, renderData: au};
        var l = {stroke: e.color, fill: "none", "stroke-width": e.width, "stroke-dasharray": e.dashStyle || ""};
        if (!X.spider) {
            if (aw == 1) {
                ae.circle(M, L, t, l)
            } else {
                var F = -Y / Math.PI * 180;
                var aF = -W / Math.PI * 180;
                this.renderer.pieslice(M, L, 0, t, Math.min(F, aF), Math.max(F, aF), undefined, l)
            }
        }
        var N = ar.length;
        var m = 2 * Math.PI / (N);
        var am = Y;
        var f, D;
        if (e.visible && az) {
            if (!H && !c) {
                e.offsets.unshift({offset: -u.right})
            }
            for (var R = 0; R < e.offsets.length; R++) {
                var n = e.offsets[R].offset;
                if (!H) {
                    if (c) {
                        n += u.right / 2
                    } else {
                        n += u.right
                    }
                }
                var C = am + n * 2 * Math.PI * aw / Math.max(1, h);
                if (C - W > 0.01) {
                    continue
                }
                var q = a.jqx._ptrnd(M + t * Math.cos(C));
                var p = a.jqx._ptrnd(L + t * Math.sin(C));
                ae.line(M, L, q, p, l)
            }
        }
        if (U.visible && az) {
            var Q = 5;
            var o = {stroke: U.color, fill: "none", "stroke-width": U.width, "stroke-dasharray": U.dashStyle || ""};
            if (!H && !c) {
                U.offsets.unshift({offset: -u.right})
            }
            for (var R = 0; R < U.offsets.length; R++) {
                var n = U.offsets[R].offset;
                if (!H) {
                    if (c) {
                        n += u.right / 2
                    } else {
                        n += u.right
                    }
                }
                var C = am + n * 2 * Math.PI * aw / Math.max(1, h);
                if (C - W > 0.01) {
                    continue
                }
                var ac = {x: M + t * Math.cos(C), y: L + t * Math.sin(C)};
                var ab = {x: M + (t + Q) * Math.cos(C), y: L + (t + Q) * Math.sin(C)};
                ae.line(a.jqx._ptrnd(ac.x), a.jqx._ptrnd(ac.y), a.jqx._ptrnd(ab.x), a.jqx._ptrnd(ab.y), o)
            }
        }
        var ao = [];
        if (X.spider) {
            var v = [];
            if (g.type == "date") {
                v = this._generateDTOffsets(aD, r, h, u, T, T, g.baseUnit, true, 0, false, aj)
            } else {
                v = this._generateOffsets(aD, r, h, u, T, T, true, 0, false, aj)
            }
            if (!H && !c) {
                v.unshift({offset: -u.right})
            }
            for (var R = 0; R < v.length; R++) {
                var n = v[R].offset;
                if (!H) {
                    if (c) {
                        n += u.right / 2
                    } else {
                        n += u.right
                    }
                }
                var C = am + n * 2 * Math.PI * aw / Math.max(1, h);
                if (C - W > 0.01) {
                    continue
                }
                ao.push(C)
            }
            au.offsetAngles = ao
        }
        var Z = ap._renderSpiderValueAxis(A, k, (H ? S.adjR : S.r), ao);
        if (!Z) {
            Z = []
        }
        if (X.spider) {
            if (!H) {
                for (var R = 0; R < Z.length; R++) {
                    Z[R] = Z[R] * S.adjR / S.r
                }
            }
            Z.push(t);
            this._renderSpiderLines(M, L, Z, S, ao, l)
        }
        if (az && z.visible) {
            au.polarLabels = [];
            for (var R = 0; R < ar.length; R++) {
                var n = ar[R].x;
                var C = am + n * 2 * Math.PI * aw / Math.max(1, h);
                C = (360 - C / (2 * Math.PI) * 360) % 360;
                if (C < 0) {
                    C = 360 + C
                }
                var al = ae.measureText(ar[R].text, 0, {"class": aB.labels.style});
                var O = (H ? S.adjR : S.r) + (U.visible ? 7 : 2);
                var av = aB.labels;
                var aC;
                if (av.autoRotate) {
                    var K = a.jqx._ptRotate(M - al.width / 2, L - O - al.height, M, L, -C / 180 * Math.PI);
                    var J = a.jqx._ptRotate(M + al.width / 2, L - O, M, L, -C / 180 * Math.PI);
                    al.width = Math.abs(K.x - J.x);
                    al.height = Math.abs(K.y - J.y);
                    aC = {x: Math.min(K.x, J.x), y: Math.min(K.y, J.y)}
                } else {
                    aC = this._adjustTextBoxPosition(M, L, al, O, C, false, false, false)
                }
                au.polarLabels.push({x: aC.x, y: aC.y, value: ar[R].text});
                ae.text(ar[R].text, aC.x, aC.y, al.width, al.height, av.autoRotate ? 90 - C : av.angle, {"class": av.style}, false, av.halign, av.valign)
            }
        }
    }, _renderSpiderLines: function (h, f, u, m, e, b) {
        var p = this.renderer;
        var q = m.startAngle;
        var o = m.endAngle;
        var g = m.isClosedCircle;
        for (var r = 0; r < u.length; r++) {
            var d = u[r];
            var c = undefined, n = undefined;
            for (var s = 0; s < e.length; s++) {
                var t = e[s];
                var l = a.jqx._ptrnd(h + d * Math.cos(t));
                var k = a.jqx._ptrnd(f + d * Math.sin(t));
                if (c) {
                    p.line(c.x, c.y, l, k, b)
                }
                c = {x: l, y: k};
                if (!n) {
                    n = {x: l, y: k}
                }
            }
            if (n && g) {
                p.line(c.x, c.y, n.x, n.y, b)
            }
        }
    }, _renderSpiderValueAxis: function (d, C, P, O) {
        var h = this;
        var t = this.seriesGroups[d];
        var D = this._getPolarAxisCoords(d, C);
        if (!D) {
            return
        }
        var L = a.jqx._ptrnd(D.x);
        var J = a.jqx._ptrnd(D.y);
        P = P || D.r;
        var f = D.startAngle;
        var V = D.endAngle;
        var T = a.jqx._rnd(Math.abs(f - V) / (Math.PI * 2), 0.001, true);
        if (P < 1) {
            return
        }
        P = a.jqx._ptrnd(P);
        var e = this._getValueAxis(d);
        settings = this._getAxisSettings(e);
        if (!e || false == settings.visible) {
            return
        }
        var H = this._stats.seriesGroups[d].mu;
        var z = settings.labels;
        var w = z.formatSettings;
        var b = t.type.indexOf("stacked") != -1 && t.type.indexOf("100") != -1;
        if (b && !w) {
            w = {sufix: "%"}
        }
        var u = this._get([z.step, z.unitInterval / H]);
        if (isNaN(u)) {
            u = 1
        }
        u = Math.max(1, Math.round(u));
        this._calcValueAxisItems(d, P, u);
        var c = settings.gridLines;
        var A = settings.tickMarks;
        var q = this._getInterval(c, H);
        var M = this._getInterval(A, H);
        var k = settings.labels;
        var j = {stroke: c.color, fill: "none", "stroke-width": 1, "stroke-dasharray": c.dashStyle || ""};
        var n = this._renderData[d].valueAxis;
        var v = n.items;
        if (v.length && settings.line.visible) {
            var m = L + Math.cos(f) * P;
            var W = J + Math.sin(f) * P;
            if (O.indexOf(f) == -1) {
                var R = a.extend({}, j);
                R["stroke-width"] = settings.line.lineWidth;
                R.stroke = settings.line.color;
                R["stroke-dasharray"] = settings.line.dashStyle;
                this.renderer.line(L, J, m, W, R)
            }
        }
        v = v.reverse();
        var G = this.renderer;
        n.polarLabels = [];
        for (var U = 0; U < v.length - 1; U++) {
            var N = v[U];
            if (isNaN(N)) {
                continue
            }
            var B = (k.formatFunction) ? k.formatFunction(N) : this._formatNumber(N, w);
            var g = G.measureText(B, 0, {"class": k.style});
            var K = L + (e.showTickMarks != false ? 3 : 2);
            var I = J - n.itemWidth * U - g.height / 2;
            var s = f;
            var F = a.jqx._ptRotate(K, I, L, J, s);
            var E = a.jqx._ptRotate(K + g.width, I + g.height, L, J, s);
            K = Math.min(F.x, E.x);
            I = Math.min(F.y, E.y);
            g.width = Math.abs(F.x - E.x);
            g.height = Math.abs(F.y - E.y);
            n.polarLabels.push({x: K, y: I, value: B});
            G.text(B, K, I, g.width, g.height, k.autoRotate ? (90 + f * 180 / Math.PI) : k.angle, {"class": k.style}, false, k.halign, k.valign)
        }
        var p = e.logarithmicScale == true;
        var r = p ? v.length : n.rangeLength;
        aIncrement = 2 * Math.PI / r;
        var Q = [];
        if (c.visible || t.spider) {
            var j = {stroke: c.color, fill: "none", "stroke-width": 1, "stroke-dasharray": c.dashStyle || ""};
            for (var U = 0; U < r; U += q) {
                var I = a.jqx._ptrnd(P * U / r);
                if (t.spider) {
                    Q.push(I);
                    continue
                }
                if (T != 1) {
                    var l = -f / Math.PI * 180;
                    var S = -V / Math.PI * 180;
                    this.renderer.pieslice(L, J, 0, I, Math.min(l, S), Math.max(l, S), undefined, j)
                } else {
                    G.circle(L, J, I, j)
                }
            }
        }
        if (A.visible) {
            tickMarkSize = 5;
            var j = {stroke: A.color, fill: "none", "stroke-width": 1, "stroke-dasharray": A.dashStyle || ""};
            var o = L - Math.round(tickMarkSize / 2);
            var m = o + tickMarkSize;
            for (var U = 0; U < r; U += M) {
                if (c.visible && (U % q) == 0) {
                    continue
                }
                var I = a.jqx._ptrnd(J - P * U / r);
                G.line(a.jqx._ptrnd(o), I, a.jqx._ptrnd(m), I, j)
            }
        }
        return Q
    }, _renderAxis: function (H, D, Q, z, c, F, m, V, C, U, d) {
        if (Q.customDraw && !U) {
            return{width: NaN, height: NaN}
        }
        var t = Q.title, n = Q.labels, e = Q.gridLines, A = Q.tickMarks, P = Q.padding;
        var o = A.visible ? A.size : 0;
        var R = 2;
        var G = {width: 0, height: 0};
        var q = {width: 0, height: 0};
        if (H) {
            G.height = q.height = z.height
        } else {
            G.width = q.width = z.width
        }
        if (!U && D) {
            if (H) {
                z.x -= z.width
            }
        }
        var l = C.renderData;
        var b = l.itemWidth;
        if (t.visible && t.text != undefined && t != "") {
            var p = t.angle;
            var f = this.renderer.measureText(t.text, p, {"class": t.style});
            q.width = f.width;
            q.height = f.height;
            if (!U) {
                this.renderer.text(t.text, z.x + t.offset.x + (H ? (!D ? R + P.left : -P.right - R + 2 * z.width - q.width) : 0), z.y + t.offset.y + (!H ? (!D ? z.height - R - q.height - P.bottom : P.top + R) : 0), H ? q.width : z.width, !H ? q.height : z.height, p, {"class": t.style}, true, t.halign, t.valign, t.rotationPoint)
            }
        }
        var L = 0;
        var u = V ? -b / 2 : 0;
        if (V && !H) {
            n.halign = "center"
        }
        var N = z.x;
        var M = z.y;
        var E = n.textOffset;
        if (E) {
            if (!isNaN(E.x)) {
                N += E.x
            }
            if (!isNaN(E.y)) {
                M += E.y
            }
        }
        if (!H) {
            N += u;
            if (D) {
                M += q.height > 0 ? q.height + 3 * R : 2 * R;
                M += o - (V ? o : o / 4)
            } else {
                M += V ? o : o / 4
            }
            M += P.top
        } else {
            N += P.left + R + (q.width > 0 ? q.width + R : 0) + (D ? z.width - q.width : 0);
            M += u
        }
        var T = 0;
        var K = 0;
        var r = C.items;
        l.itemOffsets = {};
        if (this._isToggleRefresh || !this._isUpdate) {
            d = 0
        }
        var k = false;
        var j = 0;
        for (var S = 0; S < r.length && n.visible; S++, L += b) {
            if (!r[S]) {
                continue
            }
            var v = r[S].text;
            if (!isNaN(r[S].targetX)) {
                L = r[S].targetX
            }
            var f = this.renderer.measureText(v, n.angle, {"class": n.style});
            if (f.width > K) {
                K = f.width
            }
            if (f.height > T) {
                T = f.height
            }
            j += H ? T : K;
            if (!U) {
                if ((H && L > z.height + 2) || (!H && L > z.width + 2)) {
                    break
                }
                var J = H ? N + (D ? (q.width == 0 ? o : o - R) : 0) : N + L;
                var I = H ? M + L : M;
                l.itemOffsets[r[S].key] = {x: J, y: I};
                if (!k) {
                    if (!isNaN(r[S].x) || !isNaN(r[S].y) && d) {
                        k = true
                    }
                }
                r[S].targetX = J;
                r[S].targetY = I;
                r[S].width = !H ? b : z.width - P.left - P.right - 2 * R - o - ((q.width > 0) ? q.width + R : 0);
                r[S].height = H ? b : z.height - P.top - P.bottom - 2 * R - o - ((q.height > 0) ? q.height + R : 0);
                r[S].visible = true
            }
        }
        l.avgWidth = r.length == 0 ? 0 : j / r.length;
        if (!U) {
            var s = {items: r, textSettings: n};
            if (isNaN(d) || !k) {
                d = 0
            }
            this._animateAxisText(s, d == 0 ? 1 : 0);
            if (d != 0) {
                var g = this;
                this._enqueueAnimation("series", undefined, undefined, d, function (i, h, w) {
                    g._animateAxisText(h, w)
                }, s)
            }
        }
        G.width += 2 * R + o + q.width + K + (H && q.width > 0 ? R : 0);
        G.height += 2 * R + o + q.height + T + (!H && q.height > 0 ? R : 0);
        if (!H) {
            G.height += P.top + P.bottom
        } else {
            G.width += P.left + P.right
        }
        var B = {};
        if (!U && Q.line.visible) {
            var O = {stroke: Q.line.color, "stroke-width": Q.line.width, "stroke-dasharray": Q.line.dashStyle || ""};
            if (H) {
                var J = z.x + z.width + (D ? P.left : -P.right);
                J = a.jqx._ptrnd(J);
                this.renderer.line(J, z.y, J, z.y + z.height, O)
            } else {
                var I = a.jqx._ptrnd(z.y + (D ? z.height - P.bottom : P.top));
                this.renderer.line(a.jqx._ptrnd(z.x), I, a.jqx._ptrnd(z.x + z.width + 1), I, O)
            }
        }
        G.width = a.jqx._rup(G.width);
        G.height = a.jqx._rup(G.height);
        return G
    }, _drawPlotAreaLines: function (j, w, f) {
        var C = this.seriesGroups[j];
        var c = C.orientation != "horizontal";
        if (!this._renderData || this._renderData.length <= j) {
            return
        }
        var H = w ? "valueAxis" : "xAxis";
        var u = this._renderData[j][H];
        if (!u) {
            return
        }
        var m = this._renderData.axisDrawState;
        if (!m) {
            m = this._renderData.axisDrawState = {}
        }
        var z = "", h;
        if (w) {
            z = "valueAxis_" + ((C.valueAxis) ? j : "") + (c ? "swap" : "");
            h = this._getValueAxis(j)
        } else {
            z = "xAxis_" + ((C.xAxis || C.categoryAxis) ? j : "") + (c ? "swap" : "");
            h = this._getXAxis(j)
        }
        if (m[z]) {
            m = m[z]
        } else {
            m = m[z] = {}
        }
        if (!w) {
            c = !c
        }
        var F = u.settings;
        if (!F) {
            return
        }
        if (F.customDraw) {
            return
        }
        var E = F.gridLines, p = F.tickMarks, t = F.padding;
        var e = u.rect;
        var k = this._plotRect;
        if (!E || !p) {
            return
        }
        var o = 0.5;
        var d = [];
        var b = {stroke: E.color, "stroke-width": E.width, "stroke-dasharray": E.dashStyle || ""};
        var B = w ? e.y + e.height : e.x;
        var n = E.offsets;
        if (w && !h.flip) {
            n = a.extend([], n);
            n = n.reverse()
        }
        if (n && n.length > 0) {
            for (var A = 0; A < n.length; A++) {
                if (c) {
                    D = a.jqx._ptrnd(e.y + n[A].offset);
                    if (D < e.y - o) {
                        break
                    }
                } else {
                    D = a.jqx._ptrnd(e.x + n[A].offset);
                    if (D > e.x + e.width + o) {
                        break
                    }
                }
                if (f.gridLines && E.visible != false && m.gridLines != true) {
                    if (c) {
                        this.renderer.line(a.jqx._ptrnd(k.x), D, a.jqx._ptrnd(k.x + k.width), D, b)
                    } else {
                        this.renderer.line(D, a.jqx._ptrnd(k.y), D, a.jqx._ptrnd(k.y + k.height), b)
                    }
                }
                d[D] = true;
                if (f.alternatingBackground && (E.alternatingBackgroundColor || E.alternatingBackgroundColor2) && m.alternatingBackground != true) {
                    var l = ((A % 2) == 0) ? E.alternatingBackgroundColor2 : E.alternatingBackgroundColor;
                    if (l) {
                        var G;
                        if (c) {
                            G = this.renderer.rect(a.jqx._ptrnd(k.x), B, a.jqx._ptrnd(k.width - 1), D - B, b)
                        } else {
                            G = this.renderer.rect(B, a.jqx._ptrnd(k.y), D - B, a.jqx._ptrnd(k.height), b)
                        }
                        this.renderer.attr(G, {"stroke-width": 0, fill: l, opacity: E.alternatingBackgroundOpacity || 1})
                    }
                    B = D
                }
            }
        }
        var b = {stroke: p.color, "stroke-width": p.width, "stroke-dasharray": p.dashStyle || ""};
        if (f.tickMarks && p.visible && m.tickMarks != true) {
            var s = p.size;
            var n = p.offsets;
            for (var A = 0; A < n.length; A++) {
                var D = a.jqx._ptrnd((c ? e.y + n[A].offset : e.x + n[A].offset));
                if (d[D - 1]) {
                    D--
                } else {
                    if (d[D + 1]) {
                        D++
                    }
                }
                if (c) {
                    if (D > e.y + e.height + o) {
                        break
                    }
                } else {
                    if (D > e.x + e.width + o) {
                        break
                    }
                }
                var v = !u.isMirror ? -s : s;
                if (c) {
                    var r = e.x + e.width + (h.position == "right" ? t.left : -t.right);
                    if (!w) {
                        r = e.x + (u.isMirror ? t.left : -t.right + e.width)
                    }
                    this.renderer.line(r, D, r + v, D, b)
                } else {
                    var q = e.y + (u.isMirror ? e.height : 0);
                    q += u.isMirror ? -t.bottom : t.top;
                    q = a.jqx._ptrnd(q);
                    this.renderer.line(D, q, D, q - v, b)
                }
            }
        }
        m.tickMarks = m.tickMarks || f.tickMarks;
        m.gridLines = m.gridLines || f.gridLines;
        m.alternatingBackground = m.alternatingBackground || f.alternatingBackground
    }, _calcValueAxisItems: function (j, d, l) {
        var n = this._stats.seriesGroups[j];
        if (!n || !n.isValid) {
            return false
        }
        var w = this.seriesGroups[j];
        var b = w.orientation == "horizontal";
        var f = this._getValueAxis(j);
        var m = f.valuesOnTicks != false;
        var e = f.dataField;
        var o = n.intervals;
        var s = d / o;
        var u = n.min;
        var r = n.mu;
        var c = f.logarithmicScale == true;
        var k = f.logarithmicScaleBase || 10;
        var h = w.type.indexOf("stacked") != -1 && w.type.indexOf("100") != -1;
        if (c) {
            r = !isNaN(f.unitInterval) ? f.unitInterval : 1
        }
        if (!m) {
            o = Math.max(o - 1, 1)
        }
        while (this._renderData.length < j + 1) {
            this._renderData.push({})
        }
        this._renderData[j].valueAxis = {};
        var q = this._renderData[j].valueAxis;
        q.itemWidth = q.intervalWidth = s;
        q.items = [];
        var p = q.items;
        for (var v = 0; v <= o; v++) {
            var t = 0;
            if (c) {
                if (h) {
                    t = n.max / Math.pow(k, o - v)
                } else {
                    t = u * Math.pow(k, v)
                }
            } else {
                t = m ? u + v * r : u + (v + 0.5) * r
            }
            if (v % l != 0) {
                p.push(NaN);
                continue
            }
            p.push(t)
        }
        q.rangeLength = c && !h ? n.intervals : (n.intervals) * r;
        if (f.flip != true) {
            p = p.reverse()
        }
        return true
    }, _renderValueAxis: function (f, z, N, e) {
        var M = this.seriesGroups[f];
        var R = M.orientation == "horizontal";
        var r = this._getValueAxis(f);
        if (!r) {
            throw"SeriesGroup " + f + " is missing valueAxis definition"
        }
        var G = {width: 0, height: 0};
        if (!this._isGroupVisible(f) || this._isPieOnlySeries() || M.type == "spider") {
            return G
        }
        var Q = r.valuesOnTicks != false;
        var H = this._stats.seriesGroups[f];
        var j = H.mu;
        var F = r.logarithmicScale == true;
        var C = r.logarithmicScaleBase || 10;
        if (F) {
            j = !isNaN(r.unitInterval) ? r.unitInterval : 1
        }
        if (j == 0) {
            j = 1
        }
        var K = this._getAxisSettings(r);
        var q = K.title, u = K.labels;
        var o = this._get([u.step, u.unitInterval / j]);
        if (isNaN(o)) {
            o = 1
        }
        o = Math.max(1, Math.round(o));
        if (!this._calcValueAxisItems(f, (R ? z.width : z.height), o) || !K.visible) {
            return G
        }
        if (!R) {
            q.angle = (!this.rtl ? -90 : 90);
            if (q.rotationPoint == "centercenter") {
                if (q.valign == "top") {
                    q.rotationPoint = "rightcenter"
                } else {
                    if (q.valign == "bottom") {
                        q.rotationPoint = "leftcenter"
                    }
                }
            }
        }
        var h = u.formatSettings;
        var c = M.type.indexOf("stacked") != -1 && M.type.indexOf("100") != -1;
        if (c && !h) {
            h = {sufix: "%"}
        }
        var p = [];
        var k = this._renderData[f].valueAxis;
        var m;
        if (this._elementRenderInfo && this._elementRenderInfo.length > f) {
            m = this._elementRenderInfo[f].valueAxis
        }
        for (var L = 0; L < k.items.length; L++) {
            var J = k.items[L];
            if (isNaN(J)) {
                p.push(undefined);
                continue
            }
            var w = (u.formatFunction) ? u.formatFunction(J) : this._formatNumber(J, h);
            var b = {key: J, text: w};
            if (m && m.itemOffsets[J]) {
                b.x = m.itemOffsets[J].x;
                b.y = m.itemOffsets[J].y
            }
            p.push(b)
        }
        if (F && j != 1) {
            var n = [];
            for (var L = 0; L < p.length; L++) {
                if (L % j == 0) {
                    n.push(p[p.length - L - 1])
                } else {
                    n.push(undefined)
                }
            }
            p = n.reverse()
        }
        var d = K.gridLines;
        var l = F ? j : this._getInterval(d, j);
        var B = R ? z.width : z.height;
        var P = H.logarithmic ? H.minPow : H.min;
        var s = H.logarithmic ? H.maxPow : H.max;
        var O = (r.flip == true);
        if (d.visible || r.alternatingBackgroundColor || r.alternatingBackgroundColor2) {
            d.offsets = this._generateOffsets(P, s, B, {left: 0, right: 0}, l, j, true, 0, false, !O);
            if (F && !isNaN(d.step)) {
                var n = [];
                for (var L = 0; L < d.offsets.length; L += d.step) {
                    n.push(d.offsets[L])
                }
                d.offsets = n
            }
        }
        var v = K.tickMarks;
        var I = F ? j : this._getInterval(v, j);
        if (v.visible) {
            v.offsets = this._generateOffsets(P, s, B, {left: 0, right: 0}, I, j, true, 0, false, !O);
            if (F && !isNaN(v.step)) {
                var n = [];
                for (var L = 0; L < v.offsets.length; L += v.step) {
                    n.push(v.offsets[L])
                }
                v.offsets = n
            }
        }
        var E = (R && r.position == "top") || (!R && r.position == "right") || (!R && this.rtl && r.position != "left");
        var A = {items: p, renderData: k};
        var D = this._getAnimProps(f);
        var t = D.enabled && p.length < 500 ? D.duration : 0;
        if (this.enableAxisTextAnimation == false) {
            t = 0
        }
        k.settings = K;
        k.isMirror = E;
        k.rect = z;
        return this._renderAxis(!R, E, K, z, e, j, F, Q, A, N, t)
    }, _generateOffsets: function (n, q, t, l, u, d, b, r, s, g) {
        var f = [];
        var m = 1;
        if (d < 1) {
            m = 1000000;
            n *= m;
            q *= m;
            d *= m
        }
        var h = q - n;
        var k = t - l.left - l.right;
        if (h == 0) {
            if (s || b) {
                f.push({offset: l.left + k / 2, value: n / m})
            } else {
                f.push({offset: 0, value: n / m})
            }
            return f
        }
        var v = k / h;
        var c = v * d;
        var e = l.left;
        if (!b) {
            if (!s) {
                q += d
            }
        }
        for (var p = n; p <= q; p += d, e += c) {
            f.push({offset: e, value: p / m})
        }
        if (!b && f.length > 1) {
            if (isNaN(r)) {
                r = s ? 0 : c / 2
            }
            for (var p = 0; p < f.length; p++) {
                f[p].offset -= r;
                if (f[p].offset <= 2) {
                    f[p].offset = 0
                }
                if (f[p].offset >= t - 2) {
                    f[p].offset = t
                }
            }
        }
        if (u > d) {
            var o = [];
            var j = Math.round(u / d);
            for (var p = 0; p < f.length; p++) {
                if ((p % j) == 0) {
                    o.push({offset: f[p].offset, value: f[p].value})
                }
            }
            f = o
        }
        if (g) {
            for (var p = 0; p < f.length; p++) {
                f[p].offset = t - f[p].offset
            }
        }
        return f
    }, _generateDTOffsets: function (p, s, z, n, A, c, o, b, u, v, g) {
        if (!o) {
            o = "day"
        }
        var f = [];
        if (p > s) {
            return f
        }
        if (p == s) {
            if (v) {
                f.push({offset: b ? z / 2 : n.left, value: p})
            } else {
                if (b) {
                    f.push({offset: z / 2, value: p})
                }
            }
            return f
        }
        var j = z - n.left - n.right;
        var w = p;
        var k = n.left;
        var e = k;
        c = Math.max(c, 1);
        var m = c;
        var d = Math.min(1, c);
        if (c > 1 && o != "millisecond") {
            c = 1
        }
        while (a.jqx._ptrnd(e) <= a.jqx._ptrnd(n.left + j + (b ? 0 : n.right))) {
            f.push({offset: e, value: w});
            var B = new Date(w.valueOf());
            if (o == "millisecond") {
                B.setMilliseconds(w.getMilliseconds() + c)
            } else {
                if (o == "second") {
                    B.setSeconds(w.getSeconds() + c)
                } else {
                    if (o == "minute") {
                        B.setMinutes(w.getMinutes() + c)
                    } else {
                        if (o == "hour") {
                            var l = B.valueOf();
                            B.setHours(w.getHours() + c);
                            if (l == B.valueOf()) {
                                B.setHours(w.getHours() + c + 1)
                            }
                        } else {
                            if (o == "day") {
                                B.setDate(w.getDate() + c)
                            } else {
                                if (o == "month") {
                                    B.setMonth(w.getMonth() + c)
                                } else {
                                    if (o == "year") {
                                        B.setFullYear(w.getFullYear() + c)
                                    }
                                }
                            }
                        }
                    }
                }
            }
            w = B;
            e = k + (w.valueOf() - p.valueOf()) * d / (s.valueOf() - p.valueOf()) * j
        }
        if (g) {
            for (var r = 0; r < f.length; r++) {
                f[r].offset = z - f[r].offset
            }
        }
        if (m > 1 && o != "millisecond") {
            var q = [];
            for (var r = 0; r < f.length; r += m) {
                q.push({offset: f[r].offset, value: f[r].value})
            }
            f = q
        }
        if (!b && !v && f.length > 1) {
            var q = [];
            q.push({offset: 0, value: undefined});
            for (var r = 1; r < f.length; r++) {
                q.push({offset: f[r - 1].offset + (f[r].offset - f[r - 1].offset) / 2, value: undefined})
            }
            var t = q.length;
            if (t > 1) {
                q.push({offset: q[t - 1].offset + (q[t - 1].offset - q[t - 2].offset)})
            } else {
                q.push({offset: z, value: undefined})
            }
            f = q
        }
        if (A > c) {
            var q = [];
            var h = Math.round(A / m);
            for (var r = 0; r < f.length; r++) {
                if ((r % h) == 0) {
                    q.push({offset: f[r].offset, value: f[r].value})
                }
            }
            f = q
        }
        return f
    }, _hasStackValueReversal: function (e, s) {
        var g = this.seriesGroups[e];
        var h = -1 != g.type.indexOf("stacked");
        if (!h) {
            return false
        }
        var b = -1 != g.type.indexOf("waterfall");
        var q = this._getDataLen(e);
        var t = 0;
        var l = false;
        var u = [];
        for (var o = 0; o < g.series.length; o++) {
            u[o] = this._isSerieVisible(e, o)
        }
        for (var p = 0; p < q; p++) {
            var m = (b && p != 0) ? t : s;
            var d = 0, r = 0;
            var c = undefined;
            if (!b) {
                l = false
            }
            for (var n = 0; n < g.series.length; n++) {
                if (!u[n]) {
                    continue
                }
                val = this._getDataValueAsNumber(p, g.series[n].dataField, e);
                if (isNaN(val)) {
                    continue
                }
                if (g.series[n].summary) {
                    var f = this._getDataValue(p, g.series[n].summary, e);
                    if (undefined !== f) {
                        continue
                    }
                }
                var k = !l ? val < s : val < 0;
                l = true;
                if (c == undefined) {
                    c = k
                }
                if (k != c) {
                    return true
                }
                c = k;
                t += val
            }
        }
        return false
    }, _getValueAxis: function (b) {
        var c = b == undefined ? this.valueAxis : this.seriesGroups[b].valueAxis || this.valueAxis;
        if (!c) {
            c = this.valueAxis = {}
        }
        return c
    }, _buildStats: function (J) {
        var W = {seriesGroups: []};
        this._stats = W;
        for (var s = 0; s < this.seriesGroups.length; s++) {
            var C = this.seriesGroups[s];
            W.seriesGroups[s] = {};
            var F = this._getXAxis(s);
            var n = this._getValueAxis(s);
            var q = this._getXAxisStats(s, F, (C.orientation == "vertical") ? J.width : J.height);
            var z = W.seriesGroups[s];
            z.isValid = true;
            var K = (C.orientation == "horizontal") ? J.width : J.height;
            var M = n.logarithmicScale == true;
            var L = n.logarithmicScaleBase;
            if (isNaN(L)) {
                L = 10
            }
            var G = -1 != C.type.indexOf("stacked");
            var e = G && -1 != C.type.indexOf("100");
            var I = -1 != C.type.indexOf("range");
            var S = C.type.indexOf("waterfall") != -1;
            if (S && !this._moduleWaterfall) {
                throw"Please include 'jqxchart.waterfall.js'"
            }
            if (e) {
                z.psums = [];
                z.nsums = []
            }
            var t = NaN, O = NaN;
            var d = NaN, f = NaN;
            var r = n ? n.baselineValue : NaN;
            if (isNaN(r)) {
                r = M && !e ? 1 : 0
            }
            var g = false;
            if (r != 0 && G) {
                g = this._hasStackValueReversal(s, r);
                if (g) {
                    r = 0
                }
            }
            if (G && S) {
                g = this._hasStackValueReversal(s, r)
            }
            var B = this._getDataLen(s);
            var c = 0;
            var X = NaN;
            var m = [];
            if (S) {
                for (var k = 0; k < C.series.length; k++) {
                    m.push(NaN)
                }
            }
            var v = NaN;
            for (var V = 0; V < B && z.isValid; V++) {
                if (F.rangeSelector) {
                    var h = F.dataField ? this._getDataValue(V, F.dataField, s) : V;
                    if (h && q.isDateTime) {
                        h = this._castAsDate(h, F.dateFormat)
                    }
                    if (h && (h.valueOf() < q.min.valueOf() || h.valueOf() > q.max.valueOf())) {
                        continue
                    }
                }
                var Y = n.minValue;
                var E = n.maxValue;
                if (n.baselineValue) {
                    if (isNaN(Y)) {
                        Y = r
                    } else {
                        Y = Math.min(r, Y)
                    }
                    if (isNaN(E)) {
                        E = r
                    } else {
                        E = Math.max(r, E)
                    }
                }
                var u = 0, w = 0;
                for (var k = 0; k < C.series.length; k++) {
                    if (!this._isSerieVisible(s, k)) {
                        continue
                    }
                    var H = NaN, R = NaN, A = NaN;
                    if (C.type.indexOf("candle") != -1 || C.type.indexOf("ohlc") != -1) {
                        var b = ["Open", "Low", "Close", "High"];
                        for (var T in b) {
                            var l = this._getDataValueAsNumber(V, C.series[k]["dataField" + b[T]], s);
                            if (isNaN(l)) {
                                continue
                            }
                            A = isNaN(R) ? l : Math.min(A, l);
                            R = isNaN(R) ? l : Math.max(R, l)
                        }
                    } else {
                        if (I) {
                            var Z = this._getDataValueAsNumber(V, C.series[k].dataFieldFrom, s);
                            var D = this._getDataValueAsNumber(V, C.series[k].dataFieldTo, s);
                            R = Math.max(Z, D);
                            A = Math.min(Z, D)
                        } else {
                            H = this._getDataValueAsNumber(V, C.series[k].dataField, s);
                            if (S) {
                                if (this._isSummary(s, V)) {
                                    var U = this._getDataValue(V, C.series[k].summary, s);
                                    if (U !== undefined) {
                                        continue
                                    }
                                }
                                if (!G) {
                                    if (isNaN(m[k])) {
                                        m[k] = H
                                    } else {
                                        H += m[k]
                                    }
                                    m[k] = H
                                } else {
                                    if (!isNaN(v)) {
                                        H += v
                                    }
                                    v = H
                                }
                            }
                            if (isNaN(H) || (M && H <= 0)) {
                                continue
                            }
                            A = R = H
                        }
                    }
                    if ((isNaN(E) || R > E) && ((isNaN(n.maxValue)) ? true : R <= n.maxValue)) {
                        E = R
                    }
                    if ((isNaN(Y) || A < Y) && ((isNaN(n.minValue)) ? true : A >= n.minValue)) {
                        Y = A
                    }
                    if (!isNaN(H) && G && !S) {
                        if (H > r) {
                            u += H
                        } else {
                            if (H < r) {
                                w += H
                            }
                        }
                    }
                }
                if (!e) {
                    if (!isNaN(n.maxValue)) {
                        u = Math.min(n.maxValue, u)
                    }
                    if (!isNaN(n.minValue)) {
                        w = Math.max(n.minValue, w)
                    }
                }
                if (M && e) {
                    for (var k = 0; k < C.series.length; k++) {
                        if (!this._isSerieVisible(s, k)) {
                            X = 0.01;
                            continue
                        }
                        var H = this._getDataValueAsNumber(V, C.series[k].dataField, s);
                        if (isNaN(H) || H <= 0) {
                            X = 0.01;
                            continue
                        }
                        var P = u == 0 ? 0 : H / u;
                        if (isNaN(X) || P < X) {
                            X = P
                        }
                    }
                }
                var o = u - w;
                if (c < o) {
                    c = o
                }
                if (e) {
                    z.psums[V] = u;
                    z.nsums[V] = w
                }
                if (E > O || isNaN(O)) {
                    O = E
                }
                if (Y < t || isNaN(t)) {
                    t = Y
                }
                if (u > d || isNaN(d)) {
                    d = u
                }
                if (w < f || isNaN(f)) {
                    f = w
                }
            }
            if (e) {
                d = d == 0 ? 0 : Math.max(d, -f);
                f = f == 0 ? 0 : Math.min(f, -d)
            }
            if (t == O) {
                if (t == 0) {
                    O = -1
                } else {
                    if (t < 0) {
                        O = 0
                    } else {
                        t = 0
                    }
                }
            }
            var Q = {gmin: t, gmax: O, gsumP: d, gsumN: f, gbase: r, isLogAxis: M, logBase: L, minPercent: X, gMaxRange: c, isStacked: G, isStacked100: e, isWaterfall: S, hasStackValueReversal: g, valueAxis: n, valueAxisSize: K};
            z.context = Q
        }
        this._mergeCommonValueAxisStats();
        for (var V = 0; V < W.seriesGroups.length; V++) {
            var z = W.seriesGroups[V];
            var N = this._calcOutputGroupStats(z.context);
            for (var T in N) {
                z[T] = N[T]
            }
            delete z.context
        }
    }, _mergeCommonValueAxisStats: function () {
        var f = {};
        for (var e = 0; e < this.seriesGroups.length; e++) {
            if (this.seriesGroups[e].valueAxis) {
                continue
            }
            var d = this._stats.seriesGroups[e].context;
            if (isNaN(f.gmin) || f.gmin > d.gmin) {
                f.gmin = d.gmin
            }
            if (isNaN(f.gmax) || f.gmax < d.gmax) {
                f.gmax = d.gmax
            }
            if (isNaN(f.gsumP) || f.gsumP < d.gsumP) {
                f.gsumP = d.gsumP
            }
            if (isNaN(f.gsumN) || f.gsumN < d.gsumN) {
                f.gsumN = d.gsumN
            }
            if (isNaN(f.logBase) || f.logBase > d.logBase) {
                f.logBase = d.logBase
            }
            if (isNaN(f.minPercent) || f.minPercent > d.minPercent) {
                f.minPercent = d.minPercent
            }
        }
        for (var e = 0; e < this.seriesGroups.length; e++) {
            if (this.seriesGroups[e].valueAxis) {
                continue
            }
            var b = this._stats.seriesGroups[e].context;
            for (var c in f) {
                b[c] = f[c]
            }
        }
    }, _calcOutputGroupStats: function (g) {
        var c = g.gmin, f = g.gmax, A = g.gsumP, B = g.gsumN, z = g.gbase, d = g.isLogAxis, j = g.logBase, t = g.minPercent, k = g.gMaxRange, l = g.isStacked, h = g.isStacked100, e = g.isWaterfall, n = g.hasStackValueReversal, w = g.valueAxis, u = g.valueAxisSize;
        var s = g.valueAxis.unitInterval;
        if (!s) {
            s = this._calcInterval(l ? B : c, l ? A : f, Math.max(u / 80, 2))
        }
        if (c == f) {
            c = z;
            f = 2 * f
        }
        var i = NaN;
        var b = 0;
        var q = 0;
        if (d) {
            if (h) {
                i = 0;
                var r = 1;
                b = q = a.jqx.log(100, j);
                while (r > t) {
                    r /= j;
                    b--;
                    i++
                }
                c = Math.pow(j, b)
            } else {
                if (l && !e) {
                    f = Math.max(f, A)
                }
                q = a.jqx._rnd(a.jqx.log(f, j), 1, true);
                f = Math.pow(j, q);
                b = a.jqx._rnd(a.jqx.log(c, j), 1, false);
                c = Math.pow(j, b)
            }
            s = j
        }
        if (c < B) {
            B = c
        }
        if (f > A) {
            A = f
        }
        var v = d ? c : a.jqx._rnd(l && !e ? B : c, s, false);
        var o = d ? f : a.jqx._rnd(l && !e ? A : f, s, true);
        if (h && o > 100) {
            o = 100
        }
        if (h && !d) {
            o = (o > 0) ? 100 : 0;
            v = (v < 0) ? -100 : 0;
            s = w.unitInterval;
            if (isNaN(s) || s <= 0 || s >= 100) {
                s = 10
            }
            if ((100 % s) != 0) {
                for (; s >= 1; s--) {
                    if ((100 % s) == 0) {
                        break
                    }
                }
            }
        }
        if (isNaN(o) || isNaN(v) || isNaN(s)) {
            return{}
        }
        if (isNaN(i)) {
            i = parseInt(((o - v) / (s == 0 ? 1 : s)).toFixed())
        }
        if (d && !h) {
            i = q - b;
            k = Math.pow(j, i)
        }
        if (i < 1) {
            return{}
        }
        var m = {min: v, max: o, logarithmic: d, logBase: j, base: d ? v : z, minPow: b, maxPow: q, mu: s, maxRange: k, intervals: i, hasStackValueReversal: n};
        return m
    }, _getDataLen: function (c) {
        var b = this.source;
        if (c != undefined && c != -1 && this.seriesGroups[c].source) {
            b = this.seriesGroups[c].source
        }
        if (b instanceof a.jqx.dataAdapter) {
            b = b.records
        }
        if (b) {
            return b.length
        }
        return 0
    }, _getDataValue: function (b, e, d) {
        var c = this.source;
        if (d != undefined && d != -1) {
            c = this.seriesGroups[d].source || c
        }
        if (c instanceof a.jqx.dataAdapter) {
            c = c.records
        }
        if (!c || b < 0 || b > c.length - 1) {
            return undefined
        }
        if (a.isFunction(e)) {
            return e(b, c)
        }
        return(e && e != "") ? c[b][e] : c[b]
    }, _getDataValueAsNumber: function (b, e, c) {
        var d = this._getDataValue(b, e, c);
        if (this._isDate(d)) {
            return d.valueOf()
        }
        if (typeof(d) != "number") {
            d = parseFloat(d)
        }
        if (typeof(d) != "number") {
            d = undefined
        }
        return d
    }, _isPieGroup: function (b) {
        var c = this.seriesGroups[b];
        if (!c || !c.type) {
            return false
        }
        return c.type.indexOf("pie") != -1 || c.type.indexOf("donut") != -1
    }, _renderPieSeries: function (e, c) {
        var f = this._getDataLen(e);
        var g = this.seriesGroups[e];
        var m = this._calcGroupOffsets(e, c).offsets;
        for (var p = 0; p < g.series.length; p++) {
            var k = g.series[p];
            if (k.customDraw) {
                continue
            }
            var v = this._getSerieSettings(e, p);
            var h = k.colorScheme || g.colorScheme || this.colorScheme;
            var r = this._getAnimProps(e, p);
            var b = r.enabled && f < 5000 && !this._isToggleRefresh && this._isVML != true ? r.duration : 0;
            if (a.jqx.mobile.isMobileBrowser() && (this.renderer instanceof a.jqx.HTML5Renderer)) {
                b = 0
            }
            var t = this._get([k.minAngle, k.startAngle]);
            if (isNaN(t) || t < 0 || t > 360) {
                t = 0
            }
            var z = this._get([k.maxAngle, k.endAngle]);
            if (isNaN(z) || z < 0 || z > 360) {
                z = 360
            }
            var o = {rect: c, minAngle: t, maxAngle: z, groupIndex: e, serieIndex: p, settings: v, items: []};
            for (var u = 0; u < f; u++) {
                var n = m[p][u];
                if (!n.visible) {
                    continue
                }
                var q = n.fromAngle;
                var d = n.toAngle;
                var w = this.renderer.pieslice(n.x, n.y, n.innerRadius, n.outerRadius, q, b == 0 ? d : q, n.centerOffset);
                var j = {element: w, displayValue: n.displayValue, itemIndex: u, visible: n.visible, x: n.x, y: n.y, innerRadius: n.innerRadius, outerRadius: n.outerRadius, fromAngle: q, toAngle: d, centerOffset: n.centerOffset};
                o.items.push(j)
            }
            this._animatePieSlices(o, 0);
            var l = this;
            this._enqueueAnimation("series", undefined, undefined, b, function (s, i, A) {
                l._animatePieSlices(i, A)
            }, o)
        }
    }, _sliceSortFunction: function (d, c) {
        return d.fromAngle - c.fromAngle
    }, _animatePieSlices: function (m, b) {
        var k;
        if (this._elementRenderInfo && this._elementRenderInfo.length > m.groupIndex && this._elementRenderInfo[m.groupIndex].series && this._elementRenderInfo[m.groupIndex].series.length > m.serieIndex) {
            k = this._elementRenderInfo[m.groupIndex].series[m.serieIndex]
        }
        var I = 360 * b;
        var M = this.seriesGroups[m.groupIndex];
        var v = this._getLabelsSettings(m.groupIndex, m.serieIndex, NaN);
        var P = v.visible;
        var l = [];
        for (var K = 0; K < m.items.length; K++) {
            var C = m.items[K];
            if (!C.visible) {
                continue
            }
            var c = C.fromAngle;
            var D = C.fromAngle + b * (C.toAngle - C.fromAngle);
            if (k && k[C.displayValue]) {
                var h = k[C.displayValue].fromAngle;
                var z = k[C.displayValue].toAngle;
                c = h + (c - h) * b;
                D = z + (D - z) * b
            }
            l.push({index: K, from: c, to: D})
        }
        if (k) {
            l.sort(this._sliceSortFunction)
        }
        var u = NaN;
        for (var K = 0; K < l.length; K++) {
            var C = m.items[l[K].index];
            if (C.labelElement) {
                this.renderer.removeElement(C.labelElement)
            }
            var c = l[K].from;
            var D = l[K].to;
            if (k) {
                if (!isNaN(u) && c > u) {
                    c = u
                }
                u = D;
                if (K == l.length - 1 && D != l[0].from) {
                    D = m.maxAngle + l[0].from
                }
            }
            var N = this.renderer.pieSlicePath(C.x, C.y, C.innerRadius, C.outerRadius, c, D, C.centerOffset);
            this.renderer.attr(C.element, {d: N});
            var H = this._getColors(m.groupIndex, m.serieIndex, C.itemIndex, "radialGradient", C.outerRadius);
            var L = m.settings;
            this.renderer.attr(C.element, {fill: H.fillColor, stroke: H.lineColor, "stroke-width": L.stroke, "fill-opacity": L.opacity, "stroke-opacity": L.opacity, "stroke-dasharray": "none" || L.dashStyle});
            var G = M.series[m.serieIndex];
            if (P) {
                var q = c, J = D;
                var A = Math.abs(q - J);
                var O = A > 180 ? 1 : 0;
                if (A > 360) {
                    q = 0;
                    J = 360
                }
                var f = q * Math.PI * 2 / 360;
                var t = J * Math.PI * 2 / 360;
                var B = A / 2 + q;
                B = B % 360;
                var d = B * Math.PI * 2 / 360;
                var e;
                if (v.autoRotate == true) {
                    e = B < 90 || B > 270 ? 360 - B : 180 - B
                }
                var r = v.linesEnabled;
                var j = this._showLabel(m.groupIndex, m.serieIndex, C.itemIndex, {x: 0, y: 0, width: 0, height: 0}, "center", "center", true, false, false, e);
                var w = v.radius || C.outerRadius + Math.max(j.width, j.height);
                if (this._isPercent(w)) {
                    w = parseFloat(w) / 100 * Math.min(this._plotRect.width, this._plotRect.height) / 2
                }
                w += C.centerOffset;
                var F = a.jqx.getNum([G.offsetX, M.offsetX, m.rect.width / 2]);
                var E = a.jqx.getNum([G.offsetY, M.offsetY, m.rect.height / 2]);
                var o = m.rect.x + F;
                var n = m.rect.y + E;
                var p = this._adjustTextBoxPosition(o, n, j, w, B, C.outerRadius > w, v.linesAngles != false, v.autoRotate == true);
                C.labelElement = this._showLabel(m.groupIndex, m.serieIndex, C.itemIndex, {x: p.x, y: p.y, width: j.width, height: j.height}, "left", "top", false, false, false, e);
                if (w > C.outerRadius + 5 && r != false) {
                    C.labelArrowPath = this._updateLebelArrowPath(C.labelArrowPath, o, n, w, C.outerRadius, d, v.linesAngles != false, H, L)
                }
            }
            if (b == 1) {
                this._installHandlers(C.element, "pieslice", m.groupIndex, m.serieIndex, C.itemIndex)
            }
        }
    }, _updateLebelArrowPath: function (e, j, g, i, k, h, n, b, f) {
        var d = a.jqx._ptrnd(j + (i - 0) * Math.cos(h));
        var m = a.jqx._ptrnd(g - (i - 0) * Math.sin(h));
        var c = a.jqx._ptrnd(j + (k + 2) * Math.cos(h));
        var l = a.jqx._ptrnd(g - (k + 2) * Math.sin(h));
        var o = "M " + d + "," + m + " L" + c + "," + l;
        if (n) {
            o = "M " + d + "," + m + " L" + c + "," + m + " L" + c + "," + l
        }
        if (e) {
            this.renderer.attr(e, {d: o})
        } else {
            e = this.renderer.path(o, {})
        }
        this.renderer.attr(e, {fill: "none", stroke: b.lineColor, "stroke-width": f.stroke, "stroke-opacity": f.opacity, "stroke-dasharray": "none" || f.dashStyle});
        return e
    }, _adjustTextBoxPosition: function (f, e, n, g, s, c, i, o) {
        var d = s * Math.PI * 2 / 360;
        var k = a.jqx._ptrnd(f + g * Math.cos(d));
        var j = a.jqx._ptrnd(e - g * Math.sin(d));
        if (o) {
            var l = n.width;
            var p = n.height;
            var t = Math.atan(p / l) % (Math.PI * 2);
            var u = d % (Math.PI * 2);
            var r = 0, q = 0;
            var m = 0;
            if (u <= t) {
                m = l / 2 * Math.cos(d)
            } else {
                if (u >= t && u < Math.PI - t) {
                    m = (p / 2) * Math.sin(d)
                } else {
                    if (u >= Math.PI - t && u < Math.PI + t) {
                        m = l / 2 * Math.cos(d)
                    } else {
                        if (u >= Math.PI + t && u < 2 * Math.PI - t) {
                            m = p / 2 * Math.sin(d)
                        } else {
                            if (u >= 2 * Math.PI - t && u < 2 * Math.PI) {
                                m = l / 2 * Math.cos(d)
                            }
                        }
                    }
                }
            }
            g += Math.abs(m) + 3;
            var k = a.jqx._ptrnd(f + g * Math.cos(d));
            var j = a.jqx._ptrnd(e - g * Math.sin(d));
            k -= n.width / 2;
            j -= n.height / 2;
            return{x: k, y: j}
        }
        if (!c) {
            if (!i) {
                if (s >= 0 && s < 45 || s >= 315 && s < 360) {
                    j -= n.height / 2
                } else {
                    if (s >= 45 && s < 135) {
                        j -= n.height;
                        k -= n.width / 2
                    } else {
                        if (s >= 135 && s < 225) {
                            j -= n.height / 2;
                            k -= n.width
                        } else {
                            if (s >= 225 && s < 315) {
                                k -= n.width / 2
                            }
                        }
                    }
                }
            } else {
                if (s >= 90 && s < 270) {
                    j -= n.height / 2;
                    k -= n.width
                } else {
                    j -= n.height / 2
                }
            }
        } else {
            k -= n.width / 2;
            j -= n.height / 2
        }
        return{x: k, y: j}
    }, _isColumnType: function (b) {
        return(b.indexOf("column") != -1 || b.indexOf("waterfall") != -1)
    }, _getColumnGroupsCount: function (c) {
        var e = 0;
        c = c || "vertical";
        var f = this.seriesGroups;
        for (var d = 0; d < f.length; d++) {
            var b = f[d].orientation || "vertical";
            if (this._isColumnType(f[d].type) && b == c) {
                e++
            }
        }
        return e
    }, _getColumnGroupIndex: function (g) {
        var b = 0;
        var c = this.seriesGroups[g].orientation || "vertical";
        for (var e = 0; e < g; e++) {
            var f = this.seriesGroups[e];
            var d = f.orientation || "vertical";
            if (this._isColumnType(f.type) && d == c) {
                b++
            }
        }
        return b
    }, _renderAxisBands: function (f, C, K) {
        var z = K ? this._getXAxis(f) : this._getValueAxis(f);
        var t = this.seriesGroups[f];
        var v = K ? undefined : t.bands;
        if (!v) {
            for (var P = 0; P < f; P++) {
                var n = K ? this._getXAxis(P) : this._getValueAxis(P);
                if (n == z) {
                    return
                }
            }
            v = z.bands
        }
        if (!a.isArray(v)) {
            return
        }
        var o = C;
        var V = t.orientation == "horizontal";
        if (V) {
            o = {x: C.y, y: C.x, width: C.height, height: C.width}
        }
        this._calcGroupOffsets(f, o);
        for (var P = 0; P < v.length; P++) {
            var c = v[P];
            var T = this._get([c.minValue, c.from]);
            var w = this._get([c.maxValue, c.to]);
            var s = K ? this.getXAxisDataPointOffset(T, f) : this.getValueAxisDataPointOffset(T, f);
            var U = K ? this.getXAxisDataPointOffset(w, f) : this.getValueAxisDataPointOffset(w, f);
            var A = Math.abs(s - U);
            var J;
            if (t.polar || t.spider) {
                var r = this._renderData[f];
                var d = r.polarCoords;
                if (!K) {
                    var F = this._toPolarCoord(d, C, C.x, r.baseOffset);
                    var E = this._toPolarCoord(d, C, C.x, s);
                    var D = this._toPolarCoord(d, C, C.x, U);
                    var q = a.jqx._ptdist(F.x, F.y, E.x, E.y);
                    var p = a.jqx._ptdist(F.x, F.y, D.x, D.y);
                    var h = Math.round(-d.startAngle * 360 / (2 * Math.PI));
                    var Q = Math.round(-d.endAngle * 360 / (2 * Math.PI));
                    if (h > Q) {
                        var I = h;
                        h = Q;
                        Q = I
                    }
                    if (t.spider) {
                        var G = r.xAxis.offsetAngles;
                        var H = "";
                        var M = [p, q];
                        var B = G;
                        if (d.isClosedCircle) {
                            B = a.extend([], G);
                            B.push(B[0])
                        }
                        for (var L in M) {
                            for (var N = 0; N < B.length; N++) {
                                var S = L == 0 ? N : G.length - N - 1;
                                var l = d.x + M[L] * Math.cos(B[S]);
                                var g = d.y + M[L] * Math.sin(B[S]);
                                if (H == "") {
                                    H += "M "
                                } else {
                                    H += " L"
                                }
                                H += a.jqx._ptrnd(l) + "," + a.jqx._ptrnd(g)
                            }
                            if (L == 0) {
                                var l = d.x + M[1] * Math.cos(B[S]);
                                var g = d.y + M[1] * Math.sin(B[S]);
                                H += " L" + a.jqx._ptrnd(l) + "," + a.jqx._ptrnd(g)
                            }
                        }
                        H += " Z";
                        J = this.renderer.path(H)
                    } else {
                        J = this.renderer.pieslice(d.x, d.y, q, p, h, Q)
                    }
                } else {
                    if (t.spider) {
                        p1 = this.getPolarDataPointOffset(T, this._stats.seriesGroups[f].max, f);
                        p2 = this.getPolarDataPointOffset(w, this._stats.seriesGroups[f].max, f);
                        var H = "M " + d.x + "," + d.y;
                        H += " L " + p1.x + "," + p1.y;
                        H += " L " + p2.x + "," + p2.y;
                        J = this.renderer.path(H)
                    } else {
                        var e = [];
                        var m = {x: Math.min(s, U), y: C.y, width: A, height: C.height};
                        this._columnAsPieSlice(e, 0, C, d, m);
                        J = e[0]
                    }
                }
            } else {
                var b = {x: Math.min(s, U), y: o.y, width: A, height: o.height};
                if (!K) {
                    b = {x: o.x, y: Math.min(s, U), width: o.width, height: A}
                }
                if (V) {
                    var I = b.x;
                    b.x = b.y;
                    b.y = I;
                    I = b.width;
                    b.width = b.height;
                    b.height = I
                }
                if (A == 0 || A == 1) {
                    J = this.renderer.line(a.jqx._ptrnd(b.x), a.jqx._ptrnd(b.y), a.jqx._ptrnd(b.x + (V ? 0 : b.width)), a.jqx._ptrnd(b.y + (V ? b.height : 0)))
                } else {
                    J = this.renderer.rect(b.x, b.y, b.width, b.height)
                }
            }
            var W = c.fillColor || c.color || "#AAAAAA";
            var R = c.lineColor || W;
            var u = c.lineWidth;
            if (isNaN(u)) {
                u = 1
            }
            var O = c.opacity;
            if (isNaN(O) || O < 0 || O > 1) {
                O = 1
            }
            this.renderer.attr(J, {fill: W, "fill-opacity": O, stroke: R, "stroke-opacity": O, "stroke-width": u, "stroke-dasharray": c.dashStyle})
        }
    }, _getColumnGroupWidth: function (m, h, o) {
        var e = this.seriesGroups[m];
        var l = e.type.indexOf("stacked") != -1;
        var d = l ? 1 : e.series.length;
        var k = this._getColumnGroupsCount(e.orientation);
        if (isNaN(k) || 0 == k) {
            k = 1
        }
        var n = h.rangeLength >= 1 ? h.itemWidth : o * 0.9;
        var c = e.columnsMinWidth;
        if (isNaN(c)) {
            c = 1
        }
        if (!isNaN(e.columnsMaxWidth)) {
            c = Math.min(e.columnsMaxWidth, c)
        }
        if (c > n && h.length > 0) {
            n = Math.max(n, o * 0.9 / h.length)
        }
        var i = c;
        if (!l) {
            var f = e.seriesGapPercent;
            if (isNaN(f) || f < 0) {
                f = 10
            }
            f /= 100;
            var b = c;
            b *= (1 + f);
            i += e.series.length * b
        }
        var j = Math.max(n / k, i);
        return{requiredWidth: i, availableWidth: n, targetWidth: j}
    }, _getColumnSerieWidthAndOffset: function (d, e) {
        var m = this.seriesGroups[d];
        var u = m.series[e];
        var c = m.orientation == "horizontal";
        var b = this._plotRect;
        if (c) {
            b = {x: b.y, y: b.x, width: b.height, height: b.width}
        }
        var v = this._calcGroupOffsets(d, b);
        if (!v || v.xoffsets.length == 0) {
            return
        }
        var l = true;
        var w = this._getColumnGroupsCount(m.orientation);
        if (m.type == "candlestick" || m.type == "ohlc") {
            w = 1
        }
        var q = this._getColumnGroupIndex(d);
        var r = this._getColumnGroupWidth(d, v.xoffsets, c ? b.height : b.width);
        var h = 0;
        var f = r.targetWidth;
        if (this.columnSeriesOverlap == true || (Math.round(f) > Math.round(r.availableWidth / w))) {
            w = 1;
            q = 0
        }
        if (l) {
            h -= (f * w) / 2
        }
        h += f * q;
        var D = m.columnsGapPercent;
        if (D <= 0) {
            D = 0
        }
        if (isNaN(D) || D >= 100) {
            D = 25
        }
        D /= 100;
        var k = f * D;
        if (k + r.requiredWidth > r.targetWidth) {
            k = Math.max(0, r.targetWidth - r.requiredWidth)
        }
        if (Math.round(f) > Math.round(r.availableWidth)) {
            k = 0
        }
        f -= k;
        h += k / 2;
        var z = m.seriesGapPercent;
        if (isNaN(z) || z < 0) {
            z = 10
        }
        var n = m.type.indexOf("stacked") != -1;
        var t = f;
        if (!n) {
            t /= m.series.length
        }
        var A = this._get([m.seriesGap, (f * z / 100) / (m.series.length - 1)]);
        if (m.polar == true || m.spider == true || n || m.series.length <= 1) {
            A = 0
        }
        var o = A * (m.series.length - 1);
        if (m.series.length > 1 && o > f - m.series.length * 1) {
            o = f - m.series.length * 1;
            A = o / Math.max(1, (m.series.length - 1))
        }
        var g = t - (o / m.series.length);
        var C = 0;
        var i = m.columnsMaxWidth;
        if (!isNaN(i)) {
            if (g > i) {
                C = g - i;
                g = i
            }
        }
        var B = C / 2;
        var j = 0;
        if (!n) {
            var E = (f - (g * m.series.length) - o) / 2;
            var p = Math.max(0, e);
            j = E + g * e + p * A
        } else {
            j = C / 2
        }
        return{width: g, offset: h + j}
    }, _renderColumnSeries: function (f, c) {
        var j = this.seriesGroups[f];
        if (!j.series || j.series.length == 0) {
            return
        }
        var h = this._getDataLen(f);
        var e = j.orientation == "horizontal";
        var A = c;
        if (e) {
            A = {x: c.y, y: c.x, width: c.height, height: c.width}
        }
        var p = this._calcGroupOffsets(f, A);
        if (!p || p.xoffsets.length == 0) {
            return
        }
        var m;
        if (j.polar == true || j.spider == true) {
            m = this._getPolarAxisCoords(f, A)
        }
        var r = {groupIndex: f, rect: c, vertical: !e, seriesCtx: [], renderData: p, polarAxisCoords: m};
        r.columnGroupWidth = this._getColumnGroupWidth(f, p.xoffsets, e ? A.height : A.width);
        var g = this._getGroupGradientType(f);
        for (var t = 0; t < j.series.length; t++) {
            var n = j.series[t];
            if (n.customDraw) {
                continue
            }
            var w = n.dataField;
            var u = this._getAnimProps(f, t);
            var b = u.enabled && !this._isToggleRefresh && p.xoffsets.length < 100 ? u.duration : 0;
            var k = this._getColumnSerieWidthAndOffset(f, t);
            var q = this._isSerieVisible(f, t);
            var l = this._getSerieSettings(f, t);
            var B = this._getColors(f, t, NaN, this._getGroupGradientType(f), 4);
            var d = [];
            if (a.isFunction(n.colorFunction) && !m) {
                for (var z = p.xoffsets.first; z <= p.xoffsets.last; z++) {
                    d.push(this._getColors(f, t, z, g, 4))
                }
            }
            var v = {seriesIndex: t, serieColors: B, itemsColors: d, settings: l, columnWidth: k.width, xAdjust: k.offset, isVisible: q};
            r.seriesCtx.push(v)
        }
        this._animColumns(r, b == 0 ? 1 : 0);
        var o = this;
        this._enqueueAnimation("series", undefined, undefined, b, function (s, i, C) {
            o._animColumns(i, C)
        }, r)
    }, _getPercent: function (d, c, b, e) {
        if (isNaN(d)) {
            d = c
        }
        if (!isNaN(b) && !isNaN(d) && d < b) {
            d = b
        }
        if (!isNaN(e) && !isNaN(d) && d > e) {
            d = e
        }
        if (isNaN(d)) {
            return NaN
        }
        return d
    }, _getColumnVOffsets: function (n, j, e, D, u, c) {
        var p = this.seriesGroups[j];
        var H = this._getPercent(p.columnsTopWidthPercent, 100, 0, 100);
        var v = this._getPercent(p.columnsBottomWidthPercent, 100, 0, 100);
        if (H == 0 && v == 0) {
            v = 100
        }
        var J = this._getPercent(p.columnsNeckHeightPercent, NaN, 0, 100) / 100;
        var E = this._getPercent(p.columnsNeckWidthPercent, 100, 0, 100) / 100;
        var r = [];
        var I = NaN;
        for (var q = 0; q < e.length; q++) {
            var N = e[q];
            var k = N.seriesIndex;
            var G = p.series[k];
            var o = n.offsets[k][D].from;
            var P = n.offsets[k][D].to;
            var z = n.xoffsets.data[D];
            var g;
            var h = N.isVisible;
            if (!h) {
                P = o
            }
            var b = this._elementRenderInfo;
            if (h && b && b.length > j && b[j].series.length > k) {
                var F = n.xoffsets.xvalues[D];
                g = b[j].series[k][F];
                if (g && !isNaN(g.from) && !isNaN(g.to)) {
                    o = g.from + (o - g.from) * c;
                    P = g.to + (P - g.to) * c;
                    z = g.xoffset + (z - g.xoffset) * c
                }
            }
            if (!g) {
                P = o + (P - o) * (u ? 1 : c)
            }
            if (isNaN(o)) {
                o = isNaN(I) ? n.baseOffset : I
            }
            if (!isNaN(P) && u) {
                I = P
            } else {
                I = o
            }
            if (isNaN(P)) {
                P = o
            }
            var C = {from: o, to: P, xOffset: z};
            if (H != 100 || v != 100) {
                C.funnel = true;
                C.toWidthPercent = H;
                C.fromWidthPercent = v
            }
            r.push(C)
        }
        if (u && r.length > 1 && !(this._elementRenderInfo && this._elementRenderInfo.length > j)) {
            var l = 0, m = 0, K = -Infinity, w = Infinity, L = Infinity, B = -Infinity;
            for (var M = 0; M < r.length; M++) {
                var N = e[M];
                if (N.isVisible) {
                    if (r[M].to >= r[M].from) {
                        m += r[M].to - r[M].from;
                        L = Math.min(L, r[M].from);
                        B = Math.max(B, r[M].to)
                    } else {
                        l += r[M].from - r[M].to;
                        K = Math.max(K, r[M].from);
                        w = Math.min(w, r[M].to)
                    }
                }
            }
            var O = l;
            var t = m;
            l *= c;
            m *= c;
            var d = 0, f = 0;
            for (var M = 0; M < r.length; M++) {
                if (r[M].to >= r[M].from) {
                    var A = r[M].to - r[M].from;
                    if (A + f > m) {
                        A = Math.max(0, m - f);
                        r[M].to = r[M].from + A
                    }
                    if (H != 100 || v != 100) {
                        r[M].funnel = true;
                        if (!isNaN(J) && t * J >= f) {
                            r[M].fromWidthPercent = E * 100
                        } else {
                            r[M].fromWidthPercent = (Math.abs(r[M].from - L) / t) * (H - v) + v
                        }
                        if (!isNaN(J) && t * J >= (0 + (f + A))) {
                            r[M].toWidthPercent = E * 100
                        } else {
                            r[M].toWidthPercent = (Math.abs(r[M].to - L) / t) * (H - v) + v
                        }
                    }
                    f += A
                } else {
                    var A = r[M].from - r[M].to;
                    if (A + d > l) {
                        A = Math.max(0, l - d);
                        r[M].to = r[M].from - A
                    }
                    if (H != 100 || v != 100) {
                        r[M].funnel = true;
                        if (!isNaN(J) && O * J >= d) {
                            r[M].fromWidthPercent = E * 100
                        } else {
                            r[M].fromWidthPercent = (Math.abs(r[M].from - K) / O) * (H - v) + v
                        }
                        if (!isNaN(J) && O * J >= (0 + (d + A))) {
                            r[M].toWidthPercent = E * 100
                        } else {
                            r[M].toWidthPercent = (Math.abs(r[M].to - K) / O) * (H - v) + v
                        }
                    }
                    d += A
                }
            }
        }
        return r
    }, _columnAsPieSlice: function (b, f, l, n, p) {
        var e = this._toPolarCoord(n, l, p.x, p.y);
        var g = this._toPolarCoord(n, l, p.x, p.y + p.height);
        var m = a.jqx._ptdist(n.x, n.y, g.x, g.y);
        var j = a.jqx._ptdist(n.x, n.y, e.x, e.y);
        var d = l.width;
        var o = Math.abs(n.startAngle - n.endAngle) * 180 / Math.PI;
        var c = -((p.x - l.x) * o) / d;
        var i = -((p.x + p.width - l.x) * o) / d;
        var k = n.startAngle;
        k = 360 * k / (Math.PI * 2);
        c -= k;
        i -= k;
        if (b && !isNaN(f)) {
            if (b[f] != undefined) {
                var h = this.renderer.pieSlicePath(n.x, n.y, m, j, i, c, 0);
                h += " Z";
                this.renderer.attr(b[f], {d: h})
            } else {
                b[f] = this.renderer.pieslice(n.x, n.y, m, j, i, c, 0)
            }
        }
        return{fromAngle: i, toAngle: c, innerRadius: m, outerRadius: j}
    }, _animColumns: function (ad, c) {
        var n = ad.groupIndex;
        var w = this.seriesGroups[n];
        var r = ad.renderData;
        var V = w.type.indexOf("waterfall") != -1;
        var C = this._getXAxis(n);
        var E = w.type.indexOf("stacked") != -1;
        var d = ad.polarAxisCoords;
        var v = this._getGroupGradientType(n);
        var p = ad.columnGroupWidth.targetWidth;
        var t = -1;
        for (var W = 0; W < w.series.length; W++) {
            if (this._isSerieVisible(n, W)) {
                t = W;
                break
            }
        }
        var ae = NaN, q = NaN;
        for (var W = 0; W < ad.seriesCtx.length; W++) {
            var ac = ad.seriesCtx[W];
            if (isNaN(ae) || ae > ac.xAdjust) {
                ae = ac.xAdjust
            }
            if (isNaN(q) || q < ac.xAdjust + ac.columnWidth) {
                q = ac.xAdjust + ac.columnWidth
            }
        }
        var o = Math.abs(q - ae);
        var U = ad.renderData.xoffsets;
        var N = -1;
        var K = {};
        var M = w.skipOverlappingPoints == true;
        for (var Y = U.first; Y <= U.last; Y++) {
            var Q = U.data[Y];
            if (isNaN(Q)) {
                continue
            }
            if (N != -1 && Math.abs(Q - N) < o && M) {
                continue
            } else {
                N = Q
            }
            var B = this._getColumnVOffsets(r, n, ad.seriesCtx, Y, E, c);
            var H = false;
            if (V) {
                for (var z = 0; z < w.series.length; z++) {
                    if (w.series[z].summary && U.xvalues[Y][w.series[z].summary]) {
                        H = true
                    }
                }
            }
            for (var z = 0; z < ad.seriesCtx.length; z++) {
                var ac = ad.seriesCtx[z];
                var k = ac.seriesIndex;
                var A = w.series[k];
                var s = B[z].from;
                var af = B[z].to;
                var G = B[z].xOffset;
                if (!ac.elements) {
                    ac.elements = {}
                }
                if (!ac.labelElements) {
                    ac.labelElements = {}
                }
                var g = ac.elements;
                var u = ac.labelElements;
                var e = (ad.vertical ? ad.rect.x : ad.rect.y) + ac.xAdjust;
                var Z = ac.settings;
                var R = ac.itemsColors.length != 0 ? ac.itemsColors[Y - r.xoffsets.first] : ac.serieColors;
                var f = this._isSerieVisible(n, k);
                if (!f) {
                    continue
                }
                var Q = a.jqx._ptrnd(e + G);
                var L = {x: Q, width: ac.columnWidth};
                if (B[z].funnel) {
                    L.fromWidthPercent = B[z].fromWidthPercent;
                    L.toWidthPercent = B[z].toWidthPercent
                }
                var h = true;
                if (ad.vertical) {
                    L.y = s;
                    L.height = af - s;
                    if (L.height < 0) {
                        L.y += L.height;
                        L.height = -L.height;
                        h = false
                    }
                } else {
                    L.x = s < af ? s : af;
                    L.width = Math.abs(s - af);
                    h = s - af < 0;
                    L.y = Q;
                    L.height = ac.columnWidth
                }
                var l = s - af;
                if (isNaN(l)) {
                    continue
                }
                l = Math.abs(l);
                var D = undefined;
                var J = g[Y] == undefined;
                if (!d) {
                    if (B[z].funnel) {
                        var T = this._getTrapezoidPath(a.extend({}, L), ad.vertical, h);
                        if (J) {
                            g[Y] = this.renderer.path(T, {})
                        } else {
                            this.renderer.attr(g[Y], {d: T})
                        }
                    } else {
                        if (J) {
                            g[Y] = this.renderer.rect(L.x, L.y, ad.vertical ? L.width : 0, ad.vertical ? 0 : L.height)
                        } else {
                            if (ad.vertical == true) {
                                this.renderer.attr(g[Y], {x: L.x, y: L.y, height: l})
                            } else {
                                this.renderer.attr(g[Y], {x: L.x, y: L.y, width: l})
                            }
                        }
                    }
                } else {
                    D = this._columnAsPieSlice(g, Y, ad.rect, d, L);
                    var R = this._getColors(n, k, undefined, "radialGradient", D.outerRadius)
                }
                if (l < 1 && (c != 1 || d)) {
                    this.renderer.attr(g[Y], {display: "none"})
                } else {
                    this.renderer.attr(g[Y], {display: "block"})
                }
                if (J) {
                    this.renderer.attr(g[Y], {fill: R.fillColor, "fill-opacity": Z.opacity, "stroke-opacity": Z.opacity, stroke: R.lineColor, "stroke-width": Z.stroke, "stroke-dasharray": Z.dashStyle})
                }
                this.renderer.removeElement(u[Y]);
                if (!f || (l == 0 && c < 1)) {
                    continue
                }
                if (V && this._get([A.showWaterfallLines, w.showWaterfallLines]) != false) {
                    if (!E || (E && z == t)) {
                        var X = E ? -1 : z;
                        if (c == 1 && !isNaN(r.offsets[z][Y].from) && !isNaN(r.offsets[z][Y].to)) {
                            var I = K[X];
                            if (I != undefined) {
                                var ab = {x: I.x, y: a.jqx._ptrnd(I.y)};
                                var aa = {x: Q, y: ab.y};
                                var O = w.columnsTopWidthPercent / 100;
                                if (isNaN(O)) {
                                    O = 1
                                } else {
                                    if (O > 1 || O < 0) {
                                        O = 1
                                    }
                                }
                                var S = w.columnsBottomWidthPercent / 100;
                                if (isNaN(S)) {
                                    S = 1
                                } else {
                                    if (S > 1 || S < 0) {
                                        S = 1
                                    }
                                }
                                var m = ad.vertical ? L.width : L.height;
                                ab.x = ab.x - m / 2 + m / 2 * O;
                                if (H) {
                                    var b = m * O / 2;
                                    aa.x = aa.x + m / 2 - (C.flip ? -b : b)
                                } else {
                                    var b = m * S / 2;
                                    aa.x = aa.x + m / 2 - (C.flip ? -b : b)
                                }
                                if (!ad.vertical) {
                                    this._swapXY([ab]);
                                    this._swapXY([aa])
                                }
                                this.renderer.line(ab.x, ab.y, aa.x, aa.y, {stroke: I.color, "stroke-width": Z.stroke, "stroke-opacity": Z.opacity, "fill-opacity": Z.opacity, "stroke-dasharray": Z.dashStyle})
                            }
                        }
                    }
                    if (c == 1 && l != 0) {
                        K[E ? -1 : z] = {y: af, x: (ad.vertical ? L.x + L.width : L.y + L.height), color: R.lineColor}
                    }
                }
                if (d) {
                    var P = this._toPolarCoord(d, ad.rect, L.x + L.width / 2, L.y);
                    var m = this._showLabel(n, k, Y, L, undefined, undefined, true);
                    var F = D.outerRadius + 10;
                    labelOffset = this._adjustTextBoxPosition(d.x, d.y, m, F, (D.fromAngle + D.toAngle) / 2, true, false, false);
                    u[Y] = this._showLabel(n, k, Y, {x: labelOffset.x, y: labelOffset.y}, undefined, undefined, false, false, false)
                } else {
                    u[Y] = this._showLabel(n, k, Y, L, undefined, undefined, false, false, h)
                }
                if (c == 1) {
                    this._installHandlers(g[Y], "column", n, k, Y)
                }
            }
        }
    }, _getTrapezoidPath: function (g, h, f) {
        var l = "";
        var b = g.fromWidthPercent / 100;
        var c = g.toWidthPercent / 100;
        if (!h) {
            var e = g.width;
            g.width = g.height;
            g.height = e;
            e = g.x;
            g.x = g.y;
            g.y = e
        }
        var j = g.x + g.width / 2;
        var k = [
            {x: j - g.width * (!f ? b : c) / 2, y: g.y + g.height},
            {x: j - g.width * (!f ? c : b) / 2, y: g.y},
            {x: j + g.width * (!f ? c : b) / 2, y: g.y},
            {x: j + g.width * (!f ? b : c) / 2, y: g.y + g.height}
        ];
        if (!h) {
            this._swapXY(k)
        }
        l += "M " + a.jqx._ptrnd(k[0].x) + "," + a.jqx._ptrnd(k[0].y);
        for (var d = 1; d < k.length; d++) {
            l += " L " + a.jqx._ptrnd(k[d].x) + "," + a.jqx._ptrnd(k[d].y)
        }
        l += " Z";
        return l
    }, _swapXY: function (d) {
        for (var c = 0; c < d.length; c++) {
            var b = d[c].x;
            d[c].x = d[c].y;
            d[c].y = b
        }
    }, _renderCandleStickSeries: function (e, c, t) {
        var m = this;
        var h = m.seriesGroups[e];
        if (!h.series || h.series.length == 0) {
            return
        }
        var d = h.orientation == "horizontal";
        var v = c;
        if (d) {
            v = {x: c.y, y: c.x, width: c.height, height: c.width}
        }
        var n = m._calcGroupOffsets(e, v);
        if (!n || n.xoffsets.length == 0) {
            return
        }
        var w = v.width;
        var k;
        if (h.polar || h.spider) {
            k = m._getPolarAxisCoords(e, v);
            w = 2 * k.r
        }
        var g = m._alignValuesWithTicks(e);
        var f = m._getGroupGradientType(e);
        var i = [];
        for (var p = 0; p < h.series.length; p++) {
            i[p] = m._getColumnSerieWidthAndOffset(e, p)
        }
        for (var p = 0; p < h.series.length; p++) {
            if (!this._isSerieVisible(e, p)) {
                continue
            }
            var u = m._getSerieSettings(e, p);
            var l = h.series[p];
            if (l.customDraw) {
                continue
            }
            var j = a.isFunction(l.colorFunction) ? undefined : m._getColors(e, p, NaN, f);
            var o = {rect: c, inverse: d, groupIndex: e, seriesIndex: p, symbolType: l.symbolType, symbolSize: l.symbolSize, "fill-opacity": u.opacity, "stroke-opacity": u.opacity, "stroke-width": u.stroke, "stroke-dasharray": u.dashStyle, gradientType: f, colors: j, renderData: n, polarAxisCoords: k, columnsInfo: i, isOHLC: t, items: [], self: m};
            var q = m._getAnimProps(e, p);
            var b = q.enabled && !m._isToggleRefresh && n.xoffsets.length < 5000 ? q.duration : 0;
            m._animCandleStick(o, 0);
            var r;
            m._enqueueAnimation("series", undefined, undefined, b, function (A, s, z) {
                m._animCandleStick(s, z)
            }, o)
        }
    }, _animCandleStick: function (t, b) {
        var q = ["Open", "Low", "Close", "High"];
        var e = t.columnsInfo[t.seriesIndex].width;
        var g = t.self.seriesGroups[t.groupIndex];
        var v = t.renderData.xoffsets;
        var E = -1;
        var n = Math.abs(v.data[v.last] - v.data[v.first]);
        n *= b;
        var c = NaN, r = NaN;
        for (var z = 0; z < t.columnsInfo.length; z++) {
            var w = t.columnsInfo[z];
            if (isNaN(c) || c > w.offset) {
                c = w.offset
            }
            if (isNaN(r) || r < w.offset + w.width) {
                r = w.offset + w.width
            }
        }
        var m = Math.abs(r - c);
        var B = g.skipOverlappingPoints != false;
        for (var A = v.first; A <= v.last; A++) {
            var l = v.data[A];
            if (isNaN(l)) {
                continue
            }
            if (E != -1 && Math.abs(l - E) < m && B) {
                continue
            }
            var C = Math.abs(v.data[A] - v.data[v.first]);
            if (C > n) {
                break
            }
            E = l;
            var D = t.items[A] = t.items[A] || {};
            for (var z in q) {
                var F = t.self._getDataValueAsNumber(A, g.series[t.seriesIndex]["dataField" + q[z]], t.groupIndex);
                if (isNaN(F)) {
                    break
                }
                var k = t.renderData.offsets[t.seriesIndex][A][q[z]];
                if (isNaN(k)) {
                    break
                }
                D[q[z]] = k
            }
            l += t.inverse ? t.rect.y : t.rect.x;
            if (t.polarAxisCoords) {
                var s = this._toPolarCoord(t.polarAxisCoords, this._plotRect, l, k);
                l = s.x;
                k = s.y
            }
            l = a.jqx._ptrnd(l);
            for (var f in q) {
                D[f] = a.jqx._ptrnd(D[f])
            }
            var h = t.colors;
            if (!h) {
                h = t.self._getColors(t.groupIndex, t.seriesIndex, A, t.gradientType)
            }
            if (!t.isOHLC) {
                var u = D.lineElement;
                if (!u) {
                    u = t.inverse ? this.renderer.line(D.Low, l, D.High, l) : this.renderer.line(l, D.Low, l, D.High);
                    this.renderer.attr(u, {fill: h.fillColor, "fill-opacity": t["fill-opacity"], "stroke-opacity": t["fill-opacity"], stroke: h.lineColor, "stroke-width": t["stroke-width"], "stroke-dasharray": t["stroke-dasharray"]});
                    D.lineElement = u
                }
                var p = D.stickElement;
                l -= e / 2;
                if (!p) {
                    var d = h.fillColor;
                    if (D.Close <= D.Open && h.fillColorAlt) {
                        d = h.fillColorAlt
                    }
                    p = t.inverse ? this.renderer.rect(Math.min(D.Open, D.Close), l, Math.abs(D.Close - D.Open), e) : this.renderer.rect(l, Math.min(D.Open, D.Close), e, Math.abs(D.Close - D.Open));
                    this.renderer.attr(p, {fill: d, "fill-opacity": t["fill-opacity"], "stroke-opacity": t["fill-opacity"], stroke: h.lineColor, "stroke-width": t["stroke-width"], "stroke-dasharray": t["stroke-dasharray"]});
                    D.stickElement = p
                }
                if (b == 1) {
                    this._installHandlers(p, "column", t.groupIndex, t.seriesIndex, A)
                }
            } else {
                var o = "M" + l + "," + D.Low + " L" + l + "," + D.High + " M" + (l - e / 2) + "," + D.Open + " L" + l + "," + D.Open + " M" + (l + e / 2) + "," + D.Close + " L" + l + "," + D.Close;
                if (t.inverse) {
                    o = "M" + D.Low + "," + l + " L" + D.High + "," + l + " M" + D.Open + "," + (l - e / 2) + " L" + D.Open + "," + l + " M" + D.Close + "," + l + " L" + D.Close + "," + (l + e / 2)
                }
                var u = D.lineElement;
                if (!u) {
                    u = this.renderer.path(o, {});
                    this.renderer.attr(u, {fill: h.fillColor, "fill-opacity": t["fill-opacity"], "stroke-opacity": t["fill-opacity"], stroke: h.lineColor, "stroke-width": t["stroke-width"], "stroke-dasharray": t["stroke-dasharray"]});
                    D.lineElement = u
                }
                if (b == 1) {
                    this._installHandlers(u, "column", t.groupIndex, t.seriesIndex, A)
                }
            }
        }
    }, _renderScatterSeries: function (e, C, E) {
        var t = this.seriesGroups[e];
        if (!t.series || t.series.length == 0) {
            return
        }
        var f = t.type.indexOf("bubble") != -1;
        var u = t.orientation == "horizontal";
        var m = C;
        if (u) {
            m = {x: C.y, y: C.x, width: C.height, height: C.width}
        }
        var n = this._calcGroupOffsets(e, m);
        if (!n || n.xoffsets.length == 0) {
            return
        }
        var M = m.width;
        var c;
        if (t.polar || t.spider) {
            c = this._getPolarAxisCoords(e, m);
            M = 2 * c.r
        }
        var U = this._alignValuesWithTicks(e);
        var q = this._getGroupGradientType(e);
        if (!E) {
            E = "to"
        }
        for (var g = 0; g < t.series.length; g++) {
            var S = this._getSerieSettings(e, g);
            var J = t.series[g];
            if (J.customDraw) {
                continue
            }
            var z = J.dataField;
            var l = a.isFunction(J.colorFunction);
            var K = this._getColors(e, g, NaN, q);
            var T = NaN, w = NaN;
            if (f) {
                for (var R = n.xoffsets.first; R <= n.xoffsets.last; R++) {
                    var B = this._getDataValueAsNumber(R, (J.radiusDataField || J.sizeDataField), e);
                    if (typeof(B) != "number") {
                        throw"Invalid radiusDataField value at [" + R + "]"
                    }
                    if (!isNaN(B)) {
                        if (isNaN(T) || B < T) {
                            T = B
                        }
                        if (isNaN(w) || B > w) {
                            w = B
                        }
                    }
                }
            }
            var j = J.minRadius || J.minSymbolSize;
            if (isNaN(j)) {
                j = M / 50
            }
            var D = J.maxRadius || J.maxSymbolSize;
            if (isNaN(D)) {
                D = M / 25
            }
            if (j > D) {
                D = j
            }
            var L = J.radius;
            if (isNaN(L) && !isNaN(J.symbolSize)) {
                L = (J.symbolType == "circle") ? J.symbolSize / 2 : J.symbolSize
            } else {
                L = 5
            }
            var F = this._getAnimProps(e, g);
            var A = F.enabled && !this._isToggleRefresh && n.xoffsets.length < 5000 ? F.duration : 0;
            var v = {groupIndex: e, seriesIndex: g, symbolType: J.symbolType, symbolSize: J.symbolSize, "fill-opacity": S.opacity, "stroke-opacity": S.opacity, "stroke-width": S.stroke, "stroke-dasharray": S.dashStyle, items: [], polarAxisCoords: c};
            for (var R = n.xoffsets.first; R <= n.xoffsets.last; R++) {
                var B = this._getDataValueAsNumber(R, z, e);
                if (typeof(B) != "number") {
                    continue
                }
                var I = n.xoffsets.data[R];
                var G = n.xoffsets.xvalues[R];
                var H = n.offsets[g][R][E];
                if (isNaN(I) || isNaN(H)) {
                    continue
                }
                if (u) {
                    var P = I;
                    I = H;
                    H = P + C.y
                } else {
                    I += C.x
                }
                var N = L;
                if (f) {
                    var o = this._getDataValueAsNumber(R, (J.radiusDataField || J.sizeDataField), e);
                    if (typeof(o) != "number") {
                        continue
                    }
                    N = j + (D - j) * (o - T) / Math.max(1, w - T);
                    if (isNaN(N)) {
                        N = j
                    }
                }
                n.offsets[g][R].radius = N;
                var k = NaN, O = NaN;
                var p = 0;
                var b = this._elementRenderInfo;
                if (G != undefined && b && b.length > e && b[e].series.length > g) {
                    var d = b[e].series[g][G];
                    if (d && !isNaN(d.to)) {
                        k = d.to;
                        O = d.xoffset;
                        p = L;
                        if (u) {
                            var P = O;
                            O = k;
                            k = P + C.y
                        } else {
                            O += C.x
                        }
                        if (f) {
                            p = j + (D - j) * (d.valueRadius - T) / Math.max(1, w - T);
                            if (isNaN(p)) {
                                p = j
                            }
                        }
                    }
                }
                if (l) {
                    K = this._getColors(e, g, R, q)
                }
                v.items.push({from: p, to: N, itemIndex: R, fill: K.fillColor, stroke: K.lineColor, x: I, y: H, xFrom: O, yFrom: k})
            }
            this._animR(v, 0);
            var h = this;
            var Q;
            this._enqueueAnimation("series", undefined, undefined, A, function (s, i, r) {
                h._animR(i, r)
            }, v)
        }
    }, _animR: function (m, f) {
        var g = m.items;
        var n = m.symbolType || "circle";
        var c = m.symbolSize;
        for (var e = 0; e < g.length; e++) {
            var l = g[e];
            var j = l.x;
            var h = l.y;
            var b = Math.round((l.to - l.from) * f + l.from);
            if (!isNaN(l.yFrom)) {
                h = l.yFrom + (h - l.yFrom) * f
            }
            if (!isNaN(l.xFrom)) {
                j = l.xFrom + (j - l.xFrom) * f
            }
            if (m.polarAxisCoords) {
                var k = this._toPolarCoord(m.polarAxisCoords, this._plotRect, j, h);
                j = k.x;
                h = k.y
            }
            j = a.jqx._ptrnd(j);
            h = a.jqx._ptrnd(h);
            b = a.jqx._ptrnd(b);
            var d = l.element;
            if (n == "circle") {
                if (!d) {
                    d = this.renderer.circle(j, h, b);
                    this.renderer.attr(d, {fill: l.fill, "fill-opacity": m["fill-opacity"], "stroke-opacity": m["fill-opacity"], stroke: l.stroke, "stroke-width": m["stroke-width"], "stroke-dasharray": m["stroke-dasharray"]});
                    l.element = d
                }
                if (this._isVML) {
                    this.renderer.updateCircle(d, undefined, undefined, b)
                } else {
                    this.renderer.attr(d, {r: b, cy: h, cx: j})
                }
            } else {
                if (d) {
                    this.renderer.removeElement(d)
                }
                l.element = d = this._drawSymbol(n, j, h, l.fill, m["fill-opacity"], l.stroke, m["stroke-opacity"] || m["fill-opacity"], m["stroke-width"], m["stroke-dasharray"], c || b)
            }
            if (l.labelElement) {
                this.renderer.removeElement(l.labelElement)
            }
            l.labelElement = this._showLabel(m.groupIndex, m.seriesIndex, l.itemIndex, {x: j - b, y: h - b, width: 2 * b, height: 2 * b});
            if (f >= 1) {
                this._installHandlers(d, "circle", m.groupIndex, m.seriesIndex, l.itemIndex)
            }
        }
    }, _showToolTip: function (n, l, G, z, e) {
        var u = this;
        var k = u._getXAxis(G);
        var b = u._getValueAxis(G);
        if (u._ttEl && G == u._ttEl.gidx && z == u._ttEl.sidx && e == u._ttEl.iidx) {
            return
        }
        var j = u.seriesGroups[G];
        var o = j.series[z];
        var h = u.enableCrosshairs && !(j.polar || j.spider);
        if (u._pointMarker) {
            n = parseInt(u._pointMarker.x + 5);
            l = parseInt(u._pointMarker.y - 5)
        } else {
            h = false
        }
        var i = h && u.showToolTips == false;
        n = a.jqx._ptrnd(n);
        l = a.jqx._ptrnd(l);
        var H = u._ttEl == undefined;
        if (j.showToolTips == false || o.showToolTips == false) {
            return
        }
        var g = u._get([o.toolTipFormatSettings, j.toolTipFormatSettings, b.toolTipFormatSettings, u.toolTipFormatSettings]);
        var r = u._get([o.toolTipFormatFunction, j.toolTipFormatFunction, b.toolTipFormatFunction, u.toolTipFormatFunction]);
        var m = u._getColors(G, z, e);
        var s = u._getDataValue(e, k.dataField, G);
        if (k.dataField == undefined || k.dataField == "") {
            s = e
        }
        if (k.type == "date") {
            s = u._castAsDate(s, (g ? g.dateFormat : undefined) || k.dateFormat)
        }
        var q = "";
        if (a.isFunction(r)) {
            var v = {};
            var B = 0;
            for (var c in o) {
                if (c.indexOf("dataField") == 0) {
                    v[c.substring(9, c.length).toLowerCase()] = u._getDataValue(e, o[c], G);
                    B++
                }
            }
            if (B == 0) {
                v = u._getDataValue(e, undefined, G)
            } else {
                if (B == 1) {
                    v = v[""]
                }
            }
            q = r(v, e, o, j, s, k)
        } else {
            q = u._getFormattedValue(G, z, e, g, r);
            var d = this._getAxisSettings(k);
            var L = d.toolTipFormatSettings;
            var f = d.toolTipFormatFunction;
            if (!f && !L && k.type == "date") {
                f = this._getDefaultDTFormatFn(k.baseUnit || "day")
            }
            var K = u._formatValue(s, L, f, G, z, e);
            if (!u._isPieGroup(G)) {
                var p = (k.displayText || k.dataField || "");
                if (p.length > 0) {
                    q = p + ": " + K + "<br>" + q
                } else {
                    q = K + "<br>" + q
                }
            } else {
                s = u._getDataValue(e, o.displayText || o.dataField, G);
                K = u._formatValue(s, L, f, G, z, e);
                q = K + ": " + q
            }
        }
        if (!u._ttEl) {
            u._ttEl = {}
        }
        u._ttEl.sidx = z;
        u._ttEl.gidx = G;
        u._ttEl.iidx = e;
        rect = u.renderer.getRect();
        if (h) {
            var D = a.jqx._ptrnd(u._pointMarker.x);
            var C = a.jqx._ptrnd(u._pointMarker.y);
            if (u._ttEl.vLine && u._ttEl.hLine) {
                u.renderer.attr(u._ttEl.vLine, {x1: D, x2: D});
                u.renderer.attr(u._ttEl.hLine, {y1: C, y2: C})
            } else {
                var A = u.crosshairsColor || u._defaultLineColor;
                u._ttEl.vLine = u.renderer.line(D, u._plotRect.y, D, u._plotRect.y + u._plotRect.height, {stroke: A, "stroke-width": u.crosshairsLineWidth || 1, "stroke-dasharray": u.crosshairsDashStyle || ""});
                u._ttEl.hLine = u.renderer.line(u._plotRect.x, C, u._plotRect.x + u._plotRect.width, C, {stroke: A, "stroke-width": u.crosshairsLineWidth || 1, "stroke-dasharray": u.crosshairsDashStyle || ""})
            }
        }
        if (!i && u.showToolTips != false) {
            var E = o.toolTipClass || j.toolTipClass || this.toThemeProperty("jqx-chart-tooltip-text", null);
            var I = o.toolTipBackground || j.toolTipBackground || "#FFFFFF";
            var J = o.toolTipLineColor || j.toolTipLineColor || m.lineColor;
            var w = this.getItemCoord(G, z, e);
            var F = 0;
            if (u._pointMarker && u._pointMarker.element) {
                F = o.symbolSizeSelected;
                if (isNaN(F)) {
                    F = o.symbolSize
                }
                if (isNaN(F) || F > 50 || F < 0) {
                    F = j.symbolSize
                }
                if (isNaN(F) || F > 50 || F < 0) {
                    F = 6
                }
            }
            u._createTooltip(w, j, q, {css: E, fill: I, stroke: J, symbolSize: F})
        }
    }, _fitTooltip: function (c, h, j, k, e) {
        var d = {};
        var b = 2 + e / 2;
        var f = 7;
        if (h.x - j.width - f - b > c.x && h.y + h.height / 2 - j.height / 2 > c.y && h.y + h.height / 2 + j.height / 2 < c.y + c.height) {
            d.left = {arrowLocation: "right", x: h.x - j.width - f - b, y: h.y + h.height / 2 - j.height / 2, width: j.width + f, height: j.height}
        }
        if (h.x + h.width + j.width + f + b < c.x + c.width && h.y + h.height / 2 - j.height / 2 > c.y && h.y + h.height / 2 + j.height / 2 < c.y + c.height) {
            d.right = {arrowLocation: "left", x: h.x + h.width + b, y: h.y + h.height / 2 - j.height / 2, width: j.width + f, height: j.height}
        }
        if (h.y - j.height - b - f > c.y && h.x + h.width / 2 - j.width / 2 > c.x && h.x + h.width / 2 + j.width / 2 < c.x + c.width) {
            d.top = {arrowLocation: "bottom", x: h.x + h.width / 2 - j.width / 2, y: h.y - j.height - b - f, width: j.width, height: j.height + f}
        }
        if (h.y + h.height + j.height + f + b < c.y + c.height && h.x + h.width / 2 - j.width / 2 > c.x && h.x + h.width / 2 + j.width / 2 < c.x + c.width) {
            d.bottom = {arrowLocation: "top", x: h.x + h.width / 2 - j.width / 2, y: h.y + h.height + b, width: j.width, height: j.height + f}
        }
        if (h.width > h.height || ((k.type.indexOf("stackedcolumn") != -1 || k.type.indexOf("stackedwaterfall") != -1) && k.orientation != "horizontal")) {
            if (d.left) {
                return d.left
            }
            if (d.right) {
                return d.right
            }
        } else {
            if (d.top) {
                return d.top
            }
            if (d.bottom) {
                return d.bottom
            }
        }
        for (var g in d) {
            if (d[g]) {
                return d[g]
            }
        }
        return{arrowLocation: ""}
    }, _createTooltip: function (B, i, t, u) {
        var o = this;
        var s = i.type;
        var z = false;
        var A = o._ttEl.box;
        if (!A) {
            z = true;
            A = o._ttEl.box = document.createElement("div");
            A.style.position = "absolute";
            A.style.cursor = "default";
            a(A).css("z-index", 9999999);
            a(document.body).append(A);
            var b = document.createElement("div");
            b.id = "arrowOuterDiv";
            b.style.width = "0px";
            b.style.height = "0px";
            b.style.position = "absolute";
            a(f).css("z-index", 9999999 + 1);
            var f = document.createElement("div");
            f.id = "arrowInnerDiv";
            f.style.width = "0px";
            f.style.height = "0px";
            f.style.position = "absolute";
            var r = document.createElement("div");
            r.id = "contentDiv";
            r.style.position = "absolute";
            a(r).addClass("jqx-rc-all jqx-button");
            a(r).appendTo(a(A));
            a(b).appendTo(a(A));
            a(f).appendTo(a(A));
            a(f).css("z-index", 9999999 + 2)
        }
        if (!t || t.length == 0) {
            a(A).fadeTo(0, 0);
            return
        }
        r = a(A).find("#contentDiv")[0];
        b = a(A).find("#arrowOuterDiv")[0];
        f = a(A).find("#arrowInnerDiv")[0];
        r.style.backgroundColor = u.fill;
        r.style.borderColor = u.stroke;
        var k = "<span class='" + u.css + "'>" + t + "</span>";
        a(r).html(k);
        var n = this._measureHtml(k, "jqx-rc-all jqx-button");
        rect = o._plotRect;
        if (n.width > rect.width || n.height > rect.height) {
            return
        }
        var m = {width: n.width, height: n.height};
        arrowLocation = "";
        var w = 5;
        var p = 7;
        var q = o._isColumnType(s);
        x = Math.max(B.x, rect.x);
        y = Math.max(B.y, rect.y);
        if (o.toolTipAlignment == "dataPoint") {
            if (s.indexOf("pie") != -1 || s.indexOf("donut") != -1) {
                var j = (B.fromAngle + B.toAngle) / 2;
                j = j * (Math.PI / 180);
                var e = (!isNaN(B.innerRadius) && B.innerRadius > 0) ? (B.innerRadius + B.outerRadius) / 2 : B.outerRadius * 0.75;
                x = B.x = B.center.x + Math.cos(j) * e;
                y = B.y = B.center.y - Math.sin(j) * e;
                B.width = B.height = 1
            } else {
                if (q && (i.polar || i.spider)) {
                    B.width = B.height = 1
                }
            }
            var v = this._fitTooltip(this._plotRect, B, m, i, u.symbolSize);
            if (v.arrowLocation != "") {
                arrowLocation = v.arrowLocation;
                x = v.x;
                y = v.y;
                m.width = v.width;
                m.height = v.height
            }
        } else {
            arrowLocation = ""
        }
        if (arrowLocation == "top" || arrowLocation == "bottom") {
            m.height += p;
            x -= p / 2;
            if (arrowLocation == "bottom") {
                y -= p
            }
        } else {
            if (arrowLocation == "left" || arrowLocation == "right") {
                m.width += p;
                y -= p / 2;
                if (arrowLocation == "right") {
                    x -= p
                }
            }
        }
        if (x + m.width > rect.x + rect.width) {
            arrowLocation = "";
            x = rect.x + rect.width - m.width
        }
        if (y + m.height > rect.y + rect.height) {
            arrowLocation = "";
            y = rect.y + rect.height - m.height
        }
        var g = {x: 0, y: 0}, d = {x: 0, y: 0};
        a(r).css({width: n.width, height: n.height, left: 0, top: 0});
        b.style["margin-top"] = b.style["margin-left"] = 0;
        f.style["margin-top"] = f.style["margin-left"] = 0;
        r.style["margin-top"] = r.style["margin-left"] = 0;
        var h = p + "px solid";
        var c = p + "px solid transparent";
        switch (arrowLocation) {
            case"left":
                g = {x: 0, y: (n.height - p) / 2};
                contentPostion = {x: p, y: 0};
                r.style["margin-left"] = p + "px";
                b.style["margin-left"] = 0 + "px";
                b.style["margin-top"] = g.y + "px";
                b.style["border-left"] = "";
                b.style["border-right"] = h + " " + u.stroke;
                b.style["border-top"] = c;
                b.style["border-bottom"] = c;
                f.style["margin-left"] = 1 + "px";
                f.style["margin-top"] = g.y + "px";
                f.style["border-left"] = "";
                f.style["border-right"] = h + " " + u.fill;
                f.style["border-top"] = c;
                f.style["border-bottom"] = c;
                break;
            case"right":
                g = {x: m.width - p, y: (n.height - p) / 2};
                contentPostion = {x: 0, y: 0};
                b.style["margin-left"] = g.x + "px";
                b.style["margin-top"] = g.y + "px";
                b.style["border-left"] = h + " " + u.stroke;
                b.style["border-right"] = "";
                b.style["border-top"] = c;
                b.style["border-bottom"] = c;
                f.style["margin-left"] = g.x - 1 + "px";
                f.style["margin-top"] = g.y + "px";
                f.style["border-left"] = h + " " + u.fill;
                f.style["border-right"] = "";
                f.style["border-top"] = c;
                f.style["border-bottom"] = c;
                break;
            case"top":
                g = {x: m.width / 2 - p / 2, y: 0};
                contentPostion = {x: 0, y: p};
                r.style["margin-top"] = contentPostion.y + "px";
                b.style["margin-left"] = g.x + "px";
                b.style["border-top"] = "";
                b.style["border-bottom"] = h + " " + u.stroke;
                b.style["border-left"] = c;
                b.style["border-right"] = c;
                f.style["margin-left"] = g.x + "px";
                f.style["margin-top"] = 1 + "px";
                f.style["border-top"] = "";
                f.style["border-bottom"] = h + " " + u.fill;
                f.style["border-left"] = c;
                f.style["border-right"] = c;
                break;
            case"bottom":
                g = {x: m.width / 2 - p / 2, y: m.height - p};
                contentPostion = {x: 0, y: 0};
                b.style["margin-left"] = g.x + "px";
                b.style["margin-top"] = g.y + "px";
                b.style["border-top"] = h + " " + u.stroke;
                b.style["border-bottom"] = "";
                b.style["border-left"] = c;
                b.style["border-right"] = c;
                f.style["margin-left"] = g.x + "px";
                f.style["margin-top"] = g.y - 1 + "px";
                f.style["border-top"] = h + " " + u.fill;
                f.style["border-bottom"] = "";
                f.style["border-left"] = c;
                f.style["border-right"] = c;
                break
        }
        if (arrowLocation == "") {
            a(b).hide();
            a(f).hide()
        } else {
            a(b).show();
            a(f).show()
        }
        a(A).css({width: m.width + "px", height: m.height + "px"});
        var l = o.host.coord();
        if (z) {
            a(A).fadeOut(0, 0);
            A.style.left = x + l.left + "px";
            A.style.top = y + l.top + "px"
        }
        a(A).clearQueue();
        a(A).animate({left: x + l.left, top: y + l.top, opacity: 1}, o.toolTipMoveDuration, "easeInOutCirc");
        a(A).fadeTo(400, 1)
    }, _measureHtml: function (c, b) {
        var e = this._measureDiv;
        if (!e) {
            this._measureDiv = e = document.createElement("div");
            e.style.position = "absolute";
            e.style.cursor = "default";
            e.style.overflow = "hidden";
            e.style.display = "none";
            a(e).addClass(b);
            this.host.append(e)
        }
        a(e).html(c);
        var d = {width: a(e).width() + 2, height: a(e).height() + 2};
        if (a.jqx.browser && a.jqx.browser.mozilla) {
            d.height += 3
        }
        return d
    }, _hideToolTip: function (b) {
        if (!this._ttEl) {
            return
        }
        if (this._ttEl.box) {
            if (b == 0) {
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
    }, _get: function (b) {
        return a.jqx.getByPriority(b)
    }, _getAxisSettings: function (f) {
        if (!f) {
            return{}
        }
        var l = this;
        var k = f.gridLines || {};
        var n = {visible: (f.showGridLines != false && k.visible != false), color: l._get([k.color, f.gridLinesColor, l._defaultLineColor]), unitInterval: l._get([k.unitInterval, k.interval, f.gridLinesInterval]), step: l._get([k.step, f.gridLinesStep]), dashStyle: l._get([k.dashStyle, f.gridLinesDashStyle]), width: l._get([k.lineWidth, 1]), offsets: [], alternatingBackgroundColor: f.alternatingBackgroundColor, alternatingBackgroundColor2: f.alternatingBackgroundColor2, alternatingBackgroundOpacity: f.alternatingBackgroundOpacity};
        var d = f.tickMarks || {};
        var h = {visible: (f.showTickMarks != false && d.visible != false), color: l._get([d.color, f.tickMarksColor, l._defaultLineColor]), unitInterval: l._get([d.unitInterval, d.interval, f.tickMarksInterval]), step: l._get([d.step, f.tickMarksStep]), dashStyle: l._get([d.dashStyle, f.tickMarksDashStyle]), width: l._get([d.lineWidth, 1]), size: l._get([d.size, 4]), offsets: []};
        var e = f.title || {};
        var c = {visible: l._get([e.visible, true]), text: l._get([f.description, e.text]), style: l._get([f.descriptionClass, e["class"], l.toThemeProperty("jqx-chart-axis-description", null)]), halign: l._get([f.horizontalDescriptionAlignment, e.horizontalAlignment, "center"]), valign: l._get([f.verticalDescriptionAlignment, e.verticalAlignment, "center"]), angle: 0, rotationPoint: l._get([e.rotationPoint, "centercenter"]), offset: l._get([e.offset, {x: 0, y: 0}])};
        var i = f.line || {};
        var b = {visible: l._get([i.visible, true]), color: l._get([i.color, n.color, l._defaultLineColor]), dashStyle: l._get([i.dashStyle, n.dashStyle, ""]), width: l._get([i.lineWidth, 1])};
        var j = f.padding || {};
        j = {left: j.left || 0, right: j.right || 0, top: j.top || 0, bottom: j.bottom || 0};
        var g = this._getAxisLabelsSettings(f);
        var m = {visible: this._get([f.visible, f.showValueAxis, f.showXAxis, f.showCategoryAxis, true]), customDraw: this._get([f.customDraw, false]), gridLines: n, tickMarks: h, line: b, title: c, labels: g, padding: j, toolTipFormatFunction: this._get([f.toolTipFormatFunction, f.formatFunction, g.formatFunction]), toolTipFormatSettings: this._get([f.toolTipFormatSettings, f.formatSettings, g.formatSettings])};
        return m
    }, _getAxisLabelsSettings: function (d) {
        var b = this;
        var e = d.labels || {};
        var c = {visible: b._get([d.showLabels, e.visible, true]), unitInterval: b._get([e.unitInterval, e.interval, d.labelsInterval]), step: b._get([e.step, d.labelsStep]), angle: b._get([d.textRotationAngle, e.angle, 0]), style: b._get([d["class"], e["class"], b.toThemeProperty("jqx-chart-axis-text", null)]), halign: b._get([d.horizontalTextAlignment, e.horizontalAlignment, "center"]), valign: b._get([d.verticalTextAlignment, e.verticalAlignment, "center"]), textRotationPoint: b._get([d.textRotationPoint, e.rotationPoint, "auto"]), textOffset: b._get([d.textOffset, e.offset, {x: 0, y: 0}]), autoRotate: b._get([d.labelsAutoRotate, e.autoRotate, false]), formatSettings: b._get([d.formatSettings, e.formatSettings, undefined]), formatFunction: b._get([d.formatFunction, e.formatFunction, undefined])};
        return c
    }, _getLabelsSettings: function (p, l, h, t) {
        var j = this.seriesGroups[p];
        var r = j.series[l];
        var m = isNaN(h) ? undefined : this._getDataValue(h, r.dataField, p);
        var k = t || ["Visible", "Offset", "Angle", "HorizontalAlignment", "VerticalAlignment", "Class", "BackgroundColor", "BorderColor", "BorderOpacity", "Padding", "Opacity", "BackgroundOpacity", "LinesAngles", "LinesEnabled", "AutoRotate", "Radius"];
        var q = {};
        for (var f = 0; f < k.length; f++) {
            var n = k[f];
            var c = "labels" + n;
            var b = "label" + n;
            var o = n.substring(0, 1).toLowerCase() + n.substring(1);
            var d = undefined;
            if (j.labels && typeof(j.labels) == "object") {
                d = j.labels[o]
            }
            if (r.labels && typeof(r.labels) == "object" && undefined != r.labels[o]) {
                d = r.labels[o]
            }
            d = this._get([r[c], r[b], d, j[c], j[b]]);
            if (a.isFunction(d)) {
                q[o] = d(m, h, r, j)
            } else {
                q[o] = d
            }
        }
        q["class"] = q["class"] || this.toThemeProperty("jqx-chart-label-text", null);
        q.visible = this._get([q.visible, r.showLabels, j.showLabels, r.labels != undefined ? true : undefined, j.labels != undefined ? true : undefined]);
        var e = q.padding || 1;
        q.padding = {left: this._get([e.left, isNaN(e) ? 1 : e]), right: this._get([e.right, isNaN(e) ? 1 : e]), top: this._get([e.top, isNaN(e) ? 1 : e]), bottom: this._get([e.bottom, isNaN(e) ? 1 : e])};
        return q
    }, _showLabel: function (I, D, f, b, t, i, e, k, c, E) {
        var m = this.seriesGroups[I];
        var r = m.series[D];
        var B = {width: 0, height: 0}, q;
        if (isNaN(f)) {
            return
        }
        var H = this._getLabelsSettings(I, D, f);
        if (!H.visible) {
            return e ? B : undefined
        }
        if (b.width < 0 || b.height < 0) {
            return e ? B : undefined
        }
        var g = H.angle;
        if (!isNaN(E)) {
            g = E
        }
        var j = H.offset || {};
        var F = {x: j.x, y: j.y};
        if (isNaN(F.x)) {
            F.x = 0
        }
        if (isNaN(F.y)) {
            F.y = 0
        }
        t = t || H.horizontalAlignment || "center";
        i = i || H.verticalAlignment || "center";
        var v = this._getFormattedValue(I, D, f, undefined, undefined, true);
        var s = b.width;
        var G = b.height;
        if (k == true && t != "center") {
            t = t == "right" ? "left" : "right"
        }
        if (c == true && i != "center" && i != "middle") {
            i = i == "top" ? "bottom" : "top";
            F.y *= -1
        }
        B = this.renderer.measureText(v, g, {"class": H["class"]});
        if (e) {
            return B
        }
        var p = 0, n = 0;
        if (s > 0) {
            if (t == "" || t == "center") {
                p += (s - B.width) / 2
            } else {
                if (t == "right") {
                    p += (s - B.width)
                }
            }
        }
        if (G > 0) {
            if (i == "" || i == "center") {
                n += (G - B.height) / 2
            } else {
                if (i == "bottom") {
                    n += (G - B.height)
                }
            }
        }
        p += b.x + F.x;
        n += b.y + F.y;
        var o = this._plotRect;
        if (p <= o.x) {
            p = o.x + 2
        }
        if (n <= o.y) {
            n = o.y + 2
        }
        var l = {width: Math.max(B.width, 1), height: Math.max(B.height, 1)};
        if (n + l.height >= o.y + o.height) {
            n = o.y + o.height - (q ? (l.height + q.height) / 2 : l.height) - 2
        }
        if (p + l.width >= o.x + o.width) {
            p = o.x + o.width - l.width - 2
        }
        var d;
        var A = H.backgroundColor;
        var C = H.borderColor;
        if (A || C) {
            d = this.renderer.beginGroup();
            var z = H.padding;
            var b = this.renderer.rect(p - z.left, n - z.top, B.width + z.left + z.right, B.height + z.bottom + z.bottom, {fill: A || "transparent", "fill-opacity": H.backgroundOpacity || 1, stroke: C || "transparent", "stroke-opacity": H.borderOpacity, "stroke-width": 1})
        }
        var u = this.renderer.text(v, p, n, B.width, B.height, g, {"class": H["class"], opacity: H.opacity || 1}, false, "center", "center");
        if (this._isVML) {
            this.renderer.removeElement(u);
            this.renderer.getContainer()[0].appendChild(u)
        }
        if (d) {
            this.renderer.endGroup()
        }
        return d || u
    }, _getAnimProps: function (j, f) {
        var e = this.seriesGroups[j];
        var c = !isNaN(f) ? e.series[f] : undefined;
        var b = this.enableAnimations == true;
        if (e.enableAnimations) {
            b = e.enableAnimations == true
        }
        if (c && c.enableAnimations) {
            b = c.enableAnimations == true
        }
        var i = this.animationDuration;
        if (isNaN(i)) {
            i = 1000
        }
        var d = e.animationDuration;
        if (!isNaN(d)) {
            i = d
        }
        if (c) {
            var h = c.animationDuration;
            if (!isNaN(h)) {
                i = h
            }
        }
        if (i > 5000) {
            i = 1000
        }
        return{enabled: b, duration: i}
    }, _isColorTransition: function (f, d, e, g) {
        if (g - 1 < e.xoffsets.first) {
            return false
        }
        var b = this._getColors(f, d, g, this._getGroupGradientType(f));
        var c = this._getColors(f, d, g - 1, this._getGroupGradientType(f));
        return(b.fillColor != c.fillColor)
    }, _renderLineSeries: function (k, Q) {
        var H = this.seriesGroups[k];
        if (!H.series || H.series.length == 0) {
            return
        }
        var s = H.type.indexOf("area") != -1;
        var K = H.type.indexOf("stacked") != -1;
        var e = K && H.type.indexOf("100") != -1;
        var ae = H.type.indexOf("spline") != -1;
        var t = H.type.indexOf("step") != -1;
        var O = H.type.indexOf("range") != -1;
        var af = H.polar == true || H.spider == true;
        if (af) {
            t = false
        }
        if (t && ae) {
            return
        }
        var A = this._getDataLen(k);
        var ac = Q.width / A;
        var aj = H.orientation == "horizontal";
        var C = this._getXAxis(k).flip == true;
        var z = Q;
        if (aj) {
            z = {x: Q.y, y: Q.x, width: Q.height, height: Q.width}
        }
        var D = this._calcGroupOffsets(k, z);
        if (!D || D.xoffsets.length == 0) {
            return
        }
        if (!this._linesRenderInfo) {
            this._linesRenderInfo = {}
        }
        this._linesRenderInfo[k] = {};
        for (var n = H.series.length - 1; n >= 0; n--) {
            var g = this._getSerieSettings(k, n);
            var ah = {groupIndex: k, serieIndex: n, swapXY: aj, isArea: s, isSpline: ae, isRange: O, isPolar: af, settings: g, segments: [], pointsLength: 0};
            var j = this._isSerieVisible(k, n);
            if (!j) {
                this._linesRenderInfo[k][n] = ah;
                continue
            }
            var J = H.series[n];
            if (J.customDraw) {
                continue
            }
            var w = a.isFunction(J.colorFunction);
            var U = D.xoffsets.first;
            var G = U;
            var N = this._getColors(k, n, NaN, this._getGroupGradientType(k));
            var ab = false;
            var u;
            do {
                var W = [];
                var T = [];
                var r = [];
                var P = -1;
                var p = 0, o = 0;
                var R = NaN;
                var E = NaN;
                var ai = NaN;
                if (D.xoffsets.length < 1) {
                    continue
                }
                var S = this._getAnimProps(k, n);
                var L = S.enabled && !this._isToggleRefresh && D.xoffsets.length < 10000 && this._isVML != true ? S.duration : 0;
                var v = U;
                u = false;
                var d = this._getColors(k, n, U, this._getGroupGradientType(k));
                for (var ad = U; ad <= D.xoffsets.last; ad++) {
                    U = ad;
                    var X = D.xoffsets.data[ad];
                    var V = D.xoffsets.xvalues[ad];
                    if (isNaN(X)) {
                        continue
                    }
                    X = Math.max(X, 1);
                    p = X;
                    o = D.offsets[n][ad].to;
                    var aa = D.offsets[n][ad].from;
                    if (isNaN(o) || isNaN(aa)) {
                        if (J.emptyPointsDisplay == "connect") {
                            continue
                        } else {
                            if (J.emptyPointsDisplay == "zero") {
                                if (isNaN(o)) {
                                    o = D.baseOffset
                                }
                                if (isNaN(aa)) {
                                    aa = D.baseOffset
                                }
                            } else {
                                u = true;
                                break
                            }
                        }
                    }
                    if (w && this._isColorTransition(k, n, D, U)) {
                        if (W.length > 1) {
                            U--;
                            break
                        }
                    }
                    var c = this._elementRenderInfo;
                    if (c && c.length > k && c[k].series.length > n) {
                        var f = c[k].series[n][V];
                        var ai = a.jqx._ptrnd(f ? f.to : undefined);
                        var I = a.jqx._ptrnd(z.x + (f ? f.xoffset : undefined));
                        r.push(aj ? {y: I, x: ai, index: ad} : {x: I, y: ai, index: ad})
                    }
                    G = ad;
                    if (g.stroke < 2) {
                        if (o - z.y <= 1) {
                            o = z.y + 1
                        }
                        if (aa - z.y <= 1) {
                            aa = z.y + 1
                        }
                        if (z.y + z.height - o <= 1) {
                            o = z.y + z.height - 1
                        }
                        if (z.y + z.height - o <= 1) {
                            aa = z.y + z.height - 1
                        }
                    }
                    if (!s && e) {
                        if (o <= z.y) {
                            o = z.y + 1
                        }
                        if (o >= z.y + z.height) {
                            o = z.y + z.height - 1
                        }
                        if (aa <= z.y) {
                            aa = z.y + 1
                        }
                        if (aa >= z.y + z.height) {
                            aa = z.y + z.height - 1
                        }
                    }
                    X = Math.max(X, 1);
                    p = X + z.x;
                    if (H.skipOverlappingPoints == true && !isNaN(R) && Math.abs(R - p) <= 1) {
                        continue
                    }
                    if (t && !isNaN(R) && !isNaN(E)) {
                        if (E != o) {
                            W.push(aj ? {y: p, x: a.jqx._ptrnd(E)} : {x: p, y: a.jqx._ptrnd(E)})
                        }
                    }
                    W.push(aj ? {y: p, x: a.jqx._ptrnd(o), index: ad} : {x: p, y: a.jqx._ptrnd(o), index: ad});
                    T.push(aj ? {y: p, x: a.jqx._ptrnd(aa), index: ad} : {x: p, y: a.jqx._ptrnd(aa), index: ad});
                    R = p;
                    E = o;
                    if (isNaN(ai)) {
                        ai = o
                    }
                }
                if (W.length == 0) {
                    U++;
                    continue
                }
                var F = W[W.length - 1].index;
                if (w) {
                    N = this._getColors(k, n, F, this._getGroupGradientType(k))
                }
                var l = z.x + D.xoffsets.data[v];
                var Z = z.x + D.xoffsets.data[G];
                if (s && H.alignEndPointsWithIntervals == true) {
                    var B = C ? -1 : 1;
                    if (l > z.x) {
                        l = z.x
                    }
                    if (Z < z.x + z.width) {
                        Z = z.x + z.width
                    }
                    if (C) {
                        var Y = l;
                        l = Z;
                        Z = Y
                    }
                }
                Z = a.jqx._ptrnd(Z);
                l = a.jqx._ptrnd(l);
                var m = D.baseOffset;
                ai = a.jqx._ptrnd(ai);
                var h = a.jqx._ptrnd(o) || m;
                if (O) {
                    W = W.concat(T.reverse())
                }
                ah.pointsLength += W.length;
                var b = {lastItemIndex: F, colorSettings: N, pointsArray: W, pointsStart: r, left: l, right: Z, pyStart: ai, pyEnd: h, yBase: m, labelElements: [], symbolElements: []};
                ah.segments.push(b)
            } while (U < D.xoffsets.length - 1 || u);
            this._linesRenderInfo[k][n] = ah
        }
        var M = this._linesRenderInfo[k];
        var ag = [];
        for (var ad in M) {
            ag.push(M[ad])
        }
        ag = ag.sort(function (ak, i) {
            return ak.serieIndex - i.serieIndex
        });
        if (s && K) {
            ag.reverse()
        }
        for (var ad = 0; ad < ag.length; ad++) {
            var ah = ag[ad];
            this._animateLine(ah, L == 0 ? 1 : 0);
            var q = this;
            this._enqueueAnimation("series", undefined, undefined, L, function (ak, i, al) {
                q._animateLine(i, al)
            }, ah)
        }
    }, _animateLine: function (v, b) {
        var B = v.settings;
        var f = v.groupIndex;
        var g = v.serieIndex;
        var j = this.seriesGroups[f];
        var r = j.series[g];
        var u = this._getSymbol(f, g);
        var o = this._getLabelsSettings(f, g, NaN, ["Visible"]).visible;
        var p = 0;
        for (var d = 0; d < v.segments.length; d++) {
            var t = v.segments[d];
            var w = this._calculateLine(f, v.pointsLength, p, t.pointsArray, t.pointsStart, t.yBase, b, v.isArea, v.swapXY);
            p += t.pointsArray.length;
            if (w == "") {
                continue
            }
            var q = w.split(" ");
            var z = q.length;
            var h = w;
            if (h != "") {
                h = this._buildLineCmd(w, v.isRange, t.left, t.right, t.pyStart, t.pyEnd, t.yBase, v.isArea, v.isPolar, v.isSpline, v.swapXY)
            } else {
                h = "M 0 0"
            }
            var l = t.colorSettings;
            if (!t.pathElement) {
                t.pathElement = this.renderer.path(h, {"stroke-width": B.stroke, stroke: l.lineColor, "stroke-opacity": B.opacity, "fill-opacity": B.opacity, "stroke-dasharray": B.dashStyle, fill: v.isArea ? l.fillColor : "none"});
                this._installHandlers(t.pathElement, "path", f, g, t.lastItemIndex)
            } else {
                this.renderer.attr(t.pathElement, {d: h})
            }
            if (t.labelElements) {
                for (var A = 0; A < t.labelElements.length; A++) {
                    this.renderer.removeElement(t.labelElements[A])
                }
                t.labelElements = []
            }
            if (t.symbolElements) {
                for (var A = 0; A < t.symbolElements.length; A++) {
                    this.renderer.removeElement(t.symbolElements[A])
                }
                t.symbolElements = []
            }
            if (t.pointsArray.length == q.length) {
                if (u != "none" || o) {
                    var C = r.symbolSize;
                    for (var A = 0; A < q.length; A++) {
                        var s = q[A].split(",");
                        s = {x: parseFloat(s[0]), y: parseFloat(s[1])};
                        if (u != "none") {
                            var n = this._getColors(f, g, t.pointsArray[A].index, this._getGroupGradientType(f));
                            var e = this._drawSymbol(u, s.x, s.y, n.fillColorSymbol, B.opacity, n.lineColorSymbol, B.opacity, 1, undefined, C);
                            t.symbolElements.push(e)
                        }
                        if (o) {
                            var k = (A > 0 ? q[A - 1] : q[A]).split(",");
                            k = {x: parseFloat(k[0]), y: parseFloat(k[1])};
                            var m = (A < q.length - 1 ? q[A + 1] : q[A]).split(",");
                            m = {x: parseFloat(m[0]), y: parseFloat(m[1])};
                            s = this._adjustLineLabelPosition(f, g, t.pointsArray[A].index, s, k, m);
                            if (s) {
                                var c = this._showLabel(f, g, t.pointsArray[A].index, {x: s.x, y: s.y, width: 0, height: 0});
                                t.labelElements.push(c)
                            }
                        }
                    }
                }
            }
            if (b == 1 && u != "none") {
                for (var A = 0; A < t.symbolElements.length; A++) {
                    if (isNaN(t.pointsArray[A].index)) {
                        continue
                    }
                    this._installHandlers(t.symbolElements[A], "symbol", f, g, t.pointsArray[A].index)
                }
            }
        }
    }, _adjustLineLabelPosition: function (i, g, d, h, f, e) {
        var b = this._showLabel(i, g, d, {width: 0, height: 0}, "", "", true);
        if (!b) {
            return
        }
        var c = {x: h.x - b.width / 2, y: 0};
        c.y = h.y - 1.5 * b.height;
        return c
    }, _calculateLine: function (h, v, p, o, n, f, e, z, c) {
        var w = this.seriesGroups[h];
        var m;
        if (w.polar == true || w.spider == true) {
            m = this._getPolarAxisCoords(h, this._plotRect)
        }
        var s = "";
        var t = o.length;
        if (!z && n.length == 0) {
            var r = v * e;
            t = r - p
        }
        var j = NaN;
        for (var u = 0; u < t + 1 && u < o.length; u++) {
            if (u > 0) {
                s += " "
            }
            var k = o[u].y;
            var l = o[u].x;
            var b = !z ? k : f;
            var d = l;
            if (n && n.length > u) {
                b = n[u].y;
                d = n[u].x;
                if (isNaN(b) || isNaN(d)) {
                    b = k;
                    d = l
                }
            }
            j = d;
            if (t <= o.length && u > 0 && u == t) {
                d = o[u - 1].x;
                b = o[u - 1].y
            }
            if (c) {
                l = a.jqx._ptrnd((l - b) * (z ? e : 1) + b);
                k = a.jqx._ptrnd(k)
            } else {
                l = a.jqx._ptrnd((l - d) * e + d);
                k = a.jqx._ptrnd((k - b) * e + b)
            }
            if (m) {
                var q = this._toPolarCoord(m, this._plotRect, l, k);
                l = q.x;
                k = q.y
            }
            s += l + "," + k
        }
        return s
    }, _buildLineCmd: function (k, i, f, p, n, b, q, m, r, d, j) {
        var e = k;
        var c = j ? q + "," + f : f + "," + q;
        var h = j ? q + "," + p : p + "," + q;
        if (m && !r && !i) {
            e = c + " " + k + " " + h
        }
        if (d) {
            e = this._getBezierPoints(e)
        }
        var l = e.split(" ");
        if (l.length == 0) {
            return""
        }
        if (l.length == 1) {
            var o = l[0].split(",");
            return"M " + l[0] + " L" + (parseFloat(o[0]) + 1) + "," + (parseFloat(o[1]) + 1)
        }
        var g = l[0].replace("M", "");
        if (m && !r) {
            if (!i) {
                e = "M " + c + " L " + g + " " + e
            } else {
                e = "M " + g + " L " + g + (d ? "" : (" L " + g + " ")) + e
            }
        } else {
            if (!d) {
                e = "M " + g + " L " + g + " " + e
            }
        }
        if (r || i) {
            e += " Z"
        }
        return e
    }, _getSerieSettings: function (h, b) {
        var g = this.seriesGroups[h];
        var f = g.type.indexOf("area") != -1;
        var e = g.type.indexOf("line") != -1;
        var c = g.series[b];
        var j = c.dashStyle || g.dashStyle || "";
        var d = c.opacity || g.opacity;
        if (isNaN(d) || d < 0 || d > 1) {
            d = 1
        }
        var i = c.lineWidth;
        if (isNaN(i) && i != "auto") {
            i = g.lineWidth
        }
        if (i == "auto" || isNaN(i) || i < 0 || i > 15) {
            if (f) {
                i = 2
            } else {
                if (e) {
                    i = 3
                } else {
                    i = 1
                }
            }
        }
        return{stroke: i, opacity: d, dashStyle: j}
    }, _getColors: function (u, p, d, e, b) {
        var k = this.seriesGroups[u];
        var o = k.series[p];
        var c = this._get([o.useGradientColors, k.useGradientColors, k.useGradient, true]);
        var l = this._getSeriesColors(u, p, d);
        if (!l.fillColor) {
            l.fillColor = r;
            l.fillColorSelected = a.jqx.adjustColor(r, 1.1);
            l.fillColorAlt = a.jqx.adjustColor(r, 4);
            l.fillColorAltSelected = a.jqx.adjustColor(r, 3);
            l.lineColor = l.symbolColor = a.jqx.adjustColor(r, 0.9);
            l.lineColorSelected = l.symbolColorSelected = a.jqx.adjustColor(r, 0.9)
        }
        var h = [
            [0, 1.4],
            [100, 1]
        ];
        var f = [
            [0, 1],
            [25, 1.1],
            [50, 1.4],
            [100, 1]
        ];
        var n = [
            [0, 1.3],
            [90, 1.2],
            [100, 1]
        ];
        var j = NaN;
        if (!isNaN(b)) {
            j = b == 2 ? h : f
        }
        if (c) {
            var q = {};
            for (var s in l) {
                q[s] = l[s]
            }
            l = q;
            if (e == "verticalLinearGradient" || e == "horizontalLinearGradient") {
                var g = e == "verticalLinearGradient" ? j || h : j || f;
                var m = ["fillColor", "fillColorSelected", "fillColorAlt", "fillColorAltSelected"];
                for (var v in m) {
                    var r = l[m[v]];
                    if (r) {
                        l[m[v]] = this.renderer._toLinearGradient(r, e == "verticalLinearGradient", g)
                    }
                }
            } else {
                if (e == "radialGradient") {
                    var t;
                    var j = h;
                    if ((k.type == "pie" || k.type == "donut" || k.polar) && d != undefined && this._renderData[u] && this._renderData[u].offsets[p]) {
                        t = this._renderData[u].offsets[p][d];
                        j = n
                    }
                    l.fillColor = this.renderer._toRadialGradient(l.fillColor, j, t);
                    l.fillColorSelected = this.renderer._toRadialGradient(l.fillColorSelected, j, t)
                }
            }
        }
        return l
    }, _installHandlers: function (c, f, i, h, d) {
        if (!this.enableEvents) {
            return false
        }
        var j = this;
        var e = this.seriesGroups[i];
        var k = this.seriesGroups[i].series[h];
        var b = e.type.indexOf("line") != -1 || e.type.indexOf("area") != -1;
        if (!b) {
            this.renderer.addHandler(c, "mousemove", function (m) {
                var l = j._selected;
                if (l && l.isLineType && l.linesUnselectMode == "click" && !(l.group == i && l.series == h)) {
                    return
                }
                var g = m.pageX || m.clientX || m.screenX;
                var o = m.pageY || m.clientY || m.screenY;
                var n = j.host.offset();
                g -= n.left;
                o -= n.top;
                if (j._mouseX == g && j._mouseY == o) {
                    return
                }
                if (j._ttEl) {
                    if (j._ttEl.gidx == i && j._ttEl.sidx == h && j._ttEl.iidx == d) {
                        return
                    }
                }
                j._startTooltipTimer(i, h, d)
            });
            this.renderer.addHandler(c, "mouseout", function (l) {
                if (!isNaN(j._lastClickTs) && (new Date()).valueOf() - j._lastClickTs < 100) {
                    return
                }
                if (d != undefined) {
                    j._cancelTooltipTimer()
                }
                if (b) {
                    return
                }
                var g = j._selected;
                if (g && g.isLineType && g.linesUnselectMode == "click" && !(g.group == i && g.series == h)) {
                    return
                }
                j._unselect()
            })
        }
        this.renderer.addHandler(c, "mouseover", function (l) {
            var g = j._selected;
            if (g && g.isLineType && g.linesUnselectMode == "click" && !(g.group == i && g.series == h)) {
                return
            }
            j._select(c, f, i, h, d, d)
        });
        this.renderer.addHandler(c, "click", function (g) {
            clearTimeout(j._hostClickTimer);
            j._lastClickTs = (new Date()).valueOf();
            if (b && (f != "symbol" && f != "pointMarker")) {
                return
            }
            if (j._isColumnType(e.type)) {
                j._unselect()
            }
            if (isNaN(d)) {
                return
            }
            j._raiseItemEvent("click", e, k, d)
        })
    }, _getHorizontalOffset: function (A, s, k, j) {
        var c = this._plotRect;
        var h = this._getDataLen(A);
        if (h == 0) {
            return{index: undefined, value: k}
        }
        var p = this._calcGroupOffsets(A, this._plotRect);
        if (p.xoffsets.length == 0) {
            return{index: undefined, value: undefined}
        }
        var n = k;
        var m = j;
        var w = this.seriesGroups[A];
        var l;
        if (w.polar || w.spider) {
            l = this._getPolarAxisCoords(A, c)
        }
        var e = this._getXAxis(A).flip == true;
        var b, o, v, f;
        for (var t = p.xoffsets.first; t <= p.xoffsets.last; t++) {
            var u = p.xoffsets.data[t];
            var d = p.offsets[s][t].to;
            var q = 0;
            if (l) {
                var r = this._toPolarCoord(l, c, u + c.x, d);
                u = r.x;
                d = r.y;
                q = a.jqx._ptdist(n, m, u, d)
            } else {
                if (w.orientation == "horizontal") {
                    u += c.y;
                    var z = d;
                    d = u;
                    u = z;
                    q = a.jqx._ptdist(n, m, u, d)
                } else {
                    u += c.x;
                    q = Math.abs(n - u)
                }
            }
            if (isNaN(b) || b > q) {
                b = q;
                o = t;
                v = u;
                f = d
            }
        }
        return{index: o, value: p.xoffsets.data[o], polarAxisCoords: l, x: v, y: f}
    }, onmousemove: function (l, k) {
        if (this._mouseX == l && this._mouseY == k) {
            return
        }
        this._mouseX = l;
        this._mouseY = k;
        if (!this._selected) {
            return
        }
        var B = this._selected.group;
        var r = this._selected.series;
        var w = this.seriesGroups[B];
        var o = w.series[r];
        var b = this._plotRect;
        if (this.renderer) {
            b = this.renderer.getRect();
            b.x += 5;
            b.y += 5;
            b.width -= 10;
            b.height -= 10
        }
        if (l < b.x || l > b.x + b.width || k < b.y || k > b.y + b.height) {
            this._hideToolTip();
            this._unselect();
            return
        }
        var e = w.orientation == "horizontal";
        var b = this._plotRect;
        if (w.type.indexOf("line") != -1 || w.type.indexOf("area") != -1) {
            var h = this._getHorizontalOffset(B, this._selected.series, l, k);
            var v = h.index;
            if (v == undefined) {
                return
            }
            if (this._selected.item != v) {
                var q = this._linesRenderInfo[B][r].segments;
                var t = 0;
                while (v > q[t].lastItemIndex) {
                    t++;
                    if (t >= q.length) {
                        return
                    }
                }
                var c = q[t].pathElement;
                var C = q[t].lastItemIndex;
                this._unselect(false);
                this._select(c, "path", B, r, v, C)
            }
            var n = this._getSymbol(this._selected.group, this._selected.series);
            if (n == "none") {
                n = "circle"
            }
            var p = this._calcGroupOffsets(B, b);
            var d = p.offsets[this._selected.series][v].to;
            var u = d;
            if (w.type.indexOf("range") != -1) {
                u = p.offsets[this._selected.series][v].from
            }
            var m = e ? l : k;
            if (!isNaN(u) && Math.abs(m - u) < Math.abs(m - d)) {
                k = u
            } else {
                k = d
            }
            if (isNaN(k)) {
                return
            }
            l = h.value;
            if (e) {
                var z = l;
                l = k;
                k = z + b.y
            } else {
                l += b.x
            }
            if (h.polarAxisCoords) {
                l = h.x;
                k = h.y
            }
            k = a.jqx._ptrnd(k);
            l = a.jqx._ptrnd(l);
            if (this._pointMarker && this._pointMarker.element) {
                this.renderer.removeElement(this._pointMarker.element);
                this._pointMarker.element = undefined
            }
            if (isNaN(l) || isNaN(k)) {
                return
            }
            var j = this._getSeriesColors(B, r, v);
            var f = o.opacity;
            if (isNaN(f) || f < 0 || f > 1) {
                f = w.opacity
            }
            if (isNaN(f) || f < 0 || f > 1) {
                f = 1
            }
            var A = o.symbolSizeSelected;
            if (isNaN(A)) {
                A = o.symbolSize
            }
            if (isNaN(A) || A > 50 || A < 0) {
                A = w.symbolSize
            }
            if (isNaN(A) || A > 50 || A < 0) {
                A = 6
            }
            if (this.showToolTips || this.enableCrosshairs) {
                this._pointMarker = {type: n, x: l, y: k, gidx: B, sidx: r, iidx: v};
                this._pointMarker.element = this._drawSymbol(n, l, k, j.fillColorSymbolSelected, f, j.lineColorSymbolSelected, f, 1, undefined, A);
                this._installHandlers(this._pointMarker.element, "pointMarker", B, r, v)
            }
            this._startTooltipTimer(B, this._selected.series, v)
        }
    }, _drawSymbol: function (i, l, j, c, m, k, f, g, b, o) {
        var e;
        var h = o || 6;
        var d = h / 2;
        switch (i) {
            case"none":
                return undefined;
            case"circle":
                e = this.renderer.circle(l, j, h / 2);
                break;
            case"square":
                h = h - 1;
                d = h / 2;
                e = this.renderer.rect(l - d, j - d, h, h);
                break;
            case"diamond":
                var n = "M " + (l - d) + "," + (j) + " L" + (l) + "," + (j - d) + " L" + (l + d) + "," + (j) + " L" + (l) + "," + (j + d) + " Z";
                e = this.renderer.path(n);
                break;
            case"triangle_up":
            case"triangle":
                var n = "M " + (l - d) + "," + (j + d) + " L " + (l + d) + "," + (j + d) + " L " + (l) + "," + (j - d) + " Z";
                e = this.renderer.path(n);
                break;
            case"triangle_down":
                var n = "M " + (l - d) + "," + (j - d) + " L " + (l) + "," + (j + d) + " L " + (l + d) + "," + (j - d) + " Z";
                e = this.renderer.path(n);
                break;
            case"triangle_left":
                var n = "M " + (l - d) + "," + (j) + " L " + (l + d) + "," + (j + d) + " L " + (l + d) + "," + (j - d) + " Z";
                e = this.renderer.path(n);
                break;
            case"triangle_right":
                var n = "M " + (l - d) + "," + (j - d) + " L " + (l - d) + "," + (j + d) + " L " + (l + d) + "," + (j) + " Z";
                e = this.renderer.path(n);
                break;
            default:
                e = this.renderer.circle(l, j, h)
        }
        this.renderer.attr(e, {fill: c, "fill-opacity": m, stroke: k, "stroke-width": g, "stroke-opacity": f, "stroke-dasharray": b || ""});
        return e
    }, _getSymbol: function (f, b) {
        var c = ["circle", "square", "diamond", "triangle_up", "triangle_down", "triangle_left", "triangle_right"];
        var e = this.seriesGroups[f];
        var d = e.series[b];
        var h;
        if (d.symbolType != undefined) {
            h = d.symbolType
        }
        if (h == undefined) {
            h = e.symbolType
        }
        if (h == "default") {
            return c[b % c.length]
        } else {
            if (h != undefined) {
                return h
            }
        }
        return"none"
    }, _startTooltipTimer: function (k, j, d, i, h, b, f) {
        this._cancelTooltipTimer();
        var l = this;
        var e = l.seriesGroups[k];
        var c = this.toolTipShowDelay || this.toolTipDelay;
        if (isNaN(c) || c > 10000 || c < 0) {
            c = 500
        }
        if (this._ttEl || (true == this.enableCrosshairs && false == this.showToolTips)) {
            c = 0
        }
        if (!isNaN(b)) {
            c = b
        }
        clearTimeout(this._tttimerHide);
        if (isNaN(i)) {
            i = l._mouseX
        }
        if (isNaN(h)) {
            h = l._mouseY - 3
        }
        if (c == 0) {
            l._showToolTip(i, h, k, j, d)
        }
        this._tttimer = setTimeout(function () {
            if (c != 0) {
                l._showToolTip(i, h, k, j, d)
            }
            var g = l.toolTipHideDelay;
            if (!isNaN(f)) {
                g = f
            }
            if (isNaN(g)) {
                g = 4000
            }
            l._tttimerHide = setTimeout(function () {
                l._hideToolTip();
                l._unselect()
            }, g)
        }, c)
    }, _cancelTooltipTimer: function () {
        clearTimeout(this._tttimer)
    }, _getGroupGradientType: function (c) {
        var b = this.seriesGroups[c];
        if (b.type.indexOf("area") != -1) {
            return b.orientation == "horizontal" ? "horizontalLinearGradient" : "verticalLinearGradient"
        } else {
            if (this._isColumnType(b.type) || b.type.indexOf("candle") != -1) {
                if (b.polar) {
                    return"radialGradient"
                }
                return b.orientation == "horizontal" ? "verticalLinearGradient" : "horizontalLinearGradient"
            } else {
                if (b.type.indexOf("scatter") != -1 || b.type.indexOf("bubble") != -1 || this._isPieGroup(c)) {
                    return"radialGradient"
                }
            }
        }
        return undefined
    }, _select: function (h, l, o, n, i, m) {
        if (this._selected) {
            if ((this._selected.item != i || this._selected.series != n || this._selected.group != o)) {
                this._unselect()
            } else {
                return
            }
        }
        var k = this.seriesGroups[o];
        var p = k.series[n];
        if (k.enableSelection == false || p.enableSelection == false) {
            return
        }
        var f = k.type.indexOf("line") != -1 && k.type.indexOf("area") == -1;
        this._selected = {element: h, type: l, group: o, series: n, item: i, iidxBase: m, isLineType: f, linesUnselectMode: p.linesUnselectMode || k.linesUnselectMode};
        var b = this._getColors(o, n, m || i, this._getGroupGradientType(o));
        var c = b.fillColorSelected;
        if (f) {
            c = "none"
        }
        var e = this._getSerieSettings(o, n);
        var d = (l == "symbol") ? b.lineColorSymbolSelected : b.lineColorSelected;
        c = (l == "symbol") ? b.fillColorSymbolSelected : c;
        var j = (l == "symbol") ? 1 : e.stroke;
        if (this.renderer.getAttr(h, "fill") == b.fillColorAlt) {
            c = b.fillColorAltSelected
        }
        this.renderer.attr(h, {stroke: d, fill: c, "stroke-width": j});
        this._raiseItemEvent("mouseover", k, p, i)
    }, _unselect: function () {
        var o = this;
        if (o._selected) {
            var n = o._selected.group;
            var m = o._selected.series;
            var f = o._selected.item;
            var k = o._selected.iidxBase;
            var j = o._selected.type;
            var i = o.seriesGroups[n];
            var p = i.series[m];
            var e = i.type.indexOf("line") != -1 && i.type.indexOf("area") == -1;
            var b = o._getColors(n, m, k || f, o._getGroupGradientType(n));
            var c = b.fillColor;
            if (e) {
                c = "none"
            }
            var d = o._getSerieSettings(n, m);
            var l = (j == "symbol") ? b.lineColorSymbol : b.lineColor;
            c = (j == "symbol") ? b.fillColorSymbol : c;
            if (this.renderer.getAttr(o._selected.element, "fill") == b.fillColorAltSelected) {
                c = b.fillColorAlt
            }
            var h = (j == "symbol") ? 1 : d.stroke;
            o.renderer.attr(o._selected.element, {stroke: l, fill: c, "stroke-width": h});
            o._selected = undefined;
            if (!isNaN(f)) {
                o._raiseItemEvent("mouseout", i, p, f)
            }
        }
        if (o._pointMarker) {
            if (o._pointMarker.element) {
                o.renderer.removeElement(o._pointMarker.element);
                o._pointMarker.element = undefined
            }
            o._pointMarker = undefined;
            o._hideCrosshairs()
        }
    }, _raiseItemEvent: function (f, g, e, c) {
        var d = e[f] || g[f];
        var h = 0;
        for (; h < this.seriesGroups.length; h++) {
            if (this.seriesGroups[h] == g) {
                break
            }
        }
        if (h == this.seriesGroups.length) {
            return
        }
        var b = {event: f, seriesGroup: g, serie: e, elementIndex: c, elementValue: this._getDataValue(c, e.dataField, h)};
        if (d && a.isFunction(d)) {
            d(b)
        }
        this._raiseEvent(f, b)
    }, _raiseEvent: function (d, c) {
        var e = new a.Event(d);
        e.owner = this;
        c.event = d;
        e.args = c;
        var b = this.host.trigger(e);
        return b
    }, _calcInterval: function (d, j, h) {
        var m = Math.abs(j - d);
        var k = m / h;
        var f = [1, 2, 3, 4, 5, 10, 15, 20, 25, 50, 100];
        var b = [0.5, 0.25, 0.125, 0.1];
        var c = 0.1;
        var g = f;
        if (k < 1) {
            g = b;
            c = 10
        }
        var l = 0;
        do {
            l = 0;
            if (k >= 1) {
                c *= 10
            } else {
                c /= 10
            }
            for (var e = 1; e < g.length; e++) {
                if (Math.abs(g[l] * c - k) > Math.abs(g[e] * c - k)) {
                    l = e
                } else {
                    break
                }
            }
        } while (l == g.length - 1);
        return g[l] * c
    }, _renderDataClone: function () {
        if (!this._renderData || this._isToggleRefresh) {
            return
        }
        var d = this._elementRenderInfo = [];
        if (this._isSelectorRefresh) {
            return
        }
        for (var h = 0; h < this._renderData.length; h++) {
            var c = this._getXAxis(h).dataField;
            while (d.length <= h) {
                d.push({})
            }
            var b = d[h];
            var f = this._renderData[h];
            if (!f.offsets) {
                continue
            }
            if (f.valueAxis) {
                b.valueAxis = {itemOffsets: {}};
                for (var j in f.valueAxis.itemOffsets) {
                    b.valueAxis.itemOffsets[j] = f.valueAxis.itemOffsets[j]
                }
            }
            if (f.xAxis) {
                b.xAxis = {itemOffsets: {}};
                for (var j in f.xAxis.itemOffsets) {
                    b.xAxis.itemOffsets[j] = f.xAxis.itemOffsets[j]
                }
            }
            b.series = [];
            var g = b.series;
            var l = this._isPieGroup(h);
            for (var m = 0; m < f.offsets.length; m++) {
                g.push({});
                for (var e = 0; e < f.offsets[m].length; e++) {
                    if (!l) {
                        g[m][f.xoffsets.xvalues[e]] = {value: f.offsets[m][e].value, valueRadius: f.offsets[m][e].valueRadius, xoffset: f.xoffsets.data[e], from: f.offsets[m][e].from, to: f.offsets[m][e].to}
                    } else {
                        var k = f.offsets[m][e];
                        g[m][k.displayValue] = {value: k.value, x: k.x, y: k.y, fromAngle: k.fromAngle, toAngle: k.toAngle}
                    }
                }
            }
        }
    }, getPolarDataPointOffset: function (d, c, f) {
        var e = this._renderData[f];
        if (!e) {
            return{x: NaN, y: NaN}
        }
        var h = this.getValueAxisDataPointOffset(c, f);
        var b = this.getXAxisDataPointOffset(d, f);
        var g = this._toPolarCoord(e.polarCoords, e.xAxis.rect, b, h);
        return{x: g.x, y: g.y}
    }, _getDataPointOffsetDiff: function (j, i, b, f, g, d, h) {
        var e = this._getDataPointOffset(j, b, f, g, d, h);
        var c = this._getDataPointOffset(i, b, f, g, d, h);
        return Math.abs(e - c)
    }, _getXAxisRenderData: function (d) {
        if (d >= this._renderData.length) {
            return
        }
        var e = this.seriesGroups[d];
        var c = this._renderData[d].xAxis;
        if (!c) {
            return
        }
        if (e.xAxis == undefined) {
            for (var b = 0; b <= d; b++) {
                if (this.seriesGroups[b].xAxis == undefined) {
                    break
                }
            }
            c = this._renderData[b].xAxis
        }
        return c
    }, getXAxisDataPointOffset: function (j, l) {
        var k = this.seriesGroups[l];
        if (isNaN(j)) {
            return NaN
        }
        renderData = this._getXAxisRenderData(l);
        if (!renderData) {
            return NaN
        }
        var f = renderData.data.axisStats;
        var i = f.min.valueOf();
        var b = f.max.valueOf();
        var g = b - i;
        if (g == 0) {
            g = 1
        }
        if (j.valueOf() > b || j.valueOf() < i) {
            return NaN
        }
        var c = this._getXAxis(l);
        var d = k.orientation == "horizontal" ? "height" : "width";
        var n = k.orientation == "horizontal" ? "y" : "x";
        var h = (j.valueOf() - i) / g;
        var m = renderData.rect[d] - renderData.data.padding.left - renderData.data.padding.right;
        if (k.polar || k.spider) {
            var e = this._renderData[l].polarCoords;
            if (e.isClosedCircle) {
                m = renderData.data.axisSize
            }
        }
        return this._plotRect[n] + renderData.data.padding.left + m * (c.flip ? (1 - h) : h)
    }, getValueAxisDataPointOffset: function (g, h) {
        var j = this._getValueAxis(h);
        if (!j) {
            return NaN
        }
        var i = this._renderData[h];
        if (!i) {
            return NaN
        }
        var f = j.flip == true;
        var d = i.logBase;
        var e = i.scale;
        var b = i.gbase;
        var c = i.baseOffset;
        return this._getDataPointOffset(g, b, d, e, c, f)
    }, _getDataPointOffset: function (f, c, d, h, e, b) {
        var g;
        if (isNaN(f)) {
            f = c
        }
        if (!isNaN(d)) {
            g = (a.jqx.log(f, d) - a.jqx.log(c, d)) * h
        } else {
            g = (f - c) * h
        }
        if (this._isVML) {
            g = Math.round(g)
        }
        if (b) {
            g = e + g
        } else {
            g = e - g
        }
        return g
    }, _calcGroupOffsets: function (l, L) {
        var z = this.seriesGroups[l];
        while (this._renderData.length < l + 1) {
            this._renderData.push({})
        }
        if (this._renderData[l] != null && this._renderData[l].offsets != undefined) {
            return this._renderData[l]
        }
        if (this._isPieGroup(l)) {
            return this._calcPieSeriesGroupOffsets(l, L)
        }
        var o = this._getValueAxis(l);
        if (!o || !z.series || z.series.length == 0) {
            return this._renderData[l]
        }
        var A = o.flip == true;
        var O = o.logarithmicScale == true;
        var N = o.logarithmicScaleBase || 10;
        var T = [];
        var F = z.type.indexOf("stacked") != -1;
        var d = F && z.type.indexOf("100") != -1;
        var K = z.type.indexOf("range") != -1;
        var U = this._isColumnType(z.type);
        var Z = z.type.indexOf("waterfall") != -1;
        var s = this._getDataLen(l);
        var r = z.baselineValue || o.baselineValue || 0;
        if (d) {
            r = 0
        }
        var ag = this._stats.seriesGroups[l];
        if (!ag || !ag.isValid) {
            return
        }
        var aj = ag.hasStackValueReversal;
        if (aj) {
            r = 0
        }
        if (Z && F) {
            if (aj) {
                return
            } else {
                r = ag.base
            }
        }
        if (r > ag.max) {
            r = ag.max
        }
        if (r < ag.min) {
            r = ag.min
        }
        var q = (d || O) ? ag.maxRange : ag.max - ag.min;
        var an = ag.min;
        var C = ag.max;
        var M = L.height / (O ? ag.intervals : q);
        var ai = 0;
        if (d) {
            if (an * C < 0) {
                q /= 2;
                ai = -(q + r) * M
            } else {
                ai = -r * M
            }
        } else {
            ai = -(r - an) * M
        }
        if (A) {
            ai = L.y - ai
        } else {
            ai += L.y + L.height
        }
        var ah = [];
        var ad = [];
        var S = [];
        var al, H;
        if (O) {
            al = a.jqx.log(C, N) - a.jqx.log(r, N);
            if (F) {
                al = ag.intervals;
                r = d ? 0 : an
            }
            H = ag.intervals - al;
            if (!A) {
                ai = L.y + al / ag.intervals * L.height
            }
        }
        ai = a.jqx._ptrnd(ai);
        var c = (an * C < 0) ? L.height / 2 : L.height;
        var m = [];
        var W = [];
        var ao = F && (U || O);
        var am = [];
        for (var ac = 0; ac < s; ac++) {
            if (!Z) {
                W = []
            }
            for (var ab = 0; ab < z.series.length; ab++) {
                if (!F && O) {
                    m = []
                }
                var D = z.series[ab];
                var E = D.dataField;
                var aq = D.dataFieldFrom;
                var P = D.dataFieldTo;
                var Y = D.radiusDataField || D.sizeDataField;
                while (T.length <= ab) {
                    T.push([])
                }
                while (T[ab].length <= ac) {
                    T[ab].push({})
                }
                var g = this._isSerieVisible(l, ab);
                if (z.type.indexOf("candle") != -1 || z.type.indexOf("ohlc") != -1) {
                    var b = ["Open", "Close", "High", "Low"];
                    for (var ak in b) {
                        var p = "dataField" + b[ak];
                        if (D[p]) {
                            T[ab][ac][b[ak]] = this._getDataPointOffset(this._getDataValueAsNumber(ac, D[p], l), r, O ? N : NaN, M, ai, A)
                        }
                    }
                    continue
                }
                while (W.length <= ac) {
                    W.push(0)
                }
                var ap = NaN;
                if (K) {
                    ap = this._getDataValueAsNumber(ac, aq, l);
                    if (isNaN(ap)) {
                        ap = r
                    }
                }
                var J = NaN;
                if (K) {
                    J = this._getDataValueAsNumber(ac, P, l)
                } else {
                    J = this._getDataValueAsNumber(ac, E, l)
                }
                var e = this._getDataValueAsNumber(ac, Y, l);
                if (F) {
                    W[ac] += g ? J : 0
                }
                if (!g) {
                    J = NaN
                }
                if (isNaN(J) || (O && J <= 0)) {
                    T[ab][ac] = {from: undefined, to: undefined};
                    continue
                }
                var I;
                if (F) {
                    if (ao) {
                        I = (J >= r) ? ah : ad
                    } else {
                        J = W[ac]
                    }
                }
                var af = M * (J - r);
                if (K) {
                    af = M * (J - ap)
                }
                if (F && ao) {
                    if (!am[ac]) {
                        am[ac] = true;
                        af = M * (J - r)
                    } else {
                        af = M * J
                    }
                }
                if (O) {
                    while (m.length <= ac) {
                        m.push({p: {value: 0, height: 0}, n: {value: 0, height: 0}})
                    }
                    var B = (K || K) ? ap : r;
                    var aa = J > B ? m[ac].p : m[ac].n;
                    aa.value += J;
                    if (d) {
                        J = aa.value / (ag.psums[ac] + ag.nsums[ac]) * 100;
                        af = (a.jqx.log(J, N) - ag.minPow) * M
                    } else {
                        af = a.jqx.log(aa.value, N) - a.jqx.log(B, N);
                        af *= M
                    }
                    af -= aa.height;
                    aa.height += af
                }
                var R = ai;
                if (K) {
                    var t = 0;
                    if (O) {
                        t = (a.jqx.log(ap, N) - a.jqx.log(r, N)) * M
                    } else {
                        t = (ap - r) * M
                    }
                    R += A ? t : -t
                }
                if (F) {
                    if (d && !O) {
                        var w = (ag.psums[ac] - ag.nsums[ac]);
                        if (J > r) {
                            af = (ag.psums[ac] / w) * c;
                            if (ag.psums[ac] != 0) {
                                af *= J / ag.psums[ac]
                            }
                        } else {
                            af = (ag.nsums[ac] / w) * c;
                            if (ag.nsums[ac] != 0) {
                                af *= J / ag.nsums[ac]
                            }
                        }
                    }
                    if (ao) {
                        if (isNaN(I[ac])) {
                            I[ac] = R
                        }
                        R = I[ac]
                    }
                }
                if (isNaN(S[ac])) {
                    S[ac] = 0
                }
                var ae = S[ac];
                af = Math.abs(af);
                var V = af;
                if (af >= 1) {
                    h_new = this._isVML ? Math.round(af) : a.jqx._ptrnd(af) - 1;
                    if (Math.abs(af - h_new) > 0.5) {
                        af = Math.round(af)
                    } else {
                        af = h_new
                    }
                }
                ae += af - V;
                if (!F) {
                    ae = 0
                }
                if (Math.abs(ae) > 0.5) {
                    if (ae > 0) {
                        af -= 1;
                        ae -= 1
                    } else {
                        af += 1;
                        ae += 1
                    }
                }
                S[ac] = ae;
                if (ab == z.series.length - 1 && d) {
                    var v = 0;
                    for (var X = 0; X < ab; X++) {
                        v += Math.abs(T[X][ac].to - T[X][ac].from)
                    }
                    v += af;
                    if (v < c) {
                        if (af > 0.5) {
                            af = a.jqx._ptrnd(af + c - v)
                        } else {
                            var X = ab - 1;
                            while (X >= 0) {
                                var G = Math.abs(T[X][ac].to - T[X][ac].from);
                                if (G > 1) {
                                    if (T[X][ac].from > T[X][ac].to) {
                                        T[X][ac].from += c - v
                                    }
                                    break
                                }
                                X--
                            }
                        }
                    }
                }
                if (A) {
                    af *= -1
                }
                var Q = J < r;
                if (K) {
                    Q = ap > J
                }
                var n = isNaN(ap) ? J : {from: ap, to: J};
                if (Q) {
                    if (ao) {
                        I[ac] += af
                    }
                    T[ab][ac] = {from: R, to: R + af, value: n, valueRadius: e}
                } else {
                    if (ao) {
                        I[ac] -= af
                    }
                    T[ab][ac] = {from: R, to: R - af, value: n, valueRadius: e}
                }
            }
        }
        var u = this._renderData[l];
        u.baseOffset = ai;
        u.gbase = r;
        u.logBase = O ? N : NaN;
        u.scale = M;
        u.offsets = !Z ? T : this._applyWaterfall(T, s, l, ai, r, O ? N : NaN, M, A, F);
        u.xoffsets = this._calculateXOffsets(l, L.width);
        return this._renderData[l]
    }, _isPercent: function (b) {
        return(typeof(b) === "string" && b.length > 0 && b.indexOf("%") == b.length - 1)
    }, _calcPieSeriesGroupOffsets: function (d, b) {
        var w = this;
        var l = this._getDataLen(d);
        var m = this.seriesGroups[d];
        var z = this._renderData[d] = {};
        var F = z.offsets = [];
        for (var B = 0; B < m.series.length; B++) {
            var r = m.series[B];
            var D = this._get([r.minAngle, r.startAngle]);
            if (isNaN(D) || D < 0 || D > 360) {
                D = 0
            }
            var L = this._get([r.maxAngle, r.endAngle]);
            if (isNaN(L) || L < 0 || L > 360) {
                L = 360
            }
            var e = L - D;
            var n = r.initialAngle || 0;
            if (n < D) {
                n = D
            }
            if (n > L) {
                n = L
            }
            var c = r.centerOffset || 0;
            var J = a.jqx.getNum([r.offsetX, m.offsetX, b.width / 2]);
            var I = a.jqx.getNum([r.offsetY, m.offsetY, b.height / 2]);
            var v = Math.min(b.width, b.height) / 2;
            var u = n;
            var f = r.radius;
            if (w._isPercent(f)) {
                f = parseFloat(f) / 100 * v
            }
            if (isNaN(f)) {
                f = v * 0.4
            }
            var k = r.innerRadius;
            if (w._isPercent(k)) {
                k = parseFloat(k) / 100 * v
            }
            if (isNaN(k) || k >= f) {
                k = 0
            }
            F.push([]);
            var g = 0;
            var h = 0;
            for (var E = 0; E < l; E++) {
                var K = this._getDataValueAsNumber(E, r.dataField, d);
                if (isNaN(K)) {
                    continue
                }
                if (!this._isSerieVisible(d, B, E) && r.hiddenPointsDisplay != true) {
                    continue
                }
                if (K > 0) {
                    g += K
                } else {
                    h += K
                }
            }
            var q = g - h;
            if (q == 0) {
                q = 1
            }
            for (var E = 0; E < l; E++) {
                var K = this._getDataValueAsNumber(E, r.dataField, d);
                if (isNaN(K)) {
                    F[B].push({});
                    continue
                }
                var C = r.displayText || r.displayField;
                var j = this._getDataValue(E, C, d);
                if (j == undefined) {
                    j = E
                }
                var H = 0;
                var A = this._isSerieVisible(d, B, E);
                if (A || r.hiddenPointsDisplay == true) {
                    H = Math.abs(K) / q * e
                }
                var p = b.x + J;
                var o = b.y + I;
                var G = c;
                if (a.isFunction(c)) {
                    G = c({seriesIndex: B, seriesGroupIndex: d, itemIndex: E})
                }
                if (isNaN(G)) {
                    G = 0
                }
                var t = {key: d + "_" + B + "_" + E, value: K, displayValue: j, x: p, y: o, fromAngle: u, toAngle: u + H, centerOffset: G, innerRadius: k, outerRadius: f, visible: A};
                F[B].push(t);
                u += H
            }
        }
        return z
    }, _isPointSeriesOnly: function () {
        for (var b = 0; b < this.seriesGroups.length; b++) {
            var c = this.seriesGroups[b];
            if (c.type.indexOf("line") == -1 && c.type.indexOf("area") == -1 && c.type.indexOf("scatter") == -1 && c.type.indexOf("bubble") == -1) {
                return false
            }
        }
        return true
    }, _hasColumnSeries: function () {
        var d = ["column", "ohlc", "candlestick", "waterfall"];
        for (var c = 0; c < this.seriesGroups.length; c++) {
            var e = this.seriesGroups[c];
            for (var b in d) {
                if (e.type.indexOf(d[b]) != -1) {
                    return true
                }
            }
        }
        return false
    }, _alignValuesWithTicks: function (f) {
        var b = this._isPointSeriesOnly();
        var c = this.seriesGroups[f];
        var e = this._getXAxis(f);
        var d = e.valuesOnTicks == undefined ? b : e.valuesOnTicks != false;
        if (f == undefined) {
            return d
        }
        if (c.valuesOnTicks == undefined) {
            return d
        }
        return c.valuesOnTicks
    }, _getYearsDiff: function (c, b) {
        return b.getFullYear() - c.getFullYear()
    }, _getMonthsDiff: function (c, b) {
        return 12 * (b.getFullYear() - c.getFullYear()) + b.getMonth() - c.getMonth()
    }, _getDateDiff: function (f, e, d, b) {
        var c = 0;
        if (d != "year" && d != "month") {
            c = e.valueOf() - f.valueOf()
        }
        switch (d) {
            case"year":
                c = this._getYearsDiff(f, e);
                break;
            case"month":
                c = this._getMonthsDiff(f, e);
                break;
            case"day":
                c /= (24 * 3600 * 1000);
                break;
            case"hour":
                c /= (3600 * 1000);
                break;
            case"minute":
                c /= (60 * 1000);
                break;
            case"second":
                c /= (1000);
                break;
            case"millisecond":
                break
        }
        if (d != "year" && d != "month" && b != false) {
            c = a.jqx._rnd(c, 1, true)
        }
        return c
    }, _getBestDTUnit: function (k, p, q, d, g) {
        var f = "day";
        var m = p.valueOf() - k.valueOf();
        if (m < 1000) {
            f = "second"
        } else {
            if (m < 3600000) {
                f = "minute"
            } else {
                if (m < 86400000) {
                    f = "hour"
                } else {
                    if (m < 2592000000) {
                        f = "day"
                    } else {
                        if (m < 31104000000) {
                            f = "month"
                        } else {
                            f = "year"
                        }
                    }
                }
            }
        }
        var o = [
            {key: "year", cnt: m / (1000 * 60 * 60 * 24 * 365)},
            {key: "month", cnt: m / (1000 * 60 * 60 * 24 * 30)},
            {key: "day", cnt: m / (1000 * 60 * 60 * 24)},
            {key: "hour", cnt: m / (1000 * 60 * 60)},
            {key: "minute", cnt: m / (1000 * 60)},
            {key: "second", cnt: m / 1000},
            {key: "millisecond", cnt: m}
        ];
        var l = -1;
        for (var h = 0; h < o.length; h++) {
            if (o[h].key == f) {
                l = h;
                break
            }
        }
        var b = -1, n = -1;
        for (; l < o.length; l++) {
            if (o[l].cnt / 100 > d) {
                break
            }
            var c = this._estAxisInterval(k, p, q, d, o[l].key, g);
            var e = this._getDTIntCnt(k, p, c, o[l].key);
            if (b == -1 || b < e) {
                b = e;
                n = l
            }
        }
        f = o[n].key;
        return f
    }, _getXAxisStats: function (f, k, B) {
        var h = this._getDataLen(f);
        var b = k.type == "date" || k.type == "time";
        if (b && !this._autoDateFormats) {
            if (!this._autoDateFormats) {
                this._autoDateFormats = []
            }
            var m = this._testXAxisDateFormat();
            if (m) {
                this._autoDateFormats.push(m)
            }
        }
        var l = b ? this._castAsDate(k.minValue, k.dateFormat) : this._castAsNumber(k.minValue);
        var o = b ? this._castAsDate(k.maxValue, k.dateFormat) : this._castAsNumber(k.maxValue);
        var u = l, z = o;
        var e, n;
        var c = k.type == undefined || k.type == "auto";
        var g = (c || k.type == "basic");
        var v = 0, d = 0;
        for (var A = 0; A < h && k.dataField; A++) {
            var t = this._getDataValue(A, k.dataField, f);
            t = b ? this._castAsDate(t, k.dateFormat) : this._castAsNumber(t);
            if (isNaN(t)) {
                continue
            }
            if (b) {
                v++
            } else {
                d++
            }
            if (isNaN(e) || t < e) {
                e = t
            }
            if (isNaN(n) || t >= n) {
                n = t
            }
        }
        if (c && ((!b && d == h) || (b && v == h))) {
            g = false
        }
        if (g) {
            e = 0;
            n = h - 1
        }
        if (isNaN(u)) {
            u = e
        }
        if (isNaN(z)) {
            z = n
        }
        if (b) {
            if (!this._isDate(u)) {
                u = this._isDate(z) ? z : new Date()
            }
            if (!this._isDate(z)) {
                z = this._isDate(u) ? u : new Date()
            }
        } else {
            if (isNaN(u)) {
                u = 0
            }
            if (isNaN(z)) {
                z = g ? h - 1 : u
            }
        }
        if (e == undefined) {
            e = u
        }
        if (n == undefined) {
            n = z
        }
        var p = k.rangeSelector;
        if (p) {
            var q = p.minValue || u;
            if (q && b) {
                q = this._castAsDate(q, p.dateFormat || k.dateFormat)
            }
            var s = p.maxValue || z;
            if (s && b) {
                s = this._castAsDate(s, p.dateFormat || k.rangeSelector)
            }
            if (u < q) {
                u = q
            }
            if (z < q) {
                z = s
            }
            if (u > s) {
                u = q
            }
            if (z > s) {
                z = s
            }
        }
        var C = k.unitInterval;
        var r, D;
        if (b) {
            r = k.baseUnit;
            if (!r) {
                r = this._getBestDTUnit(u, z, f, B)
            }
            D = r == "hour" || r == "minute" || r == "second" || r == "millisecond"
        }
        var C = k.unitInterval;
        if (isNaN(C) || C <= 0) {
            C = this._estAxisInterval(u, z, f, B, r)
        }
        var w = {min: u, max: z};
        var j = this.seriesGroups[f];
        if (!b && (j.polar || j.spider)) {
            u = a.jqx._rnd(u, C, false);
            z = a.jqx._rnd(z, C, true)
        }
        return{min: u, max: z, dsRange: {min: e, max: n}, filterRange: w, useIndeces: g, isDateTime: b, isTimeUnit: D, dateTimeUnit: r, interval: C}
    }, _getDefaultDTFormatFn: function (d) {
        var b = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var c;
        if (d == "year" || d == "month" || d == "day") {
            c = function (e) {
                return e.getDate() + "-" + b[e.getMonth()] + "-" + e.getFullYear()
            }
        } else {
            c = function (e) {
                return e.getDate() + "-" + b[e.getMonth()] + "-" + e.getFullYear() + "<br>" + e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds()
            }
        }
        return c
    }, _getDTIntCnt: function (f, c, d, i) {
        var e = 0;
        var g = new Date(f);
        var h = new Date(c);
        if (d <= 0) {
            return 1
        }
        while (g.valueOf() < h.valueOf()) {
            if (i == "millisecond") {
                g.setMilliseconds(g.getMilliseconds() + d)
            } else {
                if (i == "second") {
                    g.setSeconds(g.getSeconds() + d)
                } else {
                    if (i == "minute") {
                        g.setMinutes(g.getMinutes() + d)
                    } else {
                        if (i == "hour") {
                            var b = g.valueOf();
                            g.setHours(g.getHours() + d);
                            if (b === g.valueOf()) {
                                g.setHours(g.getHours() + d + 1)
                            }
                        } else {
                            if (i == "day") {
                                g.setDate(g.getDate() + d)
                            } else {
                                if (i == "month") {
                                    g.setMonth(g.getMonth() + d)
                                } else {
                                    if (i == "year") {
                                        g.setFullYear(g.getFullYear() + d)
                                    }
                                }
                            }
                        }
                    }
                }
            }
            e++
        }
        return e
    }, _estAxisInterval: function (e, h, m, b, j, c) {
        var d = [1, 2, 5, 10, 15, 20, 50, 100, 200, 500];
        var g = 0;
        var f = b / ((!isNaN(c) && c > 0) ? c : 50);
        if (this._renderData && this._renderData.length > m && this._renderData[m].xAxis && !isNaN(this._renderData[m].xAxis.avgWidth)) {
            var o = Math.max(1, this._renderData[m].xAxis.avgWidth);
            if (o != 0 && isNaN(c)) {
                f = 0.9 * b / o
            }
        }
        if (f <= 1) {
            return Math.max(h - e)
        }
        var n = 0;
        while (true) {
            var l = g >= d.length ? Math.pow(10, 3 + g - d.length) : d[g];
            if (this._isDate(e) && this._isDate(h)) {
                n = this._getDTIntCnt(e, h, l, j)
            } else {
                n = (h - e) / l
            }
            if (n <= f) {
                break
            }
            g++
        }
        var k = this.seriesGroups[m];
        if (k.spider || k.polar) {
            if (2 * l > h - e) {
                l = h - e
            }
        }
        return l
    }, _getPaddingSize: function (l, e, f, c, n, g, o) {
        var h = l.min;
        var j = l.max;
        var b = l.interval;
        var d = l.dateTimeUnit;
        if (n) {
            var k = (c / Math.max(1, j - h + b)) * b;
            if (g) {
                return{left: 0, right: k}
            } else {
                if (f) {
                    return{left: 0, right: 0}
                }
                return{left: k / 2, right: k / 2}
            }
        }
        if (f && !o) {
            return{left: 0, right: 0}
        }
        if (this._isDate(h) && this._isDate(j)) {
            var m = this._getDTIntCnt(h, j, Math.min(b, j - h), d);
            var i = c / Math.max(2, m);
            return{left: i / 2, right: i / 2}
        }
        var m = Math.max(1, j - h);
        if (m == 1) {
            sz = c / 4;
            return{left: sz, right: sz}
        }
        var i = c / (m + 1);
        return{left: i / 2, right: i / 2}
    }, _calculateXOffsets: function (e, E) {
        var D = this.seriesGroups[e];
        var n = this._getXAxis(e);
        var v = [];
        var l = [];
        var m = this._getDataLen(e);
        var d = this._getXAxisStats(e, n, E);
        var u = d.min;
        var B = d.max;
        var b = d.isDateTime;
        var F = d.isTimeUnit;
        var C = this._hasColumnSeries();
        var c = D.polar || D.spider;
        var w = this._get([D.startAngle, D.minAngle, 0]);
        var s = this._get([D.endAngle, D.maxAngle, 360]);
        var p = c && !(Math.abs(Math.abs(s - w) - 360) > 0.0001);
        var k = this._alignValuesWithTicks(e);
        var r = this._getPaddingSize(d, n, k, E, c, p, C);
        var H = B - u;
        var A = d.filterRange;
        if (H == 0) {
            H = 1
        }
        var G = E - r.left - r.right;
        if (c && k) {
            r.left = r.right = 0
        }
        var h = -1, o = -1;
        for (var z = 0; z < m; z++) {
            var t = (n.dataField === undefined) ? z : this._getDataValue(z, n.dataField, e);
            if (d.useIndeces) {
                if (z < A.min || z > A.max) {
                    v.push(NaN);
                    l.push(undefined);
                    continue
                }
                v.push(a.jqx._ptrnd(r.left + (z - u) / H * G));
                l.push(t);
                if (h == -1) {
                    h = z
                }
                if (o == -1 || o < z) {
                    o = z
                }
                continue
            }
            t = b ? this._castAsDate(t, n.dateFormat) : this._castAsNumber(t);
            if (isNaN(t) || t < A.min || t > A.max) {
                v.push(NaN);
                l.push(undefined);
                continue
            }
            var q = 0;
            if (!b || (b && F)) {
                diffFromMin = t - u;
                q = (t - u) * G / H
            } else {
                q = (t.valueOf() - u.valueOf()) / (B.valueOf() - u.valueOf()) * G
            }
            q = a.jqx._ptrnd(r.left + q);
            v.push(q);
            l.push(t);
            if (h == -1) {
                h = z
            }
            if (o == -1 || o < z) {
                o = z
            }
        }
        if (n.flip == true) {
            for (var z = 0; z < v.length; z++) {
                if (!isNaN(v[z])) {
                    v[z] = E - v[z]
                }
            }
        }
        if (F || b) {
            H = this._getDateDiff(u, B, n.baseUnit);
            H = a.jqx._rnd(H, 1, false)
        }
        var j = Math.max(1, H);
        var f = G / j;
        if (h == o && j == 1) {
            v[h] = r.left + G / 2
        }
        return{axisStats: d, data: v, xvalues: l, first: h, last: o, length: o == -1 ? 0 : o - h + 1, itemWidth: f, intervalWidth: f * d.interval, rangeLength: H, useIndeces: d.useIndeces, padding: r, axisSize: G}
    }, _getXAxis: function (b) {
        if (b == undefined || this.seriesGroups.length <= b) {
            return this.categoryAxis || this.xAxis
        }
        return this.seriesGroups[b].categoryAxis || this.seriesGroups[b].xAxis || this.categoryAxis || this.xAxis
    }, _isGreyScale: function (e, b) {
        var d = this.seriesGroups[e];
        var c = d.series[b];
        if (c.greyScale == true) {
            return true
        } else {
            if (c.greyScale == false) {
                return false
            }
        }
        if (d.greyScale == true) {
            return true
        } else {
            if (d.greyScale == false) {
                return false
            }
        }
        return this.greyScale == true
    }, _getSeriesColors: function (f, c, e) {
        var b = this._getSeriesColorsInternal(f, c, e);
        if (this._isGreyScale(f, c)) {
            for (var d in b) {
                b[d] = a.jqx.toGreyScale(b[d])
            }
        }
        return b
    }, _getColorFromScheme: function (o, l, b) {
        var d = "#000000";
        var n = this.seriesGroups[o];
        var g = n.series[l];
        if (this._isPieGroup(o)) {
            var c = this._getDataLen(o);
            d = this._getItemColorFromScheme(g.colorScheme || n.colorScheme || this.colorScheme, l * c + b, o, l)
        } else {
            var m = 0;
            for (var f = 0; f <= o; f++) {
                for (var e in this.seriesGroups[f].series) {
                    if (f == o && e == l) {
                        break
                    } else {
                        m++
                    }
                }
            }
            var k = this.colorScheme;
            if (n.colorScheme) {
                k = n.colorScheme;
                sidex = seriesIndex
            }
            if (k == undefined || k == "") {
                k = this.colorSchemes[0].name
            }
            if (!k) {
                return d
            }
            for (var f = 0; f < this.colorSchemes.length; f++) {
                var h = this.colorSchemes[f];
                if (h.name == k) {
                    while (m > h.colors.length) {
                        m -= h.colors.length;
                        if (++f >= this.colorSchemes.length) {
                            f = 0
                        }
                        h = this.colorSchemes[f]
                    }
                    d = h.colors[m % h.colors.length]
                }
            }
        }
        return d
    }, _createColorsCache: function () {
        this._colorsCache = {get: function (b) {
            if (this._store[b]) {
                return this._store[b]
            }
        }, set: function (c, b) {
            if (this._size < 10000) {
                this._store[c] = b;
                this._size++
            }
        }, clear: function () {
            this._store = {};
            this._size = 0
        }, _size: 0, _store: {}}
    }, _getSeriesColorsInternal: function (m, d, b) {
        var f = this.seriesGroups[m];
        var o = f.series[d];
        if (!a.isFunction(o.colorFunction) && f.type != "pie" && f.type != "donut") {
            b = NaN
        }
        var h = m + "_" + d + "_" + (isNaN(b) ? "NaN" : b);
        if (this._colorsCache.get(h)) {
            return this._colorsCache.get(h)
        }
        var c = {lineColor: "#222222", lineColorSelected: "#151515", lineColorSymbol: "#222222", lineColorSymbolSelected: "#151515", fillColor: "#222222", fillColorSelected: "#333333", fillColorSymbol: "#222222", fillColorSymbolSelected: "#333333", fillColorAlt: "#222222", fillColorAltSelected: "#333333"};
        var i;
        if (a.isFunction(o.colorFunction)) {
            var j = !isNaN(b) ? this._getDataValue(b, o.dataField, m) : NaN;
            if (f.type.indexOf("range") != -1 && !isNaN(b)) {
                var e = this._getDataValue(b, o.dataFieldFrom, m);
                var l = this._getDataValue(b, o.dataFieldTo, m);
                j = {from: e, to: l}
            }
            i = o.colorFunction(j, b, o, f);
            if (typeof(i) == "object") {
                for (var k in i) {
                    c[k] = i[k]
                }
            } else {
                c.fillColor = i
            }
        } else {
            for (var k in c) {
                if (o[k]) {
                    c[k] = o[k]
                }
            }
            if (!o.fillColor && !o.color) {
                c.fillColor = this._getColorFromScheme(m, d, b)
            } else {
                o.fillColor = o.fillColor || o.color
            }
        }
        var n = {fillColor: {baseColor: "fillColor", adjust: 1}, fillColorSelected: {baseColor: "fillColor", adjust: 1.1}, fillColorSymbol: {baseColor: "fillColor", adjust: 1}, fillColorSymbolSelected: {baseColor: "fillColorSymbol", adjust: 2}, fillColorAlt: {baseColor: "fillColor", adjust: 4}, fillColorAltSelected: {baseColor: "fillColor", adjust: 3}, lineColor: {baseColor: "fillColor", adjust: 0.95}, lineColorSelected: {baseColor: "lineColor", adjust: 0.95}, lineColorSymbol: {baseColor: "lineColor", adjust: 1}, lineColorSymbolSelected: {baseColor: "lineColorSelected", adjust: 1}};
        for (var k in c) {
            if (typeof(i) != "object" || !i[k]) {
                if (o[k]) {
                    c[k] = o[k]
                }
            }
        }
        for (var k in c) {
            if (typeof(i) != "object" || !i[k]) {
                if (!o[k]) {
                    c[k] = a.jqx.adjustColor(c[n[k].baseColor], n[k].adjust)
                }
            }
        }
        this._colorsCache.set(h, c);
        return c
    }, _getItemColorFromScheme: function (d, f, k, h) {
        if (d == undefined || d == "") {
            d = this.colorSchemes[0].name
        }
        for (var g = 0; g < this.colorSchemes.length; g++) {
            if (d == this.colorSchemes[g].name) {
                break
            }
        }
        var e = 0;
        while (e <= f) {
            if (g == this.colorSchemes.length) {
                g = 0
            }
            var b = this.colorSchemes[g].colors.length;
            if (e + b <= f) {
                e += b;
                g++
            } else {
                var c = this.colorSchemes[g].colors[f - e];
                if (this._isGreyScale(k, h) && c.indexOf("#") == 0) {
                    c = a.jqx.toGreyScale(c)
                }
                return c
            }
        }
    }, getColorScheme: function (b) {
        for (var c = 0; c < this.colorSchemes.length; c++) {
            if (this.colorSchemes[c].name == b) {
                return this.colorSchemes[c].colors
            }
        }
        return undefined
    }, addColorScheme: function (c, b) {
        for (var d = 0; d < this.colorSchemes.length; d++) {
            if (this.colorSchemes[d].name == c) {
                this.colorSchemes[d].colors = b;
                return
            }
        }
        this.colorSchemes.push({name: c, colors: b})
    }, removeColorScheme: function (b) {
        for (var c = 0; c < this.colorSchemes.length; c++) {
            if (this.colorSchemes[c].name == b) {
                this.colorSchemes.splice(c, 1);
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
    ], _formatValue: function (g, i, c, f, b, d) {
        if (g == undefined) {
            return""
        }
        if (this._isObject(g) && !this._isDate(g) && !c) {
            return""
        }
        if (c) {
            if (!a.isFunction(c)) {
                return g.toString()
            }
            try {
                return c(g, d, b, f)
            } catch (h) {
                return h.message
            }
        }
        if (this._isNumber(g)) {
            return this._formatNumber(g, i)
        }
        if (this._isDate(g)) {
            return this._formatDate(g, i)
        }
        if (i) {
            return(i.prefix || "") + g.toString() + (i.sufix || "")
        }
        return g.toString()
    }, _getFormattedValue: function (f, h, A, p, d, l) {
        var w = this.seriesGroups[f];
        var n = w.series[h];
        var m = "";
        var j = p, k = d;
        if (!k) {
            k = n.formatFunction || w.formatFunction
        }
        if (!j) {
            j = n.formatSettings || w.formatSettings
        }
        if (!n.formatFunction && n.formatSettings) {
            k = undefined
        }
        var o = {}, t = 0;
        for (var b in n) {
            if (b.indexOf("dataField") == 0) {
                o[b.substring(9).toLowerCase()] = this._getDataValue(A, n[b], f);
                t++
            }
        }
        if (t == 0) {
            o = this._getDataValue(A, undefined, f)
        }
        if (w.type.indexOf("waterfall") != -1 && this._isSummary(f, A)) {
            o = this._renderData[f].offsets[h][A].value;
            t = 0
        }
        if (k && a.isFunction(k)) {
            try {
                return k(t == 1 ? o[""] : o, A, n, w)
            } catch (z) {
                return z.message
            }
        }
        if (t == 1 && this._isPieGroup(f)) {
            return this._formatValue(o[""], j, k, f, h, A)
        }
        if (t > 0) {
            var u = 0;
            for (var b in o) {
                if (u > 0 && m != "") {
                    m += "<br>"
                }
                var r = "dataField" + (b.length > 0 ? b.substring(0, 1).toUpperCase() + b.substring(1) : "");
                var q = "displayText" + (b.length > 0 ? b.substring(0, 1).toUpperCase() + b.substring(1) : "");
                var v = n[q] || n[r];
                var c = o[b];
                if (undefined != c) {
                    c = this._formatValue(c, j, k, f, h, A)
                } else {
                    continue
                }
                if (l === true) {
                    m += c
                } else {
                    m += v + ": " + c
                }
                u++
            }
        } else {
            if (undefined != o) {
                m = this._formatValue(o, j, k, f, h, A)
            }
        }
        return m || ""
    }, _isNumberAsString: function (d) {
        if (typeof(d) != "string") {
            return false
        }
        d = a.trim(d);
        for (var b = 0; b < d.length; b++) {
            var c = d.charAt(b);
            if ((c >= "0" && c <= "9") || c == "," || c == ".") {
                continue
            }
            if (c == "-" && b == 0) {
                continue
            }
            if ((c == "(" && b == 0) || (c == ")" && b == d.length - 1)) {
                continue
            }
            return false
        }
        return true
    }, _castAsDate: function (f, c) {
        if (f instanceof Date && !isNaN(f)) {
            return f
        }
        if (typeof(f) == "string") {
            var b;
            if (c) {
                b = a.jqx.dataFormat.parsedate(f, c);
                if (this._isDate(b)) {
                    return b
                }
            }
            if (a.jqx.dataFormat) {
                b = a.jqx.dataFormat.tryparsedate(f, undefined, false);
                if (this._isDate(b)) {
                    return b
                }
            }
            if (this._autoDateFormats) {
                for (var e = 0; e < this._autoDateFormats.length; e++) {
                    b = a.jqx.dataFormat.parsedate(f, this._autoDateFormats[e]);
                    if (this._isDate(b)) {
                        return b
                    }
                }
            }
            var d = this._detectDateFormat(f);
            if (d) {
                b = a.jqx.dataFormat.parsedate(f, d);
                if (this._isDate(b)) {
                    this._autoDateFormats.push(d);
                    return b
                }
            }
            b = new Date(f);
            if (this._isDate(b)) {
                if (f.indexOf(":") == -1) {
                    b.setHours(0, 0, 0, 0)
                }
            }
            return b
        }
        return undefined
    }, _castAsNumber: function (c) {
        if (c instanceof Date && !isNaN(c)) {
            return c.valueOf()
        }
        if (typeof(c) == "string") {
            if (this._isNumber(c)) {
                c = parseFloat(c)
            } else {
                if (!/[a-zA-Z]/.test(c)) {
                    var b = new Date(c);
                    if (b != undefined) {
                        c = b.valueOf()
                    }
                }
            }
        }
        return c
    }, _isNumber: function (b) {
        if (typeof(b) == "string") {
            if (this._isNumberAsString(b)) {
                b = parseFloat(b)
            }
        }
        return typeof b === "number" && isFinite(b)
    }, _isDate: function (b) {
        return b instanceof Date && !isNaN(b.getDate())
    }, _isBoolean: function (b) {
        return typeof b === "boolean"
    }, _isObject: function (b) {
        return(b && (typeof b === "object" || a.isFunction(b))) || false
    }, _formatDate: function (d, c) {
        var b = d.toString();
        if (c) {
            if (c.dateFormat) {
                b = a.jqx.dataFormat.formatDate(d, c.dateFormat)
            }
            b = (c.prefix || "") + b + (c.sufix || "")
        }
        return b
    }, _formatNumber: function (n, e) {
        if (!this._isNumber(n)) {
            return n
        }
        e = e || {};
        var q = ".";
        var o = "";
        var r = this;
        if (r.localization) {
            q = r.localization.decimalSeparator || r.localization.decimalseparator || q;
            o = r.localization.thousandsSeparator || r.localization.thousandsseparator || o
        }
        if (e.decimalSeparator) {
            q = e.decimalSeparator
        }
        if (e.thousandsSeparator) {
            o = e.thousandsSeparator
        }
        var m = e.prefix || "";
        var p = e.sufix || "";
        var h = e.decimalPlaces;
        if (isNaN(h)) {
            h = ((n * 100 != parseInt(n) * 100) ? 2 : 0)
        }
        var l = e.negativeWithBrackets || false;
        var g = (n < 0);
        if (g && l) {
            n *= -1
        }
        var d = n.toString();
        var b;
        var k = Math.pow(10, h);
        d = (Math.round(n * k) / k).toString();
        if (isNaN(d)) {
            d = ""
        }
        b = d.lastIndexOf(".");
        if (h > 0) {
            if (b < 0) {
                d += q;
                b = d.length - 1
            } else {
                if (q !== ".") {
                    d = d.replace(".", q)
                }
            }
            while ((d.length - 1 - b) < h) {
                d += "0"
            }
        }
        b = d.lastIndexOf(q);
        b = (b > -1) ? b : d.length;
        var f = d.substring(b);
        var c = 0;
        for (var j = b; j > 0; j--, c++) {
            if ((c % 3 === 0) && (j !== b) && (!g || (j > 1) || (g && l))) {
                f = o + f
            }
            f = d.charAt(j - 1) + f
        }
        d = f;
        if (g && l) {
            d = "(" + d + ")"
        }
        return m + d + p
    }, _defaultNumberFormat: {prefix: "", sufix: "", decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, negativeWithBrackets: false}, _calculateControlPoints: function (g, f) {
        var e = g[f], m = g[f + 1], d = g[f + 2], j = g[f + 3], c = g[f + 4], i = g[f + 5];
        var l = 0.4;
        var o = Math.sqrt(Math.pow(d - e, 2) + Math.pow(j - m, 2));
        var b = Math.sqrt(Math.pow(c - d, 2) + Math.pow(i - j, 2));
        var h = (o + b);
        if (h == 0) {
            h = 1
        }
        var n = l * o / h;
        var k = l - n;
        return[d + n * (e - c), j + n * (m - i), d - k * (e - c), j - k * (m - i)]
    }, _getBezierPoints: function (d) {
        var c = "";
        var h = [], e = [];
        var g = d.split(" ");
        for (var f = 0; f < g.length; f++) {
            var j = g[f].split(",");
            h.push(parseFloat(j[0]));
            h.push(parseFloat(j[1]));
            if (isNaN(h[h.length - 1]) || isNaN(h[h.length - 2])) {
                continue
            }
        }
        var b = h.length;
        if (b <= 1) {
            return""
        } else {
            if (b == 2) {
                c = "M" + a.jqx._ptrnd(h[0]) + "," + a.jqx._ptrnd(h[1]) + " L" + a.jqx._ptrnd(h[0] + 1) + "," + a.jqx._ptrnd(h[1] + 1) + " ";
                return c
            }
        }
        for (var f = 0; f < b - 4; f += 2) {
            e = e.concat(this._calculateControlPoints(h, f))
        }
        for (var f = 2; f < b - 5; f += 2) {
            c += " C" + a.jqx._ptrnd(e[2 * f - 2]) + "," + a.jqx._ptrnd(e[2 * f - 1]) + " " + a.jqx._ptrnd(e[2 * f]) + "," + a.jqx._ptrnd(e[2 * f + 1]) + " " + a.jqx._ptrnd(h[f + 2]) + "," + a.jqx._ptrnd(h[f + 3]) + " "
        }
        if (b < 4 || (Math.abs(h[0] - h[2]) < 3 || Math.abs(h[1] - h[3]) < 3) || this._isVML) {
            c = "M" + a.jqx._ptrnd(h[0]) + "," + a.jqx._ptrnd(h[1]) + " L" + a.jqx._ptrnd(h[2]) + "," + a.jqx._ptrnd(h[3]) + " " + c
        } else {
            c = "M" + a.jqx._ptrnd(h[0]) + "," + a.jqx._ptrnd(h[1]) + " Q" + a.jqx._ptrnd(e[0]) + "," + a.jqx._ptrnd(e[1]) + " " + a.jqx._ptrnd(h[2]) + "," + a.jqx._ptrnd(h[3]) + " " + c
        }
        if (Math.abs(h[b - 2] - h[b - 4]) < 3 || Math.abs(h[b - 1] - h[b - 3]) < 3 || this._isVML) {
            c += " L" + a.jqx._ptrnd(h[b - 2]) + "," + a.jqx._ptrnd(h[b - 1]) + " "
        } else {
            c += " Q" + a.jqx._ptrnd(e[b * 2 - 10]) + "," + a.jqx._ptrnd(e[b * 2 - 9]) + " " + a.jqx._ptrnd(h[b - 2]) + "," + a.jqx._ptrnd(h[b - 1]) + " "
        }
        return c
    }, _animTickInt: 50, _createAnimationGroup: function (b) {
        if (!this._animGroups) {
            this._animGroups = {}
        }
        this._animGroups[b] = {animations: [], startTick: NaN}
    }, _startAnimation: function (c) {
        var e = new Date();
        var b = e.getTime();
        this._animGroups[c].startTick = b;
        this._runAnimation();
        this._enableAnimTimer()
    }, _enqueueAnimation: function (e, d, c, g, f, b, h) {
        if (g < 0) {
            g = 0
        }
        if (h == undefined) {
            h = "easeInOutSine"
        }
        this._animGroups[e].animations.push({key: d, properties: c, duration: g, fn: f, context: b, easing: h})
    }, _stopAnimations: function () {
        clearTimeout(this._animtimer);
        this._animtimer = undefined;
        this._animGroups = undefined
    }, _enableAnimTimer: function () {
        if (!this._animtimer) {
            var b = this;
            this._animtimer = setTimeout(function () {
                b._runAnimation()
            }, this._animTickInt)
        }
    }, _runAnimation: function (q) {
        if (this._animGroups) {
            var t = new Date();
            var h = t.getTime();
            var o = {};
            for (var l in this._animGroups) {
                var s = this._animGroups[l].animations;
                var m = this._animGroups[l].startTick;
                var g = 0;
                for (var n = 0; n < s.length; n++) {
                    var u = s[n];
                    var b = (h - m);
                    if (u.duration > g) {
                        g = u.duration
                    }
                    var r = u.duration > 0 ? b / u.duration : 1;
                    var k = r;
                    if (u.easing && u.duration != 0) {
                        k = a.easing[u.easing](r, b, 0, 1, u.duration)
                    }
                    if (r > 1) {
                        r = 1;
                        k = 1
                    }
                    if (u.fn) {
                        u.fn(u.key, u.context, k);
                        continue
                    }
                    var f = {};
                    for (var l = 0; l < u.properties.length; l++) {
                        var c = u.properties[l];
                        var e = 0;
                        if (r == 1) {
                            e = c.to
                        } else {
                            e = easeParecent * (c.to - c.from) + c.from
                        }
                        f[c.key] = e
                    }
                    this.renderer.attr(u.key, f)
                }
                if (m + g > h) {
                    o[l] = ({startTick: m, animations: s})
                }
            }
            this._animGroups = o;
            if (this.renderer instanceof a.jqx.HTML5Renderer) {
                this.renderer.refresh()
            }
        }
        this._animtimer = null;
        for (var l in this._animGroups) {
            this._enableAnimTimer();
            break
        }
    }, _fixCoords: function (d, e) {
        var b = this.seriesGroups[e].orientation == "horizontal";
        if (!b) {
            return d
        }
        var c = d.x;
        d.x = d.y;
        d.y = c + this._plotRect.y - this._plotRect.x;
        var c = d.width;
        d.width = d.height;
        d.height = c;
        return d
    }, getItemCoord: function (b, d, u) {
        var k = this;
        if (!k._isSerieVisible(b, d) || !k._renderData || k._renderData.length <= b) {
            return{x: NaN, y: NaN}
        }
        var q = k.seriesGroups[b];
        var j = q.series[d];
        var o = k._getItemCoord(b, d, u);
        if (k._isPieGroup(b)) {
            var i = this._plotRect;
            var p = o.fromAngle * (Math.PI / 180);
            var e = o.toAngle * (Math.PI / 180);
            x1 = i.x + o.center.x + Math.cos(p) * o.outerRadius;
            x2 = i.x + o.center.x + Math.cos(e) * o.outerRadius;
            y1 = i.y + o.center.y - Math.sin(p) * o.outerRadius;
            y2 = i.y + o.center.y - Math.sin(e) * o.outerRadius;
            var h = Math.min(x1, x2);
            var m = Math.abs(x2 - x1);
            var f = Math.min(y1, y2);
            var l = Math.abs(y2 - y1);
            o = {x: h, y: f, width: m, height: l, center: o.center, centerOffset: o.centerOffset, innerRadius: o.innerRadius, outerRadius: o.outerRadius, fromAngle: o.fromAngle, toAngle: o.toAngle};
            return o
        }
        if (q.type.indexOf("column") != -1 || q.type.indexOf("waterfall") != -1) {
            var v = this._getColumnSerieWidthAndOffset(b, d);
            o.height = Math.abs(o.y.to - o.y.from);
            o.y = Math.min(o.y.to, o.y.from);
            o.x += v.offset;
            o.width = v.width
        } else {
            if (q.type.indexOf("ohlc") != -1 || q.type.indexOf("candlestick") != -1) {
                var v = this._getColumnSerieWidthAndOffset(b, d);
                var f = o.y;
                var t = Math.min(f.Open, f.Close, f.Low, f.High);
                var r = Math.max(f.Open, f.Close, f.Low, f.High);
                o.height = Math.abs(r - t);
                o.y = t;
                o.x += v.offset;
                o.width = v.width
            } else {
                if (q.type.indexOf("line") != -1 || q.type.indexOf("area") != -1) {
                    o.width = o.height = 0;
                    o.y = o.y.to
                } else {
                    if (q.type.indexOf("bubble") != -1 || q.type.indexOf("scatter") != -1) {
                        o.center = {x: o.x, y: o.y.to};
                        var c = o.y.radius;
                        if (j.symbolType != "circle" && j.symbolType != undefined) {
                            c /= 2
                        }
                        o.y = o.y.to;
                        o.radius = c;
                        o.width = 2 * c;
                        o.height = 2 * c
                    }
                }
            }
        }
        o = this._fixCoords(o, b);
        if (q.polar || q.spider) {
            var n = this._toPolarCoord(this._renderData[b].polarCoords, this._plotRect, o.x, o.y);
            o.x = n.x;
            o.y = n.y;
            if (o.center) {
                o.center = this._toPolarCoord(this._renderData[b].polarCoords, this._plotRect, o.center.x, o.center.y)
            }
        }
        if (q.type.indexOf("bubble") != -1 || q.type.indexOf("scatter") != -1) {
            o.x -= c;
            o.y -= c
        }
        return o
    }, _getItemCoord: function (o, j, b) {
        var e = this.seriesGroups[o], l, k;
        if (!e || !this._renderData) {
            return{x: NaN, y: NaN}
        }
        var f = e.series[j];
        if (!f) {
            return{x: NaN, y: NaN}
        }
        var h = this._plotRect;
        if (this._isPieGroup(o)) {
            var m = this._renderData[o].offsets[j][b];
            if (!m) {
                return{x: NaN, y: NaN}
            }
            var c = (m.fromAngle + m.toAngle) / 2 * (Math.PI / 180);
            l = h.x + m.x + Math.cos(c) * m.outerRadius;
            k = h.y + m.y - Math.sin(c) * m.outerRadius;
            return{x: l, y: k, center: {x: m.x, y: m.y}, centerOffset: m.centerOffset, innerRadius: m.innerRadius, outerRadius: m.outerRadius, fromAngle: m.fromAngle, toAngle: m.toAngle}
        } else {
            l = h.x + this._renderData[o].xoffsets.data[b];
            k = this._renderData[o].offsets[j][b];
            if (isNaN(l) || !k) {
                return{x: NaN, y: NaN}
            }
        }
        var n = {};
        for (var d in k) {
            n[d] = k[d]
        }
        return{x: l, y: n}
    }, _detectDateFormat: function (g, e) {
        var d = {en_US_d: "M/d/yyyy", en_US_D: "dddd, MMMM dd, yyyy", en_US_t: "h:mm tt", en_US_T: "h:mm:ss tt", en_US_f: "dddd, MMMM dd, yyyy h:mm tt", en_US_F: "dddd, MMMM dd, yyyy h:mm:ss tt", en_US_M: "MMMM dd", en_US_Y: "yyyy MMMM", en_US_S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss", en_CA_d: "dd/MM/yyyy", en_CA_D: "MMMM-dd-yy", en_CA_f: "MMMM-dd-yy h:mm tt", en_CA_F: "MMMM-dd-yy h:mm:ss tt", ISO: "yyyy-MM-dd hh:mm:ss", ISO2: "yyyy-MM-dd HH:mm:ss", d1: "dd.MM.yyyy", d2: "dd-MM-yyyy", zone1: "yyyy-MM-ddTHH:mm:ss-HH:mm", zone2: "yyyy-MM-ddTHH:mm:ss+HH:mm", custom: "yyyy-MM-ddTHH:mm:ss.fff", custom2: "yyyy-MM-dd HH:mm:ss.fff", de_DE_d: "dd.MM.yyyy", de_DE_D: "dddd, d. MMMM yyyy", de_DE_t: "HH:mm", de_DE_T: "HH:mm:ss", de_DE_f: "dddd, d. MMMM yyyy HH:mm", de_DE_F: "dddd, d. MMMM yyyy HH:mm:ss", de_DE_M: "dd MMMM", de_DE_Y: "MMMM yyyy", fr_FR_d: "dd/MM/yyyy", fr_FR_D: "dddd d MMMM yyyy", fr_FR_t: "HH:mm", fr_FR_T: "HH:mm:ss", fr_FR_f: "dddd d MMMM yyyy HH:mm", fr_FR_F: "dddd d MMMM yyyy HH:mm:ss", fr_FR_M: "d MMMM", fr_FR_Y: "MMMM yyyy", it_IT_d: "dd/MM/yyyy", it_IT_D: "dddd d MMMM yyyy", it_IT_t: "HH:mm", it_IT_T: "HH:mm:ss", it_IT_f: "dddd d MMMM yyyy HH:mm", it_IT_F: "dddd d MMMM yyyy HH:mm:ss", it_IT_M: "dd MMMM", it_IT_Y: "MMMM yyyy", ru_RU_d: "dd.MM.yyyy", ru_RU_D: "d MMMM yyyy '?.'", ru_RU_t: "H:mm", ru_RU_T: "H:mm:ss", ru_RU_f: "d MMMM yyyy '?.' H:mm", ru_RU_F: "d MMMM yyyy '?.' H:mm:ss", ru_RU_Y: "MMMM yyyy", cs_CZ_d: "d.M.yyyy", cs_CZ_D: "d. MMMM yyyy", cs_CZ_t: "H:mm", cs_CZ_T: "H:mm:ss", cs_CZ_f: "d. MMMM yyyy H:mm", cs_CZ_F: "d. MMMM yyyy H:mm:ss", cs_CZ_M: "dd MMMM", cs_CZ_Y: "MMMM yyyy", he_IL_d: "dd MMMM yyyy", he_IL_D: "dddd dd MMMM yyyy", he_IL_t: "HH:mm", he_IL_T: "HH:mm:ss", he_IL_f: "dddd dd MMMM yyyy HH:mm", he_IL_F: "dddd dd MMMM yyyy HH:mm:ss", he_IL_M: "dd MMMM", he_IL_Y: "MMMM yyyy", hr_HR_d: "d.M.yyyy.", hr_HR_D: "d. MMMM yyyy.", hr_HR_t: "H:mm", hr_HR_T: "H:mm:ss", hr_HR_f: "d. MMMM yyyy. H:mm", hr_HR_F: "d. MMMM yyyy. H:mm:ss", hr_HR_M: "d. MMMM", hu_HU_d: "yyyy.MM.dd.", hu_HU_D: "yyyy. MMMM d.", hu_HU_t: "H:mm", hu_HU_T: "H:mm:ss", hu_HU_f: "yyyy. MMMM d. H:mm", hu_HU_F: "yyyy. MMMM d. H:mm:ss", hu_HU_M: "MMMM d.", hu_HU_Y: "yyyy. MMMM", jp_JP_d: "gg y/M/d", jp_JP_D: "gg y'?'M'?'d'?'", jp_JP_t: "H:mm", jp_JP_T: "H:mm:ss", jp_JP_f: "gg y'?'M'?'d'?' H:mm", jp_JP_F: "gg y'?'M'?'d'?' H:mm:ss", jp_JP_M: "M'?'d'?'", jp_JP_Y: "gg y'?'M'?'", lt_LT_d: "yyyy.MM.dd", lt_LT_D: "yyyy 'm.' MMMM d 'd.'", lt_LT_t: "HH:mm", lt_LT_T: "HH:mm:ss", lt_LT_f: "yyyy 'm.' MMMM d 'd.' HH:mm", lt_LT_F: "yyyy 'm.' MMMM d 'd.' HH:mm:ss", lt_LT_M: "MMMM d 'd.'", lt_LT_Y: "yyyy 'm.' MMMM", sa_IN_d: "dd-MM-yyyy", sa_IN_D: "dd MMMM yyyy dddd", sa_IN_t: "HH:mm", sa_IN_T: "HH:mm:ss", sa_IN_f: "dd MMMM yyyy dddd HH:mm", sa_IN_F: "dd MMMM yyyy dddd HH:mm:ss", sa_IN_M: "dd MMMM", basic_y: "yyyy", basic_ym: "yyyy-MM", basic_d: "yyyy-MM-dd", basic_dhm: "yyyy-MM-dd hh:mm", basic_bhms: "yyyy-MM-dd hh:mm:ss", basic2_ym: "MM-yyyy", basic2_d: "MM-dd-yyyy", basic2_dhm: "MM-dd-yyyy hh:mm", basic2_dhms: "MM-dd-yyyy hh:mm:ss", basic3_ym: "yyyy/MM", basic3_d: "yyyy/MM/dd", basic3_dhm: "yyyy/MM/dd hh:mm", basic3_bhms: "yyyy/MM/dd hh:mm:ss", basic4_ym: "MM/yyyy", basic4_d: "MM/dd/yyyy", basic4_dhm: "MM/dd/yyyy hh:mm", basic4_dhms: "MM/dd/yyyy hh:mm:ss"};
        if (e) {
            d = a.extend({}, d, e)
        }
        var c = [];
        if (!a.isArray(g)) {
            c.push(g)
        } else {
            c = g
        }
        for (var f in d) {
            d[f] = {format: d[f], count: 0}
        }
        for (var h = 0; h < c.length; h++) {
            value = c[h];
            if (value == null || value == undefined) {
                continue
            }
            for (var f in d) {
                var b = a.jqx.dataFormat.parsedate(value, d[f].format);
                if (b != null) {
                    d[f].count++
                }
            }
        }
        var k = {key: undefined, count: 0};
        for (var f in d) {
            if (d[f].count > k.count) {
                k.key = f;
                k.count = d[f].count
            }
        }
        return k.key ? d[k.key].format : ""
    }, _testXAxisDateFormat: function (h) {
        var k = this;
        var d = k._getXAxis(h);
        var c = k._getDataLen(h);
        var e = {};
        if (k.localization && k.localization.patterns) {
            for (var j in k.localization.patterns) {
                e["local_" + j] = k.localization.patterns[j]
            }
        }
        var g = [];
        for (var f = 0; f < c && f < 10; f++) {
            value = k._getDataValue(f, d.dataField, h);
            if (value == null || value == undefined) {
                continue
            }
            g.push(value)
        }
        var b = k._detectDateFormat(g, e);
        return b
    }})
})(jqxBaseFramework);