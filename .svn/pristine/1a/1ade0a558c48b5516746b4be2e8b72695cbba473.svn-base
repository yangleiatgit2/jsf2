$(function() {
	//初始化数据字典
	//initDictDatas(''/*数据字典编号*/);
	/* 数据字典加载 */
	//uceDictCombobox(''/*控件id*/, ''/*数据字典编号*/);
	/**
	 * 控制角色操作区是否显示
	 * @param psColumn 操作列显示总控
	 * @param... psButtonXXX 单个按钮是否有权限码
	 * @PS:如果放至列内会多次调用权限码校验方法
	 */
	var psOptControl ={
		psColumn:dealPermission(['iaConf_edit']),
		psButtonEdit:(dealPermission(['iaConf_edit']) ? 'none' : 'bolck')
	};
	
	var columns = [[
		{field : "id", checkbox:true},
		{field : 'deal',hidden:psOptControl.psColumn,title : '操作',align : 'center',width : 50,formatter:function(value, rec, index){
			return '<a class="icon-line iconfont uce-edit" style="display:'+ psOptControl.psButtonEdit+'" title="编辑" onclick="openEditIAConf(\''+index+'\')" href="javascript:void(0)"></a>';
        }},
		{field : 'orgCode',title : '分拨中心',align : 'center',width : 100,
			formatter : function(value, rec, index){
				return "<a title='" + rec.orgName + "'>" + rec.orgName + "</a>"
			}},
		{field : 'fullLoadRate',title : '满载率阈值',align : 'center',width : 80,
			formatter : function(value, rec, index) {
					if(value){
						return (value * 100) + "%";
					}
					return  0 + "%";
				}
		},
		{field : 'arrivalTimeThreshold',title : '到达时间阈值(分钟)',align : 'center',width : 100,formatter : formatTip},
		{field : 'maxParallelTimes',title : '并行到集货点的最大行驶时间(分钟)',align : 'center',width : 180,formatter : formatTip},
		{field : 'maxParallelVolume',title : '并行网点货量最大值(方)',align : 'center',width : 150,formatter : formatTip},
		{field : 'capacitySlack',title : '集货点处理能力松弛系数',align : 'center',width : 150,formatter : formatDouble},
	]];
	var dataGridParams = {
		url : '',
		pageSize : 10,
		toolbar : '#tlbIAConf',
		singleSelect : 'true',
		fitColumns : 'true'
	}
	/* 加载表单数据 */
	newloadGrid('dgIAConf', columns, dataGridParams);
	
	
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
function findIAConf(){
	var datagrid = $('#dgIAConf').datagrid('options');
	datagrid.url = rootPath + '/iaConf/findByPagination.do';
	$('#dgIAConf').datagrid('load',serializeFormObj('formCondition'));
}

/**
 * 重置查询参数
 */
function resetIAConf(){
	//重置表单
	$('#formCondition').form('reset');
}

/**
 * 新增算法参数
 */
function openAddIAConf(){
	orgCombogrid('cmbgdOrgCode', {
		orgTypes : ORG_TYPE_OPERATE_CENTER,
		orgStatus : ORG_ENABLED
	});
	$('#formIAConf').form('clear');
	//取消分拨中心只读
	cancleReadOnly();
	//打开新增界面
	openDialog('dlgIAConf','新增算法参数');
	url = rootPath + '/iaConf/addIaConf.do';
}

/**
 * 编辑算法参数
 */
function openEditIAConf(index){
	orgCombogrid('cmbgdOrgCode', {orgTypes : ORG_TYPE_OPERATE_CENTER});
	//获取选中行
	var row = $('#dgIAConf').datagrid('getRows')[index];
	if(!row){
		return showInfoMsg('请选择需要编辑的数据！');
	}
	var temp = JSON.parse(JSON.stringify(row));;
	$('#formIAConf').form('clear');
	$("#cmbgdOrgCode").combogrid("grid").datagrid("reload",{"q":temp.orgCode});
	//设置分拨中心只读
	setReadOnly();
	openDialog('dlgIAConf','编辑算法参数');
	if(temp.fullLoadRate){
		temp.fullLoadRate = temp.fullLoadRate * 100;
	}
	//加载form表单
	$('#formIAConf').form('load', temp);
	url = rootPath + '/iaConf/updateIaConf.do';
}

/**
 * 保存算法参数
 */
function saveIAConf(){
	if(!$('#formIAConf').form('validate')) {
		return;
	}
	//机构名
	var orgName = $('#cmbgdOrgCode').combogrid('getText');
	$('#hideOrgName').val(orgName);
	var row = serializeFormObj('formIAConf');
	//到达时间阈值，为空默认是0
	if(!row.arrivalTimeThreshold){
		row.arrivalTimeThreshold = 0;
	}
	//为空默认1，后台存储0.85这样，除以100
	if(!row.fullLoadRate){
		row.fullLoadRate = 1;
	}else{
		row.fullLoadRate = row.fullLoadRate / 100;
	}
	uceLoading.show("请稍后...");
	$.ajax({
		url: url,
		data: row,
		task: function(data,statusText,xhr){
			$('#dlgIAConf').dialog('close');
			$('#formIAConf').form('clear');
			uceLoading.close(1);
			$('#dgIAConf').datagrid('reload');
		},
		fail: function(data,statusText,xhr){
			uceLoading.close(1);
		}
	});
}

/**
 * 关闭算法参数
 */
function closeIAConf(){
	closeDialog('dlgIAConf');
}

/**
 * 导出智能算法参数
 */
function exportIAConf(){
	var rows = $('#dgIAConf').datagrid('getRows');
	if(!rows || rows.length <= 0){
		showInfoMsg("没有查询到数据，无法导出！");
		return;
	}
	$('#formCondition').form('submit',{
		url: rootPath + '/iaConf/exportXls.do',
    });
}

/**
 * 编辑时设置分拨中心只读
 */
function setReadOnly(){
	$('#cmbgdOrgCode').combogrid({readonly:true});
}

/**
 * 取消分拨中心只读
 */
function cancleReadOnly(){
	$('#cmbgdOrgCode').combogrid({readonly:false});
}

