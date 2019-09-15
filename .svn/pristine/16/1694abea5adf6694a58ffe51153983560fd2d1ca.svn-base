<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>运力缺口管理</title>
<%@include file="../component/common.jsp"%>

<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/capacityGapManagement/capacityGapManagement.js"></script>
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
					<input id="hideCreateBeginTime"  name="createBeginTime" type="hidden" />
					<input id="hideCreateEndTime"  name="createEndTime" type="hidden" />
					<input id="hideDemandSite"  name="demandSite" type="hidden" />
					<div><input id="findDemandSite" name="demandSiteCode" class="easyui-textbox" label="分拨中心: "  ></div>	
					<div>
						<input id="findExecuteStartTime" name="executeStartTime" class="easyui-datebox" label="日期: " labelwidth="95">&nbsp至&nbsp					
						<input id="findExecuteEndTime" name="executeEndTime" class="easyui-datebox">
					</div>
					<div class="fr">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findCapacityGapManagement()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetCapacityGapManagement()">重置</a>
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
	<div id="dlgCapacityGapByCombine" class="easyui-dialog" data-options="buttons:'#divLineClassBtn'"  style="width:85%;height:85%" closed="true">
		<div id="tlbDetial">
		</div>
		<table id="tblCapacityGapByCombine" style="width:100%;" data-options="fit:true"></table>
	</div>
</body>
</html>