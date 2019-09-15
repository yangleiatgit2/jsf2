<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
	<%@include file="../component/common.jsp"%>
	<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/iaConf/iaConf.js"></script>
	<title>智能算法参数配置</title>
	<script type="text/javascript">
		//获取当前用户信息
		var cmsOrgType = "${sessionScope.CURRENT_USER.cmsOrgType}";
		var cmsBaseOrgCode = "${sessionScope.CURRENT_USER.cmsBaseOrgCode}";
		var cmsOrgCode = "${sessionScope.CURRENT_USER.cmsOrgCode}";
	</script>	
	<style type="text/css">
	._2word + span {
		min-width:50px!important;
	    width: 125px!important;
	 }
	._1word + span {
		min-width:50px!important;
	  	width: 138px!important;
	}
	</style>
</head>
<body>
	<div id="tlbIAConf">
		<div class="easyui-accordion">
			<div class="search-form" >
				<form id="formCondition" style="float:left;margin:0 auto;">
					<div><input label="分拨中心:" id="cmbgdFindOrgCode" style="width:150px" name="orgCode" class="easyui-textbox" labelPosition="left" data-options="prompt:'请选择机构'"></div>
					<div class="">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findIAConf()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetIAConf()">重置</a>
			    	</div>
				</form>
			</div>
		</div>
		<!-- 按钮 -->
		<div class="toolbar-margin">
			<shiro:hasPermission name="iaConf_add">
				<a href="#" onclick="openAddIAConf()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">新增</a>
			</shiro:hasPermission>
		</div>
	</div>
	<table id="dgIAConf" style="width:100%;" data-options="fit:true"></table>
	
	<!-- 新增/编辑参数配置界面 -->
	<div id="dlgIAConf" class="easyui-dialog" style="width:780px;height:300px;" closed="true" data-options="buttons:'#btnIAConf'">
		<div class="easyui-layout"  data-options="fit:true" >
    		<div class="search-form datagrid-toolbar" data-options="region:'center',collapsible:false">
    			<form id="formIAConf" style="float:left; margin: 20px auto;">
    				<input id='id' type="hidden" name="id" />
		    		<input id='version' type="hidden" name="version" />
					<div>
						<input id='hideOrgName' type="hidden" name="orgName" />
						<input label="分拨中心：" id="cmbgdOrgCode" name="orgCode" class="easyui-textbox" labelWidth="190px" labelPosition="left" data-options="required:true">
					</div>
					<div><input label="满载率阈值："  name="fullLoadRate"  class="easyui-numberbox" labelWidth="230px" data-options="suffix:'%',min:1,max:100,prompt:'1~100'"></div>
					<div><input label="到达时间阈值(分钟)："  name="arrivalTimeThreshold" labelWidth="190px"  class="easyui-numberbox" data-options="min:0,max:30,prompt:'0~30'"></div>
					<div><input label="并行到集货点的最大行驶时间(分钟)："  name="maxParallelTimes" labelWidth="230px" class="easyui-numberbox" data-options="min:0,max:60,required:true,prompt:'0~60'"></div>
					<div><input label="并行网点货量最大值(方)："  name="maxParallelVolume" labelWidth="190px" class="easyui-numberbox" data-options="min:0,max:15,required:true,prompt:'0~15'"></div>
					<div><input label="集货点处理能力松弛系数："  name="capacitySlack" labelWidth="230px" class="easyui-numberbox" data-options="min:0,max:1,precision:2,required:true,prompt:'0~1'"></div>
				</form>
    		</div>
    	</div>
	</div>
	<div id="btnIAConf">
		<a href="#" class="easyui-linkbutton save" onclick="saveIAConf()">保存</a>
		<a href="#" class="easyui-linkbutton cancel" onclick="closeIAConf()">关闭</a>
	</div>
</body>
</html>