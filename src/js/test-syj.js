var Bmob = require('bmob.js');
var GameScore = Bmob.Object.extend("GameScore");
var query = new Bmob.Query(GameScore);
query.first({
  success: function(object) {
    // 查询成功
  },
  error: function(error) {
    alert("查询失败: " + error.code + " " + error.message);
  }
});
