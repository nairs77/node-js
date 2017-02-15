var util = require('util');


// OAuth URLs
exports.tokenRequest = 'https://www.googleapis.com/oauth2/v4/token';//https://accounts.google.com/o/oauth2/token';


// Authentication scope URLs
exports.publisherScope = 'https://www.googleapis.com/auth/androidpublisher';


// Android Purchases URLs & generators
exports.purchasesProductsGet = function (packageName, productId, receipt, accessToken) {
	//var urlFormat = 'https://www.googleapis.com/androidpublisher/v2/applications/%s/purchases/products/%s/tokens/%s?access_token=%s';
	var urlFormat = 'https://www.googleapis.com/androidpublisher/v1.1/applications/%s/inapp/%s/purchases/%s?access_token=%s';

	return util.format(urlFormat,
		encodeURIComponent(packageName),  // application package name
		encodeURIComponent(productId),    // productId
		encodeURIComponent(receipt),      // purchase token
		encodeURIComponent(accessToken)   // API access token
	);
};


// Android Subscriptions URLs & generators
exports.purchasesSubscriptionsGet = function (packageName, productId, receipt, accessToken) {
	var urlFormat = 'https://www.googleapis.com/androidpublisher/v2/applications/%s/purchases/subscriptions/%s/tokens/%s?access_token=%s';

	return util.format(urlFormat,
		encodeURIComponent(packageName),  // application package name
		encodeURIComponent(productId),    // productId
		encodeURIComponent(receipt),      // purchase token
		encodeURIComponent(accessToken)   // API access token
	);
};
