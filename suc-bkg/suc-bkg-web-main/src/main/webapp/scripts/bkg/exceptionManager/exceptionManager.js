
$(function() {
	//查询界面空间
	dateRange("findCreateTime", "findUpdateTime");
	/* 加载主界面grid */
	var columns = [ [
			/*{field : "id",checkbox : "true"},*/
			//rowspan:2,
			{field:'id',title: '操作',align:'center',width: 150,formatter:function(value, rec, index){
				var exStatus=rec.exceptionStatus;// 1 待确认 2 已确认 3，4已终止
//				var dirvStatus=row.dirvingPlanStatus; //1 01 已生成  2 02 司机已确认  3 03 司机未确认  4 04 执行中   7 06 已终止
//				var lineStatus=row.lineGroupStatus;  //1,00 已生成 2 01 已定价   3 02 已生成发车计划   4 03 已终止
//      			console.log('exceptionStatu='+exStatus+'&dirvStatus='+dirvStatus+'&lineStatus='+lineStatus)
				//console.log(JSON.stringify(rec))
				if('1'==exStatus||exStatus==null){
      				return '<a class="iconfont  uce-ck-details"  style="display:'+(dealPermission(['openExceptionDetail']) ? 'none' : 'block')+',float:left" title="异常详情" onclick="openExceptionDetail(\''+ index +'\')" href="javascript:void(0)"></a> '+
      				'  <a class="iconfont uce-success-circle"  style="display:'+(dealPermission(['confirmException']) ? 'none' : 'block')+',float:left" title="异常确认" onclick="confirmException(\''+ index +'\')" href="javascript:void(0)"></a> '+
      				' <a class="iconfont  uce-baojia"  style="display:'+(dealPermission(['repulseException']) ? 'none' : 'block')+',float:left" title="异常打回"  onclick="repulseException(\''+ index +'\')" href="javascript:void(0)"></a>';
              	} else if(exStatus == "2"){
      				return '<a class="iconfont  uce-ck-details"  style="display:'+(dealPermission(['openExceptionDetail']) ? 'none' : 'block')+',float:left" title="异常详情" onclick="openExceptionDetail(\''+ index +'\')" href="javascript:void(0)"></a> '+
      				' <a class="iconfont uce-baojia" style="display:'+(dealPermission(['repulseException']) ? 'none' : 'block')+',float:left" title="异常打回" onclick="repulseException(\''+ index +'\')" href="javascript:void(0)"></a> '+
      				' <a class="iconfont uce-stop" style="display:'+(dealPermission(['stopDrivePlan']) ? 'none' : 'block')+',float:left" title="终止发车计划" onclick="stopDrivePlan(\''+ index +'\')" href="javascript:void(0)"></a>';;
              	}else if((exStatus == "3" || exStatus== "4")&& (rec.deleteFlag=='0'||rec.deleteFlag==null)){
              		debugger
              		return '<a class="iconfont uce-ck-details"  style="display:'+(dealPermission(['openExceptionDetail']) ? 'none' : 'block')+',float:left" title="异常详情" onclick="openExceptionDetail(\''+ index +'\')" href="javascript:void(0)"></a> '+
              		' <a class="iconfont uce-stop"  style="display:'+(dealPermission(['stopLineGroup']) ? 'none' : 'block')+',float:left" title="终止班次" onclick="stopLineGroup(\''+ index +'\')" href="javascript:void(0)"></a> '+
      				' <a class="iconfont  uce-add"  style="display:'+(dealPermission(['newLineGroup']) ? 'none' : 'block')+',float:left" title="新增发车计划" onclick="newLineGroup(\''+ index +'\')" href="javascript:void(0)"></a> '+
      				' <a class="iconfont  uce-bind" style="display:'+(dealPermission(['reBindDrivePlan']) ? 'none' : 'block')+',float:left" title="重绑发车计划" onclick="reBindDrivePlan(\''+ index +'\')" href="javascript:void(0)"></a> '+
      				' <a class="iconfont  uce-basedata"  style="display:'+(dealPermission(['openDlgExceptionSummary']) ? 'none' : 'block')+',float:left" title="异常小结" onclick="openDlgExceptionSummary(\''+ index +'\')" href="javascript:void(0)"></a>';
              	}else if((exStatus == "3" || exStatus== "4")&& (rec.deleteFlag=='1')){
              		debugger
              		return '<a class="iconfont uce-ck-details"  style="display:'+(dealPermission(['openExceptionDetail']) ? 'none' : 'block')+',float:left" title="异常详情" onclick="openExceptionDetail(\''+ index +'\')" href="javascript:void(0)"></a> '+
      				' <a class="iconfont  uce-add"  style="display:'+(dealPermission(['newLineGroup']) ? 'none' : 'block')+',float:left" title="新增发车计划" onclick="newLineGroup(\''+ index +'\')" href="javascript:void(0)"></a> '+
      				' <a class="iconfont  uce-bind" style="display:'+(dealPermission(['reBindDrivePlan']) ? 'none' : 'block')+',float:left" title="重绑发车计划" onclick="reBindDrivePlan(\''+ index +'\')" href="javascript:void(0)"></a> '+
      				' <a class="iconfont  uce-basedata"  style="display:'+(dealPermission(['openDlgExceptionSummary']) ? 'none' : 'block')+',float:left" title="异常小结" onclick="openDlgExceptionSummary(\''+ index +'\')" href="javascript:void(0)"></a>';
              	}
      		}},
			{field : 'exceptionCode',title : '异常编号',align : 'center',width : 120,formatter : formatTip},
			{field : 'startTrunkCode',title : '发车计划号',align : 'center',width : 120,formatter : formatTip},
			{field : 'appSrage',title : '应用平台',align : 'center',width : 75,formatter:function(value){
				return getTypeNameByCode("APP_STAGE", value,formatTip);
			}
		    },
			{field : 'createEmp',title : '上报人',align : 'center',width : 75,formatter : formatTip},
			{field : 'createTime',title : '异常上报时间',align : 'center',width : 130, formatter :  function(value) {return dateTimeFormat(value)}} ,
			{field : 'utf2',title : '异常位置信息',align : 'center',width : 120,formatter : formatTip	},
			{field : 'excepType',title : '异常类型',align : 'center',width : 75,formatter:function(value){
				return getTypeNameByCode("DEPARTURE_EXCEPTION", value,formatTip);
			}
		    },
			{field : 'excepSitesName',title : '异常关联站点',align : 'center',width : 75, formatter:formatTip},
			{field : 'blowVolume',title : '爆仓方数',align : 'center',width : 75,formatter : formatTip	},
			{field : 'exceptionStatus',title : '异常状态',align : 'center',width : 75,formatter:function(value){
				return getTypeNameByCode("EXCEPTION_STATUS", value,formatTip);
			}
		    },
			{field : 'reason',title : '异常信息',align : 'center',width : 80, formatter:formatTip},
			{field : 'rolveSolution',title : '异常处理意见',align : 'center',width : 100, formatter:formatTip},
			{field : 'updateTime',title : '处理完成时间',align : 'center',width : 130, formatter :  function(value) {return dateTimeFormat(value)}	} ,
			{field : 'solveEmp',title : '异常处理人',align : 'center',width : 75,formatter : formatTip}
			] ];

	var dataGridParams = {
		url : '',
		pageSize : 10,
		toolbar : '#toolbarException',
		singleSelect : 'true',
		fitColumns : 'false',
		//新加的事件
		checkOnSelect: false,
		selectOnCheck: true,
		onSelect : function (rowIndex, rowData) {
//			debugger
//			var exStatus=rowData.exceptionStatus;// 1 待确认 2 已确认 3，4已终止
//			var dirvStatus=rowData.dirvingPlanStatus; //1 01 已生成  2 02 司机已确认  3 03 司机未确认  4 04 执行中   7 06 已终止
//			var lineStatus=rowData.lineGroupStatus;  //1,00 已生成 2 01 已定价   3 02 已生成发车计划   4 03 已终止
//			if('1'==exStatus){
//				$('#confirmException').linkbutton('enable');//异常确认
//			}else{
//				$('#confirmException').linkbutton('disable');//
//			}
//			
//			if('3'==exStatus || '4'==exStatus){
//				$('#repulseException').linkbutton('disable');//异常打回
//				$('#reBindDrivePlan').linkbutton('enable');//
//				$('#newLineGroup').linkbutton('enable');
//			}else{
//				$('#repulseException').linkbutton('enable');//
//				$('#reBindDrivePlan').linkbutton('disable');//
//				$('#newLineGroup').linkbutton('disable');
//			}
//			
//			if('2'==exStatus){
//				$('#stopDrivePlan').linkbutton('enable');
//			}else{
//				$('#stopDrivePlan').linkbutton('disable');
//			}
//			if('1'==lineStatus || '00'==lineStatus && ('7'==dirvStatus||'06'==dirvStatus)){
//				$('#stopLineGroup').linkbutton('enable');
//			}else{
//				$('#stopLineGroup').linkbutton('disable');
//			}
//			if('1'==exStatus){
//				$('#openxceptionSummary').linkbutton('disable');
//			}else{
//				$('#openxceptionSummary').linkbutton('enable');
//			}
		}, 
		onBeforeLoad : function(param) {
		},
		onLoadSuccess : function(data) {
		},
		onLoadError : function() {
			// 在载入远程数据产生错误的时候触发。
		}
	}
	/* 加载表单数据 */
	newloadGrid('tblException', columns, dataGridParams);
	
	/* 加载明细界面grid */
	var detailcolumnsPre = [ [
	           	       	{field : "id",checkbox : "true"},
	           	        {
	           				field : 'des',
	           				title : '操作',
	           				align : 'center',
	           				width : 80,
	           				formatter : function(value, rec, index) {//\''+index+'\'
	           					//icon-line icon-down
	           					//data-options="iconCls:'icon-line icon-down',plain:true"
	           					return '<a class="icon-line icon-up"   onclick="moveUp(this)" href="javascript:void(0)"></a><a class="icon-line icon-down"  onclick="moveDown(this)" href="javascript:void(0)"></a>';
	           				}
	           			},
	           			{field : 'wayPointName',title : '途经站点',align : 'center',width : 100},
	           			{field : 'wayPointZoneName',title : '站点所属区域',align : 'center',width : 90},
	           			{field : 'volume',title : '货物方数',align : 'center',width : 90},
	           			{field : 'weight',title : '货物重量',align : 'center',width : 90},
	           			{field : 'endTime',title : '计划到达时间',align : 'center',width : 120,formatter : function(value) {return dateTimeFormat(value)}},
	           			{field : 'loadUnloadTime',title : '装卸货耗时',align : 'center',width : 90},
	           			{field : 'distance',title : '运行里程',align : 'center',width : 100},
	           			{field : 'runingTime',title : '运行耗时',align : 'center',width : 100},
	           			{field : 'nextWayDistance',title : '距离下一站点里程',align : 'center',width : 100}
	           			
	           			] ];
	var detailcolumns = [ [
	       	{field : "id",checkbox : "true"},
			{field : 'wayPointName',title : '途经站点',align : 'center',width : 100},
			{field : 'wayPointZoneName',title : '站点所属区域',align : 'center',width : 90},
			{field : 'volume',title : '货物方数',align : 'center',width : 90},
			{field : 'weight',title : '货物重量',align : 'center',width : 90},
			{field : 'endTime',title : '计划到达时间',align : 'center',width : 130,formatter : function(value) {return dateTimeFormat(value)}},
			{field : 'loadUnloadTime',title : '装卸货耗时',align : 'center',width : 90},
			{field : 'distance',title : '运行里程',align : 'center',width : 100},
			{field : 'runingTime',title : '运行耗时',align : 'center',width : 100},
			{field : 'nextWayDistance',title : '距离下一站点里程',align : 'center',width : 100}
			
			] ];

	var detaildataGridParams = {
		url : '',
		pageSize : 10,
		toolbar : '#tlbDetial',
		singleSelect : 'true',
  		fitColumns : 'false',
  		rownumbers:'true',
		onBeforeLoad : function(param) {
		},
		onLoadSuccess : function(data) {
		},
		onLoadError : function() {
			// 在载入远程数据产生错误的时候触发。
		}
	}
	
	/* 加载表单数据 */
	newloadGrid('tblFreightOrderCombineDetail', detailcolumnsPre, detaildataGridParams);
	var lineGroupDetailParams = {
			url : '',
			pageSize : 10,
			toolbar : '#tlbDemand',
			singleSelect : 'true',
	  		fitColumns : 'false',
	  		rownumbers:'true',
			onBeforeLoad : function(param) {
			},
			onLoadSuccess : function(data) {
			},
			onLoadError : function() {
				// 在载入远程数据产生错误的时候触发。
			}
		}
	newloadGrid('tblDemand', detailcolumns, lineGroupDetailParams);
	//startSiteCode  startSiteCode   effectiveStatus
	//初始化数据字典
	initDictDatas('EXCEPTION_STATUS,DEPARTURE_EXCEPTION,APP_STAGE,TYPE_OF_ADJUSTMENT,DEMAND_TYPE,BUSINESS_MODE,SHFIT_TYPE,CAR_TYPE,SHIFT_SOURCES');

	/* 数据字典加载 */
	uceDictCombobox('findExceptionStatus', 'EXCEPTION_STATUS');
	uceDictCombobox('formExceptionStatus', 'EXCEPTION_STATUS');
	uceDictCombobox('excepType', 'DEPARTURE_EXCEPTION');
	uceDictCombobox('formAppSrage', 'APP_STAGE');
	uceDictCombobox('findAdjustType', 'TYPE_OF_ADJUSTMENT');
	uceDictCombobox('findDemandType', 'DEMAND_TYPE');
	uceDictCombobox('findBusinessMode', 'BUSINESS_MODE');
	uceDictCombobox('findShfitType', 'SHFIT_TYPE');
	uceDictCombobox('findCarType', 'CAR_TYPE');
	uceDictCombobox('resource', 'SHIFT_SOURCES');	//班次来源
	
});
/**
 *  班次移動
 * @param up
 */
function moveUp(up) {
	
	var tr = $(up).parents("tr");//当前点击的tr
	//当前点击的班次序号
	var trValue = tr.find("td").eq(1).find("div").html();
	//选中节点的哥哥
	var trb = tr.prev();
	//哥哥的班次序号
	var trbValue = trb.find("td").eq(1).find("div").html();
	var groupRows = $('#tblFreightOrderCombineDetail').datagrid("getRows");
	var trIndex = tr.index();
	if(trIndex>0){
		var trIndexUp = trIndex - 1;
		//正在点击的行
		var indexData = groupRows[trIndex];
		//正在点击行的上一行
		var indexDataUp = groupRows[trIndexUp];
		//交换数据
		groupRows[trIndexUp] = indexData;
		groupRows[trIndex] = indexDataUp;
	
		trb.before(tr);
	}
	
}

/**
 * 班次移動 
 * @param down
 */
function moveDown(down) {

	//当前点击的tr
	var tr = $(down).parents("tr");
	//当前点击的班次序号
	var trValue = tr.find("td").eq(1).find("div").html();
	//选中节点的弟弟
	var trb = tr.next();
	//弟弟的班次序号
	var trbValue = trb.find("td").eq(1).find("div").html();
	var groupRows = $('#tblFreightOrderCombineDetail').datagrid("getRows");

	var trIndex = tr.index();
	var trIndexDown = trIndex + 1;
	if(groupRows.length!=trIndexDown){
		var groupRows = $('#tblFreightOrderCombineDetail').datagrid("getRows");
		var indexData = groupRows[trIndex];
		var indexDataUp = groupRows[trIndexDown];
		groupRows[trIndexDown] = indexData;
		groupRows[trIndex] = indexDataUp;
		//保持班次序号不变
	
		trb.after(tr);
	}
	
}
//新增班次
function newLineGroup(index){
	/* 获取当前选择行 */
//	var rows = $('#tblException').datagrid('getSelections');
//	if (rows.length ==1) {
		operationStep="newLineGroup";
		var selectedExceptionRow = $('#tblException').datagrid('getRows')[index];
		//selectedExceptionRow = $('#tblException').datagrid('getSelected');
		var id=selectedExceptionRow.id;
		
		$.ajax({
			type:"GET", 
			url : rootPath + '/exceptionManager/getLineGroup.do?id='+id,
			data :{"exceptionId":id},
			dataType:"json",    
			contentType:"application/json",          
			task : function(data, statusText, xhr) {
			},
		    success : function(data) { 
		    	debugger
				if(data.lineGroup){
					console.log(data)
				openDialog("dlgFreightOrderCombine", '新增发车计划');
				$("#formLineClass").form('clear');
				$("#formLineClass").form('load', data);	
				$("#lineGroupCode").textbox('setValue',data.lineGroup.lineGroupCode);
				$("#lineGroupName").textbox('setValue',data.lineGroup.lineGroupName);
				$("#status").textbox('setValue',data.lineGroup.status);
				$("#lineGroupDistance").textbox('setValue',data.lineGroup.lineGroupDistance);
				$("#findStartOrgName").textbox('setText',data.lineGroup.startOrgName);
				$("#findEndOrgName").textbox('setText',data.lineGroup.endOrgName);
//				$("#findDemandType").textbox('setValue','2');
//				$("#findAdjustType").textbox('setValue','01');
				//$("#findAdjustType").textbox('setValue','01');
				$("#findCarType").textbox('setValue',data.lineGroup.carType);
				$("#costPrice").textbox('setValue',data.lineGroup.costPrice);
				$("#sellingPrice").textbox('setValue',data.lineGroup.sellingPrice);
				$("#totalTime").textbox('setValue',data.lineGroup.totalTime);
				$("#totalTime2").textbox('setValue',data.lineGroup.totalTime);
				$("#totalVolume").textbox('setValue',data.lineGroup.totalVolume);
				$("#totalWeight").textbox('setValue',data.lineGroup.totalWeight);
				$("#requiCombinCode").textbox('setValue',data.lineGroup.requiCombinCode);
				$("#orderCombinCode").textbox('setValue',data.lineGroup.orderCombinCode);
				$("#drivingPlanCombinCode").textbox('setValue',data.lineGroup.drivingPlanCombinCode);
				$("#loadFactor").textbox('setValue',data.lineGroup.loadFactor);
				$("#adjustPrice").textbox('setValue',data.lineGroup.adjustPrice);
				if(data.lineGroup.chargeStarttime){
					$("#chargeStarttime").datetimebox('setValue',dateTimeFormat(data.lineGroup.chargeStarttime));
				}
				if(data.lineGroup.chargeEndTime){
					$("#chargeEndTime").datetimebox('setValue',dateTimeFormat(data.lineGroup.chargeEndTime));
				}
				initFormTime(data.lineGroup);
				//$("#departTime").datetimebox('setValue',dateTimeFormat(data.lineGroup.departTime));
				//$("#arrivalTime").datetimebox('setValue',dateTimeFormat(data.lineGroup.arrivalTime));
//				$("#startOrgName").combogrid("grid").datagrid("reload",{"q":row.startOrgCode});
//				$("#endOrgName").combogrid("grid").datagrid("reload",{"q":row.endOrgCode});
				$("#findDemandType").textbox('setValue','2');
				$("#findDemandType").textbox('setText','临时需求');
				$("#findShfitType").textbox('setValue',"00");
				$("#findShfitType").textbox('setText',"手工班次");
				$("#findAdjustType").textbox('setValue','01');
				$("#findAdjustType").textbox('setText','发车计划调整');
				//$("#resource").textbox('setValue',data.lineGroup.resource);
				if(data.lineGroup.businessMode=='1'){
					$("#findBusinessMode").textbox('setText','进港');
				}else{
					$("#findBusinessMode").textbox('setText','出港');
				}
				if(data.lineGroup.resource=='1'){
					$("#resource").textbox('setText','需求组合');
				}else{
					$("#resource").textbox('setText','订单组合');
				}
				if(data.lineGroup.carType=='1'||data.lineGroup.carType=='01'){
					$("#findCarType").textbox('setText','4.2');
				}else if(data.lineGroup.carType=='2'||data.lineGroup.carType=='02'){
					$("#findCarType").textbox('setText','6.8');
				}else if(data.lineGroup.carType=='3'||data.lineGroup.carType=='03'){
					$("#findCarType").textbox('setText','7.6');
				}else if(data.lineGroup.carType=='4'||data.lineGroup.carType=='04'){
					$("#findCarType").textbox('setText','9.6');
				}else{
					console.log('cartype='+data.lineGroup.carType);
					$("#findCarType").textbox('setText','4.2');
					//$("#findCarType").textbox('setValue','01');
				}
				debugger
				var datagrid = $('#tblFreightOrderCombineDetail').datagrid('options');
				datagrid.url = rootPath + "/exceptionManager/findLineGroupDetailByExceptionId.do";
				$('#tblFreightOrderCombineDetail').datagrid('load', {
					exId : id
				});
				}else{
					debugger
					showErrorMsg("后台没有找到与该异常相关的班次和发车计划,不能新增发车计划!");
				}    	
	        },        
	        error: function(XMLHttpRequest, textStatus, errorThrown) {   
	        	showErrorMsg("后台没有找到与该异常相关的班次和发车计划,不能新增发车计划!");
	        }  
		});
//	}else{
//		$.messager.alert("提示", "请选中一条单据进行操作！", "info");
//	}
}

function openAddLineGroupDetail(lineGroupCode){
    var loadFactor=$("#loadFactor").val();
	var row = $('#tblException').datagrid('getSelected');
	var exId=row.id;
//    if(loadFactor){
//    	if( ! /^0+(.[0-9]{2})?$/.test(loadFactor)){
//    		showErrorMsg("满载率只能小于1,且小数点后只能保留两位!");
//  			 return false; 
//    	}
//   	   var arr = loadFactor.split(".");
//   	     var intlength = arr[0].length;
//   	     var dotlength=arr[1].length;
//   	     if(intlength!=1 || dotlength >2){
//   	    	 showErrorMsg("满载率只能小于1,且小数点后只能保留两位!");
//   			 return false; 
//   	     } 
//	 }
    
//	var startsite=$("#findStartOrgName").combogrid('getText');
//	var endsite=$("#findEndOrgName").combogrid('getText');
//	if(startsite !='' && endsite !='' && startsite==endsite){
//		showErrorMsg("始发站和目的站不能一样");
//		return false;
//	}
//
	debugger
	openDialog("dlgDemand", "添加路段信息");
	$("#fdDemandCombineType").val(lineGroupCode);
	/*查询条件 需求创建时间 范围控制*/
	//dateRange('fdCreateBeginTime','fdCreateEndTime')
	/*查询操作*/
	
	var rows=$("#tblFreightOrderCombineDetail").datagrid('getRows');
	var ids="";
	if(rows.length>0&& rows[0]){
		 for(var i = 0; i < rows.length; i++){
			ids+=rows[i].id+",";          
	   }
	}
	
	
	var opts=$('#tblDemand').datagrid('options');
	opts.url = rootPath + "/exceptionManager/findLineGroupDetailByExceptionId.do?exId="+exId+"&detailids="+ids;
	$('#tblDemand').datagrid('load',serializeFormObj("formFindDemand"));
}
/**
 * 将需求添加到需求组合
 */
function addDemand(){
	var rows=$("#tblDemand").datagrid('getSelections');
	if(rows.length>0&& rows[0]){
		 for(var i = 0; i < rows.length; i++){
			$('#tblFreightOrderCombineDetail').datagrid('appendRow',rows[i]);//这里循环添加在另一个datagrid选择的行                        }
		}
		closeDialog('dlgDemand');
	}else {
		$.messager.alert("提示", "请选中一条单据进行操作！", "info");
	}
}
/**
 * 删除linegroudetail
 */
function deleteDemand(){
	var rows=$("#tblFreightOrderCombineDetail").datagrid('getSelections');
	if (rows.length > 0 && rows[0]) {
		 for(var i = 0; i < rows.length; i++){
			var index = $('#tblFreightOrderCombineDetail').datagrid('getRowIndex', rows[i]);
			$('#tblFreightOrderCombineDetail').datagrid('deleteRow', index);
		}
	}else {
		$.messager.alert("提示", "请选中一条单据进行操作！", "info");
	}
}
function generateDeparturePlan(){
	var rows = $("#tblFreightOrderCombineDetail").datagrid("getRows");//获取当前所有的行
	
	if(rows.length==0){
		 showErrorMsg("请为该车次添加线路信息!");
		 return false; 
	}
	debugger
	 var carType=$('#findCarType').combobox('getValue');
//	 if(carType==null||carType==''||carType=='--请选择--'){
//		 showErrorMsg("请为该车次选择车型!");
//		 return false; 
//	 }
	 var remark=$("#remark").val();
	 if(remark==null||remark==''){
		 showErrorMsg("请为该车次填写备注!");
		 return false; 
	 }
//	 var departTime=$("#departTime").val();
//	 var arrivalTime=$("#arrivalTime").val();
	 var departTime=$("#departTime").datetimebox("getValue");
	 var arrivalTime=$("#arrivalTime").datetimebox("getValue");
	 if(departTime>arrivalTime)
		 return showErrorMsg("发车时间不能早于到达时间");
	 
	if ($("#formLineClass").form('validate')) {
		openDialog("departurePlan", '生成发车计划');	
		driverCombogrid("driverPhone",{})
		carCombogrid("plateNumber",{'carType':carType})
	}
}
function initFormTime(obj){
	  $('#departTime').datetimebox({
		    stopFirstChangeEvent: true,
		    onChange: function() {
		        var options = $(this).datetimebox('options');
		        if(options.stopFirstChangeEvent) {
		            options.stopFirstChangeEvent = false;
		            return;
		        }
		        //以下写onchange的逻辑
		        timeChange('departTime');
		    }
		});
	  $('#arrivalTime').datetimebox({
		    stopFirstChangeEvent: true,
		    onChange: function() {
		        var options = $(this).datetimebox('options');
		        if(options.stopFirstChangeEvent) {
		            options.stopFirstChangeEvent = false;
		            return;
		        }
		        //以下写onchange的逻辑
		        timeChange('arrivalTime');
		    }
		});
		$("#departTime").datetimebox('setValue',dateTimeFormat(obj.departTime));
		$("#arrivalTime").datetimebox('setValue',dateTimeFormat(obj.arrivalTime));
		//$("#departTime").form("disableValidation");
}
function timeChange(flag){
	var departTime=$("#departTime").val();
	var arrivalTime=$("#arrivalTime").val();
	if(departTime && arrivalTime && arrivalTime>departTime){
		//截取字符串，得到日期部分"2009-12-02",用split把字符串分隔成数组
		var begin1=departTime.substr(0,10).split("-");
		var end1=arrivalTime.substr(0,10).split("-");

		//将拆分的数组重新组合，并实例成化新的日期对象
		var date1=new Date(begin1[1] + - + begin1[2] + - + begin1[0]);
		var date2=new Date(end1[1] + - + end1[2] + - + end1[0]);

		//得到两个日期之间的差值m，以分钟为单位
		//Math.abs(date2-date1)计算出以毫秒为单位的差值
		//Math.abs(date2-date1)/1000得到以秒为单位的差值
		//Math.abs(date2-date1)/1000/60得到以分钟为单位的差值
		var m=parseInt(Math.abs(date2-date1)/1000/60);

		//小时数和分钟数相加得到总的分钟数
		//time1.substr(11,2)截取字符串得到时间的小时数
		//parseInt(time1.substr(11,2))*60把小时数转化成为分钟
		var min1=parseInt(departTime.substr(11,2))*60+parseInt(departTime.substr(14,2));
		var min2=parseInt(arrivalTime.substr(11,2))*60+parseInt(arrivalTime.substr(14,2));

		//两个分钟数相减得到时间部分的差值，以分钟为单位
		var n=min2-min1;

		//将日期和时间两个部分计算出来的差值相加，即得到两个时间相减后的分钟数
		var minutes=m+n;
//		if(minutes>1440){
//			 showErrorMsg("出发和到达时间间隔不能超过24小时!");
//			 if('departTime'==flag){
//				 $("#departTime").datetimebox('setValue',dateTimeFormat(obj.departTime));
//			 }else{
//				 $("#arrivalTime").datetimebox('setValue',dateTimeFormat(obj.departTime));
//			 }
//			 return false;
//		}
		$('#totalTime').textbox('setValue',minutes);
//		$('#departTime').validatebox('disableValidation')
//        .focus(function () { $(this).validatebox('disableValidation'); })
////        .blur(function () {});
	}
}

function savedeparTurePlan(){
	debugger
	 dirverName =$("#driverPhone").val();
	 plateNumber=$("#plateNumber").combobox('getText');
	 //plateNumber=$("#plateNumber").val();
	 if(dirverName ==null || dirverName =='' || plateNumber==null ||plateNumber==''){
		 showErrorMsg("请输入司机和车牌!");
		 return false;
	 }
	 var drivePlan = new Object();
	 drivePlan.dirverName=$('#driverPhone').combobox('getText');
	 drivePlan.driverPhone=dirverName;
	 drivePlan.plateNumber=plateNumber;
	 drivePlan.carCode=$("#plateNumber").val();
	 var row = $('#tblException').datagrid('getSelected');
	 var id=row.id;
	 if(operationStep=="newLineGroup"){
		 //如果是新增发车计划
		 var lineDetailrows = $("#tblFreightOrderCombineDetail").datagrid("getRows"); //这段代码是获取当前页的所有行。
		 // 保存班次，路段，发车信息
		 var lineGroup=serializeFormObj("formLineClass");
		 lineGroup.carType=$("#findCarType").val();
		 $.ajax({
			url : rootPath + '/exceptionManager/saveLineGroupAndDrivePlan.do',
			data :{"exId":id,"lineGroupStr":JSON.stringify(lineGroup),"drivePlanStr":JSON.stringify(drivePlan),"detailVos":JSON.stringify(lineDetailrows)},
			task : function(data, statusText, xhr) {
				reloadDatagrid('tblException');
				$('#departurePlan').window('close');
				$('#dlgFreightOrderCombine').window('close'); 
			}
		});
	 }if(operationStep=="reBindDrivePlan"){
		 $.ajax({
				url : rootPath + '/exceptionManager/reBindDrivePlan.do',
				data :{"exId":id,"drivePlanStr":JSON.stringify(drivePlan)},
				task : function(data, statusText, xhr) {
					$('#departurePlan').window('close');
					reloadDatagrid('tblException');
				}
			}); 
	 }
}
/*根据查询条件查询*/
function findExceptiont() {
	if ($("#formFindException").form('validate')) {
		var datagrid = $('#tblException').datagrid('options');
		datagrid.url = rootPath + "/exceptionManager/findBycondition.do";
		
		var queryParams=serializeFormObj("formFindException");
		$('#tblException').datagrid('load',queryParams);
		}
}

/*重置查询条件*/
function resetExceptiont(){
	$('#formFindException').form('reset');
}
var url;
var selectedExceptionRow;
var dirverName ;
var plateNumber ;
var operationStep;

function openExceptionDetail(index){
	/* 获取当前选择行 */
	//var rows = $('#tblException').datagrid('getSelections');
	var row = $('#tblException').datagrid('getRows')[index];
	//if (rows.length ==1) {
		//var row = $('#tblException').datagrid('getSelected');
		//console.log("openExceptionDetail ="+row.exceptionCode+","+row.exceptionStatus+","+row.reason+","+row.excepType+","+row.exceptionCode+","+row.appSrage);
		
//		$("#createEmp").textbox('setValue',row.createEmp);
//		$("#startTrunkCode").textbox('setValue',row.startTrunkCode);
//		$("#excepSitesCode").combogrid('setValue',row.excepSitesCode);
//		$("#formExceptionCode").textbox('setValue',row.exceptionCode);
//		$("#reason").textbox('setValue',row.reason);
//		$("#blowVolume").textbox('setValue',row.blowVolume);
//		$("#layTime").textbox('setValue',row.layTime);
//		$("#formExceptionStatus").combobox('setValue',row.exceptionStatus);//下拉框
//		$("#excepType").combobox('setValue',row.excepType);//下拉框
//		$("#formAppSrage").combobox('setValue',row.appSrage);//下拉框
		openDialog("dlgExceptionManager", '运输异常详情');
		debugger
		$("#formExceptionManager").form("clear");
		$("#utf5").textbox('setValue',row.solveSolution);
		$("#startTrunkCode").textbox('setValue',row.startTrunkCode);
		if(row.createTime!=null){
			$("#formCreateTime").datetimebox("setValue",dateTimeFormat(row.createTime));
		}
		if(row.endTime!=null){
			$("#formUpdateTime").datetimebox("setValue",dateTimeFormat(row.endTime));
		}
		$("#lng").textbox('setValue',row.utf2);
		$("#excepSitesCode").textbox('setValue',row.excepSitesName);
		$("#updateEmp").textbox('setValue',row.solveEmp);
		$("#formExceptionManager").form("load", row);
//	}
//	else if (rows.length>1){
//		$.messager.alert("提示", "只能选择一条单据进行操作！", "info");
//	}else{
//		$.messager.alert("提示", "请选中一条单据进行操作！", "info");
//	}
}
function confirmException(index){
//	var rows = $('#tblException').datagrid('getSelections');
//	if (rows.length ==1) {
		//var row = $('#tblException').datagrid('getSelected');
	var row = $('#tblException').datagrid('getRows')[index];
		var id=row.id;
		var status= row.exceptionStatus;
//		if(status !='1'){
//			showErrorMsg("已在处理状态中,不能再次确认!");
//			return false;
//		}
		confirmMsg('要确定此异常吗？', function(data) {
			console.log("id ="+id);
			$.ajax({
				type:"POST", 
				url : rootPath + '/exceptionManager/confirmException.do?id='+id,
				data :{"id":id},
				dataType:"json",    
				contentType:"application/json",          
				task : function(data, statusText, xhr) {
					reloadDatagrid('tblException');
				}
			});
		});
//	}
//	else if (rows.length>1){
//		$.messager.alert("提示", "只能选择一条单据进行操作！", "info");
//	}else{
//		$.messager.alert("提示", "请选中一条单据进行操作！", "info");
//	}
}

function stopDrivePlan(index){
//	var rows = $('#tblException').datagrid('getSelections');
//	if (rows.length ==1) {
//		var row = $('#tblException').datagrid('getSelected');
	var row = $('#tblException').datagrid('getRows')[index];
		var id=row.id;
		confirmMsg('确定要终止该发车计划吗？', function(data) {
			console.log("id ="+id);
			$.ajax({
				type:"POST", 
				url : rootPath + '/exceptionManager/stopDrivePlan.do?id='+id,
				data :{"id":id},
				dataType:"json",    
				contentType:"application/json",          
				task : function(data, statusText, xhr) {
					reloadDatagrid('tblException');
				}
			});
		});
//	}else if (rows.length>1){
//		$.messager.alert("提示", "只能选择一条单据进行操作！", "info");
//	}else{
//		$.messager.alert("提示", "请选中一条单据进行操作！", "info");
//	}
}

function reBindDrivePlan(index){
//	var rows = $('#tblException').datagrid('getSelections');
//	if (rows.length ==1) {
//		var row = $('#tblException').datagrid('getSelected');
	var row = $('#tblException').datagrid('getRows')[index];
		var id=row.id;
		confirmMsg('确定要重绑发车计划吗？', function(data) {
			operationStep="reBindDrivePlan";
			openDialog("departurePlan", '重绑发车计划');	
			driverCombogrid("driverPhone",{})
			carCombogrid("plateNumber",{'carType':row.excepSitesName})
		});
//	}else if (rows.length>1){
//		$.messager.alert("提示", "只能选择一条单据进行操作！", "info");
//	}else{
//		$.messager.alert("提示", "请选中一条单据进行操作！", "info");
//	}
}

function repulseException(index){
//	var rows = $('#tblException').datagrid('getSelections');
//	if (rows.length ==1) {
//		var row = $('#tblException').datagrid('getSelected');
	var row = $('#tblException').datagrid('getRows')[index];
		var id=row.id;
		var status= row.exceptionStatus;
//		if(status !='1'){
//			showErrorMsg("异常已接收处理不能打回");
//			return false;
//		}
		confirmMsg('确定要打回此异常吗？', function(data) {
			console.log("id ="+id);
			$.ajax({
				type:"POST", 
				url : rootPath + '/exceptionManager/repulseException.do?id='+id,
				data :{"id":id},
				dataType:"json",    
				contentType:"application/json",          
				task : function(data, statusText, xhr) {
					reloadDatagrid('tblException');
				}
			});
		});
//	}else if (rows.length>1){
//		$.messager.alert("提示", "只能选择一条单据进行操作！", "info");
//	}else{
//		$.messager.alert("提示", "请选中一条单据进行操作！", "info");
//	}
}

function stopLineGroup(index){
//	var rows = $('#tblException').datagrid('getSelections');
//	if (rows.length ==1) {
//		var row = $('#tblException').datagrid('getSelected');
	var row = $('#tblException').datagrid('getRows')[index];
	var drivingPlanStatus=row.dirvingPlanStatus;
	/**
	 * 当异常已终止,发车计划未终止(!=06) 班次不允许终止
	 * 发车计划已终止且异常已终止，班次才能终止成功
	 * 班次终止成功后，班次表该班次状态变为已终止
	 */
	if(drivingPlanStatus!="06")
		return showInfoMsg("该发车计划未终止,不能终止班次");
	/**
	 * 终止班次所带的班次编号
	 */
	
		var id=row.id;
		confirmMsg('确定要终止该班次吗？', function(data) {
			console.log("id ="+id);
			$.ajax({
				type:"POST", 
				url : rootPath + '/exceptionManager/stopLineGroup.do?id='+id,
				data :{"id":id},
				dataType:"json",    
				contentType:"application/json",          
				task : function(data, statusText, xhr) {
					reloadDatagrid('tblException');
				}
			});
		});
//	}else if (rows.length>1){
//		$.messager.alert("提示", "只能选择一条单据进行操作！", "info");
//	}else{
//		$.messager.alert("提示", "请选中一条单据进行操作！", "info");
//	}
}

function openDlgExceptionSummary(index){
	debugger
//	var rows = $('#tblException').datagrid('getSelections');
//	if (rows.length ==1) {
//		var row = $('#tblException').datagrid('getSelected');
	var row = $('#tblException').datagrid('getRows')[index];
		var status= row.exceptionStatus;
//		if( status !='4'){
//			showErrorMsg("异常还未终止");
//			return false;
//		}
		openDialog("dlgExceptionSummary", '异常小结');
		$("#formExceptionSummary").form('clear');
		$("#summaryId").val(row.id);
		url = rootPath + "/exceptionManager/exceptionSummary.do";
//	}else if (rows.length>1){
//		$.messager.alert("提示", "只能选择一条单据进行操作！", "info");
//	}else{
//		$.messager.alert("提示", "请选中一条单据进行操作！", "info");
//	}
}
function saveExceptionSummary(){
	utf1=$("#utf1").val();
	 if(utf1 ==null || utf1 ==''){
		 showErrorMsg("请输入异常小结!");
		 return false;
	 }
	$('#formExceptionSummary').form('submit',{
		   url: url,
		   onSubmit: function(){
		       if($(this).form('validate')) {
		      	   //alert(100)
		    	   uceLoading.show("请稍后...");
		    	   return true;
		       }else{
		    	   //alert(200)    
		    	   return false;
		       }
		   },
		   success: function(data){
			   uceLoading.close();
			   if (isEmptyObject(data)) {
				   showErrorMsg('服务器端异常');
				   return;
			   }
			   var result = data;
			   if (typeof data == 'string') {
					result = eval('('+ data +')');
			   }
			   if (result.success) {
				   closeDialog("dlgExceptionSummary");
				   $('#tblException').datagrid('reload');   
				   showTips(result.message,'success');
					if ($(this).form('options').task) {
						$(this).form('options').task.call(this, result);
					}
				} else {
					showError(result);
				}
			},
			error: function(data,statusText,xhr){
	    	   uceLoading.close();
			}
	   });
}

function openxceptionSummary(index){
//	var rows = $('#tblException').datagrid('getSelections');
//	if (rows.length ==1) {
//		var row = $('#tblException').datagrid('getSelected');
	var row = $('#tblException').datagrid('getRows')[index];
		var status= row.exceptionStatus;
		openDialog("dlgExceptionSummary", '异常小结');
		$("#formExceptionSummary").form('clear');
		$("#handleId").val(row.id);
		url = rootPath + "/exceptionManager/exceptionSummary.do";
//	}else if (rows.length>1){
//		$.messager.alert("提示", "只能选择一条单据进行操作！", "info");
//	}else{
//		$.messager.alert("提示", "请选中一条单据进行操作！", "info");
//	}
}
/*
 * 限制日期控件范围
 */
function dateRange(startTime, endTime) {
	$("#" + startTime).datebox({
		onSelect : function(start) {
			if ($("#" + endTime).datebox('getValue')) {
				// 开始时间大于结束时间
				var end = $("#" + endTime).datebox('getValue');
				if (start > end) {
					$("#" + endTime).datebox('setValue', "");
				} else {
					/* 控制结束日期输入大小 */
					$("#" + endTime).datebox().datebox('calendar').calendar({
						validator : function(value) {
							return value >= start;
						}
					});
					$("#" + endTime).datebox('setValue', end);

				}
			}else{
				/* 控制结束日期输入大小 */
				$("#" + endTime).datebox().datebox('calendar').calendar({
					validator : function(value) {
						return value >= start;
					}
				});
			}
		}
	});
	$("#" + endTime).datebox({
		onSelect : function(end) {
			if ($("#" + startTime).datebox('getValue')) {
				var start = $("#" + startTime).datebox('getValue');
				if (start > end) {
					$("#" + startTime).datebox('setValue', "");
				} else {
					/* 控制开始日期输入大小 */
					$("#" + startTime).datebox().datebox('calendar').calendar({
						validator : function(value) {
							return value <= end;
						}
					});
					$("#" + startTime).datebox('setValue', start);
				}
			}else{
				/* 控制开始日期输入大小 */
				$("#" + startTime).datebox().datebox('calendar').calendar({
					validator : function(value) {
						return value <= end;
					}
				});
			}
		}
	});
}
/**
 * 取消时间限制
 * @param startTime
 * @param endTime
 */
function cancelDateRange(startTime, endTime){
	/* 控制开始日期输入大小 */
	resetDateBox(startTime);
	/* 控制结束日期输入大小 */
	resetDateBox(endTime);
	
}
/**
 * 初始化datebox的时间限制
 */
function resetDateBox(dateboxId){
	/* 控制结束日期输入大小 */
	$("#" + dateboxId).datebox().datebox('calendar').calendar({
		validator : function(value) {
			var date = new Date('1970-01-01'.replace(/-/,"/")) 
			return value >= date;
		}
	});
}
function dateTimeFormat(value) {
	if (value == null) {
		return '';
	}
	var val = new Date(value);
	var year = parseInt(val.getYear()) + 1900;
	var month = parseInt(val.getMonth()) + 1;
	month = month > 9 ? month : ('0' + month);
	var date = parseInt(val.getDate());
	date = date > 9 ? date : ('0' + date);
	var hours = parseInt(val.getHours());
	hours = hours > 9 ? hours : ('0' + hours);
	var minutes = parseInt(val.getMinutes());
	minutes = minutes > 9 ? minutes : ('0' + minutes);
	var seconds = parseInt(val.getSeconds());
	seconds = seconds > 9 ? seconds : ('0' + seconds);
	var time = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
	return time;
}