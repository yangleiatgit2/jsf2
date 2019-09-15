$(function() {
	//初始化数据字典
	initDictDatas('IA_MONITOR_STATUS,COMBINE_SOURCE_TYPE,DEMAND_TYPE,BUSINESS_MODE'/*数据字典编号*/);
	
	/* 任务状态*/
	uceDictCombobox('cmbStatus'/*控件id*/, 'IA_MONITOR_STATUS'/*数据字典编号*/);
	//需求类型
	uceDictCombobox('cmbDemandType'/*控件id*/, 'DEMAND_TYPE'/*数据字典编号*/);
	//组合来源
	uceDictCombobox('cmbCombineType'/*控件id*/, 'COMBINE_SOURCE_TYPE'/*数据字典编号*/);
	//业务模式
	uceDictCombobox('cmbBusinessMode'/*控件id*/, 'BUSINESS_MODE'/*数据字典编号*/);
	
	/**
	 * 控制角色操作区是否显示
	 * @param psColumn 操作列显示总控
	 * @param... psButtonXXX 单个按钮是否有权限码
	 * @PS:如果放至列内会多次调用权限码校验方法
	 */
	var psOptControl ={
		psColumn:dealPermission(['iaMonitor_redo']),
		psButtonRedo:(dealPermission(['iaMonitor_redo']) ? 'none' : 'bolck')
	};
	var columns = [[
		{field : "id", checkbox:true},
		{field :'deal',hidden:psOptControl.psColumn,title : '操作',align : 'center',width : 50,formatter:function(value, rec, index){
			if(rec.status == '20'){
				return '<a class="icon-line iconfont uce-update" title="重新执行" style="display:'+ psOptControl.psButtonRedo+'" onclick="reSchedule(\''+index+'\')" href="javascript:void(0)"></a>';
			}
        }},
        {field : 'taskCode',title : '任务编号',align : 'center',width : 120,formatter : function(value, rec, index){
        	return '<a style="text-decoration:underline;color:blue;"  onclick="openViewDetail(\''+ index +'\')" title="' + value + '" class="" href="javascript:void(0)">'+value+'</a>';
        }},
		{field : 'orgCode',title : '分拨中心',align : 'center',width : 100,
			formatter : function(value, rec, index){
				return "<a title='" + rec.orgName + "'>" + rec.orgName + "</a>"
			}},
		{field : 'executeTime',title : '执行时间',align : 'center',width : 150,formatter : formatTime},
		{field : 'combineCode',title : '组合编号',align : 'center',width : 120,formatter : formatTip},
		{field : 'demandType',title : '需求类型',align : 'center',width : 80,formatter : function(value, rec, index){
			return getTypeNameByCode("DEMAND_TYPE", value,formatTip);
			}
		},
		{field : 'combineType',title : '组合类型',align : 'center',width : 80,formatter : function(value, rec, index){
			return getTypeNameByCode("COMBINE_SOURCE_TYPE", value,formatTip);
			}
		},
		{field : 'status',title : '任务状态',align : 'center',width : 80,formatter : function(value, rec, index){
			return getTypeNameByCode("IA_MONITOR_STATUS", value,formatTip);
			}
		},
		{field : 'businessMode',title : '业务模式',align : 'center',width : 80,formatter : function(value, rec, index){
			return getTypeNameByCode("BUSINESS_MODE", value,formatTip);
			}
		},
		{field : 'errorMsg',title : '错误信息',align : 'center',width : 250,formatter:formatTip}
	]];
	var dataGridParams = {
		url : '',
		pageSize : 10,
		toolbar : '#tlbIaMonitor',
		singleSelect : 'true',
		fitColumns : 'true'
	}
	
	//查询界面时间
	dateRange("dtStartTime", "dtEndTime");
	
	/* 加载表单数据 */
	newloadGrid('dgIaMonitor', columns, dataGridParams);
	
	
	//机构下拉菜单
	orgCombogrid('cmbgdFindOrgCode', {
		orgTypes : ORG_TYPE_OPERATE_CENTER
		//orgStatus : ORG_ENABLED
	});
});
/* 请求地址 */
var url = '';
/**
 * 查询智能算法参数
 */
function findIaMonitor(){
	// 判断时间是否为空
	var createBeginTime = $("#dtStartTime").datebox("getValue");
	var createEndTime = $("#dtEndTime").datebox("getValue");
	if(createBeginTime != null && createBeginTime != ''){
		if(createEndTime == null || createEndTime == ''){
			showInfoMsg("请选择执行时间止");
			return false;
		}
	}
	if(createEndTime != null && createEndTime != ''){
		if(createBeginTime == null || createBeginTime == ''){
			showInfoMsg("请选择执行时间起");
			return false;
		}
	}
	var datagrid = $('#dgIaMonitor').datagrid('options');
	datagrid.url = rootPath + '/iaMonitor/findByPagination.do';
	var param = serializeFormObj('formCondition');
	if(param.startTime){
		param.startTime = param.startTime + ' 00:00:00';
	}
	if(param.endTime){
		param.endTime = param.endTime + ' 23:59:59';
	}
	$('#dgIaMonitor').datagrid('load',param);
}

/**
 * 重置查询参数
 */
function resetIaMonitor(){
	cancelDateRange('dtStartTime','dtEndTime');
	//重置表单
	$('#formCondition').form('reset');
}

/**
 * 查看详情
 * @param index 行数索引
 */
function openViewDetail(index){
	var row = $('#dgIaMonitor').datagrid('getRows')[index];
	if(row){
		$('#formIaMonitor').form('clear');
		openDialog('dlgIaMonitor','算法任务详情');
		row.executeTime = formatTime(row.executeTime);
		//加载form表单
		$('#formIaMonitor').form('load', row);
	}
}

/**
 * 操作栏
 * @param value
 * @param rec
 * @param index
 * @returns {String}
 */
function setAction(value, rec, index){
	var str = '';
	if(rec.status == '20'){
		str +='<a class="icon-line iconfont uce-turnup" title="重新执行" onclick="reSchedule(\''+index+'\')" href="javascript:void(0)"></a>';
	}
	return str;
}


function reSchedule(index){
	var row = $('#dgIaMonitor').datagrid('getRows')[index];
	if(row){
		
		confirmMsg('是否重新执行该任务？', function(){
			row.combineSourceType = row.combineType;
			uceLoading.show("请稍后...");
			$.ajax({
				url: rootPath + '/iaMonitor/reSchedule.do',
				data: row,
				task: function(data,statusText,xhr){
					uceLoading.close(1);
					$('#dgIaMonitor').datagrid('reload');
				},
				fail: function(data,statusText,xhr){
					uceLoading.close(1);
				}
			});
		}, {}, "重新执行确认")
		
	}
}



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