

$(function() {
	//查询界面空间
	//dateRange("executeBeginTime", "executeEndTime");
	var noSave=false;
	var startSiteName='';
	var endSiteName='';
	initDictDatas('TRANSPORT_EFFECTIVE_STATUS');
	/* 加载主界面grid */
	var columns = [ [
			{field : "id",checkbox : "true"},
			{field : 'des',title : '操作',align : 'center',width : 90,formatter : function(value, rec, index) {
					return '<a class="icon-line iconfont uce-edit" title="编辑" onclick="openUpdatetransportEffective(\'' + index + '\')" href="javascript:void(0)"></a><a class="icon-line iconfont uce-password" title="启用" onclick="openUpdatetransportEffectiveStatus(\'' + index + '\')" href="javascript:void(0)"></a>'
					+'<a  title="删除" style="display:'+(dealPermission(['transport_effective_del']) ? 'none' : 'block')+',float:left" onclick="patchDelete()" class="icon-line iconfont uce-delete" href="javascript:void(0)"></a>';
				}
			},
			{field : 'effectiveCode',title : '时效编码',align : 'center',width : 120,formatter : formatTip},
			{field : 'startSite',title : '始发站',align : 'center',width : 100,formatter : formatTip},
			{field : 'endSite',title : '目的站',align : 'center',width : 120,formatter : formatTip},
			{field : 'distance',title : '线路距离（KM）',align : 'center',width : 120,formatter : formatTip}, 
			{field : 'speed',title : '线路速度（KM/H）',align : 'center',width : 80,formatter : formatTip	},
			{field : 'effective',title : '时效（MIN）',align : 'center',width : 100,formatter : formatTip},

			{field : 'status',title : '时效状态',align : 'center',width : 80, formatter:function(value){
				return getTypeNameByCode("TRANSPORT_EFFECTIVE_STATUS", value,formatTip);
			}
		    },
		
			{field : 'createEmp',title : '创建人',align : 'center',width : 80,formatter : formatTip}, 
			{field : 'createTime',title : '创建时间',align : 'center',width : 130,formatter : function(value) {return formatData(value)}	} 
			
			] ];

	var dataGridParams = {
		url : '',
		pageSize : 10,
		toolbar : '#toolbarTransportEffective',
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
	newloadGrid('tblTransportEffective', columns, dataGridParams);
	
	
	
	//startSiteCode  startSiteCode   effectiveStatus
	//初始化数据字典
	initDictDatas('TRANSPORT_EFFECTIVE_STATUS');

	/* 数据字典加载 */
	uceDictCombobox('findEffectiveStatus', 'TRANSPORT_EFFECTIVE_STATUS');
	
	/* 加载组织下拉表单数据 */
	orgCombogrid('findStartSiteCode', {
		orgType : ORG_TYPE_OPERATE_CENTER + ',' + ORG_TYPE_SITE
	});
	orgCombogrid('findEndSiteCode', {
		orgType : ORG_TYPE_OPERATE_CENTER + ',' + ORG_TYPE_SITE
	});

	orgCombogrid('comStartsite1', {
		orgType : ORG_TYPE_OPERATE_CENTER + ',' + ORG_TYPE_SITE,
		status : ORG_ENABLED
	});
	orgCombogrid('comEndsite', {
		orgType : ORG_TYPE_OPERATE_CENTER + ',' + ORG_TYPE_SITE,
		status : ORG_ENABLED
	});
	
	
});
//根据线路距离和速度   同时不为空得出时效
function changeEffectiveByDistanceAndSpeed(){
	var distance=$("#distance").numberbox("getValue");
	var speed=$("#speed").numberbox("getValue");
	if(distance&&speed){
		var effective=Number(distance/speed*60).toFixed(0);
		$("#effective").numberbox("setValue",effective);
	}
}



/*根据查询条件查询*/
function findTransportEffective() {
	if ($("#formFindTransportEffective").form('validate')) {
	
		var datagrid = $('#tblTransportEffective').datagrid('options');
		datagrid.url = rootPath + "/transportEffective/findBycondition.do";
		
		var queryParams=serializeFormObj("formFindTransportEffective");
		//queryParams.demandType='1';
		console.log(queryParams);
		$('#tblTransportEffective').datagrid('load',queryParams);
		}
}
/*重置查询条件*/
function resetTransportEffective(){
	$('#formFindTransportEffective').form('reset');
}

var url;
/*新增*/
function openAddTransportEffective(){
	debugger
	openDialog("dlgTransportEffective", '新增');
	$("#formEditTransportEffective").form('clear');
	$("#status").combobox("setValue",1);
	url = rootPath + "/transportEffective/addTransportEffective.do";
}
/*更新*/
function openUpdatetransportEffective(index){
	/* 获取当前选择行 */
	debugger
	var row = $('#tblTransportEffective').datagrid('getRows')[index];
	console.log(url);
	if (row) {
		//debugger
		//row.createTime = formatTime(row.createTime);	
		$("#formEditTransportEffective").form('clear');
		$("#formEditTransportEffective").form('load', row);	
		$("#comStartsite1").combogrid("grid").datagrid("reload",{"q":row.startSiteCode});
		$("#comEndsite").combogrid("grid").datagrid("reload",{"q":row.endSiteCode});
		/*$("#comStartsite1").combogrid('setValue',row.startSiteCode);
		$("#comStartsite1").combogrid('setText',row.startSite);
		$("#comEndsite").combogrid('setValue',row.endSiteCode);
		$("#comEndsite").combogrid('setText',row.endSite);*/
		
		//$("#id").textbox('setValue',row.id);
		url = rootPath + "/transportEffective/updateTransportEffective.do";
		openDialog("dlgTransportEffective", "修改");
	}
}

/*更新状态*/
function openUpdatetransportEffectiveStatus(index){
	/* 获取当前选择行 */
	var row = $('#tblTransportEffective').datagrid('getSelected');
	if (row) {
		debugger
		url = rootPath + "/transportEffective/openUpdatetransportEffectiveStatus.do?id="+row.id;
		confirmMsg('您确定要修改时效状态吗？', function(data) {
			console.log("id ="+row.id);
			$.ajax({
				type:"POST", 
				url : rootPath + '/transportEffective/openUpdatetransportEffectiveStatus.do?id='+row.id,
				data :{"id":row.id},
				dataType:"json",    
				contentType:"application/json",          
				task : function(data, statusText, xhr) {
					reloadDatagrid('tblTransportEffective');
				}
			});
		});
	}
}

/*保存*/
function saveTransportEffective(){
	debugger
	var startsite=$("#comStartsite1").combogrid('getText');
	var endsite=$("#comEndsite").combogrid('getText');
	if(startsite !='' && endsite !='' && startsite==endsite){
		showErrorMsg("始发站和目的站不能一样");
		return false;
	}
	$("#hidStartSite").val($("#comStartsite1").combogrid('getText'));
	$("#hidEndSite").val($("#comEndsite").combogrid('getText'));
	$('#formEditTransportEffective').form('submit',{
		   url: url,
		   onSubmit: function(){
		       if($(this).form('validate')) {
		    	   uceLoading.show("请稍后...");
		    	   return true;
		       }else{
		    	   return false;
		       }
		  
		   },
		   success: function(data){
			   debugger
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
				   closeDialog("dlgTransportEffective");
				   $('#tblTransportEffective').datagrid('reload');   
				   showTips(result.message,'success');
					if ($(this).form('options').task) {
						$(this).form('options').task.call(this, result);
					}
				} else {
					   showErrorMsg(result.message);
					//showError(result);
				}
			},
			error: function(data,statusText,xhr){
	    	   uceLoading.close();
			}
	   });
}


//批量删除
function patchDelete(index){
	/* 获取当前选择行 */
	var checkedItems  = $('#tblTransportEffective').datagrid('getChecked');
	var effectiveIds = "";
	$.each(checkedItems, function(index, item){
		effectiveIds+=item.id+",";
	});               
	console.log("ids ="+effectiveIds);
	
	if (effectiveIds) {
		confirmMsg('您确定要删除选中的数据吗？', function(data) {
			console.log("effectiveIds ="+effectiveIds);
			$.ajax({
				type:"POST", 
				url : rootPath + '/transportEffective/deleteTransportEffective.do?effectiveIds='+effectiveIds,
				data :{"effectiveIds":effectiveIds},
				dataType:"json",    
				contentType:"application/json",          
				task : function(data, statusText, xhr) {
					reloadDatagrid('tblTransportEffective');
				}
			});
		});
	}
}
