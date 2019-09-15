<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>运输异常管理</title>
<%@include file="../component/common.jsp"%>

<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/exceptionManager/exceptionManager.js"></script>
<script>
	var cmsOrgType = "${sessionScope.CURRENT_USER.cmsOrgType}";
</script>
<style type="text/css">
 .search-form-summary div {
    float: left;
    margin: 5px 10px;
    height: 64px;
    line-height: 100%;
	}
	.icon-up{
		background:url('${pageContext.request.contextPath}/icons/up.png') no-repeat center center;
    	background-size: 100%;
	}
	.icon-down{
			background:url('${pageContext.request.contextPath}/icons/down.png') no-repeat center center;
	    	background-size: 100%;
	}
	div.datagrid-cell.datagrid-cell-c2-id{
			width:221px;
			height:23px;
	}
	iconfont{
	floag:left;
	}
</style>
</head> 
<body>
	<!-- begin pageview -->
	<div id="toolbarException">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formFindException" action="#" style="float:left;margin:0 auto;" method="post">
					<div><input id="findExceptionCode" name="exceptionCode" class="easyui-textbox" label="异常编号: "  data-options="prompt:'异常编号'"></div>			
					<div><input id="findStartTrunkCode" name="startTrunkCode" class="easyui-textbox" label="发车计划号: "  data-options="prompt:'发车计划号'"></div>	
									
					<div><input id="findExceptionStatus" name="exceptionStatus" class="easyui-textbox" label="异常状态: " ></div>
					<div>
						<input id="findCreateTime" name="createTime" class="easyui-datebox" label="异常上报时间: " labelwidth="95" data-options="editable:false">&nbsp至&nbsp					
						<input id="findUpdateTime" name="updateTime" class="easyui-datebox" data-options="editable:false">
					</div>
					<div class="fr">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findExceptiont()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetExceptiont()">重置</a>
			    	</div>
				</form>
			</div>
		</div>
	<!-- 	<div style="height:30px">
		
		</div> -->
	 <!--  
		<div class="toolbar-margin">
		    <shiro:hasPermission name="openExceptionDetail">
				<a href="javascript:void(0)" onclick="openExceptionDetail()"  class="easyui-linkbutton"  data-options="iconCls:'iconfont uce-ck-details',plain:true" data-options="plain:true">异常详情</a>
			</shiro:hasPermission> 
			 <shiro:hasPermission name="confirmException">
				<a href="javascript:void(0)"  id=confirmException onclick="confirmException()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-success-circle',plain:true">异常确认</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="repulseException">
				<a href="javascript:void(0)"  id="repulseException" onclick="repulseException()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-update',plain:true">异常打回</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="openDlgExceptionSummary">
				<a href="javascript:void(0)" id="openxceptionSummary" onclick="openDlgExceptionSummary()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-basedata',plain:true">异常小结</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="reBindDrivePlan">
				<a href="javascript:void(0)" id="reBindDrivePlan" onclick="reBindDrivePlan()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-bind',plain:true">重绑发车计划</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="stopDrivePlan">
				<a href="javascript:void(0)" id="stopDrivePlan" onclick="stopDrivePlan()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-stop',plain:true">终止发车计划</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="stopLineGroup">
				<a href="javascript:void(0)" id="stopLineGroup" onclick="stopLineGroup()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-stop',plain:true">终止班次</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="newLineGroup">
				<a href="javascript:void(0)" id="newLineGroup" onclick="newLineGroup()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">新增发车计划</a>
			</shiro:hasPermission> 
		</div>
		-->
	</div>
	<!-- begin table -->
	<table id="tblException" class="easyui-datagrid" data-options="fit:true"></table>
	<!-- end table -->
	<!-- end pageview -->
	<!-------------------------------------------------- 编辑页面处理 ------------------------------------------------------------------------------>
	<!-- begin dialog -->
				
	<div id="dlgExceptionManager" class="easyui-dialog"  data-options="buttons:'#divExceptionManagerBtn'" style="width:885px; height:450px" closed="true" >
		<div class="easyui-accordion"  style="height:100%">			
			<div class="search-form datagrid-toolbar" style="height:100%" >
				<form id="formExceptionManager" style="float:left; margin: 5px auto;" action="#" method="post">
					<input id="id" name='id' type="hidden" />
					<input id="version" name='version' type="hidden" />
		
					<div><input id="formExceptionCode" name="exceptionCode"  class="easyui-textbox"  label="异常编号: "   readonly="true" labelWidth="95px"  data-options="prompt:'异常编号'"  /></div>
					<div><input id="formExceptionStatus" name="exceptionStatus"  class="easyui-textbox"  label="异常状态: " readonly="true" labelWidth="95px"  /></div>
					<div><input id="formCreateTime" name="createTime"  class="easyui-datetimebox"  label="异常提报时间:"  readonly="true" labelWidth="95px"  /></div>
					<div><input id="formAppSrage" name="appSrage"  class="easyui-textbox"  label="应用平台: "  readonly="true" labelWidth="95px"   /></div>
					<div><input id="createEmp" name="createEmp"  class="easyui-textbox"  label="上报人: " labelWidth="95px" readonly="true"/></div>
					<div><input id="lng" name="utf2"  class="easyui-textbox"  label="异常位置信息: "  labelWidth="95px" readonly="true"/></div>
					
					<div><input id="excepType" name="excepType"  class="easyui-textbox"  label="异常类型: "  labelWidth="95px" data-options="prompt:'请选择异常类型'" readonly="true"/></div>
					<div><input id="excepSitesCode" name="excepSitesCode"   class="easyui-textbox"  label="关联网点: "  labelWidth="95px"  data-options="prompt:'请选择关联网点'" readonly="true"/></div>
					<div><input id="blowVolume"  name="blowVolume" class="easyui-textbox" label="爆仓方数: " labelWidth="95px"  readonly="true"/></div>
					<div><input id="updateEmp" name="updateEmp" class="easyui-textbox" label="异常处理人: " labelWidth="95px"  readonly="true"/></div>
					<div><input id="formUpdateTime" name="formUpdateTime" class="easyui-datetimebox"  label="处理完成时间: " labelWidth="95px" readonly="true"></div>
					<div><input id="formStartTrunkCode" name="startTrunkCode" class="easyui-textbox" label="发车计划号: "  precision="2" labelWidth="95px" readonly="true"/></div>
					<div><input id="reason" name="reason"   class="easyui-textbox" data-options="multiline:true"  label="异常信息: "   labelWidth="95px" style="width:550px;height:100px" readonly="true"/></div>
					<div><input id="utf5" name="utf5"  class="easyui-textbox" data-options="multiline:true"  label="异常处理意见: "   labelWidth="95px" style="width:550px;height:100px" readonly="true"/></div>
				</form>
			</div>
		</div>
	</div>
	<!-- end dialog -->
	<div id="divExceptionManagerBtn">
		<a href="#" class="easyui-linkbutton cancel" onclick="$('#dlgExceptionManager').window('close')">关闭</a>
	</div>
	
		<!-------------------------------------------------- 编辑异常小结处理 ------------------------------------------------------------------------------>
	<!-- begin dialog -->
	<div id="dlgExceptionSummary" class="easyui-dialog" data-options="buttons:'#divExceptionSummary'"  style="width:765px;height:240px;" closed="true">
		<div class="easyui-accordion">			
			<div class="search-form-summary" style="">
				<form id="formExceptionSummary" style="float:middle; margin: 15px auto;" action="#" method="post">
					<input id="summaryId" name='id' type="hidden">
					<input name='version' type="hidden">
					<div><input id="utf1" name="utf1"  class="easyui-textbox" data-options="multiline:true"  label="异常小结 "   labelWidth="95px" editable="true"  style="width:550px;height:60px"/></div>
				
				</form>
			</div>
			<div>
			</div>
		</div>
	</div>
	<!-- end dialog -->
	<div id="divExceptionSummary">
		<a href="#" class="easyui-linkbutton save" onclick="saveExceptionSummary()">保存</a>
		<a href="#" class="easyui-linkbutton cancel" onclick="$('#dlgExceptionSummary').window('close')">关闭</a>
	</div>
	
		<!-------------------------------------------------- 新增班次页面 ------------------------------------------------------------------------------>
	<div id="dlgFreightOrderCombine" class="easyui-dialog" data-options="buttons:'#divLineClassBtn'"  style="width:90%;height:90%" closed="true">
<!-- 	<div id="dlgNoFineTuning" class="easyui-dialog"  data-options="buttons:'#divNoFineTuning'" style="width:800px;height:450px;" closed="true"> -->
		<div id="tlbDetial">
			<div class="easyui-accordion">			
				<div class="search-form">
					<form id="formLineClass" style="float:left; margin: 5px auto;" action="#" method="post">
						<div><input id="lineGroupCode" name="lineGroupCode"   class="easyui-textbox"  label="班次编号：" labelwidth="110"   readonly="true"></div>
						<div><input id="lineGroupName" name="lineGroupName"    class="easyui-textbox"  label="班次名称"  labelwidth="110"   readonly="true"></div>
						<div><input id="departTime" name="departTime"   class="easyui-datetimebox" label="发车时间" labelwidth="110" data-options="required:true"></div>
						<div><input id="arrivalTime" name="arrivalTime"  class="easyui-datetimebox"  label="到达时间" labelwidth="110" data-options="required:true"></div>
						<div><input id="totalTime" name="totalTime"  class="easyui-numberbox"  label="运行时间"   labelwidth="110"   readonly="true"></div>
						<!-- <div><input id="findCarType" name="carType"  class="easyui-textbox"  label="车型"   labelwidth="110"   data-options="required:true,validType:'comboxRequired[\'-- 请选择 --\']'" required="true"></div> -->
						<div><input id="findCarType" name="carType"  class="easyui-textbox"  label="车型"   labelwidth="110"  readonly="true"></div>
						<div><input id="lineGroupDistance" name="lineGroupDistance"   class="easyui-numberbox"  label="路线距离"   labelwidth="110"  disabled="disabled"></div>
						<div><input id="findStartOrgName" name="startOrgName"   class="easyui-textbox"  label="始发站"  labelwidth="110"  disabled="disabled"></div> 
						<div><input id="findEndOrgName" name="endOrgName"   class="easyui-textbox" label="目的站"   labelwidth="110"  disabled="disabled"></div>
						<div><input id="findDemandType" name="requiType"   class="easyui-textbox" label="需求类型"  labelwidth="110" readonly="true"></div>
						<div><input id="costPrice" name="costPrice"  class="easyui-numberbox" label="成本价"  labelwidth="110"  disabled="disabled" ></div>
						<div><input id="sellingPrice" name="sellingPrice"  class="easyui-numberbox"  label="报价"   labelwidth="110"  disabled="disabled" ></div>
						<div><input id="totalTime2" name="totalTime2"   class="easyui-numberbox"  label="班次总耗时" labelwidth="110"  disabled="disabled"></div>
						<div><input id="totalVolume" name="totalVolume"    class="easyui-numberbox"  label="班次货物总体积"  labelwidth="110"  disabled="disabled" ></div>
						<div><input id="totalWeight" name="totalWeight"  class="easyui-numberbox" label="班次货物总质量"  labelwidth="110"  disabled="disabled"></div>
						<div><input id="chargeStarttime" name="chargeStarttime"   class="easyui-datetimebox" label="计费时间起" labelwidth="110" readonly="true"></div>
						<div><input id="chargeEndTime" name="chargeEndTime"  class="easyui-datetimebox"  label="计费时间止" labelwidth="110" readonly="true"></div>
						
						<div><input id="adjustPrice" name="adjustPrice"  class="easyui-numberbox"  label="调整后价格"   labelwidth="110"   disabled="disabled"></div>
						<div><input id="requiCombinCode" name="requiCombinCode"   class="easyui-textbox"  label="需求组合号"   labelwidth="110"  disabled="disabled"></div>
						<div><input id="orderCombinCode" name="orderCombinCode"   class="easyui-textbox"  label="订单组合号"  labelwidth="110"  disabled="disabled"></div>
						<div><input id="drivingPlanCombinCode" name="drivingPlanCombinCode"   class="easyui-textbox" label="发车计划号"  disabled="disabled"  labelwidth="110"></div>
						<div><input id="findAdjustType" name="adjustType"   class="easyui-textbox" label="调整类型"  labelwidth="110" readonly="true"></div>
						<div><input id="resource"  name="resource"  class="easyui-textbox" label="班次来源"  labelwidth="110" readonly="true"></div>
						<div><input id="findBusinessMode" name="businessMode"   class="easyui-textbox" label="业务分类"  labelwidth="110"  readonly="true"></div>
						<div><input id="loadFactor" name="loadFactor"  class="easyui-textbox"  label="满载率"   labelwidth="110"  disabled="disabled"></div>
						<div><input id="findShfitType" name="lineGroupType"   class="easyui-textbox" label="班次类型"  labelwidth="110" readonly="true"></div>
						<div><input id="remark" name="remark"  class="easyui-textbox" data-options="multiline:true,required:true,validType:'length[1,20]'"  label="备注" labelWidth="95px" required="true" style="width:550px;height:300px" /></div>
					
					</form>
				</div>
			</div>
			<div id="tblDetialToolBar" class="toolbar-margin">
				<a href="#" onclick="openAddLineGroupDetail($('#lineGroupCode').val())"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">新增</a>
				<a href="#" onclick="deleteDemand()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-delete',plain:true">删除</a>
			</div> 
		</div>
		<table id="tblFreightOrderCombineDetail" style="width:100%;" data-options="fit:true"></table>
		<!-- <div id="dlgNoFineTuning" class="easyui-dialog"  data-options="buttons:'#divNoFineTuning'" style="width:800px;height:450px;" closed="true">
		<table id="tbNoFineTuning" style="width:100%;"></table> -->
	</div>
	</div>
	<div id="divLineClassBtn">
		<a href="#" class="easyui-linkbutton save" onclick= "generateDeparturePlan()">下一步</a>
		<a href="#" class="easyui-linkbutton cancel" onclick= "javascript:$('#dlgFreightOrderCombine').window('close')">取消</a>
	</div>
	
	<div id="dlgDemand" class="easyui-dialog"  data-options="buttons:'#divDemandBtn'" style="width:880px;height:500px;" closed="true">
		<div id="tlbDemand">
		<!-- 	<div class="easyui-accordion">
				<div class="search-form">
					<form id="formFindDemand" style="float:left; margin: 10px auto;" action="#" method="post">
						<input id="combineQueryFlag"  name="combineQueryFlag"  type="hidden" />
						<input id="fdDemandCombineType"  name="demandType" type="hidden" />
						<input id="hidCreateBeginTime"  name="createBeginTime" type="hidden" />
						<input id="hidCreateEndTime"  name="createEndTime" type="hidden" />
						<div><input id="findDemandSiteCode" name="demandSiteCode" class="easyui-textbox" label="需求网点: " data-options="prompt:'请输入需求网点' "></div>	
						<div><input id="findBeginStationCode" name="beginStationCode" class="easyui-textbox" label="出发点: "   data-options="prompt:'请选择出发点'"></div>
						<div>
							<input id="fdDemandCombineCode" name="demandCombineCode" class="easyui-textbox" label="需求组合号: " labelwidth="95" data-options="prompt:'请输入需求组合号',validType:['length[1,32]','demandCombineCode']">
						</div>			
						<div><input id="findEndStationCode" name="endStationCode" class="easyui-textbox" label="到达点: " data-options="prompt:'请选择到达点'"></div>	
						<div>
							<input id="fdCreateBeginTime" class="easyui-datebox" label="创建时间: " data-options="editable:false">&nbsp至&nbsp					
							<input id="fdCreateEndTime" class="easyui-datebox" data-options="editable:false">
						</div>
						<div class="query-reset">
						<div style="float:right">
							<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findDemand()">查询</a>
							<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetFormFindDemand()">重置</a>
				    	</div>
			    	</form>
		    	</div>
			</div> -->
			<div id="divAddDemandBtn">
				<a href="#" onclick="addDemand()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">增加到班次</a>
			</div>
		</div>
		<table id="tblDemand" style="width:100%;" data-options="fit:true"></table>
	</div>
	
	<div id="divDemandBtn">
		<a href="#" class="easyui-linkbutton cancel" onclick="javascript:$('#dlgDemand').window('close')">关闭</a>
	</div>
	
	<div id="departurePlan" class="easyui-dialog" data-options="buttons:'#deparTurePlanSave'"   style="width:760px;height:2	00px;" resizeble=false  closed="true">	
					<div class="easyui-accordion ">			
			<div class="search-form datagrid-toolbar">
				<form id="planFrom" style="float:left; margin: 20px auto;" method="#">
					<div><input id="driverPhone" name="driverPhone" class="easyui-combobox"  label="司机"   style="width:300px;" required="true" labelWidth="130px" >
					   </input>
					</div>
					<div><input id="plateNumber" name="plateNumber" class="easyui-combobox"  label="车辆" style="width:300px;" required="true" labelWidth="130px" ></div>
				</form>
			</div>
	<div id="deparTurePlanSave">	
		<a href="#" class="easyui-linkbutton save" onclick="savedeparTurePlan()">保存</a>
		<a href="#" class="easyui-linkbutton cancel" onclick="$('#departurePlan').window('close')">取消</a>
	</div>
		</div>
  </div>
</body>
</html>