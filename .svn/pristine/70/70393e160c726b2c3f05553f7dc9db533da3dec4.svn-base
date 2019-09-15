<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="../component/common.jsp"%>
	<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/common/report/loadRatioReport.js"></script>
	<title>满载率统计</title>
	<style>
		.datagrid-ftable .datagrid-row a{
		color:#fff !important;
		}
		#formCondition .short-box{
			margin-left:0px !important;
		}
		#formCondition .short-box .textbox-label{
			width:auto;
			padding-left:0px;
		}
	</style>
</head>
<body>
	<div id="tlbLoadRatioReport">
		<div class="easyui-accordion">
			<div class="search-form">
				<form id="formCondition" style="float:left;margin:0 auto;">
					<div><input label="开始时间起：" class="easyui-datebox" id="dtStartTime" labelWidth="100px" name="startTimeByBegin" labelPosition="left" data-options="editable:false" /> </div>
					<div class="short-box"><input label="止：" class="easyui-datebox" id="dtEndTime" name="startTimeByEnd" labelPosition="left"  data-options="editable:false"/></div>
					<div><input label="网点：" class="easyui-combobox" id="cmbgSiteCode" name="siteCode" labelPosition="left" labelWidth="100px" data-options="prompt:'请输入网点'"/></div>
					<div><input label="分拨中心：" class="easyui-cmbobox" id="cmbgWorkCenterCode" name="workCenterCode" labelPosition="left" labelWidth="100px"  data-options="prompt:'请输入分拨中心'" /></div>
					<div><input label="车辆类型：" class="easyui-combobox" id="cmbCarType" name="carType" labelPosition="left" labelWidth="100px" /></div>
					<div><input label="业务模式：" class="easyui-combobox" id="cmbBusinessMode" name="businessMode" labelPosition="left" labelWidth="100px" /></div>
					<div class="">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findLoadRatioReport()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetLoadRatioReport()">重置</a>
					</div>
				</form>
			</div>
		</div>
		
		<!-- 按钮 -->
		<div class="toolbar-margin" style="overflow:hidden">
			<shiro:hasPermission name="load_ratio_export">
				<a href="#" onclick="doExport()" class="easyui-linkbutton fr" data-options="iconCls:'iconfont uce-export',plain:true">导出</a>
			</shiro:hasPermission>
		</div>
	</div>
		<!-- 主视图 -->
	<table id="dgLoadRatioReport" style="width:100%;" data-options="fit:true"></table>
</body>
</html>