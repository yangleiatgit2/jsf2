function initDriverManageTbl(){
	var columns=[[  
		      		{field:'id',title: '操作',align:'center',width: 80,formatter:function(value,row){
		      			var text;
		      			if(row.dirverStatus == "0"){
		              		text = "停用";
		      				return '<a class="iconfont  uce-edit" style="display:'+(dealPermission(['driver_edit']) ? 'none' : 'bolck')+'" title="编辑" onclick="openUpdateDriver(\''+row.id+'\''+',\''+row.version+'\')" href="javascript:return false;"></a>'+
		      				'<a class="iconfont uce-qiyong-cricle" style="display:'+(dealPermission(['driver_stop']) ? 'none' : 'bolck')+'" title="启用"  onclick="stopDriver(\''+row.id+'\''+',\''+row.dirverStatus+'\''+',\''+row.mobilePhone+'\''+',\''+row.version+'\')" href="javascript:void(0)"></a>';
		              	} else if(row.dirverStatus == "1"){
		              		text = "启用";
		      				return '<a class="iconfont uce-stop" style="display:'+(dealPermission(['driver_stop']) ? 'none' : 'bolck')+'" title="停用" onclick="stopDriver(\''+row.id+'\''+',\''+row.dirverStatus+'\''+',\''+row.mobilePhone+'\''+',\''+row.version+'\')" href="javascript:void(0)"></a>'+
		      				'<a class="iconfont uce-people" style="display:'+(dealPermission(['driver_stop']) ? 'none' : 'bolck')+'" title="生成司机" onclick="createDriver(\''+row.mobilePhone+'\''+',\''+row.id+'\''+',\''+row.version+'\')" href="javascript:void(0)"></a>';;
		              	}else if(row.dirverStatus == "3"){
		              		text = "已生成司机"
		              		return '<a class="iconfont  uce-stop" style="display:'+(dealPermission(['driver_stop']) ? 'none' : 'bolck')+'" title="停用" onclick="stopDriver(\''+row.id+'\''+',\''+row.dirverStatus+'\''+',\''+row.mobilePhone+'\''+',\''+row.version+'\')" href="javascript:void(0)"></a>';
		              	} else {
		              		text = "停用";
		      				return '<a class="iconfont  uce-edit" style="display:'+(dealPermission(['driver_edit']) ? 'none' : 'bolck')+'" title="编辑" onclick="openUpdateDriver(\''+row.id+'\''+',\''+row.version+'\')" href="javascript:return false;"></a>'+
		      				'<a class="iconfont uce-qiyong-cricle" style="display:'+(dealPermission(['driver_stop']) ? 'none' : 'bolck')+'" title="启用"  onclick="stopDriver(\''+row.id+'\''+',\''+row.dirverStatus+'\''+',\''+row.mobilePhone+'\''+',\''+row.version+'\')" href="javascript:void(0)"></a>';
		              	}
		      		}},  
		      		{field:'driverName',title: '司机姓名' ,align:'center',width: 120,formatter: function(value,row){
		      			return '<a id="det" title="' + value + '" onclick="viewDriver(\''+row.id+'\')" style="text-decoration:underline;color:blue;" href="javascript:void(0)">'+value+'</a>';
		      		}},  
		      		{field:'plateNumber',title: '车牌号',align:'center',width: 80,formatter: formatTip},
		      		{field:'carrierName',title: '司机所属', align:'center',width: 180,formatter: formatTip},
		      		{field:'usableFlag',title: '司机是否可用', align:'center',width: 180,formatter: function(value){
		      			return getTypeNameByCode("USABLE_FLAG",value,formatTip);
		      		}},
		      		{field:'mobilePhone',title: '手机号', align:'center',width: 50,formatter: formatTip} ,
		      		{field:'dirverStatus',title: '司机状态', align:'center',width: 100, formatter: function(value){
		      			return getTypeNameByCode("DRIVERR_STATUS",value,formatTip);
		      		}},
		      		{field:'drivingModel',title: '准驾车型',align:'center',width: 50,formatter: function(value){
		      			return getTypeNameByCode("DRIVING_MODEL",value,formatTip);
		      		}}
		      	    ]];
		return columns;
}
/*初始化table表数据*/
function initTableData(domId,columns){
	dataGridParams = {
			url : "",
			queryParams:null,
			pageSize : 10,
			singleSelect:'true',
			fitColumns : 'true',
			toolbar : '#tlbDriverManage',
			onLoadError : function() {
				//在载入远程数据产生错误的时候触发。
				console.error('中心时刻信息加载失败')
			}
		}
	dataGridParams.url = '';
	dataGridParams.queryParams = null;
	newloadGrid(domId,columns,dataGridParams);
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
 * 加载数据字典和机构下拉
 * @param pro
 */
function loadCobAndDic(pro){
	orgCombogrid(pro+'DriverOrg',{status: ORG_ENABLED,orgTypes:ORG_TYPE_OPERATE_CENTER});
    carCombogrid(pro+"PlateNumber",{});
    uceDictCombobox(pro+'DirverType','DRIVER_OWNER_TYPE',{headerValue:false});
    uceDictCombobox(pro+'DrivingModel','DRIVING_MODEL',{headerValue:false});
    uceDictCombobox(pro+'UsableFlag','USABLE_FLAG',{headerValue:false});
	uceDictCombobox(pro+'FrontNumber','PLATE_NUMBER',{headerValue:false,value:'京',panelHeight:"200"});
	$("#"+pro+"DirverType").combobox({"onSelect":function(val){
		if(val.typeCode=="2"){
			$("#"+pro+'CarriveId').combogrid({readonly:false});
			$("#"+pro+'CarriveId').combogrid({value:''});
			orgCombogrid(pro+'CarriveId',{status: ORG_ENABLED,orgTypes:ORG_TYPE_SITE});
		}
		if(val.typeCode=="3"){
			$("#"+pro+'CarriveId').combogrid({readonly:false});
			$("#"+pro+'CarriveId').combogrid({value:''});
			carrierCombogrid(pro+'CarriveId',{});
		}
		if(val.typeCode=="1"){
			$("#"+pro+'CarriveId').combogrid({readonly:true});
			$("#"+pro+'CarriveId').combogrid({value:'优速物流有限公司'});
		}
	}});
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