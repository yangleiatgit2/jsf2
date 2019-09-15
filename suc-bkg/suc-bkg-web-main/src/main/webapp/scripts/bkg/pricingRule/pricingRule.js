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
            var ed = $(this).datagrid('getEditor', param);
            if (ed){
                if ($(ed.target).hasClass('textbox-f')){
                    $(ed.target).textbox('textbox').focus();
                } else {
                    $(ed.target).focus();
                }
            }
			for(var i=0; i<fields.length; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor = col.editor1;
			}
		});
	},
    enableCellEditing: function(jq){
        return jq.each(function(){
            var dg = $(this);
            var opts = dg.datagrid('options');
            opts.oldOnClickCell = opts.onClickCell;
            opts.onClickCell = function(index, field){
                if (opts.editIndex != undefined){
                    if (dg.datagrid('validateRow', opts.editIndex)){
                        dg.datagrid('endEdit', opts.editIndex);
                        opts.editIndex = undefined;
                    } else {
                        return;
                    }
                }
                dg.datagrid('selectRow', index).datagrid('editCell', {
                    index: index,
                    field: field
                });
                opts.editIndex = index;
                opts.oldOnClickCell.call(this, index, field);
            }
        });
    }
});
$(function() {
	//初始化数据字典
	initDictDatas('COMBINE_SOURCE_TYPE,BUSINESS_MODE,DEMAND_TYPE,PRICING_RULE_STATUS,GENERAL_FLAG,CAR_TYPE'/*数据字典编号*/);
	/* 数据字典加载 */
	//业务类型
	uceDictCombobox('cmbBusinessType'/*控件id*/, 'BUSINESS_MODE'/*数据字典编号*/);
	uceDictCombobox('txtBusinessMode'/*控件id*/, 'BUSINESS_MODE'/*数据字典编号*/);
	uceDictCombobox('txtHBusinessMode'/*控件id*/, 'BUSINESS_MODE'/*数据字典编号*/);
	//组合来源
	uceDictCombobox('cmbCombineType'/*控件id*/, 'COMBINE_SOURCE_TYPE'/*数据字典编号*/);
	uceDictCombobox('txtCombineType'/*控件id*/, 'COMBINE_SOURCE_TYPE'/*数据字典编号*/);
	uceDictCombobox('txtHCombineType'/*控件id*/, 'COMBINE_SOURCE_TYPE'/*数据字典编号*/);
	//需求类型
	uceDictCombobox('cmbDemandType'/*控件id*/, 'DEMAND_TYPE'/*数据字典编号*/);
	uceDictCombobox('txtDemandType'/*控件id*/, 'DEMAND_TYPE'/*数据字典编号*/);
	uceDictCombobox('txtHDemandType'/*控件id*/, 'DEMAND_TYPE'/*数据字典编号*/);
	//状态
	uceDictCombobox('cmbStatus'/*控件id*/, 'PRICING_RULE_STATUS'/*数据字典编号*/);
	//通用标识
	uceDictCombobox('cmbGeneralFlag'/*控件id*/, 'GENERAL_FLAG'/*数据字典编号*/);
	
	//车型
	uceDictCombobox('txtViewPriceType', 'CAR_TYPE');
	
	var columns = [[
		{field : "id",checkbox : "true"},
		{field : 'des',title : '操作',align : 'center',width : 150,formatter:function(value, rec, index){
        	return setAction(value, rec, index);
        }},
		{field : 'priceRuleCode',title : '定价规则编号',align : 'center',width : 120,formatter : formatTip},
		{field : 'orgCode',title : '分拨中心',align : 'center',width : 100,
			formatter : function(value, rec, index){
				return "<a title='" + rec.orgName + "'>" + rec.orgName + "</a>"
		}},
		{field : 'combineCode',title : '组合编号',align : 'center',width : 120,formatter : formatTip},
		{field : 'businessMode',title : '业务分类',align : 'center',width : 100,formatter : function(value){
			return getTypeNameByCode("BUSINESS_MODE", value,formatTip);
		}},
		{field : 'priceTypeNum',title : '定价分类数量',align : 'center',width : 100,formatter : formatTip},
		{field : 'combineType',title : '组合来源',align : 'center',width : 100,formatter : function(value){
			return getTypeNameByCode("COMBINE_SOURCE_TYPE", value,formatTip);
		}},
		{field : 'ruleTypeCode',title : '定价分类规则号',align : 'center',width : 120,formatter : formatTip},
		{field : 'demandType',title : '需求类型',align : 'center',width : 120,formatter : function(value){
			return getTypeNameByCode("DEMAND_TYPE", value,formatTip);
		}},
		{field : 'status',title : '状态',align : 'center',width : 100,formatter : function(value){
			return getTypeNameByCode("PRICING_RULE_STATUS", value,formatTip);
		}},
		{field : 'createEmp',title : '创建人',align : 'center',width : 100,formatter : formatTip},
		{field : 'updateEmp',title : '修订人',align : 'center',width : 100,formatter : formatTip},
		{field : 'generalFlag',title : '是否通用',align : 'center',width : 100,formatter : function(value){
			return getTypeNameByCode("GENERAL_FLAG", value,formatTip);
		}},
		{field : 'officialVersion',title : '版本号',align : 'center',width : 50,formatter : formatTip},
	]];
	var dataGridParams = {
		url : '',
		pageSize : 10,
		toolbar : '#tlbPricingRule',
		singleSelect : 'false',
		fitColumns : 'false'
	}
	/* 加载表单数据 */
	newloadGrid('dgPricingRule', columns, dataGridParams);
	

	var historyColumns = [[
		{field : "id",hidden : "true"},
		{field : 'priceRuleCode',title : '定价规则编号',align : 'center',width : 120,formatter : formatTip},
		{field : 'orgCode',title : '分拨中心',align : 'center',width : 100,
			formatter : function(value, rec, index){
				return "<a title='" + rec.orgName + "'>" + rec.orgName + "</a>"
		}},
		{field : 'combineCode',title : '组合编号',align : 'center',width : 120,formatter : formatTip},
		{field : 'businessMode',title : '业务分类',align : 'center',width : 100,formatter : function(value){
			return getTypeNameByCode("BUSINESS_MODE", value,formatTip);
		}},
		{field : 'priceTypeNum',title : '定价分类数量',align : 'center',width : 100,formatter : formatHTypeNum},
		{field : 'combineType',title : '组合来源',align : 'center',width : 100,formatter : function(value){
			return getTypeNameByCode("COMBINE_SOURCE_TYPE", value,formatTip);
		}},
		{field : 'demandType',title : '需求类型',align : 'center',width : 120,formatter : function(value){
			return getTypeNameByCode("DEMAND_TYPE", value,formatTip);
		}},
		{field : 'status',title : '状态',align : 'center',width : 100,formatter : function(value){
			return getTypeNameByCode("PRICING_RULE_STATUS", value,formatTip);
		}},
		{field : 'createEmp',title : '创建人',align : 'center',width : 100,formatter : formatTip},
		{field : 'updateEmp',title : '修订人',align : 'center',width : 100,formatter : formatTip},
		{field : 'generalFlag',title : '是否通用',align : 'center',width : 100,formatter : function(value){
			return getTypeNameByCode("GENERAL_FLAG", value,formatTip);
		}},
		{field : 'officialVersion',title : '版本号',align : 'center',width : 50,formatter : formatTip},
		{field : 'upgradeType',title : '升级类型',align : 'center',width : 50,formatter : formatTip}
	]];
	var historyDgParams = {
		url : '',
		pageSize : 10,
		toolbar : '',
		singleSelect : 'true',
		//fitColumns : 'true'
	}
	/* 加载表单数据 */
	newloadGrid('dgHistoryPricingRule', historyColumns, historyDgParams);
	
	 $('#tblPriceRuleDetail').datagrid().datagrid('enableCellEditing');
	/**详情列表初始化*//*
	var detailColumns = [[
	    {field : "id", checkbox : "true"}, 
	    {field : 'priceType',title : '定价分类',align : 'center',width : 80,formatter : formatTip},
	    {field : 'unitFixedCost',title : '单位固定成本',align : 'center',width : 80,formatter : formatTip},
	    {field : 'unitChangeCost',title : '单位变动成本',align : 'center',width : 80,formatter : formatTip},
	    {field : 'relatedSiteNum',title : '关联网点数量',align : 'center',width : 80,formatter : function(value,rec,index){
	    	return '<a style="text-decoration:underline;color:blue;"  onclick="openViewSite(\''+ index +'\')" title="' + value + '" class="" href="javascript:void(0)">'+value+'</a>';
	    }},
	    {field : 'updateTime',title : '修改时间',align : 'center',width : 80,formatter : formatTime},
	    {field : 'updateEmp',title : '修改人',align : 'center',width : 80,formatter : formatTip},
	]];
	var detaildDgParams = {
			url : '',
			pageSize : 10,
			toolbar : '#tlbDetial',
			singleSelect : 'false',
			fitColumns : 'true'
	}
	 加载表单数据 
	newloadGrid('tblPriceRuleDetail', detailColumns, detaildDgParams);*/
	
	var siteColumns =[[
	    {field : "id", hidden : "true"},
	    {field : 'orgCode',title : '网点编码',align : 'center',width : 120,formatter : formatTip},
	    {field : 'orgName',title : '网点名称',align : 'center',width : 120,formatter : formatTip},
	    {field : 'priceType',title : '定价分类',align : 'center',width : 80,formatter : formatCarType}
	]]
	var siteDgParams = {
			url : '',
			pageSize : 10,
			toolbar : '#tlbSite',
			singleSelect : 'true',
			fitColumns : 'true'
	}
	/* 加载表单数据 */
	newloadGrid('dgSite', siteColumns, siteDgParams);
		
	//查询界面空间
	dateRange("dtStartTime", "dtEndTime");
	//查询条件的定价规则号下拉框
	ruleTypeCombobox();
	
	//机构下拉菜单
	orgCombogrid('cmbgdFindOrgCode', {
		orgTypes : ORG_TYPE_OPERATE_CENTER,
		orgStatus : ORG_ENABLED
	});
	orgCombogrid('cmbgdFindOrgCode', {
		orgTypes : ORG_TYPE_OPERATE_CENTER,
		orgStatus : ORG_ENABLED
	});
	orgCombogrid('txtViewOrgCode', {
		orgTypes : ORG_TYPE_SITE,
		orgStatus : ORG_ENABLED
	});
	
});
/* 请求地址 */
var url = '';

var action = '';//EDIT 编辑 ， UPGRADE 升级
/**
 * 设置操作列按钮显示
 */
function setAction(value, rec, index){
	//状态为已生成，版本升级，查看历史版本不可显示
	//状态为正式版本，审核不可显示
	var str = '';
	if (rec.status == '01') {
		str +='<a class="icon-line iconfont uce-edit" title="编辑" onclick="openEditPricingRule(\''+index+'\')" href="javascript:void(0)"></a>';
	}else if(rec.status == '02'){
		str +='<a class="icon-line iconfont uce-export" title="版本升级" onclick="upgrade(\''+index+'\')" href="javascript:void(0)"></a>';
		if(!rec.generalFlag){
			str +='<a class="icon-line iconfont uce-set" title="设为通用规则" onclick="setGeneral(\''+index+'\')" href="javascript:void(0)"></a>';
		}
		if (rec.officialVersion > 1) {
			str += '<a class="icon-line iconfont uce-ck-details" title="显示历史版本" onclick="showHistory(\''+index+'\')" href="javascript:void(0)"></a>';
		}
	}
	return str;
}

/**
 * 查询
 */
function findPricingRule(){
	var param = serializeFormObj('formCondition');
	// 判断时间是否为空
	var createBeginTime = $("#dtStartTime").datebox("getValue");
	var createEndTime = $("#dtEndTime").datebox("getValue");
	if(createBeginTime != null && createBeginTime != ''){
		if(createEndTime == null || createEndTime == ''){
			showInfoMsg("请选择创建时间止");
			return false;
		}
	}
	if(createEndTime != null && createEndTime != ''){
		if(createBeginTime == null || createBeginTime == ''){
			showInfoMsg("请选择创建时间起");
			return false;
		}
	}
	if(param.startTime){
		param.startTime = param.startTime + ' 00:00:00';
	}
	if(param.endTime){
		param.endTime = param.endTime + ' 23:59:59';
	}
	param.deleteFlag = false;
	var datagrid = $('#dgPricingRule').datagrid('options');
	datagrid.url = rootPath + '/pricingRule/findByPagination.do';
	$('#dgPricingRule').datagrid('load',param);
}

/**
 * 重置查询参数
 */
function resetPricingRule(){
	cancelDateRange('dtStartTime','dtEndTime');
	//重置表单
	$('#formCondition').form('reset');
}


/**
 * 编辑定价规则
 */
function openEditPricingRule(index){
	//获取选中行
	var row = $('#dgPricingRule').datagrid('getRows')[index];
	if(!row){
		return showInfoMsg('请选择需要编辑的数据！');
	}
	if(row.status == 2){
		return showInfoMsg('审核后的数据不能编辑，请通过升级来修改！');
	}
	var temp = JSON.parse(JSON.stringify(row));
	$('#formPricingRule').form('clear');
	//$("#cmbgdOrgCode").combogrid("grid").datagrid("reload",{"q":temp.orgCode});
	var deatilParam = {
		priceRuleCode : temp.priceRuleCode,
		deleteFlag : false
	}
	//加载详情
	var datagrid = $('#tblPriceRuleDetail').datagrid('options');
	datagrid.url = rootPath + '/pricingRule/findDetailsByCondition.do';
	$('#tblPriceRuleDetail').datagrid('load',deatilParam);
	openDialog('dlgPricingRule','定价规则编辑');
	//加载form表单
	$('#formPricingRule').form('load', temp);
	url = rootPath + '/pricingRule/batchUpdateDetail.do';
}




/**
 * 
 * 打开编辑详情dialog
 */
function openEditDetail(){
	//获取选中行
	var row = $('#tblPriceRuleDetail').datagrid('getSelected');
	if(!row){
		return showInfoMsg('请选择需要编辑的数据！');
	}
	var temp = JSON.parse(JSON.stringify(row));
	$('#formPricingRuleDetail').form('clear');
	//$("#cmbgdOrgCode").combogrid("grid").datagrid("reload",{"q":temp.orgCode});
	openDialog('dlgPricingRuleDetail','定价规则编辑');
	//加载form表单
	$('#formPricingRuleDetail').form('load', temp);
	url = rootPath + '/pricingRule/batchUpdateDetail.do';
	action = 'EDIT';
}

/**
 * 关闭详情Dialog
 */
function closePricingRule(){
	closeDialog('dlgPricingRule');
}

/**
 * 保存
 */
function savePricingRule(){
	var rows = $('#tblPriceRuleDetail').datagrid('getRows');
	//升级增加提示框
	if(action == 'UPGRADE'){
		//确认审核
		confirmMsg('【'+$('#txtPriceRuleCode').textbox('getValue') + "】定价规则是否确认升级?", function(){
			save(rows);
		}, {}, "升级确认")
	}else{
		save(rows);
	}
	
}

/**
 * 保存
 * @param rows
 */
function save(rows){
	if(rows){
		var param = serializeFormObj('formPricingRule'); 
		param.pricingRuleDetailVosStr = JSON.stringify(rows);
		uceLoading.show("请稍后...");
		$.ajax({
			url: url,
			data: param,
			task: function(data,statusText,xhr){
				$('#dlgPricingRule').dialog('close');
				$('#formPricingRule').form('clear');
				uceLoading.close(1);
				$('#dgPricingRule').datagrid('reload');
				action = '';
			},
			fail: function(data,statusText,xhr){
				uceLoading.close(1);
			}
		});
	}
}


/**
 * 审核定价规则
 */
function auditPricingRule(){
	//获取选中行
	var rows = $('#dgPricingRule').datagrid('getSelections');
	if(rows && rows.length > 0 ){
		//校验状态是否全是已生成
		for(var i=0;i<rows.length;i++){
			if(rows[i].status != '01'){
				return showInfoMsg('只能对已生成的记录审批！');
			}
		}
		//确认审核
		confirmMsg("是否确认提交审核?", function(){
			var params = [];
			//校验状态是否全是已生成
			for(var i=0;i<rows.length;i++){
				var param ={
					id:rows[i].id,
					version:rows[i].version
				}
				params.push(param);
			}
			uceLoading.show("请稍后...");
			$.ajax({
				url: rootPath + '/pricingRule/auditPricingRule.do',
				//参数放到备用字段utf1
				data: {utf1:JSON.stringify(params)},
				task: function(data,statusText,xhr){
					uceLoading.close(1);
					$('#dgPricingRule').datagrid('reload');
				},
				fail: function(data,statusText,xhr){
					uceLoading.close(1);
				}
			});
		}, {}, "审核确认")
	}else{
		showInfoMsg('请选择需要审批的数据！');
	}
}

/**
 * 版本升级
 */
function upgrade(index){
	var row = $('#dgPricingRule').datagrid('getRows')[index];
	/*if(!row){
		return showInfoMsg('请选择需要升级的数据！');
	}
	if(row.status != 2){
		return showInfoMsg('请选择正式版本数据！');
	}*/
	var temp = JSON.parse(JSON.stringify(row));
	$('#formPricingRule').form('clear');
	//$("#cmbgdOrgCode").combogrid("grid").datagrid("reload",{"q":temp.orgCode});
	var deatilParam = {
		priceRuleCode : temp.priceRuleCode,
		deleteFlag : false
	}
	//加载详情
	var datagrid = $('#tblPriceRuleDetail').datagrid('options');
	datagrid.url = rootPath + '/pricingRule/findDetailsByCondition.do';
	$('#tblPriceRuleDetail').datagrid('load',deatilParam);
	openDialog('dlgPricingRule','定价规则版本升级');
	//加载form表单
	$('#formPricingRule').form('load', temp);
	url = rootPath + '/pricingRule/upgrade.do';
	action = 'UPGRADE';
}

/**
 * 查看历史版本
 */
function showHistory(index){
	var row = $('#dgPricingRule').datagrid('getRows')[index];
	if(row){
		openDialog('dlgShowHistory','显示历史版本');
		var param = {
			priceRuleCode : row.priceRuleCode,
			deleteFlag :true,
			utf1:true /**按版本号倒序排列*/
		}
		var datagrid = $('#dgHistoryPricingRule').datagrid('options');
		datagrid.url = rootPath + '/pricingRule/findByPagination.do';
		$('#dgHistoryPricingRule').datagrid('load',param);
		
	}
}

/**
 * 设置通用
 */
function setGeneral(index){
	var row = $('#dgPricingRule').datagrid('getRows')[index];
	if(row){
		/*if(row.status != '02'){
			showInfoMsg("不是正式版本不可设置通用规则!");
			return;
		}
		if(row.generalFlag){
			showInfoMsg("该规则已经是通用规则！");
			return;
		}*/
		var param = {orgCode:row.orgCode,businessMode:row.businessMode,demandType:row.demandType};
		uceAjax(rootPath + '/pricingRule/isExistGeneral.do', param, function (data){
			var title = '是否确认设定通用定价规则！';
			var utf1 = undefined;
			if(data.data == false){
				title = '是否确认设定通用定价规则！';
			}else{
				title = '每一个分拨中心的每一个定价分类规则只允许有一个通用规则！是否确认设定新的通用规则?';
				utf1 = data.data;
			}
			confirmMsg(title, function(){
				var param = {
						id : row.id,
						version : row.version,
						//如果以前已存在把id放备用字段
						utf1 : utf1
					}
					uceLoading.show("请稍后...");
					$.ajax({
						url: rootPath + '/pricingRule/setGeneral.do',
						data: param,
						task: function(data,statusText,xhr){
							uceLoading.close(1);
							$('#dgPricingRule').datagrid('reload');
						},
						fail: function(data,statusText,xhr){
							uceLoading.close(1);
						}
					});
			},{},'确认设置通用规则');
		})
	}
}

/**
 * 查询关联网点
 * @param index
 */
function openViewSite(index){
	var row = $('#tblPriceRuleDetail').datagrid('getRows')[index];
	if(row){
		$('#formViewSite').form('clear');
		openDialog('dlgViewSite','关联网点');
		$('#formViewSite').form('load', row);
		var datagrid = $('#dgSite').datagrid('options');
		datagrid.url = rootPath + '/pricingRule/findRelByPagination.do';
		var params = serializeFormObj('formViewSite');
		params.deleteFlag = false;
		$('#dgSite').datagrid('load',params);
	}
}

/**
 * 查询历史关联网点
 * @param index
 */
function openHViewSite(index){
	var row = $('#tblHPriceRuleDetail').datagrid('getRows')[index];
	if(row){
		$('#formViewSite').form('clear');
		openDialog('dlgViewSite','关联网点');
		$('#formViewSite').form('load', row);
		var datagrid = $('#dgSite').datagrid('options');
		datagrid.url = rootPath + '/pricingRule/findRelByPagination.do';
		var params = serializeFormObj('formViewSite');
		params.deleteFlag = true;
		$('#dgSite').datagrid('load',params);
	}
}

/**
 * 
 * @param index
 */
function openViewHistorySite(index){
	var row = $('#dgHistoryPricingRule').datagrid('getRows')[index];
	if(!row){
		return showInfoMsg('请选择需要编辑的数据！');
	}
	$('#formHPricingRule').form('clear');
	//$("#cmbgdOrgCode").combogrid("grid").datagrid("reload",{"q":temp.orgCode});
	openDialog('dlgHPricingRule','定价规则');
	//加载form表单
	$('#formHPricingRule').form('load', row);
	
	//加载详情
	var datagrid = $('#tblHPriceRuleDetail').datagrid('options');
	datagrid.url = rootPath + '/pricingRule/findDetailsByCondition.do';
	var deatilParam = {
			priceRuleId : row.id,
			deleteFlag : true
	}
	$('#tblHPriceRuleDetail').datagrid('load',deatilParam);
}

function findRelatedSite(){
	$('#dgSite').datagrid('load',serializeFormObj('formViewSite'));
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
/**=====================编辑单元格=======================*/



/**===================format===============*/
/**
 * 格式化关联网点数
 */
function formatSiteNum(value,rec,index){
	return '<a style="text-decoration:underline;color:blue;"  onclick="openViewSite(\''+ index +'\')" title="' + value + '" class="" href="javascript:void(0)">'+value+'</a>';
}

/**
 * 格式化关联网点数
 */
function formatHSiteNum(value,rec,index){
	return '<a style="text-decoration:underline;color:blue;"  onclick="openHViewSite(\''+ index +'\')" title="' + value + '" class="" href="javascript:void(0)">'+value+'</a>';
}

/**
 * 格式化历史记录
 */
function formatHTypeNum(value,rec,index){
	return '<a style="text-decoration:underline;color:blue;"  onclick="openViewHistorySite(\''+ index +'\')" title="' + value + '" class="" href="javascript:void(0)">'+value+'</a>';
}

/**
 * 格式化两位小数
 * @param val
 * @returns
 */
function format2Precision(value,rec,index){
	if(value!=null){
		return Number(value).toFixed(2);
	}
}

/**
 * 格式化定价分类
 * @param value
 * @param rec
 * @param index
 * @returns
 */
function formatCarType(value,rec,index){
	return getTypeNameByCode("CAR_TYPE", value,formatTip);
}

/**=================CustomControl 自定义控件=================*/

function ruleTypeCombobox(){
	$('#txtRuleTypeCode').uceCombobox({
		headerValue : '',
	    url : rootPath + '/pricingRuleType/findByCondition.do', 
	    method:'post',
	    queryParams: {"status":'02'},
	    valueField:'ruleTypeCode',
	    textField:'utf1',
	    limitToList : true,
	    editable: false,
		panelHeight : 200,
	});
}