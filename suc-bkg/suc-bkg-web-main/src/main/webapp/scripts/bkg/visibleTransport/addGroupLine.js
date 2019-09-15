$(function() {
	//查询界面空间
	var carType='';
	dateRange("findCreateTime", "findUpdateTime");
	/* 加载明细界面grid */
	var detailcolumns = [ [
	       	{field : "id",checkbox : "true"},
			{field : 'wayPointName',title : '途经站点',align : 'center',width : 100},
			{field : 'wayPointZoneName',title : '站点所属区域',align : 'center',width : 120},
			{field : 'volume',title : '货物方数',align : 'center',width : 120},
			{field : 'weight',title : '货物重量',align : 'center',width : 100},
			{field : 'endTime',title : '计划到达时间',align : 'center',width : 80,formatter:function(value) {return formatData(value)}},
			{field : 'loadUnloadTime',title : '装卸货耗时',align : 'center',width : 80},
			{field : 'distance',title : '运行里程',align : 'center',width : 100},
			{field : 'runingTime',title : '运行耗时',align : 'center',width : 100},
			{field : 'nextWayDistance',title : '距离下一站点里程',align : 'center',width : 100}
			
			] ];

	var detaildataGridParams = {
		url : '',
		pageSize : 10,
		toolbar : '#tlbDetial',
		singleSelect : 'true',
  		fitColumns : 'false',
  		rownumbers:'true',
		onBeforeLoad : function(param) {
		},
		onLoadSuccess : function(data) {
		},
		onLoadError : function() {
			// 在载入远程数据产生错误的时候触发。
		}
	}
	
	/* 加载表单数据 */
	newloadGrid('tblFreightOrderCombineDetail', detailcolumns, detaildataGridParams);
	var lineGroupDetailParams = {
			url : '',
			pageSize : 10,
			toolbar : '#tlbDemand',
			singleSelect : 'true',
	  		fitColumns : 'false',
	  		rownumbers:'true',
			onBeforeLoad : function(param) {
			},
			onLoadSuccess : function(data) {
			},
			onLoadError : function() {
				// 在载入远程数据产生错误的时候触发。
			}
		}
	newloadGrid('tblDemand', detailcolumns, lineGroupDetailParams);
	//初始化数据字典
	initDictDatas('EXCEPTION_STATUS,EXCEPTION_TYPE,APP_STAGE');

	/* 数据字典加载 */
	uceDictCombobox('findExceptionStatus', 'EXCEPTION_STATUS');
	uceDictCombobox('formExceptionStatus', 'EXCEPTION_STATUS');
	uceDictCombobox('excepType', 'EXCEPTION_TYPE');
	uceDictCombobox('formAppSrage', 'APP_STAGE');
	
	orgCombogrid('excepSitesCode', {
		orgTypes : ORG_TYPE_SITE,
		orgStatus : ORG_ENABLED
	});
	
	/* 加载明细界面grid(终止班次) */
	var detailcolumnsStop = [ [
	       	{field : "id",checkbox : "true"},
			{field : 'wayPointName',title : '途经站点',align : 'center',width : 100},
			{field : 'wayPointZoneName',title : '站点所属区域',align : 'center',width : 120},
			{field : 'volume',title : '货物方数',align : 'center',width : 120},
			{field : 'weight',title : '货物重量',align : 'center',width : 100},
			{field : 'endTime',title : '计划到达时间',align : 'center',width : 80,formatter:function(value) {return formatData(value)}},
			{field : 'loadUnloadTime',title : '装卸货耗时',align : 'center',width : 80},
			{field : 'distance',title : '运行里程',align : 'center',width : 100},
			{field : 'runingTime',title : '运行耗时',align : 'center',width : 100},
			{field : 'nextWayDistance',title : '距离下一站点里程',align : 'center',width : 100}
			
			] ];

	var detaildataGridParamsStop = {
		url : '',
		pageSize : 10,
		toolbar : '#tlbDetialStop',
		singleSelect : 'true',
  		fitColumns : 'false',
  		rownumbers:'true',
		onBeforeLoad : function(param) {
		},
		onLoadSuccess : function(data) {
		},
		onLoadError : function() {
			// 在载入远程数据产生错误的时候触发。
		}
	}
	
	/* 加载表单数据 */
	newloadGrid('tblFreightOrderCombineDetailStop', detailcolumnsStop, detaildataGridParamsStop);
});

//新增需求
var pdType="";
var dirverName ;
var plateNumber ;
function newAddPlanOrDemand(type){
	pdType=type;
	//初始化数据字典
	initDictDatas('DEMAND_TYPE,TYPE_OF_ADJUSTMENT,SHIFT_SOURCES,CAR_MODEL,SHFIT_TYPE,BUSINESS_MODE');

	/* 数据字典加载 */
	uceDictCombobox('requiType', 'DEMAND_TYPE');
	uceDictCombobox('adjustType', 'TYPE_OF_ADJUSTMENT');
	uceDictCombobox('resource', 'SHIFT_SOURCES');
	uceDictCombobox('carType', 'CAR_MODEL');
	uceDictCombobox('lineGroupType', 'SHFIT_TYPE');
	uceDictCombobox('businessMode', 'BUSINESS_MODE');
	
	var drivingPlanCode=$("#drivingPlanCodeLi").text();
	var classCode=$("#classCodeLi").text();
	if((drivingPlanCode==null&&classCode==null)||(drivingPlanCode==""&&classCode=="")){
		$.messager.alert("提示", "请选择一个发车计划号", "info");
		return false;
	}
	$("#formLineClass").form('clear');
	if(type=='startPlan'){
		openDialog("dlgFreightOrderCombine", '新增发车计划');
		$.ajax({
			type:"GET", 
			url : rootPath + '/visibleTransport/getLineGroup.do',
			data :{"classCode":classCode},
			dataType:"json",    
			contentType:"application/json",          
			task : function(data, statusText, xhr) {
			},
		    success : function(data) {            
				if(data.lineGroup){
				$("#formLineClass").form('load', data);	
				$("#lineGroupCode").textbox('setValue',data.lineGroup.lineGroupCode);
				$("#lineGroupName").textbox('setValue',data.lineGroup.lineGroupName);
				$("#status").textbox('setValue',data.lineGroup.status);
				initFormTime(data.lineGroup);
				//$("#departTime").textbox('setValue',(new Date(data.lineGroup.departTime)).toLocaleString1());
				//$("#arrivalTime").textbox('setValue',(new Date(data.lineGroup.arrivalTime)).toLocaleString1());
				$("#lineGroupDistance").textbox('setValue',data.lineGroup.lineGroupDistance);
				$("#startOrgName").textbox('setValue',data.lineGroup.startOrgName);
				$("#endOrgName").textbox('setValue',data.lineGroup.endOrgName);
				$("#requiType").combobox('setValue',data.lineGroup.requiType);//下拉框
				
				$("#costPrice").textbox('setValue',data.lineGroup.costPrice);
				$("#sellingPrice").textbox('setValue',data.lineGroup.sellingPrice);
				$("#totalTime").textbox('setValue',data.lineGroup.totalTime);
				$("#totalVolume").textbox('setValue',data.lineGroup.totalVolume);
				$("#totalWeight").textbox('setValue',data.lineGroup.totalWeight);
				$("#chargeStarttime").textbox('setValue',data.lineGroup.chargeStarttime);
				$("#chargeEndTime").textbox('setValue',data.lineGroup.chargeEndTime);
				$("#adjustPrice").textbox('setValue',data.lineGroup.adjustPrice);
				
				$("#requiCombinCode").textbox('setValue',data.lineGroup.requiCombinCode);
				$("#orderCombinCode").textbox('setValue',data.lineGroup.orderCombinCode);
				$("#drivingPlanCombinCode").textbox('setValue',data.lineGroup.drivingPlanCombinCode);
				$("#resource").combobox('setValue',data.lineGroup.resource);
				$("#carType").combobox('setValue',data.lineGroup.carType);
				$("#loadFactor").textbox('setValue',data.lineGroup.loadFactor);
				$("#adjustType").combobox('setValue',data.lineGroup.adjustType);
				$("#businessMode").combobox('setValue',data.lineGroup.businessMode);
				$("#lineGroupType").combobox('setValue',data.lineGroup.lineGroupType);
				}
				var datagrid = $('#tblFreightOrderCombineDetail').datagrid('options');
				datagrid.url = rootPath + "/visibleTransport/findLineGroupDetailByExceptionId.do";
				$('#tblFreightOrderCombineDetail').datagrid('load', {
					classCode : classCode
				});
	       },        
	       error: function(XMLHttpRequest, textStatus, errorThrown) {            
	           //TODO  
	       }  
		});
	}else if(type=='demand'){
		openDialog("dlgFreightOrderCombine", '新增需求');
	}
	url = rootPath + "/exceptionManager/newLineGroup.do";
}

function openAddDemand(lineGroupCode){
	debugger
	openDialog("dlgDemand", "添加路段信息");
	$("#fdDemandCombineType").val(lineGroupCode);
	/*查询条件 需求创建时间 范围控制*/
	dateRange('fdCreateBeginTime','fdCreateEndTime')
	/*查询操作*/
	var opts=$('#tblDemand').datagrid('options');
	opts.url = rootPath + "/workScheduleRule/findWorkDetailByPage.do?lineGroupCode="+lineGroupCode;
	$('#tblDemand').datagrid('load',serializeFormObj("formFindDemand"));
}
function findDemand(lineGroupCode){
	/*查询操作*/
	var opts=$('#tblDemand').datagrid('options');
	opts.url = rootPath + "/visibleTransport/findWorkDetailByPage.do?lineGroupCode="+lineGroupCode;
	$('#tblDemand').datagrid('load',serializeFormObj("formFindDemand"));
}

/**
 * 删除linegroudetail
 */
function deleteDemand(){
	var rows=$("#tblFreightOrderCombineDetail").datagrid('getSelections');
	if (rows.length > 0 && rows[0]) {
		 for(var i = 0; i < rows.length; i++){
			var index = $('#tblFreightOrderCombineDetail').datagrid('getRowIndex', rows[i]);
			$('#tblFreightOrderCombineDetail').datagrid('deleteRow', index);
		}
	}else {
		$.messager.alert("提示", "请选中一条单据进行操作！", "info");
	}
}
//下一步
function departurePlan(){
	 var carType=$('#carType').combobox('getValue');
//	 if(carType==null||carType==''){
//		 showErrorMsg("请为该车次选择车型!");
//		 return false; 
//	 }
	 var remark=$("#remark").val();
	 if(remark==null||remark==''){
		 showErrorMsg("请为该车次填写备注!");
		 return false; 
	 }
	 var departTime=$("#departTime").datetimebox("getValue");
	 var arrivalTime=$("#arrivalTime").datetimebox("getValue");
	 if(departTime>arrivalTime)
		 return showErrorMsg("发车时间不能早于到达时间");
	var rows = $("#tblFreightOrderCombineDetail").datagrid("getRows");//获取当前所有的行
	
	if(rows.length==0){
		 showErrorMsg("请为该车次添加线路信息!");
		 return false; 
	}
	if ($("#formLineClass").form('validate')) {
		openDialog("departurePlan", '生成发车计划');	
		driverCombogrid("driverPhoneDemand",{})
		carCombogrid("plateNumberDemand",{'carType':carType})
	}else{
		 showErrorMsg("请输入班次必填项!");
	}
}
/**
 * 将需求添加到需求组合
 */
function addDemand(){
	var rows=$("#tblDemand").datagrid('getSelections');
	if(rows.length>0&& rows[0]){
		 for(var i = 0; i < rows.length; i++){
			$('#tblFreightOrderCombineDetail').datagrid('appendRow',rows[i]);//这里循环添加在另一个datagrid选择的行                        }
		}
		closeDialog('dlgDemand');
	}else {
		$.messager.alert("提示", "请选中一条单据进行操作！", "info");
	}
}
function savedeparTurePlan(){
	 var drivingPlanCode=$("#drivingPlanCodeLi").text();
	 dirverName =$("#driverPhoneDemand").val();
	 plateNumber= $('#plateNumberDemand').combobox('getValue');
	 if(dirverName ==null || dirverName =='' || plateNumber==null ||plateNumber==''){
		 showErrorMsg("请输入司机和车牌!");
		 return false;
	 }
	 var drivePlan = new Object();
	 drivePlan.dirverName=$('#driverPhoneDemand').combobox('getText');
	 drivePlan.drivingPlanCode=drivingPlanCode;
	 drivePlan.plateNumber=plateNumber;
	 drivePlan.driverPhone=dirverName;
	 //var lineGroupDetails;
       
	 var rows = $("#tblFreightOrderCombineDetail").datagrid("getRows"); //这段代码是获取当前页的所有行。
	 $('#departurePlan').window('close');
	 // 保存班次，路段，发车信息
	 var lineGroup=serializeFormObj("formLineClass");
	 $.ajax({
		url : rootPath + '/visibleTransport/saveLineGroupAndDrivePlan.do',
		data :{"lineGroupStr":JSON.stringify(lineGroup),"drivePlanStr":JSON.stringify(drivePlan),"detailVos":JSON.stringify(rows)},
		task : function(data, statusText, xhr) {
			if(pdType=="demand"){
				$('#btnExceptionReport').linkbutton('enable');//上报异常
	 			$('#btnExceptionConfirm').linkbutton('enable');//确认异常不可用
	 			$('#btnExceptionBack').linkbutton('enable');//异常打回
	 			$('#btnOpenExceptionSummary').linkbutton('enable');//异常小结
	 			$('#btnAddNeed').linkbutton('enable');//新增需求
	 			$('#btnStopDrivePlan').linkbutton('enable');//终止发车计划
	 			$('#btnStopLineGroup').linkbutton('disable');//终止班次
	 			$('#btnRetiesDrivePlan').linkbutton('disable');//重绑发车计划
	 			$('#btnNewLineGroup').linkbutton('disable');//新增发车计划
			}else if(pdType=="startPlan"){
	 			$('#btnStopLineGroup').linkbutton('disable');//终止班次
	 			$('#btnRetiesDrivePlan').linkbutton('disable');//重绑发车计划
	 			$('#btnNewLineGroup').linkbutton('enable');//新增发车计划
			}
		}
	});
	 $('#dlgFreightOrderCombine').window('close'); 
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
function initFormTime(obj){
	  $('#departTime').datetimebox({
		    stopFirstChangeEvent: true,
		    onChange: function() {
		        var options = $(this).datetimebox('options');
		        if(options.stopFirstChangeEvent) {
		            options.stopFirstChangeEvent = false;
		            return;
		        }
		        //以下写onchange的逻辑
		        timeChange('departTime');
		    }
		});
	  $('#arrivalTime').datetimebox({
		    stopFirstChangeEvent: true,
		    onChange: function() {
		        var options = $(this).datetimebox('options');
		        if(options.stopFirstChangeEvent) {
		            options.stopFirstChangeEvent = false;
		            return;
		        }
		        //以下写onchange的逻辑
		        timeChange('arrivalTime');
		    }
		});
		$("#departTime").datetimebox('setValue',dateTimeFormat(obj.departTime));
		$("#arrivalTime").datetimebox('setValue',dateTimeFormat(obj.arrivalTime));
}
function timeChange(flag){
	var departTime=$("#departTime").val();
	var arrivalTime=$("#arrivalTime").val();
	if(departTime && arrivalTime && arrivalTime>departTime){
		//截取字符串，得到日期部分"2009-12-02",用split把字符串分隔成数组
		var begin1=departTime.substr(0,10).split("-");
		var end1=arrivalTime.substr(0,10).split("-");
		//将拆分的数组重新组合，并实例成化新的日期对象
		var date1=new Date(begin1[1] + - + begin1[2] + - + begin1[0]);
		var date2=new Date(end1[1] + - + end1[2] + - + end1[0]);
		var m=parseInt(Math.abs(date2-date1)/1000/60);
		var min1=parseInt(departTime.substr(11,2))*60+parseInt(departTime.substr(14,2));
		var min2=parseInt(arrivalTime.substr(11,2))*60+parseInt(arrivalTime.substr(14,2));
		//两个分钟数相减得到时间部分的差值，以分钟为单位
		var n=min2-min1;
		//将日期和时间两个部分计算出来的差值相加，即得到两个时间相减后的分钟数
		var minutes=m+n;
		$('#totalTime').textbox('setValue',minutes);
	}
}
function dateTimeFormat(value) {
	if (value == null) {
		return '';
	}
	var val = new Date(value);
	var year = parseInt(val.getYear()) + 1900;
	var month = parseInt(val.getMonth()) + 1;
	month = month > 9 ? month : ('0' + month);
	var date = parseInt(val.getDate());
	date = date > 9 ? date : ('0' + date);
	var hours = parseInt(val.getHours());
	hours = hours > 9 ? hours : ('0' + hours);
	var minutes = parseInt(val.getMinutes());
	minutes = minutes > 9 ? minutes : ('0' + minutes);
	var seconds = parseInt(val.getSeconds());
	seconds = seconds > 9 ? seconds : ('0' + seconds);
	var time = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
	return time;
}