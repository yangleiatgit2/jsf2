<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>消息模板管理</title>
<%@include file="../component/common.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/common/noticeRule/noticeRule.js"></script>
<style type="text/css">
  .datagrid-toolbar .multilineTextInput .textbox {
    	width: 400px!important;
    	height: 50px!important;
    }    
    .datagrid-toolbar .multilineTextInput .textbox-text {
    	height: 50px!important;
    }

</style>
<style type="text/css">
	div.desc .textbox{
		height: 48px !important;
	}
</style>

</head> 
<body>
	<!-- begin pageview -->
	<div id="tlbNoticeRouleBtn">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formdivNoticeRoule" action="#" style="float:left;margin:0 auto;" method="post">
					<div><input id="newsType" name="newsType" class="easyui-textbox" label="消息类型：" data-options="prompt:'请选择消息类型'"></div>
					<div><input id = "ruleCode" name="ruleCode" class="easyui-textbox" label="模板编码：" data-options="prompt:'请输入模板编码'"></div>
					<!-- <div class="query-reset"> -->
					<div class="fr">
					<!-- <div> -->
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findMobiluser()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="javascript:$('#formdivNoticeRoule').form('reset');">重置</a>
			    	</div>
			    	<!-- </div> -->
				</form>
			</div>
		</div>
		<!-- begin table tool -->
		<div id= 'dNoticeRouleBtn' class="toolbar-margin">
			<a href="#" onclick="openNoticeRoule()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">新增</a>
		</div>
		<!-- end table tool -->			
	</div>
	<!-- begin table -->
	<table id="tblNoticeRoule" style="width:100%;" data-options="fit:true"></table>
	<!-- end table -->
	<!-- end pageview -->
<!-- 新增begin -->
 <div id="dlgNoticeRoule" class="easyui-dialog" style="width:550px;height:350px; padding:0px" closed="true" buttons="#divNoticeRouleBtn">
    	<div class="easyui-accordion ">	
    		<div class="search-form datagrid-toolbar">
		    	<form id="formNoticeRoule" method="post" enctype="multipart/form-data" style="float:left; margin: 20px auto;">
		    		<input id="id" name='id' type="hidden" />
					<div><input id = "fmplatform" name="platform" class="easyui-textbox" label="指向平台：" required="true"  data-options="prompt:'请选择发送平台'"></div>
					<div><input id = "fmnewsType" name="newsType" class="easyui-textbox" label="消息类型：" required="true" data-options="prompt:'请选择消息类型'"></div>
					<div><input id = "fmruleCode" name="ruleCode" class="easyui-textbox" label="模板编码：" required="true" style="width:490px;height:50px" data-options="prompt:'请输入模板编码'"></div>
					<div><input id = "fmtitle" name="title" class="easyui-textbox" label="标题：" required="true"  style="width:490px;height:50px" data-options="prompt:'请输入模板标题'"></div>
					<div  class="desc"><input id = "fmcontents" name="contents" class="easyui-textbox" label="内容：" required="true"   style="width:490px;height:50px" data-options="prompt:'请输入模板内容'" ></div>
				</form>
			</div>
		</div>
    </div>
        <div id="divNoticeRouleBtn">
        <a href="javascript:void(0)" class="easyui-linkbutton save" onclick="saveNoticeRoule()">保存</a>
        <a href="javascript:void(0)" class="easyui-linkbutton cancel" onclick="javascript:closeDialog('dlgNoticeRoule')">关闭</a>
    </div>
<!-- 新增end -->
</body>
</html>