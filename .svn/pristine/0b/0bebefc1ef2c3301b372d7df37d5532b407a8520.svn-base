<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="../component/common.jsp"%>
	<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/common/report/driverEvaluateReport.js"></script>
	<title>司机服务评价统计</title>
<style>
.special-wrap .numberbox{
	min-width:40px !important;
	width:58px !important;
}
.special-wrap .textbox-text{
	min-width:40px !important;
	width:40px !important;
}
</style>
</head>
<body>
	<div id="tlbDriverEvaluateReport">
		<div class="easyui-accordion">
			<div class="search-form">
				<form id="formCondition" style="float:left;margin:0 auto;">
					<div><input label="司机：" id="cmbgDriverPhone" class="easyui-textbox" labelWidth="100px" name="driverName" labelPosition="left" data-options="prompt:'请输入司机姓名'"/></div>
					<div><input label="司机状态：" class="easyui-combobox" id="cmbDriverStatus" labelWidth="100px" name="driverStatus" labelPosition="left" /></div>
					<div>
						<input label="出发时间起：" class="" id="dtStartTime" labelWidth="100px" name="departTime" labelPosition="left" data-options="editable:false,width:270" /> 
							<label for="dtEndTime">&nbsp;至&nbsp;</label>
						<input class="" id="dtEndTime" name="arrivalTime" data-options="editable:false"/>
					</div>
					<div><input label="运力类型：" class="easyui-combobox" id="cmbOwnerType" name="driverType" labelPosition="left" labelWidth="100px" /></div>
					<div class="special-wrap">
						<input label="好评率：" class="easyui-numberbox" id="" name="praiseRateBegin" labelPosition="left" labelWidth="100px" data-options="min:0,max:100"/><label for="">%</label>
						&nbsp;至&nbsp;<input class="easyui-numberbox" id="" name="praiseRateEnd" data-options="min:0,max:100" /> <label for="">%</label>
					</div>
					<div class="">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findDriverEvaluateReport()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetDriverEvaluateReport()">重置</a>
					</div>
				</form>
			</div>
		</div>
		
		<!-- 按钮 -->
		<div class="toolbar-margin" style="overflow:hidden">
			<shiro:hasPermission name="driver_evaluate_export">
				<a href="#" onclick="doExport()" class="easyui-linkbutton fr" data-options="iconCls:'iconfont uce-export',plain:true">导出</a>
			</shiro:hasPermission>
		</div>
	</div>
		<!-- 主视图 -->
	<table id="dgDriverEvaluateReport" style="width:100%;" data-options="fit:true"></table>
	
	<div id="dlgDriverEvaluateReportDetail" class="easyui-dialog" style="width:900px;height:400px;" closed="true">
		<div id="tlbDetail">
			<div class="easyui-accordion">
				<!-- 详情视图 -->
			</div>
		</div>
		<table id="dgDriverEvaluateReportDetail" style="width:100%;"data-options="fit:true"></table>
	</div>
</body>
</html>