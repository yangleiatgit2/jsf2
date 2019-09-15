<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>交货关系</title>
<%@include file="../component/common.jsp"%>
<script type="text/javascript">
	var url = '';

	var psOptControl ={
		psColumn:dealPermission(['deliveryRelation_update','deliveryRelation_delete']),
		psButtonEdit:(dealPermission(['deliveryRelation_update']) ? 'none' : 'bolck'),
		psButtonDelete:(dealPermission(['deliveryRelation_delete']) ? 'none' : 'bolck')
	};
	
	$(function(){
		var columns = [[
						{field : "id",checkbox : "true"},
		                {field : 'act',title : '操作',hidden:psOptControl.psColumn,align : 'center',width : 70,formatter : function(value, rec, index) {
		                	return '<a class="icon-line iconfont uce-edit" title="编辑" style="display:'+psOptControl.psButtonEdit +'" onclick="openUpdateDeliveryRelation(\''+index+'\')" href="javascript:void(0)"></a><a class="icon-line iconfont uce-delete" title="删除" style="display:'+psOptControl.psButtonDelete +'" onclick="deleteDeliveryRelation(\''+index+'\')" href="javascript:void(0)"></a>';
		                }},
		                {field : 'workcenterName',title : '分拨中心',align : 'center',width : 150,formatter : formatTip},
		                {field : 'siteName',title : '网点',align : 'center',width : 250,formatter : formatTip},
		                {field : 'createEmp',title : '创建人',align : 'center',width : 150,formatter : formatTip},
		                {field : 'createTime',title : '创建时间',align : 'center',width : 150,formatter : function(value) {
							return formatData(value)
						}},
		                {field : 'updateEmp',title : '修改人',align : 'center',width : 150,formatter : formatTip},
		                {field : 'updateTime',title : '修改时间',align : 'center',width : 150,formatter : function(value) {
							return formatData(value)
						}}
		                ]]
		
		var dataGridParams = {
				url : '',
				pageSize : 10,
				toolbar : '#tlbDeliveryRelation',
				singleSelect : 'fasle',
				fitColumns : 'false',
				onLoadSuccess : function(data) {
					$(this).datagrid("fixRownumber");
				}
			} 
		
		orgCombogrid('findWorkcenterCode',{orgTypes:ORG_TYPE_OPERATE_CENTER});
		orgCombogrid('findSiteCode',{orgTypes:ORG_TYPE_SITE});
		orgCombogrid('txtWorkcenterCode',{orgTypes:ORG_TYPE_OPERATE_CENTER,orgStatus: ORG_ENABLED});
		orgCombogrid('txtSiteCode',{orgTypes:ORG_TYPE_SITE,orgStatus: ORG_ENABLED});
		
		/* 加载表单数据 */
		newloadGrid('tblDeliveryRelation', columns, dataGridParams);
		
	});
	
	/* 新增 */
	function openAddDeliveryRelation(){
		openDialog("dlgDeliveryRelation", '新增');
		$("#formDeliveryRelation").form('clear');
		url ='${pageContext.request.contextPath}/deliveryRelation/addDeliveryRelation.do';
		$('#txtConfigCode').textbox({readonly:false});
	}
	/* 保存 */	
	function saveDeliveryRelation(){
		$('#hidWorkcenterName').val($('#txtWorkcenterCode').combogrid('getText'));
		$('#hidSiteName').val($('#txtSiteCode').combogrid('getText'));
		$('#formDeliveryRelation').form('submit',{
			url : url,
			task : function(result){
				closeDialog('dlgDeliveryRelation');
				reloadDatagrid('tblDeliveryRelation');
			}
		});
	}
	
	/* 编辑 */
	function openUpdateDeliveryRelation(index){
		var row = $('#tblDeliveryRelation').datagrid('getRows')[index];
		url ='${pageContext.request.contextPath}/deliveryRelation/updateDeliveryRelation.do';
		$('#formDeliveryRelation').form('load',row);
		openDialog("dlgDeliveryRelation", '编辑参数');
		$('#txtWorkcenterCode').combogrid('grid').datagrid('reload', {'q' : row.workcenterCode});
		$('#txtSiteCode').combogrid('grid').datagrid('reload', {'q' : row.siteCode});
		$('#txtConfigCode').textbox({readonly:true});
	}
	
	/* 删除 */
	function deleteDeliveryRelation(index){
		var row = $('#tblDeliveryRelation').datagrid('getRows')[index];
		confirmMsg("确认删除？",function(){
			$.ajax({
				url:'${pageContext.request.contextPath}/deliveryRelation/deleteDeliveryRelation.do',
				data:{'id':row.id},
				task:function(){
					reloadDatagrid('tblDeliveryRelation');
				}
			});
		});
	}
	
	/* 查询 */
	function findDeliveryRelation(){
		var datagrid = $('#tblDeliveryRelation').datagrid('options');
		datagrid.url =  rootPath + "/deliveryRelation/findAll.do";
		$('#tblDeliveryRelation').datagrid('load',serializeFormObj("formFindDeliveryRelation"));	
	}
	
	/* 批量删除 */
	function deleteBatch(){
		var rows = $('#tblDeliveryRelation').datagrid('getChecked');
		var ids = [];
		rows.map(function(e) {
			ids.push(e.id)
		});
		if (ids.length < 1) {
			showInfoMsg("请先选择要删除的数据！");
			return
		}
		ids = ids.join(',');
		confirmMsg('确认删除选择的单据?', function() {
			$.ajax({
				url : rootPath + '/deliveryRelation/deleteBatch.do?',
				data : {
					'ids' : ids
				},
				task : function(data, statusText, xhr) {
					reloadDatagrid('tblDeliveryRelation');
				}
			});
		});
	}
</script>
</head> 
<body>
	<!-- begin pageview -->
	<div id="tlbDeliveryRelation">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formFindDeliveryRelation" action="#" style="float:left;margin:0 auto;" method="post">
					<div><input id="findWorkcenterCode" name="workcenterCode" class="easyui-textbox" label="分拨中心：" data-options="prompt:'请选择分拨中心'"></div>
					<div><input id="findSiteCode" name="siteCode" class="easyui-textbox" label="网点：" data-options="prompt:'请选择网点'"></div>
					<!-- <div class="query-reset"> -->
					<div class="fr">
					<!-- <div> -->
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findDeliveryRelation()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="javascript:$('#formFindDeliveryRelation').form('reset');">重置</a>
			    	</div>
			    	<!-- </div> -->
				</form>
			</div>
		</div>
		<!-- begin table tool -->
		<div class="toolbar-margin">
			<shiro:hasPermission name="deliveryRelation_add"><a href="#" onclick="openAddDeliveryRelation()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">新增</a></shiro:hasPermission>
			<shiro:hasPermission name="deliveryRelation_delete"><a href="#" onclick="deleteBatch()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-delete',plain:true">批量删除</a></shiro:hasPermission>
		</div>
		<!-- end table tool -->			
	</div>
	<!-- begin table -->
	<table id="tblDeliveryRelation" style="width:100%;" data-options="fit:true"></table>
	<!-- end table -->
	<!-- end pageview -->
	<!-------------------------------------------------- 编辑页面处理 ------------------------------------------------------------------------------>
	<!-- begin dialog -->
	<div id="dlgDeliveryRelation" class="easyui-dialog datagrid-toolbar" data-options="buttons:'#divDeliveryRelationBtn'"  style="width:565px;height:190px;" closed="true">
		<div id="tlbDetial">
			<div class="easyui-accordion">			
				<div class="search-form">
					<form id="formDeliveryRelation" style="float:left; margin: 20px auto;" action="#" method="post">
						<div><input id="txtWorkcenterCode" name="workcenterCode"  class="easyui-textbox" data-options="prompt:'请选择分拨中心',required:true" label="分拨中心：" ></div>
						<div><input id="txtSiteCode" name="siteCode"  class="easyui-textbox" data-options="prompt:'请选择网点',required:true" label="网点：" ></div>
						<input id="hidWorkcenterName" type="hidden" name=workcenterName>
						<input id="hidSiteName" type="hidden" name="siteName">
						<input type="hidden" name="version">
						<input type="hidden" name="id">
					</form>
				</div>
			</div>
		</div>
	</div>
	<div id="divDeliveryRelationBtn">
		<a href="#" class="easyui-linkbutton save" onclick="saveDeliveryRelation(this)">保存</a>
		<a href="#" class="easyui-linkbutton cancel" onclick="javascript:closeDialog('dlgDeliveryRelation')">关闭</a>
	</div>
</body>
</html>