$(function() {
	//初始化数据字典
	//initDictDatas(''/*数据字典编号*/);
	/* 数据字典加载 */
	//uceDictCombobox(''/*控件id*/, ''/*数据字典编号*/);
	initDictDatas("BUSINESS_MODE,LINEWORK_STATUS,DEMAND_TYPE,TYPE_OF_ADJUSTMENT,SHIFT_SOURCES,CAR_TYPE,SHFIT_TYPE");
	//班次状态数据字典
	uceDictCombobox('status', 'LINEWORK_STATUS');
	//业务模式数据字典
	uceDictCombobox('businessMode', 'BUSINESS_MODE');
	
	//需求类型
	uceDictCombobox('requiType', 'DEMAND_TYPE');
	
	//调整类型
	uceDictCombobox('adjustType', 'TYPE_OF_ADJUSTMENT');
	
	//班次来源
	uceDictCombobox('resource', 'SHIFT_SOURCES');
	
	//车型
	uceDictCombobox('carType', 'CAR_TYPE');
	
	//班次类型
	uceDictCombobox('lineGroupType', 'SHFIT_TYPE');
	orgCombogrid('startOrgCode',{queryParams:{orgType:ORG_TYPE_OPERATE_CENTER+','+ORG_TYPE_SITE,status: ORG_ENABLED}});
	orgCombogrid('endOrgCode',{queryParams:{orgType:ORG_TYPE_OPERATE_CENTER+','+ORG_TYPE_SITE,status: ORG_ENABLED}});
	
	/*
	 * 查看详情里的数据字典
	 * */
	uceDictCombobox("form-status","LINEWORK_STATUS");
	uceDictCombobox("form-resource","SHIFT_SOURCES");
	uceDictCombobox("form-carType","CAR_TYPE");
	uceDictCombobox("form-lineGroupType","SHFIT_TYPE");
	uceDictCombobox("form-businessMode","BUSINESS_MODE");
	uceDictCombobox("form-requiType","DEMAND_TYPE");
//	orgCombogrid('form-startOrgCode',{queryParams:{orgType:ORG_TYPE_OPERATE_CENTER+','+ORG_TYPE_SITE,status: ORG_ENABLED}});
//	orgCombogrid('form-endOrgCode',{queryParams:{orgType:ORG_TYPE_OPERATE_CENTER+','+ORG_TYPE_SITE,status: ORG_ENABLED}});
	
	var columns = [[
		{field : 'lineGroupCode',title : '班次编号',align : 'center',formatter : function(value,rec,index){
			return '<a class="editcls" onclick="showDetails(\''
			+ index
			+ '\')"  href="javascript:void(0)">'
			+ value + '</a>';
		}},
		{field : 'lineGroupName',title : '班次名称',align : 'center',formatter : formatTip},
		{field : 'totalVolume',title : '班次总体积',align : 'center',formatter : formatTip},
		{field : 'totalWeight',title : '班次总重量',align : 'center',formatter : formatTip},
		{field : 'departTime',title : '出发时间',align : 'center',formatter : formatTime},
		{field : 'arrivalTime',title : '到达时间',align : 'center',formatter : formatTime},
		{field : 'chargeStartTime',title : '计费时间起',align : 'center',formatter : formatTime},
		{field : 'chargeEndTime',title : '计费时间止：',align : 'center',formatter : formatTime},
		{field : 'loadFactor',title : '满载率',align : 'center',formatter : formatTip},
		{field : 'businessMode',title : '业务模式',align : 'center', formatter:function(value){
			return getTypeNameByCode("BUSINESS_MODE", value,formatTip);
		}},
		{field : 'adjustType',title : '调整类型',align : 'center', formatter:function(value){
			return getTypeNameByCode("TYPE_OF_ADJUSTMENT", value,formatTip);
		}},
		
		{field : 'carType',title : '车型',align : 'center', formatter:function(value){
			return getTypeNameByCode("CAR_TYPE", value,formatTip);
		}},
		{field : 'totalTime',title : '运行时间(分钟)',align : 'center',formatter : formatTip},
		{field : 'lineGroupDistance',title : '路线距离',align : 'center',formatter : formatTip},
		{field : 'startOrgName',title : '始发站',align : 'center',formatter : formatTip},
		
		{field : 'endOrgName',title : '目的站',align : 'center',formatter : formatTip},
		/*{field : 'costPrice',title : '成本价',align : 'center',formatter : formatTip},
		{field : 'sellingPrice',title : '报价',align : 'center',formatter : formatTip},*/
		{field : 'requiType',title : '需求类型',align : 'center',formatter:function(value){
			return getTypeNameByCode("DEMAND_TYPE", value,formatTip);
		}},
		{field : 'status',title : '班次状态',align : 'center',formatter:function(value){
			return getTypeNameByCode("LINEWORK_STATUS", value,formatTip);
		}},
		{field : 'requiCombinCode',title : '需求组合号',align : 'center',formatter : formatTip},
		{field : 'drivingPlanCombinCode',title : '发车计划号',align : 'center',formatter : formatTip},
		{field : 'orderCombinCode',title : '订单组合号',align : 'center',formatter : formatTip},
		{field : 'resource',title : '班次来源',align : 'center',formatter:function(value){
			return getTypeNameByCode("SHIFT_SOURCES", value,formatTip);
		}}

	]];
	var dataGridParams = {
		url : '../workScheduleRule/findWorkByPage.do',
		pageSize : 10,
		toolbar : '#workCont',
		singleSelect : 'true',
		fitColumns : 'true'
	}
	/* 加载表单数据 */
	newloadGrid('workList', columns, dataGridParams);
	
	
	var columnsDetail = [[
	        		{field : 'wayPointName',title : '途经站点',align : 'center',width : 130,formatter : formatTip},
	        		{field : 'wayPointZoneName',title : '站点所属区域',align : 'center',width : 130,formatter : formatTip},
	        		{field : 'volume',title : '货物方数',align : 'center',width : 130,formatter : formatTip},
	        		{field : 'weight',title : '货物重量',align : 'center',width : 180,formatter : formatTip},
	        		{field : 'endTime',title : '到达时间',align : 'center',width : 150,formatter : formatTime},
	        		{field : 'loadUnloadTime',title : '装卸货耗时(分钟)',align : 'center',width : 150,formatter : formatTip},
	        		{field : 'distance',title : '运行里程',align : 'center',width : 200,formatter : formatTip},
	        		{field : 'runingTime',title : '运行耗时',align : 'center',width : 150,formatter : formatTip},
	        		{field : 'nextWayDistance',title : '距离下一站点里程',align : 'center',width : 150,formatter : formatTip},
	        	]];
 	var dataGridParamsDetail = {
    		url : '',
    		pageSize : 10,
    		toolbar : '#workCont',
    		singleSelect : 'true',
    		fitColumns : 'true'
    	}
    	/* 加载表单数据 */
    	newloadGrid('workListDetail', columnsDetail, dataGridParamsDetail);
	
		var insertWorkDetail={
				url:'',
				pageSize:10,
				singleSelect:true,
				fitColumns:true,
				fit:true
		}
	newloadGrid("insertWorkDetail",columnsDetail,insertWorkDetail);

 
	    $("#workList").datagrid({  
	        //双击事件  
	        onDblClickRow: function (index, row) {  
	        	var 	lineGroupCode = row.lineGroupCode;
	          	var dataGridParamsDetail = {
		        		url : '../workScheduleRule/findWorkDetailByPage.do?lineGroupCode='+lineGroupCode,
		        		pageSize : 10,
		        		toolbar : '#tlbIAConf1',
		        		singleSelect : 'true',
		        		fitColumns : 'true'
		        	}
		        	/* 加载表单数据 */
		        	newloadGrid('workListDetail', columnsDetail, dataGridParamsDetail);
		
		
	        }  
	    });  
  
	//机构下拉菜单
	orgCombogrid('stardot',{queryParams:{orgType:ORG_TYPE_OPERATE_CENTER+','+ORG_TYPE_SITE,status: ORG_ENABLED}});
	orgCombogrid('enddot',{queryParams:{orgType:ORG_TYPE_OPERATE_CENTER+','+ORG_TYPE_SITE,status: ORG_ENABLED}});
	
	

});

function resetIAConf(){
	$('#workForm').form('reset');

}


//根据条件查询
function findWorkScheduleRule(){
	
	 var datagrid = $('#workList').datagrid('options');
		datagrid.url = "../workScheduleRule/findWorkByPage.do";
		var params=serializeFormObj('workForm');  
		params.pageQuery='pageQuery';
		$('#workList').datagrid('load',params);
		$('#workListDetail').datagrid('loadData', { total: 0, rows: [] });  
}
var parameter;

function insertwork(){
	editIndex = undefined;
	reset();
	initDictDatas("BUSINESS_MODE,LINEWORK_STATUS,DEMAND_TYPE,TYPE_OF_ADJUSTMENT,SHIFT_SOURCES,CAR_MODEL,SHFIT_TYPE");
	//班次状态数据字典
	uceDictCombobox('status', 'LINEWORK_STATUS');
	//业务模式数据字典
	uceDictCombobox('businessMode', 'BUSINESS_MODE');
	
	//需求类型
	uceDictCombobox('requiType', 'DEMAND_TYPE');
	
	//调整类型
	uceDictCombobox('adjustType', 'TYPE_OF_ADJUSTMENT');
	
	//班次来源
	uceDictCombobox('resource', 'SHIFT_SOURCES');
	
	//车型
	uceDictCombobox('carType', 'CAR_MODEL');
	
	//班次类型
	uceDictCombobox('lineGroupType', 'SHFIT_TYPE');
	
	orgCombogrid('startOrgCode',{queryParams:{orgType:ORG_TYPE_OPERATE_CENTER+','+ORG_TYPE_SITE,status: ORG_ENABLED}});
	orgCombogrid('endOrgCode',{queryParams:{orgType:ORG_TYPE_OPERATE_CENTER+','+ORG_TYPE_SITE,status: ORG_ENABLED}});
	
	 parameter = "insert";
	openDialog("insertDialog", '班次新增');

}
var volume = 0.0;
var weight = 0.0;

//新增一行校验
//var numIdx=null;
var editIndex = undefined;
//承载网点全局变量
var carBearing = undefined;
//加载成功后，将text写入控件中
function onLoadSuccess(data) {
	// alert(data)
}
//加载之前，从conbobox中获取text
function onBeforeLoad(param) {
	alert(param)
}//
//编辑之前
function onBeforeEdit(index, row) {
	// alert(index+row);
}
function endEditing() {
	if (editIndex == undefined) {
		return true
	}
	if ($('#insertWorkDetail').datagrid('validateRow', editIndex)) {
		var ed = $('#insertWorkDetail').datagrid('getEditor', {// 网点编号
			index : editIndex,
			field : 'wayPointName'
		});
		var productname = $(ed.target).combogrid('getText');
		$('#insertWorkDetail').datagrid('getRows')[editIndex]['orgName'] = productname;
		$('#insertWorkDetail').datagrid('endEdit', editIndex);
		$('#insertWorkDetail').datagrid('acceptChanges')
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}

//将界面数据清空
function reset() {
	$('#insertWorkDetail').datagrid('loadData', {
		total : 0,
		rows : []
	});
	$('#insertWorkDetail').form('clear');
}
function append() {
	currenrtrow  = undefined;
	if (endEditing()) {
		$('#insertWorkDetail').datagrid('appendRow', {});
		editIndex = $('#insertWorkDetail').datagrid('getRows').length - 1;
		$('#insertWorkDetail').datagrid('unselectRow', $('#insertWorkDetail').datagrid('getRows').length - 2);
		$('#insertWorkDetail').datagrid('selectRow', editIndex).datagrid(
				'beginEdit', editIndex);


		// 到达站
		var wayPointName = $('#insertWorkDetail').datagrid('getEditor',
				{
					index : editIndex == null ? 0 : editIndex,
					field : 'wayPointName'
				});

		$(wayPointName.target).combogrid(
				{
					onHidePanel : function() {
						var g = $(this).combogrid('grid'); // get datagrid
						// object
						var r = g.datagrid('getSelected'); // get the
						// selected row
						if (null != g || g.length > 0) {
							if (null == r || r.length == 0) {
								$(this).combogrid('clear');
								$(this).combogrid('setValue', '');
							} else {
								$(this).combogrid('setValue', r.baseOrgCode);
								$(this).combogrid('setText', r.orgName);
							}
						}
					},
					onShowPanel : function() {
						/* 解决datagrid q值、页码缓存问题, */
						var q = $(this).combogrid('getValue');
						if (!q) {
							$(this).combogrid("grid").datagrid("reload", {
								'q' : ''
							});
							$(this).combogrid("grid").datagrid('gotoPage', 1);
						}
					},
					onBeforeLoad : function(param) {
						if (param.q != undefined) {

							textRow = param.q;
							currenrtrow = '';

						} else {
							textRow = $(wayPointName.target).combogrid(
									'getText');
						}

						console.log(textRow);
					},
					onLoadSuccess : function(data) {
						console.log(currenrtrow);
						if (textRow != '') {
							$(wayPointName.target).combogrid('setText',
									textRow);
						} else {
							$(wayPointName.target).combogrid('setValue',
									currenrtrow.wayPointName);
							if (currenrtrow.orgName) {

								$(wayPointName.target).combogrid(
										'setText', currenrtrow.orgName);
							} else {
								$(wayPointName.target).combogrid(
										'setText',
										currenrtrow.carryScreentoneName);
							}
						}

					}

				});
	}
}
//增加中删除
function removeit() {
	var rows = $('#insertWorkDetail').datagrid('getChecked');
	if (rows.length < 1) {
		showInfoMsg("请先选中一行！");
		return false;
	}
	confirmMsg("是否确认删除？", function() {
		if (rows.length > 0) {
			for (var i = 0; i < rows.length; i++) {
				// 将修改中删除的项标记出来
				if (rows[i].id != undefined) {
					if ($("#textDelectLong").val() == undefined
							|| $("#textDelectLong").val() == "") {
						$("#textDelectLong").val(rows[i].id);
					} else {
						var id = $("#textDelectLong").val();
						$("#textDelectLong").val(id + "," + rows[i].id);
					}
				}
				var result = $('#insertWorkDetail').datagrid('getRowIndex',
						rows[i]);
				$('#insertWorkDetail').datagrid('cancelEdit', result).datagrid(
						'deleteRow', result);
			}
		}
		editIndex = undefined;
	});
	// alert( '行信息 ：' + row.index +'复选框 index：'+rows.index+ '删除的index： ' +
	// editIndex );
	// for (var int = 0; int < rows.length; int++) {
	//		
	// }
}
//将所行信息绑定到gridid里面
function accept() {
	if (endEditing()) {
		$('#insertWorkDetail').datagrid('acceptChanges');
	}
}
var currenrtrow = undefined;

var textRow = -1;
//选中数据双击修改

//全局变量   当修改时选择下拉过后不选中值  将鼠标移开 使数据不清空
var currenrtrowwayPointCode = undefined;
var currenrtrowwayPointName = undefined;
function onClickRow(index, row) {
	if (editIndex != index) {
		if (endEditing()) {
			currenrtrowwayPointName = row.orgName;
			currenrtrowwayPointCode = row.wayPointName;
			currenrtrow = row;
			$('#insertWorkDetail').datagrid(
					'beginEdit', index);
			// 到达站
			var wayPointName = $('#insertWorkDetail').datagrid(
					'getEditor', {
						index : index == null ? 0 : index,
						field : 'wayPointName'
					});
			$(wayPointName.target).combogrid(
					{
						onHidePanel : function() {
							
							var q = $(this).combogrid('getText');
							if(q==currenrtrowwayPointName ){
								$(wayPointName.target).combogrid('setValue',currenrtrowwayPointCode);
								$(wayPointName.target).combogrid('setText',currenrtrowwayPointName);
							}else{
								$(this).combogrid('clear');
								$(this).combogrid('setValue', '');
							}
						},
						onShowPanel : function() {
							/* 解决datagrid q值、页码缓存问题, */
							var q = $(this).combogrid('getValue');
							if (!q) {
								$(this).combogrid("grid").datagrid("reload", {
									'q' : ''
								});
								$(this).combogrid("grid").datagrid('gotoPage',
										1);
							}
						},
						onBeforeLoad : function(param) {
							if (param.q != undefined) {

								textRow = param.q;
								currenrtrow = '';

							} else {
								textRow = $(wayPointName.target)
										.combogrid('getText');
							}
							console.log(textRow);
						},
						onLoadSuccess : function(data) {
							console.log(currenrtrow);
							if (textRow != '') {
								$(wayPointName.target).combogrid(
										'setText', textRow);
							} else {
								$(wayPointName.target).combogrid(
										'setValue',
										currenrtrow.wayPointName);
								if (currenrtrow.orgName) {

									$(wayPointName.target).combogrid(
											'setText', currenrtrow.orgName);
								} else {
									$(wayPointName.target).combogrid(
											'setText',
											currenrtrow.carryScreentoneName);
								}
							}
						},
						onSelect : function(index, row){
							currenrtrowwayPointCode=row.baseOrgCode;
							currenrtrowwayPointName=row.orgName;
						},
					});
			editIndex = index;
		} else {
			setTimeout(function() {
				$('#insertWorkDetail').datagrid('selectRow', editIndex);
			}, 0);
		}
	}
}
//结束编辑
function onEndEdit(index, row) {
$("#totalVolume").numberbox("setValue", row.volume);
$("#totalWeight").numberbox("setValue", row.weight);
	var ed = $(this).datagrid('getEditor', {
		index : index,
		field : 'wayPointName'
	});
	row.productname = $(ed.target).combobox('getText');
}



function saveLine(){
	
	accept(); 
	
	var condition = serializeFormObj('formLine');

	var url = '../workScheduleRule/insertWorkDetail.do';
	
	 var rows = $('#insertWorkDetail').datagrid('getRows');
	 
	 condition.parameter = parameter;
	condition.startOrgName=$("#startOrgCode").combogrid('getText');
	condition.endOrgName = $("#endOrgCode").combogrid('getText');
	 condition.strJson = JSON.stringify(rows);
	 console.log(JSON.stringify(rows));
	$.ajax({
        url: url,
        data:condition,
        task: function(data,statusText,xhr){
        
        },
        fail: function(data,statusText,xhr){
          
        }
      });
	
	

}


function  update(){
	initDictDatas("BUSINESS_MODE,LINEWORK_STATUS,DEMAND_TYPE,TYPE_OF_ADJUSTMENT,SHIFT_SOURCES,CAR_MODEL,SHFIT_TYPE");
	//班次状态数据字典
	uceDictCombobox('status', 'LINEWORK_STATUS');
	//业务模式数据字典
	uceDictCombobox('businessMode', 'BUSINESS_MODE');
	
	//需求类型
	uceDictCombobox('requiType', 'DEMAND_TYPE');
	
	//调整类型
	uceDictCombobox('adjustType', 'TYPE_OF_ADJUSTMENT');
	
	//班次来源
	uceDictCombobox('resource', 'SHIFT_SOURCES');
	
	//车型
	uceDictCombobox('carType', 'CAR_MODEL');
	
	//班次类型
	uceDictCombobox('lineGroupType', 'SHFIT_TYPE');
	orgCombogrid('startOrgCode',{queryParams:{orgType:ORG_TYPE_OPERATE_CENTER+','+ORG_TYPE_SITE,status: ORG_ENABLED}});
	orgCombogrid('endOrgCode',{queryParams:{orgType:ORG_TYPE_OPERATE_CENTER+','+ORG_TYPE_SITE,status: ORG_ENABLED}});
	 $("#parameter").textbox("setValue", "update");
	var rows = $('#workList').datagrid('getSelected');
	rows.chargeStartTime=formatTime(rows.chargeStartTime);
	rows.chargeEndTime=formatTime(rows.chargeEndTime);
	rows.departTime=formatTime(rows.departTime);
	rows.arrivalTime=formatTime(rows.arrivalTime);
	$("#formLine").form('clear');
	$("#formLine").form('load', rows);	
	var lineGroupCode = rows.lineGroupCode;
	function updateCarBearInfo(lineGroupCode) {
	}
		var url = "../workScheduleRule/queryByWorkDetailId.do";
		uceAjax(url,{lineGroupCode :lineGroupCode},
				function(data) {
					if (data.data) {
						console.log(data.data);
						$('#insertWorkDetail').datagrid('loadData', data.data);
						for (var i = 0; i < data.data.length; i++) {
							$('#insertWorkDetail').datagrid('beginEdit', i);

							editIndex = i;
							var ed = $('#insertWorkDetail').datagrid('getEditor', {
								index : editIndex,
								field : 'wayPointName'
							});
							var wayPointName = $(ed.target).combobox('getValue');

							
							var item = {};
							item.orgName = data.data[i].wayPointName;
							item.baseOrgCode = data.data[i].wayPointCode;
							
							$('#insertWorkDetail').datagrid('getRows')[editIndex]['orgName'] = item.orgName ;
							$('#insertWorkDetail').datagrid('getRows')[editIndex]['wayPointName'] = item.baseOrgCode;
							$('#insertWorkDetail').datagrid('getRows')[editIndex]['endTime'] = formatTime(data.data[i].endTime);
							$('#insertWorkDetail').datagrid('getRows')[editIndex]['id'] = formatTime(data.data[i].id);
							$('#insertWorkDetail').datagrid('getRows')[editIndex]['loadUnloadTime'] = data.data[i].loadUnloadTime;
							$('#insertWorkDetail').datagrid('getRows')[editIndex]['distance'] = data.data[i].distance;
							$('#insertWorkDetail').datagrid('getRows')[editIndex]['runingTime'] = data.data[i].runingTime;
							$('#insertWorkDetail').datagrid('getRows')[editIndex]['nextWayDistance'] = data.data[i].nextWayDistance;
							$('#insertWorkDetail').datagrid('endEdit', editIndex);
							editIndex = undefined;
						}
					}
				}, "post");
 	
    	/* 加载表单数据 */
    	//newloadGrid('insertWorkDetail', "", dataGridParamsDetail);
		parameter ="update";
	openDialog("insertDialog", '班次修改');
	
}
function searchDriver(value,name){
	var url = "../workScheduleRule/queryByWorkDetailId.do";
	uceAjax(url,
			function(data) {
				if (data.data) {
					
					
				}
			}, "post");
    }

function departurePlan(){
	var rows = $('#workList').datagrid('getSelected');
	if(rows==null){
		$.messager.alert("提示", "请选择一条数据", "info");
		 return false;
	}
	if(rows.status=="03"){
		 $.messager.alert("提示", "该班次已终止,不能生成发车计划", "info");
		 return false;
	}
	if(rows.status=="02"){
		 $.messager.alert("提示", "该班次已生成发车计划，请勿重复操作", "info");
		 return false;
	}
	var carType=rows.carType;
	//TODO
	var rows = $('#workList').datagrid('getSelected');
	
	 var carVolume = rows.totalVolume;
	carCombogrid("plateNumber",{carVolume:carVolume})
	driverCombogrid("driverPhone",{onSelect:test})
	openDialog("departurePlan", '生成发车计划');	
}

function  savedeparTurePlan(){
	var driverPlanNumber = $('#plateNumber').combogrid("grid").datagrid('getSelected');
	var rows = $('#workList').datagrid('getSelected');
	var dirvingPlan = serializeFormObj('planFrom');
	dirvingPlan.dirverName=$('#driverPhone').combobox('getText');
	var g = $('#driverPhone').combogrid('grid');	// 获取数据表格对象
	var r = g.datagrid('getSelected');
	dirvingPlan.driverPhone=r.mobilePhone;
	//dirvingPlan.driverPhone=$('#driverPhone').combobox('getValue');
	dirvingPlan.plateNumber = $('#plateNumber').combobox('getText');
	var a = $('#plateNumber').combogrid('grid'); // 获取数据表格对象
	var b = a.datagrid('getSelected');
	dirvingPlan.carCode=b.carNumber;
	dirvingPlan.departTime =formatTime(rows.departTime);
	dirvingPlan.arrivalTime = formatTime(rows.arrivalTime);
	dirvingPlan.dirverDistance = rows.lineGroupDistance;
	dirvingPlan.startOrgCode = rows.startOrgCode;
	dirvingPlan.startOrgName = rows.startOrgName;
	dirvingPlan.endOrgCode = rows.endOrgCode;
	dirvingPlan.endOrgName = rows.endOrgName;
	dirvingPlan.loadingRate = rows.loadFactor;
	dirvingPlan.demandType = rows.requiType;
	dirvingPlan.demandCombinCode=rows.requiCombinCode;
	dirvingPlan.orderCombinCode = rows.orderCombinCode;
	dirvingPlan.lineGroupCode = rows.lineGroupCode;
	dirvingPlan.carType   = b.carType;
	dirvingPlan.businessMode = rows.businessMode;
	dirvingPlan.quotePrice   =  rows.sellingPrice;
	dirvingPlan.costPrice  = rows.costPrice;
	dirvingPlan.lineGroupTotalVolume=rows.totalVolume;
	dirvingPlan.lineGroupTotalWeight = rows.totalWeight;
	dirvingPlan.adjustType =rows.adjustType;
	dirvingPlan.drivingTime  = rows.totalTime;
	dirvingPlan.utf2 = dirvingPlan.loadingRate;
	var url = "../workScheduleRule/savedeparTurePlan.do";
	$.ajax({
        url: url,
        data:dirvingPlan,
        task: function(data,statusText,xhr){
        	 $.messager.alert("提示", "发车计划已生成", "info");
        	 closeDialog('departurePlan');
        	 findWorkScheduleRule();
        },
        fail: function(data,statusText,xhr){
          
        }
      });
}

function test(e){
	/*console.log(JSON.stringify(e));*/
	var row = $('#driverPhone').combogrid("grid").datagrid('getSelected');
	console.log(JSON.stringify(row));
}

function stopShift(){
	var rows = $('#workList').datagrid('getSelected');
	if(rows==null){
		$.messager.alert("提示", "请选择一条数据", "info");
		 return false;
	}
	if(rows.status=="03"){
		 $.messager.alert("提示", "该班次已终止,请勿重复操作", "info");
		 return false;
	}
	
	
 	$.messager.confirm('提示', '是否终止该班次', function(r){
		if (r){
			var url = "../workScheduleRule/stopShift.do";	
			$.ajax({
		        url: url,
		        data:{id:rows.id,lineGroupCode :rows.lineGroupCode},
		        task: function(data,statusText,xhr){
		       	 $.messager.alert("提示", "班次终止成功！", "info");
					findWorkScheduleRule();
		        },
		        fail: function(data,statusText,xhr){
		          
		        }
		      });
		
		}
	});
	

}


function closeLine(){
	 closeDialog('departurePlan');
	closeDialog("insertDialog");
}


//###########################
/**
 * 根据编号查看详情
 */
function showDetails(index){
	var row=$("#workList").datagrid("getRows")[index];
//	setUpReadOnly(true);
	console.log(row);
	$("#formLine").form("clear");
	if(row.departTime)
		row.departTime=formatTime(row.departTime);
	if(row.arrivalTime)
		row.arrivalTime=formatTime(row.arrivalTime);
	if(row.createTime)
		row.createTime=formatTime(row.createTime);
	$("#formLine").form("load",row);
	var lineGroupCode=row.lineGroupCode;
	var opts=$("#insertWorkDetail").datagrid("options");
	opts.pageSize=50;
	opts.url= '../workScheduleRule/findWorkDetailByPage.do?lineGroupCode='+lineGroupCode;
	$("#insertWorkDetail").datagrid("reload");
//	$("#form-startOrgCode").combogrid("setValue",row.startOrgCode);
//	$("#form-startOrgCode").combogrid("setText",row.startOrgName);
//	$("#form-endOrgCode").combogrid("setValue",row.endOrgCode);
//	$("#form-endOrgCode").combogrid("setText",row.endOrgName);
	openDialog("insertDialog","查看");
}

/**
 * 设置readonly
 * @param flag
 */
function setUpReadOnly(flag){
	if(flag){
		$("#btnSaveLine").linkbutton("disable");
	}else{
		$("#btnSaveLine").linkbutton("enable");
	}
	$("#lineGroupCode").textbox({readonly:flag});
	$("#lineGroupName").textbox({readonly:flag});
	$("#status").textbox({readonly:flag});
	$("#departTime").datetimebox({readonly:flag});
	$("#arrivalTime").datetimebox({readonly:flag});
	$("#runingTime").numberbox({readonly:flag});
	$("#lineGroupDistance").numberbox({readonly:flag});
	$("#startOrgCode").textbox({readonly:flag});
	$("#endOrgCode").textbox({readonly:flag});
	$("#requiType").textbox({readonly:flag});
	$("#costPrice").numberbox({readonly:flag});
	$("#sellingPrice").textbox({readonly:flag});
	$("#totalTime").numberbox({readonly:flag});
	$("#totalVolume").numberbox({readonly:flag});
	$("#totalWeight").numberbox({readonly:flag});
	$("#chargeStartTime").datetimebox({readonly:flag});
	$("#chargeEndTime").datetimebox({readonly:flag});
	$("#adjustPrice").numberbox({readonly:flag});
	$("#requiCombinCode").textbox({readonly:flag});
	$("#orderCombinCode").textbox({readonly:flag});
	$("#drivingPlanCombinCode").textbox({readonly:flag});
	$("#adjustType").textbox({readonly:flag});
	$("#resource").textbox({readonly:flag});
	$("#carType").textbox({readonly:flag});
	$("#loadFactor").textbox({readonly:flag});
	$("#lineGroupType").textbox({readonly:flag});
	$("#businessMode").textbox({readonly:flag});
	
}

/**
 * 关闭dialog
 */
//function closeLine(){
//	closeDialog('insertDialog');
//}

