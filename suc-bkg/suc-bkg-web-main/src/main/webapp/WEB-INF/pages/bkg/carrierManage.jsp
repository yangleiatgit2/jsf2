<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>承运商管理</title>
<%@include file="../component/common.jsp"%>
<%@include file="../component/upFile.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/basicData/carrierManage.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/cost/Validate.js"></script>
<style type="text/css">

.datagrid-toolbar .multilineTextInput {
	height: 200px !important;
}

.datagrid-toolbar .multilineTextInput .textbox {
	height: 200px !important;
}

.datagrid-toolbar .multilineTextInput span {
	height: 200px !important;
}

.datagrid-toolbar .multilineTextInput textarea {
	height: 200px !important;
}
.dialog-button {
	border:1px solid #CCCCCC;
	background: none;
	padding: 5px 30px;
} 
</style>
<script>
	var cmsOrgType = "${sessionScope.CURRENT_USER.cmsOrgType}";
	var empName = decodeURI("${sessionScope.CURRENT_USER.empName}");
	$(function(){
		$("#companyFullName").textbox({
			validType:"remote['${pageContext.request.contextPath}/carrierManage/checkExistsByCompanyFullName.do',getCompanyFullName]"
		});
	});
	function getCompanyFullName(){
		var id=$("#myid").val();
		var value=$("#companyFullName").textbox("getText");
		var obj={
				id:id,
				companyFullName:value
		}
		return obj;
	}
</script>
</head> 
<body>
	<!-- begin pageview -->
	<div id="tlbCarrier">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formFindCarrier" action="#" style="float:left;margin:0 auto;" method="post">
					<!--  <input type="hidden" name="demandType" value="1"/>-->
					<!-- <input id="createTime" name="createTime" type="hidden">
					<input id="updateTime" name="updateTime" type="hidden"> -->
					<div ><input id="findCompanyNature" name="companyNature" class="easyui-textbox" labelwidth="100" label="企业性质: " ></div>	
					<div ><input id="findCompanyFullName" name="companyFullName" class="easyui-textbox" labelwidth="100" label="承运商名称: "  data-options="prompt:'请填写',validType:['length[0,25]']"></div>	
					<div ><input id="findStatus" name="status" class="easyui-textbox" labelwidth="100" label="状态: " ></div>	
					<div >
						<input id="executeCreateTime" name="createTime" class="easyui-datebox" label="签约日期： " labelwidth="100" data-options="editable:false" >				
						&nbsp至&nbsp<input id="executeUpdateTime" name="updateTime" class="easyui-datebox"  data-options="editable:false" >
					</div>	
					<div   class="fr">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findCarrier()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetCarrier()">重置</a>
			    	</div>
				</form>
			</div>
		</div>
		<!-- -------------------------------------------------------------------------------------- -->
		<!-- -------------------------------------------------------------------------------------- -->
		<!-- begin table tool -->
		<div class="toolbar-margin">
		<shiro:hasPermission name="carrier_add">
			<a href="#" class="easyui-linkbutton"  data-options="iconCls:'iconfont uce-add',plain:true" onclick="addCarrier()">新增</a>
		</shiro:hasPermission>
		<shiro:hasPermission name="carrier_stop">
			<a href="#" class="easyui-linkbutton"  style="margin-left: 1rem;" data-options="iconCls:'iconfont uce-stop',plain:true" onclick="stopCarrier()">停用</a>
		</shiro:hasPermission>
		<shiro:hasPermission name="carrier_start">
			<a href="#" class="easyui-linkbutton "  style="margin-left: 1rem;" data-options="iconCls:'iconfont uce-qiyong-cricle',plain:true" onclick="startCarrier()">启用</a>
		</shiro:hasPermission>
		<shiro:hasPermission name="carrier_export">
			<a href="#" class="easyui-linkbutton fr" data-options="iconCls:'iconfont uce-export',plain:true"  onclick="exportCarrier()">导出</a>
		</shiro:hasPermission>
		</div>
		<!-- end table tool -->			
	</div>
	<!-- begin table -->
	<table id="tblCarrier" style="width:100%;" data-options="fit:true"></table>
	<div id="divtblCostHistory" class="easyui-dialog" data-options="buttons:'#divDotAilityBtn'"  style="width:800px;height:650px;" closed="true">
		<table id="tblCostHistory" style="width:90%;z-index:99;" data-options="fit:true"></table>
	</div>
	
	<!-- end table -->
	<!-- end pageview -->
	<!-------------------------------------------------- 编辑页面处理 ------------------------------------------------------------------------------>
	<!-- begin dialog -->
	<div id="dlgCarrier" class="easyui-dialog" data-options="buttons:'#divDotAilityBtn'"  style="width:1000px;height:1800px;" closed="true">
		<div class="easyui-accordion">			
			<div class="search-form datagrid-toolbar">
				<form id="formLineClass" style="float:left; margin: 20px auto;" action="#" method="post">
					<input id="myid"  name='id' type="hidden">
					<input id="version" name="version" type="hidden">
					<input id="createEmp"  name='createEmp' type="hidden">
					<input id="updateEmp"  name='updateEmp' type="hidden">
					<input id="companySimpleName"  name ="companySimpleName"  type="hidden">
					<div><input id="companyFullName" name="companyFullName" labelwidth="130"  class="easyui-textbox"  label="承运商名称 "  required="true" data-options="prompt:'请输入承运商名称',validType:['length[1,25]']" ></div>
					<div><input id="companyNature" name="companyNature" labelwidth="130"  class="easyui-combobox"  label="企业性质:" required="true"  data-options="validType:['selectNull'],prompt:'请选择'"></div>
					<!-- <div><input id="companyValidity" name="companyValidity" labelwidth="130"  class="easyui-datebox "  label="营业执照有效期:"  required="true" data-options="editable:false"></div>
					<div><input id="taxNo" name="taxNo" labelwidth="130"  class="easyui-textbox "  label="税号:"  required="true" data-options="prompt:'请填写税号',validType:['tax']"  ></div>
					<div><input id="orgCode" name="orgCode" labelwidth="130"  class="easyui-textbox "  label="组织机构代码:"  required="true" data-options="prompt:'请填写组织机构代码',validType:['length[1,25]']"  ></div>
					<div><input id="companyPhone" name="companyPhone" labelwidth="130"  class="easyui-textbox"  label="公司电话:" required="true" data-options="prompt:'请填写公司电话',validType:['phone']" ></div>
					<div><input id="fax" name="fax"  class="easyui-textbox" labelwidth="130"  label="传真:"  data-options="prompt:'请填写传真号码',validType:['faxno']" ></div>
					<div><input id="legalPersonName " name="legalPersonName"   class="easyui-textbox" labelwidth="130" label="公司法人姓名:"  required="true" data-options="prompt:'请填写法人姓名',validType:['myName']"    ></div>
					<div><input id="legalPersonNumber" name="legalPersonNumber"  class="easyui-textbox" labelwidth="130"  label="法人身份证号:"  required="true" data-options="prompt:'请填写法人身份证号码',validType:['idcard']"   ></div>
					<div><input id="legalPersonMobile" name="legalPersonMobile"  class="easyui-numberbox" labelwidth="130"  label="法人手机号:" required="true" data-options="prompt:'请填写法人手机号码',validType:['phoneNum']"  ></div>
					<div><input id="contactsName" name="contactsName"  class="easyui-textbox" labelwidth="130"  label="公司联系人:"  required="true" data-options="prompt:'请填写联系人姓名',validType:['myName']"  ></div>
					<div><input id="contactsNumber" name="contactsNumber"  class="easyui-textbox" labelwidth="130"  label="联系人身份证:"  required="true" data-options="prompt:'请填写联系人身份证号码',validType:['idcard']" ></div>
					<div><input id="contactsPosition" name="contactsPosition"  class="easyui-textbox" labelwidth="130"  label="联系人职位:" required="true"  data-options="validType:['selectNull'],prompt:'请选择'"   ></div>
					<div><input id="contactsMobile" name="contactsMobile"  class="easyui-numberbox" labelwidth="130"  label="联系人手机:" required="true" data-options="prompt:'请填写法人手机号码',validType:['phoneNum']"   ></div>
					<div><input id="postcode" name="postcode"  class="easyui-textbox" labelwidth="130"  label="邮政编码:"   data-options="prompt:'请填写邮政编码',validType:['zipcode']"    ></div>
					<div><input id="registeredCapital" name="registeredCapital"  class="easyui-numberbox" labelwidth="130"  label="注册资金:"   data-options="min:0,max:999999999.99,precision:2,prompt:'请输入注册资金'"   ></div>
					<div><input id="companyBeginTime" name="companyBeginTime"  class="easyui-datebox" labelwidth="130"  label="公司成立日期:"  data-options="editable:false"  ></div>
					<div><input id="businessScope" name="businessScope"  class="easyui-textbox" style="width:885px"  labelwidth="130" label="公司营业范围:"  data-options="prompt:'请填写公司营业范围',validType:['length[0,255]']"   ></div>
					<div><input id="registerProvinceCode" name="registerProvinceCode"  class="easyui-combobox" labelwidth="130"  label="公司注册地址:"   data-options="editable:false"  ></div>
					<div><input id="registerCityCode" name="registerCityCode"  class="easyui-combobox"  data-options="editable:false" ></div>
					<div><input id="registerAreaCode" name="registerAreaCode"  class="easyui-combobox"  data-options="editable:false" ></div>
					<div><input id="registerAddress" name="registerAddress"  class="easyui-textbox" style="width:240px"   data-options="prompt:'请填写',validType:['length[0,255]']"></div>
					<div><input id="actualProvinceCode" name="actualProvinceCode"  class="easyui-combobox" labelwidth="130"  label="公司经营地址:"  data-options="editable:false"  ></div> -->
					<div><input id="actualCityCode" name="actualCityCode"  class="easyui-combobox"  data-options="editable:false" ></div>
					<div><input id="actualAreaCode" name="actualAreaCode"  class="easyui-combobox"  data-options="editable:false" ></div>
					<div><input id="actualAddress" name="actualAddress"  class="easyui-textbox" style="width:240px"   data-options="prompt:'请填写',validType:['length[0,255]']" ></div>
					<div style="width:280px"><label style="margin-left:4rem">联系人身份证:</label><a href="#" class="easyui-linkbutton search" style="margin-left:7px" data-options="plain:true" onclick="openFile('CONTACTS_PHOTO')">上传</a>
						<input id="contactsPhoto"   name="contactsPhoto"  hidden="true">
					</div>
					<div style="width:280px"><label style="margin-left:4rem">信用代码附件:</label><a href="#" class="easyui-linkbutton search" style="margin-left:7px" data-options="plain:true" onclick="openFile('CREDIT_CODE')">上传</a>
						<input id="creditCodePhoto"   name="creditCodePhoto"  hidden="true">
					</div>
					<div style="width:280px"><label style="margin-left:3rem">第三方法人代表:</label><a href="#" class="easyui-linkbutton search" style="margin-left:7px" data-options="plain:true" onclick="openFile('THIRD_REPRESENTATIVE')">上传</a>
						<input id="legalPersonAuthPhoto"   name="legalPersonAuthPhoto"  hidden="true">
					</div>
					<div style="width:280px"><label style="margin-left:5rem">法人身份证:</label><a href="#" class="easyui-linkbutton search" style="margin-left:7px" data-options="plain:true" onclick="openFile('LEGAL_PERSON')">上传</a>
						<input id="legalPersonPhoto"   name="legalPersonPhoto"  hidden="true">
					</div>
					<div style="width:280px"><label style="margin-left:4rem">公司营业执照:</label><a href="#" class="easyui-linkbutton search" style="margin-left:7px" data-options="plain:true" onclick="openFile('LICENSN')">上传</a>
						<input id="licensePhoto"   name="licensePhoto"  hidden="true">
					</div>
					<div style="width:280px"><label style="margin-left:4rem">组织机构代码:</label><a href="#" class="easyui-linkbutton search" style="margin-left:7px" data-options="plain:true" onclick="openFile('ORG_PHOTO')">上传</a>
						<input id="orgPhoto"   name="orgPhoto"  hidden="true">
					</div>
					<div style="width:280px"><label style="margin-left:3rem">道路运输资格证:</label><a href="#" class="easyui-linkbutton search" style="margin-left:7px" data-options="plain:true" onclick="openFile('QUALIFICATIONS_PHOTO')">上传</a>
						<input id="qualificationsPhoto"   name="qualificationsPhoto"  hidden="true">
					</div>
					<div style="width:280px"><label style="margin-left:5rem">税务登记证:</label><a href="#" class="easyui-linkbutton search" style="margin-left:7px" data-options="plain:true" onclick="openFile('TAX_PHOTO')">上传</a>
						<input id="taxPhoto"   name="taxPhoto"  hidden="true">
					</div>
					
					
					<div class="multilineTextInput" >
						<input  label="备注: " labelwidth="120" style="width: 880px;" id="remark" name="remark"    class="easyui-textbox"  data-options="multiline:true,prompt:'内容不能超过255字'" validType="length[0,255]">
					</div>
				</form>
				
			</div>
			
		</div>
	</div>
	<div id="divDotAilityBtn">
		<a href="#" class="easyui-linkbutton" iconCls="icon-reload"  data-options="plain:true" onclick="resetAddCarrier()">重置</a>
		<a  href="#" class="easyui-linkbutton save"     onclick="saveCarrier()">保存</a>
		<a	 href="#" class="easyui-linkbutton cancel"   onclick="$('#dlgCarrier').window('close')">关闭</a>
		
	</div>
	<!-- end dialog -->

</body>
</html>