	// init
	Bmob.initialize("30d9f3f953f38233f702b79d1dd38713", "97083971949beac9a6341ac7748b71f4");
	
	var Record = Bmob.Object.extend("newnewtable"); //表名
	var User = Bmob.Object.extend("appuser");  //表名
	
	var record = new Record();
	
(function($, owner) {
	owner.createRecord = function(recordInfo, callback) {
		var user = JSON.parse(localStorage.recentlyLoginUser);
		recordInfo = recordInfo || {};
		recordInfo.date = recordInfo.date || '';
		recordInfo.classifyone = recordInfo.classifyone || '';
		recordInfo.classifytwo = recordInfo.classifytwo || '';
		recordInfo.attribute = recordInfo.attribute || '';
		recordInfo.remarks = recordInfo.remarks || '';

		//add record
		record.save({
			  username: user.account,
			  date: recordInfo.date,
			  classifyone: recordInfo.classifyone,
			  classifytwo: recordInfo.classifytwo,
	 		  money: recordInfo.money,
	 		  attribute: recordInfo.attribute,
	 		  remarks: recordInfo.remarks
			}, {
			  success: function(record) {
			    // 添加成功
			    //alert('记一笔成功！');
			    return callback('');
			  },
			  error: function(error) {
			    // 添加失败
			    //alert('记录失败！ error: ');
			    //alert("添加失败: " + error.code + " " + error.message);
			    return callback('记录失败!');
			  }
		});
	}
}(mui, window.app = {}));
