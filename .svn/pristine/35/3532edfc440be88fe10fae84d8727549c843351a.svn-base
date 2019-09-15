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
var str='';
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
	 
	  /**
	     * 验证驾驶证和行驶证
	     */
	 toLong: {
		 validator: function (value) {
			 var end = $("#" + endTime).datebox('getValue');
			
		 },
		 message: '你的终止日期或开始日期有误！'
	 },
	    drivingCode: {
	    	validator: function (value, param) {
	            return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
	        },
	        message: '证件格式不正确！'
	    },
	 passValue :{
		  validator: function(value) {
	   	    	var regex = /[\,\.\\\/\[\]{}<>()|"'!%;*?:+ =#$%^&*]+/g;
		        if(!regex.test(value)){
		        	 var val = value.length<=25;
		        	return val;
		        }
	   	    	return false;
		     },
		    message:  "格式不正确！"
	 },
	 smallVal :{
		 validator: function(value){
			 var a=$("#truckVolume").val();
			 if(a!=null){
				 if( parseFloat(value)<=parseFloat(a)){
					 return true;
				 }
			 }
			 return false;
		 },
		 message: '缓冲方数不能比实际方数大！！'
	 },
	 selectNull :{
		 validator: function(value){
			if(value!="--请选择--"){
				return true;
			}else{
				return false;
			}
			  
		 },
		 message: '此下拉必选！'
	 },
	 selectValue :{
		 validator: function(value){
			 if(value=="--请选择--"){
				 return false;
			 } else if(value=="否"){
					$("#passImageId").textbox('setValue','');
					$("#passImageId").val()
					return true;
			}else{
					return  true;
			}
		
			  
		 },
		 message: '请选择！'
	 },
	 surplus :{
		 validator: function(value){
			if(value.length>0 && value.length<=500){
				$("#surplus").val("你还能编辑"+500-value.length+"字");
				return true;
			}else {
				return false;
			}
			  
		 },
		 message: '请编辑你需要的文字！'
	 },
	 myName: {
	        validator: function (value) {
	        	if(value.length<=25){
	        		return /^[\Α-\￥]+$/i.test(value) | /^\w+[\w\s]+\w+$/i.test(value);
	        	}
	        	return false
	        },
	        message: '请输入有效的信息'
	    }, 
	 date : {     
         validator: function(value){     
             return /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/i.test($.trim(value));     
         },     
         message: '曰期格式错误,如2012-09-11.'    
     },
		 carCode : {
	   	    validator: function(value) {
	   	    	var regex = /[\,\.\\\/\[\]{}<>()|"'!%;*?:+ =#$%^&*]+/g;
		        return !regex.test(value);
		     },
		    message: '不能包含空格和特殊字符< > [ ] { } ( ) : | " \\ / \' ! % ; * ? + = # $ % ^ & *' 
	    },
		
		carNumberCheck : {//车牌号校验重复
			validator : function(value, param) {
				if(editId != '' || status == 'edit'){
					return true;
				}
				var card = $('#frontNumber').combobox('getValue');
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
