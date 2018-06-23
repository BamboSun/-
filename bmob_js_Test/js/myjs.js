	Bmob.initialize("30d9f3f953f38233f702b79d1dd38713", "97083971949beac9a6341ac7748b71f4");
		    
			var User = Bmob.Object.extend("_User"); 
		    var user = new User();
		    
		    user.set("username", "syj");
		    user.set("password", "syj");
		    user.save(null, {
		      success: function(object) {
		        alert("create user success, user id:"+object.id);
		      },
		      error: function(model, error) {
		        alert("create user fail");
		      }
		    });
		    
			var query = new Bmob.Query(User);
			// 查询所有数据
			query.find({
			  success: function(results) {
			    alert("共查询到 " + results.length + " 条记录");
			    // 循环处理查询到的数据
			    for (var i = 0; i < results.length; i++) {
			      var object = results[i];
			      alert(object.id + ' - ' + object.get('username'));
			    }
			  },
			  error: function(error) {
			    alert("查询失败: " + error.code + " " + error.message);
			  }
			});
