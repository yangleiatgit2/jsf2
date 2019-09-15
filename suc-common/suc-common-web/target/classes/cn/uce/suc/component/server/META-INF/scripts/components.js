/*定义上传下载常量**/
//项目名
const
UPLOAD_SUB_SYS_NAME = "nos";
// opt模块
const
UPLOAD_SYS_MODUL_OPT = "opt";
// opm模块
const
UPLOAD_SYS_MODUL_OPM = "opm";
/**组织机构常量定义----------------begin*/
/** 机构类型：总部 */
const ORG_TYPE_HQ = 10;
/** 机构类型：分拨 */
const ORG_TYPE_OPERATE_CENTER = 21;
/** 机构类型：承包区 */
const ORG_TYPE_CONTRACT = 40;
/** 机构类型：网点 */
const ORG_TYPE_SITE = 30;
/** 机构类型：大区 */
const ORG_TYPE_LARGE_AREA = 3001;
/** 机构类型：省区区= */
const ORG_TYPE_PROVI_AREA = 4001;
/** 机构状态 已启用 */
const ORG_ENABLED = 9901;
/** 机构状态 暂停 */
const ORG_PAUSE = 9902;
/** 机构状态 已停用 */
const ORG_NOT_ENABLED = 9903;
/**机构标示--营运机构*/
const ORG_FLG_NOS='NOS';
/**机构标示--乾坤机构*/
const ORG_FLG_QK='CMS';
/**组织机构常量定义----------------end*/
/**进港*/
const BUSINESS_MODE_IN = "1";
/**出港*/
const BUSINESS_MODE_OUT = "2";

/** bkg  begin*/
/**需求 begin --------------------*/
/** 需求类型-长期 */
const DEMAND_TYPE_LONG = "1";
/** 需求类型-短期 */
const DEMAND_TYPE_TEMP = "2";

/**需求状态-已提报*/
const DEMAND_STATUS_SUBMIT = "1";
/**需求状态-可报价*/
const DEMAND_STATUS_QUOTE_NO =  "2";
/**需求状态-已报价*/
const DEMAND_STATUS_QUOTE_YES  = "3";
/**需求状态-网点已确定*/
const DEMAND_STATUS_SITE_COMFIRM = "4";
/**需求状态-已核准*/
const DEMAND_STATUS_CHECKED = "5";
/**需求状态-已锁定*/
const DEMAND_STATUS_LOCKED = "6";
/**需求状态-已终止*/
const DEMAND_STATUS_END= "7";
/**需求状态-网点已取消*/
const DEMAND_STATUS_SITE_CANCEL= "8";
/**需求 end--------------------*/


/**需求组合 begin --------------------*/
/** 需求组合类型-长期 */
const DEMAND_COMBINE_TYPE_LONG = "1";
/** 需求组合类型-短期 */
const DEMAND_COMBINE_TYPE_TEMP = "2";

/** 需求组合状态-已生成 */
const DEMAND_COMBINE_STATUS_CREATE= "1";
/** 需求组合状态-已排班 */
const DEMAND_COMBINE_STATUS_SHIFT_YES = "2";
/** 需求组合状态-可报价 */
const DEMAND_COMBINE_STATUS_QUOT_NO = "3";
/** 需求组合状态-已报价 */
const DEMAND_COMBINE_STATUS_QUOT_YES = "4";
/** 需求组合状态-已终止 */
const DEMAND_COMBINE_STATUS_END = "5";

/**需求组合 end --------------------*/


/** 订单组合类型-长期 */
const ORDER_COMBINE_TYPE_LONG = "00";
/** 订单组合类型-短期 */
const ORDER_COMBINE_TYPE_TEMP = "01";

/** 订单状态-待执行 */
const ORDER_STATUS_PERFORM = "00";
/** 订单状态-终止 */
const ORDER_STATUS_TERING = "01";
/** 订单状态-可报价 */
const ORDER_STATUS_QUOT_NO = "02";
/** 订单状态-已报价*/
const ORDER_STATUS_QUOT_YES = "03";

/** 订单组合状态-已排班 */
const ORDER_COMBIN_STATUS_SHIFT_YES = "01";
/** 订单组合状态-已生产 */
const ORDER_COMBIN_STATUS_CREATE = "00";
/** 订单组合状态-已终止 */
const ORDER_COMBINE_STATUS_END = "02";
/** 订单组合状态-可报价 */
const ORDER_COMBINE_STATUS_QUOT_NO = "03";
/** 订单组合状态-已报价*/
const ORDER_COMBINE_STATUS_QUOT_YES = "04";
/** ====================来源start====== */
/** 需求 */
const COMBINE_SOURCE_TYPE_DEMAND = "1";
/** 订单 */
const COMBINE_SOURCE_TYPE_ORDER = "2";
/** ====================来源end====== */

/**需求 订单 定价规则状态 begin*/
/**定价规则状态-已生成*/
const PRICEING_RULE_STATUS_CREATE='01'
/**定价规则状态-正式版本*/
const PRICEING_RULE_STATUS_APPROVED='02'
/**需求 订单 定价规则状态 end*/

/** bkg  end*/

/**
 * 员工公共组件js(omg_emp表)
 */
function empCombogrid(domId, params) {
	if (!domId) {
		console.error("domId不能为空！");
		return;
	}
	if (params && params.pageSize != null && params.pageSize != undefined) {
		if (!isNaN(params.pageSize)) {
			params.pageList = [ params.pageSize, params.pageSize * 2,
					params.pageSize * 3, params.pageSize * 4,
					params.pageSize * 5, params.pageSize * 10 ]
			params.pagination = true;
		} else {
			console.error("pageSize必须要为数字！");
			return;
		}
	}
	$("#" + domId)
			.combogrid(
					{
						url : params && params.url ? params.url
								: '../emp/findEmpByPage.do',
						columns : params && params.columns ? params.columns
								: [ [ {
									field : 'empId',
									title : '员工id',
									width : 100,
									hidden : true
								}, {
									field : 'empCode',
									title : '员工编号',
									width : 100
								}, {
									field : 'empName',
									title : '员工名称',
									width : 100
								} ] ],
						pagination : params && params.pagination == false ? false
								: true,
						pageNumber : 1,
						pageSize : params && params.pageSize
								&& !isNaN(params.pageSize) ? params.pageSize
								: undefined,
						pageList : params && params.pageList ? params.pageList
								: undefined,
						idField : params && params.idField ? params.idField
								: 'empId',
						textField : params && params.textField ? params.textField
								: 'empName',
						mode : params && params.mode == 'local' ? 'local'
								: 'remote',
						loadMsg : '数据加载中请稍后……',
						width : params && params.width && !isNaN(params.width) ? params.width
								: undefined,
						panelWidth : params && params.panelWidth
								&& !isNaN(params.panelWidth) ? params.panelWidth
								: 280,
						height : params && params.height
								&& !isNaN(params.height) ? params.height
								: undefined,
						panelHeight : params && params.panelHeight
								&& !isNaN(params.panelHeight) ? params.panelHeight
								: 300,
						singleSelect : params && params.singleSelect == true ? true
								: false,
						fitColumns : true,
						onClick : params && params.onClick ? params.onClick
								: undefined,
						onLoadSuccess : params && params.onLoadSuccess ? params.onLoadSuccess
								: undefined,
						onBeforeLoad : params && params.onBeforeLoad ? params.onBeforeLoad
								: undefined,
						onLoadError : params && params.onLoadError ? params.onLoadError
								: undefined,
						onHidePanel : params && params.onHidePanel ? params.onHidePanel
								: function() {
									var g = $(this).combogrid('grid'); // get
									// datagrid
									// object
									var r = g.datagrid('getSelected'); // get
									// the
									// selected
									// row
									if (null != g || g.length > 0) {
										if (null == r || r.length == 0) {
											$(this).combogrid('clear');
											$(this).combogrid('setValue', '');
										} else {
											$(this).combogrid('setValue',
													r.empCode);
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
								$(this).combogrid("grid").datagrid('gotoPage',
										1);
							}
						}
					})
}
/**
 * 员工公共组件js(omg_other_emp_relation表)
 */
function relationEmpCombogrid(domId, params) {
	if (!domId) {
		console.error("domId不能为空！");
		return;
	}
	if (params && params.pageSize != null && params.pageSize != undefined) {
		if (!isNaN(params.pageSize)) {
			params.pageList = [ params.pageSize, params.pageSize * 2,
					params.pageSize * 3, params.pageSize * 4,
					params.pageSize * 5, params.pageSize * 10 ]
			params.pagination = true;
		} else {
			console.error("pageSize必须要为数字！");
			return;
		}
	}
	$("#" + domId)
			.combogrid(
					{
						url : params && params.url ? params.url : rootPath
								+ '/empRelation/findByCmbgd.do?',
						columns : params && params.columns ? params.columns
								: [ [ {
									field : 'otherEmpId',
									title : '员工编码',
									align : 'center',
									width : 50
								}, {
									field : 'otherEmpName',
									title : '员工姓名',
									align : 'center',
									width : 80
								} ] ],
						pagination : params && params.pagination == false ? false
								: true,
						pageNumber : 1,
						pageSize : params && params.pageSize
								&& !isNaN(params.pageSize) ? params.pageSize
								: undefined,
						pageList : params && params.pageList ? params.pageList
								: undefined,
						idField : params && params.idField ? params.idField
								: 'otherEmpId',
						textField : params && params.textField ? params.textField
								: 'otherEmpName',
						mode : params && params.mode == 'local' ? 'local'
								: 'remote',
						loadMsg : '数据加载中请稍后……',
						width : params && params.width && !isNaN(params.width) ? params.width
								: undefined,
						panelWidth : params && params.panelWidth
								&& !isNaN(params.panelWidth) ? params.panelWidth
								: 280,
						height : params && params.height
								&& !isNaN(params.height) ? params.height
								: undefined,
						panelHeight : params && params.panelHeight
								&& !isNaN(params.panelHeight) ? params.panelHeight
								: 300,
						singleSelect : params && params.singleSelect == true ? true
								: false,
						fitColumns : true,
						onClick : params && params.onClick ? params.onClick
								: undefined,
						onLoadSuccess : params && params.onLoadSuccess ? params.onLoadSuccess
								: undefined,
						onBeforeLoad : params && params.onBeforeLoad ? params.onBeforeLoad
								: undefined,
						onLoadError : params && params.onLoadError ? params.onLoadError
								: undefined,
						onHidePanel : params && params.onHidePanel ? params.onHidePanel
								: function() {
									var g = $(this).combogrid('grid'); // get
									// datagrid
									// object
									var r = g.datagrid('getSelected'); // get
									// the
									// selected
									// row
									if (null != g || g.length > 0) {
										if (null == r || r.length == 0) {
											$(this).combogrid('clear');
											$(this).combogrid('setValue', '');
										} else {
											$(this).combogrid('setValue',
													r.otherEmpId);
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
								$(this).combogrid("grid").datagrid('gotoPage',
										1);
							}
						}
					})
}
// 地区组合表格
function areaCombogrid(domId, params) {
	if (!domId) {
		console.error("domId不能为空！");
		return;
	}
	if (params && params.pageSize != null && params.pageSize != undefined) {
		if (!isNaN(params.pageSize)) {
			params.pageList = [ params.pageSize, params.pageSize * 2,
					params.pageSize * 3, params.pageSize * 4,
					params.pageSize * 5, params.pageSize * 10 ]
			params.pagination = true;
		} else {
			console.error("pageSize必须要为数字！");
			return;
		}
	}
	$("#" + domId)
			.combogrid(
					{
						url : params && params.url ? params.url
								:  rootPath
								+ '/nosArea/findByPagination.do',
						columns : params && params.columns ? params.columns
								: [ [ {
									field : 'areaType',
									title : '地区类型',
									width : 100,
									hidden : true
								}, {
									field : 'areaCode',
									title : '地区编号',
									width : 100
								}, {
									field : 'areaName',
									title : '地区名称',
									width : 100
								} ] ],
						pagination : params && params.pagination == false ? false
								: true,
						pageNumber : 1,
						pageSize : params && params.pageSize
								&& !isNaN(params.pageSize) ? params.pageSize
								: undefined,
						pageList : params && params.pageList ? params.pageList
								: undefined,
						idField : params && params.idField ? params.idField
								: 'areaCode',
						textField : params && params.textField ? params.textField
								: 'areaName',
						mode : params && params.mode == 'local' ? 'local'
								: 'remote',
						loadMsg : '数据加载中请稍后……',
						width : params && params.width && !isNaN(params.width) ? params.width
								: undefined,
						height : params && params.height
								&& !isNaN(params.height) ? params.height
								: undefined,
						panelWidth : params && params.panelWidth
								&& !isNaN(params.panelWidth) ? params.panelWidth
								: 280,
						panelHeight : params && params.panelHeight
								&& !isNaN(params.panelHeight) ? params.panelHeight
								: 300,
						singleSelect : params && params.singleSelect == true ? true
								: false,
						fitColumns : true,
						onClick : params && params.onClick ? params.onClick
								: undefined,
						onLoadSuccess : params && params.onLoadSuccess ? params.onLoadSuccess
								: undefined,
						onBeforeLoad : params && params.onBeforeLoad ? params.onBeforeLoad
								: undefined,
						onLoadError : params && params.onLoadError ? params.onLoadError
								: undefined,
						onHidePanel : params && params.onHidePanel ? params.onHidePanel
								: function() {
									var g = $(this).combogrid('grid'); // get
									// datagrid
									// object
									var r = g.datagrid('getSelected'); // get
									// the
									// selected
									// row
									if (null != g || g.length > 0) {
										if (null == r || r.length == 0) {
											$(this).combogrid('clear');
											$(this).combogrid('setValue', '');
										} else {
											$(this).combogrid('setValue',
													r.areaCode);
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
								$(this).combogrid("grid").datagrid('gotoPage',
										1);
							}
						}
					})
}


/**
 * 组织下拉控件
 * 
 * @param domId
 * @param params
 */
function orgCombogrid(domId, params) {
	if (!domId) {
		console.error("domId不能为空！");
		return;
	}
	if (params && params.pageSize != null && params.pageSize != undefined) {
		if (!isNaN(params.pageSize)) {
			params.pageList = [ params.pageSize, params.pageSize * 2,
					params.pageSize * 3, params.pageSize * 4,
					params.pageSize * 5, params.pageSize * 10 ]
			params.pagination = true;
		} else {
			console.error("pageSize必须要为数字！");
			return;
		}
	}
	
	if (params) {
		if (params.orgTypes) params.orgTypes = 'orgTypes=' + params.orgTypes;
		params.orgStatus = (typeof (params.orgStatus) != "undefined" && params.orgStatus ? '&orgStatus=' + params.orgStatus : "");
		params.parentOrgCode = (typeof (params.parentOrgCode) != "undefined" && params.parentOrgCode ? '&parentOrgCode=' + params.parentOrgCode : "");
	}
	$("#" + domId)
			.combogrid(
					{
						url : params && params.url ? params.url : rootPath
								+ '/cmsOrg/findByCmbgd.do?'   + params.orgTypes + params.orgStatus + params.parentOrgCode,
						columns : params && params.columns ? params.columns
								: [ [ {
									field : 'orgId',
									title : '机构id',
									width : 100,
									hidden : true
								}, {
									field : 'baseOrgCode',
									title : '机构编号',
									width : 80
								}, {
									field : 'orgName',
									title : '机构名称',
									width : 100
								} ] ],
						pagination : params && params.pagination == false ? false
								: true,
						pageNumber : 1,
						showPageList : false,
						pageSize : params && params.pageSize
								&& !isNaN(params.pageSize) ? params.pageSize
								: undefined,
						pageList : params && params.pageList ? params.pageList
								: undefined,
						idField : params && params.idField ? params.idField
								: 'baseOrgCode',
						textField : params && params.textField ? params.textField
								: 'orgName',
						mode : params && params.mode == 'local' ? 'local'
								: 'remote',
						loadMsg : '数据加载中请稍后……',
						width : params && params.width && !isNaN(params.width) ? params.width
								: undefined,
						panelWidth : params && params.panelWidth
								&& !isNaN(params.panelWidth) ? params.panelWidth
								: 280,
						height : params && params.height
								&& !isNaN(params.height) ? params.height
								: undefined,
						panelHeight : params && params.panelHeight
								&& !isNaN(params.panelHeight) ? params.panelHeight
								: 300,
						singleSelect : params && params.singleSelect == true ? true
								: false,
						fitColumns : true,
						onClick : params && params.onClick ? params.onClick
								: undefined,
						onLoadSuccess : params && params.onLoadSuccess ? params.onLoadSuccess
								: undefined,
						onBeforeLoad : params && params.onBeforeLoad ? params.onBeforeLoad
								: undefined,
						onLoadError : params && params.onLoadError ? params.onLoadError
								: undefined,
						onSelect : params && params.onSelect ? params.onSelect
								: undefined,
						onHidePanel : params && params.onHidePanel ? params.onHidePanel
								: function() {
									var g = $(this).combogrid('grid'); // get
									// datagrid
									// object
									var r = g.datagrid('getSelected'); // get
									// the
									// selected
									// row

									var q = $(this).combogrid('getValue');
									if (null != g || g.length > 0) {
										if (null == r || r.length == 0) {
											$(this).combogrid('clear');
											$(this).combogrid('setValue', '');
											// 当前表单数据只剩一条
											g = g.datagrid('getRows');
											if (g.length == 1) {
												$(this).combogrid('setValue',
														g[0].baseOrgCode);
											}
										} else {
											$(this).combogrid('setValue',
													r.baseOrgCode);
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
								$(this).combogrid("grid").datagrid('gotoPage',
										1);
							}else{
								$(this).combogrid("grid").datagrid("reload", {
									'q' : q
								});
							}
						}
					})
}






/**
 * 消息提示
 * 
 * @param messager
 */
function showMessager(messager) {
	$.messager.show({
		title : '消息提示',
		msg : messager,
		showType : 'slide',
	});
}



/**
 * show消息功能(从右下角弹出) 修改基础平台showInfoTip()方法无法手动关闭
 * 
 * @param msg
 *            消息内容
 * @param title
 *            消息标题,默认'信息提示'(可选参数)
 * @param timeout
 *            超时时间,默认3000毫秒(可选参数)
 */
function showInfoTip(msg, title, timeout) {
	if (isEmptyObject(msg)) {
		return;
	}
	var infoTitle = !title ? '信息提示' : title;
	var infoTimeout = !timeout ? 3000 : timeout;
	$.messager
			.show({
				id : "msgtip",
				msg : '<div class="messager-icon messager-info" ></div><div style="font-size:15px;font-weight:bold;margin-top:0;color:#464c5b;">'
						+ infoTitle
						+ '</div><div style="margin-top:5px;color:#777272;">'
						+ msg
						+ '</div><div class="panel-tool" style="top:15px;right:5px;color: #657180;"><a class="panel-tool-close" ></a></div>',
				timeout : infoTimeout,
				showType : 'fade'
			});
	$('.messager-body').css('height', 'auto');
	$('.messager-body').parents('.panel').css('right', '5px');
	$('.messager-body').parents('.panel').css('bottom', '100px');
	$('.messager-body').parents('.panel').css('border-radius', '4px');
	$('.panel-tool').bind('click', function() {
		$("#msgtip").window('close');
	})

}
/**
 * 组织下拉控件--包含所有权限 orgflag:CMS乾坤机构，NOS营运机构 orgCode：当前登录机构 orgTypeList：机构类型集合
 * status：状态集合
 * 
 * 
 * @param domId
 * @param params
 */
function orgNosCombogrid(domId, params) {
	if (params) {
		if (params.orgTypeList)
			params.orgTypeList = 'orgTypeList=' + params.orgTypeList;
			params.orgStatusList = (typeof (params.orgStatusList) != "undefined" && params.orgStatusList ? '&orgStatusList=' + params.orgStatusList : "");
		params.orgFlag = (typeof (params.orgFlag) != "undefined" && params.orgFlag ? '&orgFlag=' + params.orgFlag : "");
		params.orgCode = (typeof (params.orgCode) != "undefined" && params.orgCode ? '&orgCode=' + params.orgCode : "");
	}
	$("#" + domId).combogrid({
		url : params && params.url ? params.url : rootPath + '/nosOrg/findChildOrgList.do?'
				+ params.orgTypeList + params.orgStatusList
				+ params.orgFlag + params.orgCode,
		columns : params && params.columns ? params.columns
				: [ [ {field : 'id',title : '机构编号',width : 80}, 
				      {field : 'name',title : '机构名称',width : 100} ] ],
		pagination : false,
		pageNumber : 1,
		showPageList : false,
		idField : params && params.idField ? params.idField : 'id',
		textField : params && params.textField ? params.textField : 'name',
		mode : params && params.mode == 'local' ? 'local': 'remote',
		loadMsg : '数据加载中请稍后……',
		panelWidth : 280,
		panelHeight : 300,
		singleSelect : params && params.singleSelect == true ? true : false,
		fitColumns : true,
		onSelect : params && params.onSelect ? params.onSelect : undefined,
		onHidePanel : params && params.onHidePanel ? params.onHidePanel : function() {
			var g = $(this).combogrid('grid'); // get
			// datagrid
			// object
			var r = g.datagrid('getSelected'); // get
			// the
			// selected
			// row
			var q = $(this).combogrid('getValue');
			if (null != g || g.length > 0) {
				if (null == r || r.length == 0) {
					$(this).combogrid('clear');
					$(this).combogrid('setValue', '');
					// 当前表单数据只剩一条
					g = g.datagrid('getRows');
					if (g.length == 1) {
						$(this).combogrid('setValue',g[0].id);
					}
				} else {
					$(this).combogrid('setValue', r.id);
				}
			}
		},
		onShowPanel : function() {
			/* 解决datagrid q值、页码缓存问题, */
			var q = $(this).combogrid('getValue');
			if (!q) {
				$(this).combogrid("grid").datagrid("reload", {'q' : ''});
			}
		}		
	})
}
/**
 * 组织下拉控件
 * 
 * @param domId
 * @param params
 */
var orgname="";
function fspUserOrgCombogrid(domId, params) {
	if (!domId) {
		console.error("domId不能为空！");
		return;
	}
	if (params && params.pageSize != null && params.pageSize != undefined) {
		if (!isNaN(params.pageSize)) {
			params.pageList = [ params.pageSize, params.pageSize * 2,
					params.pageSize * 3, params.pageSize * 4,
					params.pageSize * 5, params.pageSize * 10 ]
			params.pagination = true;
		} else {
			console.error("pageSize必须要为数字！");
			return;
		}
	}
	if (params) {
		if (params.empCode) params.empCode = 'empCode=' + params.empCode;
		params.orgTypes = (typeof (params.orgTypes) != "undefined" && params.orgTypes ? '&orgTypes=' + params.orgTypes : "");
		params.orgStatus = (typeof (params.orgStatus) != "undefined" && params.orgStatus ? '&orgStatus=' + params.orgStatus : "");
	}
	$("#" + domId)
			.combogrid(
					{
						url : params && params.url ? params.url : rootPath + '/nosOrg/findAuthByFspUserOrg.do?' + params.empCode  + params.orgTypes + params.orgStatus,
						columns : params && params.columns ? params.columns
								: [ [ { field : 'orgId', title : '机构id', width : 100, hidden : true }, 
								      { field : 'baseOrgCode', title : '机构编号', width : 80 }, 
								      { field : 'orgName', title : '机构名称', width : 100 } ] ],
						pagination : params && params.pagination == false ? false
								: true,
						pageNumber : 1,
						showPageList : false,
						pageSize : params && params.pageSize
								&& !isNaN(params.pageSize) ? params.pageSize
								: undefined,
						pageList : params && params.pageList ? params.pageList
								: undefined,
						idField : params && params.idField ? params.idField
								: 'baseOrgCode',
						textField : params && params.textField ? params.textField
								: 'orgName',
						mode : params && params.mode == 'local' ? 'local'
								: 'remote',
						loadMsg : '数据加载中请稍后……',
						width : params && params.width && !isNaN(params.width) ? params.width
								: undefined,
						panelWidth : params && params.panelWidth
								&& !isNaN(params.panelWidth) ? params.panelWidth
								: 280,
						height : params && params.height
								&& !isNaN(params.height) ? params.height
								: undefined,
						panelHeight : params && params.panelHeight
								&& !isNaN(params.panelHeight) ? params.panelHeight
								: 300,
						singleSelect : params && params.singleSelect == true ? true
								: false,
						fitColumns : true,
						onClick : params && params.onClick ? params.onClick
								: undefined,
						onLoadSuccess :function(node,data){
				        	$(domId).combotree('setText',orgname);
				        },
						onBeforeLoad :function(node,param){
							orgname=$(domId).combogrid("getText");
				        },
						onLoadError : params && params.onLoadError ? params.onLoadError
								: undefined,
						onSelect : params && params.onSelect ? params.onSelect
								: undefined,
						onHidePanel : params && params.onHidePanel ? params.onHidePanel
								: function() {
									var g = $(this).combogrid('grid'); // get
									// datagrid
									// object
									var r = g.datagrid('getSelected'); // get
									// the
									// selected
									// row

									var q = $(this).combogrid('getValue');
									if (null != g || g.length > 0) {
										if (null == r || r.length == 0) {
											$(this).combogrid('clear');
											$(this).combogrid('setValue', '');
											// 当前表单数据只剩一条
											g = g.datagrid('getRows');
											if (g.length == 1) {
												$(this).combogrid('setValue',
														g[0].baseOrgCode);
											}
										} else {
											$(this).combogrid('setValue',
													r.baseOrgCode);
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
								$(this).combogrid("grid").datagrid('gotoPage',
										1);
							}
						}
					})
}

/**
 * 数据字典 根据type显示Name
 * 
 * @param typeClassCodes
 * @param typeCode
 * @returns
 */
function getTypeNameByCode(typeClassCodes, typeCode, showTip) {
	if (DictDatas != null && DictDatas != undefined
			&& DictDatas[typeClassCodes].length != 0) {
		for (var i = 0; i < DictDatas[typeClassCodes].length; i++) {
			if (DictDatas[typeClassCodes][i].typeCode == typeCode) {
				if (showTip != null && showTip != undefined) {
					return "<a title='" + DictDatas[typeClassCodes][i].typeName
							+ "'>" + DictDatas[typeClassCodes][i].typeName
							+ "</a>"
				}
				return DictDatas[typeClassCodes][i].typeName;
			}
		}
	}
	return typeCode;
}

$.extend($.fn.datagrid.methods, {  
    fixRownumber : function (jq) {  
        return jq.each(function () {  
            var panel = $(this).datagrid("getPanel");  
            var clone = $(".datagrid-cell-rownumber", panel).last().clone();  
            clone.css({  
                "position" : "absolute",  
                left : -1000  
            }).appendTo("body");  
            var width = clone.width("auto").width();  
            if (width > 25) {  
                //多加5个像素,保持一点边距  
                $(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).width(width + 5);  
                $(this).datagrid("resize");  
                //一些清理工作  
                clone.remove();  
                clone = null;  
            } else {  
                //还原成默认状态  
                $(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).removeAttr("style");  
            }  
        });  
    }  
}); 

/**
 * 营运机构组织树
 * @param domId
 */
 var siteName="";
function sucOrgComboTree(domId){
	domId="#" + domId;
	$(domId).combotree({
		url: '../org/getNosOrgTree.do',
		multiple :  true,
		cascadeCheck : false,

		loadFilter:function(data,parent){
			 var dataNew = new Array();
			for (var i = 0; i < data.length; i++) {
				var orgvo = data[i];
				if(orgvo.orgType!=40){
					dataNew.push(orgvo);
				}
			}
			
			return dataNew;
		},
		onBeforeLoad:function(node,param){
			siteName=$(domId).combobox("getText");
        	if(node!=null){
        		param.id=node.id;
	        	param.orgType=node.orgType;
        	}
        },
        onLoadSuccess:function(node,data){
        	$(domId).combotree('setText',siteName);
        },
        onClick:function(node){
        	$(domId).combotree('setText',siteName);
        	
        },
        onBeforeCheck:function(node, checked){
        	if(node.orgType!=30){
        		return false;
        	}
        },
        onCheck:function(node,checked){
        	if(checked){
        		if(""==siteName){
        			siteName=node.text;
        		}else{
        		siteName=siteName+","+node.text;}
        	}else{
        		var siteNames = siteName.split(",")
        		var array = new Array();
        	
        	for (var i = 0; i < siteNames.length; i++) {
        		if(siteNames[i]!=node.text){
        			array.push(siteNames[i]);
        		}
			}
        		siteName=array.join(",");
        	}
        	
        	$(domId).combotree('setText',siteName);
        }
	});
}

/**
 * id:table id,如：<table id="test" class="easyui-datagrid">
 * columns:显示的列配置项,如:[[{field:'name',title: '属性名称',align: 'center'},{field:'age',title: '年龄',width: 50}]]
 * dataGridParams:datagrid相关的参数配置项，详见easyuiAPI-datagrid;
 * 这里newloadGrid 加了一个MultipleCloumn 的前缀是因为 要在原来的datagrid 添加多表头的功能
 */
function newMultipleCloumnLoadGrid(id,columns,dataGridParams){
	if(id ==null || columns==null || dataGridParams.url==null){
		console.error("datagrid id、colums、url不能为空！");
		return;
	};
	if (dataGridParams.pageSize!=null && dataGridParams.pageSize != undefined) {
		if(!isNaN(dataGridParams.pageSize)){
			dataGridParams.pageList=[dataGridParams.pageSize,dataGridParams.pageSize*2,dataGridParams.pageSize*3,dataGridParams.pageSize*4,dataGridParams.pageSize*5,dataGridParams.pageSize*10]
			dataGridParams.pagination = 'true';
		}else{
			console.error("pageSize必须要为数字！");
		    return;
		}
	} 
	
	$('#'+id).datagrid({
		remoteSort : dataGridParams.remoteSort ? dataGridParams.remoteSort : false,
		title: dataGridParams.title ? dataGridParams.title : '',
/*		width: dataGridParams.width ? dataGridParams.width : 'auto',
		height: dataGridParams.height ? dataGridParams.height : 'auto',*/
		url: dataGridParams.url,
		method: dataGridParams.method =='get' ? 'get' : 'post',
		queryParams: dataGridParams.queryParams ? dataGridParams.queryParams : {},//请求参数对象{a:'1'}
		frozenColumns: dataGridParams.frozenColumns ? dataGridParams.frozenColumns  : [[ {field:'id',title:'id',align:'left'} ]] ,
		columns:columns, //列配置项
	    striped: true , //是否显示斑马线效果。
	    collapsible:false,//表格是否可折叠
	    singleSelect : dataGridParams.singleSelect == 'true' ? true : false,  //允许单行选择true/false
	    fitColumns: dataGridParams.fitColumns == 'true' ? true : false, //真正的自动展开/收缩列的大小，以适应网格的宽度，防止水平滚动。
	    loadMsg:'数据加载中请稍后……',  
	    pagination: dataGridParams.pagination =='true' ? true : false,  //如果为true，则在DataGrid控件底部显示分页工具栏。
    	pagePosition:'bottom',//定义分页工具栏的位置。可用的值有：'top','bottom','both'。
	    rownumbers: dataGridParams.rownumbers=='false' ? false : true, //如果为true，则显示一个行号列。
	    pageNumber : 1, //在设置分页属性的时候初始化页码。
	    pageSize: dataGridParams.pageSize ? dataGridParams.pageSize : 10,//在设置分页属性的时候初始化页面大小。
	    pageList: dataGridParams.pageList ? dataGridParams.pageList : [10,20,30,40,50,100],//在设置分页属性的时候 初始化页面大小选择列表。
	    nowrap: true, //如果为true，则在同一行中显示数据。设置为true可以提高加载性能。
	    resizable: true, //如果为true，允许列改变大小。
	    rownumberWidth : isNaN(dataGridParams.rownumberWidth) ? dataGridParams.rownumberWidth : 30,
	    toolbar: dataGridParams.toolbar ? dataGridParams.toolbar : [], //顶部工具栏的DataGrid面板
	    onBeforeLoad: dataGridParams.onBeforeLoad ? dataGridParams.onBeforeLoad : function(param){
	    	//在载入请求数据数据之前触发，如果返回false可终止载入数据操作。
	    	console.log('onBeforeLoad');
	    },
	    onLoadSuccess: dataGridParams.onLoadSuccess ? dataGridParams.onLoadSuccess : function(data){
	    	//在数据加载成功的时候触发
	    	console.log('onLoadSuccess');
	    },
	    onSelect:dataGridParams.onSelect ? dataGridParams.onSelect :function(){
	    	console.log('onSelect');
	    }
	});
}
/**
 * 车辆下拉控件
 * 
 * @param domId
 * @param params
 */
function carCombogrid(domId, params) {
	if (!domId) {
		console.error("domId不能为空！");
		return;
	}
	console.log('carCombogrid params='+ JSON.stringify(params));
	if (params && params.pageSize != null && params.pageSize != undefined) {
		if (!isNaN(params.pageSize)) {
			params.pageList = [ params.pageSize, params.pageSize * 2,
					params.pageSize * 3, params.pageSize * 4,
					params.pageSize * 5, params.pageSize * 10 ]
			params.pagination = true;
		} else {
			console.error("pageSize必须要为数字！");
			return;
		}
	}
	if (params) {
		if (params.carVolume) params.carVolume = 'carVolume=' + params.carVolume;
	}
	$("#" + domId)
			.combogrid(
					{
						url : params && params.url ? params.url : rootPath
								/*+ '/carManager/findCarByCmbgd.do?'   + params.carType + params.carVolume,*/
								+ '/carManager/findCarByCmbgd.do?'+params.carVolume,
						columns : params && params.columns ? params.columns
								: [ [ {
									field : 'id',
									title : '车辆id',
									width : 1,
									hidden : true
								}, {
									field : 'carNumber',
									title : '车辆编号',
									width : 80
								}, {
									field : 'plateNumbers',
									title : '车牌号',
									width : 100
								}
//								, {
//									field : 'carType',
//									title : '车型',
//									width : 50,
//									formatter:function(value){
//										debugger
//										if(value){
//											return getCarType("CAR_TYPE","CAR_MODEL", value);
//										}
//									}
//								}
								] ],
						pagination : params && params.pagination == false ? false
								: true,
						pageNumber : 1,
						showPageList : false,
						pageSize : params && params.pageSize
								&& !isNaN(params.pageSize) ? params.pageSize
								: undefined,
						pageList : params && params.pageList ? params.pageList
								: undefined,
						idField : params && params.idField ? params.idField
								: 'carNumber',
						textField : params && params.textField ? params.textField
								: 'plateNumbers',
						mode : params && params.mode == 'local' ? 'local'
								: 'remote',
						loadMsg : '数据加载中请稍后……',
						width : params && params.width && !isNaN(params.width) ? params.width
								: undefined,
						panelWidth : params && params.panelWidth
								&& !isNaN(params.panelWidth) ? params.panelWidth
								: 280,
						height : params && params.height
								&& !isNaN(params.height) ? params.height
								: undefined,
						panelHeight : params && params.panelHeight
								&& !isNaN(params.panelHeight) ? params.panelHeight
								: 300,
						singleSelect : params && params.singleSelect == true ? true
								: false,
						fitColumns : true,
						onClick : params && params.onClick ? params.onClick
								: undefined,
						onLoadSuccess : params && params.onLoadSuccess ? params.onLoadSuccess
								: undefined,
						onBeforeLoad : params && params.onBeforeLoad ? params.onBeforeLoad
								: undefined,
						onLoadError : params && params.onLoadError ? params.onLoadError
								: undefined,
						onSelect : params && params.onSelect ? params.onSelect
								: undefined,
						onHidePanel : params && params.onHidePanel ? params.onHidePanel
								: function() {
									var g = $(this).combogrid('grid'); // get
									var r = g.datagrid('getSelected'); // get
									var q = $(this).combogrid('getValue');
									if (null != g || g.length > 0) {
										if (null == r || r.length == 0) {
											$(this).combogrid('clear');
											$(this).combogrid('setValue', '');
											// 当前表单数据只剩一条
											g = g.datagrid('getRows');
											if (g.length == 1) {
												$(this).combogrid('setValue',
														g[0].carNumber);
											}
										} else {
											$(this).combogrid('setValue',
													r.carNumber);
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
								$(this).combogrid("grid").datagrid('gotoPage',
										1);
							}
						}
					})
}

function getCarType(carType,carModel,typeCode){
	if(DictDatas != null && DictDatas != undefined ){
		var list=DictDatas[carType];
		if(list==undefined || list==null || list.length == 0){
			//如果当前用户的车型用的是CAR_MODEL 的数据字典的话 DictDatas['CAR_TYPE'] 就为空，所以要调用DictDatas['CAR_MODEL']
			list=DictDatas[carModel];
		}
			for(var i=0;i<list.length;i++){
				if(list[i].typeCode == typeCode){
				
						return "<a title='" + list[i].typeName + "'>" + list[i].typeName + "</a>"
					
					return list[i].typeName;
				}
			}
		
	}
	return typeCode;
}
/**
 * 司机下拉控件
 * 
 * @param domId
 * @param params
 */
function driverCombogrid(domId, params) {
	if (!domId) {
		console.error("domId不能为空！");
		return;
	}
	if (params && params.pageSize != null && params.pageSize != undefined) {
		if (!isNaN(params.pageSize)) {
			params.pageList = [ params.pageSize, params.pageSize * 2,
					params.pageSize * 3, params.pageSize * 4,
					params.pageSize * 5, params.pageSize * 10 ]
			params.pagination = true;
		} else {
			console.error("pageSize必须要为数字！");
			return;
		}
	}
	$("#" + domId)
			.combogrid(
					{
						url : params && params.url ? params.url : rootPath
								+ '/driverManage/findDriverByCmbgd.do?'   + params.orgTypes + params.orgStatus,
						columns : params && params.columns ? params.columns
								: [ [ {
									field : 'id',
									title : '司机id',
									width : 100,
									hidden : true
								}, {
									field : 'driverName',
									title : '司机姓名',
									width : 80
								}, {
									field : 'mobilePhone',
									title : '电话号',
									width : 100
								} ] ],
						pagination : params && params.pagination == false ? false
								: true,
						pageNumber : 1,
						showPageList : false,
						pageSize : params && params.pageSize
								&& !isNaN(params.pageSize) ? params.pageSize
								: undefined,
						pageList : params && params.pageList ? params.pageList
								: undefined,
						idField : params && params.idField ? params.idField
								: 'id',
						textField : params && params.textField ? params.textField
								: 'driverName',
						mode : params && params.mode == 'local' ? 'local'
								: 'remote',
						loadMsg : '数据加载中请稍后……',
						width : params && params.width && !isNaN(params.width) ? params.width
								: undefined,
						panelWidth : params && params.panelWidth
								&& !isNaN(params.panelWidth) ? params.panelWidth
								: 280,
						height : params && params.height
								&& !isNaN(params.height) ? params.height
								: undefined,
						panelHeight : params && params.panelHeight
								&& !isNaN(params.panelHeight) ? params.panelHeight
								: 300,
						singleSelect : params && params.singleSelect == true ? true
								: false,
						fitColumns : true,
						onClick : params && params.onClick ? params.onClick
								: undefined,
						onLoadSuccess : params && params.onLoadSuccess ? params.onLoadSuccess
								: undefined,
						onBeforeLoad : params && params.onBeforeLoad ? params.onBeforeLoad
								: undefined,
						onLoadError : params && params.onLoadError ? params.onLoadError
								: undefined,
						onSelect : params && params.onSelect ? params.onSelect
								: undefined,
						onHidePanel : params && params.onHidePanel ? params.onHidePanel
								: function() {
									var g = $(this).combogrid('grid'); // get
									var r = g.datagrid('getSelected'); // get
									var q = $(this).combogrid('getValue');
									if (null != g || g.length > 0) {
										if (null == r || r.length == 0) {
											$(this).combogrid('clear');
											$(this).combogrid('setValue', '');
											// 当前表单数据只剩一条
											g = g.datagrid('getRows');
											if (g.length == 1) {
												$(this).combogrid('setValue',
														g[0].id);
											}
										} else {
											$(this).combogrid('setValue',
													r.id);
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
								$(this).combogrid("grid").datagrid('gotoPage',
										1);
							}
						}
					})
}
/**
 * 承运商下拉控件
 * 
 * @param domId
 * @param params
 */
function carrierCombogrid(domId, params) {
	if (!domId) {
		console.error("domId不能为空！");
		return;
	}
	if (params && params.pageSize != null && params.pageSize != undefined) {
		if (!isNaN(params.pageSize)) {
			params.pageList = [ params.pageSize, params.pageSize * 2,
					params.pageSize * 3, params.pageSize * 4,
					params.pageSize * 5, params.pageSize * 10 ]
			params.pagination = true;
		} else {
			console.error("pageSize必须要为数字！");
			return;
		}
	}
	$("#" + domId)
			.combogrid(
					{
						url : params && params.url ? params.url : rootPath
								+ '/carrierManage/findCarrierByCmb.do?'   + params.orgTypes + params.orgStatus,
						columns : params && params.columns ? params.columns
								: [ [ {
									field : 'id',
									title : '承运商id',
									width : 100,
									hidden : true
								}, {
									field : 'companyFullName',
									title : '所属公司',
									width : 80
								}, {
									field : 'contactsMobile',
									title : '联系电话',
									width : 100
								} ] ],
						pagination : params && params.pagination == false ? false
								: true,
						pageNumber : 1,
						showPageList : false,
						pageSize : params && params.pageSize
								&& !isNaN(params.pageSize) ? params.pageSize
								: undefined,
						pageList : params && params.pageList ? params.pageList
								: undefined,
						idField : params && params.idField ? params.idField
								: 'id',
						textField : params && params.textField ? params.textField
								: 'companyFullName',
						mode : params && params.mode == 'local' ? 'local'
								: 'remote',
						loadMsg : '数据加载中请稍后……',
						width : params && params.width && !isNaN(params.width) ? params.width
								: undefined,
						panelWidth : params && params.panelWidth
								&& !isNaN(params.panelWidth) ? params.panelWidth
								: 280,
						height : params && params.height
								&& !isNaN(params.height) ? params.height
								: undefined,
						panelHeight : params && params.panelHeight
								&& !isNaN(params.panelHeight) ? params.panelHeight
								: 300,
						singleSelect : params && params.singleSelect == true ? true
								: false,
						fitColumns : true,
						onClick : params && params.onClick ? params.onClick
								: undefined,
						onLoadSuccess : params && params.onLoadSuccess ? params.onLoadSuccess
								: undefined,
						onBeforeLoad : params && params.onBeforeLoad ? params.onBeforeLoad
								: undefined,
						onLoadError : params && params.onLoadError ? params.onLoadError
								: undefined,
						onSelect : params && params.onSelect ? params.onSelect
								: undefined,
						onHidePanel : params && params.onHidePanel ? params.onHidePanel
								: function() {
									var g = $(this).combogrid('grid'); // get
									var r = g.datagrid('getSelected'); // get
									var q = $(this).combogrid('getValue');
									if (null != g || g.length > 0) {
										if (null == r || r.length == 0) {
											$(this).combogrid('clear');
											$(this).combogrid('setValue', '');
											// 当前表单数据只剩一条
											g = g.datagrid('getRows');
											if (g.length == 1) {
												$(this).combogrid('setValue',
														g[0].id);
											}
										} else {
											$(this).combogrid('setValue',
													r.id);
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
								$(this).combogrid("grid").datagrid('gotoPage',
										1);
							}
						}
					})
}
/**
 * 补齐两位小数点
 */
function formatDouble(val){
	if(val!=null){
		return val.toFixed(2);
	}
}

/**
 * 省市区3级联动
 * @param privinceId
 * @param cityId
 * @param areaId
 */
function sucareaCascade(privinceId,cityId,areaId){
  if(!privinceId || !cityId || !areaId){
    console.log("省市区id不能为空");
  }
  var areaUrl = rootPath+'/area/findListByAreaType.do';
  //中国大陆areaCode
  var cnAreaCode='08601';
  privinceId = "#" + privinceId;
  cityId = "#" + cityId;
  areaId = "#" + areaId;
  //加载个人现居住地址省市区下拉列表
  $(privinceId).combobox({
    valueField:'areaCode', //值字段  
        textField:'areaName', //显示的字段  
        editable:false,
        url:areaUrl,
        queryParams:{'parentAreaCode':cnAreaCode,areaType:2}, 
        onChange:function(province){
           //清空省市区数据
           $(cityId).combobox('clear');
             $(areaId).combobox('clear'); 
             $(cityId).combobox('loadData', {total:0,rows:[]});
             $(areaId).combobox('loadData', {total:0,rows:[]});
             //若果省有值那么去加载市
             if(province != null && province != undefined && province != "" ){
               $(cityId).combobox({
                   url:areaUrl,
                     queryParams:{'parentAreaCode':province,areaType:3},
                     valueField:'areaCode', //值字段  
                    textField:'areaName', //显示的字段  
                    editable:false,
                    onChange:function(city){ 
                     $(areaId).combobox('clear');
                     $(areaId).combobox('loadData', {total:0,rows:[]});
                     if(city != null && city != undefined && city != "" ){
                       $(areaId).combobox({  
                         url:areaUrl,
                         queryParams:{'parentAreaCode':city,areaType:4},
                         valueField:'areaCode', //值字段  
                         textField:'areaName', //显示的字段  
                         editable:false,
                       });
                     }
                    }
                 });
             }
        }
  });
}
/*function sucareaCascade(provinceId,cityId,regionId,params){
	if(!provinceId){
		console.error("provinceId不能为空");
		return;
	}$("#"+provinceId).combobox({
		valueField : params && params.valueField ? params.valueField : 'areaCode',
		textField : params && params.textField ? params.textField : 'areaName',
				
		}),
	$("#"+cityId).combobox({
		valueField : params && params.valueField ? params.valueField : 'areaCode',
		textField : params && params.textField ? params.textField : 'areaName',
		
		}),
	$("#"+regionId).combobox({
		valueField : params && params.valueField ? params.valueField : 'areaCode',
		textField : params && params.textField ? params.textField : 'areaName',
		
		}),
	$("#"+provinceId).combobox({
		width : params && !isNaN(params.width) ? params.width : undefined,
		height : params && !isNaN(params.height) ? params.height : undefined,
		panelWidth : params && !isNaN(params.panelWidth) ? params.panelWidth : undefined,
		panelHeight : params && !isNaN(params.panelHeight) ? params.panelHeight : undefined,
		valueField : params && params.valueField ? params.valueField : 'areaCode',
		textField : params && params.textField ? params.textField : 'areaName',
		url : params && params.url ? params.url : '../area/findListByAreaType.do',
		editable : params && params.editable == false ? false : true,
		onBeforeLoad:function(param){
			param.areaType=2;
		},
		onChange : !cityId || cityId == null ? function(){} : function(record){
			console.log(record);
			if(regionId && regionId != null){
				$("#"+regionId).combobox('clear');
			}
			$("#"+cityId).combobox({
				valueField : params && params.valueField ? params.valueField : 'areaCode',
				textField : params && params.textField ? params.textField : 'areaName',
				url : params && params.url ? params.url : '../area/findListByAreaType.do',
				editable : params && params.editable == true ? true : false,
				onBeforeLoad:function(param){
					param.areaType=3;
					param.parentAreaCode=record.areaCode;
				},
				onChange: !regionId || regionId == null ? function(){} : function(record){
					$("#"+regionId).combobox({
						valueField : params && params.valueField ? params.valueField : 'areaCode',
						textField : params && params.textField ? params.textField : 'areaName',
						url : params && params.url ? params.url : '../area/findListByAreaType.do',
						editable : params && params.editable == true ? true : false,
						onBeforeLoad:function(param){
							param.areaType=4;
							param.parentAreaCode=record.areaCode;
						},
					})
				}
			})
		}
	})
}*/
function appUser(domId, params) {
	if (!domId) {
		console.error("domId不能为空！");
		return;
	}
	if (params && params.pageSize != null && params.pageSize != undefined) {
		if (!isNaN(params.pageSize)) {
			params.pageList = [ params.pageSize, params.pageSize * 2,
					params.pageSize * 3, params.pageSize * 4,
					params.pageSize * 5, params.pageSize * 10 ]
			params.pagination = true;
		} else {
			console.error("pageSize必须要为数字！");
			return;
		}
	}
	$("#" + domId)
			.combogrid(
					{
						url : params && params.url ? params.url
								: '../appUser/getUser.do',
						columns : params && params.columns ? params.columns
								: [ [  {
									field : 'mobilephone',
									title : '手机号码',
									width : 100
								}, {
									field : 'userName',
									title : '姓名',
									width : 60
								},{
									field : 'dotType',
									title : '角色',
									width : 50,
									formatter : function(value, rec, index){
										if(value==true){
											return '网点';
										}else{
											return '司机';
										}
									}
								}] ],
						pagination : params && params.pagination == false ? false
								: true,
						pageNumber : 1,
						pageSize : params && params.pageSize
								&& !isNaN(params.pageSize) ? params.pageSize
								: undefined,
						pageList : params && params.pageList ? params.pageList
								: undefined,
						idField : params && params.idField ? params.idField
								: 'mobilephone',
						textField : params && params.textField ? params.textField
								: 'userName',
						mode : params && params.mode == 'local' ? 'local'
								: 'remote',
						loadMsg : '数据加载中请稍后……',
						width : params && params.width && !isNaN(params.width) ? params.width
								: undefined,
						panelWidth : params && params.panelWidth
								&& !isNaN(params.panelWidth) ? params.panelWidth
								: 280,
						height : params && params.height
								&& !isNaN(params.height) ? params.height
								: undefined,
						panelHeight : params && params.panelHeight
								&& !isNaN(params.panelHeight) ? params.panelHeight
								: 300,
						singleSelect : params && params.singleSelect == true ? true
								: false,
						fitColumns : true,
						onClick : params && params.onClick ? params.onClick
								: undefined,
						onLoadSuccess : params && params.onLoadSuccess ? params.onLoadSuccess
								: undefined,
						onBeforeLoad : params && params.onBeforeLoad ? params.onBeforeLoad
								: undefined,
						onLoadError : params && params.onLoadError ? params.onLoadError
								: undefined,
						onHidePanel : params && params.onHidePanel ? params.onHidePanel
								: function() {
									var g = $(this).combogrid('grid'); // get
									var r = g.datagrid('getSelected'); // get
									var q = $(this).combogrid('getValue');
									if (null != g || g.length > 0) {
										if (null == r || r.length == 0) {
											$(this).combogrid('clear');
											$(this).combogrid('setValue', '');
											// 当前表单数据只剩一条
											g = g.datagrid('getRows');
											if (g.length == 1) {
												$(this).combogrid('setValue',
														g[0].mobilephone);
											}
										} else {
											$(this).combogrid('setValue',
													r.mobilephone);
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
								$(this).combogrid("grid").datagrid('gotoPage',
										1);
							}
						}
					})
}
function modelsCode(domId, params) {
	if (!domId) {
		console.error("domId不能为空！");
		return;
	}
	if (params && params.pageSize != null && params.pageSize != undefined) {
		if (!isNaN(params.pageSize)) {
			params.pageList = [ params.pageSize, params.pageSize * 2,
					params.pageSize * 3, params.pageSize * 4,
					params.pageSize * 5, params.pageSize * 10 ]
			params.pagination = true;
		} else {
			console.error("pageSize必须要为数字！");
			return;
		}
	}
	$("#" + domId)
			.combogrid(
					{
						url : params && params.url ? params.url
								: '../truckCostManage/getByTruckCostName.do',
						columns : params && params.columns ? params.columns
								: [ [  {
									field : 'truckCostName',
									title : '车型成本名称',
									width : 70
								} ] ],
						pagination : params && params.pagination == false ? false
								: true,
						pageNumber : 1,
						pageSize : params && params.pageSize
								&& !isNaN(params.pageSize) ? params.pageSize
								: undefined,
						pageList : params && params.pageList ? params.pageList
								: undefined,
						idField : params && params.idField ? params.idField
								: 'truckCostName',
						textField : params && params.textField ? params.textField
								: 'truckCostName',
						mode : params && params.mode == 'local' ? 'local'
								: 'remote',
						loadMsg : '数据加载中请稍后……',
						width : params && params.width && !isNaN(params.width) ? params.width
								: undefined,
						panelWidth : params && params.panelWidth
								&& !isNaN(params.panelWidth) ? params.panelWidth
								: 280,
						height : params && params.height
								&& !isNaN(params.height) ? params.height
								: undefined,
						panelHeight : params && params.panelHeight
								&& !isNaN(params.panelHeight) ? params.panelHeight
								: 300,
						singleSelect : params && params.singleSelect == true ? true
								: false,
						fitColumns : true,
						onClick : params && params.onClick ? params.onClick
								: undefined,
						onLoadSuccess : params && params.onLoadSuccess ? params.onLoadSuccess
								: undefined,
						onBeforeLoad : params && params.onBeforeLoad ? params.onBeforeLoad
								: undefined,
						onLoadError : params && params.onLoadError ? params.onLoadError
								: undefined,
						onHidePanel : params && params.onHidePanel ? params.onHidePanel
								: function() {
									var g = $(this).combogrid('grid'); // get
									var r = g.datagrid('getSelected'); // get
									var q = $(this).combogrid('getValue');
									if (null != g || g.length > 0) {
										if (null == r || r.length == 0) {
											$(this).combogrid('clear');
											$(this).combogrid('setValue', '');
											// 当前表单数据只剩一条
											g = g.datagrid('getRows');
											if (g.length == 1) {
												$(this).combogrid('setValue',
														g[0].truckCostName);
											}
										} else {
											$(this).combogrid('setValue',
													r.truckCostName);
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
								$(this).combogrid("grid").datagrid('gotoPage',
										1);
							}
						}
					})
}
var startdate;
var enddate;
/**
 * 时间限制控件
 * @param startTime domid
 * @param endTime domid
 * @param months --不能超过一月则位1，一年12则为12
 * @param days -- 不能找过一天则为1，一周则为7天
 */
function timeLimit(startTime, endTime, months,days) {
	
	$("#" + startTime).datebox({
						onSelect : function(start) {
							var end;
							var message;
							if (enddate) {
								if (months) {

									end=	new Date(start.getFullYear(),
											(start.getMonth() + months),
											start.getDate());
									message = "查询区间不能大于"+months+"月";
								}
								if (days) {
									end=new Date(start.getFullYear(), start
											.getMonth(),
											(start.getDate() + days));
									message = "查询区间不能大于"+days+"天";
								}
							}
							if (!enddate) {
								startdate = start;
								return true;
							} else if (enddate < start) {
								showWarnMsg("开始时间不能大于结束时间");
								$("#" + startTime).datebox('setValue', '')
								startdate =undefined;
								return false
							} else if (enddate > end ) {
								showWarnMsg(message);
								$("#" + startTime).datebox('setValue', '')
								startdate =undefined;
								return false
							} else {
								startdate = start;
								return true;
							}
						}
	});
	$("#" + endTime).datebox(
			{
				onSelect : function(end) {
					var start;
					var message;
					if (startdate) {
						if (months) {

							start = new Date(end.getFullYear(),
									(end.getMonth() - months), end.getDate());
							message = "查询区间不能大于" + months + "月";
						}
						if (days) {
							start = new Date(end.getFullYear(), end.getMonth(),
									(end.getDate() - days));
							message = "查询区间不能大于" + days + "天";
						}
					}
					if (!startdate) {
						enddate = end;
						return true;
					} else if (end < startdate) {
						showWarnMsg("结束时间不能小于开始时间");
						$("#" + endTime).datebox('setValue', '')
						enddate=undefined;
						return false
					} else if (startdate < start) {
						showWarnMsg(message);
						$("#" + endTime).datebox('setValue', '')
						enddate=undefined;
						return false
					} else {
						enddate = end;
						return true;
					}

				}
			});
}