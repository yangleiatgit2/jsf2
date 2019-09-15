 //请求路径
 var url = "";
//查看车辆ID
var checkId = "";
//数据列表查询对象
var queryParam = null;
//确认新增还是修改
var status = "";
//数据列表参数
var dataGridParams = {};
//标识车牌号是否重复
var repeat = false;
//营运证
var operationCertificateFile = '';
//交强险
var tciFile = '';
//通行证
var trafficPermitFile= '';
//商业险
var vciFile = '';
//其它险
var otherInsuranceFile = '';
//驾驶证
var drivingLicenseFile = '';
//版本号
var version = 1;
/**
  * 校验手机号
  * @param obj
  */
 function validatePhone(obj){
 	obj.textbox('textbox').bind('keydown', function(e){
 		var phone = $(this).val();	
 		if(e.keyCode != 8 && e.keyCode != 9){
 			if( phone.length >= 11){
 				return false;
 			}		
 		}
 		
 	 });
 }
 
 $.extend($.fn.validatebox.defaults.rules,{  
		 carCode : {
	   	    validator: function(value) {
	   	    	var regex = /^[A-Za-z]{1}[A-Za-z0-9]{4}[A-Za-z0-9挂学警港澳]{1}$/;
		        return regex.test(value);
		     },
		    message: '输入的车牌号不符合标准.如:京A12345' 
	    },
		 phoneNum: { //验证手机号  
             validator: function(value, param){
              return /^1[3-8]+\d{9}$/.test(value);
             },   
             message: '请输入正确的手机号码'  
         },
		carNumberCheck : {//车牌号校验重复
			validator : function(value, param) {
				if(editId != '' || status == 'edit'){
					return true;
				}
				var card = $('#addFrontNumber').combobox('getValue');
				var obj = {};
				 $.ajax({
					async: false,
					cache : false,
					type: 'post',
					url: rootPath + '/carManager/findByCarNumber.do',
					data: {'plateNumbers' : card + $.trim(value)},
					success : function(data){
						obj = data.data;
	    			}
				});
				if((editId == '' && typeof(obj) == 'undefined') || obj.delFlag == '1'){
					repeat = false;
					return true;
				} else{
					repeat = true;
				 return false; 
				}
			},
			message : '车牌号已存在'
		}
	});  
 var buttons = $.extend([], $.fn.datebox.defaults.buttons);
 buttons.splice(1, 0, {
     text: '清空',
     handler: function (target) {//target对象就是当前的inupt对象，不需要写死id
         $(target).datebox('setValue', '');
     }
 });
