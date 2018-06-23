	
	// init
	Bmob.initialize("30d9f3f953f38233f702b79d1dd38713", "97083971949beac9a6341ac7748b71f4");
		    
	var User = Bmob.Object.extend("appuser"); 
	
		//add user
		function addUser(regInfo) {
			var user = new User();
			user.set("username", regInfo.account);
			user.set("password", regInfo.password);
			user.set("email", regInfo.email);
			user.save(null, {
				success: function(object) {
					alert("create user success, user name:" + object.get('username'));
				},
			    error: function(model, error) {
			    	alert("查询失败: " + error.code + " " + error.message);
			    }
			})
		
		}
	
	// query user
/*	function queryUser(username) {
			var query = new Bmob.Query(User);
			query.equalTo("username", username);
			// 查询第一条数据
			query.first({
	   		    success: function(object) {
			    	//alert(object.get('username'));
			  	},
			  	error: function(error) {
			    	alert("查询失败: " + error.code + " " + error.message);
			  	}
			});
		}
*/	
	// 查询所有数据
/*	function queryUsers() {
//		var query = new Bmob.Query(User);
//		query.find({
//		  success: function(results) {
//		    alert("共查询到 " + results.length + " 条记录");
//		    // 循环处理查询到的数据
//		    for (var i = 0; i < results.length; i++) {
//		      var object = results[i];
//		      alert(object.id + ' - ' + object.get('username'));
//		    }
//			return results;
//		  },
//		  error: function(error) {
//		    alert("查询失败: " + error.code + " " + error.message);
//		    return null;
//		  }
//		});
	}*/
	
/**
 * 修改 “注册/登录”基于web存储
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
//		if (loginInfo.account.length < 3) {
//			return callback('账号最短为 3 个字符');
//		}
//		if (loginInfo.password.length < 3) {
//			return callback('密码最短为 3个字符');
//		}
		
//		var users = JSON.parse(localStorage.getItem('$users') || '[]');
//		var authed = users.some(function(user) { //some() 方法用于检测数组中的元素是否满足指定条件（函数提供）
//			return loginInfo.account == user.account && loginInfo.password == user.password;
//		});
		
		var query = new Bmob.Query(User);
		query.equalTo("username", loginInfo.account);
		// 查询第一条数据
		query.first({
	   	    success: function(object) {
		    	//alert(object.username);
		    	if (object && object.get('password') == loginInfo.password) {
					return owner.createState(loginInfo.account, callback);
				} else {
					return callback('用户名或密码错误');
				}
		  	},
		  	error: function(error) {
		    	alert("查询失败: " + error.code + " " + error.message);
		  	}
		});
	};

	owner.createState = function(name, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
//		if (regInfo.account.length < 3) {
//			return callback('用户名最短需要 3 个字符');
//		}
//		if (regInfo.password.length < 3) {
//			return callback('密码最短需要 3 个字符');
//		}
		if (!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
//		var users = JSON.parse(localStorage.getItem('$users') || '[]');
//		users.push(regInfo);
//		localStorage.setItem('$users', JSON.stringify(users));
//		return callback();
		
		//判断用户名是否已存在
		var query = new Bmob.Query(User);
		query.equalTo("username", regInfo.account);
		// 查询第一条数据
		query.first({
	   	    success: function(object) {
		    	alert(object);
		    	if (object) {
					return callback('该用户名已被占用！');
				} else {
					//添加新用户到数据库
					addUser(regInfo);
					return callback('');
				}
		  	},
		  	error: function(error) {
		    	alert("查询失败: " + error.code + " " + error.message);
		  	}
		});

		//var authed = users.some(function(user) { //some() 方法用于检测数组中的元素是否满足指定条件（函数提供）
		//	return loginInfo.account == user.account;
		//});

		//return callback();
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if (!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
			var settingsText = localStorage.getItem('$settings') || "{}";
			return JSON.parse(settingsText);
		}
		/**
		 * 获取本地是否安装客户端
		 **/
	owner.isInstalled = function(id) {
		if (id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if (mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch (e) {}
		} else {
			switch (id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
}(mui, window.app = {}));