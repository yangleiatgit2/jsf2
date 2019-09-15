<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>司机管理</title>
<%@include file="../component/common.jsp"%>
<%@include file="../component/upFile.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/driverManage/driverManageMain.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/driverManage/driverManageUtil.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/driverManage/driverManageValidateAndGlobalVar.js"></script>
<%-- <script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/driverManage/com.js"></script> --%>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/scripts/bkg/driverManage/driver.css"/>
<script type="text/javascript">
	//获取当前用户信息
	var cmsOrgType = "${sessionScope.CURRENT_USER.cmsOrgType}";
	var cmsBaseOrgCode = "${sessionScope.CURRENT_USER.cmsBaseOrgCode}";
	var cmsOrgCode = "${sessionScope.CURRENT_USER.cmsOrgCode}";
</script>
</head>
<body>
	<!-- begin pageview -->
	<div id="tlbDriverManage" class="datagrid-toolbar">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formFindDriverManage" action="#" style="float:left;margin:0 auto;">
					<div><input id="driverName" name="driverName" class="easyui-textbox"  label="司机姓名: " labelWidth="130px"  data-options="prompt:'请输入姓名',validType:['length[1,30]']"></div>
					<div><input id="carrierName" name="carrierName" class="easyui-textbox"  label="司机所属: " labelWidth="130px"  data-options="prompt:'请输入所属',validType:['length[1,30]']"></div>
					<div><input id="plateNumber" name="plateNumber" class="easyui-textbox" label="车牌号: " style="width:270px" labelWidth="110px"data-options="prompt:'请输入车牌号',validType:['length[1,7]']"></div>	
					<!-- <div><input id="testDriverName" name="driverName" class="easyui-textbox" label="测试下拉: " style="width:270px" labelWidth="110px"data-options="prompt:'请输入车牌号'"></div>	 -->
					<div><input id="dirverStatus" name="dirverStatus" class="easyui-combobox" label="司机状态: " style="width:270px" labelWidth="110px"data-options="prompt:''"></div>	
					<div class="fr">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findDriverManage()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="restDriverManage()">重置</a>
			    	</div>
				</form>
			</div>
		</div>	
			<div class="toolbar-margin"> 
			<shiro:hasPermission name="driver_add">
			     <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="iconfont uce-add" onclick="openAddDriver()" plain="true">新增</a> 
			</shiro:hasPermission>
			<shiro:hasPermission name="driver_export">
			     <a href="javascript:void(0)" class="easyui-linkbutton fr" iconCls="iconfont uce-export" onclick="exportDriver()" plain="true">导出</a>
	  		</shiro:hasPermission>
	  		</div>
	</div>
    <table id="tblDriverManage" class="easyui-datagrid" data-options="fit:true"></table>
  	 <!-- 新增司机界面 begin -->
     <div id="dlgNewDriverManage" class="easyui-dialog" style="width:950px;height:450px; padding:0px" closed="true" buttons="#divDriverBtn">
    	<div class="easyui-accordion ">	
    		<div class="search-form datagrid-toolbar">
		    	<form id="formAddDriverManage" method="post" enctype="multipart/form-data" style="float:left; margin: 20px auto;">
					<div><input id="addDriverName" name="driverName"  class="easyui-textbox" required="true" label="司机姓名: " labelWidth="130px" validtype="length[0,25]" data-options="prompt:'请输入姓名'"></div>
					<div><input id="addPlateNumber" name="plateNumber"  class="easyui-combobox" required="true" label="车牌号 " labelWidth="130px" data-options="prompt:'请输入关键字'"></div>
					<div><input id="addDirverType" name="dirverType"  class="easyui-combobox" required="true" label="所属类型: " labelWidth="130px" data-options="editable:false,prompt:'请选择'"></div>
					<div><input id="addCarriveId" name="carriveId"  class="easyui-combobox" required="true" label="司机所属: " labelWidth="130px" data-options="prompt:'请输入关键字'"></div>
					<div><input id="addMobilePhone" name="mobilePhone"  class="easyui-textbox" required="true" label="手机号: " labelWidth="130px" validtype="phoneNum" data-options="prompt:'请输入手机号'"></div>
					<div><input id="addIdCard" name="idCard"  class="easyui-textbox" required="true" label="身份证号: " labelWidth="130px" validtype="idcard" data-options="prompt:'请输入身份证号'"></div>
					<div><input id="addEmergencyContact" name="emergencyContact"  class="easyui-textbox" label="紧急联系人: " labelWidth="130px" validtype="length[0,25]" data-options="prompt:'请输入联系人'"></div>
					<div><input id="addEmergencyNumber" name="emergencyNumber"  class="easyui-textbox"  label="紧急手机号: " labelWidth="130px" validtype="phoneNum" data-options="prompt:'请输入紧急手机号'"></div>
					<div><input id="addDrivingModel" name="drivingModel"  class="easyui-combobox" required="true" label="准驾车型: " labelWidth="130px" data-options="editable:false,prompt:'请选择'"></div>
					<div><input id="addDrivingNumber" name="drivingNumber"  class="easyui-textbox" required="true" label="驾驶证号: " labelWidth="130px" data-options="validType:['englishNumber','length[0,25]'],prompt:'请输入驾驶证号'"></div>
					<div><input id="addDrivingUsefulTime" name="drivingUsefulTime"  class="easyui-datebox" required="true" label="驾驶证有效期: " labelWidth="130px" data-options="editable:false,prompt:'年-月-日'"></div>
					<div><input id="addCertificateId" name="certificateId"  class="easyui-textbox" required="true" label="从业资格证号: " labelWidth="130px" data-options="validType:['englishNumber','length[0,25]'],prompt:'请输入从业证号'"></div>
					<div><input id="addCertificateUsefulTime" name="certificateUsefulTime"  class="easyui-datebox" required="true" label="从业资格有效期: " labelWidth="130px"   data-options="editable:false,prompt:'年-月-日'"></div>
					<div><input id="addDriverOrg" name="driverOrg" class="easyui-combobox" label="所属分拨中心: " required="true"  labelWidth="130px" data-options="prompt:'请输入关键字'"></div>
					<div><input id="addUsableFlag" name="usableFlag" class="easyui-combobox" label="当前是否可用: " required="true"  labelWidth="130px"data-options="editable:false,prompt:'请选择'" ></div>
					<div><a href="#" class="easyui-linkbutton" style="background-color: #541B86;margin-left: 50px;" onclick="openUpload(idCardUrl,'suc','bkg','DRIVER_ID_CARD')"><span style="color: white">身份证附件</span></a></div>
					<div><a href="#" class="easyui-linkbutton" style="background-color: #541B86;" onclick="openUpload(driverPhotoUrl,'suc','bkg','DRIVER_HEAD')"><span style="color: white">司机大头照</span></a></div>
					<div><a href="#" class="easyui-linkbutton" style="background-color: #541B86;" onclick="openUpload(drivingFileUrl,'suc','bkg','DRIVER_DRIVING_LICENCE')"><span style="color: white">驾驶证附件</span></a></div>
					<div><a href="#" class="easyui-linkbutton" style="background-color: #541B86;" onclick="openUpload(certificateFileUrl,'suc','bkg','DRIVER_QUALIFICATION_CERTIFICATE')"><span style="color: white">从业资格证附件</span></a></div>
					<div class="multilineTextInput">
						<input id="addRemark" name="remark" data-options="multiline:true,prompt:'请输入备注信息'" class="easyui-textbox" label="备注: " labelWidth="130px" validtype="length[0,255]">
					</div>
				</form>
			</div>
		</div>
    </div>
    <!-- 新增司机界面 end -->
    
    <!-- 查看详情界面 begin -->
    <div id="dlgShowDriverManage" class="easyui-dialog" style="width:950px;height:450px; padding:0px" closed="true">
    	<div class="easyui-accordion ">	
    		<div class="search-form datagrid-toolbar">
		    	<form id="formShowDriverManage" method="post" enctype="multipart/form-data" style="float:left; margin: 20px auto;">
					<div><input id="showDriverName" name="driverName"  class="easyui-textbox" readonly="readonly" label="司机姓名: " labelWidth="130px" data-options="editable:false"></div>
					<div><input id="showPlateNumber" name="plateNumber"  class="easyui-textbox" readonly="readonly" label="车牌号: " labelWidth="130px" data-options="editable:false"></div>
					<div><input id="showDirverType" name="dirverType"  class="easyui-combobox" readonly="readonly" label="所属类型: " labelWidth="130px" data-options="editable:false"></div>
					<div><input id="showCarriveId" name="carriveId"  class="easyui-textbox" readonly="readonly" label="司机所属: " labelWidth="130px" data-options="editable:false"></div>
					<div><input id="showMobilePhone" name="mobilePhone"  class="easyui-textbox" readonly="readonly" label="手机号: " labelWidth="130px" data-options="editable:false"></div>
					<div><input id="showIdCard" name="idCard"  class="easyui-textbox" readonly="readonly" label="身份证号: " labelWidth="130px" data-options="editable:false"></div>
					<div><input id="showEmergencyContact" name="emergencyContact"  class="easyui-textbox" readonly="readonly" label="紧急联系人: " labelWidth="130px" data-options="editable:false"></div>
					<div><input id="showEmergencyNumber" name="emergencyNumber"  class="easyui-textbox" readonly="readonly" label="紧急手机号: " labelWidth="130px" data-options="editable:false"></div>
					<div><input id="showDrivingModel" name="drivingModel"  class="easyui-combobox" readonly="readonly" label="准驾车型: " labelWidth="130px" data-options="editable:false"></div>
					<div><input id="showDrivingNumber" name="drivingNumber"  class="easyui-textbox" readonly="readonly" label="驾驶证号: " labelWidth="130px" data-options="editable:false"></div>
					<div><input id="showDrivingUsefulTime" name="drivingUsefulTime"  class="easyui-datebox" readonly="readonly" label="驾驶证有效期: " labelWidth="130px" data-options="editable:false"></div>
					<div><input id="showCertificateId" name="certificateId"  class="easyui-textbox" readonly="readonly" label="从业资格证号: " labelWidth="130px" data-options="editable:false"></div>
					<div><input id="showCertificateUsefulTime" name="certificateUsefulTime"  class="easyui-datebox" readonly="readonly" label="从业资格有效期: " labelWidth="130px"   data-options="editable:false"></div>
					<div><input id="showDriverOrg" name="driverOrg" class="easyui-combobox" label="所属分拨中心: " readonly="readonly"  labelWidth="130px" data-options="editable:false"></div>
					<div><input id="showUsableFlag" name="usableFlag" class="easyui-combobox" label="当前是否可用: " readonly="readonly"  labelWidth="130px"data-options="editable:false" ></div>
					<div><a href="#" class="easyui-linkbutton" style="background-color: #541B86;margin-left: 50px;" onclick="openShowFile(idCardUrl,'suc','bkg','DRIVER_ID_CARD')"><span style="color: white">身份证附件</span></a></div>
					<div><a href="#" class="easyui-linkbutton" style="background-color: #541B86;" onclick="openShowFile(driverPhotoUrl,'suc','bkg','DRIVER_HEAD')"><span style="color: white">司机大头照</span></a></div>
					<div><a href="#" class="easyui-linkbutton" style="background-color: #541B86;" onclick="openShowFile(drivingFileUrl,'suc','bkg','DRIVER_DRIVING_LICENCE')"><span style="color: white">驾驶证附件</span></a></div>
					<div><a href="#" class="easyui-linkbutton" style="background-color: #541B86;" onclick="openShowFile(certificateFileUrl,'suc','bkg','DRIVER_QUALIFICATION_CERTIFICATE')"><span style="color: white">从业资格证附件</span></a></div>
					<div class="multilineTextInput">
						<input id="showRemark" name="remark" data-options="multiline:true" readonly="readonly" class="easyui-textbox" label="备注: " labelWidth="130px">
					</div>
				</form>
			</div>
		</div>
    </div>
    <!-- 查看详情界面 end -->
    <div id="divDriverBtn">
        <a href="javascript:void(0)" class="easyui-linkbutton save" onclick="saveDriver()">保存</a>
        <a href="javascript:void(0)" class="easyui-linkbutton reset" id='restNewDriver' onclick="restNewDriver()">重置</a>
        <a href="javascript:void(0)" class="easyui-linkbutton cancel" onclick="closeDriverDlg()">关闭</a>
    </div>
</body>
</html>