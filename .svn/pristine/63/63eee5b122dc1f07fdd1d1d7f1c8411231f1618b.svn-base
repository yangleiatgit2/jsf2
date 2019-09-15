<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>车辆管理</title>
<%@include file="../component/common.jsp"%>
<%@include file="../component/upFile.jsp"%>

<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/carManager/carManagerMain.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/carManager/carValidateAndGlobalVar.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/carManager/carManagerUtil.js"></script>
<%-- <script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/carManager/com.js"></script> --%>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/scripts/bkg/carManager/carManager.css"/>
<script type="text/javascript">
	//获取当前用户信息
	var cmsOrgType = "${sessionScope.CURRENT_USER.cmsOrgType}";
	var cmsBaseOrgCode = "${sessionScope.CURRENT_USER.cmsBaseOrgCode}";
	var cmsOrgCode = "${sessionScope.CURRENT_USER.cmsOrgCode}";
	function getPlateNumber(){
		var outObj={};
		var text=$("#addFrontNumber").combobox("getText");
		var value=$("#addCarNumberAfter").textbox("getText");
		outObj["plateNumbers"]=text+value;
		outObj["id"]=idValue;
		return outObj;
	}
	$(function(){
		$("#addCarNumberAfter").textbox({
			validType:"remote['${pageContext.request.contextPath }/carManager/checkExistsByPlateNumber.do',getPlateNumber]"
		});
// 		$("#addFrontNumber").combobox({
// 			onSelect:function(){
// 				$("#addCarNumberAfter").textbox("isValid");
// 			}
// 		});
	});
</script>
</head>
<body>

	<!-- begin pageview -->
	<div id="tlbCars" class="datagrid-toolbar">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formFindCar" action="#" style="float:left;margin:0 auto;">
					<div><input id="searchCarNumber" name="carNumber" class="easyui-textbox" label="车辆编号: " style="width:270px" labelWidth="110px"data-options="prompt:'请输入车辆编号',validType:['length[0,13]']"></div>	
					<!-- <div><input id="searchCar" name="plateNumbers" class="easyui-combobox" label="测试下拉: " style="width:270px" labelWidth="110px"data-options="prompt:'请输入车辆编号或车牌号'"></div> -->
					<div><input id="searchCarNumber" name="plateNumbers" class="easyui-textbox" label="车牌号: " style="width:270px" labelWidth="110px"data-options="prompt:'请输入车牌号',validType:['length[0,7]']"></div>	
					<div style="margin-left:2px"><input id="carStatus" name="carStatus" class="easyui-combobox" labelWidth="110px" label="车辆状态: " data-options="editable:false,prompt:'请选择'"></div>			
					<div><input id="carType" name="carType" class="easyui-combobox" labelWidth="110px"  label="车辆类型: " data-options="editable:false,prompt:'请选择'"></div>
					<div><input id="carBelongType" name="carBelongType" class="easyui-combobox" labelWidth="110px" label="所属类型: " data-options="editable:false,prompt:'请选择'"></div>					
					<div><input id="upBeginTime" name="onlineBeginTime" validType="beginNotGreaterEndDate['upBeginTime', 'upEndTime']" class="easyui-datebox" label="上线日期: " labelWidth="110px"labelPosition="left" data-options="editable:false,buttons:buttons,prompt:'年-月-日'">&nbsp至&nbsp						
					<input id="upEndTime" name="onlineEndTime" class="easyui-datebox"data-options="editable:false,buttons:buttons,prompt:'年-月-日'"></div>
					<div><input id="insuranceBeginTime" name="insuranceBeginTime" class="easyui-datebox" label="保险到期日期: " labelWidth="110px" 
						validType="beginNotGreaterEndDate['insuranceBeginTime', 'insuranceEndTime']" data-options="editable:false,buttons:buttons,prompt:'年-月-日'">&nbsp至&nbsp					
					<input id="insuranceEndTime" name="insuranceEndTime" class="easyui-datebox" data-options="editable:false,buttons:buttons,prompt:'年-月-日'">
					</div>
					<div id="findBtn">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findCarData()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="restFindCar()">重置</a>
			    	</div>
				</form>
			</div>
		</div>	
			<div class="toolbar-margin"> 
			<shiro:hasPermission name="car_add">
			     <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="iconfont uce-add" onclick="openAddCar()" plain="true">新增</a> 
			</shiro:hasPermission>
			<shiro:hasPermission name="car_export">
			     <a href="javascript:void(0)" class="easyui-linkbutton fr" iconCls="iconfont uce-export" onclick="exportCar()" plain="true">导出</a>
	  		</shiro:hasPermission>
	  		</div>
	</div>
  
  	 <div id="dlgCar" class="easyui-dialog" style="width:880px;height:300px; padding:5px" closed="true" >
     	 <table id="dgCar" class="easyui-datagrid" data-options="fit:true"></table>
     </div>
     <ul class="flex-style list tabs" style="height: 30px;">
   		<div class="list-tabs list-tabs-selected" value="0"> <a href="tab1"></a>全部</div>
   		<div class="list-tabs" value="1"><a href="tab2"></a>近一个月保险到期</div>
   		<div class="list-tabs" value="2"><a href="tab3"></a>保险已过期</div>
   	</ul>
   	<div id="tab1" class="tab_content" style="display: block;">
   		 <table id="dgCar1" style="width:100%;"></table>
   	</div>
   	<div id="tab2" class="tab_content" style="display: block;">
   		 <table id="dgCar2"  style="width:100%;"></table>
   	</div>
   	<div id="tab3" class="tab_content" style="display: block;">
   		 <table id="dgCar3"  style="width:100%;"></table>
   	</div>
   
  	 <!-- 新增car界面 begin -->
     <div id="dlgNewCar" class="easyui-dialog" style="width:950px;height:666px; padding:0px" closed="true" buttons="#divCarBtn">
    	<div class="easyui-accordion ">	
    		<div class="search-form datagrid-toolbar">
		    	<form id="formCar" method="post" enctype="multipart/form-data" style="float:left; margin: 20px auto;">
		    		<input type="hidden" name="plateNumbers" id="addPlateNumbers" />	
					<div><input id="addCarBelongType" name="carBelongType"  class="easyui-combobox" required="true" label="<a style='color:red;'>*</a>所属类型: " labelWidth="130px" data-options="editable:false,prompt:'请选择'"></div>
					<div><input id="addCarBelongCarrier" name="carBelongCarrier"  class="easyui-combobox" required="true" label="<a style='color:red;'>*</a>车辆所属: " labelWidth="130px"   data-options="prompt:'请输入关键字'"></div>
					<div>
						<input id="addFrontNumber"  required="true" class="easyui-combobox frontNumber" required="true" label="<a style='color:red;'>*</a>车牌号: " labelWidth="130px"  data-options="editable:false,onShowPanel:showPanel">
						<input  id="addCarNumberAfter" class="easyui-textbox carNumberAfter" required="true" labelWidth="130px"  data-options="validType:['carCode'],prompt:'请输入车牌号'" />
					</div>
					<div><input id="addCarType" name="carType" class="easyui-combobox" label="<a style='color:red;'>*</a>车辆类型: " required="true"  validtype="length[0,10]" labelWidth="130px"  data-options="editable:false,prompt:'请选择'"></div>
					<div><input id="addCarOrg" name="carOrg" class="easyui-textbox"  label="<a style='color:red;'>*</a>所属分拨: " required="true" labelWidth="130px"  data-options="prompt:'请输入关键字',validType:['length[1,30]']"></div>
					<div><input id="addCarOwnerName" name="carOwnerName" class="easyui-textbox" label="<a style='color:red;'>*</a>车主姓名: " required="true" validtype="length[0,25]" labelWidth="130px" data-options="prompt:'请输入姓名'"></div>
					<div><input id="addCarOwnerMoble" name="carOwnerMoble" class="easyui-numberbox" label="<a style='color:red;'>*</a>手机号: " required="true" labelWidth="130px"  data-options="validType:['phoneNum'],prompt:'请输入手机号'"></div>
					<div><input id="addCarLength" name="carLength" class="easyui-numberbox"  label="<a style='color:red;'>*</a>车厢长度(米): " required="true" labelWidth="130px" data-options="min:0,max:99.99,precision:2,prompt:'请输入长度'" ></div>
					<div><input id="addCarWidth" name="carWidth" class="easyui-numberbox"  label="<a style='color:red;'>*</a>车厢宽度(米): " required="true" labelWidth="130px" data-options="min:0,max:99.99,precision:2,prompt:'请输入宽度'" ></div>
					<div><input id="addCarHeight" name="carHeight" class="easyui-numberbox"  label="<a style='color:red;'>*</a>车厢高度(米): " required="true" labelWidth="130px"  data-options="min:0,max:99.99,precision:2,prompt:'请输入高度'" ></div>
					<div><input id="addCarVolume" name="carVolume" class="easyui-numberbox"  label="<a style='color:red;'>*</a>车厢容积(方): " required="true" labelWidth="130px" data-options="min:0,max:999999.99,prompt:'请输入容积'" ></div>
					<div><input id="addCarLoad" name="carLoad" class="easyui-numberbox" label="<a style='color:red;'>*</a>车辆核载吨位(KG): " required="true" labelWidth="130px"  data-options="min:0,max:999.99,precision:2,prompt:'请输入吨位'"></div>
					<div><input id="addCurbWeight" name="curbWeight" class="easyui-numberbox" label="<a style='color:red;'>*</a>整备质量(KG): " required="true" labelWidth="130px" data-options="min:0,max:999.99,precision:2,prompt:'请输入质量'"></div>
					<div><input id="addChassisHeight" name="chassisHeight" class="easyui-numberbox" label="<a style='color:red;'>*</a>底盘高度(米): " required="true" data-options="min:0,max:99.99,precision:2,prompt:'请输入高度'" labelWidth="130px" ></div>
					<div><input id="addEngineNumber" name="engineNumber" class="easyui-textbox" label="<a style='color:red;'>*</a>发动机号码: " required="true" labelWidth="130px" data-options="validType:['englishNumber','length[0,25]'],prompt:'请输入发动机号码'"  ></div>
					<div><input id="addGpsNumber" name="gpsDeviceNumber" class="easyui-textbox" label="GPS设备号: " labelWidth="130px" data-options="validType:['length[0,25]'],prompt:'请输入GPS编号'" ></div>
					<div><input id="addDrivingLicenseNumber" name="drivingLicenseNumber" class="easyui-textbox" required="true" label="<a style='color:red;'>*</a>行驶证编号: " labelWidth="130px"  data-options="validType:['englishNumber','length[0,25]'],prompt:'请输入行驶证编号'" ></div>
					<div><input id="addOperationNumber" name="operationNumber" class="easyui-textbox" label="<a style='color:red;'>*</a>营运证编号: " required="true"  labelWidth="130px" data-options="validType:['englishNumber','length[0,25]'],prompt:'请输入营运证编号'" ></div>
					<div><input id="addOnlineTime" name="onlineTime" class="easyui-datebox" label="<a style='color:red;'>*</a>上线日期: " required="true"  labelWidth="130px" data-options="editable:false,buttons:buttons,prompt:'年-月-日'" ></div>
					<div><input id="addTranUsableBegin" name="capacityStartTime" class="easyui-datebox" label="<a style='color:red;'>*</a>运力可用期起: " required="true"  labelWidth="130px" data-options="editable:false,buttons:buttons,prompt:'年-月-日'" ></div>
					<div><input id="addTranUsableEnd" name="capacityEndTime" class="easyui-datebox" label="<a style='color:red;'>*</a>运力可用期止: " required="true"  labelWidth="130px" data-options="editable:false,buttons:buttons,prompt:'年-月-日'" ></div>
					<div><input id="addCiEndTime" name="ciEndTime" class="easyui-datebox" label="<a style='color:red;'>*</a>货物险到期日: " required="true"  labelWidth="130px" data-options="editable:false,buttons:buttons,prompt:'年-月-日'"></div>
					<div><input id="addTciEndTime" name="tciEndTime" class="easyui-datebox" label="<a style='color:red;'>*</a>交强险到期日: " required="true"  labelWidth="130px"data-options="editable:false,buttons:buttons,prompt:'年-月-日'" ></div>
					<div><input id="addVciEndTime" name="vciEndTime" class="easyui-datebox" label="<a style='color:red;'>*</a>商业险到期日: " required="true"  labelWidth="130px"  data-options="editable:false,buttons:buttons,prompt:'年-月-日'" ></div>
					<div><input id="addTrafficPermitFlag" name="trafficPermitFlag" class="easyui-textbox" label="<a style='color:red;'>*</a>是否有通行证: " required="true"  labelWidth="130px"  data-options="editable:false,prompt:'请选择'"></div>
					<div><input id="addCarBrand" name="carBrand" class="easyui-textbox" label="车辆品牌: " labelWidth="130px" data-options="editable:false,prompt:'请选择'" ></div>
					<div><input id="addUsableFlag" name="usableFlag" class="easyui-textbox" label="<a style='color:red;'>*</a>当前是否可用: "  labelWidth="130px" required="true"  data-options="editable:false,prompt:'请选择'"></div>
					<div><input id="addResidentPoint" name="residentPoint" class="easyui-textbox"  label="常驻点: " labelWidth="130px"  data-options="prompt:'请输入关键字'"></div>
					<div style="width:560px"></div>
					<div><a href="#" class="easyui-linkbutton" style="background-color: #541B86; margin-left:80px;" onclick="openUpload(operationCertificateFile,'suc','bkg','CAR_OPERATION_CERTIFICATE')"><span style="color: white">营运证附件</span></a></div>
					<div><a href="#" class="easyui-linkbutton" style="background-color: #541B86;" onclick="openUpload(tciFile,'suc','bkg','CAR_TCI')"><span style="color: white">交强险附件</span></a></div>
					<div><a href="#" class="easyui-linkbutton" style="background-color: #541B86;" onclick="openUpload(trafficPermitFile,'suc','bkg','CAR_TRAFFIC_PERMIT')"><span style="color: white">通行证附件</span></a></div>
					<div><a href="#" class="easyui-linkbutton" style="background-color: #541B86;" onclick="openUpload(vciFile,'suc','bkg','CAR_VCI')"><span style="color: white">商业险附件</span></a></div>
					<div><a href="#" class="easyui-linkbutton" style="background-color: #541B86;" onclick="openUpload(otherInsuranceFile,'suc','bkg','CAR_OTHI')"><span style="color: white">其他险附件</span></a></div>
					<div><a href="#" class="easyui-linkbutton" style="background-color: #541B86;" onclick="openUpload(drivingLicenseFile,'suc','bkg','CAR_DRIVING_LICENCE')"><span style="color: white">行驶证附件</span></a></div>
					<div class="multilineTextInput">
						<input id="addRemark" name="remark" data-options="multiline:true,prompt:'请输入备注信息'" class="easyui-textbox" label="备注: " labelWidth="130px" validtype="length[0,255]">
					</div>
				</form>
			</div>
		</div>
    </div>
    <!-- 新增car界面 end -->
    
    <!-- 查看详情界面 begin -->
     <div id="dlgCheckCar" class="easyui-dialog" style="width:950px;height:666px; padding:5px" closed="true">
    	<div class="easyui-accordion ">	
    		<div class="search-form datagrid-toolbar">
		    	<form id="formCheckCar" method="post" enctype="multipart/form-data" style="float:left; margin: 20px auto;">	
		    			<div><input id="checkCarBelongType" name="carBelongType"  class="easyui-combobox" readonly="readonly" label="<a style='color:red;'>*</a>所属类型: " labelWidth="130px" data-options="editable:false"></div>
		    			<div><input id="checkCarBelongCarrier" name="carBelongCarrier" class="easyui-textbox" readonly="readonly" label="<a style='color:red;'>*</a>车辆所属: " labelWidth="130px" data-options="editable:false" ></div>
						<div><input id="checkPlateNumber" name="plateNumbers" label="<a style='color:red;'>*</a>车牌号: " labelWidth="130px"class="easyui-textbox" data-options="editable:false" /></div>
						<div><input id="checkCarType" name="carType" class="easyui-combobox" readonly="readonly" label="车辆类型: " labelWidth="130px"  data-options="editable:false"></div>
						<div><input id="checkCarOrg" name="carOrg" class="easyui-textbox" readonly="readonly" label="<a style='color:red;'>*</a>所属分拨: " labelWidth="130px"  data-options="editable:false"></div>
						<div><input id="checkOwnerName" name="carOwnerName" class="easyui-textbox" label="<a style='color:red;'>*</a>车主姓名: " labelWidth="130px" data-options="editable:false"></div>
						<div><input id="checkMoblePhone" name="carOwnerMoble" class="easyui-numberbox" label="<a style='color:red;'>*</a>手机号: " labelWidth="130px" data-options="editable:false" ></div>
						<div><input id="checkCarLength" name="carLength" class="easyui-numberbox" precision="2" label="<a style='color:red;'>*</a>车厢长度(米): " labelWidth="130px" data-options="editable:false"></div>
						<div><input id="checkCarWidth" name="carWidth" class="easyui-numberbox" precision="2" label="<a style='color:red;'>*</a>车厢宽度(米): " labelWidth="130px"  data-options="editable:false"></div>
						<div><input id="checkCarHeight" name="carHeight" class="easyui-numberbox" precision="2" label="<a style='color:red;'>*</a>车厢高度(米): " labelWidth="130px"  data-options="editable:false"></div>
						<div><input id="checkCarVolume" name="carVolume" class="easyui-numberbox" readonly="readonly" precision="2" label="<a style='color:red;'>*</a>车厢容积(方): " labelWidth="130px" data-options="editable:false"></div>
						<div><input id="checkCarLoad" name="carLoad" class="easyui-numberbox" label="<a style='color:red;'>*</a>车辆核载吨位(KG): " labelWidth="130px" data-options="editable:false" ></div>
						<div><input id="checkCurbWeight" name="curbWeight" class="easyui-numberbox" label="<a style='color:red;'>*</a>整备质量(KG): " labelWidth="130px" data-options="editable:false"  ></div>
						<div><input id="checkChassisHeight" name="chassisHeight" class="easyui-numberbox" precision="2" label="<a style='color:red;'>*</a>底盘高度(米): " labelWidth="130px"  data-options="editable:false"></div>
						<div><input id="checkEngineNumber" name="engineNumber" class="easyui-textbox" label="<a style='color:red;'>*</a>发动机号码: " labelWidth="130px" data-options="editable:false"  ></div>
						<div><input id="checkGpsDeviceNumber" name="gpsDeviceNumber" class="easyui-textbox" label="GPS设备号: " labelWidth="130px" data-options="editable:false" ></div>
						<div><input id="checkDrivingLicenseNumber" name="drivingLicenseNumber" class="easyui-textbox" label="<a style='color:red;'>*</a>行驶证编号: " labelWidth="130px" data-options="editable:false" ></div>
						<div><input id="checkOperationNumber" name="operationNumber" class="easyui-textbox" label="<a style='color:red;'>*</a>营运证编号: "  labelWidth="130px" data-options="editable:false" ></div>
						<div><input id="checkOnlineTime" name="onlineTime" class="easyui-datebox" label="<a style='color:red;'>*</a>上线日期: " readonly="readonly"  labelWidth="130px" data-options="editable:false" ></div>
						<div><input id="checkTranUsableBegin" name="capacityStartTime" class="easyui-datebox" readonly="readonly" label="<a style='color:red;'>*</a>运力可用期起: "  labelWidth="130px" data-options="editable:false,buttons:buttons" ></div>
						<div><input id="checkTranUsableEnd" name="capacityEndTime" class="easyui-datebox" readonly="readonly" label="<a style='color:red;'>*</a>运力可用期止: "  labelWidth="130px" data-options="editable:false,buttons:buttons" ></div>
						<div><input id="checkTciEndTime" name="tciEndTime" class="easyui-datebox" readonly="readonly" label="<a style='color:red;'>*</a>交强险到期日: "  labelWidth="130px" data-options="editable:false" ></div>
						<div><input id="checkVciEndTime" name="vciEndTime" class="easyui-datebox" readonly="readonly" label="<a style='color:red;'>*</a>商业险到期日: " labelWidth="130px"  data-options="editable:false" ></div>
						<div><input id="checkCiEndTime" name="ciEndTime" class="easyui-datebox" label="<a style='color:red;'>*</a>货物险到期日: " readonly="readonly"  labelWidth="130px" data-options="editable:false"></div>
						<!-- <div><input id="checkCarStatus" name="carStatus" class="easyui-textbox" readonly="readonly" label="车辆状态: " labelWidth="130px"  data-options="editable:false" /></div> -->
						<div><input id="checkTrafficPermitFlag" name="trafficPermitFlag" class="easyui-combobox" readonly="readonly" label="<a style='color:red;'>*</a>是否有通行证: "  validtype="length[0,10]" labelWidth="130px"  data-options="editable:false"></div>
						<div><input id="checkCarBrand" name="carBrand" class="easyui-combobox" label="车辆品牌: " labelWidth="130px" readonly="readonly" data-options="editable:false"></div>
						<div><input id="checkUsableFlag" name="usableFlag" class="easyui-textbox" readonly="readonly" label="<a style='color:red;'>*</a>当前是否可用: "  labelWidth="130px"  data-options="editable:false"></div>
						<div><input id="checkResidentPoint" name="residentPoint" readonly="readonly" class="easyui-textbox"  label="常驻点: " labelWidth="130px"  data-options="editable:false"></div>
						<div style="width:560px"></div>
						<div><a href="#" class="easyui-linkbutton" style="background-color: #541B86;margin-left: 80px;" onclick="openShowFile(operationCertificateFile,'suc','bkg','CAR_OPERATION_CERTIFICATE')"><span style="color: white">营运证附件</span></a></div>
						<div><a href="#" class="easyui-linkbutton" style="background-color: #541B86;" onclick="openShowFile(tciFile,'suc','bkg','CAR_TCI')"><span style="color: white">交强险附件</span></a></div>
						<div><a href="#" class="easyui-linkbutton" style="background-color: #541B86;" onclick="openShowFile(trafficPermitFile,'suc','bkg','CAR_TRAFFIC_PERMIT')"><span style="color: white">通行证附件</span></a></div>
						<div><a href="#" class="easyui-linkbutton" style="background-color: #541B86;" onclick="openShowFile(vciFile,'suc','bkg','CAR_VCI')"><span style="color: white">商业险附件</span></a></div>
						<div><a href="#" class="easyui-linkbutton" style="background-color: #541B86;" onclick="openShowFile(otherInsuranceFile,'suc','bkg','CAR_OTHI')"><span style="color: white">其他险附件</span></a></div>
						<div><a href="#" class="easyui-linkbutton" style="background-color: #541B86;" onclick="openShowFile(drivingLicenseFile,'suc','bkg','CAR_DRIVING_LICENCE')"><span style="color: white">行驶证附件</span></a></div>
						<div class="multilineTextInput">
							<input id="checkRemark"name="remark" data-options="multiline:true" class="easyui-textbox" label="备注: "  labelWidth="130px" readonly="readonly"">
						</div>
				</form>
			</div>
		</div>
    </div>
    <!-- 查看详情界面 end -->
    <div id="divCarBtn">
        <a href="javascript:void(0)" class="easyui-linkbutton save" onclick="saveCar()">保存</a>
        <a href="javascript:void(0)" class="easyui-linkbutton reset" id='restNewCar' onclick="restNewCar()">重置</a>
        <a href="javascript:void(0)" class="easyui-linkbutton cancel" onclick="closeCarDlg()">关闭</a>
    </div>
</body>
</html>