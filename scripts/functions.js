/****************************************************
 Dependencies
 ****************************************************/

var httpReference = dependencies.http;

var httpDependency = {
    get: httpReference.get,
    post: httpReference.post,
    put: httpReference.put,
    patch: httpReference.patch,
    delete: httpReference.delete,
    head: httpReference.head,
    options: httpReference.options
};
var httpService = {};

function handleRequestWithRetry(requestFn, options, callbackData, callbacks) {
    try {
        return requestFn(options, callbackData, callbacks);
    } catch (error) {
        sys.logs.info("[googledrive] Handling request "+JSON.stringify(error));
    }
}

function createWrapperFunction(requestFn) {
    return function(options, callbackData, callbacks) {
        return handleRequestWithRetry(requestFn, options, callbackData, callbacks);
    };
}

for (var key in httpDependency) {
    if (typeof httpDependency[key] === 'function') httpService[key] = createWrapperFunction(httpDependency[key]);
}

/****************************************************
 Helpers
 ****************************************************/

exports.about = {};

exports.channels = {};

exports.channels.stop = {};

exports.changes = {};

exports.changes.startPageToken = {};

exports.changes.watch = {};

exports.files = {};

exports.files.comments = {};

exports.drives = {};

exports.drives.hide = {};

exports.drives.unhide = {};

exports.files.copy = {};

exports.files.trash = {};

exports.files.export = {};

exports.files.generateIds = {};

exports.files.listLabels = {};

exports.files.modifyLabels = {};

exports.files.watch = {};

exports.files.permissions = {};

exports.files.comments.replies = {};

exports.files.revisions = {};

exports.about.get = function(httpOptions) {
    var url = parse('/about');
    sys.logs.debug('[googledrive] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(GoogleDrive(options));
};

exports.channels.stop.post = function(httpOptions) {
    var url = parse('/channels/stop');
    sys.logs.debug('[googledrive] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(GoogleDrive(options));
};

exports.changes.get = function(httpOptions) {
    var url = parse('/changes');
    sys.logs.debug('[googledrive] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(GoogleDrive(options));
};

exports.changes.startPageToken.get = function(httpOptions) {
    var url = parse('/changes/startPageToken');
    sys.logs.debug('[googledrive] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(GoogleDrive(options));
};

exports.changes.watch.post = function(httpOptions) {
    var url = parse('/changes/watch');
    sys.logs.debug('[googledrive] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(GoogleDrive(options));
};

exports.files.comments.post = function(fileId, httpOptions) {
    if (!fileId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [fileId].');
        return;
    }
    var url = parse('/files/:fileId/comments', [fileId]);
    sys.logs.debug('[googledrive] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(GoogleDrive(options));
};

exports.files.comments.delete = function(fileId, commentId, httpOptions) {
    if (!fileId || !commentId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [fileId,commentId].');
        return;
    }
    var url = parse('/files/:fileId/comments/:commentId', [fileId, commentId]);
    sys.logs.debug('[googledrive] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.delete(GoogleDrive(options));
};

exports.files.comments.get = function(fileId, commentId, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
                arguments[i] = undefined;
            }
        }
    }
    var url;
    switch(httpOptions ? arguments.length - 1 : arguments.length){
        case 1:
			url = parse('/files/:fileId/comments', [fileId]);
			break;
		case 2:
			url = parse('/files/:fileId/comments/:commentId', [fileId, commentId]);
			break;
		default:
            sys.logs.error('Invalid argument received.');
            return;
    }
    sys.logs.debug('[googledrive] GET from: ' + url);
	var options = checkHttpOptions(url, httpOptions);
	return httpService.get(GoogleDrive(options));
};

exports.files.comments.patch = function(fileId, commentId, httpOptions) {
    if (!fileId || !commentId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [fileId,commentId].');
        return;
    }
    var url = parse('/files/:fileId/comments/:commentId', [fileId, commentId]);
    sys.logs.debug('[googledrive] PATCH from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.patch(GoogleDrive(options));
};

exports.drives.post = function(httpOptions) {
    var url = parse('/drives');
    sys.logs.debug('[googledrive] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(GoogleDrive(options));
};

exports.drives.get = function(driveId, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
                arguments[i] = undefined;
            }
        }
    }
    var url;
    switch(httpOptions ? arguments.length - 1 : arguments.length){
        case 0:
			url = parse('/drives');
			break;
		case 1:
			url = parse('/drives/:driveId', [driveId]);
			break;
		default:
            sys.logs.error('Invalid argument received.');
            return;
    }
    sys.logs.debug('[googledrive] GET from: ' + url);
	var options = checkHttpOptions(url, httpOptions);
	return httpService.get(GoogleDrive(options));
};

exports.drives.delete = function(driveId, httpOptions) {
    if (!driveId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [driveId].');
        return;
    }
    var url = parse('/drives/:driveId', [driveId]);
    sys.logs.debug('[googledrive] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.delete(GoogleDrive(options));
};

exports.drives.hide.post = function(driveId, httpOptions) {
    if (!driveId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [driveId].');
        return;
    }
    var url = parse('/drives/:driveId/hide', [driveId]);
    sys.logs.debug('[googledrive] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(GoogleDrive(options));
};

exports.drives.unhide.post = function(driveId, httpOptions) {
    if (!driveId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [driveId].');
        return;
    }
    var url = parse('/drives/:driveId/unhide', [driveId]);
    sys.logs.debug('[googledrive] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(GoogleDrive(options));
};

exports.drives.patch = function(driveId, httpOptions) {
    if (!driveId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [driveId].');
        return;
    }
    var url = parse('/drives/:driveId', [driveId]);
    sys.logs.debug('[googledrive] PATCH from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.patch(GoogleDrive(options));
};

exports.files.copy.post = function(fileId, httpOptions) {
    if (!fileId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [fileId].');
        return;
    }
    var url = parse('/files/:fileId/copy', [fileId]);
    sys.logs.debug('[googledrive] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(GoogleDrive(options));
};

exports.files.post = function(httpOptions) {
    var url = parse('/files');
    sys.logs.debug('[googledrive] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(GoogleDrive(options));
};

exports.files.delete = function(fileId, httpOptions) {
    if (!fileId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [fileId].');
        return;
    }
    var url = parse('/files/:fileId', [fileId]);
    sys.logs.debug('[googledrive] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.delete(GoogleDrive(options));
};

exports.files.trash.delete = function(httpOptions) {
    var url = parse('/files/trash');
    sys.logs.debug('[googledrive] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.delete(GoogleDrive(options));
};

exports.files.export.get = function(fileId, httpOptions) {
    if (!fileId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [fileId].');
        return;
    }
    var url = parse('/files/:fileId/export', [fileId]);
    sys.logs.debug('[googledrive] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(GoogleDrive(options));
};

exports.files.generateIds.get = function(httpOptions) {
    var url = parse('/files/generateIds');
    sys.logs.debug('[googledrive] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(GoogleDrive(options));
};

exports.files.get = function(fileId, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
                arguments[i] = undefined;
            }
        }
    }
    var url;
    switch(httpOptions ? arguments.length - 1 : arguments.length){
        case 0:
			url = parse('/files');
			break;
		case 1:
			url = parse('/files/:fileId', [fileId]);
			break;
		default:
            sys.logs.error('Invalid argument received.');
            return;
    }
    sys.logs.debug('[googledrive] GET from: ' + url);
	var options = checkHttpOptions(url, httpOptions);
	return httpService.get(GoogleDrive(options));
};

exports.files.listLabels.get = function(fileId, httpOptions) {
    if (!fileId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [fileId].');
        return;
    }
    var url = parse('/files/:fileId/listLabels', [fileId]);
    sys.logs.debug('[googledrive] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(GoogleDrive(options));
};

exports.files.modifyLabels.post = function(fileId, httpOptions) {
    if (!fileId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [fileId].');
        return;
    }
    var url = parse('/files/:fileId/modifyLabels', [fileId]);
    sys.logs.debug('[googledrive] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(GoogleDrive(options));
};

exports.files.patch = function(fileId, httpOptions) {
    if (!fileId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [fileId].');
        return;
    }
    var url = parse('/files/:fileId', [fileId]);
    sys.logs.debug('[googledrive] PATCH from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.patch(GoogleDrive(options));
};

exports.files.watch.post = function(fileId, httpOptions) {
    if (!fileId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [fileId].');
        return;
    }
    var url = parse('/files/:fileId/watch', [fileId]);
    sys.logs.debug('[googledrive] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(GoogleDrive(options));
};

exports.files.permissions.post = function(fileId, httpOptions) {
    if (!fileId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [fileId].');
        return;
    }
    var url = parse('/files/:fileId/permissions', [fileId]);
    sys.logs.debug('[googledrive] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(GoogleDrive(options));
};

exports.files.permissions.delete = function(fileId, permissionId, httpOptions) {
    if (!fileId || !permissionId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [fileId,permissionId].');
        return;
    }
    var url = parse('/files/:fileId/permissions/:permissionId', [fileId, permissionId]);
    sys.logs.debug('[googledrive] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.delete(GoogleDrive(options));
};

exports.files.permissions.get = function(fileId, permissionId, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
                arguments[i] = undefined;
            }
        }
    }
    var url;
    switch(httpOptions ? arguments.length - 1 : arguments.length){
        case 1:
			url = parse('/files/:fileId/permissions', [fileId]);
			break;
		case 2:
			url = parse('/files/:fileId/permissions/:permissionId', [fileId, permissionId]);
			break;
		default:
            sys.logs.error('Invalid argument received.');
            return;
    }
    sys.logs.debug('[googledrive] GET from: ' + url);
	var options = checkHttpOptions(url, httpOptions);
	return httpService.get(GoogleDrive(options));
};

exports.files.permissions.patch = function(fileId, permissionId, httpOptions) {
    if (!fileId || !permissionId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [fileId,permissionId].');
        return;
    }
    var url = parse('/files/:fileId/permissions/:permissionId', [fileId, permissionId]);
    sys.logs.debug('[googledrive] PATCH from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.patch(GoogleDrive(options));
};

exports.files.comments.replies.post = function(fileId, commentId, httpOptions) {
    if (!fileId || !commentId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [fileId,commentId].');
        return;
    }
    var url = parse('/files/:fileId/comments/:commentId/replies', [fileId, commentId]);
    sys.logs.debug('[googledrive] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(GoogleDrive(options));
};

exports.files.comments.replies.delete = function(fileId, commentId, replyId, httpOptions) {
    if (!fileId || !commentId || !replyId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [fileId,commentId,replyId].');
        return;
    }
    var url = parse('/files/:fileId/comments/:commentId/replies/:replyId', [fileId, commentId, replyId]);
    sys.logs.debug('[googledrive] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.delete(GoogleDrive(options));
};

exports.files.comments.replies.get = function(fileId, commentId, replyId, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
                arguments[i] = undefined;
            }
        }
    }
    var url;
    switch(httpOptions ? arguments.length - 1 : arguments.length){
        case 2:
			url = parse('/files/:fileId/comments/:commentId/replies', [fileId, commentId]);
			break;
		case 3:
			url = parse('/files/:fileId/comments/:commentId/replies/:replyId', [fileId, commentId, replyId]);
			break;
		default:
            sys.logs.error('Invalid argument received.');
            return;
    }
    sys.logs.debug('[googledrive] GET from: ' + url);
	var options = checkHttpOptions(url, httpOptions);
	return httpService.get(GoogleDrive(options));
};

exports.files.comments.replies.patch = function(fileId, commentId, replyId, httpOptions) {
    if (!fileId || !commentId || !replyId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [fileId,commentId,replyId].');
        return;
    }
    var url = parse('/files/:fileId/comments/:commentId/replies/:replyId', [fileId, commentId, replyId]);
    sys.logs.debug('[googledrive] PATCH from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.patch(GoogleDrive(options));
};

exports.files.revisions.delete = function(fileId, revisionId, httpOptions) {
    if (!fileId || !revisionId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [fileId,revisionId].');
        return;
    }
    var url = parse('/files/:fileId/revisions/:revisionId', [fileId, revisionId]);
    sys.logs.debug('[googledrive] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.delete(GoogleDrive(options));
};

exports.files.revisions.get = function(fileId, revisionId, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
                arguments[i] = undefined;
            }
        }
    }
    var url;
    switch(httpOptions ? arguments.length - 1 : arguments.length){
        case 1:
			url = parse('/files/:fileId/revisions', [fileId]);
			break;
		case 2:
			url = parse('/files/:fileId/revisions/:revisionId', [fileId, revisionId]);
			break;
		default:
            sys.logs.error('Invalid argument received.');
            return;
    }
    sys.logs.debug('[googledrive] GET from: ' + url);
	var options = checkHttpOptions(url, httpOptions);
	return httpService.get(GoogleDrive(options));
};

exports.files.revisions.patch = function(fileId, revisionId, httpOptions) {
    if (!fileId || !revisionId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [fileId,revisionId].');
        return;
    }
    var url = parse('/files/:fileId/revisions/:revisionId', [fileId, revisionId]);
    sys.logs.debug('[googledrive] PATCH from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.patch(GoogleDrive(options));
};

/****************************************************
 Public API - Generic Functions
 ****************************************************/

exports.get = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(GoogleDrive(options), callbackData, callbacks);
};

exports.post = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(GoogleDrive(options), callbackData, callbacks);
};

exports.put = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.put(GoogleDrive(options), callbackData, callbacks);
};

exports.patch = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.patch(GoogleDrive(options), callbackData, callbacks);
};

exports.delete = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.delete(GoogleDrive(options), callbackData, callbacks);
};

exports.head = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.head(GoogleDrive(options), callbackData, callbacks);
};

exports.options = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.options(GoogleDrive(options), callbackData, callbacks);
};

exports.utils = {};

exports.utils.parseTimestamp = function(dateString) {
    if (!dateString) {
        return null;
    }
    var dt = dateString.split(/[: T\-]/).map(parseFloat);
    return new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0);
};

exports.utils.formatTimestamp = function(date) {
    if (!date) {
        return null;
    }
    var pad = function(number) {
        var r = String(number);
        if ( r.length === 1 ) {
            r = '0' + r;
        }
        return r;
    };
    return date.getUTCFullYear()
        + '-' + pad( date.getUTCMonth() + 1 )
        + '-' + pad( date.getUTCDate() )
        + 'T' + pad( date.getUTCHours() )
        + ':' + pad( date.getUTCMinutes() )
        + ':' + pad( date.getUTCSeconds() )
        + '.' + String( (date.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
        + 'Z';
};

exports.utils.fromDateToTimestamp = function(params) {
    if (!!params) {
        return {timestamp: new Date(params).getTime()};
    }
    return null;
};

exports.utils.fromMillisToDate = function(params) {
    if (!!params) {
        var sdf = new Intl.DateTimeFormat('en-US', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            timeZone: 'UTC'
        });
        return {date: sdf.format(new Date(parseInt(params)))};
    }
    return null;
};

exports.utils.getConfiguration = function (property) {
    sys.logs.debug('[googledrive] Get property: '+property);
    return config.get(property);
};


/****************************************************
 Private helpers
 ****************************************************/

var checkHttpOptions = function (url, options) {
    options = options || {};
    if (!!url) {
        if (isObject(url)) {
            // take the 'url' parameter as the options
            options = url || {};
        } else {
            if (!!options.path || !!options.params || !!options.body) {
                // options contain the http package format
                options.path = url;
            } else {
                // create html package
                options = {
                    path: url,
                    body: options
                }
            }
        }
    }
    return options;
}

var isObject = function (obj) {
    return !!obj && stringType(obj) === '[object Object]'
}

var stringType = Function.prototype.call.bind(Object.prototype.toString)

var parse = function (str) {
    try {
        if (arguments.length > 1) {
            var args = arguments[1], i = 0;
            return str.replace(/(:(?:\w|-)+)/g, () => {
                if (typeof (args[i]) != 'string' && typeof (args[i]) != 'number') throw new Error('Invalid type of argument: [' + args[i] + '] for url [' + str + '].');
                return args[i++];
            });
        } else {
            if (str) {
                return str;
            }
            throw new Error('No arguments nor url were received when calling the helper. Please check it\'s definition.');
        }
    } catch (err) {
        sys.logs.error('Some unexpected error happened during the parse of the url for this helper.')
        throw err;
    }
}

/****************************************************
 Constants
 ****************************************************/

var GOOGLEWORKSPACE_API_AUTH_URL = "https://oauth2.googleapis.com/token";

/****************************************************
 Configurator
 ****************************************************/

var GoogleDrive = function (options) {
    options = options || {};
    options= setApiUri(options);
    options= setRequestHeaders(options);
    return options;
}

/****************************************************
 Private API
 ****************************************************/

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
    const result = {};
    var key;
    for (key in json1) {
        if(json1.hasOwnProperty(key)) result[key] = json1[key];
    }
    for (key in json2) {
        if(json2.hasOwnProperty(key)) result[key] = json2[key];
    }
    return result;
}
