

$(function() {
	//查询界面空间
	//dateRange("executeBeginTime", "executeEndTime");
	var driverCardUpload="true";
	/* 加载主界面grid */
	var columns = [ [
			{field : 'des',title : '操作',align : 'center',width :70,formatter : function(value, rec, index) {
					return '<a class="icon-line iconfont uce-edit" title="编辑" onclick="openUpdateNews(\'' + index + '\')" href="javascript:void(0)"></a>';
				}
			},
			{field : 'platform',title : '移动端',align : 'center',width : 90,  formatter : function(value){
				return getTypeNameByCode("PLAT_FORM", value,formatTip);
			}},
			{field : 'newsTitle',title : '公告主题',align : 'center',width :600, formatter :formatTip},
			{field : 'createTime',title : '发布时间',align : 'center',width : 270,formatter : formatTime},
			{field : 'status',title : '发布状态',align : 'center',width : 100,formatter : function(value){
				return getTypeNameByCode("READ_TRUE", value,formatTip);
			}}, 
			{field : 'updateEmp',title : '发布人',align : 'center',width : 100,formatter : formatTip	},
			] ];
	
	

	var dataGridParams = {
		url : '',
		pageSize : 10,
		toolbar : '#tlbNewsPrompt',
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
	initDictDatas('PLAT_FORM,READ_TRUE,NOTICE_GRADE');
	dateRange("findCreateTime", "executeEndTime");
	
	/* 数据字典加载 */
	uceDictCombobox('findPlatform', 'PLAT_FORM');
	uceDictCombobox('platform', 'PLAT_FORM');
	uceDictCombobox('findReadTrue', 'READ_TRUE');
	uceDictCombobox('txtNewsGrade', 'NOTICE_GRADE');
	/* 加载表单数据 */
	newloadGrid('tblNewsPrompt', columns, dataGridParams);

	$('#platform').combobox({  	
		onChange: function(record){  
			
			//var row = $('#platform').datagrid('getSelected');
			//	alert(row);
			//alert(rec);
			var a=$("#platform").val();
			if(a==1 || a=="1"){
//				$("#newUserDiv").show();
				$('#newUser').next().show();
			}else{
				$('#newUser').next().hide();
//				$("#newUserDiv").hide();
				$("#newUser").value="";
			}
			
			
	      }  
	}); 
	
	//初始化时间插件的值
	  var date = new Date();
      var datastr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate());
      $("#findCreateTime").datebox('setValue',datastr);
      $("#executeEndTime").datebox('setValue',datastr);
      
      appUser("newUser",{});
});
/**
 * 补齐两位小数点
 */
function formatDouble(val){
	if(val!=null){
		return val.toFixed(2);
	}
}


/*根据查询条件查询*/
function findNewsPrompt() {
	//如果查询时间只有一个，不允许查询
	var startTime=$("#findCreateTime").datebox('getValue');
	var endTime =$("#executeEndTime").datebox('getValue');
	if(startTime == "" || startTime == null ){
		showErrorMsg("查询开始时间不能 为空");
		return;
	}else if (endTime == "" || endTime == null){
		showErrorMsg("查询的结束时间不能为空");
		return;
	}
		 var datagrid = $('#tblNewsPrompt').datagrid('options');
		 
		datagrid.url = rootPath + "/newsPrompt/findByWhere.do";
		
		$('#tblNewsPrompt').datagrid('load',
				serializeFormObj("formFindNewsPrompt"));
	
}
//新增保存消息
function saveNews(){
	var g = $('#newUser').combogrid('grid');	// 获取数据表格对象
	var r = g.datagrid('getSelected');
	if(r!=null && r != ''){
		if(r.dotType==true){
			$("#utf1").val('03');
		}
		if(r.dptType==true){
			$("#utf1").val('02');
		}
	}
	
	//没有id,新增
	if($("#myid").val()==null ||$("#myid").val()=="" ){
		$("#status").val("0");
	$('#formLineClass').form('submit',{
		   url: rootPath + "/newsPrompt/addNews.do",
		   onSubmit: function(param){
			   param.createTime=formatTime(new Date);
			   param.createEmp=empName;
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
				   closeDialog("dlgNewsPrompt");
				   
				   showTips("新增保存成功！");
				   setTimeout(findNewsPrompt, 50);
				} else {
					showError(result);
				}
			},
			error: function(data,statusText,xhr){
	    	   uceLoading.close();
			}
	   });
	}else{
		$('#formLineClass').form('submit',{
			   url: rootPath + "/newsPrompt/updateNews.do",
			   onSubmit: function(param){
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
					   closeDialog("dlgNewsPrompt");
					   showTips("修改保存成功！");
					   /*$('#tlbNewsPrompt').datagrid('reload');
						if ($(this).form('options').task) {
							$(this).form('options').task.call(this, result);
						}*/
					   setTimeout(findNewsPrompt, 50);
					  
					} else {
						showError(result);
					}
				},
				error: function(data,statusText,xhr){
		    	   uceLoading.close();
				}
		   });
	}
	//closeDialog("dlgNewsPrompt");
}
//新增或修改发布消息
function sendNews(){
	var g = $('#newUser').combogrid('grid');	// 获取数据表格对象
	var r = g.datagrid('getSelected');
	if(r!=null && r != ''){
		if(r!=null && r != ''){
			if(r.dotType==true){
				$("#utf1").val('03');
			}
			if(r.dptType==true){
				$("#utf1").val('02');
			}
		}
	}
	if($("#myid").val()==null ||$("#myid").val()=="" ){
		$("#status").val("1");
		$('#formLineClass').form('submit',{
			   url: rootPath + "/newsPrompt/addNews.do",
			   onSubmit: function(param){
				   param.createTime=formatTime(new Date);
				   param.updateTime=formatTime(new Date);
				   param.createEmp=empName;
				   param.updateEmp=empName;
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
					   closeDialog("dlgNewsPrompt");
					   showTips("新增发送成功！");
					  /* $('#tlbNewsPrompt').datagrid('reload');
						if ($(this).form('options').task) {
							$(this).form('options').task.call(this, result);
						}*/
					   setTimeout(findNewsPrompt, 50);
					  
					} else {
						showError(result);
					}
				},
				error: function(data,statusText,xhr){
		    	   uceLoading.close();
				}
		   });
		}else{
			if(rowStatus==1){
				showErrorMsg('请勿重复发布消息！');
				rowStatus="";
				closeDialog("dlgNewsPrompt");
				return;
			}
			$("#status").val("1");
			$('#formLineClass').form('submit',{
				   url: rootPath + "/newsPrompt/updateNews.do",
				   onSubmit: function(param){
					   param.updateTime=formatTime(new Date);
					   param.updateEmp=empName;
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
						   closeDialog("dlgNewsPrompt");
						   showTips("修改发布成功！");
						  /* $('#tlbNewsPrompt').datagrid('reload');
							if ($(this).form('options').task) {
								$(this).form('options').task.call(this, result);
							}*/
						   setTimeout(findNewsPrompt, 50);
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
function resetNewsPrompt(){
	cancelDateRange('findCreateTime','executeEndTime')
	$('#formFindNewsPrompt').form('reset');
	var date = new Date();
    var datastr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate());
    dateRange('findCreateTime','executeEndTime');
    $("#findCreateTime").datebox('setValue',datastr);
    $("#executeEndTime").datebox('setValue',datastr);
    
}
//*************************************************************************************************//
/**
 *  限制日期控件范围 datebox
 * @param startTime 开始时间控件 id
 * @param endTime 结束时间控件 id
 */
function nextMonthRange(startTime,endTime){
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
/**
 * 
 * 限制时间组件相差不能查过一个月
 * @param startTime
 * @param endTime
 */
//TODO
function monthApart(startTime,endTime){
	var startDate=	$('#'+startTime).datebox('getValue');
	var maxdate='';
	var mindate='';
	if(startDate != '' || startDate != null){
		var startYear = startDate.substring(0, 4);
		var startMonth = parseInt(startDate.substring(5, 7))+1;
		var startDay= startDate.substring(8, 10);
		if(startMonth==12){
			maxdate=(parseInt(startYear)+1).toString+'-01'+'-'+'startDay';
		}else{
			maxdate =startYear+'-'+(startMonth+1)+'-'+startDay;
		}
		
	}
	var endDate = $('#'+endTime).datebox('getValue');
	if(endDate != '' || endDate != null){
		
		var endYear = endDate.substring(0, 4);
		var endMonth = parseInt(endDate.substring(5, 7))+1;
		var endDay= endDate.substring(8, 10);
		if(endMonth==1){
			mindate=(parseInt(endYear)-1).toString+'-12'+'-'+'endDay';
		}else{
			mindate =endYear+'-'+(startMonth-1)+'-'+startDay;
		}
	}
	
	$("#" + startTime).datebox({
		onChange : function(start){
			if ($("#" + endTime).datebox('getValue')){
				
				
				var end = $("#" + endTime).datebox('getValue');
				if(start>end){
					$("#" + endTime).datebox('setValue', "");
				}else if(end>maxdate){
					$("#" + endTime).datebox('setValue', "");
				}
				$("#" + endTime).datebox().datebox('calendar').calendar({
					validator : function(value) {
						if(maxdate != ''){
							return value >= start && value<=  new Date('maxdate'.replace(/-/,"/")) ;
						}else{
							return value >= start ;
						}
						
					}
				});
			}
			
		}
	})
		$("#" + endTime).datebox({
			onChange : function(end){
			if ($("#" + startTime).datebox('getValue')){
				var start = $("#" + startTime).datebox('getValue');
				if(start>end){
					$("#" + startTime).datebox('setValue', "");
				}else if(start<mindate){
					$("#" + endTime).datebox('setValue', "");
				}
				$("#" + startTime).datebox().datebox('calendar').calendar({
					validator : function(value) {
						if(mindate != ''){
						return value <= end && value>=new Date('mindate'.replace(/-/,"/")) ;
						}else{
							return value <= end ;
						}
					}
				});
			}
			
		}
	})
	
	
}
//TODO
/*function dateRange(startTime, endTime) {
	$("#" + startTime).datebox({
		onSelect : function(start) {
			if ($("#" + endTime).datebox('getValue')) {
				// 开始时间大于结束时间
				var end = $("#" + endTime).datebox('getValue');
				if (start > end) {
					$("#" + endTime).datebox('setValue', "");
				} else {
					 控制结束日期输入大小 
					$("#" + endTime).datebox().datebox('calendar').calendar({
						validator : function(value) { //TODO
							var maxdate='';
							var startDay=formatDate(start);
							var startYear = startDay.substring(0, 4);
							var startMonth = parseInt(startDay.substring(5, 7))+1;
							var startDay= startDay.substring(8, 10);
							if(startMonth==12){
								maxdate=(parseInt(startYear)+1).toString+'-01'+'-'+startDay;
							}else{
								maxdate =startYear+'-'+(startMonth+1)+'-'+startDay;
							}
							return value >= start && value<= new Date(maxdate.replace(/-/,"/"));
						}
					});
					$("#" + endTime).datebox('setValue', end);
				}
			}else{
				 控制结束日期输入大小 
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
					 控制开始日期输入大小 
					$("#" + startTime).datebox().datebox('calendar').calendar({
						validator : function(value) {
							var mindate='';
							var endDay=formatDate(end);
							var endYear = startDay.substring(0, 4);
							var endMonth = parseInt(startDay.substring(5, 7))+1;
							var endDay= startDay.substring(8, 10);
							if(endMonth==1){
								mindate=(parseInt(endYear)-1).toString+'-12'+'-'+endDay;
							}else{
								mindate =startYear+'-'+(startMonth-1)+'-'+startDay;
							}
							return value <= end && value>= new Date(mindate.replace(/-/,"/"));;
						}
					});
					$("#" + startTime).datebox('setValue', start);
				}
			}else{
				 控制开始日期输入大小 
				$("#" + startTime).datebox().datebox('calendar').calendar({
					validator : function(value) {
						return value <= end;
					}
				});
			}
		}
	});
}*/
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
var url;
//新增
function addCost(){
	openDialog("dlgNewsPrompt", '新增');
	$('#platform').combobox('readonly',false)
	$('#newUser').combobox('readonly',false); 
	$('#txtNewsGrade').combobox('readonly',false); 
	$("#formLineClass").form('clear');
	$('#newUser').next().hide();
}
var rowStatus;
/*更新*/
function openUpdateNews(index){
	// 获取当前选择行 
	var row = $('#tblNewsPrompt').datagrid('getRows')[index];
	if (row) {
		rowStatus=row.status;
		if(rowStatus==1){
			 showErrorMsg('发布状态禁止编辑');
			 return;
		}
		/*if(row.phone!=null && row.phone!=''){
			row.platform='01';
		}*/
		openDialog("dlgNewsPrompt", '修改');
		$("#formLineClass").form('clear');
		$("#formLineClass").form('load', row);
		$('#platform').combobox('readonly',true); 
		$('#newUser').combobox('readonly',true); ; 
		$('#txtNewsGrade').combobox('readonly',true); ; 
		//url = rootPath + "/dotAbility/addCapacityManagement.do";
	}
}

/*删除*/
function deleteCost(){
	var ids=getChecked();
	
	if(ids!=null || ids!=""){
		$.ajax({
			   type: "GET",
			   url: rootPath + "/costMaintenance/deleteCostByIds.do",
			   data:{'ids':ids},
			   success: function(msg){
					  // alert(msg);
				   if(msg>0){
					   setTimeout(findCostMaintenancebywhere, 50);
					   alert("删除成功！");
				   }else{
					   alert("删除失败！");
				   }
			   }
			});
		findDotAbilitybywhere();
	}else{
		alert("请选中你需要更改的列！");
	}
	//var buyStatus="1";
	
		
}


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
