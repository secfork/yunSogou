var PLATFORM = {
    currid: "",
    currsid: "",
    currIsAll: true,
    currproj: null,
    currld: 5,
    s_time: (new Date()).Format("yyyy-MM-dd"),
    e_time: (new Date()).Format("yyyy-MM-dd"),
    currdomain: "all",
    updating: false,
    isinit: false
};
var digitalMax = "max"; // old is 5
function initPageDisplay() {
    if (PLATFORM.isinit) return; else {
        PLATFORM.isinit = true
    }
    ;


    var data = PROJECT.getMyProjDs().re;
    var source = new dataAdapterObj("select", data)
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#project").jqxDropDownList({
        selectedIndex: 0,
        source: dataAdapter,
        displayMember: "k",
        valueMember: "v",
        width: 168,
        height: 32,
        dropDownHeight: 200,
        scrollBarSize: 9,
        theme: "sogou"
    }).on("select", projectSelctHander);

    function projectSelctHander(e) {
        var item = $(this).jqxDropDownList('getSelectedItem');
        var isAll = PLATFORM.currIsAll = item.originalItem.all;
        var id = PLATFORM.currid = item.value;
        var sid = PLATFORM.currsid = id.split("_")[1];
        updatDomains(id, isAll);
        getPjView(sid, "PjViewCallback");
        $("#jqxgrid").jqxGrid('clearselection');
        showLoader();
    }

    function updatDomains(projid, isall) {
        var data = PROJECT.getDomains(projid, isall).re;
        var source = new dataAdapterObj("select", data);
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#domains").unbind("select");
        $("#domains").jqxDropDownList({source: dataAdapter, selectedIndex: 0});
        $("#domains").bind("select", domainsSelectHandler);
        PLATFORM.currdomain = data[0].v;
    }

    var id = data[0].v;
    var sid = PLATFORM.currsid = id.split("_")[1];
    var isall = PLATFORM.currIsAll = data[0].all;
    data = PROJECT.getDomains(id, isall).re;
    source.localdata = data;
    dataAdapter = new $.jqx.dataAdapter(source);
    $("#domains").jqxDropDownList({
        selectedIndex: 0,
        source: dataAdapter,
        displayMember: "k",
        valueMember: "v",
        width: 168,
        height: 32,
        dropDownHeight: 200,
        scrollBarSize: 9,
        theme: "sogou"
    });
    $("#domains").bind("select", domainsSelectHandler)
    function domainsSelectHandler(e) {
        showLoader();
        tableClearHandler();
        var item = $(this).jqxDropDownList('getSelectedItem');
        var name = item.value;
        var rows = $('#jqxgrid').jqxGrid('getrows');
        var idx = -1;
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].names == name) {
                idx = i;
                break;
            }
        }
        ;
        if (idx == -1) {
            $("#jqxgrid").jqxGrid('clearselection');
        } else {
            idx = $('#jqxgrid').jqxGrid('getrowboundindexbyid', rows[idx].uid);
            $("#jqxgrid").jqxGrid('selectrow', idx);
        }
        switchProjView(name);
        $(document).trigger("updateChart");

    }

    var ld = [
        {
            "k": "5分钟",
            "v": "5"
        },
        {
            "k": "60分钟",
            "v": "60"
        }
    ];
    source.localdata = ld;
    dataAdapter = new $.jqx.dataAdapter(source);
    $("#timepoint").jqxDropDownList({
        selectedIndex: 0,
        source: dataAdapter,
        displayMember: "k",
        valueMember: "v",
        width: 168,
        height: 32,
        dropDownHeight: 200,
        scrollBarSize: 9,
        theme: "sogou"
    });
    $("#timepoint").bind("select", timepointHandler);
    function timepointHandler(e) {
        showLoader();
        var item = $(this).jqxDropDownList('getSelectedItem');
        PLATFORM.currld = item.value;
        $(document).trigger("updateChart");
    }

    $("#timeButton").jqxButtonGroup({ mode: 'radio', theme: "sogou"});
    $("#timeButton").jqxButtonGroup("setSelection", 0);
    $("#timeButton").on("buttonclick", function (e) {
        var tar = e.args.button;
        var start, end;
        var date = new Date();
        switch (tar.attr("id")) {
            case "time0":
                PLATFORM.s_time = date.Format("yyyy-MM-dd");
                PLATFORM.e_time = date.Format("yyyy-MM-dd");
                start = end = date;
                break;
            case "time1":
                date.setTime(date.getTime() - 3600 * 1000 * 24)
                PLATFORM.s_time = date.Format("yyyy-MM-dd");
                PLATFORM.e_time = date.Format("yyyy-MM-dd");
                start = end = date;
                break;
            case "time2":
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 6);
                PLATFORM.s_time = date.Format("yyyy-MM-dd");
                PLATFORM.e_time = (new Date()).Format("yyyy-MM-dd");
                start = date;
                end = new Date();
                break;
            case "time3":
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 29);
                PLATFORM.s_time = date.Format("yyyy-MM-dd");
                PLATFORM.e_time = (new Date()).Format("yyyy-MM-dd");
                start = date;
                end = new Date();
                break;
        }
        $("#timeEnd").unbind("change");
        $("#timeFrom").unbind("change");
        $("#timeEnd").jqxDateTimeInput('setDate', end);
        $("#timeFrom").jqxDateTimeInput('setDate', start);

        $("#timeEnd").bind("change", timeEndHandler);
        $("#timeFrom").bind("change", timeFromHandler);
        if (end.Between(start).d > 0) {
            $("#timepoint").unbind("select");
            $("#timepoint").jqxDropDownList({selectedIndex: 1})
            $("#timepoint").bind("select", timepointHandler);
            PLATFORM.currld = 60;
        } else {
            $("#timepoint").unbind("select");
            $("#timepoint").jqxDropDownList({selectedIndex: 0})
            $("#timepoint").bind("select", timepointHandler);
            PLATFORM.currld = 5;
        }

        $(document).trigger("updateChart");
    });

    $("#timeFrom").jqxDateTimeInput({ width: '168x', height: '34px', formatString: 'yyyy-MM-dd', theme: "sogou" });
    $("#timeEnd").jqxDateTimeInput({ width: '168x', height: '34px', formatString: 'yyyy-MM-dd', theme: "sogou"});
    $("#timeFrom").on("change", timeFromHandler);

    function timeFromHandler(e) {
        var end = $("#timeEnd").jqxDateTimeInput('getDate');
        var start = e.args.date;
        if (end.Between(start).d < 0) {
            $("#timeFrom").jqxDateTimeInput('setDate', end);
            alert("开始时间不可晚于结束时间")
        }
    }

    $("#timeEnd").on("change", timeEndHandler);

    function timeEndHandler(e) {
        var start = $("#timeFrom").jqxDateTimeInput('getDate');
        var end = e.args.date;
        if (end.Between(start).d < 0) {
            $("#timeEnd").jqxDateTimeInput('setDate', start);
            alert("结束时间不可早于开始时间")
        }
    }

    $(".settime").click(function () {
        $("#timeButton").jqxButtonGroup("setSelection", -1);
        var start = $("#timeFrom").jqxDateTimeInput('getDate');
        var end = $("#timeEnd").jqxDateTimeInput('getDate');

        var bw = end.Between(start).d;
        if (bw < 0) {
            $("#timeEnd").jqxDateTimeInput('setDate', start);
            alert("结束时间不可早于开始时间");
        } else {
            PLATFORM.s_time = start.Format("yyyy-MM-dd");
            PLATFORM.e_time = end.Format("yyyy-MM-dd");
            if (bw == 0) {
                $("#timepoint").jqxDropDownList({selectedIndex: 0})
            } else {
                $("#timepoint").jqxDropDownList({selectedIndex: 1})
            }
        }
        $(document).trigger("updateChart");
    });

    var dataForTable = [];
    var datasourceForTable = new dataAdapterObj("platTable", dataForTable);
    var dataAdapterForTable = new $.jqx.dataAdapter(datasourceForTable, { async: false, autoBind: true });

    $("#jqxgrid").jqxGrid({
        width: 935,
        source: dataAdapterForTable,
        sortable: true,
        columnsresize: true,
        columns: [
            { text: '域名', datafield: 'names', width: "20%", align: "center"},
            { text: '今日峰值流量(B)', datafield: 'traffic_today', cellsformat: 'n', width: "20%", align: "center", cellsalign: "right"},
            { text: '流量日环比', datafield: 'traffic_yd', cellsformat: 'p', width: "10%", align: "center", cellsalign: "right" },
            { text: '流量周环比', datafield: 'traffic_lastweek', cellsformat: 'p', width: "10%", align: "center", cellsalign: "right"},
            { text: '今日峰值带宽(bps)', datafield: 'bw_today', cellsformat: 'n', width: "20%", align: "center", cellsalign: "right"},
            { text: '带宽日环比', datafield: 'bw_yd', cellsformat: 'p', width: "10%", align: "center", cellsalign: "right"},
            { text: '带宽日环比', datafield: 'bw_lastweek', cellsformat: 'p', width: "10%", align: "center", cellsalign: "right"}
        ],
        scrollBarSize: 9,
        theme: "sogou-table"
    })
    $("#jqxgrid").bind("rowselect", rowselectHandler);
    function rowselectHandler(e) {
        var idx = e.args.rowindex;
        var name = e.args.row.names;
        var item = $("#domains").jqxDropDownList('getItemByValue', name);
        $("#domains").jqxDropDownList({selectedIndex: item.index });
    }

    getPjView(sid, "PjViewCallback");
    //更新项目信息
    function showProjView(e, json) {
        ds = $.parseJSON(json);
        PLATFORM.currproj = ds;
        tableClearHandler();
        if (PLATFORM.currIsAll) {
            ds = parsePlatData(ds);
            var ele = $('#infoWindow')[0];
            angular.element(ele).scope().refeshdo(ds);
            for (var i = 0; i < ds.domains.length; i++) {
                var o = ds.domains[i]
                o.bw_yd = o.traffic_yd;
                o.bw_lastweek = o.traffic_lastweek;
            }
            datasourceForTable.localdata = ds.domains;
            $("#jqxgrid").jqxGrid('updatebounddata', 'cells');
        } else {

            var tempds = [];
            for (var i = 0; i < ds.domains.length; i++) {
                var o = ds.domains[i];
                if (MY_PROJ.myDomainsSaved.indexOf("|" + o.names + "|") != -1) {
                    o.bw_yd = o.traffic_yd;
                    o.bw_lastweek = o.traffic_lastweek;
                    tempds.push(o);
                }
            }
            datasourceForTable.localdata = tempds;
            $("#jqxgrid").jqxGrid('updatebounddata', 'cells');
            $("#jqxgrid").jqxGrid('selectrow', 0);
            var tempds = $.extend(true, {}, tempds[0]);
            ds = parsePlatData(tempds);
            var ele = $('#infoWindow')[0];
            angular.element(ele).scope().refeshdo(ds);
        }
        $(document).trigger("updateChart");
    }

    function switchProjView(name) {
        PLATFORM.currdomain = name;
        var ds = $.extend(true, {}, PLATFORM.currproj);
        var data;
        if (name == "all") {
            data = ds;
        } else {
            ds = ds.domains;
            for (var i = 0; i < ds.length; i++) {

                if (name == ds[i].names) {
                    data = parsePlatData(ds[i]);
                    break;
                }
            }
        }
        var ele = $('#infoWindow')[0];
        angular.element(ele).scope().refeshdo(data);
    };

    function checkpageUpdate() {
        var isall = PLATFORM.currIsAll;
        var sid = PLATFORM.currsid;
        var domain = PLATFORM.currdomain;

        var allDomains = MY_PROJ.myDomainsSaved;
        var allSids = MY_PROJ.myProjectSaved;
        var updateGrid = false;

        var updateAble = false; // 不需要删除已选项 为false
        if (isall) {
            if (allSids.indexOf("_" + sid + "_") == -1) {
                updateAble = true;
            }
        } else {
            if (allDomains.indexOf("|" + domain + "|") == -1) {
                updateAble = true;
            }
        }
        var re = PROJECT.getMyProjDs(updateAble ? "" : sid);
        var data = re.re;
        var idx = re.idx;
        var source = new dataAdapterObj("select", data)
        var dataAdapter = new $.jqx.dataAdapter(source);

        $("#project").unbind("select");
        $("#domains").unbind("select")
        $("#project").jqxDropDownList({source: dataAdapter, selectedIndex: idx});

        var id = updateAble ? data[0].v : data[idx].v;
        isall = updateAble ? data[0].all : isall;
        re = PROJECT.getDomains(id, isall, domain);

        data = re.re;
        idx = re.idx;
        source.localdata = data;
        dataAdapter = new $.jqx.dataAdapter(source);
        $("#domains").jqxDropDownList({source: dataAdapter, selectedIndex: idx});


        PLATFORM.currid = id;
        PLATFORM.currsid = id.split("_")[1];
        PLATFORM.currdomain = data[idx].v;
        PLATFORM.currIsAll = isall;

        if (updateAble) {
            $("#project").bind("select", projectSelctHander);
            $("#project").trigger("select")
        } else {
            if (!isall) {

                tableClearHandler();
                $("#jqxgrid").unbind("rowselect");
                ds = PLATFORM.currproj;
                var tempds = [];
                idx = 0;

                for (var i = 0; i < ds.domains.length; i++) {
                    var o = ds.domains[i];
                    if (MY_PROJ.myDomainsSaved.indexOf("|" + o.names + "|") != -1) {
                        o.bw_yd = o.traffic_yd;
                        o.bw_lastweek = o.traffic_lastweek;
                        tempds.push(o);
                        if (o.names == PLATFORM.currdomain) {
                            idx = tempds.length - 1;
                        }
                    }
                }

                datasourceForTable.localdata = tempds;
                $("#jqxgrid").jqxGrid('updatebounddata', 'cells');
                $("#jqxgrid").jqxGrid('selectrow', idx);

                $("#jqxgrid").bind("rowselect", rowselectHandler);
            }
            $("#project").bind("select", projectSelctHander);
        }
        $("#domains").bind("select", domainsSelectHandler)
    }

    function initTableSearch() {
        $("#tableSearch input").val("");
        $("#tableSearch input").on("keyup", tableSearchHandler);
        $("#tableSearchClear").on("click", tableClearHandler);
    }

    function tableClearHandler() {
        searchUpdate = false;
        oldkey = "";
        $("#tableSearch input").val("");
        $("#jqxgrid").jqxGrid('clearfilters');

    }

    var searchUpdate = false;
    var oldkey = "";

    //域名列表 - 域名筛选功能 - 输入处理函数
    function tableSearchHandler(e) {
        var key = $(this).val();
        var $o = $(this);

        if (searchUpdate) {
            return false;
        } else {
            searchUpdate = true;
            setTimeout(function () {
                searchUpdate = false;

                updateDomainFilter($o.val());
            }, 100);
            updateDomainFilter(key);
        }
    }

    function updateDomainFilter(key) {

        if (oldkey != key) {

            $("#jqxgrid").jqxGrid('clearfilters');
            if (key != "") {
                var filtertype = 'stringfilter';
                var filtergroup = new $.jqx.filter();
                var filter_or_operator = 1;
                var filtervalue = key == "" ? "Empty" : key;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter(filtertype, filtervalue, filtercondition);
                filtergroup.addfilter(filter_or_operator, filter);
                $("#jqxgrid").jqxGrid('addfilter', "names", filtergroup);
                $("#jqxgrid").jqxGrid('applyfilters');
            }
        } else {
            return
        }
        oldkey = key;
    }

    initTableSearch();
    $(document).on("updateprojview", showProjView);
    $(document).on("updateChart", updateChart);
    $(document).on("afterUpdate", afterUpdate);
    $(document).on("filterupdate", checkpageUpdate);
}

function getPjView(sid, callback, context) {
    var setting;
    if (pageConfig.debug) {
        setting = {
            data: {
                sid: sid
            },
            cache: false,
            dataType: "jsonp",
            jsonpCallback: callback,
            url: pageConfig.serverPath + 'pj_view.php'
        }
    } else {
        setting = {
            data: {
                sid: sid
            },
            cache: false,
            dataType: "text",
            url: pageConfig.serverPath + 'pj_view.php',
            success: function (data, xhr, opt) {
                window[callback](data);
            }
        }
    }
    $.ajax(setting);
}

function PjViewCallback(ds) {
    $(document).trigger("updateprojview", ds)
}

function parsePlatData(o) {
    o.traffic_today = parseDigital(digitalMax, o.traffic_today, "B");
    o.bw_today = parseDigital(3, o.bw_today, "bps");
    if (o.traffic_yd > 1000) {
        o.traffic_yd = parseInt(o.traffic_yd);
    }
    if (o.traffic_lastweek > 1000) {
        o.traffic_lastweek = parseInt(o.traffic_lastweek);
    }
    if (o.traffic_yd != 0) {
        if (o.traffic_yd >= 1000) {
            o.traffic_yd = parseInt(o.traffic_yd) + "%"
        } else {
            o.traffic_yd += "%";
        }
    }
    if (o.traffic_lastweek != 0) {
        if (o.traffic_yd >= 1000) {
            o.traffic_lastweek = parseInt(o.traffic_lastweek) + "%"
        } else {
            o.traffic_lastweek += "%";
        }
    }
    return o;
}
function showLoader() {
    PLATFORM.updating = true;
    $("#mask").fadeIn(300);
}
function hideLoader() {
    PLATFORM.updating = false;
    $("#mask").fadeOut(300)
}
function updateChart(e) {
    e.stopPropagation();
    showLoader();
    var o = {
        s_time: PLATFORM.s_time,
        e_time: PLATFORM.e_time,
        domain: (PLATFORM.currdomain == "all") ? PLATFORM.currsid : PLATFORM.currdomain,
        type: (PLATFORM.currdomain == "all") ? "s" : "d",
        p: PLATFORM.currld
    };
    var l = [];
    for (p in o) {
        l.push(p + '=' + encodeURIComponent(o[p] || ''));
    }
    var link = "chart.html?" + l.join("&");
    setTimeout(function () {
        $("#chartContainer").attr("src", link);
    }, 500);
}
function afterUpdate() {
    hideLoader()
}
