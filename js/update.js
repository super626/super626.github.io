var devBaseUrl = "https://100.allsee.applinzi.com/";
var pubBaseUrl = "https://allsee.applinzi.com/";
var baseUrl = devBaseUrl;
var checkUrl = baseUrl + "checkupdate";
var postshare = baseUrl + "postshare";
var reportshare = baseUrl + "reportvideo";
var getshareurl = baseUrl + "getshares";
var shareMovies = baseUrl + "shareMovie";
var shares = null;

// H5 plus事件处理
function plusReady() {
	updateSerivces();
}
if(window.plus) {
	plusReady();
} else {
	document.addEventListener('plusready', plusReady, false);
}

/**
 * 更新分享服务
 */
function updateSerivces() {
	plus.share.getServices(function(s) {
		shares = {};
		for(var i in s) {
			var t = s[i];
			shares[t.id] = t;
		}
	}, function(e) {
		outSet('获取分享服务列表失败：' + e.message);
	});
}

/**
 * 分享操作
 * @param {JSON} sb 分享操作对象s.s为分享通道对象(plus.share.ShareService)
 * @param {Boolean} bh 是否分享链接
 */
function shareAction(sb, sharecontent) {
	if(!sb || !sb.s) {
		mui.toast('无效的分享服务！');
		return;
	}
	var msg = {
		content: sharecontent.content,
		extra: {
			scene: sb.x
		}
	};
	{
		msg.href = sharecontent.href;
		msg.title = sharecontent.title;
		msg.content = sharecontent.content;
		msg.thumbs = ['_www/logo.png'];
		msg.pictures = ['_www/logo.png'];
	}
	// 发送分享
	if(sb.s.authenticated) {
		shareMessage(msg, sb.s);
	} else {
		sb.s.authorize(function() {
			shareMessage(msg, sb.s);
		}, function(e) {
			mui.toast('认证授权失败：' + e.code + ' - ' + e.message);
		});
	}
}

// 分析链接
function shareHref(sharecontent) {
	var shareBts = [];
	// 更新分享列表
	var ss = shares['weixin'];
	ss && ss.nativeClient && (shareBts.push({
			title: '微信朋友圈',
			s: ss,
			x: 'WXSceneTimeline'
		}),
		shareBts.push({
			title: '微信好友',
			s: ss,
			x: 'WXSceneSession'
		}));
	ss = shares['qq'];
	ss && ss.nativeClient && shareBts.push({
		title: 'QQ',
		s: ss
	});
	// 弹出分享列表
	shareBts.length > 0 ? plus.nativeUI.actionSheet({
		title: '分享链接',
		cancel: '取消',
		buttons: shareBts
	}, function(e) {
		(e.index > 0) && shareAction(shareBts[e.index - 1], sharecontent);
	}) : plus.nativeUI.alert('当前环境无法支持分享链接操作!');
}

/**
   * 发送分享消息
   * @param {JSON} msg
   * @param {plus.share.ShareService} s
   */
function shareMessage(msg, s){
	s.send(msg, function(){
	}, function(e){
		mui.toast('分享到"'+s.description+'"失败: '+JSON.stringify(e));
	});
}

function checkUpdate() {
	//检查更新
	// 获取本地应用资源版本号
	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		//checkUpdate(inf.version);
		var data = {
			'clientversion': inf.version,
			'uuid': plus.device.uuid,
			'os': plus.os.name
		};
		mui.getJSON(checkUrl, data, function(rsp) {
			if(rsp.status == 1) {
				localStorage.setItem('support3d', rsp.support3d == 1 ? 'true' : 'false');
				localStorage.setItem('feipingurl', rsp.feipingurl);
				localStorage.setItem('check', rsp.check == 1 ? 'true' : 'false');
				if(rsp.shouldupdate == 1) {
					downWgt(rsp.resurl);
				} else if(rsp.shouldupdate == 2) {
					if(plus.os.name == 'iOS') {
						mui.confirm(rsp.msg, "版本更新", ["确定", "取消"], function(e) {
							if(e.index == 0) {
								document.location.href = rsp.appurl;
							} else {}
						});

					} else {
						var dtask = plus.downloader.createDownload(rsp.appurl, {}, function(d, status) {
							if(status == 200) {
								plus.nativeUI.toast("发现新版本，正在准备环境，请稍后！");
								sleep(1000);
								var path = d.filename; //下载apk
								plus.runtime.install(path); // 自动安装apk文件
							} else {
								alert('版本更新失败:' + status);
							}
						});
						dtask.start();
					}
				}
			}
		});
	});

}

function downWgt(wgtUrl) {
	plus.nativeUI.showWaiting("发现更新，正在下载更新包...");
	plus.downloader.createDownload(wgtUrl, {
		filename: "_doc/update/"
	}, function(d, status) {
		if(status == 200) {
			console.log("下载wgt成功：" + d.filename);
			installWgt(d.filename); // 安装wgt包
		} else {
			console.log("下载wgt失败！");
			plus.nativeUI.alert("下载wgt失败！");
		}
		plus.nativeUI.closeWaiting();
	}).start();
}

// 更新应用资源
function installWgt(path) {
	plus.nativeUI.showWaiting("安装更新文件...");
	plus.runtime.install(path, {}, function() {
		plus.nativeUI.closeWaiting();
		console.log("安装wgt文件成功！");
		plus.nativeUI.alert("应用资源更新完成！", function() {
			plus.runtime.restart();
		});
	}, function(e) {
		plus.nativeUI.closeWaiting();
		console.log("安装更新文件失败[" + e.code + "]：" + e.message);
		plus.nativeUI.alert("安装更新文件失败[" + e.code + "]：" + e.message);
	});
}