 //页面加载后执行
/*开始*/
$(function() {
	/*carCombogrid("searchCar",{});测试功能下拉*/
	//初始化鼠标事件
	 initMouseEvent();
	 //初始化数据字典
	 initDictDatas("CAR_OPERATION_CERTIFICATE,CAR_TCI,CAR_VCI,CAR_OTHI,CAR_DRIVING_LICENCE,CAR_TRAFFIC_PERMIT,CAR_TYPE,CAR_STATUS,CAR_BELONG_TYPE,USABLE_FLAG,TRAFFIC_PERMIT_FLAG,CAR_BRAND,PLATE_NUMBER");
	 //初始化dataGrid参数
	 initDataGridParams();
	 //初始化table头部信息
	 var columns = initTbl();
	 //切换tab查询数据
	$("ul.tabs div").click(function() {
		var obj = $(this);
		//tab切换
		changeTabByClick(columns,obj);
	})
	//条件查询URL
	url=rootPath + "/carManager/findByCondition.do";
	//初始化页面table
	initTableData("dgCar1",columns);
	$('.editcls').linkbutton({text:'编辑',plain:true,iconCls:'icon-edit'});  
	//限制日期控件范围'upBeginTime', 'upEndTime'
	dateRange("upBeginTime", "upEndTime");
	dateRange("insuranceBeginTime", "insuranceEndTime");
	//加载数据字典数据
	uceDictCombobox('carType','CAR_TYPE');
	uceDictCombobox('carStatus','CAR_STATUS'); 
	uceDictCombobox('carBelongType','CAR_BELONG_TYPE'); 
    // 计算车厢容积
    $("input",$("#addCarLength,#addCarWidth,#addCarHeight").next("span")).blur(function(){    
    	countVol();
	})  
	toUpperCaseValue('addGpsNumber','addDrivingLicenseNumber','addOperationNumber','addEngineNumber','addCarNumberAfter',
			'checkEngineNumber','checkGpsNumber','checkDrivingLicenseNumber','checkOperationNumber','checkPlateNumber');
    // 车辆所属下拉列表
    var carrierColumns = [[
                        {field:'companyFullName',title: '车辆所属' ,align:'center',width: 80}, 
                        {field:'contactsMobile',title: '联系人手机号',align:'center',width: 100}
                    ]];
    // 查询条件车辆所属下拉列表
    var queryCarrierColumns = [[
                           {field:'carOwner',title: '车辆所属' ,align:'center',width: 80}
                           ]];
    /*var date = currentDate();
    var yesdate = yesterdayDate();
	$("#upBeginTime").datebox("setValue",yesdate);
	$("#upEndTime").datebox("setValue",date);*/
    //设置input输入长度
    setTextBoxLength();
//    timeLimit("upBeginTime", "upEndTime",1);
});
/*初始化结束	 */ 

function initFileId(){
	operationCertificateFile = '';
	tciFile = '';
	trafficPermitFile= '';
	vciFile = '';
	otherInsuranceFile = '';
	drivingLicenseFile = '';
}
/*根据条件查询车辆*/
function findCarData() {
	 // 判断时间是否为空
	 var insuranceBeginTime = $("#insuranceBeginTime").datebox("getValue");
	 var insuranceEndTime = $("#insuranceEndTime").datebox("getValue");
	 var upBeginTime = $("#upBeginTime").datebox("getValue");
	 var upEndTime = $("#upEndTime").datebox("getValue");
	 if ($("#formFindCar").form('validate')) {
		//保险时间需要为时间段
		if(insuranceBeginTime != null && insuranceBeginTime != ''){
			 if(insuranceEndTime == null || insuranceEndTime == ''){
				 $.messager.alert("提示", "请选择保险到期终止日期", "info");
				 return false;
			 } 
		 }
		 if(insuranceEndTime != null && insuranceEndTime != ''){
			 if(insuranceBeginTime == null || insuranceBeginTime == ''){
				 $.messager.alert("提示", "请选择保险到期开始日期", "info");
				 return false;
			 } 
		 } 
		 if(upBeginTime != null && upBeginTime != ''){
			 if(upEndTime == null || upEndTime == ''){
				 $.messager.alert("提示", "请选择上线终止日期", "info");
				 return false;
			 } 
		 }
		 if(upEndTime != null && upEndTime != ''){
			 if(upBeginTime == null || upBeginTime == ''){
				 $.messager.alert("提示", "请选择上线开始日期", "info");
				 return false;
			 } 
		 } 
		 changeFind();
	}
}
function changeFind(){
	var tabId  = getTabCarDgId();
	var formData = serializeFormObj("formFindCar");
	if(tabId == "dgCar1"){
		var options =$('#'+tabId).datagrid('options');
		options.url= rootPath + "/carManager/findByCondition.do";
		$('#'+tabId).datagrid('load',formData);
	}
	if(tabId == "dgCar2"){
		var options =$('#'+tabId).datagrid('options');
		options.url= rootPath + "/carManager/findByInsurance.do";
		formData.queryType  = "1";
		$('#'+tabId).datagrid('load',formData);
	}
	if(tabId == "dgCar3"){
		var options =$('#'+tabId).datagrid('options');
		options.url= rootPath + "/carManager/findByInsurance.do";
		formData.queryType  = "2";
		$('#'+tabId).datagrid('load',formData);
	}
	
}
//查看车辆信息
function viewCar(id){
	uceAjax('findById.do', {id : id}, function(data) {
		var row = data.data;
		checkId = row.id;
		if (row){
			operationCertificateFile = row.operationCertificateFile;
			tciFile = row.tciFile;
			trafficPermitFile= row.trafficPermitFile;
			vciFile = row.vciFile;
			otherInsuranceFile = row.otherInsuranceFile;
			drivingLicenseFile = row.drivingLicenseFile;
			openDialog("dlgCheckCar", '详情');
			loadCobAndDic("check");
			$('#formCheckCar').form('clear');
			//格式化时间
			row.onlineTime = fmatTime(row.onlineTime);
			row.tciEndTime = fmatTime(row.tciEndTime);
			row.vciEndTime = fmatTime(row.vciEndTime);
			row.ciEndTime = fmatTime(row.ciEndTime);
			row.updateTime = fmatTime(row.updateTime);
			row.capacityStartTime = fmatTime(row.capacityStartTime);
			row.capacityEndTime = fmatTime(row.capacityEndTime);
			if(row.carStatus != null && row.carStatus != ''){
				 if(row.carStatus == "1"){
					 $("#blockReasonTd").hide();
				 } else {
					 $("#blockReasonTd").show();
				 }
			}
			$('#formCheckCar').form('load',row);
       }
	});
}
//打开新增车辆对话框     	
function openAddCar(){
	idValue=null;
	status = 'add';
	editId = '';
	initFileId();
	dateLimit();
	openDialog("dlgNewCar", '新增车辆');
	//手机号校验
 	validatePhone($('#addCarOwnerMoble'));
    $('#formCar').form('clear');
    loadCobAndDic("add");
    $("#addCarBelongType").combobox("setValue","1");
    $("#addUsableFlag").combobox("setValue","1");
    $("#restNewCar").show();
    url = rootPath + '/carManager/addCars.do';
}
/*设置新增修改时间限制*/
function dateLimit(){
	dateMin("addTciEndTime");
	dateMin("addVciEndTime");
	dateMin("addCiEndTime");
	dateMin("addTranUsableEnd");
	dateMin("addTranUsableEnd");
	dateMin("addTranUsableBegin");
	dateRange("addTranUsableBegin", "addTranUsableEnd");
}
/**
 * 打开修改车辆对话框 
 */
var editId = '';
function openUpdateCar(id,v){
	status = 'edit';
	idValue=id;
	editId = id;
	version = v;
	dateLimit();
	uceAjax('findById.do', {id : id}, function(data) {
		var row = data.data;
        if (row){
        	$('#formCar').form('clear');
        	operationCertificateFile = row.operationCertificateFile;
			tciFile = row.tciFile;
			trafficPermitFile= row.trafficPermitFile;
			vciFile = row.vciFile;
			otherInsuranceFile = row.otherInsuranceFile;
			drivingLicenseFile = row.drivingLicenseFile;
        	openDialog("dlgNewCar", '编辑车辆');
        	loadCobAndDic("add");
        	//将车牌号截取为两部分
        	var carNumber = row.plateNumbers;
        	if(carNumber != null && carNumber != ''){
        		var firstChar = carNumber.substring(0,1);
        		var afterChar = carNumber.substring(1);
        		$("#addFrontNumber").combobox('setValue',firstChar);
        		$("#addCarNumberAfter").textbox('setValue',afterChar);
        	}
        	//格式化long型时间
        	row.onlineTime = fmatTime(row.onlineTime);
			row.tciEndTime = fmatTime(row.tciEndTime);
			row.vciEndTime = fmatTime(row.vciEndTime);
			row.ciEndTime = fmatTime(row.ciEndTime);
			row.updateTime = fmatTime(row.updateTime);
			row.capacityStartTime = fmatTime(row.capacityStartTime);
			row.capacityEndTime = fmatTime(row.capacityEndTime);
            $('#formCar').form('load',row);
            url = rootPath + '/carManager/updateCar.do';
        }
	});
}
      	
/**
 * 保存车辆
 */
function saveCar(){
	//图片保存后面添加===============================！
	//form校验
	if(!$('#formCar').form('validate')) return;
	
	//确认新增还是修改
	var url = '';
	if(status == 'edit'){
		url = rootPath + '/carManager/updateCar.do?id='+editId+"&version="+version;
	}
	if(status == 'add'){
		url = rootPath + '/carManager/addCar.do';
	}
	var card = $('#addFrontNumber').combobox('getText');
	var carBelongCarrier = $('#addCarBelongCarrier').combobox('getText');
	$("#addPlateNumbers").val(card + $.trim($("#addCarNumberAfter").textbox('getValue').toUpperCase()));
	var formData = serializeFormObj('formCar');
	if(getFileId("CAR_OPERATION_CERTIFICATE")){
		operationCertificateFile = getFileId("CAR_OPERATION_CERTIFICATE");
	}
	if(getFileId("CAR_TCI")){
		tciFile = getFileId("CAR_TCI");
	}
	if(getFileId("CAR_TRAFFIC_PERMIT")){
		trafficPermitFile = getFileId("CAR_TRAFFIC_PERMIT");
	}
	if(getFileId("CAR_VCI")){
		vciFile = getFileId("CAR_VCI");
	}
	if(getFileId("CAR_OTHI")){
		otherInsuranceFile = getFileId("CAR_OTHI");
	}
	if(getFileId("CAR_DRIVING_LICENCE")){
		drivingLicenseFile = getFileId("CAR_DRIVING_LICENCE");
	}
	formData.operationCertificateFile = operationCertificateFile;
	formData.tciFile = tciFile;
	formData.trafficPermitFile= trafficPermitFile;
	formData.vciFile = vciFile;
	formData.otherInsuranceFile = otherInsuranceFile;
	formData.drivingLicenseFile = drivingLicenseFile;
	formData.carBelongCarrier = carBelongCarrier;
	//页面等待
 	uceLoading.show("请稍后...");
 	 $.ajax({
         url: url,
         data: formData,
         task: function(data,statusText,xhr){
        	 //添加成功给予提示
        	 if(data.data ==1){
        		 showTips("保存成功",'success');
               	 closeDialog("dlgNewCar");
               	 clearPicIds();
            	 //刷新数据列表
                 $('#'+getTabCarDgId()).datagrid('reload'); 
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
}

/*重置新增和修改*/
function restNewCar(){
	$('#formCar').form('clear');
	$("#addCarBelongType").combobox("setValue","1");
    $("#addUsableFlag").combobox("setValue","1");
    $("#addFrontNumber").combobox("setValue","1");
    cancelDateRange('addTranUsableBegin','addTranUsableEnd')
    dateMin("addTranUsableEnd");
	dateMin("addTranUsableBegin");
    //重置清空图片
	clearPicIds();
	initFileId();
}
/*重置查询*/
function restFindCar(){
	cancelDateRange('upBeginTime','upEndTime')
	cancelDateRange('insuranceBeginTime','insuranceEndTime')
	$('#formFindCar').form('reset');
}
//导出车辆
 function exportCar(){
	 /*var carDgId = getTabCarDgId();
		var exportRows = $('#' + carDgId).datagrid('getRows');
		if(!exportRows || exportRows.length <= 0){
			showInfoMsg("没有查询到数据，无法导出！");
			return;
		}*/
	 
	 var queryType=$(".list-tabs-selected").attr("value");;
	 $('#formFindCar').form('submit',{
            url: rootPath + "/carManager/exportXls.do",
            onSubmit: function(param){
            	param.queryType=queryType;
                if($(this).form('validate')) {
                	return true;
                }
                return false;
            }
        });
 }
 function closeCarDlg(){
	 closeDialog('dlgNewCar');
	 clearPicIds();
 }
//启用/停用
 function stopCar(id,status,plateNumber,version,carOwnerType,carOwner){
	 if(status==1){//判断是否可以停用
		 url = rootPath + '/carManager/findPlanByPlateNumber.do';
		 uceAjax(url, {"plateNumber":plateNumber}, function(data){
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
					 showInfoMsg("车辆正在使用,不能停用!");
					 return;
				 }else{
					 updateStatus(id,status,version);
				 }
			 }
		 });
	 }else{
		 updateStatus(id,status,version,carOwnerType,carOwner);
	 }
 }
 function updateStatus(id,status,version,carOwnerType,carOwner){
	var carDgId = getTabCarDgId();
	if(status==1){
		status = 0;
	}else{
		status = 1;
	}
	var flag = getTypeNameByCode("CAR_STATUS",status);
	confirmMsg("是否确定"+flag+"该车辆?",function(){
		//启用如果是承运商车辆需要查询承运商是否停用
		 if(carOwnerType=="3"){
			 url = rootPath + '/carrierManage/findByCompanyFullName.do';
			 uceAjax(url, {"companyFullName":carOwner}, function(data){
				 var result = data.data;
				 if(result){
					 var f = false;
					 for(var i=0; i<data.data.length; i++){
						 if(result[i] && result[i].status==0){
							 f = true;
							 break;
						 }
					 }
					 if(f){
						 showInfoMsg("该车辆所属承运商为停用状态，该车辆不能启用！");
						 return;
					 }else{
						 url = rootPath + '/carManager/updateCar.do';
							uceAjax(url, {"id":id,"carStatus":status,"version":version}, function(data){
								if(data.data==1){
									showTips(flag+"成功",'success');
									//刷新数据列表
					                 $('#'+carDgId).datagrid('reload');  
					                 return;
								}
							});
					 }
				 }
			 });
		 }else{
			 url = rootPath + '/carManager/updateCar.do';
				uceAjax(url, {"id":id,"carStatus":status,"version":version}, function(data){
					if(data.data==1){
						showTips(flag+"成功",'success');
						//刷新数据列表
		                 $('#'+carDgId).datagrid('reload');  
					}
				});
		 }
		
	});
 }
	