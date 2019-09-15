

$(function() {
	var driverCardUpload="true";
	/* 加载主界面grid */
	var columns = [ [
			{field : "id",checkbox : "true" },
			{field : 'des',title : '操作',align : 'center',width : 80,formatter : function(value, rec, index) {
					return '<a class="icon-line iconfont uce-edit" title="编辑" onclick="openUpdateTruckCost(\'' + index + '\')" href="javascript:void(0)"></a>'+"|"+
							'<a class="icon-line iconfont uce-ck-details" title="历史版本" onclick="showHistoryTruckCost(\'' + index + '\')" href="javascript:void(0)"></a>'
					;
				}
			},
			{field : 'truckManageCode',title : '车型管理号',align : 'center',width : 120,formatter : formatTip},
			{field : 'truckCostName',title : '车型成本名称',align : 'center',width : 120,formatter : formatTip},
			{field : 'belongSiteName',title : '分拨中心',align : 'center',width : 70,formatter : formatTip},
			{field : 'truckType',title : '车辆类型',align : 'center',width : 100,formatter : function(value){
				return getTypeNameByCode("TRUCK_DEMAND_TYPE", value,formatTip);
			}}, 
			{field : 'truckConcrete',title : '具体车型',align : 'center',width : 80,formatter : function(value){
				return getTypeNameByCode("CAR_TYPE", value,formatTip);
			}	},
			{field : 'costCoefficient',title : '变动成本系数',align : 'center',width : 80,formatter : formatTip	},
			{field : 'handlingCharges',title : '装卸费系数',align : 'center',width : 80,formatter : formatTip	},
			{field : 'fixedCharges',title : '固定成本费用',align : 'center',width : 110,formatter : formatDouble},
			{field : 'truckVolume',title : '实际方数',align : 'center',width : 60,formatter : formatDouble},
			{field : 'bufferVolume',title : '缓冲方数',align : 'center',width : 60,formatter : formatDouble},
			{field : 'createEmp',title : '创建人',align : 'center',width : 60,formatter :  formatTip	},
			{field : 'updateEmp',title : '修订人',align : 'center',width : 60,formatter : formatTip},
			{field : 'detailsStatus',title : '状态',align : 'center',width : 70,formatter : function(value){
				return getTypeNameByCode("DE_STATUS", value,formatTip);
			}}, 
			{field : 'version',title : '版本号',align : 'center',width : 100,formatter : formatTip	},
			] ];

	var dataGridParams = {
		url : '',
		pageSize : 10,
		toolbar : '#tlbTruckCost',
		singleSelect : 'false',
		fitColumns : 'false',
		onBeforeLoad : function(param) {
		},
		onLoadSuccess : function(data) {
		},
		onLoadError : function() {
			// 在载入远程数据产生错误的时候触发。
		}
	}
	
	initDictDatas('CAR_TYPE,TRUCK_DEMAND_TYPE,DE_STATUS');
	/* 加载表单数据 */
	newloadGrid('tblTruckCost', columns, dataGridParams);

	/* 数据字典加载 */
	uceDictCombobox('findtruckType', 'TRUCK_DEMAND_TYPE');
	uceDictCombobox('findtruckConcrete', 'CAR_TYPE');
	uceDictCombobox('finddetailsStatus', 'DE_STATUS');
	uceDictCombobox('truckType', 'TRUCK_DEMAND_TYPE');
	uceDictCombobox('truckConcrete', 'CAR_TYPE');

	//机构下拉菜单
	orgCombogrid('findbelongSiteCode', {
		orgTypes : ORG_TYPE_OPERATE_CENTER,
		orgStatus : ORG_ENABLED
	});
	orgCombogrid('belongSiteCode', {
		orgTypes : ORG_TYPE_OPERATE_CENTER,
		orgStatus : ORG_ENABLED
	});
	/* orgCombogrid('findbelongSiteCode', {
		    
		    orgTypes : [ORG_TYPE_OPERATE_CENTER,ORG_TYPE_SITE],
		    orgStatus : [ORG_ENABLED],
		  });
	 orgCombogrid('belongSiteCode', {
		    
		    orgTypes : [ORG_TYPE_OPERATE_CENTER,ORG_TYPE_SITE],
		    orgStatus : [ORG_ENABLED],
		  });*/
	//modelsCode("findtruckCostName",{});
	//appUser("newUser",{});
});
/**
 * 补齐两位小数点
 */
function formatDouble(val){
	if(val!=null){
		return val.toFixed(2);
	}
}

/**
 * 
 * 车辆类型显示(目前只有1：4.2和2：4.8，3 5.2)
 */

/**
 * 车辆类型(1:长期需求2：临时需求)
 */

/*根据查询条件查询*/
function findTruckCostbywhere() {
//	var val=$('#formFindTruckCost').form('validate');
	if($('#formFindTruckCost').form('validate')){
		 var datagrid = $('#tblTruckCost').datagrid('options');
		 
		datagrid.url = rootPath + "/truckCostManage/findByPagination.do";
		
		$('#tblTruckCost').datagrid('load',
				serializeFormObj("formFindTruckCost"));
	}
}
//更新或者新增
function addOrUpdateTruckCost(){
	if($("#myid").val()==null || $("#myid").val()==""){
		$("#createEmp").val(empName);
		$('#formLineClass').form('submit',{
			   url: rootPath + "/truckCostManage/addTruckCost.do",
			   onSubmit: function(param){
				   param.createTime=formatTime(new Date);
				   param.truckManageCode=$("#truckManageCode").val();
				  // param.createEmp=empName;
				   param.version=1;
			       if($(this).form('validate')) {
			    	   uceLoading.show("请稍后...");
			    	   return true;
			       }
			       return false;
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
					   //成功处理。。。
					   closeDialog("dlgTruckCost");
					   findTruckCostbywhere();  
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
	}else{
		//更新
		$('#formLineClass').form('submit',{
			   url: rootPath + "/truckCostManage/editTruckCost.do",
			   onSubmit: function(param){
				   param.truckManageCode=$("#truckManageCode").val();
				   param.updateTime=formatTime(new Date);
				   param.updateEmp=empName;
				   param.truckManageCode=$("#truckManageCode").val();
				   param.truckCostName=$("#truckCostName").val();
				   param.truckType=$("#truckType").val();
				   param.truckConcrete=$("#truckConcrete").val();
			       if($(this).form('validate')) {
			    	   uceLoading.show("请稍后...");
			    	   return true;
			       }
			       return false;
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
					   //成功处理。。。
					   closeDialog("dlgTruckCost");
					   findTruckCostbywhere();  
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

	
}
/*重置查询条件*/
function resetTruckCost(){
	//cancelDateRange('executeBeginTime','executeEndTime')
	$('#formFindTruckCost').form('reset');
}

//新增
function addTruckCost(){
	$.ajax({
		url:rootPath + "/truckCostManage/getTruckManageCode.do",
		success:function(msg){
			if(msg!=null || msg != ""){
				openDialog("dlgTruckCost", '新增');
				$("#formLineClass").form('clear');
				//$('#truckCostName').combobox('enable'); 
				$('#truckType').combobox('enable'); 
				$('#truckConcrete').combobox('enable'); 
				$("#formLineClass").form('load', {'truckManageCode':msg});
				$("#createEmp").val(empName);
				$("#truckCostName").val("");
			}
			else{
				showErrorMsg('服务器正忙！');
			}
			
		}
		
		
	})
	
	
}
/*更新*/
function openUpdateTruckCost(index){
	// 获取当前选择行 
	var row = $('#tblTruckCost').datagrid('getRows')[index];
	if (row) {
		if(row.detailsStatus=='2' || row.detailsStatus==2){
			showErrorMsg('正式版本不能进行编辑！');
			return;
		}
		openDialog("dlgTruckCost", '修改');
		$("#formLineClass").form('clear');
		$("#formLineClass").form('load', row);
		$('#truckManageCode').combobox('disable'); 
		$('#truckCostName').combobox('disable'); 
		$('#truckType').combobox('disable'); 
		$('#truckConcrete').combobox('disable'); 
		//$('#version').combobox('disable'); 
		
		
		
		//$("#truckCostCode").attr("readonly",true),
		
	}
}
function versionUpTruckCost(){
	//获取所有的勾选项目的ids
	var ids=getChecked();//TODO
	if(getCheckedStatus(1)){
		showErrorMsg('未经过审核的列不能进行版本升级！');
		return ;
	}
	if(ids==""){
		showErrorMsg("请勾选你需要升级版本的数据！")
		return;
	}
	$.ajax({
		url:rootPath + "/truckCostManage/versionUpByIds.do",
		data:{'ids':ids,'updateEmp':empName},
		success: function(data){
		    if(data>0){
		    	findTruckCostbywhere();
		    	showTips("升级成功!");
		    	//状态修改成功
		    }else{
		    	//状态修改失败
		    	findTruckCostbywhere();
		    	showTips("升级失败!");
		    }
		}
		
		
	})
}

/*获取所有的选中行数*/

function getChecked(){
	var selections = $('#tblTruckCost').datagrid('getSelections');
	//var ids = new Array();
	var ids="";
	for (var int = 0; int < selections.length; int++) {
		ids=ids+selections[int].id;
		if(selections.length!=int-1){
			ids=ids+",";
		}
	}
	return ids
}

function getCheckedStatus(status){
	var selections = $('#tblTruckCost').datagrid('getSelections');
	for (var int = 0; int < selections.length; int++) {
		if(status==selections[int].detailsStatus){
			return true;
		}
		
	}
	return false;
}
/**
 * 获取一个选择的节点
 */
function getSelectCost(){
	var selected= $('#tblTruckCost').datagrid('getSelected');
	if(selected==null || selected==''){
		return null;
	}else{
		return selected.truckManageCode;
		
	}
	return null;
	
}
//批量审核(通过IDs修改对应的状态)
function checkUpTruckCost(){
	var ids=getChecked();
	if(getCheckedStatus(2)){
		showErrorMsg('请勿审核已经通过审核状态的消息！');
		return ;
	}
	if(ids==null || ids ==''){
		showErrorMsg("请勾选你需要通过审核的数据！")
	}else{
		$.ajax({
			url:rootPath + "/truckCostManage/updateDetailsStatusByIds.do",
			data:{'ids':ids},
			success: function(data){
			    if(data>0){
			    	findTruckCostbywhere();
			    	showTips(data+"条数据审核成功!");
			    	//状态修改成功
			    }else{
			    	//状态修改失败
			    	findTruckCostbywhere();
			    	showTips("审核失败!");
			    }
			}
			
			
		})
		
	}
	
}
function showHistoryTruckCost(index){
	/*$('#tblCostHistory').datagrid({    
	    url:'datagrid_data.json',
	    data:'',});*/  
	var row = $('#tblTruckCost').datagrid('getRows')[index];
	var getSelect=row.truckManageCode;
	/*var getSelect=getSelectCost();
		if(getSelect ==null){
			showErrorMsg("请选择你需要查看的历史版本！");
			return;
		}*/
	   var columns= [ [
	     			{field : "id",checkbox : "true" },
	     			{field : 'des',title : '序号',align : 'center',width : 40,formatter : function(value, rec, index) {
	     					return index ;
	     				}
	     			},
	     			{field : 'truckManageCode',title : '车型管理号',align : 'center',width : 100,formatter : formatTip},
	     			{field : 'belongSiteName',title : '分拨中心',align : 'center',width : 70,formatter : formatTip},
	     			{field : 'truckCostName',title : '车型成本名称',align : 'center',width : 120,formatter : formatTip},
	     			{field : 'truckType',title : '车型类型',align : 'center',width : 100,formatter : function(value){
	    				return getTypeNameByCode("TRUCK_DEMAND_TYPE", value,formatTip);
	    			}}, 
	     			{field : 'truckConcrete',title : '具体车型',align : 'center',width : 80,formatter : function(value){
	    				return getTypeNameByCode("CAR_TYPE", value,formatTip);
	    			}	},
	     			{field : 'truckVolume',title : '实际方数',align : 'center',width : 60,formatter : formatDouble},
	     			{field : 'bufferVolume',title : '缓冲方数',align : 'center',width : 60,formatter : formatDouble},
	     			{field : 'handlingCharges',title : '装卸费系数',align : 'center',width : 80,formatter : formatDouble	},
	     			{field : 'costCoefficient',title : '变动成本系数',align : 'center',width : 80,formatter : formatDouble	},
	     			{field : 'fixedCharges',title : '固定成本费用(月)',align : 'center',width : 110,formatter : formatDouble},
	     			{field : 'createEmp',title : '创建人',align : 'center',width : 60,formatter :  formatTip	},
	     			{field : 'updateEmp',title : '修订人',align : 'center',width : 60,formatter : formatTip},
	     			{field : 'version',title : '版本号',align : 'center',width : 100,formatter : formatTip	},
	     			] ]  
					var dataGridParams = {
						    		url : '',
						    		pageSize : 10,
						    		toolbar : '#tblCostHistory',
						    		singleSelect : 'false',
						    		fitColumns : 'false',
						    		onBeforeLoad : function(param) {
						    		},
						    		onLoadSuccess : function(data) {
						    		},
						    		onLoadError : function() {
						    			// 在载入远程数据产生错误的时候触发。
						    		}
						    	}
					newloadGrid('tblCostHistory', columns, dataGridParams);
						var datagrid = $('#tblCostHistory').datagrid('options');
						
						datagrid.url = rootPath + "/truckCostManage/findHistoryByTruckManageCode.do";
						
						$('#tblCostHistory').datagrid('load',
								{'truckManageCode':getSelect});
						openDialog("divtblCostHistory", '历史记录');
	
}




