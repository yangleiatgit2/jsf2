var statView = $.extend({}, $.fn.datagrid.defaults.view, {
    renderFooter: function(target, container, frozen){
        var opts = $.data(target, 'datagrid').options;
        var rows = $.data(target, 'datagrid').footer || [];
        var fields = $(target).datagrid('getColumnFields', frozen);
        var table = ['<table class="datagrid-ftable" cellspacing="0" cellpadding="0" border="0"><tbody>'];
         
        for(var i=0; i<rows.length; i++){
            var styleValue = opts.rowStyler ? opts.rowStyler.call(target, i, rows[i]) : '';
            var style = styleValue ? 'style="' + styleValue + '"' : '';
            table.push('<tr class="datagrid-row" datagrid-row-index="' + i + '"' + style + '>');
            table.push(this.renderRow.call(this, target, fields, frozen, i, rows[i]));
            table.push('</tr>');
        }
         
        table.push('</tbody></table>');
        $(container).html(table.join(''));
    }
});

$(function() {
	// 初始化数据字典
	initDictDatas('CAR_TYPE,BUSINESS_MODE');
	//业务模式
	uceDictCombobox("cmbBusinessMode","BUSINESS_MODE");
	//车辆类型
	uceDictCombobox("cmbCarType","CAR_TYPE");
	/*网点*/
	orgCombogrid('cmbgSiteCode', {orgTypes : ORG_TYPE_SITE,orgStatus : ORG_ENABLED});
	/*分拨中心*/
	orgCombogrid('cmbgWorkCenterCode',{orgTypes:ORG_TYPE_OPERATE_CENTER,orgStatus: ORG_ENABLED});
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
{field : 'plateNumber' , title : '车牌号' , align : 'center',width : 80,formatter : formatTip},
{field : 'driverName' , title : '司机姓名' , align : 'center',width : 80,formatter : formatTip},
{field : 'businessMode' , title : '业务模式' , align : 'center',width : 80,formatter : function(value,rec,index){
	return getTypeNameByCode("BUSINESS_MODE",value,formatTip);
}},
{field : 'carType' , title : '车辆类型' , align : 'center',width : 80,formatter : function(value,rec,index){
	return getTypeNameByCode("CAR_TYPE",value,formatTip);
}},
{field : 'carLoad' , title : '最大车载重量(吨)' , align : 'center',width : 100,formatter : formatTip},
{field : 'actualWeight' , title : '实际重量(吨)' , align : 'center',width : 100,formatter : formatTip},
{field : 'loadRatio' , title : '满载率' , align : 'center',width : 60,formatter : function(value){
	return value!=null?Number(value).toFixed(2)+"%":'';
}},
] ];
	var dataGridParams = {
//		url : 'findDriverEvaluateReportByPage.do',
		url:'',
		pageSize : 10,
		toolbar : '#tlbLoadRatioReport',
		singleSelect : 'true',
		showFooter : true,
		//统计footer行设置样式需扩展view
		view : statView,
		rowStyler : statRowStyle,
		//注意：由于在载入成功后在尾部添加一行做统计信息会导致分页总数多一条，所以在加载前先total-1 ，这样分页才不会有问题
		loadFilter: function(data){
			if (data){
				var result = [];
				for(var i=0;i<data.rows.length;i++){
					if(data.rows[i]){
						result.push(data.rows[i]);
					}
				}
				//data.total = data.total - 1;
				var footer = [];
				var footerRow = getFooterRows(result);
				footer.push(footerRow);
				data.rows = result;
				data.footer = footer;
			}
			console.log(data);
			return data;
		}
	}
	//加载表单数据
	newloadGrid('dgLoadRatioReport',columns,dataGridParams);
	dateRange("dtStartTime","dtEndTime");
});

/**
 * 分页查询
 */
function findLoadRatioReport(){
	var condition=serializeFormObj("formCondition");
	var startTimeByBegin=condition.startTimeByBegin;
	var startTimeByEnd=condition.startTimeByEnd;
	if((startTimeByBegin!=''&&startTimeByEnd=='')||
		(startTimeByBegin==''&&startTimeByEnd!=''))
		return showInfoMsg("请正确选择起止时间");
	var result=dateDiff(startTimeByBegin,startTimeByEnd);
	if(result>31){
		condition.startTimeByBegin=null;
		condition.startTimeByEnd=null;
		return showInfoMsg("时间跨度超过1个月");
	}
	$("#dgLoadRatioReport").datagrid({
		url:rootPath+"/loadRatioReport/findLoadRatioReportByPage.do",
		queryParams:serializeFormObj("formCondition"),
		showFooter : true,
		//统计footer行设置样式需扩展view
		view : statView,
		rowStyler : statRowStyle,
		//注意：由于在载入成功后在尾部添加一行做统计信息会导致分页总数多一条，所以在加载前先total-1 ，这样分页才不会有问题
		loadFilter: function(data){
			if (data){
				var result = [];
				for(var i=0;i<data.rows.length;i++){
					if(data.rows[i]){
						result.push(data.rows[i]);
					}
				}
				//data.total = data.total - 1;
				var footer = [];
				var footerRow = getFooterRows(result);
				footer.push(footerRow);
				data.rows = result;
				data.footer = footer;
			}
			return data;
		}
	});
	
//	var options=$("#dgLoadRatioReport").datagrid("options");
//	options.url=rootPath+"/loadRatioReport/findLoadRatioReportByPage.do";
//	$("#dgLoadRatioReport").datagrid("load",condition);
//	console.log(condition);
}

//执行导出
function doExport(){
	var condition=serializeFormObj("formCondition");
	console.log(condition);
	$("#formCondition").form("submit",{
		url:rootPath+"/loadRatioReport/exportXls.do",
		onSubmit:function(value){
			
		}
	});
}

//重置查询条件
function resetLoadRatioReport(){
	cancelDateRange("dtStartTime","dtEndTime");
	$("#formCondition").form("reset");
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
					$("#" + startTime).datebox('setValue',start);
				}
			}else{
				/* 控制开始日期输入大小 */
				$("#" + startTime).datebox().datebox('calendar').calendar({
					validator : function(value) {
						return value <= end&&value>=startDiff;
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

function dateDiff(strDate1,strDate2){
	  //strDate1=strDate1.substring(0,strDate1.lastIndexOf(".")).replace(/-/g,"/"); 
	  //strDate2=strDate2.substring(0,strDate2.lastIndexOf(".")).replace(/-/g,"/"); 
	  strDate1=strDate1.replace(/-/g,"/"); 
	  strDate2=strDate2.replace(/-/g,"/"); 
	  var date1 = Date.parse(strDate1); 
	  var date2 = Date.parse(strDate2); 
	  return Math.ceil((date2-date1)/(24*60*60*1000));
}
function statRowStyle(index,row){
	if (row.drivingPlanCode == "合计"){
		return 'background-color:#6293BB;color:#fff;';
	}
}

function getFooterRows(rows){
	var carLoad=0;
	var actualWeight=0;
	var loadRatio = 0;
	if(rows && rows.length > 0){
		for(var i=0;i<rows.length;i++){
			carLoad+=rows[i].carLoad;
			actualWeight+=rows[i].actualWeight;
		}
	}
	if(carLoad!=0)
		loadRatio=(actualWeight/carLoad)*100;
	else
		loadRatio=0;
	var footerRow = {
		"drivingPlanCode":"合计",
		"carLoad":carLoad,
		"actualWeight":actualWeight,
		"loadRatio":loadRatio
	};
	return footerRow;
	
}