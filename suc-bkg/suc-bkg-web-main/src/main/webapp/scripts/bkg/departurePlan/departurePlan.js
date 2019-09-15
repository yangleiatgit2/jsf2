$(function() {
	//查询界面空间
	timeLimit("executeBeginTime", "executeEndTime",1);
	// 初始化数据字典
	// initDictDatas(''/*数据字典编号*/);
	/* 数据字典加载 */
	// uceDictCombobox(''/*控件id*/, ''/*数据字典编号*/);
	initDictDatas("BUSINESS_MODE,DEPARTURE_STATUS,DEMAND_TYPE,TYPE_OF_ADJUSTMENT,SHIFT_SOURCES,CAR_TYPE,SHFIT_TYPE,ABNORMAL_STATE");
	// 班次状态数据字典
	uceDictCombobox('status', 'DEPARTURE_STATUS');
	// 业务模式数据字典
	uceDictCombobox('businessMode', 'BUSINESS_MODE');

	// 需求类型
	uceDictCombobox('demandType', 'DEMAND_TYPE');

	// 调整类型
	uceDictCombobox('adjustType', 'TYPE_OF_ADJUSTMENT');

	// 班次来源
	uceDictCombobox('resource', 'SHIFT_SOURCES');

	// 车型
	uceDictCombobox('carType', 'CAR_TYPE');

	// 班次类型
	uceDictCombobox('abnormalState', 'ABNORMAL_STATE');

	uceDictCombobox('lineGroupType', 'SHFIT_TYPE');
	uceDictCombobox('form-businessMode', 'BUSINESS_MODE');
	uceDictCombobox('form-carType', 'CAR_TYPE');
	uceDictCombobox('form-demandType', 'DEMAND_TYPE');
	orgCombogrid('form-startOrgCode', {queryParams : {orgType : ORG_TYPE_OPERATE_CENTER + ',' + ORG_TYPE_SITE,status : ORG_ENABLED}});
	orgCombogrid('form-endOrgCode', {
		queryParams : {
			orgType : ORG_TYPE_OPERATE_CENTER + ',' + ORG_TYPE_SITE,
			status : ORG_ENABLED
		}
	});
	/*
	 * form表单中的详情页组件
	 * */
	uceDictCombobox("form-status","DEPARTURE_STATUS");
	
	var columns = [ [
			{
				field : 'id',
				title : '操作',
				align : 'center',
				width : 130,
				formatter : function(value, rec, index) {
					return '<a class="icon-line iconfont uce-edit" title="编辑" onclick="updateDeparturePlan(\''+ index + '\')" href="javascript:void(0)"></a><a class="icon-line iconfont uce-car" title="发车执行" onclick="startdeparturePlan(\''+ index + '\')" href="javascript:void(0)"></a><a class="icon-line iconfont uce-upload" title="异常上报" onclick="reportException(\''+ index + '\')" href="javascript:void(0)"></a><a class="icon-line iconfont uce-stop" title="终止发车计划" onclick="stopDeparturePlan(\''+ index + '\')" href="javascript:void(0)"></a>';
				}
			},
			{
				field : 'drivingPlanCode',
				title : '发车计划号',
				align : 'center',
				formatter : function(value,rec,index){
					return '<a class="editcls" onclick="showDetails(\''
					+ index
					+ '\')"  href="javascript:void(0)">'
					+ value + '</a>';
				}
			},
			{
				field : 'dirverName',
				title : '司机',
				align : 'center',
				formatter : formatTip
			},
			{
				field : 'driverPhone',
				title : '司机手机号',
				align : 'center',
				formatter : formatTip
			},
			{
				field : 'plateNumber',
				title : '车辆',
				align : 'center',
				formatter : formatTip
			},
			{
				field : 'departTime',
				title : '出发时间',
				align : 'center',
				formatter : formatTime
			},
			{
				field : 'arrivalTime',
				title : '到达时间',
				align : 'center',
				formatter : formatTime
			},
			{
				field : 'lineGroupDistance',
				title : '线路距离',
				align : 'center',
				formatter : formatTip
			},
			{
				field : 'businessMode',
				title : '业务模式',
				align : 'center',
				formatter : function(value) {
					return getTypeNameByCode("BUSINESS_MODE", value, formatTip);
				}
			},
			{
				field : 'startOrgName',
				title : '始发站',
				align : 'center',
				formatter : formatTip
			},
			{
				field : 'endOrgName',
				title : '目的站',
				align : 'center',
				formatter : formatTip
			},
			{
				field : 'carType',
				title : '车型',
				align : 'center',
				formatter : function(value) {
					return getTypeNameByCode("CAR_TYPE", value, formatTip);
				}
			},
			{
				field : 'loadingRate',
				title : '装载率',
				align : 'center',
				formatter : formatTip
			},
			{
				field : 'demandType',
				title : '需求类型',
				align : 'center',
				formatter : function(value) {
					return getTypeNameByCode("DEMAND_TYPE", value, formatTip);
				}
			},

			{
				field : 'status',
				title : '状态',
				align : 'center',
				formatter : function(value) {
					return getTypeNameByCode("DEPARTURE_STATUS", value,
							formatTip);
				}
			},
			{
				field : 'lineGroupCode',
				title : '相关班次号',
				align : 'center',
				formatter : formatTip
			},
			{
				field : 'demandCombinCode',
				title : '需求组合号',
				align : 'center',
				formatter : formatTip
			},
			{
				field : 'orderCombinCode',
				title : '订单组合号',
				align : 'center',
				formatter : formatTip
			},
			{
				field : 'abnormalState',
				title : '是否有异常',
				align : 'center',
				formatter : function(value) {
					return getTypeNameByCode("ABNORMAL_STATE", value, formatTip);
				}
			} ] ];
	var dataGridParams = {
		url : '../departurePlan/finddeparturePlanByPage.do',
		pageSize : 10,
		toolbar : '#tlbIAConfordepar',
		singleSelect : 'true',
		fitColumns : 'false',
		onLoadSuccess : function(data) {
			$(this).datagrid("fixRownumber");
		}
	}
	/* 加载表单数据 */
	newloadGrid('departGrid', columns, dataGridParams);
	$("#formLine").form();
	var columnsDetail = [ [ {
		field : 'wayPointName',
		title : '途经站点',
		align : 'center',
		formatter : formatTip
	}, {
		field : 'forecastVolume',
		title : '预报货物方数',
		align : 'center',
		formatter : formatTip
	}, {
		field : 'forecastWeight',
		title : '预报货物重量',
		align : 'center',
		formatter : formatTip
	}, {
		field : 'actualVolume',
		title : '实际方数',
		align : 'center',
		formatter : formatTip
	}, {
		field : 'actualWeight',
		title : '实际重量',
		align : 'center',
		formatter : formatTip
	}, {
		field : 'siteNumber',
		title : '网点件数',
		align : 'center',
		formatter : formatTip
	}, {
		field : 'weight',
		title : '中心件数',
		align : 'center',
		formatter : formatTip
	}, {
		field : 'forecastEndTime',
		title : '预计达时间',
		align : 'center',
		formatter : formatTime
	}, {
		field : 'actualEndTime',
		title : '实际到达时间',
		align : 'center',
		formatter : formatTime
	}, {
		field : 'forecastLoadUnloadTine',
		title : '装卸货耗时(分钟)',
		align : 'center',
		formatter : formatTip
	}, {
		field : 'forecastDistance',
		title : '计划里程',
		align : 'center',
		formatter : formatTip
	}, {
		field : 'actualDistance',
		title : '实际里程',
		align : 'center',
		formatter : formatTip
	}, {
		field : 'forecastRuningTime',
		title : '计划耗时',
		align : 'center',
		formatter : formatTip
	}, {
		field : 'actualRunningTime',
		title : '实际耗时',
		align : 'center',
		formatter : formatTip
	}, {
		field : 'siationEvalJudge',
		title : '站点评价',
		align : 'center',
		formatter : formatTip
	}

	] ];
	var dataGridParamsDetail = {
		url : '',
		pageSize : 10,
		toolbar : '#tlbIAConfordetail',
		singleSelect : 'true',
		fitColumns : 'true'
	}
	/* 加载表单数据 */
	newloadGrid('departDetailGrid', columnsDetail, dataGridParamsDetail);
	var detailView={
			url:'',
			pageSize:10,
			singleSelect:"true",
			fitColumns:'true'
	}
	newloadGrid('updateWorkGrid',columnsDetail,detailView);
	$("#departGrid")
			.datagrid(
					{
						// 双击事件
						onDblClickRow : function(index, row) {
							var drivingPlanCode = row.drivingPlanCode;
							var dataGridParamsDetail = {
								url : '../departurePlan/finddeparturePlanDetailByPage.do?drivingPlanCode='
										+ drivingPlanCode,
								pageSize : 10,
								toolbar : '#tlbIAConfordetail',
								singleSelect : 'true',
								fitColumns : 'true'
							}
							/* 加载表单数据 */
							newloadGrid('departDetailGrid', columnsDetail,
									dataGridParamsDetail);

						}
					});

	// 机构下拉菜单
	orgCombogrid('startOrgCode', {
		queryParams : {
			orgType : ORG_TYPE_OPERATE_CENTER + ',' + ORG_TYPE_SITE,
			status : ORG_ENABLED
		}
	});
	orgCombogrid('endOrgCode', {
		queryParams : {
			orgType : ORG_TYPE_OPERATE_CENTER + ',' + ORG_TYPE_SITE,
			status : ORG_ENABLED
		}
	});
	
});

// 根据条件查询发车计划
function queryDeparture() {
	var chargingBeginTime = $("#executeBeginTime").datebox("getValue");
	var chargingEndTime = $("#executeEndTime").datebox("getValue");
	 if(chargingBeginTime != null && chargingBeginTime != ''){
		 if(chargingEndTime == null || chargingEndTime == ''){
			 $.messager.alert("提示", "请选择出发时间的终止日期", "info");
			 return false;
		 }
	 }
	 if(chargingEndTime != null && chargingEndTime != ''){
		 if(chargingBeginTime == null || chargingBeginTime == ''){
			 $.messager.alert("提示", "请选择出发时间的开始日期", "info");
			 return false;
		 }
	 }
	var datagrid = $('#departGrid').datagrid('options');
	datagrid.url = "../departurePlan/finddeparturePlanByPage.do";
	var params=serializeFormObj('departureForms');  
	params.pageQuery='pageQuery';
	$('#departGrid').datagrid('load', params );
	$('#departDetailGrid').datagrid('loadData', {
		total : 0,
		rows : []
	});
}

function saveLine() {
	accept();

	var condition = serializeFormObj('formLine');

	var url = '../workScheduleRule/insertWorkDetail.do';

	var rows = $('#insertWorkDetail').datagrid('getRows');

	condition.startOrgName = $("#startOrgCode").combogrid('getText');
	condition.endOrgName = $("#endOrgCode").combogrid('getText');
	condition.strJson = JSON.stringify(rows);
	console.log(JSON.stringify(rows));
	$.ajax({
		url : url,
		data : condition,
		task : function(data, statusText, xhr) {

		},
		fail : function(data, statusText, xhr) {

		}
	});
}

function updateDeparturePlan(index) {
	// var rows = $('#departGrid').datagrid('getSelected');
	var rows = $('#departGrid').datagrid('getRows')[index];
	if (rows == null) {
		$.messager.alert("提示", "请选择一条数据", "info");
		return false;
	}
	if (rows.status == "06") {
		$.messager.alert("提示", "该发车计划已终止,不能编辑", "info");
		return false;
	}

	if (rows.status == "02") {
		$.messager.alert("提示", "该发车计划已确认,不能编辑", "info");
		return false;
	}

	if (rows.status == "03") {
		$.messager.alert("提示", "该发车计划未确认,不能编辑", "info");
		return false;
	}

	if (rows.status == "04") {
		$.messager.alert("提示", "该发车计划执行中,不能编辑", "info");
		return false;
	}

	if (rows.status == "05") {
		$.messager.alert("提示", "该发车计划已执行,不能编辑", "info");
		return false;
	}

	$("#id").val(rows.id);
	openDialog("updateDeparturePlan", '司机车辆修改');
	carCombogrid("plateNumber", {});
	driverCombogrid("driverPhone", {});

}

function rest() {
	$('#departureForms').form('reset');
}

function updatedeparTurePlan() {

	var rows = $('#departGrid').datagrid('getSelected');
	if (rows == null) {
		$.messager.alert("提示", "请选择一条数据", "info");
		return false;
	}
	var dirvingPlan = serializeFormObj('planFrom');
	dirvingPlan.dirverName = $('#driverPhone').combobox('getText');
	var g = $('#driverPhone').combogrid('grid'); // 获取数据表格对象
	var r = g.datagrid('getSelected');
	dirvingPlan.driverPhone = r.mobilePhone;
	if (dirvingPlan.dirverName == "") {
		$.messager.alert("提示", "司机信息为空！", "info");
		return false;
	}
	dirvingPlan.plateNumber = $('#plateNumber').combobox('getText');
	if (dirvingPlan.plateNumber == "") {
		$.messager.alert("提示", "车辆信息为空！", "info");
		return false;
	}
	var url = '../departurePlan/updateDeparturePlan.do';
	$.ajax({
		url : url,
		data : dirvingPlan,
		task : function(data, statusText, xhr) {
			$.messager.alert("提示", "司机车辆已更新", "info");
			closeDialog('updateDeparturePlan');
			queryDeparture();
		},
		fail : function(data, statusText, xhr) {

		}
	});
	console.log(dirvingPlan);

}

function startdeparturePlan(index) {
	var rows = $('#departGrid').datagrid('getRows')[index];
	var id = rows.id;
	var status = "startDeparturePlan";
	var driverPhone = rows.driverPhone;
	var url = '../departurePlan/departurePlanStatus.do';
	if (rows == null) {
		$.messager.alert("提示", "请选择一条数据", "info");
		return false;
	}
	if (rows.status == "03") {
		$.messager.alert("提示", "发车计划已执行,请勿重复提交", "info");
		return false;
	}
	if (rows.status == "02") {
		$.messager.alert("提示", "该发车计划已确认，不能生成发车计划", "info");
		return false;
	}
	if (rows.status == "04") {
		$.messager.alert("提示", "该发车计划执行中,不能生成发车计划", "info");
		return false;
	}

	if (rows.status == "05") {
		$.messager.alert("提示", "该发车计划已执行,不能生成发车计划", "info");
		return false;
	}
	if (rows.status == "06") {
		$.messager.alert("提示", "该发车计划已终止,不能生成发车计划", "info");
		return false;
	}
	$.ajax({
		url : url,
		data : {
			id : id,
			status : status,
			driverPhone : driverPhone,
			drivingPlanCode: rows.drivingPlanCode
		},
		task : function(data, statusText, xhr) {
			$.messager.alert("提示", "发车计划已执行", "info");
			queryDeparture();
		},
		fail : function(data, statusText, xhr) {

		}
	});
}

function stopDeparturePlan(index) {
	var rows = $('#departGrid').datagrid('getRows')[index];
	var id = rows.id;
	var status = "stopDeparturePlan";
	if (rows == null) {
		$.messager.alert("提示", "请选择一条数据", "info");
		return false;
	}
	if (rows.status == "06") {
		$.messager.alert("提示", "发车计划已终止，请勿重复执行！", "info");
		return false;
	}
	if (rows.status == "05") {
		$.messager.alert("提示", "该发车计划已执行,不能终止发车计划", "info");
		return false;
	}
	$.messager.confirm('提示', '是否终止该发车计划', function(r) {
		if (r) {
			var url = '../departurePlan/departurePlanStatus.do';

			$.ajax({
				url : url,
				data : {
					id : id,
					status : status
				},
				task : function(data, statusText, xhr) {
					$.messager.alert("提示", "发车计划终止成功！", "info");
					queryDeparture();
				},
				fail : function(data, statusText, xhr) {

				}
			});

		}
	});

}

function reportException(index) {
	var rows = $('#departGrid').datagrid('getRows')[index];
	if (rows.status == "06") {
		$.messager.alert("提示", "该发车计划已终止,不能上报异常", "info");
		return false;
	}
	$('#exceptionForm').form('reset');
	initDictDatas("DEPARTURE_EXCEPTION");
	uceDictCombobox('excepType', 'DEPARTURE_EXCEPTION');
	openDialog("departureException", '异常上报');
}

function saveException() {
	debugger
	 var carType=$('#excepType').combobox('getValue');
	 if(carType==null||carType==''){
		 showErrorMsg("请选择异常状态!");
		 return false; 
	 }
	 var remark=$("#reason").val();
	 if(remark==null||remark==''){
		 showErrorMsg("请填写异常信息!");
		 return false; 
	 }
	 if(remark.length>20){
		 showErrorMsg("异常信息长度应介于1到20之间!");
		 return false; 
	 }
	var rows = $('#departGrid').datagrid('getSelected');
	var condition = serializeFormObj('exceptionForm');
	condition.startTrunkCode = rows.drivingPlanCode;
	condition.utf1 = rows.id;
	var url = '../departurePlan/saveDepartureException.do';
	$.ajax({
		url : url,
		data : condition,
		task : function(data, statusText, xhr) {
			$.messager.alert("提示", "异常上报成功！", "info");
			closeDialog('departureException');
			queryDeparture();
		},
		fail : function(data, statusText, xhr) {

		}
	});

}

function closeDeparture() {
	closeDialog('departureException');
}

function closeLine() {

	closeDialog('updateDeparturePlan');
}

/**
 * 展示详情页
 */
function showDetails(index){
	var row=$("#departGrid").datagrid("getRows")[index];
	if(row){
		$("#formLine").form("clear");
		var drivingPlanCode=row.drivingPlanCode;
		var opts=$("#updateWorkGrid").datagrid("options");
		opts.url='../departurePlan/finddeparturePlanDetailByPage.do?drivingPlanCode='
			+ drivingPlanCode;
		$("#updateWorkGrid").datagrid("reload");
		if(row.createTime)
			row.createTime=formatTime(row.createTime);
		if(row.departTime)
			row.departTime=formatTime(row.departTime);
		if(row.arrivalTime)
			row.arrivalTime=formatTime(row.arrivalTime);
		if(row.updateTime)
			row.updateTime=formatTime(row.updateTime);
		$("#formLine").form("load",row);
		openDialog("insertDialog","查看");
	}
	
}

function closeLine(){
	closeDialog("insertDialog");
}
