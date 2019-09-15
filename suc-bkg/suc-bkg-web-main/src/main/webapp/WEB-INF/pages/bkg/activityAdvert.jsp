<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>首页banner管理</title>
<%@include file="../component/common.jsp"%>

<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/activityAdvert/activityAdvert.js"></script>
<script>
	var cmsOrgType = "${sessionScope.CURRENT_USER.cmsOrgType}";
</script>
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
	<div id="toolbarTransportEffective">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formFindTransportEffective" action="#" style="float:left;margin:0 auto;" method="post">
					<!-- <div><input id="findStartSiteCode" name="startSiteCode" class="easyui-textbox" label="始发站: "  data-options="prompt:'请选择始发站'"></div>			
					<div><input id="findEndSiteCode" name="endSiteCode" class="easyui-textbox" label="目的站: "  data-options="prompt:'请选择目的站'"></div>	
						 -->			
					<div><input id="name" name="name" class="easyui-textbox" label="活动名称: " ></div>
					<div><input id="findAppType" name="appType" class="easyui-textbox" label="app 类型: " ></div>
					<div class="fr">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findTransportEffective()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetTransportEffective()">重置</a>
			    	</div>
				</form>
			</div>
		</div>
		<!-- begin table tool -->
		<div class="toolbar-margin">
			 <shiro:hasPermission name="activity_advert_add">  
				<a href="#" onclick="openAddTransportEffective()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">新增</a>
			 </shiro:hasPermission>
			 <shiro:hasPermission name="activity_advert_del"> 
				<a href="#" onclick="patchDelete()" class="easyui-linkbutton" iconCls="iconfont uce-delete"  data-options="plain:true">删除</a>
			 </shiro:hasPermission>
			
		</div>
		<!-- end table tool -->			
	</div>
	<!-- begin table -->
	<table id="tblTransportEffective" style="width:100%;" data-options="fit:true"></table>

	<!-------------------------------------------------- 编辑页面处理 ------------------------------------------------------------------------------>

	<div id="dlgTransportEffective" class="easyui-dialog" style="width:650px;height:380px;" closed="true" data-options="buttons:'#divTransportEffectiveBtn'">
		<div class="easyui-layout"  data-options="fit:true" >
    		<div class="search-form datagrid-toolbar" data-options="region:'center',collapsible:false">
    			<form id="formEditTransportEffective" method="post" enctype="multipart/form-data" style="float:left; margin: 20px auto;">
    				<input id='id' type="hidden" name="id" />
		    		<input id='version' type="hidden" name="version" />
		    		<input id='hidStartSite' type="hidden" name="startSite" />
					<input id="hidEndSite" name="endSite" type="hidden"/>
					<div>
						<input label="活动名称: "  id="name" name="name"    class="easyui-textbox"data-options="required:true">
					</div>
					<div>
						<input label="app 类型: "  id="formAppType" name="appType"  class="easyui-textbox" data-options="prompt:'请选择类型',onChange:plateFormAndAppTypeCommon"> 
					</div>
					<div>
						<!-- <input label="app平台: "  id="formPlatForm" name="platForm"    class="easyui-combobox" required="true"  data-options="prompt:'请选择平台',onChange:plateFormAndAppTypeCommon"> -->
						<input label="版本号: "  id="formAppVersion" name="appVersion"  class="easyui-combobox" required="true" data-options="valueField:'version',textField:'version',editable:false">
					</div>
					<div><input label="开始时间: " class="easyui-datebox" name="effectTime" id="effectTime" required="true" editable="false" ></div>
					<div><input label="结束时间: " class="easyui-datebox" name="expireTime" id="expireTime"  required="true"   editable="false"></div>
					<div>
						<input label="广告链接: " id="website" name="website" class="easyui-textbox"  style="width:600px">
					</div>
				  	<div id="fileboxDiv" >
						<input label="附件: " style="width: 600px" id="uploadFile" class="easyui-filebox" name="uploadFile" data-options="prompt:'请选择一个文件...' ,buttonText: '选择文件'"  >
			        </div>
				</form>
    		</div>
    	</div>
	</div>
	
	<!-- end dialog -->
	<div id="divTransportEffectiveBtn">
		<a href="#" class="easyui-linkbutton save" onclick="saveTransportEffective()">保存</a>
		<a href="#" class="easyui-linkbutton cancel" onclick= "javascript:$('#dlgTransportEffective').window('close')">关闭</a>
	</div>
</body>
</html>