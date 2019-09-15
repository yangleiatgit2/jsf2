<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>分拨中心时刻管理</title>
<%@include file="../component/common.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/operaTime/operaTimeMain.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/operaTime/operaTimeUtil.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/operaTime/operaTimeValidateAndGlobalVar.js"></script>
<script type="text/javascript">
	//获取当前用户信息
	var cmsOrgType = "${sessionScope.CURRENT_USER.cmsOrgType}";
	var cmsBaseOrgCode = "${sessionScope.CURRENT_USER.cmsBaseOrgCode}";
	var cmsOrgCode = "${sessionScope.CURRENT_USER.cmsOrgCode}";
</script>	
</head>
<body>
	<!-- begin pageview -->
	<div id="tlbOperaTime" class="datagrid-toolbar">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formFindOperaTime" action="#" style="float:left;margin:0 auto;">
					<div><input id="operationCenterCode" name="operationCenterCode" class="easyui-textbox"  label="分拨中心: " labelWidth="130px"  data-options="prompt:'请输入关键字',validType:['length[1,30]']"></div>
					<div><input id="siteCode" name="siteCode" class="easyui-textbox"  label="网点: " labelWidth="130px"  data-options="prompt:'请输入关键字',validType:['length[1,30]']"></div>
					<div class="fr">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findOperaTime()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="restOperaTime()">重置</a>
			    	</div>
				</form>
			</div>
		</div>	
			<div class="toolbar-margin"> 
			<shiro:hasPermission name="opera_add">
			     <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="iconfont uce-add" onclick="openAddOpearTime()" plain="true">新增</a> 
			</shiro:hasPermission>
			<shiro:hasPermission name="opera_export">
			     <a href="javascript:void(0)" class="easyui-linkbutton fr" iconCls="iconfont uce-export" onclick="exportOpreaTime()" plain="true">导出</a>
	  		</shiro:hasPermission>
	  		</div>
	</div>
    <table id="tblOperaTime" class="easyui-datagrid" data-options="fit:true"></table>
  	 <!-- 新增分拨时刻界面 begin -->
     <div id="dlgNewOperaTime" class="easyui-dialog" style="width:420px;height:330px; padding:0px" closed="true" buttons="#divOperaBtn">
    	<div class="easyui-accordion ">	
    		<div class="search-form datagrid-toolbar">
		    	<form id="formAddOperaTime" method="post" enctype="multipart/form-data" style="float:left; margin: 20px auto;">
		    		<input type="hidden" name="" id="" />	
					<div><input id="addOperationCenterCode" name="operationCenterCode"  class="easyui-textbox" required="true" label="分拨中心: " labelWidth="130px" data-options="prompt:'请输入关键字'"></div>
					<div><input id="addSiteCode" name="siteCode"  class="easyui-textbox" required="true" label="网点名称: " labelWidth="130px"   data-options="prompt:'请输入关键字'"></div>
					<div><input id="addEarliestDepartureTime" name="earliestDepartureTime" class="easyui-timespinner" label="最早出发时间: " required="true"  labelWidth="130px" data-options="editable:false,prompt:'时:分'"></div>
					<div><input id="addLatestArrivalTime" name="latestArrivalTime" class="easyui-timespinner" label="最晚到达时间: " required="true"  labelWidth="130px"data-options="editable:false,prompt:'时:分'" ></div>
				</form>
			</div>
		</div>
    </div>
    <!-- 新增分拨时刻界面 end -->
    
    <!-- 查看详情界面 begin -->
    <div id="dlgShowOperaTime" class="easyui-dialog" style="width:420px;height:330px; padding:0px" closed="true" >
    	<div class="easyui-accordion ">	
    		<div class="search-form datagrid-toolbar">
		    	<form id="formShowOperaTime" method="post" enctype="multipart/form-data" style="float:left; margin: 20px auto;">
		    		<input type="hidden" name="" id="" />	
					<div><input id="showOperationCenterCode" name="operationCenterCode"  class="easyui-textbox" label="分拨中心: " labelWidth="130px" readonly="readonly" data-options="editable:false"></div>
					<div><input id="showSiteCode" name="siteCode"  class="easyui-textbox" label="网点名称: " labelWidth="130px" readonly="readonly"  data-options="editable:false"></div>
					<div><input id="showEarliestDepartureTime" name="earliestDepartureTime" class="easyui-timespinner" label="最早出发时间: " readonly="readonly"  labelWidth="130px" data-options="editable:false"></div>
					<div><input id="showLatestArrivalTime" name="latestArrivalTime" class="easyui-timespinner" label="最晚到达时间: " readonly="readonly"  labelWidth="130px"data-options="editable:false" ></div>
				</form>
			</div>
		</div>
    </div>
    <!-- 查看详情界面 end -->
    <div id="divOperaBtn">
        <a href="javascript:void(0)" class="easyui-linkbutton save" onclick="saveOperaTime()">保存</a>
        <a href="javascript:void(0)" class="easyui-linkbutton cancel" onclick="javascript:closeDialog('dlgNewOperaTime')">关闭</a>
    </div>
</body>
</html>