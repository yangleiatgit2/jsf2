$.extend($.fn.datetimebox.methods,{
	setDefaultTimeForBegin:function(jquery,flag){
		return jquery.each(function(){
			var date=new Date();
			var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
			var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
			var year=date.getFullYear();
			if(flag)
				$(this).datetimebox("setValue",year+"-"+month+"-"+day+" 00:00:00");
			else
				$(this).datetimebox("setValue",year+"-"+month+"-"+day+" 23:59:59");
				
		});
	}
});

$(function() {
	// 初始化数据字典
	initDictDatas('DRIVERR_STATUS,DRIVER_OWNER_TYPE,DEPARTURE_STATUS');
	uceDictCombobox("cmbDriverStatus","DRIVERR_STATUS");
	uceDictCombobox("cmbOwnerType","DRIVER_OWNER_TYPE");
//	driverCombogrid("cmbgDriverPhone",{idField:"mobilePhone"});
	//主视图列
	var columns = [ [ 
		{field : 'des' , title : '操作' , align : 'center' ,width : 70 ,formatter:function(value,rec,index){
			return '<a class="icon-line iconfont uce-see-details" title="查看详情" onclick="openDriverEvaluateReportDetail(\'' + index + '\')" href="javascript:void(0)"></a>';
		}},
		{field : 'drivingPlanCode' , title : '发车计划编号' , align : 'center',width : 120,formatter : formatTip},
		{field : 'departTime' , title : '发车计划开始时间' , align : 'center',width : 100,formatter : function(value){
			return formatData(value);
		}},
		{field : 'arrivalTime' , title : '发车计划结束时间' , align : 'center',width : 100,formatter : function(value){
			return formatData(value);
		}},
		{field : 'driverName' , title : '司机姓名' , align : 'center',width : 80,formatter : formatTip},
		{field : 'driverType' , title : '运力类型' , align : 'center',width : 80,formatter : function(value){
			return getTypeNameByCode("DRIVER_OWNER_TYPE",value,formatTip);
		}},
		{field : 'driverStatus' , title : '司机状态' , align : 'center',width : 60,formatter : function(value){
			return getTypeNameByCode("DRIVERR_STATUS",value,formatTip);
		}},
		{field : 'praiseRate' , title : '好评率' , align : 'center',width : 60,formatter : function(value,rec,index){
			return value!=null?Number(value).toFixed(2)+"%":'';
		}},
		{field : 'appraised' , title : '评价量' , align : 'center',width : 60,formatter : formatTip},
		{field : 'notAppraised' , title : '未评价量' , align : 'center',width : 60,formatter : formatTip},
		] ];
	var dataGridParams = {
//		url : 'findDriverEvaluateReportByPage.do',
		url:'',
		pageSize : 10,
		toolbar : '#tlbDriverEvaluateReport',
		singleSelect : 'true',
		fitColumns : 'true',
	}
	//加载表单数据
	newloadGrid('dgDriverEvaluateReport',columns,dataGridParams);

		//详情视图列
	var detailsColumns = [ [ 
	      {field : 'wayPointName' , title : '评价网点' , align : 'center',width : 120,formatter : formatTip},
          {field : 'stationEvalLever' , title : '评价星级' , align : 'center',width : 120,formatter : formatTip},
          {field : 'stationAppraise' , title : '评价内容' , align : 'center',width : 120,formatter : formatTip},
          {field : 'apprasideTime' , title : '评价时间' , align : 'center',width : 120,formatter : function(value){
        	  return formatData(value);
          }},
          {field : 'planSiteStatus' , title : '发车计划状态' , align : 'center',width : 120,formatter : function(value){
        	  return getTypeNameByCode("DEPARTURE_STATUS",value,formatTip);
          }},
	    ]];
	
	var detailsDataGridParams={
			url:'',
			pageSize:10,
			toolbar:"#tlbDetail",
			singleSelect:'true',
			fitColumns:'true',
	}
	//详情表单
	newloadGrid("dgDriverEvaluateReportDetail",detailsColumns,detailsDataGridParams);
	dateRange("dtStartTime","dtEndTime");
//	$("#dtStartTime").datetimebox("setDefaultTimeForBegin",true);
//	$("#dtEndTime").datetimebox("setDefaultTimeForBegin",false);
});

//根据查询条件查询
function findDriverEvaluateReport(){
	var options=$("#dgDriverEvaluateReport").datagrid("options");
	options.url="findDriverEvaluateReportByPage.do";
	var searchData=serializeFormObj("formCondition");
	var departTime=searchData.departTime;
	var arrivalTime=searchData.arrivalTime;
	if((searchData.departTime==''&&searchData.arrivalTime!='')||
		(searchData.departTime!=''&&searchData.arrivalTime=='')){
		return showInfoMsg("请正确选择起止出发时间");
	}
	if(arrivalTime<departTime){
		return showInfoMsg("请正确选择起止出发时间");
	}
	var result=dateDiff(departTime,arrivalTime);
	if(result>31)
		return showInfoMsg("时间跨度超过一个月");
	if(searchData.praiseRateBegin&&searchData.praiseRateEnd){
		if(parseInt(searchData.praiseRateBegin)>parseInt(searchData.praiseRateEnd))
			return showInfoMsg("请正确输入好评率区间");
	}
	$("#dgDriverEvaluateReport").datagrid("load",searchData);
}

//重置
function resetDriverEvaluateReport(){
	cancelDateRange("dtStartTime","dtEndTime");
	$("#formCondition").form("reset");
//	$("#dtStartTime").datetimebox("setDefaultTimeForBegin",true);
//	$("#dtEndTime").datetimebox("setDefaultTimeForBegin",false);
}

//打开详情页
function openDriverEvaluateReportDetail(index){
	var row=$("#dgDriverEvaluateReport").datagrid("getRows")[index];
	var drivingPlanCode=row.drivingPlanCode;
	var datagridOpts=$("#dgDriverEvaluateReportDetail").datagrid("options");
	datagridOpts.url=rootPath+"/departurePlan/finddeparturePlanDetailByPage.do";
	$("#dgDriverEvaluateReportDetail").datagrid("load",{drivingPlanCode:drivingPlanCode});
	openDialog("dlgDriverEvaluateReportDetail","评价详情");
//	$.ajax({
//		url:rootPath+"/departurePlan/finddeparturePlanDetailByPage.do",
//		data:{drivingPlanCode:planCode},
//		task:function(data,status,xhr){
//		}
//	});
}

//执行导出
function doExport(){
	var condition=serializeFormObj("formCondition");
	$("#formCondition").form("submit",{
		url:rootPath+"/driverEvaluateReport/exportXls.do",
		onSubmit:function(value){
			
		}
	});
}


//限制开始结束日期输入规则
function dateRange(startTime, endTime) {
	$("#" + startTime).datebox({
		onSelect : function(start) {
			if ($("#" + endTime).datebox('getValue')) {
				// 开始时间大于结束时间
				var end = $("#" + endTime).datebox('getValue');
				if (start > end) {
					$("#" + endTime).datebox('setValue', "");
				} else {
					/* 控制结束日期输入大小 */
					$("#" + endTime).datebox().datebox('calendar').calendar({
						validator : function(value) {
							return value >= start;
						}
					});
					$("#" + endTime).datebox('setValue', end);
				}
			}else{
				/* 控制结束日期输入大小 */
				$("#" + endTime).datebox().datebox('calendar').calendar({
					validator : function(value) {
						return value >= start;
					}
				});
			}
		}
	});
	$("#" + endTime).datebox({
		onSelect : function(end) {
			if ($("#" + startTime).datebox('getValue')) {
				var start = $("#" + startTime).datebox('getValue');
				if (start > end) {
					$("#" + startTime).datebox('setValue', "");
				} else {
					/* 控制开始日期输入大小 */
					$("#" + startTime).datebox().datebox('calendar').calendar({
						validator : function(value) {
							return value <= end;
						}
					});
					$("#" + startTime).datebox('setValue', start);
				}
			}else{
				/* 控制开始日期输入大小 */
				$("#" + startTime).datebox().datebox('calendar').calendar({
					validator : function(value) {
						return value <= end;
					}
				});
			}
		}
	});
}

function dateDiff(strDate1,strDate2){
	  //strDate1=strDate1.substring(0,strDate1.lastIndexOf(".")).replace(/-/g,"/"); 
	  //strDate2=strDate2.substring(0,strDate2.lastIndexOf(".")).replace(/-/g,"/"); 
	  strDate1=strDate1.replace(/-/g,"/"); 
	  strDate2=strDate2.replace(/-/g,"/"); 
	  var date1 = Date.parse(strDate1); 
	  var date2 = Date.parse(strDate2); 
	  return Math.ceil((date2-date1)/(24*60*60*1000));
}

/**
*  取消时间限制 datebox
* @param startTime 开始时间控件 id
* @param endTime 结束时间控件 id
* @param pattern
*/
function cancelDateRange(startTime, endTime,pattern){
	/*if(pattern =='yyyy-MM-dd')*/{
		/* 控制开始日期输入大小 */
		resetDateBox(startTime);
		/* 控制结束日期输入大小 */
		resetDateBox(endTime);
	/*}else if(pattern =='yyyy-MM-dd hh:mm:ss'){*/
		
	}
	
}
/**
* 初始化datebox的时间限制
* @param dateboxId 时间控件id 
*/
function resetDateBox(dateboxId){
	/* 控制结束日期输入大小 */
	$("#" + dateboxId).datebox().datebox('calendar').calendar({
		validator : function(value) {
			var date = new Date('1970-01-01'.replace(/-/,"/")) 
			return value >= date;
		}
	});
}

function calcDate(days, date) {
	var d;
	if (date)
		d = new Date(date);
	else
		d = new Date();
	d.setDate(d.getDate() + days);
	var month = d.getMonth() + 1;
	var day = d.getDate();
	if (month < 10) {
		month = "0" + month;
	}
	if (day < 10) {
		day = "0" + day;
	}
	var val = d.getFullYear() + "-" + month + "-" + day;
	return val;
}
/**
 * 计算汇总
 * @param colName 行名
 * @returns 当前页 列名:'colName' 的总和
 */
function compute(dgId,colName) {
    var rows = $('#' + dgId).datagrid('getRows');
    var total = 0;
    if(rows && rows.length > 0){
    	for (var i = 0; i < rows.length; i++) {
    		total += parseFloat(rows[i][colName]);
    	}
    }
    return total;
}
