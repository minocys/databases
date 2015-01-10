var db = require('../db');




module.exports = {
  messages: {
    get: function (callback) {
      var queryStr = 'select messages.id, messages.text \
                      left outer join users on (messages.userid = users.id) \
                      left outer join rooms on (messages.roomid = rooms.id) \
                      order by messages.id desc';
      db.query(queryStr, function(err, results){
        callback(results);
      });
    }, // a function which produces all the messages
    //values is an objec that will contain text, userid, roomid.
    post: function (values, callback) {
      var queryStr = 'insert into messages (text, userid, roomid) \
                      values (?, (select id from users where username = ?), (select id from rooms where roomname = ?))';
      db.query(queryStr, values, function(err, results){
        callback(results);
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      var queryStr = 'select * from users';
      db.query(queryStr, function(err, results){
        callback(results);
      });
    },
    post: function (values, callback) {
      var queryStr = 'insert into users (username) values (?)';
      db.query(queryStr, values, function(err, results){
        callback(results);
      });
    }
  }
};

