$.extend($.fn.datagrid.methods, {
	editCell: function(jq,param){
		return jq.each(function(){
			var opts = $(this).datagrid('options');
			var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
			for(var i=0; i<fields.length; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor1 = col.editor;
				if (fields[i] != param.field){
					col.editor = null;
				}
			}
			$(this).datagrid('beginEdit', param.index);
			for(var i=0; i<fields.length; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor = col.editor1;
			}
		});
	}
});
// 扩展validatebox,新增校验规则
$(function() {
	initDictDatas('BUSINESS_MODE,GROUP_TYPE,PRICING_RULE_STATUS,CAR_TYPE');
	/* 加载主界面grid */
	var columns = [ [
	                {field : "id",checkbox : "true"},
	                {field : 'des',title : '操作',align : 'center',width : 150,formatter:function(value, rec, index){
	                	return setAction(value, rec, index);
	                }},
	                {field : 'workCenterName',title : '分拨中心',align : 'center',width : 150,formatter : formatTip},
	                {field : 'ruleTypeCode',title : '定价分类规则号',align : 'center',width : 150,formatter : formatTip},
	                {field : 'total',title : '定价分类数量',align : 'center',width : 100,formatter : formatTip},
	                {field : 'groupType',title : '组合类型',align : 'center',width : 100,formatter : function(value){
	                	return getTypeNameByCode("GROUP_TYPE", value,formatTip);
	                }},
	                {field : 'businessType',title : '业务分类',align : 'center',width : 100,formatter : function(value){
	                	return getTypeNameByCode("BUSINESS_MODE", value,formatTip);
	                }},
	                {field : 'createEmp',title : '创建人',align : 'center',width : 80,formatter : formatTip},
	                {field : 'updateEmp',title : '修订人',align : 'center',width : 80,formatter : formatTip},
	                {field : 'status',title : '状态',align : 'center',width : 80,formatter : function(value){
	                	return getTypeNameByCode("PRICING_RULE_STATUS", value,formatTip);
	                }},
	                {field : 'ruleTypeVesion',title : '版本号',align : 'center',width : 50,formatter : formatTip}
		            ] ];

	var dataGridParams = {
		url : '',
		pageSize : 10,
		toolbar : '#tlbPricingRuleType',
		singleSelect : 'false',
		fitColumns : 'false',
		onLoadSuccess : function(data) {
			$(this).datagrid("fixRownumber");
		}
	}
	/* 加载表单数据 */
	newloadGrid('tblPricingRuleType', columns, dataGridParams);

	/* 明细表单 */
	var detailColumns = [ [
	                       {field : "act",checkbox : "true"},
	                       {field : 'pricingType',title : '定价分类',align : 'center',width : 150,formatter : function(value){
								return getTypeNameByCode("CAR_TYPE", value,formatTip);
							},editor:{type:'combobox', options:{
								valueField : 'typeCode',  
	                            textField : 'typeName',
	                            data : DictDatas['CAR_TYPE'].slice(0)
							}}},
							{field : 'total',title : '绑定网点数量',align : 'center',width : 150,formatter : function(value, rec, index){
								return rec.utf1?formatTip(rec.utf1.split(',').length) : formatTip(0);
							}},
							{field : 'createEmp',title : '创建人',align : 'center',width : 150,formatter : formatTip},
							{field : 'createTime',title : '创建人时间',align : 'center',width : 150,formatter : function(value) {
								return formatData(value)
							}}
	                     ] ]

	var detailParams = {
		url : '',
		pageSize : 10,
		toolbar : '#tlbDetial',
		singleSelect : 'false',
		fitColumns : 'true',
		pagination : 'false'
	}
	/* 加载表单数据 */
	newloadGrid('tblDetial', detailColumns, detailParams);
	$('#tblDetial').datagrid({pagination:false});
	
	var siteColumns = [ [ {field : 'act',title : '操作',align : 'center',width : 50,formatter : function(value, rec, index){
						return '<a class="icon-line iconfont uce-delete" title="删除" onclick="deleteSite(\''+index+'\')" href="javascript:void(0)"></a>';
					}},
					{field : 'siteCode',title : '网点编码',align : 'center',width : 80,formatter : formatTip},
					{field : 'siteName',title : '网点名称',align : 'center',width : 80,formatter : formatTip}
				 ] ]
	
	var siteParams = {
			url : '',
			pageSize : 100,
			toolbar : '',
			singleSelect : 'true',
			fitColumns : 'true'
		}

	newloadGrid('tblSite', siteColumns, siteParams);
	$('#tblSite').datagrid({pagination:false});
	
	/*设置查看历史版本*/
	/*columns[0][1].hidden=true;*/
	columns[0][1].width=60;
	dataGridParams.toolbar='';
	newloadGrid('tblHisPricingRuleType', columns, dataGridParams);
	
	/* 数据字典加载 */
	uceDictCombobox('findbusinessType','BUSINESS_MODE');
	uceDictCombobox('findgroupType','GROUP_TYPE');
	uceDictCombobox('findruleTypeCode','PRICING_RULE_STATUS');
	uceDictCombobox('txtBusinessType','BUSINESS_MODE');
	uceDictCombobox('txtGroupType','GROUP_TYPE');
	uceDictCombobox('txtPricingType','CAR_TYPE');
	
	orgCombogrid('findworkCenterCode',{orgTypes:ORG_TYPE_OPERATE_CENTER,orgStatus: ORG_ENABLED});
	orgCombogrid('txtWorkCenterName',{orgTypes:ORG_TYPE_OPERATE_CENTER,orgStatus: ORG_ENABLED, onSelect:setSiteCodeDataSoure});
});

/* 请求地址 */
var url = '';
var isEdit = false;
function openAddPricingRuleType(){
	isEdit = false;
	setEditControl(false);
	openDialog("dlgPricingRuleType", '新增');
	$("#formPricingRuleType").form('clear');
	$("#formPricingRuleType").form('reset');
	$('#tblDetialToolBar').show();
	$('#divPricingRuleTypeBtn .save').show();
	url = rootPath + '/pricingRuleType/savePricingRuleType.do';
	/* 清空明细 */
	$('#tblDetial').datagrid('loadData', {total : 0,rows : []});
}
/**
 * 查询
 */
function findPricingRuleType(){
	var datagrid = $('#tblPricingRuleType').datagrid('options');
	datagrid.url =  rootPath + "/pricingRuleType/findAll.do";
	$('#tblPricingRuleType').datagrid('load',serializeFormObj("formFindPricingRuleType"));	
}

function closePricingRuleType(){
	$('#dlgPricingRuleType').window('close');
}

function savePricingRuleType(){
	var buzType = $('#txtBusinessType').combobox('getValue');
	var groupType = $('#txtGroupType').combobox('getValue');
	if (!buzType) {
		$.messager.alert("提示", "业务分类不可为空！", "info");
		return false;
	}
	if (!groupType) {
		$.messager.alert("提示", "组合类型不可为空！", "info");
		return false;
	}
	//明细组装json对象
	var rows = $('#tblDetial').datagrid('getRows');
	if (rows.length < 1) {
		$.messager.alert("提示", "明细不可为空！", "info");
		return false;
	}
	
	//校验定价分类重复
	var ruleTypes  = '';
	var siteCodes = '';
	for (var int = 0; int < rows.length; int++) {
		if(ruleTypes.indexOf(rows[int].pricingType) > -1){
			$.messager.alert("提示", "定价分类不可重复！", "info");
			return false;
		}
		var sites = rows[int].utf1.split(',');
		if (sites) {			
			for (var j = 0; j < sites.length; j++) {
				if(siteCodes.indexOf(sites[j]) > -1 && sites[j]){
					$.messager.alert("提示", "明细绑定网点不可重复！", "info");
					return false;
				}
			}
		}
				
		siteCodes += ',' + rows[int].utf1;
		ruleTypes += ','+ rows[int].pricingType;
	}

	$('#hidTotal').val(rows.length);
	$('#txtDetails').val(JSON.stringify(rows));
	
	//机构名
	var orgName = $('#txtWorkCenterName').combogrid('getText');
	$('#hidWorkCenterName').val(orgName);
	//调用后台保存方法
	$("#formPricingRuleType").form('submit', {
		url : url,
		onSubmit : function() {
			if ($(this).form('validate')) {
				return true;
			}
			return false;
		},
		task : function(result) {
			closeDialog("dlgPricingRuleType");
			reloadDatagrid('tblPricingRuleType');
		}
	});
}

/**
 * 设置操作列按钮显示
 */
function setAction(value, rec, index){
	//状态为已生成，版本升级，查看历史版本不可显示
	//状态为正式版本，审核不可显示
	var str = '';
	//临时硬编码
	//判断是否历史版本
	if(rec.deleteFlag){
		str +='<a class="icon-line iconfont uce-see-details" title="查看详情" onclick="showDetail(\''+index+'\')" href="javascript:void(0)"></a>';
	}else{
		if (rec.status == '01') {
			str +='<a class="icon-line iconfont uce-edit" title="编辑" onclick="openUpdatePrice(\''+index+'\')" href="javascript:void(0)"></a>';
		} else if(rec.status == '02'){
			str +='<a class="icon-line iconfont uce-export" title="版本升级" onclick="updateVersion(\''+index+'\')" href="javascript:void(0)"></a>';
			if (rec.ruleTypeVesion > 1) {
				str += '<a class="icon-line iconfont uce-ck-details" title="显示历史版本" onclick="showHistory(\''+index+'\')" href="javascript:void(0)"></a>';
			}
		}
	}
	return str;
}

function openAddDetail(){
	//判断中心是否选择
	if(checkWorkCenter()){
		openDialog("dlgRuleType", '选择定价分类');
		$('#txtPricingType').textbox({readonly:false});
		$("#formPricingType").form('clear');
	}
}

function deleteDetail(){
	// 单选处理
	var rows = $('#tblDetial').datagrid("getSelections");
	if (rows.length > 0 && rows[0]) {
		confirmMsg('您确定要删除吗?', function() {
			rows.map(function(i){
				var index = $('#tblDetial').datagrid('getRowIndex', i);
				$('#tblDetial').datagrid('deleteRow', index);
			})
			/*var index = $('#tblDetial').datagrid('getRowIndex', rows[0]);
			$('#tblDetial').datagrid('deleteRow', index);*/
		});
	} else {
		$.messager.alert("提示", "请选中明细数据！", "info");
	}
}

/**
 * 校验分拨中心是否选择
 */
function checkWorkCenter(){
	var workCenterCode = $('#txtWorkCenterName').combogrid('getValue');
	if (!workCenterCode) {
		$.messager.alert("提示", "请选择分拨中心！", "info");
		return false;
	}
	return true;
}

/**
 * 校验是否选择明细
 */
function checkChoseDetail(){
	var detRows = $('#tblDetial').datagrid('getSelected');
	if(!detRows){
		$.messager.alert("提示", "请选择分类明细！", "info");
		return false;
	}
	return detRows.pricingType;
}

function bindWorkCenter(){
	if(checkWorkCenter()&&checkChoseDetail()){
		var pricingType = checkChoseDetail();
		openDialog("dlgRuleType", '绑定网点');
		$("#formPricingType").form('clear');
		$('#txtPricingType').combobox({readonly:true});
		$('#txtPricingType').combobox("setValue", pricingType);
	}
}

/**
 * 解绑方法
 * @returns {Boolean}
 */
function unBindWorkCenter(){
	var detRows = $('#tblDetial').datagrid('getSelected');
	console.log(JSON.stringify(detRows));
	if(!detRows){
		$.messager.alert("提示", "请选择分类明细！", "info");
		return false;
	}
	var sites = detRows.utf1.split(',');
	if(!sites[0]){return false;}
	if(!sites){return;}
	//获取网点编号
	openDialog("dlgSite", '解绑网点');
	var siteNames = detRows.utf2.split(',');
	var siteRows = [];
	for (var int = 0; int < sites.length; int++) {
		var siteRow = {
			siteCode : sites[int],
			siteName : siteNames[int]
		};
		siteRows.push(siteRow);
	}
	
	//组装网点表单数据
	$('#tblSite').datagrid('loadData', siteRows);
}

/**
 * 保存明细
 */
function saveRuleType(){
	$('#hidSiteName').val($('#txtWorkCenterNameC').combogrid('getText'));
	//获取表单数据
	var data = serializeFormObj('formPricingType');
	data.utf1 = data.siteCode;
	data.utf2 = data.siteName;
	//判读中心是否选择 选择为1，不选择为0
	data.total = data.utf1 ? 1 : 0;
	//获取明细所有数据，通过定价分类判断和网点判断
	var detRows = $('#tblDetial').datagrid('getRows');
	//明细组合成map对象
	var map = new Map();
	detRows.map(function(i){
		map[i.pricingType] = i;
	});
	
	if(!map[data.pricingType]){
		$('#tblDetial').datagrid('appendRow', data);
	}else{
		//存在，但是utf1不存在
		var obj = map[data.pricingType];
		if(obj.utf1.indexOf(data.utf1)<0){
			//查找对象所在表格索引
			var i = $('#tblDetial').datagrid('getRowIndex', obj);
			obj.total = obj.total + 1;
			obj.utf1 = obj.utf1 ? obj.utf1 + ',' + data.utf1 : data.utf1;
			obj.utf2 = obj.utf2 ? obj.utf2 + ',' + data.utf2 : data.utf2;
			$('#tblDetial').datagrid('updateRow',{index:i,row:obj});
			$('#tblDetial').datagrid('refreshRow',i);
		}
	}
	if(detRows.length < 1){
		$('#tblDetial').datagrid('appendRow', data);
	}
	$('#dlgRuleType').window('close');
}

/**
 * 设置网点数据源
 */
function setSiteCodeDataSoure(index, row){
	//设置中心名称
	//$('#hidWorkCenterName').val($('#txtWorkCenterName').combogrid('getText'));
	var workCenterCode = $('#txtWorkCenterName').combogrid('getValue');
	//设置网点数据源  TODO 以后修改为对应分拨下的网点，现在测试算法暂时忽略
	//orgCombogrid('txtWorkCenterNameC',{orgTypes:ORG_TYPE_SITE,orgStatus: ORG_ENABLED,parentOrgCode: workCenterCode,onSelect:setSiteName});
	orgCombogrid('txtWorkCenterNameC',{orgTypes:ORG_TYPE_SITE,orgStatus: ORG_ENABLED,onSelect:setSiteName});
}
/**
 * 删除网点 
 */
function deleteSite(index){
	confirmMsg('您确定要删除吗?', function() {
		$('#tblSite').datagrid('deleteRow', index);
		//重新加载绑定网点的datagrid,不然从上往下删除会找不到index
		var rows = $('#tblSite').datagrid('getRows');
		$('#tblSite').datagrid('loadData',rows);
	})
}

/**
 * 保存网点
 */
function saveSite(){
	//获取接棒窗口数据
	var siteRows = $('#tblSite').datagrid('getRows');
	//更新分类明细
	var total =  siteRows.length;
	var utf1 = '';
	var utf2 = '';
	if(siteRows.length>0){
		siteRows.map(function(i){
			utf1 += i.siteCode+',';
			utf2 += i.siteName+',';
		});
		utf1 = utf1.substring(0,utf1.length-1);
		utf2 = utf2.substring(0,utf2.length-1);
	}
	var detRows = $('#tblDetial').datagrid('getSelected');
	detRows.total = total;
	detRows.utf1 = utf1;
	detRows.utf2 = utf2;
	var index = $('#tblDetial').datagrid('getRowIndex',detRows);
	$('#tblDetial').datagrid('updateRow',{index:index,row:detRows});
	$('#tblDetial').datagrid('refreshRow',index);
	$('#dlgSite').window('close');
}

/**
 * 设置网点名称
 */
function setSiteName(){
	$('#hidSiteName').val($('#txtWorkCenterNameC').combogrid('getText'));
}

/**
 * 
 * @param 编辑定价规则
 */
function openUpdatePrice(index){
	isEdit = true;
	var row = $('#tblPricingRuleType').datagrid('getRows')[index];
	url = rootPath + '/pricingRuleType/updatePricingRuleType.do';
	openDialog("dlgPricingRuleType", '编辑');
	//设置不可编辑控制
	setEditControl(true);
	$('#formPricingRuleType').form('load',row);
	//下拉表格赋值
	$('#txtWorkCenterName').combogrid('grid').datagrid('reload', {'q' : row.workCenterCode});
	$('#tblDetialToolBar').show();
	//设置明细数据查询
	var datagrid = $('#tblDetial').datagrid('options');
	datagrid.url = rootPath + "/pricingRuleTypeDetail/getGroupByCondition.do";
	$('#tblDetial').datagrid('load', {ruleTypeCode : row.ruleTypeCode,deleteFlag : false});
	//如果是编辑则处理
	if(isEdit){
		var workCenterCode =  $('#txtWorkCenterName').combogrid('getValue');
		//orgCombogrid('txtWorkCenterNameC',{orgTypes:ORG_TYPE_SITE,orgStatus: ORG_ENABLED,parentOrgCode: workCenterCode,onSelect:setSiteName});
		//TODO 方便测试暂时注释
		orgCombogrid('txtWorkCenterNameC',{orgTypes:ORG_TYPE_SITE,orgStatus: ORG_ENABLED});
	}
	$('#divPricingRuleTypeBtn .save').show();
}
/**
 * 设置控件编辑
 * @param flag
 */
function setEditControl(flag){
	$('#txtWorkCenterName').combogrid({readonly : flag,required : !flag});
	$('#txtBusinessType').combobox({readonly : flag});
	$('#txtGroupType').combobox({readonly : flag});
	$('#txtRuleTypeDesc').textbox({readonly : flag});
}

/**
 * 审核
 */
function verifyPricingRuleType(index){
	var row = $('#tblPricingRuleType').datagrid('getRows')[index];
	confirmMsg('您确定要审核吗?', function() {
		verify(row);
	});
}

function verify(row){
	row.createTime = formatTime(row.createTime);
	row.updateTime = formatTime(row.updateTime);
	$.ajax({
		url : rootPath + '/pricingRuleType/verifyPricingRuleType.do?',
		data :row,
		task : function(data, statusText, xhr) {
			reloadDatagrid('tblPricingRuleType');
		}
	});
}

/**
 * 版本升级
 * @param index
 */
function updateVersion(index){
	var row = $('#tblPricingRuleType').datagrid('getRows')[index];
	$('#txtWorkCenterName').combogrid('grid').datagrid('reload', {'q' : row.workCenterCode});
	url = rootPath + '/pricingRuleType/updateDetailVersion.do';
	openDialog("dlgPricingRuleType", '版本升级');
	setEditDetail(row);
	//隐藏工具栏
	$('#tblDetialToolBar').show();
	$('#divPricingRuleTypeBtn .save').show();
	orgCombogrid('txtWorkCenterNameC',{orgTypes:ORG_TYPE_SITE,orgStatus: ORG_ENABLED});
	/*var row = $('#tblPricingRuleType').datagrid('getRows')[index];
	row.createTime = formatTime(row.createTime);
	row.updateTime = formatTime(row.updateTime);
	confirmMsg('您确定要升级吗?', function() {
		$.ajax({
			url : rootPath + '/pricingRuleType/updateVersion.do?',
			data : row,
			task : function(data, statusText, xhr) {
				reloadDatagrid('tblPricingRuleType');
			}
		});
	});*/
}

/**
 * 设置编辑详情窗口
 */
function setEditDetail(row){
	//设置不可编辑控制
	setEditControl(true);
	$('#formPricingRuleType').form('load',row);
	//设置明细数据查询
	var datagrid = $('#tblDetial').datagrid('options');
	datagrid.url = rootPath + "/pricingRuleTypeDetail/getGroupByCondition.do";
	$('#tblDetial').datagrid('load', {ruleTypeCode : row.ruleTypeCode,deleteFlag:false});
}

var editIndex = undefined;
function endEditing(){
	if (editIndex == undefined){return true}
	if ($('#tblDetial').datagrid('validateRow', editIndex)){
		$('#tblDetial').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}

function onClickCell(index, field){
	if (endEditing()){
		$('#tblDetial').datagrid('selectRow', index).datagrid('editCell', {index:index,field:field});
		editIndex = index;
	}
}

/**
 * 显示历史版本
 * @param index
 */
function showHistory(index){
	var row = $('#tblPricingRuleType').datagrid('getRows')[index];
	openDialog("dlgHistory", '查看历史版本');
	var datagrid = $('#tblHisPricingRuleType').datagrid('options');
	datagrid.url = rootPath + "/pricingRuleType/findAll.do";
	$('#tblHisPricingRuleType').datagrid('load', {ruleTypeCode : row.ruleTypeCode,deleteFlag:true});
}

/**
 * 查看详情
 * @param index
 */
function showDetail(index){
	var row = $('#tblHisPricingRuleType').datagrid('getRows')[index];
	openDialog("dlgPricingRuleType", '查看详情');
	setEditControl(true);
	$('#formPricingRuleType').form('load',row);
	//隐藏工具栏
	$('#tblDetialToolBar').hide();
	var datagrid = $('#tblDetial').datagrid('options');
	datagrid.url = rootPath + "/pricingRuleTypeDetail/getGroupByCondition.do";
	$('#tblDetial').datagrid('loadData', {total : 0,rows : []});
	$('#tblDetial').datagrid('load', {ruleTypeId : row.id});
	$('#divPricingRuleTypeBtn .save').hide();
}

/**
 * 多选审批
 */
function verifyPricingRuleTypes(){
	var rows = $('#tblPricingRuleType').datagrid('getSelections');
	if (!rows.length) {
		$.messager.alert("提示", "请选择需审批记录！", "info");
		return false;
	}
	
	for (var int = 0; int < rows.length; int++) {
		if (rows[int].status!='01') {
			$.messager.alert("提示", "只能对已生成的记录审批！", "info");
			return false;
		}
	}
	confirmMsg('您确定要审核吗?', function() {
		for (var int = 0; int < rows.length; int++) {
			verify(rows[int]);
		}
	});
}