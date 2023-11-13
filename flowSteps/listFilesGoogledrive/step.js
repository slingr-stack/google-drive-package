/****************************************************
 Dependencies
 ****************************************************/

var httpService = dependencies.http;

step.listFilesGoogledrive = function (inputs) {

	var inputsLogic = {
		fileId: inputs.fileId || ""
	};

	var options = {
		path: parse("/files", inputsLogic.fileId)
	}

	options= setApiUri(options);
	options= setRequestHeaders(options);

	return httpService.get(options);
};

function parse (url, pathVariables){
	var regex = /{([^}]*)}/g;
	if (!url.match(regex)){
		return url;
	}
	if(!pathVariables){
		sys.logs.error('No path variables have been received and the url contains curly brackets\'{}\'');
		throw new Error('Error please contact support.');
	}
	url = url.replace(regex, function(m, i) {
		return pathVariables[i] ? pathVariables[i] : m;
	})
	return url;
}

function setApiUri(options) {
	var API_URL = config.get("GOOGLEDRIVE_API_BASE_URL");
	var url = options.path || "";
	options.url = API_URL + url;
	sys.logs.debug('[googledrive] Set url: ' + options.path + "->" + options.url);
	return options;
}

function setRequestHeaders(options) {
	var headers = options.headers || {};

	sys.logs.debug('[googledrive] Set header Bearer');
	headers = mergeJSON(headers, {"Content-Type": "application/json"});
	headers = mergeJSON(headers, {"Authorization": "Bearer "+getAccessTokenForAccount()});

	if (headers.Accept === undefined || headers.Accept === null || headers.Accept === "") {
		sys.logs.debug('[googledrive] Set header accept');
		headers = mergeJSON(headers, {"Accept": "application/json"});
	}

	options.headers = headers;
	return options;
}

function getAccessTokenForAccount(account) {
	account = account || "account";
	sys.logs.info('[googledrive] Getting access token for account: '+account);
	var installationJson = sys.storage.get('installationInfo-GoogleDrive---'+account) || {id: null};
	var token = installationJson.token || null;
	var expiration = installationJson.expiration || 0;
	if (!token || expiration < new Date().getTime()) {
		sys.logs.info('[googledrive] Access token is expired or not found. Getting new token');
		var res = httpService.post(
			{
				url: "https://oauth2.googleapis.com/token",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: {
					grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
					assertion: getJsonWebToken()
				}
			});
		token = res.access_token;
		var expires_at = res.expires_in;
		expiration = new Date(new Date(expires_at) - 1 * 60 * 1000).getTime();
		installationJson = mergeJSON(installationJson, {"token": token, "expiration": expiration});
		sys.logs.info('[googledrive] Saving new token for account: ' + account);
		sys.storage.replace('installationInfo-GoogleDrive---'+account, installationJson);
	}
	return token;
}

function getJsonWebToken() {
	var currentTime = new Date().getTime();
	var futureTime = new Date(currentTime + ( 10 * 60 * 1000)).getTime();
	var scopeProp= config.get("scope");
	var scopes;
	if (!!scopeProp) {
		scopes = scopeProp.map(function (s) {
			return "https://www.googleapis.com/auth/" + s;
		});
	}
	var scopesGlobal = scopes.join(" ");
	return sys.utils.crypto.jwt.generate(
		{
			iss: config.get("serviceAccountEmail"),
			aud: GOOGLEWORKSPACE_API_AUTH_URL,
			scope: scopesGlobal,
			iat: currentTime,
			exp: futureTime
		},
		config.get("privateKey"),
		"RS256"
	)
}

function mergeJSON (json1, json2) {
	var result = {};
	var key;
	for (key in json1) {
		if(json1.hasOwnProperty(key)) result[key] = json1[key];
	}
	for (key in json2) {
		if(json2.hasOwnProperty(key)) result[key] = json2[key];
	}
	return result;
}
