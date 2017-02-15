var express = require('express');
var apiRoutes = express.Router();
var Realm = require('../app/models/pay.js');
var middleware = require('../middleware.js');
var market = {
    google: require('../iap/google/google.js'),
    apple: require('../iap/apple/apple.js')
}

//apiRoutes.get('/verify-receipt', middleware.requireAuthentication, function (req, res) {
apiRoutes.post('/verify-receipt', function (req, res) {    
    console.log('verify-receipt');

    var payment = {
        receipt:'receipt',
        market_code:1
    };
    var iap = market['google']; 

    console.log(typeof iap);
    iap.verifyPayment(payment, function (error, result) {
        console.log(result);
    });

    res.send('Hello! The API is at http://localhost:' + 3000 + '/verify-receipt');
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