	$.extend($.fn.validatebox.defaults.rules, {
	    fileSize : {
	        validator : function(value, array) {
	            var size = array[0];
	            var unit = array[1];
	            if (!size || isNaN(size) || size == 0) {
	                $.error('验证文件大小的值不能为 "' + size + '"');
	            } else if (!unit) {
	                $.error('请指定验证文件大小的单位');
	            }
	            var index = -1;
	            var unitArr = new Array("bytes", "kb", "mb", "gb", "tb", "pb", "eb", "zb", "yb");
	            for (var i = 0; i < unitArr.length; i++) {
	                if (unitArr[i] == unit.toLowerCase()) {
	                    index = i;
	                    break;
	                }
	            }
	            if (index == -1) {
	                $.error('请指定正确的验证文件大小的单位：["bytes", "kb", "mb", "gb", "tb", "pb", "eb", "zb", "yb"]');
	            }
	            // 转换为bytes公式
	            var formula = 1;
	            while (index > 0) {
	                formula = formula * 1024;
	                index--;
	            }
	            // this为页面上能看到文件名称的文本框，而非真实的file
	            // $(this).next()是file元素
	            return $(this).next().get(0).files[0]?($(this).next().get(0).files[0].size < parseFloat(size) * formula):true;
	        },
	        message : '文件大小不能超过 {0}{1}'
	    }
	});
	$(function(){
		/* 加载主界面grid */
		var columns = [[
		                {field : 'id',title : '操作',align : 'center',formatter : function(value, rec, index) {
		                	return '<a class="icon-line iconfont uce-edit" title="编辑" onclick="updateVersion(\''+index+'\')" href="javascript:void(0)"></a><a class="icon-line iconfont uce-delete" title="删除" onclick="deleteVersion(\''+index+'\')" href="javascript:void(0)"></a>';
		                }},
		                {field : 'title',title : '标题',align : 'center',formatter : formatTip},
		              /*  {field : 'contents',title : '更新内容',align : 'center',width : 250,formatter : formatTip},*/
		                {field : 'url',title : '下载地址',align : 'center',width : 150, formatter : function(value, rec, index) {
		                	return '<a  title="下载" onclick="downloadFile(\''+index+'\')" href="javascript:void(0)">'+value+'</a>';
		                }},
		                {field : 'froceFlag',title : '强制标示',align : 'center',width : 150,formatter : formatTip, formatter: formEnabledFlag},
		                {field : 'effectTime',title : '生效时间',align : 'center',formatter : formatTip,formatter : formatDate},
		                {field : 'status',title : '状态',align : 'center',formatter : formatTip},
		                {field : 'appType',title : 'app类型',align : 'center',formatter:function(value){
		  		          return getTypeNameByCode("APP_TYPE", value,formatTip);
		    	        }},
		                {field : 'platfrom',title : 'app平台',align : 'center',formatter:function(value){
		  		          return getTypeNameByCode("PLATFORM", value,formatTip);
		    	        }},
		                {field : 'updateType',title : '更新类型',align : 'center',formatter:function(value){
		  		          return getTypeNameByCode("APP_UPDATE_TYPE", value,formatTip);
		    	        }},
		                {field : 'updateScope',title : '更新范围',align : 'center',formatter : formatTip},
		                {field : 'version',title : '版本号',align : 'center',formatter : formatTip},
		                {field : 'createTime',title : '创建时间',align : 'center',formatter : formatTime},
		                {field : 'updateEmp',title : '修改人',align : 'center',formatter : formatTip},
		                {field : 'updateTime',title : '修改时间',align : 'center',formatter : formatTime}
		                ]];

		var dataGridParams = {
			url : '',
			pageSize : 10,
			toolbar : '#tlbAppVersionBtn',
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
		newloadGrid('tblAppVersion', columns, dataGridParams);
		/* 数据字典加载 */
		initDictDatas("PLATFORM,APP_TYPE,APP_UPDATE_TYPE,FROCE_FLAG");
		uceDictCombobox('platfrom', 'PLATFORM');
		uceDictCombobox('appType', 'APP_TYPE');
		uceDictCombobox('updateType', 'APP_UPDATE_TYPE');
		/**弹框*/
		uceDictCombobox('fmplatfrom', 'PLATFORM',{headerValue:false});
		uceDictCombobox('fmappType', 'APP_TYPE');
		uceDictCombobox('fmupdateType', 'APP_UPDATE_TYPE');
		uceDictCombobox('fmfroceFlag', 'FROCE_FLAG');
		
	});

	/* 查询 */
	function findAppVersion(){
		 var datagrid = $('#tblAppVersion').datagrid('options');
		 datagrid.url = rootPath + "/version/findByPagination.do";
		$("#tblAppVersion").datagrid("load", serializeFormObj("formdivAppVersion"));	
	}
	var url="";
	/**新增弹框*/
	function openAddVersion(){
		debugger
		openDialog("dlgVersione", '新增');
		$("#formAddVersion").form('clear');
		url=rootPath + "/version/addVersion.do";
		$("#fmplatfrom").combobox('setValue',"android");
		$("#url").textbox('setValue',"http://suc.uce.cn:9027/suc-app-webapi/applogin/downloadFile.do?filePath=");
		
	}
	/**
	 * app版本更新时 android 上传 app文件, 
 * 						ios 填写在appstore的下载路径
	 * 
	 * @param newVal
	 * @param oldVal
	 */
	function changePlatform(newVal,oldVal){
		if($("#fmplatfrom").combobox('getValue')=="android"){
			$("#fileboxDiv").show();
			$("#iosDownLoadDiv").hide();
		}else if($("#fmplatfrom").combobox('getValue')=="ios"){
			$("#fileboxDiv").hide();
			$("#iosDownLoadDiv").show();
		}else{
			$("#fileboxDiv").hide();
			$("#iosDownLoadDiv").hide();
		}
	}
	/**
	 * 保存
	 */
	function saveVersion(){
		$('#formAddVersion').form('submit',{
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
					   closeDialog("dlgVersione");
					   $('#tblAppVersion').datagrid('reload');   
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
	function updateVersion(index){
		var row = $('#tblAppVersion').datagrid('getRows')[index];
		if(row){
			openDialog("dlgVersione", '修改');
			$("#formAddVersion").form('clear');
			url=rootPath + "/version/updateVersion.do";
			row.effectTime=formatDate(row.effectTime);
			$("#formAddVersion").form('load', row);	
			if(row.froceFlag == false){
				$('#fmfroceFlag').combobox('setValue', '0');
			}else{
				$('#fmfroceFlag').combobox('setValue', 1);
			}
			if(row.url&&row.url.indexOf('.')>0){
				var wIndex=row.url.lastIndexOf("\\");
				var lIndex=row.url.lastIndexOf("/");
				var index = wIndex==-1?lIndex:wIndex;
				$('#uploadFile').filebox('setText',row.url.substr(index+1));
			}
		}else{
			showInfoMsg("请选中明细数据!");
		}
	}
	/**
	 * 删除
	 * @param index
	 * @returns
	 */
	function deleteVersion(index){
		var row = $('#tblAppVersion').datagrid('getRows')[index];
		if (row) {
			confirmMsg('您确定要删除选中的数据吗？', function(row) {
				$.ajax({
					url : rootPath + "/version/deleteVersion.do",
					data : {
						'id' : row.id
					},
					task : function(data, statusText, xhr) {
						reloadDatagrid('tblAppVersion');
					}
				});
			}, [ row ]);
		}
	}
	/*下载附件*/
	function downloadFile(index){
		var row = $('#tblAppVersion').datagrid('getRows')[index];
		if (row&&row.url) {
			$("#filePath").val(row.url);
			$('#formdivAppVersion').form('submit',{
				url: rootPath+"/version/downloadFile.do",
				onSubmit: function(){
				},
				success: function(result){
					if(!result.success){
						showTips("下载失败,可能文件不存在!",'error');
					}
				}
			});
		}else{
			$.messager.alert("提示", "附件为空,无法下载！", "info");
		}
	}