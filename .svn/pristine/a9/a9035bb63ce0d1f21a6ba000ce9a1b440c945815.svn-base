<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
	<%@include file="../component/common.jsp"%>
	<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/workScheduleRule/workScheduleRule.js"></script>
	<title>班次管理</title>
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
	<div id="workCont" class="datagrid-toolbar">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="workForm" action="#" style="float:left;margin:0 auto;">
				<input name='pageQuery' type="hidden">
					<div><input id="lineGroupCode" name="lineGroupCode" class="easyui-textbox"  label="班次编号： "   data-options="prompt:'请输入关键字'"></div>
					<div><input id="startOrgCode" name="startOrgCode" class="easyui-textbox"  label="始发站："   data-options="prompt:'请选择机构'"></div>
					<div><input id="endOrgCode" name="endOrgCode" class="easyui-textbox"  label="目的站： "  data-options="prompt:'请输入关键字'"></div>
					<div><input id="status" name="status" class="easyui-textbox"  label="班次状态： "   data-options="prompt:'请输入关键字'"></div>
					<div><input id="businessMode" name="businessMode" class="easyui-textbox"  label="业务模式： "   data-options="prompt:'请输入关键字'"></div>
					<div><input id="drivingPlanCombinCode" name="drivingPlanCombinCode" class="easyui-textbox"  label="发车计划编号： "   data-options="prompt:'请输入关键字'"></div>
					<div><input id="requiCombinCode" name="requiCombinCode" class="easyui-textbox"  label="需求组合号： "   data-options="prompt:'请输入关键字'"></div>
					<div><input id="orderCombinCode" name="orderCombinCode" class="easyui-textbox"  label="订单组合号： "   data-options="prompt:'请输入关键字'"></div>
					<div><input id="resource" name="resource" class="easyui-textbox"  label="班次来源： "   data-options="prompt:'请输入关键字'"></div>
					<div class="fr">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findWorkScheduleRule()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetIAConf()">重置</a>
					</div>
                </form>   
            </div>   
        </div>
        <!-- 表单操作按钮 -->
       <div class="toolbar-margin"> 
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-car',plain:true"   onclick="departurePlan()">生成发车计划</a>
			<a href="#" class="easyui-linkbutton" iconCls="iconfont uce-stop"  data-options="plain:true" onclick="stopShift()">终止班次</a>		
        </div>
    </div>
    <div>
	<table id="workList" class="easyui-datagrid" ></table>
	
	<table id="workListDetail" class="easyui-datagrid" ></table>
	</div>
	<!-- begin dialog -->
		<div id="insertDialog" class="easyui-dialog" data-options="buttons:'#divLineBtn'"   style="width:1060px;height:800px;" resizeble=false  closed="true">		
		<div class="easyui-accordion ">			
			<div class="search-form datagrid-toolbar">
				<form id="formLine" style="float:left; margin: 20px auto;" method="#">
					<input name='id' type="hidden">
					<input name='startOrgName' type="hidden">
					<input name='endOrgName' type="hidden">
					<div><input id="lineGroupCode" name="lineGroupCode"  class="easyui-textbox"  label="班次编号"  style="width:300px;" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="lineGroupName" name="lineGroupName" class="easyui-textbox"  label="班次名称："  style="width:300px;" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="form-status" name="status"  class="easyui-textbox"  label="班次状态："  style="width:300px;" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="departTime" name="departTime" class="easyui-datetimebox"  label="出发时间: "style="width:300px;" required="true"  labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="arrivalTime" name="arrivalTime" class="easyui-datetimebox"  label="到达时间： " style="width:300px;"required="true"  labelWidth="130px" data-options="readonly:true"></div> 
					<div><input id="runningTime" name="runningTime" class="easyui-numberbox"  label="运行时间： " style="width:300px;"required="true"  labelWidth="130px" data-options="readonly:true"></div>
					
					<div><input id="lineGroupDistance" name="lineGroupDistance"  class="easyui-numberbox"  label="路线距离："  style="width:300px;" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="form-startOrgCode" name="startOrgName"  class="easyui-textbox" label="始发站："  style="width:300px;" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="form-endOrgCode" name="endOrgName"  class="easyui-textbox"  label="目的站："  style="width:300px;" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="form-requiType" name="requiType"  class="easyui-textbox"  label="需求类型："  style="width:300px;" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="costPrice" name="costPrice" class="easyui-numberbox"  label="成本价： "style="width:300px;" required="true" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="sellingPrice" name="sellingPrice" class="easyui-textbox"  label="报价： " style="width:300px;"required="true" labelWidth="130px" data-options="readonly:true"></div>
					
					
					<div><input id="totalTime" name="totalTime"  class="easyui-numberbox"  label="班次总耗时：" style="width:300px;" labelWidth="130px" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="totalVolume" name="totalVolume" class="easyui-numberbox"   label="班次总量体积： "style="width:300px;" required="true"  labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="totalWeight" name="totalWeight" class="easyui-numberbox"   label="班次货量总质量 " style="width:300px;"required="true" labelWidth="130px" data-options="readonly:true"></div>
				
					<div><input id="chargeStartTime" name="chargeStartTime" class="easyui-datetimebox"  label="计费时间起： "style="width:300px;" required="true"  labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="chargeEndTime" name="chargeEndTime" class="easyui-datetimebox"  label="计费时间止： " style="width:300px;"required="true"  labelWidth="130px" data-options="readonly:true"></div> 
					

					<div><input id="adjustPrice" name="adjustPrice" class="easyui-numberbox"  label="调整后价格： " style="width:300px;"required="true" labelWidth="130px" data-options="readonly:true"></div>
						<div><input id="requiCombinCode" name="requiCombinCode"  class="easyui-textbox"   label="需求组合号：" style="width:300px;" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="orderCombinCode" name="orderCombinCode" class="easyui-textbox"   label="订单组合号： "style="width:300px;" required="true" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="drivingPlanCombinCode" name="drivingPlanCombinCode" class="easyui-textbox"  label="发车计划号： " style="width:300px;"required="true" labelWidth="130px" data-options="readonly:true"></div>
						<div><input id="adjustType" name="adjustType"  class="easyui-textbox"  label="调整类型：" style="width:300px;" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="form-resource" name="resource" class="easyui-textbox"  label="班次来源" style="width:300px;" required="true" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="form-carType" name="carType" class="easyui-textbox"  label="车型："  style="width:300px;"required="true"labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="loadFactor" name="loadFactor" class="easyui-textbox"  label="满载率(%)： "style="width:300px;" required="true" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="form-lineGroupType" name="lineGroupType" class="easyui-combobox"  label="班次类型："  style="width:300px;"required="true" labelWidth="130px" data-options="readonly:true"></div>
					<div><input id="form-businessMode" name="businessMode" class="easyui-combobox"  label="业务模式：" style="width:300px;"required="true" labelWidth="130px" data-options="readonly:true"></div>
				</form>
			</div>
		</div>
<!-- 		<div id="divLineBtn1" style="text-align: left;">	 -->
<!-- 		<a id="btnAddWorkScheduleRule" href="#" class="easyui-linkbutton save" onclick="append()">新增</a> -->
<!-- 		<a id="" href="#" class="easyui-linkbutton cancel" onclick="removeit()">删除</a> -->
<!-- 	</div> -->
	<div style="height: 140px;" id="insertWorkGrid">
		<table id="insertWorkDetail"></table>
<!-- 	<table id="insertWorkDetail" class="easyui-datagrid" -->
<!-- 						data-options="fit:true,iconCls: 'icon-edit'"> -->
<!-- 						<thead> -->
<!-- 							<tr> -->
<!-- 								<th checkbox="true" data-options="field:'ck',width:40">序号</th> -->
<!-- 								<th -->
<%-- 									data-options="field:'wayPointName',width:150, --%>
<!-- 			             				formatter:function(value,row){return row.orgName;}, -->
<!-- 			             				align:'center', -->
<!-- 			            				editor:{type:'combogrid', -->
<!-- 			               					options:{ -->
<!-- 			               					 panelWidth:300, -->
<!-- 			               					 panelHeight:300, -->
<!-- 							                 idField: 'baseOrgCode', -->
<!-- 							                 textField: 'orgName', -->
<!-- 							                 required:true, -->
<!-- 							                 fitColumns: true, -->
<!--                         					 striped: true, -->
<!--                         					 editable:true,     -->
<!-- 											 pagination: true, -->
<!-- 						                     rownumbers:true, -->
<!-- 						                     collapsible:false, -->
<!-- 											 method:'post', 	 -->
<!-- 											 mode:'remote', -->
<%-- 				                 		     url:'${pageContext.request.contextPath}/cmsOrg/findByCmbgd.do?orgType=30', --%>
<!-- 							                 columns: [[ -->
<!-- 						                        {field:'baseOrgCode',title:'网点编号',width:100}, -->
<!-- 						                        {field:'orgName',title:'网点名称',width:150} -->
<!-- 						                    ]], -->
<!-- 						                    validType:['length[1,50]'] -->
<%-- 			                 				}}">途经站点</th> --%>
<!-- 								<th hidden="true" -->
<!-- 									data-options="field:'id',formatter:formatTip,width:150,align:'center'">id</th> -->
<!-- 								<th  -->
<!-- 									data-options="field:'volume',formatter:formatTip,width:150,align:'center', -->
<!-- 									editor:{ -->
<!-- 										type:'numberbox', -->
<!-- 											options:{ -->
<!-- 												required:true -->
<!-- 		    								} -->
<!-- 										}">货物方数</th> -->
								
<!-- 													<th  -->
<!-- 									data-options="field:'weight',formatter:formatTip,width:150,align:'center', -->
<!-- 									editor:{ -->
<!-- 										type:'numberbox', -->
<!-- 											options:{ -->
<!-- 												required:true -->
<!-- 		    								} -->
<!-- 										}">货物重量(kg)</th> -->
										
<!-- 								<th -->
<!-- 									data-options="field:'endTime',formatter:formatTime,width:150,align:'center', -->
<!-- 									editor:{type:'datetimebox', -->
<!-- 										options:{ -->
<!-- 											editable:false, -->
<!-- 											required:true, -->
<!-- 											onShowPanel:function(){   -->
<!-- 	  										   $(this).datetimebox('spinner').spinner({editable:false}); -->
<!-- 	    									} -->
<!-- 	    								} -->
<!-- 									}">到达时间</th> -->
									
<!-- 								<th  -->
<!-- 									data-options="field:'loadUnloadTime',formatter:formatTip,width:200,align:'center', -->
<!-- 									editor:{ -->
<!-- 										type:'numberbox', -->
<!-- 											options:{ -->
<!-- 												required:true -->
<!-- 		    								} -->
<!-- 										}">装卸货耗时(分钟)</th> -->
<!-- 												<th  -->
<!-- 									data-options="field:'distance',formatter:formatTip,width:150,align:'center', -->
<!-- 									editor:{ -->
<!-- 										type:'numberbox', -->
<!-- 											options:{ -->
<!-- 												required:true -->
<!-- 		    								} -->
<!-- 										}">运行里程</th> -->
										
										
<!-- 															<th  -->
<!-- 									data-options="field:'runingTime',formatter:formatTip,width:150,align:'center', -->
<!-- 									editor:{ -->
<!-- 										type:'numberbox', -->
<!-- 											options:{ -->
<!-- 												required:true -->
<!-- 		    								} -->
<!-- 										}">运行耗时</th> -->
										
<!-- 																	<th  -->
<!-- 									data-options="field:'nextWayDistance',formatter:formatTip,width:200,align:'center', -->
<!-- 									editor:{ -->
<!-- 										type:'numberbox', -->
<!-- 											options:{ -->
<!-- 												required:true -->
<!-- 		    								} -->
<!-- 										}">距离下一站点里程(km)</th> -->
<!-- 							</tr> -->
<!-- 						</thead> -->
<!-- 					</table> -->
	</div>
<!-- 		<div data-options="fit:true" style="height: 300px; hidden="true"  id="showUpdateGrid""> -->
<!-- 	<table id="updateWorkGrid"  data-options="iconCls: 'icon-edit',toolbar: '#divplusminus', -->
<!-- 			                   onClickRow : onClickRow, -->
<!-- 			                 onEndEdit : onEndEdit, -->
<!-- 			                 onBeforeEdit:onBeforeEdit"></table> -->
<!-- 	</div> -->
	<div id="divLineBtn">	
<!-- 		<a id="btnSaveLine" href="#" class="easyui-linkbutton save" onclick="saveLine()">保存</a> -->
		<a href="#" class="easyui-linkbutton cancel" onclick="closeLine()">关闭</a>
	</div>
	</div>

	<div id="departurePlan" class="easyui-dialog datagrid-toolbar" data-options="buttons:'#deparTurePlanSave'" style="width: 620px; height: 190px;" closed="true">
		<div class="easyui-accordion">
			<div class="search-form datagrid-toolbar">
				<form id="planFrom" style="float: left; margin: 20px auto;" method="post" action="#">
					<div><input id="driverPhone" name="driverPhone" class="easyui-combobox" label="司机：" required="true" labelWidth="130px"/></div>
					<div><input id="plateNumber" name="plateNumber" class="easyui-combobox" label="车辆：" required="true" labelWidth="130px"/></div>
				</form>
			</div>
		</div>
	</div>
	<div id="deparTurePlanSave">
		<a href="#" class="easyui-linkbutton save" onclick="savedeparTurePlan()">保存</a> 
		<a href="#" class="easyui-linkbutton cancel" onclick="closeLine()">取消</a>
	</div>
	<!-- end dialog -->
</body>
</html>