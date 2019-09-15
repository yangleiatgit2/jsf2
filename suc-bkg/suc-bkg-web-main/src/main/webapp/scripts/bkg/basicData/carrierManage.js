//身份证图片ID
var contactsPhoto = "";
//信用代码附件
var creditCodePhoto="";
//第三方法人代表
var legalPersonAuthPhoto="";
//法人身份证
var legalPersonPhoto="";
//公司营业执照
var licensePhoto="";
//组织机构代码
var orgPhoto="";
//道路运输资格证
var qualificationsPhoto="";
//税务登记证
var taxPhoto="";

var isreset=false;
var buttons = $.extend([], $.fn.datebox.defaults.buttons);
buttons.splice(1, 0, {
    text: '清空',
    handler: function (target) {//target对象就是当前的inupt对象，不需要写死id
        $(target).datebox('setValue', '');
    }
});

$(function() {
	var driverCardUpload="true";
	/* 加载主界面grid */
	var columns = [ [
			{field : "id",checkbox : "true" },
			{field : 'des',title : '操作',align : 'center',width : 70,formatter : function(value, rec, index) {
					return '<a class="icon-line iconfont uce-edit"  style="display:'+(dealPermission(['carrier_edit']) ? 'none' : 'block')+',float:left" title="编辑" onclick="openUpdateCarrier(\'' + index + '\')" href="javascript:void(0)"></a>';
				}
			},
			{field : 'companySimpleName',title : '承运商编号',align : 'center',width : 150,formatter : formatTip},
			{field : 'companyFullName',title : '承运商名称',align : 'center',width : 230,formatter : formatTip},
			{field : 'carNum',title : '运行车辆数',align : 'center',width : 70,formatter : formatnull},
			{field : 'contactsName',title : '承运商联系人',align : 'center',width : 120,formatter : formatTip}, 
			{field : 'contactsMobile',title : '联系人手机',align : 'center',width : 130,formatter : formatTip	},
			{field : 'createTime',title : '签约日期',align : 'center',width : 200,formatter : function(value){return formatData(value,'createTime')}	},
			{field : 'status',title : '状态',align : 'center',width : 80,formatter : function(value){
				return getTypeNameByCode("TRANSPORT_EFFECTIVE_STATUS", value,formatTip);
			}	},			{field : 'dirverNum',title : '司机人数',align : 'center',width : 70,formatter : formatnull},
			] ];

	
	var dataGridParams = {
		url : '',
		pageSize : 10,
		toolbar : '#tlbCarrier',
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
	
	initDictDatas('CARRIER_TYPE,JOB_POSITION,ENTERPRISE_NATURE,TRANSPORT_EFFECTIVE_STATUS,DRIVER_OWNER_TYPE,CONTACTS_PHOTO,CREDIT_CODE,THIRD_REPRESENTATIVE,LEGAL_PERSON,LICENSN,ORG_PHOTO,QUALIFICATIONS_PHOTO,TAX_PHOTO');
	/* 加载表单数据 */
	newloadGrid('tblCarrier', columns, dataGridParams);
	
	dateRange("executeCreateTime", "executeUpdateTime");
	/* 数据字典加载 */
	uceDictCombobox('findStatus', 'TRANSPORT_EFFECTIVE_STATUS');
	uceDictCombobox('findCompanyNature', 'ENTERPRISE_NATURE');
	uceDictCombobox('companyNature', 'ENTERPRISE_NATURE');
	uceDictCombobox('contactsPosition', 'JOB_POSITION');
	//areaCascade(registerProvinceCode,registerCityCode,registerAreaCode);
	sucareaCascade('registerProvinceCode','registerCityCode','registerAreaCode');
	//areaCascade(actualProvinceCode,actualCityCode,actualAreaCode);
	sucareaCascade('actualProvinceCode','actualCityCode','actualAreaCode');
	//初始化时间插件的值
	var date = new Date();
 	var datastr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate());
   	$("#executeCreateTime").datebox('setValue',datastr);
   	$("#executeUpdateTime").datebox('setValue',datastr);
});
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
/**
 * 补齐两位小数点
 */
function formatDouble(val){
	if(val!=null){
		return val.toFixed(2);
	}
}
function formatnull(val){
	if(val!=null && val !=""){
		return val;
	}
	return "0";
}

/*根据查询条件查询*/
function findCarrier() {
	
	if ($("#formFindCarrier").form('validate')) {
		var startTime=$("#executeCreateTime").datebox('getValue');
		var endTime=$("#executeUpdateTime").datebox('getValue');
		if(startTime == "" || startTime == null ){
			showErrorMsg("查询开始时间不能 为空");
			return;
		}else if (endTime == "" || endTime == null){
			showErrorMsg("查询的结束时间不能为空");
			return;
		}
		 var datagrid = $('#tblCarrier').datagrid('options');
		 
		datagrid.url = rootPath + "/carrierManage/findByCondition.do";
		
		$('#tblCarrier').datagrid('load',
				serializeFormObj("formFindCarrier"));
	}
		
}
//*************************************************************************************************//
/**
 *  限制日期控件范围 datebox
 * @param startTime 开始时间控件 id
 * @param endTime 结束时间控件 id
 */
function nextMonthRange(startTime,endTime){
	debugger
	var date = new Date();
	var year = date.getFullYear();
	var month = (date.getMonth() +2) > 9?(date.getMonth()+2):"0"+(date.getMonth()+2);
	var firstDay = new Date(year,month-1,1);//获取下一个月的第一天
	var firstDayStr = year+"-"+month+"-"+firstDay.getDate();
	var lastDay = new Date(year,month,0);//获取下一个月的最后一天
	var lastDayStr = year+"-"+month+"-"+lastDay.getDate();
	$("#" + startTime).datebox({
		onSelect : function(start) {
			if ($("#" + endTime).datebox('getValue')) {
				var end = $("#" + endTime).datebox('getValue');
				// 开始时间大于结束时间
				if (start > end) {
					$("#" + endTime).datebox('setValue', "");
				} else {//开始时间小于结束
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
 *  取消时间限制 datebox
* @param startTime 开始时间控件 id
* @param endTime 结束时间控件 id
 * @param pattern
 */
function cancelDateRange(startTime, endTime,pattern){
	/*if(pattern =='yyyy-MM-dd')*/{
		/* 控制开始日期输入大小 */
		resetDateBox(startTime);
		/* 控制结束日期输入大小 */
		resetDateBox(endTime);
	/*}else if(pattern =='yyyy-MM-dd hh:mm:ss'){*/
		
	}
	
}
/**
 * 初始化datebox的时间限制
 * @param dateboxId 时间控件id 
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
//*************************************************************************************************//
//更新或者新增
function addOrUpdateTruckCost(){
	$("#contactsPhoto").val();
	$("#creditCodePhoto").val();
	$("#legalPersonAuthPhoto").val();
	$("#legalPersonPhoto").val();
	$("#licensePhoto").val();
	$("#orgPhoto").val();
	$("#qualificationsPhoto").val();
	$("#taxPhoto").val();
	if($("#myid").val()==null || $("#myid").val()==""){
		$("#createEmp").val(empName);
		$('#formLineClass').form('submit',{
			   url: rootPath + "/truckCostManage/addTruckCost.do",
			   onSubmit: function(param){
				   param.createTime=formatTime(new Date);
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
				   param.updateTime=formatTime(new Date);
				   param.updateEmp=empName;
				   param.truckManageCode=$("#truckManageCode").val();
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
function resetCarrier(){
	cancelDateRange('executeCreateTime', 'executeUpdateTime')
	$('#formFindCarrier').form('reset');
	var date = new Date();
 	var datastr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate());
 	dateRange('executeCreateTime','executeUpdateTime');
   	$("#executeCreateTime").datebox('setValue',datastr);
   	$("#executeUpdateTime").datebox('setValue',datastr);
}

var url;
//新增
function addCarrier(){
	clearPicIds();
	//身份证图片ID
	 contactsPhoto = "";
	//信用代码附件
	 creditCodePhoto="";
	//第三方法人代表
	 legalPersonAuthPhoto="";
	//法人身份证
	 legalPersonPhoto="";
	//公司营业执照
	 licensePhoto="";
	//组织机构代码
	 orgPhoto="";
	//道路运输资格证
	 qualificationsPhoto="";
	//税务登记证
	 taxPhoto="";

	
	$.ajax({
		url:rootPath + "/carrierManage/getCompanySimpleName.do",
		success:function(msg){
			if(msg!=null || msg != ""){
				openDialog("dlgCarrier", '新增');
				$("#formLineClass").form('clear');
				$("#formLineClass").form('load', {'companySimpleName':msg});
				
			}
			else{
				showErrorMsg('服务器正忙！');
			}
			
		}
		
		
	})
	
}
/*更新*/
function openUpdateCarrier(index){
	clearPicIds();
	//身份证图片ID
	 contactsPhoto = "";
	//信用代码附件
	 creditCodePhoto="";
	//第三方法人代表
	 legalPersonAuthPhoto="";
	//法人身份证
	 legalPersonPhoto="";
	//公司营业执照
	 licensePhoto="";
	//组织机构代码
	 orgPhoto="";
	//道路运输资格证
	 qualificationsPhoto="";
	//税务登记证
	 taxPhoto="";

	/* 获取当前选择行 */
	var row = $('#tblCarrier').datagrid('getRows')[index];
	if (row) {
		$.ajax({
			url:rootPath + "/carrierManage/findCarrierById.do",
			data:{'id':row.id},
			success:function(msg){
				if(msg.data.companyValidity!=null && msg.data.companyValidity!=""){
					msg.data.companyValidity= fmtDate(msg.data.companyValidity);
				}
				if(msg.data.companyBeginTime != null && msg.data.companyBeginTime != "" ){
					msg.data.companyBeginTime=fmtDate(msg.data.companyBeginTime);
					
				}
				if(msg.data.contactsPhoto!=null && msg.data.contactsPhoto!=""){
					contactsPhoto=msg.data.contactsPhoto;
				}
				if(msg.data.creditCodePhoto!=null && msg.data.creditCodePhoto!=""){
					creditCodePhoto=msg.data.creditCodePhoto;
				}
				if(msg.data.legalPersonAuthPhoto!=null && msg.data.legalPersonAuthPhoto!=""){
					legalPersonAuthPhoto=msg.data.legalPersonAuthPhoto;
				}
				if(msg.data.legalPersonPhoto!=null && msg.data.legalPersonPhoto!=""){
					legalPersonPhoto=msg.data.legalPersonPhoto;
				}
				if(msg.data.licensePhoto!=null && msg.data.licensePhoto!=""){
					licensePhoto=msg.data.licensePhoto;
				}
				if(msg.data.orgPhoto!=null && msg.data.orgPhoto!=""){
					orgPhoto=msg.data.orgPhoto;
				}
				if(msg.data.qualificationsPhoto!=null && msg.data.qualificationsPhoto!=""){
					qualificationsPhoto=msg.data.qualificationsPhoto;
				}
				if(msg.data.taxPhoto!=null && msg.data.taxPhoto!=""){
					taxPhoto=msg.data.taxPhoto;
				}
				openDialog("dlgCarrier", '修改');
				$("#formLineClass").form('clear');
				$("#formLineClass").form('load', msg.data);
				
			}
			
		});
		
	}
}

function fmtDate(obj){
    var date =  new Date(obj);
    var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
}
/*获取所有的选中行数*/

function getChecked(){
	var selections = $('#tblCarrier').datagrid('getSelections');
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
/**
 * 获取一个选择的节点
 */
function getSelectCost(){
	var selected= $('#tblCarrier').datagrid('getSelected');
	if(selected==null || selected==''){
		showTips("请勾选你需要查看的列！")
	}else{
		return selected.truckManageCode;
		
	}
	
}
//批量停用
function stopCarrier(){
	var ids= getChecked();
	//getCheckedStatus(status)
	if(getCheckedStatus("0")){
		showErrorMsg('请勿重复提交已经停用的供应商！');
		return ;
	}
	if(ids==null || ids ==""){
		showTips("请选择你需要停用的信息列！");
		return ;
	}
	//=================================================
	confirmMsg('请确定是否停用？', function(row) {
		  $.ajax({
				url:rootPath + "/carrierManage/stopDetailsStatusByIds.do",
				data:{'ids':ids},
				success:function(data){
					if(data>0){
						$('#tblCarrier').datagrid('reload');
						showTips("停用成功!");
					}else if(data==-1){
						showErrorMsg("该承运商车辆在被使用,禁止停用！");
					}else{
						showErrorMsg("停用失败！");
					}
					
				}
			});
	  })
	//=================================================
	
}
//获取选中的状态，
function getCheckedStatus(status){
	var selections = $('#tblCarrier').datagrid('getSelections');
	//var ids = new Array();
	//var ids="";
	for (var int = 0; int < selections.length; int++) {
		if(selections[int].status!=null && selections[int].status!=""){
			if(status==selections[int].status){
				
				return true;
			}
			
		}
	}
	return false;
}
//批量审核(通过IDs修改对应的状态)
function startCarrier(){
	var ids=getChecked();
	if(getCheckedStatus("1")){
		showErrorMsg('请勿重复提交已经启用的供应商！');
		return ;
	}
	if(ids==null || ids ==''){
		showTips("请勾选你需要通过启用的数据！")
	}else{
		$.ajax({
			url:rootPath + "/carrierManage/startDetailsStatusByIds.do",
			data:{'ids':ids},
			success: function(data){
			    if(data>0){
			    	$('#tblCarrier').datagrid('reload');
			    	showTips(data+"条数据启用成功!");
			    	//状态修改成功
			    }else{
			    	//状态修改失败
			    	showTips("启用失败!");
			    }
			}
			
			
		})
		
	}
	
}

function showHistoryTruckCost(){
/*	$('#tblCostHistory').datagrid({    
	    url:'datagrid_data.json',
	    data:'',});  */
	var getSelect=getSelectCost();
	   var columns= [ [
	     			{field : "id",checkbox : "true" },
	     			{field : 'des',title : '序号',align : 'center',width : 40,formatter : function(value, rec, index) {
	     					return index ;
	     				}
	     			},
	     			{field : 'truckManageCode',title : '车型管理号',align : 'center',width : 100,formatter : formatTip},
	     			{field : 'belongSiteName',title : '分拨中心',align : 'center',width : 70,formatter : formatTip},
	     			{field : 'truckCostName',title : '车型成本名称',align : 'center',width : 120,formatter : formatTip},
	     			{field : 'truckType',title : '车型类型',align : 'center',width : 100,formatter : formatDeStatus}, 
	     			{field : 'truckConcrete',title : '具体车型',align : 'center',width : 80,formatter : formatTruck	},
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
function openFile(fileType){
	var num=0;
	if(isreset==true){
		if("CONTACTS_PHOTO"==fileType){
			num++;
			openUpload('reset'+contactsPhoto,'suc','bkg','CONTACTS_PHOTO');
		}
		if("CREDIT_CODE"==fileType){
			num++;
			openUpload('reset'+creditCodePhoto,'suc','bkg','CREDIT_CODE');
		}
		if("THIRD_REPRESENTATIVE"==fileType){
			num++;
			openUpload('reset'+legalPersonAuthPhoto,'suc','bkg','THIRD_REPRESENTATIVE');
		}
		if("LEGAL_PERSON"==fileType){
			num++;
			openUpload('reset'+legalPersonPhoto,'suc','bkg','LEGAL_PERSON');
		}
		if("LICENSN"==fileType){
			num++;
			openUpload('reset'+licensePhoto,'suc','bkg','LICENSN');
		}
		if("ORG_PHOTO"==fileType){
			num++;
			openUpload('reset'+orgPhoto,'suc','bkg','ORG_PHOTO');
		}
		if("QUALIFICATIONS_PHOTO"==fileType){
			num++;
			openUpload('reset'+qualificationsPhoto,'suc','bkg','QUALIFICATIONS_PHOTO');
		}
		if("TAX_PHOTO"==fileType){
			num++;
			openUpload('reset'+taxPhoto,'suc','bkg','TAX_PHOTO');
		}
		if(num==8){
			isreset=false;	
		}
	}else{
		if("CONTACTS_PHOTO"==fileType){
			openUpload(contactsPhoto,'suc','bkg','CONTACTS_PHOTO');
		}
		if("CREDIT_CODE"==fileType){
			openUpload(creditCodePhoto,'suc','bkg','CREDIT_CODE');
		}
		if("THIRD_REPRESENTATIVE"==fileType){
			openUpload(legalPersonAuthPhoto,'suc','bkg','THIRD_REPRESENTATIVE');
		}
		if("LEGAL_PERSON"==fileType){
			openUpload(legalPersonPhoto,'suc','bkg','LEGAL_PERSON');
		}
		if("LICENSN"==fileType){
			openUpload(licensePhoto,'suc','bkg','LICENSN');
		}
		if("ORG_PHOTO"==fileType){
			openUpload(orgPhoto,'suc','bkg','ORG_PHOTO');
		}
		if("QUALIFICATIONS_PHOTO"==fileType){
			openUpload(qualificationsPhoto,'suc','bkg','QUALIFICATIONS_PHOTO');
		}
		if("TAX_PHOTO"==fileType){
			openUpload(taxPhoto,'suc','bkg','TAX_PHOTO');
		}
	}
}
function resetAddCarrier(){
	debugger
	$('#formLineClass').form('reset');
	  //$('#showImg').attr('src','');
//    arrPicId = [];
//    allTitles = [];
//    tabPicNum = {};
//	clearPicIds();
	//身份证图片ID
//	contactsPhoto = contactsPhoto;
//	//信用代码附件
//	creditCodePhoto=creditCodePhoto;
//	//第三方法人代表
//	legalPersonAuthPhoto=legalPersonAuthPhoto;
//	//法人身份证
//	legalPersonPhoto=legalPersonPhoto;
//	//公司营业执照
//	licensePhoto=licensePhoto;
//	//组织机构代码
//	orgPhoto=orgPhoto;
//	//道路运输资格证
//	qualificationsPhoto=qualificationsPhoto;
//	//税务登记证
//	taxPhoto=taxPhoto;
	isreset=true;
	
}

function validatePics(){
	debugger
	if(getFile("CONTACTS_PHOTO",contactsPhoto)){
		$("#contactsPhoto").val(getFile("CONTACTS_PHOTO",contactsPhoto));
	}else{
		showErrorMsg("联系人身份证附件不能为空");
		return false;
	}
	if(getFile("CREDIT_CODE",creditCodePhoto)){
		$("#creditCodePhoto").val(getFile("CREDIT_CODE",creditCodePhoto));
	}else{
		showErrorMsg("信用代码附件不能为空");
		return false;
	}
	if(getFile("THIRD_REPRESENTATIVE",legalPersonAuthPhoto)){
		$("#legalPersonAuthPhoto").val(getFile("THIRD_REPRESENTATIVE",legalPersonAuthPhoto));
	}else{
		showErrorMsg("第三方法人代表附件不能为空");
		return false;
	}
	if(getFile("LEGAL_PERSON",legalPersonPhoto)){
		$("#legalPersonPhoto").val(getFile("LEGAL_PERSON",legalPersonPhoto));
	}else{
		showErrorMsg("法人身份证附件不能为空");
		return false;
	}
	if(getFile("LICENSN",licensePhoto)){
		$("#licensePhoto").val(getFile("LICENSN",licensePhoto));
	}else{
		showErrorMsg("公司营业执照附件不能为空");
		return false;
	}
	if(getFile("ORG_PHOTO",orgPhoto)){
		$("#orgPhoto").val(getFile("ORG_PHOTO",orgPhoto));
	}else{
		showErrorMsg("组织机构代码附件不能为空");
		return false;
	}
	if(getFile("QUALIFICATIONS_PHOTO",qualificationsPhoto)){
		$("#qualificationsPhoto").val(getFile("QUALIFICATIONS_PHOTO",qualificationsPhoto));
	}else{
		showErrorMsg("道路运输资格证附件不能为空");
		return false;
	}
	if(getFile("TAX_PHOTO",taxPhoto)){
		$("#taxPhoto").val(getFile("TAX_PHOTO",taxPhoto));
	}else{
		showErrorMsg("税务登记证附件不能为空");
		return false;
	}
}
/*保存*/
function saveCarrier(){
	//$('#formLineClass').form('submit'
	//id不存在，说明是新增。反之是编辑
	debugger
	if($("#myid").val()==null || $("#myid").val()==''){
		//$("#createTime").val(new Date);
		$("#createEmp").val(empName);
	$('#formLineClass').form('submit',{
		   url:  rootPath + "/carrierManage/addCarrierInfo.do",
		   onSubmit: function(){
		       if($(this).form('validate')) {
		    	   debugger
		    	   return validatePics();
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
				   debugger
				   clearPicIds();
				   closeDialog("dlgCarrier");
				   $('#tblCarrier').datagrid('reload');   
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
		//$("#updateTime").val(new Date);
		$("#updateEmp").val(empName);
		$('#formLineClass').form('submit',{
			   url:  rootPath + "/carrierManage/editCarrierInfo.do",
			   onSubmit: function(){
			       if($(this).form('validate')) {
			    	   debugger
			    	   return validatePics();
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
					   debugger
					   clearPicIds();
					   closeDialog("dlgCarrier");
					   $('#tblCarrier').datagrid('reload');   
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
	//clearPicIds();
}
$.extend($.fn.validatebox.defaults.rules, {
	remote : {
	            validator : function(value, param) {
	                if (!value) {
	                    return true;
	                }
	                console.log(param);
	                var data = {};
	                data = param[1]();
//	                if (param[2]) {
//	                    data[param[2].param] = param[2].value();
//	                }
	                var res = $.ajax({
	                    url : param[0],
	                    dataType : "json",
	                    data : data,
	                    async : false,
	                    cache : false,
	                    type : "post"
	                }).responseText;
	                return res == "true";
	            },
	            message : "承运商名称已存在"
	        }
	});
