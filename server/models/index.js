var db = require('../db');




module.exports = {
  messages: {
    get: function (callback) {
      var query = 'select messages.id, messages.text, messages.roomname from messages\
                      left outer join users on (messages.userid = users.id) \
                      order by messages.id desc';
      db.query(query, function(err, results){
        callback(results);
      });
    }, // a function which produces all the messages
    //values is an array that will contain text, userid, roomid.
    post: function (values, callback) {
      var query = 'insert into messages (text, userid, roomname) from messages\
                      values (?, (select id from users where username = ?), ?)';
      db.query(query, values, function(err, results){
        callback(results);
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      var query = 'select * from users';
      db.query(query, function(err, results){
        callback(results);
      });
    },
    post: function (username, callback) {
      var query = 'insert into users (username) values (?)';
      this.fetchId(username, function(results){
        if (results && results.length === 0){
          db.query(query, username, function(err, results){
            callback(results);
          });
        } else {
          callback(results);
        }
      });
    },
    fetchId: function(username, callback) {
      var query = 'select id from users \
                   where username = ?';
      db.query(query, username, function(err, results){
        callback(results);
      });
    }
  }

};

