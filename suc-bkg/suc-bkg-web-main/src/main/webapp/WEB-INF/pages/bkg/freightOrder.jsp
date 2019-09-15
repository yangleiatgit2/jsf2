<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>订单管理</title>
<%@include file="../component/common.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/freightOrder/freightOrder.js"></script>
<script>
	var cmsOrgType = decodeURI("${sessionScope.CURRENT_USER.cmsOrgType}");
	var empName = decodeURI("${sessionScope.CURRENT_USER.empName}");
</script>
<style type="text/css">
	.table-a table{
		border-collapse:collapse;
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
	<div id="tlbFreightOrder">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formFreightOrder" action="#" style="float:left;margin:0 auto;" method="post">
				<input id="autoselect" name='autoselect' type="hidden" />
					<div><input id="demandSiteCode" name="demandSiteCode" class="easyui-textbox" label="需求网点: " labelwidth="100" data-options="prompt:'请输入需求网点',validType:['length[1,32]','demandSiteCode']"></div>	
					<div><input id="beginStationCode" name="beginStationCode" class="easyui-textbox" label="出发点: " labelwidth="100"  data-options="prompt:'请选择出发点'"></div>			
					<div><input id="endStationCode" name="endStationCode" class="easyui-textbox" label="到达点: " labelwidth="100"  data-options="prompt:'请选择到达点'"></div>					
					<div><input id="orderStatus" name="orderStatus" class="easyui-textbox" label="订单状态: " labelwidth="100" ></div>
					<div><input id="orderCodeStr" name="orderCodeStr" class="easyui-textbox" label="订单编号: " labelwidth="100" data-options="prompt:'请输入订单编号',validType:['length[1,32]','orderCode']"></div>	
					<!-- <div>
						<input id="orderStartTime" name="departureTime" class="easyui-datebox" label="执行时间起: " labelwidth="100" data-options="editable:false">&nbsp至&nbsp					
						<input id="orderEndTime" name="orderEndTime" class="easyui-datebox" data-options="editable:false">
					</div> -->
					<div>
						<input id="chargingBeginTime" name="chargingBeginTime" class="easyui-datebox" label="计费时间起: " labelwidth="100" data-options="editable:false">&nbsp至&nbsp					
						<input id="chargingEndTime" name="chargingEndTime" class="easyui-datebox" data-options="editable:false">
					</div>
					<div><input id="businessMode" name="businessMode" class="easyui-textbox" label="业务模式: " ></div>
					<!-- <div class="query-reset"> -->
					<div class="fr">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findFreightOrder()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetFreightOrder()">重置</a>
			    	</div>
				</form>
			</div>
		</div>
		<!-- begin table tool -->
		<div class="toolbar-margin">
			<shiro:hasPermission name="freight_order_add">
				<a href="javascript:void(0)" onclick="openAddFreightOrder()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">新增</a>
			</shiro:hasPermission>
		<%-- 	<shiro:hasPermission name="freight_order_edit">
				<a href="javascript:void(0)" onclick="openUpdateFreightOrder()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-edit',plain:true">编辑</a>
				 </shiro:hasPermission>
			<shiro:hasPermission name="freight_order_adjust_price">
				<a href="javascript:void(0)" onclick="adjustFreightOrderprice()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-shangyi',plain:true">价格调平</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="freight_order_stop">
				<a href="javascript:void(0)" onclick="orderstop()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-stop',plain:true">终止</a>
			</shiro:hasPermission> --%>
			<shiro:hasPermission name="freight_order_export">
				<a href="javascript:void(0)" onclick="exportFreightOrderprice()" class="easyui-linkbutton fr" data-options="iconCls:'iconfont uce-export',plain:true" style="float:right;">导出</a>
			</shiro:hasPermission>
		</div>
		<!-- end table tool -->			
	</div>
	<!-- begin table -->
	<table id="tblFreightOrder" style="width:100%;" data-options="fit:true"></table>
	<!-- end table -->
	<!-- end pageview -->
	<!-------------------------------------------------- 编辑页面处理 ------------------------------------------------------------------------------>
	<!-- begin dialog -->
	<div id="dlgFreightOrder" class="easyui-dialog" data-options="buttons:'#divFreightOrderdBtn'"  style="width:880px;height:500px" closed="true">
		<div class="easyui-accordion"  style="height:100%" >			
			<div class="search-form datagrid-toolbar">
				<form id="formDlgFreightOrder" style="float:left; margin: 5px auto;" action="#" method="post">
					<input id="id" name='id' type="hidden" />
					<input id="version" name='version' type="hidden" />
					<input id="actualDepartureTime"  name="actualDepartureTime"  type="hidden" />
					<input id="actualArrivalTime" name="actualArrivalTime" type="hidden" />
					<input id="carpoolSitesName" name="carpoolSitesName" type="hidden" />
					
					
					<div><input id="fmOrderCode" name="orderCode"  class="easyui-textbox"  label="订单编号: " readonly="true"   labelWidth="115px"  data-options="prompt:'需求编码自动生成'"  /></div>
					<div><input id="fmOrderName" name="orderName"  class="easyui-textbox"  label="订单名称: " readonly="true" labelWidth="115px"  data-options="prompt:'需求名称自动生成'"  /></div>
					<div><input id="fmIsCarpool" name="isCarpool"  class="easyui-textbox" required="true" label="是否拼车: "  labelWidth="115px"  /></div>
					<div><input id="fmDemandType" name="demandType"  class="easyui-textbox"   required="true" label="需求类型: " labelWidth="115px"   /></div>
					<div><input id="fmDemandSiteCode" name="demandSiteCode"  class="easyui-textbox" required="true"  label="需求网点: " labelWidth="115px" data-options="prompt:'请选择需求网点'" /></div>
					
					<div><input id="fmBeginStationCode" name="beginStationCode"  class="easyui-textbox"  required="true" label="出发点: "  labelWidth="115px" data-options="prompt:'请选择出发点'" /></div>
					<div><input id="fmEndStationCode" name="endStationCode"   class="easyui-textbox"  required="true" label="到达点: "  labelWidth="115px" data-options="prompt:'请选择到达点'" /></div>
					<div><input id="fmDepartureTime" name="departureTimeStr"  class="easyui-timespinner" required="true" label="出发时间: " editable="false" labelWidth="115px" showSeconds=true /></div>
					<div><input id="fmArrivalTime" name="arrivalTimeStr" class="easyui-timespinner" required="true" label="到达时间: " editable="false" labelWidth="115px" showSeconds=true /></div>
					<div><input id="fmLayTime" name="layTime" class="easyui-numberbox"  label="装卸耗时(分钟): " required="true"  labelWidth="115px" data-options="max:999,min:1"  data-options="prompt:'请输入装卸货时间'"></div>
					<div><input id="fmCarpoolSitesCodes" name="carpoolSitesCode"   class="easyui-textbox"  label="愿意拼车网点: "  labelWidth="115px"  data-options="prompt:'请选择关联网点'" /></div>
					<div><input id="fmOrderCombineCode" name="orderCombinCode"  class="easyui-textbox"  label="订单组合号: " readonly="true"  labelWidth="115px"   /></div>
					<div><input id="fmLineGroupCode" name="lineGroupCode"  class="easyui-textbox"  label="班次编号: " readonly="true"  labelWidth="115px"   /></div>
					<div><input id="fmPrice" name="price" class="easyui-numberbox" label="价格(元): " data-options="max:99999,min:1"  precision="2" labelWidth="115px" /></div>
<!-- 					<div><input id="fmChargingBeginTime" name="chargingBeginTime"   class="easyui-datetimebox" label="计费时间起: "   labelWidth="115px" editable="false" data-options="prompt:''" /></div>
					<div><input id="fmChargingBeginTime" name="chargingBeginTime"  class="easyui-datetimebox" label="计费时间止: "   labelWidth="115px" editable="false" /></div> -->
			    	<div><input id="fmAdjustPrice" name="adjustPrice" class="easyui-numberbox" label="调整后价格(元): "  precision="2"data-options="max:99999,min:1"  labelWidth="115px" /></div>
			    	<div><input id="fmOrderStatus" name="orderStatus" class="easyui-textbox" readonly="true" label="订单状态: "  precision="2" labelWidth="115px" /></div>
			    	<!-- <div><input id="fmCreateEmp"  name="createEmp"   class="easyui-textbox"  label="创建人: " readonly="true"  labelWidth="115px" /></div>
					<div><input id="fmCreateTime" name="createTime" class="easyui-datetimebox"  label="创建时间: "  readonly="true"  labelWidth="115px" /></div> -->
			    	<div><input id="fmBusinessMode"  name="businessMode"   class="easyui-textbox"  required="true" label="业务模型: " labelWidth="115px" /></div>
					<div ><input id="fmorderStartTime" name="orderStartTime"  class="easyui-datetimebox"  required="true" label="开始执行时间: "   labelWidth="115px" /></div>
					<div class="temporaryDiv" ><input id="fmDayWeight" name="dayWeight" class="easyui-numberbox" required="true" label="货量重量(T): " data-options="max:1000,min:1"  precision="0" labelWidth="115px" /></div>
					<div class="temporaryDiv" ><input id="fmDayVolume" name="dayVolume" class="easyui-numberbox" required="true" label="货量体积(m3): "  data-options="max:1000,min:1" precision="0" labelWidth="115px" /></div>
					<div class="longTermDiv"><input id="fmexecuteEndTime" name="orderEndTime"  class="easyui-datetimebox"  required="true" label="执行结束时间: "   labelWidth="115px" /></div>
					<div  id="weekWeightVolumeDiv"  style="margin-left:30px;" data-options="fit:true" >
						<div>货物重量体积: </div>
						<div   class="table-a"  style=" margin-left:0px;height:250px;">
					  		<table  rules="all" >
					  			<tr>
						  			<td class="tdheader"style="padding: 5px;" >周期</td>
						  			<td class="tdheader" >重量(KG/T)</td>
						  			<td class="tdheader" >方数(方)</td>
					  			</tr>
					  			<tr>
						  			<td class="tdheader">周一</td>
								    <td><input id="mondayWeight" name="mondayWeight"  class="easyui-numberbox"  data-options="max:1000,min:1" precision="0"style="width: 100% ;"></td>
								    <td><input id ="mondayVolume" name="mondayVolume"  class="easyui-numberbox" data-options="max:1000,min:1" precision="0" style="width:100% ;"></td>
					  			</tr>
					  			<tr>
						  			<td class="tdheader">周二</td>
								 	<td><input id="tuesdayWeight"  name="tuesdayWeight"  class="easyui-numberbox" data-options="max:1000,min:1" precision="0" style="width: 100% ;" ></td>
								   <td><input id="tuesdayVolume"  name="tuesdayVolume"  class="easyui-numberbox"data-options="max:1000,min:1" precision="0" style="width: 100% ;"></td>
					  			</tr>
					  			<tr>
					  			<td class="tdheader">周三</td>
					  			<td><input id="wednesdayWeight"  name="wednesdayWeight"  class="easyui-numberbox" data-options="max:1000,min:1" precision="0" style="width: 100% ;"></td>
					  			<td><input id="wednesdayVolume"  name="wednesdayVolume"  class="easyui-numberbox" data-options="max:1000,min:1" precision="0" style="width: 100% ;"></td>
					  			</tr>
					  			<tr>
					  				<td class="tdheader">周四</td>
								    <td><input id="thursdayWeight"  name="thursdayWeight"  class="easyui-numberbox" data-options="max:1000,min:1" precision="0" style="width: 100% ;"></td>
								    <td><input id="thursdayVolume"  name="thursdayVolume"  class="easyui-numberbox" data-options="max:1000,min:1" precision="0" style="width: 100% ;"></td>
							    </tr>
							    <tr>
								     <td class="tdheader">周五</td>
								    <td><input id="fridayWeight"  name="fridayWeight"  class="easyui-numberbox" data-options="max:1000,min:1" precision="0" style="width: 100% ;"></td>
								    <td><input id="fridayVolume"  name="fridayVolume"  class="easyui-numberbox" data-options="max:1000,min:1" precision="0" style="width: 100% ;"></td>
							    </tr>
							    <tr>
								    <td class="tdheader">周六</td>
								    <td><input id="saturdayWeight"  name="saturdayWeight"  class="easyui-numberbox"  data-options="max:1000,min:1" precision="0" style="width: 100% ;"></td>
								    <td><input id="saturdayVolume"  name="saturdayVolume"  class="easyui-numberbox"  data-options="max:1000,min:1" precision="0" style="width: 100% ;"></td>
							    </tr>
							    <tr>
								    <td class="tdheader">周日</td>
								    <td><input id="sundayWeight"  name="sundayWeight"  class="easyui-numberbox" data-options="max:1000,min:1" precision="0" style="width: 100% ;"></td>
								    <td><input id="sundayVolume"  name="sundayVolume"  class="easyui-numberbox" data-options="max:1000,min:1" precision="0" style="width: 100% ;"></td>
					  			</tr>
					  		</table>
				    	</div>
						
				</form>
			</div>
		</div>
	</div>
	<div id="divFreightOrderdBtn">
		<a id="btsaveFreightOrder" href="#" class="easyui-linkbutton save" onclick="saveFreightOrder()">保存</a>
		<a href="#" class="easyui-linkbutton cancel" onclick="$('#dlgFreightOrder').window('close')">关闭</a>
	</div>
	<!-- end dialog -->

</body>
</html>