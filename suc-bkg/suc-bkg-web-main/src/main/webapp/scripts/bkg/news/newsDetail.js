

$(function() {
	//查询界面空间
	//dateRange("executeBeginTime", "executeEndTime");
	dateRange("findCreateTime", "executeEndTime");
	//var driverCardUpload="true";
	/* 加载主界面grid */
	var columns = [ [
			
			{field : 'platform',title : '发送到',align : 'center',width : 70,  formatter : function(value){
				return getTypeNameByCode("NEWS_FROM", value,formatTip);
			}},
			{field : 'newsType',title : '消息类型',align : 'center',width :100, formatter :function(value){
				return getTypeNameByCode("NEWS_TYPE", value,formatTip);
			}},
			{field : 'contents',title : '消息内容',align : 'center',width : 860,formatter : formatTip},
			{field : 'createTime',title : '接收时间',align : 'center',width : 150,formatter : formatTime}, 
			{field : 'readFlag',title : '是否读取',align : 'center',width : 60,formatter : function(value){
				return getTypeNameByCode("TRAFFIC_PERMIT_FLAG", value,formatTip);
			}},
			] ];
	
	var dataGridParams = {
		url : '',
		pageSize : 10,
		toolbar : '#tlbNewsDetail',
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
	initDictDatas('NEWS_FROM,TRAFFIC_PERMIT_FLAG,NEWS_TYPE');
	
	/* 数据字典加载 */
	uceDictCombobox('findPlatform', 'NEWS_FROM',{headerValue:false});
	uceDictCombobox('findReadTrue', 'TRAFFIC_PERMIT_FLAG');
	/* 加载表单数据 */
	newloadGrid('tblNewsDetail', columns, dataGridParams);

	//初始化时间插件的值
	 var date = new Date();
    var datastr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate());
    //$("#findCreateTime").val(datastr); 
    $("#findCreateTime").datebox('setValue',datastr);
    //$("#executeEndTime").val(datastr);
    $("#executeEndTime").datebox('setValue',datastr);
	//默认选择司机端
	$("#findPlatform").combobox('setValue','02');
});
/**
 * 补齐两位小数点
 */
function formatDouble(val){
	if(val!=null){
		return val.toFixed(2);
	}
}

//*************************************************************************************************//


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



/*根据查询条件查询*/
function findNewsDetail() {
	var startTime=$("#findCreateTime").datebox('getValue');
	var endTime=$("#executeEndTime").datebox('getValue');
	if(startTime == "" || startTime == null ){
		showErrorMsg("查询开始时间不能 为空");
		return;
	}else if (endTime == "" || endTime == null){
		showErrorMsg("查询的结束时间不能为空");
		return;
	}
		 var datagrid = $('#tblNewsDetail').datagrid('options');
		datagrid.url = rootPath + "/newsDetail/findByWhere.do";
		$('#tblNewsDetail').datagrid('load',
				serializeFormObj("formFindNewsDetail"));
}
function exportDot(){
	
	alert("导出");
}

//新增或修改发布消息

/*重置查询条件*/
function resetNewsDetail(){
	cancelDateRange('findCreateTime','executeEndTime');
	$('#formFindNewsDetail').form('reset');
	var date = new Date();
    var datastr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate());
    dateRange('findCreateTime','executeEndTime');
    $("#findCreateTime").datebox('setValue',datastr);
    $("#executeEndTime").datebox('setValue',datastr);
    $("#findPlatform").combobox('setValue','02');
    
	
}

var url;



/*获取所有的选中行数*/

function getChecked(){
	var selections = $('#tblCostMaintenance').datagrid('getSelections');
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
