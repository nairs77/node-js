var assert = require('assert');
var jwt = require('./jwt');
var apiUrls = require('./urls');
var https = require('../../https');
//var manager = JSON.parse(fs.readFileSync('../../service_account.json', 'utf8'));
var config = require('../../service_account.json');

exports.verifyPayment = function (payment, cb) {
	var keyObject;
/*
	try {
		assert.equal(typeof payment.packageName, 'string', 'Package name must be a string');
		assert.equal(typeof payment.productId, 'string', 'Product ID must be a string');
		assert.equal(typeof payment.receipt, 'string', 'Receipt must be a string');

		if (typeof payment.keyObject === 'string' || Buffer.isBuffer(payment.keyObject)) {
			keyObject = JSON.parse(payment.keyObject);
		} else {
			keyObject = payment.keyObject;
		}
		assert(keyObject, 'Google API key object must be provided');
		assert.equal(typeof keyObject, 'object', 'Google API key object must be an object');
		assert.equal(typeof keyObject.client_email, 'string', 'Google API client_email must be a string');
		assert.equal(typeof keyObject.private_key, 'string', 'Google API private_key must be a string');
		
	} catch (error) {
		return process.nextTick(function () {
			cb(error);
		});
	}
*/
	console.log(config.private_key);
	console.log(config.client_email);
	/* jshint camelcase:false */
	jwt.getToken(config.client_email, config.private_key, apiUrls.publisherScope, function (error, token) {		
	/* jshint camelcase:true */
		if (error) {
			return cb(error);
		}

		console.log(token);
		var receipt = "oplpodpelojnpgbjkepeajng.AO-J1Oz-RA50KcSXE0RtkpyjkZgsApDto3TNNJoWsp4DF_8y-LCzgY5SaZs6nzU4xGel8YJQJTP06yde8dE_3WB_yPehrxqJapnLNaP_KXx9lrf1enjPN1c0ANUKpUJ6UAKMHTZEgvVE";
		var product = "sample_coin_10";
		var pg = "com.gebros.platform.sample";
		
		if (payment.subscription) {
			requestUrl = apiUrls.purchasesSubscriptionsGet(
				payment.packageName,
				payment.productId,
				payment.receipt,
				token
			);
		} else {
			requestUrl = apiUrls.purchasesProductsGet(
				pg,
				product,
				receipt,
				//payment.packageName,
				//payment.productId,
				//payment.receipt,
				token
			);
		}

		https.get(requestUrl, null, function (error, res, responseString) {

			console.log(responseString);

			if (error) {
				return cb(error);
			}

			if (res.statusCode !== 200) {
				return cb(new Error('Received ' + res.statusCode + ' status code with body: ' + responseString));
			}

			var responseObject;
			try {
				responseObject = JSON.parse(responseString);
			} catch (e) {
				return cb(e);
			}

			return cb(null, {
				receipt: responseObject,
				transactionId: payment.receipt,
				productId: payment.productId,
			});
		});
	
	});
};
