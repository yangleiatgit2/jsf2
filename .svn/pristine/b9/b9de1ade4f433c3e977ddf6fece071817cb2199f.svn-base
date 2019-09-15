<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
	<%@include file="../component/common.jsp"%>
	<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/departurePlan/departurePlan.js"></script>
	<title>发车计划管理</title>
	<script type="text/javascript">
		//获取当前用户信息
		var cmsOrgType = "${sessionScope.CURRENT_USER.cmsOrgType}";
		var cmsBaseOrgCode = "${sessionScope.CURRENT_USER.cmsBaseOrgCode}";
		var cmsOrgCode = "${sessionScope.CURRENT_USER.cmsOrgCode}";
	</script>	
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
			<div class="search-form datagrid-toolbar">
				<form action="#" id="departureForms" action="#" style="float:left;margin:0 auto;">
				    <input name='pageQuery' type="hidden">
					<div><input id="drivingPlanCode" name="drivingPlanCode" class="easyui-textbox" labelwidth="120px"   label="发车计划编号： "   data-options="prompt:'请输入关键字'"></div>
					<div><input id="startOrgCode" name="startOrgCode" class="easyui-textbox"  label="始发站 "   data-options="prompt:'请选择机构'"></div>
					<div><input id="endOrgCode" name="endOrgCode" class="easyui-textbox"  label="目的站： "   data-options="prompt:'请选择机构'"></div>
					<div><input id="lineGroupCode" name="lineGroupCode" class="easyui-textbox"  label="班次编号：" ></div>
					<div><input id="status" name="status" class="easyui-textbox"  label="状态：" ></div>
					<div><input id="demandCombinCode" name="demandCombinCode" class="easyui-textbox" labelwidth="120px"   label="需求组合号： "  ></div>
					<div><input id="orderCombinCode" name="orderCombinCode" class="easyui-textbox" labelwidth="100px"  label="订单组合号： "  ></div>
					<div><input id="abnormalState" name="abnormalState" class="easyui-textbox" labelwidth="100px"  label="是否有异常： "   ></div>
					<div><input id="demandType" name="demandType" class="easyui-textbox"  label="需求模式： "   ></div>
					<div><input id="businessMode" name="businessMode" class="easyui-textbox"  label="业务类型： " ></div>
					<div>
					   <input id="executeBeginTime" name="startTime" class="easyui-datebox" labelwidth="120px" label="出发时间："    data-options="prompt:'请输入开始日期'"">&nbsp至&nbsp
					   <input id="executeEndTime" name="endTime" class="easyui-datebox"    data-options="prompt:'请输入截止日期'">
					</div>
					<div class="fr">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="queryDeparture()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="rest()">重置</a>
					</div>
				</form>
            </div>
        </div>
    
        <!-- 表单操作按钮 -->
       <div class="toolbar-margin"> 
			<!-- <a href="#" class="easyui-linkbutton " data-options="iconCls:'iconfont uce-edit',plain:true"  onclick="updateDeparturePlan()">编辑</a> 
			<a href="#" class="easyui-linkbutton " data-options="iconCls:'iconfont uce-car',plain:true" onclick="startdeparturePlan()">发车执行</a> 
			<a href="#" class="easyui-linkbutton " data-options="iconCls:'iconfont uce-upload',plain:true" onclick="reportException()">异常上报</a>
			<a href="#" class="easyui-linkbutton " data-options="iconCls:'iconfont uce-stop',plain:true" onclick="stopDeparturePlan()">终止发车计划</a>-->		
			<a href="#" class="easyui-linkbutton " data-options="iconCls:'iconfont uce-export',plain:true" onclick="zzbc()">导出</a>	
        </div>
    </div>
	
	<div style="height: 300px;overflow:auto">
	<table id="departGrid"  data-options="fit:true, fitCloumns: true,nowrap: true"></table>
	</div>
	<div style="height: 300px;">
	<table id="departDetailGrid" data-options="fit:true"></table>
	</div>
	
	<!-- begin dialog -->
		<div id="insertDialog" class="easyui-dialog" data-options="buttons:'#divLineBtn'"   style="width:1060px;height:790px;" resizeble=false  closed="true">		
		<div class="easyui-accordion ">			
			<div class="search-form datagrid-toolbar">
				<form id="formLine" style="float:left; margin: 20px auto;" method="#">
					<input name='id' type="hidden">
					<input name='startOrgName' type="hidden">
					<input name='endOrgName' type="hidden">
					<div><input id="drivingPlanCode" name="drivingPlanCode"  class="easyui-textbox"  label="发车计划编号："  style="width:300px;" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="drivingPlanName" name="drivingPlanName" class="easyui-textbox"  label="发车计划名称："  style="width:300px;" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="form-status" name="status"  class="easyui-textbox"  label="状态："  style="width:300px;" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="departTime" name="departTime" class="easyui-datetimebox"  label="发车时间: "style="width:300px;" required="true"  labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="arrivalTime" name="arrivalTime" class="easyui-datetimebox"  label="到达时间： " style="width:300px;"required="true" labelWidth="130px" data-options="readonly:true"></div> 
					<div><input id="runningTime" name="runningTime" class="easyui-numberbox"  label="运行时间： " style="width:300px;"required="true" labelWidth="130px" data-options="readonly:true"></div>
					
					<div><input id="form-startOrgCode" name="startOrgName" class="easyui-textbox"  label="始发站："  style="width:300px;" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="form-endOrgCode" name="endOrgName" class="easyui-textbox"  label="目的站："  style="width:300px;" labelWidth="130px" data-options="readonly:true"></div>
<!-- 					<div><input id="quotePrice" name="quotePrice" class="easyui-textbox"  label="报价： " style="width:300px;"required="true" labelWidth="130px" data-options="readonly:true"></div> -->
					<div><input id="dirverName" name="dirverName" class="easyui-textbox"  label="司机： " style="width:300px;"required="true" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="plateNumber" name="plateNumber" class="easyui-textbox"  label="车辆： " style="width:300px;"required="true" labelWidth="130px" data-options="readonly:true"></div>			
<!-- 					<div><input id="costPrice" name="costPrice" class="easyui-numberbox"  label="成本价： "style="width:300px;" required="true" labelWidth="130px" data-options="readonly:true"></div> -->
					<div><input id="form-carType" name="carType"  class="easyui-textbox"   label="车型："  style="width:300px;" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="loadingRate" name="loadingRate" class="easyui-textbox"  label="装载率(%)： "style="width:300px;" required="true" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="form-demandType" name="demandType"  class="easyui-textbox"  label="需求类型："  style="width:300px;" labelWidth="130px" data-options="readonly:true"></div>
					
					<div><input id="haoshi" name="haoshi"  class="easyui-numberbox"  label="班次总耗时：" style="width:300px;" labelWidth="130px" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="lineGroupTotalVolume" name="lineGroupTotalVolume" class="easyui-numberbox"  label="班次总量体积： "style="width:300px;" required="true"  labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="lineGroupTotalWeight" name="lineGroupTotalWeight" class="easyui-numberbox"    label="班次货量总质量 " style="width:300px;"required="true" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="lineGroupDistance" name="lineGroupDistance" class="easyui-numberbox"   label="班次总里程" style="width:300px;"required="true" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="blowFlag" name="blowFlag"  class="easyui-textbox"  label="调整类型："  style="width:300px;" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="demandCombinCode" name="demandCombinCode"  class="easyui-textbox"   label="需求组合号：" style="width:300px;" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="orderCombinCode" name="orderCombinCode" class="easyui-textbox"   label="订单组合号： "style="width:300px;" required="true" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="lineGroupCode" name="lineGroupCode" class="easyui-textbox"   label="对应班次号： "style="width:300px;" required="true" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="Exception" name="orderCombinCode" class="easyui-textbox"  label="运输异常编号： "style="width:300px;" required="true" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="form-businessMode" name="businessMode" class="easyui-textbox"  label="业务模式：" style="width:300px;"required="true" labelWidth="130px"  data-options="readonly:true"></div>
				</form>
			</div>
		</div>
		<div id="divLineBtn1" style="text-align: left;">	
<!-- 		<a href="#" class="easyui-linkbutton save" onclick="append()">新增</a> -->
<!-- 		<a href="#" class="easyui-linkbutton cancel" onclick="removeit()">删除</a> -->
	</div>

		<div data-options="fit:true" style="height: 180px; hidden="true"  id="showUpdateGrid"">
	<table id="updateWorkGrid" data-options="fit:true"></table>
	</div>
	<div id="divLineBtn">	
<!-- 		<a href="#" class="easyui-linkbutton save" onclick="saveLine()">保存</a> -->
		<a href="#" class="easyui-linkbutton cancel" onclick="closeLine()">取消</a>
	</div>
	</div>


<!-- end dialog -->

	
	
			<div id="updateDeparturePlan" class="easyui-dialog" data-options="buttons:'#deparTurePlanupdate'"   style="width:1060px;height:2	00px;" resizeble=false  closed="true">	
					<div class="easyui-accordion ">			
			<div class="search-form datagrid-toolbar">
				<form id="planFrom" style="float:left; margin: 20px auto;" method="#">
					<div><input id="driverPhone" name="driverPhone" class="easyui-combobox"  label="司机"   style="width:300px;"required="true" labelWidth="130px" >
					   </input>

					</div>
					<div><input id="plateNumber" name="plateNumber" class="easyui-combobox"  label="车辆" style="width:300px;"required="true" labelWidth="130px" ></div>
					<input id="id" name="id"  type ="hidden">
				</form>
			</div>
	<div id="deparTurePlanupdate">	
		<a href="#" class="easyui-linkbutton save" onclick="updatedeparTurePlan()">保存</a>
		<a href="#" class="easyui-linkbutton cancel" onclick="javascript:$('#updateDeparturePlan').window('close')">取消</a>
	</div>
		</div>
			
			</div>
			
			
					<div id="departureException" class="easyui-dialog" data-options="buttons:'#planException'"   style="width:1060px;height:2	00px;" resizeble=false  closed="true">	
					<div class="easyui-accordion ">			
			<div class="search-form datagrid-toolbar">
				<form id="exceptionForm" style="float:left; margin: 20px auto;" method="#">
					<div>
					<div><input id="excepType" name="excepType"  class="easyui-textbox"  label="异常状态：" data-options="editable:false" style="width:300px;" labelWidth="130px"></div>
					</div>
					<div>
					<input id="reason" name="reason"  data-options="multiline:true,required:true,validType:'length[1,20]'"  class="easyui-textbox"  label="异常信息" maxlength="255" style="height:200px;width:200px"required="true" labelWidth="130px" >
					</div>
				</form>
			</div>
	<div id="planException">	
		<a href="#" class="easyui-linkbutton save" onclick="saveException()">保存</a>
		<a href="#" class="easyui-linkbutton cancel" onclick="closeDeparture()">取消</a>
	</div>
</div>
</div>
</body>
</html>