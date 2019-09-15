<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>信息提示管理</title>
<%@include file="../component/common.jsp"%>

<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/news/newsDetail.js"></script>
<script>
	var cmsOrgType = "${sessionScope.CURRENT_USER.cmsOrgType}";
	  var empName = decodeURI("${sessionScope.CURRENT_USER.empName}");
</script>
</head> 
<body>
	<!-- begin pageview -->
	<div id="tlbNewsDetail">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formFindNewsDetail" action="#" style="float:left;margin:0 auto;" method="post">
					<!--  <input type="hidden" name="demandType" value="1"/>-->
					<div>
						<input id="findCreateTime" name="createTime" class="easyui-datebox" label="接收时间从: " labelwidth="100"  data-options="editable:false">					
					
						&nbsp至：&nbsp
						<input id="executeEndTime" name="updateTime" class="easyui-datebox" data-options="editable:false">
					</div>
					<div ><input id="findPlatform" name="platform" class="easyui-textbox" labelwidth="100" label="发送到: " ></div>	
					<div><input id="findReadTrue" name="readFlag" class="easyui-textbox" labelwidth="100" label="是否读取: " ></div>
					<!-- <div><input id="findUserPhone" name="userPhone" class="easyui-textbox" labelwidth="140" label="电话号码: " ></div> --> 
					<!-- <div class="query-reset"> -->
					<div class="fr" >
						<a href="#" class="easyui-linkbutton search"  data-options="plain:true" onclick="findNewsDetail()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true"  onclick="resetNewsDetail()">重置</a>
			    	</div>
				</form>
			</div>
		</div>
		<!-- begin table tool -->
		<div class="toolbar-margin" style="height: 34px;">
		<%-- <shiro:hasPermission name="lineclass_add">  --%>
			<a href="#" class="easyui-linkbutton"  style="float: right;" data-options="iconCls:'iconfont uce-export',plain:true" onclick="exportDot()">导出</a>
		</div>
		<!-- end table tool -->			
	</div>
	<!-- begin table -->
	<table id="tblNewsDetail" style="width:100%;" data-options="fit:true"></table>
	<!-- end table -->
	<!-- end pageview -->
	<!-------------------------------------------------- 新增弹框处理 ------------------------------------------------------------------------------>
	<!-- begin dialog -->
	<div id="dlgNewsPrompt" class="easyui-dialog" data-options="buttons:'#divDotAilityBtn'"  style="width:650px;height:480px;" closed="true">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formLineClass" style="float:left; margin: 20px auto;width:600px;height:350px;" action="#" method="post">
					<input id="myid"  name="id" type="hidden">
					<div><input id="platform" name="platform"  class="easyui-textbox" labelwidth="120"  label="发送端: " onchange="showUser()" ></div>
					<div id="newUserDiv" style="display:none" ><input id="newUser" name="newUser"  class="easyui-textbox" labelwidth="120"  ></div>
					<div style="margin-top:1.5rem"><input id="utf1" name="utf1"   class="easyui-textbox" labelwidth="120" style="width:520px" label="公告主题:"  ></div>
					<!-- <div><input id="news_content" name="news_content"   class="easyui-textbox" labelwidth="120" style="width:520px,height:400px" label="公告主题:"  ></div> -->
					<div style="margin-left: 6rem;margin-top: 2rem;"><lable>公告内容:</lable></div>
					<div style="margin-left: -0.2rem;margin-top: 1.5rem"><textarea rows="12" cols="54" id="newsContent" name="newsContent" style="resize:none"></textarea></div>
				
				</form>
				<a href="#" class="easyui-linkbutton save" onclick="saveNews()">保存消息</a>
				<a href="#" class="easyui-linkbutton save" onclick="sendNews()">发布消息</a>
				<a href="#" class="easyui-linkbutton cancel" onclick="$('#dlgNewsPrompt').window('close')">返回</a>
				
			</div>
		</div>
		
	</div>
	<div id="divFreightDemandBtn">
		
	</div>
	<!-- end dialog -->

</body>
</html>