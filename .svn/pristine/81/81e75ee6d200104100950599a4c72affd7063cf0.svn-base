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
function initMouseEvent(){
	jQuery(document).on('mousedown', function(Event) {
		if (1 === Event.button)
			Event.preventDefault()
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
//获取当前时间格式 yyyy-mm-dd
function currentDate(){
	var today = new Date();
	var date = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
	return date;
}
//获取前一天时间格式 yyyy-mm-dd
function yesterdayDate(){
	var today = new Date();
	var date = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+(today.getDate()-1);
	return date;
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
/**控制编辑界面frontNumber 的下拉框高度**/
function showPanel() {
    var v = $(this).combobox('panel')[0].childElementCount;
    if (v <=10) {
        $(this).combobox('panel').height("auto");
    } else {
        $(this).combobox('panel').height(200);
    }
}
/**
 * 初始化数据列表列信息
 * @returns {Array}
 */
function initTbl(){
	var columns=[[  
	      		{field:'id',title: '操作',align:'center',width: 80,formatter:function(value,row){
	      			var text;
	      			if(row.carStatus == "0"){
	              		text = "停用";
	      				return '<a class="iconfont  uce-edit" style="display:'+(dealPermission(['car_edit']) ? 'none' : 'bolck')+'" title="编辑" onclick="openUpdateCar(\''+row.id+'\''+',\''+row.version+'\')" href="javascript:return false;"></a>'+
	      				'<a class="iconfont uce-qiyong-cricle" style="display:'+(dealPermission(['car_block']) ? 'none' : 'bolck')+'" title="启用"  onclick="stopCar(\''+row.id+'\''+',\''+row.carStatus+'\''+',\''+row.plateNumbers+'\''+',\''+row.version+'\''+',\''+row.carBelongType+'\''+',\''+row.carBelongCarrier+'\')" href="javascript:void(0)"></a>';
	              	} else if(row.carStatus == "1"){
	              		text = "启用";
	      				return '<a class="iconfont  uce-stop" style="display:'+(dealPermission(['car_block']) ? 'none' : 'bolck')+'" title="停用" onclick="stopCar(\''+row.id+'\''+',\''+row.carStatus+'\''+',\''+row.plateNumbers+'\''+',\''+row.version+'\')" href="javascript:void(0)"></a>';
	              	} else {
	              		text = "停用";
	      				return '<a class="iconfont  uce-edit" style="display:'+(dealPermission(['car_edit']) ? 'none' : 'bolck')+'" title="编辑" onclick="openUpdateCar(\''+row.id+'\''+',\''+row.version+'\')" href="javascript:return false;"></a>'+
	      				'<a class="iconfont  uce-qiyong-cricle" style="display:'+(dealPermission(['car_block']) ? 'none' : 'bolck')+'" title="启用"  onclick="stopCar(\''+row.id+'\''+',\''+row.carStatus+'\''+',\''+row.plateNumbers+'\''+',\''+row.version+'\''+',\''+row.carBelongType+'\''+',\''+row.carBelongCarrier+'\')" href="javascript:void(0)"></a>';
	              	}
	      		}},  
	      		{field:'carNumber',title: '车辆编号' ,align:'center',width: 120,formatter: formatTip},  
	      		{field:'plateNumbers',title: '车牌号',align:'center',width: 80,formatter: checkDetail},
	      		{field:'carBelongCarrier',title: '车辆所属', align:'center',width: 180,formatter: formatTip},
	      		{field:'carBelongType',title: '所属类型', align:'center',width: 180,formatter: function(value){
	      			return getTypeNameByCode("CAR_BELONG_TYPE",value,formatTip);
	      		}},
	      		{field:'carType',title: '车辆类型', align:'center',width: 50,formatter: function(value){
	      			return getTypeNameByCode("CAR_TYPE",value,formatTip);
	      		}} ,
	      		{field:'onlineTime',title: '上线日期', align:'center',width: 100, formatter: function(value){
	      			if(value != null && value != ''){
	      				value = new Date(value).format("yyyy-MM-dd");
	      				return "<a title='" + value + "'>" + value + "</a>";
	      			}
	      		}},
	      		{field:'carStatus',title: '车辆状态',align:'center',width: 50,formatter: function(value){
	      			return getTypeNameByCode("CAR_STATUS",value,formatTip);
	      		}},
	      		{field:'carOwnerMoble',title: '手机号', align:'center',width: 180,formatter: formatTip}
	      	    ]];
	return columns;
}

/**
 * 给车牌号列增加查看链接
 * @param value
 * @param row
 * @returns {String}
 */
function checkDetail(value,row){
	return '<a id="det" title="' + value + '" onclick="viewCar(\''+row.id+'\')" style="text-decoration:underline;color:blue;" href="javascript:void(0)">'+value+'</a>';
}
/**
 * 初始化dataGrid参数
 */
function initDataGridParams(){
	dataGridParams = {
			url : "",
			queryParams:null,
			pageSize : 10,
			singleSelect:'true',
			fitColumns : 'true',
			onLoadError : function() {
				//在载入远程数据产生错误的时候触发。
				console.error('车辆信息加载失败')
			}
		}
}
/**
 * 点击tab切换并加载数据列表
 * @param columns
 */
function changeTabByClick(columns,obj){
	//移除全部tab选中属性
	$("ul.tabs div").removeClass("list-tabs-selected");
	//选中当前点击tab
	obj.addClass("list-tabs-selected"); 
	//获取锚点信息确认点击了哪个tab
	var activeTab = $(obj).find("a").attr("href");
	//隐藏所有table
	$(".tab_content").hide();
	//显示点击tab对应的table
	$("#"+activeTab).show(); 
	//序列化form表单
	queryParam = serializeFormObj("formFindCar");		
	var dgCarId ="";
	if(activeTab == 'tab1'){
		dgCarId ="dgCar1";
		url = rootPath + "/carManager/findByCondition.do";
	} else if(activeTab == 'tab2'){
		dgCarId ="dgCar2";
		url= rootPath + "/carManager/findByInsurance.do?queryType=1";    		
	} else if(activeTab == 'tab3'){
		dgCarId ="dgCar3";
		url= rootPath + "/carManager/findByInsurance.do?queryType=2";
	}
	dataGridParams.url = url;
	dataGridParams.queryParams = queryParam;
	//校验form表单
	if ($("#formFindCar").form('validate')) {
		//加载datagrid类别
		newloadGrid(dgCarId,columns,dataGridParams);
	}
}
/**
 * 初始化table
 * @param domId
 * @param columns
 */
function initTableData(domId,columns){
	dataGridParams.url = '';
	dataGridParams.queryParams = null;
	newloadGrid(domId,columns,dataGridParams);
}
/**
 * 计算车厢容积
 */
function countVol(){
	var length = $("#addCarLength").textbox("getValue");
    var width = $("#addCarWidth").textbox("getValue");
    var height = $("#addCarHeight").textbox("getValue");
    if(length == "" || width == "" || height == ""){
    	$("#addCarVolume").textbox("setValue","");
    	return;
    }
    var vol = length * width * height;
   	$("#addCarVolume").textbox("setValue",vol.toFixed(2));
}
/**
 * 设置最大输入长度
 */
function setTextBoxLength(){
	$('#addCarOwnerMoble').numberbox('textbox').attr('maxlength', 11);
    $('#addCarLength').numberbox('textbox').attr('maxlength', 5);
    $('#addCarWidth').numberbox('textbox').attr('maxlength', 5);
    $('#addCarHeight').numberbox('textbox').attr('maxlength', 5);
    $('#addChassisHeight').numberbox('textbox').attr('maxlength', 5);
    $('#addCurbWeight').numberbox('textbox').attr('maxlength', 9);
    $('#addCarLoad').numberbox('textbox').attr('maxlength', 9);
}
/**
 * 将long型时间转换
 * @param time
 * @returns
 */
function fmatTime(time){
	if(time != null && time != ''){
		  time = new Date(time).format("yyyy-MM-dd");
	 }
	return time;
}
/**
 * 加载数据字典和机构下拉
 * @param pro
 */
function loadCobAndDic(pro){
	orgCombogrid(pro+'CarOrg',{status: ORG_ENABLED,orgTypes:ORG_TYPE_OPERATE_CENTER});
    orgCombogrid(pro+'ResidentPoint',{orgStatus: ORG_ENABLED,orgTypes:ORG_TYPE_SITE});
	uceDictCombobox(pro+'CarType','CAR_TYPE',{headerValue:false});
    uceDictCombobox(pro+'CarBelongType','CAR_BELONG_TYPE',{headerValue:false});
    uceDictCombobox(pro+'TrafficPermitFlag','TRAFFIC_PERMIT_FLAG',{headerValue:false});
    uceDictCombobox(pro+'CarBrand','CAR_BRAND',{headerValue:false});
    uceDictCombobox(pro+'UsableFlag','USABLE_FLAG',{headerValue:false});
	uceDictCombobox(pro+'FrontNumber','PLATE_NUMBER',{headerValue:false,value:'京',panelHeight:"200"});
	$("#"+pro+"CarBelongType").combobox({"onSelect":function(val){
		if(val.typeCode=="2"){
			$("#"+pro+'CarBelongCarrier').combogrid({readonly:false});
			$("#"+pro+'CarBelongCarrier').combogrid({value:''});
			orgCombogrid(pro+'CarBelongCarrier',{orgStatus: ORG_ENABLED,orgTypes:ORG_TYPE_SITE});
		}
		if(val.typeCode=="3"){
			$("#"+pro+'CarBelongCarrier').combogrid({readonly:false});
			$("#"+pro+'CarBelongCarrier').combogrid({value:''});
			carrierCombogrid(pro+'CarBelongCarrier',{});
		}
		if(val.typeCode=="1"){
			$("#"+pro+'CarBelongCarrier').combogrid({readonly:true});
			$("#"+pro+'CarBelongCarrier').combogrid({value:'优速物流有限公司'});
		}
	}});
}
/**
 * 获取当前标签页的datagrid的ID
 */
function getTabCarDgId(){
	var tabId = $('.tabs div.list-tabs-selected').find("a").attr("href");
	if(tabId == "tab1"){
		return "dgCar1";
	}
	if(tabId == "tab2"){
		return "dgCar2";
	}
	if(tabId == "tab3"){
		return "dgCar3";
	}
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
	            message : "车牌号已存在"
	        }
	});

//$.extend($.fn.validatebox.defaults.rules,{})