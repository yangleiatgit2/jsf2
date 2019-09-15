//页面初始化
$(function(){
	/*driverCombogrid("testDriverName",{});*/
	 //初始化数据字典
	 initDictDatas("DRIVER_QUALIFICATION_CERTIFICATE,DRIVER_HEAD,DRIVER_DRIVING_LICENCE,DRIVER_ID_CARD,DRIVING_MODEL,USABLE_FLAG,DRIVER_OWNER_TYPE,DRIVERR_STATUS,PLATE_NUMBER");
	//加载数据字典数据
	uceDictCombobox('dirverStatus','DRIVERR_STATUS');
	//初始化table表头
	var columns = initDriverManageTbl();
	//初始化页面table
	initTableData("tblDriverManage",columns);
	//显示大写
	toUpperCaseValue('addDrivingNumber','addCertificateId','showDrivingNumber','showCertificateId');
})
//主查询方法
function findDriverManage(){
	var options =$('#tblDriverManage').datagrid('options');
	options.url= rootPath + "/driverManage/findByCondition.do";
	$('#tblDriverManage').datagrid('load',serializeFormObj("formFindDriverManage"));
}
function initFileId(){
	//司机身份证
	idCardUrl = "";
	//司机大头照
	driverPhotoUrl = "";
	//司机驾驶证
	drivingFileUrl = "";
	//司机从业资格证
	certificateFileUrl = "";
}
//打开新增司机对话框
function openAddDriver(){
	addOrEdit = 'add';
	initFileId();
	openDialog("dlgNewDriverManage", '新增司机');
	$('#formAddDriverManage').form('clear');
	loadCobAndDic("add");
	$("#addDirverType").combobox("setValue","1");
	$("#addUsableFlag").combobox("setValue","1");
	dateMin("addDrivingUsefulTime");
	dateMin("addCertificateUsefulTime");
	
}
//打开修改司机对话框
function openUpdateDriver(id,v){
	addOrEdit = 'edit';
	version = v
	this.id = id;
	uceAjax('findById.do', {id : id}, function(data) {
		var row = data.data;
        if (row){
        	idCardUrl = row.idCardUrl;
        	driverPhotoUrl = row.driverPhotoUrl;
        	drivingFileUrl = row.drivingFileUrl;
        	certificateFileUrl = row.certificateFileUrl;
        	openDialog("dlgNewDriverManage", '编辑司机');
        	$('#formAddDriverManage').form('clear');
        	dateMin("addDrivingUsefulTime");
        	dateMin("addCertificateUsefulTime");
        	loadCobAndDic("add");
        	//格式化时间
			row.drivingUsefulTime = fmatTime(row.drivingUsefulTime);
			row.certificateUsefulTime = fmatTime(row.certificateUsefulTime);
        	$('#formAddDriverManage').form('load',row);
        	$('#addDriverOrg').combogrid('grid').datagrid('reload',{q:row.driverOrg});  
        	
        }
    });
}
//打开查看司机对话框
function viewDriver(id){
	addOrEdit = 'show';
	this.id = id;
	uceAjax('findById.do', {id : id}, function(data) {
		var row = data.data;
        if (row){
        	$('#formShowDriverManage').form('clear');
        	idCardUrl = row.idCardUrl;
        	driverPhotoUrl = row.driverPhotoUrl;
        	drivingFileUrl = row.drivingFileUrl;
        	certificateFileUrl = row.certificateFileUrl;
        	openDialog("dlgShowDriverManage", '司机详情');
        	loadCobAndDic("show");
        	//格式化时间
			row.drivingUsefulTime = fmatTime(row.drivingUsefulTime);
			row.certificateUsefulTime = fmatTime(row.certificateUsefulTime);
        	$('#formShowDriverManage').form('load',row);
        	$('#showDriverOrg').combogrid('grid').datagrid('reload',{q:row.driverOrg});
        }
    });
}
//保存司机
function saveDriver(){
	//form校验
	if(!$('#formAddDriverManage').form('validate')) return;
	
	//确认新增还是修改
	var url = '';
	if(addOrEdit == 'edit'){
		url = rootPath + '/driverManage/updateDriver.do?id='+id+"&version="+version;
	}
	if(addOrEdit == 'add'){
		url = rootPath + '/driverManage/addDriver.do';
	}
	var carrierName = $('#addCarriveId').combobox('getText');
	var formData = serializeFormObj('formAddDriverManage');
	
	var checkUrl = rootPath + '/driverManage/findByDrivingNum.do';
	uceAjax(checkUrl, {"drivingNumber":formData.drivingNumber}, function(data){
		if(addOrEdit =="add" && data.data.length>0){
			showInfoMsg("司机已绑定【"+data.data[0].plateNumber+"】车辆,不能重复绑定,请更换车辆重新绑定");
			return;
		}
		if(getFileId("DRIVER_ID_CARD")){
			idCardUrl = getFileId("DRIVER_ID_CARD");
		}
		if(getFileId("DRIVER_HEAD")){
			driverPhotoUrl = getFileId("DRIVER_HEAD");
		}
		if(getFileId("DRIVER_DRIVING_LICENCE")){
			drivingFileUrl = getFileId("DRIVER_DRIVING_LICENCE");
		}
		if(getFileId("DRIVER_QUALIFICATION_CERTIFICATE")){
			certificateFileUrl = getFileId("DRIVER_QUALIFICATION_CERTIFICATE");
		}
		formData.idCardUrl = idCardUrl;
		formData.driverPhotoUrl = driverPhotoUrl;
		formData.drivingFileUrl = drivingFileUrl;
		formData.certificateFileUrl = certificateFileUrl;
		formData.carrierName = carrierName;
		//####################################################
		var plateNumber=$("#addPlateNumber").combogrid("getText");//添加车牌号
		formData.plateNumber=plateNumber;
		//####################################################
		//页面等待
	 	uceLoading.show("请稍后...");
	 	 $.ajax({
	         url: url,
	         data: formData,
	         task: function(data,statusText,xhr){
	        	 //添加成功给予提示
	        	 if(data.data ==1){
	        		//保存成功关闭遮罩层
	            	 uceLoading.close();
	        		 showTips("保存成功",'success');
	               	 closeDialog("dlgNewDriverManage");
	               	 clearPicIds();
	            	 //刷新数据列表
	                 $('#tblDriverManage').datagrid('reload');  
	        	 }else{
	        		//关闭遮罩层
	            	 uceLoading.close();
	        		 showTips("保存失败",'fail');
	        	 }
	        	
	         },
	         fail: function(data,statusText,xhr){
	           //失败关闭遮罩层防止影响用户操作
	           uceLoading.close();
	           clearPicIds();
	         }
	       });
	})
	/*$("#addPlateNumber").val(plateNumper + $.trim($("#addCarNumberAfter").textbox('getValue')));*/
	
	
}
//导出查询数据
function exportDriver(){
	$('#formFindDriverManage').form('submit',{
        url: rootPath + "/driverManage/exportXls.do",
        onSubmit: function(param){
            if($(this).form('validate')) {
            	return true;
            }
            return false;
        }
    });
}
//重置主查询
function restDriverManage(){
	$('#formFindDriverManage').form('reset');
}
//关闭新增
function closeDriverDlg(){
	closeDialog("dlgNewDriverManage");
	clearPicIds();
}
//启用/停用
function stopDriver(id,status,mobilephone,version){
	if(status==1 || status==3){
		url = rootPath + '/driverManage/findPlaneByTelphone.do';
		uceAjax(url, {"mobilephone":mobilephone}, function(data){
			 var plans = data.data;
			 var useFlag = false;
			 if(plans){
				 for(var i=0; i<plans.length; i++){
					 var planStatus = plans[i].status;
					 //02司机已确认 04执行中
					 if(planStatus =='02' || planStatus == '04'){
						 useFlag = true;
						 break;
					 }
				 }
				 if(useFlag){
					 showInfoMsg("司机正在执行运输任务,不能停用!");
					 return;
				 }else{
					 updateStatus(id,status,version);
				 }
			 }
		 });
	}else{
		updateStatus(id,status,version)
	}
	
}
function updateStatus(id,status,version){
	if(status==1 || status==3){
		status = 0;
	}else{
		status = 1;
	}
	var flag = getTypeNameByCode("DRIVERR_STATUS",status);
	showInfoMsg("是否确定"+flag+"该司机?",function(){
		updateDriverStatus(id,status,flag,version);
	});
}
//生成司机用户
function createDriver(mobilePhone,id,version){
	showInfoMsg("是否生成选中的司机用户?",function(){
		url = rootPath + '/driverManage/findCountByMobilephone.do';
		uceAjax(url, {"mobilephone":mobilePhone}, function(data){
			//查询是否已经生成
			if(data.data && data.data>0){
				updateDriverStatus(id,"3","司机生成",version);
			}else{
				url = rootPath + '/driverManage/createDriver.do';
				uceAjax(url, {"mobilephone":mobilePhone}, function(data){
					if(data.success){
						updateDriverStatus(id,"3","司机生成",version);
					}
				});
			}
		});
		
	});
}
//修改司机状态
function updateDriverStatus(id,status,msg,version){
	url = rootPath + '/driverManage/updateDriver.do';
	uceAjax(url, {"id":id,"dirverStatus":status,"version":version}, function(data){
		if(data.data==1){
			showTips(msg+"成功",'success');
			//刷新数据列表
             $('#tblDriverManage').datagrid('reload');  
		}
	});
}
//新增/修改重置
function restNewDriver(){
	$('#formAddDriverManage').form('reset');
	$("#addDirverType").combobox("setValue","1");
	$('#addCarriveId').combogrid({value:'优速物流有限公司'});
	$("#addUsableFlag").combobox("setValue","1");
	//重置清空图片
	clearPicIds();
	initFileId();
}
/**
 * 
 * @param 设置日期最小值大于当前
 */
function dateMin(domId){
	$("#"+domId).datebox('calendar').calendar({
        validator: function(date){
            var now = new Date();
            var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            return d1<=date ;
        }
    });
}