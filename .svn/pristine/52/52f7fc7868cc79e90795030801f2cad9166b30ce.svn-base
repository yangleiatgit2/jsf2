<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">    
<html xmlns="http://www.w3.org/1999/xhtml">   
<head>
	<%@include file="../component/common.jsp"%>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>SUC</title>
    <script type="text/javascript" src="${pageContext.request.contextPath}/scripts/component/highcharts.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/scripts/common/home/index.js"></script>
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
</head>
<body class="easyui-layout">
	<!-- <div style="text-align: left;font-size: 12px"><span><label>今日公告：业务统计信息......</label></span></div> -->
    <div style="text-align: left;font-size: 18px;" data-options="region:'center',border:false,plain:true">
	       <img alt="logo" src="${pageContext.request.contextPath}/images/component/home2.png" style="width:100%;height:340px;padding:10px 0 0 0;">
	       <img alt="logo"  src="${pageContext.request.contextPath}/images/component/you.png" style="width:340px;height:260px;float:right;padding: 10px 0 0 0">
	       		<div style="float:right;margin-right:-300px;margin-top:-38px;padding: 120px 0 0 0">有问题找小优</div>
	       </img>
	       <!-- <h4>  新平台使用常见问题</h4> -->
		<ul>
			<li> <!-- <p id="routeInfo" ></p> -->
				<span id="operatingInfo"></span><a id="download-a" href="${pageContext.request.contextPath}/scripts/component/document/SUC.ppt" download="支线运力共享.ppt" >点击下载操作文档</a><br>
			</li>
		</ul>
		<div id="shadow" style="width:20rem;
					height:7rem;
					background-color: #B5B5B5;
					border-radius:10px;
					margin-top: 19rem;
					float: right;
					margin-right: -26rem;
					"
					 hidden="true"  >
			<span  style="float:left; margin-left:-0.5rem;margin-top:-0.5rem;width:0.75rem; background-color: #B5B5B5" class="badge"></span>
		</div>
		<div id="newsRadio"  style="width:20rem;
					border-radius:10px;
					height:7rem;
					border:2px solid #6633ff;
					background-color:#FFFFFF;
					margin-top: 20rem;
					float: right;
					z-index: 9;
					margin-right: -25rem;z-index: 9"   hidden="true"  >
					<span id="totalVal" style="float:left; margin-left:-0.5rem;margin-top:-0.5rem; background-color: red" class="badge"></span>
					<button style="float: right;border: 0px;background-color: white;width: 1rem;height: 1rem;margin-right: 0.5rem" onclick="newsClose()">X</button>
					<input  id="newsId" name="id" type="text" hidden="true" />
					<textarea id="contents" rows="4" cols="29" style="border-radius:10px;margin-left:1rem; border: 0px;resize:none;background-color: white;" onclick="newsDetail()" readonly="true"></textarea>
		</div>
		<!-------------------------------------------------- 编辑页面处理 ------------------------------------------------------------------------------>
	<!-- begin dialog -->
	<div id="dlgNewsDetail" class="easyui-dialog" data-options="buttons:'#divDotAilityBtn'"  style="width:700px;height:400px;" closed="true">
					
			<div class="search-form datagrid-toolbar">
				<form id="formLineClass" style="float:left; margin: 20px auto;" action="#" method="post">
				<div ><input id="newsTitle" name="newsTitle" class="easyui-textbox" style="width:600px" labelwidth="100" label="消息标题: " readonly="true" ></div>
				<div class="multilineTextInput" >
						<!-- <input  label="消息内容: " labelwidth="100" style="width: 600px;" id="contents" name="contents"    class="easyui-textbox"  > -->
						<label style="margin-left: 4rem;margin-top: -5rem">消息内容:</label>
						<textarea style="width: 490px;height: 300px;resize: none;border-color: #FF8C00"  id="contents" name="contents"  readonly="true"></textarea>
				</div>
				
				</form>
			</div>
			<p style="border: 1px"></p>
			<div id="#divDotAilityBtn">
		        <a href="javascript:void(0)" style="float:right; margin-right: 7.3rem" class="easyui-linkbutton save" onclick="nextNews()">下一条</a>
    	</div>
	</div>
		
	</div>
	  
	<form id="form" action="">
		<input type="hidden" name="fileName" value="operationManual.docx"/>
	</form>
	<!-- <div data-options="region:'south',border:false" style="text-align:center;margin-top:152px">
		<p>Copyright(c)2017 优速物流有限公司版权所有</p>
	</div> -->
	
</body>
</html>