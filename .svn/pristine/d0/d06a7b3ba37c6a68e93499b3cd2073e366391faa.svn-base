<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>网点运力管理</title>
<%@include file="../component/common.jsp"%>
<%@include file="../component/upFile.jsp"%>

<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/cost/dotability.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/cost/Validate.js"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/scripts/bkg/cost/carManager.css"/>
<script>
  var cmsOrgType = decodeURI("${sessionScope.CURRENT_USER.cmsOrgType}");
  var empName = decodeURI("${sessionScope.CURRENT_USER.empName}");
</script>
</head> 
<body>
	<!-- begin pageview -->
	<div id="tlbDotAbility">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formFindDotAbility" action="#" style="float:left;margin:0 auto;" method="post">
					<!--  <input type="hidden" name="demandType" value="1"/>-->
					<div style="width: 30rem"><input id="findCarType" name="carType" class="easyui-textbox" label="车辆类型: " ></div>	
					<div style="width: 30rem"><input id="findbelongSiteName" name="belongSiteCode" class="easyui-textbox" labelwidth="140" label="车辆所属网点: "  ></div>	
					<div style="width: 30rem"><input id="findCarStatus" name="buyStatus" class="easyui-textbox" label="运力状态: " ></div>
					<div style="width: 30rem"><input id="findCarBelong" name="carBelong" class="easyui-textbox" label="所属类型: " ></div>		
					<div style="width: 60rem">
						<input id="executeBeginTime" name="startTime" class="easyui-datebox" label="运力上报有效期: " labelwidth="140" data-options="editable:false" >&nbsp至&nbsp					
						<input id="executeEndTime" name="endTime" class="easyui-datebox"  data-options="editable:false">
					</div>
					<!-- <div class="query-reset"> -->
					<div class="fr">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findDotAbilitybywhere()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetDotAbility()">重置</a>
			    	</div>
				</form>
			</div>
		</div>
		<!-- begin table tool -->
		<div class="toolbar-margin">
		<%-- <shiro:hasPermission name="lineclass_add">  --%>
			<a href="#" class="easyui-linkbutton" style="margin-left: 1rem;" data-options="iconCls:'iconfont uce-add',plain:true" onclick="addDot()">新增</a>
			<a href="#" class="easyui-linkbutton "  data-options="iconCls:'iconfont uce-upload',plain:true" onclick="sendPrice()">发送报价</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-uncollect',plain:true" onclick="confirmPrice()">确认报价</a>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'iconfont uce-stop',plain:true" onclick="stopDot()">终止运力</a>
			<a href="#" class="easyui-linkbutton "  style="float: right;"  data-options="iconCls:'iconfont uce-export',plain:true" onclick="exportDot()">导出</a>
		</div>
		<!-- end table tool -->			
	</div>
	<!-- begin table -->
	<table id="tblDotAility" style="width:100%;" data-options="fit:true"></table>
	<!-- end table -->
	<!-- end pageview -->
	<!-------------------------------------------------- 编辑页面处理 ------------------------------------------------------------------------------>
	<!-- begin dialog -->
	<div id="dlgDotAility" class="easyui-dialog" data-options="buttons:'#divDotAilityBtn'"  style="width:950px;height:550px;" closed="true">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formLineClass" style="float:left; margin: 20px auto;" action="#" method="post">
					<input id="myid"  name='id' type="hidden">
					<!-- <input id="belongSiteCode"  name='belongSiteCode' type="hidden"> -->
					<div><input id="capacityCode" name="capacityCode" labelwidth="120"  class="easyui-textbox"  label="运力编号: " ></div>
					 <div>
					 <label style="margin-left: 6rem">车牌号 :</label>
						<input id="carPlateSurname"  name="carPlateSurname"   required="true" class="easyui-combobox frontNumber" required="true" data-options="prompt:'请选择',validType:['selectNull']"  >
						<input  id="carPlateEnd" name="carPlateEnd" class="easyui-textbox carNumberAfter" required="true" labelWidth="130px"  data-options="prompt:'请输入关键字',validType:['length[6,10]']"  />
					</div> 
					<!-- <div>
						<input id="addFrontNumber"  required="true" class="easyui-combobox frontNumber"    data-options="editable:false,onShowPanel:showPanel">
						<input  id="addCarNumberAfter" class="easyui-textbox carNumberAfter" required="true"  data-options="validType:['carNumberCheck','carCode','length[1,25]'],prompt:'请输入车牌号'" />
					</div> -->
					<div><input id="belongSiteCode" name="belongSiteCode" labelwidth="120"  class="easyui-textbox" required="true"  label="车辆所属网点:" ></div>
					<div><input id="carBelongAs" name="carBelong"  class="easyui-textbox" labelwidth="120" required="true" data-options="prompt:'请输入关键字',validType:['selectNull']"  label="所属类型:" ></div>
					<div><input id="carType" name="carType"  class="easyui-textbox" labelwidth="120" label="车辆类型:" required="true"  data-options="prompt:'请输入关键字',validType:['selectNull']"></div>
					<div><input id="length" name="length"  class="easyui-numberbox" labelwidth="120" required="true" data-options="min:0,max:99.99,precision:3,prompt:'请输入长度'" label="长:"  ></div>
					<div><input id="width" name="width"   class="easyui-numberbox" labelwidth="120"  label="宽:"  required="true" data-options="min:0,max:99.99,precision:3,prompt:'请输入宽度'" ></div>
					<div><input id="hight" name="hight"   class="easyui-numberbox" labelwidth="120" label="高:" required="true" data-options="min:0,max:99.99,precision:3,prompt:'请输入高度'" ></div>
					<div><input id="largestLoad"  name="largestLoad" class="easyui-numberbox" labelwidth="120" label="最大载重(吨):" required="true" data-options="min:0,max:999.99,precision:3,prompt:'请输入最大载重'"  ></div>
					<div><input id="driverName" name="driverName"  class="easyui-textbox" labelwidth="120"  label="驾驶员姓名:" required="true" data-options="prompt:'请输入驾驶员姓名',validType:['myName']"></div>
					<div><input id="driverPhone" name="driverPhone" class="easyui-numberbox" labelwidth="120"   label="驾驶员手机:" required="true" data-options="validType:['phoneNum'],prompt:'请输入手机号'"></div>
					<div><input id="purchasePrice" name="purchasePrice"  class="easyui-numberbox" labelwidth="120"  label="采购价格:" required="true" data-options="min:0,max:9999999.99,precision:3,prompt:'请输入采购价格'"   ></div>
					<div><input id="buyStatus" name="buyStatus"  class="easyui-textbox" labelwidth="120" label="运力状态:" required="true" data-options="prompt:'请输入关键字',validType:['selectNull']" ></div>
					<div><input id="passFlag" name="passFlag" class="easyui-textbox" labelwidth="120" label="是否含有通行证:" required="true" data-options="prompt:'请输入关键字',validType:['selectValue']"   ></div>
					<div><input id="passImageId" name="passImageId"   class="easyui-textbox" labelwidth="120" label="通行证编号:" required="true" data-options="validType:['passValue'],prompt:'请输入通行证编号'"   /></div>
					<div><input id="drivingLicenceImageId" name="drivingLicenceImageId" labelwidth="120"  class="easyui-textbox" label="司机驾驶证:"  data-options="prompt:'请输入驾驶证',validType:['passValue']"  /></div>
					<div><input id="idCardFrontImageId" name="idCardFrontImageId" class="easyui-textbox" labelwidth="120" label="车辆行驶证:"  data-options="prompt:'请输入行驶证',validType:['passValue']"  ></div>
					<div><input id="startTime" name="startTime" class="easyui-datebox" labelwidth="120" label="运力有效期起:" required="true" data-options="editable:false" ></div>
					<div><input  id="endTime"  name="endTime"   class="easyui-datebox" labelwidth="120"  label="运力有效期止:" required="true" data-options="editable:false"></div>
					<div><input  id="createEmp"  name="createEmp"   class="easyui-textbox" labelwidth="120" label="创建人:" required="true" data-options="prompt:'请输入创建人姓名',validType:['myName']" ></div>
					<div><input  id="createTime"  name="createTime"   class="easyui-datetimebox" labelwidth="120" label="创建时间:" required="true" data-options="editable:false"  ></div>
					<div style="width:280px"><label style="margin-left:4rem">驾驶证附件:</label><a href="#" class="easyui-linkbutton search" style="margin-left:7px" data-options="plain:true" onclick="openUpload(driverLicensePhoto,'suc','bkg','DRIVER_DRIVING_LICENCE')">上传</a>
						<input id="driverLicensePhoto"   name="driverLicensePhoto"  hidden="true">
					</div>
					<div style="width:280px"><label style="margin-left:4rem">行驶证附件:</label><a href="#" class="easyui-linkbutton search" style="margin-left:7px" data-options="plain:true" onclick="openUpload(drivingLicensePhoto,'suc','bkg','CAR_DRIVING_LICENCE')">上传</a>
						<input id="drivingLicensePhoto"   name="drivingLicensePhoto"  hidden="true">
					</div>
					<div style="width:280px"><label style="margin-left:4rem">身份证正面:</label><a href="#" class="easyui-linkbutton search" style="margin-left:7px" data-options="plain:true" onclick="openUpload(idFrontPhoto,'suc','bkg','DRIVER_ID_CARD')">上传</a>
						<input id="idFrontPhoto"   name="idFrontPhoto"  hidden="true">
					</div>
					<div style="width:280px"><label style="margin-left:4rem">通行证附件:</label><a href="#" class="easyui-linkbutton search" style="margin-left:7px" data-options="plain:true" onclick="openUpload(passCheckPhoto,'suc','bkg','CAR_TRAFFIC_PERMIT')">上传</a>
						<input id="passCheckPhoto"   name="passCheckPhoto"  hidden="true">
					</div>
					<div style="width:280px"><label style="margin-left:4rem">运营证附件:</label><a href="#" class="easyui-linkbutton search" style="margin-left:7px" data-options="plain:true" onclick="openUpload(operationCertificate,'suc','bkg','CAR_OPERATION_CERTIFICATE')">上传</a>
						<input id="operationCertificate"   name="operationCertificate"  hidden="true">
					</div>
					<div style="width:280px"><label style="margin-left:4rem">身份证反面:</label><a href="#" class="easyui-linkbutton search" style="margin-left:7px" data-options="plain:true" onclick="openUpload(idSidePhoto,'suc','bkg','DRIVER_ID_CARD_OPP')">上传</a>
						<input id="idSidePhoto"   name="idSidePhoto"  hidden="true">
					</div>
					<div>
					
					</div>
				</form>
			</div>
					
		</div>
	</div>
	<div id="divDotAilityBtn">
		<a href="#" class="easyui-linkbutton save" style="margin-left:60rem"  plain="true"  onclick="addOrUpdateDot()">保存</a>
		<a href="#" class="easyui-linkbutton cancel" plain="true"  onclick="$('#dlgDotAility').window('close')">关闭</a>
	</div>
	<!-- end dialog -->

</body>
</html>