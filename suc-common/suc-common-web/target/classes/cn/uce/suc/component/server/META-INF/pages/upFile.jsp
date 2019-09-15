<%@ page language="java" pageEncoding="UTF-8"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/component/jquery.rotate.min.js"></script>
<html>
<head>
<style type="text/css">
#showFile{  
    position: absolute;  
    z-index: 10000;  
    width:100%;
    height:100%;
    overflow:hidden;  
    display: none;
    background:rgba(0, 0, 0, 0.4);
}
#showPic{
    position: relative;
    text-align: center;
    margin: auto;
    width: 100%;
    height: 100%;
    overflow: auto;
}  
#btnRotation{
    position: absolute;
    z-index: 10001;  
    text-align: center;
    width:420px;
    height:83px;
    margin:auto;
    background-image: url(${pageContext.request.contextPath}/images/component/ratation.png);
    background-repeat: no-repeat;
}
#btnRotation a{
    display: block;
    width:110px;
    height:83px;
    float:left;
}
</style>
<script type="text/javascript">
//全局 主数据id
var bizId = '';
//业务类型
var bizType = {};
//所属项目
var subSys = undefined;
// 所属模块
var sysModul = undefined;
//当前选择的title
var curTitle;
//上传的文件
var file_queue = [{}];
//上传的文件以tab分组
var tabJson = {};
//全局自增变量  图片uuid唯一
var numberMax=0;
//图片显示标识
var handleFlag = undefined;
//要关闭的页面
var domId = "";
//tabs的标题
var allTitles = [];
//tabs中的图片数量
var picNum = {};
//单个tab默认只能上传5张图片
var DEFAULT_TAB_PIC_NUM = 5;
//tab页图片数量
var tabPicNum = {};
//限制可上传的图片格式
var accPicType = "jpg,bmp,jpeg,gif,png";
//图片ID
var picIds = '';
//图片ID集合
var arrPicId = [];
//删除图片标识
var numberCount=0;
//图片打开后的初始大小
var initPicWidth = 0;
var initPicHeight = 0;
//图片旋转角度
var angle = 0
//图片放大倍数
var big = 1;
//图片拖动标识
var drag = 0;
//图片移动标识
var move = 0;
//json方式存入不同类型的图片ID
var allPicId = [];
var typeFlag = -1;
var repeatNum = [];
$(function(){
	//附件上传限制(此限制只是限制选择时页面初始定义,如果用户选择所有文件则扔和接受)
    $('#files').filebox({  
        required : true,   
        multiple : true,  
        validType : ['fileSize[5,"MB"]','fileNum[5]'],  
        buttonText : '请选择',  
        buttonAlign : 'right',  
        prompt : '请选择一个文件',  
        accept : [ 'image/jpg', 'image/bmp', 'image/jpeg', 'image/gif', 'image/png' ]
    });
});
//要绑定图片的数据ID,所属项目 ,所属模块
function openUpload(ids,sub,modul,dicType){
	debugger
	if(!dicType || !sub || !modul){
		showInfoMsg("请确保数据有效！");
	    return false;
	 }
	//tabs页,上传所属的文件名
	setTab2(dicType,ids);
/* 	if(!ids){
		picIds='';
		arrPicId = [];
	} */
		//页面第一次打开某个查看框
		if(!repeatNum[dicType]){
			repeatNum[dicType] = true;
			if(ids){
				picIds = ids;
				var arrs = splitStr(picIds);
				for(var i=0; i<arrs.length; i++){
					if(arrs[i]){
						arrPicId.push(arrs[i]);
					}
				}
				//tabJson[DictDatas[dicType][0].typeName] = arrPicId.length;
			}else{
				picIds = '';
				arrPicId = [];
			}
		}else{//再次打开某个图片查看框
				picIds = allPicId[allTitles[0]];
				arrPicId = [];
				if(picIds){
					//图片ID集合
					var arrs = splitStr(picIds);
					for(var i=0; i<arrs.length; i++){
						if(arrs[i]){
							arrPicId.push(arrs[i]);
						}
					}
					//tabJson[DictDatas[dicType][0].typeName] = arrPicId.length;
				}
		}	
	
	typeFlag = dicType;
	numberCount=0;
	handleFlag = undefined;
	subSys= sub;
	sysModul= modul;
	$("#fromNameId").show();
	openDialog("file_panel","附件上传查看");
	$("#fileClose").show();
	$("#filebox").show();
	//$(".easyui-window .panel-tool").html("");
	$(".easyui-window .panel-tool").hide();
	debugger
	if(allTitles[0]){
	 $('#'+allTitles[0]+' ul').html('');
	    $('#file_tab').tabs('select',allTitles[0]);
	}
}
//打开查看
function openShowFile(ids,sub,modul,dicType){
	if(!dicType || !sub || !modul){
		showInfoMsg("请确保数据有效！");
	    return false;
	}
	//tabs页,上传所属的文件名
	setTab(dicType);
	if(ids){
		picIds = ids;
		var arrs = splitStr(picIds);
		for(var i=0; i<arrs.length; i++){
			if(arrs[i]){
				arrPicId.push(arrs[i]);
			}
		}
	}else{
		arrPicId = [];
	}
	subSys= sub;
	sysModul= modul;
	$('#file_tab').tabs('select',allTitles[0]);
	//查看 将filebox隐藏  将删除按钮隐藏
	$("#fromNameId").hide();
	handleFlag="look";
	openDialog("file_panel","附件查看");
	$("#fileClose").show();
	$("#filebox").show();
	//$(".easyui-window .panel-tool").html("");
	$(".easyui-window .panel-tool").hide();
	if(allTitles[0]){
	 $('#'+allTitles[0]+' ul').html('');
	    $('#file_tab').tabs('select',allTitles[0]);
	}
}
//设置默认tab图片数量
function setDefaultTabNum(num){
	DEFAULT_TAB_PIC_NUM = num;
}
//设置某个tab页图片数量
function setTabNum(title,num){
	tabPicNum[title] = num;
}
//设置tab页
function setTab2(type,ids){
	debugger
	clearFilebox();
	//默认选择第一个tab
/* 	     $('#file_tab').tabs({
	            border:false,
	            onSelect:function(title){
	                clearFilebox();
	                curTitle = title;
	                showFile2(ids);
	            }
	}); */
     if(DictDatas != null && DictDatas != undefined && DictDatas[type].length != 0){
    	 var titles = DictDatas[type];
         for(var i=0; i<titles.length; i++){
             allTitles.push(titles[i].typeName);
             bizType[titles[i].typeName] = titles[i].id;
             //单个tab默认5张图片
             tabPicNum[titles[i].typeName] = DEFAULT_TAB_PIC_NUM;
             tabJson[titles[i].typeName] = 0;
             addTab(titles[i].typeName);
             
         }
     }
     
}

//设置tab页
function setTab(type){
	debugger
	clearFilebox();
	//默认选择第一个tab
	     $('#file_tab').tabs({
	            border:false,
	            onSelect:function(title){
	                clearFilebox();
	                curTitle = title;
	                showFile();
	            }
	});
     if(DictDatas != null && DictDatas != undefined && DictDatas[type].length != 0){
    	 var titles = DictDatas[type];
         for(var i=0; i<titles.length; i++){
             allTitles.push(titles[i].typeName);
             bizType[titles[i].typeName] = titles[i].id;
             //单个tab默认5张图片
             tabPicNum[titles[i].typeName] = DEFAULT_TAB_PIC_NUM;
             tabJson[titles[i].typeName] = 0;
             addTab(titles[i].typeName);
             
         }
     }
     
}
//添加tab标签
function addTab(title){
	 if ($('#file_tab').tabs('exists', title)){
	      $('#file_tab').tabs('select', title);
	  } else {
	      var content =  '<div style="padding:10px" id="'+title+'"><ul></ul></div>';
	      $('#file_tab').tabs('add',{
	          id:title,
	          title:title,
	          content:content,
	          closable:false,
	          selected:false,
	      });
	  }
}
// 删除文件
function deleteFile(file_id, file_uuid){
	var div = $('#' + file_uuid);
    div.remove();
    arrPicId.removeByValue(file_id);
    $.messager.alert('提示：','文件删除成功');
    tabJson[curTitle]--;
    clearFilebox();
};
//上传多个图片以文件格式
function uplodad(title){
    var url = rootPath +'/fileUp/batchFile.do?bizType='+allTitles[0]+"&bizId="+bizType[title]+"&subSys="+subSys+"&sysModul="+sysModul;
    $('#fromNameId').form('submit', {  
        url : url,  
        dataType : 'json', 
        success : function(data) {  
        	//将返回的字符串转换为json对象
        	var data = JSON.parse(data);
        	 var _html = "";
             var tab = $('.easyui-tabs').tabs('getSelected');
             for(var i = 0; i < data.data.length; i++){
                 var mydate = new Date();
                 var uuid = "insert"+numberMax; 
                 numberMax++;
                 var id= data.data[i];
                 arrPicId.push(id);
                 var html = '<a class="icon-line iconfont uce-delete" title="删除" onclick="deleteFile(\''+id+'\',\''+uuid
                         +'\')" href="javascript:void(0)" style="float:left;margin:0px 0px 0;"></a>';
                 
                 _html += "<li id='"+uuid+"'><img onclick='expandPhoto();' src='${pageContext.request.contextPath}/fileUp/showFile.do?fileId="+id
                         +"' style='width:120px;height:120px;float:left;margin-bottom:5px;margin-left:5px;'>"+html+"</img></li>";
                 tabJson[title]++;
               
             }
             tab.find('ul').append(_html);
        }  
    });  
};
//去重
Array.prototype.unique3 = function(){
	 var res = [];
	 var json = {};
	 for(var i = 0; i < this.length; i++){
	  if(!json[this[i]]){
	   res.push(this[i]);
	   json[this[i]] = 1;
	  }
	 }
	 return res;
	}
//移除指定元素
Array.prototype.removeByValue = function(val) {
	  for(var i=0; i<this.length; i++) {
	    if(this[i] == val) {
	      this.splice(i, 1);
	      break;
	    }
	  }
	}
//按逗号拆分字符串
function splitStr(str){
	if(str){
		str = str.trim();
		var arr = new Array();
		arr = str.split(",");
		return arr;
	}
}
//获取文件类型
function getFileType(name){
    //查找最后一个\的位置
    var pos=name.lastIndexOf(".");
  //截取最后一个.位置到字符长度，也就是截取文件名 
    return name.substring(pos+1); 
}
//选择图片开始上传图片
function changeFile(){
	//文件框中的图片
	var files = $('#fromNameId span')[0].children.files.files;
	//用于存放选择的图片中不允许的格式
	var notAccPicType = "";
	//查询是否上传了不支持的文件格式
	if(files.length>0){
		for(var i=0; i<files.length; i++){
	        var picName = files[i].name;
	        var picSize = files[i].size;
	        //图片名字过长给予提示
	        
	        if(picName != null && picName.length>500){
	        	showInfoMsg(picName+"图片名字总长度超过最大限制50!");
	        	clearFilebox();
	        	return false;
            }
	        //图片大于5M不在上传
	        if(picSize > 5*1024*1024){
	        	clearFilebox();
	        	return false;
	        }
	        var picType = getFileType(picName).toLowerCase() ;
	        var arr = splitStr(accPicType);
	        var flag = false;
	        for(var j=0; j<arr.length; j++){
	        	if(picType ==  arr[j]){
	        		flag = false;
	        		break;
	        	}
	        	flag = true;
	        }
	        if(flag){
	        	notAccPicType += picType+",";
	        }
	    }
	}
	//有不支持的文件给予提示
	if(notAccPicType != ""){
		showInfoMsg("文件上传不支持"+notAccPicType+"格式的文件!");
		clearFilebox();
		return false;
	}
	//附件框无值,或附件数量大于5张默认提示
	if(files.length<=0 || files.length>5){
		clearFilebox();
		return false;
	}
	var value = $(this).filebox('getValue');
	//当前选择的tab的标题
	var selTitle = $('.easyui-tabs').tabs('getSelected').panel('options').title;
	//限制每个tab的图片数量
	if(tabJson[curTitle]+files.length>tabPicNum[curTitle]){
		showInfoMsg("限制数量"+tabPicNum[curTitle]+"张,上传图片超出限制!");
		clearFilebox();
		return false;
	}
	//上传所有选择的图片
	uplodad(selTitle);
	clearFilebox();
}
//预览显示图片
function showFile(){
	debugger
	 $('#'+curTitle+' ul').html('');
	 if(!picIds){
		 return
	 }
	 var ids = splitStr(picIds);
	 var num = 0;
	 for(var i=0; i<ids.length; i++){
		 if(ids[i]){
			 showPicFile(ids[i]);
			 num++;
		 }
	 }
	 tabJson[curTitle] = num;
}
//预览显示图片
function showFile2(ids){
	debugger
	var pos=ids.indexOf("reset");
	ids= ids.substring(pos+5); 
	if(ids){
		$('#'+curTitle+' ul').html('');
		 if(!picIds){
			 return
		 }
		 var ids = splitStr(picIds);
		 var num = 0;
		 for(var i=0; i<ids.length; i++){
			 if(ids[i]){
				 showPicFile(ids[i]);
				 num++;
			 }
		 }
		 tabJson[curTitle] = num;
	}
}
//查看预览图片
function showPicFile(picId){
	debugger
	$.ajax({ 
	 //   url: rootPath +'/fileUp/selectFileInfo.do?bizType='+allTitles[0]+"&bizId="+bizType[allTitles[0]]
	 //+"&fileId="+picId+"&subSys="+subSys+"&sysModul="+sysModul+"&max="+tabPicNum[curTitle],
	    url: rootPath +'/fileUp/selectFileInfo.do?fileId='+picId+"&max="+tabPicNum[curTitle],
					type : 'post',
					dataType : 'json',
					success : function(data) {
					    if(data.data.total<=0){
                            return;
                        }
						var _html = "";
						var tab = $('.easyui-tabs').tabs('getSelected');
						if(tab){
							tab.find('ul').append("");
						}
						//tabJson[curTitle] = data.data.rows.length;
						for (var i = 0; i < data.data.rows.length; i++) {
							var mydate = new Date();
							var uuid = "delete"+numberCount;
							numberCount++;
							var id = data.data.rows[i].fileId;
							var html="";
							if(handleFlag==undefined){
								html = '<a class="icon-line iconfont uce-delete" title="删除" onclick="deleteFile(\''
										+ id
										+ '\',\''
										+ uuid
										+ '\')" href="javascript:void(0)" style="float:left;margin:0px 0px 0;"></a>';
							}		
							if(handleFlag!=undefined){
								html = '<a class="icon-line iconfont" title="    " hidden="true" onclick="deletePreFile(\''
										+ id
										+ '\',\''
										+ uuid
										+ '\')" href="javascript:void(0)" style="float:left;margin:0px 0px 0;"></a>';
							}		
							
							_html += "<li id='"+uuid+"'><img onclick='expandPhoto();' src='${pageContext.request.contextPath}/fileUp/showFile.do?fileId="
									+ id
									+ "' style='width:120px;height:120px;float:left;margin-bottom:5px;margin-left:5px;'>"
									+ html + "</img></li>";
						}
						if(tab){
							tab.find('ul').append(_html);
						}
					}
			});
}
// 获取图片URL s'w
function getObjectUrl(file) {
	var url = null;
	if (window.createObjectUrl != undefined) {
		url = window.createObjectURL(file);
	} else if (window.URL != undefined) {
		url = URL.createObjectURL(file);
	} else if (window.webkitURL != undefined) {
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}

//点击图片放大查看图片
function expandPhoto(){  
    var image = new Image();  
    var src = event.srcElement.src; 
    image.src = src 
    //图片原始宽度
    var imgWidth=image.width;
    //图片原始高度
    var imgHeight=image.height;
    //屏幕宽度
    var width = $("#showFile").width();
    //屏幕高度
    var height = $("#showFile").height();
    $('#showImg').attr('src',src);
    //以屏幕高等比例缩放图片
    initPicWidth = height;
    initPicHeight = imgHeight*height/imgWidth;
    $('#showImg').attr('width',initPicWidth);
    $('#showImg').attr('height',initPicHeight);
    countPicPos();
    //设置按钮偏移量
    $("#btnRotation").css("left",width/2-210+"px");
    $("#btnRotation").css("top","85%");
    $('#showFile').show();
   
}
//动态计算图片坐标
function countPicPos(){
	var width = $("#showFile").width();
	var height = $("#showFile").height();
	var imgWidth = $("#showImg").width();
	var imgHeight = $("#showImg").height();
	var x = (width - imgWidth)/2;
	var y = (height - imgHeight)/2;
	$("#showImg").css("left",x+"px");
	$("#showImg").css("top",y+"px");
}
//点击图片切换为缩略图
function restore(){  
    $('#showFile').hide();
    big = 1;
    angle = 0;
    $('#showImg').rotate({ animateTo:angle});
}

function rotationImg(){
    angle +=90;
    $('#showImg').rotate({ animateTo:angle});
}

function bigImg(){
	//图片每次放大10%
	big += 0.1;
	if(big >= 2){
		big = 2;
		return;
	}
	var iwidth = $("#showImg").width();
	var iheight = $("#showImg").height();
	$('#showImg').attr('width',iwidth*big+"px");
    $('#showImg').attr('height',iheight*big+"px");
   //放大图片后同时以当前坐标修改偏移量
    var x = parseInt(showImg.style.left) - iwidth*(big - 1)/2;
    var y = parseInt(showImg.style.top) - iheight*(big - 1)/2;
    $("#showImg").css("left",x+"px");
    $("#showImg").css("top",y+"px");
}
//图片还原
function resetImg(){
	big = 1;
	while(angle%360!=0){
		angle += 90;
	}
    $('#showImg').rotate({ animateTo:angle});
	$('#showImg').attr('width',initPicWidth);
    $('#showImg').attr('height',initPicHeight);
    countPicPos();
}
//鼠标按下
function mouseDown(){
    if(drag){
    	//记录鼠标按下时坐标,即拖动图片时的便宜量
    	X = window.event.x  - parseInt(showImg.style.left);
    	Y = window.event.y  - parseInt(showImg.style.top);
        showImg.style.Index += 1;
        move = 1;
    }
}
//鼠标事件停止监听
function mouseStop(){
    window.event.returnValue = false;
}
//鼠标移动
function mouseMove(){
    if (move){
    	$("#showImg").css("left",window.event.x-X+"px");
    	$("#showImg").css("top",window.event.y-Y+"px");
    }
}
//鼠标弹起
function mouseUp(){
    move = 0;
}
//关闭附件框
function closeWindow(){
	debugger
	for(var i=0; i<allTitles.length; i++){
		$("#file_tab").tabs("close",allTitles[i]);
	}
	picIds = '';
	arrPicId = arrPicId.unique3()
	for(var i=0; i<arrPicId.length; i++){
		picIds += arrPicId[i]+",";
	}
	if(allTitles[0]){
		allPicId[allTitles[0]] = picIds;
	}
	
	$('#showFile').hide();
	$("#file_panel").dialog('close');
	if(domId!=""){
		$("#"+domId).dialog("close");
	}
	clearData();
}
function getFileId(dicType){
	debugger
	var pic='';
	if(DictDatas != null && DictDatas != undefined && DictDatas[dicType].length != 0){
		var title = DictDatas[dicType][0].typeName;
		if(!repeatNum[dicType]){
			//用户没有点开过附件上传
			//return false;
		}else{
			if(allPicId[title]){
				pic=allPicId[title];
				//return allPicId[title];
			}else{
				//
				//return "";
			}
		}
		if(pic==''){
			return false;
		}else{
			return pic;
		}
	}else{
		console.log("数据字典初始化失败");
	}
}
function getFile(dicType,module){
	debugger
	var pic='';
	if(DictDatas != null && DictDatas != undefined && DictDatas[dicType].length != 0){
		var title = DictDatas[dicType][0].typeName;
		if((!repeatNum[dicType])&& module){
			//用户没有点开过附件上传
			return module;
		}else{
			if(allPicId[title]){
				pic=allPicId[title];
				//return allPicId[title];
			}else{
				//
				//return "";
			}
		}
		if(pic==''){
			return false;
		}else{
			return pic;
		}
	}else{
		console.log("数据字典初始化失败");
	}
}
//清除文本框内容
function clearFilebox(){
	$("#files").filebox('clear');
}
//关闭业务层弹框
function closeBizDialog(id){
	if(id){
		domId = id;
	}
}
function setAccPicType(type){
	if(type){
		accPicType = type;
	}
}


function clearPicIds(){
	debugger
	allPicId = [];
	picIds = '';
	allTitles = [];
	repeatNum = [];
}
//清空全局变量数据防止污染
function clearData(){
    //业务id
    bizId = '';
    //业务 类型
    bizType = {};
    //所属项目
    subSys = undefined;
    // 所属模块
    sysModul = undefined;
    //当前选择的title
    curTitle = "";
    //上传的文件
    file_queue = [{}];
    //上传的文件以tab分组
    tabJson = {};
    //全局自增变量  图片uuid唯一
    numberMax=0;
    //图片显示标识
    handleFlag = undefined;
    //要关闭的页面
    domId = "";
    //tabs的标题
    allTitles = [];
    //单个tab默认只能上传5张图片
    DEFAULT_TAB_PIC_NUM = 5;
    //tab页图片数量
    tabPicNum = {};
    
  //图片打开后的初始大小
    initPicWidth = 0;
    initPicHeight = 0;
    //图片旋转角度
    angle = 0
    //图片放大倍数
    big = 1;
    //图片拖动标识
    drag = 0;
    //图片移动标识
    move = 0;
    arrPicId = [];
}
</script>
</head>
<body>
    <!-- 图片上传 -->
   <div id="file_panel" class="easyui-dialog" buttons="#fileClose" closable="false" closed="true" title="文件管理" style="width:786px;height:500px;padding:10px;">
       <div class="easyui-layout" data-options="">
           <form id="fromNameId" method="post" enctype="multipart/form-data">
               <div id="filebox"><input class="easyui-filebox" id="files" name="files" style="width:200px" data-options="onChange:changeFile,width:250,required:true"/></div>
           </form>
           <div class="easyui-tabs" style="width:780px;height:300px" id="file_tab">
            </div>
        </div>
        <div id="fileClose" >
           <a href="javascript:void(0)" class="easyui-linkbutton cancel"  onclick="closeWindow()">关闭</a>
        </div>
        
    </div>
    <!-- 图片查看 -->
	<div id="showFile" onmouseout="drag=0;"  onmouseover="drag=1;" onmousemove="mouseMove();" onmouseup="mouseUp();" onmouseleave="move=0" onmousedown="mouseDown();" ondragstart="mouseStop();"   class="overlayimg">
       <div id="showPic" onclick="restore()">
            <img id='showImg'   src="" style="left:10px;position:absolute;top:10px;" alt="图片" />
       </div>
       <div id='btnRotation'>
            <a style="margin-left: 35px;"onclick="bigImg();" ></a>
            <a style="margin-left: 10px;" onclick="rotationImg();" ></a>
            <a style="margin-left: 10px;" onclick="resetImg();" ></a>
       </div>
   </div>  
   <script type="text/javascript">
   	$("#fileClose").hide();
	$("#filebox").hide();
   </script>  
</body>
</html>