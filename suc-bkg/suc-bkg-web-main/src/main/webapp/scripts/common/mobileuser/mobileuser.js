
	$(function(){
		/* 加载主界面grid */
		var columns = [[
		                {field : 'id',title : '操作',align : 'center',formatter : function(value, rec, index) {
		                	return '<a class="icon-line iconfont uce-edit" title="编辑" onclick="updateMobilUser(\''+index+'\')" href="javascript:void(0)"></a>';
		                }},
		                {field : 'mobilephone',title : '手机号',align : 'center',formatter : formatTip},
		                {field : 'orgName',title : '所属机构名称',align : 'center',width : 100,formatter : formatTip},
		                {field : 'userName',title : '姓名',align : 'center',width : 100,formatter : formatTip},
		                {field : 'certifiFlag',title : '认证标示',align : 'center', formatter: formEnabledFlag},
		                {field : 'idCard',title : '身份证号',align : 'center',formatter : formatTip},
		                {field : 'userType',title : '用户类型',align : 'center',formatter:function(value){
		  		          return getTypeNameByCode("APP_TYPE", value,formatTip);
		    	        }},
		                {field : 'createEmp',title : '创建人',align : 'center',formatter : formatTip},
		                {field : 'createTime',title : '创建时间',align : 'center',formatter : formatTime},
		                {field : 'updateEmp',title : '修改人',align : 'center',formatter : formatTip},
		                {field : 'updateTime',title : '修改时间',align : 'center',formatter : formatTime}
		                ]];

		var dataGridParams = {
			url : '',
			pageSize : 10,
			toolbar : '#tlbMobiluserBtn',
			singleSelect : 'true',
	  		fitColumns : 'false',
	  		rownumbers:'true',
			onBeforeLoad : function(param) {
			},
			onLoadSuccess : function(data) {
			},
			onLoadError : function() {
				// 在载入远程数据产生错误的时候触发。
			}
		};
		/* 加载表单数据 */
		newloadGrid('tblAppMobiluser', columns, dataGridParams);
		/* 数据字典加载 */
		initDictDatas("APP_TYPE,IS_CARPOOL");
		uceDictCombobox('fmuserType', 'APP_TYPE');
		uceDictCombobox('userType', 'APP_TYPE');
		uceDictCombobox('fmcertifiFlag', 'IS_CARPOOL',{headerValue:false});
		/* 加载组织下拉表单数据 */
		orgCombogrid('fmbaseOrgCode', {
			orgTypes : [ORG_TYPE_SITE,ORG_TYPE_OPERATE_CENTER],
			orgStatus : [ORG_ENABLED],
		});
		orgCombogrid('baseOrgCode', {
			orgTypes : [ORG_TYPE_SITE,ORG_TYPE_OPERATE_CENTER],
			orgStatus : [ORG_ENABLED],
		});
		
		$("#fmmobilephone").textbox({
			validType:"remote['"+rootPath+"/mobileuser/checkExistsByMobileAndUserType.do',checkExistsByMobileAndUserType]"
		});
		$("#fmuserType").combobox({
			onChange:function(){
				$("#fmmobilephone").textbox("validate");
			}
		});
	});

	/**
	 * 用作唯一校验
	 */
	function checkExistsByMobileAndUserType(){
		var id=$("#id").val();
		var mobilePhone=$("#fmmobilephone").textbox("getText");
		var userType=$("#fmuserType").combobox("getValue");
		var obj={
				id:id,
				mobilephone:mobilePhone
		}
		if(userType=="dot"){
			obj.dotType=1;
		}else if(userType=="dpt")
			obj.dptType=1;
		return obj;
		
	}
	/* 查询 */
	function findMobiluser(){
		 var datagrid = $('#tblAppMobiluser').datagrid('options');
		 datagrid.url = rootPath + "/mobileuser/findByPagination.do";
		$("#tblAppMobiluser").datagrid("load", serializeFormObj("formdivMobiluser"));	
	}
	var url="";
	/**新增弹框*/
	function openMobiluser(){
		openDialog("dlgMobiluser", '新增');
		$("#formMobiluse").form('clear');
		url=rootPath + "/mobileuser/addMobileuser.do";
	}
	/**
	 * 保存
	 */
	function saveMobiluser(){
		$('#formMobiluse').form('submit',{
			   url: url,
			   onSubmit: function(){
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
					   closeDialog("dlgMobiluser");
					   $('#tblAppMobiluser').datagrid('reload');   
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
	/**
	 * 更新
	 */
	function updateMobilUser(index){
		var row = $('#tblAppMobiluser').datagrid('getRows')[index];
		if(row){
			openDialog("dlgMobiluser", '修改');
			$("#formMobiluse").form('clear');
			url=rootPath + "/mobileuser/updateMobileuser.do";
			$('#fmbaseOrgCode').combogrid('grid').datagrid('reload', {
				'q' : row.endStationCode
			});
			$("#formMobiluse").form('load', row);	
		
		}else{
			showInfoMsg("请选中明细数据!");
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
//		                if (param[2]) {
//		                    data[param[2].param] = param[2].value();
//		                }
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
		            message : "用户已存在"
		        }
		});

	