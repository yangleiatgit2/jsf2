

$(function() {
	//查询界面空间
	//dateRange("executeBeginTime", "executeEndTime");
	var noSave=false;
	var startSiteName='';
	var endSiteName='';
	
	/* 加载主界面grid */
	var columns = [ [
			{field : "id",checkbox : "true"},
			{field : 'des',title : '操作',align : 'center',width : 70,formatter : function(value, rec, index) {
					return '<a class="icon-line iconfont uce-edit" title="编辑" onclick="openUpdatetransportEffective(\'' + index + '\')" href="javascript:void(0)"></a>';
				}
			},
			{field : 'name',title : '活动名称',align : 'center',width : 100,formatter : formatTip},
			{field : 'appType',title : 'app 类型',align : 'center',width : 100,formatter:function(value){
				return getTypeNameByCode("APP_TYPE", value,formatTip);
			  }
			},
			{field : 'website',title : '广告链接地址',align : 'center',width : 180,formatter : formatTip},
			{field : 'createEmp',title : '创建人',align : 'center',width : 80,formatter : formatTip}, 
			{field : 'createTime',title : '创建时间',align : 'center',width : 130,formatter : function(value) {return formatData(value)}	} 
			
			] ];

	var dataGridParams = {
		url : '',
		pageSize : 10,
		toolbar : '#toolbarTransportEffective',
		singleSelect : 'false',
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
	initDictDatas('PLATFORM,APP_TYPE');

	/* 数据字典加载 */
	uceDictCombobox('findAppType', 'APP_TYPE');
	uceDictCombobox('formAppType', 'APP_TYPE');
	//uceDictCombobox('formPlatForm', 'PLATFORM',{headerValue:false});
	dateRange("effectTime", "expireTime");
});
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
/*根据查询条件查询*/
function findTransportEffective() {
	if ($("#formFindTransportEffective").form('validate')) {
	
		var datagrid = $('#tblTransportEffective').datagrid('options');
		datagrid.url = rootPath + "/activityAdvert/findBycondition.do";
		
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


//改变app类型和平台共同change事件
function plateFormAndAppTypeCommon(){
	debugger
	var appType=$("#formAppType").combobox('getValue');
	//var platform=$("#formPlatForm").combobox('getValue');
	if(appType){
		$.ajax({
			type:"post", 
			url : rootPath + '/activityAdvert/findListByVo.do',
			data :{"appType":appType},
//			dataType:"json",    
//			contentType:"application/json",          
			task : function(data, statusText, xhr) {
			},
		    success : function(data) { 
		    	var list=data.data;
				if(list && list.length>0){
	                $("#formAppVersion").combobox("loadData", list);  
				}else{
					showErrorMsg("后台没有找到app版本信息!");
					//$("#formAppVersion").val('');
					$("#formAppVersion").combobox("loadData",[]);
					$('#formAppVersion').combobox('setText', '');  
				}     	
	        },        
	        error: function(XMLHttpRequest, textStatus, errorThrown) {            
	        }  
		});
	}else
		$("#formAppVersion").combobox("loadData",[]);
}

var url;
/*新增*/
function openAddTransportEffective(){
	openDialog("dlgTransportEffective", '新增');
	$("#formEditTransportEffective").form('clear');
	$("#status").combobox("setValue",1);
	url = rootPath + "/activityAdvert/add.do";
}
/*更新*/
function openUpdatetransportEffective(index){
	/* 获取当前选择行 */
	var row = $('#tblTransportEffective').datagrid('getRows')[index];
	console.log(url);
	if (row) {
		openDialog("dlgTransportEffective", "修改");
		$("#formEditTransportEffective").form('clear');
		if(row.effectTime)row.effectTime= formatDate(row.effectTime);	
		if(row.expireTime)row.expireTime= formatDate(row.expireTime);	
		$("#formEditTransportEffective").form('load', row);	
		
		var imageUrlOriginal=row.imageUrlOriginal;
		if(imageUrlOriginal){
			var fileName=imageUrlOriginal.substring(imageUrlOriginal.lastIndexOf("\\")+1);
			console.log(fileName);
			$("#uploadFile").filebox("setText",fileName);
		}
		
		url = rootPath + "/activityAdvert/update.do";
		
	}
}

/*保存*/
function saveTransportEffective(){
//	var appType=$("#appType").combogrid('getText');
//	$("#hidStartSite").val($("#comStartsite1").combogrid('getText'));
//	$("#hidEndSite").val($("#comEndsite").combogrid('getText'));
	debugger
	var  uploadFile=$('#uploadFile').filebox('getValue')
	if(/.*[\u4e00-\u9fa5]+.*$/.test(uploadFile)) 
	{ 
		showErrorMsg("文件不能含有汉字！"); 
		return false; 
	}
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
				   closeDlgEffective();
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
/**
 * 关闭dialog
 */
function closeDlgEffective(){
	cancelDateRange("effectTime", "expireTime");
	$('#dlgTransportEffective').window('close');
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
				url : rootPath + '/activityAdvert/delete.do?idStrs='+effectiveIds,
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
