/**
 * Created by wangjialin on 15/9/15.
 */
var pageConfig = function () {
    var conf = new Object();
    if (location.href.indexOf("yun.sogou/") != -1) {
        conf.appid = "1027";
        conf.expires = 24 * 3600;
        conf.interfacePath = "/interface/";
        conf.serverPath = "http://yun.sogou/api/";
        conf.debug = false;
    } else {
        conf.appid = "1023";
        conf.expires = 30 * 60;
        conf.interfacePath = "/interface/";
        conf.serverPath = "http://yun.sogou/api/";
        conf.debug = true;
    }
    return conf;
}();
var pandora = {
    ptoken: "",
    isLogin: false,
    expires: pageConfig.expires,
    url: function () {
        return encodeURI(window.location.href);
    },
    userinfo: {},
    checkLogin: function () {
        $.cookie.json = true;
        $.cookie.time = 1000;
        this.ptoken = $.urlParams("get", "ptoken");
        var r = $.cookie('_cloud_user');
        if (typeof(r) == "undefined") {
            if (this.ptoken != "") {
                this.rsa();
            } else {
                this.ssoRedirect();
            }
        } else {
            $.cookie("_cloud_user", r, {expires: this.expires, path: "/"});
            this.getUserIcon(r);
            $(document).trigger("userloaded", r);
        }
    },
    getUserIcon: function (data) {
        var img = new Image();
        img.src = 'http://oa.sogou-inc.com/moa/sylla/mapi/portrait?uid=' + data.uid + '&w=74&h=74';
        this.userinfo.icon = img;
        $(".usericon").append(img);
        $(".username").html(data.uid + "@sogou-inc.com")
        $(".userinfo").append(data.name + " - " + data.uno)
    },
    //确认登陆并延续Cookie
    updateCookie: function (data) {
        this.isLogin = true;
        $.cookie("_cloud_user", data, {expires: this.expires, path: "/"});
        $(document).trigger("userloaded", data);
    },
    rsa: function () {
        $.ajax({
            url: pageConfig.interfacePath + "index.php",
            data: {"token": this.ptoken},
            async: false,
            dataType: "json",
            method: "POST",
            context: this,
            success: function (data, xhr, opt) {
                this.getUserIcon(data);
                this.updateCookie(data);
            }
        });
    },
    ssoRedirect: function () {
        window.location.href = "https://oa.sogou-inc.com/sso/?appid=" + pageConfig.appid + "&redirect=" + this.url();
    }
};

var PASS_DropdropDown = function (config) {
    this.config = config;
    this.open = false;
    var self = this;
    var sel = self.config.selector;
    var arrow = self.config.arrowClass;

    this.init = function () {
        var e = this.config.event;
        if (typeof e == "undefined" || e == "" || e == null) {
            e = "hover";
        }
        switch (e) {
            case "click":
                initClick();
                break;
            case "hover":
                initHover();
                break;
            default :
                initHover();
                break;
        }
        var o = sel.children(".dropdown-menu").show();
        TweenMax.set(o, {autoAlpha: 0});
    };
    this.clickHandler = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (self.open) {
            close();
        } else {
            open();
        }
    };
    this.overHandler = function (e) {
        e.preventDefault();
        e.stopPropagation();
        open()
    };
    this.outHandler = function (e) {
        e.preventDefault();
        e.stopPropagation();
        close();
    };
    function open() {
        TweenMax.fromTo(sel.children(".dropdown-menu"), 0.3, {autoAlpha: 0, y: "20"}, {autoAlpha: 1, y: 0});
        self.open = false;
        sel.find(arrow).addClass("active");
    }

    function close() {
        TweenMax.fromTo(sel.children(".dropdown-menu"), 0.3, {autoAlpha: 1, y: 0}, {autoAlpha: 0, y: "20"});
        self.open = true;
        sel.find(arrow).removeClass("active");
    }

    function initClick() {
        sel.on("click", self.clickHandler);
    }

    function initHover() {

        sel.hover(
            self.overHandler, self.outHandler
        )
    }

    this.init();
};

var User = {
    uid: "",
    proj: "_",
    domains: "|",
    getUserInfo: function (e, data, self) {
        self.uid = data.uid;
        var settings = {
            url: pageConfig.serverPath + "user.php",
            data: {"uid": self.uid, type: "get"},
            cache: false,
            dataType: pageConfig.debug ? "jsonp" : "json",
            context: this,
            success: function (data, xhr, opt) {
                if (pageConfig.debug) data = $.parseJSON(data);
                if (parseInt(data.status) > 0) {
                    var o = data.result;
                    this.proj = o.proj;
                    this.domains = o.domains;
                    this.callback(o.proj, o.domains);

                    if (this.domains == "|" && this.proj == "_") {
                        $(document).trigger("showFilter");
                    } else {
                        $(document).trigger("initPage");
                    }
                } else {
                    url = encodeURI(window.location.href);
                    window.location.href = "https://oa.sogou-inc.com/sso/?appid=" + pageConfig.appid + "&redirect=" + url;
                    ;
                }

            }
        };
        $.ajax(settings);

    },
    saveUserInfo: function (e, data, self) {
        var json = JSON.stringify(data);
        var uid = self.uid;
        if (pageConfig.debug) {
            alert("POST: \n uid: " + uid + "\n data: " + json);

        }
        $.ajax({
            url: pageConfig.serverPath + "user.php",
            data: {"uid": self.uid, type: "set", userinfo: json},
            async: false,
            dataType: "json",
            method: "GET",
            context: self,
            success: function (data, xhr, opt) {
            }
        });

    },
    init: function (callback) {
        var self = this;
        this.callback = callback;
        $(document).on("userloaded", function (e, data) {
            self.getUserInfo(e, data, self)
        });
        $(document).on("usersave", function (e, data) {
            self.saveUserInfo(e, data, self)
        })
    },
    callback: null
}

//ALL Page Should Be Execute Following Code
$(document).ready(function () {
    var o = $("body > div:last-child");
    if (o.length > 0 && o.attr("id").indexOf("xunlei") > -1) {
        o.hide();
    }
    var o = $(".mainmenu li.active");

    if (typeof CHANNEL != "number") {
        if (o.length == 0) {
            o = $(".mainmenu li:eq(0)").addClass("on active");
        } else {
            o.addClass("on");
        }
    } else {
        if (CHANNEL > $(".mainmenu li").length - 1) {
            if (o.length == 0) {
                o = $(".mainmenu li:eq(0)").addClass("on active");
            } else {
                o.addClass("on");
            }
        } else {
            if (o.length > 0) {
                o.removeClass("on active");
            }
            o = $(".mainmenu li:eq(" + CHANNEL + ")").addClass("on active");
        }
        if (CHANNEL != 1) {
            $(".helself").hide();
        }
    }
    if (o.length > 0) {
        o.children("a").attr("href", "javascript:;");
        $(".mainmenu .arrow").css("top", 46 * o.index()).show();
    }
});

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

Date.prototype.Between = function (date) {
    var be = this.getTime() - date.getTime();
    return {
        d: Math.floor(be / (24 * 3600 * 1000)),
        h: Math.floor(be / (3600 * 1000)),
        m: Math.floor(be / (60 * 1000))
    };
};

Array.prototype.removeArr = function (index) {
    if (isNaN(index) || index >= this.length) {
        return false;
    }
    this.splice(index, 1);
}
/*
 *  插入数组元素:Array.insertArr(dx)
 */
Array.prototype.insertArr = function (index, item) {
    this.splice(index, 0, item);
};

function parseDigital(max, number, unit) {

    var s = number;
    var i = 0, r = 0;
    if (max != "max") {
        while (s.toString().length > max) {
            s = Math.round(s / 10);
            i++;
        }
        r = Math.ceil(i / 3);
        if (r * 3 > i) {
            s = s / Math.pow(10, r * 3 - i);
        } else {
            s = s * Math.pow(10, i - r * 3);
        }
    } else {
        while (s / 1000 > 1 && r <= 4) {
            r++;
            s = s / 1000;
        }
        s = Math.round(s * 100) / 100;
    }


    var u = "";
    switch (r) {
        case 1:
            u = "K";
            break;
        case 2:
            u = "M";
            break;
        case 3:
            u = "G";
            break;
        case 4:
            u = "T";
            break;
    }
    return s + " " + u + unit;
};
