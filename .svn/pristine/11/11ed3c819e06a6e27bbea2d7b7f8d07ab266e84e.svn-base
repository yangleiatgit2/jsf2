var type ="";

$(function() {
	type=$("#hideDemandType").val();
	if(type==DEMAND_TYPE_LONG){//长期需求
		var psOptControl ={
			psColumn:dealPermission(['ltFreight_demand_edit']),
			psButtonEdit:(dealPermission(['ltFreight_demand_edit']) ? 'none' : 'bolck')
		};
	}
	if(type==DEMAND_TYPE_TEMP){//临时需求
		var psOptControl ={
			psColumn:dealPermission(['stFreight_demand_edit']),
			psButtonEdit:(dealPermission(['stFreight_demand_edit']) ? 'none' : 'bolck')
		};	
	}
	/* 加载主界面grid */
	var columns = [ [
			{field : "id",checkbox : "true"},
			{field : 'des',hidden:psOptControl.psColumn,title : '操作',align : 'center',width : 50,formatter:function(value, rec, index){
				return '<a class="icon-line iconfont uce-edit" style="display:'+ psOptControl.psButtonEdit+'" title="编辑" onclick="openUpdateFreightDemand(\''+index+'\')" href="javascript:void(0)"></a>';
	        }},
			{field : 'demandCode',title : '需求编号',align : 'center',width : 120,formatter : function(value,rec,index){
				return '<a class="editcls" onclick="viewOrder(\''+ index+ '\')"  href="javascript:void(0)">'+ value + '</a>';
			}},
			{field : 'demandName',title : '需求名称',align : 'center',width : 100,formatter : formatTip},
			{field : 'demandSite',title : '需求网点',align : 'center',width : 100,formatter : formatTip},
			{field : 'beginStation',title : '出发点',align : 'center',width : 120,formatter : formatTip},
			{field : 'endStation',title : '到达点',align : 'center',width : 120,formatter : formatTip}, 
			{field : 'businessMode',title : '业务模式',align : 'center',width : 50, formatter:function(value){
					return getTypeNameByCode("BUSINESS_MODE", value,formatTip);
				}
			},
			{field : 'departureTime',title : '出发时间',align : 'center',width : 60,formatter : function(value) {return formatData(value,'Time')}	},
			{field : 'arrivalTime',title : '到达时间',align : 'center',width : 60,formatter : function(value) {return formatData(value,'Time')}	},
			{field : 'demandStatus',title : '需求状态',align : 'center',width : 70, formatter:function(value){
					return getTypeNameByCode("DEMAND_STATUS", value,formatTip);
				}
			},
			{field : 'carpoolSites',title : '关联网点',align : 'center',width : 100,formatter : formatTip},
			{field : 'isCarpool',title : '是否拼车',align : 'center',width : 50, formatter:function(value){
					return getTypeNameByCode("IS_CARPOOL", value,formatTip);
				}
			},
			/*{field : 'executeBeginTime',title : '开始执行时间',align : 'center',width : 130,formatter :  function(value) {return formatData(value)}	},*/
			{field : 'price',title : '价格',align : 'center',width : 100,formatter : formatTip},
			{field : 'demandCombineCode',title : '需求组合号',align : 'center',width : 100,formatter : formatTip},
			{field : 'createEmp',title : '创建人',align : 'center',width : 80,formatter : formatTip}, 
			{field : 'createTime',title : '创建时间',align : 'center',width : 130,formatter : function(value) {return formatData(value)}	} ,
			{field : 'updateEmp',title : '修改人',align : 'center',width : 80,formatter : formatTip}, 
			{field : 'updateTime',title : '修改时间',align : 'center',width : 130,formatter : function(value) { return formatData(value)}	}
			] ];

	var dataGridParams = {
		url : rootPath + "/freightDemand/findByPagination.do",
		pageSize : 10,
		toolbar : '#tlbFreightDemand',
		singleSelect : 'false',
		fitColumns : 'false',
		onBeforeLoad : function(param) {
		},
		onLoadSuccess : function(data) {
		},
		onLoadError : function() {
			// 在载入远程数据产生错误的时候触发。
		}
	}
	/* 加载表单数据 */
	newloadGrid('tblFreightDemand', columns, dataGridParams);
	//初始化数据字典
	initDictDatas('DEMAND_STATUS,DEMAND_TYPE,IS_CARPOOL,BUSINESS_MODE');
	/* 数据字典加载 */
	uceDictCombobox('findDemandStatus', 'DEMAND_STATUS');
	uceDictCombobox('demandType', 'DEMAND_TYPE');
	uceDictCombobox('isCarpool', 'IS_CARPOOL',{headerValue:false});
	uceDictCombobox('businessMode', 'BUSINESS_MODE',{headerValue:false});
	uceDictCombobox('findBusinessMode', 'BUSINESS_MODE');
	uceDictCombobox('demandStatus', 'DEMAND_STATUS');
	
	/*时间范围控制 yyyy-MM-DD控制时间的方法*/
	//查询界面空间
	/*dateRange("findExecuteBeginTime", "findExecuteEndTime");*/
	/**控制出发与到达 的时间 的范围限制*/
	timeRange("departureTimeEdit","arrivalTimeEdit");
	
	/* 加载组织下拉表单数据 */
	
	orgCombogrid('findBeginStationCode', {
		orgTypes : ORG_TYPE_OPERATE_CENTER + ',' + ORG_TYPE_SITE
	});
	orgCombogrid('findEndStationCode', {
		orgTypes : ORG_TYPE_OPERATE_CENTER + ',' + ORG_TYPE_SITE
	});
	orgCombogrid('cmbgdBeginStationCode', {
		orgTypes : [ORG_TYPE_OPERATE_CENTER],
		orgStatus : [ORG_ENABLED],
	});
	orgCombogrid('cmbgdEndStationCode', {
		orgTypes : [ORG_TYPE_SITE],
		orgStatus : [ORG_ENABLED],
	});
	$("#businessMode").combobox({onSelect:function(row){
		if(row.typeCode==BUSINESS_MODE_IN){
			orgCombogrid('cmbgdBeginStationCode', {
				orgTypes : [ORG_TYPE_OPERATE_CENTER],
				orgStatus : [ORG_ENABLED],
			});
			orgCombogrid('cmbgdEndStationCode', {
				orgTypes : [ORG_TYPE_SITE],
				orgStatus : [ORG_ENABLED],
			});
		}
		if(row.typeCode==BUSINESS_MODE_OUT){
			orgCombogrid('cmbgdBeginStationCode', {
				orgTypes : [ORG_TYPE_SITE],
				orgStatus : [ORG_ENABLED],
			});
			orgCombogrid('cmbgdEndStationCode', {
				orgTypes : [ORG_TYPE_OPERATE_CENTER],
				orgStatus : [ORG_ENABLED],
			});
		}
	}});
	/*需求网点*/
	orgCombogrid('findDemandSiteCode', {
		orgTypes : ORG_TYPE_SITE,
		orgStatus : ORG_ENABLED
	});
	orgCombogrid('demandSiteCode', {
		orgTypes : ORG_TYPE_SITE,
		orgStatus : ORG_ENABLED
	});
	// 机构组合树（关联网点）
	sucOrgComboTree("carpoolSitesCodes");
	/**
	 * 临时货运需求的开始与结束时间
	 */
	$('#stdemandBeginTime').datebox({
		onSelect: function(date){
			$('#stdemandEndTime').datebox('setValue', $('#stdemandBeginTime').datebox('getValue'));
		}
	});
	
	$('#freightDemand').timespinner({
		formatter:formatterTime
	});
});

/**
 * 时间格式处理
 * @param value
 */
function formatterTime(value){
	return isDate(value)?value:'';
}

/**
 * 限制只能选择下个月同时开始与结束时间限制
 * @param startTime 开始时间控件 id
 * @param endTime 结束时间控件 id
 */
function monthRange(startTime, endTime,type){
	var date = new Date();
	var year = date.getFullYear();
	var month = (date.getMonth() +2) > 9?(date.getMonth()+2):"0"+(date.getMonth()+2);
	var firstDay = new Date(year,month-1,1);//获取下一个月的第一天
	var firstDayStr = year+"-"+month+"-0"+firstDay.getDate();
	var lastDay = new Date(year,month,0);//获取下一个月的最后一天
	var lastDayStr = year+"-"+month+"-"+lastDay.getDate();
	/* 控制开始日期输入大小 */
	$("#" + startTime).datebox().datebox('calendar').calendar({
		validator : function(value) {
			return value <= lastDay&&value>=firstDay;
		}
	});
	/* 控制开始日期输入大小 */
	$("#" + endTime).datebox().datebox('calendar').calendar({
		validator : function(value) {
			return value <= lastDay&&value>=firstDay;
		}
	});
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
							return value >= start&&value <= lastDay&&value>=firstDay;
						}
					});
					$("#" + endTime).datebox('setValue', end);
				}
			}else{
				/* 控制结束日期输入大小 */
				$("#" + endTime).datebox().datebox('calendar').calendar({
					validator : function(value) {
						return value >= start&&value <= lastDay&&value>=firstDay;
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
							return value <= end&&value <= lastDay&&value>=firstDay;
						}
					});
					$("#" + startTime).datebox('setValue', start);
				}
			}else{
				/* 控制开始日期输入大小 */
				$("#" + startTime).datebox().datebox('calendar').calendar({
					validator : function(value) {
						return value <= end&&value <= lastDay&&value>=firstDay;
					}
				});
			}
		}
	});
	/**默认赋值为下一个月的开始与结束*/
	if(type=='add'){
		$("#" + startTime).datebox('setValue', firstDayStr);
		$("#" + endTime).datebox('setValue',lastDayStr);	
	}
}
/**
 * 限制时间的范围
 * @param startTime
 * @param endTime
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
 * 限制时间的范围
 * @param startTime
 * @param endTime
 */
function timeRange(startTime, endTime){
	$("#"+startTime).timespinner({
		required: true,    
	    showSeconds: true,
		onSpinUp: function () {
			if($("#"+startTime).timespinner('getValue')){
				$("#"+endTime).timespinner({min:$("#"+startTime).timespinner('getValue')});
			}
	    },
	    onSpinDown: function () {
			if($("#"+startTime).timespinner('getValue')){
				$("#"+endTime).timespinner({min:$("#"+startTime).timespinner('getValue')});
			}
	    }
		
	});
	$("#"+endTime).timespinner({
		required: true,    
		showSeconds: true,
		onSpinUp: function () {
			if($("#"+endTime).timespinner('getValue')){
				if("00:00:00"==$("#"+endTime).timespinner('getValue')){
					$("#"+startTime).timespinner({max:"23:59:59"});
					return;
				}
				
				$("#"+startTime).timespinner({max:$("#"+endTime).timespinner('getValue')});
			}
		},
		onSpinDown: function () {
			if($("#"+endTime).timespinner('getValue')){
				if("00:00:00"==$("#"+endTime).timespinner('getValue')){
					$("#"+startTime).timespinner({max:"23:59:59"});
					return;
				}
				$("#"+startTime).timespinner({max:$("#"+endTime).timespinner('getValue')});
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
/*根据查询条件查询*/
function findFreightDemand() {
	if ($("#formFindFreightDemand").form('validate')) {
		// 判断时间是否为空
		/*var executeBeginTime = $("#findExecuteBeginTime").datebox("getValue");
		var executeEndTime = $("#findExecuteEndTime").datebox("getValue");
		 if(executeBeginTime != null && executeBeginTime != ''){
			 if(executeEndTime == null || executeEndTime == ''){
				 $.messager.alert("提示", "请选择执行时间的终止日期", "info");
				 return false;
			 }
		 }
		 if(executeEndTime != null && executeEndTime != ''){
			 if(executeBeginTime == null || executeBeginTime == ''){
				 $.messager.alert("提示", "请选择执行时间的开始日期", "info");
				 return false;
			 }
		 }
		 if(executeBeginTime&&executeEndTime){
			 $("#hideExecuteBeginTime").val(executeBeginTime+" 00:00:00");
			 $("#hideExecuteEndTime").val(executeEndTime+" 23:59:59");
		 }*/
		var datagrid = $('#tblFreightDemand').datagrid('options');
		datagrid.url = rootPath + "/freightDemand/findByPagination.do";
		var queryParams=serializeFormObj("formFindFreightDemand");
		queryParams.demandName='demandName';
		$('#tblFreightDemand').datagrid('load',queryParams);
	}
}
/*重置查询条件*/
function resetFormFindFreightDemand(){
	/*cancelDateRange('findExecuteBeginTime','findExecuteEndTime');*/
	$('#formFindFreightDemand').form('reset');
	 $("#hideExecuteBeginTime").val("");
	 $("#hideExecuteEndTime").val("");
}

/*需求类型的onchange事件*/
function demandTypeChange(){
	var selectVal =$('#demandType').combobox('getValue');
	if(selectVal==DEMAND_TYPE_LONG){//长期需求
		$(".createDiv").css("display","none"); 
		$("#weekWeightVolumeDiv").css("display","block"); 
	}
	if(selectVal==DEMAND_TYPE_TEMP){//临时需求
		$("#dayWeightVolumeDiv").css("display","block"); 
		$("#weekWeightVolumeDiv").css("display","none"); 	
	}
}
/*新增*/
function openAddFreightDemand(){
	if(type ==DEMAND_TYPE_LONG){//长期
		$("#dlgFreightDemand").dialog({height:600});
		$("#dlgFreightDemand").window({
			top:($(window).height()) *0.08,  
			left:($(window).width()) * 0.211,
		});
	}else{//临时
		$("#dlgFreightDemand").dialog({height:385});
		$("#dlgFreightDemand").window({
			top:($(window).height()) *0.14,  
			left:($(window).width()) * 0.211,
		});
	}
	openDialog("dlgFreightDemand", '新增');
	tblFreightDemandReadOnly(false);
	//$('#carpoolSitesCodes').combotree('clear');
	siteName = '';
	$(".createDiv").css("display","none"); 
	//$("#createDiv").hide();
	$("#formFreightDemand").form('clear');
	/*默认拼车*/
	$("#isCarpool").combobox("setValue","1");
	/*默认进港*/
	$("#businessMode").combobox("setValue","1");
	/*默认已提报*/
	$("#demandStatus").combobox("setValue","1");
	
	if(type ==DEMAND_TYPE_LONG){//长期
		/*默认长期需求*/
		$("#demandType").combobox("setValue",DEMAND_TYPE_LONG);
		monthRange('ltdemandBeginTime','ltdemandEndTime','add');
	}else{//临时
		/*默认临时需求*/
		$("#demandType").combobox("setValue",DEMAND_TYPE_TEMP);
	}
	url = rootPath + "/freightDemand/addFreightDemand.do";
}
/*更新*/
function openUpdateFreightDemand(index){
		if(index != null || index != ''){
			/* 获取当前选择行 */
			var row = $('#tblFreightDemand').datagrid('getRows')[index];
			//将表单readonly 关闭
			tblFreightDemandReadOnly(false);
			/**已提报 和可报价 的可以编辑*/
			if(row.demandStatus == DEMAND_STATUS_QUOTE_NO||row.demandStatus==DEMAND_STATUS_SUBMIT){
				if(type==1){
					$("#dlgFreightDemand").dialog({height:820});
					$("#dlgFreightDemand").window({
						top:($(window).height()) *0.08,  
						left:($(window).width()) * 0.211,
					});
				}else{
					$("#dlgFreightDemand").dialog({height:510});
					$("#dlgFreightDemand").window({
						top:($(window).height()) *0.14,  
						left:($(window).width()) * 0.211,
					});
				}
				//$("#createDiv").show();
				$(".createDiv").css("display","block"); 
				openDialog("dlgFreightDemand", '修改');
				$("#formFreightDemand").form('clear');
				$('#carpoolSitesCodes').combotree('clear');
				siteName = '';
				//$("#formFreightDemand").form('load', row);
				$("#businessMode").combobox('setValue',row.businessMode);
				$('#cmbgdBeginStationCode').combogrid('grid').datagrid('reload', {
					'q' : row.beginStationCode
				});
				$('#cmbgdEndStationCode').combogrid('grid').datagrid('reload', {
					'q' : row.endStationCode
				});
				$("#id").val(row.id);
				$("#version").val(row.version);
				$("#demandCode").textbox('setValue',row.demandCode);
				$("#demandName").textbox('setValue',row.demandName);
				$("#isCarpool").combobox('setValue',row.isCarpool?'1':'0');
				$("#demandType").combobox('setValue',row.demandType);
				$("#demandSiteCode").combogrid('setValue',row.demandSiteCode);
				$("#demandSiteCode").combogrid('setText',row.demandSite);
				$("#demandStatus").combobox('setValue',row.demandStatus);
				$("#carpoolSitesCodes").combotree('setText',row.carpoolSites);
				$("#departureTimeEdit").timespinner("setValue",formatTimeSecond(row.departureTime));
				$("#arrivalTimeEdit").timespinner("setValue", formatTimeSecond(row.arrivalTime));
				$("#layTime").numberbox('setValue',row.layTime);
				$("#price").numberbox('setValue',row.price);
				$("#cmbgdBeginStationCode").combogrid('setValue',row.beginStationCode);
				$("#cmbgdBeginStationCode").combogrid('setText',row.beginStation);
				$("#cmbgdEndStationCode").combogrid('setValue',row.endStationCode);
				$("#cmbgdEndStationCode").combogrid('setText',row.endStation);
				if(type==DEMAND_TYPE_LONG){
					if(row.demandBeginTime&&row.demandEndTime){
						monthRange('ltdemandBeginTime','ltdemandEndTime','edit');
						$("#ltdemandBeginTime").datebox("setValue",  formatDate(row.demandBeginTime));
						$("#ltdemandEndTime").datebox("setValue", formatDate(row.demandEndTime));
					}else{
						monthRange('ltdemandBeginTime','ltdemandEndTime','add');
					}
					$("#mondayWeight").numberbox('setValue',row.mondayWeight);
					$("#mondayVolume").numberbox('setValue',row.mondayVolume);
					$("#tuesdayWeight").numberbox('setValue',row.tuesdayWeight);
					$("#tuesdayVolume").numberbox('setValue',row.tuesdayVolume);
					$("#wednesdayWeight").numberbox('setValue',row.wednesdayWeight);
					$("#wednesdayVolume").numberbox('setValue',row.wednesdayVolume);
					$("#thursdayWeight").numberbox('setValue',row.thursdayWeight);
					$("#thursdayVolume").numberbox('setValue',row.thursdayVolume);
					$("#fridayWeight").numberbox('setValue',row.fridayWeight);
					$("#fridayVolume").numberbox('setValue',row.fridayVolume);
					$("#saturdayWeight").numberbox('setValue',row.saturdayWeight);
					$("#saturdayVolume").numberbox('setValue',row.saturdayVolume);
					$("#sundayWeight").numberbox('setValue',row.sundayWeight);
					$("#sundayVolume").numberbox('setValue',row.sundayVolume);
				}else{
					$("#stdemandBeginTime").datebox("setValue",  formatDate(row.demandBeginTime));
					$("#stdemandEndTime").datebox("setValue", formatDate(row.demandEndTime));
					$("#dayWeight").numberbox('setValue',row.dayWeight);
					$("#dayVolume").numberbox('setValue',row.dayVolume);
				}
				$("#demandCombineCode").textbox('setValue',row.demandCombineCode);
				$("#lineGroupCode").textbox('setValue',row.lineGroupCode);
				$("#executeBeginTime").datetimebox("setValue",formatTime(row.executeBeginTime));
				$("#executeEndTime").datetimebox("setValue", formatTime(row.executeEndTime));
				$("#actualDepartureTimeEdit").timespinner("setValue",formatTimeSecond(row.actualDepartureTime));
				$("#actualArrivalTimeEdit").timespinner("setValue", formatTimeSecond(row.actualArrivalTime));
				$("#adjustPrice").numberbox('setValue',row.adjustPrice);
				$("#createEmp").textbox('setValue',row.createEmp);
				$("#createTime").datetimebox('setValue', formatTime(row.createTime));	
				url = rootPath + "/freightDemand/updateFreightDemand.do";
			}else{
				$.messager.alert("提示", "选中的单据为"+getTypeNameByCode("DEMAND_STATUS", row.demandStatus)+", 不可编辑,请选择一条 "
						+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_SUBMIT)+"或"+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_QUOTE_NO)+" 的单据进行操作！", "info");
			}
		}
}
/*保存*/
function saveFreightDemand(){
	$("#hidBeginStationName").val($("#cmbgdBeginStationCode").combogrid('getText'));
	$("#hidEndStationName").val($("#cmbgdEndStationCode").combogrid('getText'));
	$("#hidDemandSite").val($("#demandSiteCode").combogrid('getText'));
	$("#carpoolSites").val($("#carpoolSitesCodes").combogrid('getText'));
	if($("#carpoolSitesCodes").combogrid("getText")&&$("#carpoolSitesCodes").combogrid("getText").split(",").length>5){
		showErrorMsg("所选网点数量不得超过5个");
		return;
	}
	if($("#departureTimeEdit").timespinner('getValue'))
	$("#departureTime").val("1970-01-01 "+$("#departureTimeEdit").timespinner('getValue'));
	if($("#arrivalTimeEdit").timespinner('getValue'))
	$("#arrivalTime").val("1970-01-01 "+$("#arrivalTimeEdit").timespinner('getValue'));
	if($("#actualDepartureTimeEdit").timespinner('getValue'))
	$("#actualDepartureTime").val("1970-01-01 "+$("#actualDepartureTimeEdit").timespinner('getValue'));
	if($("#actualArrivalTimeEdit").timespinner('getValue'))
	$("#actualArrivalTime").val("1970-01-01 "+$("#actualArrivalTimeEdit").timespinner('getValue'));
	$('#formFreightDemand').form('submit',{
		   url: url,
		   onSubmit: function(){
		       if($(this).form('validate')) {
		    	   uceLoading.show("请稍后...");
		    	   return true;
		       }
		       return false;
		   },
		   success: function(data){
			   uceLoading.close();
			   if (isEmptyObject(data)) {
				   showErrorMsg('服务器端异常');
				   return;
			   }
			   var result = data;
			   if (typeof data == 'string') {
					result = eval('('+ data +')');
			   }
			   if (result.success) {
				   closeFreightDemand();
				   $('#tblFreightDemand').datagrid('reload');   
				   showTips(result.message,'success');
					if ($(this).form('options').task) {
						$(this).form('options').task.call(this, result);
					}
				} else {
					showError(result);
				}
			},
			error: function(data,statusText,xhr){
	    	   uceLoading.close();
			}
	   });
}

/**
 *关闭弹出窗
 */
function closeFreightDemand(){
	if($("#demandType").combobox("getValue")==DEMAND_TYPE_LONG){
		cancelDateRange('ltdemandBeginTime','ltdemandEndTime');
	}
	closeDialog('dlgFreightDemand');
}

/**
 * 可报价 的需求可以 发送网点审核
 * 发送网点审核
 */
function siteCheckFreightDemand(){
	var rows = $('#tblFreightDemand').datagrid('getSelections');
	if (rows.length >0) {
		var msg="";
		rows.map(function(model){
			if(model.demandStatus==DEMAND_STATUS_SUBMIT ){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_SUBMIT)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_SUBMIT)+'、';
				}
			}else if(model.demandStatus==DEMAND_STATUS_QUOTE_YES ){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_QUOTE_YES)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_QUOTE_YES)+'、';
				}
			}else if(model.demandStatus==DEMAND_STATUS_SITE_COMFIRM){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_SITE_COMFIRM)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_SITE_COMFIRM)+'、';
				}
			}else if(model.demandStatus==DEMAND_STATUS_SITE_CANCEL){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_SITE_CANCEL)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_SITE_CANCEL)+'、';
				}
			}else if(model.demandStatus==DEMAND_STATUS_CHECKED ){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_CHECKED)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_CHECKED)+'、';
				}
			}else if(model.demandStatus==DEMAND_STATUS_LOCKED ){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_LOCKED)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_LOCKED)+'、';
				}
			}else if(model.demandStatus==DEMAND_STATUS_END ){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_END)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_END)+'、';
				}
			}
		});//选中的数据中 含有
		if(msg!=""){
			$.messager.alert("提示", "选中的单据中 含有 "+msg.substring(0,msg.length-1)+" 的需求单据, 请选择"+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_QUOTE_NO)+"的需求单据进行发送操作！", "info");
		}else{
			msg="是否发送选中的单据到网点审核报价! ";
			confirmMsg(msg, function() {
				$.ajax({
					url: rootPath + '/freightDemand/sendQuotation.do?',
					data : {
						'data' :JSON.stringify(rows),
						'demandStatus':DEMAND_STATUS_QUOTE_YES
					},
					task : function(data, statusText, xhr){
						reloadDatagrid('tblFreightDemand');
					}
				});
			});
		}
	}else{
		$.messager.alert("提示", "请选中数据进行操作！", "info");
	}
}


/**
 *网点已确认的报价 可以核准
 * 核准报价 按钮点击弹出框
 */
function approveFreightDemand(){
	var rows = $('#tblFreightDemand').datagrid('getSelections');
	if (rows.length >0) {
		var msg="";
		var data=[];
		rows.map(function(model){
			if(model.demandStatus==DEMAND_STATUS_SUBMIT ){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_SUBMIT)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_SUBMIT)+'、';
				}
			}else if(model.demandStatus==DEMAND_STATUS_QUOTE_NO){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_QUOTE_NO)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_QUOTE_NO)+'、';
				}
			}else if(model.demandStatus==DEMAND_STATUS_QUOTE_YES){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_QUOTE_YES)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_QUOTE_YES)+'、';
				}
			}else if(model.demandStatus==DEMAND_STATUS_SITE_CANCEL){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_SITE_CANCEL)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_SITE_CANCEL)+'、';
				}
			}else if(model.demandStatus==DEMAND_STATUS_CHECKED ){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_CHECKED)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_CHECKED)+'、';
				}
			}else if(model.demandStatus==DEMAND_STATUS_LOCKED ){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_LOCKED)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_LOCKED)+'、';
				}
			}else if(model.demandStatus==DEMAND_STATUS_END ){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_END)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_END)+'、';
				}
			}else{
				var r ={};
				r.id = model.id;
				r.demandStatus=DEMAND_STATUS_CHECKED;
				r.version=model.version;
				data.push(r);
			}
		});//选中的数据中 含有
		if(msg!=""){
			$.messager.alert("提示", "选中的单据中 有 "+msg.substring(0,msg.length-1)+" 的需求单据, 请选择"+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_SITE_COMFIRM)+"的需求单据进行核准操作！", "info");
		}else{
			msg="是否核准选中的单据! ";
			updateStatus(msg,data);
		}
	}else{
		$.messager.alert("提示", "请选中数据进行操作！", "info");
	}
}
/**
 * 已核准的需求 才可以锁定
 * 锁定需求 按钮点击弹出框
 */
function lockFreightDemand(){
	var rows = $('#tblFreightDemand').datagrid('getSelections');
	if (rows.length >0) {
		var msg="";
		rows.map(function(model){
			if(model.demandStatus==DEMAND_STATUS_SUBMIT ){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_SUBMIT)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_SUBMIT)+'、';
				}
			}else if(model.demandStatus==DEMAND_STATUS_QUOTE_NO ){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_QUOTE_NO)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_QUOTE_NO)+'、';
				}
			}else if(model.demandStatus==DEMAND_STATUS_QUOTE_YES ){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_QUOTE_YES)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_QUOTE_YES)+'、';
				}
			}else if(model.demandStatus==DEMAND_STATUS_SITE_COMFIRM){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_SITE_COMFIRM)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_SITE_COMFIRM)+'、';
				}
			}else if(model.demandStatus==DEMAND_STATUS_SITE_CANCEL){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_SITE_CANCEL)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_SITE_CANCEL)+'、';
				}
			}else if(model.demandStatus==DEMAND_STATUS_LOCKED){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_LOCKED)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_LOCKED)+'、';
				}
			}else if(model.demandStatus==DEMAND_STATUS_END ){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_END)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_END)+'、';
				}
			}
		});//选中的数据中 含有
		if(msg!=""){
			$.messager.alert("提示", "选中的单据中 含有 "+msg.substring(0,msg.length-1)+" 的需求单据, 请选择"+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_CHECKED)+"的需求单据进行锁定操作！", "info");
		}else{
			msg="是否锁定选中的单据! ";
			updateStatus(msg,rows,DEMAND_STATUS_LOCKED);
		}
		
	}else{
		$.messager.alert("提示", "请选中数据进行操作！", "info");
	}
}
/**
*更新状态
*/
function updateStatus(msg,data,demandStatus){
	confirmMsg(msg, function() {
		$.ajax({
			url: rootPath + '/freightDemand/updateStatus.do?',
			data : {
				'data' :JSON.stringify(data),
				'demandStatus':demandStatus
			},
			task : function(data, statusText, xhr){
				reloadDatagrid('tblFreightDemand');
			}
		});
	});
}
/**
 * 终止需求   已核准 已锁定 已终止的不能终止
 */
function endDemand(){
	var rows = $('#tblFreightDemand').datagrid('getSelections');
	if (rows.length >0) {
		var msg="";
		rows.map(function(model){
			if(model.demandStatus==DEMAND_STATUS_CHECKED ){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_CHECKED)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_CHECKED)+'、';
				}
			}else if(model.demandStatus==DEMAND_STATUS_LOCKED){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_LOCKED)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_LOCKED)+'、';
				}
			}else if(model.demandStatus==DEMAND_STATUS_END ){
				if(msg.indexOf(getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_END)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_END)+'、';
				}
			}
		});//选中的数据中 含有
		if(msg!=""){
			$.messager.alert("提示", "选中的单据中 含有 "+msg.substring(0,msg.length-1)+" 的需求单据, 请选择"
					+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_SUBMIT)+" 或 "
					+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_QUOTE_NO)+" 或 "
					+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_QUOTE_YES)+" 或 "
					+getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_SITE_COMFIRM)
					+"的需求单据进行终止操作！", "info");
		}else{
			msg="是否终止选中的单据! ";
			updateStatus(msg,rows,DEMAND_STATUS_END);
		}
	}else{
		$.messager.alert("提示", "请选中数据进行操作！", "info");
	}
}

/**
 * 点击需求编号 展开数据详情页面
 */
function viewOrder(index){
	if(index != null || index != ''){
		var row=$("#tblFreightDemand").datagrid('getRows')[index];
		if(type==1){
			$("#dlgFreightDemand").dialog({height:820});
			$("#dlgFreightDemand").window({
				top:($(window).height()) *0.08,  
				left:($(window).width()) * 0.211,
			});
		}else{
			$("#dlgFreightDemand").dialog({height:510});
			$("#dlgFreightDemand").window({
				top:($(window).height()) *0.14,  
				left:($(window).width()) * 0.211,
			});
		}
		$("#formFreightDemand").form('clear');
		tblFreightDemandReadOnly(true);
		loadForm(row);
		openDialog("dlgFreightDemand","查看");
	}
}


/**
 * 将弹出框内的 表单设置为 readOnly true/false
 * @param flag
 */
function tblFreightDemandReadOnly(flag){
	if(flag){
		$('#btnSaveFreightDemand').hide();
	}else{
		$('#btnSaveFreightDemand').show();
	}
	if(type==1){
		//长期需求
		$("#isCarpool").textbox({readonly:flag});
		$("#demandSiteCode").textbox({readonly:flag});
		$("#demandSiteCode").textbox({readonly:flag});
		$("#cmbgdBeginStationCode").textbox({readonly:flag});
		$("#cmbgdEndStationCode").textbox({readonly:flag});
		$("#carpoolSitesCodes").textbox({readonly:flag});
		$("#carpoolSitesCodes").textbox({readonly:flag});
		$("#departureTimeEdit").timespinner({readonly:flag});
		$("#arrivalTimeEdit").timespinner({readonly:flag});
		$("#layTime").textbox({readonly:flag});
		$("#price").textbox({readonly:flag});
		$("#ltdemandBeginTime").datebox({readonly:flag});
		$("#ltdemandEndTime").datebox({readonly:flag});
		$("#businessMode").textbox({readonly:flag});
		
		$("#mondayWeight").numberbox({readonly:flag});
		$("#mondayVolume").numberbox({readonly:flag});
		$("#tuesdayWeight").numberbox({readonly:flag});
		$("#tuesdayVolume").numberbox({readonly:flag});
		$("#wednesdayWeight").numberbox({readonly:flag});
		$("#wednesdayVolume").numberbox({readonly:flag});
		$("#thursdayWeight").numberbox({readonly:flag});
		$("#thursdayVolume").numberbox({readonly:flag});
		$("#fridayWeight").numberbox({readonly:flag});
		$("#fridayVolume").numberbox({readonly:flag});
		$("#saturdayWeight").numberbox({readonly:flag});
		$("#saturdayVolume").numberbox({readonly:flag});
		$("#sundayWeight").numberbox({readonly:flag});
		$("#sundayVolume").numberbox({readonly:flag});
	}else{
		//默认临时需求
		$("#isCarpool").textbox({readonly:flag});
		$("#demandSiteCode").textbox({readonly:flag});
		$("#cmbgdBeginStationCode").textbox({readonly:flag});
		$("#cmbgdEndStationCode").textbox({readonly:flag});
		$("#carpoolSitesCodes").textbox({readonly:flag});
		$("#departureTimeEdit").timespinner({readonly:flag});
		$("#arrivalTimeEdit").timespinner({readonly:flag});
		$("#layTime").textbox({readonly:flag});
		$("#price").textbox({readonly:flag});
		$("#stdemandBeginTime").textbox({readonly:flag});
		$("#stdemandEndTime").textbox({readonly:flag});
		$("#businessMode").textbox({readonly:flag});
		$("#dayWeight").textbox({readonly:flag});
		$("#dayVolume").textbox({readonly:flag});	
		$("#adjustPrice").textbox({readonly:flag});
	
	}
	
}

/**
 * 根据传入参数加载表单form
 * @param row
 */
function loadForm(row){
	$("#formFreightDemand").form('clear');
	$('#carpoolSitesCodes').combotree('clear');
	//长期临时共同字段
	$("#id").val(row.id);
	$("#version").val(row.version);
	$("#businessMode").combobox('setValue',row.businessMode);
	$("#demandCode").textbox('setValue',row.demandCode);
	$("#demandName").textbox('setValue',row.demandName);
	$("#isCarpool").combobox('setValue',row.isCarpool?'1':'0');
	$("#demandType").combobox('setValue',row.demandType);
	$("#demandSiteCode").combogrid('setValue',row.demandSiteCode);
	$("#demandSiteCode").combogrid('setText',row.demandSite);
	$("#demandStatus").combobox('setValue',row.demandStatus);
	$("#carpoolSitesCodes").combotree('setText',row.carpoolSites);
	if(row.departureTime)$("#departureTimeEdit").timespinner("setValue",formatTimeSecond(row.departureTime));
	if(row.arrivalTime)$("#arrivalTimeEdit").timespinner("setValue", formatTimeSecond(row.arrivalTime));
	$("#layTime").numberbox('setValue',row.layTime);
	$("#price").numberbox('setValue',row.price);
	$("#cmbgdBeginStationCode").combogrid('setValue',row.beginStationCode);
	$("#cmbgdBeginStationCode").combogrid('setText',row.beginStation);
	$("#cmbgdEndStationCode").combogrid('setValue',row.endStationCode);
	$("#cmbgdEndStationCode").combogrid('setText',row.endStation);
	$("#demandCombineCode").textbox('setValue',row.demandCombineCode);
	$("#lineGroupCode").textbox('setValue',row.lineGroupCode);
	if(row.executeBeginTime)$("#executeBeginTime").datetimebox("setValue",formatTime(row.executeBeginTime));
	if(row.executeEndTime)$("#executeEndTime").datetimebox("setValue", formatTime(row.executeEndTime));
	if(row.actualDepartureTime)$("#actualDepartureTimeEdit").timespinner("setValue",formatTimeSecond(row.actualDepartureTime));
	if(row.actualArrivalTime)$("#actualArrivalTimeEdit").timespinner("setValue", formatTimeSecond(row.actualArrivalTime));
	$("#adjustPrice").numberbox('setValue',row.adjustPrice);
	$("#createEmp").textbox('setValue',row.createEmp);
	if(row.createTime)$("#createTime").datetimebox('setValue', formatTime(row.createTime));	
	//长期临时差别字段
	if(type==DEMAND_TYPE_LONG){
		if(row.demandBeginTime&&row.demandEndTime){
			monthRange('ltdemandBeginTime','ltdemandEndTime','edit');
			$("#ltdemandBeginTime").datebox("setValue",  formatDate(row.demandBeginTime));
			$("#ltdemandEndTime").datebox("setValue", formatDate(row.demandEndTime));
		}else{
			monthRange('ltdemandBeginTime','ltdemandEndTime','add');
		}
		$("#mondayWeight").numberbox('setValue',row.mondayWeight);
		$("#mondayVolume").numberbox('setValue',row.mondayVolume);
		$("#tuesdayWeight").numberbox('setValue',row.tuesdayWeight);
		$("#tuesdayVolume").numberbox('setValue',row.tuesdayVolume);
		$("#wednesdayWeight").numberbox('setValue',row.wednesdayWeight);
		$("#wednesdayVolume").numberbox('setValue',row.wednesdayVolume);
		$("#thursdayWeight").numberbox('setValue',row.thursdayWeight);
		$("#thursdayVolume").numberbox('setValue',row.thursdayVolume);
		$("#fridayWeight").numberbox('setValue',row.fridayWeight);
		$("#fridayVolume").numberbox('setValue',row.fridayVolume);
		$("#saturdayWeight").numberbox('setValue',row.saturdayWeight);
		$("#saturdayVolume").numberbox('setValue',row.saturdayVolume);
		$("#sundayWeight").numberbox('setValue',row.sundayWeight);
		$("#sundayVolume").numberbox('setValue',row.sundayVolume);
	}else{
		if(row.demandBeginTime)$("#stdemandBeginTime").datebox("setValue",  formatDate(row.demandBeginTime));
		if(row.demandEndTime)$("#stdemandEndTime").datebox("setValue", formatDate(row.demandEndTime));
		$("#dayWeight").numberbox('setValue',row.dayWeight);
		$("#dayVolume").numberbox('setValue',row.dayVolume);
	}
}
