/**
 * 日期相減取天
 * 传入日期格式 yyyy-MM-dd
 * sDate 开始日期，eDate结束日期
 */
function dateDiff(sDate, eDate)
{	
	var aDate, oDate1, oDate2, iDays;
	aDate = sDate.split("-");      
	oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);   //转换为12-13-2008格式      
	aDate = eDate.split("-");      
	oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]); 
	console.log("dateDiff");
	var iDays = parseInt(Math.abs(oDate2 - oDate1) / 1000 / 60 / 60 /24); //把相差的好分秒转换为天数
    return iDays;
}


/**
 * 格式化日期
 * 格式为 yyyy-MM-dd
 */
function formatDate(value) {
	if (value == null) {
		return '';
	}
	var val = new Date(value);
	var year = parseInt(val.getYear()) + 1900;
	var month = parseInt(val.getMonth()) + 1;
	month = month > 9 ? month : ('0' + month);
	var date = parseInt(val.getDate());
	date = date > 9 ? date : ('0' + date);
	var time = year + '-' + month + '-' + date;
	return time;
}


/** 
 * 日期格式化为hh:mm:ss 
 * */
function formatTimeSecond(value) {
	if (value == null) {
		return '';
	}
	var val = new Date(value);
	var hours = parseInt(val.getHours());
	hours = hours > 9 ? hours : ('0' + hours);
	var minutes = parseInt(val.getMinutes());
	minutes = minutes > 9 ? minutes : ('0' + minutes);
	var seconds = parseInt(val.getSeconds());
	seconds = seconds > 9 ? seconds : ('0' + seconds);
	var time = hours + ':' + minutes + ':' + seconds;
	return time;
}
/**
 * 日期相減取月，不足一月按一个月算
 * 传入日期格式 yyyy-MM-dd
 * sDate 开始日期，eDate结束日期
 */
function getMonthDiff(sDate,eDate){
	var d1 = new Date(Date.parse(sDate.replace(/-/g, "/"))); //转化成日期对象
	var d2 = new Date(Date.parse(eDate.replace(/-/g, "/")));
	if(d1 > d2){
		console.log("结束日期必须大于开始日期");
		return;
	}
	var monthDiff = 0;
	if(d2.getDate() > d1.getDate()){
		monthDiff += 1; 
	}
	monthDiff += (d2.getFullYear() - d1.getFullYear())*12 + (d2.getMonth() - d1.getMonth());
    return monthDiff;
}

/**
 * 获取当天日期 返回日期格式 yyyy-MM-dd
 */
function getCurrentDate(){
	var today = new Date();
	return formatDate(today);
}
/**
 * 获取左天日期 返回日期格式 yyyy-MM-dd
 */
function getYesterday(){
	 var day = new Date();
	 day.setTime(day.getTime()-24*60*60*1000);
	 var s1 = day.getFullYear()+"-" + ((day.getMonth()+1) > 9 ? (day.getMonth()+1): ("0"+(day.getMonth()+1))) + "-" + (day.getDate() > 9 ? day.getDate() : ('0' + day.getDate()));
	 return s1
}




//
/**
 * n个月后的日期 
 * dtstr 开始日期, n：n个月后的日期
 * 传入格式yyyy-MM-dd 
 * 返回日期格式 yyyy-MM-dd
 */
function addmulMonth(dtstr, n)
{      
    var s = dtstr.split("-");
    var yy = parseInt(s[0]);
    var mm = parseInt(s[1])-1 ; 
    var dd = parseInt(s[2]); 
    var dt = new Date(yy, mm, dd); 
    dt.setMonth(dt.getMonth() + n);
    var month = parseInt(dt.getMonth()) + 1;
    return dt.getFullYear() + "-" + (month > 9 ? month: "0" + month)  + "-" + (dd > 9 ? dd: "0" + dd);
} 

/**
 * json对象转string, 并把双引号替换成单引号
 * row json对象
 */
function json2String(row){
	return JSON.stringify(row).replace(/"/g, '\'');
}

/**
 * 先把单引号替换成双引号，在把string对象转json对象
 * str 字符串
 */
function string2Json(str){
	return JSON.parse(str.replace(/'/g, '"'));
}


/**
 * 输入字母转大写
 */
function toUpperCaseValue(){
	var idStr = undefined;
	for(var i=0;i < arguments.length;i++){
		if(!idStr){
			idStr = "#" + arguments[i];
		}else{
			idStr += ",#" + arguments[i];
		}
	}
	$("input",$(idStr).next("span")).css('text-transform','uppercase');
}


Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, // month
		"d+": this.getDate(), // day
		"h+": this.getHours(), // hour
		"m+": this.getMinutes(), // minute
		"s+": this.getSeconds(), // second
		"q+": Math.floor((this.getMonth() + 3) / 3), // quarter
		"S": this.getMilliseconds()
		// millisecond
	}
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
			.substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	return format;
}
/**
 * 数字转中文大写
 */
function digitUppercase(money) {
	  //汉字的数字
	  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
	  //基本单位
	  var cnIntRadice = new Array('', '拾', '佰', '仟');
	  //对应整数部分扩展单位
	  var cnIntUnits = new Array('', '万', '亿', '兆');
	  //对应小数部分单位
	  var cnDecUnits = new Array('角', '分', '毫', '厘');
	  //整数金额时后面跟的字符
	  var cnInteger = '整';
	  //整型完以后的单位
	  var cnIntLast = '元';
	  //最大处理的数字
	  var maxNum = 999999999999999.9999;
	  //金额整数部分
	  var integerNum;
	  //金额小数部分
	  var decimalNum;
	  //输出的中文金额字符串
	  var chineseStr = '';
	  //分离金额后用的数组，预定义
	  var parts;
	  if (money == '') { return ''; }
	  money = parseFloat(money);
	  if (money >= maxNum) {
	    //超出最大处理数字
	    return '';
	  }
	  if (money == 0) {
	    chineseStr = cnNums[0] + cnIntLast + cnInteger;
	    return chineseStr;
	  }
	  //转换为字符串
	  money = money.toString();
	  if (money.indexOf('.') == -1) {
	    integerNum = money;
	    decimalNum = '';
	  } else {
	    parts = money.split('.');
	    integerNum = parts[0];
	    decimalNum = parts[1].substr(0, 4);
	  }
	  //获取整型部分转换
	  if (parseInt(integerNum, 10) > 0) {
	    var zeroCount = 0;
	    var IntLen = integerNum.length;
	    for (var i = 0; i < IntLen; i++) {
	      var n = integerNum.substr(i, 1);
	      var p = IntLen - i - 1;
	      var q = p / 4;
	      var m = p % 4;
	      if (n == '0') {
	        zeroCount++;
	      } else {
	        if (zeroCount > 0) {
	          chineseStr += cnNums[0];
	        }
	        //归零
	        zeroCount = 0;
	        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
	      }
	      if (m == 0 && zeroCount < 4) {
	        chineseStr += cnIntUnits[q];
	      }
	    }
	    chineseStr += cnIntLast;
	  }
	  //小数部分
	  if (decimalNum != '') {
	    var decLen = decimalNum.length;
	    for (var i = 0; i < decLen; i++) {
	      var n = decimalNum.substr(i, 1);
	      if (n != '0') {
	        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
	      }
	    }
	  }
	  if (chineseStr == '') {
	    chineseStr += cnNums[0] + cnIntLast + cnInteger;
	  } else if (decimalNum == '') {
	    chineseStr += cnInteger;
	  }
	  return chineseStr;
	}

/**
 * 判断是否为日期格式
 * @param dateString
 * @returns {Boolean}
 */
function isDate(dateString){
	  if(dateString.trim()=="")return true;
	  var r=dateString.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
	  if(r==null){
	  return false;
	  }
	  var d=new Date(r[1],r[3]-1,r[4]);  
	  var num = (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
	  if(num==0){
	  }
	  return (num!=0);
}