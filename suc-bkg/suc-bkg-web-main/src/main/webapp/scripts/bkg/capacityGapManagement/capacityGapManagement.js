

$(function() {
	initDictDatas("DEMAND_TYPE,BUSINESS_MODE");
	//查询界面空间
	/* 加载主界面grid */
	var columns = [ 
	              [ {"title":"4.2 米","colspan":3},  
	                {"title":"6.8 米","colspan":3},
	                {"title":"7.6 米","colspan":3},  
	                {"title":"9.6 米","colspan":3}
	              ],  
	          	
	              [ {"field":"fourDotTwoExpected","title":"需求","rowspan":1},  
	                {"field":"fourDotTwoActual","title":"实际","rowspan":1},  
	                {"field":"fourDotTwoGap","title":"缺口","rowspan":1,formatter : function(value, rec, index) {
	                	if(value>0){
	                		return '<span id="det"  style="color:red;" >'+value+'</span>';
	                	}else{
	                		return '<span id="det"  >'+value+'</span>';
	                	}
	        		}},  
	                {"field":"sixDotFiveExpected","title":"需求","rowspan":1},  
	                {"field":"sixDotFiveActual","title":"实际","rowspan":1},  
	                {"field":"sixDotFiveGap","title":"缺口","rowspan":1,formatter : function(value, rec, index) {
	                	if(value>0){
	                		return '<span id="det"  style="color:red;" >'+value+'</span>';
	                	}else{
	                		return '<span id="det"  >'+value+'</span>';
	                	}
	        		}},
	                {"field":"sevenDotSixExpected","title":"需求","rowspan":1},  
	                {"field":"sevenDotSixActual","title":"实际","rowspan":1},  
	                {"field":"sevenDotSixGap","title":"缺口","rowspan":1,formatter : function(value, rec, index) {
	                	if(value>0){
	                		return '<span id="det"  style="color:red;" >'+value+'</span>';
	                	}else{
	                		return '<span id="det"  >'+value+'</span>';
	                	}
	        		}}, 
	                {"field":"nineDotSixExpected","title":"需求","rowspan":1},  
	                {"field":"nineDotSixActual","title":"实际","rowspan":1},  
	                {"field":"nineDotSixGap","title":"缺口","rowspan":1,formatter : function(value, rec, index) {
	                	if(value>0){
	                		return '<span id="det"  style="color:red;" >'+value+'</span>';
	                	}else{
	                		return '<span id="det"  >'+value+'</span>';
	                	}
	        		}}
	              ], 
	            ];

	
	var dataGridParams = {
		url : '',
		pageSize : 10,
		toolbar : '#toolbarCapacityGapManagement',
		singleSelect : 'false',
		fitColumns : 'false',  
		frozenColumns:[[ 
		{ title: '日期', field: 'timeSection', width: 200, formatter : function(value, rec, index) {
			return '<a id="det" onclick="openCapacityGapByDay(\'' + index + '\')"  style="text-decoration:underline;color:blue;"  href="javascript:void(0)">'+value+'</a>';
		}}  ,
		
		{ title: '分拨中心', field: 'demandSite', width: 100}  , 
		{ title: '组合详情', field: 'combineNum', width: 80, formatter : function(value, rec, index) {
			return '<a id="det" onclick="openCapacityGapByCombineOrder(\'' + index + '\')"  style="text-decoration:underline;color:blue;"  href="javascript:void(0)">'+value+'</a>';
		}}  
		]] ,
		onBeforeLoad : function(param) {
		},
		onLoadSuccess : function(data) {
		},
		onLoadError : function() {
			// 在载入远程数据产生错误的时候触发。
		}
	}
	/* 多表头 grid 加载表单数据 */
	newMultipleCloumnLoadGrid('tblCapacityGapManagement', columns, dataGridParams);

	/* 加载组织下拉表单数据 */
	orgCombogrid('findDemandSite', {
		orgTypes : ORG_TYPE_OPERATE_CENTER,
		orgStatus : ORG_ENABLED
	});
	dateRange("findExecuteStartTime", "findExecuteEndTime");
	
	var carTypesColumns = [ 
		              [ {"title":"4.2 米","colspan":3},  
		                {"title":"6.8 米","colspan":3},
		                {"title":"7.6 米","colspan":3},  
		                {"title":"9.6 米","colspan":3}
		              ],  
		              
		              [ {"field":"fourDotTwoExpected","title":"需求","rowspan":1},  
		                {"field":"fourDotTwoActual","title":"实际","rowspan":1},  
		                {"field":"fourDotTwoGap","title":"缺口","rowspan":1,formatter : function(value, rec, index) {
		                	if(value>0){
		                		return '<span id="det"  style="color:red;" >'+value+'</span>';
		                	}else{
		                		return '<span id="det"  >'+value+'</span>';
		                	}
		        		}},  
		                {"field":"sixDotFiveExpected","title":"需求","rowspan":1},  
		                {"field":"sixDotFiveActual","title":"实际","rowspan":1},  
		                {"field":"sixDotFiveGap","title":"缺口","rowspan":1,formatter : function(value, rec, index) {
		                	if(value>0){
		                		return '<span id="det"  style="color:red;" >'+value+'</span>';
		                	}else{
		                		return '<span id="det"  >'+value+'</span>';
		                	}
		        		}},
		                {"field":"sevenDotSixExpected","title":"需求","rowspan":1},  
		                {"field":"sevenDotSixActual","title":"实际","rowspan":1},  
		                {"field":"sevenDotSixGap","title":"缺口","rowspan":1,formatter : function(value, rec, index) {
		                	if(value>0){
		                		return '<span id="det"  style="color:red;" >'+value+'</span>';
		                	}else{
		                		return '<span id="det"  >'+value+'</span>';
		                	}
		        		}}, 
		                {"field":"nineDotSixExpected","title":"需求","rowspan":1},  
		                {"field":"nineDotSixActual","title":"实际","rowspan":1},  
		                {"field":"nineDotSixGap","title":"缺口","rowspan":1,formatter : function(value, rec, index) {
		                	if(value>0){
		                		return '<span id="det"  style="color:red;" >'+value+'</span>';
		                	}else{
		                		return '<span id="det"  >'+value+'</span>';
		                	}
		        		}}
		              ], 
		            ];

		
		var capacityCombinGridParams = {
			url : '',
			pageSize : 10,
			toolbar : '#tlbDetial',
			singleSelect : 'false',
			fitColumns : 'false',  
			
			frozenColumns:[[ 
			{ title: '组合编号', field: 'orderCombinCode', width: 120}  ,
			{ title: '日期', field: 'timeSection', width: 90}  ,
			{ title: '需求类型', field: 'requiType', width: 80,formatter:function(value){
				return getTypeNameByCode("DEMAND_TYPE",value,formatTip);
			}}  , 
			{ title: '业务分类', field: 'businessMode', width: 80,formatter:function(value){
				return getTypeNameByCode("BUSINESS_MODE",value,formatTip);
			}}  ,
			{ title: '分拨中心', field: 'demandSite', width: 100}  
			]] ,
			onBeforeLoad : function(param) {
			},
			onLoadSuccess : function(data) {
			},
			onLoadError : function() {
				// 在载入远程数据产生错误的时候触发。
			}
		}
		var capacityDayGridParams = {
				url : '',
				pageSize : 10,
				toolbar : '#tlbDetial',
				singleSelect : 'false',
				fitColumns : 'false',  
				
				frozenColumns:[[ 
				{ title: '日期', field: 'timeSection', width: 150}  ,
				{ title: '分拨中心', field: 'demandSite', width: 100}  , 
				{ title: '组合编号', field: 'combineNum', width: 80}  
				]] ,
				onBeforeLoad : function(param) {
				},
				onLoadSuccess : function(data) {
				},
				onLoadError : function() {
					// 在载入远程数据产生错误的时候触发。
				}
			}
		/* 多表头 grid 加载表单数据 */
		newMultipleCloumnLoadGrid('tblCapacityGapByDay', carTypesColumns, capacityDayGridParams);
		newMultipleCloumnLoadGrid('tblCapacityGapByCombine', carTypesColumns, capacityCombinGridParams);
});

function openCapacityGapByDay(index){
	var row = $('#tblCapacityGapManagement').datagrid('getRows')[index];
	url = rootPath + "/capacityGapManagement/openCapacityGapByDay.do?timeSection="+row.timeSection+"&demandSiteCode="+row.demandSiteCode+"&demandSite="+row.demandSite;
	openDialog("dlgCapacityGapByDay", '日缺口详情');
	var opts=$('#tblCapacityGapByDay').datagrid('options');
	opts.url = url;
	$('#tblCapacityGapByDay').datagrid('load',null);
}

function openCapacityGapByCombineOrder(index){
	var row = $('#tblCapacityGapManagement').datagrid('getRows')[index];
	url = rootPath + "/capacityGapManagement/openCapacityGapByCombineOrder.do?timeSection="+row.timeSection+"&demandSiteCode="+row.demandSiteCode+"&demandSite="+row.demandSite+"&orderCombinCodeArr="+row.orderCombinCodeArr;
	openDialog("dlgCapacityGapByCombine", '组合缺口详情');
	var opts=$('#tblCapacityGapByCombine').datagrid('options');
	opts.url = url;
	$('#tblCapacityGapByCombine').datagrid('load',null);
}
/*
 * 限制日期控件范围
 */
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
 * 取消时间限制
 * @param startTime
 * @param endTime
 */
function cancelDateRange(startTime, endTime){
	/* 控制开始日期输入大小 */
	resetDateBox(startTime);
	/* 控制结束日期输入大小 */
	resetDateBox(endTime);
	
}
/**
 * 初始化datebox的时间限制
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
/*根据查询条件查询*/
function findCapacityGapManagement() {
	debugger
	if ($("#formFindCapacityGapManagement").form('validate')) {
		var first = document.getElementById("findExecuteStartTime").value;  
        var second = document.getElementById("findExecuteEndTime").value; 
        if(first ==""|| first==null || second==null || second==""){
        	 $.messager.alert("提示", "请输入开始时间和结束时间!", "info");
             return false; 
        }
		var data1 = Date.parse(first.replace(/-/g,   "/"));  
	    var data2 = Date.parse(second.replace(/-/g,   "/"));  
	    var datadiff = data2-data1;  
	    var time = 30*24*60*60*1000;  
		if(first.length>0 && second.length>0){  
	          if(datadiff<0||datadiff>time){  
	             $.messager.alert("提示", "开始时间应小于结束时间并且间隔小于31天，请检查!", "info");
	             return false;  
	          }  
		}  

		var datagrid = $('#tblCapacityGapManagement').datagrid('options');
		datagrid.url = rootPath + "/capacityGapManagement/findBycondition.do";
		var queryParams=serializeFormObj("formFindCapacityGapManagement");
		var demandSite=$("#findDemandSite").combogrid('getText');
		queryParams.demandSite=demandSite;
		$('#tblCapacityGapManagement').datagrid('load',queryParams);
		}
}

/*重置查询条件*/
function resetCapacityGapManagement(){
	$('#formFindCapacityGapManagement').form('reset');
}
var url;


