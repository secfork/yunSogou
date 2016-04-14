var charui = function (conf) {


    // class style config
    this.conf = conf;
    this.sw = conf.width;
    this.sh = conf.height;
    this.leftSpace = 50;
    this.btmSpace = 30;
    this.allowOverflow = false;   //初始化是否允许溢出

    // class internal config
    var self = this;
    var GD_Space = 18;
    var GD_MaxStep = 48;
    var GD_Sep = 4;
    var GD_w = this.sw - this.leftSpace;
    var GD_h = this.sh - this.btmSpace;

    // class Key Attribute
    this.maxEle = 0;
    this.levelY = 300;

    // class Standard Object
    this.stage = new createjs.Stage("chart1");
    var _guild = new createjs.Shape();
    var _curve = new createjs.Shape();
    var _line = new createjs.Container();
    var _mx = new createjs.Matrix2D(1, 0, 0, -1, 0, this.sh - this.btmSpace);

    _mx.decompose(_guild);
    _guild.x = this.leftSpace;

    this.stage.addChild(_guild);
    this.stage.addChild(_curve);
    this.stage.addChild(_line);

    this.testStep = function (step) {
        if (step * GD_Space <= GD_w) {
            return step;
        } else {
            if (step % 2 == 0) {
                return this.testStep(step / 2)
            } else {
                return step;
            }
        }
    };
    this.drawX = function (ds, GD_conf) {
        var l = GD_conf.tMaxStep / GD_conf.tSep;
        var old = "";
        for (var i = 0; i < l; i++) {
            var x = Math.floor(i / l * ds.length);
            var o = ds.data[x];
            var date = new Date(o.d), str;
            if (o.d.indexOf(old) != -1) {
                old = date.Format("yyyy-MM-dd");
                str = date.Format("hh:mm \n yyyy-MM-dd");
            } else {
                str = date.Format("hh:mm");
            }
            var txt = new createjs.Text(str, "12px arial", "#333");
            txt.x = 50.5 + GD_conf.tSpace * i * GD_conf.tSep;
            txt.y = this.sh - this.btmSpace + 5;
            txt.textAlign = "center";
            _line.addChild(txt);
        }
        date = new Date(ds.data[ds.length - 1].d);
        if (o.d.indexOf(old) != -1) {
            old = date.Format("yyyy-MM-dd");
            str = date.Format("hh:mm \n yyyy-MM-dd");
        } else {
            str = date.Format("hh:mm");
        }

        var txt = new createjs.Text(str, "12px arial", "#333");
        txt.x = 50.5 + GD_conf.tSpace * l * GD_conf.tSep;
        txt.y = this.sh - this.btmSpace + 5;
        txt.textAlign = "center";
        _line.addChild(txt);
    };
    this.drawY = function (ds, GD_conf) {
        var step = Math.floor(GD_h / GD_conf.tSpace);
        if (GD_conf.tSep > 1) {
            step = Math.floor(GD_h / GD_conf.tSpace / GD_conf.tSep);
        }
        var l = this.getlevel(ds.max, step, this.levelY);
        for (var i = 1; i <= step; i++) {
            var txt = new createjs.Text(l * i, "12px arial", "#333");
            txt.x = 30;
            txt.y = this.sh - GD_conf.tSpace * i * GD_conf.tSep - this.btmSpace;
            txt.textAlign = "right";
            _line.addChild(txt);
        }
        this.levelY = l;
        return step;
    };
    this.getlevel = function (max, step, level) {
        if (level * step < max) {
            level += this.levelY;
            return this.getlevel(max, step, level);
        } else {
            return level;
        }
    };
    this.drawGuild = function (l) {

        var g = _guild, tSpace, tSep, tMaxStep, tNum, tW, tH = GD_h;
        g.graphics.setStrokeDash([1, 1]);
        this.maxEle = l;                                  //获取最大样本数量
        var tI = Math.floor(GD_w / GD_Space);          //默认x轴的最多分割数量

        if (this.maxEle >= GD_w) {
            if (GD_MaxStep * GD_Space <= GD_w) {
                tSpace = Math.floor(GD_w / GD_MaxStep);
                tMaxStep = GD_MaxStep;
                tSep = GD_Sep;
            } else {
                tMaxStep = this.testStep(GD_MaxStep);
                tSpace = Math.floor(GD_w / tMaxStep);
                tSep = GD_Sep;
                while (tMaxStep % tSep != 0) {
                    tSep--;
                }
            }
            //tNum=Math.floor( GD_w / tSpace);

        } else {
            if (this.maxEle * GD_Space > GD_w) {
                tMaxStep = GD_MaxStep;
                tSpace = Math.floor(GD_w / tMaxStep);
                tSep = GD_Sep;

            } else {
                tSpace = Math.floor(GD_w / this.maxEle);
                tMaxStep = this.maxEle;
                tSep = GD_Sep;

            }
        }
        tW = tMaxStep * tSpace;

        var gl = [];                                      //存储高亮线

        var c = "#C6CCD2";

        for (var i = 0; i <= tMaxStep; i++) {
            var x = i * tSpace + 0.5;
            var ty = GD_h;

            if (i % tSep == 0 && i != 0 && x <= tW - tSpace + 0.5) {
                gl.push({
                    x: x,
                    y: 0,
                    tx: x,
                    ty: ty
                });
                //g.graphics.ss(1,2,1).s("#993300").mt(x,0).lt(x, ty);
            } else {
                g.graphics.ss(1, 2, 1).s(c).mt(x, 0).lt(x, ty);

            }
        }

        tI = Math.round(this.sh / tSpace);
        for (var i = 0; i < tI; i++) {
            var y = i * tSpace + 0.5;
            var tx = tW;
            if (i % 4 == 0 && i != 0) {
                gl.push({
                    x: 0,
                    y: y,
                    tx: tx,
                    ty: y
                });
                //g.graphics.ss(1,2,1).s("#993300").mt(0,y).lt(tx, y);
            } else {
                g.graphics.ss(1, 2, 1).s(c).mt(0, y).lt(tx, y);
            }
        }


        c = "#993300";
        for (var i = 0; i < gl.length; i++) {
            var o = gl[i];

            g.graphics.ss(1, 2, 1).s(c).mt(o.x, o.y).lt(o.tx, o.ty);
        }
        g.graphics.setStrokeDash();
        c = "#C6CCD2";
        g.graphics.s(c).mt(0.5, 0.5).lt(tW + 0.5, 0.5).lt(tW + 0.5, GD_h - 0.5)
            .lt(0, GD_h - 0.5).lt(0.5, 0.5);

        var gd_conf = {
            tSpace: tSpace,
            tSep: tSep,
            tMaxStep: tMaxStep
        }

        return gd_conf;

    };

    this.tick = function (e) {
        this.stage.update(e);
    };


    this.drawTimeLine = function (ds, GD_conf, step) {
        var w = GD_conf.tMaxStep * GD_conf.tSpace;
        var l = ds.length;
        var _s = GD_conf.tSpace * step * GD_conf.tSep;
        var fix = GD_h - _s;
        var g = _curve.graphics;
        var level = this.levelY * step
        g.ss(0.5, 2).s("#000");

        if (l > w) {
            if (this.allowOverflow) {

            } else {
                for (var i = 0; i <= w; i++) {
                    var j = Math.floor(i / w * (l - 1));
                    var o = ds.data[j];
                    var v = {x: this.leftSpace + i + 0.5, y: Math.round(fix + _s * (1 - o.v / level)) + 0.5}

                    if (i == 0) {
                        g.mt(v.x, v.y);
                    } else {
                        g.lt(v.x, v.y)
                    }

                }
            }
        } else {

        }


    };

    this.getData = function (ds) {
        var l = ds.length;
        var GD_conf = this.drawGuild(l);
        var ds1 = new dataObj(ds);
        this.drawX(ds1, GD_conf);
        var l = this.drawY(ds1, GD_conf);
        this.drawTimeLine(ds1, GD_conf, l)
        this.tick();
    };
    var dataObj = function (ds) {
        this.length = ds.length;
        var start = new Date(ds[0].d);
        var end = new Date(ds[this.length - 1].d);
        var l = end.Between(start).m;
        this.data = ds;
        this.max = 0;
        for (var i = 0; i < this.length; i++) {
            if (ds[i].v > this.max) {
                this.max = ds[i].v;
            }
        }
    };
};

var _c = new charui({
    width: 935,
    height: 250,
    gd_space: 10
});
_c.getData(initData());

function initData() {
    var ds = [];
    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    for (var i = 0; i < 1440; i++) {
        date.setHours(Math.floor(i / 60));
        date.setMinutes(i % 60);
        ds.push({
            d: date.Format("yyyy/MM/dd hh:mm"),
            v: Math.random() * 1000 + Math.random() * 800
        });
    }
    return ds;
}

