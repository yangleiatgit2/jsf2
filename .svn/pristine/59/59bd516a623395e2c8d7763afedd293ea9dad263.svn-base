<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>订单组合管理</title>
<%@include file="../component/common.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/freightOrderCombine/freightOrderCombine.js"></script>
<script>
	var cmsOrgType = "${sessionScope.CURRENT_USER.cmsOrgType}";
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
	.icon-up{
		background:url('${pageContext.request.contextPath}/icons/up.png') no-repeat center center;
    	background-size: 100%;
	}
	.icon-down{
			background:url('${pageContext.request.contextPath}/icons/down.png') no-repeat center center;
	    	background-size: 100%;
	}
</style>
</head> 
<body>
	<!-- begin pageview -->
	<div id="tlbFreightOrderCombine">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formOrderCombin" action="#" style="float:left;margin:0 auto;" method="post">
					<div><input id="orderCombineCode" name="orderCombineCode" class="easyui-textbox" label="订单组合号: " labelwidth="100" data-options="prompt:'请输入订单组合号',validType:['length[1,32]','orderCombineCode']"></div>	
					<div><input id="orderCombineStatus" name="orderCombineStatus" class="easyui-textbox" label="订单组合状态: " labelwidth="100"></div>			
					<div><input id="orderCombineType" name="orderCombineType" class="easyui-textbox" label="订单组合类型: " labelwidth="100"></div>					
					<div><input id="lineGroupCode" name="lineGroupCode" class="easyui-textbox" label="对应班次号: " labelwidth="100" data-options="prompt:'请输入对应班次号',validType:['length[1,32]','lineGroupCode']"></div>	
					<div><input id="carDeparturePlanCode" name="carDeparturePlanCode" class="easyui-textbox" label="对应计划号: " labelwidth="100" data-options="prompt:'请输入对应计划号:',validType:['length[1,32]','carDeparturePlanCode']"></div>
					<div><input id="businessMode" name="businessMode" class="easyui-textbox" label="业务模式: " ></div>
					<div>
						<input id="beginDate" name="beginDate" class="easyui-datebox" label="生成时间: "data-options="editable:false">&nbsp至&nbsp					
						<input id="endDate" name="endDate" class="easyui-datebox" data-options="editable:false">
					</div>
					<!-- <div class="query-reset"> -->
					<div class="fr">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findOrderCombin()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetformOrderCombin()">重置</a>
			    	</div>
				</form>
			</div>
		</div>
		<!-- begin table tool -->
		<div class="toolbar-margin">
		    <shiro:hasPermission name="freight_order_combin_add">
				<a href="javascript:void(0)" onclick="openAddOrderCombine()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">新增</a>
			</shiro:hasPermission>
<%-- 			 <shiro:hasPermission name="freight_order_combin_edit">
				<a href="javascript:void(0)" onclick="openUpdateOrderCombine()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-edit',plain:true">编辑订单组合</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="order_combin_Intelligent_scheduling">
				<a href="javascript:void(0)" onclick="IntelligentSchedulin()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-liebiao',plain:true">智能排班</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="order_combin_generative_pricing">
				<a href="javascript:void(0)" onclick="generativePricing()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-baojia',plain:true">生成定价</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="order_combin_send_pricing">
				<a href="javascript:void(0)" onclick="orderCombinSendPricing()" class="easyui-linkbutton"  data-options="iconCls:'iconfont uce-upload',plain:true">发送班次</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="order_combin_scheduling_fine_tuning">
				<a href="javascript:void(0)" onclick="schedulingFineTuning()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-liebiao',plain:true">排班微调</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="freight_order_combin_stop">
				<a href="javascript:void(0)" onclick="orderCombinstop()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-stop',plain:true">终止</a>
			</shiro:hasPermission>  --%>
			<shiro:hasPermission name="order_combin_export">
				<a href="javascript:void(0)" onclick="exportFreightOrderCombine()" class="easyui-linkbutton fr" data-options="iconCls:'iconfont uce-export',plain:true" style="float:right;">导出</a>
			</shiro:hasPermission>
		</div>
		<!-- end table tool -->			
	</div>
	<!-- begin table -->
	<table id="tblFreightOrderCombine" style="width:100%;" data-options="fit:true"></table>
	<!-- end table -->
	<!-- end pageview -->
	<!-------------------------------------------------- 编辑页面处理 ------------------------------------------------------------------------------>
	<div id="dlgFreightOrderCombine" class="easyui-dialog" data-options="buttons:'#divLineClassBtn'"  style="width:865px;height:800px;" closed="true">
		<div id="tlbDetial">
			<div class="easyui-accordion">			
				<div class="search-form">
					<form id="formOrderCombine" style="float:left; margin: 20px auto;" action="#" method="post">
					  <input id="id" name='id' type="hidden" />
					   <input id="orderCodes" name="orderCodes" type="hidden" />
					   <input id="autoselect" name='autoselect' type="hidden" />
						<div><input id="fmorderCombineCode" name="orderCombineCode" readonly = 'true'  class="easyui-textbox"  label="订单组合编号：" data-options="prompt:'订单组合编号后台生成'" labelwidth="110" ></div>
						<div class="addOrderCombineDiv"><input id="fmorderCombineName" name="orderCombineName" readonly = 'true'  class="easyui-textbox"  label="订单组合名称：" data-options="prompt:'订单组合名称后台生成'"labelwidth="110" ></div>
						<div><input id="fmorderCombineStatus" name="orderCombineStatus"  readonly = 'true'  class="easyui-textbox"  label="状态："  labelwidth="110" ></div>
						<div><input id="fmbusinessMode" name="businessMode" readonly = 'true'  class="easyui-textbox" label="业务模式："   labelwidth="110" ></div>
						<div><input id="fmorderCombineType" name="orderCombineType" readonly = 'true' class="easyui-textbox" label="类型："  labelwidth="110"></div>
						<div class="updateOrdercombineDiv"><input id="fmintegenceScheduleCode" name="integenceScheduleCode"  readonly = 'true' class="easyui-textbox" label="智能排班编号：" labelwidth="110"></div>
						<div class="updateOrdercombineDiv"><input id="fmautoGenerateRule" name="autoGenerateRule" readonly = 'true' class="easyui-textbox"  label="自动生产规则：" labelwidth="110" ></div>
						<div class="updateOrdercombineDiv"><input id="fmcmbLineClassType" name="lineClassType" readonly = 'true' class="easyui-textbox"  label="需求组合名称："   labelwidth="110"  ></div>
						<div class="updateOrdercombineDiv"><input id="fmlineGroupCode" name="lineGroupCode" readonly = 'true'  class="easyui-textbox"  label="对应班次编号："   labelwidth="110"  ></div>
						<div class="updateOrdercombineDiv"><input id="fmcarDeparturePlanCode" name="carDeparturePlanCode" readonly = 'true'  class="easyui-textbox"  label="发车计划编号："  labelwidth="110"   ></div>
						<div class="updateOrdercombineDiv"><input id="fmcreateEmp" name="createEmp"  readonly = 'true' class="easyui-textbox" label="创建人："  labelwidth="110"  ></div>
						<div class="updateOrdercombineDiv" ><input id="fmcreateTime" name="createTime" readonly = 'true' class="easyui-textbox"  label="创建时间："  labelwidth="110"  ></div>
						<div class="updateOrdercombineDiv"><input id="fmupdateEmp" name="updateEmp" readonly = 'true' class="easyui-textbox"  label="更新人："   labelwidth="110"  ></div>
						<div class="updateOrdercombineDiv"><input id="fmupdateTime" name="updateTime" readonly = 'true'  class="easyui-textbox"  label="最后更新时间："  labelwidth="110"  ></div>
					</form>
				</div>
			</div>
			<div id="tblDetialToolBar" class="toolbar-margin">
				<a id="addDetialBtn" href="#" onclick="openAddOrder()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">新增</a>
				<a id="deleteBetailBtn" href="#" onclick="deleteOrderFromCombin()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-delete',plain:true">删除</a>
			</div>
		</div>
		<table id="tblFreightOrderCombineDetail" style="width:100%;" data-options="fit:true"></table>
	</div>
	<div id="divLineClassBtn">
		<a id="saveOrderCombineBtn" href="#" class="easyui-linkbutton save" onclick= "saveOrderCombine()">保存</a>
		<a href="#" class="easyui-linkbutton cancel" onclick= "javascript:$('#dlgFreightOrderCombine').window('close')">关闭</a>
	</div>
	<!-- end dialog -->
	<!-- begin line dialog -->
	<div id="dlgOrder" class="easyui-dialog"  data-options="buttons:'#divOrderBtn'" style="width:800px;height:450px;" closed="true">
		<div id="tlbOrder">
			<div class="easyui-accordion">
				<div class="search-form">
				<form id="formOrder" style="float:left; margin: 20px auto;" action="#" method="post">
					 <input id="fddemandType" name="demandType" type="hidden" />
					 <input id="fdbusinessMode" name="businessMode" type="hidden" />
					<div><input id="fddemandSiteCode" name="demandSiteCode" class="easyui-textbox" label="需求网点: " data-options="prompt:'请输入需求网点',validType:['length[1,32]','demandSiteCode']"></div>	
					<div><input id="fdbeginStationCode" name="beginStationCode" class="easyui-textbox" label="出发点: "  data-options="prompt:'请选择出发点'"></div>			
					<div><input id="fdendStationCode" name="endStationCode" class="easyui-textbox" label="到达点: "  data-options="prompt:'请选择到达点'"></div>					
					<div>
						<input id="fdbeginTime" name="beginTime" class="easyui-datebox" label="订单创建: " labelwidth="100" data-options="editable:false">&nbsp至&nbsp					
						<input id="fdendTime" name="endTime" class="easyui-datebox" data-options="editable:false">
					</div>
					<!-- <div class="query-reset"> -->
					<div class="fr">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findFreightOrder()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetFreightOrder()">重置</a>
			    	</div>
			    	</form>
				</div>
			</div>
		<div id="divaddOrderBtn">
	     <a href="#" onclick="addOrderToCombine()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">增加到订单组合</a>
	    </div>
		</div>
		<table id="tborer" style="width:100%;" data-options="fit:true"></table>
	</div>
	
	<div id="divOrderBtn">
		<a href="#" class="easyui-linkbutton cancel" onclick="javascript:$('#dlgOrder').window('close')">关闭</a>
	</div>
	<!-- end line dialog -->
	<!-- begin Scheduling fine-tuning dialog -->
	<!-- begin NoFineTuning-->
	<div id="dlgNoFineTuning" class="easyui-dialog"  data-options="buttons:'#divNoFineTuning'" style="width:800px;height:450px;" closed="true">
		<table id="tbNoFineTuning" style="width:100%;"></table>
	</div>
	<div id="divNoFineTuning">
	    <input id="FTorderCombineCode" name='orderCombineCode' type="hidden" />
		<a href="#" class="easyui-linkbutton save" onclick= "saveLineClass()">生成新班次</a>
		<a href="#" class="easyui-linkbutton cancel" onclick= "fineTuningMore()">调整更多</a>
	</div>
	<!-- end  NoFineTuning-->
	<!-- begin FineTuning -->
	<div id="dlgFineTuning" class="easyui-dialog"  data-options="buttons:'#divFineTuning'" style="width:1150px;height:700px;" closed="true">
		<div id="tlbFineTuning">
			<div class="easyui-accordion">
				<div class="search-form">
				    <form id="formLineGroup" style="float:left; margin: 20px auto;" action="#" method="post">
						<div><input id="ftlineGroupCode" name="lineGroupCode" class="easyui-textbox" label="班次编号: " labelwidth="110" data-options="prompt:'请输入需求网点',validType:['length[1,32]','demandSiteCode']"></div>	
						<div><input id="ftstartOrgCode" name="startOrgCode" class="easyui-textbox" label="始发站: "  labelwidth="110" data-options="prompt:'请选择始发站'"></div>			
						<div><input id="ftendOrgCode" name="endOrgCode" class="easyui-textbox" label="目的站: "  labelwidth="110" data-options="prompt:'请选择目的站'"></div>
						<div><input id="ftstatus" name="status" class="easyui-textbox"  label="班次状态: " labelwidth="110"  data-options="prompt:'请选择班次状态'"></div>
						<div><input id="ftdrivingPlanCombinCode" name="drivingPlanCombinCode" class="easyui-textbox" label="发车计划编号: " labelwidth="110"  data-options="prompt:'请输入发车计划编号'"></div>
						<div><input id="ftorderCombinCode" name="orderCombinCode" class="easyui-textbox" readonly="true" label="订单组合号: " labelwidth="110"  data-options="prompt:'请输入订单组合号:'"></div>					
						<div><input id="ftrequiType" name="requiType" class="easyui-textbox" label="需求类型: " labelwidth="110"  data-options="prompt:'请输入需需求类型:'"></div>					
						<!-- <div class="query-reset"> -->
						<div class="fr">
							<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findLineGroup()">查询</a>
							<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetLineGroup()">重置</a>
						</div>
			    	</form>
				</div>
			</div>
		</div>	
		<fieldset  fit="true"  style="margin:0;border: 0px solid #ccc;border-top: 1px solid #ccc;">
					<legend>班次列表</legend>
					<div id="tblLineGroupBtn">
				        <a href="#" onclick="deleteLineGroup()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">删除</a>
			    	</div>
				</fieldset>
		<table id="tblLineGroup"  style="width:100%;"   title="班次列别"  ></table>
			<div class="tblDiv" fit="true" style="margin:5px 0px 5px 5px" >
				<fieldset style="width:1120px;height:100%;margin:0;border: 1px solid #ccc">
	   	          	<legend>路段信息</legend>
					<div id="tblLineGroupDetailBtn">
					 <form id="formLineGroupChange" style="float:left; margin: 20px auto;" action="#" method="post">
					 <input id="FTGlingGroup" name='id' type="hidden" />
					  <input id="FTGlingGroupDetail" name='ids' type="hidden" />
					  </form>
					  <input id="FTorderCombineCode" name='orderCombineCode' type="hidden" />
						    <a href="#" onclick="deleteLineGroupDetail()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">删除</a>
					</div>
					<table id="tblLineGroupDetail" style="width: 100%" ></table>
   	          </fieldset>
		</div>
		<!-- 班次修改历史 begin -->
		<div class="tblDiv"  class="easyui-layout" fit="true" title="班次修改历史" style="margin:5px 0px 5px 5px">
		<fieldset style="width:1120px;height:100%;margin:0;border: 1px solid #ccc">
					<legend>班次修改历史</legend>
					<table id="tblLineGroupModify" style="width: 100%" ></table>
					</fieldset>
		</div>
		<!-- 班次修改历史 end -->
	
	</div>

	
	<div id="divFineTuning">
		<a href="#" class="easyui-linkbutton save" onclick= "saveLineGroup()">保存</a>
		<a href="#" class="easyui-linkbutton cancel" onclick= "javascript:$('#dlgFineTuning').window('close')">取消</a>
	</div>
	<!-- end  FineTuning -->
	<!-- begin Scheduling fine-tuning dialog -->
	
	
	<!--生成报价 界面 begin  -->
	<div id="dlgQuotation" class="easyui-dialog"  data-options="buttons:'#divQuotationBtn'" style="width:300px;height:300px;" closed="true">
		<div class="search-form">
		    <form id="formQuotation" style="float:left; margin: 5px auto;" action="#" method="post">
		    <div hidden =true >
		   		<input id="quotationPriceRuleCode"  class="easyui-textbox" name ='priceRuleCode' />
		   		<input id="quotationDemandCombineCode" class="easyui-textbox"   name='combineCode' />
	   		</div>
	    	</form>
		</div>
		<table id="tblQuotation" style="width:100%;" data-options="fit:true"></table>
	</div>
	<div id="divQuotationBtn">
		<a href="#" class="easyui-linkbutton save" onclick= "generateQuotation()">保存</a>
		<a href="#" class="easyui-linkbutton cancel" onclick="javascript:$('#dlgQuotation').window('close')">关闭</a>
	</div>
	<!--生成报价 界面 end  -->
	
	<!-- 二期新增，订单组合新增弹框 begin -->
	<!-- <div id="dlgAddFreightOrderCombine" class="easyui-dialog" data-options="buttons:'#divLineClassBtn'"  style="width:865px;height:800px;" closed="true">
		<div id="tlbAddDetial">
			<div class="easyui-accordion">			
				<div class="search-form">
					<form id="formAddOrderCombine" style="float:left; margin: 20px auto;" action="#" method="post">
						<div><input id="fmAdorderCombineCode" name="orderCombineCode" readonly = 'true'  class="easyui-textbox"  label="订单组合编号：" labelwidth="110" ></div>
						<div><input id="fmAdorderCombineName" name="orderCombineName" readonly = 'true'  class="easyui-textbox"  label="订单组合名称：" labelwidth="110" ></div>
						<div><input id="fmAdorderCombineStatus" name="orderCombineStatus"  readonly = 'true'  class="easyui-textbox"  label="状态："  labelwidth="110" ></div>
						<div><input id="fmAdbusinessMode" name="businessMode" readonly = 'true'  class="easyui-textbox" label="业务模式："   labelwidth="110" ></div>
						<div><input id="fmAdorderCombineType" name="orderCombineType" readonly = 'true' class="easyui-textbox" label="需求类型："  labelwidth="110"></div>
					</form>
				</div>
			</div>
			<div id="tblAddDetialToolBar" class="toolbar-margin">
				<a href="#" onclick="openAddOrder()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">新增</a>
				<a href="#" onclick="deleteOrderFromCombin()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-delete',plain:true">删除</a>
			</div>
		</div>
		<table id="tblAddFreightOrderCombineDetail" style="width:100%;" data-options="fit:true"></table>
	</div> -->
	<!-- 二期新增，订单组合新增弹框 end -->
	
</body>
</html>