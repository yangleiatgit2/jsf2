<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>临时货运需求</title>
<%@include file="../component/common.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/freightDemand/freightDemand.js"></script>
<script>
	var cmsOrgType = "${sessionScope.CURRENT_USER.cmsOrgType}";
</script>
<style type="text/css">
	.table-a table{
		border:1px solid #CCCCCC;
	}
	.tdheader{
		font-size:12px;
		font-weight:bold;
		text-align: center;
		background-color:#F2F2F2;
		border:1px solid #CCCCCC;
	}
	.dialog-button {
		border:1px solid #CCCCCC;
		background: none;
		padding: 5px 30px;
	} 
</style>
</head> 
<body>
	<!-- begin pageview -->
	<div id="tlbFreightDemand">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formFindFreightDemand" action="#" style="float:left;margin:0 auto;" method="post">
					<input id="hideDemandType"  name="demandType"  value="2" type="hidden" />
					<input id="hideExecuteBeginTime"  name="executeBeginTime" type="hidden" />
					<input id="hideExecuteEndTime"  name="executeEndTime" type="hidden" />
					<div><input id="findDemandSiteCode" name="demandSiteCode"  class="easyui-textbox" label="需求网点: " labelWidth="90" data-options="prompt:'请输入需求网点' "></div>	
					<div><input id="findBeginStationCode" name="beginStationCode" class="easyui-textbox" label="出发点: " labelWidth="90"  data-options="prompt:'请选择出发点'"></div>			
					<div><input id="findEndStationCode" name="endStationCode" class="easyui-textbox" label="到达点: " labelWidth="90"   data-options="prompt:'请选择到达点'"></div>					
					<!-- <div>
						<input id="findExecuteBeginTime" class="easyui-datebox" label="执行时间: "data-options="editable:false">&nbsp至&nbsp					
						<input id="findExecuteEndTime" class="easyui-datebox" data-options="editable:false">
					</div> -->
					<div><input id="findDemandStatus" name="demandStatus" class="easyui-textbox" label="需求状态: " labelWidth="90"  ></div>
					<!-- <div class="query-reset"> -->
					<div style="float:right">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findFreightDemand()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetFormFindFreightDemand()">重置</a>
			    	</div>
				</form>
			</div>
		</div>
		<!-- begin table tool -->
		<div class="toolbar-margin">
	 		<shiro:hasPermission name="stFreight_demand_add">
				<a href="#" onclick="openAddFreightDemand()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">新增</a>
	 		</shiro:hasPermission>
		 <%-- <shiro:hasPermission name="stFreight_demand_edit">
				<a href="#" onclick="openUpdateFreightDemand()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-edit',plain:true">编辑</a>
	 		</shiro:hasPermission> --%>
		 	<shiro:hasPermission name="stFreight_demand_site_check">
				<a href="#" onclick="siteCheckFreightDemand()" class="easyui-linkbutton" iconCls="iconfont uce-shen"  data-options="plain:true">发送网点审核</a>
		 	</shiro:hasPermission>
			<shiro:hasPermission name="stFreight_demand_check_quote">
				<a href="#" onclick="approveFreightDemand()" class="easyui-linkbutton" iconCls="iconfont uce-baojia"  data-options="plain:true">核准报价</a>
			</shiro:hasPermission>
		 	<shiro:hasPermission name="stFreight_demand_lock_demand">
				<a href="#" onclick="lockFreightDemand()" class="easyui-linkbutton" iconCls="iconfont uce-password"  data-options="plain:true">锁定需求</a>
		 	</shiro:hasPermission>
		</div>
		<!-- end table tool -->			
	</div>
	<!-- begin table -->
	<table id="tblFreightDemand" style="width:100%;" data-options="fit:true"></table>
	<!-- end table -->
	<!-- end pageview -->
	<!-------------------------------------------------- 编辑页面处理 ------------------------------------------------------------------------------>
	<!-- begin dialog -->
	<div id="dlgFreightDemand" class="easyui-dialog" data-options="buttons:'#divFreightDemandBtn'"  style="width:885px" closed="true" >
		<div class="easyui-accordion"  style="height:100%">			
			<div class="search-form datagrid-toolbar" style="height:100%" >
				<form id="formFreightDemand" style="float:left; margin: 10px auto;" action="#" method="post">
					<input id="id"name='id' type="hidden" />
					<input id="version" name='version' type="hidden" />
					<input id="hidBeginStationName" name="beginStation" type="hidden" />
					<input id="hidEndStationName" name="endStation" type="hidden" />
					<input id="hidDemandSite" name="demandSite" type="hidden" />
					<input id="carpoolSites" name="carpoolSites" type="hidden" />
					<input id="departureTime" name="departureTime" type="hidden" />
					<input id="arrivalTime" name="arrivalTime" type="hidden" />
					<input id="actualDepartureTime"  name="actualDepartureTime"  type="hidden" />
					<input id="actualArrivalTime" name="actualArrivalTime" type="hidden" />
					<div><input id="demandCode" name="demandCode"  class="easyui-textbox"  label="需求编号: " readonly="true"   labelWidth="115px"  data-options="prompt:'需求编码自动生成'"  /></div>
					<div><input id="demandName" name="demandName"  class="easyui-textbox"  label="需求名称: " readonly="true" labelWidth="115px"  data-options="prompt:'需求名称自动生成'"  /></div>
					<div><input id="isCarpool" name="isCarpool"  class="easyui-textbox"  label="是否拼车: "  required="true"   labelWidth="115px"  /></div>
					<div><input id="demandType" name="demandType"  class="easyui-textbox"  label="需求类型: "   required="true"  readonly="true"  labelWidth="115px"   /></div>
					<div><input id="demandSiteCode" name="demandSiteCode"  class="easyui-textbox"  label="需求网点: "  required="true"  labelWidth="115px" /></div>
					<div><input id="demandStatus" name="demandStatus"  class="easyui-textbox"  label="需求状态: "  required="true"  readonly="true" labelWidth="115px" /></div>
					<div><input id="cmbgdBeginStationCode" name="beginStationCode"  class="easyui-textbox"  label="出发点: "  required="true"   labelWidth="115px" data-options="prompt:'请选择出发点'" /></div>
					<div><input id="cmbgdEndStationCode" name="endStationCode"   class="easyui-textbox"  label="到达点: "  required="true"   labelWidth="115px" data-options="prompt:'请选择到达点'" /></div>
					<div><input id="carpoolSitesCodes" name="carpoolSitesCodes"   class="easyui-textbox"  label="关联网点: "  labelWidth="115px"  data-options="prompt:'请选择关联网点'" /></div>
					<div><input id="departureTimeEdit"  class="easyui-timespinner" label="出发时间: " labelWidth="115px"   required="true"  showSeconds=true  data-options="editable:false"/></div>
					<div><input id="arrivalTimeEdit" class="easyui-timespinner" label="到达时间: " labelWidth="115px"  required="true"  showSeconds=true data-options="editable:false" /></div>
					<div><input id="layTime" name="layTime" class="easyui-numberbox"  label="装卸货时间(分): "   required="true"  labelWidth="115px" data-options="max:1440,min:1"  data-options="prompt:'请输入装卸货时间'"></div>
					<div><input id="price" name="price" class="easyui-numberbox" label="价格: "   data-options="min:0,max:100000,precision:2"  required="true"  labelWidth="115px" /></div>
					<div><input id="stdemandBeginTime" name="demandBeginTime"   class="easyui-datebox" label="需求开始时间: "    required="true"  labelWidth="115px" editable="false" /></div>
					<div><input id="stdemandEndTime" name="demandEndTime"  class="easyui-datebox" label="需求结束时间: "  required="true"  readonly="true"  labelWidth="115px" editable="false" /></div>
					<div><input  id="businessMode"  name="businessMode"   class="easyui-textbox"  label="业务模型: "  required="true"  labelWidth="115px" /></div>
					<div><input  id="dayWeight"  name="dayWeight"   class="easyui-numberbox"  label="货量重量(t): "   required="true"  data-options="min:0,max:100000,precision:2"  labelWidth="115px" /></div>
					<div><input  id="dayVolume"  name="dayVolume"   class="easyui-numberbox"  label="货量体积(方): "  required="true"  data-options="min:0,max:100000,precision:2"  labelWidth="115px" /></div>
					<div class ="createDiv" style="margin-left:0">
						<div><input id="demandCombineCode" name="demandCombineCode"  class="easyui-textbox"  label="需求组合号: "  readonly="true" labelWidth="115px" /></div>
						<div><input id="lineGroupCode" name="lineGroupCode"  class="easyui-textbox"  label="班次编号: " readonly="true"  labelWidth="115px" /></div>
						<div><input id="executeBeginTime" name="executeBeginTime"   class="easyui-datetimebox" label="执行开始时间: " readonly="true"   labelWidth="115px" editable="false" /></div>
						<div><input id="executeEndTime" name="executeEndTime"  class="easyui-datetimebox" label="执行结束时间: " readonly="true"   labelWidth="115px" editable="false" /></div>
						<div><input id="actualDepartureTimeEdit" class="easyui-timespinner" label="实际出发时间: " labelWidth="115px" readonly="true"  showSeconds=true /></div>
						<div><input id="actualArrivalTimeEdit"  class="easyui-timespinner" label="实际到达时间: " labelWidth="115px" readonly="true"  showSeconds=true /></div>
						<div><input id="adjustPrice" name="adjustPrice" class="easyui-numberbox" label="调整后价格: " labelWidth="115px"  readonly="true"   data-options="min:0,max:100000,precision:2" /></div>
						<div><input  id="createEmp"  name="createEmp"   class="easyui-textbox"  label="创建人: " readonly="true"  labelWidth="115px" /></div>
						<div><input  id="createTime" name="createTime" class="easyui-datetimebox"  label="创建时间: "  readonly="true"  labelWidth="115px" /></div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div id="divFreightDemandBtn">
		<div  id="btnSaveFreightDemand" style="display:inline;"><a href="#" class="easyui-linkbutton save" onclick="saveFreightDemand()">保存</a></div>
		<div style="display:inline;"><a href="#" class="easyui-linkbutton cancel" onclick="closeFreightDemand()">关闭</a></div>
	</div>
	<!-- end dialog -->

</body>
</html>