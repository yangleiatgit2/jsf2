function imformation(infoName,infoValue){
	this.infoName=infoName;
	this.infoValue=infoValue;
}
function Point(lng,lat){
	this.lng=lng;
	this.lat=lat;
}
function Polyline(pointArray,renderColor){
	this.pointArray=pointArray;
	this.renderColor=renderColor;
}
function objectVec(lng,lat, statue,imformations,polylinesArray,infoArr){
	this.lng=lng;
	this.lat=lat;
	this.statue=statue;
	this.imformations=imformations;
	this.polylinesArray=polylinesArray;
	this.infoArr=infoArr;
}

function showObjectsPolylines(cityName,objectList,flag){
	var me = this;
	// 城市定位
	if(cityName==null || cityName== '') {
		var point = new BMap.Point(objectList[0].lng, objectList[0].lat);
		map.setCenter(point);
	} else {
		map.setCenter("上海市");
	}

	// 车辆跟踪信息图标或者轨迹展示信息图标数组
	var markers = [];
	// 点坐标点数组
	var pointList = [];
	// 点数量
	var objLength = objectList.length;
	// 超过300点覆盖浏览器压力过大
	if(objLength > 300) {
		alert("车辆信息过多，无法显示！请输入详细筛选条件。");
		return;
	}
	var marker;
	// 显示所有的车辆：循环数组，根据状态将每个车辆的经纬度显示在地图上
	for(var i = 0;i < objLength;i++){
		var currentObejct = objectList[i] ;//当前对象
		var po = new BMap.Point(currentObejct.lng, currentObejct.lat);
		//轨迹展示终止点或者车辆跟踪的车辆信息图标
		if(currentObejct.statue =='car')
		{
			icon = new BMap.Icon(rootPath+'/icons/car_point.png',new BMap.Size(40,60));
		}
		if(currentObejct.statue =='groupCenter')
		{
			icon = new BMap.Icon(rootPath+'/icons/groupCenter_point.png',new BMap.Size(40,60));
		}
		if(currentObejct.statue =='sit')
		{
			icon = new BMap.Icon(rootPath+'/icons/sit_point.png',new BMap.Size(40,60));
		}
		//轨迹展示中间点信息图标
		if(currentObejct.statue =='label')
		{
			icon = new BMap.Icon(rootPath+'/icons/red.png',new BMap.Size(22,29));
		}
		marker = new BMap.Marker(po,{icon:icon});
		markers.push(marker);
		pointList.push(po);
		map.addOverlay(marker);
	}
	//鼠标悬浮，显示信息窗口
	/**
	 * 方案一：使用闭包
	 * 方案二：使用事件
	 * */
	// 车辆跟踪信息图标或者轨迹展示起始点信息弹出文本框设置
	for(var i = 0;i < markers.length;i++){
		(function(){
			var index = i;
			//鼠标悬浮：显示信息窗口
			markers[index].addEventListener('click',function(){
				var imformation = objectList[index].imformations;
				var s ='<span style="font-size: 13px;color: #808080;margin-top: 2px;">';
				for(var k = 0;k<imformation.length;k++)
				{
					if(imformation[k]!=null&&imformation[k].infoName != null && imformation[k].infoValue!= null) {
						if(imformation[k].infoName != "" && imformation[k].infoValue != "") {
							if(objectList[index].statue =='car'&&imformation[k].infoName=="当前发车计划号"){
								s +=imformation[k].infoName +'：' +imformation[k].infoValue +'<input type="button" id="moreDetailId" value="更多详情" onclick="vehicleDetail()"></br>';
							}else{
								s +=imformation[k].infoName +'：' +imformation[k].infoValue +'</br>';
							}
						}
					}
				}
				s +='</span>';
				var infoWindow = new BMap.InfoWindow(s) ;
				if(objectList[index].title != null)
				{
					infoWindow.setTitle('<span style="color:#373C64;font-size: 14px;">'+objectList[index].title+'</span>');
		    	}
				this.openInfoWindow(infoWindow);
				//鼠标移开:清除信息窗口
//				markers[index].addEventListener('mouseout',function(){
//					map.closeInfoWindow();	 
//				});
				
				ms.style.display = "block";
				add.style.display = "none";
				var infoObject=objectList[index].infoArr;
				if(objectList[index].statue =='groupCenter'){
					var sitTab = $('#suspendId').tabs('getTab',"网点信息").panel('options').tab; 
					var driverTab=$('#suspendId').tabs('getTab',"司机信息").panel('options').tab;
					var opratorTab=$('#suspendId').tabs('getTab',"分拨中心信息").panel('options').tab;
					opratorTab.show();
					sitTab.hide();  
					driverTab.hide(); 
					$("#suspendId").tabs("select",3);
					if(infoObject!=null){
						$('#operaterCenterLi').text("");
		    			$("#operaterCenterLi").append(infoObject.baseOrgCode+" "+infoObject.orgName);
		    			$('#operaterAdressLi').text("");
		    			$("#operaterAdressLi").append(infoObject.siteAdress);
		    			$('#operaterPhoneLi').text("");
		    			$("#operaterPhoneLi").append(infoObject.siteChargePhine);
					}
				}else if(objectList[index].statue =='sit'){
					$("#suspendId").tabs("select",4);
					var sitTab = $('#suspendId').tabs('getTab',"网点信息").panel('options').tab; 
					var driverTab=$('#suspendId').tabs('getTab',"司机信息").panel('options').tab; 
					var opratorTab=$('#suspendId').tabs('getTab',"分拨中心信息").panel('options').tab;
					sitTab.show();
					driverTab.hide(); 
					opratorTab.hide();
					if(infoObject!=null){
						$('#sitLi').text("");
		    			$("#sitLi").append(infoObject.baseOrgCode+" "+infoObject.orgName);
		    			$('#adressLi').text("");
		    			$("#adressLi").append(infoObject.siteAdress);
		    			$('#effectiveBeginTimeLi').text("");
		    			$("#effectiveBeginTimeLi").append("");
		    			$('#effectiveEndTimeLi').text("");
		    			$("#effectiveEndTimeLi").append("");
		    			$('#totalAmountLi').text("");
		    			$("#totalAmountLi").append("");
		    			$('#completeTotalAmountLi').text("");
		    			$("#completeTotalAmountLi").append("");
					}
				}
			});
		})();
	}
}