/*
 jQWidgets v3.8.2 (2015-Aug)
 Copyright (c) 2011-2015 jQWidgets.
 License: http://jqwidgets.com/license/
 */

(function (a) {
    a.jqx.jqxWidget("jqxCalendar", "", {});
    a.extend(a.jqx._jqxCalendar.prototype, {defineInstance: function () {
        var b = {disabled: false, restrictedDates: new Array(), multipleMonthRows: 1, multipleMonthColumns: 1, minDate: a.jqx._jqxDateTimeInput.getDateTime(new Date()), maxDate: a.jqx._jqxDateTimeInput.getDateTime(new Date()), min: new Date(1900, 0, 1), max: new Date(2100, 0, 1), navigationDelay: 400, stepMonths: 1, width: null, height: null, value: a.jqx._jqxDateTimeInput.getDateTime(new Date()), firstDayOfWeek: 0, showWeekNumbers: false, showDayNames: true, enableWeekend: false, enableOtherMonthDays: true, showOtherMonthDays: true, rowHeaderWidth: 25, columnHeaderHeight: 20, titleHeight: 25, dayNameFormat: "firstTwoLetters", monthNameFormat: "default", titleFormat: ["MMMM yyyy", "yyyy", "yyyy", "yyyy"], enableViews: true, readOnly: false, culture: "default", enableFastNavigation: true, enableHover: true, enableAutoNavigation: true, enableTooltips: false, backText: "Back", forwardText: "Forward", specialDates: new Array(), keyboardNavigation: true, selectionMode: "default", selectableDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], todayString: "Today", clearString: "Clear", showFooter: false, selection: {from: null, to: null}, canRender: true, _checkForHiddenParent: true, height: null, rtl: false, view: "month", views: ["month", "year", "decade"], changing: null, change: null, localization: {backString: "Back", forwardString: "Forward", todayString: "Today", clearString: "Clear", calendar: {name: "Gregorian_USEnglish", "/": "/", ":": ":", firstDay: 0, days: {names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]}, months: {names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""], namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""]}, AM: ["AM", "am", "AM"], PM: ["PM", "pm", "PM"], eras: [
            {name: "A.D.", start: null, offset: 0}
        ], twoDigitYearMax: 2029, patterns: {d: "M/d/yyyy", D: "dddd, MMMM dd, yyyy", t: "h:mm tt", T: "h:mm:ss tt", f: "dddd, MMMM dd, yyyy h:mm tt", F: "dddd, MMMM dd, yyyy h:mm:ss tt", M: "MMMM dd", Y: "yyyy MMMM", S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss", ISO: "yyyy-MM-dd hh:mm:ss"}}}, events: ["backButtonClick", "nextButtonClick", "valuechanged", "cellMouseDown", "cellMouseUp", "cellSelected", "cellUnselected", "change", "viewChange"]};
        a.extend(true, this, b);
        this.minDate._setYear(1900);
        this.minDate._setMonth(1);
        this.minDate._setDay(1);
        this.minDate._setHours(0);
        this.minDate._setMinutes(0);
        this.minDate._setSeconds(0);
        this.minDate._setMilliseconds(0);
        this.maxDate._setYear(2100);
        this.maxDate._setMonth(1);
        this.maxDate._setDay(1);
        this.maxDate._setHours(0);
        this.maxDate._setMinutes(0);
        this.maxDate._setSeconds(0);
        this.maxDate._setMilliseconds(0);
        this.value._setHours(0);
        this.value._setMinutes(0);
        this.value._setSeconds(0);
        this.value._setMilliseconds(0);
        return b
    }, createInstance: function (e) {
        this.setCalendarSize();
        if (this.element.id === "") {
            this.element.id = a.jqx.utilities.createId()
        }
        this.element.innerHTML = "";
        this.host.attr("data-role", "calendar");
        var i = this.element.id;
        var h = this;
        this.propertyChangeMap.width = function (j, l, k, m) {
            h.setCalendarSize()
        };
        this.propertyChangeMap.height = function (j, l, k, m) {
            h.setCalendarSize()
        };
        if (a.global) {
            a.global.preferCulture(this.culture)
        }
        if (this.culture != "default") {
            if (a.global) {
                a.global.preferCulture(this.culture);
                this.localization.calendar = a.global.culture.calendar
            } else {
                if (Globalize) {
                    var c = Globalize.culture(this.culture);
                    this.localization.calendar = c.calendar
                }
            }
            this.firstDayOfWeek = this.localization.calendar.firstDay
        }
        if (this.localization.backString != "Back") {
            this.backText = this.localization.backString
        }
        if (this.localization.forwardString != "Forward") {
            this.forwardText = this.localization.forwardString
        }
        if (this.localization.todayString != "Today" && this.localization.todayString) {
            this.todayString = this.localization.todayString
        }
        if (this.localization.clearString != "Clear" && this.localization.clearString) {
            this.clearString = this.localization.clearString
        }
        this.setMaxDate(this.max, false);
        this.setMinDate(this.min, false);
        if (!this.host.attr("tabIndex")) {
            this.host.attr("tabIndex", 0)
        }
        this.host.css("outline", "none");
        this.host.addClass(this.toThemeProperty("jqx-calendar"));
        this.host.addClass(this.toThemeProperty("jqx-widget"));
        this.host.addClass(this.toThemeProperty("jqx-widget-content"));
        this.host.addClass(this.toThemeProperty("jqx-rc-all"));
        this._addInput();
        if (this.views.indexOf("month") == -1) {
            this.view = "year"
        }
        if (this.views.indexOf("year") == -1 && this.views.indexOf("month") == -1) {
            this.view = "decade"
        }
        this.addHandler(this.host, "keydown", function (k) {
            var j = true;
            if (h.keyboardNavigation) {
                if (h._handleKey != undefined) {
                    j = h._handleKey(k);
                    if (!j) {
                        if (k.stopPropagation) {
                            k.stopPropagation()
                        }
                        if (k.preventDefault) {
                            k.preventDefault()
                        }
                    }
                }
            }
            return j
        });
        var d = false;
        var g = this;
        var b = false;
        if (h.width != null && h.width.toString().indexOf("%") != -1) {
            b = true
        }
        if (h.height != null && h.height.toString().indexOf("%") != -1) {
            b = true
        }
        a.jqx.utilities.resize(this.host, function () {
            var j = g.host.find("#View" + h.element.id);
            if (!d) {
                d = true;
                g.render()
            } else {
                g.refreshTitle(j)
            }
            if (b) {
                if (h.refreshTimer) {
                    clearTimeout(h.refreshTimer)
                }
                h.refreshTimer = setTimeout(function () {
                    h.refreshControl()
                }, 1)
            }
        }, false, this._checkForHiddenParent);
        var f = "View";
        this.propertyChangeMap.disabled = function (j, l, k, m) {
            if (m) {
                j.host.addClass(h.toThemeProperty("jqx-fill-state-disabled"))
            } else {
                j.host.removeClass(h.toThemeProperty("jqx-fill-state-disabled"))
            }
            h.refreshControl()
        }
    }, _addInput: function () {
        var b = this.host.attr("name");
        this.input = a("<input type='hidden'/>");
        this.host.append(this.input);
        if (b) {
            this.input.attr("name", b)
        }
        this.input.val(this.getDate().toString())
    }, setCalendarSize: function () {
        if (this.width != null && this.width.toString().indexOf("px") != -1) {
            this.host.width(this.width)
        } else {
            if (this.width != undefined && !isNaN(this.width)) {
                this.host.width(this.width)
            }
        }
        if (this.width != null && this.width.toString().indexOf("%") != -1) {
            this.host.css("width", this.width)
        }
        if (this.height != null && this.height.toString().indexOf("px") != -1) {
            this.host.height(this.height)
        } else {
            if (this.height != undefined && !isNaN(this.height)) {
                this.host.height(this.height)
            }
        }
        if (this.height != null && this.height.toString().indexOf("%") != -1) {
            this.host.css("height", this.height)
        }
    }, _getYearAndMonthPart: function (c) {
        if (!c) {
            return new Date(1900, 0, 1)
        }
        var b = new Date(c.getFullYear(), c.getMonth(), 1);
        return b
    }, _handleKey: function (p) {
        if (this.readOnly) {
            return true
        }
        var A = p.keyCode;
        var y = this;
        var b = this._getSelectedDate();
        if (b == undefined) {
            return true
        }
        if (p.altKey) {
            return true
        }
        if (this._animating) {
            return false
        }
        if (this.view != "month" && A == 13) {
            var d = this._getSelectedCell();
            this._setDateAndSwitchViews(d, p, "keyboard")
        }
        if (this.view == "year") {
            var w = b.getMonth();
            var j = this._getYearAndMonthPart(this.getMinDate());
            var m = this._getYearAndMonthPart(this.getMaxDate());
            switch (A) {
                case 37:
                    if (w == 0) {
                        var h = new Date(b.getFullYear() - 1, 11, 1);
                        if (h >= j) {
                            this.selectedDate = h;
                            this.navigateBackward()
                        } else {
                            if (this.selectedDate != j) {
                                this.selectedDate = j;
                                this.navigateBackward()
                            }
                        }
                    } else {
                        var h = new Date(b.getFullYear(), w - 1, 1);
                        if (h >= j) {
                            this._selectDate(h, "key")
                        }
                    }
                    return false;
                case 38:
                    var h = new Date(b.getFullYear(), w - 4, 1);
                    if (h < j) {
                        h = j
                    }
                    if (w - 4 < 0) {
                        this.selectedDate = h;
                        this.navigateBackward()
                    } else {
                        this._selectDate(h, "key")
                    }
                    return false;
                case 40:
                    var h = new Date(b.getFullYear(), w + 4, 1);
                    if (h > m) {
                        h = m
                    }
                    if (w + 4 > 11) {
                        this.selectedDate = h;
                        this.navigateForward()
                    } else {
                        this._selectDate(h, "key")
                    }
                    return false;
                case 39:
                    if (w == 11) {
                        var h = new Date(b.getFullYear() + 1, 0, 1);
                        if (h <= m) {
                            this.selectedDate = h;
                            this.navigateForward()
                        } else {
                            if (this.selectedDate != m) {
                                this.selectedDate = m;
                                this.navigateForward()
                            }
                        }
                    } else {
                        var h = new Date(b.getFullYear(), w + 1, 1);
                        if (h <= m) {
                            this._selectDate(h, "key")
                        }
                    }
                    return false
            }
            return true
        }
        if (this.view == "decade") {
            var o = this._renderStartDate.getFullYear();
            var k = this._renderEndDate.getFullYear();
            var n = b.getFullYear();
            var v = this.getMinDate().getFullYear();
            var c = this.getMaxDate().getFullYear();
            switch (A) {
                case 37:
                    if (n - 1 >= v) {
                        if (n <= o) {
                            this.selectedDate = new Date(n - 1, b.getMonth(), 1);
                            this.navigateBackward()
                        } else {
                            this._selectDate(new Date(n - 1, b.getMonth(), 1), "key")
                        }
                    }
                    return false;
                case 38:
                    var x = n - 4;
                    if (n - 4 < v) {
                        x = v
                    }
                    if (x < o) {
                        this.selectedDate = new Date(x, b.getMonth(), 1);
                        this.navigateBackward()
                    } else {
                        this._selectDate(new Date(x, b.getMonth(), 1), "key")
                    }
                    return false;
                case 40:
                    var x = n + 4;
                    if (x > c) {
                        x = c
                    }
                    if (x > k) {
                        this.selectedDate = new Date(x, b.getMonth(), 1);
                        this.navigateForward()
                    } else {
                        this._selectDate(new Date(x, b.getMonth(), 1), "key")
                    }
                    return false;
                case 39:
                    if (n + 1 <= c) {
                        if (n == k) {
                            this.selectedDate = new Date(n + 1, b.getMonth(), 1);
                            this.navigateForward()
                        } else {
                            this._selectDate(new Date(n + 1, b.getMonth(), 1), "key")
                        }
                    }
                    return false
            }
            return true
        }
        var u = new a.jqx._jqxDateTimeInput.getDateTime(b);
        var f = this.getViewStart();
        var e = this.getViewEnd();
        var t = u;
        var s = a.data(this.element, "View" + this.element.id);
        if (s == undefined || s == null) {
            return true
        }
        if (A == 36) {
            u._setDay(1);
            if (this._isDisabled(u.dateTime)) {
                return false
            }
            this._selectDate(u.dateTime, "key");
            return false
        }
        if (A == 35) {
            var r = this.value._daysInMonth(this.value.year, this.value.month);
            u._setDay(r);
            if (this._isDisabled(u.dateTime)) {
                return false
            }
            this._selectDate(u.dateTime, "key");
            return false
        }
        var g = 1;
        if (p.ctrlKey) {
            g = 12
        }
        if (A == 34) {
            var z = this.navigateForward(g);
            if (z) {
                u._addMonths(g);
                if (this._isDisabled(u.dateTime)) {
                    return false
                }
                this._selectDate(u.dateTime, "key")
            }
            return false
        }
        if (A == 33) {
            var z = this.navigateBackward(g);
            if (z) {
                u._addMonths(-g);
                if (this._isDisabled(u.dateTime)) {
                    return false
                }
                this._selectDate(u.dateTime, "key")
            }
            return false
        }
        if (A == 38) {
            u._addDays(-7);
            if (u.dateTime < this.getMinDate()) {
                return false
            }
            if (u.dateTime < f) {
                var z = this.navigateBackward();
                if (!z) {
                    return false
                }
            }
            if (this._isDisabled(u.dateTime)) {
                return false
            }
            this._selectDate(u.dateTime, "key");
            for (var q = 0; q < s.cells.length; q++) {
                var d = s.cells[q];
                var l = d.getDate();
                if (d.isOtherMonth && d.isSelected && l <= u.dateTime) {
                    this.value.day = l.getDate();
                    this.navigateBackward();
                    this._selectDate(u.dateTime, "key");
                    break
                }
            }
            return false
        } else {
            if (A == 40) {
                u._addDays(7);
                if (u.dateTime > this.getMaxDate()) {
                    return false
                }
                if (u.dateTime > e) {
                    var z = this.navigateForward();
                    if (!z) {
                        return false
                    }
                }
                if (this._isDisabled(u.dateTime)) {
                    return false
                }
                this._selectDate(u.dateTime, "key");
                for (var q = 0; q < s.cells.length; q++) {
                    var d = s.cells[q];
                    var l = d.getDate();
                    if (d.isOtherMonth && d.isSelected && l >= u.dateTime) {
                        this.value.day = l.getDate();
                        this.navigateForward();
                        this._selectDate(u.dateTime, "key");
                        break
                    }
                }
                return false
            }
        }
        if (A == 37) {
            u._addDays(-1);
            if (u.dateTime < this.getMinDate()) {
                return false
            }
            if (u.dateTime < f) {
                var z = this.navigateBackward();
                if (!z) {
                    return false
                }
            }
            if (this._isDisabled(u.dateTime)) {
                return false
            }
            this._selectDate(u.dateTime, "key");
            for (var q = 0; q < s.cells.length; q++) {
                var d = s.cells[q];
                var l = d.getDate();
                if (d.isOtherMonth && d.isSelected && l <= u.dateTime) {
                    if (u.dateTime < this.getMinDate() || u.dateTime > this.getMaxDate()) {
                        return false
                    }
                    if (this._isDisabled(u.dateTime)) {
                        return false
                    }
                    this.navigateBackward();
                    this._selectDate(u.dateTime, "key");
                    break
                }
            }
            return false
        } else {
            if (A == 39) {
                u._addDays(1);
                if (u.dateTime > this.getMaxDate()) {
                    return false
                }
                if (u.dateTime > e) {
                    var z = this.navigateForward();
                    if (!z) {
                        return false
                    }
                }
                if (this._isDisabled(u.dateTime)) {
                    return false
                }
                this._selectDate(u.dateTime, "key");
                for (var q = 0; q < s.cells.length; q++) {
                    var d = s.cells[q];
                    var l = d.getDate();
                    if (d.isOtherMonth && d.isSelected && l >= u.dateTime) {
                        if (u.dateTime < this.getMinDate() || u.dateTime > this.getMaxDate()) {
                            return false
                        }
                        this.navigateForward();
                        this._selectDate(u.dateTime, "key");
                        break
                    }
                }
                return false
            }
        }
        return true
    }, render: function () {
        if (!this.canRender) {
            return
        }
        this.host.children().remove();
        var c = this._renderSingleCalendar("View" + this.element.id);
        var b = this;
        this.host.append(c)
    }, addSpecialDate: function (b, c, d) {
        if (this.multipleMonthRows == 1 && this.multipleMonthColumns == 1) {
            var e = this.specialDates.length;
            this.specialDates[e] = {Date: b, Class: c, Tooltip: d};
            this.refreshControl()
        }
    }, refresh: function (b) {
        this.render()
    }, invalidate: function () {
        this.refreshControl()
    }, refreshControl: function () {
        if (this.multipleMonthRows == 1 && this.multipleMonthColumns == 1) {
            this.refreshSingleCalendar("View" + this.element.id, null)
        }
    }, getViewStart: function () {
        var c = this.getVisibleDate();
        var b = this.getFirstDayOfWeek(c);
        return b.dateTime
    }, getViewEnd: function () {
        var c = this.getViewStart();
        var b = new a.jqx._jqxDateTimeInput.getDateTime(c);
        b._addDays(41);
        return b.dateTime
    }, refreshSingleCalendar: function (f, e) {
        if (!this.canRender) {
            return
        }
        var h = this.host.find("#" + f);
        var d = this.getVisibleDate();
        var b = this.getFirstDayOfWeek(d);
        this.refreshCalendarCells(h, b, f);
        this.refreshTitle(h);
        this.refreshRowHeader(h, f);
        if (this.selectedDate != undefined) {
            this._selectDate(this.selectedDate)
        }
        var g = this.host.height() - this.titleHeight - this.columnHeaderHeight;
        if (!this.showDayNames) {
            g = this.host.height() - this.titleHeight
        }
        if (this.showFooter) {
            g -= 20
        }
        var c = h.find("#cellsTable" + f);
        var i = h.find("#calendarRowHeader" + f);
        c.height(g);
        i.height(g)
    }, refreshRowHeader: function (s, m) {
        if (!this.showWeekNumbers) {
            return
        }
        var c = this.getVisibleDate();
        var h = this.getFirstDayOfWeek(c);
        var n = h.dayOfWeek;
        var t = this.getWeekOfYear(h);
        var f = new a.jqx._jqxDateTimeInput.getDateTime(new Date(h.dateTime));
        f._addDays(5);
        f.dayOfWeek = f.dateTime.getDay();
        var k = this.getWeekOfYear(f);
        var e = this.rowHeader.find("table");
        e.width(this.rowHeaderWidth);
        var g = h;
        var q = new Array();
        for (var p = 0; p < 6; p++) {
            var o = t.toString();
            var b = new a.jqx._jqxCalendar.cell(g.dateTime);
            var l = p + 1 + this.element.id;
            var j = a(e[0].rows[p].cells[0]);
            b.element = j;
            b.row = p;
            b.column = 0;
            var d = j.find("#headerCellContent" + l);
            d.addClass(this.toThemeProperty("jqx-calendar-row-cell"));
            d[0].innerHTML = t;
            q[p] = b;
            g = new a.jqx._jqxDateTimeInput.getDateTime(new Date(g._addWeeks(1)));
            t = this.getWeekOfYear(g)
        }
        var r = a.data(this.element, s[0].id);
        r.rowCells = q;
        this._refreshOtherMonthRows(r, m)
    }, _refreshOtherMonthRows: function (f, e) {
        if (this.showOtherMonthDays) {
            return
        }
        this._displayLastRow(true, e);
        this._displayFirstRow(true, e);
        var d = false;
        var g = false;
        for (var c = 0; c < f.cells.length; c++) {
            var b = f.cells[c];
            if (b.isVisible && c < 7) {
                d = true
            } else {
                if (b.isVisible && c >= f.cells.length - 7) {
                    g = true
                }
            }
        }
        if (!d) {
            this._displayFirstRow(false, e)
        }
        if (!g) {
            this._displayLastRow(false, e)
        }
    }, _displayLastRow: function (b, c) {
        var g = this.host.find("#" + c);
        var f = g.find("#calendarRowHeader" + g[0].id).find("table");
        var d = null;
        if (this.showWeekNumbers) {
            if (f[0].cells) {
                var d = a(f[0].rows[5])
            }
        }
        var e = a(g.find("#cellTable" + g[0].id)[0].rows[5]);
        if (b) {
            if (this.showWeekNumbers && d) {
                d.css("display", "table-row")
            }
            e.css("display", "table-row")
        } else {
            if (this.showWeekNumbers && d) {
                d.css("display", "none")
            }
            e.css("display", "none")
        }
    }, _displayFirstRow: function (b, c) {
        var e = this.host.find("#" + c);
        var d = e.find("#calendarRowHeader" + e[0].id).find("table");
        var f = null;
        if (this.showWeekNumbers) {
            if (d[0].cells) {
                var f = a(d[0].rows[0])
            }
        }
        var g = a(e.find("#cellTable" + e[0].id)[0].rows[0]);
        if (b) {
            if (this.showWeekNumbers && f) {
                f.css("display", "table-row")
            }
            g.css("display", "table-row")
        } else {
            if (this.showWeekNumbers && f) {
                f.css("display", "none")
            }
            g.css("display", "none")
        }
    }, _renderSingleCalendar: function (p, k) {
        if (!this.canRender) {
            return
        }
        var m = this.host.find("#" + p.toString());
        if (m != null) {
            m.remove()
        }
        var s = a("<div id='" + p.toString() + "'></div>");
        var b = this.getVisibleDate();
        var l = this.getFirstDayOfWeek(b);
        var e = new a.jqx._jqxDateTimeInput.getDateTime(l.dateTime);
        e._addMonths(1);
        var r = a.jqx._jqxCalendar.monthView(l, e, null, null, null, s);
        if (k == undefined || k == null) {
            this.host.append(s);
            if (this.height != undefined && !isNaN(this.height)) {
                s.height(this.height)
            } else {
                if (this.height != null && this.height.toString().indexOf("px") != -1) {
                    s.height(this.height)
                }
            }
            if (this.width != undefined && !isNaN(this.width)) {
                s.width(this.width)
            } else {
                if (this.width != null && this.width.toString().indexOf("px") != -1) {
                    s.width(this.width)
                }
            }
            if (this.width != null && this.width.toString().indexOf("%") != -1) {
                s.width("100%")
            }
            if (this.height != null && this.height.toString().indexOf("%") != -1) {
                s.height("100%")
            }
        } else {
            k.append(s)
        }
        a.data(this.element, p, r);
        var q = this.host.height() - this.titleHeight - this.columnHeaderHeight;
        if (!this.showDayNames) {
            q = this.host.height() - this.titleHeight
        }
        if (this.showFooter) {
            q -= 20
        }
        if (this.rowHeaderWidth < 0) {
            this.rowHeaderWidth = 0
        }
        if (this.columnHeaderHeight < 0) {
            this.columnHeaderHeight = 0
        }
        if (this.titleHeight < 0) {
            this.titleHeight = 0
        }
        var g = this.rowHeaderWidth;
        var j = this.columnHeaderHeight;
        if (!this.showWeekNumbers) {
            g = 0
        }
        if (!this.showDayNames) {
            j = 0
        }
        var u = "<div style='height:" + this.titleHeight + "px;'><table role='grid' style='margin: 0px; width: 100%; height: 100%; border-spacing: 0px;' cellspacing='0' cellpadding='0'><tr role='row' id='calendarTitle' width='100%'><td role='gridcell' NOWRAP id='leftNavigationArrow'></td><td aria-live='assertive' aria-atomic='true' role='gridcell' align='center' NOWRAP id='calendarTitleHeader'></td><td role='gridcell' NOWRAP id='rightNavigationArrow'></td></tr></table></div>";
        var c = "<table role='grid' class='" + this.toThemeProperty("jqx-calendar-month") + "' style='margin: 0px; border-spacing: 0px;' cellspacing='0' cellpadding='0'><tr role='row' id='calendarHeader' height='" + j + "'><td role='gridcell' id='selectCell' width='" + g + "'></td><td role='gridcell' colspan='2' style='border: none; padding-left: 2px; padding-right: 2px' id='calendarColumnHeader'></td></tr><tr role='row' id='calendarContent'><td role='gridcell' id='calendarRowHeader' valign='top' height='" + q + "' width='" + g + "'></td><td role='gridcell' valign='top' colspan='2' style='padding-left: 2px; padding-right: 2px' id='cellsTable' height='" + q + "'></td></tr></table>";
        var o = "<div id='footer' style='margin: 0px; display: none; height:" + d + "px;'><table style='width: 100%; height: 100%; border-spacing: 0px;' cellspacing='0' cellpadding='0'><tr id='calendarFooter'><td align='right' id='todayButton'></td><td align='left' colspan='2' id=doneButton></td></tr></table></div>";
        s[0].innerHTML = u + c + o;
        this.header = s.find("#calendarHeader");
        this.header[0].id = "calendarHeader" + p;
        this.header.addClass(this.toThemeProperty("calendar-header"));
        this.columnHeader = s.find("#calendarColumnHeader");
        this.columnHeader[0].id = "calendarColumnHeader" + p;
        this.table = s.find("#cellsTable");
        this.table[0].id = "cellsTable" + p;
        this.rowHeader = s.find("#calendarRowHeader");
        this.rowHeader[0].id = "calendarRowHeader" + p;
        this.selectCell = s.find("#selectCell");
        this.selectCell[0].id = "selectCell" + p;
        this.title = s.find("#calendarTitle");
        this.title[0].id = "calendarTitle" + p;
        this.leftButton = s.find("#leftNavigationArrow");
        this.leftButton[0].id = "leftNavigationArrow" + p;
        this.titleHeader = s.find("#calendarTitleHeader");
        this.titleHeader[0].id = "calendarTitleHeader" + p;
        this.rightButton = s.find("#rightNavigationArrow");
        this.rightButton[0].id = "rightNavigationArrow" + p;
        this.footer = s.find("#calendarFooter");
        this._footer = s.find("#footer");
        this._footer[0].id = "footer" + p;
        this.footer[0].id = "calendarFooter" + p;
        this.todayButton = s.find("#todayButton");
        this.todayButton[0].id = "todayButton" + p;
        this.doneButton = s.find("#doneButton");
        this.doneButton[0].id = "doneButton" + p;
        this.title.addClass(this.toThemeProperty("jqx-calendar-title-container"));
        var d = 20;
        if (this.showFooter) {
            this._footer.css("display", "block")
        }
        s.find("tr").addClass(this.toThemeProperty("jqx-reset"));
        s.addClass(this.toThemeProperty("jqx-widget-content"));
        s.addClass(this.toThemeProperty("jqx-calendar-month-container"));
        this.month = s;
        this.selectCell.addClass(this.toThemeProperty("jqx-reset"));
        this.selectCell.addClass(this.toThemeProperty("jqx-calendar-top-left-header"));
        if (this.showWeekNumbers) {
            this._renderRowHeader(s)
        } else {
            this.table[0].colSpan = 3;
            this.columnHeader[0].colSpan = 3;
            this.rowHeader.css("display", "none");
            this.selectCell.css("display", "none")
        }
        if (this.showFooter) {
            this.footer.height(20);
            var i = a("<a href='javascript:;'>" + this.todayString + "</a>");
            i.appendTo(this.todayButton);
            var h = a("<a href='javascript:;'>" + this.clearString + "</a>");
            h.appendTo(this.doneButton);
            h.addClass(this.toThemeProperty("jqx-calendar-footer"));
            i.addClass(this.toThemeProperty("jqx-calendar-footer"));
            var n = this;
            var f = "mousedown";
            if (a.jqx.mobile.isTouchDevice()) {
                f = a.jqx.mobile.getTouchEventName("touchstart")
            }
            this.addHandler(i, f, function () {
                if (n.today) {
                    n.today()
                } else {
                    n.setDate(new Date(), "mouse")
                }
                return false
            });
            this.addHandler(h, f, function () {
                if (n.clear) {
                    n.clear()
                } else {
                    n.setDate(null, "mouse")
                }
                return false
            })
        }
        if (this.view != "month") {
            this.header.hide()
        }
        if (this.showDayNames && this.view == "month") {
            this.renderColumnHeader(s)
        }
        this.oldView = this.view;
        this.renderCalendarCells(s, l, p);
        if (k == undefined || k == null) {
            this.renderTitle(s)
        }
        this._refreshOtherMonthRows(r, p);
        s.find("tbody").css({border: "none", background: "transparent"});
        if (this.selectedDate != undefined) {
            this._selectDate(this.selectedDate)
        }
        var t = this;
        this.addHandler(this.host, "focus", function () {
            t.focus()
        });
        return s
    }, _getTitleFormat: function () {
        switch (this.view) {
            case"month":
                return this.titleFormat[0];
            case"year":
                return this.titleFormat[1];
            case"decade":
                return this.titleFormat[2];
            case"centuries":
                return this.titleFormat[3]
        }
    }, renderTitle: function (t) {
        var k = a("<div role='button' style='float: left;'></div>");
        var l = a("<div role='button' style='float: right;'></div>");
        var o = this.title;
        o.addClass(this.toThemeProperty("jqx-reset"));
        o.addClass(this.toThemeProperty("jqx-widget-header"));
        o.addClass(this.toThemeProperty("jqx-calendar-title-header"));
        var e = o.find("td");
        if (a.jqx.browser.msie && a.jqx.browser.version < 8) {
            if (e.css("background-color") != "transparent") {
                var g = o.css("background-color");
                e.css("background-color", g)
            }
            if (e.css("background-image") != "transparent") {
                var d = o.css("background-image");
                var p = o.css("background-repeat");
                var c = o.css("background-position");
                e.css("background-image", d);
                e.css("background-repeat", p);
                e.css("background-position", "left center scroll")
            }
        } else {
            e.css("background-color", "transparent")
        }
        if (this.disabled) {
            o.addClass(this.toThemeProperty("jqx-calendar-title-header-disabled"))
        }
        k.addClass(this.toThemeProperty("jqx-calendar-title-navigation"));
        k.addClass(this.toThemeProperty("jqx-icon-arrow-left"));
        k.appendTo(this.leftButton);
        var m = this.leftButton;
        l.addClass(this.toThemeProperty("jqx-calendar-title-navigation"));
        l.addClass(this.toThemeProperty("jqx-icon-arrow-right"));
        l.appendTo(this.rightButton);
        var b = this.rightButton;
        if (this.enableTooltips) {
            if (a(m).jqxTooltip) {
                a(m).jqxTooltip({name: this.element.id, position: "mouse", theme: this.theme, content: this.backText});
                a(b).jqxTooltip({name: this.element.id, position: "mouse", theme: this.theme, content: this.forwardText})
            }
        }
        var n = this.titleHeader;
        var v = this._format(this.value.dateTime, this._getTitleFormat(), this.culture);
        if (this.view == "decade") {
            var q = this._format(this._renderStartDate, this._getTitleFormat(), this.culture);
            var j = this._format(this._renderEndDate, this._getTitleFormat(), this.culture);
            v = q + " - " + j
        } else {
            if (this.view == "centuries") {
                var q = this._format(this._renderCenturyStartDate, this._getTitleFormat(), this.culture);
                var j = this._format(this._renderCenturyEndDate, this._getTitleFormat(), this.culture);
                v = q + " - " + j
            }
        }
        var f = a("<div style='background: transparent; margin: 0; padding: 0; border: none;'>" + v + "</div>");
        n.append(f);
        f.addClass(this.toThemeProperty("jqx-calendar-title-content"));
        var s = parseInt(k.width());
        var i = t.width() - 2 * s;
        var r = n.find(".jqx-calendar-title-content").width(i);
        a.data(k, "navigateLeft", this);
        a.data(l, "navigateRight", this);
        var h = a.jqx.mobile.isTouchDevice();
        if (!this.disabled) {
            var u = this;
            this.addHandler(n, "mousedown", function (A) {
                if (u.enableViews) {
                    if (!u._viewAnimating && !u._animating) {
                        var x = u.view;
                        u.oldView = x;
                        switch (u.view) {
                            case"month":
                                u.view = "year";
                                break;
                            case"year":
                                u.view = "decade";
                                break
                        }
                        if (u.views.indexOf("year") == -1 && u.view == "year") {
                            u.view = "decade"
                        }
                        if (u.views.indexOf("decade") == -1 && u.view == "decade") {
                            u.view = x
                        }
                        if (x != u.view) {
                            var z = "View" + u.element.id;
                            var B = u.host.find("#" + z);
                            var y = u.getVisibleDate();
                            var w = u.getFirstDayOfWeek(y);
                            u.renderCalendarCells(B, w, z, true);
                            u.refreshTitle(B);
                            u._raiseEvent("8")
                        }
                    }
                    return false
                }
            });
            this.addHandler(k, "mousedown", function (x) {
                if (!u._animating) {
                    a.data(k, "navigateLeftRepeat", true);
                    var w = a.data(k, "navigateLeft");
                    if (w.enableFastNavigation && !h) {
                        w.startRepeat(w, k, true, u.navigationDelay + 200)
                    }
                    w.navigateBackward(1, "arrow");
                    x.stopPropagation();
                    x.preventDefault();
                    return w._raiseEvent(0, x)
                } else {
                    return false
                }
            });
            this.addHandler(k, "mouseup", function (w) {
                a.data(k, "navigateLeftRepeat", false)
            });
            this.addHandler(k, "mouseleave", function (w) {
                a.data(k, "navigateLeftRepeat", false)
            });
            this.addHandler(l, "mousedown", function (x) {
                if (!u._animating) {
                    a.data(l, "navigateRightRepeat", true);
                    var w = a.data(l, "navigateRight");
                    if (w.enableFastNavigation && !h) {
                        w.startRepeat(w, l, false, u.navigationDelay + 200)
                    }
                    w.navigateForward(1, "arrow");
                    x.stopPropagation();
                    x.preventDefault();
                    return w._raiseEvent(1, x)
                } else {
                    return false
                }
            });
            this.addHandler(l, "mouseup", function (w) {
                a.data(l, "navigateRightRepeat", false)
            });
            this.addHandler(l, "mouseleave", function (w) {
                a.data(l, "navigateRightRepeat", false)
            })
        }
    }, refreshTitle: function (f) {
        var g = this._format(this.value.dateTime, this._getTitleFormat(), this.culture);
        if (this.view == "decade") {
            var d = this._format(this._renderStartDate, this._getTitleFormat(), this.culture);
            var b = this._format(this._renderEndDate, this._getTitleFormat(), this.culture);
            g = d + " - " + b
        } else {
            if (this.view == "centuries") {
                var d = this._format(this._renderCenturyStartDate, this._getTitleFormat(), this.culture);
                var b = this._format(this._renderCenturyEndDate, this._getTitleFormat(), this.culture);
                g = d + " - " + b
            }
        }
        var e = this.titleHeader;
        if (this.titleHeader) {
            var c = e.find(".jqx-calendar-title-content");
            var h = a("<div style='background: transparent; margin: 0; padding: 0; border: none;'>" + g + "</div>");
            e.append(h);
            h.addClass(this.toThemeProperty("jqx-calendar-title-content"));
            if (c != null) {
                c.remove()
            }
        }
    }, startRepeat: function (d, b, f, e) {
        var c = window.setTimeout(function () {
            var g = a.data(b, "navigateLeftRepeat");
            if (!f) {
                g = a.data(b, "navigateRightRepeat")
            }
            if (g) {
                if (e < 25) {
                    e = 25
                }
                if (f) {
                    d.navigateBackward(1, "arrow");
                    d.startRepeat(d, b, true, e)
                } else {
                    d.navigateForward(1, "arrow");
                    c = d.startRepeat(d, b, false, e)
                }
            } else {
                window.clearTimeout(c);
                return
            }
        }, e)
    }, navigateForward: function (h, g) {
        if (h == undefined || h == null) {
            h = this.stepMonths
        }
        var f = this.value.year;
        if (this.view == "decade") {
            f = this._renderStartDate.getFullYear() + 12;
            if (this._renderEndDate.getFullYear() >= this.getMaxDate().getFullYear()) {
                return
            }
        } else {
            if (this.view == "year") {
                f = this.value.year + 1
            } else {
                if (this.view == "centuries") {
                    f = this.value.year + 100
                }
            }
        }
        if (this.view != "month") {
            var b = this.getMaxDate().getFullYear();
            if (b < f || f > b) {
                f = b
            }
            if (this.value.year == f) {
                if (this.view === "decade") {
                    if (this.value.year > this._renderEndDate.getFullYear()) {
                        this.value.year = f;
                        this.value.month = 1;
                        this.value.day = 1
                    } else {
                        return
                    }
                } else {
                    return
                }
            }
            this.value.year = f;
            this.value.month = 1;
            this.value.day = 1
        }
        var c = this.value.day;
        var i = this.value.month;
        if (i + h <= 12) {
            var e = this.value._daysInMonth(this.value.year, this.value.month + h);
            if (c > e) {
                c = e
            }
        }
        if (this.view == "month") {
            var d = new Date(this.value.year, this.value.month - 1 + h, c);
            if (g == "arrow" && this.selectableDays.length == 7 && this.selectionMode != "range") {
                this.selectedDate = new Date(this.value.year, this.value.month - 1 + h, 1)
            }
        } else {
            var d = new Date(this.value.year, this.value.month - 1, c)
        }
        return this.navigateTo(d)
    }, navigateBackward: function (g, f) {
        if (g == undefined || g == null) {
            g = this.stepMonths
        }
        var e = this.value.year;
        if (this.view == "decade") {
            e = this._renderStartDate.getFullYear() - 12
        } else {
            if (this.view == "year") {
                e = this.value.year - 1
            } else {
                if (this.view == "centuries") {
                    e = this.value.year - 100
                }
            }
        }
        if (this.view != "month") {
            var i = this.getMinDate().getFullYear();
            if (e < i) {
                e = i
            }
            if (this.view == "decade") {
                if (this._renderStartDate) {
                    if (this._renderStartDate.getFullYear() == e) {
                        return
                    }
                }
            }
            this.value.year = e;
            this.value.month = 1;
            this.value.day = 1
        }
        var b = this.value.day;
        var h = this.value.month;
        if (h - g >= 1) {
            var d = this.value._daysInMonth(this.value.year, this.value.month - g);
            if (b > d) {
                b = d
            }
        }
        if (this.view == "month") {
            var c = new Date(this.value.year, this.value.month - 1 - g, b);
            if (f == "arrow" && this.selectableDays.length == 7 && this.selectionMode != "range") {
                this.selectedDate = new Date(this.value.year, this.value.month - 1 - g, 1)
            }
        } else {
            var c = new Date(this.value.year, this.value.month - 1, b)
        }
        return this.navigateTo(c)
    }, _isDisabled: function (e) {
        var h = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var c = e.getDay();
        var d = h[c];
        if (this.restrictedDates && this.restrictedDates.length > 0) {
            var g = function (j) {
                if (j == null) {
                    return new Date()
                }
                var i = new Date();
                i.setHours(0, 0, 0, 0);
                i.setFullYear(j.getFullYear(), j.getMonth(), j.getDate());
                return i
            };
            for (var f = 0; f < this.restrictedDates.length; f++) {
                var b = this.restrictedDates[f];
                if (g(e).toString() == g(b).toString()) {
                    return true
                }
            }
        }
        if (this.selectableDays.indexOf(d) == -1) {
            return true
        }
        return false
    }, refreshCalendarCells: function (x, f, m) {
        if (this.view == "year" || this.view == "decade" || this.view == "centuries") {
            this.refreshViews(x, f, m);
            return
        }
        var s = this.table;
        var q = s.find("#cellTable" + m.toString());
        var e = f;
        var c = new Array();
        var n = 0;
        var u = new a.jqx._jqxDateTimeInput.getDateTime(new Date());
        for (var p = 0; p < 6; p++) {
            for (var o = 0; o < 7; o++) {
                var d = p + 1;
                var h = o;
                if (this.rtl) {
                    h = 6 - h
                }
                var t = h + 1;
                var l = "#cell" + d + t + this.element.id;
                var w = new Date(e.dateTime.getFullYear(), e.dateTime.getMonth(), e.dateTime.getDate());
                var b = new a.jqx._jqxCalendar.cell(w);
                var g = a(q[0].rows[p].cells[t - 1]);
                g[0].id = l.substring(1);
                b.element = g;
                b.row = p;
                b.column = o;
                b.isVisible = true;
                b.isOtherMonth = false;
                b.isToday = false;
                b.isWeekend = false;
                b.isHighlighted = false;
                b.isSelected = false;
                if (e.month != this.value.month) {
                    b.isOtherMonth = true;
                    b.isVisible = this.showOtherMonthDays
                }
                if (w < this.getMinDate() || w > this.getMaxDate() || this._isDisabled(w)) {
                    b.isDisabled = true
                }
                if (e.month == u.month && e.day == u.day && e.year == u.year) {
                    b.isToday = true
                }
                if (e.isWeekend()) {
                    b.isWeekend = true
                }
                a.data(this.element, "cellContent" + l.substring(1), b);
                a.data(this.element, l.substring(1), b);
                c[n] = b;
                n++;
                a.jqx.utilities.html(g, e.day);
                this._applyCellStyle(b, g, g);
                e = new a.jqx._jqxDateTimeInput.getDateTime(new Date(e._addDays(1)))
            }
        }
        var v = a.data(this.element, x[0].id);
        if (v != undefined && v != null) {
            v.cells = c
        }
        this.renderedCells = c;
        this._refreshOtherMonthRows(v, m)
    }, _getDecadeAndCenturiesData: function () {
        var k = new Array();
        var p = new Array();
        var c = this.getMaxDate().getFullYear() - this.getMinDate().getFullYear();
        if (c < 12) {
            c = 12
        }
        var f = this.getMinDate();
        var b = this.getMaxDate();
        var l = this.value.dateTime.getFullYear();
        if (this.view == "decade") {
            if (l + 12 > b.getFullYear()) {
                l = b.getFullYear() - 11
            }
            if (l < f.getFullYear()) {
                l = f.getFullYear()
            }
            for (var h = 0; h < c; h++) {
                var d = new Date(f.getFullYear() + h, 0, 1);
                if (f.getFullYear() <= l && l <= d.getFullYear()) {
                    var g = new Date(d.getFullYear(), d.getMonth(), 1);
                    for (var e = 0; e < 12; e++) {
                        var o = new Date(g.getFullYear() + e, this.value.dateTime.getMonth(), this.value.dateTime.getDate());
                        var m = o.getFullYear();
                        if (f.getFullYear() <= m && m <= b.getFullYear()) {
                            k.push(m);
                            p.push(o);
                            if (e == 0) {
                                this._renderStartDate = o
                            }
                            this._renderEndDate = o
                        } else {
                            k.push(m);
                            p.push(o)
                        }
                    }
                    break
                }
            }
        } else {
            if (this.view == "centuries") {
                for (var h = 0; h < c; h += 120) {
                    var d = new Date(f.getFullYear() + h + 120, 0, 1);
                    if (f.getFullYear() <= l && l <= d.getFullYear()) {
                        var g = new Date(d.getFullYear() - 130, d.getMonth(), 1);
                        if (g < f) {
                            g = f
                        }
                        for (var e = 0; e < 12; e++) {
                            var n = new Date(g.getFullYear() + e * 10, g.getMonth(), 1);
                            if (g.getFullYear() >= f.getFullYear() && n.getFullYear() <= b.getFullYear()) {
                                k.push("<span style='visibility: hidden;'>-</span>" + n.getFullYear() + "-" + (n.getFullYear() + 9));
                                p.push(n);
                                if (e == 0) {
                                    this._renderCenturyStartDate = n
                                }
                                this._renderCenturyEndDate = new Date(n.getFullYear() + 9, 0, 1)
                            }
                        }
                        break
                    }
                }
            }
        }
        return{years: k, dates: p}
    }, refreshViews: function (A, m, s) {
        var B = this;
        var c = new Array();
        var w = A.find("#cellTable" + s.toString());
        var D = this._getDecadeAndCenturiesData();
        var l = D.years;
        var C = D.dates;
        var t = 0;
        var f = this.getMinDate();
        var n = this.getMaxDate();
        for (var v = 0; v < 3; v++) {
            for (var u = 0; u < 4; u++) {
                var d = v + 1;
                var q = u;
                if (this.rtl) {
                    q = 3 - q
                }
                var x = q + 1;
                var z = new Date(this.value.dateTime);
                z.setDate(1);
                z.setMonth(v * 4 + q);
                var b = new a.jqx._jqxCalendar.cell(z);
                var e = w[0].rows["row" + (1 + v) + this.element.id];
                var o = a(e.cells[u]);
                b.isSelected = false;
                b.isVisible = true;
                b.element = o;
                b.row = v;
                b.column = u;
                b.index = c.length;
                var p = "";
                if (this.view == "year") {
                    var h = this.localization.calendar.months.names;
                    var g = h[v * 4 + q];
                    switch (this.monthNameFormat) {
                        case"default":
                            g = this.localization.calendar.months.namesAbbr[v * 4 + q];
                            break;
                        case"shortest":
                            g = this.localization.calendar.months.namesShort[v * 4 + q];
                            break;
                        case"firstTwoLetters":
                            g = g.substring(0, 2);
                            break;
                        case"firstLetter":
                            g = g.substring(0, 1);
                            break
                    }
                    p = g
                } else {
                    if (this.view == "decade" || this.view == "centuries") {
                        p = l[v * 4 + q];
                        if (undefined == p) {
                            p = "<span style='cursor: default; visibility: hidden;'>2013</span>"
                        }
                        b.setDate(C[v * 4 + q])
                    }
                }
                var z = b.getDate();
                if (this.view == "year") {
                    if (z.getMonth() == this.getDate().getMonth() && z.getFullYear() == this.getDate().getFullYear()) {
                        b.isSelected = true
                    }
                } else {
                    if (z.getFullYear() == this.getDate().getFullYear()) {
                        b.isSelected = true
                    }
                }
                if (this.view == "year") {
                    if (this._getYearAndMonthPart(z) < this._getYearAndMonthPart(f)) {
                        b.isDisabled = true
                    }
                    if (this._getYearAndMonthPart(z) > this._getYearAndMonthPart(n)) {
                        b.isDisabled = true
                    }
                } else {
                    if (z.getFullYear() < f.getFullYear()) {
                        b.isDisabled = true
                    }
                    if (z.getFullYear() > n.getFullYear()) {
                        b.isDisabled = true
                    }
                }
                a.jqx.utilities.html(o, p);
                c[t] = b;
                t++
            }
        }
        var y = a.data(this.element, A[0].id);
        if (y != undefined && y != null) {
            y.cells = c
        }
        this.renderedCells = c;
        this._applyCellStyles()
    }, _createViewClone: function () {
        var b = this.host.find(".jqx-calendar-month");
        var c = b.clone();
        c.css("position", "absolute");
        c.css("top", b.position().top);
        return c
    }, _addCellsTable: function (h, g) {
        var e = this;
        var c = this.showFooter ? 20 : 0;
        if (this.view != "month") {
            g.height(this.host.height() - this.titleHeight)
        } else {
            g.height(this.host.height() - this.titleHeight - this.columnHeaderHeight - c)
        }
        this._viewAnimating = true;
        var b = this.host.find(".jqx-calendar-month-container");
        b.css("position", "relative");
        var d = this.host.find(".jqx-calendar-month");
        var f = this._createViewClone();
        b.append(f);
        if (this.view != "month") {
            this.header.fadeOut(0);
            if (this.showWeekNumbers) {
                this.rowHeader.fadeOut(0)
            }
            if (this.showFooter) {
                this._footer.fadeOut(0)
            }
        } else {
            this.header.fadeIn(this.navigationDelay + 200);
            if (this.showWeekNumbers) {
                this.rowHeader.fadeIn(this.navigationDelay + 200)
            }
            if (this.showFooter) {
                this._footer.fadeIn(this.navigationDelay + 200)
            }
        }
        h.children().remove();
        h.append(g);
        this._animateViews(f, g, function () {
            if (!e.selectedDate && e.selectionMode != "range") {
                e.selectedDate = e.renderedCells[0].getDate()
            }
            try {
                e.renderedCells[0].element.focus();
                setTimeout(function () {
                    e.renderedCells[0].element.focus()
                }, 10)
            } catch (i) {
            }
            e._viewAnimating = false
        });
        g.addClass(this.toThemeProperty("jqx-calendar-view"))
    }, _animateViews: function (c, b, e) {
        var d = this;
        d._viewAnimating = true;
        if (d.oldView == d.view) {
            c.remove();
            b.fadeOut(0);
            b.fadeIn(0);
            e();
            return
        }
        c.fadeOut(this.navigationDelay + 100, function () {
            c.remove()
        });
        b.fadeOut(0);
        b.fadeIn(this.navigationDelay + 200, function () {
            e()
        })
    }, focus: function () {
        try {
            if (this.renderedCells && this.renderedCells.length > 0) {
                var d = this;
                var c = false;
                if (!d.selectedDate && d.selectionMode != "range") {
                    this.setDate(new Date(), "mouse")
                }
                this.element.focus()
            }
        } catch (b) {
        }
    }, renderViews: function (D, m, u) {
        var E = this;
        var d = new Array();
        var y = a("<table role='grid' style='border-color: transparent; width: 100%; height: 100%;' cellspacing='2' cellpadding='0' id=cellTable" + u.toString() + "><tr role='row' id='row1" + this.element.id + "'><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td></tr><tr role='row' id='row2" + this.element.id + "'><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td></tr><tr role='row' id='row3" + this.element.id + "'><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td></tr></table>");
        var p = this.host.find(".jqx-calendar-month-container");
        p.css("position", "relative");
        var z = D.find("#cellsTable" + D[0].id);
        z[0].style.borderColor = "transparent";
        var G = this._getDecadeAndCenturiesData();
        var l = G.years;
        var F = G.dates;
        var v = 0;
        var f = this.getMinDate();
        var n = this.getMaxDate();
        var s = new Date(this.value.dateTime);
        s.setDate(1);
        for (var x = 0; x < 3; x++) {
            for (var w = 0; w < 4; w++) {
                var c = x + 1;
                var t = w;
                if (this.rtl) {
                    t = 3 - t
                }
                var A = t + 1;
                var e = y[0].rows["row" + (1 + x) + this.element.id];
                var C = new Date(s);
                C.setMonth(x * 4 + t);
                var b = new a.jqx._jqxCalendar.cell(C);
                var o = a(e.cells[w]);
                b.isVisible = true;
                b.element = o;
                b.row = x;
                b.column = w;
                b.index = d.length;
                b.isSelected = false;
                var q = "";
                if (this.view == "year") {
                    if (C.getMonth() == this.getDate().getMonth() && C.getFullYear() == this.getDate().getFullYear()) {
                        b.isSelected = true
                    }
                    var h = this.localization.calendar.months.names;
                    var g = h[x * 4 + t];
                    switch (this.monthNameFormat) {
                        case"default":
                            g = this.localization.calendar.months.namesAbbr[x * 4 + t];
                            break;
                        case"shortest":
                            g = this.localization.calendar.months.namesShort[x * 4 + t];
                            break;
                        case"firstTwoLetters":
                            g = g.substring(0, 2);
                            break;
                        case"firstLetter":
                            g = g.substring(0, 1);
                            break
                    }
                    q = g
                } else {
                    if (this.view == "decade" || this.view == "centuries") {
                        q = l[x * 4 + t];
                        b.setDate(F[x * 4 + t]);
                        if (b.getDate().getFullYear() == this.getDate().getFullYear()) {
                            b.isSelected = true
                        }
                        if (undefined == q) {
                            q = "<span style='cursor: default; visibility: hidden;'>2013</span>"
                        }
                    }
                }
                var C = b.getDate();
                if (this.view == "year") {
                    if (this._getYearAndMonthPart(C) < this._getYearAndMonthPart(f)) {
                        b.isDisabled = true
                    }
                    if (this._getYearAndMonthPart(C) > this._getYearAndMonthPart(n)) {
                        b.isDisabled = true
                    }
                } else {
                    if (C.getFullYear() < f.getFullYear()) {
                        b.isDisabled = true
                    }
                    if (C.getFullYear() > n.getFullYear()) {
                        b.isDisabled = true
                    }
                }
                a.jqx.utilities.html(o, q);
                d[v] = b;
                v++
            }
        }
        a.each(d, function () {
            var j = this.element;
            var i = this;
            if (!E.disabled) {
                E.addHandler(j, "mousedown", function (k) {
                    E._setDateAndSwitchViews(i, k, "mouse")
                });
                E.addHandler(j, "mouseover", function (r) {
                    var k = E.renderedCells[i.index];
                    if (E.view != "centuries" && k.element.html().toLowerCase().indexOf("span") != -1) {
                        return
                    }
                    k.isHighlighted = true;
                    E._applyCellStyle(k, k.element, k.element)
                });
                E.addHandler(j, "mouseout", function (r) {
                    var k = E.renderedCells[i.index];
                    if (E.view != "centuries" && k.element.html().toLowerCase().indexOf("span") != -1) {
                        return
                    }
                    k.isHighlighted = false;
                    E._applyCellStyle(k, k.element, k.element)
                })
            }
        });
        var B = a.data(this.element, D[0].id);
        if (B != undefined && B != null) {
            B.cells = d
        }
        this.renderedCells = d;
        this._addCellsTable(z, y);
        this._applyCellStyles()
    }, _setDateAndSwitchViews: function (m, d, j) {
        if (!this._viewAnimating && !this._animating) {
            var g = this.getDate();
            var e = this.renderedCells[m.index].getDate();
            var k = this.value.dateTime.getDate();
            var l = new Date(e);
            if (this.views.indexOf("month") != -1) {
                l.setDate(k)
            } else {
                l.setDate(1);
                e.setDate(1)
            }
            if (l.getMonth() == e.getMonth()) {
                e = l
            }
            var i = this.getMinDate();
            var c = this.getMaxDate();
            if (this.view == "year") {
                if (this._getYearAndMonthPart(e) < this._getYearAndMonthPart(i)) {
                    return
                }
                if (this._getYearAndMonthPart(e) > this._getYearAndMonthPart(c)) {
                    return
                }
            } else {
                if (e.getFullYear() < i.getFullYear()) {
                    return
                }
                if (e.getFullYear() > c.getFullYear()) {
                    return
                }
            }
            if (this.selectionMode != "range") {
                this._selectDate(e)
            }
            this.oldView = this.view;
            switch (this.view) {
                case"year":
                    this.view = "month";
                    break;
                case"decade":
                    this.view = "year";
                    break
            }
            if (this.views.indexOf("month") == -1) {
                this.view = "year"
            }
            if (this.views.indexOf("year") == -1) {
                this.view = "decade"
            }
            if (this.view == "year") {
                if (this._getYearAndMonthPart(e) < this._getYearAndMonthPart(i)) {
                    e = i
                }
                if (this._getYearAndMonthPart(e) > this._getYearAndMonthPart(c)) {
                    e = c
                }
            } else {
                if (e.getFullYear() < i.getFullYear()) {
                    e = i
                }
                if (e.getFullYear() > c.getFullYear()) {
                    e = c
                }
            }
            if (this.changing && (this.selectedDate && (this.selectedDate.getFullYear() != e.getFullYear() || this.selectedDate.getMonth() != e.getMonth() || this.selectedDate.getDate() != e.getDate()))) {
                e = this.selectedDate
            }
            this.value._setYear(e.getFullYear());
            this.value._setDay(e.getDate());
            this.value._setMonth(e.getMonth() + 1);
            this.value._setDay(e.getDate());
            var h = this.getVisibleDate();
            var b = this.getFirstDayOfWeek(h);
            var f = "View" + this.element.id;
            this.renderCalendarCells(this.month, b, f, true);
            this.refreshTitle(this.month);
            if (this.showWeekNumbers) {
                this.refreshRowHeader(this.month, f)
            }
            if (this.views.length == 3) {
                if (this.view == "month") {
                    if (this.selectionMode != "range") {
                        this._selectDate(this.selectedDate, "view")
                    } else {
                        var n = this;
                        a.each(this.renderedCells, function (r) {
                            var o = this;
                            var t = o.getDate();
                            var p = a(o.element);
                            var q = p;
                            if (p.length == 0) {
                                return false
                            }
                            var s = function (v) {
                                if (v == null) {
                                    return new Date()
                                }
                                var u = new Date();
                                u.setHours(0, 0, 0, 0);
                                u.setFullYear(v.getFullYear(), v.getMonth(), v.getDate());
                                return u
                            };
                            if (!o.isOtherMonth && s(t).toString() == s(e).toString()) {
                                n.value._setMonth(e.getMonth() + 1);
                                n.value._setDay(e.getDate());
                                n.value._setYear(e.getFullYear())
                            }
                            o.isSelected = false;
                            o.isDisabled = false;
                            if (s(t) < s(n.selection.from) && n._clicks == 1) {
                                o.isDisabled = true
                            }
                            if (n.getMaxDate() < t) {
                                o.isDisabled = true
                            }
                            if (n.getMinDate() > t) {
                                o.isDisabled = true
                            }
                            if (n._isDisabled(t)) {
                                o.isDisabled = true
                            }
                            if (!o.isDisabled) {
                                if (s(t) >= s(n.selection.from) && s(t) <= s(n.selection.to)) {
                                    o.isSelected = true
                                }
                            }
                        });
                        this._applyCellStyles()
                    }
                }
            }
            if (this.view != "month") {
                if (this.oldView == "year" || (this.views.indexOf("year") == -1 && this.view == "decade")) {
                    if (j != "keyboard") {
                        this._raiseEvent("3")
                    }
                    this._raiseEvent("5", {selectionType: "mouse"})
                }
            }
            this._raiseEvent("8")
        }
    }, renderCalendarCells: function (D, m, s, q) {
        if (this.view == "year" || this.view == "decade" || this.view == "centuries") {
            this.renderViews(D, m, s);
            return
        }
        var x = a("<table role='grid' style='width: 100%; height: 100%; border-color: transparent;' cellspacing='2' cellpadding='1' id=cellTable" + s.toString() + "><tr role='row'><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td></tr><tr role='row'><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td></tr><tr role='row'><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td></tr><tr role='row'><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td></tr><tr role='row'><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td></tr><tr role='row'><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td></tr></table>");
        var y = this.table;
        y[0].style.borderColor = "transparent";
        if (q == undefined) {
            var g = y.find("#cellTable" + s.toString());
            if (g != null) {
                g.remove()
            }
            y.append(x)
        }
        var l = m;
        var b = this.showDayNames ? 1 : 0;
        var f = this.showWeekNumbers ? 1 : 0;
        var d = new Array();
        var t = 0;
        var v = (D.width() - this.rowHeaderWidth - 2) / 7;
        if (!this.showWeekNumbers) {
            v = (D.width() - 2) / 7
        }
        v = parseInt(v);
        var A = new a.jqx._jqxDateTimeInput.getDateTime(new Date());
        for (var w = 0; w < 6; w++) {
            for (var u = 0; u < 7; u++) {
                var e = w + 1;
                var o = u;
                if (this.rtl) {
                    o = 6 - o
                }
                var z = o + 1;
                var p = "#cell" + e + z + this.element.id;
                var C = new Date(l.dateTime.getFullYear(), l.dateTime.getMonth(), l.dateTime.getDate());
                var c = new a.jqx._jqxCalendar.cell(C);
                var n = a(x[0].rows[w].cells[z - 1]);
                n[0].id = p.substring(1);
                c.isVisible = true;
                c.isDisabled = false;
                if (l.month != this.value.month) {
                    c.isOtherMonth = true;
                    c.isVisible = this.showOtherMonthDays
                }
                if (C < this.getMinDate() || C > this.getMaxDate() || this._isDisabled(C)) {
                    c.isDisabled = true
                }
                if (l.month == A.month && l.day == A.day && l.year == A.year) {
                    c.isToday = true
                }
                if (l.isWeekend()) {
                    c.isWeekend = true
                }
                c.element = n;
                c.row = b;
                c.column = f;
                a.jqx.utilities.html(n, l.day);
                l = new a.jqx._jqxDateTimeInput.getDateTime(new Date(l._addDays(1)));
                a.data(this.element, "cellContent" + p.substring(1), c);
                a.data(this.element, "" + p.substring(1), c);
                var E = this;
                this.addHandler(n, "mousedown", function (I) {
                    if (!E.readOnly && !E.disabled) {
                        var H = a(I.target);
                        var j = a.data(E.element, H[0].id);
                        var i = E._raiseEvent(3, I);
                        if (j != null && j != undefined) {
                            var r = j.getDate();
                            if (E.getMinDate() <= r && r <= E.getMaxDate()) {
                                if (!j.isDisabled) {
                                    if (j.isOtherMonth && E.enableAutoNavigation) {
                                        if (j.row < 2) {
                                            E.navigateBackward()
                                        } else {
                                            E.navigateForward()
                                        }
                                        E._selectDate(j.getDate(), "mouse", I.shiftKey)
                                    } else {
                                        var F = new Date(E.getDate());
                                        E._selectDate(j.getDate(), "mouse", I.shiftKey);
                                        E.value._setYear(r.getFullYear());
                                        E.value._setDay(1);
                                        E.value._setMonth(r.getMonth() + 1);
                                        E.value._setDay(r.getDate());
                                        var G = E.host.find(".jqx-calendar-month");
                                        G.stop();
                                        G.css("margin-left", "0px");
                                        var k = E.getDate();
                                        E._raiseEvent("2");
                                        if (j.isOtherMonth) {
                                            E._raiseEvent("5", {selectionType: "mouse"})
                                        }
                                    }
                                }
                            }
                        }
                        return false
                    }
                });
                if (!E.disabled) {
                    var h = function (F, j) {
                        if (!E.readOnly) {
                            var r = a(F.target);
                            var i = a.data(E.element, r[0].id);
                            if (i != null && i != undefined) {
                                var k = i.getDate();
                                if (E.getMinDate() <= k && k <= E.getMaxDate()) {
                                    i.isHighlighted = j;
                                    E._applyCellStyle(i, i.element, r)
                                }
                            }
                        }
                    };
                    this.addHandler(n, "mouseenter", function (i) {
                        h(i, true);
                        return false
                    });
                    this.addHandler(n, "mouseleave", function (i) {
                        h(i, false);
                        return false
                    })
                }
                f++;
                d[t] = c;
                t++
            }
            f = 0;
            b++
        }
        var B = a.data(this.element, D[0].id);
        if (B != undefined && B != null) {
            B.cells = d
        }
        this.renderedCells = d;
        if (q != undefined) {
            this._addCellsTable(y, x)
        }
        this._applyCellStyles();
        this._refreshOtherMonthRows(B, s)
    }, setMaxDate: function (b, c) {
        if (b != null && typeof(b) == "string") {
            b = new Date(b);
            if (b == "Invalid Date") {
                return
            }
        }
        this.maxDate = a.jqx._jqxDateTimeInput.getDateTime(b);
        if (c !== false) {
            this.render()
        }
    }, getMaxDate: function () {
        if (this.maxDate != null && this.maxDate != undefined) {
            return this.maxDate.dateTime
        }
        return null
    }, setMinDate: function (b, c) {
        if (b != null && typeof(b) == "string") {
            b = new Date(b);
            if (b == "Invalid Date") {
                return
            }
        }
        this.minDate = a.jqx._jqxDateTimeInput.getDateTime(b);
        if (c !== false) {
            this.render()
        }
    }, getMinDate: function () {
        if (this.minDate != null && this.minDate != undefined) {
            return this.minDate.dateTime
        }
        return null
    }, navigateTo: function (f, h) {
        if (this.view == "month") {
            var g = this.getMinDate();
            var c = new Date(this.getMaxDate().getFullYear(), this.getMaxDate().getMonth() + 1, this.getMaxDate().getDate());
            if ((f < this._getYearAndMonthPart(g)) || (f > this._getYearAndMonthPart(c))) {
                return false
            }
        } else {
            if (f && (f.getFullYear() < this.getMinDate().getFullYear() || f.getFullYear() > this.getMaxDate().getFullYear())) {
                return false
            }
        }
        if (f == null) {
            return false
        }
        if (h == undefined) {
            var i = this;
            if (this._animating) {
                return
            }
            this._animating = true;
            var d = this.host.find(".jqx-calendar-month-container");
            if (this._viewClone) {
                this._viewClone.stop();
                this._viewClone.remove()
            }
            if (this._newViewClone) {
                this._newViewClone.stop();
                this._newViewClone.remove()
            }
            var k = this.host.find(".jqx-calendar-month");
            k.stop();
            k.css("margin-left", "0px");
            var b = k.clone();
            this._viewClone = b;
            var j = new Date(this.value.dateTime);
            this.value._setYear(f.getFullYear());
            this.value._setDay(f.getDate());
            this.value._setMonth(f.getMonth() + 1);
            i.refreshControl();
            d.css("position", "relative");
            b.css("position", "absolute");
            b.css("top", k.position().top);
            d.append(b);
            if (a.jqx.browser.msie && a.jqx.browser.version < 8) {
                this.month.css("position", "relative");
                this.month.css("overflow", "hidden");
                this.table.css("position", "relative");
                this.table.css("overflow", "hidden")
            }
            var e = -this.host.width();
            if (f < j) {
                if (this.view == "month" && f.getMonth() != j.getMonth()) {
                    e = this.host.width()
                } else {
                    if (f.getFullYear() != j.getFullYear()) {
                        e = this.host.width()
                    }
                }
            }
            b.animate({marginLeft: parseInt(e) + "px"}, this.navigationDelay, function () {
                b.remove()
            });
            var l = k.clone();
            this._newViewClone = l;
            l.css("position", "absolute");
            l.css("top", k.position().top);
            d.append(l);
            l.css("margin-left", -e);
            k.css("visibility", "hidden");
            l.animate({marginLeft: "0px"}, this.navigationDelay, function () {
                l.remove();
                k.css("visibility", "visible");
                i._animating = false
            })
        } else {
            this.value._setYear(f.getFullYear());
            this.value._setDay(f.getDate());
            this.value._setMonth(f.getMonth() + 1);
            var k = this.host.find(".jqx-calendar-month");
            k.stop();
            k.css("margin-left", "0px");
            this.refreshControl()
        }
        this._raiseEvent("2");
        this._raiseEvent("8");
        return true
    }, setDate: function (b) {
        if (b != null && typeof(b) == "string") {
            b = new Date(b)
        }
        if (this.canRender == false) {
            this.canRender = true;
            this.render()
        }
        this.navigateTo(b, "api");
        this._selectDate(b);
        if (this.selectionMode == "range") {
            this._selectDate(b, "mouse")
        }
        return true
    }, val: function (b) {
        if (arguments.length != 0) {
            if (b == null) {
                this.setDate(null)
            }
            if (b instanceof Date) {
                this.setDate(b)
            }
            if (typeof(b) == "string") {
                this.setDate(b)
            }
        }
        return this.getDate()
    }, getDate: function () {
        if (this.selectedDate == undefined) {
            return new Date()
        }
        return this.selectedDate
    }, getValue: function () {
        if (this.value == undefined) {
            return new Date()
        }
        return this.value.dateTime
    }, setRange: function (c, b) {
        if (this.canRender == false) {
            this.canRender = true;
            this.render()
        }
        this.navigateTo(c, "api");
        this._selectDate(c, "mouse");
        this._selectDate(b, "mouse")
    }, getRange: function () {
        return this.selection
    }, _selectDate: function (d, g, c) {
        if (this.selectionMode == "none") {
            return
        }
        if (g == null || g == undefined) {
            g = "none"
        }
        if (c == null || c == undefined) {
            c = false
        }
        var h = a.data(this.element, "View" + this.element.id);
        if (h == undefined || h == null) {
            return
        }
        if (this.changing) {
            if (d && this.selectedDate) {
                if (this.selectedDate.getFullYear() != d.getFullYear() || this.selectedDate.getDate() != d.getDate() || this.selectedDate.getMonth() != d.getMonth()) {
                    var i = this.changing(this.selectedDate, d)
                }
                if (i) {
                    d = i
                }
            }
        }
        var j = this;
        if (this.input) {
            if (d != null) {
                this.input.val(d.toString())
            } else {
                this.input.val("")
            }
        }
        var e = this.selectedDate;
        this.selectedDate = d;
        if (this.view != "month") {
            if (e != d) {
                this._raiseEvent(7)
            }
            a.each(this.renderedCells, function (o) {
                var k = this;
                var p = k.getDate();
                var l = a(k.element);
                var n = l.find("#cellContent" + l[0].id);
                if (d == null) {
                    k.isSelected = false;
                    k.isDisabled = false
                } else {
                    k.isSelected = false;
                    if (p) {
                        if ((p.getMonth() == d.getMonth() && j.view == "year" && p.getFullYear() == d.getFullYear()) || (j.view == "decade" && p.getFullYear() == d.getFullYear())) {
                            k.isSelected = true;
                            try {
                                if (g != "none") {
                                    k.element.focus()
                                }
                            } catch (m) {
                            }
                        }
                    }
                }
                j._applyCellStyle(k, l, l)
            });
            if (this.change) {
                this.change(d)
            }
            return
        }
        if (this.view == "month") {
            if (this.selectionMode == "range" && g == "key") {
                var f = this.getVisibleDate();
                var b = this.getFirstDayOfWeek(f);
                this.refreshCalendarCells(this.month, b, "View" + this.element.id)
            }
        }
        a.each(this.renderedCells, function (q) {
            var v = this;
            var n = v.getDate();
            var u = a(v.element);
            var k = u;
            if (u.length == 0) {
                return false
            }
            if (d == null) {
                v.isSelected = false;
                v.isDisabled = false;
                if (q == 0) {
                    j.selection = {from: null, to: null};
                    j._raiseEvent("2");
                    j._raiseEvent("5", {selectionType: g})
                }
            } else {
                if (j.selectionMode != "range" || g == "key") {
                    if (n.getDate() == d.getDate() && n.getMonth() == d.getMonth() && n.getFullYear() == d.getFullYear() && v.isSelected) {
                        j._applyCellStyle(v, u, k);
                        j._raiseEvent("5", {selectionType: g});
                        return
                    }
                    if (v.isSelected) {
                        j._raiseEvent("6", {selectionType: g})
                    }
                    v.isSelected = false;
                    if (n.getDate() == d.getDate() && n.getMonth() == d.getMonth() && n.getFullYear() == d.getFullYear()) {
                        v.isSelected = true;
                        if (q == 0) {
                            j.selection = {date: d}
                        }
                        try {
                            if (g != "none") {
                                v.element.focus();
                                j.host.focus()
                            }
                        } catch (r) {
                        }
                        if (!v.isOtherMonth) {
                            j.value._setMonth(d.getMonth() + 1);
                            j.value._setDay(d.getDate());
                            j.value._setYear(d.getFullYear());
                            j._raiseEvent("2");
                            j._raiseEvent("5", {selectionType: g})
                        }
                    }
                    if (j.selectionMode == "range") {
                        j._clicks = 0;
                        j.selection = {from: d, to: d}
                    }
                } else {
                    if (j.selectionMode == "range") {
                        if (g == "view") {
                            v.isSelected = false;
                            v.isDisabled = false;
                            if (j.getMaxDate() < n) {
                                v.isDisabled = true
                            }
                            if (j.getMinDate() > n) {
                                v.isDisabled = true
                            }
                            if (j._isDisabled(n)) {
                                v.isDisabled = true
                            }
                            j._applyCellStyle(v, u, k);
                            return true
                        }
                        if (q == 0) {
                            if (g != "none") {
                                if (j._clicks == undefined) {
                                    j._clicks = 0
                                }
                                j._clicks++;
                                if (c) {
                                    j._clicks++
                                }
                                if (j._clicks == 1) {
                                    j.selection = {from: d, to: d}
                                } else {
                                    var t = j.selection.from;
                                    var p = t <= d ? t : d;
                                    var s = t <= d ? d : t;
                                    if (p) {
                                        var l = new Date(p.getFullYear(), p.getMonth(), p.getDate())
                                    }
                                    if (s) {
                                        var m = new Date(s.getFullYear(), s.getMonth(), s.getDate(), 23, 59, 59)
                                    }
                                    j.selection = {from: l, to: m};
                                    j._clicks = 0
                                }
                            } else {
                                if (j.selection == null || j.selection.from == null) {
                                    j.selection = {from: d, to: d};
                                    if (j._clicks == undefined) {
                                        j._clicks = 0
                                    }
                                    j._clicks++;
                                    if (j._clicks == 2) {
                                        j._clicks = 0
                                    }
                                }
                            }
                        }
                        var o = function (x) {
                            if (x == null) {
                                return new Date()
                            }
                            var w = new Date();
                            w.setHours(0, 0, 0, 0);
                            w.setFullYear(x.getFullYear(), x.getMonth(), x.getDate());
                            return w
                        };
                        if (!v.isOtherMonth && o(n).toString() == o(d).toString()) {
                            j.value._setMonth(d.getMonth() + 1);
                            j.value._setDay(d.getDate());
                            j.value._setYear(d.getFullYear());
                            j._raiseEvent("2");
                            j._raiseEvent("5", {selectionType: g})
                        }
                        v.isSelected = false;
                        v.isDisabled = false;
                        if (o(n) < o(j.selection.from) && j._clicks == 1) {
                            v.isDisabled = true
                        }
                        if (j.getMaxDate() < n) {
                            v.isDisabled = true
                        }
                        if (j.getMinDate() > n) {
                            v.isDisabled = true
                        }
                        if (j._isDisabled(n)) {
                            v.isDisabled = true
                        }
                        if (!v.isDisabled) {
                            if (o(n) >= o(j.selection.from) && o(n) <= o(j.selection.to)) {
                                v.isSelected = true
                            }
                        }
                    }
                }
            }
            j._applyCellStyle(v, u, k)
        });
        if (j.selectionMode == "range" && j._clicks == 0) {
            j._raiseEvent(7);
            return
        } else {
            if (j.selectionMode == "range") {
                return
            }
        }
        if (e != d) {
            j._raiseEvent(7);
            if (this.change) {
                this.change(d)
            }
        }
    }, _getSelectedDate: function () {
        var d = a.data(this.element, "View" + this.element.id);
        if (d == undefined || d == null) {
            return
        }
        if (this.view != "month") {
            return this.selectedDate
        }
        for (var c = 0; c < d.cells.length; c++) {
            var b = d.cells[c];
            var e = b.getDate();
            if (b.isSelected) {
                return e
            }
        }
        if (this.selectedDate) {
            return this.selectedDate
        }
    }, _getSelectedCell: function () {
        var d = a.data(this.element, "View" + this.element.id);
        if (d == undefined || d == null) {
            return
        }
        for (var c = 0; c < d.cells.length; c++) {
            var b = d.cells[c];
            var e = b.getDate();
            if (b.isSelected) {
                return b
            }
        }
    }, _applyCellStyle: function (c, d, g) {
        var e = this;
        if (g == null || (g != null && g.length == 0)) {
            g = d
        }
        var b = "";
        b = this.toThemeProperty("jqx-rc-all");
        b += " " + this.toThemeProperty("jqx-item");
        if (this.disabled || c.isDisabled) {
            b += " " + this.toThemeProperty("jqx-calendar-cell-disabled");
            b += " " + this.toThemeProperty("jqx-fill-state-disabled")
        }
        if (c.isOtherMonth && this.enableOtherMonthDays && c.isVisible) {
            b += " " + this.toThemeProperty("jqx-calendar-cell-othermonth")
        }
        if (c.isWeekend && this.enableWeekend && c.isVisible && c.isVisible) {
            b += " " + this.toThemeProperty("jqx-calendar-cell-weekend")
        }
        if (!c.isVisible) {
            b += " " + this.toThemeProperty("jqx-calendar-cell-hidden")
        } else {
            b += " " + this.toThemeProperty("jqx-calendar-cell");
            if (this.view != "month") {
                if (g.length > 0 && g.html().toLowerCase().indexOf("span") != -1) {
                    g.css("cursor", "default")
                }
            }
        }
        g.removeAttr("aria-selected");
        if (c.isSelected && c.isVisible) {
            b += " " + this.toThemeProperty("jqx-calendar-cell-selected");
            b += " " + this.toThemeProperty("jqx-fill-state-pressed");
            g.attr("aria-selected", true);
            this.host.removeAttr("aria-activedescendant").attr("aria-activedescendant", g[0].id);
            var f = c.getDate();
            if (this._isDisabled(f)) {
                b += " " + this.toThemeProperty("jqx-calendar-cell-selected-invalid")
            }
        }
        if (c.isHighlighted && c.isVisible && this.enableHover) {
            if (!c.isDisabled) {
                b += " " + this.toThemeProperty("jqx-calendar-cell-hover");
                b += " " + this.toThemeProperty("jqx-fill-state-hover")
            }
        }
        b += " " + this.toThemeProperty("jqx-calendar-cell-" + this.view);
        if (c.isToday && c.isVisible) {
            b += " " + this.toThemeProperty("jqx-calendar-cell-today")
        }
        g[0].className = b;
        if (this.specialDates.length > 0) {
            var h = this;
            a.each(this.specialDates, function () {
                if (this.Class != undefined && this.Class != null && this.Class != "") {
                    g.removeClass(this.Class)
                } else {
                    g.removeClass(e.toThemeProperty("jqx-calendar-cell-specialDate"))
                }
                var i = c.getDate();
                if (i.getFullYear() == this.Date.getFullYear() && i.getMonth() == this.Date.getMonth() && i.getDate() == this.Date.getDate()) {
                    if (c.tooltip == null && this.Tooltip != null) {
                        c.tooltip = this.Tooltip;
                        if (a(g).jqxTooltip) {
                            var j = this.Class;
                            a(g).jqxTooltip({value: {cell: c, specialDate: this.Date}, name: h.element.id, content: this.Tooltip, position: "mouse", theme: h.theme, opening: function (k) {
                                if (g.hasClass(e.toThemeProperty("jqx-calendar-cell-specialDate"))) {
                                    return true
                                }
                                if (g.hasClass(j)) {
                                    return true
                                }
                                return false
                            }})
                        }
                    }
                    g.removeClass(e.toThemeProperty("jqx-calendar-cell-othermonth"));
                    g.removeClass(e.toThemeProperty("jqx-calendar-cell-weekend"));
                    if (this.Class == undefined || this.Class == "") {
                        g.addClass(e.toThemeProperty("jqx-calendar-cell-specialDate"));
                        return false
                    } else {
                        g.addClass(this.Class);
                        return false
                    }
                }
            })
        }
    }, _applyCellStyles: function () {
        var f = a.data(this.element, "View" + this.element.id);
        if (f == undefined || f == null) {
            return
        }
        for (var e = 0; e < f.cells.length; e++) {
            var b = f.cells[e];
            var c = a(b.element);
            var d = c.find("#cellContent" + c[0].id);
            if (d.length == 0) {
                d = c
            }
            this._applyCellStyle(b, c, d)
        }
    }, getWeekOfYear: function (f) {
        var b = new Date(f.dateTime);
        dowOffset = this.firstDayOfWeek;
        var e = new Date(b.getFullYear(), 0, 1);
        var c = e.getDay() - dowOffset;
        c = (c >= 0 ? c : c + 7);
        var d = Math.floor((b.getTime() - e.getTime() - (b.getTimezoneOffset() - e.getTimezoneOffset()) * 60000) / 86400000) + 1;
        var g;
        if (c < 4) {
            g = Math.floor((d + c - 1) / 7) + 1;
            if (g > 52) {
                nYear = new Date(b.getFullYear() + 1, 0, 1);
                nday = nYear.getDay() - dowOffset;
                nday = nday >= 0 ? nday : nday + 7;
                g = nday < 4 ? 1 : 53
            }
        } else {
            g = Math.floor((d + c - 1) / 7)
        }
        return g
    }, renderColumnHeader: function (w) {
        if (!this.showDayNames) {
            return
        }
        var t = a("<table role='grid' style='border-spacing: 0px; border-collapse: collapse; width: 100%; height: 100%;' cellspacing='0' cellpadding='1'><tr role='row'><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td></tr></table>");
        t.find("table").addClass(this.toThemeProperty("jqx-reset"));
        t.find("tr").addClass(this.toThemeProperty("jqx-reset"));
        t.find("td").css({background: "transparent", padding: 1, margin: 0, border: "none"});
        t.addClass(this.toThemeProperty("jqx-reset"));
        t.addClass(this.toThemeProperty("jqx-widget-content"));
        t.addClass(this.toThemeProperty("jqx-calendar-column-header"));
        this.columnHeader.append(t);
        var d = this.getVisibleDate();
        var h = this.getFirstDayOfWeek(d);
        var m = h.dayOfWeek;
        var x = this.getWeekOfYear(h);
        var q = this.firstDayOfWeek;
        var v = this.localization.calendar.days.names;
        var n = new Array();
        var g = h;
        var o = (w.width() - this.rowHeaderWidth - 2) / 7;
        if (!this.showWeekNumbers) {
            o = (w.width() - 2) / 7
        }
        for (var s = 0; s < 7; s++) {
            var f = v[q];
            if (this.rtl) {
                f = v[6 - q]
            }
            switch (this.dayNameFormat) {
                case"default":
                    f = this.localization.calendar.days.namesAbbr[q];
                    if (this.rtl) {
                        f = this.localization.calendar.days.namesAbbr[6 - q]
                    }
                    break;
                case"shortest":
                    f = this.localization.calendar.days.namesShort[q];
                    if (this.rtl) {
                        f = this.localization.calendar.days.namesShort[6 - q]
                    }
                    break;
                case"firstTwoLetters":
                    f = f.substring(0, 2);
                    break;
                case"firstLetter":
                    f = f.substring(0, 1);
                    break
            }
            var b = new a.jqx._jqxCalendar.cell(g.dateTime);
            var k = s + 1;
            var l = k + this.element.id;
            var j = a(t[0].rows[0].cells[s]);
            var p = s;
            if (this.enableTooltips) {
                if (a(j).jqxTooltip) {
                    a(j).jqxTooltip({name: this.element.id, content: v[q], theme: this.theme, position: "mouse"})
                }
            }
            if (q >= 6) {
                q = 0
            } else {
                q++
            }
            s = p;
            b.element = j;
            b.row = 0;
            b.column = s + 1;
            var e = this._textwidth(f);
            var c = "<div style='padding: 0; margin: 0; border: none; background: transparent;' id='columnCell" + l + "'>" + f + "</div>";
            j.append(c);
            j.find("#columnCell" + l).addClass(this.toThemeProperty("jqx-calendar-column-cell"));
            j.width(o);
            if (this.disabled) {
                j.find("#columnCell" + l).addClass(this.toThemeProperty("jqx-calendar-column-cell-disabled"))
            }
            if (e > 0 && o > 0) {
                while (e > j.width()) {
                    if (f.length == 0) {
                        break
                    }
                    f = f.substring(0, f.length - 1);
                    a.jqx.utilities.html(j.find("#columnCell" + l), f);
                    e = this._textwidth(f)
                }
            }
            n[s] = b;
            g = new a.jqx._jqxDateTimeInput.getDateTime(new Date(g._addDays(1)))
        }
        if (parseInt(this.columnHeader.width()) > parseInt(this.host.width())) {
            this.columnHeader.width(this.host.width())
        }
        var u = a.data(this.element, w[0].id);
        u.columnCells = n
    }, _format: function (d, e, b) {
        var f = false;
        try {
            if (Globalize != undefined) {
                f = true
            }
        } catch (c) {
        }
        if (a.global) {
            a.global.culture.calendar = this.localization.calendar;
            return a.global.format(d, e, this.culture)
        } else {
            if (f) {
                try {
                    if (Globalize.cultures[this.culture]) {
                        Globalize.cultures[this.culture].calendar = this.localization.calendar;
                        return Globalize.format(d, e, this.culture)
                    } else {
                        return Globalize.format(d, e, this.culture)
                    }
                } catch (c) {
                    return Globalize.format(d, e)
                }
            } else {
                if (a.jqx.dataFormat) {
                    return a.jqx.dataFormat.formatdate(d, e, this.localization.calendar)
                }
            }
        }
    }, _textwidth: function (d) {
        var c = a("<span>" + d + "</span>");
        c.addClass(this.toThemeProperty("jqx-calendar-column-cell"));
        a(this.host).append(c);
        var b = c.width();
        c.remove();
        return b
    }, _textheight: function (d) {
        var c = a("<span>" + d + "</span>");
        a(this.host).append(c);
        var b = c.height();
        c.remove();
        return b
    }, _renderRowHeader: function (k) {
        var g = this.getVisibleDate();
        var c = this.getFirstDayOfWeek(g);
        var f = c.dayOfWeek;
        var s = this.getWeekOfYear(c);
        var o = new a.jqx._jqxDateTimeInput.getDateTime(new Date(c.dateTime));
        o._addDays(5);
        o.dayOfWeek = o.dateTime.getDay();
        var m = this.getWeekOfYear(o);
        if (53 == s && o.dateTime.getMonth() == 0) {
            s = 1
        }
        var l = a("<table style='overflow: hidden; width: 100%; height: 100%;' cellspacing='0' cellpadding='1'><tr><td></td></tr><tr><td/></tr><tr><td/></tr><tr><td/></tr><tr><td/></tr><tr><td/></tr></table>");
        l.find("table").addClass(this.toThemeProperty("jqx-reset"));
        l.find("td").addClass(this.toThemeProperty("jqx-reset"));
        l.find("tr").addClass(this.toThemeProperty("jqx-reset"));
        l.addClass(this.toThemeProperty("jqx-calendar-row-header"));
        l.width(this.rowHeaderWidth);
        this.rowHeader.append(l);
        var d = c;
        var r = new Array();
        for (var h = 0; h < 6; h++) {
            var e = s.toString();
            var q = new a.jqx._jqxCalendar.cell(d.dateTime);
            var j = h + 1 + this.element.id;
            var p = a(l[0].rows[h].cells[0]);
            q.element = p;
            q.row = h;
            q.column = 0;
            var b = "<div style='background: transparent; border: none; padding: 0; margin: 0;' id ='headerCellContent" + j + "'>" + e + "</div>";
            p.append(b);
            p.find("#headerCellContent" + j).addClass(this.toThemeProperty("jqx-calendar-row-cell"));
            r[h] = q;
            d = new a.jqx._jqxDateTimeInput.getDateTime(new Date(d._addWeeks(1)));
            s = this.getWeekOfYear(d)
        }
        var n = a.data(this.element, k[0].id);
        n.rowCells = r
    }, getFirstDayOfWeek: function (e) {
        var d = e;
        if (this.firstDayOfWeek < 0 || this.firstDayOfWeek > 6) {
            this.firstDayOfWeek = 6
        }
        var c = d.dayOfWeek - this.firstDayOfWeek;
        if (c <= 0) {
            c += 7
        }
        var b = a.jqx._jqxDateTimeInput.getDateTime(d._addDays(-c));
        return b
    }, getVisibleDate: function () {
        var c = new a.jqx._jqxDateTimeInput.getDateTime(new Date(this.value.dateTime));
        if (c < this.minDate) {
            c = this.minDate
        }
        if (c > this.maxDate) {
            this.visibleDate = this.maxDate
        }
        c.dateTime.setHours(0);
        var d = c.day;
        var b = a.jqx._jqxDateTimeInput.getDateTime(c._addDays(-d + 1));
        c = b;
        return c
    }, destroy: function (b) {
        this.host.removeClass();
        if (b != false) {
            this.host.remove()
        }
    }, _raiseEvent: function (i, c) {
        if (c == undefined) {
            c = {owner: null}
        }
        var e = this.events[i];
        var f = c ? c : {};
        f.owner = this;
        var g = new a.Event(e);
        g.owner = this;
        g.args = f;
        if (i == 0 || i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8) {
            g.args.date = g.args.selectedDate = this.getDate();
            g.args.range = this.getRange();
            var h = this.getViewStart();
            var d = this.getViewEnd();
            g.args.view = {from: h, to: d}
        }
        var b = this.host.trigger(g);
        if (i == 0 || i == 1) {
            b = false
        }
        return b
    }, propertyMap: function (b) {
        if (b == "value") {
            if (this.selectionMode != "range") {
                return this.getDate()
            } else {
                return this.getRange()
            }
        }
        return null
    }, updateSize: function () {
        var d = this.host.find("#View" + this.element.id);
        if (d.length > 0) {
            this.setCalendarSize();
            if (this.height != undefined && !isNaN(this.height)) {
                d.height(this.height)
            } else {
                if (this.height != null && this.height.toString().indexOf("px") != -1) {
                    d.height(this.height)
                }
            }
            if (this.width != undefined && !isNaN(this.width)) {
                d.width(this.width)
            } else {
                if (this.width != null && this.width.toString().indexOf("px") != -1) {
                    d.width(this.width)
                }
            }
            var c = this.host.height() - this.titleHeight - this.columnHeaderHeight;
            var b = "View" + this.element.id;
            d.find("#cellsTable" + b).height(c);
            d.find("#calendarRowHeader" + b).height(c);
            this.refreshControl()
        }
    }, resize: function () {
        this.updateSize()
    }, clear: function () {
        if (this.selectionMode == "range") {
            this._clicks = 1;
            this.setRange(null, null);
            this._raiseEvent(7)
        } else {
            this.setDate(null, "mouse")
        }
        this._clicks = 0;
        this.selection = {from: null, to: null}
    }, today: function () {
        if (this.selectionMode == "range") {
            this.setRange(new Date(), new Date())
        } else {
            this.setDate(new Date(), "mouse")
        }
    }, propertyChangedHandler: function (d, e, g, f) {
        if (this.isInitialized == undefined || this.isInitialized == false) {
            return
        }
        if (e == "enableHover") {
            return
        }
        if (e == "keyboardNavigation") {
            return
        }
        if (e == "localization") {
            if (this.localization) {
                if (this.localization.backString) {
                    this.backText = this.localization.backString
                }
                if (this.localization.forwardString) {
                    this.forwardText = this.localization.forwardString
                }
                if (this.localization.todayString) {
                    this.todayString = this.localization.todayString
                }
                if (this.localization.clearString) {
                    this.clearString = this.localization.clearString
                }
                this.firstDayOfWeek = this.localization.calendar.firstDay
            }
        }
        if (e == "culture") {
            try {
                if (a.global) {
                    a.global.preferCulture(d.culture);
                    d.localization.calendar = a.global.culture.calendar
                } else {
                    if (Globalize) {
                        var b = Globalize.culture(d.culture);
                        d.localization.calendar = b.calendar
                    }
                }
            } catch (c) {
            }
        }
        if (e == "views") {
            if (d.views.indexOf("month") == -1) {
                d.view = "year"
            }
            if (d.views.indexOf("year") == -1 && d.views.indexOf("month") == -1) {
                d.view = "decade"
            }
            d.render();
            return
        }
        if (e == "showFooter") {
            d.render()
        }
        if (e == "width" || e == "height") {
            d.updateSize();
            return
        } else {
            if (e == "theme") {
                a.jqx.utilities.setTheme(g, f, d.host)
            } else {
                if (e == "rowHeaderWidth" || e == "showWeekNumbers") {
                    d.render()
                } else {
                    d.view = "month";
                    d.render()
                }
            }
        }
    }})
})(jqxBaseFramework);
(function (a) {
    a.jqx._jqxCalendar.cell = function (c) {
        var b = {dateTime: new a.jqx._jqxDateTimeInput.getDateTime(c), _date: c, getDate: function () {
            return this._date
        }, setDate: function (d) {
            this.dateTime = new a.jqx._jqxDateTimeInput.getDateTime(d);
            this._date = d
        }, isToday: false, isWeekend: false, isOtherMonth: false, isVisible: true, isSelected: false, isHighlighted: false, element: null, row: -1, column: -1, tooltip: null};
        return b
    };
    a.jqx._jqxCalendar.monthView = function (c, h, d, b, f, e) {
        var g = {start: c, end: h, cells: d, rowCells: b, columnCells: f, element: e};
        return g
    }
})(jqxBaseFramework);