var CreatedOKLodop7766=null;
//====判断是否需要安装CLodop云打印服务器:====
function needCLodop(){
    try{
	var ua=navigator.userAgent;
	if (ua.match(/Windows\sPhone/i) !=null) return true;
	if (ua.match(/iPhone|iPod/i) != null) return true;
	if (ua.match(/Android/i) != null) return true;
	if (ua.match(/Edge\D?\d+/i) != null) return true;
	if (ua.match(/QQBrowser/i) != null) return false;
	var verTrident=ua.match(/Trident\D?\d+/i);
	var verIE=ua.match(/MSIE\D?\d+/i);
	var verOPR=ua.match(/OPR\D?\d+/i);
	var verFF=ua.match(/Firefox\D?\d+/i);
	var x64=ua.match(/x64/i);
	if ((verTrident==null)&&(verIE==null)&&(x64!==null)) 
		return true; else
	if ( verFF !== null) {
		verFF = verFF[0].match(/\d+/);
		if ( verFF[0] >= 42 ) return true;
	} else 
	if ( verOPR !== null) {
		verOPR = verOPR[0].match(/\d+/);
		if ( verOPR[0] >= 32 ) return true;
	} else 
	if ((verTrident==null)&&(verIE==null)) {
		var verChrome=ua.match(/Chrome\D?\d+/i);		
		if ( verChrome !== null ) {
			verChrome = verChrome[0].match(/\d+/);
			if (verChrome[0]>=42) return true;
		};
	};
        return false;
    } catch(err) {return true;};
};
//====页面引用CLodop云打印必须的JS文件：====
if (needCLodop()) {
	var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    //让本机浏览器打印：
    var oscript = document.createElement("script");
    oscript.src ="http://localhost:8000/CLodopfuncs.js?priority=1";
    head.insertBefore( oscript,head.firstChild );
    //本机浏览器的后补端口8001：
	oscript = document.createElement("script");
	oscript.src ="http://localhost:8001/CLodopfuncs.js?priority=2";
	head.insertBefore( oscript,head.firstChild );
};
//====获取LODOP对象的主过程：====
function getLodop(oOBJECT,oEMBED){
	
/**************************
  本函数根据浏览器类型决定采用哪个页面元素作为Lodop对象：
  IE系列、IE内核系列的浏览器采用oOBJECT，
  其它浏览器(Firefox系列、Chrome系列、Opera系列、Safari系列等)采用oEMBED,
  如果页面没有相关对象元素，则新建一个或使用上次那个,避免重复生成。
  64位浏览器指向64位的安装程序install_lodop64.exe。 http://update-site.uc56.com/filedown/system/XX.exe 
  //http://update-site.uc56.com/filedown/system/install_lodop64_6198.exe
**************************/
		//打印机驱动改到本项目获取
		var contextPath = "../../scripts/compoents/plugins/lodop/";
//		var contextPath="http://update-site.uc56.com/filedown/system/";
//		var contextPath="http://workspace/.metadata/.plugins/org.eclipse.wst.server.core/";s
		var curl = "CLodop_Setup_for_Win32NT.exe";
		//var curl = "http://update-site.uc56.com/filedown/system/CLodop_Setup_for_Win32NT_2062.exe";
		var url32="http://update-site.uc56.com/filedown/system/install_lodop32_6203.exe";
		var url64="http://update-site.uc56.com/filedown/system/install_lodop32_6203.exe";
		var strHtmInstall="<br><font>打印控件未安装!点击这里<a href='"+contextPath+curl+"' style='color:#FF00FF' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
        var strHtmUpdate="<br><font>打印控件需要升级!点击这里<a href='"+contextPath+curl+"' style='color:#FF00FF' target='_self'>执行升级</a>,升级后请重新进入。</font>";
        var strHtm64_Install="<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='"+contextPath+curl+"'  target='_self'>执行安装</a>,安装后请刷新页面或重新进入3。</font>";
        var strHtm64_Update="<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='"+contextPath+curl+"'  target='_self'>执行升级</a>,升级后请重新进入4。</font>";
//        var strHtmInstall="<br><font color='#FF00FF'>打印控件未安装,不能进入订单管理功能!点击这里<a href='"+contextPath+"CLodop_Setup_for_Win32NT_2062.exe'  target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
//        var strHtmUpdate="<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='"+contextPath+"CLodop_Setup_for_Win32NT_2062.exe'  target='_self'>执行升级</a>,升级后请重新进入2。</font>";
//        var strHtm64_Install="<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='"+contextPath+"CLodop_Setup_for_Win32NT_2062.exe'  target='_self'>执行安装</a>,安装后请刷新页面或重新进入3。</font>";
//        var strHtm64_Update="<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='"+contextPath+"CLodop_Setup_for_Win32NT_2062.exe'  target='_self'>执行升级</a>,升级后请重新进入4。</font>";
//        var strHtmFireFox="<br><br><font color='#FF00FF'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>";
        var strHtmChrome="<br><br><font color='#FF00FF'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>";

        var LODOP;		
     
	try{	
	     //=====判断浏览器类型:===============
	     var isIE	 = (navigator.userAgent.indexOf('MSIE')>=0) || (navigator.userAgent.indexOf('Trident')>=0);
	     var is64IE  = isIE && (navigator.userAgent.indexOf('x64')>=0);
	     //判断是否需要安装CLodop云打印服务
	     if (needCLodop()) {
            try{ 
            	LODOP=getCLodop();
        	} catch(err) {
        		console.log(err);
        	}
            if (!LODOP) {
            	com.dialog({
    	   	        title: "&nbsp;云打印服务软件下载",
    	   	        iconCls: 'icon-key',
    	   	        width: 420,
    	   	        height: 300,
    	   	        html: "#CLodop-template",
    	   	        viewModel: function (w) {
    	   	        	var url=curl;
    	   	        	w.find("#CLodop_confirm").attr("href",url);
    	   	        	w.find("#CLodop_close").click(function () { w.dialog('close'); });
    	   	        }
    	   	    });
            	return LODOP;
            } else {
            	if (CLODOP.CVERSION<"2.0.9.0") {
//             		com.dialog({
//         	   	        title: "&nbsp;云打印服务软件升级",
//         	   	        iconCls: 'icon-key',
//         	   	        width: 420,
//         	   	        height: 300,
//         	   	        html: "#CLodop-template",
//         	   	        viewModel: function (w) {
//         	   	        	var url=curl;
//         	   	        	w.find("#CLodop_confirm").attr("href",url);
//         	   	        	w.find("#CLodopStr").html("<font color='#FF00FF'> CLodop云打印服务需升级!请点击下面的[下载]按钮执行升级,升级后请刷新页面。<font>");
//         	   	        	w.find("#CLodop_close").click(function () { w.dialog('close'); });
//         	   	        }
//         	   	    });
//                 	return LODOP;
					 $.messager.alert('更新打印驱动',strHtmUpdate);
					 return;
            	};	
            	if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED);
            	if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT);	
            };
        } else{
        	var is64IE  = isIE && (navigator.userAgent.indexOf('x64')>=0);
            //=====如果页面有Lodop就直接使用，没有则新建:==========
            if (oOBJECT!=undefined || oEMBED!=undefined) {
                if (isIE) LODOP=oOBJECT; else  LODOP=oEMBED;
            } else if (CreatedOKLodop7766==null){
                LODOP=document.createElement("object");
                LODOP.setAttribute("width",0);
                LODOP.setAttribute("height",0);
                LODOP.setAttribute("style","position:absolute;left:0px;top:-100px;width:0px;height:0px;");
                if (isIE) LODOP.setAttribute("classid","clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
                else LODOP.setAttribute("type","application/x-print-lodop");
                document.documentElement.appendChild(LODOP);
                CreatedOKLodop7766=LODOP;
             } else LODOP=CreatedOKLodop7766;
            //=====Lodop插件未安装时提示下载地址:==========
            if ((LODOP==null)||(typeof(LODOP.VERSION)=="undefined")) {
            	 com.dialog({
     	   	        title: "&nbsp;打印软件下载",
     	   	        iconCls: 'icon-key',
     	   	        width: 420,
     	   	        height: 300,
     	   	        html: "#lodop-template",
     	   	        viewModel: function (w) {
     	   	        	var url=url32;
     	   	        	   if (is64IE)  url=url64;
     	   	        	   w.find("#lodop_confirm").attr("href",url);
     	   	        	   w.find("#lodop_close").click(function () { w.dialog('close'); });
     	   	        }
     	   	     });
                 return LODOP;
            };
	    };
//	    if (LODOP.VERSION<"6.2.0.3") {
//	    	com.dialog({
//	   	        title: "&nbsp;打印软件更新",
//	   	        iconCls: 'icon-key',
//	   	        width: 420,
//	   	        height: 300,
//	   	        html: "#lodop-template",
//	   	        viewModel: function (w) {
//	   	     	var url=url32;
//   	        	   if (is64IE)  url=url64;
//   	        	   w.find("#lodop_confirm").attr("href",url);
//   	        	   w.find("#lodop_close").click(function () { w.dialog('close'); });
//	   	        }
//	   	    });
//            return LODOP;
//        };
	     //=====如下空白位置适合调用统一功能(如注册码、语言选择等):====	     
	
	     LODOP.SET_LICENSES("优速物流有限公司","2FAD1F219E70EE6062DFB12FA1A320F2","優速物流有限公司","913E1A9061AA7BBAE544677CE596E448");
	     LODOP.SET_LICENSES("THIRD LICENSE","","Superior speed Logistics Co., Ltd.","E4368C3D186BADF438C952C35A078051");
	
	     //============================================================	     
	     return LODOP; 
	} catch(err) {
	     if (is64IE){	
            document.documentElement.innerHTML=""+strHtm64_Install+document.documentElement.innerHTML;
	     }else{
//	    	  var options = {
//	             title: "下载打印驱动",
//	             msg: strHtmInstall,
//	             showType: 'show',
//	             timeout: 0,
//				 style:{
//						bottom:'取消',
//					}
//
//	         };
//		     $.messager.show(options);
	    	 $.messager.alert('下载打印驱动',strHtmInstall);
	     }
	     return LODOP; 
	};
}
