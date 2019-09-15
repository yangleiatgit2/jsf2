<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>定价规则分类</title>
<%@include file="../component/common.jsp"%>
<style type="text/css">
	div.desc .textbox{
	    width: 655px !important;
   		height: 48px !important;
	}
	div.desc{
		width: 100%;
	}
</style>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/pricingManage/PricingRuleType.js"></script>
</head> 
<body>
	<!-- begin pageview -->
	<div id="tlbPricingRuleType">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formFindPricingRuleType" action="#" style="float:left;margin:0 auto;" method="post">
					<div><input name="ruleTypeCode" class="easyui-textbox" labelWidth="120px" label="定价分类规则号：" data-options="prompt:'请输入定价分类规则号'"></div>
					<div><input id="findbusinessType" name="businessType" class="easyui-textbox" label="业务分类：" ></div>
					<div><input id="findgroupType" name="groupType" class="easyui-textbox" label="组合类型：" ></div>
					<div><input id="findworkCenterCode" name="workCenterCode" class="easyui-textbox" label="分拨中心：" data-options="prompt:'请选择分拨中心'"></div>
					<div><input id="findruleTypeCode" name="status" class="easyui-textbox" label="状态：" ></div>
					<input type="hidden" name="deleteFlag" value="0">
					<!-- <div class="query-reset"> -->
					<div class="fr">
					<!-- <div> -->
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findPricingRuleType()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="javascript:$('#formFindPricingRuleType').form('reset');">重置</a>
			    	</div>
			    	<!-- </div> -->
				</form>
			</div>
		</div>
		<!-- begin table tool -->
		<div class="toolbar-margin">
			<a href="#" onclick="openAddPricingRuleType()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">新增</a>
			<a href="#" onclick="verifyPricingRuleTypes()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-shenpi',plain:true">审批</a>
		</div>
		<!-- end table tool -->			
	</div>
	<!-- begin table -->
	<table id="tblPricingRuleType" style="width:100%;" data-options="fit:true"></table>
	<!-- end table -->
	<!-- end pageview -->
	<!-------------------------------------------------- 编辑页面处理 ------------------------------------------------------------------------------>
	<!-- begin dialog -->
	<div id="dlgPricingRuleType" class="easyui-dialog" data-options="buttons:'#divPricingRuleTypeBtn'"  style="width:810px;height:500px;" closed="true">
		<div id="tlbDetial">
			<div class="easyui-accordion">			
				<div class="search-form">
					<form id="formPricingRuleType" style="float:left; margin: 20px auto;" action="#" method="post">
						<div><input id="txtRuleTypeCode" name="ruleTypeCode" labelWidth="120px" readonly="readonly" class="easyui-textbox"  label="定价分类规则号：" data-options="prompt:'自动生成规则号'"></div>
						<div><input id="txtWorkCenterName" name="workCenterCode"  class="easyui-textbox"  label="分拨中心："></div>
						<div><input id="txtBusinessType" name="businessType"  class="easyui-textbox"  label="业务分类：" ></div>
						<div><input id="txtGroupType" name="groupType" labelWidth="120px" class="easyui-textbox"  label="组合类型：" ></div>
						<div class="desc"><input id="txtRuleTypeDesc" labelWidth="120px" name="ruleTypeDesc"  class="easyui-textbox" multiline="true" style="width:655px;height:50px" data-options="validType:'length[0,50]'" label="定价分类描述：" ></div>
						<input type="hidden" name="id">
						<input type="hidden" name="details" id="txtDetails">
						<input type="hidden" name="workCenterName" id="hidWorkCenterName">
						<input type="hidden" name="total" id="hidTotal">
						<input type="hidden" name="version">
						<input type="hidden" name="createEmp">
						<input type="hidden" name="ruleTypeVesion">
						<input type="hidden" name="status">
					</form>
				</div>
			</div>
			<div id="tblDetialToolBar" class="toolbar-margin">
				<a href="#" onclick="openAddDetail()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">新增</a>
				<a href="#" onclick="deleteDetail()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-delete',plain:true">删除</a>
				<a href="#" onclick="bindWorkCenter()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-bind',plain:true">绑定网点</a>
				<a href="#" onclick="unBindWorkCenter()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-unbind',plain:true">解绑网点</a>
			</div>
		</div>
		<table id="tblDetial" style="width:100%;" data-options="fit:true,onClickCell:onClickCell"></table>
	</div>
	<div id="divPricingRuleTypeBtn">
		<a href="#" class="easyui-linkbutton save"  data-options="toggle:true" onclick="savePricingRuleType()">保存</a>
		<a href="#" class="easyui-linkbutton cancel" onclick="closePricingRuleType()">关闭</a>
	</div>
	<!-- end dialog -->
	<div id="dlgRuleType" class="easyui-dialog datagrid-toolbar" data-options="buttons:'#divRuleTypeBtn'" style="width:520px;height:150px;" closed="true">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formPricingType" action="#">
					<div><input id="txtPricingType" name="pricingType" data-options="required:true" class="easyui-textbox"  label="定价分类：" ></div>
					<div><input id="txtWorkCenterNameC" name="siteCode"  class="easyui-textbox"  label="网点：" ></div>
					<input type="hidden" name="siteName" id="hidSiteName">
				</form>
			</div>
		</div>	
	</div>
	<div id="divRuleTypeBtn">
		<a href="#" class="easyui-linkbutton save" onclick="saveRuleType()">确定</a>
	</div>
	
	<div id="dlgSite" class="easyui-dialog" data-options="buttons:'#divSiteBtn'" style="width:420px;height:450px;" closed="true">
		<table id="tblSite" style="width:100%;" data-options="fit:true"></table>
	</div>
	<input type="hidden" id="hidSiteindex">
	<div id="divSiteBtn">
		<a href="#" class="easyui-linkbutton save" onclick="saveSite()">确定</a>
	</div>
	
	<div id="dlgHistory" class="easyui-dialog" style="width:865px;height:500px;" closed="true">
		<table id="tblHisPricingRuleType" style="width:100%;" data-options="fit:true"></table>
	</div>
</body>
</html>