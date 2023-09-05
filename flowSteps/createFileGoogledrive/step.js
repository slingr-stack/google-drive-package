/****************************************************
 Dependencies
 ****************************************************/

var httpService = dependencies.http;

step.createFileGoogledrive = function (inputs) {

	var inputsLogic = {
		headers: inputs.headers || [],
		body: inputs.body || {},
		connectionTimeout: inputs.connectionTimeout || 5000,
		readTimeout: inputs.readTimeout || 60000
	};

	inputsLogic.headers = isObject(inputsLogic.headers) ? inputsLogic.headers : stringToObject(inputsLogic.headers);
	inputsLogic.body = isObject(inputsLogic.body) ? inputsLogic.body : JSON.parse(inputsLogic.body);


	var options = {
		headers: inputsLogic.headers,
		body: inputsLogic.body,
		connectionTimeout: inputsLogic.connectionTimeout,
		readTimeout: inputsLogic.readTimeout
	}

	return endpoint.files.post(options);
};

var isObject = function (obj) {
	return !!obj && stringType(obj) === '[object Object]'
};

var stringType = Function.prototype.call.bind(Object.prototype.toString);

var stringToObject = function (obj) {
	if (!!obj){
		var keyValue = obj.toString().split(',');
		var parseObj = {};
		for(var i = 0; i < keyValue.length; i++) {
			parseObj[keyValue[i].split('=')[0]] = keyValue[i].split('=')[1]
		}
		return parseObj;
	}
	return null;
};