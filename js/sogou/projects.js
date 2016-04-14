var projectManager = function (ds, mypro) {
    var self = this;

    this.myData = mypro;
    this.allMyProj = mypro.selectedList;

    this.allNode = new Object();
    this.allDomains = new Object();

    this.DomainProject = new Object();


    function initData(ds, mypro) {
        var id = 1;
        var tid, key, key2, _n, parkey, value;
        for (var i = 0; i < ds.length; i++) {
            var pj = ds[i].pj.replace("r,", "").split(',');
            for (var j = 0; j < pj.length; j++) {
                key = pj[j];
                if (j != pj.length - 1) {
                    if (typeof(self.allNode[key]) == "undefined") {
                        var parid = -1;
                        if (j > 0) {
                            parkey = pj[j - 1];
                            parid = self.allNode[parkey].id;
                        }
                        var _n = new node(id, key, parid, key);
                        if (parid == -1) _n.expanded = true;
                        self.allNode[key] = _n;
                        id++;
                    }
                } else {
                    key2 = pj[j - 1];
                    var sid = ds[i].sid, dkey = key + "_" + sid;
                    if (typeof self.allDomains[dkey] == "undefined") {
                        var o = self.allDomains[dkey] = {sid: ds[i].sid, dos: []};
                        o.dos.push(ds[i].do);
                        self.DomainProject[ds[i].do] = pj[j] + "_" + ds[i].sid;
                        var n = self.allNode[key2];
                        n.projects.push(pj[j] + "_" + ds[i].sid);

                        if (self.myData.myProject.indexOf(sid) != -1) {
                            self.myData.selectedList.insertArr(0, {n: "[项目] " + key, v: sid});
                            self.myData.selectedListSaved.insertArr(0, {n: "[项目] " + key, v: sid});
                        }
                    } else {
                        var o = self.allDomains[dkey];
                        o.dos.push(ds[i].do);
                        self.DomainProject[ds[i].do] = pj[j] + "_" + ds[i].sid;
                    }
                    if (j == pj.length - 1) {
                        if (typeof(self.allNode[key]) == "undefined") {
                            parkey = pj[j - 1];
                            parid = self.allNode[parkey].id;
                            var _n = new node(id, key, parid, key + "_" + ds[i].sid);

                            self.allNode[key] = _n;
                            id++;
                        }
                    }
                }
            }
        }
    };

    var node = function (id, title, parent, value) {
        this.id = id.toString();
        this.text = title;
        this.parentid = parent;
        this.value = value;
        this.projects = [];
    };
    initData(ds, mypro);

    this.getDataList = function (key) {
        var d = this.allDomains[key];
        var proj = key.split("_");

        var re = {all: false, ds: [], proj: key};
        if (proj.length > 1) {
            var sid = proj[1];
            if (this.myData.myProject.indexOf("_" + sid + "_") != -1) {
                re.all = true;
            }
        }

        if (typeof d != "undefined") {
            d = d.dos;
            for (var i = 0; i < d.length; i++) {

                var c = false;

                if (this.myData.myDomains.indexOf("|" + d[i] + "|") > -1 || re.all) {
                    c = true;
                }
                re.ds.push({n: d[i], v: d[i], checked: c});
            }
        }
        this.myData.projectListExchange = re;
        this.myData.projectList = $.extend(true, {}, re);
        return re;
    };

    this.getMyProjDs = function (sid) {
        var list = this.myData.selectedListSaved;
        var re = [], key, value, t;
        var temp = "|";
        var idx = 0;

        for (var i = 0; i < list.length; i++) {
            if (list[i].n.indexOf("项目") != -1) {
                key = list[i].n.replace("[项目] ", "");
                value = key + "_" + list[i].v;
                var o = {k: key, v: value, all: true}
                re.push(o);
                if (list[i].v == sid) {
                    idx = i;
                }
            } else {
                key = this.DomainProject[list[i].n]
                t = "|" + key + "|";
                if (temp.indexOf(t) == -1) {
                    temp += key + "|";
                    var arr = key.split("_");
                    value = key;
                    key = arr[0];
                    var o = {k: key, v: value, all: false}
                    re.push(o);
                    if (arr[1] == sid) {
                        idx = i;
                    }
                }
            }
        }
        return {re: re, idx: idx};
    };

    this.getDomains = function (id, isall, dname) {

        var ds = this.allDomains[id].dos;
        var re = [], idx = 0, flag = 0;

        if (isall.toString() == "true") {
            re.push({k: "全部", v: "all"});
            flag++;
            for (var i = 0; i < ds.length; i++) {
                re.push({k: ds[i], v: ds[i]});
                if (ds[i] == dname) {
                    idx = flag;
                }
                flag++;
            }
        } else {

            var str = this.myData.myDomainsSaved;
            for (var i = 0; i < ds.length; i++) {
                if (str.indexOf("|" + ds[i] + "|") != -1) {
                    re.push({k: ds[i], v: ds[i]});
                    if (ds[i] == dname) {
                        idx = flag;
                    }
                    flag++;
                }
            }
        }

        return {re: re, idx: idx};
    }
};

var dataAdapterObj = function (type, data) {
    this.datatype = "local";
    this.id = "id";
    this.localdata = data;
    switch (type) {
        case "tree":
            this.datafields = [
                { name: 'id' },
                { name: 'parentid' },
                { name: 'text' },
                { name: 'value' },
                { name: 'expanded', type: 'bool' }
            ];
            break;
        case "list":
            this.datafields = [
                {name: "n"},
                {name: "v"},
                {name: "checked", type: 'bool'}
            ];
            this.sortdirection = 'asc';
            break;
        case "select":
            this.datafields = [
                { name: 'k' },
                { name: 'v' },
                { name: 'all', type: 'bool' }
            ];
            break;
        case "platTable":
            this.datafields = [
                { name: 'names', type: 'string' },
                { name: 'traffic_today', type: 'number' },
                { name: 'traffic_yd', type: 'number' },
                { name: 'traffic_lastweek', type: 'number' },
                { name: 'bw_today', type: 'number'},
                { name: 'bw_yd', type: 'number'},
                { name: 'bw_lastweek', type: 'number'}
            ];
            break;
    }
};

var myDataControler = function (proj, domains) {
    this.projectList = [];
    this.projectListExchange = [];
    this.selectedList = [];
    this.selectedListSaved = [];
    this.myDomains = domains;
    this.myDomainsSaved = domains;    //历史记录｜保存后更新
    this.myProject = proj;
    this.myProjectSaved = proj;       //历史记录｜保存后更新
    var o = domains.split("|");
    for (var i = 1; i < o.length - 1; i++) {
        this.selectedList.push({n: o[i], v: o[i]})
        this.selectedListSaved.push({n: o[i], v: o[i]})
    }
    this.resetData = function () {
        if (this.myDomainsSaved == "|" && this.myProjectSaved == "_") {
            return false;
        } else {
            this.myDomains = this.myDomainsSaved;
            this.myProject = this.myProjectSaved;

            this.projectListExchange = $.extend(true, {}, this.projectList);
            this.selectedList = this.selectedListSaved.slice(0);
            return true;
        }


    }

    this.saveData = function () {
        if (this.myDomains == "|" && this.myProject == "_") {
            return false;
        } else {
            this.myDomainsSaved = this.myDomains;
            this.myProjectSaved = this.myProject;
            this.projectList = $.extend(true, {}, this.projectListExchange);
            this.selectedListSaved = this.selectedList.slice(0);
            $(document).trigger("usersave", {proj: this.myProjectSaved, domains: this.myDomainsSaved});
            return true;
        }
    }

    this.updateSelectedList = function (proj, manager) {
        var o = this.projectListExchange;

        var ds = o.ds;
        if (typeof ds == "undefined") return null;
        if (proj != "") {
            var arr = proj.split("_");
            this.myProject += arr[1] + "_";
            this.selectedList.insertArr(0, {n: "[项目] " + arr[0], v: arr[1]});
            o.all = true;
        }
        for (var i = 0; i < ds.length; i++) {
            if (ds[i].checked) {
                if (this.myDomains.indexOf("|" + ds[i].n + "|") > -1) {
                    if (proj != "") {
                        var s = this.myDomains.replace("|" + ds[i].n + "|", "|");
                        this.myDomains = s;
                        for (var j = 0; j < this.selectedList.length; j++) {
                            if (ds[i].n == this.selectedList[j].n) {
                                this.selectedList.removeArr(j);
                                break;
                            }
                        }
                    }
                } else {
                    if (proj != "") {
                        ds[i].checked = true;
                    } else {
                        this.myDomains += ds[i].n + "|";
                        this.selectedList.push({n: ds[i].n, v: ds[i].v});
                    }
                }
            }
        }
        return this.projectListExchange;
    }

    this.removeFromSelectedList = function (item, manager) {
        var projlist = this.projectListExchange;
        for (var i = 0; i < item.length; i++) {
            var o = item[i], k = o.label, v = o.value;
            if (k.indexOf("[项目]") > -1) {
                if ("[项目] " + projlist.proj == k + "_" + v) {
                    projlist.all = false;
                }

                this.myProject = this.myProject.replace("_" + v + "_", "_")
            } else {
                this.myDomains = this.myDomains.replace("|" + k + "|", "|")
            }

            for (var j = 0; j < this.selectedList.length; j++) {
                if (this.selectedList[j].n == k) {
                    this.selectedList.removeArr(j);
                    break;
                }
            }

        }
        return this.projectListExchange;
    }
};

