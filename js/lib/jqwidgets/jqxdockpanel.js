/*
 jQWidgets v3.8.2 (2015-Aug)
 Copyright (c) 2011-2015 jQWidgets.
 License: http://jqwidgets.com/license/
 */

(function (a) {
    a.jqx.jqxWidget("jqxDockPanel", "", {});
    a.extend(a.jqx._jqxDockPanel.prototype, {defineInstance: function () {
        var b = {width: null, height: null, lastchildfill: true, disabled: false, events: ["layout"]};
        a.extend(true, this, b);
        return b
    }, createInstance: function (c) {
        var b = this;
        this.host.addClass(this.toThemeProperty("jqx-dockpanel"));
        this.host.addClass(this.toThemeProperty("jqx-rc-all"));
        this.childrenCount = a(this.host).children().length;
        this.host.wrapInner('<div style="overflow: hidden; width: 100%; height: 100%;" class="innerContainer"></div>');
        this.$wrapper = this.host.find(".innerContainer");
        this.$wrapper.css("position", "relative");
        this.sizeCache = new Array();
        this.performLayout();
        a.jqx.utilities.resize(this.host, function () {
            b.refresh()
        })
    }, render: function () {
        if (this.width != null && this.width.toString().indexOf("px") != -1) {
            this.host.width(this.width)
        } else {
            if (this.width != undefined && !isNaN(this.width)) {
                this.host.width(this.width)
            }
        }
        if (this.height != null && this.height.toString().indexOf("px") != -1) {
            this.host.height(this.height)
        } else {
            if (this.height != undefined && !isNaN(this.height)) {
                this.host.height(this.height)
            }
        }
        this.sizeCache = new Array();
        this.performLayout()
    }, resize: function (c, b) {
        this.width = c;
        this.height = b;
        this.render()
    }, performLayout: function () {
        if (this.disabled) {
            return
        }
        var e = this.childrenCount;
        var d = 0;
        var c = 0;
        var b = 0;
        var h = 0;
        var f = this;
        var g = {width: this.host.width(), height: this.host.height()};
        if (this.sizeCache.length < this.$wrapper.children().length) {
            a.each(this.$wrapper.children(), function (i) {
                var k = a(this);
                k.css("position", "absolute");
                var j = {width: k.css("width"), height: k.css("height")};
                f.sizeCache[i] = j
            })
        }
        a.each(this.$wrapper.children(), function (j) {
            var l = this.getAttribute("dock");
            if (l == undefined) {
                l = "left"
            }
            if (j == e - 1 && f.lastchildfill) {
                l = "fill"
            }
            var k = a(this);
            k.css("position", "absolute");
            k.css("width", f.sizeCache[j].width);
            k.css("height", f.sizeCache[j].height);
            var i = {width: k.outerWidth(), height: k.outerHeight()};
            var m = {x: b, y: h, width: Math.max(0, g.width - (b + d)), height: Math.max(0, g.height - (h + c))};
            if (j < e) {
                switch (l) {
                    case"left":
                        b += i.width;
                        m.width = i.width;
                        break;
                    case"top":
                        h += i.height;
                        m.height = i.height;
                        break;
                    case"right":
                        d += i.width;
                        m.x = Math.max(0, (g.width - d));
                        m.width = i.width;
                        break;
                    case"bottom":
                        c += i.height;
                        m.y = Math.max(0, (g.height - c));
                        m.height = i.height;
                        break
                }
            }
            k.css("left", m.x);
            k.css("top", m.y);
            k.css("width", m.width);
            k.css("height", m.height)
        });
        this._raiseevent(0)
    }, destroy: function () {
        a.jqx.utilities.resize(this.host, null, true);
        this.host.remove()
    }, _raiseevent: function (g, d, f) {
        if (this.isInitialized != undefined && this.isInitialized == true) {
            var c = this.events[g];
            var e = new a.Event(c);
            e.previousValue = d;
            e.currentValue = f;
            e.owner = this;
            var b = this.host.trigger(e);
            return b
        }
    }, propertyChangedHandler: function (c, d, b, e) {
        if (!this.isInitialized) {
            return
        }
        c.render()
    }, refresh: function () {
        this.render()
    }})
})(jqxBaseFramework);