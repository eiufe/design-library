'use strict';

const request = require('request-promise-native'); 

const response = request({
    url: 'http://www.mocky.io/v2/5ccbcfe0330000ef12e01879',
    json: true
});

response.then(function (param) {
        console.log(param)
    return param;
});

module.exports = {
	context: {
		"list": response 
	}
};