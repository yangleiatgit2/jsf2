/**
 * 公共组件校验
 */
$.extend($.fn.validatebox.defaults.rules,{		
	/**
	 * 校验手机号
	 */
	phoneNum:{
	    validator: function(value, param){
	     return /^1[34578]\d{9}$/.test(value);
	    },   
	    message: '请输入正确的手机号码'
    },    
    /**
     * 验证电话号码
     */
    phone: {
        validator: function (value, param) {
            return /^((\d2,3)|(\d{3}\-))?(0\d2,3|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
        },
        message: '格式不正确,请使用下面格式:020-88888888'
    },    
    /**
     * 验证身份证
     */
    idcard: {
        validator: function (value, param) {
            return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
        },
        message: '身份证号码格式不正确'
    },
    
    /**
     * 验证货币
     */
    currency: {
        validator: function (value) {
            return /^\d+(\.\d+)?$/i.test(value);
        },
        message: '货币格式不正确'
    },    
    /**
     * 验证整数 可正负数
     */
    integer: {
        validator: function (value) {
            return /^([+]?[0-9])|([-]?[0-9])+\d*$/i.test(value);
        },
        message: '请输入整数'
    },    
    /**
     * 验证正整数
     */
    pinteger: {
    	validator: function (value) {
    		return /^\d+(\.\d+)?$/i.test(value);
    	},
    	message: '请输入正数'
    },    
    /**
     * 验证中文
     */
    chinese: {
        validator: function (value) {
            return /^[\Α-\￥]+$/i.test(value);
        },
        message: '请输入中文'
    },   
    /**
     * 验证英语
     */
    english: {
        validator: function (value) {
            return /^[A-Za-z]+$/i.test(value);
        },
        message: '请输入英文'
    },   
    /**
     * 验证是否包含空格和非法字符
     */
    unnormal: {
        validator: function (value) {
            return /.+/i.test(value);
        },
        message: '输入值不能为空和包含其他非法字符'
    },   
    /**
     * 验证IP地址
     */
    ip: {
        validator: function (value) {
            return /d+.d+.d+.d+/i.test(value);
        },
        message: 'IP地址格式不正确'
    },
    
    /**
     * 国内邮编验证
     */
    zipcode: {
        validator: function (value, param) {
            var reg = /^[1-9]\d{5}$/;
            return reg.test(value);
        },
        message: '请输入6位正确的邮政编码'
    },   
    /**
     * 验证中文或英文
     */
    name: {
        validator: function (value) {
            return /^[\Α-\￥]+$/i.test(value) | /^\w+[\w\s]+\w+$/i.test(value);
        },
        message: '请输入有效的信息'
    },    
    /**
     * 校验radio
     */
    radio: {
        validator: function (value, param) {
            var frm = param[0], groupname = param[1], ok = false;
            $('input[name="' + groupname + '"]', document[frm]).each(function () {
                if (this.checked) { ok = true; return false; }
            });

            return ok
        },
        message: '请选择一项'
    },   
    /**
     * 复选框校验
     */
    checkbox: {
        validator: function (value, param) {
            var frm = param[0], groupname = param[1], checkNum = 0;
            $('input[name="' + groupname + '"]', document[frm]).each(function () { //查找表单中所有此名称的checkbox
                if (this.checked) checkNum++;
            });
            return checkNum > 0;
        },
        message: '请至少选择一项！'
    },
    /**
     * 税号校验
     */
	tax:{
		validator : function(value, param) {
			return /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/i.test(value);
		},
		message : '请输入正确的税号'
	},
	/**
     * 传真号校验
     */
	faxno: {
        validator: function (value) {
            return /^((\d2,3)|(\d{3}\-))?(0\d2,3|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
        },
        message: '请输入正确的传真号码'
    },
    
    /**
     * 英文数字校验
     */
    englishNumber: {
        validator: function (value) {
            return /^[0-9A-Za-z]+$/i.test(value);
        },
        message: '请输入字母或数字'
    },
    
	/**
	 * 校验手机号
	 */
	phoneOrMobile:{
	    validator: function(value, param){
	     return /^1[3-8]+\d{9}$/.test(value) || /^((\d2,3)|(\d{3}\-))?(0\d2,3|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
	    },   
	    message: '请输入正确的手机号码或电话号码'
    }, 
    
    /**
	 * 校验银行卡号
	 */
    bankno:{
    	validator: function(value, param){
		　　var bankno = $.trim(value);
		　　if(bankno == "") {
		　　	return false;
			}
			if(bankno.length < 16 || bankno.length > 19) {
			　　return false;
			}
			var num = /^\d*$/; //全数字
			if(!num.exec(bankno)) {
			　　return false;
			}
			//开头6位
			var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
			if(strBin.indexOf(bankno.substring(0, 2)) == -1) {
			　　return false;
			}
			//Luhm校验（新）
			var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）
			var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
			var newArr=new Array();
			for(var i=first15Num.length-1;i>-1;i--){ //前15或18位倒序存进数组
			　　newArr.push(first15Num.substr(i,1));
			}
			var arrJiShu=new Array(); //奇数位*2的积 <9
			var arrJiShu2=new Array(); //奇数位*2的积 >9
			var arrOuShu=new Array(); //偶数位数组
			for(var j=0;j<newArr.length;j++){
			if((j+1)%2==1){//奇数位
			if(parseInt(newArr[j])*2<9)
			　　arrJiShu.push(parseInt(newArr[j])*2);
			else
			　　arrJiShu2.push(parseInt(newArr[j])*2);
			}
			else //偶数位
			arrOuShu.push(newArr[j]);
			}
			var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
			var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
			for(var h=0;h<arrJiShu2.length;h++){
			　　jishu_child1.push(parseInt(arrJiShu2[h])%10);
			　　jishu_child2.push(parseInt(arrJiShu2[h])/10);
			}
			var sumJiShu=0; //奇数位*2 < 9 的数组之和
			var sumOuShu=0; //偶数位数组之和
			var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
			var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
			var sumTotal=0;
			for(var m=0;m<arrJiShu.length;m++){
			　　sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
			}
			for(var n=0;n<arrOuShu.length;n++){
			　　sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
			}
			for(var p=0;p<jishu_child1.length;p++){
			　　sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
			　　sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
			}
			//计算总和
			sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
			//计算Luhm值
			var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;
			var luhm= 10-k;
			if(lastNum==luhm){
			　　return true;
			}
			else{
			　　return false;
			}
    	},
    	message: '请输入正确的银行卡号'
    }
});
