var source = {
    datatype: 'json',
    id: 'id',
    localdata: null,
    datafields: [
        { name: 'apply_person', map: 'apply_person>user_name' },
        { name: 'apply_time', type: 'date'},
        { name: 'dbname', type: 'string' },
        { name: 'disk_type', type: 'string' },
        { name: 'id', type: 'string'},
        { name: 'progress', type: 'number'},
        { name: 'sid', type: 'string'},
        { name: 'wdomain', type: 'string'},
        { name: 'mr', type: 'string'},
        { name: 'admin_persons', map: 'apply_person>user_name' },
    ]
};

var initRdsList = function () {

    $.ajax({
        url: "/interface/rds.js",
        dataType: "json",
        success: function (data) {
            source.localdata = data;
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#jqxgrid").jqxDataTable(
                {
                    width: 1000,
                    pageable: true,
                    pageSize: 3,
                    source: dataAdapter,
                    rowDetails: true,
                    initRowDetails: function () {
                        return "";
                    },
                    columns: [
                        { text: '数据库名', dataField: 'dbname' },
                        { text: '状态', dataField: 'progress'},
                        { text: '域名', dataField: 'wdomain'},
                        { text: '申请人', dataField: 'apply_person'},
                        { text: '申请时间', dataField: 'apply_time', cellsRenderer: function (row, column, value, rowData) {
                            return  value.Format("yyyy-MM-dd hh:mm:ss")
                        }},
                        { text: '成本归属', dataField: 'sid'},
                        { text: '机房', dataField: 'mr'},
                        { text: '磁盘类型/磁盘(GB)', dataField: 'disk_type', width: 130},
                        { text: '管理员', dataField: 'admin_persons', width: 90, cellsRenderer: function (row, column, value, rowData) {

                            return "<span>" + rowData.admin_persons + "</span> <button data-row='" + row + "' class='editButtons adminbtn'>管</button>"
                        }},
                        { text: '操作', dataField: 'id', width: 200, cellsRenderer: function (row, column, value) {
                            return "<button data-row='" + row + "' class='editButtons'>数据库授权</button> | <button data-row='" + row + "' class='editButtons'>管理</button> | <button data-row='" + row + "' class='editButtons'>删除</button>";
                        }}
                    ],
                    rendered: function () {
                        $(".editButtons").jqxButton();
                        /* $(".adminbtn").click(function(){
                         $("#jqxgrid").jqxDataTable("showDetails",$(this).attr("data-row"))
                         });*/
                    }

                });
        }
    });

}



