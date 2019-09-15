<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>运力费用维护</title>
<%@include file="../component/common.jsp"%>

<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/cost/maintenance.js"></script>
<script>
	var cmsOrgType = "${sessionScope.CURRENT_USER.cmsOrgType}";
</script>
</head> 
<body>
	<!-- begin pageview -->
	<div id="tlbCostMaintenance">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formFindCostMaintenance" action="#" style="float:left;margin:0 auto;" method="post">
					<!--  <input type="hidden" name="demandType" value="1"/>-->
					<div><input id="findtruckType" name="truckType" class="easyui-textbox" labelwidth="140" label="车辆类型: " ></div>	
					<!-- <div class="query-reset"> -->
					<div class="fr">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findCostMaintenancebywhere()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetCostMaintenance()">重置</a>
			    	</div>
				</form>
			</div>
		</div>
		<!-- begin table tool -->
		<div class="toolbar-margin">
		<%-- <shiro:hasPermission name="lineclass_add">  --%>
			<a href="#" class="easyui-linkbutton search" style="margin-left: 1rem;" data-options="plain:true" onclick="addCost()">新增</a>
			<a href="#" class="easyui-linkbutton search"  data-options="plain:true" onclick="editDot()">编辑</a>
			<a href="#" class="easyui-linkbutton search"  data-options="plain:true" onclick="deleteCost()">删除</a>
			<a href="#" class="easyui-linkbutton " iconCls="icon-print" style="margin-left: 72rem;background-color: #D0D0D0;" data-options="plain:true" onclick="exportDot()">导出</a>
		</div>
		<!-- end table tool -->			
	</div>
	<!-- begin table -->
	<table id="tblCostMaintenance" style="width:100%;" data-options="fit:true"></table>
	<!-- end table -->
	<!-- end pageview -->
	<!-------------------------------------------------- 编辑页面处理 ------------------------------------------------------------------------------>
	<!-- begin dialog -->
	<div id="dlgDotAility" class="easyui-dialog" data-options="buttons:'#divDotAilityBtn'"  style="width:650px;height:480px;" closed="true">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formLineClass" style="float:left; margin: 20px auto;width:600px;height:350px;" action="#" method="post">
					<input id="myid"  name='id' type="hidden">
					<div><input id="truckType" name="truckType"  class="easyui-textbox" labelwidth="120"  label="车辆类型: " ></div>
					<div><input id="purchaseFee" name="purchaseFee"  class="easyui-numberbox" labelwidth="120" label="车辆购置费(元):" precision="2" ></div>
					<div><input id="insurancePremium" name="insurancePremium"  class="easyui-numberbox"  labelwidth="120" label="保险费(元/年):" precision="2" ></div>
					<div><input id="driverWages" name="driverWages"  class="easyui-numberbox" labelwidth="120" label="司机工资(元/月):" precision="2" ></div>
					<div><input id="fuleCose" name="fuleCose"  class="easyui-numberbox" labelwidth="120" label="油费(元/月)：" precision="2" ></div>
					<div><input id="maintanceCost"  name="maintanceCost" class="easyui-numberbox" labelwidth="120" label="维修费(元/月):" precision="2" ></div>
					<div><input id="highSpeedCost" name="highSpeedCost"  class="easyui-numberbox" labelwidth="120"  label="高速费(元/月):" precision="2"></div>
					<div><input id="otherCost" name="otherCost" class="easyui-numberbox" labelwidth="120"   label="其他费用(元/月):" precision="2" ></div>
					<div><input id="conversionCoefficient" name="conversionCoefficient" labelwidth="120" class="easyui-numberbox"  label="折算系数:" precision="2" ></div>
					<div><input id="monthCost" name="monthCost"  class="easyui-numberbox" labelwidth="120" label="折算费用:" precision="2" ></div>
				</form>
				<a href="#" class="easyui-linkbutton save" onclick="addOrUpdateCost()">保存</a>
				<a href="#" class="easyui-linkbutton cancel" onclick="$('#dlgDotAility').window('close')">关闭</a>
				
			</div>
		</div>
		
	</div>
	<div id="divFreightDemandBtn">
		
	</div>
	<!-- end dialog -->

</body>
</html>