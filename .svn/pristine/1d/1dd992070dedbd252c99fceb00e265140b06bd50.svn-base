

$(function() {
	//查询界面空间
	timeLimit("chargingBeginTime", "chargingEndTime",1);
	
	/* 加载主界面grid */
	var columns = [ [
			{field : "id",checkbox : "true"},
			{
				field : 'id1',
				title : '操作',
				hidden : dealPermission([
						'freight_order_edit',
						'freight_order_stop' ]),
				align : 'center',
				formatter : function(value, rec, index) {
					return '<a  class="icon-line icon-edit" title="编辑" style="display:'
							+ (dealPermission([ 'freight_order_edit' ]) ? 'none'
									: 'bolck')
							+ '" title="编辑" onclick="openUpdateFreightOrder(\''
							+ index
							+ '\')" href="javascript:void(0)"></a><a class="icon-line iconfont  uce-stop" style="display:'
							+ (dealPermission([ 'freight_order_stop' ]) ? 'none'
									: 'bolck')
							+ '" title="终止" onclick="orderstop(\''
							+ index
							+ '\')" href="javascript:void(0)"></a>';
				}
			},
			{field : 'orderCode',title : '订单编号',align : 'center',width : 100,
				formatter : function(value, rec) {
				return '<a class="editcls" onclick="viewOrder(\''
				+ rec.id
				+ '\')"  href="javascript:void(0)">'
				+ value + '</a>';
				}},
	
			{field : 'beginStation',title : '出发点',align : 'center',width : 120,formatter : formatTip},
			{field : 'endStation',title : '到达点',align : 'center',width : 120,formatter : formatTip},
			{field : 'businessMode',title : '业务模式',align : 'center',width : 100,formatter:function(value){
		          return getTypeNameByCode("BUSINESS_MODE", value,formatTip);
	        }},
	    	{field : 'layTime',title : '装卸车时间（分钟）',align : 'center',width : 120,formatter : formatTip},
	        
			{field : 'departureTime',title : '出发时间',align : 'center',width : 80,formatter : formatTimeSecond,},
			{field : 'arrivalTime',title : '到达时间',align : 'center',width : 80,formatter : formatTimeSecond,},
			{field : 'layTime',title : '装卸时间',align : 'center',width : 100,formatter : formatTip},
			{field : 'demandSite',title : '需求网点',align : 'center',width : 100},
			{field : 'carpoolSitesName',title : '愿意拼车网点',align : 'center',width : 100,formatter : formatTip},
			{field : 'isCarpool',title : '是否拼车',align : 'center',width : 100,formatter:function(value){
		          return getTypeNameByCode("IS_CARPOOL", value,formatTip);
	        }},
			{field : 'price',title : '价格',align : 'center',width : 100,formatter:formatDouble},
			{field : 'createEmp',title : '创建人',align : 'center',width : 80}, 
			{field : 'createTime',title : '创建时间',align : 'center',width : 130,formatter : function(value) {return formatData(value)}} 
			
			] ];

	var dataGridParams = {
		url : rootPath + "/freightOrder/findByPagination.do",
		pageSize : 10,
		toolbar : '#tlbFreightOrder',
		singleSelect : 'true',
  		fitColumns : 'false',
  		rownumbers:'true',
		onBeforeLoad : function(param) {
		},
		onLoadSuccess : function(data) {
		},
		onLoadError : function() {
			// 在载入远程数据产生错误的时候触发。
		}/*,
		onDblClickCell:function(index, field, value){
			
		}*/
	}
	/* 加载表单数据 */
	newloadGrid('tblFreightOrder', columns, dataGridParams);
	/* 数据字典加载 */
	initDictDatas("BUSINESS_MODE,ORDER_STATUS,IS_CARPOOL,ORDER_TYPE");
	
	uceDictCombobox('orderStatus', 'ORDER_STATUS');
	uceDictCombobox('businessMode', 'BUSINESS_MODE');
	
	/* 加载组织下拉表单数据 */
	orgCombogrid('demandSiteCode', {
		orgTypes : [ORG_TYPE_SITE],
		orgStatus : [ORG_ENABLED],
	});
	orgCombogrid('beginStationCode', {
		
		orgTypes : [ORG_TYPE_OPERATE_CENTER,ORG_TYPE_SITE],
		orgStatus : [ORG_ENABLED],
	});
	
	orgCombogrid('endStationCode', {
		orgTypes : [ORG_TYPE_OPERATE_CENTER,ORG_TYPE_SITE],
		orgStatus : [ORG_ENABLED],
	});
	/*弹框数据字典*/
	//uceDictCombobox('fmIsCarpool', 'IS_CARPOOL');
	uceDictCombobox('fmDemandType', 'ORDER_TYPE',{headerValue:false});
	$('#fmDemandType').combobox({
		onSelect: function(record){
			demandTypeChange(record.typeCode);
		},
	onChange: function(newValue,oldValue){
		onselectflag(null, newValue, null)
	}
	});
	
	uceDictCombobox('fmBusinessMode', 'BUSINESS_MODE',{headerValue:false});
	$('#fmBusinessMode').combobox({
		onChange: function(newValue,oldValue){
			onselectflag(null, null, newValue)
		}
	});
	uceDictCombobox('fmOrderStatus', 'ORDER_STATUS');
	/*$('#fmOrderStatus').combobox({
		onChange: function(newValue,oldValue){
			onselectflag(isCarpoolRecord, demandTyperecod, businessModeRecord)
		}
	});*/
	uceDictCombobox('fmIsCarpool', 'IS_CARPOOL',{headerValue:false});
	$('#fmIsCarpool').combobox({
		onChange: function(newValue,oldValue){
			onselectflag(newValue, null, null)
		}
	});
	/*uceDictCombobox('orderStatus', 'ORDER_STATUS');
	uceDictCombobox('businessMode', 'BUSINESS_MODE');*/
	
	orgCombogrid('fmBeginStationCode', {
		orgTypes : [ORG_TYPE_OPERATE_CENTER],
		orgStatus : [ORG_ENABLED],
	});
	orgCombogrid('fmEndStationCode', {
		orgTypes : [ORG_TYPE_SITE],
		orgStatus : [ORG_ENABLED],
	});
	orgCombogrid('fmDemandSiteCode', {
		orgTypes : [ORG_TYPE_SITE],
		orgStatus : [ORG_ENABLED],
	});
	$("#fmBusinessMode").combobox({onSelect:function(row){
		if(row.typeName=="进港"){
			orgCombogrid('fmBeginStationCode', {
				orgTypes : [ORG_TYPE_OPERATE_CENTER],
				orgStatus : [ORG_ENABLED],
			});
			orgCombogrid('fmEndStationCode', {
				orgTypes : [ORG_TYPE_SITE],
				orgStatus : [ORG_ENABLED],
			});
		}
		if(row.typeName=="出港"){
			orgCombogrid('fmBeginStationCode', {
				orgTypes : [ORG_TYPE_SITE],
				orgStatus : [ORG_ENABLED],
			});
			orgCombogrid('fmEndStationCode', {
				orgTypes : [ORG_TYPE_OPERATE_CENTER],
				orgStatus : [ORG_ENABLED],
			});
		}
	}});
	// 机构组合树（关联网点）
	
	sucOrgComboTree("fmCarpoolSitesCodes");
	
	/*$('#fmBeginStationCode').combogrid({
		onBeforeSelect : function(index, row){
			var result= setBussescode(row.orgType, null);
			if(result==false){
				//提示
				showWarnMsg("始发站点和目的站点不允许同时为分拨或者网点");
			}
			return result;
		},
		onSelect : function(index, row){
		//选中事件
			setBussescode(row.orgType, null);

		}
	});
	$('#fmEndStationCode').combogrid({
	    onBeforeSelect : function(index, row){
	    	var result= setBussescode( null,row.orgType);
			if(result==false){
				//提示
				showWarnMsg("始发站点和目的站点不允许同时为分拨或者网点");
			}
			return result;
		},
		onSelect : function(index, row){
		//选中事件
			setBussescode( null,row.orgType);
		}
	});*/



	
});
//业务模式赋值方法--始发类型，
function  setBussescode(starOrgType,endOrgType){
	//业务模式赋值方法--始发类型，
	if(starOrgType==null){
		var endg = $('#fmBeginStationCode').combogrid('grid');	// 获取数据表格对象
		var starr = endg.datagrid('getSelected');
		if(starr!=null){
		starOrgType=starr.orgType;
		}
	}
	if(endOrgType==null){
		var endg = $('#fmEndStationCode').combogrid('grid');	// 获取数据表格对象
		var endr = endg.datagrid('getSelected');
		if(endr!=null){
		endOrgType=endr.orgType;
		}
	}
	if(starOrgType == null || endOrgType == null){
		return true;
	}
	if(starOrgType==endOrgType){
		return false;
	}
	//1,进港，2出港
	if( starOrgType == ORG_TYPE_SITE){
		$('#fmBusinessMode').combobox('setValue', 2);
	}else if (starOrgType == ORG_TYPE_OPERATE_CENTER){
		$('#fmBusinessMode').combobox('setValue', 1);
	}
	return true;
}
var createflag;
/*需求类型的onchange事件*/
function demandTypeChange(selectVal){
	if(selectVal==DEMAND_TYPE_LONG){//长期需求
		$(".temporaryDiv").css("display","none"); 
		$(".longTermDiv").css("display","block"); 
		$("#weekWeightVolumeDiv").css("display","block"); 
		if(createflag){
			monthRange('fmorderStartTime', 'fmexecuteEndTime', 'add');
		}
		settingrequiredLong();
	}
	if(selectVal==DEMAND_TYPE_TEMP){//临时需求
		$(".temporaryDiv").css("display","block");
		$(".longTermDiv").css("display","none");
		$("#weekWeightVolumeDiv").css("display","none"); 
		if(createflag){
		monthRangetep('fmorderStartTime', 'add')
		}
		settingrequiredTemp();
	}
}
/**
 * 设置必填，长期
 */
function settingrequiredLong() {
	$('#fmDayWeight').textbox({
		required : false
	});
	$('#fmDayVolume').textbox({
		required : false
	});
	$('#fmexecuteEndTime').textbox({
		required : true
	});
	$('#mondayWeight').textbox({
		required : true
	});
	$('#mondayVolume').textbox({
		required : true
	});
	$('#tuesdayWeight').textbox({
		required : true
	});
	$('#tuesdayVolume').textbox({
		required : true
	});
	$('#wednesdayWeight').textbox({
		required : true
	});
	$('#wednesdayVolume').textbox({
		required : true
	});
	$('#thursdayWeight').textbox({
		required : true
	});
	$('#thursdayVolume').textbox({
		required : true
	});
	$('#fridayWeight').textbox({
		required : true
	});
	$('#fridayVolume').textbox({
		required : true
	});
	$('#saturdayWeight').textbox({
		required : true
	});
	$('#saturdayVolume').textbox({
		required : true
	});
	$('#sundayWeight').textbox({
		required : true
	});
	$('#sundayVolume').textbox({
		required : true
	});

}

/**
 * 设置必填，临时
 */
function settingrequiredTemp() {
	$('#fmDayWeight').textbox({
		required : true
	});
	$('#fmDayVolume').textbox({
		required : true
	});
	$('#fmexecuteEndTime').textbox({
		required : false
	});
	$('#mondayWeight').textbox({
		required : false
	});
	$('#mondayVolume').textbox({
		required : false
	});
	$('#tuesdayWeight').textbox({
		required : false
	});
	$('#tuesdayVolume').textbox({
		required : false
	});
	$('#wednesdayWeight').textbox({
		required : false
	});
	$('#wednesdayVolume').textbox({
		required : false
	});
	$('#thursdayWeight').textbox({
		required : false
	});
	$('#thursdayVolume').textbox({
		required : false
	});
	$('#fridayWeight').textbox({
		required : false
	});
	$('#fridayVolume').textbox({
		required : false
	});
	$('#saturdayWeight').textbox({
		required : false
	});
	$('#saturdayVolume').textbox({
		required : false
	});
	$('#sundayWeight').textbox({
		required : false
	});
	$('#sundayVolume').textbox({
		required : false
	});
}


/**
 * 取消时间限制
 * 
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
function findFreightOrder() {
	if ($("#formFreightOrder").form('validate')) {
		// 判断时间是否为空
		var chargingBeginTime = $("#chargingBeginTime").datebox("getValue");
		var chargingEndTime = $("#chargingEndTime").datebox("getValue");
		 if(chargingBeginTime != null && chargingBeginTime != ''){
			 if(chargingEndTime == null || chargingEndTime == ''){
				 $.messager.alert("提示", "请选择执行时间的终止日期", "info");
				 return false;
			 }
		 }
		 if(chargingEndTime != null && chargingEndTime != ''){
			 if(chargingBeginTime == null || chargingBeginTime == ''){
				 $.messager.alert("提示", "请选择执行时间的开始日期", "info");
				 return false;
			 }
		 }
		  $('#autoselect').val(true);
		 var datagrid = $('#tblFreightOrder').datagrid('options');
		datagrid.url = rootPath + "/freightOrder/findByPagination.do";
		$('#tblFreightOrder').datagrid('load',
				serializeFormObj("formFreightOrder"));
		}
}
/*重置查询条件*/
function resetFreightOrder(){
	$('#formFreightOrder').form('reset');
}
var create=true;
var url;
/*新增*/
function openAddFreightOrder() {
	openDialog("dlgFreightOrder", '新增');
	url = rootPath + "/freightOrder/addFreightOrder.do";
	$("#formDlgFreightOrder").form('clear');
	/*
	 * $('#fmCreateEmp').textbox('setText',empName);
	 * $('#fmCreateTime').datetimebox('setValue', getcurrenttime());
	 */
	$('#fmDemandType').combobox('setValue', '1');
	$('#fmOrderStatus').combobox('setValue', '00');
	// 默认进港
	$('#fmBusinessMode').combobox('setValue', 1);
	$('#fmIsCarpool').combobox('setValue', 1);
	$('#fmCarpoolSitesCodes').combotree('clear');
	siteName = '';
	dialogReadOnly(false);
	tblFreightOrderReadonly(false);
	monthRange('fmorderStartTime', 'fmexecuteEndTime', 'add');
	//代表新增
	createflag=true;
	$(".createDiv").css("display", "none");

}
/**
 * 更新，新增只读设置
 * 
 * @param flag
 */
function dialogReadOnly(flag){
	 $('#fmDemandSiteCode').combobox('readonly', flag);
}
/*更新*/
function openUpdateFreightOrder(index){
	/* 获取当前选择行 */
	var row = $('#tblFreightOrder').datagrid('getRows')[index];
	if (row) {
		
		if(row.orderStatus==ORDER_STATUS_TERING){
			showInfoMsg('此订单已终止，禁止修改');
			return;
		}
		if(!(row.orderCombinCode == ''|| row.orderCombinCode==null)){
			showInfoMsg('已纳入订单组合，禁止修改');
			return;
		}
		url = rootPath + "/freightOrder/updateFreightOrder.do";
		openDialog("dlgFreightOrder", '修改');
		siteName = '';
		//代表更新
		createflag=false;
		$("#formDlgFreightOrder").form('clear');
		dialogReadOnly(true);
		//设置为可编辑
		tblFreightOrderReadonly(false);
		row.createTime = formatTime(row.createTime);
		row.orderStartTime = formatTime(row.orderStartTime);
		if(row.updateTime !=null){
			row.updateTime = formatTime(row.updateTime);
		}
		if(row.orderEndTime !=null){
			row.orderEndTime = formatTime(row.orderEndTime);
		}
		//row = {"carpoolSitesName":row.carpoolSitesName};
		if(!row.carpoolSitesCode){
			row.carpoolSitesCode='';
		}
		///窗口切换
		demandTypeChange(row.demandType)
		
		$("#formDlgFreightOrder").form('load', row);
		$('#fmBeginStationCode').combogrid('grid').datagrid('reload', {
			'q' : row.beginStationCode
		});
		$('#fmEndStationCode').combogrid('grid').datagrid('reload', {
			'q' : row.endStationCode
		});
		$('#fmDemandSiteCode').combogrid('grid').datagrid('reload', {
			'q' : row.demandSiteCode
		});
		
		$("#fmBeginStationCode").combogrid('setValue',row.beginStationCode);
		$("#fmEndStationCode").combogrid('setValue',row.endStationCode);
		$("#fmDemandSiteCode").combogrid('setValue',row.demandSiteCode);
		$("#fmBeginStationCode").combogrid('setText',row.beginStation);
		$("#fmEndStationCode").combogrid('setText',row.endStation);
		$("#fmDemandSiteCode").combogrid('setText',row.demandSite);
		$('#fmCarpoolSitesCodes').combotree('setText',row.carpoolSitesName);
		if(row.isCarpool == false){
			 $('#fmIsCarpool').combobox('setValue', '0');
		}else{
			$('#fmIsCarpool').combobox('setValue', 1);
		}
		
		$('#version').val(row.version);
		$('#fmDepartureTime').timespinner('setValue', formatTimeSecond(row.departureTime));  
		$('#fmArrivalTime').timespinner('setValue', formatTimeSecond(row.arrivalTime));  
				
	}else{
		showInfoMsg('请先选择数据');
	}
}


var demandType;
var isCarpool;
var businessMode
/**
 * 
 */
function onselectflag(isCarpoolRecord,demandTyperecod,businessModeRecord){
	if(demandTyperecod!=null){
		demandType= demandTyperecod;
	}
	if(isCarpoolRecord!=null){
		isCarpool=  isCarpoolRecord;
	}
	if(businessModeRecord!=null){
		businessMode=businessModeRecord;
	}
}
/*保存*/
function saveFreightOrder(){
	//意愿拼车网点名称组
	$('#carpoolSitesName').val($("#fmCarpoolSitesCodes").combobox("getText"));
	if($("#fmCarpoolSitesCodes").combobox("getText").split(",").length>5){
		showErrorMsg("所选网点数量不得超过5个");
		return;
	}
	 $('#fmIsCarpool').combobox('setValue', isCarpool);
	 $('#fmDemandType').combobox('setValue', demandType);
	 $('#fmBusinessMode').combobox('setValue', businessMode);
	 
	$('#formDlgFreightOrder').form('submit',{
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
				   closeDialog("dlgFreightOrder");
				   $('#tblFreightOrder').datagrid('reload');   
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


/*删除*/
function deleteFreightDemand(index){
	/* 获取当前选择行 */
	var row = $('#tblFreightDemand').datagrid('getRows')[index];
	if (row) {
		confirmMsg('您确定要删除选中的数据吗？', function(row) {
			$.ajax({
				url : rootPath + '/freightDemand/deleteFreightDemand.do?',
				data : {
					'id' : row.id
				},
				task : function(data, statusText, xhr) {
					reloadDatagrid('tblFreightDemand');
				}
			});
		}, [ row ]);
	}
}
function getcurrenttime(){
		   var curr_time = new Date();
		   var strDate = curr_time.getFullYear()+"/";
		   strDate += curr_time.getMonth()+1+"/";
		   strDate += curr_time.getDate()+" ";
		   strDate += curr_time.getHours()+":";
		   strDate += curr_time.getMinutes()+":";
		   strDate += curr_time.getSeconds();
		  return strDate;
}
/**订单终止*/
function orderstop(index){
	var row = $('#tblFreightOrder').datagrid('getRows')[index];
	if (row) {
		if(row.orderStatus==ORDER_STATUS_TERING){
			showInfoMsg('此订单已终止，禁止再次终止');
			return;
		}
		confirmMsg('您确定要中止选中的数据吗？', function(row) {
			$.ajax({
				url : rootPath + "/freightOrder/stopFreightOrder.do",
				data : {
					'id' : row.id
				},
				task : function(data, statusText, xhr) {
					reloadDatagrid('tblFreightOrder');
				}
			});
		}, [ row ])
	}
		else{
			showInfoMsg('请先选择数据');};
		}
	
/**
 * 订单详情
 */
function viewOrder() {
	var row = $('#tblFreightOrder').datagrid('getChecked')[0];
	if (row == null) {
		return;
	}
	openDialog("dlgFreightOrder", '查看');
	tblFreightOrderReadonly(true);
	$("#formDlgFreightOrder").form('clear');
	if (row.createTime != null) {

		row.createTime = formatTime(row.createTime);
	}
	if (row.orderStartTime != null) {

		row.orderStartTime = formatTime(row.orderStartTime);
	}
	if (row.updateTime != null) {
		row.updateTime = formatTime(row.updateTime);
	}
	if (row.orderEndTime != null) {
		row.orderEndTime = formatTime(row.orderEndTime);
	}
	// row = {"carpoolSitesName":row.carpoolSitesName};
	if (!row.carpoolSitesCode) {
		row.carpoolSitesCode = '';
	}
	// /窗口切换
	demandTypeChange(row.demandType)

	$("#formDlgFreightOrder").form('load', row);
	$('#fmBeginStationCode').combogrid('grid').datagrid('reload', {
		'q' : row.beginStationCode
	});
	$('#fmEndStationCode').combogrid('grid').datagrid('reload', {
		'q' : row.endStationCode
	});
	$('#fmDemandSiteCode').combogrid('grid').datagrid('reload', {
		'q' : row.demandSiteCode
	});

	$("#fmBeginStationCode").combogrid('setValue', row.beginStationCode);
	$("#fmEndStationCode").combogrid('setValue', row.endStationCode);
	$("#fmDemandSiteCode").combogrid('setValue', row.demandSiteCode);
	$("#fmBeginStationCode").combogrid('setText', row.beginStation);
	$("#fmEndStationCode").combogrid('setText', row.endStation);
	$("#fmDemandSiteCode").combogrid('setText', row.demandSite);
	$('#fmCarpoolSitesCodes').combotree('setText', row.carpoolSitesName);
	if (row.isCarpool == false) {
		$('#fmIsCarpool').combobox('setValue', '0');
	} else {
		$('#fmIsCarpool').combobox('setValue', 1);
	}

	$('#version').val(row.version);
	$('#fmDepartureTime').timespinner('setValue',
			formatTimeSecond(row.departureTime));
	$('#fmArrivalTime').timespinner('setValue',
			formatTimeSecond(row.arrivalTime));
}
/**
 * 订单弹框只读设置
 */
function tblFreightOrderReadonly(flag){
	if(flag){
	$('#btsaveFreightOrder').linkbutton('disable');
	}else{
		$('#btsaveFreightOrder').linkbutton('enable');
	}
	$('#fmIsCarpool').textbox({readonly:flag});
	$('#fmDemandType').textbox({readonly:flag});
	$('#fmDemandSiteCode').textbox({readonly:flag});
	$('#fmBeginStationCode').textbox({readonly:flag});
	$('#fmEndStationCode').textbox({readonly:flag});
	$('#fmDepartureTime').timespinner({readonly:flag});
	$('#fmArrivalTime').timespinner({readonly:flag});
	$('#fmLayTime').textbox({readonly:flag});
	$('#fmCarpoolSitesCodes').textbox({readonly:flag});
	$('#fmPrice').textbox({readonly:flag});
	$('#fmAdjustPrice').textbox({readonly:flag});
	$('#fmBusinessMode').textbox({readonly:flag});
	$('#fmorderStartTime').textbox({readonly:flag});
	$('#fmDayWeight').textbox({readonly:flag});
	$('#fmDayVolume').textbox({readonly:flag});
	$('#fmexecuteEndTime').textbox({readonly:flag});
	$('#mondayWeight').textbox({readonly:flag});
	$('#mondayVolume').textbox({readonly:flag});
	$('#tuesdayWeight').textbox({readonly:flag});
	$('#tuesdayVolume').textbox({readonly:flag});
	$('#wednesdayWeight').textbox({readonly:flag});
	$('#wednesdayVolume').textbox({readonly:flag});
	$('#thursdayWeight').textbox({readonly:flag});
	$('#thursdayVolume').textbox({readonly:flag});
	$('#fridayWeight').textbox({readonly:flag});
	$('#fridayVolume').textbox({readonly:flag});
	$('#saturdayWeight').textbox({readonly:flag});
	$('#saturdayVolume').textbox({readonly:flag});
	$('#sundayWeight').textbox({readonly:flag});
	$('#sundayVolume').textbox({readonly:flag});
}
/***
 * 限制临时订单时间
 */
function monthRangetep(startTime,type){
	var date = new Date(new Date()-0+1*86400000);  
	var firstDayStr=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
	//var firstDay = new Date(year,month-1,1);//获取下一个月的第一天
	$("#" + startTime).datebox().datebox('calendar').calendar({
		validator : function(value) {
			return value>=new Date();
		}
	});
	/**默认赋值为下一个月的开始与结束*/
	if(type=='add'){
		$("#" + startTime).datebox('setValue', firstDayStr);
	}
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