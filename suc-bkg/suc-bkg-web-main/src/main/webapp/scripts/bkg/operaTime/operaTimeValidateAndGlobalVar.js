//新增/修改标记
var addOrEdit = "";
//请求路径
var url  = "";
//时刻ID
var id = "";
//数据列表参数
var dataGridParams = {};
//版本号
var version = 1;
var buttons = $.extend([], $.fn.datebox.defaults.buttons);
buttons.splice(1, 0, {
    text: '清空',
    handler: function (target) {//target对象就是当前的inupt对象，不需要写死id
        $(target).datebox('setValue', '');
    }
});