var models = require('../models');
// var bluebird = require('bluebird');


var collectData = function(req, callback) {
  var data = "";
  req.on('data', function(chunk){
    data += chunk;
  });
  req.on('end', function(){
    callback(JSON.parse(data));
  });
};

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
      models.messages.get(function(result){
        res.json(result);
      });
    },
    // a function which handles posting a message to the database
    post: function (req, res) {
      collectData(req, function(data){
        var values = [data.message, data.username, data.roomname];
        models.messages.post(values, function(error, result){
          res.json(result);
        });
      });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res, next) {
      models.users.get(function(result){
        res.json(result);
      });
      next();
    }, // a function which gets all users
    post: function (req, res, next) {
      collectData(req, function(data){
        models.users.post(data.username, function(error, result){
            res.json(result);
        });
      })
      next();
    } // a function which handles adding users
  },
};

