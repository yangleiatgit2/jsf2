

$(function() {
	//查询界面空间
	timeLimit("beginDate", "endDate",1);
	/* 加载主界面grid */
	var columns = [ [
			{field : "id",checkbox : "true"},
			{
				field : 'id1',
				title : '操作',
				hidden : dealPermission([
						'freight_order_combin_edit',
						'order_combin_Intelligent_scheduling',
						'order_combin_generative_pricing',
						'order_combin_send_pricing',
						'order_combin_scheduling_fine_tuning',
						'freight_order_combin_stop' ]),
				align : 'center',
				formatter : function(value, rec, index) {
					return '<a  class="icon-line icon-edit" title="编辑" style="display:'
							+ (dealPermission([ 'freight_order_combin_edit' ]) ? 'none'
									: 'bolck')
							+ '" title="编辑订单组合" onclick="openUpdateOrderCombine(\''
							+ index
							+ '\')" href="javascript:void(0)"></a><a class="icon-line iconfont  uce-car" style="display:'
							+ (dealPermission([ 'order_combin_Intelligent_scheduling' ]) ? 'none'
									: 'bolck')
							+ '" title="智能排班" onclick="IntelligentSchedulin(\''
							+ index
							+ '\')" href="javascript:void(0)"></a><a class="icon-line iconfont  uce-baojia" style="display:'
							+ (dealPermission([ 'order_combin_generative_pricing' ]) ? 'none'
									: 'bolck')
							+ '" title="生成定价" onclick="generativePricing(\''
							+ index
							+ '\')" href="javascript:void(0)"></a><a class="icon-line iconfont  uce-upload" style="display:'
							+ (dealPermission([ 'order_combin_send_pricing' ]) ? 'none'
									: 'bolck')
							+ '" title="发送班次" onclick="orderCombinSendPricing(\''
							+ index
							+ '\')" href="javascript:void(0)"></a><a class="icon-line iconfont  uce-liebiao" style="display:'
							+ (dealPermission([ 'order_combin_scheduling_fine_tuning' ]) ? 'none'
									: 'bolck')
							+ '" title="排班微调" onclick="schedulingFineTuning(\''
							+ index
							+ '\')" href="javascript:void(0)"></a><a class="icon-line iconfont  uce-stop" style="display:'
							+ (dealPermission([ 'freight_order_combin_stop' ]) ? 'none'
									: 'bolck')
							+ '" title="终止" onclick="orderCombinstop(\''
							+ index
							+ '\')" href="javascript:void(0)"></a>';
				}
			},
			{field : 'orderCombineCode',title : '订单组合编号',align : 'center',width : 100,formatter : function(value, rec, index) {
				return '<a class="editcls" onclick="viewOrderCombine(\''
				+ index
				+ '\')"  href="javascript:void(0)">'
				+ value + '</a>';
				}},
			{field : 'orderCodes',title : '纳入的订单范围',align : 'center',width : 100,formatter : function(value, rec, index) {
				return '<a class="editcls" onclick="viewOrder(\''+ index+ '\')"  href="javascript:void(0)">订单详情</a>';	
			}},
			{field : 'orderCombineStatus',title : '状态',align : 'center',width : 50 ,formatter:function(value){
		          return getTypeNameByCode("ORDER_COMBIN_STATUS", value,formatTip);
	        }},
			{field : 'orderCombineType',title : '类型',align : 'center',width : 100,formatter:function(value){
		          return getTypeNameByCode("ORDER_COMBIN_TYPE", value,formatTip);
	        } }, 
			{field : 'businessMode',title : '业务模式',align : 'center',width : 50,formatter:function(value){
		          return getTypeNameByCode("BUSINESS_MODE", value,formatTip);
	        }},
			{field : 'lineGroupCode',title : '对应的班次组合',align : 'center',width : 100,formatter : function(value, rec, index) {
				return '<a class="editcls" onclick="viewlineGroupCode(\''
				+ index
				+ '\')"  href="javascript:void(0)">班次详情</a>';	}},
			{field : 'carDeparturePlanCode',title : '对应的发车计划组合',align : 'center',width : 100,formatter : function(value, rec, index) {
				return '<a class="editcls" onclick="viewcarDeparturePlanCode(\''
				+ index
				+ '\')"  href="javascript:void(0)">发车计划详情</a>';	}},
			{field : 'integenceScheduleCode',title : '智能排班规则',align : 'center',width : 100 ,formatter : formatTip},
			{field : 'autoGenerateRule',title : '自动生产规则',align : 'center',width : 100,formatter : formatTip }, 
			{field : 'orderCombineName',title : '订单组合名称',align : 'center',width : 100,formatter : formatTip} ,
			{field : 'createEmp',title : '创建人',align : 'center',width : 100,formatter : formatTip },
			{field : 'createTime',title : '生成时间',align : 'center',width : 180,formatter : function(value){
				return formatTime(value)
			} }
			
			] ];

	var dataGridParams = {
		url : '',
		pageSize : 10,
		toolbar : '#tlbFreightOrderCombine',
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
	newloadGrid('tblFreightOrderCombine', columns, dataGridParams);

	initDictDatas('ORDER_COMBIN_STATUS,ORDER_COMBIN_TYPE,BUSINESS_MODE,DEMAND_TYPE,LINEWORK_STATUS,PRICING_RULE_STATUS');
	/* 数据字典加载 */
	uceDictCombobox('orderCombineStatus', 'ORDER_COMBIN_STATUS');
	uceDictCombobox('orderCombineType', 'ORDER_COMBIN_TYPE');
	uceDictCombobox('businessMode', 'BUSINESS_MODE');
	/**编辑弹框*/
	uceDictCombobox('fmorderCombineType', 'ORDER_COMBIN_TYPE');
	$('#fmorderCombineType').combobox({
		onChange: function(newValue,oldValue){
			onselectflag(newValue, null);
		}
	});

	uceDictCombobox('fmorderCombineStatus', 'ORDER_COMBIN_STATUS');
	
	uceDictCombobox('fmbusinessMode', 'BUSINESS_MODE');
	
	$('#fmbusinessMode').combobox({
		onChange: function(newValue,oldValue){
			onselectflag(null, newValue);
		}
	});
	/**新增弹框**/
	/*uceDictCombobox('fmAdorderCombineType', 'ORDER_COMBIN_TYPE');
	uceDictCombobox('fmAdorderCombineStatus', 'ORDER_COMBIN_STATUS');
	uceDictCombobox('fmAdbusinessMode', 'BUSINESS_MODE');*/
	/**需求网点*/
	orgCombogrid('fddemandSiteCode', {
		orgTypes : [ORG_TYPE_SITE],
		orgStatus : [ORG_ENABLED],
	});
	/**始发网点*/
	orgCombogrid('fdbeginStationCode', {
		orgTypes : [ORG_TYPE_OPERATE_CENTER,ORG_TYPE_SITE],
		orgStatus : [ORG_ENABLED],
	});
	/**结束网点*/
	orgCombogrid('fdendStationCode', {
		orgTypes : [ORG_TYPE_OPERATE_CENTER,ORG_TYPE_SITE],
		orgStatus : [ORG_ENABLED],
	});
	
	
	
	
	/**班次微调*/
	uceDictCombobox('ftstatus', 'LINEWORK_STATUS');
	uceDictCombobox('ftrequiType', 'DEMAND_TYPE');
	orgCombogrid('ftstartOrgCode', {
		orgTypes : [ORG_TYPE_OPERATE_CENTER,ORG_TYPE_SITE],
		orgStatus : [ORG_ENABLED],
	});
	orgCombogrid('ftendOrgCode', {
		orgTypes : [ORG_TYPE_OPERATE_CENTER,ORG_TYPE_SITE],
		orgStatus : [ORG_ENABLED],
	});
	
	
	/* 加载明细界面grid */
	var detailcolumns = [ [
	                   	{field : "id",checkbox : "true"},
						{field : 'orderCode',title : '订单编号',align : 'center',width : 100},
						{field : 'demandSite',title : '需求网点',align : 'center',width : 100},
						
						{field : 'beginStation',title : '出发点',align : 'center',width : 120},
						{field : 'endStation',title : '到达点',align : 'center',width : 120},
						{field : 'businessMode',title : '业务模式',align : 'center',width : 100,formatter:function(value){
						      return getTypeNameByCode("BUSINESS_MODE", value);
						}},
						{field : 'departureTime',title : '出发时间',align : 'center',width : 80,formatter : formatTimeSecond,},
						{field : 'arrivalTime',title : '到达时间',align : 'center',width : 80,formatter : formatTimeSecond,},
						{field : 'layTime',title : '装卸耗时',align : 'center',width : 100},
						{field : 'carpoolSitesName',title : '关联网点',align : 'center',width : 100},
						
						{field : 'price',title : '价格',align : 'center',width : 100},
						
			
			
			] ];

	var detaildataGridParams = {
		url : '',
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


	var orderdataGridParams = {
		url : '',
		pageSize : 10,
		toolbar : '#tlbOrder',
		singleSelect : 'ture',
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
	newloadGrid('tborer', detailcolumns, orderdataGridParams);
	//过滤已经选择的订单
	$('#tborer').datagrid({
		loadFilter: function(data){
			if(data && data.rows && data.rows.length > 0){
				var selectedRows = $('#tblFreightOrderCombineDetail').datagrid('getRows');
				if(selectedRows && selectedRows.length >0){
					var selectedMap = [];
					for(var i=0;i<selectedRows.length;i++){
						selectedMap[selectedRows[i].id] = selectedRows;
					}
					var rows = data.rows;
					var result = [];
					for(var i=0;i<rows.length;i++){
						if(!selectedMap[rows[i].id]){
							result.push(rows[i])
						}
					}
					return result;
				}
			}
			return data;
		}
	});
	
	
	/* 加载明细界面grid */
	var tbFineTuningcolumns = [ [
			{field : "id",checkbox : "true"},
			{field : 'lineGroupCode',title : '班次编号',align : 'center',width : 100,formatter : formatTip},
			{field : 'lineGroupName',title : '班次名称',align : 'center',width : 100,formatter : formatTip},
			{field : 'departTime',title : '出发时间',align : 'center',width : 100,formatter : formatTime},
			{field : 'arrivalTime',title : '到达时间',align : 'center',width : 100,formatter : formatTime},
			/*{field : 'loadFactor',title : '满载率',align : 'center',width : 100,formatter : formatTip},
			{field : 'businessMode',title : '业务模式',align : 'center',width : 100,formatter : formatTip},*/
			{field : 'runningTime',title : '运行时间(分钟)',align : 'center',width : 100,formatter : formatTime},
			{field : 'lineGroupDistance',title : '路线距离',align : 'center',width : 100,formatter : formatTip},
			{field : 'startOrgName',title : '始发站',align : 'center',width : 100,formatter : formatTip},
			
			{field : 'endOrgName',title : '目的站',align : 'center',width : 100,formatter : formatTip},
			{field : 'costPrice',title : '成本价',align : 'center',width : 100,formatter : formatTip},
			{field : 'sellingPrice',title : '报价',align : 'center',width : 100,formatter : formatTip},
			{field : 'requiType',title : '需求类型',align : 'center',width : 100,formatter : formatTip},
			/*{field : 'status',title : '班次状态',align : 'center',width : 100,formatter : formatTip},
			{field : 'resource',title : '班次来源',align : 'center',width : 100,formatter : formatTip},*/
			{field : 'requiCombinCode',title : '需求组合号',align : 'center',width : 100,formatter : formatTip},
		/*	{field : 'drivingPlanCombinCode',title : '发车计划号',align : 'center',width : 100,formatter : formatTip},*/
			{field : 'orderCombinCode',title : '订单组合号',align : 'center',width : 100,formatter : formatTip}
			
			] ];

	var tbFineTuningParams = {
		url : '',
		pageSize : 10,
		toolbar : '#',
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
	newloadGrid('tblLineGroup', tbFineTuningcolumns, tbFineTuningParams);
	
	// 在双击一个单元格的时候开始编辑并生成编辑器，然后定位到编辑器的输入框上
	$('#tblLineGroup').datagrid({
		onDblClickRow: function(index, row){
          linegroupDbClick(index, row);
		
		}
	});


	
	/* 加载明细界面grid */
	var tbFineTuningdetailcolumns = [ [
			{field : "id",checkbox : "true"},
			{field : 'wayPointName',title : '途经站点',align : 'center',width : 100,formatter : formatTip},
    		{field : 'wayPointZoneName',title : '站点所属区域',align : 'center',width : 100,formatter : formatTip},
    		{field : 'volume',title : '货物方数',align : 'center',width : 100,formatter : formatTip},
    		{field : 'weight',title : '货物重量',align : 'center',width : 100,formatter : formatTip},
    		{field : 'endTime',title : '到达时间',align : 'center',width : 100,formatter : formatTime},
    		{field : 'loadUnloadTime',title : '装卸货耗时(分钟)',align : 'center',width : 100,formatter : formatTip},
    		{field : 'distance',title : '运行里程',align : 'center',width : 100,formatter : formatTip},
    		{field : 'runingTime',title : '运行耗时',align : 'center',width : 100,formatter : formatTip},
    		{field : 'nextWayDistance',title : '距离下一站点里程',align : 'center',width : 100,formatter : formatTip},
			
			] ];

	var tbFineTuningdetailParams = {
		url : '',
		pageSize : 10,
		toolbar : '',
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
	newloadGrid('tblLineGroupDetail', tbFineTuningdetailcolumns,tbFineTuningdetailParams);
	/* 加载明细界面grid */
	var tbFineTuningdetailcolumns = [ [
			 
			{field : 'createTime',title : '修改时间',align : 'center',width : 130,formatter : formatTime},
			{field : 'createEmp',title : '修改人',align : 'center',width : 80},
			{field : 'operContents',title : '修改内容',align : 'center',width : 120,formatter : formatTip}
			
			] ];
	var tbFineTuninglogParams = {
			url : '',
			pageSize : 10,
			toolbar : '',
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
	newloadGrid('tblLineGroupModify', tbFineTuningdetailcolumns,tbFineTuningdetailParams);
	
	
	
	/* 加载明细界面grid */
	var tbNoFineTuningcolumns = [ [
			{field:"id", checkbox:"true"},
			{
				field : 'des',
				title : '操作',
				align : 'center',
				width : 100,
				formatter : function(value, rec, index) {//\''+index+'\'
					return '<a class="icon-line icon-up"   onclick="moveUp(this)" href="javascript:void(0)"></a><a class="icon-line icon-down"  onclick="moveDown(this)" href="javascript:void(0)"></a>';
				}
			},
			{field : 'wayPointName',title : '途经站点',align : 'center',width : 100},
			{field : 'wayPointZoneName',title : '所属区域',align : 'center',width : 80}, 
			{field : 'volume',title : '货物方数',align : 'center',width : 130	} ,
			{field : 'weight',title : '货物重量',align : 'center',width : 120},
			{field : 'endTime',title : '需求到达时间',align : 'center',width : 100,formatter : formatTime},
			{field : 'loadUnloadTime',title : '装卸货时长（分）',align : 'center',width : 80}, 
			{field : 'distance',title : '运行里程',align : 'center',width : 130	} ,
			{field : 'runingTime',title : '运行耗时',align : 'center',width : 120}
			] ];
	var tbNoFineTuningParams = {
			url : '',
			pageSize : 10,
			toolbar : '',
			singleSelect : 'false',
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
	newloadGrid('tbNoFineTuning', tbNoFineTuningcolumns,tbNoFineTuningParams);
	//取缔分页
	$('#tbNoFineTuning').datagrid({pagination:false});
	
});
/**编辑订单组合时，传入后台的需求类型，以每次编辑的订单组合对应的需求类型来复制*/
var demandType;
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
function findOrderCombin() {
	if ($("#formOrderCombin").form('validate')) {
		// 判断时间是否为空
		var executeBeginTime = $("#beginDate").datebox("getValue");
		var executeEndTime = $("#endDate").datebox("getValue");
		 if(executeBeginTime != null && executeBeginTime != ''){
			 if(executeEndTime == null || executeEndTime == ''){
				 $.messager.alert("提示", "请选择生成时间的终止日期", "info");
				 return false;
			 }
		 }
		 if(executeEndTime != null && executeEndTime != ''){
			 if(executeBeginTime == null || executeBeginTime == ''){
				 $.messager.alert("提示", "请选择生成时间的开始日期", "info");
				 return false;
			 }
		 }
		 var datagrid = $('#tblFreightOrderCombine').datagrid('options');
		datagrid.url = rootPath + "/freightOrderCombine/findByPagination.do";
		$('#tblFreightOrderCombine').datagrid('load',
				serializeFormObj("formOrderCombin"));
		}
}
/*重置查询条件*/
function resetformOrderCombin(){
	$('#formOrderCombin').form('reset');
}
/*重置查询条件*/
function resetLineGroup(){
var orderCombineCode =	$('#ftorderCombinCode').textbox('getValue');
	$('#formLineGroup').form('reset');
	$('#ftorderCombinCode').textbox('setValue',orderCombineCode);
}

var url;
/*更新*/
function openUpdateOrderCombine(index){
/*	var rows = $('#tblFreightOrderCombine').datagrid('getRows')[index];
	if(rows.length > 1){
		showInfoMsg('只能选择一条单据进行操作！');
		return;
	}*/
	/* 获取当前选择行 */
	var row = $('#tblFreightOrderCombine').datagrid('getRows')[index];
	if(row){
		
		if(row.orderCombineStatus!=ORDER_COMBIN_STATUS_CREATE){
			showWarnMsg('订单组合只有已生成时才可以编辑！')
			return ;
		}
		openDialog("dlgFreightOrderCombine", '修改');
		//设置
		setReadOnly(true);
		 $('#autoselect').val(true);
		row.createTime = formatTime(row.createTime);
		if (row.updateTime != null) {
			row.updateTime = formatTime(row.updateTime);
		}
		$("#formOrderCombine").form('clear');
		$("#formOrderCombine").form('load', row);
		demandType = row.orderCombineType;
		url = rootPath + "/freightOrderCombine/updateFreightOrderCombine.do";
		var orderUrl = rootPath + "/freightOrder/findByCondition.do"
		var datagrid = $('#tblFreightOrderCombineDetail').datagrid('options');
		datagrid.url = orderUrl;
		$('#tblFreightOrderCombineDetail').datagrid('load', {orderCombinCode:row.orderCombineCode});
		setlinkButtonRead(false);
	} else {
		showInfoMsg('请选中需要修改的记录');
	}
			
			
}
/*保存*/
function saveOrderCombine(){
	//获取到所有行
	var data = $("#tblFreightOrderCombineDetail").datagrid("getData");
	var rows=data.rows;
	var orderCodes;
	var count = rows.length;
	if(count==0){
		showInfoMsg('此订单组合未选择订单，不允许保存');
		return;
	}
	//校验是否能组合在一起，只有相同需求类型、业务模式、分拨中心、月份或时间 才能组合在一起
	if(!validateIsCanCombine(rows)){
		console.error('只有相同需求类型、业务模式、分拨中心、月份或时间 才能组合在一起');
		return;
	}
	for (var a = 0; a <count ; a++) {
		if(a == 0){
			orderCodes=rows[a].orderCode;
		}else{
			orderCodes=orderCodes+','+rows[a].orderCode;
		}
	}
	 $('#fmorderCombineType').combobox('setValue', demandType);
	 $('#fmbusinessMode').combobox('setValue', businessMode);
	$('#orderCodes').val(orderCodes);
	$('#formOrderCombine').form('submit',{
		   url: url,
		   onSubmit: function(){
		       if($(this).form('validate')) {
		    	   uceLoading.show("请稍后...");
		    	   return true;
		       }
		       return true;
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
				   closeDialog("dlgFreightOrderCombine");
				   $('#tblFreightOrderCombine').datagrid('reload');   
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
var demandType;
var businessMode;
/**
 * 新增订单组合时业务类型，需求类型设置
 */
function onselectflag(demandTyperecod,businessModerecod){
	if(demandTyperecod!=null){
		demandType= demandTyperecod;
		// $('#fmorderCombineStatus').combobox('setValue', demandType);
	}
	if(businessModerecod!=null){
		businessMode=  businessModerecod;
		// $('#"fmbusinessMode"').combobox('setValue', businessMode);
	}
}
/*打开订单查询界面*/
function openAddOrder(){
	//业务
	if(businessMode==undefined ||businessMode==''){
		showInfoMsg('请选择业务模式');
		return;
	}
	//需求类型
	if(demandType==undefined ||demandType=='' ){
		showInfoMsg('请选择需求类型');
		return;
	}
	//openDialog("dlgOrder", '增加订单到订单组合');
	openDialog("dlgOrder", '增加订单到订单组合');
	//调用设置
	//setReadOnly(false);
	$("#formOrder").form('clear');
	$('#fddemandType').val(demandType);
	$('#fdbusinessMode').val(businessMode);
	$('#tborer').datagrid('loadData', {
		total : 0,
		rows : []
	});
	
}
/*
 * 排班微调
 * */
function schedulingFineTuning(index){
/**
 * 1，打开查询未排班数据界面
 * 2.校验是否存在未排班数据
 * 3，如果不存在，打开排班微调界面
 */	
	/*var rows = $('#tblFreightOrderCombine').datagrid('getSelections');
	if(rows.length > 1){
		showInfoMsg('只能选择一条单据进行操作！');
		return;
	}*/
	var row = $('#tblFreightOrderCombine').datagrid('getRows')[index];
	if(row){
		if(row.orderCombineStatus!=ORDER_COMBIN_STATUS_SHIFT_YES){
			showWarnMsg('订单组合只有已排班时才可以进行排班微调！')
			return ;
		}
		$.ajax({
			url : rootPath + "/freightOrderCombine/findGroupCodeIsNull.do",
			data : {
				"orderCombinCode":row.orderCombineCode
			},
			success:function(data){
				noFineTuningSucess(row,data);
			},
			task : function(data, statusText, xhr) {
				noFineTuningSucess(row,data);
			}
		});
		
	
	}else{
		showInfoMsg('请先选择数据');
	}
	
	
}
/**
 * 班次组合未排班订单信息不存在你时直接调用
 */
function noFineTuningSucess(row,data){
	//未加载到数据
	if(data.length == 0){
		fineTuning(row.orderCombineCode);
	}else{
		openDialog("dlgNoFineTuning", '班次组合未排班订单信息');
		/**查询未排班的订单信息**/
		var datagrid = $('#tbNoFineTuning').datagrid('options');
		datagrid.url = rootPath + "/freightOrderCombine/findGroupCodeIsNull.do";
		$('#FTorderCombineCode').val(row.orderCombineCode);
		$('#tbNoFineTuning').datagrid('load',{orderCombinCode:row.orderCombineCode});
	}
}
/**
 * 调整更多
 */
function fineTuningMore(){
	
	fineTuning($('#FTorderCombineCode').val());
}
/**
 * 排班微调主界面
 */
function fineTuning(orderCombineCode){
	
	$('#ftorderCombinCode').textbox('setValue',orderCombineCode);
	//大概班次微调界面
	openDialog("dlgFineTuning", '排班微调');
	//清除数据
	$('#tblLineGroup').datagrid('loadData', {total : 0,rows : []});
	$('#tblLineGroupDetail').datagrid('loadData', {total : 0,rows : []});
	$('#tblLineGroupModify').datagrid('loadData', {total : 0,rows : []});
}
/**
 * 查询订单
 */
function findFreightOrder(){
	 $('#autoselect').val(true);
	var datagrid = $('#tborer').datagrid('options');
	datagrid.url = rootPath + "/freightOrder/findCombineByPagination.do";
	$('#tborer').datagrid('load',
			serializeFormObj("formOrder"));
	}
/**
 * 重置
 */
function resetFreightOrder(){
	$('#formOrder').form('reset');
}
/**
 * 增加订单到订单组合
 */
function addOrderToCombine() {
	var flag = true;
	//获取选中数据
	var rownew = $("#tborer").datagrid("getChecked");
	//获取已存在数据
	var data = $("#tblFreightOrderCombineDetail").datagrid("getData");
	var rows=data.rows;
	for (var a = 0; a < rows.length; a++) {
		for (var b = 0; b < rownew.length; b++) {
			if(rownew[b]==rows[a]){
				$.messager.alert("提示", "该订单已存在，不可重复添加！", "info");
				var flag = true;
			}
		}
	}
	
	if (flag) {
		for (var c = 0; c < rownew.length; c++) {
			var data=rownew[c];
			$("#tblFreightOrderCombineDetail").datagrid('appendRow', data);
		}
		//需要对业务模式及业务类型进行控制
		setcomboxReadOny(true);
		closeDialog('dlgOrder');
	}
}
/**
 * 从订单组合中删除订单
 */
function deleteOrderFromCombin(){
	var data = $("#tblFreightOrderCombineDetail").datagrid("getData");
	var rows=data.total;
	if(rows==0){
		showWarnMsg('已无数据删除')
		return ;
	}
	//获取选中数据
	var data = $("#tblFreightOrderCombineDetail").datagrid("getChecked");
	for (var a = 0; a < data.length; a++) {
		//获取行ID
		var index = $('#tblFreightOrderCombineDetail').datagrid('getRowIndex', data[a]);
		//删除行
		$('#tblFreightOrderCombineDetail').datagrid('deleteRow', index);
	}
	//需要对业务模式及业务类型进行控制
	setcomboxReadOny(true);
}
/**
 * 班次查询
 */
function findLineGroup(){
	 var datagrid = $('#tblLineGroup').datagrid('options');
		datagrid.url = rootPath + "/workScheduleRule/findWorkByPage.do";
		$('#tblLineGroup').datagrid('load',
				serializeFormObj("formLineGroup"));
		
}
/**
 * 班次列表双击事件调用方法
 */
function linegroupDbClick(index, row){
	//查询班次明细
	var datagrid = $('#tblLineGroupDetail').datagrid('options');
		datagrid.url = rootPath + "/workScheduleRule/findWorkDetailByPage.do?lineGroupCode="+row.lineGroupCode;
		$('#tblLineGroupDetail').datagrid('load',
				{});
		//清除缓存
		$("#formLineGroupChange").form('clear');
		
		//设置班次ID
		$('#FTGlingGroup').val(row.id);
		//查询修改日志
		var datagropelog = $('#tblLineGroupModify').datagrid('options');
		datagropelog.url = rootPath + "/lineGroupOperLog/findByPagination.do?lineGroupCode="+row.lineGroupCode;
		$('#tblLineGroupModify').datagrid('load',
				{});
}

/**智能排班*/
function IntelligentSchedulin(){
	var rows = $('#tblFreightOrderCombine').datagrid('getSelections');
	if(rows && rows.length > 0){
		var row0 = rows[0];
		orderCombineType = row0.orderCombineType;
		var brotherCombineCode = undefined;
		if(row0.orderCombineType == DEMAND_TYPE_LONG){
			if(row0.orderCombineStatus!=ORDER_COMBIN_STATUS_CREATE ){
				showInfoMsg("请选择"+getTypeNameByCode("ORDER_COMBIN_STATUS", ORDER_COMBIN_STATUS_CREATE)+"的订单组合进行智能排班!");
				return;
			}
			if(rows.length == 1 && !row0.brotherOrderCombineCode){
				showInfoMsg('手动新增的长期需求组合排班必须选择两个对应进出港的长期组合才能排班');
				return;
			}
			if(rows.length == 2){
				row1 = rows[1];
				if(row1.orderCombineStatus!=ORDER_COMBIN_STATUS_CREATE ){
					showInfoMsg("请选择"+getTypeNameByCode("ORDER_COMBIN_STATUS", ORDER_COMBIN_STATUS_CREATE)+"的订单组合进行智能排班!");
					return;
				}
				if(row1.orderCombineType!=DEMAND_TYPE_LONG || row0.operStationCode!=row1.operStationCode 
						|| row0.businessMode==row1.businessMode || row0.brotherOrderCombineCode || row1.brotherOrderCombineCode){
					showInfoMsg('请选择两条手动新增的长期进港和出港的同一分拨的订单组合排班！');
					return;
				}
				brotherCombineCode = row1.orderCombineCode;
			}
			if(rows.length > 2){
				showInfoMsg('请选择两条长期进港和出港的同一分拨的订单组合排班！');
				return;
			}
		}else{
			if(rows.length > 1){
				showInfoMsg('只能选择一条数据进行操作！');
				return;
			}
		}
		var row = row0;
		confirmMsg('您确定要对此订单组合进行排班吗？', function(row) {
			$.ajax({
				url : rootPath + "/iaConf/smartSchedule.do",
				data : {
					'combineSourceType' : COMBINE_SOURCE_TYPE_ORDER,
					'combineCode' : row.orderCombineCode,
					'brotherCombineCode':brotherCombineCode,
				},
				
				task : function(data, statusText, xhr) {
					reloadDatagrid('tblFreightOrderCombine');
				}
			});
		}, [ row ]);
	}else{
		showInfoMsg('请先选择数据');
	};
		
}




/**订单组合终止*/
function orderCombinstop(){
	var rows = $('#tblFreightOrderCombine').datagrid('getSelections');
	if(rows.length > 1){
		showInfoMsg('只能选择一条单据进行操作！');
		return;
	}
	var row = $('#tblFreightOrderCombine').datagrid('getSelected');
	if (row) {
		if(row.orderCombineStatus==ORDER_COMBINE_STATUS_END){
			showWarnMsg('此订单组合已终止，禁止再次终止');
			return;
		}
		if(row.orderCombineStatus==ORDER_COMBINE_STATUS_QUOT_YES){
			showWarnMsg('此订单组合已排班，禁止再次终止');
			return;
		}
		confirmMsg('您确定要中止选中的数据吗？', function(row) {
			$.ajax({
				url : rootPath + "/freightOrderCombine/stopFreightOrderCombine.do",
				data : {
					'id' : row.id
				},
				task : function(data, statusText, xhr) {
					reloadDatagrid('tblFreightOrderCombine');
				}
			});
		}, [ row ])
	}
		else{
			showInfoMsg('请先选择数据');};
		}

	
/**
 * 删除班次
 */
function deleteLineGroup(){
	var row = $('#tblLineGroup').datagrid('getSelected');
	if (row) {
		confirmMsg('您确定要删除班次吗？', function(row) {
			$.ajax({
				url : rootPath + "/freightOrderCombine/deleteLineGroup.do",
				data : {
					'id' : row.id
				},
				task : function(data, statusText, xhr) {
					reloadDatagrid('tblLineGroup');
				}
			});
		}, [ row ])
	}else{
		showInfoMsg('请先选择数据');
	}
}
/**
 * 删除班次明细
 */
function deleteLineGroupDetail(){
	var row = $("#tblLineGroupDetail").datagrid("getSelected");
	if(row){
		confirmMsg('您确定要删除班次明细吗？', function(row) {
			var index = $('#tblLineGroupDetail').datagrid('getRowIndex', row);
			//删除行
			$('#tblLineGroupDetail').datagrid('deleteRow', index);
			//获取ID
			var ids= $('#FTGlingGroupDetail').val();
			//判断是否存在删除记录
			if(ids){
				//存在即拼接
				ids=ids+','+row.id;
			}else{
				//不存在直接取值
				ids=row.id;
			}
			 $('#FTGlingGroupDetail').val(ids);
		}, [ row ])
	}else{
		showInfoMsg('请先选择数据');
	}
}
/**
 * 保存按钮
 */
function saveLineGroup(){
	var linegroupid=$('#FTGlingGroup').val();
	var lineGroupDetailIds=$('#FTGlingGroupDetail').val();
	if(linegroupid==''||lineGroupDetailIds==''){
		showWarnMsg("未对路段信息作出变更");
		return;
	}
	$.ajax({
		url : rootPath + "/freightOrderCombine/saveLineGroup.do",
		data : {
			'lineGroupId' : $('#FTGlingGroup').val(),
			'lineGroupDetailIds' : $('#FTGlingGroupDetail').val()
		},
		task : function(data, statusText, xhr) {
			closeDialog('dlgFineTuning');
		}
	});
}


/**
 *  班次移動
 * @param up
 */
function moveUp(up) {
	
	var tr = $(up).parents("tr");//当前点击的tr
	//当前点击的班次序号
	var trValue = tr.find("td").eq(1).find("div").html();
	//选中节点的哥哥
	var trb = tr.prev();
	//哥哥的班次序号
	var trbValue = trb.find("td").eq(1).find("div").html();
	var groupRows = $('#tbNoFineTuning').datagrid("getRows");
	var trIndex = tr.index();
	if(trIndex>0){
		var trIndexUp = trIndex - 1;
		//正在点击的行
		var indexData = groupRows[trIndex];
		//正在点击行的上一行
		var indexDataUp = groupRows[trIndexUp];
		//交换数据
		groupRows[trIndexUp] = indexData;
		groupRows[trIndex] = indexDataUp;
	
		trb.before(tr);
	}
	
}

/**
 * 班次移動 
 * @param down
 */
function moveDown(down) {

	//当前点击的tr
	var tr = $(down).parents("tr");
	//当前点击的班次序号
	var trValue = tr.find("td").eq(1).find("div").html();
	//选中节点的弟弟
	var trb = tr.next();
	//弟弟的班次序号
	var trbValue = trb.find("td").eq(1).find("div").html();
	var groupRows = $('#tbNoFineTuning').datagrid("getRows");

	var trIndex = tr.index();
	var trIndexDown = trIndex + 1;
	if(groupRows.length!=trIndexDown){
		var groupRows = $('#tbNoFineTuning').datagrid("getRows");
		var indexData = groupRows[trIndex];
		var indexDataUp = groupRows[trIndexDown];
		groupRows[trIndexDown] = indexData;
		groupRows[trIndex] = indexDataUp;
		//保持班次序号不变
	
		trb.after(tr);
	}
	
}
/**
 * 新增班次
 */
function saveLineClass(){
	var effectRow =$('#tbNoFineTuning').datagrid('getChecked');
	/**
	 * 
	 */
	if(effectRow.length == 0){
		showWarnMsg('请选择数据');
		return ;
	}
	
	for (var a = 0; a < effectRow.length; a++) {
		if(a>0){
			if(formatDate(effectRow[a-1].endTime)!=formatDate(effectRow[0].endTime)){
				showWarnMsg('所选路段到达时间必须未同一天');
				return ;
			}
		}
		
	}
	$.ajax({
		url : rootPath + "/freightOrderCombine/addLineGroup.do",
		data : {
			'lindgroupdetals' : JSON.stringify(effectRow),
			'orderCombineCode':$('#FTorderCombineCode').val()
		},
		task : function(data, statusText, xhr) {
			closeDialog('dlgNoFineTuning');
		}
	});
}


/**
 * 已排班的生成定价
 * 生成报价 弹出框
 */
function generativePricing(){
	var rows = $('#tblFreightOrderCombine').datagrid('getSelections');
	debugger
	if (rows.length ==1) {
		var row = $('#tblFreightOrderCombine').datagrid('getSelected');
		if(row.orderCombineStatus == ORDER_COMBIN_STATUS_SHIFT_YES){
			openDialog("dlgQuotation",'定价选项-选择定价规则');
			$('#formQuotation').form('clear');
			$('#quotationDemandCombineCode').textbox('setValue',row.orderCombineCode);
			/* 清空明细 */			
			$('#tblQuotation').datagrid({  
				striped: true ,  
				singleSelect : true,  				
				fitColumns:true,
				url :  '',
				loadMsg:'数据加载中请稍后……',  
				pagination: false,  
				columns:[[
					 {field : "id",checkbox : "true"},
					 {field : 'priceRuleCode',title : '定价编号',align : 'center',width : 120,formatter : formatTip},
					 {field : 'status',title : '定价规则状态',align : 'center',width : 120,formatter:function(value){
				          return getTypeNameByCode("PRICING_RULE_STATUS", value,formatTip);
					 }}
				]]
			});
			$("#tblQuotation").datagrid('loadData', {total:0,rows:[]});
		      var datagrid=$('#tblQuotation').datagrid('options');
		      datagrid.url=rootPath + '/pricingRule/findSelectPrice.do';
		      $('#tblQuotation').datagrid('load',{
		        combineCode:row.orderCombineCode,
		        orgCode:row.operStationCode,
		        businessMode:row.businessMode,
		        demandType:row.orderCombineType,
				combineType:COMBINE_SOURCE_TYPE_ORDER
		      });
		}else{
			showInfoMsg( "只能选择一条"+getTypeNameByCode("ORDER_COMBIN_STATUS", ORDER_COMBIN_STATUS_SHIFT_YES)+"单据进行操作!");
			return;
		}
	}else if (rows.length>1){
		showInfoMsg( "只能选择一条单据进行操作!");
	}else{
		showInfoMsg( "请选中一条单据进行操作!");
	}
	
}
/**
 * 保存报价
 */
function generateQuotation(){
	var row= $("#tblQuotation").datagrid("getSelected");
	if (!row) {
		showInfoMsg( "请选择一条定价规则!");
		return;
	}else{
		if(row &&row.status==PRICEING_RULE_STATUS_CREATE){
			showInfoMsg( "选择的定价规则不能生成定价,请选择"+getTypeNameByCode("PRICING_RULE_STATUS", PRICEING_RULE_STATUS_APPROVED)+"!");
			return;
		}
	}
	$('#quotationPriceRuleCode').textbox('setValue',row.priceRuleCode);
	$('#formQuotation').form('submit',{
		   url: rootPath + '/freightOrderCombine/generateOrderQuotation.do',
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
				   closeDialog("dlgQuotation");
				   reloadDatagrid('tblFreightOrderCombine');
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
 * 发送班次
 */
function orderCombinSendPricing() {
	var rows = $('#tblFreightOrderCombine').datagrid('getSelections');
	if(rows.length > 1){
		showInfoMsg('只能选择一条单据进行操作！');
		return;
	}
	var row = $('#tblFreightOrderCombine').datagrid('getSelected');
	if (row) {
		if (row.orderCombineStatus == ORDER_COMBINE_STATUS_QUOT_YES) {
			showWarnMsg('此订单组合已发送班次，禁止再次发送');
			return;
		}
		if (row.orderCombineStatus != ORDER_COMBINE_STATUS_QUOT_NO) {
			showWarnMsg('此订单组合状态不是可报价状态，禁止发送班次');
			return;
		}
		confirmMsg('您确定要对已选中的订单组合发送班次吗？', function(row) {
			$.ajax({
				url : rootPath
						+ "/freightOrderCombine/orderCombinSendPricing.do",
				data : {
					'orderCombineId' : row.id
				},
				task : function(data, statusText, xhr) {
					reloadDatagrid('tblFreightOrderCombine');
				}
			});
		}, [ row ])
	} else {
		showWarnMsg('请先选择数据');
	}
}
	/**跳转其他界面订单组合**/
	function viewOrder(index){
		var row = $('#tblFreightOrderCombine').datagrid('getRows')[index];
		if (row) {
		var planurl = rootPath + "/freightOrder/forward.do?orderCombineCode="
				+ row.orderCombineCode;
		window.top.vm.openTab('订单管理', planurl, true, 258);
		/*var datagrid = $('#tblFreightOrder').datagrid('options');
		datagrid.url = rootPath + "/freightOrder/findByPagination.do?orderCombinCode="
				+ row.orderCombineCode;;;
*/

	}
	}
	/**跳转其他界面班次**/
	function viewlineGroupCode(index){
		var row = $('#tblFreightOrderCombine').datagrid('getRows')[index];
		if (row) {
		var planurl = rootPath+"/workScheduleRule/forward.do?orderCombinCode="
				+ row.orderCombineCode;
	    window.top.vm.openTab('班次管理',planurl,true,999);
		/*var datagrid = $('#tblFreightOrder').datagrid('options');
		datagrid.url = rootPath + "/freightOrder/findByPagination.do?orderCombinCode="
				+ row.orderCombineCode;;;
*/

	}
	}
	/**跳转其他界面发车计划**/
	function viewcarDeparturePlanCode(index){
		var row = $('#tblFreightOrderCombine').datagrid('getRows')[index];
		if (row) {
		var planurl = rootPath+"/departurePlan/forward.do?orderCombinCode="
				+ row.orderCombineCode;
		window.top.vm.openTab('发车计划管理', planurl, true, 258);
		/*var datagrid = $('#tblFreightOrder').datagrid('options');
		datagrid.url = rootPath + "/freightOrder/findByPagination.do?orderCombinCode="
				+ row.orderCombineCode;;;
*/

	}
	}
	/**
	 * 新增订单组合
	 */
	function openAddOrderCombine(){
		$("#formOrderCombine").form('clear');
		openDialog("dlgFreightOrderCombine",'新增订单组合');
		//调用设置
		setReadOnly(false);
		 $('#fmorderCombineStatus').combobox('setValue', '00');
		url = rootPath + "/freightOrderCombine/addFreightOrderCombine.do";
		//清空数据
		$('#tblFreightOrderCombineDetail').datagrid('loadData', {
			total : 0,
			rows : []
		});
		setlinkButtonRead(false);
		
	}
	//删除及新增班次时校验业务类型及业务模式是否可选
	function setcomboxReadOny(flag){
		if(flag){
			//获取table数量
			//获取已存在数据
			var data = $("#tblFreightOrderCombineDetail").datagrid("getData");
			var rows=data.total;
			if(rows==0){
				$('#fmorderCombineType').textbox({
					readonly:false
				});
				$('#fmbusinessMode').textbox({
					readonly:false
				});
			}else{
				$('#fmorderCombineType').textbox({
					readonly:true
				});
				$('#fmbusinessMode').textbox({
					readonly:true
				});
			}
		}
	}
	
	/**
	 * 编辑弹框设置
	 * @param flag
	 */
	function setReadOnly(flag){
		if(flag){
			$(".updateOrdercombineDiv").css("display","block");
			$(".addOrderCombineDiv").css("display","none");
		}else{
			$(".updateOrdercombineDiv").css("display","none");
			$(".addOrderCombineDiv").css("display","block");
		}
		$('#fmbusinessMode').textbox({
			required : true,
			readonly:flag
		});
		$('#fmorderCombineType').textbox({
			required : true,
			readonly:flag
		});
	}
	
	function validateIsCanCombine(rows){
		var count = rows.length;
		var sameBusinessMode = undefined;
		var sameDemandType = undefined;
		var sameOrgCode = undefined;
		var sameOrderStartTime = undefined;
		var sameOrderEndTime = undefined;
		for(var i=0;i<count;i++){
			//业务模式是否相同
			if(sameBusinessMode == undefined){
				sameBusinessMode = rows[i].businessMode;
			}else if(sameBusinessMode != rows[i].businessMode){
				showInfoMsg("业务模式不同的订单不能组合在一起！");
				return false;
			}
			//进港，开始站要是相同分拨
			if(BUSINESS_MODE_IN == rows[i].businessMode){
				if(sameOrgCode == undefined){
					sameOrgCode = rows[i].beginStationCode;
				}else if(sameOrgCode != rows[i].beginStationCode){
					showInfoMsg("进港出发点不相同不能组合在一起！");
					return false;
				}
			}else{
				if(sameOrgCode == undefined){
					sameOrgCode = rows[i].beginStationCode;
				}else if(sameOrgCode != rows[i].beginStationCode){
					showInfoMsg("出港到达点不相同不能组合在一起！");
					return false;
				}
			}
			//需求类型是否相同
			if(sameDemandType == undefined){
				sameDemandType = rows[i].demandType;
			}else if(sameDemandType != rows[i].demandType){
				showInfoMsg("需求类型不同的订单不能组合在一起！");
				return false;
			}
			//长期
			if(DEMAND_TYPE_LONG == rows[i].demandType){
				if(sameOrderStartTime == undefined){
					sameOrderStartTime = formatDate(rows[i].orderStartTime);
				}else if(sameOrderStartTime != formatDate(rows[i].orderStartTime)){
					showInfoMsg("长期需求开始执行时间不一致不能组合在一起！");
					return false;
				}
				if(sameOrderEndTime == undefined){
					sameOrderEndTime = formatDate(rows[i].orderEndTime);
				}else if(sameOrderEndTime != formatDate(rows[i].orderEndTime)){
					showInfoMsg("长期需求执行结束时间不一致不能组合在一起！");
					return false;
				}
			}else{
			//临时
				if(sameOrderStartTime == undefined){
					sameOrderStartTime = formatDate(rows[i].orderStartTime);
				}else if(sameOrderStartTime != formatDate(rows[i].orderStartTime)){
					showInfoMsg("临时需求开始执行时间不一致不能组合在一起！");
					return false;
				}
			}
		}
		return true;
	}
	/**
	 * 查看
	 * @param id
	 */
	function viewOrderCombine(index){
		var row = $('#tblFreightOrderCombine').datagrid('getRows')[index];
		if (row == null) {
			return;
		}
		/*if(row.orderCombineStatus!=ORDER_COMBIN_STATUS_CREATE){
			showWarnMsg('订单组合只有已生成时才可以编辑！')
			return ;
		}*/
		openDialog("dlgFreightOrderCombine", '查看');
		//设置
		setReadOnly(true);
		 $('#autoselect').val(true);
		row.createTime = formatTime(row.createTime);
		if (row.updateTime != null) {
			row.updateTime = formatTime(row.updateTime);
		}
		$("#formOrderCombine").form('clear');
		$("#formOrderCombine").form('load', row);
		demandType = row.orderCombineType;
		url = rootPath + "/freightOrderCombine/updateFreightOrderCombine.do";
		var orderUrl = rootPath + "/freightOrder/findByCondition.do"
		var datagrid = $('#tblFreightOrderCombineDetail').datagrid('options');
		datagrid.url = orderUrl;
		$('#tblFreightOrderCombineDetail').datagrid('load', {orderCombinCode:row.orderCombineCode});
		setlinkButtonRead(true);
	}
	
	
	function setlinkButtonRead(flag){
		if(flag){
			$('#addDetialBtn').linkbutton('disable');
			$('#deleteBetailBtn').linkbutton('disable');
			$('#saveOrderCombineBtn').linkbutton('disable');
		}else{
			$('#addDetialBtn').linkbutton('enable');
			$('#deleteBetailBtn').linkbutton('enable');
			$('#saveOrderCombineBtn').linkbutton('enable');
			//$('#btsaveFreightOrder').linkbutton('enable');
		}
	}