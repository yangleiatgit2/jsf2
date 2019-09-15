/**
 * 初始化table
 * @returns {Array}
 */
function initOperaTimeTbl(){
	var columns=[[  
		      		{field:'id',title: '操作',align:'center',width: 80,formatter:function(value,row){
		      			return '<a class="iconfont  uce-edit" style="display:'+(dealPermission(['opera_edit']) ? 'none' : 'bolck')+'" title="修改" onclick="openEdidOperaTime(\''+row.id+'\''+',\''+row.version+'\')" href="javascript:return false;"></a>'+
		      			'<a class="iconfont uce-delete" style="display:'+(dealPermission([ 'opera_delete' ]) ? 'none'	: 'bolck') + '" title="删除" onclick="deleteOperaTime(\''+ row.id + '\')" href="javascript:void(0)"></a>';
		      		}},  
		      		//{field:'rowNum',title: '编号' ,align:'center',width: 120,formatter: formatTip},  
		      		{field:'operationCenterName',title: '分拨中心',align:'center',width: 80,formatter: function(value,row){
		      			return '<a id="det" title="' + value + '" onclick="viewOperaTime(\''+row.id+'\')" style="text-decoration:underline;color:blue;" href="javascript:void(0)">'+value+'</a>';
		      		}},
		      		{field:'siteName',title: '网点/集货点', align:'center',width: 180,formatter: formatTip},
		      		{field:'earliestDepartureTime',title: '最早出发时间', align:'center',width: 180,formatter: function(value){
		      			return formatTableTime(value);
		      		}},
		      		{field:'latestArrivalTime',title: '最晚到达时间', align:'center',width: 50,formatter: function(value){
		      			return formatTableTime(value);
		      		}}
		      	    ]];
		return columns;
}
/**
 * 将时间转换为时分
 */
function formatTableTime(value){
	if(value != null && value != ''){
		value = new Date(value).format("hh:mm");
		return value;
	}
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
			toolbar : '#tlbOperaTime',
			onLoadError : function() {
				//在载入远程数据产生错误的时候触发。
				console.error('中心时刻信息加载失败')
			}
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
 * 查看当前分拨时刻详情
 * @param value
 * @param row
 */
function viewOperaTime(id){
	uceAjax('findById.do', {id : id}, function(data) {
		var row = data.data;
		if(row){
			$('#formShowOperaTime').form('clear');
			openDialog("dlgShowOperaTime", '时刻表查看');
			orgCombogrid('showOperationCenterCode',{status: ORG_ENABLED});
			orgCombogrid('showSiteCode',{status: ORG_ENABLED});
			row.earliestDepartureTime = new Date(row.earliestDepartureTime).format("hh:mm");
			row.latestArrivalTime = new Date(row.latestArrivalTime).format("hh:mm");
	        $('#formShowOperaTime').form('load',row);
	        $('#showOperationCenterCode').combogrid('grid').datagrid('reload',{q:row.operationCenterCode});  
	        $('#showSiteCode').combogrid('grid').datagrid('reload',{q:row.siteCode});
		}
	});
}