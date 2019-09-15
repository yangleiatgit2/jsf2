<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>公告发布流程</title>
<%@include file="../component/common.jsp"%>

<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/news/newsPrompt.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/cost/Validate.js"></script>
<script>
	var cmsOrgType = "${sessionScope.CURRENT_USER.cmsOrgType}";
	  var empName = decodeURI("${sessionScope.CURRENT_USER.empName}");
</script>
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

input#newUser + span{margin-left: 10px;} 
</style>
</head> 
<body>
	<!-- begin pageview -->
	<div id="tlbNewsPrompt">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formFindNewsPrompt" action="#" style="float:left;margin:0 auto;" method="post">
					<!--  <input type="hidden" name="demandType" value="1"/>-->
					<div >
						<input id="findCreateTime" name="createTime" class="easyui-datebox" label="发布时间从: " labelwidth="100"  data-options="editable:false">
					&nbsp至：&nbsp					
						<input  id="executeEndTime" name="updateTime" class="easyui-datebox" data-options="editable:false">
					</div>
					<div  ><input id="findPlatform" name="platform" class="easyui-textbox" labelwidth="100" label="发送到: " ></div>	
					<div ><input id="findReadTrue" name="status"  class="easyui-textbox" labelwidth="100" label="发布状态: " ></div>
					<!-- <div class="query-reset"> -->
					<div  class="fr">
						<a href="#" class="easyui-linkbutton search"  data-options="plain:true" onclick="findNewsPrompt()">查询</a>
						<a href="#" class="easyui-linkbutton reset"   data-options="plain:true" onclick="resetNewsPrompt()">重置</a>
			    	</div>
				</form>
			</div>
		</div>
		<!-- begin table tool -->
		<div class="toolbar-margin">
		<%-- <shiro:hasPermission name="lineclass_add">  --%>
			<a href="#" class="easyui-linkbutton" style="margin-left: 1rem;" data-options="iconCls:'iconfont uce-add',plain:true" onclick="addCost()">新增</a>
			<a href="#" class="easyui-linkbutton "  style="float: right;" data-options="iconCls:'iconfont uce-export',plain:true" onclick="exportDot()">导出</a>
		</div>
		<!-- end table tool -->			
	</div>
	<!-- begin table -->
	<table id="tblNewsPrompt" style="width:100%;" data-options="fit:true"></table>
	<!-- end table -->
	<!-- end pageview -->
	<!-------------------------------------------------- 新增弹框处理 ------------------------------------------------------------------------------>
	<!-- begin dialog -->
	<div id="dlgNewsPrompt" class="easyui-dialog" data-options="buttons:'#divDotAilityBtn'"  style="width:650px;height:490px;" closed="true">
		<div class="easyui-accordion">			
			<div class="search-form datagrid-toolbar">
				<form id="formLineClass" style="float:left; margin: 20px auto;width:600px;height:350px;" action="#" method="post">
					<input id="myid"  name="id"  type="hidden">
					<input id="utf1"  name="utf1"   type="hidden">
					<div><input id="platform" name="platform"  class="easyui-textbox" labelwidth="120"  label="发送端: " required="true"   data-options="validType:['selectNull'],prompt:'请选择发送端'" ><input id="newUser" name="phone"  class="easyui-textbox" labelwidth="120"></div>
					<div  style="width: 300px;" ><input id="txtNewsGrade" name="newsGrade" class="easyui-textbox" labelwidth="120"  label="消息等级: " data-options="validType:['selectNull'],prompt:'请选择消息等级'" ></div>
					<input  id="status"   name="status" type="hidden"/>
					<div><input id="utf1" name="newsTitle"   class="easyui-textbox" labelwidth="120" style="width:520px" label="公告主题:" required="true"   data-options="prompt:'请填写公告主题',validType:['length[1,30]']" ></div>
					<div class="multilineTextInput" >
						<input  label="内容: " labelwidth="120" style="width: 520px;" id="newsContent" name="newsContent"    class="easyui-textbox"   data-options="multiline:true,prompt:'内容不能超过500字'" validType="length[0,500]">
					</div>
				</form>
			</div>
		</div>
	</div>
	<div id="divDotAilityBtn">
	<!-- iconCls="icon-redo"  -->
		<a href="#" class="easyui-linkbutton save"  onclick="saveNews()">保存</a>
		<a href="#" class="easyui-linkbutton save"   onclick="sendNews()">发布</a>
		<a href="#" class="easyui-linkbutton cancel" onclick="$('#dlgNewsPrompt').window('close')">关闭</a>
	</div>
	<!-- end dialog -->


</body>
</html>