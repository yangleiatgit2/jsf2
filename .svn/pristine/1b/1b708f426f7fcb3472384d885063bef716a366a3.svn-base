<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>  
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style type="text/css">
body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;}
#mapView{height:100%;width:80%;float:left;border-right:2px solid #bcbcbc;}
#r-result{height:100%;width:18%;float:left;}
</style>
<title>可视化运输</title>
<link rel="stylesheet" type="text/css" media="screen" href="https://cdn.bootcss.com/ionicons/2.0.1/css/ionicons.min.css">
<link rel="stylesheet" type="text/css" media="screen" href="${pageContext.request.contextPath}/scripts/bkg/visibleTransport/visibleTransport.css">
<%@include file="../component/common.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/visibleTransport/visibleTransport.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/visibleTransport/baiduApi.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/visibleTransport/addGroupLine.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=${systemConfig.configValue}"></script>  
<script>
	var cmsOrgType = "${sessionScope.CURRENT_USER.cmsOrgType}";
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
	.icon {
        font-size: 20px;
        vertical-align:-2px;
        text-align:center;
	}
    .suspendDiv{ width: 280px; height: 540px;overflow:auto; background: red; position: absolute; right: 5px; top: 133px; border: 1px solid #C7C7C7; background: #FFF; z-index: 3 ;}
	.exceptionOperationDiv{width: 3px; height: 0px; background: red; position: absolute; right: 5px; top: 132px; border: 1px solid #EEE9E9; background: #FFF; z-index: 3; display:none;}
</style>
</head>
<body>
	<!-- begin pageview -->
	<div id="tlbVisibleTransport">
		<div class="easyui-accordion">	
			<div class="search-form">
				<form id="formVisibleTransport" action="#" style="float:left;margin:0 auto;" method="post">
					<div><input id="drivingPlanCode" name="drivingPlanCode" class="easyui-textbox" label="发车计划号: " labelwidth="100" data-options="prompt:'请输入发车计划号',validType:['length[1,15]','drivingPlanCode']" ></div>
					<div><input id="groupCenterCode" name="groupCenterCode" class="easyui-textbox" label="分拨中心: " data-options="prompt:'请输入分拨中心'"></div>
					<div><input id="dotNameCode" name="dotNameCode" class="easyui-textbox" label="站点名称: " labelwidth="100" data-options="prompt:'请输入网点名称'"></div>
					<div>
						<input id="carSimpleName" name="carSimpleName"  required="true" class="easyui-combobox frontNumber"    label="车牌号: " labelWidth="130px"  data-options="prompt:'',editable:false,onShowPanel:showPanel">
						<input id="carName" name="carName" class="easyui-textbox carNumberAfter" labelWidth="130px"  data-options="validType:['carCode'],prompt:'请输入车牌号'" />
					</div>
					<div><input id="carBelongType" name="carBelongType" class="easyui-textbox" label="车辆所属: " data-options="prompt:'请输入车辆所属'"></div>
					<div class="fr" style="float:right">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findVisibleTransport()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetVisibleTransport()">重置</a>
			    	</div>
			    	<input type="hidden" id="carSimple" name="carSimple">
				</form>
			</div>
		</div>
	</div>
	<!-- begin table -->
	<div id="bottomDiv" class="easyui-layout" style="width:100%;height:85%;" >
		<div data-options="region:'south',split:true" style="height:100%;">
			<div class="easyui-layout" data-options="fit:true">   
	            <div id="excepList" data-options="region:'west' " style="width:17%">
	            	<c:forEach items="${requestScope.exceptionList }" var="el">
	            		<div  class="easyui-panel" style="margin-top: 1px;margin-left: 3px">
	            			<div style="padding:3px;margin-left: 26px;margin-top: 5px;"><fmt:formatDate value="${el.createTime }" pattern="yyyy-MM-dd HH:mm"/></div>
	            			<div style="padding:3px;"><i class="icon ion-ios-list-outline" style="margin-left: 4px;" ></i>
		            			<a href="#" onclick="messageDetail('${el.startTrunkCode }')" >&nbsp异常编号：${el.exceptionCode }</a></div>
		            		<div style="padding:3px;">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp发车计划：<a href="#" onclick="exceptionDetailed('${el.startTrunkCode }','${el.exceptionCode }')" >${el.startTrunkCode }</a></div>
	            			<div style="padding:3px;margin-left: 26px;float:left"><font color="red">${el.exceptionTypeName }</font></div>
	            			<div style="padding:3px;margin-left: 120px"> <a href="#" onclick="messageDetail('${el.startTrunkCode }')" style="margin-right: 20px"><font color="blue">消息详情></font></a></div>
	            		</div>
   					</c:forEach>
	            </div>   
	            <div data-options="region:'east'" style="width:83%;">
	            	<div class="easyui-layout" data-options="fit:true">  
	            		 <div data-options="region:'north'" style="height:5%;">
	            		 	<div style="float:right">
							<form action="" method="get"> 
								<label ><input name="Fruit" type="radio" value="allSit" />显示所有网点</label> 
								<label ><input name="Fruit" type="radio" value="allCar" />显示所有车辆 </label> 
								<label ><input name="Fruit" type="radio" value="viewGroupCenter" />显示分拨中心 </label> 
								<label ><input name="Fruit" type="radio" value="delayCar" />显示延误的车辆 </label> 
								<label ><input name="Fruit" type="radio" value="exceptionCar" />显示异常的车辆 </label> 
							</form> 
							</div>
	            		 </div>  
	            		 <div id="mapView" data-options="region:'south'" style="height:95%"></div>  
	            	</div>
	            </div>   
        	</div> 
		</div>   
	</div>	
	<!-- end table -->
	<!-- 悬浮div--begin -->
	<div id="suspendId" class="suspendDiv easyui-tabs">
			<div title="首页" style="padding:0px;display:none;">   
				<div id="exceptionOptAreaDiv" class="easyui-panel" style="margin-bottom: 3px">
					<div  style="padding:5px;">
						<img alt="" src="${pageContext.request.contextPath}/icons/quick.png" style="vertical-align:middle;text-align:right;"/>
						<font style="">异常操作区</font> </br>
						<div style="padding:3px;">
							<input id="btnExceptionReport" class="easyui-linkbutton" disabled="true" style="width: 70px;height: 30px" value="上报异常" onclick="exceptionReport()"> 
							<input id="btnExceptionConfirm" class="easyui-linkbutton" disabled="true" style="width: 70px;height: 30px" value="确认异常" onclick="exceptionConfirm()"> 
							<input id="btnExceptionBack" class="easyui-linkbutton" disabled="true"style="width: 70px;height: 30px" value="异常打回" onclick="exceptionBack()">
						</div>
						<div style="padding:3px;">
							<input id="btnOpenExceptionSummary" class="easyui-linkbutton" disabled="true" style="width: 70px;height: 30px" value="异常小结" onclick="openExceptionSummary()"> 
							<input id="btnAddNeed" class="easyui-linkbutton" disabled="true" style="width:70px;height: 30px" value="新增需求" onclick="newAddPlanOrDemand('demand')">
							<input id="btnStopDrivePlan" class="easyui-linkbutton" disabled="true" style="width: 100px;height: 30px" value="终止发车计划" onclick="stopDrivePlan()">
						</div>
					</div>
				</div>
				<div id="hightOptAreaDiv" class="easyui-panel" style="margin-bottom: 3px">
					<div style="padding:5px;">
					    <img alt="" src="${pageContext.request.contextPath}/icons/quick.png" style="vertical-align:middle;text-align:right;">
					    <font style="">高级操作区</font></br>  
					    <div style="padding:3px;">
					    	<input id="btnStopLineGroup" class="easyui-linkbutton" disabled="true" style="width: 70px;height: 30px" value="终止班次" onclick="stopLineGroup()"> 
					    </div> 
					    <div style="padding:3px;">
						    <input id="btnRetiesDrivePlan" class="easyui-linkbutton" disabled="true" style="width: 90px;height: 30px" value="重绑发车计划" onclick="retiesDrivePlan()"> 
						    <input id="btnNewLineGroup" class="easyui-linkbutton" disabled="true" style="width: 90px;height: 30px" value="新增发车计划" onclick="newAddPlanOrDemand('startPlan')"> 
					    </div>
				    </div>
				</div>
				<div id="divExceptionArea" class="easyui-panel" style="margin-bottom: 3px">
					<div style="padding:8px;">
						<div style="padding:3px;"><font>当前异常&nbsp&nbsp</font><input id="btnWaitHandle" class="easyui-linkbutton"  style="width: 70px;height: 30px;background-color: #5CACEE;color:#FFFFFF"  ></div>
						<div style="padding:3px;">
							<ul style="height: 20px">
							<li style="float: left; ">异常编号：</li>
							<li id="exceptionCodeLi"></li>
							</ul>
						</div>
						<div style="padding:3px;">
							<ul>
							<li id="exceptionTypeLi" style="float: left; "></li>
							<li><a href="#" onclick="messageDetail()">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<font color="blue">详情></font></a>
							</li>
							</ul>
						</div>
					</div>
				</div>
            	<div class="easyui-panel" style="margin-bottom: 3px">
            		<div style="padding:8px;">
            			 <div style="padding:3px;">
						     <ul style="height: 25px">
						     	<li style="float: left; "><img alt="" src="${pageContext.request.contextPath}/icons/write_info.png" style="vertical-align:middle;text-align:center;margin-top: -6px"></li>
						     	<li style="float: left; ">概括信息</li>
						     	<li id="drinverPlanStatusLi" style="text-align: center;"></li>
						     </ul>
					     </div>
					     <div style="padding:3px;">
					    	<ul style="height: 20px">
					    		<li style="float: left; ">发车计划单号：</li>
					    		<li id="drivingPlanCodeLi"></li>
					    	</ul>
					     </div>
					     <div style="padding:3px;">
					    	<ul style="height: 20px">
					    		<li style="float: left; ">班次单号：</li>
					    		<li id="classCodeLi"></li>
					    	</ul>
					    </div>
					    <div id="milesDiv" style="padding:3px;"></div>
					    <div style="padding:3px;margin-top: 5px" >
					    	<ul style="height: 20px">
					    		<li style="float: left;"><img alt="" src="${pageContext.request.contextPath}/icons/start.png" style="vertical-align:middle;text-align:right;margin-top: -5px" /></li>
					    		<li id="startLi"></li>
					    	</ul>
					    </div>
					    <div style="padding:3px;margin-top: 5px">
					    	<ul style="height: 20px">
					    		<li style="float: left;"><img alt="" src="${pageContext.request.contextPath}/icons/through.png" style="vertical-align:middle;text-align:right;margin-top: -5px"></li>
					    		<li id="throughLi"></li>
					    	</ul>
					    </div>
					    <div style="padding:3px;margin-top: 5px">
					    	<ul style="height: 20px">
					    		<li style="float: left;"><img alt="" src="${pageContext.request.contextPath}/icons/end.png" style="vertical-align:middle;text-align:right;margin-top: -5px"></li>
					    		<li id="endLi"></li>
					    	</ul>
					    </div>
            		</div>
            	</div>
    		</div>   
		    <div title="时间轴" data-options="closable:false" style="overflow:auto;padding:0px;display:none;">   
		        <div class="easyui-panel" style="margin-bottom: 3px">
            		<div style="padding:8px;">
            			 <img alt="" src="${pageContext.request.contextPath}/icons/time_axis.png" style="vertical-align:middle;text-align:right;">
					    <font style="">时间轴</font></br>  
            		</div>
            	</div> 
		    </div>   
		    <div title="司机信息" data-options="" style="padding:20px;display:none;">   
		       <div>
			       	<ul style="height: 25px">
			       		<li style="float: left; ">司机姓名：</li>
			       		<li id="vehicleNameLi"></li>
			       	</ul>
		       	</div>
		       	<div>
			       	<ul style="height: 25px">
			       		<li style="float: left; ">车牌号：</li>
			       		<li id="vehicleNoLi"></li>
			       	</ul>
		       	</div>
		       	<div>
			       	<ul style="height: 25px">
			       		<li style="float: left; ">手机号：</li>
			       		<li id="phoneNunberLi"></li>
			       	</ul>
		       	</div>
		       	<div>
			       	<ul style="height: 25px">
			       		<li style="float:left">所属方：</li>
			       		<li id="belongToLi">优速</li>
			       	</ul>
		       <!-- 	<ul style="margin-top: 4px">
		       		<li style="float:left">营运证号：</li>
		       		<li>22222</li>
		       	</ul>
		       	 <ul style="margin-top: 4px">
		       		<li style="float:left">通行证号：</li>
		       		<li>22222</li>
		       	</ul> -->
		       </div>
		       
		    </div>   
	        <div title="分拨中心信息" data-options="" style="padding:20px;display:none;"> 
	        	<div>
			       	<ul style="height: 25px">
			       		<li style="float: left; ">名称：</li>
			       		<li id="operaterCenterLi"></li>
			       	</ul>
		       </div>
		       <div>
			       	<ul style="height: 25px">
			       		<li style="float: left; ">地址：</li>
			       		<li id="operaterAdressLi"></li>
			       	</ul>
		       </div>
		       <div>
			       	<ul style="height: 25px">
			       		<li style="float: left; ">联系电话：</li>
			       		<li id="operaterPhoneLi"></li>
			       	</ul>
		       </div>
	        </div>
		    <div title="网点信息" data-options="" style="padding:20px;display:none;">   
			    <div>
			       	<ul style="height: 25px">
			       		<li style="float: left; ">网点名称：</li>
			       		<li id="sitLi"></li>
			       	</ul>
		       </div>
		       <div>
			       	<ul style="height: 25px">
			       		<li style="float: left; ">地址：</li>
			       		<li id="adressLi"></li>
			       	</ul>
		       </div>
		       <div>
			       	<ul style="height: 25px">
			       		<li style="float: left; ">有效时间：</li>
			       		<li id="effectiveBeginTimeLi"></li>
			       	</ul>
		       </div>
		       <div>
			       	<ul style="height: 25px">
			       		<li style="float: left; ">有效截止时间：</li>
			       		<li id="effectiveEndTimeLi"></li>
			       	</ul>
		       </div>
		       <div>
			       	<ul style="height: 25px">
			       		<li style="float: left; ">本月上报的货量总方数：</li>
			       		<li id="totalAmountLi"></li>
			       	</ul>
		       </div>
		       <div>
			       	<ul style="height: 25px">
			       		<li style="float: left; ">目前已完成的货量总方数：</li>
			       		<li id="completeTotalAmountLi"></li>
			       	</ul>
		       </div>
		   </div>
	</div>
	<div id="exceptionOperationId" class="exceptionOperationDiv" >
		<img alt="" src="${pageContext.request.contextPath}/icons/map_close.png" herf="javascript:void(0);" onclick='viewException();' />
	</div>
	<!-- 悬浮div--end -->
	<!-- 异常上报Win -->
    <div id="exceptionReportWin"  title="异常上报"  style="display: none;">
    	<div style="margin-top: 20px;width: 380px">
    		<form id="reportForm" action="">
    		<div >
    			<input id="exceptionType" name="exceptionType" class="easyui-textbox" label="异常类型: " labelwidth="100" style="width: 250px" data-options="prompt:'请输入异常类型',validType:['length[1,15]','exceptionType'], required: true" >
    		</div >
    		<div style="margin-top: 5px">
    			<input id="exceptionInfo" name="exceptionInfo" class="easyui-textbox" label="异常内容: " labelwidth="100" style="width: 370px;height: 120px" data-options="prompt:'请输入异常内容',validType:['length[1,500]','exceptionInfo',],multiline:true,required: true" >
    		</div>
    		</form>
    	</div>
    	<div  style="padding: 5px; margin-left: 100px;margin-top: 20px">
        	<a href="#" class="easyui-linkbutton save" onclick="saveExceptionReport()">保存</a> 
        	<a href="#" class="easyui-linkbutton cancel" onclick="javascript:$('#exceptionReportWin').window('close')">取消</a>
        </div>
    </div>  
    <!-- 异常小结win -->
    <div id="exceptionSummaryWin"  title="异常处理方案" style="display: none;">
    	<div style="margin-top: 20px;width: 360px">
    		<form id="exceptionSummaryForm">
    		<div style="margin-top: 5px">
    			<input id="exceptionHandle" name="exceptionHandle" class="easyui-textbox" label="异常内容: " labelwidth="100" style="width: 350px;height: 120px" data-options="prompt:'请输入异常处理的解决方案',validType:['length[1,500]','exceptionHandle',],multiline:true,required: true" >
    		</div>
    		</form>
    	</div>
    	<div  style="padding: 5px; margin-left: 140px;margin-top: 20px">
    		<a href="#" class="easyui-linkbutton clean"  onclick="cleanHandle()">清空</a>
    		<a href="#" class="easyui-linkbutton add"  onclick="saveExceptionSummary('temp')">暂存</a>
        	<a href="#" class="easyui-linkbutton save"  onclick="saveExceptionSummary('submit')">提交</a> 
        </div>
    </div>  
    <!-- 重绑发车计划dialog -->
	<div id="updateDeparturePlan" class="easyui-dialog" data-options="buttons:'#deparTurePlanupdate'"   style="width:800px;height:2	00px;" resizeble=false  closed="true">	
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
				<a href="#" class="easyui-linkbutton save" onclick="submitRetiesDrivePlan()">保存</a>
				<a href="#" class="easyui-linkbutton cancel" onclick="javascript:$('#updateDeparturePlan').window('close')">取消</a>
			</div>
		</div>
	</div>
    <!--异常信息 begin dialog -->
    <div id="dlgExceptionManager" class="easyui-dialog"  data-options="buttons:'#divExceptionManagerBtn'" style="width:850px; height:400px" closed="true" >
		<div class="easyui-accordion"  style="height:100%">			
			<div class="search-form datagrid-toolbar" style="height:100%" >
				<form id="formExceptionManager" style="float:left; margin: 5px auto;" action="#" method="post">
					<input id="id"name='id' type="hidden" />
					<input id="version" name='version' type="hidden" />
		
					<div><input id="formExceptionCode" name="exceptionCode" readonly="true" class="easyui-textbox"  label="异常编号: "    labelWidth="95px"  data-options="prompt:'异常编号'"  /></div>
					<div><input id="formExceptionStatus" name="exceptionStatus" readonly="true" class="easyui-textbox"  label="异常状态: " labelWidth="95px"  /></div>
					<div><input id="formCreateTime" name="formCreateTime" readonly="true" class="easyui-textbox"  label="异常提报时间 : "  labelWidth="95px"  /></div>
					<div><input id="formAppSrage" name="formAppSrage" readonly="true" class="easyui-textbox"  label="上报平台: "  labelWidth="95px"   /></div>
					<div><input id="createEmp" name="createEmp" readonly="true" class="easyui-textbox"  label="上报人: " labelWidth="95px" /></div>
					<div><input id="lng" name="lng" readonly="true" class="easyui-textbox"  label="异常位置信息: "  labelWidth="95px" /></div>
					
					<div><input id="excepType" name="excepType" readonly="true" class="easyui-textbox"  label="异常类型: "  labelWidth="95px" data-options="prompt:'请选择异常类型'" /></div>
					<div><input id="excepSitesCode" name="excepSitesCode" readonly="true"  class="easyui-textbox"  label="关联网点: "  labelWidth="95px"  data-options="prompt:'请选择关联网点'" /></div>
					<div><input id="blowVolume"  name="blowVolume" readonly="true" class="easyui-textbox" label="爆仓方数: " labelWidth="95px"  /></div>
					<div><input id="updateEmp" name="updateEmp" readonly="true" class="easyui-textbox" label="异常处理人: " labelWidth="95px"  /></div>
					<div><input id="formUpdateTime" name="formUpdateTime" readonly="true" class="easyui-textbox"  label="处理完成时间: " labelWidth="95px" ></div>
					<div><input id="formStartTrunkCode" name="formStartTrunkCode" readonly="true" class="easyui-textbox" label="发车计划号: "  precision="2" labelWidth="95px" /></div>
					<div><label >&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp异常信息：</label><textarea id="reason" name="reason" readonly="readonly" style="vertical-align: top;" rows="6" cols="94"></textarea></div>
				</form>
			</div>
		</div>
	</div>
	<!--异常信息 end dialog -->
		
	<!-------------------------------------------------- 新增需求（及新增发车计划）页面dialog-begin ------------------------------------------------------------------------------>
	<div id="dlgFreightOrderCombine" class="easyui-dialog" data-options="buttons:'#divLineClassBtn'"  style="width:100%;height:100%" closed="true">
		<div id="tlbDetial">
			<div class="easyui-accordion">			
				<div class="search-form">
					<form id="formLineClass" style="float:left; margin: 5px auto;" action="#" method="post">
						<div><input id="lineGroupCode" name="lineGroupCode"   class="easyui-textbox"  label="班次编号：" labelwidth="110" readonly="true" data-options="prompt:'班次编号自动生成'"></div>
						<div><input id="lineGroupName" name="lineGroupName"    class="easyui-textbox"  label="班次名称："  labelwidth="110" readonly="true"  data-options="prompt:'班次名称自动生成'"></div>
					<!-- 	<div><input id="status" name="status"  class="easyui-textbox" label="班次状态："  labelwidth="110" ></div> -->
						<div><input id="departTime" name="departTime"   class="easyui-datetimebox" label="发车时间" labelwidth="110" ></div>
						<div><input id="arrivalTime" name="arrivalTime"  class="easyui-datetimebox"  label="到达时间" labelwidth="110" ></div>
						<div><input id="totalTime" name="totalTime" readonly="true" class="easyui-numberbox"  label="运行时间："   labelwidth="110" ></div>
						<div><input id="lineGroupDistance" name="lineGroupDistance"  readonly="true" class="easyui-numberbox"  label="路线距离："   labelwidth="110" ></div>
						<div><input id="startOrgName" name="startOrgName"  readonly="true" class="easyui-textbox"  label="始发站"  labelwidth="110"  ></div>
						<div><input id="endOrgName" name="endOrgName" readonly="true"  class="easyui-textbox" label="目的站"   labelwidth="110"   ></div>
						<div><input id="requiType" name="requiType" readonly="true"  class="easyui-textbox" label="需求类型："  labelwidth="110"   data-options="prompt:'请输入需求类型'"></div>
						<div><input id="costPrice" name="costPrice" readonly="true" class="easyui-numberbox" label="成本价："  labelwidth="110"   ></div>
						<div><input id="sellingPrice" name="sellingPrice"  readonly="true" class="easyui-numberbox"  label="报价："   labelwidth="110"  ></div>
						<div><input id="totalTime" name="totalTime"  readonly="true" class="easyui-numberbox"  label="班次总耗时：" labelwidth="110"  ></div>
						<div><input id="totalVolume" name="totalVolume"  readonly="true"  class="easyui-numberbox"  label="班次货物总体积："  labelwidth="110" ></div>
						<div><input id="totalWeight" name="totalWeight"  readonly="true" class="easyui-numberbox" label="班次货物总质量"  labelwidth="110" ></div>
						<div><input id="integenceScheduleCode" name="integenceScheduleCode"  readonly="true" class="easyui-datebox" label="计费时间起" labelwidth="110" ></div>
						<div><input id="chargeStarttime" name="chargeStarttime" readonly="true" class="easyui-datetimebox"  label="计费时间止" labelwidth="110" ></div>
						<div><input id="chargeEndTime" name="chargeEndTime" readonly="true" class="easyui-numberbox"  label="调整后价格："   labelwidth="110"   ></div>
						<div><input id="requiCombinCode" name="requiCombinCode" readonly="true"  class="easyui-textbox"  label="需求组合号"   labelwidth="110" readonly="true" data-options="prompt:'需求组合号自动生成'"></div>
						<div><input id="orderCombinCode" name="orderCombinCode" readonly="true"  class="easyui-textbox"  label="订单组合号"  labelwidth="110"   readonly="true" data-options="prompt:'订单组合号名称自动生成'"></div>
						<div><input id="drivingPlanCombinCode" name="drivingPlanCombinCode" readonly="true"  class="easyui-textbox" label="发车计划号"   labelwidth="110" readonly="true" data-options="prompt:'发车计划号名称自动生成'"></div>
						<div><input id="adjustType" name="adjustType" readonly="true"  class="easyui-textbox" label="调整类型："  labelwidth="110"  ></div>
						<div><input id="resource" name="resource" readonly="true" class="easyui-textbox" label="班次来源"  labelwidth="110"  ></div>
						<div><input id="carType" name="carType" class="easyui-textbox"  label="车型"   labelwidth="110"  ></div>
						<div><input id="businessMode" name="businessMode"  readonly="true" class="easyui-textbox" label="业务分类"  labelwidth="110"   ></div>
						<div><input id="loadFactor" name="loadFactor" readonly="true" class="easyui-numberbox"  label="满载率"   labelwidth="110"  ></div>
						<div><input id="lineGroupType" name="lineGroupType" readonly="true"  class="easyui-textbox" label="班次类型"  labelwidth="110"   ></div>
						<div><input id="remark" name="remark" class="easyui-textbox" data-options="multiline:true"  label="备注: "   labelWidth="95px" editable="true" required="true" style="width:550px;height:40px"/></div>
					
					</form>
				</div>
			</div>
			<div id="tblDetialToolBar" class="toolbar-margin">
				<a href="#" onclick="openAddDemand($('#lineGroupCode').val())"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">新增</a>
				<a href="#" onclick="deleteDemand()" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-delete',plain:true">删除</a>
			</div>
		</div>
		<table id="tblFreightOrderCombineDetail" style="width:100%;" data-options="fit:true"></table>
	</div>
	<div id="divLineClassBtn">
		<a href="#" class="easyui-linkbutton save" onclick= "departurePlan()">下一步</a>
		<a href="#" class="easyui-linkbutton cancel" onclick= "javascript:$('#dlgFreightOrderCombine').window('close')">取消</a>
	</div>
	<div id="dlgDemand" class="easyui-dialog"  data-options="buttons:'#divDemandBtn'" style="width:880px;height:500px;" closed="true">
		<div id="tlbDemand">
			<div class="easyui-accordion">
				<div class="search-form">
					<form id="formFindDemand" style="float:left; margin: 10px auto;" action="#" method="post">
						<input id="combineQueryFlag"  name="combineQueryFlag"  type="hidden" />
						<input id="fdDemandCombineType"  name="demandType" type="hidden" />
						<input id="hidCreateBeginTime"  name="createBeginTime" type="hidden" />
						<input id="hidCreateEndTime"  name="createEndTime" type="hidden" />
						<div><input id="SearchLineGroupCode" name="SearchLineGroupCode" class="easyui-textbox" label="班次编号: " data-options="prompt:'请输入班次编号' "></div>	
						<div><input id="wayPointZoneName" name="wayPointZoneName" class="easyui-textbox" label="所属区域名称: "   data-options="prompt:'请选择途所属区域名称'"></div>
						<div>
							<input id="wayPointName" name="wayPointName" class="easyui-textbox" label="途径站点名称: " labelwidth="95" data-options="prompt:'请输入途径站点名称',validType:['length[1,32]','demandCombineCode']">
						</div>			
						<div>
							<input id="fdCreateBeginTime" class="easyui-datebox" label="创建时间: " data-options="editable:false">&nbsp至&nbsp					
							<input id="fdCreateEndTime" class="easyui-datebox" data-options="editable:false">
						</div>
						<!-- <div class="query-reset"> -->
						<div style="float:right">
							<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findDemand($('#lineGroupCode').val())">查询</a>
							<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetFormFindDemand()">重置</a>
				    	</div>
			    	</form>
		    	</div>
			</div>
			<div id="divAddDemandBtn">
				<a href="#" onclick="addDemand()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">增加到班次</a>
			</div>
		</div>
		<table id="tblDemand" style="width:100%;" data-options="fit:true"></table>
	</div>
	<div id="divDemandBtn">
		<a href="#" class="easyui-linkbutton cancel" onclick="javascript:$('#dlgDemand').window('close')">关闭</a>
	</div>
	
	<div id="departurePlan" class="easyui-dialog" data-options="buttons:'#deparTurePlanSave'"   style="width:800px;height:2	00px;" resizeble=false  closed="true">	
		<div class="easyui-accordion ">			
			<div class="search-form datagrid-toolbar">
				<form id="planFrom" style="float:left; margin: 20px auto;" method="#">
					<div><input id="driverPhoneDemand" name="driverPhoneDemand" class="easyui-combobox"  label="司机"   style="width:300px;" required="true" labelWidth="130px" >
					   </input>
					</div>
					<div><input id="plateNumberDemand" name="plateNumberDemand" class="easyui-combobox"  label="车辆" style="width:300px;" required="true" labelWidth="130px" ></div>
				</form>
			</div>
			<div id="deparTurePlanSave">	
				<a href="#" class="easyui-linkbutton save" onclick="savedeparTurePlan()">保存</a>
				<a href="#" class="easyui-linkbutton cancel" onclick="$('#departurePlan').window('close')">取消</a>
			</div>
		</div>
    </div>
    <!-------------------------------------------------- 新增需求（及新增发车计划）dialog-end ------------------------------------------------------------------------------>
	<!-------------------------------------------------- 终止班次页面dialog-begin ------------------------------------------------------------------------------>
	<div id="dlgFreightOrderCombineStop" class="easyui-dialog" data-options="buttons:'#divLineClassStopBtn'"  style="width:100%;height:100%" closed="true">
		<div id="tlbDetialStop">
			<div class="easyui-accordion">			
				<div class="search-form">
					<form id="formLineClassStop" style="float:left; margin: 5px auto;" action="#" method="post">
						<div><input id="lineGroupCodeStop" name="lineGroupCode"  readonly="true"  class="easyui-textbox"  label="班次编号：" labelwidth="110" readonly="true" data-options="prompt:'班次编号自动生成'"></div>
						<div><input id="lineGroupNameStop" name="lineGroupName"  readonly="true"   class="easyui-textbox"  label="班次名称："  labelwidth="110" readonly="true"  data-options="prompt:'班次名称自动生成'"></div>
					<!-- 	<div><input id="status" name="status"  class="easyui-textbox" label="班次状态："  labelwidth="110" ></div> -->
						<div><input id="departTimeStop" name="departTime"  readonly="true"  class="easyui-datetimebox" label="发车时间" labelwidth="110" ></div>
						<div><input id="arrivalTimeStop" name="arrivalTime"  readonly="true"  class="easyui-datetimebox"  label="到达时间" labelwidth="110" ></div>
						<div><input id="totalTimeStop" name="totalTime" readonly="true"  class="easyui-numberbox"  label="运行时间："   labelwidth="110" ></div>
						<div><input id="lineGroupDistanceStop" name="lineGroupDistance"  readonly="true"  class="easyui-numberbox"  label="路线距离："   labelwidth="110" ></div>
						<div><input id="startOrgNameStop" name="startOrgName"  readonly="true"  class="easyui-textbox"  label="始发站"  labelwidth="110"  ></div>
						<div><input id="endOrgNameStop" name="endOrgName"  readonly="true"  class="easyui-textbox" label="目的站"   labelwidth="110"   ></div>
						<div><input id="requiTypeStop" name="requiTypeStop"  readonly="true"  class="easyui-textbox" label="需求类型："  labelwidth="110"  ></div>
						<div><input id="costPriceStop" name="costPrice"  readonly="true"  class="easyui-numberbox" label="成本价："  labelwidth="110"   ></div>
						<div><input id="sellingPriceStop" name="sellingPrice" readonly="true"  class="easyui-numberbox"  label="报价："   labelwidth="110"  ></div>
						<div><input id="totalTimeStop" name="totalTime"  readonly="true"  class="easyui-numberbox"  label="班次总耗时：" labelwidth="110"  ></div>
						<div><input id="totalVolumeStop" name="totalVolume" readonly="true"    class="easyui-numberbox"  label="班次货物总体积："  labelwidth="110" ></div>
						<div><input id="totalWeightStop" name="totalWeight"  readonly="true"  class="easyui-numberbox" label="班次货物总质量"  labelwidth="110" ></div>
						<div><input id="integenceScheduleCodeStop" name="integenceScheduleCode" readonly="true"   class="easyui-datebox" label="计费时间起" labelwidth="110" ></div>
						<div><input id="chargeStarttimeStop" name="chargeStarttime"  readonly="true" class="easyui-datetimebox"  label="计费时间止" labelwidth="110" ></div>
						<div><input id="chargeEndTimeStop" name="chargeEndTime" readonly="true"  class="easyui-numberbox"  label="调整后价格："   labelwidth="110"   ></div>
						<div><input id="requiCombinCodeStop" name="requiCombinCode"  readonly="true"  class="easyui-textbox"  label="需求组合号"   labelwidth="110" readonly="true" data-options="prompt:'需求组合号自动生成'"></div>
						<div><input id="orderCombinCodeStop" name="orderCombinCode" readonly="true"   class="easyui-textbox"  label="订单组合号"  labelwidth="110"   readonly="true" data-options="prompt:'订单组合号名称自动生成'"></div>
						<div><input id="drivingPlanCombinCodeStop" name="drivingPlanCombinCode" readonly="true"   class="easyui-textbox" label="发车计划号"   labelwidth="110" readonly="true" data-options="prompt:'发车计划号名称自动生成'"></div>
						<div><input id="adjustTypeStop" name="adjustType" readonly="true"   class="easyui-textbox" label="调整类型："  labelwidth="110"  ></div>
						<div><input id="resourceStop" name="resource" readonly="true"  class="easyui-textbox" label="班次来源"  labelwidth="110"  ></div>
						<div><input id="carTypeStop" name="carType" readonly="true"  class="easyui-textbox"  label="车型"   labelwidth="110"  ></div>
						<div><input id="businessModeStop" name="businessMode"  readonly="true"  class="easyui-textbox" label="业务分类"  labelwidth="110"   ></div>
						<div><input id="loadFactorStop" name="loadFactor"  readonly="true" class="easyui-numberbox"  label="满载率"   labelwidth="110"  ></div>
						<div><input id="lineGroupTypeStop" name="lineGroupTypeStop" readonly="true"   class="easyui-textbox" label="班次类型"  labelwidth="110"   ></div>
						<div><input id="remarkStop" name="remark" readonly="true"  class="easyui-textbox" data-options="multiline:true"  label="备注: "   labelWidth="95px" editable="true" style="width:550px;height:40px"/></div>
					
					</form>
				</div>
			</div>
		</div>
		<table id="tblFreightOrderCombineDetailStop" style="width:100%;" data-options="fit:true"></table>
	</div>
	<div id="divLineClassStopBtn">
		<a href="#" class="easyui-linkbutton save" onclick= "stopLineGroupConfirm()">确定</a>
		<a href="#" class="easyui-linkbutton cancel" onclick= "javascript:$('#dlgFreightOrderCombineStop').window('close')">取消</a>
	</div>
	<!-------------------------------------------------- 终止班次页面dialog-end ------------------------------------------------------------------------------>
</body>
</html>

<script type="text/javascript">
var map = new BMap.Map("mapView");// 创建Map实例
map.centerAndZoom(new BMap.Point(116.331398, 39.897445), 12);
map.setCenter("上海市");
map.enableScrollWheelZoom(true); 
 
var ms = document.getElementById("suspendId");
var add =document.getElementById("exceptionOperationId");
$(document).ready(function(){
    $("#suspendId").mouseover(function(){
    	add.style.display = "none";
    	ms.style.display = "block";
    }).mouseout(function(){
    	ms.style.display = "none";
    	add.style.display = "block";
    });
});


</script>