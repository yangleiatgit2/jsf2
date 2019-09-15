<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>时效管理</title>
<%@include file="../component/common.jsp"%>

<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/bkg/transportEffective/transportEffective.js"></script>
<script>
	var cmsOrgType = "${sessionScope.CURRENT_USER.cmsOrgType}";
</script>
</head> 
<body>
	<!-- begin pageview -->
	<div id="toolbarTransportEffective">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formFindTransportEffective" action="#" style="float:left;margin:0 auto;" method="post">
					<div><input id="findStartSiteCode" name="startSiteCode" class="easyui-textbox" label="始发站: "  data-options="prompt:'请选择始发站'"></div>			
					<div><input id="findEndSiteCode" name="endSiteCode" class="easyui-textbox" label="目的站: "  data-options="prompt:'请选择目的站'"></div>	
									
					<div><input id="findEffectiveStatus" name="status" class="easyui-textbox" label="线路状态: " ></div>
					<div class="fr">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findTransportEffective()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="resetTransportEffective()">重置</a>
			    	</div>
				</form>
			</div>
		</div>
		<!-- begin table tool -->
		<div class="toolbar-margin">
			 <shiro:hasPermission name="transport_effective_add">  
				<a href="#" onclick="openAddTransportEffective()"  class="easyui-linkbutton" data-options="iconCls:'iconfont uce-add',plain:true">新增</a>
			 </shiro:hasPermission>
			 <shiro:hasPermission name="transport_effective_export"> 
				<a href="#" onclick="exportTtansportEffective()" class="easyui-linkbutton fr" iconCls="iconfont uce-export"  data-options="plain:true">导出</a>
			</shiro:hasPermission>
			  <shiro:hasPermission name="transport_effective_import"> 
				<a href="#" onclick="importTtansportEffective()" class="easyui-linkbutton fr" iconCls="iconfont uce-import"  data-options="plain:true">导入</a>
			</shiro:hasPermission>
		</div>
		<!-- end table tool -->			
	</div>
	<!-- begin table -->
	<table id="tblTransportEffective" style="width:100%;" data-options="fit:true"></table>
	<!-- end table -->
	<!-- end pageview -->
	<!-------------------------------------------------- 编辑页面处理 ------------------------------------------------------------------------------>

	<div id="dlgTransportEffective" class="easyui-dialog" style="width:780px;height:300px;" closed="true" data-options="buttons:'#divTransportEffectiveBtn'">
		<div class="easyui-layout"  data-options="fit:true" >
    		<div class="search-form datagrid-toolbar" data-options="region:'center',collapsible:false">
    			<form id="formEditTransportEffective" style="float:left; margin: 20px auto;">
    				<input id='id' type="hidden" name="id" />
		    		<input id='version' type="hidden" name="version" />
		    		<input id='hidStartSite' type="hidden" name="startSite" />
					<input id="hidEndSite" name="endSite" type="hidden"/>
					<div>
						<!-- <input label="始发站" id="comStartsite" name="startSiteCode" class="easyui-textbox" labelWidth="190px" data-options="required:true"> -->
						<!-- <input label="始发站" id="comStartsite1" name="startSiteCode" class="easyui-textbox" labelWidth="190px" data-options="required:true"> -->
						<input label="始发站"  id="comStartsite1" name="startSiteCode"  labelPosition="left"  class="easyui-textbox" labelWidth="190px" data-options="required:true">
						<input label="目的站"  id="comEndsite" name="endSiteCode"  class="easyui-textbox" labelWidth="190px" data-options="required:true">
					</div>
					<!-- <div>
						<input label="目的站"  id="comEndsite" name="endSiteCode"  class="easyui-textbox" labelWidth="190px" data-options="required:true">
					</div> -->
					<div>
						<input label="线路距离(KM)" id="distance" name="distance" labelWidth="190px"  class="easyui-numberbox" required="true"  data-options="min:0,max:1000,precision:2,onChange:changeEffectiveByDistanceAndSpeed">
						<input label="线路速度(KM/H)"  id="speed" name="speed" labelWidth="190px" class="easyui-numberbox" required="true"  data-options="min:0,max:1000,precision:2,onChange:changeEffectiveByDistanceAndSpeed">
					</div>
					<!-- <div><input label="线路距离(KM)" id="distance" name="distance" labelWidth="190px"  class="easyui-numberBox" required="true"  data-options="onChange:function(){var distance=$('#distance').val();if (isNaN(distance)||distance=='0'||distance==0){$('#distance').textbox('setValue','');$('#effective').textbox('setValue','')};if(distance>1000){$('#distance').textbox('setValue','1000.00')};var arr=distance.split('.');if(arr.length==1){$('#distance').textbox('setValue',distance+'.00')};if(arr.length>1){if(arr[1].length==1){$('#distance').textbox('setValue',distance+'0')};if(arr[1].length>2){$('#distance').textbox('setValue',arr[0]+'.'+arr[1].substr(0,2))}};var speed=$('#speed').val();if (isNaN(speed)||speed=='0'||speed=='NaN'){$('#speed').textbox('setValue','')};if(distance>0 && speed>0){var effective=distance/speed*60;$('#effective').textbox('setValue',parseInt(effective));} }">
					<input label="线路速度(KM/H)"  id="speed" name="speed" labelWidth="190px" class="easyui-numberBox" required="true"  data-options="onChange:function(){var speed=$('#speed').val();if (isNaN(speed)||speed=='0'||speed==0){$('#speed').textbox('setValue','');$('#effective').textbox('setValue','')};if(speed>1000){$('#speed').textbox('setValue','1000.00')};var arr=speed.split('.');if(arr.length==1){$('#speed').textbox('setValue',speed+'.00')};if(arr.length>1){if(arr[1].length==1){$('#speed').textbox('setValue',speed+'0')};if(arr[1].length>2){$('#speed').textbox('setValue',arr[0]+'.'+arr[1].substr(0,2))}};var distance=$('#distance').val();if (isNaN(distance)||distance=='0'||distance==0||distance=='NaN'){$('#distance').textbox('setValue','');$('#effective').textbox('setValue','')};if(distance>0 && speed>0){var effective=distance/speed*60;$('#effective').textbox('setValue',parseInt(effective));} }">
					</div> -->
					<div><input label="时效(MIN)" id="effective" name="effective" labelWidth="190px" data-options="required:true,validType:'length[1,5]'"  class="easyui-numberbox"  required="true"></div>
				</form>
    		</div>
    	</div>
	</div>
	
	<!-- end dialog -->
	<div id="divTransportEffectiveBtn">
		<a href="#" class="easyui-linkbutton save" onclick="saveTransportEffective()">保存</a>
		<a href="#" class="easyui-linkbutton cancel" onclick="noSave=true,$('#dlgTransportEffective').window('close')">关闭</a>
	</div>
</body>
</html>