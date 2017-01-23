var express = require('express');
var apiRouter = express.Router();

/* GET home page. */
apiRouter.get('/', function(req, res, next) {

  res.send('Hello! The API is at http://localhost:' + 3000 + '/api' + '/users');
});

module.exports = apiRouter;