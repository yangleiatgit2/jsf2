<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
	<%@include file="../component/common.jsp"%>
	<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/planExcepProcess/planExcepProcess.js"></script>
	<title>发车计划异常处理</title>	
	<style type="text/css">
	._2word + span {
		min-width:50px!important;
	    width: 125px!important;
	 }
	._1word + span {
		min-width:50px!important;
	  	width: 138px!important;
	}
	</style>
</head>
<body>
	<div id="departurePlan">
	    <div class="easyui-accordion">			
			<div class="search-form">
				<form action="#" id="departureForms" action="#" style="float:left;margin:0 auto;">
					<div><input id="drivingPlanCode" name="drivingPlanCode" class="easyui-textbox"  label="发车计划编号： "   data-options="prompt:'请输入关键字'"></div>
					<div><input id="startOrgCode" name="startOrgCode" class="easyui-textbox"  label="始发网点 "   data-options="prompt:'请选择机构'"></div>
					<div><input id="endOrgCode" name="endOrgCode" class="easyui-textbox"  label="目的站： "   data-options="prompt:'请选择机构'"></div>
					<div><input id="lineGroupCode" name="lineGroupCode" class="easyui-textbox"  label="班次编号：" ></div>
					<div><input id="status" name="status" class="easyui-textbox"  label="状态：" ></div>
					<div><input id="lineGroupCode" name="lineGroupCode" class="easyui-textbox"  label="班次编号： "></div>
					<div><input id="demandCombinCode" name="demandCombinCode" class="easyui-textbox"  label="需求组合号： "  ></div>
					<div><input id="orderCombinCode" name="orderCombinCode" class="easyui-textbox"  label="订单组合号： "  ></div>
					<div><input id="abnormalState" name="abnormalState" class="easyui-textbox"  label="是否有异常： "   ></div>
					<div><input id="demandType" name="demandType" class="easyui-textbox"  label="需求模式： "   ></div>
					<div><input id="businessMode" name="businessMode" class="easyui-textbox"  label="业务模式： " ></div>
					<div>
					   <input id="executeBeginTime" name="startTime" class="easyui-datebox"  label="运力上报有效期 "   labelwidth="140"   data-options="prompt:'请输入开始日期'"">&nbsp至&nbsp
					   <input id="executeEndTime" name="endTime" class="easyui-datebox"    data-options="prompt:'请输入截止日期'">
					</div>
					<div class="fr">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="queryDeparture()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="rest()">重置</a>
					</div>
				</form>
            </div>
        </div>
    </div>
	
	<div style="height: 300px;overflow:auto">
	<table id="departGrid"  data-options="fit:true, fitCloumns: true,nowrap: true"></table>
	</div>
	<div style="height: 300px;">
	<table id="departDetailGrid" data-options="fit:true"></table>
	</div>
	
	<!-- begin dialog begin-->
	<!-- begin dialog  pladn  begin-->
	<div id="dlgPlan" class="easyui-dialog" data-options="buttons:'#divPlanBtn'"  style="width:400px;height:200px" closed="true">
		<div class="easyui-accordion"  style="height:100%" >			
			<div class="search-form datagrid-toolbar">
				<form id="formDlgPlan" style="float:left; margin: 5px auto;" action="#" method="post">
				<input id="id" name='id' type="hidden" />
				<div><input id="fmstatus" name="status"  class="easyui-textbox"  label="状态: "    labelWidth="115px"   /></div>
				</form>
			</div>
		</div>
	</div>
	<!-- begin dialog  pladn  end-->
	<!-- begin dialog  pladn  begin-->
	<div id="dlgPlanDetail" class="easyui-dialog" data-options="buttons:'#divPlanDetailBtn'"  style="width:400px;height:200px" closed="true">
		<div class="easyui-accordion"  style="height:100%" >			
			<div class="search-form datagrid-toolbar">
				<form id="formDlgPlanDetail" style="float:left; margin: 5px auto;" action="#" method="post">
				<input id="id" name='id' type="hidden" />
				<div><input id="fmplanDriverStatus" name="planDriverStatus"  class="easyui-textbox"  label="网点端状态: "   labelWidth="115px"  /></div>
				<div><input id="fmplanSiteStatus" name="planSiteStatus"  class="easyui-textbox"  label="司机端状态: "    labelWidth="115px"  /></div>
				</form>
			</div>
		</div>
	</div>
	<!-- begin dialog  pladn  end-->
	<!--button-->
	<div id="divPlanBtn">
		<a href="#" class="easyui-linkbutton save" onclick="savePlan()">保存</a>
		<a href="#" class="easyui-linkbutton cancel" onclick="$('#dlgPlan').window('close')">关闭</a>
	</div>
		<!--button-->
	<div id="divPlanDetailBtn">
		<a href="#" class="easyui-linkbutton save" onclick="savePlanDetail()">保存</a>
		<a href="#" class="easyui-linkbutton cancel" onclick="$('#dlgPlanDetail').window('close')">关闭</a>
	</div>
	<!-- begin dialog  pladn  end-->
</div>
</body>
</html>