<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
	<%@include file="../component/common.jsp"%>
	<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/iaMonitor/iaMonitor.js"></script>
	<title>算法任务监控</title>
<style type="text/css">
.datagrid-toolbar .multilineTextInput {
	height: 200px !important;
}

.datagrid-toolbar .multilineTextInput .textbox {
	height: 200px !important;
}

.datagrid-toolbar .multilineTextInput span {
	height: 200px !important;
}

.datagrid-toolbar .multilineTextInput textarea {
	height: 200px !important;
}
	
</style>
</head>
<body>
	<div id="tlbIaMonitor">
		<div class="easyui-accordion">
			<div class="search-form" >
				<form id="formCondition" style="float:left;margin:0 auto;">
					<div><input label="分拨中心:" id="cmbgdFindOrgCode" name="orgCode" class="easyui-textbox" labelPosition="left" data-options="prompt:'请选择机构'"></div>
					<div><input label="组合编号:" id="txtCombineCode"  name="combineCode" class="easyui-textbox" labelPosition="left" data-options="prompt:'请输入组合编号'"></div>
					<div><input label="状态:" id="cmbStatus" name="status" class="easyui-textbox" labelPosition="left" data-options=""></div>
					<div>
						<input label="执行时间起:" id="dtStartTime" name="startTime" labelWidth="100px" class="easyui-datebox" labelPosition="left" data-options="editable:false">
						至<input id="dtEndTime" name="endTime" class="easyui-datebox" labelPosition="left" data-options="editable:false">
					</div>
					<div class="">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findIaMonitor()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetIaMonitor()">重置</a>
			    	</div>
				</form>
			</div>
		</div>
	</div>
	<table id="dgIaMonitor" style="width:100%;" data-options="fit:true"></table>
	
	<!-- 详情dialog -->
	<div id="dlgIaMonitor" class="easyui-dialog" data-options=""  style="width:810px;height:450px;" closed="true">
		<div class="easyui-layout"  data-options="fit:true" >
    		<div class="search-form datagrid-toolbar" data-options="region:'center',collapsible:false">
    			<form id="formIaMonitor" style="float:left; margin: 20px auto;">
    				<input id='id' type="hidden" name="id" />
		    		<input id='version' type="hidden" name="version" />
		    		<div><input label="任务编号："  name="taskCode"  class="easyui-textbox" data-options="readonly:true"></div>
					<div><input label="分拨中心：" name="orgName" class="easyui-textbox" labelPosition="left" data-options="readonly:true"></div>
					<div><input label="任务执行时间："  name="executeTime" labelWidth="120px" class="easyui-datetimebox" data-options="readonly:true"></div>
					<div><input label="组合编号："  name="combineCode"  class="easyui-textbox" data-options="readonly:true"></div>
					<div><input label="需求类型："  id="cmbDemandType" name="demandType" class="easyui-textbox" data-options="readonly:true"></div>
					<div><input label="组合类型：" id="cmbCombineType" name="combineType" labelWidth="120px" class="easyui-textbox" data-options="readonly:true"></div>
					<div><input label="业务模式：" id="cmbBusinessMode" name="businessMode" class="easyui-textbox" data-options="readonly:true"></div>
					<div class="multilineTextInput"><input label="错误信息：" name="errorMsg" style="width: 780px;" class="easyui-textbox" multiline="true" data-options="readonly:true"></div>
				</form>
    		</div>
    	</div>
	</div>
	
</body>
</html>