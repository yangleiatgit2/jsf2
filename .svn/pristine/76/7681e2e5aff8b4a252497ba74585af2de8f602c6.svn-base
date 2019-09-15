

$(function() {
	//查询界面空间
	//dateRange("executeBeginTime", "executeEndTime");
	var driverCardUpload="true";
	/* 加载主界面grid */
	var columns = [ [
			{field : "id",checkbox : "true"},
			{field : 'des',title : '操作',align : 'center',width : 40,formatter : function(value, rec, index) {
					return '<a class="icon-line iconfont uce-edit" title="编辑" onclick="openUpdateFreightDemand(\'' + index + '\')" href="javascript:void(0)"></a>';
				}
			},
			{field : 'truckType',title : '车辆类型',align : 'center',width : 70,  formatter : formatTip},
			{field : 'purchaseFee',title : '车辆购置费(元)',align : 'center',width :100, formatter :formatDouble},
			{field : 'insurancePremium',title : '保险费(元/年)',align : 'center',width : 100,formatter : formatDouble},
			{field : 'driverWages',title : '司机(元/年)',align : 'center',width : 80,formatter : formatDouble}, 
			{field : 'fuleCose',title : '油费(元/月)',align : 'center',width : 80,formatter : formatDouble	},
			{field : 'maintanceCost',title : '维修费(元/月)',align : 'center',width : 80,formatter : formatDouble},
			{field : 'highSpeedCost',title : '高速费(元/月)',align : 'center',width : 80,formatter : formatDouble},
			{field : 'otherCost',title : '其他费用(元/月)',align : 'center',width : 100,formatter :  formatDouble	},
			{field : 'conversionCoefficient',title : '折算系数',align : 'center',width : 80,formatter : formatDouble},
			{field : 'monthCost',title : '折算费用(元)',align : 'center',width : 80,formatter : formatDouble}, 
			] ];

	var dataGridParams = {
		url : '',
		pageSize : 10,
		toolbar : '#tlbCostMaintenance',
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
	initDictDatas('CAR_TYPE');
	
	/* 数据字典加载 */
	uceDictCombobox('findtruckType', 'CAR_TYPE');
	uceDictCombobox('truckType', 'CAR_TYPE');
	/* 加载表单数据 */
	newloadGrid('tblCostMaintenance', columns, dataGridParams);

	
	
});
/**
 * 补齐两位小数点
 */
function formatDouble(val){
	if(val!=null){
		return val.toFixed(2);
	}
        
	
}
/*根据查询条件查询*/
function findCostMaintenancebywhere() {
	//
		 var datagrid = $('#tblCostMaintenance').datagrid('options');
		 
		datagrid.url = rootPath + "/costMaintenance/findByWhere.do";
		
		$('#tblCostMaintenance').datagrid('load',
				serializeFormObj("formFindCostMaintenance"));
	
}
//更新或者新增
function addOrUpdateCost(){
	url = rootPath + "/costMaintenance/addOrUpdateCost.do";
	var costMaintenance={
			id:$("#myid").val(),
			truckType:$("#truckType").val(),
			purchaseFee:$("#purchaseFee").val(),
			insurancePremium:$("#insurancePremium").val(),
			driverWages:$("#driverWages").val(),
			fuleCose:$("#fuleCose").val(),
			maintanceCost:$("#maintanceCost").val(),
			highSpeedCost:$("#highSpeedCost").val(),
			otherCost:$("#otherCost").val(),
			coefficient:$("#coefficient").val(),
			monthCost:$("#monthCost").val(),
			createTime:'',
			updateTime:'',
	}
	
	//costMaintenance.createTime = formatTime(costMaintenance.createTime);
	if(costMaintenance.id!=null || costMaintenance.id!="" ){
		costMaintenance.updateTime=formatTime(new Date);
	}else{
		costMaintenance.createTime=formatTime(new Date);
	}
	$.ajax({
		url:url,
		type:'GET',
		dataType:'josn',
		data:costMaintenance,
		success: function(msg){
			 //  alert(msg);
			//closeDialog("dlgDotAility");
			
			setTimeout(findCostMaintenancebywhere, 50);
	   }
		
		
	})
	closeDialog("dlgDotAility");
}
/*重置查询条件*/
function resetCostMaintenance(){
	//cancelDateRange('executeBeginTime','executeEndTime')
	$('#formFindCostMaintenance').form('reset');
}

var url;
//新增
function addCost(){
	openDialog("dlgDotAility", '新增');
	$("#formLineClass").form('clear');
}
/*更新*/
function openUpdateFreightDemand(index){
	// 获取当前选择行 
	var row = $('#tblCostMaintenance').datagrid('getRows')[index];
	if (row) {
		openDialog("dlgDotAility", '修改');
		$("#formLineClass").form('clear');
		$("#formLineClass").form('load', row);		
		//url = rootPath + "/dotAbility/addCapacityManagement.do";
	}
}

/*删除*/
function deleteCost(){
	var ids=getChecked();
	
	if(ids!=null || ids!=""){
		$.ajax({
			   type: "GET",
			   url: rootPath + "/costMaintenance/deleteCostByIds.do",
			   data:{'ids':ids},
			   success: function(msg){
					  // alert(msg);
				   if(msg>0){
					   setTimeout(findCostMaintenancebywhere, 50);
					   alert("删除成功！");
				   }else{
					   alert("删除失败！");
				   }
			   }
			});
		findDotAbilitybywhere();
	}else{
		alert("请选中你需要更改的列！");
	}
	//var buyStatus="1";
	
		
}


/*获取所有的选中行数*/

function getChecked(){
	var selections = $('#tblCostMaintenance').datagrid('getSelections');
	//var ids = new Array();
	var ids="";
	for (var int = 0; int < selections.length; int++) {
		ids=ids+selections[int].id;
		if(selections.length!=int-1){
			ids=ids+",";
		}
	}
	return ids
}
