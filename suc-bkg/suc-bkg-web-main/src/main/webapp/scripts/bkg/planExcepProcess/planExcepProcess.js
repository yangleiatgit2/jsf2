$(function() {
	//初始化数据字典
	//initDictDatas(''/*数据字典编号*/);
	/* 数据字典加载 */
	//uceDictCombobox(''/*控件id*/, ''/*数据字典编号*/);
	initDictDatas("BUSINESS_MODE,DEPARTURE_STATUS,DEMAND_TYPE,TYPE_OF_ADJUSTMENT,SHIFT_SOURCES,CAR_MODEL,SHFIT_TYPE,ABNORMAL_STATE,DEPARTURE_STATUS,PLAN_DRIVER_STATUS,PLAN_SITE_STATUS");
	//班次状态数据字典
	uceDictCombobox('status', 'DEPARTURE_STATUS');
	//业务模式数据字典
	uceDictCombobox('businessMode', 'BUSINESS_MODE');
	
	//需求类型
	uceDictCombobox('demandType', 'DEMAND_TYPE');
	
	//调整类型
	uceDictCombobox('adjustType', 'TYPE_OF_ADJUSTMENT');
	
	//班次来源
	uceDictCombobox('resource', 'SHIFT_SOURCES');
	
	//车型
	uceDictCombobox('carType', 'CAR_MODEL');
	
	//班次类型
	uceDictCombobox('abnormalState', 'ABNORMAL_STATE');
	//发车计划状态
	uceDictCombobox('fmstatus', 'DEPARTURE_STATUS');
	//发车计划详情司机状态
	uceDictCombobox('fmplanDriverStatus', 'PLAN_DRIVER_STATUS');
	//发车计划详情网点状态
	uceDictCombobox('fmplanSiteStatus', 'PLAN_SITE_STATUS');
	
	
	uceDictCombobox('lineGroupType', 'SHFIT_TYPE');
	var columns = [[
		{field : 'des',title : '操作',align : 'center',width : 40,formatter : function(value, rec, index) {
			return '<a class="icon-line iconfont uce-edit" title="编辑" onclick="openUpdatePlan(\'' + index + '\')" href="javascript:void(0)"></a>';
		}
		},
		{field : 'drivingPlanCode',title : '发车计划号',align : 'center', formatter : formatTip},

		{field : 'status',title : '状态',align : 'center', formatter:function(value){
			return getTypeNameByCode("DEPARTURE_STATUS", value,formatTip);
		}},
		{field : 'dirverName',title : '司机',align : 'center', formatter : formatTip},
		{field : 'driverPhone',title : '司机手机号',align : 'center', formatter : formatTip},
		{field : 'plateNumber',title : '车辆',align : 'center', formatter : formatTip},
		{field : 'departTime',title : '出发时间',align : 'center', formatter : formatTime},
		{field : 'arrivalTime',title : '到达时间',align : 'center', formatter : formatTime},
		{field : 'lineGroupDistance',title : '线路距离',align : 'center', formatter : formatTip},
		{field : 'businessMode',title : '业务模式',align : 'center',  formatter:function(value){
			return getTypeNameByCode("BUSINESS_MODE", value,formatTip);
		}},
		{field : 'startOrgName',title : '始发站',align : 'center', formatter : formatTip},
		{field : 'endOrgName',title : '目的站',align : 'center', formatter : formatTip},
		{field : 'carType',title : '车型',align : 'center',  formatter:function(value){
			return getTypeNameByCode("CAR_MODEL", value,formatTip);
		}},
		{field : 'loadingRate',title : '装载率',align : 'center', formatter : formatTip},
		{field : 'demandType',title : '需求类型',align : 'center', formatter:function(value){
			return getTypeNameByCode("DEMAND_TYPE", value,formatTip);
		}},

		{field : 'lineGroupCode',title : '相关班次号',align : 'center', formatter : formatTip},
		{field : 'demandCombinCode',title : '需求组合号',align : 'center', formatter : formatTip},
		{field : 'orderCombinCode',title : '订单组合号',align : 'center', formatter : formatTip},
		{field : 'abnormalState',title : '是否有异常',align : 'center', formatter:function(value){
			return getTypeNameByCode("ABNORMAL_STATE", value,formatTip);
		}}
	]];
	var dataGridParams = {
		url : '../departurePlan/finddeparturePlanByPage.do',
		pageSize : 10,
		toolbar : '#tlbIAConfordepar',
		singleSelect : 'true',
		fitColumns : 'true'
	}
	/* 加载表单数据 */
	newloadGrid('departGrid', columns, dataGridParams);
	
	
	var columnsDetail = [[
					{field : 'des',title : '操作',align : 'center',width : 40,formatter : function(value, rec, index) {
						return '<a class="icon-line iconfont uce-edit" title="编辑" onclick="openUpdateDetal(\'' + index + '\')" href="javascript:void(0)"></a>';
					}
					},
	        		{field : 'wayPointName',title : '途经站点',align : 'center',formatter : formatTip},
	        		{field : 'planDriverStatus',title : '司机状态',align : 'center',formatter : formatTip},
	        		{field : 'planSiteStatus',title : '网点状态',align : 'center',formatter : formatTip},
	        		{field : 'forecastVolume',title : '预报货物方数',align : 'center',formatter : formatTip},
	        		{field : 'forecastWeight',title : '预报货物重量',align : 'center',formatter : formatTip},
	        		{field : 'actualVolume',title : '实际方数',align : 'center',formatter : formatTip},
	        		{field : 'actualWeight',title : '实际重量',align : 'center',formatter : formatTip},
	        		{field : 'siteNumber',title : '网点件数',align : 'center',formatter : formatTip},
	        		{field : 'weight',title : '中心件数',align : 'center',formatter : formatTip},
	        		{field : 'forecastEndTime',title : '预计达时间',align : 'center',formatter : formatTime},
	        		{field : 'actualEndTime',title : '实际到达时间',align : 'center',formatter : formatTime},
	        		{field : 'forecastLoadUnloadTine',title : '装卸货耗时(分钟)',align : 'center',formatter : formatTip},
	        		{field : 'forecastDistance',title : '计划里程',align : 'center',formatter : formatTip},
	        		{field : 'actualDistance',title : '实际里程',align : 'center',formatter : formatTip},
	        		{field : 'forecastRuningTime',title : '计划耗时',align : 'center',formatter : formatTip},
	        		{field : 'actualRunningTime',title : '实际耗时',align : 'center',formatter : formatTip},
	        		{field : 'siationEvalJudge',title : '站点评价',align : 'center',formatter : formatTip}

	        	]];
 	var dataGridParamsDetail = {
    		url : '',
    		pageSize : 10,
    		toolbar : '#tlbIAConfordetail',
    		singleSelect : 'true',
    		fitColumns : 'true'
    	}
    	/* 加载表单数据 */
    	newloadGrid('departDetailGrid', columnsDetail, dataGridParamsDetail);
	


 
	    $("#departGrid").datagrid({  
	        //双击事件  
	        onDblClickRow: function (index, row) {  
	        	var 	drivingPlanCode = row.drivingPlanCode;
	          	var dataGridParamsDetail = {
		        		url : '../departurePlan/finddeparturePlanDetailByPage.do?drivingPlanCode='+drivingPlanCode,
		        		pageSize : 10,
		        		toolbar : '#tlbIAConfordetail',
		        		singleSelect : 'true',
		        		fitColumns : 'true'
		        	}
		        	/* 加载表单数据 */
		        	newloadGrid('departDetailGrid', columnsDetail, dataGridParamsDetail);
		
		
	        }  
	    });  
	    
	    
  
	//机构下拉菜单
	orgCombogrid('startOrgCode',{queryParams:{orgType:ORG_TYPE_OPERATE_CENTER+','+ORG_TYPE_SITE,status: ORG_ENABLED}});
	orgCombogrid('endOrgCode',{queryParams:{orgType:ORG_TYPE_OPERATE_CENTER+','+ORG_TYPE_SITE,status: ORG_ENABLED}});
});

//根据条件查询发车计划
function  queryDeparture(){
	
	 var datagrid = $('#departGrid').datagrid('options');
		datagrid.url = "../departurePlan/finddeparturePlanByPage.do";
		$('#departGrid').datagrid('load',
				serializeFormObj('departureForms'));
		$('#departDetailGrid').datagrid('loadData', { total: 0, rows: [] });  
}

function openUpdatePlan(){
	openDialog("dlgPlan", '修改发车计划状态');
}

function openUpdateDetal(){
	openDialog("dlgPlanDetail", '修改发车计划详情状态');
}

function savePlanDetail(){
	$('#formDlgPlanDetail').form('submit',{
		   url: "../planExce/updatePlanDetail.do",
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
				   closeDialog("dlgPlanDetail");
				   $('#departDetailGrid').datagrid('reload');   
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

function savePlan(){
	$('#formDlgPlan').form('submit',{
		   url: "../planExce/updatePlan.do",
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
				   closeDialog("dlgPlan");
				   $('#departGrid').datagrid('reload');   
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

