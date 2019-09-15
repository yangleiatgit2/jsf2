$(function() {
	// 初始化数据字典
	initDictDatas('BUSINESS_MODE,CONTRAST_STATUS');
	//业务模式
	uceDictCombobox("cmbBusinessMode","BUSINESS_MODE");
	//差异数据状态
	uceDictCombobox("cmbContrastStatus","CONTRAST_STATUS");
	/*网点*/
	orgCombogrid('cmbgSiteCode', {orgTypes : ORG_TYPE_SITE,orgStatus : ORG_ENABLED});
	/*分拨中心*/
	orgCombogrid('cmbgWorkCenterCode',{orgTypes:ORG_TYPE_OPERATE_CENTER,orgStatus: ORG_ENABLED});
	dateRange("dtStartTime","dtEndTime");
	//主视图列
	var columns = [ [ 
		{field : 'drivingPlanCode' , title : '发车计划编号' , align : 'center',width : 120,formatter : formatTip},
		{field : 'departTime' , title : '发车计划开始时间' , align : 'center',width : 150,formatter : function(value){
			return formatData(value);
		}},
		{field : 'arrivalTime' , title : '发车计划结束时间' , align : 'center',width : 150,formatter : function(value){
			return formatData(value);
		}},
		{field : 'workCenterName' , title : '分拨中心' , align : 'center',width : 100,formatter : formatTip},
		{field : 'siteName' , title : '网点' , align : 'center',width : 100,formatter : formatTip},
		{field : 'businessMode' , title : '业务模式' , align : 'center',width : 80,formatter : function(value){
			return getTypeNameByCode("BUSINESS_MODE",value,formatTip);
		}},
		{field : 'driverName' , title : '司机姓名' , align : 'center',width : 80,formatter : formatTip},
		{field : 'plateNumber' , title : '车牌号' , align : 'center',width : 80,formatter : formatTip},
		{field : 'forecastWeight' , title : '预测重量(T)' , align : 'center',width : 80,formatter : formatTip},
		{field : 'actualWeight' , title : '实际重量(T)' , align : 'center',width : 80,formatter : formatTip},
		{field : 'weightDiff' , title : '差异数据(T)' , align : 'center',width : 80,formatter : formatTip},
		{field : 'forecastVolume' , title : '预测方数(F)' , align : 'center',width : 80,formatter : formatTip},
		{field : 'actualVolume' , title : '实际方数(F)' , align : 'center',width : 80,formatter : formatTip},
		{field : 'volumeDiff' , title : '差异数据(F)' , align : 'center',width : 80,formatter : formatTip},
		] ];
	var dataGridParams = {
//		url : 'findDriverEvaluateReportByPage.do',
		url:'',
		pageSize : 10,
		toolbar : '#tlbFreightContrastReport',
		singleSelect : 'true',
	}
	//加载表单数据
	newloadGrid('dgFreightContrastReport',columns,dataGridParams);

});

/**
 * 根据条件查询
 */
function findFreightContrastReport(){
	var row=serializeFormObj("formCondition");
	var startTimeByBegin=row.startTimeByBegin;
	var startTimeByEnd=row.startTimeByEnd;
	if((startTimeByBegin!=''&&startTimeByEnd=='')||
			(startTimeByBegin==''&&startTimeByEnd!=''))
			return showInfoMsg("请正确选择起止时间");
	var dayDiff=dateDiff(startTimeByBegin,startTimeByEnd);
	if(dayDiff>31)
		return showInfoMsg("时间跨度超过一个月");
	var options=$("#dgFreightContrastReport").datagrid("options");
	options.url=rootPath+"/freightContrastReport/findFreightContrastReportByPage.do";
	$("#dgFreightContrastReport").datagrid("load",row);
}
//重置时间控件
function resetFreightContrastReport(){
	cancelDateRange("dtStartTime","dtEndTime");
	$("#formCondition").form("reset");
}

//执行数据导出 根据查询条件导出
function doExport(){
	var condition=serializeFormObj("formCondition");
	$("#formCondition").form("submit",{
		url:rootPath+"/freightContrastReport/exportXls.do",
		onSubmit:function(value){
//			uceLoading.show("请稍后...");
		},success:function(){
//			alert(1231231);
//			uceLoading.close();
		},error:function(){
//			uceLoading.close();
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