'use strict';

var Realm = require('realm');

let InAppSchema = {
    name : 'Pay',
    properties : {
        receipt : 'string',
        transactionId : 'string',
        paymentKey : 'string',
        date : 'date'
    }
};

var PayRealm = new Realm({
    path : 'inapp.realm',
    schema : [InAppSchema]
});

module.exports = {
    PayRealm : PayRealm
};