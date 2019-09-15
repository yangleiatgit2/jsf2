//驾驶证附件
var driverLicensePhoto;
// 行驶证附件
var drivingLicensePhoto;
// 身份证正面
var idFrontPhoto;
// 通行证附件
var passCheckPhoto;
// 运营证附件
var operationCertificate;
// 身份证反面
var idSidePhoto;
var getCapacityCode="";
$(function() {
	// 查询界面空间
	dateRange("executeBeginTime", "executeEndTime");
	dateRange("startTime", "endTime");
	var driverCardUpload = "true";
	/* 加载主界面grid */
	var columns = [ [
			{
				field : "id",
				checkbox : "true"
			},
			{
				field : 'des',
				title : '操作',
				align : 'center',
				width : 40,
				formatter : function(value, rec, index) {
					return '<a class="icon-line iconfont uce-edit" title="编辑" onclick="openUpdateFreightDemand(\''
							+ index + '\')" href="javascript:void(0)"></a>';
				}
			},
			{
				field : 'capacityCode',
				title : '运力编号',
				align : 'center',
				width : 70,
				formatter : formatTip
			},
			{
				field : 'carPlateNumber',
				title : '车牌号',
				align : 'center',
				width : 70,
				formatter : formatTip
			},
			{
				field : 'belongSiteName',
				title : '车辆所属网点',
				align : 'center',
				width : 90,
				formatter : formatTip
			},
			{
				field : 'carBelong',
				title : '车辆所属',
				align : 'center',
				width : 90,
				formatter : function(value) {
					return getTypeNameByCode("CAR_BELONG_TYPE", value,
							formatTip);
				}
			},
			{
				field : 'carType',
				title : '车辆类型',
				align : 'center',
				width : 50,
				formatter : function(value) {
					return getTypeNameByCode("CAR_TYPE", value, formatTip);
				}
			},
			{
				field : 'length',
				title : '长(米)',
				align : 'center',
				width : 60,
				formatter : formatDouble
			},
			{
				field : 'width',
				title : '宽(米)',
				align : 'center',
				width : 60,
				formatter : formatDouble
			},
			{
				field : 'hight',
				title : '高(米)',
				align : 'center',
				width : 60,
				formatter : formatDouble
			},
			{
				field : 'largestLoad',
				title : '最大载重(吨)',
				align : 'center',
				width : 100,
				formatter : formatDouble
			},
			{
				field : 'driverName',
				title : '驾驶员姓名',
				align : 'center',
				width : 70,
				formatter : formatTip
			},
			{
				field : 'driverPhone',
				title : '驾驶员联系电话',
				align : 'center',
				width : 100,
				formatter : formatTip
			},
			{
				field : 'purchasePrice',
				title : '采购价格(元/月)',
				align : 'center',
				width : 120,
				formatter : formatDouble
			},
			{
				field : 'buyStatus',
				title : '采购状态',
				align : 'center',
				width : 80,
				formatter : function(value) {
					return getTypeNameByCode("CAPACITY_STATUS", value,
							formatTip);
				}
			},
			{
				field : 'passFlag',
				title : '是否有通行证',
				align : 'center',
				width : 70,
				formatter : function(value) {
					return getTypeNameByCode("TRAFFIC_PERMIT_FLAG", value,
							formatTip);
				}
			}, {
				field : 'drivingLicenceImageId',
				title : '司机驾驶证',
				align : 'center',
				width : 100,
				formatter : formatTip
			}, {
				field : 'idCardFrontImageId',
				title : '车辆行驶证',
				align : 'center',
				width : 100,
				formatter : formatTip
			}, {
				field : 'startTime',
				title : '运力有效期起',
				align : 'center',
				width : 100,
				formatter : formatDate
			}, {
				field : 'endTime',
				title : '运力有效期止',
				align : 'center',
				width : 100,
				formatter : formatDate
			},
	/*
	 * ,{field : 'updateEmp',title : '修改人',align : 'center',width : 80,formatter :
	 * formatTip}, {field : 'updateTime',title : '修改时间',align : 'center',width :
	 * 130,formatter : function(value) { return formatData(value)} }
	 */
	] ];
	// 初始化时间插件的值
	var date = new Date();
	var datastr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
			+ (date.getDate());
	$("#executeBeginTime").datebox('setValue', datastr);
	$("#executeEndTime").datebox('setValue', datastr);
	var dataGridParams = {
		url : '',
		pageSize : 10,
		toolbar : '#tlbDotAbility',
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
	initDictDatas('CAR_TYPE,CAR_BELONG_TYPE,CAPACITY_STATUS,TRAFFIC_PERMIT_FLAG,CARRIER_FILE_UP,CAR_SURNAME,DRIVER_DRIVING_LICENCE,CAR_DRIVING_LICENCE,DRIVER_ID_CARD,DRIVER_ID_CARD_OPP,CAR_TRAFFIC_PERMIT,CAR_OPERATION_CERTIFICATE');
	/* 加载表单数据 */
	newloadGrid('tblDotAility', columns, dataGridParams);
	uceDictCombobox('carPlateSurname', 'CAR_SURNAME', {
		headerValue : false
	});

	/* 数据字典加载 */
	uceDictCombobox('findCarType', 'CAR_TYPE');
	uceDictCombobox('carType', 'CAR_TYPE');
	uceDictCombobox('findCarStatus', 'CAPACITY_STATUS');
	uceDictCombobox('buyStatus', 'CAPACITY_STATUS');
	uceDictCombobox('findCarBelong', 'CAR_BELONG_TYPE');
	uceDictCombobox('carBelongAs', 'CAR_BELONG_TYPE');
	uceDictCombobox('passFlag', 'TRAFFIC_PERMIT_FLAG');
	$('#passFlag').combobox({
		onChange : function(newVal, oldVal) {
			if (newVal == "1") {
				$("#passImageId").textbox({
					disabled : false
				});
			} else {
				$("#passImageId").textbox("setValue", "");
				$("#passImageId").textbox({
					disabled : true
				});

			}
		}
	});
	// 机构下拉菜单
	orgCombogrid('findbelongSiteName', {
		orgTypes : ORG_TYPE_SITE,
		orgStatus : ORG_ENABLED
	});
	orgCombogrid('belongSiteCode', {
		orgTypes : ORG_TYPE_SITE,
		orgStatus : ORG_ENABLED
	});
	/*
	 * 加载组织下拉表单数据 orgCombogrid('findbelongSiteName', {
	 * 
	 * orgTypes : [ORG_TYPE_OPERATE_CENTER,ORG_TYPE_SITE], orgStatus :
	 * [ORG_ENABLED], }); orgCombogrid('belongSiteCode', {
	 * 
	 * orgTypes : [ORG_TYPE_OPERATE_CENTER,ORG_TYPE_SITE], orgStatus :
	 * [ORG_ENABLED], });
	 */

	$('#width').numberbox({
		formatter : formatNumber
	});
	$('#length').numberbox({
		formatter : formatNumber
	});
	$('#hight').numberbox({
		formatter : formatNumber
	});
	$('#largestLoad').numberbox({
		formatter : formatNumber
	});
	$('#purchasePrice').numberbox({
		formatter : formatNumber
	});
	
});
/**
 * 补齐两位小数点
 */
function formatDouble(val) {
	if (val != null) {
		return val.toFixed(2);
	}

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
			} else {
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
			} else {
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
 * 
 * @param startTime
 * @param endTime
 */
function cancelDateRange(startTime, endTime) {
	/* 控制开始日期输入大小 */
	resetDateBox(startTime);
	/* 控制结束日期输入大小 */
	resetDateBox(endTime);

}
/**
 * 初始化datebox的时间限制
 */
function resetDateBox(dateboxId) {
	/* 控制结束日期输入大小 */
	$("#" + dateboxId).datebox().datebox('calendar').calendar({
		validator : function(value) {
			var date = new Date('1970-01-01'.replace(/-/, "/"))
			return value >= date;
		}
	});
}
/* 根据查询条件查询 */
function findDotAbilitybywhere() {
	if ($("#formFindDotAbility").form('validate')) {
		var startTime=$("#executeBeginTime").datebox('getValue');
		var endTime=$("#executeEndTime").datebox('getValue');
		if(startTime == "" || startTime == null ){
			showErrorMsg("查询开始时间不能 为空");
			return;
		}else if (endTime == "" || endTime == null){
			showErrorMsg("查询的结束时间不能为空");
			return;
		}
		var datagrid = $('#tblDotAility').datagrid('options');
		datagrid.url = rootPath + "/dotAbility/findBycondition.do";
		$('#tblDotAility').datagrid('load',
				serializeFormObj("formFindDotAbility"));
	} else {
		$.messager.alert("提示", "请按提示输入你需要查询的条件", "info");
	}
}

/* 重置查询条件 */
function resetDotAbility() {
	cancelDateRange('executeBeginTime', 'executeEndTime')
	$('#formFindDotAbility').form('reset');
	var date = new Date();
    var datastr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate());
    dateRange('executeBeginTime','executeEndTime');
    $("#executeBeginTime").datebox('setValue',datastr);
    $("#executeEndTime").datebox('setValue',datastr);
    
}

var url;
// 新增
function addDot() {
	//驾驶证附件
	driverLicensePhoto="";
	// 行驶证附件
	drivingLicensePhoto="";
	// 身份证正面
	idFrontPhoto="";
	// 通行证附件
	passCheckPhoto="";
	// 运营证附件
	operationCertificate="";
	// 身份证反面
	idSidePhoto="";
	clearPicIds();
	if(getCapacityCode=="" || getCapacityCode == null){
	$.ajax({
		url : rootPath + "/dotAbility/getCapacityCode.do",
		success : function(data) {
			if (data != null && data != "") {
				getCapacityCode=data;
				var date = new Date();
				var datastr = date.getFullYear() + "-" + (date.getMonth() + 1)
						+ "-" + (date.getDate());
				
				openDialog("dlgDotAility", '新增');
				$("#formLineClass").form('clear');
				$("#formLineClass").form('load', {
					'capacityCode':getCapacityCode
				});
				$("#formLineClass").form('load', {
					'buyStatus':'01'
				});
				$("#startTime").datebox('setValue',datastr);
				 $("#endTime").datebox('setValue',datastr);
				 $("#createTime").datebox('setValue',datastr);
				 $("#createEmp").textbox('setValue',empName);
				$("#capacityCode").textbox({
					disabled: true
				});
				//$('#buyStatus').combobox('enable'); 
				$("#buyStatus").textbox({disabled: true});
				$("#createEmp").textbox({disabled: true});
				$("#createTime").textbox({disabled: true});
			} else {

				showErrorMsg('服务器正忙！');
			}

		}

	})
	}else{
		var date = new Date();
		var datastr = date.getFullYear() + "-" + (date.getMonth() + 1)
				+ "-" + (date.getDate());
		
		openDialog("dlgDotAility", '新增');
		$("#formLineClass").form('clear');
		$("#formLineClass").form('load', {
			'capacityCode':getCapacityCode
		});
		$("#formLineClass").form('load', {
			'buyStatus':'01'
		});
		$("#startTime").datebox('setValue',datastr);
		 $("#endTime").datebox('setValue',datastr);
		 $("#createTime").datebox('setValue',datastr);
		 $("#createEmp").textbox('setValue',empName);
		$("#capacityCode").textbox({
			disabled: true
		});
		//$('#buyStatus').combobox('enable'); 
		$("#buyStatus").textbox({disabled: true});
		$("#createEmp").textbox({disabled: true});
		$("#createTime").textbox({disabled: true});
	}
}
function fmtDate(obj) {
	var date = new Date(obj);
	var y = 1900 + date.getYear();
	var m = "0" + (date.getMonth() + 1);
	var d = "0" + date.getDate();
	return y + "-" + m.substring(m.length - 2, m.length) + "-"
			+ d.substring(d.length - 2, d.length);
}
/* 打开编辑弹框 */
function openUpdateFreightDemand(index) {
	//驾驶证附件
	driverLicensePhoto="";
	// 行驶证附件
	drivingLicensePhoto="";
	// 身份证正面
	idFrontPhoto="";
	// 通行证附件
	passCheckPhoto="";
	// 运营证附件
	operationCertificate="";
	// 身份证反面
	idSidePhoto="";
	clearPicIds();
	/* 获取当前选择行 */
	var row = $('#tblDotAility').datagrid('getRows')[index];

	/*//TODO
	 * openDialog("dlgDotAility", '修改'); $('#formLineClass').form('load',row);
	 */
	if (row) {
		$.ajax({
			url : rootPath + "/dotAbility/findById.do",
			data : {
				'id' : row.id
			},
			success : function(msg) {
				if (msg.success) {
					var  val=msg.data.buyStatus;
					if (val!='01' && val !='02'){
						showErrorMsg('只有未报价和已报价的可以编辑！');
						return;
					}
					if (msg.data.passImageId == 0) {
						msg.data.passFlag == "";
					}
					if (msg.data.passFlag == 0) {
						msg.data.passFlag = '0';
					}
					if (msg.data.startTime != null && msg.data.startTime != ""
							&& msg.data.startTime != undefined) {
						msg.data.startTime = fmtDate(msg.data.startTime);
					}
					if (msg.data.endTime != null && msg.data.endTime != ""
							&& msg.data.endTime != undefined) {
						msg.data.endTime = fmtDate(msg.data.endTime);
					}
					if (msg.data.createTime != null
							&& msg.data.createTime != ""
							&& msg.data.createTime != undefined) {
						msg.data.createTime = fmtDate(msg.data.createTime);
					}
					/** ********************************************************************* */
					if (msg.data.driverLicensePhoto != null
							&& msg.data.driverLicensePhoto != "") {
						driverLicensePhoto = msg.data.driverLicensePhoto;
					}
					if (msg.data.drivingLicensePhoto != null
							&& msg.data.drivingLicensePhoto != "") {
						drivingLicensePhoto = msg.data.drivingLicensePhoto;
					}
					if (msg.data.idFrontPhoto != null
							&& msg.data.idFrontPhoto != "") {
						idFrontPhoto = msg.data.idFrontPhoto;
					}
					if (msg.data.passCheckPhoto != null
							&& msg.data.passCheckPhoto != "") {
						passCheckPhoto = msg.data.passCheckPhoto;
					}
					if (msg.data.operationCertificate != null
							&& msg.data.operationCertificate != "") {
						operationCertificate = msg.data.operationCertificate;
					}
					if (msg.data.idSidePhoto != null
							&& msg.data.idSidePhoto != "") {
						idSidePhoto = msg.data.idSidePhoto;
					}
					
					openDialog("dlgDotAility", '修改');
					$("#formLineClass").form('clear');
					row = msg.data;
					if (msg.data.carPlateNumber != null
							&& msg.data.carPlateNumber != '') {
						row.carPlateSurname = msg.data.carPlateNumber
								.substring(0, 1);
						row.carPlateEnd = msg.data.carPlateNumber.substring(1);

					}
					$("#formLineClass").form('load', row);
					$("#capacityCode").textbox({
						disabled : true
					});
					$('#buyStatus').combobox('disable');
					$("#createEmp").textbox({disabled: true});
					$("#createTime").textbox({disabled: true});
				} else {
					showErrorMsg(msg.message);
				}

			}

		})

	}
}

function getSelectMaxBuyStatus() {
	var maxStatus = 0;
	var selections = $('#tblDotAility').datagrid('getSelections');
	for (var int = 0; int < selections.length; int++) {
		if (selections[int].buyStatus != null
				|| selections[int].buyStatus != "") {
			if (selections[int].buyStatus > maxStatus) {
				maxStatus = selections[int].buyStatus;
			}
		}
	}
	return maxStatus;

}


/* 发送报价 */
function sendPrice() {
	var ids = getChecked();
	var selections = $('#tblDotAility').datagrid('getSelections');
	for (var int = 0; int < selections.length; int++) {
		var price=selections[int].purchasePrice;
		if(price=='' || price==null){
			showErrorMsg('没有固定成本，不允许发送报价');
			return;
		}else if(false==compareTime(selections[int].startTime,selections[int].endTime)){
			showErrorMsg('有效期时间有误！');
			return;
		}
		if (selections[int].buyStatus != null
				|| selections[int].buyStatus != "") {
			if(selections[int].buyStatus !='01' && selections[int].buyStatus !='02'){
				showErrorMsg('状态不对,不允许发送报价！');
				return;
			}
		}else{
			showErrorMsg('状态为空,不允许发送报价！');
			return;
		}
	}
	// 获取选中行的最大状态发送报价的状态只有 未报价/已报价
	
	if (ids == "" || ids == null) {
		showInfoMsg("请选择需要发送报价的行");
		return;
	}

	$.ajax({
		type : "POST",
		url : rootPath + "/dotAbility/updateSendByIds.do",
		data : {
			'ids' : ids
		},
		success : function(msg) {
			if (msg > 0) {
				showTips("报价发送成功");
			} else {
				showTips("报价发送失败")
			}

		}
	});

	// findDotAbilitybywhere();
	setTimeout(findDotAbilitybywhere, 50);

	// var buyStatus="1";

}
// 确认报价
function confirmPrice() {
	var ids = getChecked();
	// 获取选中行的最大状态
	var selections = $('#tblDotAility').datagrid('getSelections');
	for (var int = 0; int < selections.length; int++) {
		var price=selections[int].purchasePrice;
		if(price=='' || price==null){
			showErrorMsg('没有固定成本，不允许确认报价');
			return;
		}else if(false==compareTime(selections[int].startTime,selections[int].endTime)){
			showErrorMsg('有效期时间有误！');
			return;
		}
		if (selections[int].buyStatus != null
				|| selections[int].buyStatus != "") {
			if(selections[int].buyStatus !='03'){
				showErrorMsg('状态不对,不允许确认报价！');
				return;
			}
		}else{
			showErrorMsg('状态为空,不允许确认报价！');
			return;
		}
	}
	if (ids == "" || ids == null) {
		showInfoMsg("请选择需要确认报价的行");
		return;
	}
	// var buyStatus="3";

	$.ajax({
		type : "POST",
		url : rootPath + "/dotAbility/updateConfirmByIds.do",
		data : {
			'ids' : ids
		},
		success : function(msg) {
			if (msg > 0) {
				showTips("确认报价" + msg + "列发送成功");
			} else {
				showTips("确认报价发送失败")
			}
		}
	});
	setTimeout(findDotAbilitybywhere, 50);

}
// 终止选中的运力
function stopDot() {
	var ids = getChecked();
	var selections = $('#tblDotAility').datagrid('getSelections');
	for (var int = 0; int < selections.length; int++) 
	{
		var price=selections[int].purchasePrice;
		
		if (selections[int].buyStatus != null
				|| selections[int].buyStatus != "") {
			if(selections[int].buyStatus =='06' || selections[int].buyStatus =='07' || selections[int].buyStatus=='05'){
				showErrorMsg('状态不对,不允许终止运力！');
				return;
			}
		}else{
			showErrorMsg('状态为空,不允许终止运力！');
			return;
		}
	}
	if (ids == "" || ids == null) {
		showInfoMsg("请选择需要终止运力的行");
		return;
	}
	// var buyStatus="6";
	$.ajax({
		type : "POST",
		url : rootPath + "/dotAbility/updateStopByIds.do",
		data : {
			'ids' : ids
		},
		success : function(msg) {
			if (msg > 0) {
				showTips("终止运力成功");
			} else {
				showTips("终止运力失败")
			}
		}
	});
	setTimeout(findDotAbilitybywhere, 50);
}

/* 获取所有的选中行数 */

function getChecked() {
	var selections = $('#tblDotAility').datagrid('getSelections');
	// var ids = new Array();
	var ids = "";
	for (var int = 0; int < selections.length; int++) {
		ids = ids + selections[int].id;
		if (selections.length != int - 1) {
			ids = ids + ",";
		}
	}
	return ids
}

function getDaysInOneMonth(year, month){  
	 month = parseInt(month,10)+1;  
	 var d= new Date(year+"/"+month+"/0");  
	 return d.getDate();  
} 

/* 保存 */
function addOrUpdateDot() {
	/*
	 * var month=$('#startTime').datebox('getValue').substring(5,7); var
	 * year=$('#startTime').datebox('getValue').substring(0,4); var
	 * yearDate=366; if(month=="02"){ var monthDate=getDaysInOneMonth(year,02);
	 * if(monthDate==28){ yearDate=36; } } var startDate = new
	 * Date($('#startTime').datebox('getValue')).getTime(); var endDate = new
	 * Date($('#endTime').datebox('getValue')).getTime(); var
	 * differ=(endDate-startDate)/(1000*60*60*24); //alert(differ);
	 * if(differ>yearDate){ showErrorMsg('有效期时间段不能超过一年！'); return; }
	 */
	var startDate = new Date($('#startTime').datebox('getValue')).getTime();
	// 获取当前年数
	var year = $('#startTime').datebox('getValue').substring(0, 4);
	// 获取明年
	year = parseInt(year) + 1;
	// 获取明年的今天
	var nextYear = year + $('#startTime').datebox('getValue').substring(4, 10);
	// 获取明年的今天的时间错
	nextYear = new Date(nextYear).getTime();
	var endtime = new Date($('#endTime').datebox('getValue')).getTime();
	if (endtime > nextYear) {


		showErrorMsg('有效期时间段不能超过一年！');
		return;
	}
	if(startDate>endtime){
		showErrorMsg('有效期开始时间不能大于结束时间！');
		return;
	}
	/** ************************************************************ */
	if (getFileId("DRIVER_DRIVING_LICENCE")) {
		$("#driverLicensePhoto").val(getFileId("DRIVER_DRIVING_LICENCE"));
	}
	if (getFileId("CAR_DRIVING_LICENCE")) {
		$("#drivingLicensePhoto").val(getFileId("CAR_DRIVING_LICENCE"));
	}
	if (getFileId("DRIVER_ID_CARD")) {
		$("#idFrontPhoto").val(getFileId("DRIVER_ID_CARD"));
	}
	if (getFileId("CAR_TRAFFIC_PERMIT")) {
		$("#passCheckPhoto").val(getFileId("CAR_TRAFFIC_PERMIT"));
	}
	if (getFileId("CAR_OPERATION_CERTIFICATE")) {
		$("#operationCertificate").val(getFileId("CAR_OPERATION_CERTIFICATE"));
	}
	if (getFileId("DRIVER_ID_CARD_OPP")) {
		$("#idSidePhoto").val(getFileId("DRIVER_ID_CARD_OPP"));
	}
	var carPlateNumber = $("#carPlateSurname").val()+ $("#carPlateEnd").val();
	var regex = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/i.test(carPlateNumber);
	if(regex==false || regex==''){
		return showErrorMsg('车牌号格式不正确');
	}
	debugger
	var carTypeValue=$("#carType").combogrid('getText');
	
	if ($("#myid").val() == null || $("#myid").val() == "") {
		
		

		$('#formLineClass')
				.form(
						'submit',
						{
							url : rootPath + "/dotAbility/addOne.do",
							onSubmit : function(param) {

								param.capacityCode = $("#capacityCode").val();
								param.carPlateNumber = $("#carPlateSurname")
										.val()
										+ $("#carPlateEnd").val();
								param.createEmp=empName;
								param.createTime=formatTime(new Date);
								param.buyStatus='01'; //默认未报价
								if(carTypeValue){
									param.carTypeValue=carTypeValue;
								}
								if ($(this).form('validate')) {
									uceLoading.show("请稍后...");
									return true;
								}
								return false;
							},
							success : function(data) {
								uceLoading.close();
								if (isEmptyObject(data)) {
									showErrorMsg('服务器端异常');
									return;
								}
								var result = data;
								if (typeof data == 'string') {
									result = eval('(' + data + ')');
								}
								if (result.success) {
									// 成功处理。。。
									clearPicIds();
									closeDialog("dlgDotAility");
									$('#tblDotAility').datagrid('reload');
									showTips(result.message, 'success');
									if ($(this).form('options').task) {
										$(this).form('options').task.call(this,
												result);
									}
									getCapacityCode=""

								} else {
									showError(result);
								}
							},
							error : function(data, statusText, xhr) {
								uceLoading.close();
							}
						});
	} else {
		$('#formLineClass')
				.form(
						'submit',
						{
							url : rootPath + "/dotAbility/updateOne.do",
							onSubmit : function(param) {
								param.updateTime = formatTime(new Date);
								param.updateEmp = empName;
								param.carPlateNumber = $("#carPlateSurname")
										.val()
										+ $("#carPlateEnd").val();
								if(carTypeValue){
									param.carTypeValue=carTypeValue;
								}
								if ($(this).form('validate')) {
									uceLoading.show("请稍后...");
									return true;
								}
								return false;
							},
							success : function(data) {
								uceLoading.close();
								if (isEmptyObject(data)) {
									showErrorMsg('服务器端异常');
									return;
								}
								var result = data;
								if (typeof data == 'string') {
									result = eval('(' + data + ')');
								}
								if (result.success) {
									// 成功处理。。。
									clearPicIds();
									closeDialog("dlgDotAility");
									$('#tblDotAility').datagrid('reload');
									showTips(result.message, 'success');
									if ($(this).form('options').task) {
										$(this).form('options').task.call(this,
												result);
									}

								} else {
									showError(result);
								}
							},
							error : function(data, statusText, xhr) {
								uceLoading.close();
							}
						});
	}
	clearPicIds();

}
/**
 * 数字格式化保留两位小数
 * @param val
 * @returns {Number}
 */
function formatNumber(val) {
	if (val) {
		return (Math.round(val * 100) / 100).toFixed(2);
	}
}

/*function compareTime(start,end){
	
	var startDate = new Date($('#'+start).datebox('getValue')).getTime();
	// 获取当前年数
	var year = $('#'+start).datebox('getValue').substring(0, 4);
	// 获取明年
	year = parseInt(year) + 1;
	// 获取明年的今天
	var nextYear = year + $('#'+start).datebox('getValue').substring(4, 10);
	// 获取明年的今天的时间错
	nextYear = new Date(nextYear).getTime();
	var endtime = new Date($('#'+end).datebox('getValue')).getTime();
	if (endtime > nextYear) {

		return  false;
	}else if(startDate > endtime){
		return false;
	}
	return true;
	
}*/
/**
 * 比较俩个时间后面时间如果比前面时间大于1年返回false;后面时间如果比前面时间小，返回false
 * 
 */
function compareTime(start,end){
	
	if(start != null && end != null){
		var  endDate=formatDate(start);
		// 获取当前年数
		var year = endDate.substring(0, 4);
		// 获取明年
		year = parseInt(year) + 1;
		// 获取明年的今天
		var nextYear = year +endDate.substring(4, 10);
		// 获取明年的今天的时间错
		nextYear = new Date(nextYear).getTime();
		
		if(end > nextYear){
			return  false;
		}else if(start > end){
			return  false;
		}else {
			return true;
		}
		
	}else {
		return  false
	}
	return true
}


