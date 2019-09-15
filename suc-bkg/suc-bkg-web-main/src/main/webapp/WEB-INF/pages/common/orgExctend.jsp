<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>  
<html>  
<head>  
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />  
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />  
<title>百度地图</title>  
<%@include file="../component/common.jsp"%>
<%@include file="../component/upFile.jsp"%>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=${systemConfig.configValue}"></script>  
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/common/orgExctend/orgExctendMain.js"></script>
<script type="text/javascript" src="http://developer.baidu.com/map/jsdemo/demo/convertor.js"></script> 
<script type="text/javascript"> 
</script>  
<style type="text/css">  
body, html{width: 100%;height: 100%;overflow: hidden;margin:0;}
    #container{height:92%;width:99%;border:1px solid #bcbcbc;} 
    .div-inline{ display:inline} 
</style>  
</head>  
<body> 
    <!-- begin pageview -->
	<div id="tlbOrgExctend" class="datagrid-toolbar">
		<div class="easyui-accordion">			
			<div class="search-form">
				<form id="formFindOrgExctend" action="#" style="float:left;margin:0 auto;">
					<div><input id="operateCenterSearch" name="operateCenterSearch" class="easyui-textbox" label="分拨中心: " data-options="prompt:'请输入分拨中心'"></div>
					<div style="height:1px"><input id="orgNameSearch" name="orgNameSearch"  class="easyui-textbox" label="网点名称: " dislabelwidth="95" data-options="prompt:'请获取机构名称',validType:['length[1,32]','orgName']"></div>
					<div><input id="baseOrgCodeSearch" name="baseOrgCodeSearch" class="easyui-textbox" label="网点代码: " labelwidth="95" data-options="prompt:'请获取机构编号',validType:['length[1,32]','orgCode']"></div>
					<div style="margin-left:2px"><input id="orgStatus" name="orgStatus" class="easyui-combobox" labelWidth="110px" label="机构状态: " data-options="editable:false,prompt:'请选择'"></div>
					<div id="findBtn">
						<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="findOrgExctendData()">查询</a>
						<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="restFindOrgExctend()">重置</a>
			    	</div>
				</form>
			</div>
		</div>	
		<div class="toolbar-margin"> 
			<shiro:hasPermission name="orgExcted_add">
			     <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="iconfont uce-add" onclick="openAddOrgExctend()" plain="true">新增</a> 
			</shiro:hasPermission>
	  		<shiro:hasPermission name="orgExcted_enable">
			     <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="iconfont uce-qiyong-cricle" onclick="enableOrgExctend('1')" plain="true">启用</a>
	  		</shiro:hasPermission>
	  		<shiro:hasPermission name="orgExcted_stop">
			     <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="iconfont uce-stop" onclick="stopOrgExctend('0')" plain="true">停用</a>
	  		</shiro:hasPermission>
  		</div>
	</div>
    <table id="dataGridOrgExctend" class="easyui-datagrid" data-options="fit:true"></table>
    <!--新增页面  -->
    <div id="dlgNewOrgExctend" class="easyui-dialog" style="width:90%;height:100%; padding:0px" closed="true" buttons="#divDriverBtn">
    	<div class="easyui-layout" data-options="fit:true" style="width:100%;height:100%;"> 
    		<div data-options="region:'west'" style="width: 24%;">
           		<form id="siteInfoForm">
           		<div style="padding: 3px"><input id="operateCenter" name="operateCenter" class="easyui-textbox" label="上级机构: "  data-options="prompt:'上级机构',required: true" labelwidth="110px" style="width: 240px"></div>
           		<div style="padding: 3px"><input id="baseOrgCode" name="baseOrgCode" class="easyui-textbox" readonly="true" label="网点编号: " data-options="prompt:'网点编号自动生成',validType:['length[1,25]','baseOrgCode']" labelwidth="110px" style="width: 240px"></div>
           		<div style="padding: 3px"><input id="orgName" name="orgName" class="easyui-textbox" label="网点名称: " data-options="prompt:'网点名称',validType:['length[1,15]','orgName'],required: true" labelwidth="110px" style="width: 240px"></div>
           		<div style="padding: 3px"><input id="siteType" name="siteType" class="easyui-textbox" readonly="true" label="机构类型: "   labelwidth="110px" style="width: 240px"></div>
           		<div style="padding: 3px"><input id="siteChargeName" name="siteChargeName" class="easyui-textbox" label="联系人: " data-options="prompt:'联系人',validType:['length[1,25]','siteChargeName'],required: true" labelwidth="110px" style="width: 240px"></div>
           		<div style="padding: 3px"><input id="siteChargePhine" name="siteChargePhine" class="easyui-textbox" label="联系电话: " validtype="mobile" data-options="prompt:'联系电话',required: true" labelwidth="110px" style="width: 240px"></div>
           		<div style="padding: 3px"><input id="siteChargeMain" name="siteChargeMain" class="easyui-textbox" label="邮箱: " data-options="prompt:'邮箱',validType:['length[1,25]','email','siteChargeName']" labelwidth="110px" style="width: 240px"></div>
           		<div style="padding: 3px"><input id="province" name="province" class="easyui-combobox" label="所属区域: " data-options="editable:false,prompt:'省'" labelwidth="110px"  style="width: 240px"></div>
           		<div style="padding: 3px;float: right;margin-right: 50px"><input type="text" id="city" name="city" class="easyui-combobox" label=""  labelwidth="110px" style="width: 130px;" data-options="editable:false,prompt:'市',required: true"/></div>
           		<div style="padding: 3px;float: right;margin-right: 50px"><input id="region" name="region" class="easyui-combobox" label="" labelwidth="110px"  data-options="editable:false,prompt:'区/县',required: true" style="width: 130px" /></div>
           		<div style="padding: 3px"><input id="siteAdress" name="siteAdress" class="easyui-textbox" label="站点地址: " data-options="prompt:'站点地址',validType:['length[1,255]','siteAdress'], required: true" labelwidth="110px" style="width: 240px"></div>
           		<div style="padding: 3px"><input id="distanceOper" name="distanceOper" class="easyui-numberbox" label="离中心里程: " data-options="prompt:'离中心里程',max:1000,min:1,precision:2" labelwidth="110" style="width: 240px">KM</div>
           		<div style="padding: 3px"><input id="portLimit" name="portLimit" class="easyui-textbox" label="进港限制车型: " data-options="prompt:'请选择'" labelwidth="110px" style="width: 240px"></div>
           		<div style="padding: 3px"><input id="departLimit" name="departLimit" class="easyui-textbox" label="出港限制车型: " data-options="prompt:'请选择'" labelwidth="110px" style="width: 240px"></div>
           		<div style="padding: 3px"><input id="processingCapacity" name="processingCapacity" class="easyui-numberbox" label="集货点处理能力: " data-options="prompt:'集货点处理能力',required: true,max:10000,min:1,precision:2" labelwidth="110px" style="width: 240px">方</div>
           		<input type="hidden" name="region" id="regionId" >
           		</form>
	           	<div class="fr" style="margin-right: 50px">
					<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="saveLocationSit()">保存</a>
					<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="locationSit()">定位</a>
				</div>
    		</div>   
    		<div data-options="region:'east'" style="width: 76%">
   			    <div class="search-form">
            		<form id="formFindDemandCombine" action="#" style="float:left;margin:0 auto;" method="post">
							<div><input id="lng" name="lng" class="easyui-textbox" label="经度: " data-options="readonly:true,prompt:'经度',required: true" ></div>
							<div><input id="lat" name="lat" class="easyui-textbox" label="纬度: "  data-options="readonly:true,prompt:'纬度',required: true"></div>
							<div><input id="electronicRail" name="electronicRail" class="easyui-numberbox" label="电子围栏半径: " labelwidth="120"  data-options="prompt:'电子围栏半径',readonly:true,value:200,max:1000,min:1,precision:2,required: true">米</div>
					</form>
				</div>
    			<div  id="container" style="position: fixed;bottom: 0px" ></div>
    		</div>  
        </div>   
    </div>
</body>  
</html>  