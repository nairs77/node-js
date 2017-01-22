var express = require('express');
var apiRoutes = express.Router();
var Realm = require('../app/models/user.js');

/* GET home page. */
apiRoutes.post('/join', function(req, res, next) {

    req.accepts('application/json');

  var name = req.param("name", "");
  var email = req.param("email", "");
  var tel = req.param("tel", "");

//    console.log('body' + req.body + 'name ' + name + ' ' + email + ' ' + tel + ' ');
  Realm.UserRealm.write( () => {
      Realm.UserRealm.create('User', {
          name : name,
          email : email,
          tel : tel,
          date : new Date()
      });
  });

  res.send({
    success : true
  });
});

apiRoutes.get('/find', function(req, res) {
  var users = Realm.UserRealm
      .objects('User')
      .sorted('date', true);

  res.send({
      success : true,
      data: users
  })
});

apiRoutes.get('/:name', (req, res) => {

  var name = req.params.name;

  var user = Realm.UserRealm
      .objects('User')
      .filtered(`name = "${name}"`)
      .sorted('date', true);


  res.send({
      success : true,
      data : user
  });

});

module.exports = apiRoutes;