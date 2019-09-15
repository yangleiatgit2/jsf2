<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>系统配置</title>
<%@include file="../component/common.jsp"%>
<style type="text/css">
	div.desc .textbox{
		height: 48px !important;
	}
</style>
<script type="text/javascript">
	var url = '';

	$(function(){
		var columns = [[
		                {field : 'id',title : '操作',align : 'center',width : 70,formatter : function(value, rec, index) {
		                	return '<a class="icon-line iconfont uce-edit" title="编辑" onclick="openUpdateSystemConfig(\''+index+'\')" href="javascript:void(0)"></a><a class="icon-line iconfont uce-delete" title="删除" onclick="deleteSystemConfig(\''+index+'\')" href="javascript:void(0)"></a>';
		                }},
		                {field : 'configCode',title : '参数编码',align : 'center',width : 150,formatter : formatTip},
		                {field : 'configValue',title : '参数值',align : 'center',width : 250,formatter : formatTip},
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
				url : '${pageContext.request.contextPath}/systemConfig/findAll.do',
				pageSize : 10,
				toolbar : '#tlbSystemConfig',
				singleSelect : 'fasle',
				fitColumns : 'false',
				onLoadSuccess : function(data) {
					$(this).datagrid("fixRownumber");
				}
			} 
		
		/* 加载表单数据 */
		newloadGrid('tblSystemConfig', columns, dataGridParams);
		
	});
	
	/* 新增 */
	function openAddSystemConfig(){
		openDialog("dlgSystemConfig", '新增');
		$("#formSystemConfig").form('clear');
		url ='${pageContext.request.contextPath}/systemConfig/addSystemConfig.do';
		$('#txtConfigCode').textbox({readonly:false});
	}
	/* 保存 */	
	function savePricingRuleType(){
		$('#formSystemConfig').form('submit',{
			url : url,
			task : function(result){
				closeDialog('dlgSystemConfig');
				reloadDatagrid('tblSystemConfig');
			}
		});
	}
	
	/* 编辑 */
	function openUpdateSystemConfig(index){
		var row = $('#tblSystemConfig').datagrid('getRows')[index];
		url ='${pageContext.request.contextPath}/systemConfig/updateSystemConfig.do';
		$('#formSystemConfig').form('load',row);
		openDialog("dlgSystemConfig", '编辑参数');
		$('#txtConfigCode').textbox({readonly:true});
	}
	
	/* 删除 */
	function deleteSystemConfig(index){
		var row = $('#tblSystemConfig').datagrid('getRows')[index];
		confirmMsg("您确定要删除吗？",function(){
			$.ajax({
				url:'${pageContext.request.contextPath}/systemConfig/deleteSystemConfig.do',
				data:{'id':row.id},
				task:function(){
					reloadDatagrid('tblSystemConfig');
				}
			});
		});
	}
	
	/* 查询 */
	function findSystemConfig(){
		$("#tblSystemConfig").datagrid("load", serializeFormObj("formFindSystemConfig"));	
	}
	
</script>
</head> 
<body>
	<!-- begin pageview -->
	<div id="tlbSystemConfig">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formFindSystemConfig" action="#" style="float:left;margin:0 auto;" method="post">
					<div><input name="configCode" class="easyui-textbox" label="参数编号：" data-options="prompt:'请输入参数编号'"></div>
					<div><input name="configValue" class="easyui-textbox" label="参数值：" data-options="prompt:'请输入参数值'"></div>
					<!-- <div class="query-reset"> -->
					<div class="fr">
					<!-- <div> -->
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findSystemConfig()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="javascript:$('#formFindSystemConfig').form('reset');">重置</a>
			    	</div>
			    	<!-- </div> -->
				</form>
			</div>
		</div>
		<!-- begin table tool -->
		<div class="toolbar-margin">
			<a href="#" onclick="openAddSystemConfig()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">新增</a>
		</div>
		<!-- end table tool -->			
	</div>
	<!-- begin table -->
	<table id="tblSystemConfig" style="width:100%;" data-options="fit:true"></table>
	<!-- end table -->
	<!-- end pageview -->
	<!-------------------------------------------------- 编辑页面处理 ------------------------------------------------------------------------------>
	<!-- begin dialog -->
	<div id="dlgSystemConfig" class="easyui-dialog datagrid-toolbar" data-options="buttons:'#divSystemConfigBtn'"  style="width:565px;height:240px;" closed="true">
		<div id="tlbDetial">
			<div class="easyui-accordion">			
				<div class="search-form">
					<form id="formSystemConfig" style="float:left; margin: 20px auto;" action="#" method="post">
						<div><input id="txtConfigCode" name="configCode"  class="easyui-textbox" data-options="prompt:'请输入参数编号',required:true" label="参数编号：" ></div>
						<div><input name="configValue"  class="easyui-textbox" data-options="prompt:'请输入参数值',required:true" label="参数值：" ></div>
						<div class="desc"><input name="remark"  class="easyui-textbox" multiline="true" style="width:500px;height:50px" label="参数描述：" ></div>
						<input type="hidden" name="version">
						<input type="hidden" name="id">
					</form>
				</div>
			</div>
		</div>
	</div>
	<div id="divSystemConfigBtn">
		<a href="#" class="easyui-linkbutton save" onclick="savePricingRuleType(this)">保存</a>
		<a href="#" class="easyui-linkbutton cancel" onclick="javascript:closeDialog('dlgSystemConfig')">关闭</a>
	</div>
</body>
</html>