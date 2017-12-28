document.addEventListener( "plusready",  function()
{
// 声明的JS“扩展插件别名”
    var _BARCODE = 'playerplugin',
        B = window.plus.bridge;
    var playerplugin = 
{
// 声明异步返回方法
        PluginFunction : function (FuncName, Argus1, Argus2, Argus3, Argus4, successCallback, errorCallback ) 
        {
            var success = typeof successCallback !== 'function' ? null : function(args) 
            {
                successCallback(args);
            },
            fail = typeof errorCallback !== 'function' ? null : function(code) 
            {
                errorCallback(code);
            };
            callbackID = B.callbackId(success, fail);
// 通知Native层plugintest扩展插件运行”PluginTestFunction”方法
            return B.exec(_BARCODE, FuncName, [callbackID, Argus1, Argus2, Argus3, Argus4]);
        },
        PluginFunctionArrayArgu : function (FuncName, Argus, successCallback, errorCallback ) 
        {
            var success = typeof successCallback !== 'function' ? null : function(args) 
            {
                successCallback(args);
            },
            fail = typeof errorCallback !== 'function' ? null : function(code) 
            {
                errorCallback(code);
            };
            callbackID = B.callbackId(success, fail);
            return B.exec(_BARCODE, FuncName, [callbackID, Argus]);
        },      
        // 声明同步返回方法
        PluginFunctionSync : function (FuncName, Argus1, Argus2, Argus3, Argus4) 
        {            
            // 通知Native层plugintest扩展插件运行“PluginTestFunctionSync”方法并同步返回结果                       
            return B.execSync(_BARCODE, FuncName, [Argus1, Argus2, Argus3, Argus4]);
        },
        PluginFunctionSyncArrayArgu : function (FuncName, Argus) 
        {                                   
            return B.execSync(_BARCODE, FuncName, [Argus]);
        }
    };
    window.plus.playerplugin = playerplugin;
}, true );

function playVideo(url)
{
	confSupportDisplayType();
	plus.playerplugin.PluginFunctionSync("playVideo", url);
}

function confSupportDisplayType()
{
	mui.getJSON('../config.json', null, function(data) {
		
		function jsonformat(key, value) {
                return value.toString();
                }
		var types = JSON.stringify(data.player_display, jsonformat);
		types = types.replace("\"","").replace("\"","");
		var support = localStorage.getItem('support3d');
		if (support == 'true')
		    types += ",3d";
                    	plus.playerplugin.PluginFunctionSync("configDisplayTypes", types);
                });
}

function previewImg(url, successCallback, errorCallback)
{
	plus.playerplugin.PluginFunction("previewImageAsync", url, null, null, null, successCallback, errorCallback);
}
