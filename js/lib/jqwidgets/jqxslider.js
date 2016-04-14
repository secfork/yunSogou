/*
 jQWidgets v3.8.2 (2015-Aug)
 Copyright (c) 2011-2015 jQWidgets.
 License: http://jqwidgets.com/license/
 */

(function (a) {
    a.jqx.jqxWidget("jqxSlider", "", {});
    a.extend(a.jqx._jqxSlider.prototype, {defineInstance: function () {
        var b = {disabled: false, width: 300, height: 30, step: 1, max: 10, min: 0, int64: false, orientation: "horizontal", showTicks: true, ticksPosition: "both", ticksFrequency: 2, minorTicksFrequency: 1, showMinorTicks: false, showButtons: true, buttonsPosition: "both", mode: "default", showRange: true, rangeSlider: false, value: 0, values: [0, 10], tooltip: false, tooltipFormatFunction: null, tooltipPosition: "near", tooltipHideDelay: 500, sliderButtonSize: 14, tickSize: 7, minorTickSize: 4, showTickLabels: false, tickLabelFormatFunction: null, layout: "normal", rtl: false, _settings: {vertical: {size: "height", oSize: "width", outerOSize: "outerWidth", outerSize: "outerHeight", left: "top", top: "left", start: "_startY", mouse: "_mouseStartY", page: "pageY", opposite: "horizontal"}, horizontal: {size: "width", oSize: "height", outerOSize: "outerHeight", outerSize: "outerWidth", left: "left", top: "top", start: "_startX", mouse: "_mouseStartX", page: "pageX", opposite: "vertical"}}, _touchEvents: {mousedown: a.jqx.mobile.getTouchEventName("touchstart"), click: a.jqx.mobile.getTouchEventName("touchstart"), mouseup: a.jqx.mobile.getTouchEventName("touchend"), mousemove: a.jqx.mobile.getTouchEventName("touchmove"), mouseenter: "mouseenter", mouseleave: "mouseleave"}, _events: ["change", "slide", "slideEnd", "slideStart", "created"], _invalidArgumentExceptions: {invalidWidth: "Invalid width.", invalidHeight: "Invalid height.", invalidStep: "Invalid step.", invalidMaxValue: "Invalid maximum value.", invalidMinValue: "Invalid minimum value.", invalidTickFrequency: "Invalid tick frequency.", invalidValue: "Invalid value.", invalidValues: "Invalid values.", invalidTicksPosition: "Invalid ticksPosition", invalidButtonsPosition: "Invalid buttonsPosition"}, _lastValue: [], _track: null, _leftButton: null, _rightButton: null, _slider: null, _rangeBar: null, _slideEvent: null, _capturedElement: null, _slideStarted: false, aria: {"aria-valuenow": {name: "value", type: "number"}, "aria-valuemin": {name: "min", type: "number"}, "aria-valuemax": {name: "max", type: "number"}, "aria-disabled": {name: "disabled", type: "boolean"}}};
        a.extend(true, this, b);
        return b
    }, createInstance: function (b) {
        var c = this;
        if (c.int64 === true) {
            if (!a.jqx.longInt) {
                throw new Error("jqxSlider: Missing reference to jqxdata.js")
            }
            a.jqx.longInt(c);
            c._value64 = new a.jqx.math().fromString(c.value.toString(), 10);
            c._values64 = [new a.jqx.math().fromString(c.values[0].toString(), 10), new a.jqx.math().fromString(c.values[1].toString(), 10)];
            c._min64 = new a.jqx.math().fromString(c.min.toString(), 10);
            c._max64 = new a.jqx.math().fromString(c.max.toString(), 10);
            c._step64 = new a.jqx.math().fromString(c.step.toString(), 10);
            c._ticksFrequency64 = new a.jqx.math().fromString(c.ticksFrequency.toString(), 10);
            c._minorTicksFrequency64 = new a.jqx.math().fromString(c.minorTicksFrequency.toString(), 10)
        }
        this.render()
    }, render: function () {
        this.element.innerHTML = "";
        this.host.attr("role", "slider");
        this.host.addClass(this.toThemeProperty("jqx-slider"));
        this.host.addClass(this.toThemeProperty("jqx-widget"));
        a.jqx.aria(this);
        this._isTouchDevice = a.jqx.mobile.isTouchDevice();
        this.host.width(this.width);
        this.host.height(this.height);
        this._refresh();
        this._raiseEvent(4, {value: this.getValue()});
        this._addInput();
        var c = this;
        var b = c.host.attr("tabindex") == null;
        if (b) {
            c.host.attr("tabindex", 0)
        }
        a.jqx.utilities.resize(this.host, function () {
            c.__trackSize = null;
            c.__thumbSize = null;
            c.host.width(c.width);
            c.host.height(c.height);
            c._performLayout();
            c._initialSettings()
        })
    }, resize: function (c, b) {
        this.width = c;
        this.height = b;
        this.refresh();
        this.host.width(me.width);
        this.host.height(me.height);
        this._performLayout();
        this._initialSettings()
    }, focus: function () {
        try {
            this.host.focus()
        } catch (b) {
        }
    }, destroy: function () {
        this.host.remove()
    }, _addInput: function () {
        var b = this.host.attr("name");
        this.input = a("<input type='hidden'/>");
        this.host.append(this.input);
        if (b) {
            this.input.attr("name", b)
        }
        if (!this.rangeSlider) {
            this.input.val(this.value.toString())
        } else {
            if (this.values) {
                this.input.val(this.value.rangeStart.toString() + "-" + this.value.rangeEnd.toString())
            }
        }
    }, _getSetting: function (b) {
        return this._settings[this.orientation][b]
    }, _getEvent: function (b) {
        if (this._isTouchDevice) {
            return this._touchEvents[b]
        } else {
            return b
        }
    }, refresh: function (b) {
        if (!b) {
            this._refresh()
        }
    }, _refresh: function () {
        this._render();
        this._performLayout();
        this._removeEventHandlers();
        this._addEventHandlers();
        this._initialSettings()
    }, _render: function () {
        this._addTrack();
        this._addSliders();
        this._addTickContainers();
        this._addContentWrapper();
        this._addButtons();
        this._addRangeBar()
    }, _addTrack: function () {
        if (this._track === null || this._track.length < 1) {
            this._track = a('<div class="' + this.toThemeProperty("jqx-slider-track") + '"></div>');
            this.host.append(this._track)
        }
        this._track.attr("style", "");
        this._track.removeClass(this.toThemeProperty("jqx-slider-track-" + this._getSetting("opposite")));
        this._track.addClass(this.toThemeProperty("jqx-slider-track-" + this.orientation));
        this._track.addClass(this.toThemeProperty("jqx-fill-state-normal"));
        this._track.addClass(this.toThemeProperty("jqx-rc-all"))
    }, _addSliders: function () {
        if (this._slider === null || this._slider.length < 1) {
            this._slider = {};
            this._slider.left = a('<div class="' + this.toThemeProperty("jqx-slider-slider") + '"></div>');
            this._track.append(this._slider.left);
            this._slider.right = a('<div class="' + this.toThemeProperty("jqx-slider-slider") + '"></div>');
            this._track.append(this._slider.right)
        }
        this._slider.left.removeClass(this.toThemeProperty("jqx-slider-slider-" + this._getSetting("opposite")));
        this._slider.left.addClass(this.toThemeProperty("jqx-slider-slider-" + this.orientation));
        this._slider.right.removeClass(this.toThemeProperty("jqx-slider-slider-" + this._getSetting("opposite")));
        this._slider.right.addClass(this.toThemeProperty("jqx-slider-slider-" + this.orientation));
        this._slider.right.addClass(this.toThemeProperty("jqx-fill-state-normal"));
        this._slider.left.addClass(this.toThemeProperty("jqx-fill-state-normal"))
    }, _addTickContainers: function () {
        if (this._bottomTicks !== null || this._bottomTicks.length < 1 || this._topTicks !== null || this._topTicks.length < 1) {
            this._addTickContainers()
        }
        var b = "visible";
        if (!this.showTicks) {
            b = "hidden"
        }
        this._bottomTicks.css("visibility", b);
        this._topTicks.css("visibility", b)
    }, _addTickContainers: function () {
        if (typeof this._bottomTicks === "undefined" || this._bottomTicks.length < 1) {
            this._bottomTicks = a('<div class="' + this.toThemeProperty("jqx-slider-tickscontainer") + '" style=""></div>');
            this.host.prepend(this._bottomTicks)
        }
        if (typeof this._topTicks === "undefined" || this._topTicks.length < 1) {
            this._topTicks = a('<div class="' + this.toThemeProperty("jqx-slider-tickscontainer") + '" style=""></div>');
            this.host.append(this._topTicks)
        }
    }, _addButtons: function () {
        if (this._leftButton === null || this._leftButton.length < 1 || this._rightButton === null || this._rightButton.length < 1) {
            this._createButtons()
        }
        var b = "block";
        if (!this.showButtons || this.rangeSlider) {
            b = "none"
        }
        this._rightButton.css("display", b);
        this._leftButton.css("display", b)
    }, _createButtons: function () {
        this._leftButton = a('<div class="jqx-slider-left"><div style="width: 100%; height: 100%;"></div></div>');
        this._rightButton = a('<div class="jqx-slider-right"><div style="width: 100%; height: 100%;"></div></div>');
        this.host.prepend(this._rightButton);
        this.host.prepend(this._leftButton);
        if (!this.host.jqxRepeatButton) {
            throw new Error("jqxSlider: Missing reference to jqxbuttons.js.")
        }
        this._leftButton.jqxRepeatButton({theme: this.theme, delay: 50, width: this.sliderButtonSize, height: this.sliderButtonSize});
        this._rightButton.jqxRepeatButton({theme: this.theme, delay: 50, width: this.sliderButtonSize, height: this.sliderButtonSize})
    }, _addContentWrapper: function () {
        if (this._contentWrapper === undefined || this._contentWrapper.length === 0) {
            this.host.wrapInner("<div></div>");
            this._contentWrapper = this.host.children(0)
        }
        if (this.orientation === "horizontal") {
            this._contentWrapper.css("float", "left")
        } else {
            this._contentWrapper.css("float", "none")
        }
    }, _addTicks: function (c) {
        if (!this.showTicks) {
            return
        }
        var e = c[this._getSetting("size")](), m, f, n, k, h, o;
        if (this.int64 === false) {
            m = this.max - this.min;
            f = Math.round(m / this.ticksFrequency);
            n = Math.round(m / this.minorTicksFrequency);
            h = this.min;
            o = this.max
        } else {
            m = this._max64.subtract(this._min64);
            f = m.div(this._ticksFrequency64).toNumber();
            n = m.div(this._minorTicksFrequency64).toNumber();
            h = this._min64.toString();
            o = this._max64.toString()
        }
        var b = e / f, k = e / n;
        c.empty();
        var r = "", d;
        if ((this.layout === "normal" && this.orientation === "horizontal") || (this.layout === "reverse" && this.orientation === "vertical")) {
            d = this.tickLabelFormatFunction ? this.tickLabelFormatFunction(h) : h
        } else {
            d = this.tickLabelFormatFunction ? this.tickLabelFormatFunction(o) : o
        }
        var q = a("<span style='visibility: hidden;'></span>");
        q.addClass(this.toThemeProperty("jqx-widget jqx-widget-content jqx-slider"));
        q.appendTo(document.body);
        q.html("0");
        var l = {width: q.width(), height: q.height()};
        q.detach();
        var s = c[this._getSetting("oSize")]();
        r += this._addTick(c, 0, this.min, s, d, l);
        for (var j = 1; j < f; j++) {
            var g = j * b;
            g = Math.floor(g);
            var p;
            if (this.int64 === false) {
                if ((this.layout === "normal" && this.orientation === "horizontal") || (this.layout === "reverse" && this.orientation === "vertical")) {
                    p = this.min + this.ticksFrequency * j
                } else {
                    p = this.max - this.ticksFrequency * j
                }
            } else {
                if ((this.layout === "normal" && this.orientation === "horizontal") || (this.layout === "reverse" && this.orientation === "vertical")) {
                    p = this._min64.add(this._ticksFrequency64.multiply(new a.jqx.math().fromString(j.toString(), 10))).toString()
                } else {
                    p = this._max64.subtract(this._ticksFrequency64.multiply(new a.jqx.math().fromString(j.toString(), 10))).toString()
                }
            }
            var d = this.tickLabelFormatFunction ? this.tickLabelFormatFunction(p) : p;
            r += this._addTick(c, g, j, s, d, l)
        }
        if (this.showMinorTicks) {
            for (var j = 1; j < n; j++) {
                var g = j * k;
                g = Math.floor(g);
                var d = "";
                r += this._addTick(c, g, j, s, d, l, true)
            }
        }
        if ((this.layout === "normal" && this.orientation === "horizontal") || (this.layout === "reverse" && this.orientation === "vertical")) {
            d = this.tickLabelFormatFunction ? this.tickLabelFormatFunction(o) : o
        } else {
            d = this.tickLabelFormatFunction ? this.tickLabelFormatFunction(h) : h
        }
        r += this._addTick(c, f * b, this.max, s, d, l);
        c.append(a(r))
    }, _addTick: function (b, i, n, p, c, j, o) {
        var q = "";
        q = this.toThemeProperty("jqx-slider-tick");
        q += " " + this.toThemeProperty("jqx-fill-state-pressed");
        var e;
        var l = this._getSetting("top");
        var d = "2px";
        var f = this.tickSize;
        if (o) {
            f = this.minorTickSize
        }
        if (b[0] !== this._topTicks[0]) {
            d = p - f - 2 + "px"
        }
        if (this.orientation === "horizontal") {
            e = '<div style="' + l + ": " + d + "; " + this._getSetting("oSize") + ":  " + f + "px; float: left; position:absolute; left:" + i + 'px;" class="' + this.toThemeProperty("jqx-slider-tick-horizontal") + " " + q + '"></div>';
            if (this.showTickLabels) {
                if (b[0] !== this._topTicks[0]) {
                    d = p - f - j.height - 2 + "px"
                } else {
                    d = 2 + f + "px"
                }
                var m = j.width * c.toString().length;
                m = m / 2;
                var k = i - m;
                e += '<div style="' + l + ": " + d + "; float: left; position:absolute; left:" + k + 'px;">' + c + "</div>"
            }
        } else {
            e = '<div style="' + l + ": " + d + "; " + this._getSetting("oSize") + ":  " + f + "px; float: none; position:absolute; top:" + i + 'px;" class="' + this.toThemeProperty("jqx-slider-tick-vertical") + " " + q + '"></div>';
            if (this.showTickLabels) {
                if (b[0] !== this._topTicks[0]) {
                    d = p - f - c.toString().length * j.width - 6 + "px"
                } else {
                    d = 6 + f + "px"
                }
                var g = j.height;
                g = g / 2;
                var k = i - g;
                e += '<div style="' + l + ": " + d + "; float: none; position:absolute; top:" + k + 'px;">' + c + "</div>"
            }
        }
        return e
    }, _addRangeBar: function () {
        if (this._rangeBar === null || this._rangeBar.length < 1) {
            this._rangeBar = a('<div class="' + this.toThemeProperty("jqx-slider-rangebar") + '"></div>');
            this._rangeBar.addClass(this.toThemeProperty("jqx-fill-state-pressed"));
            this._rangeBar.addClass(this.toThemeProperty("jqx-rc-all"));
            this._track.append(this._rangeBar)
        }
        if (!this.showRange) {
            this._rangeBar.css("display", "none")
        } else {
            this._rangeBar.css("display", "block")
        }
        this._thumbSize = this._slider.left.outerWidth()
    }, _getLeftDisplacement: function () {
        if (!this.showButtons) {
            return 0
        }
        if (this.rangeSlider) {
            return 0
        }
        switch (this.buttonsPosition) {
            case"left":
                return this._leftButton[this._getSetting("outerSize")](true) + this._rightButton[this._getSetting("outerSize")](true);
            case"right":
                return 0;
            default:
                return this._leftButton[this._getSetting("outerSize")](true)
        }
        return 0
    }, _performLayout: function () {
        this.host.width(this.width);
        this.host.height(this.height);
        var b = this.host.height();
        if (this._getSetting("size") == "width") {
            b = this.host.width()
        }
        this._performButtonsLayout();
        this._performTrackLayout(b - 1);
        this._contentWrapper[this._getSetting("size")](this._track[this._getSetting("size")]());
        this._contentWrapper[this._getSetting("oSize")](this[this._getSetting("oSize")]);
        this._performTicksLayout();
        this._performRangeBarLayout();
        if (this.rangeSlider) {
            this._slider.left.css("visibility", "visible")
        } else {
            this._slider.left.css("visibility", "hidden")
        }
        this._refreshRangeBar();
        if (this.orientation == "vertical") {
            if (this.showButtons) {
                var c = parseInt((this._leftButton.width() - this._track.width()) / 2);
                this._track.css("margin-left", -3 + c + "px")
            }
        }
    }, _performTrackLayout: function (b) {
        this._track[this._getSetting("size")](b - ((this.showButtons && !this.rangeSlider) ? this._leftButton[this._getSetting("outerSize")](true) + this._rightButton[this._getSetting("outerSize")](true) : 0));
        this._slider.left.css("left", 0);
        this._slider.left.css("top", 0);
        this._slider.right.css("left", 0);
        this._slider.right.css("top", 0)
    }, _performTicksLayout: function () {
        this._performTicksContainerLayout();
        this._addTicks(this._topTicks);
        this._addTicks(this._bottomTicks);
        this._topTicks.css("visibility", "hidden");
        this._bottomTicks.css("visibility", "hidden");
        if ((this.ticksPosition === "top" || this.ticksPosition === "both") && this.showTicks) {
            this._bottomTicks.css("visibility", "visible")
        }
        if ((this.ticksPosition === "bottom" || this.ticksPosition === "both") && this.showTicks) {
            this._topTicks.css("visibility", "visible")
        }
    }, _performTicksContainerLayout: function () {
        var f = this._getSetting("size");
        var e = this._getSetting("oSize");
        var b = this._getSetting("outerOSize");
        this._topTicks[f](this._track[f]());
        this._bottomTicks[f](this._track[f]());
        var d = -2 + (parseInt(this[e]) - this._track[b](true)) / 2;
        this._topTicks[e](parseInt(d));
        var c = -2 + (parseInt(this[e]) - this._track[b](true)) / 2;
        this._bottomTicks[e](parseInt(c));
        if (this.orientation === "vertical") {
            this._topTicks.css("float", "left");
            this._track.css("float", "left");
            this._bottomTicks.css("float", "left")
        } else {
            this._topTicks.css("float", "none");
            this._track.css("float", "none");
            this._bottomTicks.css("float", "none")
        }
    }, _performButtonsLayout: function () {
        this._addButtonsStyles();
        this._addButtonsClasses();
        this._addButtonsHover();
        this._orderButtons();
        this._centerElement(this._rightButton);
        this._centerElement(this._leftButton);
        this._layoutButtons()
    }, _addButtonsStyles: function () {
        this._leftButton.css("background-position", "center");
        this._rightButton.css("background-position", "center");
        if (this.orientation === "vertical") {
            this._leftButton.css("float", "none");
            this._rightButton.css("float", "none")
        } else {
            this._leftButton.css("float", "left");
            this._rightButton.css("float", "left")
        }
    }, _addButtonsClasses: function () {
        var b = {prev: "left", next: "right"};
        if (this.orientation === "vertical") {
            b = {prev: "up", next: "down"}
        }
        this._leftButton.addClass(this.toThemeProperty("jqx-rc-all"));
        this._rightButton.addClass(this.toThemeProperty("jqx-rc-all"));
        this._leftButton.addClass(this.toThemeProperty("jqx-slider-button"));
        this._rightButton.addClass(this.toThemeProperty("jqx-slider-button"));
        this._leftArrow = this._leftButton.find("div");
        this._rightArrow = this._rightButton.find("div");
        this._leftArrow.removeClass(this.toThemeProperty("jqx-icon-arrow-left"));
        this._rightArrow.removeClass(this.toThemeProperty("jqx-icon-arrow-right"));
        this._leftArrow.removeClass(this.toThemeProperty("jqx-icon-arrow-up"));
        this._rightArrow.removeClass(this.toThemeProperty("jqx-icon-arrow-down"));
        this._leftArrow.addClass(this.toThemeProperty("jqx-icon-arrow-" + b.prev));
        this._rightArrow.addClass(this.toThemeProperty("jqx-icon-arrow-" + b.next))
    }, _addButtonsHover: function () {
        var c = this, b = {prev: "left", next: "right"};
        if (this.orientation === "vertical") {
            b = {prev: "up", next: "down"}
        }
        this.addHandler(a(document), "mouseup.arrow" + this.element.id, function () {
            c._leftArrow.removeClass(c.toThemeProperty("jqx-icon-arrow-" + b.prev + "-selected"));
            c._rightArrow.removeClass(c.toThemeProperty("jqx-icon-arrow-" + b.next + "-selected"));
            if (c.sliderTooltip) {
                if (c.sliderTooltipTimer) {
                    clearTimeout(c.sliderTooltipTimer)
                }
                c.sliderTooltipTimer = setTimeout(function () {
                    c.sliderTooltip.fadeOut("fast");
                    c._mouseDown = false
                }, c.tooltipHideDelay)
            } else {
                c._mouseDown = false
            }
        });
        this.addHandler(this._leftButton, "mousedown", function () {
            if (!c.disabled) {
                c._leftArrow.addClass(c.toThemeProperty("jqx-icon-arrow-" + b.prev + "-selected"));
                c._mouseDown = true
            }
        });
        this.addHandler(this._leftButton, "mouseup", function () {
            if (!c.disabled) {
                c._leftArrow.removeClass(c.toThemeProperty("jqx-icon-arrow-" + b.prev + "-selected"))
            }
        });
        this.addHandler(this._rightButton, "mousedown", function () {
            if (!c.disabled) {
                c._rightArrow.addClass(c.toThemeProperty("jqx-icon-arrow-" + b.next + "-selected"));
                c._mouseDown = true
            }
        });
        this.addHandler(this._rightButton, "mouseup", function () {
            if (!c.disabled) {
                c._rightArrow.removeClass(c.toThemeProperty("jqx-icon-arrow-" + b.next + "-selected"))
            }
        });
        this._leftButton.hover(function () {
            if (!c.disabled) {
                c._leftArrow.addClass(c.toThemeProperty("jqx-icon-arrow-" + b.prev + "-hover"))
            }
        }, function () {
            if (!c.disabled) {
                c._leftArrow.removeClass(c.toThemeProperty("jqx-icon-arrow-" + b.prev + "-hover"))
            }
        });
        this._rightButton.hover(function () {
            if (!c.disabled) {
                c._rightArrow.addClass(c.toThemeProperty("jqx-icon-arrow-" + b.next + "-hover"))
            }
        }, function () {
            if (!c.disabled) {
                c._rightArrow.removeClass(c.toThemeProperty("jqx-icon-arrow-" + b.next + "-hover"))
            }
        })
    }, _layoutButtons: function () {
        if (this.orientation === "horizontal") {
            this._horizontalButtonsLayout()
        } else {
            this._verticalButtonsLayout()
        }
    }, _horizontalButtonsLayout: function () {
        var b = (2 + Math.ceil(this.sliderButtonSize / 2));
        if (this.buttonsPosition == "left") {
            this._leftButton.css("margin-right", "0px");
            this._rightButton.css("margin-right", b)
        } else {
            if (this.buttonsPosition == "right") {
                this._leftButton.css("margin-left", 2 + b);
                this._rightButton.css("margin-right", "0px")
            } else {
                this._leftButton.css("margin-right", b);
                this._rightButton.css("margin-left", 2 + b)
            }
        }
    }, _verticalButtonsLayout: function () {
        var c = (2 + Math.ceil(this.sliderButtonSize / 2));
        if (this.buttonsPosition == "left") {
            this._leftButton.css("margin-bottom", "0px");
            this._rightButton.css("margin-bottom", c)
        } else {
            if (this.buttonsPosition == "right") {
                this._leftButton.css("margin-top", 2 + c);
                this._rightButton.css("margin-bottom", "0px")
            } else {
                this._leftButton.css("margin-bottom", c);
                this._rightButton.css("margin-top", 2 + c)
            }
        }
        var b = this._leftButton.css("margin-left");
        this._leftButton.css("margin-left", parseInt(b) - 1);
        this._rightButton.css("margin-left", parseInt(b) - 1)
    }, _orderButtons: function () {
        this._rightButton.detach();
        this._leftButton.detach();
        switch (this.buttonsPosition) {
            case"left":
                this.host.prepend(this._rightButton);
                this.host.prepend(this._leftButton);
                break;
            case"right":
                this.host.append(this._leftButton);
                this.host.append(this._rightButton);
                break;
            case"both":
                this.host.prepend(this._leftButton);
                this.host.append(this._rightButton);
                break
        }
    }, _performRangeBarLayout: function () {
        this._rangeBar[this._getSetting("oSize")](this._track[this._getSetting("oSize")]());
        this._rangeBar[this._getSetting("size")](this._track[this._getSetting("size")]());
        this._rangeBar.css("position", "absolute");
        this._rangeBar.css("left", 0);
        this._rangeBar.css("top", 0)
    }, _centerElement: function (c) {
        var b = -1 + (a(c.parent())[this._getSetting("oSize")]() - c[this._getSetting("outerOSize")]()) / 2;
        c.css("margin-" + [this._getSetting("left")], 0);
        c.css("margin-" + [this._getSetting("top")], b);
        return c
    }, _raiseEvent: function (f, c) {
        var d = this._events[f];
        var e = new a.Event(d);
        if (this._triggerEvents === false) {
            return true
        }
        e.args = c;
        if (f === 1) {
            e.args.cancel = false;
            this._slideEvent = e
        }
        this._lastValue[f] = c.value;
        e.owner = this;
        var b = this.host.trigger(e);
        return b
    }, _initialSettings: function () {
        if (this.int64 === false) {
            if (this.rangeSlider) {
                if (typeof this.value !== "number") {
                    this.setValue(this.value)
                } else {
                    this.setValue(this.values)
                }
            } else {
                if (this.value == undefined) {
                    this.value = 0
                }
                this.setValue(this.value)
            }
        } else {
            if (this.rangeSlider === false || Array.isArray(this._value64) === true) {
                this.setValue(this._value64)
            } else {
                this.setValue(this._values64)
            }
        }
        if (this.disabled) {
            this.disable()
        }
    }, _addEventHandlers: function () {
        var b = this;
        this.addHandler(this._slider.right, this._getEvent("mousedown"), this._startDrag, {self: this});
        this.addHandler(this._slider.left, this._getEvent("mousedown"), this._startDrag, {self: this});
        this.addHandler(a(document), this._getEvent("mouseup") + "." + this.element.id, function () {
            b._stopDrag()
        });
        try {
            if (document.referrer != "" || window.frameElement) {
                if (window.top != null && window.top != window.self) {
                    var d = function (g) {
                        b._stopDrag()
                    };
                    var f = null;
                    if (window.parent && document.referrer) {
                        f = document.referrer
                    }
                    if (f && f.indexOf(document.location.host) != -1) {
                        if (window.top.document) {
                            if (window.top.document.addEventListener) {
                                window.top.document.addEventListener("mouseup", d, false)
                            } else {
                                if (window.top.document.attachEvent) {
                                    window.top.document.attachEvent("onmouseup", d)
                                }
                            }
                        }
                    }
                }
            }
        } catch (c) {
        }
        this.addHandler(a(document), this._getEvent("mousemove") + "." + this.element.id, this._performDrag, {self: this});
        var e = this;
        this.addHandler(this._slider.left, "mouseenter", function () {
            if (!e.disabled) {
                b._slider.left.addClass(b.toThemeProperty("jqx-fill-state-hover"))
            }
        });
        this.addHandler(this._slider.right, "mouseenter", function () {
            if (!e.disabled) {
                b._slider.right.addClass(b.toThemeProperty("jqx-fill-state-hover"))
            }
        });
        this.addHandler(this._slider.left, "mouseleave", function () {
            if (!e.disabled) {
                b._slider.left.removeClass(b.toThemeProperty("jqx-fill-state-hover"))
            }
        });
        this.addHandler(this._slider.right, "mouseleave", function () {
            if (!e.disabled) {
                b._slider.right.removeClass(b.toThemeProperty("jqx-fill-state-hover"))
            }
        });
        this.addHandler(this._slider.left, "mousedown", function () {
            if (!e.disabled) {
                b._slider.left.addClass(b.toThemeProperty("jqx-fill-state-pressed"))
            }
        });
        this.addHandler(this._slider.right, "mousedown", function () {
            if (!e.disabled) {
                b._slider.right.addClass(b.toThemeProperty("jqx-fill-state-pressed"))
            }
        });
        this.addHandler(this._slider.left, "mouseup", function () {
            if (!e.disabled) {
                b._slider.left.removeClass(b.toThemeProperty("jqx-fill-state-pressed"))
            }
        });
        this.addHandler(this._slider.right, "mouseup", function () {
            if (!e.disabled) {
                b._slider.right.removeClass(b.toThemeProperty("jqx-fill-state-pressed"))
            }
        });
        this.addHandler(this._leftButton, this._getEvent("click"), this._leftButtonHandler, {self: this});
        this.addHandler(this._rightButton, this._getEvent("click"), this._rightButtonHandler, {self: this});
        this.addHandler(this._track, this._getEvent("mousedown"), this._trackMouseDownHandler, {self: this});
        this.addHandler(this.host, "focus", function () {
            b._track.addClass(b.toThemeProperty("jqx-fill-state-focus"));
            b._leftButton.addClass(b.toThemeProperty("jqx-fill-state-focus"));
            b._rightButton.addClass(b.toThemeProperty("jqx-fill-state-focus"));
            b._slider.right.addClass(b.toThemeProperty("jqx-fill-state-focus"));
            b._slider.left.addClass(b.toThemeProperty("jqx-fill-state-focus"))
        });
        this.addHandler(this.host, "blur", function () {
            b._leftButton.removeClass(b.toThemeProperty("jqx-fill-state-focus"));
            b._rightButton.removeClass(b.toThemeProperty("jqx-fill-state-focus"));
            b._track.removeClass(b.toThemeProperty("jqx-fill-state-focus"));
            b._slider.right.removeClass(b.toThemeProperty("jqx-fill-state-focus"));
            b._slider.left.removeClass(b.toThemeProperty("jqx-fill-state-focus"))
        });
        this.element.onselectstart = function () {
            return false
        };
        this._addMouseWheelListeners();
        this._addKeyboardListeners()
    }, _addMouseWheelListeners: function () {
        var b = this;
        this.addHandler(this.host, "mousewheel", function (d) {
            if (b.disabled) {
                return true
            }
            if (document.activeElement && !a(document.activeElement).ischildof(b.host)) {
                return true
            }
            var c = d.wheelDelta;
            if (d.originalEvent && d.originalEvent.wheelDelta) {
                d.wheelDelta = d.originalEvent.wheelDelta
            }
            if (!("wheelDelta" in d)) {
                c = d.detail * -40
            }
            if (c > 0) {
                b.incrementValue()
            } else {
                b.decrementValue()
            }
            d.preventDefault()
        })
    }, _addKeyboardListeners: function () {
        var b = this;
        this.addHandler(this.host, "keydown", function (c) {
            switch (c.keyCode) {
                case 40:
                case 37:
                    if (b.layout == "normal" && !b.rtl) {
                        b.decrementValue()
                    } else {
                        b.incrementValue()
                    }
                    return false;
                case 38:
                case 39:
                    if (b.layout == "normal" && !b.rtl) {
                        b.incrementValue()
                    } else {
                        b.decrementValue()
                    }
                    return false;
                case 36:
                    if (b.rangeSlider) {
                        b.setValue([b.values[0], b.max])
                    } else {
                        b.setValue(b.min)
                    }
                    return false;
                case 35:
                    if (b.rangeSlider) {
                        b.setValue([b.min, b.values[1]])
                    } else {
                        b.setValue(b.max)
                    }
                    return false
            }
        })
    }, _trackMouseDownHandler: function (b) {
        var e = a.jqx.mobile.getTouches(b);
        var d = e[0];
        var i = b.data.self, b = (i._isTouchDevice) ? d : b, f = i._track.coord()[i._getSetting("left")], h = b[i._getSetting("page")] - i._slider.left[i._getSetting("size")]() / 2, c = i._getClosest(h), j = parseInt(i._track[i._getSetting("size")]());
        var g = i._getValueByPosition(h);
        i._mouseDown = true;
        i._setValue(g, c);
        if (i.input) {
            a.jqx.aria(i, "aria-valuenow", i.input.val())
        }
    }, _getClosest: function (b) {
        if (!this.rangeSlider) {
            return this._slider.right
        } else {
            b = b - this._track.coord()[this._getSetting("left")] - this._slider.left[this._getSetting("size")]() / 2;
            if (Math.abs(parseInt(this._slider.left.css(this._getSetting("left")), 10) - b) < Math.abs(parseInt(this._slider.right.css(this._getSetting("left")), 10) - b)) {
                return this._slider.left
            } else {
                return this._slider.right
            }
        }
    }, _removeEventHandlers: function () {
        this.removeHandler(this._slider.right, this._getEvent("mousedown"), this._startDrag);
        this.removeHandler(this._slider.left, this._getEvent("mousedown"), this._startDrag);
        this.removeHandler(a(document), this._getEvent("mouseup") + "." + this.host.attr("id"), this._stopDrag);
        this.removeHandler(a(document), this._getEvent("mousemove") + "." + this.host.attr("id"), this._performDrag);
        this.removeHandler(this._leftButton, this._getEvent("click"), this._leftButtonHandler);
        this.removeHandler(this._rightButton, this._getEvent("click"), this._rightButtonHandler);
        this.removeHandler(this._track, this._getEvent("mousedown"), this._trackMouseDownHandler);
        this.element.onselectstart = null;
        this.removeHandler(this.host, this._getEvent("mousewheel"));
        this.removeHandler(this.host, this._getEvent("keydown"))
    }, _rightButtonClick: function () {
        if (this.orientation == "horizontal" && !this.rtl) {
            this.incrementValue()
        } else {
            this.decrementValue()
        }
    }, _leftButtonClick: function () {
        if (this.orientation == "horizontal" && !this.rtl) {
            this.decrementValue()
        } else {
            this.incrementValue()
        }
    }, _rightButtonHandler: function (c) {
        var b = c.data.self;
        if (b.layout == "normal") {
            b._rightButtonClick()
        } else {
            b._leftButtonClick()
        }
        return false
    }, _leftButtonHandler: function (c) {
        var b = c.data.self;
        if (b.layout == "normal") {
            b._leftButtonClick()
        } else {
            b._rightButtonClick()
        }
        return false
    }, _startDrag: function (d) {
        var e = a.jqx.mobile.getTouches(d);
        var f = e[0];
        var c = d.data.self;
        c._capturedElement = a(d.target);
        c._startX = a(d.target).coord().left;
        c._startY = a(d.target).coord().top;
        var b = a.jqx.position(d);
        c._mouseStartX = b.left;
        c._mouseStartY = b.top;
        c._mouseDown = true;
        if (c.tooltip) {
            c._showTooltip(c._capturedElement, c.value)
        }
        if (c._isTouchDevice) {
            return false
        }
    }, _stopDrag: function () {
        var b = this;
        if (b._slideStarted) {
            b._raiseEvent(2, {value: b.getValue()})
        }
        if (!b._slideStarted || b._capturedElement == null) {
            b._capturedElement = null;
            return
        }
        if (this.input) {
            a.jqx.aria(this, "aria-valuenow", this.input.val())
        }
        b._slider.left.removeClass(b.toThemeProperty("jqx-fill-state-pressed"));
        b._slider.right.removeClass(b.toThemeProperty("jqx-fill-state-pressed"));
        b._slideStarted = false;
        b._capturedElement = null;
        if (b.sliderTooltip) {
            b.sliderTooltip.fadeOut("fast")
        }
    }, _performDrag: function (d) {
        var c = d.data.self;
        if (c._capturedElement !== null) {
            var f = a.jqx.mobile.getTouches(d);
            var g = f[0];
            if (d.which === 0 && a.jqx.browser.msie && a.jqx.browser.version < 9) {
                c._stopDrag();
                return false
            }
            var b = a.jqx.position(d);
            var e = c.orientation == "horizontal" ? b.left : b.top;
            c._isDragged(e);
            if (c._slideStarted || c._isTouchDevice) {
                return c._dragHandler(e)
            }
        }
    }, _isDragged: function (b) {
        if (Math.abs(b - this[this._getSetting("mouse")]) > 2 && !this._slideStarted) {
            this._slideStarted = true;
            if (this._valueChanged(3)) {
                this._raiseEvent(3, {value: this.getValue()})
            }
        } else {
            if (this._capturedElement === null) {
                this._slideStarted = false
            }
        }
    }, _dragHandler: function (b) {
        b = (b - this[this._getSetting("mouse")]) + this[this._getSetting("start")];
        var c = this._getValueByPosition(b);
        if (this.rangeSlider) {
            var d = this._slider.right, f = this._slider.left;
            var e = this._getSetting("left");
            if (this._capturedElement[0] === f[0]) {
                if (parseFloat(b) > d.coord()[e]) {
                    b = d.coord()[e]
                }
            } else {
                if (parseFloat(b) < f.coord()[e]) {
                    b = f.coord()[e]
                }
            }
        }
        this._setValue(c, this._capturedElement, b);
        return false
    }, _getValueByPosition: function (b) {
        if (this.mode === "default") {
            return this._getFloatingValueByPosition(b)
        } else {
            return this._getFixedValueByPosition(b)
        }
    }, _getFloatingValueByPosition: function (b) {
        var c = b - this._track.coord()[this._getSetting("left")] + this._slider.left.width() / 2, g = c / this._track[this._getSetting("size")](), h;
        if (c < 0) {
            c = 0
        }
        if (this.int64 === false) {
            h = (this.max - this.min) * g + this.min
        } else {
            var f = new a.jqx.math().fromNumber(this._track[this._getSetting("size")](), 10);
            var d = this._max64.subtract(this._min64);
            var e = Math.round(this._divide64(d, f) * c);
            h = new a.jqx.math().fromNumber(e, 10).add(this._min64)
        }
        if (this.layout == "normal") {
            if (this.orientation === "horizontal" && !this.rtl) {
                return h
            } else {
                return(this.max + this.min) - h
            }
        } else {
            if (this.orientation === "horizontal" && !this.rtl) {
                if (this.int64 === false) {
                    return(this.max + this.min) - h
                } else {
                    return(this._max64.add(this._min64)).subtract(h)
                }
            } else {
                return h
            }
        }
    }, _getThumbSize: function () {
        if (this.__thumbSize) {
            return this.__thumbSize
        }
        var b = this._slider.left[this._getSetting("size")]();
        this.__thumbSize = b;
        return b
    }, _getTrackSize: function () {
        if (this.__trackSize) {
            return this.__trackSize
        }
        var b = this._track[this._getSetting("size")]();
        this.__trackSize = b;
        return b
    }, _getFixedValueByPosition: function (f) {
        var i = this._getTrackSize(), d = this._getThumbSize(), k = {number: -1, distance: Number.MAX_VALUE}, c, h, g, j;
        if (this.int64 === false) {
            c = this.step;
            g = (this.max - this.min) / c;
            h = (i) / g;
            j = this._track.coord()[this._getSetting("left")] - d / 2;
            for (var e = this.min; e <= this.max + this.step; e += this.step) {
                if (Math.abs(k.distance - f) > Math.abs(j - f)) {
                    k.distance = j;
                    k.number = e
                }
                j += h
            }
        } else {
            c = this._step64;
            g = (this._max64.subtract(this._min64)).div(this._step64);
            h = new a.jqx.math().fromNumber(i, 10).div(g).toNumber();
            j = this._track.coord()[this._getSetting("left")] - d / 2;
            k = {number: new a.jqx.math().fromString(this._min64.toString(), 10), distance: j};
            for (var b = new a.jqx.math().fromString(this._min64.toString(), 10); b.lessThanOrEqual(this._max64.add(this._step64)); b = b.add(this._step64)) {
                if (Math.abs(k.distance - f) > Math.abs(j - f)) {
                    k.distance = j;
                    k.number = new a.jqx.math().fromString(b.toString(), 10)
                }
                j += h
            }
        }
        if (this.layout == "normal") {
            if (this.orientation === "horizontal" && !this.rtl) {
                return k.number
            } else {
                return(this.max + this.min) - k.number
            }
        } else {
            if (this.orientation === "horizontal" && !this.rtl) {
                return(this.max + this.min) - k.number
            } else {
                return k.number
            }
        }
    }, _setValue: function (e, d, b) {
        if (!this._slideEvent || !this._slideEvent.args.cancel) {
            e = this._handleValue(e, d);
            this._setSliderPosition(e, d, b);
            this._fixZIndexes();
            if (this._valueChanged(1)) {
                var c = this._raiseEvent(1, {value: this.getValue()})
            }
            if (this._valueChanged(0)) {
                this._raiseEvent(0, {value: this.getValue()})
            }
            if (this.input) {
                if (!this.rangeSlider) {
                    this.input.val(this.value.toString())
                } else {
                    if (this.values) {
                        if (this.value.rangeEnd != undefined && this.value.rangeStart != undefined) {
                            this.input.val(this.value.rangeStart.toString() + "-" + this.value.rangeEnd.toString())
                        }
                    }
                }
            }
        }
    }, _valueChanged: function (c) {
        var b = this.getValue();
        return(!this.rangeSlider && this._lastValue[c] !== b) || (this.rangeSlider && (typeof this._lastValue[c] !== "object" || parseFloat(this._lastValue[c].rangeEnd) !== parseFloat(b.rangeEnd) || parseFloat(this._lastValue[c].rangeStart) !== parseFloat(b.rangeStart)))
    }, _handleValue: function (c, b) {
        c = this._validateValue(c, b);
        if (b[0] === this._slider.left[0]) {
            this.values[0] = this.int64 ? c.toString() : c;
            if (this.int64 === true) {
                this._value64[0] = c
            }
        }
        if (b[0] === this._slider.right[0]) {
            this.values[1] = this.int64 ? c.toString() : c;
            if (this.int64 === true) {
                this._values64[1] = c
            }
        }
        if (this.rangeSlider) {
            this.value = {rangeStart: this.values[0], rangeEnd: this.values[1]};
            if (this.int64 === true) {
                this._value64 = {rangeStart: this._values64[0], rangeEnd: this._values64[1]}
            }
        } else {
            if (this.int64 === false) {
                this.value = c
            } else {
                this.value = c.toString();
                this._value64 = c
            }
        }
        return c
    }, _fixZIndexes: function () {
        if (this.values[1] - this.values[0] < 0.5 && this.max - this.values[0] < 0.5) {
            this._slider.left.css("z-index", 20);
            this._slider.right.css("z-index", 15)
        } else {
            this._slider.left.css("z-index", 15);
            this._slider.right.css("z-index", 20)
        }
    }, _refreshRangeBar: function () {
        var e = this._getSetting("left");
        var c = this._getSetting("size");
        var d = this.rtl && this.orientation == "horizontal";
        if (this.layout == "normal") {
            var b = this._slider.left.position()[e];
            if (this.orientation === "vertical" || d) {
                b = this._slider.right.position()[e]
            }
        } else {
            var b = this._slider.right.position()[e];
            if (this.orientation === "vertical" || d) {
                var b = this._slider.left.position()[e]
            }
        }
        this._rangeBar.css(e, b + this._slider.left[c]() / 2);
        this._rangeBar[c](Math.abs(this._slider.right.position()[e] - this._slider.left.position()[e]))
    }, _validateValue: function (c, b) {
        if (this.int64 === false) {
            if (c > this.max) {
                c = this.max
            }
            if (c < this.min) {
                c = this.min
            }
            if (this.rangeSlider) {
                if (b[0] === this._slider.left[0]) {
                    if (c >= this.values[1]) {
                        c = this.values[1]
                    }
                } else {
                    if (c <= this.values[0]) {
                        c = this.values[0]
                    }
                }
            }
        } else {
            if (c.greaterThan(this._max64)) {
                c = this._max64
            }
            if (c.lessThan(this._min64)) {
                c = this._min64
            }
        }
        return c
    }, _setSliderPosition: function (h, c, b) {
        var f = this._track[this._getSetting("size")](), e, i;
        if (b) {
            b -= this._track.coord()[this._getSetting("left")]
        }
        if (this.int64) {
            if (typeof h === "number") {
                h = new a.jqx.math().fromNumber(h, 10)
            } else {
                if (typeof h === "string") {
                    h = new a.jqx.math().fromString(h, 10)
                }
            }
            if (h.greaterThan(this._max64)) {
                h = new a.jqx.math().fromString(this._max64.toString(), 10)
            }
            if (h.lessThan(this._min64)) {
                h = new a.jqx.math().fromString(this._min64.toString(), 10)
            }
            var g = this._divide64(h.subtract(this._min64), this._max64.subtract(this._min64));
            var d = 1 - g;
            if (this.layout == "normal") {
                var e = g;
                if (this.orientation != "horizontal" || (this.orientation == "horizontal" && this.rtl)) {
                    e = d
                }
            } else {
                var e = d;
                if (this.orientation != "horizontal" || (this.orientation == "horizontal" && this.rtl)) {
                    e = g
                }
            }
            i = f * e - this._slider.left[this._getSetting("size")]() / 2;
            c.css(this._getSetting("left"), i)
        } else {
            if (this.layout == "normal") {
                var e = (h - this.min) / (this.max - this.min);
                if (this.orientation != "horizontal" || (this.orientation == "horizontal" && this.rtl)) {
                    e = 1 - ((h - this.min) / (this.max - this.min))
                }
            } else {
                var e = 1 - ((h - this.min) / (this.max - this.min));
                if (this.orientation != "horizontal" || (this.orientation == "horizontal" && this.rtl)) {
                    e = (h - this.min) / (this.max - this.min)
                }
            }
            i = f * e - this._slider.left[this._getSetting("size")]() / 2;
            c.css(this._getSetting("left"), i)
        }
        if (this.tooltip) {
            this._showTooltip(c, this.value)
        }
        this._refreshRangeBar()
    }, _divide64: function (e, b) {
        var h, j, c, k, m;
        h = e.toString();
        c = b.toString();
        if (c.length > 15) {
            var l = c.length - 15;
            c = c.slice(0, 15) + "." + c.slice(15);
            k = parseFloat(c);
            if (h.length > l) {
                var g = h.length - l;
                h = h.slice(0, g) + "." + h.slice(g)
            } else {
                if (h.length === l) {
                    h = "0." + h
                } else {
                    var f = "0.";
                    for (var d = 0; d < l - h.length; d++) {
                        f += "0"
                    }
                    h = f + "" + h
                }
            }
            j = parseFloat(h)
        } else {
            j = e.toNumber();
            k = b.toNumber()
        }
        m = j / k;
        return m
    }, _showTooltip: function (s, n) {
        var g = this;
        if (g._slideStarted || g._capturedElement != null || g._mouseDown) {
            if (g.tooltipFormatFunction) {
                n = g.tooltipFormatFunction(n)
            } else {
                if (g.mode === "default") {
                    n = new Number(n).toFixed(2)
                }
            }
            if (!g.toolTipCreated) {
                var c = "tooltip" + g.element.id;
                var d = a('<div id="' + c + '"><div id ="' + c + 'Main"><div id="' + c + 'Text"></div></div><div id="' + c + 'Arrow"></div></div>');
                d.css("visibility", "hidden");
                d.css("display", "none");
                d.css("z-index", 99999);
                d.css("box-shadow", "none");
                g.sliderTooltip = d;
                g.sliderTooltip.appendTo(a(document.body));
                a("#" + c + "Text").html(n);
                var l = "#" + c;
                var h = a(l + "Main");
                var p = a(l + "Text");
                var q = a(l + "Arrow");
                h.addClass(g.toThemeProperty("jqx-widget"));
                p.addClass(g.toThemeProperty("jqx-widget"));
                q.addClass(g.toThemeProperty("jqx-widget"));
                h.addClass(g.toThemeProperty("jqx-fill-state-normal"));
                p.addClass(g.toThemeProperty("jqx-fill-state-normal"));
                q.addClass(g.toThemeProperty("jqx-fill-state-normal"));
                a(l).addClass(g.toThemeProperty("jqx-tooltip"));
                a(l).addClass(g.toThemeProperty("jqx-popup"));
                h.addClass(g.toThemeProperty("jqx-tooltip-main"));
                p.addClass(g.toThemeProperty("jqx-tooltip-text"));
                q.addClass(g.toThemeProperty("jqx-tooltip-arrow"));
                g.sliderTooltipContent = p;
                g.sliderTooltipArrow = q;
                g.sliderTooltipMain = h;
                g.arrow_size = 5;
                g.toolTipCreated = true;
                if (g.rangeSlider) {
                    g.sliderTooltipArrow.css("visibility", "hidden")
                }
            }
            var j = s.coord();
            g.sliderTooltip[0].style.display = "block";
            g.sliderTooltip[0].style.visibility = "visible";
            var k = g.sliderButtonSize + g.tickSize;
            if (!g.rangeSlider) {
                g.sliderTooltipContent[0].innerHTML = n
            } else {
                var o = g.value ? g.value.rangeStart : "";
                var b = g.value ? g.value.rangeEnd : "";
                if (o !== "") {
                    g.sliderTooltipContent[0].innerHTML = o + " - " + b
                } else {
                    g.sliderTooltip[0].style.display = "none";
                    g.sliderTooltip[0].style.visibility = "hidden"
                }
            }
            var r = g.sliderTooltip.width();
            if (g.orientation == "horizontal") {
                var f = j.left + g.sliderButtonSize / 2 - r / 2;
                if (g.rangeSlider) {
                    var e = (g._slider.right.coord().left - g._slider.left.coord().left - g._thumbSize) / 2;
                    f = g._slider.left.coord().left - r / 2 + e + g._thumbSize
                }
                switch (g.tooltipPosition) {
                    case"far":
                        var i = j.top + k + g.arrow_size;
                        g.sliderTooltip.offset({top: i, left: f});
                        g.sliderTooltipArrow.addClass(g.toThemeProperty("jqx-tooltip-arrow-t-b"));
                        g.sliderTooltipArrow.css({"border-width": "0 " + g.arrow_size + "px " + g.arrow_size + "px"});
                        g.sliderTooltipArrow.offset({top: i - g.arrow_size, left: f - g.arrow_size / 2 - 1 + r / 2});
                        break;
                    case"near":
                        var i = j.top - g.arrow_size - g.sliderTooltip.height() - 1;
                        g.sliderTooltip.offset({top: i, left: f});
                        g.sliderTooltipArrow.addClass(g.toThemeProperty("jqx-tooltip-arrow-t-b"));
                        g.sliderTooltipArrow.css({"border-width": g.arrow_size + "px " + g.arrow_size + "px  0px"});
                        g.sliderTooltipArrow.offset({top: i + g.sliderTooltip.height(), left: f - g.arrow_size / 2 - 1 + r / 2});
                        break
                }
            } else {
                var m = g.sliderTooltip.height();
                var f = j.left - r - g.arrow_size - g.tickSize;
                var i = j.top + g._thumbSize / 2 - m / 2 - 1;
                if (g.rangeSlider) {
                    var e = (g._slider.right.coord().top - g._slider.left.coord().top - g._thumbSize) / 2;
                    i = g._slider.left.coord().top - m / 2 + e + g._thumbSize
                }
                switch (g.tooltipPosition) {
                    case"far":
                        var f = j.left + g._thumbSize + g.arrow_size + g.tickSize;
                        g.sliderTooltip.offset({top: i, left: f});
                        g.sliderTooltipArrow.addClass(g.toThemeProperty("jqx-tooltip-arrow-l-r"));
                        g.sliderTooltipArrow.css({"border-width": g.arrow_size + "px " + g.arrow_size + "px " + g.arrow_size + "px 0px"});
                        g.sliderTooltipArrow.offset({top: i + g.sliderTooltip.height() / 2 - g.arrow_size / 2 - 2, left: f - g.arrow_size});
                        break;
                    case"near":
                        g.sliderTooltip.offset({top: i, left: f});
                        g.sliderTooltipArrow.addClass(g.toThemeProperty("jqx-tooltip-arrow-l-r"));
                        g.sliderTooltipArrow.css({"border-width": g.arrow_size + "px 0px " + g.arrow_size + "px " + g.arrow_size + "px"});
                        g.sliderTooltipArrow.offset({top: i + g.sliderTooltip.height() / 2 - g.arrow_size / 2 - 2, left: f + r + 2});
                        break
                }
            }
        }
    }, _validateDropPosition: function (e, b) {
        var c = this._track[this._getSetting("size")](), d = b[this._getSetting("size")]();
        if (e < -d / 2) {
            e = -d / 2
        }
        if (e > c - d / 2) {
            e = c - d / 2
        }
        return Math.floor(e)
    }, propertyChangedHandler: function (b, c, f, e) {
        b.__trackSize = null;
        b.__thumbSize = null;
        switch (c) {
            case"theme":
                a.jqx.utilities.setTheme(f, e, b.host);
                b._leftButton.jqxRepeatButton({theme: e});
                b._rightButton.jqxRepeatButton({theme: e});
                break;
            case"disabled":
                if (e) {
                    b.disabled = true;
                    b.disable()
                } else {
                    b.disabled = false;
                    b.enable()
                }
                break;
            case"width":
            case"height":
                b.__trackSize = null;
                b.__thumbSize = null;
                b._performLayout();
                b._initialSettings();
                break;
            case"min":
            case"max":
                b._performLayout();
                b.__trackSize = null;
                b.__thumbSize = null;
                if (b.int64 === true) {
                    b["_" + c + "64"] = new a.jqx.math().fromString(e.toString(), 10)
                }
                b._initialSettings();
                break;
            case"showTicks":
            case"ticksPosition":
            case"tickSize":
                b._performLayout();
                b._initialSettings();
                break;
            case"ticksFrequency":
            case"minorTicksFrequency":
                if (b.int64 === true) {
                    b["_" + c + "64"] = new a.jqx.math().fromString(e.toString(), 10)
                }
                b._performLayout();
                b._initialSettings();
                break;
            case"showRange":
            case"showButtons":
            case"orientation":
            case"rtl":
                b._render();
                b._performLayout();
                b._initialSettings();
                break;
            case"buttonsPosition":
                b._refresh();
                break;
            case"rangeSlider":
                if (!e) {
                    b.value = b.value.rangeEnd
                } else {
                    b.value = {rangeEnd: b.value, rangeStart: b.value}
                }
                b._render();
                b._performLayout();
                b._initialSettings();
                break;
            case"value":
                var g = e;
                if (b.int64 === true) {
                    g = new a.jqx.math().fromString(e.toString(), 10);
                    b._value64 = g
                } else {
                    if (!b.rangeSlider) {
                        b.value = parseFloat(e)
                    }
                }
                b.setValue(g);
                break;
            case"values":
                var d = e;
                if (b.int64 === true) {
                    d = [new a.jqx.math().fromString(e[0].toString(), 10), new a.jqx.math().fromString(e[1].toString(), 10)];
                    b._values64 = d
                }
                b.setValue(d);
                break;
            case"tooltip":
                break;
            case"step":
                b._step64 = new a.jqx.math().fromString(e.toString(), 10);
                break;
            default:
                b._refresh()
        }
    }, incrementValue: function (b) {
        if (this.int64 === false) {
            if (b == undefined || isNaN(parseFloat(b))) {
                b = this.step
            }
            if (this.rangeSlider) {
                if (this.values[1] < this.max) {
                    this._setValue(this.values[1] + b, this._slider.right)
                }
            } else {
                if (this.values[1] >= this.min && this.values[1] < this.max) {
                    this._setValue(this.values[1] + b, this._slider.right)
                }
            }
        } else {
            if (b == undefined || isNaN(parseFloat(b))) {
                b = this._step64
            } else {
                b = new a.jqx.math().fromString(b.toString(), 10)
            }
            var c = this._values64[1].add(b);
            if (c.lessThan(this._values64[1])) {
                c = this._max64
            }
            if (this.rangeSlider) {
                if (this._values64[1].lessThan(this._max64)) {
                    this._setValue(c, this._slider.right)
                }
            } else {
                if (this._values64[1].greaterThanOrEqual(this._min64) && this._values64[1].lessThan(this._max64)) {
                    this._setValue(c, this._slider.right)
                }
            }
        }
        if (this.input) {
            a.jqx.aria(this, "aria-valuenow", this.input.val())
        }
    }, decrementValue: function (b) {
        if (this.int64 === false) {
            if (b == undefined || isNaN(parseFloat(b))) {
                b = this.step
            }
            if (this.rangeSlider) {
                if (this.values[0] > this.min) {
                    this._setValue(this.values[0] - b, this._slider.left)
                }
            } else {
                if (this.values[1] <= this.max && this.values[1] > this.min) {
                    this._setValue(this.values[1] - b, this._slider.right)
                }
            }
        } else {
            if (b == undefined || isNaN(parseFloat(b))) {
                b = this._step64
            } else {
                b = new a.jqx.math().fromString(b.toString(), 10)
            }
            var c;
            if (this.rangeSlider) {
                c = this._values64[0].subtract(b);
                if (c.greaterThan(this._values64[0])) {
                    c = this._min64
                }
                if (this._values64[0].greaterThan(this._min64)) {
                    this._setValue(c, this._slider.left)
                }
            } else {
                c = this._values64[1].subtract(b);
                if (c.greaterThan(this._values64[1])) {
                    c = this._min64
                }
                if (this._values64[1].lessThanOrEqual(this._max64) && this._values64[1].greaterThan(this._min64)) {
                    this._setValue(c, this._slider.right)
                }
            }
        }
        if (this.input) {
            a.jqx.aria(this, "aria-valuenow", this.input.val())
        }
    }, val: function (b) {
        if (arguments.length == 0 || (!a.isArray(b) && typeof(b) == "object")) {
            return this.getValue()
        }
        if (this.int64 === false) {
            this.setValue(b)
        } else {
            value64 = new a.jqx.math().fromString(b.toString(), 10);
            this.setValue(value64)
        }
    }, setValue: function (e) {
        if (this.rangeSlider) {
            var c, b;
            if (arguments.length < 2) {
                if (e instanceof Array) {
                    c = e[0];
                    b = e[1]
                } else {
                    if (typeof e === "object" && typeof e.rangeStart !== "undefined" && typeof e.rangeEnd !== "undefined") {
                        c = e.rangeStart;
                        b = e.rangeEnd
                    }
                }
            } else {
                c = arguments[0];
                b = arguments[1]
            }
            this._triggerEvents = false;
            this._setValue(b, this._slider.right);
            this._triggerEvents = true;
            this._setValue(c, this._slider.left)
        } else {
            this._triggerEvents = false;
            var d = this.int64 ? this._min64 : this.min;
            this._setValue(d, this._slider.left);
            this._triggerEvents = true;
            this._setValue(e, this._slider.right)
        }
        if (this.input) {
            a.jqx.aria(this, "aria-valuenow", this.input.val())
        }
    }, getValue: function () {
        var b = this.value;
        if (this.int64 === true) {
            b = this._value64.toString()
        }
        return b
    }, _enable: function (b) {
        if (b) {
            this._addEventHandlers();
            this.disabled = false;
            this.host.removeClass(this.toThemeProperty("jqx-fill-state-disabled"))
        } else {
            this._removeEventHandlers();
            this.disabled = true;
            this.host.addClass(this.toThemeProperty("jqx-fill-state-disabled"))
        }
        this._leftButton.jqxRepeatButton({disabled: this.disabled});
        this._rightButton.jqxRepeatButton({disabled: this.disabled})
    }, disable: function () {
        this._enable(false);
        a.jqx.aria(this, "aria-disabled", true)
    }, enable: function () {
        this._enable(true);
        a.jqx.aria(this, "aria-disabled", false)
    }})
})(jqxBaseFramework);