<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>移动端版本管理</title>
<%@include file="../component/common.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/common/appVersion/appVersion.js"></script>
<style type="text/css">
.datagrid-toolbar .multilineTextInput {
	height: 100px !important;
}

.datagrid-toolbar .multilineTextInput .textbox {
	height: 100px !important;
}

.datagrid-toolbar .multilineTextInput span {
	height: 98px !important;
}

.datagrid-toolbar .multilineTextInput textarea {
	height: 90px !important;
}

</style>

</head> 
<body>
	<!-- begin pageview -->
	<div id="tlbAppVersionBtn">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formdivAppVersion" action="#" style="float:left;margin:0 auto;" method="post">
					<div><input id="filePath" name="filePath" type="hidden"></div>
					<div><input id="appType" name="appType" class="easyui-textbox" label="app类型：" data-options="prompt:'请选择类型'"></div>
					<div><input id = "platfrom" name="platfrom" class="easyui-textbox" label="操作系统：" data-options="prompt:'请选择系统'"></div>
					<div><input id = "updateType" name="updateType" class="easyui-textbox" label="更新类型：" data-options="prompt:'请选择系统'"></div>
					<!-- <div class="query-reset"> -->
					<div class="fr">
					<!-- <div> -->
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findAppVersion()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="javascript:$('#formdivAppVersion').form('reset');">重置</a>
			    	</div>
			    	<!-- </div> -->
				</form>
			</div>
		</div>
		<!-- begin table tool -->
		<div id= 'dAppVersionBtn' class="toolbar-margin">
			<a href="#" onclick="openAddVersion()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">新增</a>
		</div>
		<!-- end table tool -->			
	</div>
	<!-- begin table -->
	<table id="tblAppVersion" style="width:100%;" data-options="fit:true"></table>
	<!-- end table -->
	<!-- end pageview -->
	<!-- 新增begin -->
 	<div id="dlgVersione" class="easyui-dialog" style="width:600px;height:450px;" closed="true" data-options="buttons:'#divVersionBtn'">
    	<div class="easyui-accordion ">	
    		<div class="search-form datagrid-toolbar">
		    	<form id="formAddVersion" method="post" enctype="multipart/form-data" style="float:left; margin: 5px auto;" action="#" >
		    		<input id="id" name='id' type="hidden" />
					<div><input id = "fmappType" name="appType" class="easyui-textbox" label="app类型: " required="true" data-options="prompt:'请选择类型'"></div>
					<div><input id = "fmplatfrom" name="platfrom" class="easyui-textbox" label="操作系统: " required="true" data-options="prompt:'请选择系统'"></div>
					<div><input id = "fmeffectTime" name="effectTime" class="easyui-datebox" label="生效时间: " required="true"  data-options="editable:false" ></div>
					<div><input id = "fmfroceFlag" name="froceFlag" class="easyui-textbox" label="强制更新: " required="true" data-options="prompt:'请选择系统'"></div>
					<div><input id = "fmupdateType" name="updateType" class="easyui-textbox" label="更新类型: " data-options="prompt:'请选择系统'"></div>
					<div id="fileboxDiv" >
						<input label="附件: " style="width: 500px" id="uploadFile" class="easyui-filebox" name="uploadFile" data-options="prompt:'请选择一个文件...',validType : ['fileSize[50,\'MB\']'] ,buttonText: '选择文件'"  >
			        </div>
			        <div id="iosDownLoadDiv">
						<input id = "url" name="url" style="width: 480px" class="easyui-textbox" label="下载路径: " labelWidth="80px" data-options="prompt:'请输入的下载路径'" >
			        </div>
					<div><input id = "fmversion" name="version" class="easyui-textbox" label="版本号:" required="true" data-options="prompt:'请输入版本号'"></div>
					<div><input id = "fmtitle" name="title" class="easyui-textbox" label="标题:" required="true" data-options="prompt:'请输入标题'"></div>
					<div class="multilineTextInput">
							<input  label="内容: " style="width: 500px;" id="contents" name="contents"  required="true"  class="easyui-textbox" data-options="multiline:true,prompt:'内容不能超过500字'" validType="length[0,500]">
							<!-- <span style="color:red">最多输入500汉字</span> -->
						</div> 
				</form>
			</div>
		</div>
    </div>
   	<div id="divVersionBtn">
        <a href="javascript:void(0)" class="easyui-linkbutton save" onclick="saveVersion()">保存</a>
        <a href="javascript:void(0)" class="easyui-linkbutton cancel" onclick="javascript:closeDialog('dlgVersione')">关闭</a>
    </div>
<!-- 新增end -->
</body>
</html>