<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
	<%@include file="../component/common.jsp"%>
	<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/pricingRule/pricingRule.js"></script>
	<title>定价规则管理</title>
</head>
<body>
	<div id="tlbPricingRule">
		<div class="easyui-accordion">
			<div class="search-form" >
				<form id="formCondition" style="float:left;margin:0 auto;">
					<div><input label="定价规则编号:" id="txtPricingRuleCode" labelWidth="100px" name="priceRuleCode" class="easyui-textbox" labelPosition="left" data-options="prompt:'请输入规则编号'"></div>
					<div><input label="分拨中心:" id="cmbgdFindOrgCode" style="width:150px" name="orgCode" class="easyui-textbox" labelPosition="left" data-options="prompt:'请选择机构'"></div>
					<div><input label="业务分类:" labelWidth="110px" id="cmbBusinessType" name="businessMode" class="easyui-textbox" labelPosition="left" data-options=""></div>
					<div><input label="组合来源:" id="cmbCombineType" name="combineType" class="easyui-textbox" labelPosition="left" data-options=""></div>
					<div><input label="创建时间起:" labelWidth="100px" id="dtStartTime" name="startTime" class="easyui-datebox" labelPosition="left" data-options="editable:false"></div>
					<div><input label="创建时间止:" labelWidth="100px" id="dtEndTime" name="endTime" class="easyui-datebox" labelPosition="left" data-options="editable:false"></div>
					<div><input label="需求类型:" id="cmbDemandType" name="demandType" class="easyui-textbox" labelPosition="left" data-options=""></div>
					<div><input label="定价分类规则号:" labelWidth="110px" id="txtRuleTypeCode" style="width:150px" name="ruleTypeCode" class="easyui-textbox" labelPosition="left" ></div>
					<div><input label="状态:" id="cmbStatus" name="status" class="easyui-textbox" labelPosition="left" data-options=""></div>
					<div><input label="通用定价规则:" labelWidth="100px" id="cmbGeneralFlag" name="generalFlag" class="easyui-textbox" labelPosition="left" data-options=""></div>
					<div class="">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findPricingRule()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetPricingRule()">重置</a>
			    	</div>
				</form>
			</div>
		</div>
		<!-- 按钮 -->
		<div class="toolbar-margin">
			<a href="#" onclick="auditPricingRule()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-shenpi',plain:true">审核</a>
			<!-- <a href="#" onclick="openEditPricingRule()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-edit',plain:true">编辑</a>
			<a href="#" onclick="upgrade()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-export',plain:true">版本升级</a>
			<a href="#" onclick="showHistory()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-see-details',plain:true">显示历史版本</a>
			<a href="#" onclick="setGeneral()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-set',plain:true">设为通用规则</a> -->
		</div>
		<!-- 按钮权限 -->
		<!-- <div class="toolbar-margin">
				<shiro:hasPermission name="iaconf_add">
					<a href="#" onclick="openAddIAConf()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">新增</a>
				</shiro:hasPermission>
				<shiro:hasPermission name="iaconf_edit">
					<a href="#" onclick="openEditIAConf()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-edit',plain:true">编辑</a>
				</shiro:hasPermission>
				<shiro:hasPermission name="iaconf_export">
					<a href="#" onclick="exportIAConf()" class="easyui-linkbutton fr" data-options="iconCls:'iconfont uce-export',plain:true" style="float:right;">导出</a>
				</shiro:hasPermission>
		</div> -->
	</div>
	<table id="dgPricingRule" style="width:100%;" data-options="fit:true"></table>
	
	
	<div id="dlgPricingRule" class="easyui-dialog" data-options="buttons:'#divPricingRuleBtn'"  style="width:900px;height:600px;" closed="true">
		<div id="tlbDetial">
			<div class="easyui-accordion">			
				<div class="search-form">
					<form id="formPricingRule" style="float:left; margin: 20px auto;" action="#" method="post">
						<input id='id' type="hidden" name="id" />
			    		<input id='version' type="hidden" name="version" />
			    		<input id="txtPriceRuleDetail" type="hidden" name="priceRuleDetail">
						<div><input id="txtPriceRuleCode" name="priceRuleCode"  class="easyui-textbox" labelWidth="120px" label="定价规则号：" data-options="readonly:true"></div>
						<div><input id="txtCombineCode" name="combineCode"  class="easyui-textbox" labelWidth="120px" label="组合编号：" data-options="readonly:true"></div>
						<div><input id="txtOrgCode" name="orgName"  class="easyui-textbox" labelWidth="120px" label="分拨中心：" data-options="readonly:true"></div>
						<div><input id="txtBusinessMode" name="businessMode"  class="easyui-textbox" labelWidth="120px" label="业务分类：" data-options="readonly:true"></div>
						<div><input id="txtCombineType" name="combineType"  class="easyui-textbox" labelWidth="120px" label="组合来源：" data-options="readonly:true"></div>
						<div><input id="numPriceTypeNum" name="priceTypeNum"  class="easyui-numberbox" labelWidth="120px" label="定价分类数量：" data-options="readonly:true"></div>
						<div><input id="txtDemandType" name="demandType"  class="easyui-textbox" labelWidth="120px" label="需求类型：" data-options="readonly:true"></div>
						<div><input id="txtRuleTypeCode" name="ruleTypeCode"  class="easyui-textbox" labelWidth="120px" label="定价分类规则号：" data-options="readonly:true"></div>
					</form>
				</div>
			</div>
			<!-- <div id="tblDetialToolBar" class="toolbar-margin">
				<a href="#" onclick="openEditDetail()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-edit',plain:true">编辑</a>
			</div> -->
		</div>
		<table id="tblPriceRuleDetail"  class="easyui-datagrid" data-options="fit:true,singleSelect:true">
			<thead>
				<th data-options="field:'id',checkbox:true">id</th>
				<th data-options="field:'priceType',formatter:formatCarType ,align:'center',width:130">定价分类</th>
				<th data-options="field:'unitFixedCost',formatter : format2Precision,width:120,align:'center',editor:{type:'numberbox',options:{precision:2,required:true}}">单位固定成本</th>
				<th data-options="field:'unitChangeCost',formatter : format2Precision,width:120,align:'center',editor:{type:'numberbox',options:{precision:2,required:true}}">单位变动成本</th>
				<th data-options="field:'relatedSiteNum',align:'center',formatter:formatSiteNum,width:80">关联网点数量</th>
				<th data-options="field:'updateTime',align:'center',width:150,formatter:formatTime">修改时间</th>
				<th data-options="field:'updateEmp',align:'center',width:130">修改人</th>
			</thead>
		</table>
	</div>
	<div id="divPricingRuleBtn">
		<a href="#" class="easyui-linkbutton save" onclick="savePricingRule()">保存</a>
		<a href="#" class="easyui-linkbutton cancel" onclick="closePricingRule()">关闭</a>
	</div>
	
	<!-- <div id="dlgPricingRuleDetail" class="easyui-dialog" data-options="buttons:'#divPricingRuleBtn'"  style="width:600px;height:300px;" closed="true">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formPricingRuleDetail" style="float:left; margin: 20px auto;" action="#" method="post">
					<input type="hidden" name="id" />
		    		<input type="hidden" name="version" />
					<div><input id="txtPriceType" name="priceType"  class="easyui-textbox" labelWidth="120px" label="定价分类：" data-options="readonly:true"></div>
					<div><input id="txtRelatedSiteNum" name="relatedSiteNum"  class="easyui-textbox" labelWidth="120px" label="关联网点数：" data-options="readonly:true"></div>
					<div><input id="txtUnitFixedCost" name="unitFixedCost"  class="easyui-numberbox" labelWidth="120px" label="单位固定成本：" data-options="min:0,precision:2,required:true"></div>
					<div><input id="txtUnitChangeCost" name="unitChangeCost"  class="easyui-numberbox" labelWidth="120px" label="单位变动成本：" data-options="min:0,precision:2,required:true"></div>
					<div><input id="txtUpdateTime" name="updateTime"  class="easyui-datetimebox" labelWidth="120px" label="修改时间：" data-options="readonly:true"></div>
					<div><input id="txtUpdateEmp" name="updateEmp"  class="easyui-textbox" labelWidth="120px" label="修改人：" data-options="readonly:true"></div>
				</form>	
			</div>
		</div>
	</div> -->
	
	<div id="dlgViewSite" class="easyui-dialog" data-options=""  style="width:700px;height:450px;" closed="true">
		<div id="tlbSite">
			<div class="easyui-layout"  data-options="fit:true" >
				<div id="tlbSearchClassLine" class="search-form datagrid-toolbar"  style="padding:5px;height:auto">
					<form id="formViewSite">
					 	<input type="hidden" name="priceType" />
			    		<input type="hidden" name="priceRuleCode" />
			    		<input type="hidden" name="detailId" />
						<div><input id="txtViewOrgCode" name="orgCode"  class="easyui-textbox" label="网点查询：" data-options=""></div>
						<div><input id="txtViewPriceType" name="priceType"  class="easyui-textbox" label="定价分类：" data-options="readonly:true"></div>
						<div class="">
							<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findRelatedSite()">查询</a>
				    	</div>
			    	</form>
	   			</div>
			</div>
		</div>
		<table id="dgSite" style="width:100%;" data-options="fit:true"></table>
	</div>
	
	
	<div id="dlgShowHistory" class="easyui-dialog" data-options="closed:true" style="width: 900px; height: 400px;">
   		<table id="dgHistoryPricingRule" style="width:100%;" data-options="fit:true"></table>
    </div>
    
    <div id="dlgHPricingRule" class="easyui-dialog" data-options=""  style="width:900px;height:600px;" closed="true">
		<div id="tlbHDetial">
			<div class="easyui-accordion">			
				<div class="search-form">
					<form id="formHPricingRule" style="float:left; margin: 20px auto;" action="#" method="post">
						<input type="hidden" name="id" />
						<div><input name="priceRuleCode"  class="easyui-textbox" labelWidth="120px" label="定价规则号：" data-options="readonly:true"></div>
						<div><input name="combineCode"  class="easyui-textbox" labelWidth="120px" label="组合编号：" data-options="readonly:true"></div>
						<div><input name="orgName"  class="easyui-textbox" labelWidth="120px" label="分拨中心：" data-options="readonly:true"></div>
						<div><input id="txtHBusinessMode" name="businessMode"  class="easyui-textbox" labelWidth="120px" label="业务分类：" data-options="readonly:true"></div>
						<div><input id="txtHCombineType" name="combineType"  class="easyui-textbox" labelWidth="120px" label="组合来源：" data-options="readonly:true"></div>
						<div><input name="priceTypeNum"  class="easyui-numberbox" labelWidth="120px" label="定价分类数量：" data-options="readonly:true"></div>
						<div><input id="txtHDemandType" name="demandType"  class="easyui-textbox" labelWidth="120px" label="需求类型：" data-options="readonly:true"></div>
						<div><input name="ruleTypeCode"  class="easyui-textbox" labelWidth="120px" label="定价分类规则号：" data-options="readonly:true"></div>
					</form>
				</div>
			</div>
			<!-- <div id="tblDetialToolBar" class="toolbar-margin">
				<a href="#" onclick="openEditDetail()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-edit',plain:true">编辑</a>
			</div> -->
		</div>
		<table id="tblHPriceRuleDetail"  class="easyui-datagrid" data-options="fit:true,singleSelect:true">
			<thead>
				<th data-options="field:'id',checkbox:true">id</th>
				<th data-options="field:'priceType',formatter:formatCarType ,align:'center',width:130">定价分类</th>
				<th data-options="field:'unitFixedCost',formatter : format2Precision,width:120,align:'center'">单位固定成本</th>
				<th data-options="field:'unitChangeCost',formatter : format2Precision,width:120,align:'center'">单位变动成本</th>
				<th data-options="field:'relatedSiteNum',align:'center',formatter:formatHSiteNum,width:80">关联网点数量</th>
				<th data-options="field:'updateTime',align:'center',width:150,formatter:formatTime">修改时间</th>
				<th data-options="field:'updateEmp',align:'center',width:130">修改人</th>
			</thead>
		</table>
	</div>
</body>
</html>