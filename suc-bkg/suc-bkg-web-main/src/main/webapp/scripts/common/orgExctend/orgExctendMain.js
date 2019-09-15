$(document).ready(function(){
	//扩展校验
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
	 //初始化数据字典
	initDictDatas("SITE_TYPE,ORG_STATUS,CAR_TYPE");
	uceDictCombobox('siteType','SITE_TYPE');
	uceDictCombobox('orgStatus','ORG_STATUS');
	uceDictCombobox('portLimit', 'CAR_TYPE');
	uceDictCombobox('departLimit', 'CAR_TYPE');
	orgCombogrid('operateCenterSearch', {
		orgTypes : [ORG_TYPE_OPERATE_CENTER],
		orgStatus : [ORG_ENABLED],
	});
	//初始化table表头
	var columns = initDriverManageTbl();
	//初始化页面table
	initTableData("dataGridOrgExctend",columns);
});
/*初始化table表数据*/
function initTableData(domId,columns){
	dataGridParams = {
			url : "",
			queryParams:null,
			pageSize : 10,
			singleSelect:'false',
			fitColumns : 'false',
			toolbar : '#tlbOrgExctend',
			onLoadError : function() {
				//在载入远程数据产生错误的时候触发。
				console.error('网点信息加载失败')
			}
		}
	dataGridParams.url = '';
	dataGridParams.queryParams = null;
	newloadGrid(domId,columns,dataGridParams);
}
function initDriverManageTbl(){
	var columns=[[  
	              	{field : "id",checkbox : "true"},
	              	{field : 'des',title : '操作',align : 'center',width : 70,formatter : function(value, rec, index) {
						return '<a class="icon-line iconfont uce-edit" title="编辑" onclick="editOrgExctend(\'edit\',\'' + index + '\')" href="javascript:void(0)"></a>';
					}
				    },
		      		{field:'baseOrgCode',title: '机构代码' ,align:'center',width: 120,formatter: function(value,row,index){
		      			return '<a id="det" title="' + value + '" onclick="viewOrgExctend(\'view\',\'' + index + '\')" style="text-decoration:underline;color:blue;" href="javascript:void(0)">'+value+'</a>';
		      		}},  
		      		{field:'orgName',title: '机构名称',align:'center',width: 80,formatter: formatTip},
		      		{field:'operateCenterName',title: '上级机构', align:'center',width: 100,formatter: formatTip},
		      		{field:'siteType',title: '机构类型', align:'center',width: 100,formatter:function(value){
		    			return getTypeNameByCode("SITE_TYPE", value,formatTip);
		    		}},
		      		{field:'siteChargeName',title: '联系人', align:'center',width: 80,formatter: formatTip} ,
		      		{field:'siteChargePhine',title: '联系人手机号', align:'center',width: 100,formatter: formatTip},
		      		{field:'siteChargeMain',title: '邮箱',align:'center',width: 100,formatter: formatTip},
		      		{field:'belongAreaName',title: '所属区域',align:'center',width: 100,formatter:  formatTip},
		      		{field:'siteAdress',title: '站点地址',align:'center',width: 100,formatter: formatTip},
		      		{field:'lng',title: '经度',align:'center',width: 100,formatter: formatTip},
		      		{field:'lat',title: '纬度',align:'center',width: 100,formatter:  formatTip},
		      		{field:'electronicRail',title: '电子围栏',align:'center',width: 100,formatter:  formatTip},
		      		{field:'distanceOper',title: '离中心里程',align:'center',width: 100,formatter:  formatTip},
		      		{field:'portLimit',title: '进港限制车型',align:'center',width: 100,formatter:function(value){
		    			return getTypeNameByCode("CAR_TYPE", value,formatTip);
		    		}},
		      		{field:'departLimit',title: '出港限制车型',align:'center',width: 100,formatter:function(value){
		    			return getTypeNameByCode("CAR_TYPE", value,formatTip);
		    		}},
		      		{field:'processingCapacity',title: '集货点处理能力',align:'center',width: 100,formatter: formatTip},
		      		{field:'orgStatus',title: '机构状态',align:'center',width: 50,formatter: function(value){
		      			return getTypeNameByCode("ORG_STATUS", value,formatTip);
		      		}}
		      	    ]];
		return columns;
}
/**
 * 根据条件查询
 */
function findOrgExctendData(){
	var options =$('#dataGridOrgExctend').datagrid('options');
	options.url= rootPath + "/orgExctend/findByCondition.do";
	$('#dataGridOrgExctend').datagrid('load',{
		operateCenter: $("#operateCenterSearch").textbox('getValue'),
		orgName:$("#orgNameSearch").textbox('getValue'),
		baseOrgCode:$("#baseOrgCodeSearch").textbox('getValue'),
		orgStatus:$("#orgStatus").textbox('getValue'),
	});
}
//打开新增司机对话框
function openAddOrgExctend(){
	sucareaCascade("province",'city','region');
	/* 数据字典加载 */
	initDictDatas('SITE_TYPE,CAR_TYPE');
	uceDictCombobox('siteType', 'SITE_TYPE');
	uceDictCombobox('portLimit', 'CAR_TYPE');
	uceDictCombobox('departLimit', 'CAR_TYPE');
	orgCombogrid('operateCenter', {
		orgTypes : [ORG_TYPE_OPERATE_CENTER],
		orgStatus : [ORG_ENABLED],
	});
	$('#processingCapacity').numberbox({ required: true });  
	openDialog("dlgNewOrgExctend", '新增机构');
	$('#siteInfoForm').form('clear');
	$("#siteType").combobox('setValue','03');//下拉框
	//加载地图显示(用setTimeout可以解决第二次打开时显示不全问题)
	setTimeout(function(){load();},200);
	$(".fr").show();
}
//新增保存
function saveLocationSit(){
	var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
	var provinceValue=$('#province').combobox('getValue');
	var provinceName=$('#province').combobox('getText');
	var cityValue=$('#city').combobox('getValue');
	var cityName=$('#city').combobox('getText');
	var regionValueHidden=$('#regionId').val();
	var regionValue=$('#region').combobox('getValue');
	//判断是否区域编码还是名称
	if($('#regionId').val()==""||re.test(regionValue)){
		regionValue=regionValue;
	}else{
		regionValue=regionValueHidden;
	}
	var regionName=$('#region').combobox('getText');
	var operateCenterName=$("#operateCenter").textbox('getText');
	var belongAreaName=provinceName+'-'+cityName+'-'+regionName;
	var belongAreaCode=regionValue;
	var lng=$('#lng').val();
	var lat=$('#lat').val();
	if(lng==null||lng==""){
		showWarnMsg("经度不能为空！");
		 return;
	}
	if(lat==null||lat==""){
		showWarnMsg("纬度不能为空！");	
		 return;
	}
	if($("#siteInfoForm").form('validate')){
		var orgExtend =serializeFormObj('siteInfoForm');
		orgExtend.lng=$('#lng').val();
		orgExtend.lat=$('#lat').val();
		orgExtend.electronicRail=$('#electronicRail').val();
		orgExtend.belongAreaName=belongAreaName;
		orgExtend.belongAreaCode=belongAreaCode;
		orgExtend.operateCenterName=operateCenterName;
		$.ajax({
	        url: '../orgExctend/saveOrUpdateOrgExtend.do',
	        data:orgExtend,
	        task: function(data,statusText,xhr){
	        	 $('#dlgNewOrgExctend').window('close'); 
	        	 $('#dataGridOrgExctend').datagrid('reload'); 
	        },
	        fail: function(data,statusText,xhr){
	          
	        }
	     });
	}
}
//定位操作
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
function load() {  
    var map = new BMap.Map("container");  
    var point = new BMap.Point(121.19424,31.163348); //默认中心点
    operationMap(map,point);
}  

function viewPage(type,index){
	/* 数据字典加载 */
	initDictDatas('SITE_TYPE,CAR_TYPE');
	uceDictCombobox('siteType', 'SITE_TYPE');
	uceDictCombobox('portLimit', 'CAR_TYPE');
	uceDictCombobox('departLimit', 'CAR_TYPE');
	orgCombogrid('operateCenter', {
		orgTypes : [ORG_TYPE_OPERATE_CENTER],
		orgStatus : [ORG_ENABLED],
	});
	
	/* 获取当前选择行 */
	var row = $('#dataGridOrgExctend').datagrid('getRows')[index];
	if (row) {
		url = rootPath + "/orgExctend/querySiteData.do";
		if(type=='view'){
			openDialog("dlgNewOrgExctend", '机构详情');
		}else if(type=='edit'){
			if(row.siteType=='03'){//如果编辑页面是集货点，则集货处理能力必填
				$('#processingCapacity').numberbox({ required: true }); 
			}else{
				$('#processingCapacity').numberbox({ required: false }); 
			}
			openDialog("dlgNewOrgExctend", '机构编辑');
		}
		$("#dlgNewOrgExctend").form('clear');
		$("#operateCenter").combogrid('setValue',row.operateCenter);
		$("#siteType").combobox('setValue','03');//下拉框
		sucareaCascade("province","city","region");
	    $("#province").combobox('setValue',row.provinceCode);//下拉框
	    $("#city").combobox('setValue',row.cityCode);//下拉框
	    $("#region").combobox('setValue',row.regionCode);//下拉框
	    $("#regionId").val(row.regionCode);
		$("#lng").textbox('setValue',row.lng);
		$("#lng").val(row.lng);
        $("#lat").textbox('setValue',row.lat);
		$("#lat").val(row.lat);
		$("#electronicRail").textbox('setValue','200');
	    $("#electronicRail").val('200');
	    if(row.processingCapacity==0){
	    	row.processingCapacity = undefined;
	    	row.distanceOper=undefined;
	    }
		$("#siteInfoForm").form('load', row);
	    //地图根据地址回显
		var map = new BMap.Map("container");
	    if(row.siteAdress!=null&&row.siteAdress!=''){
	    	// 创建地址解析器实例
	    	var myGeo = new BMap.Geocoder();
	    	map.clearOverlays();//清除地图上原有的点
	    	// 将地址解析结果显示在地图上,并调整地图视野
	    	myGeo.getPoint(row.siteAdress, function(point){
	    		if (point) {
	    			$("#lng").textbox('setValue',point.lng);
	    			$("#lng").val(point.lng);

	    		    $("#lat").textbox('setValue',point.lat);
	    		    $("#lat").val(point.lat);
	    			map.centerAndZoom(point, 16);
	    			map.addOverlay(operationMap(map,point));
	    		    $('#lng').textbox('textbox').attr('readonly',true);
	    		    $('#lat').textbox('textbox').attr('readonly',true);
	    		}else{
	    			showWarnMsg("您选择地址没有解析到结果！");
	    		}
	    	}, "上海市");
	    }else{
	    	var point = new BMap.Point(121.19424,31.163348); //默认中心点
	        map.addControl(new BMap.NavigationControl()); //左上角控件  
	        map.enableScrollWheelZoom(); //滚动放大  
	        map.enableKeyboard(); //键盘放大  
	        map.centerAndZoom(point, 13); //绘制地图  
	        map.addOverlay(operationMap(map,point)); //标记地图  
	    }
	}else{
		showInfoMsg('请先选择数据');
	}
}
//打开编辑页面
function editOrgExctend(type,index){
	viewPage(type,index);
	$(".fr").show();
	isReadonly(false);
	//省市区可用
	$('#province').combobox('enable');  
	$('#city').combobox('enable');  
	$('#region').combobox('enable');  
	$('#operateCenter').combobox('enable'); 
	$('#portLimit').combobox('enable'); 
	$('#departLimit').combobox('enable'); 
}
//详情
function viewOrgExctend(type,index){
	//省市区不可用
	$('#province').combobox('disable');  
	$('#city').combobox('disable');  
	$('#region').combobox('disable');  
	$('#operateCenter').combobox('disable');  
	$('#portLimit').combobox('disable'); 
	$('#departLimit').combobox('disable'); 
	viewPage(type,index);
	$(".fr").hide();
	isReadonly(true);
}
//form标签是否可用
function isReadonly(value){
	$('#orgName').textbox('textbox').attr('readonly',value);
	$('#siteChargeName').textbox('textbox').attr('readonly',value);
	$('#siteChargePhine').textbox('textbox').attr('readonly',value);
	$('#siteChargeMain').textbox('textbox').attr('readonly',value);
	$('#siteAdress').textbox('textbox').attr('readonly',value);
	$('#distanceOper').textbox('textbox').attr('readonly',value);
	$('#processingCapacity').textbox('textbox').attr('readonly',value);
	$('#lng').textbox('textbox').attr('readonly',value);
	$('#lat').textbox('textbox').attr('readonly',value);
}
//启用操作
function enableOrgExctend(orgStatus){
	operateOrgExctend(orgStatus);
}
//停用操作
function stopOrgExctend(orgStatus){
	operateOrgExctend(orgStatus);
}
//启用\停用操作
function operateOrgExctend(orgStatus){
	if(getCheckedAdress()){
		if('1'==orgStatus){
			showErrorMsg('所选站点记录中有地址为空的，不能启用');
		}else if('0'==orgStatus){
			showErrorMsg('所选站点记录中有地址为空的，不能停用');
		}
		return;
	}
	if(getCheckedStatus(orgStatus)){
		if('1'==orgStatus){
			showErrorMsg('请勿重复提交已经启用的站点！');
		}else if('0'==orgStatus){
			showErrorMsg('请勿重复提交已经停用的站点！');
		}
		return ;
	}
	var selections = $('#dataGridOrgExctend').datagrid('getSelections');
	var ids="";
	for (var int = 0; int < selections.length; int++) {
		ids=ids+selections[int].id+",";
	}
	var flag="";
	if(orgStatus=='1'){
		flag="启用";
	}else if(orgStatus=='0'){
		flag="停用";
	}
	if(selections.length>0){
		showInfoMsg("是否确定"+flag+"该网点?",function(){
			//回显站点数据
		    $.post(rootPath + "/orgExctend/updateOrgStatus.do",{
		    	ids:ids.substring(0,ids.length-1),
		    	orgStatus:orgStatus
			},
			function(data,status){
				if(data.success){
					showTips(flag+"成功",'success');
					$('#dataGridOrgExctend').datagrid('reload'); 
				}
			});
		});
		
	}else{
		showInfoMsg('请先选择数据');
	}
}
//判断地址
function getCheckedAdress(status){
	var selections = $('#dataGridOrgExctend').datagrid('getSelections');
	for (var int = 0; int < selections.length; int++) {
		if(selections[int].siteAdress==null || selections[int].siteAdress==""){
			return true;
		}
	}
	return false;
}
//判断状态
function getCheckedStatus(status){
	var selections = $('#dataGridOrgExctend').datagrid('getSelections');
	for (var int = 0; int < selections.length; int++) {
		if(selections[int].orgStatus!=null || selections[int].orgStatus!=""){
			if(status==selections[int].orgStatus){
				return true;
			}
		}
	}
	return false;
}
//重置主查询
function restFindOrgExctend(){
	$('#formFindOrgExctend').form('reset');
}
