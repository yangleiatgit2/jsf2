<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>移动端版本管理</title>
<%@include file="../component/common.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/common/mobileuser/mobileuser.js"></script>
<style type="text/css">
  .datagrid-toolbar .multilineTextInput .textbox {
    	width: 400px!important;
    	height: 50px!important;
    }    
    .datagrid-toolbar .multilineTextInput .textbox-text {
    	height: 50px!important;
    }

</style>

</head> 
<body>
	<!-- begin pageview -->
	<div id="tlbMobiluserBtn">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formdivMobiluser" action="#" style="float:left;margin:0 auto;" method="post">
					<div><input id="baseOrgCode" name="baseOrgCode" class="easyui-textbox" label="组织机构：" data-options="prompt:'请选择机构'"></div>
					<div><input id = "userType" name="userType" class="easyui-textbox" label="用户类型：" data-options="prompt:'请选择用户类型'"></div>
					<!-- <div class="query-reset"> -->
					<div class="fr">
					<!-- <div> -->
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findMobiluser()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="javascript:$('#formdivMobiluser').form('reset');">重置</a>
			    	</div>
			    	<!-- </div> -->
				</form>
			</div>
		</div>
		<!-- begin table tool -->
		<div id= 'dAppMobiluserBtn' class="toolbar-margin">
			<a href="#" onclick="openMobiluser()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">新增</a>
		</div>
		<!-- end table tool -->			
	</div>
	<!-- begin table -->
	<table id="tblAppMobiluser" style="width:100%;" data-options="fit:true"></table>
	<!-- end table -->
	<!-- end pageview -->
<!-- 新增begin -->
 <div id="dlgMobiluser" class="easyui-dialog" style="width:300px;height:450px; padding:0px" closed="true" buttons="#divMobiluserBtn">
    	<div class="easyui-accordion ">	
    		<div class="search-form datagrid-toolbar">
		    	<form id="formMobiluse" method="post" enctype="multipart/form-data" style="float:left; margin: 20px auto;">
		    		<input id="id" name='id' type="hidden" />
					<div><input id = "fmmobilephone" name="mobilephone" class="easyui-textbox" label="手机号：" required="true" labelwidth="100" data-options="prompt:'请输入手机号'"></div>
					<div><input id = "fmidCard" name="idCard" class="easyui-textbox" label="身份证号码：" required="true" validtype="idcard" labelwidth="100" data-options="prompt:'请输入身份证号码'"></div>
					<div><input id = "fmuserName" name="userName" class="easyui-textbox" label="姓名: " required="true"  labelwidth="100" data-options="prompt:'请输入姓名'" ></div>
					<div><input id = "fmbaseOrgCode" name="baseOrgCode" class="easyui-textbox" label="所属机构：" required="true" labelwidth="100" data-options="prompt:'请选择所属机构'"></div>
					<div><input id = "fmuserType" name="userType" class="easyui-textbox" label="用户类型：" required="true" labelwidth="100"data-options="prompt:'请选择用户类型'"></div>
					<div><input id = "fmcertifiFlag" name="certifiFlag" class="easyui-textbox" label="认证标示："  required="true" labelwidth="100"data-options="prompt:'请选择选择认证'"></div>
					<!-- <div class="multilineTextInput">
						<input id="addRemark" name="remark" data-options="multiline:true,prompt:'请输入备注信息'" label="标题" class="easyui-textbox" labelWidth="130px" validtype="length[0,256]">
					</div> -->
				</form>
			</div>
		</div>
    </div>
        <div id="divMobiluserBtn">
        <a href="javascript:void(0)" class="easyui-linkbutton save" onclick="saveMobiluser()">保存</a>
        <a href="javascript:void(0)" class="easyui-linkbutton cancel" onclick="javascript:closeDialog('dlgMobiluser')">关闭</a>
    </div>
<!-- 新增end -->
</body>
</html>