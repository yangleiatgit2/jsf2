<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>车辆成本管理</title>
<%@include file="../component/common.jsp"%>

<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/cost/truckCostManage.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/cost/Validate.js"></script>
<script>
	var cmsOrgType = "${sessionScope.CURRENT_USER.cmsOrgType}";
	var empName = decodeURI("${sessionScope.CURRENT_USER.empName}");
</script>
</head> 
<body>
	<!-- begin pageview -->
	<div id="tlbTruckCost">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formFindTruckCost" action="#" style="float:left;margin:0 auto;" method="post">
					<!--  <input type="hidden" name="demandType" value="1"/>-->
					<div><input id="findtruckManageCode" name="truckManageCode" class="easyui-textbox" labelwidth="100" label="车型管理号: "  data-options="validType:'length[0,25]'" ></div>	
					<div><input id="findtruckCostName" name="truckCostName" class="easyui-textbox" labelwidth="100" label="车型成本名称: "  data-options="validType:'length[0,25]'" ></div>	
					<div><input id="findtruckType" name="truckType" class="easyui-textbox" labelwidth="100" label="车辆类型: " ></div>	
					<div><input id="findbelongSiteCode" name="belongSiteCode" class="easyui-textbox" labelwidth="100" label="分拨中心: " required="true" ></div>	
					<div><input id="findtruckConcrete" name="truckConcrete" class="easyui-textbox" labelwidth="100" label="具体车型: " ></div>	
					<div><input id="finddetailsStatus" name="detailsStatus" class="easyui-textbox" labelwidth="100" label="状态： " ></div>	
					<div   class="fr">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findTruckCostbywhere()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetTruckCost()">重置</a>
			    	</div>
				</form>
			</div>
		</div>
		<!-- begin table tool -->
		<div class="toolbar-margin">
		<%-- <shiro:hasPermission name="lineclass_add">  --%>
			<a href="#" class="easyui-linkbutton" style="margin-left: 1rem;" data-options="iconCls:'iconfont uce-add',plain:true" onclick="addTruckCost()">新增</a>
			<a href="#" class="easyui-linkbutton" style="margin-left: 1rem;" data-options="iconCls:'iconfont uce-shenpi',plain:true"onclick="checkUpTruckCost()">审核</a>
			<a href="#" class="easyui-linkbutton" style="margin-left: 1rem;"data-options="iconCls:'iconfont uce-export',plain:true" onclick="versionUpTruckCost()">版本升级</a>
			<!-- <a href="#" class="easyui-linkbutton" style="margin-left: 1rem;" data-options="iconCls:'iconfont uce-ck-details',plain:true" onclick="showHistoryTruckCost()">显示历史版本</a> -->
		</div>
		<!-- end table tool -->			
	</div>
	<!-- begin table -->
	<table id="tblTruckCost" style="width:100%;" data-options="fit:true"></table>
	<div id="divtblCostHistory" class="easyui-dialog"  style="width:800px;height:650px;" closed="true">
		<table id="tblCostHistory" style="width:90%;z-index:99;" data-options="fit:true"></table>
	</div>
	
	<!-- end table -->
	<!-- end pageview -->
	<!-------------------------------------------------- 编辑页面处理 ------------------------------------------------------------------------------>
	<!-- begin dialog -->
	<div id="dlgTruckCost" class="easyui-dialog" data-options="buttons:'#divDotAilityBtn'"  style="width:700px;height:350px;" closed="true">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formLineClass" style="float:left; margin: 20px auto;" action="#" method="post">
					<input id="myid"  name='id' type="hidden">
					<input id="version"  name='version' type="hidden">
					<div><input id="truckManageCode" name="truckManageCode" labelwidth="130"  class="easyui-textbox"  label="车型管理号: " disabled="true" data-options="validType:'length[0,25]'" ></div>
					<div><input id="belongSiteCode" name="belongSiteCode" labelwidth="130"  class="easyui-textbox"  label="分拨中心:" required="true"  ></div>
					<div><input id="truckCostName" name="truckCostName" labelwidth="130"  class="easyui-textbox "  label="车型成本名称:" disabled="true" data-options="validType:'length[0,25]'" ></div>
					<div><input id="truckType" name="truckType" labelwidth="130"  class="easyui-textbox "  label="车辆类型:" required="true" data-options="validType:['selectNull'],prompt:'请选择'"   ></div>
					<div><input id="truckConcrete" name="truckConcrete" labelwidth="130"  class="easyui-textbox "  label="具体车型:" required="true" data-options="validType:['selectNull'],prompt:'请选择'"    ></div>
					<div><input id="truckVolume" name="truckVolume" labelwidth="130"  class="easyui-numberbox"  label="实际方数:" required="true" data-options="min:0,max:999.99,precision:2,prompt:'请输入实际方数'"></div>
					<div><input id="handlingCharges" name="handlingCharges"  class="easyui-numberbox" labelwidth="130"  label="装卸费系数:" required="true" data-options="min:0,max:999.99,precision:2,prompt:'请输入装卸费系数'"></div>
					<div><input id="bufferVolume" name="bufferVolume"  class="easyui-numberbox" labelwidth="130" label="缓冲方数:" required="true" data-options="prompt:'请输入缓冲方数',precision:2,validType:['smallVal']" ></div>
					<div><input id="fixedCharges" name="fixedCharges"   class="easyui-numberbox" labelwidth="130" label="固定成本费用:"  required="true" data-options="min:0,max:99999.99,precision:2,prompt:'请输人固定成本费用'"  ></div>
					<div><input id="costCoefficient" name="costCoefficient"  class="easyui-numberbox" labelwidth="130"  label="变动成本系数:" required="true" data-options="min:0,max:999.99,precision:2,prompt:'请输入变动成本系数'"  ></div>
					<div style="hidden">
						<input id="belongSiteName"  name='belongSiteName' type="hidden" />
						<input id="detailsStatus"  name='detailsStatus' type="hidden" />
						<input id="createOrg"  name='createOrg' type="hidden">
						<input id="createEmp"  name='createEmp' type="hidden">
					</div>
				</form>
			</div>
			
		</div>
	</div>
	<div id="divDotAilityBtn">
		<a href="#" class="easyui-linkbutton save" onclick="addOrUpdateTruckCost()">保存</a>
		<a href="#" class="easyui-linkbutton cancel" onclick="$('#dlgTruckCost').window('close')">关闭</a>
	</div>
	<!-- end dialog -->

</body>
</html>