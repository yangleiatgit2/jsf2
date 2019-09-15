

$(function() {
	//查询界面空间
	/* 加载主界面grid */
	var columns = [ 
	              [ {"title":"车型","colspan":4}
	              ],  
	          	
	              [ {"field":"fourDotTwoExpected","title":"4.2","rowspan":1},  
	                {"field":"fourDotTwoActual","title":"6.8","rowspan":1},  
	                {"field":"fourDotTwoGap","title":"7.6","rowspan":1},  
	                {"field":"sixDotFiveExpected","title":"9.6","rowspan":1}
	              ], 
	            ];

	
	var dataGridParams = {
		url : '',
		pageSize : 10,
		toolbar : '#toolbarCapacityGapManagement',
		singleSelect : 'false',
		fitColumns : 'false',  
		frozenColumns:[[ 
		{ title: '订单组合编号', field: 'orderCombinCode', width: 150}  , 
		{ title: '日期', field: 'timeSection', width: 160, formatter : function(value, rec, index) {
			return '<a id="det" onclick="openCapacityGapByDay(\'' + index + '\')"  style="text-decoration:underline;color:blue;"  href="javascript:void(0)">'+value+'</a>';
		}}  ,
		{ title: '需求类型', field: 'resource', width: 100 , formatter:function(value){
			return getTypeNameByCode("DEMAND_TYPE", value,formatTip);
		}}  , 
		{ title: '业务类型', field: 'businessMode', width: 100, formatter:function(value){
			return getTypeNameByCode("BUSINESS_MODE", value,formatTip);
		}} ,
		{ title: '分拨中心', field: 'demandSite', width: 100}  
		]] ,
		onBeforeLoad : function(param) {
		},
		onLoadSuccess : function(data) {
		},
		onLoadError : function() {
			// 在载入远程数据产生错误的时候触发。
		}
	}
	/* 多表头 grid 加载表单数据 */
	newMultipleCloumnLoadGrid('tblCapacityGapManagement', columns, dataGridParams);
	
	
	
	var columnsByDay = [ 
		              [ {"title":"车型","colspan":4}
		              ],  
		          	
		              [ {"field":"fourDotTwoExpected","title":"4.2","rowspan":1},  
		                {"field":"fourDotTwoActual","title":"6.8","rowspan":1},  
		                {"field":"fourDotTwoGap","title":"7.6","rowspan":1},  
		                {"field":"sixDotFiveExpected","title":"9.6","rowspan":1}
		              ], 
		            ];

		
		var dataGridParamsByDay = {
			url : '',
			pageSize : 10,
			toolbar : '#tlbDetial',
			singleSelect : 'false',
			fitColumns : 'false',  
			frozenColumns:[[ 
			{ title: '组合编号', field: 'requiCombinCode', width: 100}  , 
			{ title: '日期', field: 'timeSection', width: 200 }  ,
			{ title: '需求类型', field: 'carType', width: 100 , formatter:function(value){
				return getTypeNameByCode("DEMAND_TYPE", value,formatTip);
			}}  , 
			{ title: '业务类型', field: 'businessMode', width: 100, formatter:function(value){
				return getTypeNameByCode("BUSINESS_MODE", value,formatTip);
			}} ,
			{ title: '分拨中心', field: 'demandSite', width: 100}  
			]] ,
			onBeforeLoad : function(param) {
			},
			onLoadSuccess : function(data) {
			},
			onLoadError : function() {
				// 在载入远程数据产生错误的时候触发。
			}
		}
		/* 多表头 grid 加载表单数据 */
		newMultipleCloumnLoadGrid('tblCapacityGapByDay', columnsByDay, dataGridParamsByDay);
		

	//初始化数据字典
	initDictDatas('DEMAND_TYPE,BUSINESS_MODE');

	/* 数据字典加载 */
	uceDictCombobox('findDemandType', 'DEMAND_TYPE');
	uceDictCombobox('findBusinessMode', 'BUSINESS_MODE');

	/* 加载组织下拉表单数据 */

	orgCombogrid('findDemandSiteCode', {
		orgTypes : ORG_TYPE_OPERATE_CENTER,
		orgStatus : ORG_ENABLED
	});
});
function openCapacityGapByDay(index){
	debugger
	var row = $('#tblCapacityGapManagement').datagrid('getRows')[index];
	console.log('openCapacityGapByday row='+row.timeSection+" demandSiteCode="+row.demandSiteCode);
	url = rootPath + "/capacityDemandRequired/openCapacityGapByDay.do?timeSection="+row.timeSection+"&demandSiteCode="+row.stationCode+"&demandSite="+row.stationName;
	
	openDialog("dlgCapacityGapByDay", '日需求详情');
	var opts=$('#tblCapacityGapByDay').datagrid('options');
	opts.url = url;
	$('#tblCapacityGapByDay').datagrid('load',null);
}

function openCapacityGapByCombineCode(index){
	debugger
	var row = $('#tblCapacityGapManagement').datagrid('getRows')[index];
	console.log('openCapacityGapByday row='+row.timeSection+" demandSiteCode="+row.demandSiteCode);
	url = rootPath + "/capacityDemandRequired/openCapacityGapByCombineCode.do?timeSection="+row.timeSection+"&demandSiteCode="+row.stationCode+"&demandSite="+row.stationName;
	
	openDialog("dlgCapacityGapByDay", '组合需求详情');
	var opts=$('#tblCapacityGapByDay').datagrid('options');
	opts.url = url;
	$('#tblCapacityGapByDay').datagrid('load',null);
}

/*根据查询条件查询*/
function findCapacityDemandRequriedManagement() {
	debugger
	if ($("#formFindCapacityGapManagement").form('validate')) {
		var datagrid = $('#tblCapacityGapManagement').datagrid('options');
		datagrid.url = rootPath + "/capacityDemandRequired/findBycondition.do";
		
		var queryParams=serializeFormObj("formFindCapacityGapManagement");
		var demandSite=$("#findDemandSiteCode").combogrid('getText');
		queryParams.demandSite=demandSite;
		//console.log(queryParams);
		$('#tblCapacityGapManagement').datagrid('load',queryParams);
		}
}

/*重置查询条件*/
function resetRequriedManagement(){
	$('#formFindCapacityGapManagement').form('reset');
}
var url;


