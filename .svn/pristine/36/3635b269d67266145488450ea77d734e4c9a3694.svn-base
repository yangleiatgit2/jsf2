$(function() {
	var carType='';
	$.extend($.fn.validatebox.defaults.rules,{  
		 carCode : {
	   	    validator: function(value) {
	   	    	var regex = /^[A-Za-z]{1}[A-Za-z0-9]{4}[A-Za-z0-9挂学警港澳]{1}$/;
		        return regex.test(value);
		     },
		    message: '输入的车牌号不符合标准.如:京A12345' 
	    }
	});
	//新增需求按钮暂隐藏
	$('#btnAddNeed').hide();
	/* 数据字典加载 */
	initDictDatas('CAR_BELONG_TYPE,PLATE_NUMBER');
	uceDictCombobox('carBelongType', 'CAR_BELONG_TYPE');
	uceDictCombobox('carSimpleName', 'PLATE_NUMBER');
	/* 加载组织下拉表单数据 */
    $("#carSimpleName").combobox("setValue", 1); 
	orgCombogrid('groupCenterCode', {
		orgTypes : [ORG_TYPE_OPERATE_CENTER],
		orgStatus : [ORG_ENABLED],
	});
	orgCombogrid('dotNameCode', {
		orgTypes : [ORG_TYPE_SITE],
		orgStatus : [ORG_ENABLED],
	});
	var sitTab = $('#suspendId').tabs('getTab',"网点信息").panel('options').tab; 
	var opratorTab=$('#suspendId').tabs('getTab',"分拨中心信息").panel('options').tab;
	var driverTab=$('#suspendId').tabs('getTab',"司机信息").panel('options').tab;
	driverTab.show();
	sitTab.hide();
	opratorTab.hide();

});
//点击最右边图片伸缩框显示，自己隐藏
function viewException(){
	ms.style.display = "block";
	add.style.display = "none";
}
//点击计划号显示异常信息
function exceptionDetailed(drivingPlanCode,exceptionCode){
	map.clearOverlays();//清除地图上原有的点
	ms.style.display = "block";
	$("#suspendId").tabs("select",0);
    $.post(rootPath + "/visibleTransport/queryExceptionInfo.do",{
    	drivingPlanCode:drivingPlanCode,
    	exceptionCode:exceptionCode
	},
	function(data,status){
	  	//查询异常信息
    	var exceptionArr=new Array();
    	//发车计划信息
    	var dirvingPlanArr=new Array();
		if(data.success){
	    	dirvingPlanArr=data.data.dirvingPlan;
	    	exceptionArr=data.data.exceptionList;
	    	lineGroupObj=data.data.lineGroup;
	    	carType=lineGroupObj.carType;
	    	if(dirvingPlanArr.length>0){
				if(exceptionArr!=null&&exceptionArr.length>0){
	    			if(exceptionArr[0].exceptionStatus=='2'){//已确认
	    				$('#btnExceptionConfirm').linkbutton('disable');//确认异常
	    				$('#btnExceptionBack').linkbutton('enable');//异常打回
	    				$('#btnStopDrivePlan').linkbutton('enable');//终止发车计划
	    				$('#btnNewLineGroup').linkbutton('enable');//新增发车计划
	    				$('#btnOpenExceptionSummary').linkbutton('enable');//异常小结
	    				$('#btnStopLineGroup').linkbutton('disable');//终止班次
	    				$('#btnRetiesDrivePlan').linkbutton('disable');//重绑发车计划
	    			}else if(exceptionArr[0].exceptionStatus=='1'){//待确认
	    				$('#btnExceptionReport').linkbutton('disable');//上报异常
	    				$('#btnExceptionConfirm').linkbutton('enable');//确认异常
	    				$('#btnExceptionBack').linkbutton('enable');//异常打回
	    				$('#btnOpenExceptionSummary').linkbutton('disable');//异常小结
	    				$('#btnStopDrivePlan').linkbutton('disable');//终止发车计划
	    				$('#btnStopLineGroup').linkbutton('disable');//终止班次
	    				$('#btnRetiesDrivePlan').linkbutton('disable');//重绑发车计划
	    				$('#btnNewLineGroup').linkbutton('disable');//新增发车计划
	    			}else if(exceptionArr[0].exceptionStatus=='3'&&lineGroupObj.status=='03'){//已终止，且班次状态：已终止
	    				$('#btnStopLineGroup').linkbutton('disable');//终止班次
	    				$('#btnNewLineGroup').linkbutton('enable');//新增发车计划
	    				$('#btnOpenExceptionSummary').linkbutton('enable');//异常小结
	    			}else if(exceptionArr[0].exceptionStatus=='3'){//已终止
	    				$('#btnStopLineGroup').linkbutton('enable');//终止班次
	    				$('#btnRetiesDrivePlan').linkbutton('enable');//重绑发车计划
	    				$('#btnOpenExceptionSummary').linkbutton('enable');//异常小结
	    			}
//	    			else if(exceptionArr[0].exceptionStatus=='3'&&lineGroupObj.status=='02'){//异常已终止，且班次状态：已生成发车计划
//	    				$('#btnOpenExceptionSummary').linkbutton('enable');//异常小结
//	    			}
	    			$('#btnWaitHandle').val(exceptionArr[0].exceptionStatusName);
				}else{
					$('#btnExceptionReport').linkbutton('disable');//上报异常
					$('#btnExceptionConfirm').linkbutton('disable');//确认异常
					$('#btnExceptionBack').linkbutton('disable');//异常打回
	    			$('#btnOpenExceptionSummary').linkbutton('disable');//异常小结
	    			$('#btnAddNeed').linkbutton('disable');//新增需求
	    			$('#btnStopDrivePlan').linkbutton('disable');//终止发车计划
	    			$('#btnRetiesDrivePlan').linkbutton('disable');//重绑发车计划
	    			$('#btnStopLineGroup').linkbutton('disable');//终止班次
	    			$('#btnNewLineGroup').linkbutton('disable');//新增发车计划
				}
	    		$('#drinverPlanStatusLi').text("");//发车计划状态
				$("#drinverPlanStatusLi").append("<font color='#F0E68C'>"+dirvingPlanArr[0].statusName+"</font>")
				$('#exceptionCodeLi').text("");
				$("#exceptionCodeLi").append(exceptionArr[0].exceptionCode);
				$('#exceptionTypeLi').text("");
				$("#exceptionTypeLi").append("<font color='red'>"+exceptionArr[0].exceptionTypeName+"</font>"); 
				$('#drivingPlanCodeLi').text("");
				$("#drivingPlanCodeLi").append(exceptionArr[0].startTrunkCode);
				
				$('#classCodeLi').text("");//班次单号
				$("#classCodeLi").append(dirvingPlanArr[0].lineGroupCode)
				$('#startLi').text("");//发车计划 起点
				$("#startLi").append(dirvingPlanArr[0].startOrgName)
				$('#endLi').text("");//发车计划终点
				$("#endLi").append(dirvingPlanArr[0].endOrgName)
				$('#throughLi').text("");//发车计划途经点
				$("#throughLi").append(data.data.throughAdress)
				$('#milesDiv').html("");//发车计划途经点
				$("#milesDiv").append("全程<font color='green'>"+dirvingPlanArr[0].dirverDistance+"</font>公里，已行驶<font color='green'>"+(dirvingPlanArr[0].lineGroupDistance==null?"(无)":dirvingPlanArr[0].lineGroupDistance)+"</font>公里");
		    }else{
		    	showErrorMsg("此发车计划单号已不存在了！");
		    }
		}else{
			$.messager.alert("提示", data.message, "info");
		}
	});
}
function viewMapPoint(infoArr,type,dirvingPlanArr){
	var drivPlanCodes="";
	if(dirvingPlanArr!=null&&dirvingPlanArr.length>0){
		for(var i=0;i<dirvingPlanArr.length;i++){
			drivPlanCodes=drivPlanCodes+dirvingPlanArr[i].drivingPlanCode+",";
		}
	}
	var objectVecs = new Array();
	var displayCity="上海-上海市";
	if(infoArr.length>0) {
		var informationArray = null;
		var information1 = null;
		var information2 = null;
		var information3 = null;
		var information4 = null;
		var information5 = null;
		var information6 = null;
		var information7 = null;

		var object = null;
		var renderColor = 'car';
		for(var i=0;i<infoArr.length;i++){
			informationArray = new Array();
			if("car"==type){
				renderColor = 'car';
				information1 = new imformation("当前发车计划号",infoArr[i]==null?"":infoArr[i].dirvingPlanCode);
				information2 = new imformation("车牌号",infoArr[i]==null?"":infoArr[i].plateNumbers);
				information3 = new imformation("司机",infoArr[i]==null?"":infoArr[i].carOwnerName);
				information4 = new imformation("司机手机号",infoArr[i]==null?"":infoArr[i].carOwnerMoble);
			}else if("groupCenter"==type){
				renderColor = 'groupCenter';
				information1 = new imformation("位置",(null==infoArr[i]?"无":infoArr[i].baseOrgCode)+"  "+(infoArr[i]==null?"":infoArr[i].orgName));
				information2 = new imformation("联系电话",infoArr[i]==null?"":infoArr[i].siteChargePhine);
				information3 = new imformation("地址",infoArr[i]==null?"":infoArr[i].siteAdress);
			}else if("sit"==type){
				renderColor = 'sit';
				information1 = new imformation("网点名称",null==infoArr[i]?"无":infoArr[i].baseOrgCode+"  "+infoArr[i].orgName);
				information2 = new imformation("发车计划号",""==drivPlanCodes?"无":drivPlanCodes);
				//information2 = new imformation("地址",null==infoArr[i]?"无":infoArr[i].siteAdress);
				information3 = new imformation("负责人姓名",null==infoArr[i]?"无":infoArr[i].siteChargeName);
				information4 = new imformation("负责人电话",null==infoArr[i]?"无":infoArr[i].siteChargePhine);
				//information5 = new imformation("当前运输的生效时间","2017-11-20");
				//information6 = new imformation("本月上报货量总方数","10");
				//information7 = new imformation("目前已完成的方数","2");
			}
		
			var pointArray = new Array();//点集合
			var polylinesArray = new Array();//线集合
			
			//遍历每一条车辆信息中所有的点信息
			var point = new Point(null==infoArr[i]?"":infoArr[i].lng, null==infoArr[i]?"":infoArr[i].lat);
			pointArray.push(point);
			
			var polyline = new Polyline(pointArray,renderColor);
			polylinesArray.push(polyline);
			
			informationArray.push(information1);
			informationArray.push(information2);
			informationArray.push(information3);
			informationArray.push(information4);
			informationArray.push(information5);
			informationArray.push(information6);
			informationArray.push(information7);
			
			object = new objectVec(null==infoArr[i]?"":infoArr[i].lng,null==infoArr[i]?"":infoArr[i].lat, renderColor,informationArray,polylinesArray,infoArr[i]);
			objectVecs.push(object);
		}
	} else {
		if("car"==type){
			 $.messager.alert("提示", "没有查询到车辆运输信息", "info");
		}else if("groupCenter"==type){
			 $.messager.alert("提示", "没有查询到分拨中心信息", "info");
		}else if("sit"==type){
			 $.messager.alert("提示", "没有查询到网点信息", "info");
		}
	}    
	showObjectsPolylines(displayCity,objectVecs,false);
}
//根据查询条件查询
function findVisibleTransport(){
	map.clearOverlays();//清除地图上原有的点
	var carSimple=$("#carSimpleName").combobox("getText");

	if(carSimple=="--请选择--"){
	  showWarnMsg("车牌号简称不能为空！");
	  return;
	}
	var sitTab = $('#suspendId').tabs('getTab',"网点信息").panel('options').tab; 
	var opratorTab=$('#suspendId').tabs('getTab',"分拨中心信息").panel('options').tab;
	var driverTab=$('#suspendId').tabs('getTab',"司机信息").panel('options').tab;
	driverTab.show();
	sitTab.hide();
	opratorTab.hide();
	$("#carSimple").val(carSimple);
	$('#formVisibleTransport').form({    
	    url: rootPath + '/visibleTransport/searchTransportInfo.do',   
	   // data:{carSimpleName:carSimple},
	    onSubmit: function(){    
	    },    
	    success:function(data){  
	    	//发车计划信息
	    	var dirvingPlanArr=new Array();
	    	//车辆信息
	    	var carInfoArr=new Array();
	    	//查询分拨中心信息
	    	var groupCenterInfoArr=new Array();
	    	//查询网点信息
	    	var sitInfoArr=new Array();
	    	//查询异常信息
	    	var exceptionArr=new Array();
	    	var data = eval('(' + data + ')');  
	    	if(data.success){
	    		dirvingPlanArr=data.data.dirvingPlan;
	    		carInfoArr=data.data.carInfo;
	    		groupCenterInfoArr=data.data.groupCenterInfo;
	    		sitInfoArr=data.data.sitInfo;
	    		exceptionArr=data.data.exceptionList;
	    		lineGroupObj=data.data.lineGroup;
	    		//展示点信息方法
	    		if(carInfoArr!=undefined &&carInfoArr.length>0){
	    			viewMapPoint(carInfoArr,"car");//展示车辆信息
	    			$('#vehicleNameLi').text("");
	    			$("#vehicleNameLi").append(carInfoArr[0].carOwnerName);
	    			$('#vehicleNoLi').text("");
	    			$("#vehicleNoLi").append(carInfoArr[0].plateNumbers);
	    			$('#phoneNunberLi').text("");
	    			$("#phoneNunberLi").append(carInfoArr[0].carOwnerMoble);
	    			
	    		}
	    		if(groupCenterInfoArr!=undefined&&groupCenterInfoArr.length>0){
	    			viewMapPoint(groupCenterInfoArr,"groupCenter");//展示分拨中心信息
	    		}
	    		if(sitInfoArr!=undefined&&sitInfoArr.length>0){
	    			viewMapPoint(sitInfoArr,"sit",dirvingPlanArr);//展示网点信息
	    		}
	    		var exceptionOptAreaDiv = document.getElementById("exceptionOptAreaDiv");
    			var hightOptAreaDiv = document.getElementById("hightOptAreaDiv");
    			var divExceptionArea = document.getElementById("divExceptionArea");
    			if(dirvingPlanArr!=undefined&&dirvingPlanArr.length>0){
	    		if(exceptionArr.length==0){
	    			$('#btnExceptionReport').linkbutton('enable');//上报异常
	    			$('#btnExceptionConfirm').linkbutton('disable');//确认异常不可用
	    			$('#btnExceptionBack').linkbutton('disable');//异常打回
	    			$('#btnOpenExceptionSummary').linkbutton('disable');//异常小结
	    			$('#btnAddNeed').linkbutton('disable');//新增需求
	    			$('#btnStopDrivePlan').linkbutton('disable');//终止发车计划
	    			$('#btnStopLineGroup').linkbutton('disable');//终止班次
	    			$('#btnRetiesDrivePlan').linkbutton('disable');//重绑发车计划
	    			$('#btnNewLineGroup').linkbutton('disable');//新增班次
	    			divExceptionArea.style.display = "none";
	    		}else if(exceptionArr!=null&&exceptionArr.length>0){
	    			if(exceptionArr[0].exceptionStatus=='2'){//已确认
	    				$('#btnExceptionConfirm').linkbutton('disable');//确认异常
	    				$('#btnExceptionBack').linkbutton('enable');//异常打回
	    				$('#btnStopDrivePlan').linkbutton('enable');//终止发车计划
	    				$('#btnNewLineGroup').linkbutton('enable');//新增发车计划
	    				$('#btnOpenExceptionSummary').linkbutton('enable');//异常小结
	    				$('#btnStopLineGroup').linkbutton('disable');//终止班次
	    				$('#btnRetiesDrivePlan').linkbutton('disable');//重绑发车计划
	    			}else if(exceptionArr[0].exceptionStatus=='1'){//待确认
	    				$('#btnExceptionReport').linkbutton('disable');//上报异常
	    				$('#btnExceptionConfirm').linkbutton('enable');//确认异常
	    				$('#btnExceptionBack').linkbutton('enable');//异常打回
	    				$('#btnOpenExceptionSummary').linkbutton('disable');//异常小结
	    				$('#btnStopDrivePlan').linkbutton('disable');//终止发车计划
	    				$('#btnStopLineGroup').linkbutton('disable');//终止班次
	    				$('#btnRetiesDrivePlan').linkbutton('disable');//重绑发车计划
	    				$('#btnNewLineGroup').linkbutton('disable');//新增发车计划
	    			}else if(exceptionArr[0].exceptionStatus=='3'&&lineGroupObj!=null&&lineGroupObj.status=='02'){//异常已终止，且班次状态：已生成发车计划
	    				$('#btnOpenExceptionSummary').linkbutton('enable');//异常小结
	    			}else if(exceptionArr[0].exceptionStatus=='3'&&lineGroupObj!=null&&lineGroupObj.status=='03'){//已终止，且班次状态：已终止
	    				$('#btnNewLineGroup').linkbutton('enable');//新增发车计划
	    				$('#btnOpenExceptionSummary').linkbutton('enable');//异常小结
	    			}else if(exceptionArr[0].exceptionStatus=='3'){//已终止
	    				$('#btnStopLineGroup').linkbutton('enable');//终止班次
	    				$('#btnRetiesDrivePlan').linkbutton('enable');//重绑发车计划
	    				$('#btnOpenExceptionSummary').linkbutton('enable');//异常小结
	    			}
	    			$('#btnWaitHandle').val(exceptionArr[0].exceptionStatusName);
	    			$('#exceptionCodeLi').text("");
	    			$("#exceptionCodeLi").append(exceptionArr[0].exceptionCode);
	    			$('#exceptionTypeLi').text("");
	    			$("#exceptionTypeLi").append("<font color='red'>"+exceptionArr[0].exceptionTypeName+"</font>"); 
	    		}
	    		
	    		//展示概括信息
	    		ms.style.display = "block";
	    		$('#drinverPlanStatusLi').text("");//发车计划状态
				$("#drinverPlanStatusLi").append("<font color='#F0E68C'>"+dirvingPlanArr[0].statusName+"</font>")
	    		$('#drivingPlanCodeLi').text("");//发车计划编码
				$("#drivingPlanCodeLi").append(dirvingPlanArr[0].drivingPlanCode)
				$('#classCodeLi').text("");//班次单号
				$("#classCodeLi").append(dirvingPlanArr[0].lineGroupCode)
				$('#startLi').text("");//发车计划 起点
				$("#startLi").append(dirvingPlanArr[0].startOrgName)
				$('#endLi').text("");//发车计划终点
				$("#endLi").append(dirvingPlanArr[0].endOrgName)
				$('#throughLi').text("");//发车计划途经点
				$("#throughLi").append(data.data.throughAdress)
				$('#milesDiv').html("");//发车计划途经点
				$("#milesDiv").append("全程<font color='green'>"+dirvingPlanArr[0].dirverDistance+"</font>公里，已行驶<font color='green'>"+(dirvingPlanArr[0].lineGroupDistance==null?"(无)":dirvingPlanArr[0].lineGroupDistance)+"</font>公里");
    			}
    			//更新左边异常列表
    			$("#excepList").html("");
				for(var i=0;i<exceptionArr.length;i++){
					$("#excepList").append("<div   style=\"margin-top: 0px;margin-left: 3px;border-style:solid; border-width:1px; border-color:#F0F0F0\">" +
							 "<div style=\"padding:3px;margin-left: 26px;margin-top: 5px\">"+ (new Date(exceptionArr[i].createTime)).toLocaleString()+"</div>"
	            			+"<div style=\"padding:3px;\"><i class=\"icon ion-ios-list-outline\" style=\"margin-left: 4px;\" ></i>&nbsp&nbsp异常编号："+exceptionArr[i].exceptionCode+"</div>"
		            		+"<div style=\"padding:3px;\">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp发车计划：<a href=\"#\" onclick=\"exceptionDetailed('"+exceptionArr[i].startTrunkCode+"')\" >"+exceptionArr[i].startTrunkCode+"</a></div>"
	            			+"<div style=\"padding:3px;margin-left: 26px;float:left\"><font color=\"red\">"+exceptionArr[i].exceptionTypeName+"</font></div>"
	            			+"<div style=\"padding:3px;margin-left: 120px\"> <a href=\"#\" onclick=\"messageDetail('"+exceptionArr[i].startTrunkCode+"')\" style=\"margin-right: 20px\"><font color=\"blue\">消息详情></font></a></div></div>");
				}
    		}
	    }    
	});    
	$('#formVisibleTransport').submit();  
}

//单选Radio操作
$(function(){
	var regionCode="UC008972";//默认上海分拨中心
   $(":radio").click(function(){
	   map.clearOverlays();//清除地图上原有的点
	   var selectValue=$(this).val();
	    $.post(rootPath + "/visibleTransport/queryRadioData.do",{
	    	selectType:$(this).val(),
	    	regionCode:regionCode
		},
		function(data,status){
	    	//车辆信息
	    	var carInfoArr=new Array();
	    	//查询分拨中心信息
	    	var groupCenterInfoArr=new Array();
	    	//查询网点信息
	    	var sitInfoArr=new Array();
			if(data.success){
				if(selectValue=='allSit'){
					sitInfoArr=data.data.sitInfo;
					viewMapPoint(sitInfoArr,"sit");//展示网点信息
				}else if(selectValue=='allCar'||selectValue=='exceptionCar'){
					carInfoArr=data.data.carInfo;
					viewMapPoint(carInfoArr,"car");//展示车辆信息
				}else if(selectValue=='viewGroupCenter'){
					groupCenterInfoArr=data.data.groupCenterInfo;
					viewMapPoint(groupCenterInfoArr,"groupCenter");//展示分拨中心信息
				}else if(selectValue=='delayCar'){
					
				}
			}
		});
   });
});

//快捷操作“异常上报”
function exceptionReport(){
	var drivingPlanCode=$("#drivingPlanCodeLi").text();
	if(drivingPlanCode==null||drivingPlanCode==""){
		$.messager.alert("提示", "请选择发车计划单号！", "info");
		return;
	}
    $.post(rootPath + "/visibleTransport/ReportException.do",{
    	drivingPlanCode:drivingPlanCode
	},
	function(data,status){
		if(data.success){
			/* 数据字典加载 */
			initDictDatas('DEPARTURE_EXCEPTION');
			uceDictCombobox('exceptionType', 'DEPARTURE_EXCEPTION');
			//清空原缓存内容
			$("#exceptionType").textbox('setValue',"");
			$("#exceptionType").val("");
			$("#exceptionInfo").textbox('setValue',"");
			$("#exceptionInfo").val("");
			$('#exceptionReportWin').window({    
			    width:450,    
			    height:300,    
			    modal:true   
			});  
		}else{
			 showWarnMsg("当前发车计划存在异常，请优先处理存在的异常，再进行异常上报。点击概括信息中的异常单号详情，可查看当前发车计划异常详情！");
		}
	});
}
//保存异常上报
function saveExceptionReport(){
	var drivingPlanCode=$("#drivingPlanCodeLi").text();
	var excepType=$("#exceptionType").val();
	var reason=$("#exceptionInfo").val();
	if(excepType==''){
		showErrorMsg("异常类型为必填项！")
		return;
	}
	if($("#reportForm").form('validate')){
		  $.post(rootPath + "/visibleTransport/saveReportException.do",{
		    	startTrunkCode:drivingPlanCode,
		    	excepType:excepType,
		    	reason:reason
		  },
		  function(data,status){
				var exceptionArr=new Array();
				if(data.success){
					exceptionArr=data.data;
					//更新左边异常列表
					for(var i=0;i<exceptionArr.length;i++){
						$("#excepList").append("<div   style=\"margin-top: 0px;margin-left: 3px;border-style:solid; border-width:1px; border-color:#F0F0F0\">" +
								 "<div style=\"padding:3px;margin-left: 26px;margin-top: 5px\">"+ (new Date(exceptionArr[i].createTime)).toLocaleString()+"</div>"
		           			+"<div style=\"padding:3px;\"><i class=\"icon ion-ios-list-outline\" style=\"margin-left: 4px;\" ></i>&nbsp&nbsp异常编号："+exceptionArr[i].exceptionCode+"</div>"
			            		+"<div style=\"padding:3px;\">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp发车计划：<a href=\"#\" onclick=\"exceptionDetailed('"+exceptionArr[i].startTrunkCode+"')\" >"+exceptionArr[i].startTrunkCode+"</a></div>"
		           			+"<div style=\"padding:3px;margin-left: 26px;float:left\"><font color=\"red\">"+exceptionArr[i].exceptionTypeName+"</font></div>"
		           			+"<div style=\"padding:3px;margin-left: 120px\"> <a href=\"#\" onclick=\"messageDetail('"+exceptionArr[i].startTrunkCode+"')\" style=\"margin-right: 20px\"><font color=\"blue\">消息详情></font></a></div></div>");
					}
					var divExceptionArea = document.getElementById("divExceptionArea");
					divExceptionArea.style.display = "block";
					$('#btnWaitHandle').val(exceptionArr[0].exceptionStatusName);
					$('#exceptionCodeLi').text("");
					$("#exceptionCodeLi").append(exceptionArr[0].exceptionCode);
					$('#exceptionTypeLi').text("");
					$("#exceptionTypeLi").append("<font color='red'>"+exceptionArr[0].exceptionTypeName+"</font>");
					
					$.messager.alert("提示", "上报异常成功！", "info");
					$('#btnExceptionReport').linkbutton('disable');//上报异常
					$('#btnExceptionConfirm').linkbutton('enable');//确认异常
					$('#btnExceptionBack').linkbutton('enable');//异常打回
					$('#btnOpenExceptionSummary').linkbutton('disable');//异常小结
					$('#btnAddNeed').linkbutton('disable');//新增需求
					$('#btnStopDrivePlan').linkbutton('disable');//终止发车计划
					$('#btnStopLineGroup').linkbutton('disable');//终止班次
					$('#btnRetiesDrivePlan').linkbutton('disable');//重绑发车计划
					$('#btnNewLineGroup').linkbutton('disable');//新增班次
					$('#exceptionReportWin').window('close');
				}else{
					$.messager.alert("提示", data.message, "info");
				}
		});
	}
  
}
//异常确认
function exceptionConfirm(){
	var drivingPlanCode=$("#drivingPlanCodeLi").text();
    var exceptionCode=$("#exceptionCodeLi").text();
	if(drivingPlanCode==null||drivingPlanCode==""){
		$.messager.alert("提示", "请选择发车计划单号！", "info");
		return;
	}
	$.messager.confirm('异常确认','是否确认该异常？',function(r){    
	    if (r){    
	        $.post(rootPath + "/visibleTransport/exceptionConfirm.do",{
	        	drivingPlanCode:drivingPlanCode,
	        	exceptionCode:exceptionCode
	    	},
	    	function(data,status){
	    		if(data.success){
	    			var exceptionArr=data.data;
	    			$.messager.alert("提示", "异常确认成功！", "info");
	    			$('#btnExceptionReport').linkbutton('disable');//上报异常
	    			$('#btnExceptionConfirm').linkbutton('disable');//确认异常不可用
	    			$('#btnExceptionBack').linkbutton('enable');//异常打回
	    			$('#btnOpenExceptionSummary').linkbutton('enable');//异常小结
	    			$('#btnAddNeed').linkbutton('disable');//新增需求
	    			$('#btnStopDrivePlan').linkbutton('enable');//终止发车计划
	    			$('#btnStopLineGroup').linkbutton('disable');//终止班次
	    			$('#btnRetiesDrivePlan').linkbutton('disable');//重绑发车计划
	    			$('#btnNewLineGroup').linkbutton('enable');//新增发车计划
	    			$('#btnWaitHandle').val(exceptionArr[0].exceptionStatusName);
	    		}else{
	    			$.messager.alert("提示", data.message, "info");
	    		}
	    	});   
	    }    
	}); 
}
//异常打回
function exceptionBack(){
	var drivingPlanCode=$("#drivingPlanCodeLi").text();
	var exceptionCode=$("#exceptionCodeLi").text();
	if(drivingPlanCode==null||drivingPlanCode==""){
		$.messager.alert("提示", "请选择发车计划单号！", "info");
		return;
	}
	$.messager.confirm('异常打回','确认终止吗？终止后运输节点状态将退回上一状态！',function(r){    
	    if (r){    
	        $.post(rootPath + "/visibleTransport/exceptionBack.do",{
	        	drivingPlanCode:drivingPlanCode,
	        	exceptionCode:exceptionCode
	    	},
	    	function(data,status){
	    		if(data.success){
	    			var exceptionArr=data.data.eList;
	    			var dirvingPlan=data.data.dirvingPlan;
	    			$.messager.alert("提示", "异常打回成功！", "info");
	    			$('#btnExceptionReport').linkbutton('disable');//上报异常
	    			$('#btnExceptionConfirm').linkbutton('disable');//确认异常不可用
	    			$('#btnExceptionBack').linkbutton('disable');//异常打回
	    			$('#btnOpenExceptionSummary').linkbutton('enable');//异常小结
	    			$('#btnAddNeed').linkbutton('disable');//新增需求
	    			$('#btnStopDrivePlan').linkbutton('disable');//终止发车计划
	    			$('#btnStopLineGroup').linkbutton('disable');//终止班次
	    			$('#btnRetiesDrivePlan').linkbutton('enable');//重绑发车计划
	    			$('#btnNewLineGroup').linkbutton('enable');//新增发车计划
	    			if(dirvingPlan!=null&&dirvingPlan.status=="06"){
	    				$('#btnStopLineGroup').linkbutton('enable');//终止班次
	    			}
	    			$('#btnWaitHandle').val(exceptionArr[0].exceptionStatusName);
	    			//更新左边异常列表
	    			$("#excepList").html("");
					for(var i=0;i<exceptionArr.length;i++){
						$("#excepList").append("<div   style=\"margin-top: 0px;margin-left: 3px;border-style:solid; border-width:1px; border-color:#F0F0F0\">" +
								 "<div style=\"padding:3px;margin-left: 26px;margin-top: 5px\">"+ (new Date(exceptionArr[i].createTime)).toLocaleString()+"</div>"
		           			+"<div style=\"padding:3px;\"><i class=\"icon ion-ios-list-outline\" style=\"margin-left: 4px;\" ></i>&nbsp&nbsp异常编号："+exceptionArr[i].exceptionCode+"</div>"
			            		+"<div style=\"padding:3px;\">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp发车计划：<a href=\"#\" onclick=\"exceptionDetailed('"+exceptionArr[i].startTrunkCode+"')\" >"+exceptionArr[i].startTrunkCode+"</a></div>"
		           			+"<div style=\"padding:3px;margin-left: 26px;float:left\"><font color=\"red\">"+exceptionArr[i].exceptionTypeName+"</font></div>"
		           			+"<div style=\"padding:3px;margin-left: 120px\"> <a href=\"#\" onclick=\"messageDetail('"+exceptionArr[i].startTrunkCode+"')\" style=\"margin-right: 20px\"><font color=\"blue\">消息详情></font></a></div></div>");
					}
	    		}else{
	    			$.messager.alert("提示", data.message, "info");
	    		}
	    	});   
	    }    
	}); 
}
//异常小结打开win
function openExceptionSummary(){
	var drivingPlanCode=$("#drivingPlanCodeLi").text();
	if(drivingPlanCode==null||drivingPlanCode==""){
		$.messager.alert("提示", "请选择发车计划单号！", "info");
		return;
	}
	$('#exceptionSummaryWin').window({    
	    width:450,    
	    height:300,    
	    modal:true   
	});  
	$.post(rootPath + "/visibleTransport/queryExceptionInfo.do",{
		drivingPlanCode:drivingPlanCode,
	},
	function(data,status){
		var exceptionArr=data.data.exceptionList;
		if(data.success){
			$("#exceptionHandle").textbox('setValue',exceptionArr[0].utf1);
			$('#exceptionHandle').val(exceptionArr[0].utf1);
		}else{
			$.messager.alert("提示", data.message, "info");
		}
	});
}
//保存异常小结内容
function saveExceptionSummary(type){
	var drivingPlanCode=$("#drivingPlanCodeLi").text();
	var exceptionHandle=$("#exceptionHandle").val();
	if($("#exceptionSummaryForm").form('validate')){
	    $.post(rootPath + "/visibleTransport/saveExceptionSummary.do",{
	    	drivingPlanCode:drivingPlanCode,
	    	exceptionHandle:exceptionHandle
		},
		function(data,status){
			if(data.success){
				if(type=='temp'){
					$.messager.alert("提示", "处理异常方案暂存成功！", "info");
				}else if(type=='submit'){
					$.messager.alert("提示", "处理异常方案保存成功！", "info");
				}
				$('#exceptionSummaryWin').window('close');
			}else{
				$.messager.alert("提示", data.message, "info");
			}
		});
	}
}
//终止发车计划
function stopDrivePlan(){
	var drivingPlanCode=$("#drivingPlanCodeLi").text();
	if(drivingPlanCode==null||drivingPlanCode==""){
		$.messager.alert("提示", "请选择发车计划单号！", "info");
		return;
	}
	$.messager.confirm('终止发车计划','请确认是否终止该发车计划',function(r){    
	    if (r){    
	        $.post(rootPath + "/visibleTransport/stopDrivePlan.do",{
	        	drivingPlanCode:drivingPlanCode
	    	},
	    	function(data,status){
	    		if(data.success){
	    			var exceptionArr=data.data;
	    			$.messager.alert("提示", "终止发车计划成功！", "info");
	    			$('#btnExceptionReport').linkbutton('disable');//上报异常
	    			$('#btnExceptionConfirm').linkbutton('disable');//确认异常不可用
	    			$('#btnExceptionBack').linkbutton('disable');//异常打回
	    			$('#btnOpenExceptionSummary').linkbutton('enable');//异常小结
	    			$('#btnAddNeed').linkbutton('disable');//新增需求
	    			$('#btnStopDrivePlan').linkbutton('disable');//终止发车计划
	    			$('#btnStopLineGroup').linkbutton('enable');//终止班次
	    			$('#btnRetiesDrivePlan').linkbutton('enable');//重绑发车计划
	    			$('#btnNewLineGroup').linkbutton('disable');//新增发车计划 
	    			$('#btnWaitHandle').val(exceptionArr[0].exceptionStatusName);
	    			$('#drinverPlanStatusLi').text("");//发车计划状态
	    			$("#drinverPlanStatusLi").append("<font color='#F0E68C'>"+exceptionArr[0].driverPlanStatusName+"</font>")
	    		}else{
	    			$.messager.alert("提示", data.message, "info");
	    		}
	    	});   
	    }    
	}); 
}
//打开终止班次对话框
function stopLineGroup(){
	var classCode=$("#classCodeLi").text();
	if(classCode==null||classCode==""){
		$.messager.alert("提示", "没有班次单号", "info");
		return;
	}
	openDialog("dlgFreightOrderCombineStop", '你要终止该班次吗？');
	$("#formLineClassStop").form('clear');
	
	$.ajax({
		type:"GET", 
		url : rootPath + '/visibleTransport/getLineGroup.do',
		data :{"classCode":classCode},
		dataType:"json",    
		contentType:"application/json",          
		task : function(data, statusText, xhr) {
		},
	    success : function(data) {            
			if(data.lineGroup){
				
			//初始化数据字典
			initDictDatas('DEMAND_TYPE,TYPE_OF_ADJUSTMENT,SHIFT_SOURCES,CAR_MODEL,SHFIT_TYPE,BUSINESS_MODE');

			/* 数据字典加载 */
			uceDictCombobox('requiTypeStop', 'DEMAND_TYPE');
			uceDictCombobox('adjustTypeStop', 'TYPE_OF_ADJUSTMENT');
			uceDictCombobox('resourceStop', 'SHIFT_SOURCES');
			uceDictCombobox('carTypeStop', 'CAR_MODEL');
			uceDictCombobox('lineGroupTypeStop', 'SHFIT_TYPE');
			uceDictCombobox('businessModeStop', 'BUSINESS_MODE');	
			$("#formLineClassStop").form('load', data);	
			$("#lineGroupCodeStop").textbox('setValue',data.lineGroup.lineGroupCode);
			$("#lineGroupNameStop").textbox('setValue',data.lineGroup.lineGroupName);
			$("#statusStop").textbox('setValue',data.lineGroup.status);
			$("#departTimeStop").textbox('setValue',data.lineGroup.departTime);
			$("#arrivalTimeStop").textbox('setValue',data.lineGroup.arrivalTime);
			$("#lineGroupDistanceStop").textbox('setValue',data.lineGroup.lineGroupDistance);
			$("#startOrgNameStop").textbox('setValue',data.lineGroup.startOrgName);
			$("#endOrgNameStop").textbox('setValue',data.lineGroup.endOrgName);
			$("#requiTypeStop").combobox('setValue',data.lineGroup.requiType);
			
			$("#costPriceStop").textbox('setValue',data.lineGroup.costPrice);
			$("#sellingPriceStop").textbox('setValue',data.lineGroup.sellingPrice);
			$("#totalTimeStop").textbox('setValue',data.lineGroup.totalTime);
			$("#totalVolumeStop").textbox('setValue',data.lineGroup.totalVolume);
			$("#totalWeightStop").textbox('setValue',data.lineGroup.totalWeight);
			$("#chargeStarttimeStop").textbox('setValue',data.lineGroup.chargeStarttime);
			$("#chargeEndTimeStop").textbox('setValue',data.lineGroup.chargeEndTime);
			$("#adjustPriceStop").textbox('setValue',data.lineGroup.adjustPrice);
			
			$("#requiCombinCodeStop").textbox('setValue',data.lineGroup.requiCombinCode);
			$("#orderCombinCodeStop").textbox('setValue',data.lineGroup.orderCombinCode);
			$("#drivingPlanCombinCodeStop").textbox('setValue',data.lineGroup.drivingPlanCombinCode);
			$("#resourceStop").combobox('setValue',data.lineGroup.resource);
			$("#carTypeStop").combobox('setValue',data.lineGroup.carType);
			$("#loadFactorStop").textbox('setValue',data.lineGroup.loadFactor);
			$("#adjustTypeStop").combobox('setValue',data.lineGroup.adjustType);
			$("#businessModeStop").combobox('setValue',data.lineGroup.businessMode);
			$("#lineGroupTypeStop").combobox('setValue',data.lineGroup.lineGroupType);
			}
			var datagrid = $('#tblFreightOrderCombineDetailStop').datagrid('options');
			datagrid.url = rootPath + "/visibleTransport/findLineGroupDetailByExceptionId.do";
			$('#tblFreightOrderCombineDetailStop').datagrid('load', {
				classCode : classCode
			});
       },        
       error: function(XMLHttpRequest, textStatus, errorThrown) {            
           //TODO  
       }  
	});
}
//执行终止班次
function stopLineGroupConfirm(){
	var classCode=$("#classCodeLi").text();
	var drivingPlanCode=$("#drivingPlanCodeLi").text();
	if(classCode==null||classCode==""){
		$.messager.alert("提示", "没有班次单号", "info");
		return;
	}
	$.post(rootPath + "/visibleTransport/stopLineGroup.do",{
		classCode:classCode,
		drivingPlanCode:drivingPlanCode
	},
	function(data,status){
		if(data.success){
			var exceptionArr=data.data;
			$('#btnStopLineGroup').linkbutton('disable');//终止班次
			$('#btnRetiesDrivePlan').linkbutton('disable');//重绑发车计划
			$('#btnNewLineGroup').linkbutton('enable');//新增发车计划 
			$.messager.alert("提示", "终止班车成功！", "info");
			$('#drinverPlanStatusLi').text("");//发车计划状态
			$("#drinverPlanStatusLi").append("<font color='#F0E68C'>"+exceptionArr[0].driverPlanStatusName+"</font>")
			$('#dlgFreightOrderCombineStop').window('close'); 
		}else{
			$.messager.alert("提示", data.message, "info");
		}
	});
}
//重绑发车计划win
function retiesDrivePlan(){
	var drivingPlanCode=$("#drivingPlanCodeLi").text();
	if(drivingPlanCode==null||drivingPlanCode==""){
		$.messager.alert("提示", "请选择发车计划单号！", "info");
		return;
	}
	openDialog("updateDeparturePlan", '司机车辆修改');
	carCombogrid("plateNumber",{'carType':carType});
	driverCombogrid("driverPhone",{});
}
//执行重绑发车计划
function submitRetiesDrivePlan(){
	var drivingPlanCode=$("#drivingPlanCodeLi").text();
	var plateNumber= $('#plateNumber').combobox('getValue');
	var dirvingPlan = serializeFormObj('planFrom');
	var dirverId =$("#driverPhone").val();
	dirvingPlan.dirverName=$('#driverPhone').combobox('getText');
	dirvingPlan.drivingPlanCode=drivingPlanCode;
	dirvingPlan.plateNumber=plateNumber;
	dirvingPlan.driverPhone=dirverId;
	var url = '../visibleTransport/updateDeparturePlan.do';
	$.ajax({
        url: url,
        data:dirvingPlan,
        task: function(data,statusText,xhr){
        	$.messager.alert("提示", "司机车辆已更新", "info");
            closeDialog('updateDeparturePlan');
 			$('#btnStopLineGroup').linkbutton('disable');//终止班次
 			$('#btnRetiesDrivePlan').linkbutton('disable');//重绑发车计划
 			$('#btnNewLineGroup').linkbutton('disable');//新增发车计划
        },
        fail: function(data,statusText,xhr){
          
        }
      });
}

//根据发车计划查询异常信息
function messageDetail(drivingPlanCode){
	   if(drivingPlanCode==null||drivingPlanCode==""){
		   drivingPlanCode=$("#drivingPlanCodeLi").text();
	   }
	   if(drivingPlanCode==null||drivingPlanCode==""){
			$.messager.alert("提示", "请选择发车计划单号！", "info");
			return;
	   }
	   $.post(rootPath + "/visibleTransport/queryExceptionInfo.do",{
	    	drivingPlanCode:drivingPlanCode
		},
		function(data,status){
			if(data.success){
				orgCombogrid('excepSitesCode', {
					orgTypes : ORG_TYPE_SITE,
					orgStatus : ORG_ENABLED
				});
				debugger
				var exceptionArr=data.data.exceptionList;
				var lineGroup=data.data.lineGroup;
				console.log('lineGroup='+lineGroup+"&dirvingPlan="+data.data.dirvingPlan[0]);
				if(lineGroup){
					carType=lineGroup.carType;
				}else{
					carType=data.data.dirvingPlan[0].carType;
				}
				//初始化数据字典
				initDictDatas('EXCEPTION_STATUS,APP_STAGE,DEPARTURE_EXCEPTION');

				/* 数据字典加载 */
				uceDictCombobox('formExceptionStatus', 'EXCEPTION_STATUS');
				uceDictCombobox('formAppSrage', 'APP_STAGE');
				uceDictCombobox('excepType', 'DEPARTURE_EXCEPTION');
			
				openDialog("dlgExceptionManager", '运输异常详情');
				$("#createEmp").textbox('setValue',exceptionArr[0].createEmp);
				$("#createEmp").val(exceptionArr[0].createEmp);
				$("#formStartTrunkCode").textbox('setValue',exceptionArr[0].startTrunkCode);
				$("#excepSitesCode").combogrid('setValue',exceptionArr[0].excepSitesCode);
				$("#formExceptionCode").textbox('setValue',exceptionArr[0].exceptionCode);
				$("#reason").val(exceptionArr[0].reason); 
				$("#formExceptionCode").val(exceptionArr[0].exceptionCode);
				$("#formAppSrage").val(exceptionArr[0].appSrage);
				$("#blowVolume").textbox('setValue',exceptionArr[0].blowVolume);
				$("#blowVolume").val(exceptionArr[0].reason);
				$("#layTime").textbox('setValue',exceptionArr[0].layTime);
				$("#formCreateTime").textbox('setValue',(new Date(exceptionArr[0].createTime)).toLocaleString1());
				$("#formCreateTime").val((new Date(exceptionArr[0].createTime)).toLocaleString1());
				$("#formUpdateTime").textbox('setValue',exceptionArr[0].updateTime==null?"":(new Date(exceptionArr[0].updateTime)).toLocaleString1());
				$("#formUpdateTime").val(exceptionArr[0].updateTime==null?"":new Date(exceptionArr[0].updateTime).toLocaleString1());
				$("#formExceptionStatus").combobox('setValue',exceptionArr[0].exceptionStatus);//下拉框
				$("#excepType").combobox('setValue',exceptionArr[0].excepType);//下拉框
				$("#formAppSrage").combobox('setValue',exceptionArr[0].appSrage);//下拉框
			}else{
				$.messager.alert("提示", data.message, "info");
			}
		});
}
function vehicleDetail(){
	ms.style.display = "block";
	$("#suspendId").tabs("select",2);
}

function resetVisibleTransport(){
	$('#formVisibleTransport').form('reset');
}
function cleanHandle(){
	$("#exceptionHandle").textbox('setValue',"");
	$('#exceptionHandle').val("");
}
/**控制编辑界面frontNumber 的下拉框高度**/
function showPanel() {
    var v = $(this).combobox('panel')[0].childElementCount;
    if (v <=10) {
        $(this).combobox('panel').height("auto");
    } else {
        $(this).combobox('panel').height(200);
    }
}
Date.prototype.toLocaleString = function() {
    return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes();
};
Date.prototype.toLocaleString1 = function() {
    return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes()+":"+this.getSeconds();
};	