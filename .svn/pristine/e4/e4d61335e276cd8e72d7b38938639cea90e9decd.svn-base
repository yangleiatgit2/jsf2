<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>运力需求查询</title>
<%@include file="../component/common.jsp"%>

<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/capacityDemandRequired/capacityDemandRequired.js"></script>
<script>
	var cmsOrgType = "${sessionScope.CURRENT_USER.cmsOrgType}";
</script>
</head> 
<body>
	<!-- begin pageview -->
	<div id="toolbarCapacityGapManagement">
		<div class="easyui-accordion">			
			<div class="search-form">
		
				<form id="formFindCapacityGapManagement" action="#" style="float:left;margin:0 auto;" method="post">
					<div><input id="lineGroupCode" name=lineGroupCode class="easyui-textbox" label="需求组合编号: " labelwidth="100" data-options="prompt:'请输入需求组合编号',validType:['length[1,32]','orderCombineCode']"></div>	
					<div><input id="findDemandCombineCode" name="orderCombinCode" class="easyui-textbox" label="订单组合编号: " labelwidth="100" data-options="prompt:'请输入订单组合编号',validType:['length[1,32]','lineGroupCode']"></div>
					<div><input id="findDemandType" name="requiType" class="easyui-textbox" label="需求类型: " labelwidth="100"></div>			
					<div><input id="findBusinessMode" name="businessMode" class="easyui-textbox" label="业务模式: " ></div>
					<div><input id="findDemandSiteCode" name="startOrgCode" class="easyui-textbox" label="分拨中心: " labelwidth="100" data-options="prompt:'请输入分拨中心:',validType:['length[1,32]','carDeparturePlanCode']"></div>
			
					<div class="fr">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findCapacityDemandRequriedManagement()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetRequriedManagement()">重置</a>
			    	</div>
				</form>
			</div>
		</div>
			
	</div>
	<!-- begin table -->
	<table id="tblCapacityGapManagement" style="width:100%;" data-options="fit:true"></table>
	
	<div id="dlgCapacityGapByDay" class="easyui-dialog" data-options="buttons:'#divLineClassBtn'"  style="width:85%;height:85%" closed="true">
		<div id="tlbDetial">
		</div>
		<table id="tblCapacityGapByDay" style="width:100%;" data-options="fit:true"></table>
	</div>
</body>
</html>