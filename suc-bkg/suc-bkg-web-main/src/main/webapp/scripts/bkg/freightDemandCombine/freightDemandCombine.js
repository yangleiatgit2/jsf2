$(function() {
	//限制查询时间不能超过一个月
	timeLimit("createBeginTime", "createEndTime",1);
	//查询界面空间
	/* 加载主界面grid */
	var columns = [ [
			{field : "id",checkbox : "true"},
			{field : "version",hidden : "true"}, 
			{field : 'des',hidden:dealPermission([ 'demand_combin_edit' ]),title : '操作',align : 'center',width : 50,formatter:function(value, rec, index){
				return '<a class="icon-line iconfont uce-edit" style="display:'+ (dealPermission([ 'demand_combin_edit' ]) ? 'none' : 'bolck')+'" title="编辑" onclick="openUpdateDemandCombine(\''+index+'\')" href="javascript:void(0)"></a>';
	        }},
			{field : 'demandCombineCode',title : '需求组合编号',align : 'center',width : 120,formatter : function(value,rec,index){
				return '<a class="editcls" onclick="viewCombine(\''+index+ '\')"  href="javascript:void(0)">'+ value + '</a>';
			}},
			{field : 'demandCodes',title : '纳入的需求范围',align : 'center',width : 120,formatter : function(value, rec, index){
					return '<a  onclick="showDemands(\''+index+'\')" style="text-decoration:underline;color:blue;" href="javascript:void(0)">需求详情</a>';
	        }},
			{field : 'demandCombineStatus',title : '状态',align : 'center',width : 50 ,formatter:function(value){
		          return getTypeNameByCode("DEMAND_COMBINE_STATUS", value,formatTip);
	        }},
			{field : 'demandCombineType',title : '类型',align : 'center',width : 90,formatter:function(value){
		          return getTypeNameByCode("DEMAND_COMBINE_TYPE", value,formatTip);
	        } }, 
			{field : 'businessMode',title : '业务模式',align : 'center',width : 50,formatter:function(value){
		          return getTypeNameByCode("BUSINESS_MODE", value,formatTip);
	        }},
			{field : 'lineGroupCode',title : '对应的班次组合',align : 'center',width : 120 ,formatter : function(value, rec, index){
					return '<a  onclick="showLineGroups(\''+index+'\')" style="text-decoration:underline;color:blue;" href="javascript:void(0)">班次详情</a>';
	        }},
			{field : 'carDeparturePlanCode',title : '对应的发车计划组合',align : 'center',width : 120,formatter : function(value, rec, index){
					return '<a  onclick="showDriverPlans(\''+index+'\')" style="text-decoration:underline;color:blue;" href="javascript:void(0)">发车计划详情</a>';
	        }},
			{field : 'integenceScheduleCode',title : '智能排班规则',align : 'center',width : 100,formatter : formatTip },
			{field : 'autoGenerateRule',title : '自动生产规则',align : 'center',width : 100,formatter : formatTip }, 
			{field : 'demandCombineName',title : '需求组合名称',align : 'center',width : 120,formatter : formatTip} ,
			{field : 'createEmp',title : '创建人',align : 'center',width : 100 ,formatter : formatTip},
			{field : 'createTime',title : '生成时间',align : 'center',width : 130,formatter : function(value) { return formatData(value)}	},
			{field : 'updateEmp',title : '修改人',align : 'center',width : 80,formatter : formatTip}, 
			{field : 'updateTime',title : '修改时间',align : 'center',width : 130,formatter : function(value) { return formatData(value)}	}
	] ];

	var dataGridParams = {
		url : '',
		pageSize : 10,
		toolbar : '#tlbFreightDemandCombine',
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
	newloadGrid('tblFreightDemandCombine', columns, dataGridParams);

	initDictDatas('DEMAND_STATUS,DEMAND_COMBINE_STATUS,DEMAND_COMBINE_TYPE,BUSINESS_MODE,IS_CARPOOL,PRICING_RULE_STATUS');
	/* 数据字典加载 */
	uceDictCombobox('findDemandCombineStatus', 'DEMAND_COMBINE_STATUS');
	uceDictCombobox('findDemandCombineType', 'DEMAND_COMBINE_TYPE');
	uceDictCombobox('findBusinessMode', 'BUSINESS_MODE');
	uceDictCombobox('demandCombineStatus', 'DEMAND_COMBINE_STATUS');
	uceDictCombobox('demandCombineType', 'DEMAND_COMBINE_TYPE');
	uceDictCombobox('businessMode', 'BUSINESS_MODE');
	/*运行方式: combobox*/
	$("#fdDemandStatus").uceCombobox({
		data : [ 
	        {'value' : DEMAND_STATUS_SUBMIT,'text' :getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_SUBMIT)}, 
	        {'value' : DEMAND_STATUS_QUOTE_NO,'text' :getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_QUOTE_NO)}, 
	        {'value' : DEMAND_STATUS_QUOTE_YES,'text' :getTypeNameByCode("DEMAND_STATUS", DEMAND_STATUS_QUOTE_YES)} 
        ]
	});
	
	/*时间范围控制*/
	//查询界面空间
	//dateRange("createBeginTime", "createEndTime");
	
	/* 加载明细界面grid */
	var detailcolumns = [ [
        {field : "id",checkbox : "true"},
		{field : 'demandCode',title : '需求编号',align : 'center',width : 120,formatter : formatTip},
		{field : 'beginStation',title : '出发点',align : 'center',width : 120,formatter : formatTip},
		{field : 'endStation',title : '到达点',align : 'center',width : 120,formatter : formatTip},
		{field : 'businessMode',title : '业务模式',align : 'center',width : 50,formatter:function(value){
	          return getTypeNameByCode("BUSINESS_MODE", value);
		}},
		{field : 'demandStatus',title : '需求状态',align : 'center',width : 50,formatter:function(value){
			return getTypeNameByCode("DEMAND_STATUS", value);
		}},
		{field : 'departureTime',title : '出发时间',align : 'center',width : 80,formatter : function(value) {return formatData(value,'Time')}},
		{field : 'arrivalTime',title : '到达时间',align : 'center',width : 80,formatter : function(value) {return formatData(value,'Time')}},
		{field : 'layTime',title : '装卸时间',align : 'center',width : 100,formatter : formatTip},
		{field : 'demandSite',title : '需求网点',align : 'center',width : 100,formatter : formatTip},
		{field : 'carpoolSites',title : '关联网点',align : 'center',width : 100,formatter : formatTip},
	/*	{field : 'isCarpool',title : '是否拼车',align : 'center',width : 100, formatter:function(value){
				return getTypeNameByCode("IS_CARPOOL", value,formatTip);
			}
		},*/
		{field : 'price',title : '价格',align : 'center',width : 100,formatter : formatTip}
	] ];

	var detaildataGridParams = {
		url : '',
		pageSize : 10,
		toolbar : '#tlbDetial',
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
	/* 加载需求明细表单数据 */
	newloadGrid('tblDemandCombineDetail', detailcolumns, detaildataGridParams);
	/**不分页*/
	$("#tblDemandCombineDetail").datagrid({pagination:false});
	
	var demandDataGridParams = {
		url :  '',
		pageSize : 10,
		toolbar : '#tlbDemand',
		singleSelect : 'ture',
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
	newloadGrid('tblDemand', detailcolumns, demandDataGridParams);
	
	/*班次微调的datagrid begin */
	/* 班次列表 */
	var tblLineGroupcolumns = [ [
		{field : "id",checkbox : "true"},
		{field : 'lineGroupCode',title : '班次编号',align : 'center',width : 100,formatter : formatTip},
		{field : 'lineGroupName',title : '班次名称',align : 'center',width : 100,formatter : formatTip},
		{field : 'departTime',title : '出发时间',align : 'center',width : 100,formatter : formatTime},
		{field : 'arrivalTime',title : '到达时间',align : 'center',width : 100,formatter : formatTime},
		/*{field : 'loadFactor',title : '满载率',align : 'center',width : 100,formatter : formatTip},
		{field : 'businessMode',title : '业务模式',align : 'center',width : 100,formatter : formatTip},*/
		{field : 'runningTime',title : '运行时间(分钟)',align : 'center',width : 100,formatter : formatTime},
		{field : 'lineGroupDistance',title : '路线距离',align : 'center',width : 100,formatter : formatTip},
		{field : 'startOrgName',title : '出发点',align : 'center',width : 100,formatter : formatTip},
		
		{field : 'endOrgName',title : '到达点',align : 'center',width : 100,formatter : formatTip},
		{field : 'costPrice',title : '成本价',align : 'center',width : 100,formatter : formatTip},
		{field : 'sellingPrice',title : '报价',align : 'center',width : 100,formatter : formatTip},
		{field : 'requiType',title : '需求类型',align : 'center',width : 100,formatter : formatTip},
		/*{field : 'status',title : '班次状态',align : 'center',width : 100,formatter : formatTip},
		{field : 'resource',title : '班次来源',align : 'center',width : 100,formatter : formatTip},*/
		{field : 'requiCombinCode',title : '需求组合号',align : 'center',width : 100,formatter : formatTip},
	/*	{field : 'drivingPlanCombinCode',title : '发车计划号',align : 'center',width : 100,formatter : formatTip},*/
		{field : 'orderCombinCode',title : '订单组合号',align : 'center',width : 100,formatter : formatTip}
	] ];
	var tblLineGroupParams = {
		url : '',
		pageSize : 10,
		toolbar : '#tlbFineTune',
		singleSelect : 'true',
  		fitColumns : 'false',
		onBeforeLoad : function(param) {
		},
		onLoadSuccess : function(data) {
		},
		onLoadError : function() {
		}
	}
	/* 加载表单数据 */
	newloadGrid('tblLineGroup', tblLineGroupcolumns, tblLineGroupParams);
	
	/* 班次的路段信息 */
	var tblLineGroupDetailColumns = [ [
		{field : "id",checkbox : "true"},
		{field : 'des',title : '操作',align : 'center',width : 100,formatter : function(value, rec, index) {
			return '<a class="icon-line icon-up"   onclick="moveUp(this)" href="javascript:void(0)"></a><a class="icon-line icon-down"  onclick="moveDown(this)" href="javascript:void(0)"></a>';
		}},
		{field : 'serialNumber', title : '班次序号', align : 'center', width : 80 },
		{field : 'wayPointName',title : '途经站点',align : 'center',width : 100,formatter : formatTip},
		{field : 'wayPointZoneName',title : '站点所属区域',align : 'center',width : 100,formatter : formatTip},
		{field : 'volume',title : '货物方数',align : 'center',width : 100,formatter : formatTip},
		{field : 'weight',title : '货物重量',align : 'center',width : 100,formatter : formatTip},
		{field : 'endTime',title : '到达时间',align : 'center',width : 100,formatter : formatTime},
		{field : 'loadUnloadTime',title : '装卸货耗时(分钟)',align : 'center',width : 90,formatter : formatTip},
		{field : 'distance',title : '运行里程',align : 'center',width : 60,formatter : formatTip},
		{field : 'runingTime',title : '运行耗时',align : 'center',width : 60,formatter : formatTip},
		{field : 'nextWayDistance',title : '距离下一站点里程',align : 'center',width : 100,formatter : formatTip},
	] ];

	var tblLineGroupDetailParams = {
		url : '',
		pageSize : 10,
		toolbar : '#tblLineGroupDetailBtn',
		singleSelect : 'true',
  		fitColumns : 'true',
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
	newloadGrid('tblLineGroupDetail', tblLineGroupDetailColumns,tblLineGroupDetailParams);
	
	/* 班次修改记录 */
	var tblLineGroupModifyColumns = [ [
       {field : "id",checkbox : "true"},
       {field : 'orderCode',title : '订单编号',align : 'center',width : 150},
       {field : 'createEmp',title : '创建人',align : 'center',width : 80}, 
       {field : 'createTime',title : '创建时间',align : 'center',width : 130	} ,
       {field : 'beginStation',title : '修改内容',align : 'center',width : 150}
   ] ];
	var tblLineGroupModifyParams = {
		url : '',
		pageSize : 10,
		toolbar : '',
		singleSelect : 'true',
  		fitColumns : 'true',
		onBeforeLoad : function(param) {
		},
		onLoadSuccess : function(data) {
		},
		onLoadError : function() {
			// 在载入远程数据产生错误的时候触发。
		}
	}
	newloadGrid('tblLineGroupModify', tblLineGroupModifyColumns,tblLineGroupModifyParams);
	/*班次微调的datagrid end */
	
	orgCombogrid('findBeginStationCode', {
		orgTypes : ORG_TYPE_OPERATE_CENTER + ',' + ORG_TYPE_SITE
	});
	orgCombogrid('findEndStationCode',{
		orgTypes : ORG_TYPE_OPERATE_CENTER + ',' + ORG_TYPE_SITE
	});
	orgCombogrid('findDemandSiteCode', {
		orgTypes : [ORG_TYPE_SITE],
		orgStatus : [ORG_ENABLED],
	});
	
});
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
function findDemandCombine() {
	if ($("#formFindDemandCombine").form('validate')) {
		// 判断时间是否为空
		var createBeginTime = $("#createBeginTime").datebox("getValue");
		var createEndTime = $("#createEndTime").datebox("getValue");
		 if(createBeginTime != null && createBeginTime != ''){
			 if(createEndTime == null || createEndTime == ''){
				 $.messager.alert("提示", "请选择生成时间的终止日期", "info");
				 return false;
			 }
		 }
		 if(createEndTime != null && createEndTime != ''){
			 if(createBeginTime == null || createBeginTime == ''){
				 $.messager.alert("提示", "请选择生成时间的开始日期", "info");
				 return false;
			 }
		 }
		 if(createBeginTime&&createEndTime){
			 $("#hideCreateBeginTime").val(createBeginTime+" 00:00:00");
			 $("#hideCreateEndTime").val(createEndTime+" 23:59:59");
		 }
		 var datagrid = $('#tblFreightDemandCombine').datagrid('options');
		datagrid.url = rootPath + "/freightDemandCombine/findByPagination.do";
		$('#tblFreightDemandCombine').datagrid('load',
				serializeFormObj("formFindDemandCombine"));
		}
}
/*重置查询条件*/
function resetFormFindDemandCombine(){
	cancelDateRange('createBeginTime','createEndTime')
	$('#formFindDemandCombine').form('reset');
	$("#hideCreateBeginTime").val("");
	 $("#hideCreateEndTime").val("");
}
/**
 * 查看详情
 */
function viewCombine(index){
	if(index != null || index != ''){
		var row=$("#tblFreightDemandCombine").datagrid('getRows')[index];
		/* 获取当前选择行 */
		openDialog("dlgFreightDemandCombine", '查看');
		if(row.createTime)row.createTime = formatTime(row.createTime);	
		if(row.executeTime)row.executeTime= formatDate(row.executeTime);		
		$("#formDemandCombine").form('clear');
		$("#formDemandCombine").form('load', row);		
		var datagrid = $('#tblDemandCombineDetail').datagrid('options');
		datagrid.url = rootPath + "/freightDemandCombine/findByDemandDetail.do";
		$('#tblDemandCombineDetail').datagrid('load', {
			demandCombineCode : row.demandCombineCode,
			demandCombineType: row.demandCombineType
		});
		enableBtn(true);
		
	}
}
/**
 * 设置btn enable
 */
function enableBtn(flag){
	if(flag){
		$('#tlbDetialToolBar').hide();
		$('#saveBtn').hide();
	}else{
		$('#tlbDetialToolBar').show();
		$('#saveBtn').show();
	}
}
/*编辑*/
function openUpdateDemandCombine(index){
	if(index != null || index != ''){
		/* 获取当前选择行 */
		var row = $('#tblFreightDemandCombine').datagrid('getRows')[index];
		if(row.demandCombineStatus == DEMAND_COMBINE_STATUS_CREATE){
			/* 获取当前选择行 */
			openDialog("dlgFreightDemandCombine", '编辑需求组合');
			enableBtn(false);
			if(row.createTime)row.createTime = formatTime(row.createTime);		
			//row.updateTime = formatTime(row.updateTime);		
			if(row.executeTime)row.executeTime= formatDate(row.executeTime);		
			$("#formDemandCombine").form('clear');
			$("#formDemandCombine").form('load', row);		
			var datagrid = $('#tblDemandCombineDetail').datagrid('options');
			datagrid.url = rootPath + "/freightDemandCombine/findByDemandDetail.do";
			$('#tblDemandCombineDetail').datagrid('load', {
				demandCombineCode : row.demandCombineCode,
				demandCombineType: row.demandCombineType
			});
		}else{
			showInfoMsg("选中的单据为"+getTypeNameByCode("DEMAND_COMBINE_STATUS", row.demandCombineStatus)+", 不可编辑,请选择一条"+getTypeNameByCode("DEMAND_COMBINE_STATUS", DEMAND_COMBINE_STATUS_CREATE)+"的单据进行操作！");
		}
	}
}
/*保存*/
function saveDemandCombine(){
	var rows = $("#tblDemandCombineDetail").datagrid("getData");
	if (rows.total < 1) {
		showInfoMsg( "货运需求明细不可为空!");
		return;
	}
	/**判断需求明细 begin*/
	var flag =true;
	var combineRow = $('#tblFreightDemandCombine').datagrid('getSelected');
	rows.rows.map(function(model){
		/**判断进出港或者需求类型一致*/
		if(model.businessMode != combineRow.businessMode||model.demandType != combineRow.demandCombineType){
			//showInfoMsg("需求信息错误! 需求 与 需求组合的 业务模式 或者 类型不一致! ");
			flag =false;
			return;
		}else{
			/**如果进港*/
			if(combineRow.businessMode==BUSINESS_MODE_IN){
				if(model.beginStationCode != combineRow.stationCode){
					//showInfoMsg("需求信息错误!  需求 与 需求组合的分组分拨 不一致");
					flag =false;
					return;
				}
			}
			/**如果出港*/
			if(model.businessMode==BUSINESS_MODE_OUT){
				if(model.endStationCode != combineRow.stationCode){
					//showInfoMsg("需求信息错误!  需求分拨中心 与 需求组合的分拨中心 不一致");
					flag =false;
					return;
				}
			}
			
		}
	});
	if(!flag){
		showInfoMsg( "货运需求明细有误!");
		return;
	}
	/**判断需求明细 end*/
	$("#demandCodes").val(JSON.stringify(rows.rows));
	$('#formDemandCombine').form('submit',{
		   url: rootPath + "/freightDemandCombine/updateFreightDemandCombine.do",
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
				   closeDialog("dlgFreightDemandCombine");
				   $('#tblFreightDemandCombine').datagrid('reload');   
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
function checkDemand(rows, flag){
	
	var combineRow = $('#tblFreightDemandCombine').datagrid('getSelected');
	rows.rows.map(function(model){
		debugger
		/**判断进出港或者需求类型一致*/
		if(model.businessMode != combineRow.businessMode||model.demandType != combineRow.demandCombineType){
			//showInfoMsg("需求信息错误! 需求 与 需求组合的 业务模式 或者 类型不一致! ");
			flag =false;
			return;
		}else{
			/**如果进港*/
			if(combineRow.businessMode==BUSINESS_MODE_IN){
				if(model.beginStationCode != combineRow.stationCode){
					//showInfoMsg("需求信息错误!  需求 与 需求组合的分组分拨 不一致");
					flag =false;
					return;
				}
			}
			/**如果出港*/
			if(model.businessMode==BUSINESS_MODE_OUT){
				if(model.endStationCode != combineRow.stationCode){
					//showInfoMsg("需求信息错误!  需求分拨中心 与 需求组合的分拨中心 不一致");
					flag =false;
					return;
				}
			}
			
		}
	});
}
/*打开需求信息窗口*/
function openAddDemand(typeId,combineQueryFlag){
	openDialog("dlgDemand", "添加需求单据");
	var row = $('#tblFreightDemandCombine').datagrid('getSelected');
	/**根据进出港 业务模型  判断出发点到达点的 下拉框的数据*/
	/**进港  则出发是分拨    到达是网点*/
	if(row.businessMode==BUSINESS_MODE_IN){
		orgCombogrid('findBeginStationCode', {
			orgTypes : [ORG_TYPE_OPERATE_CENTER],
			orgStatus : [ORG_ENABLED],
		});
		orgCombogrid('findEndStationCode', {
			orgTypes : [ORG_TYPE_SITE],
			orgStatus : [ORG_ENABLED],
		});
	}
	/*出港  则出发是网点  进港是分拨*/
	if(row.businessMode==BUSINESS_MODE_OUT){
		orgCombogrid('findBeginStationCode', {
			orgTypes : [ORG_TYPE_SITE],
			orgStatus : [ORG_ENABLED],
		});
		orgCombogrid('findEndStationCode', {
			orgTypes : [ORG_TYPE_OPERATE_CENTER],
			orgStatus : [ORG_ENABLED],
		});
	}
	/*需求网点下拉框*/
	orgCombogrid('findDemandSiteCode', {
		orgTypes : [ORG_TYPE_SITE],
		orgStatus : [ORG_ENABLED],
	});
	$("#fdDemandType").val(row.demandCombineType);
	$("#combineQueryFlag").val(combineQueryFlag);
	$("#fdBuinessMode").val(row.businessMode);
	/*查询条件 需求创建时间 范围控制*/
	dateRange('fdCreateBeginTime','fdCreateEndTime');
	/*查询操作*/
	if($('#fdDemandStatus').combobox('getValue')==''){
		var statusStr =DEMAND_STATUS_SUBMIT
		+","+DEMAND_STATUS_QUOTE_NO
		+","+DEMAND_STATUS_QUOTE_YES;
		$('#hiddenDemandStatus').val(statusStr);
	}else{
		$('#hiddenDemandStatus').val($('#fdDemandStatus').combobox('getValue'));
	}
	var opts=$('#tblDemand').datagrid('options'); 
	opts.url = rootPath + "/freightDemand/findByPagination.do";
	$('#tblDemand').datagrid('load',serializeFormObj("formFindDemand"));
	/*$('#tblDemand').datagrid({
		loadFilter:function(data){
			var rows=$('#tblDemandCombineDetail').datagrid("getData");
			if (rows.total > 0) {
				if (data){
					var result = [];
					var rs= rows.rows;
					var ds =data.rows;
					//var map = new Map();
					var map = {};
					for(var i =0;i<rs.length;i++){
						//map.set(rs[i].id, rs[i])
						map[rs[i].id] = rs[i];
					}
					for (var j =0;j<ds.length;j++) {
						if(!map[ds[j].id]){
							result.push(ds[j]);
						}
					}
					data.rows = result;
					return data;
				}
				return data;
			}else{
				return data;
			}
		}});*/
}

/*重置查询条件*/
function resetFormFindDemand(){
	cancelDateRange('fdCreateBeginTime','fdCreateEndTime')
	$('#formFindDemand').form('reset');
	$("#hidCreateBeginTime").val("");
	 $("#hidCreateEndTime").val("");
}

/*查询需求信息*/
/*根据查询条件查询*/
function findDemand() {
	if ($("#formFindDemand").form('validate')) {
		// 判断时间是否为空
		var createBeginTime = $("#fdCreateBeginTime").datebox("getValue");
		var createEndTime = $("#fdCreateEndTime").datebox("getValue");
		 if(createBeginTime != null && createBeginTime != ''){
			 if(createEndTime == null || createEndTime == ''){
				 showInfoMsg( "请选择创建时间的终止日期!");
				 return false;
			 }
		 }
		 if(createEndTime != null && createEndTime != ''){
			 if(createBeginTime == null || createBeginTime == ''){
				 showInfoMsg("请选择创建时间的开始日期!");
				 return false;
			 }
		 }
		 if(createBeginTime&&createEndTime){
			 $("#hidCreateBeginTime").val(createBeginTime+" 00:00:00");
			 $("#hidCreateEndTime").val(createEndTime+" 23:59:59");
		 }
		/*查询操作*/
		 if($('#fdDemandStatus').combobox('getValue')==''){
			var statusStr =DEMAND_STATUS_SUBMIT
			+","+DEMAND_STATUS_QUOTE_NO
			+","+DEMAND_STATUS_QUOTE_YES;
			$('#hiddenDemandStatus').val(statusStr);
		}else{
			$('#hiddenDemandStatus').val($('#fdDemandStatus').combobox('getValue'));
		}
		$('#tblDemand').datagrid('load',serializeFormObj("formFindDemand"));
	}
}
/**
 * 将需求添加到需求组合
 */
function addDemand(){
	/*** 将已选中数据存入map*/
	var data=$("#tblDemandCombineDetail").datagrid('getData');
	var map ={};
	data.rows.map(function(model){
		map[model.demandCode]=model;
	});
	/** * 将添加数据存入map */
	var rows=$("#tblDemand").datagrid('getSelections');
	rows.map(function(model){
		map[model.demandCode]=model;
	});
	/** * 清除原有数据*/
	$('#tblDemandCombineDetail').datagrid('loadData', { total: 0, rows: [] });
	/**重新添加数据*/
	if(rows.length>0&& rows[0]){
		 for(var key in map)  {  
			$('#tblDemandCombineDetail').datagrid('appendRow',map[key])//这里循环添加在另一个datagrid选择的行 
		}
		closeDialog('dlgDemand');
	}else {
		showInfoMsg( "请选中明细数据!");
	}
}
/**
 * 删除需求
 */
function deleteDemand(){
	var rows=$("#tblDemandCombineDetail").datagrid('getSelections');
	if (rows.length > 0 && rows[0]) {
		 for(var i = 0; i < rows.length; i++){
			var index = $('#tblDemandCombineDetail').datagrid('getRowIndex', rows[i]);
			$('#tblDemandCombineDetail').datagrid('deleteRow', index);
		}
	}else {
		showInfoMsg("请选中明细数据!");
	}
}
/**
 * 已生成的组合可以智能排班
 */
function smartSchedule(){
	var rows = $('#tblFreightDemandCombine').datagrid('getSelections');
	if (rows.length ==1) {
		var row = $('#tblFreightDemandCombine').datagrid('getSelected');
		if(row.demandCombineStatus!=DEMAND_COMBINE_STATUS_CREATE ){
			showInfoMsg("请选择"+getTypeNameByCode("DEMAND_COMBINE_STATUS", DEMAND_COMBINE_STATUS_CREATE)+"的需求组合进行智能排班!");
		}else{
			msg="是否将选中的需求组合进行智能排版? ";
			confirmMsg(msg, function() {
				$.ajax({
					url:  rootPath + '/iaConf/smartSchedule.do',
					data : {
						'combineCode' :row.demandCombineCode,
						'combineSourceType': COMBINE_SOURCE_TYPE_DEMAND
					},
					beforeSend: function(){
						uceLoading.show("请稍后...");
					},
					complete: function(){
						uceLoading.close();
					},
					task : function(data, statusText, xhr){
						reloadDatagrid('tblFreightDemandCombine');
					}
				});
			});
		}
	}else if (rows.length>1){
		showInfoMsg( "只能选择一条单据进行操作!");
	}else{
		showInfoMsg( "请选中一条单据进行操作!");
	}
}
/**
 * 已排班的生成定价
 * 生成报价 弹出框
 */
function openPriceRule(){
	var rows = $('#tblFreightDemandCombine').datagrid('getSelections');
	if (rows.length ==1) {
		var row = $('#tblFreightDemandCombine').datagrid('getSelected');
		if(row.demandCombineStatus == DEMAND_COMBINE_STATUS_SHIFT_YES){
			openDialog("dlgQuotation",'定价选项-选择定价规则');
			$('#formQuotation').form('clear');
			$('#quotationDemandCombineCode').textbox('setValue',row.demandCombineCode);
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
		        combineCode:row.demandCombineCode,
		          orgCode:row.stationCode,
		          businessMode:row.businessMode,
		          demandType:row.demandCombineType,
		          combineType:COMBINE_SOURCE_TYPE_DEMAND
		      });
		      
		}else{
			showInfoMsg( "只能选择一条"+getTypeNameByCode("DEMAND_COMBINE_STATUS", DEMAND_COMBINE_STATUS_SHIFT_YES)+"单据进行操作!");
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
		   url: rootPath + '/freightDemandCombine/generateQuotation.do',
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
				   reloadDatagrid('tblFreightDemandCombine');
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
 * 可报价 的需求可以 发送网点审核
 * 发送网点审核
 */
function sendQuote(){
	var rows = $('#tblFreightDemandCombine').datagrid('getSelections');
	if (rows.length >0) {
		var msg="";
		rows.map(function(model){
			if(model.demandCombineStatus==DEMAND_COMBINE_STATUS_CREATE ){
				if(msg.indexOf(getTypeNameByCode("DEMAND_COMBINE_STATUS", DEMAND_COMBINE_STATUS_CREATE)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_COMBINE_STATUS", DEMAND_COMBINE_STATUS_CREATE)+'、';
				}
			}else if(model.demandCombineStatus==DEMAND_COMBINE_STATUS_SHIFT_YES ){
				if(msg.indexOf(getTypeNameByCode("DEMAND_COMBINE_STATUS", DEMAND_COMBINE_STATUS_SHIFT_YES)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_COMBINE_STATUS", DEMAND_COMBINE_STATUS_SHIFT_YES)+'、';
				}
			}else if(model.demandCombineStatus==DEMAND_COMBINE_STATUS_QUOT_YES){
				if(msg.indexOf(getTypeNameByCode("DEMAND_COMBINE_STATUS", DEMAND_COMBINE_STATUS_QUOT_YES)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_COMBINE_STATUS", DEMAND_COMBINE_STATUS_QUOT_YES)+'、';
				}
			}else if(model.demandCombineStatus==DEMAND_COMBINE_STATUS_END ){
				if(msg.indexOf(getTypeNameByCode("DEMAND_COMBINE_STATUS", DEMAND_COMBINE_STATUS_END)) == -1){
					msg =msg+getTypeNameByCode("DEMAND_COMBINE_STATUS", DEMAND_COMBINE_STATUS_END)+'、';
				}
			}
		});//选中的数据中 含有
		if(msg!=""){
			showInfoMsg("选中的单据中 含有 "+msg.substring(0,msg.length-1)+" 的需求单据, 请选择"+getTypeNameByCode("DEMAND_COMBINE_STATUS", DEMAND_COMBINE_STATUS_QUOT_NO)+"的需求组合进行发送报价!");
		}else{
			var codes=[];
			rows.map(function(model){
				codes.push(model.demandCombineCode);
			});
			msg="是否发送选中的需求组合到网点审核报价? ";
			confirmMsg(msg, function() {
				$.ajax({
					url: rootPath + '/freightDemandCombine/sendQuotation.do',
					data : {
						'combineCodes' :JSON.stringify(codes)
					},
					task : function(data, statusText, xhr){
						reloadDatagrid('tblFreightDemandCombine');
					}
				});
			});
		}
	}else{
		showInfoMsg( "请选中数据进行操作!");
	}
}

/**
 * 终止需求组合 
 * 已报价状态的需求组合不能终止
 */
function endDemandCombine(){
	var rows = $('#tblFreightDemandCombine').datagrid('getSelections');
	if (rows.length >0) {
		var flag =false;
		var msg="";
		rows.map(function(model){
			if(model.demandCombineStatus== DEMAND_COMBINE_STATUS_QUOT_YES){//已报价
				if(msg.indexOf('已报价、') == -1){
					msg =msg+'已报价、';
				}
			}else if(model.demandCombineStatus==DEMAND_COMBINE_STATUS_END){//已终止
				if(msg.indexOf('已终止、') == -1){
					msg =msg+'已终止、';
				}
			}
		});
		if(msg!=""){
			$.messager.alert("提示", "选中的数据中 含有"+msg.substring(0,msg.length-1)+" 的需求单据, 不能进行终止操作！", "info");
		}else{
			var codes=[];
			rows.map(function(model){
				codes.push(model.demandCombineCode);
			});
			confirmMsg("是否终止选中的单据? ", function() {
				$.ajax({
					url: rootPath + '/freightDemandCombine/updateCombineStatus.do',
					data : {
						'combineCodes' :JSON.stringify(codes),
						'demandCombineStatus':DEMAND_COMBINE_STATUS_END,
						'demandStatus':DEMAND_STATUS_END
					},
					task : function(data, statusText, xhr){
						reloadDatagrid('tblFreightDemandCombine');
					}
				});
			});
		}
	}else{
		$.messager.alert("提示", "请选中单据进行操作！", "info");
	}
}

/**
 * 班次微调
 */
function scheduleFineTune(){
	/* 获取当前选择行 */
	var rows = $('#tblFreightDemandCombine').datagrid('getSelections');
	if (rows.length ==1) {
		var row = $('#tblFreightDemandCombine').datagrid('getSelected');
		openDialog("dlgFineTune", "排班微调");
		$("#formFineTune").form('clear');
		$("#hideDeCombinCode").val(row.demandCombineCode);
		$("#deCombinCode").textbox('setValue',row.demandCombineCode);
		uceDictCombobox('deCombinType', 'DEMAND_COMBINE_TYPE');
		

	}else if (rows.length>1){
		$.messager.alert("提示", "只能选择一条数据进行操作！", "info");
	}else{
		$.messager.alert("提示", "请选中一条数据进行操作！", "info");
	}
}

/**
 * 重置班次微调form
 */
function resetFormFineTune(){
	$("#formFineTune").form('reset');
	$("#deCombinCode").textbox('setValue',$("#hideDeCombinCode").val());
}

/**
 * 班次微调 保存班次信息
 */
function saveLineGroup(){
	
}

/**
 * 需求组合 对应的需求详情
 */
function showDemands(index){
	debugger
	var row = $('#tblFreightDemandCombine').datagrid('getRows')[index];
	if(row.demandCombineType=='1'){
		var demandurl = rootPath + '/freightDemand/ltforward.do?ltrequiCombinCode='+row.demandCombineCode;
		window.top.vm.openTab('长期货运需求',demandurl,true,999);
	}else{
		var demandurl = rootPath + '/freightDemand/stforward.do?strequiCombinCode='+row.demandCombineCode;
		window.top.vm.openTab('临时货运需求',demandurl,true,999);
	}
}
/**
 * 需求组合 对应的班次详情
 */
function showLineGroups(index){
	debugger
	var row = $('#tblFreightDemandCombine').datagrid('getRows')[index];	
	var linegroupurl = rootPath+"/workScheduleRule/forward.do?requiCombinCode="+row.demandCombineCode;
	window.top.vm.openTab('班次管理',linegroupurl,true,999);
}
/**
 * 需求组合 对应的发车计划详情
 */
function showDriverPlans(index){
	debugger
	var row = $('#tblFreightDemandCombine').datagrid('getRows')[index];	
	var planurl = rootPath+"/departurePlan/forward.do?requiCombinCode="+row.demandCombineCode;
	window.top.vm.openTab('发车计划管理',planurl,true,999);
}



