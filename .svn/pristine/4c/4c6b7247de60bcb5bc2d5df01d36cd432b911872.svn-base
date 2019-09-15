//页面加载后.....
$(function() {
	var columns = initOperaTimeTbl();
	initDataGridParams();
	//初始化页面table
	initTableData("tblOperaTime",columns);
	orgCombogrid('operationCenterCode',{status: ORG_ENABLED,orgTypes:ORG_TYPE_OPERATE_CENTER});
	orgCombogrid('siteCode',{status: ORG_ENABLED,orgTypes:ORG_TYPE_SITE});
	if(cmsOrgType == ORG_TYPE_OPERATE_CENTER){
		$("#operationCenterCode").combobox("setValue",cmsBaseOrgCode);
	}
	if(cmsOrgType == ORG_TYPE_SITE){
		$("#siteCode").combobox("setValue",cmsBaseOrgCode);
	}
});
//设置默认当前用户分拨
function setCurOrg(domId,orgtype){
	$("#"+domId).combobox("setValue",cmsOrgCode);
}
//打开新增修改对话框
function openAddOpearTime(){
	$('#formAddOperaTime').form('clear');
	openDialog("dlgNewOperaTime", '时刻表新增');
	orgCombogrid('addOperationCenterCode',{status: ORG_ENABLED,orgTypes:ORG_TYPE_OPERATE_CENTER});
	orgCombogrid('addSiteCode',{status: ORG_ENABLED,orgTypes:ORG_TYPE_SITE});
	if(cmsOrgType == ORG_TYPE_OPERATE_CENTER){
		$("#addOperationCenterCode").combobox("setValue",cmsBaseOrgCode);
	}
	if(cmsOrgType == ORG_TYPE_SITE){
		$("#addSiteCode").combobox("setValue",cmsBaseOrgCode);
	}
	addOrEdit = "add";
	 $("#addOperationCenterCode").textbox({disabled: false});
     $("#addSiteCode").textbox({disabled: false});
}
//打开编辑对话框
function openEdidOperaTime(id,v){
	addOrEdit = "edit";
	version = v;
	this.id = id;
	url= rootPath + "/operationTime/findById.do";
	uceAjax(url, {id : id}, function(data) {
		var row = data.data;
		if(row){
			$('#formAddOperaTime').form('clear');
			openDialog("dlgNewOperaTime", '时刻表修改');
			orgCombogrid('addOperationCenterCode',{status: ORG_ENABLED,orgTypes:ORG_TYPE_OPERATE_CENTER});
			orgCombogrid('addSiteCode',{status: ORG_ENABLED,orgTypes:ORG_TYPE_SITE});
			row.earliestDepartureTime = new Date(row.earliestDepartureTime).format("hh:mm");
			row.latestArrivalTime = new Date(row.latestArrivalTime).format("hh:mm");
	        $('#formAddOperaTime').form('load',row);
	        $('#addOperationCenterCode').combogrid('grid').datagrid('reload',{q:row.operationCenterCode});  
	        $('#addSiteCode').combogrid('grid').datagrid('reload',{q:row.siteCode});  
	        $("#addOperationCenterCode").textbox({disabled: true});
	        $("#addSiteCode").textbox({disabled: true});
		}
	});
}
//查询分拨时刻表
function findOperaTime(){
	 var options =$('#tblOperaTime').datagrid('options');
	 options.url= rootPath + "/operationTime/findByCondition.do";
	 $('#tblOperaTime').datagrid('load',serializeFormObj("formFindOperaTime"));
}
//保存/修改分拨时刻
function saveOperaTime(){
	//校验表单
	if(!$('#formAddOperaTime').form('validate')) return;
	//序列化form对象
	var obj = serializeFormObj('formAddOperaTime');
	//将时间转换为年月日时分秒格式
	obj.earliestDepartureTime = "2000-01-01 "+obj.earliestDepartureTime+":00";
	obj.latestArrivalTime = "2000-01-01 "+obj.latestArrivalTime+":00";
	//添加分拨和网点名称
	obj.operationCenterName = $("#addOperationCenterCode").textbox("getText");
	obj.siteName = $("#addSiteCode").textbox("getText");

	
	//判断是添加还是修改
	if(addOrEdit =="add"){
		url = rootPath + '/operationTime/findCountByCenterCode.do';
		uceAjax(url, {"operationCenterCode":obj.operationCenterCode,"siteCode":obj.siteCode}, function(data) {
			if(data.data>0){
				showInfoMsg("该分拨与网点的时刻表已经维护， 请检查并修改！");
				return;
			}
			url = rootPath + '/operationTime/addOperaTime.do';
			//页面等待
		 	uceLoading.show("请稍后...");
		 	 $.ajax({
		         url: url,
		         data: obj,
		         task: function(data,statusText,xhr){
		        	 //添加成功给予提示
		        	 if(data.data ==1){
		        		 showTips("保存成功",'success');
		               	 closeDialog("dlgNewOperaTime");
		            	 //刷新数据列表
		                 $('#tblOperaTime').datagrid('reload');  
		        	 }else{
		        		 showTips("保存失败",'fail');
		        	 }
		        	//保存成功关闭遮罩层
		        	 uceLoading.close();
		         },
		         fail: function(data,statusText,xhr){
		           //失败关闭遮罩层防止影响用户操作
		           uceLoading.close();
		         }
		       });
		});
	}
	if(addOrEdit =="edit"){
		url = rootPath + '/operationTime/updateOperaTime.do?id='+id+"&version="+version;
		//页面等待
	 	uceLoading.show("请稍后...");
	 	 $.ajax({
	         url: url,
	         data: obj,
	         task: function(data,statusText,xhr){
	        	 //添加成功给予提示
	        	 if(data.data ==1){
	        		 showTips("修改成功",'success');
	               	 closeDialog("dlgNewOperaTime");
	            	 //刷新数据列表
	                 $('#tblOperaTime').datagrid('reload');  
	        	 }else{
	        		 showTips("修改失败",'fail');
	        	 }
	        	//保存成功关闭遮罩层
	        	 uceLoading.close();
	         },
	         fail: function(data,statusText,xhr){
	           //失败关闭遮罩层防止影响用户操作
	           uceLoading.close();
	         }
	       });
	}
	
}
//重置查询条件
function restOperaTime(){
	$('#formFindOperaTime').form('reset');
}
//导出分拨时刻信息
function exportOpreaTime(){
	 $('#formFindOperaTime').form('submit',{
         url: rootPath + "/operationTime/exportXls.do",
         onSubmit: function(param){
             if($(this).form('validate')) {
             	return true;
             }
             return false;
         }
     });
}
//删除时刻
function deleteOperaTime(id){
	showInfoMsg("是否确定删除该分拨时刻?",function(){
		url = rootPath + '/operationTime/deleteOperaTime.do';
		uceAjax(url, {"id":id}, function(data) {
			 //添加成功给予提示
		 if(data.data ==1){
			 showTips("删除成功",'success');
		     $('#tblOperaTime').datagrid('reload');  
		 }else{
			 showTips("删除失败",'fail');
		 }
		});
	});
}
