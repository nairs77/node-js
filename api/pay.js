var express = require('express');
var apiRoutes = express.Router();
var Realm = require('../app/models/pay.js');
var middleware = require('../middleware.js');

apiRoutes.get('/verify-receipt', middleware.requireAuthentication, function (req, res) {
    console.log("test");
});
/*
apiRoutes.get('/find', function(req, res) {
  var users = Realm.UserRealm
      .objects('User')
      .sorted('date', true);

  res.send({
      success : true,
      data: users
  })
});
*/
module.exports = apiRoutes;