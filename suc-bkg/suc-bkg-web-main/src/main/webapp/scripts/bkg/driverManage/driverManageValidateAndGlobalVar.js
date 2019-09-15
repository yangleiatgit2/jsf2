//新增/修改标记
var addOrEdit = "";
//请求路径
var url  = "";
//司机ID
var id = "";
//身份证图片ID
var idCardUrl = "";
//司机大头照
var driverPhotoUrl = "";
//司机驾驶证
var drivingFileUrl = "";
//司机从业资格证
var certificateFileUrl = "";
//要修改的信息的版本号
var version = 1;
var buttons = $.extend([], $.fn.datebox.defaults.buttons);
 buttons.splice(1, 0, {
     text: '清空',
     handler: function (target) {//target对象就是当前的inupt对象，不需要写死id
         $(target).datebox('setValue', '');
     }
 });