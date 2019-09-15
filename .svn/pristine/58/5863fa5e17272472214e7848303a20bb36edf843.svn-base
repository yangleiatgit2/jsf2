<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>货运需求组合管理</title>
<%@include file="../component/common.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/freightDemandCombine/freightDemandCombine.js"></script>
<script>
	var cmsOrgType = "${sessionScope.CURRENT_USER.cmsOrgType}";
</script>
<style type="text/css">
	.icon-up{
			background:url('${pageContext.request.contextPath}/icons/up.png') no-repeat center center;
	    	background-size: 100%;
	}
	.icon-down{
			background:url('${pageContext.request.contextPath}/icons/down.png') no-repeat center center;
	    	background-size: 100%;
	}
	.dialog-button {
		border:1px solid #CCCCCC;
		background: none;
		padding: 5px 30px;
	} 
	.tblDiv  {
	 	min-height:100px!important;
      	height: auto !important;
	} 
</style>
</head> 
<body>
	<!-- begin pageview -->
	<div id="tlbFreightDemandCombine">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formFindDemandCombine" action="#" style="float:left;margin:0 auto;" method="post">
					<input id="hideCreateBeginTime"  name="createBeginTime" type="hidden" />
					<input id="hideCreateEndTime"  name="createEndTime" type="hidden" />
					<div><input id="findDemandCombineCode" name="demandCombineCode" class="easyui-textbox" label="需求组合号: " labelWidth="120" data-options="prompt:'请输入需求组合号'"></div>	
					<div><input id="findDemandCombineStatus" name="demandCombineStatus" class="easyui-textbox" label="需求组合状态: " labelwidth="120"></div>			
					<div><input id="findDemandCombineType" name="demandCombineType" class="easyui-textbox" label="需求组合类型: " labelWidth="120"></div>					
				<!-- 	<div><input id="findLineGroupCode" name="lineGroupCode" class="easyui-textbox" label="班次编号: " labelWidth="95" data-options="prompt:'请输入对应班次号'"></div>	
					<div><input id="findCarDeparturePlanCode" name="carDeparturePlanCode" class="easyui-textbox" label="发车计划号: " labelWidth="95" data-options="prompt:'请输入对应计划号:'"></div> -->
					<div><input id="findBusinessMode" name="businessMode" class="easyui-textbox" label="业务模式: " labelWidth="120"  ></div>
					<div>
						<input id="createBeginTime" class="easyui-datebox" label="生成时间: " labelWidth="120" data-options="editable:false">&nbsp至&nbsp					
						<input id="createEndTime" class="easyui-datebox" data-options="editable:false">
					</div>
					<!-- <div class="query-reset"> -->
					<div style="float:right">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findDemandCombine()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetFormFindDemandCombine()">重置</a>
			    	</div>
				</form>
			</div>
		</div>
		<!-- begin table tool -->
		<div class="toolbar-margin">
		<%-- 	<shiro:hasPermission name="demand_combin_edit">
				<a href="javascript:void(0)" onclick="openUpdateDemandCombine()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">编辑需求组合</a>
			</shiro:hasPermission> --%>
			<shiro:hasPermission name="demand_combin_Intelligent_schedule">
				<a href="javascript:void(0)" onclick="smartSchedule()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-liebiao',plain:true">智能排班</a>
			</shiro:hasPermission>
		<%-- 	<shiro:hasPermission name="demand_combin_schedule_fine_tune">
				<a href="javascript:void(0)" onclick="scheduleFineTune()" class="easyui-linkbutton" data-options="iconCls:'iconfont icon-filter',plain:true">班次微调</a>
			</shiro:hasPermission> --%>
			<shiro:hasPermission name="demand_combin_generate_quote">
				<a href="javascript:void(0)" onclick="openPriceRule()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-baojia',plain:true">生成定价</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="demand_combin_send_quote">
				<a href="javascript:void(0)" onclick="sendQuote()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-baojia',plain:true">发送报价</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="demand_combin_end_combine">
				<a href="javascript:void(0)" onclick="endDemandCombine()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-stop',plain:true">终止需求组合</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="demand_combin_export">
				<a href="javascript:void(0)" onclick="exportDemandCombine()" class="easyui-linkbutton fr" data-options="iconCls:'iconfont uce-export',plain:true" style="float:right;">导出</a>
			</shiro:hasPermission>
		</div>
		<!-- end table tool -->			
	</div>
	<!-- begin table -->
	<table id="tblFreightDemandCombine" style="width:100%;" data-options="fit:true"></table>
	<!-- end table -->
	<!-- end pageview -->
	<!-------------------------------------------------- 编辑页面处理 ------------------------------------------------------------------------------>
	<div id="dlgFreightDemandCombine" class="easyui-dialog" data-options="buttons:'#divDemandCombineBtn'"  style="width:900px;height:500px;" closed="true">
		<div id="tlbDetial">
			<div class="easyui-accordion">			
				<div class="search-form">
					<form id="formDemandCombine" style="float:left; margin: 10px auto;" action="#" method="post">
						<input name='id' type="hidden">
						<input name='version' type="hidden">
						<input id ="demandCodes" name='demandCodes' type="hidden">
						<div><input id="demandCombineCode" name="demandCombineCode" readonly = 'true'  class="easyui-textbox"  label="需求组合编号: " labelwidth="110" ></div>
						<div><input id="demandCombineStatus" name="demandCombineStatus"  readonly = 'true'  class="easyui-textbox"  label="状态: "  labelwidth="110" ></div>
						<div><input id="demandCombineType" name="demandCombineType" readonly = 'true' class="easyui-textbox" label="类型: "  labelwidth="110"></div>
						<div><input id="integenceScheduleCode" name="integenceScheduleCode"  readonly = 'true' class="easyui-textbox" label="智能排班编号: " labelwidth="110"></div>
						<div><input id="autoGenerateRule" name="autoGenerateRule" readonly = 'true' class="easyui-textbox"  label="自动生产规则: " labelwidth="110" ></div>
						<div><input id="demandCombineName" name="demandCombineName" readonly = 'true' class="easyui-textbox"  label="需求组合名称: "   labelwidth="110"  ></div>
						<!-- <div><input id="lineGroupCode" name="lineGroupCode" readonly = 'true'  class="easyui-textbox"  label="班次编号: "   labelwidth="110"  ></div>
						<div><input id="carDeparturePlanCode" name="carDeparturePlanCode" readonly = 'true'  class="easyui-textbox"  label="发车计划号: "  labelwidth="110"   ></div> -->
						<div><input id="businessMode" name="businessMode" readonly = 'true'  class="easyui-textbox" label="业务模式: "   labelwidth="110" ></div>
						<div><input id="stationName" name="stationName" readonly = 'true'  class="easyui-textbox" label="分拨名称: "   labelwidth="110" ></div>
						<div><input id="executeTime" name="executeTime" readonly = 'true'  class="easyui-datebox" label="执行日期: "   labelwidth="110" ></div>
						<div><input id="createEmp" name="createEmp"  readonly = 'true' class="easyui-textbox" label="创建人: "  labelwidth="110"  ></div>
						<div><input id="createTime" name="createTime" readonly = 'true' class="easyui-datetimebox" readonly="true" label="创建时间: "  labelwidth="110"  ></div>
					</form>
				</div>
			</div>
			<div id="tlbDetialToolBar" class="toolbar-margin">
				<a href="#" onclick="openAddDemand($('#demandCombineType').combobox('getValue'), $('#demandCombineCode').textbox('getValue'))"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">新增</a>
				<a href="#" onclick="deleteDemand()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-delete',plain:true">删除</a>
			</div>
		</div>
			<table id="tblDemandCombineDetail" style="width:100%;height:100%" data-options="fit:true"></table>
	</div>
	<div id="divDemandCombineBtn">
		<div id="saveBtn" style="display:inline;"><a href="#" class="easyui-linkbutton save"  onclick= "saveDemandCombine()">保存</a></div>
		<div style="display:inline;"><a href="#" class="easyui-linkbutton cancel" onclick= "javascript:$('#dlgFreightDemandCombine').window('close')">关闭</a></div>
	</div>
	<!-- end dialog -->
	
	<!-- begin demand dialog -->
	<div id="dlgDemand" class="easyui-dialog"  data-options="buttons:'#divDemandBtn'" style="width:880px;height:500px;" closed="true">
		<div id="tlbDemand">
			<div class="easyui-accordion">
				<div class="search-form">
					<form id="formFindDemand" style="float:left; margin: 10px auto;" action="#" method="post">
						<input id="combineQueryFlag"  name="combineQueryFlag"  type="hidden" />
						<input id="fdDemandType"  name="demandType" type="hidden" />
						<input id="hidCreateBeginTime"  name="createBeginTime" type="hidden" />
						<input id="hidCreateEndTime"  name="createEndTime" type="hidden" />
						<input id='fdBuinessMode' name='businessMode' type="hidden">
						<input id='hiddenDemandStatus' name="demandStatus"  type="hidden">
						<div><input id="findDemandSiteCode" name="demandSiteCode" class="easyui-textbox" label="需求网点: " data-options="prompt:'请输入需求网点' "></div>	
						<div><input id="findBeginStationCode" name="beginStationCode" class="easyui-textbox" label="出发点: "   data-options="prompt:'请选择出发点'"></div>
						<div><input id="findEndStationCode" name="endStationCode" class="easyui-textbox" label="到达点: " data-options="prompt:'请选择到达点'"></div>	
						<div><input id="fdDemandStatus" class="easyui-textbox" label="需求状态: "></div>			
						<div>
							<input id="fdCreateBeginTime" class="easyui-datebox" label="创建时间: " data-options="editable:false">&nbsp至&nbsp					
							<input id="fdCreateEndTime" class="easyui-datebox" data-options="editable:false">
						</div>
						<!-- <div class="query-reset"> -->
						<div style="float:right">
							<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findDemand()">查询</a>
							<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetFormFindDemand()">重置</a>
				    	</div>
			    	</form>
		    	</div>
			</div>
			<div id="divAddDemandBtn">
				<a href="#" onclick="addDemand()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">增加到需求组合</a>
			</div>
		</div>
		<table id="tblDemand" style="width:100%;" data-options="fit:true"></table>
	</div>
	
	<div id="divDemandBtn">
		<a href="#" class="easyui-linkbutton cancel" onclick="javascript:$('#dlgDemand').window('close')">关闭</a>
	</div>
	<!-- end demand dialog -->
	
	<!-- 班次微调界面 begin -->
	<div id="dlgFineTune" class="easyui-dialog"  data-options="buttons:'#divFineTune'" style="width:1150px;height:650px;" closed="true">
		<div id="tlbFineTune">
			<div class="easyui-accordion">
				<div class="search-form">
				    <form id="formFineTune" style="float:left; margin: 5px auto;" action="#" method="post">
				   		<input id="hideDeCombinCode"  type="hidden" />
						<div><input id="lineGroupCode" name="lineGroupCode" class="easyui-textbox" label="班次编号: " labelwidth="95" data-options="prompt:'请输入需求网点' "></div>	
						<div><input id="beginStationCode" name="beginStationCode" class="easyui-textbox" label="始发站: "   labelwidth="95"data-options="prompt:'请选择始发站'"></div>			
						<div><input id="endStationCode" name="endStationCode" class="easyui-textbox" label="目的站: "  labelwidth="95"data-options="prompt:'请选择目的站'"></div>
						<div><input id="status" name="status" class="easyui-textbox" label="班次状态: " labelwidth="95" data-options="prompt:'请选择班次状态'"></div>
						<div><input id="deCombinCode" name="requiCombinCode" class="easyui-textbox" label="需求组合编号: " labelwidth="95"  readonly="true"   data-options="prompt:'请输入需求组合编号:'"></div>					
						<div><input id="deCombinType" name="demandCombineType" class="easyui-textbox" label="需求类型: "  labelwidth="95" data-options="prompt:'请输入需需求类型:'"></div>					
						<!-- <div class="query-reset"> -->
						<div style="float:right">
							<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findLineGroup()">查询</a>
							<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetFormFineTune()">重置</a>
						</div>
			    	</form>
				</div>
			</div>
			<div>
				<fieldset  fit="true"  style="margin:0;border: 0px solid #ccc;border-top: 1px solid #ccc;">
					<legend>班次列表</legend>
					<div id="tblLineGroupBtn">
				        <a href="#" onclick="openOrderQuery2()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">删除</a>
			    	</div>
				</fieldset>
			</div>
		</div>	
		<table id="tblLineGroup"  style="width:100%;"   title="班次列表"  ></table>
		<!--路段信息 begin -->
		<div class="tblDiv" fit="true" style="margin:5px 0px 5px 5px" >
				<fieldset style="width:1120px;height:100%;margin:0;border: 1px solid #ccc">
	   	          	<legend>路段信息</legend>
					<div id="tblLineGroupDetailBtn">
						    <a href="#" onclick="openOrderQuery()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">删除</a>
					</div>
					<table id="tblLineGroupDetail" style="width: 100%" ></table>
   	          </fieldset>
		</div>
		<!--路段信息  end-->
		
		<!-- 班次修改历史 begin -->
		<div class="tblDiv"  fit="true" style="margin:5px 0px 5px 5px">
				<fieldset style="width:650px;height:100%;margin:0;border: 1px solid #ccc">
	   	          	<legend>班次修改历史</legend>
					<div id="tblLineGroupDetailBtn">
						    <a href="#" onclick="openOrderQuery()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">删除</a>
					</div>
					<table id="tblLineGroupModify" style="width: 100%" ></table>
   	          </fieldset>
		</div>
		<!-- 班次修改历史 end -->
	</div>
	<div id="divFineTune">
		<a href="#" class="easyui-linkbutton save" onclick= "saveLineGroup()">保存</a>
		<a href="#" class="easyui-linkbutton cancel" onclick= "javascript:$('#dlgFineTune').window('close')">取消</a>
	</div>
	<!-- 班次微调界面 end -->
	
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
	
	
</body>
</html>