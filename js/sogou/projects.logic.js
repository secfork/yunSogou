var MY_PROJ, PROJECT;

function initData(proj, domains) {
    MY_PROJ = new myDataControler(proj, domains);
    PROJECT = new projectManager(pj_domain, MY_PROJ);
}

function initfilter(proj, domains) {

    var tempData, tempAdpTpl, tempAdp, tempDS;
    var DomainListAdpTpl, MyDomainListAdpTpl;

    var ListUpdating = false;

    tempData = PROJECT.allNode;
    tempAdpTpl = new dataAdapterObj("tree", tempData);
    tempAdp = new $.jqx.dataAdapter(tempAdpTpl);
    tempAdp.dataBind();

    tempDS = tempAdp.getRecordsHierarchy('id', 'parentid', 'items', [
        { name: 'text', map: 'label'    },
        { name: 'value', map: 'value'    },
        { name: 'expanded', map: 'expanded' }
    ]);
    //项目树形菜单 - 控件初始化
    $("#projectPanel").jqxPanel({width: "100%", height: 502, autoUpdate: true, scrollBarSize: 9});
    $('#projects').jqxTree({
        source: tempDS, width: '100%'
    }).on('select', projectSelectHandler);

    //项目树形菜单 - 选择更新
    function projectSelectHandler(e) {
        ListUpdating = true;
        var item = $(this).jqxTree("getItem", e.args.element);
        tempData = PROJECT.getDataList(item.value);
        DomainListAdpTpl.localdata = tempData.ds;
        DomainListAdpTpl.sortcolumn = "n";
        updateProjectList(tempData)
        ListUpdating = false;
        $("#search input").val("");
    }

    //公用更新项目域名列表
    function updateProjectList(_d) {
        $("#projectList").jqxGrid('beginupdate');
        updateFilter("");
        $("#projectList").jqxGrid('updatebounddata', 'cells');
        $("#projectList").jqxGrid('endupdate');
        if (!_d.all) {
            $("#checkall").jqxCheckBox("uncheck");
            $("#checkall").jqxCheckBox("enable");
            $("#projectList").jqxGrid({ editable: true});
            if (typeof(_d.all) == "undefined") {
                $("#checkall").jqxCheckBox("disable");
            } else if (_d.ds.length == 0) {
                $("#checkall").jqxCheckBox("disable");
            }

        } else {
            $("#checkall").jqxCheckBox("check");
            $("#checkall").jqxCheckBox("disable");
            $("#projectList").jqxGrid({ editable: false});

        }
    }

    //域名列表 - 控件初始化
    tempData = [];
    DomainListAdpTpl = new dataAdapterObj("list", tempData);
    tempAdp = new $.jqx.dataAdapter(DomainListAdpTpl);
    tempAdp.dataBind();

    //域名列表 - 域名为已选域名禁止勾选功能
    var beginEditHandler = function (row, datafield, columntype, value) {
        var data = $("#projectList").jqxGrid('getrowdatabyid', row);
        if (MY_PROJ.myDomains.indexOf("|" + data.n + "|") > -1) {
            return false;
        } else {

            var o = MY_PROJ.projectListExchange.ds;
            for (var i = 0; i < o.length; i++) {
                if (o[i].n == data.n) {
                    o[i].checked = (data.checked == false || data.checked == "false") ? true : false;
                }
            }
            return true;
        }
    };

    //域名列表 - 根据不同状态显示域名颜色
    var cellsrenderer = function (row, column, value, defaultHtml) {
        var data = $("#projectList").jqxGrid('getrowdatabyid', row);

        if (MY_PROJ.myDomains.indexOf("|" + data.n + "|") > -1) {
            var element = $(defaultHtml);
            element.css('color', '#999');
            return element[0].outerHTML;
        }
        return defaultHtml;
    };

    //域名列表 - 控件初始化
    $("#projectList").jqxGrid({
        width: "100%",
        height: 502,
        pageable: false,
        source: tempAdp,
        editable: true,
        //sortable:true,
        columns: [
            {text: "check", datafield: 'checked', columntype: 'checkbox', width: 40,
                cellbeginedit: beginEditHandler },
            {text: 'name1', datafield: 'n', editable: false, cellsrenderer: cellsrenderer   },
            {text: 'value1', datafield: 'v', editable: false, hidden: true }
        ],
        selectionmode: "none",
        scrollBarSize: 9,
        theme: "sogou"
    });

    //域名列表 - 全选功能 - 初始化
    $("#checkall").jqxCheckBox({
        width: 53, height: 13, boxSize: 12
    }).on("checked", checkallHandler).on("unchecked", checkallHandler);
    $("#checkall").jqxCheckBox("disable");

    //域名列表 - 全选功能 - 通过更新数据源更新全选状态
    function checkallHandler(e) {
        if (ListUpdating) return;
        var b = e.args ? true : false;
        var ds = MY_PROJ.projectListExchange.ds;
        var j = ds.length;
        if (j > 0) {
            for (var i = 0; i < j; i++) {
                if (MY_PROJ.myDomains.indexOf("|" + ds[i].n + "|") > -1) {
                    ds[i].checked = true;
                } else {
                    ds[i].checked = b;
                }
            }
            DomainListAdpTpl.localdata = ds;
            $("#projectList").jqxGrid('updatebounddata', 'cells');
            $("#projectList").jqxGrid({ editable: !b});
        }
    }

    //域名列表 - 域名筛选功能
    $("#search input").on("keyup", searchHandler);

    var searchUpdate = false;
    var oldkey = "";

    //域名列表 - 域名筛选功能 - 输入处理函数
    function searchHandler(e) {
        var key = $(this).val();
        var $o = $(this);
        if (searchUpdate) {
            return false;
        } else {
            searchUpdate = true;
            setTimeout(function () {
                searchUpdate = false;
                updateFilter($o.val());
            }, 100);
            updateFilter(key);
        }
    }

    //域名列表 - 域名筛选功能 - 更新域名列表过滤器
    function updateFilter(key) {
        if (oldkey != key) {
            $("#projectList").jqxGrid('clearfilters');
            if (key != "") {
                var filtertype = 'stringfilter';
                var filtergroup = new $.jqx.filter();
                var filter_or_operator = 1;
                var filtervalue = key == "" ? "Empty" : key;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter(filtertype, filtervalue, filtercondition);
                filtergroup.addfilter(filter_or_operator, filter);
                $("#projectList").jqxGrid('addfilter', "n", filtergroup);
                $("#projectList").jqxGrid('applyfilters');
                $("#checkall").jqxCheckBox("disable")
            } else {
                if (!MY_PROJ.projectList.all) {
                    $("#checkall").jqxCheckBox("enable")
                }
            }
        } else {
            return
        }
        oldkey = key;
    }

    //域名列表 - 重置RESET按钮
    $(".resetlink a").on("click", resetHandler);

    function resetHandler() {
        var ds = MY_PROJ.projectList;
        if (ds.length == 0) return;
        $("#search input").val("");
        updateFilter("");
        var ds = MY_PROJ.projectList.ds;
        var j = ds.length;
        if (MY_PROJ.projectList.all) {
            return;
        } else {
            $("#checkall").jqxCheckBox("uncheck")
        }
        if (j > 0) {
            for (var i = 0; i < j; i++) {
                if (MY_PROJ.myDomains.indexOf("|" + ds[i].n + "|") > -1) {
                    ds[i].checked = true;
                } else {
                    ds[i].checked = false;
                }
            }
            DomainListAdpTpl.localdata = ds;
            $("#projectList").jqxGrid('updatebounddata', 'cells');
        }
    }

    //我的关注列表 - 初始化
    tempData = MY_PROJ.selectedList;
    MyDomainListAdpTpl = new dataAdapterObj("list", tempData);
    tempAdp = new $.jqx.dataAdapter(MyDomainListAdpTpl);
    $("#projecSelectedList").jqxListBox({
        source: tempAdp,
        width: "100%", height: 535,
        displayMember: "n", valueMember: "v",
        checkboxes: true, scrollBarSize: 9,
        theme: "sogou"
    });

    //我的关注列表 - 添加域名或项目
    $("#toright").on('click', function () {
        var all = $("#checkall").jqxCheckBox("val");
        var currProj = MY_PROJ.projectListExchange.all;
        var o = "";
        if (!currProj && all) {
            o = MY_PROJ.projectListExchange.proj;
        }

        tempData = MY_PROJ.updateSelectedList(o, PROJECT);
        if (tempData == null) return false;
        DomainListAdpTpl.localdata = tempData.ds;
        updateProjectList(tempData);
        MyDomainListAdpTpl.localdata = MY_PROJ.selectedList;
        tempAdp = new $.jqx.dataAdapter(MyDomainListAdpTpl);
        $("#projecSelectedList").jqxListBox({ source: tempAdp, displayMember: "n", valueMember: "v"});
    });

    //我的关注列表 - 删除域名或项目
    $("#toleft").on('click', function () {
        var items = $("#projecSelectedList").jqxListBox('getCheckedItems');
        if (items.length == 0) return;
        tempData = MY_PROJ.removeFromSelectedList(items, PROJECT);

        MyDomainListAdpTpl.localdata = MY_PROJ.selectedList;
        tempAdp = new $.jqx.dataAdapter(MyDomainListAdpTpl);
        $("#projecSelectedList").jqxListBox({ source: tempAdp, displayMember: "n", valueMember: "v"});

        if (typeof tempData.ds == "undefined") return;
        DomainListAdpTpl.localdata = tempData.ds;
        updateProjectList(tempData);
    });

    //取消和关闭按钮
    $("#filter .close").click(closeHander);
    $("#filter .cancel").click(closeHander);

    function closeHander() {
        var is = MY_PROJ.resetData();
        if (is) {
            MyDomainListAdpTpl.localdata = MY_PROJ.selectedList;
            tempAdp = new $.jqx.dataAdapter(MyDomainListAdpTpl);
            $("#projecSelectedList").jqxListBox({ source: tempAdp, displayMember: "n", valueMember: "v"});
            tempData = MY_PROJ.projectList;
            if (tempData.length != 0) {
                DomainListAdpTpl.localdata = tempData.ds;
                DomainListAdpTpl.sortcolumn = "n";

                updateProjectList(tempData)
            }
            ListUpdating = false;
            $("#search input").val("");
            hideFilter();
        } else {
            alert("请您选择至少一个域名，并点击确定！")
        }

    }

    //提交按钮
    $("#filter .submit").click(function () {
        var is = MY_PROJ.saveData();
        if (is) {
            hideFilter();
            $(document).trigger("filterupdate");
        } else {
            alert("无法提交，必须至少选择一个域名");
            return;
        }
        $(document).trigger("initPage")
    });

    function hideFilter() {
        $("#main").show();
        $("#filter").hide();
        $(".helself").removeClass('active');
        $(".mainmenu ul li.active").addClass("on");
    }
}

