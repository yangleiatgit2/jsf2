
	$(function(){
		/* 加载主界面grid */
		var columns = [[
		                {field : 'id',title : '操作',align : 'center',formatter : function(value, rec, index) {
		                	return '<a class="icon-line iconfont uce-edit" title="编辑" onclick="updateMobilUser(\''+index+'\')" href="javascript:void(0)"></a>';
		                }},
		                {field : 'ruleCode',title : '消息编码',align : 'center',formatter : formatTip},
		                {field : 'title',title : '标题',align : 'center',formatter : formatTip},
		                {field : 'contents',title : '内容',align : 'center',width : 250,formatter : formatTip},
		                {field : 'platform',title : '平台',align : 'center',width : 100,formatter:function(value){
		  		          return getTypeNameByCode("PLAT_FORM_ROULE", value,formatTip);
		                }},
		                {field : 'newsType',title : '消息类型',align : 'center',width : 100,formatter:function(value){
		  		          return getTypeNameByCode("NEWS_TYPE_ROULE", value,formatTip);
		                }}
		                ]];

		var dataGridParams = {
			url : '',
			pageSize : 10,
			toolbar : '#tlbNoticeRouleBtn',
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
		newloadGrid('tblNoticeRoule', columns, dataGridParams);
		/* 数据字典加载 */
		initDictDatas("PLAT_FORM_ROULE,NEWS_TYPE_ROULE");
		uceDictCombobox('newsType', 'NEWS_TYPE_ROULE');
		uceDictCombobox('fmnewsType', 'NEWS_TYPE_ROULE');
		uceDictCombobox('fmplatform', 'PLAT_FORM_ROULE');
		//uceDictCombobox('fmcertifiFlag', 'IS_CARPOOL',{headerValue:false});
		/* 加载组织下拉表单数据 */
		orgCombogrid('fmbaseOrgCode', {
			orgTypes : [ORG_TYPE_SITE,ORG_TYPE_OPERATE_CENTER],
			orgStatus : [ORG_ENABLED],
		});
		orgCombogrid('baseOrgCode', {
			orgTypes : [ORG_TYPE_SITE,ORG_TYPE_OPERATE_CENTER],
			orgStatus : [ORG_ENABLED],
		});
		
	});

	/* 查询 */
	function findMobiluser(){
		 var datagrid = $('#tblNoticeRoule').datagrid('options');
		 datagrid.url = rootPath + "/noticeRule/findByPagination.do";
		$("#tblNoticeRoule").datagrid("load", serializeFormObj("formdivNoticeRoule"));	
	}
	var url="";
	/**新增弹框*/
	function openNoticeRoule(){
		openDialog("dlgNoticeRoule", '新增');
		$("#formNoticeRoule").form('clear');
		url=rootPath + "/noticeRule/addNoticeRule.do";
	}
	/**
	 * 保存
	 */
	function saveNoticeRoule(){
		$('#formNoticeRoule').form('submit',{
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
					   closeDialog("dlgNoticeRoule");
					   $('#tblNoticeRoule').datagrid('reload');   
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
		var row = $('#tblNoticeRoule').datagrid('getRows')[index];
		if(row){
			openDialog("dlgNoticeRoule", '修改');
			$("#formNoticeRoule").form('clear');
			url=rootPath + "/noticeRule/updateNoticeRule.do";
			
			$("#formNoticeRoule").form('load', row);	
		
		}else{
			showInfoMsg("请选中明细数据!");
		}
	}
	