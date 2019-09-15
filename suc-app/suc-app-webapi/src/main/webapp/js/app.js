/*获取当前平台*/
function getPlatfrom() {
	var platform;
	var u = navigator.userAgent, app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // android终端或者uc浏览器
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
	if (isAndroid) {platform = 'android';}
	if (isiOS) {platform = 'ios';}
	return platform;
}
/* 根据平台获取最新url地址 */
function getDownloadUrl(appType,platform) {
	var url;
	var param = {
		"appType" : appType,
		"platfrom" : platform,
		'replaceTag' : true
	}
	$.ajax({
		url : 'appVersion/versionCheck',
		type : 'POST',
		contentType : 'application/json',
		data : JSON.stringify(param),
		dataType : 'json',
		beforeSend : function() {
			console.log('请求前调用');
		},
		async: false,
		success : function(data) {
			if (data.result) {
				url = data.result.url;
			}
		}
	});
	return url;
}