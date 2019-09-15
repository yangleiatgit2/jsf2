<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>  
<html>  
<head>  
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />  
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />  
<title>百度地图</title>  
<%@include file="../component/common.jsp"%>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=${systemConfig.configValue}"></script>  
<script type="text/javascript"> 
$(document).ready(function(){ 
	$.extend($.fn.validatebox.defaults.rules, {
		 phone: {// 验证电话号码
             validator: function (value) {
                 return /^((\d2,3)|(\d{3}\-))?(0\d2,3|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
             },
             message: '格式不正确,请使用下面格式:020-88888888'
         },
		 mobile: {// 验证手机号码
             validator: function (value) {
                 return /^(13|15|18)\d{9}$/i.test(value);
             },
             message: '手机号码格式不正确'
         },
         comboxValidate : {  
             validator : function(value, param,missingMessage) {  
                 if($('#'+param).combobox('getValue')!='' && $('#'+param).combobox('getValue')!=null){  
                     return true;  
                 }  
                 return false;  
             },  
             message : "{1}"  
         }
	});
	sucareaCascade("province",'city','region');
	/* 数据字典加载 */
	initDictDatas('SITE_TYPE,CAR_TYPE');
	uceDictCombobox('siteType', 'SITE_TYPE');
	uceDictCombobox('portLimit', 'CAR_TYPE');
	uceDictCombobox('departLimit', 'CAR_TYPE');
	uceDictCombobox('portSiteLimit', 'CAR_TYPE');
	uceDictCombobox('departSiteLever', 'CAR_TYPE');
	//加载树
	nosOrgTree("treeOrg","txtOrgName",{onClick: function(node) {
		$('#dgUser').datagrid("load", {
			'orgId' : node.id
		});
	}});
	$('#treeOrg').tree({
		onDblClick: function(node){
			$("#orgName").textbox('setValue',node.text);
			$("#orgName").val(node.text);
			$("#orgCode").textbox('setValue',node.id);
			$("#orgCode").val(node.id);
			//回显站点数据
		    $.post(rootPath + "/orgExctend/querySiteData.do",{
		    	baseOrgCode:node.id,
			},
			function(data,status){
				var siteArr=new Array();
				if(data.success){
					siteArr=data.data;
					if(siteArr!=null){
						/* 数据字典加载 */
						initDictDatas('SITE_TYPE,CAR_TYPE');
						uceDictCombobox('siteType', 'SITE_TYPE');
						uceDictCombobox('portLimit', 'CAR_TYPE');
						uceDictCombobox('departLimit', 'CAR_TYPE');
						
						
						
					
						$("#lng").textbox('setValue',siteArr.lng);
						$("#lng").val(siteArr.lng);
				        $("#lat").textbox('setValue',siteArr.lat);
						$("#lat").val(siteArr.lat);
						$("#electronicRail").textbox('setValue',siteArr.electronicRail);
					    $("#electronicRail").val(siteArr.electronicRail);
					    $("#siteType").combobox('setValue',siteArr.siteType);//下拉框
					    $("#siteChargeName").textbox('setValue',siteArr.siteChargeName);
					    $("#siteChargeName").val(siteArr.siteChargeName);
					    $("#siteChargePhine").textbox('setValue',siteArr.siteChargePhine);
					    $("#siteChargePhine").val(siteArr.siteChargePhine);
					    $("#siteChargeMain").textbox('setValue',siteArr.siteChargeMain);
					    $("#siteChargeMain").val(siteArr.siteChargeMain);
					    $("#siteAdress").textbox('setValue',siteArr.siteAdress);
					    $("#siteAdress").val(siteArr.siteAdress);
					    $("#distanceOper").textbox('setValue',siteArr.distanceOper);
					    $("#distanceOper").val(siteArr.distanceOper);
					    $("#portLimit").combobox('setValue',siteArr.portLimit);//下拉框
					    $("#departLimit").combobox('setValue',siteArr.departLimit);//下拉框
					    $("#portSiteLimit").textbox('setValue',siteArr.portSiteLimit);
					    $("#portSiteLimit").val(siteArr.portSiteLimit);
					    $("#departSiteLever").textbox('setValue',siteArr.departSiteLever);
					    $("#departSiteLever").val(siteArr.departSiteLever);
					    $("#processingCapacity").textbox('setValue',siteArr.processingCapacity);
					    $("#processingCapacity").val(siteArr.processingCapacity);
					    sucareaCascade("province",'city','region');
					    $("#province").combobox('setValue',siteArr.provinceCode);//下拉框
					    $("#city").combobox('setValue',siteArr.cityCode);//下拉框
					    $("#region").combobox('setValue',siteArr.regionCode);//下拉框
					    //地图根据地址回显
					    if(siteArr.siteAdress!=null){
					    	var map = new BMap.Map("container");
					    	// 创建地址解析器实例
					    	var myGeo = new BMap.Geocoder();
					    	map.clearOverlays();//清除地图上原有的点
					    	// 将地址解析结果显示在地图上,并调整地图视野
					    	myGeo.getPoint(siteArr.siteAdress, function(point){
					    		if (point) {
					    			$("#lng").textbox('setValue',point.lng);
					    			$("#lng").val(point.lng);

					    		    $("#lat").textbox('setValue',point.lat);
					    		    $("#lat").val(point.lat);
					    			map.centerAndZoom(point, 16);
					    			map.addOverlay(operationMap(map,point));
					    		}else{
					    			showWarnMsg("您选择地址没有解析到结果！");
					    		}
					    	}, "上海市");
					    }
					}else{
						$("#lng").textbox('setValue','');
						$("#lng").val('');
				        $("#lat").textbox('setValue','');
						$("#lat").val('');
						$("#electronicRail").numberbox('setValue','200');
						$('#siteInfoForm').form('reset');
					}
				}
			});
		}
	});
});

function load() {  
    var map = new BMap.Map("container");  
    var point = new BMap.Point(116.331398,39.897445); //默认中心点
    operationMap(map,point);
}  
function operationMap(map,point){
	var marker = new BMap.Marker(point);
	var opts = {  
        width: 250,     // 信息窗口宽度    
        height: 100,     // 信息窗口高度    
        //title: "信息窗口标题"  // 信息窗口标题    
    }  
    // 创建窗口信息对象。  
    var infoWindow = new BMap.InfoWindow("这里显示提示信息", opts);  
    marker.enableDragging(); //启用拖拽  
    marker.addEventListener("dragend", function (e) {  
        point = new BMap.Point(e.point.lng, e.point.lat); //标记坐标（拖拽以后的坐标）  
        marker = new BMap.Marker(point);  
        $("#lng").textbox('setValue',e.point.lng);
		$("#lng").val(e.point.lng);

        $("#lat").textbox('setValue',e.point.lat);
		$("#lat").val(e.point.lat);
        infoWindow = new BMap.InfoWindow("当前位置<br />经度：" + e.point.lng + "<br />纬度：" + e.point.lat, opts);  
        map.openInfoWindow(infoWindow, point);  
    })  

    map.addControl(new BMap.NavigationControl()); //左上角控件  
    map.enableScrollWheelZoom(); //滚动放大  
    map.enableKeyboard(); //键盘放大  
    map.centerAndZoom(point, 13); //绘制地图  
    map.addOverlay(marker); //标记地图  
    // 打开信息窗口，infoWindow是创建窗口信息对象的信息  
    //map.openInfoWindow(infoWindow, map.getCenter());  
    // 打开信息窗口  
    map.openInfoWindow(map.getCenter());  
    return marker;
}

function locationSit(){
	var siteAdress=$('#siteAdress').val();
	if(siteAdress==null||siteAdress==""){
		showWarnMsg("站点地址不能为空！");
		return;
	}
	var map = new BMap.Map("container");
	// 创建地址解析器实例
	var myGeo = new BMap.Geocoder();
	map.clearOverlays();//清除地图上原有的点
	// 将地址解析结果显示在地图上,并调整地图视野
	myGeo.getPoint(siteAdress, function(point){
		if (point) {
			$("#lng").textbox('setValue',point.lng);
			$("#lng").val(point.lng);

		    $("#lat").textbox('setValue',point.lat);
		    $("#lat").val(point.lat);
			map.centerAndZoom(point, 16);
			map.addOverlay(operationMap(map,point));
		}else{
			showWarnMsg("您选择地址没有解析到结果！");
		}
	}, "上海市");
}   
function saveLocationSit(){
	var provinceValue=$('#province').combobox('getValue');
	var provinceName=$('#province').combobox('getText');
	var cityValue=$('#city').combobox('getValue');
	var cityName=$('#city').combobox('getText');
	var regionValue=$('#region').combobox('getValue');
	var regionName=$('#region').combobox('getText');
	var belongAreaName=provinceName+'-'+cityName+'-'+regionName;
	var belongAreaCode=regionValue;
	var lng=$('#lng').val();
	var lat=$('#lat').val();
	var orgName=$('#orgName').val();
	var orgCode=$('#orgCode').val();
	var electronicRail=$('#electronicRail').val();
	if(lng==null||lng==""){
		showWarnMsg("经度不能为空！");
		 return;
	}
	if(lat==null||lat==""){
		showWarnMsg("纬度不能为空！");	
		 return;
	}
	if(orgName==null||orgName==""){
		showWarnMsg("机构名称不能为空！");
		 return;
	}
	if(orgCode==null||orgCode==""){
		showWarnMsg("机构编号不能为空！");
		 return;
	}
	if(electronicRail==null||electronicRail==""){
		showWarnMsg("电子围栏半径不能为空！");
		 return;
	}
	if($("#siteInfoForm").form('validate')){
		var orgExtend =serializeFormObj('siteInfoForm');
		orgExtend.orgName=$('#orgName').val();
		orgExtend.baseOrgCode=$('#orgCode').val();
		orgExtend.lng=$('#lng').val();
		orgExtend.lat=$('#lat').val();
		orgExtend.electronicRail=$('#electronicRail').val();
		orgExtend.belongAreaName=belongAreaName;
		orgExtend.belongAreaCode=belongAreaCode;
		$.ajax({
	        url: '../orgExctend/saveOrUpdateOrgExtend.do',
	        data:orgExtend,
	        task: function(data,statusText,xhr){
	        	 showInfoMsg("站点定位保存成功！")
	        },
	        fail: function(data,statusText,xhr){
	          
	        }
	     });
	}else{
		showWarnMsg("请注意左侧填入的数据验证不通过");
	}
	
}
</script>  
<style type="text/css">  
body, html{width: 100%;height: 100%;overflow: hidden;margin:0;}
    #container{height:92%;width:76%;border:1px solid #bcbcbc;} 
    .div-inline{ display:inline} 
</style>  
</head>  
<body onload="load()" class="easyui-layout"> 
	<div data-options="region:'west'" title="组织机构" style="width:15%;height:100%">
    	<div>
           <ul id="treeOrg"></ul>
    	</div>
	</div>
	<div data-options="region:'east'" style="width:85%;height:100%">
		<div class="easyui-layout" data-options="fit:true">   
            <div data-options="region:'north'" style="height:10%;width: 100%">
            	<div id="orgexxtends" style="margin-top: 15px">
					<div class="search-form">
						<form id="formFindDemandCombine" action="#" style="float:left;margin:0 auto;" method="post">
							<div style="height:1px"><input id="orgName" name="orgName" disabled="disabled" class="easyui-textbox" label="机构名称: " dislabelwidth="95" data-options="prompt:'请获取机构名称',validType:['length[1,32]','orgName'],required: true"></div>
							<div><input id="orgCode" name="orgCode" disabled="disabled" class="easyui-textbox" label="机构编号: " labelwidth="95" data-options="prompt:'请获取机构编号',validType:['length[1,32]','orgCode'],required: true"></div>
							<div class="fr">
								<a href="#" class="easyui-linkbutton search" data-options="plain:true" onclick="saveLocationSit()">保存</a>
								<a href="#" class="easyui-linkbutton reset" data-options="plain:true" onclick="locationSit()">定位</a>
							</div>
						</form>
					</div>
				</div>
            </div>   
            <div data-options="region:'south'" style="height:90%;width: 100%">
            	<div style="width: 23%;height:99%;float:left;border:1px solid #bcbcbc;">
            		<div style="margin-top: 40px">
	            		<form id="siteInfoForm">
	            		<div style="padding: 3px"><input id="siteType" name="siteType" class="easyui-combobox" label="站点类型: " validType="comboxValidate['siteType','请选择状态']" data-options="prompt:'站点类型',required: true" labelwidth="110px" style="width: 240px"></div>
	            		<div style="padding: 3px"><input id="siteChargeName" name="siteChargeName" class="easyui-textbox" label="联系人: " data-options="prompt:'联系人',validType:['length[1,25]','siteChargeName'],required: true" labelwidth="110px" style="width: 240px"></div>
	            		<div style="padding: 3px"><input id="siteChargePhine" name="siteChargePhine" class="easyui-textbox" label="联系电话: " validtype="mobile" data-options="prompt:'联系电话',required: true" labelwidth="110px" style="width: 240px"></div>
	            		<div style="padding: 3px"><input id="siteChargeMain" name="siteChargeMain" class="easyui-textbox" label="邮箱: " data-options="prompt:'邮箱',validType:['length[1,25]','email','siteChargeName']" labelwidth="110px" style="width: 240px"></div>
	            		<div style="padding: 3px"><input id="province" name="province" class="easyui-combobox" label="所属区域: " data-options="editable:false,prompt:'省'" labelwidth="110px"  style="width: 240px"></div>
	            		<div style="padding: 3px;float: right;margin-right: 24px"><input type="text" id="city" name="city" class="easyui-combobox" label=""  labelwidth="110px" style="width: 130px;" data-options="editable:false,prompt:'市',required: true"/></div>
	            		<div style="padding: 3px;float: right;margin-right: 24px"><input id="region" name="region" class="easyui-combobox" label="" labelwidth="110px"  data-options="editable:false,prompt:'区/县',required: true" style="width: 130px" /></div>
	            		<div style="padding: 3px"><input id="siteAdress" name="siteAdress" class="easyui-textbox" label="站点地址: " data-options="prompt:'站点地址',validType:['length[1,255]','siteAdress'], required: true" labelwidth="110px" style="width: 240px"></div>
	            		<div style="padding: 3px"><input id="distanceOper" name="distanceOper" class="easyui-numberbox" label="离中心里程: " data-options="prompt:'离中心里程',max:1000,min:1,precision:2" labelwidth="110" style="width: 240px">KM</div>
	            		<div style="padding: 3px"><input id="portLimit" name="portLimit" class="easyui-textbox" label="进港限制车型: " data-options="prompt:'进港限制车型'" labelwidth="110px" style="width: 240px"></div>
	            		<div style="padding: 3px"><input id="departLimit" name="departLimit" class="easyui-textbox" label="出港限制车型: " data-options="prompt:'出港限制车型'" labelwidth="110px" style="width: 240px"></div>
	            		<div style="padding: 3px"><input id="portSiteLimit" name="portSiteLimit" class="easyui-textbox" label="进港站点级别: " data-options="prompt:'进港站点级别',validType:['length[1,5]','portSiteLimit']" labelwidth="110px" style="width: 240px"></div>
	            		<div style="padding: 3px"><input id="departSiteLever" name="departSiteLever" class="easyui-textbox" label="出港站点级别: " data-options="prompt:'出港站点级别',validType:['length[1,5]','departSiteLever']" labelwidth="110px" style="width: 240px"></div>
	            		<div style="padding: 3px"><input id="processingCapacity" name="processingCapacity" class="easyui-numberbox" label="集货点处理能力: " data-options="prompt:'集货点处理能力',required: true,max:10000,min:1,precision:2" labelwidth="110px" style="width: 240px">方</div>
	            		</form>
            		</div>
            	</div>
            	<div>
            		<div class="search-form">
	            		<form id="formFindDemandCombine" action="#" style="float:left;margin:0 auto;" method="post">
								<div><input id="lng" name="lng" class="easyui-textbox" label="经度: " data-options="prompt:'经度',required: true" ></div>
								<div><input id="lat" name="lat" class="easyui-textbox" label="纬度: "  data-options="prompt:'纬度',required: true"></div>
								<div><input id="electronicRail" name="electronicRail" class="easyui-numberbox" label="电子围栏半径: " labelwidth="120"  data-options="prompt:'电子围栏半径',readonly:true,value:200,max:1000,min:1,precision:2,required: true">米</div>
						</form>
					</div>
            	</div>
            	<div style="float:left;" id="container" ></div>
            </div>   
        </div>   
	</div>
</body>  
</html>  