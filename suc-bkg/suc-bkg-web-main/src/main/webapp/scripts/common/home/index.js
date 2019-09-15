
$(function() {
	showalert();
	window.setInterval(showalert, 60000); 
})

function showalert() { 
	
	$.ajax({
		url:rootPath + "/newsDetail/findPcIndex.do",
		data:{'newsType':'02','currentPage':1,'pageSize':1},
		success:function(data){
			if(data.rows.length < 1){
				$("#contents").val('');
				$("#newsId").val('');
				$("#newsRadio").hide();
				$("#shadow").hide();
				return;
			}
			if(data!= null && data != ''){
				if(data.total>99){
					document.getElementById('totalVal').innerText='99+';	
				}
				document.getElementById('totalVal').innerText=data.total;
				$("#contents").val(data.rows[0].contents);
				$("#newsId").val(data.rows[0].id);
				$("#newsRadio").show();
				$("#shadow").show();
				return;
			}
		} ,error: function(XMLHttpRequest, textStatus, errorThrown) {            
        }
	})
} 
//管理消息提示弹框
function newsClose(){
	$("#newsRadio").hide();
	$("#shadow").hide();
	
}
//查询消息的详情
function  newsDetail(){
	//openDialog("dlgNewsDetail",'查看详情');
	var id = $("#newsId").val();
	if(id != null && id != ''){
		$.ajax({
			url:rootPath + "/newsDetail/getNewsDetail.do",
			data:{'id':id},
			success:function(data){
				if(data != null){
					openDialog("dlgNewsDetail",'消息详情');
					$("#formLineClass").form('clear');
					$("#formLineClass").form('load', {'newsTitle':data.data.title});
					$("#formLineClass").form('load', {'contents':data.data.contents});
					showalert();
				}
				
			}
			
		})
	}
}
function nextNews(){
	var id = $("#newsId").val();
	if(id==null || ''==id){
		showErrorMsg('消息已经到底了！');
		return;
	}
	newsDetail();
}