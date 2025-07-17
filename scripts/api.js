/****************************************************
 Dependencies
 ****************************************************/

let httpReference = dependencies.http;

let httpDependency = {
    get: httpReference.get,
    post: httpReference.post,
    patch: httpReference.patch,
    delete: httpReference.delete,
};

let httpService = {};

/**
 *
 * Handles a request with retry from the platform side.
 */
function handleRequestWithRetry(requestFn, options, callbackData, callbacks) {
    try {
        return requestFn(options, callbackData, callbacks);
    } catch (error) {
        sys.logs.info("[googledrive] Handling request "+JSON.stringify(error));
        let errorStatus = error.additionalInfo && error.additionalInfo.status ? error.additionalInfo.status : error.error.code;
        if (errorStatus) {
            if (config.get("authenticationMethod") === 'oauth') {
                dependencies.oauth.functions.refreshToken('googledrive:refreshToken');
            } else { 
                getAccessTokenForAccount(); // this will attempt to get a new access_token in case it has expired
            }    
            return requestFn(setAuthorization(options), callbackData, callbacks);
        } else {
            throw error; 
        }        
    }
}

function createWrapperFunction(requestFn) {
    return function(options, callbackData, callbacks) {
        return handleRequestWithRetry(requestFn, options, callbackData, callbacks);
    };
}

for (let key in httpDependency) {
    if (typeof httpDependency[key] === 'function') httpService[key] = createWrapperFunction(httpDependency[key]);
}

function getAccessTokenForAccount() {
    const account = config.get("serviceAccountEmail");
    sys.logs.info('[googledrive] Getting access token for account: ' + account);
    let installationJson = sys.storage.get('installationInfo-googledrive-User-' + account) || {id: null};
    let token = installationJson.token || null;
    let expiration = installationJson.expiration || 0;
    if (!token || expiration < new Date()) {
        sys.logs.info('[googledrive] Access token is expired or not found. Getting new token');
        const res = httpService.post(
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
        let expires_at = res.expires_in;
        expiration = expires_at * 1000 +  + new Date().getTime();
        installationJson = mergeJSON(installationJson, {"token": token, "expiration": expiration});
        if (token === null || token === undefined || (typeof token === 'string' && token.trim() === '')) {
            sys.logs.error("[googledrive] The access_token is null or empty");
            return null;
        }
        sys.logs.info('[googledrive] Saving new token for account: ' + account);
        sys.storage.put('installationInfo-googledrive-User-' + account, installationJson);
    }
    return token;
}

function mergeJSON (json1, json2) {
    const result = {};
    let key;
    for (key in json1) {
        if(json1.hasOwnProperty(key)) result[key] = json1[key];
    }
    for (key in json2) {
        if(json2.hasOwnProperty(key)) result[key] = json2[key];
    }
    return result;
}

/**
 * Retrieves the access token.
 *
 * @return {void} The access token refreshed on the storage.
 */
exports.getAccessToken = function () {
    if (config.get("authenticationMethod") === 'serviceAccount') {
        const installationInfo = sys.storage.get('installationInfo-googledrive-User-'+ config.get("serviceAccountEmail"));
        return installationInfo !== null && installationInfo !== undefined ? installationInfo.token : getAccessTokenForAccount();
    }
    sys.logs.info("[googledrive] Getting access token from oauth");
    return dependencies.oauth.functions.connectUser('googledrive:userConnected');
}

/**
 * Removes the access token from the oauth.
 *
 * @return {void} The access token removed on the storage.
 */
exports.removeAccessToken = function () {
    sys.logs.info("[googledrive] Removing access token");
    if (config.get("authenticationMethod") === 'serviceAccount') {
        const account = config.get("serviceAccountEmail");
        sys.storage.remove('installationInfo-googledrive-User-' +  account);
    } else {
        dependencies.oauth.functions.disconnectUser('googledrive:disconnectUser');
    }
     
}

/****************************************************
 Public API - Generic Functions
 ****************************************************/

/**
 * Sends an HTTP POST request to upload a file to Google Drive using a multipart upload.
 *
 * The MIME type of the file is automatically inferred from the fileName extension.
 * If the extension does not match any supported type, "application/octet-stream" is used by default.
 * XLS and XLSX files will be automatically converted by setting the Google Sheets MIME type,
 * allowing the file to be exported later if needed.
 * Supported MIME Types by File Extension:
 *
 * | Document Type | Format                                             | MIME Type                                                              | File Extension |
 * |---------------|----------------------------------------------------|------------------------------------------------------------------------|----------------|
 * | Documents     | Microsoft Word                                     | application/vnd.openxmlformats-officedocument.wordprocessingml.document| .docx          |
 * | Documents     | OpenDocument                                       | application/vnd.oasis.opendocument.text                                | .odt           |
 * | Documents     | Rich Text                                          | application/rtf                                                        | .rtf           |
 * | Documents     | PDF                                                | application/pdf                                                        | .pdf           |
 * | Documents     | Plain Text                                         | text/plain                                                             | .txt           |
 * | Documents     | Web Page (HTML)                                    | application/zip                                                        | .zip           |
 * | Documents     | EPUB                                               | application/epub+zip                                                   | .epub          |
 * | Documents     | Markdown                                           | text/markdown                                                          | .md            |
 * | Spreadsheets  | Microsoft Excel                                    | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet      | .xlsx          |
 * | Spreadsheets  | Microsoft Excel (Legacy)                           | application/vnd.ms-excel                                               | .xls           |
 * | Spreadsheets  | OpenDocument                                       | application/x-vnd.oasis.opendocument.spreadsheet                       | .ods           |
 * | Spreadsheets  | PDF                                                | application/pdf                                                        | .pdf           |
 * | Spreadsheets  | Web Page (HTML)                                    | application/zip                                                        | .zip           |
 * | Spreadsheets  | Comma-Separated Values (first sheet only)          | text/csv                                                               | .csv           |
 * | Spreadsheets  | Tab-Separated Values (first sheet only)            | text/tab-separated-values                                              | .tsv           |
 * | Presentations | Microsoft PowerPoint                               | application/vnd.openxmlformats-officedocument.presentationml.presentation .pptx         |
 * | Presentations | ODP                                                | application/vnd.oasis.opendocument.presentation                        | .odp           |
 * | Presentations | PDF                                                | application/pdf                                                        | .pdf           |
 * | Presentations | Plain Text                                         | text/plain                                                             | .txt           |
 * | Presentations | JPEG (first slide only)                            | image/jpeg                                                             | .jpg           |
 * | Presentations | PNG (first slide only)                             | image/png                                                              | .png           |
 * | Presentations | Scalable Vector Graphics (first slide only)        | image/svg+xml                                                          | .svg           |
 * | Drawings      | PDF                                                | application/pdf                                                        | .pdf           |
 * | Drawings      | JPEG                                               | image/jpeg                                                             | .jpg           |
 * | Drawings      | PNG                                                | image/png                                                              | .png           |
 * | Drawings      | Scalable Vector Graphics                           | image/svg+xml                                                          | .svg           |
 * | Apps Script   | JSON                                               | application/vnd.google-apps.script+json                                | .json          |
 * | Google Vids   | MP4                                                | application/vnd.google-apps.vid                                        | .mp4           |
 *
 * @param {string} fileId         - The identifier of the file to be uploaded.
 * @param {string} fileName       - The name of the file, used to determine its MIME type from the extension.
 *                                  If not provided, "fileName" is used by default.
 * @param {string} parentFolderId - The identifier of the destination folder in Google Drive.
 * @param {object} httpOptions  - The options to be included in the GET request check http-service documentation.
 * @param {object} callbackData   - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks      - The callback functions to be called upon completion of the upload request. [optional]
 * @return {object}               - The response of the POST request to upload the file.
 */
exports.upload = function(fileId, fileName, parentFolderId, httpOptions, callbackData, callbacks) {
    let detectedMimeType = getMimeTypeFromFileName(fileName) || "application/octet-stream";
    let targetMimeType = detectedMimeType;
  
    // If the file is XLS or XLSX then use Google Sheets mimeType
    if (
      detectedMimeType === 'application/vnd.ms-excel' ||
      detectedMimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      targetMimeType = 'application/vnd.google-apps.spreadsheet';
    }

    let options = {
        upload: true,
        headers: {
            "Content-Type": "multipart/related"
        },
        params: {
            uploadType: "multipart"
        },
        body: {
            name: fileName || "fileName",
            mimeType: targetMimeType,
            parents: [
                parentFolderId
            ]
        },
        settings: {
            multipart: true,
            parts: [
                {
                    type: 'other',
                    contentType: "application/json",
                    content: {
                        name: fileName || 'metadata',
                        mimeType: targetMimeType,
                        parents: [
                            parentFolderId
                        ]
                    }
                },
                {
                    type: 'file',
                    name: fileName || 'fileName',
                    fileId: fileId
                }
            ]
        }
    };
    if (httpOptions) {
        options.headers = mergeJSON(options.headers, httpOptions.headers);
        options.params = mergeJSON(options.params, httpOptions.params);
        options.settings = mergeJSON(options.settings, httpOptions.settings);
    }
    return httpService.post(GoogleDrive(options), callbackData, callbacks);
};

/**
 * Sends an HTTP GET request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the GET request to.
 * @param {object} httpOptions  - The options to be included in the GET request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the GET request. [optional]
 * @return {object}             - The response of the GET request.
 */
exports.get = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.get(GoogleDrive(options), callbackData, callbacks);
};

/**
 * Sends an HTTP POST request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the POST request to.
 * @param {object} httpOptions  - The options to be included in the POST request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the POST request. [optional]
 * @return {object}             - The response of the POST request.
 */
exports.post = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.post(GoogleDrive(options), callbackData, callbacks);
};

/**
 * Sends an HTTP PATCH request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the PATCH request to.
 * @param {object} httpOptions  - The options to be included in the PATCH request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the POST request. [optional]
 * @return {object}             - The response of the PATCH request.
 */
exports.patch = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.patch(GoogleDrive(options), callbackData, callbacks);
};

/**
 * Sends an HTTP DELETE request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the DELETE request to.
 * @param {object} httpOptions  - The options to be included in the DELETE request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the DELETE request. [optional]
 * @return {object}             - The response of the DELETE request.
 */
exports.delete = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.delete(GoogleDrive(options), callbackData, callbacks);
};

/****************************************************
 Private helpers
 ****************************************************/

/**
 * Checks and formats HTTP options based on the provided path and options.
 *
 * - If `path` is an object, it is treated as the options object.
 * - If `path` is a string and the options already contain properties such as `path`, `params`, or `body`,
 *   the provided string is assigned to `options.path`.
 * - Otherwise, a new options object is created with `path` as the URL path and the provided options as the body.
 *
 * @param {string|object} path - The request path as a string, or an options object.
 * @param {object} [options={}] - The HTTP options or the body to be sent.
 * @return {object} The formatted HTTP options.
 */
function checkHttpOptions (path, options) {
    options = options || {};
    if (!!path) {
        if (isObject(path)) {
            // take the 'path' parameter as the options
            options = path || {};
        } else {
            if (!!options.path || !!options.params || !!options.body) {
                // options contain the http package format
                options.path = path;
            } else {
                // create html package
                options = {
                    path: path,
                    body: options
                }
            }
        }
    }
    return options;
}

/**
 * Checks if a given value is a plain object.
 *
 * This function returns true if `obj` is not falsy and its type string is "[object Object]".
 *
 * @param {*} obj - The value to check.
 * @return {boolean} True if `obj` is a plain object, false otherwise.
 */
function isObject (obj) {
    return !!obj && stringType(obj) === '[object Object]'
}

/**
 * A helper function that returns the type string of an object.
 *
 * This is a bound version of Object.prototype.toString, which can be used to determine the internal
 * [[Class]] of an object. For example, calling stringType({}) will return "[object Object]".
 *
 * @param {*} obj - The object to determine the type of.
 * @return {string} The type string of the object.
 */
let stringType = Function.prototype.call.bind(Object.prototype.toString)

/**
 * Infers the MIME type from a file name based on its extension.
 *
 * Supported extensions and corresponding MIME types:
 * - .docx: application/vnd.openxmlformats-officedocument.wordprocessingml.document
 * - .odt: application/vnd.oasis.opendocument.text
 * - .rtf: application/rtf
 * - .pdf: application/pdf
 * - .txt: text/plain
 * - .zip: application/zip
 * - .epub: application/epub+zip
 * - .md: text/markdown
 * - .xlsx: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
 * - .ods: application/x-vnd.oasis.opendocument.spreadsheet
 * - .csv: text/csv
 * - .tsv: text/tab-separated-values
 * - .pptx: application/vnd.openxmlformats-officedocument.presentationml.presentation
 * - .odp: application/vnd.oasis.opendocument.presentation
 * - .jpg: image/jpeg
 * - .png: image/png
 * - .svg: image/svg+xml
 * - .json: application/vnd.google-apps.script+json
 * - .mp4: application/vnd.google-apps.vid
 *
 * @param {string} fileName - The name of the file from which to infer the MIME type.
 * @return {string|null} The inferred MIME type, or null if the extension is not supported.
 */
function getMimeTypeFromFileName(fileName) {
    if (!fileName) return null;
    const extIndex = fileName.lastIndexOf('.');
    if (extIndex === -1) return null; // No extension found
    const extension = fileName.slice(extIndex).toLowerCase();
    const mimeMap = {
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.odt': 'application/vnd.oasis.opendocument.text',
        '.rtf': 'application/rtf',
        '.pdf': 'application/pdf',
        '.txt': 'text/plain',
        '.zip': 'application/zip',
        '.epub': 'application/epub+zip',
        '.md': 'text/markdown',
        '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        '.xls': 'application/vnd.ms-excel',
        '.ods': 'application/x-vnd.oasis.opendocument.spreadsheet',
        '.csv': 'text/csv',
        '.tsv': 'text/tab-separated-values',
        '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        '.odp': 'application/vnd.oasis.opendocument.presentation',
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.svg': 'image/svg+xml',
        '.json': 'application/vnd.google-apps.script+json',
        '.mp4': 'application/vnd.google-apps.vid'
    };
    return mimeMap[extension] || null;
}

exports.getMimeTypeFromFileName = getMimeTypeFromFileName;

/****************************************************
 Constants
 ****************************************************/

const API_URL = "https://www.googleapis.com/drive/v3";
const UPLOAD_URL = "https://www.googleapis.com/upload/drive/v3/files";

/****************************************************
 Configurator
 ****************************************************/

let GoogleDrive = function (options) {
    options = options || {};
    options= setApiUri(options);
    //options= setRequestHeaders(options);
    options = setAuthorization(options);
    return options;
}

/****************************************************
 Private API
 ****************************************************/

function setApiUri(options) {
    let url = options.path || "";
    options.url = API_URL + url;
    if (options.upload) {
        options.url = UPLOAD_URL;
        delete options.path;
        delete options.upload;
        sys.logs.debug('[googledrive] Set upload url');

    } else {
        sys.logs.debug('[googledrive] Set url: ' + options.path + "->" + options.url);
    }
    return options;
}

function setRequestHeaders(options) {
    let headers = options.headers || {};
    if (!headers["Content-Type"]) {
        headers = mergeJSON(headers, {"Content-Type": "application/json"});
    }
    options.headers = headers;
    return options;
}

function setAuthorization(options) {
    let headers = options.headers || {};
    sys.logs.debug('[googledrive] setting authorization');
    let token;
    if(config.get("authenticationMethod") === 'oauth') {
        token = sys.storage.get('installationInfo-googledrive-User-'+sys.context.getCurrentUserRecord().id() + ' - access_token',{decrypt:true})
    } else {
        const account = config.get("serviceAccountEmail");
        let tokenJson = sys.storage.get('installationInfo-googledrive-User-'+ account) || {};
        token = tokenJson.token
    }
    headers = mergeJSON(headers, {
        type: "oauth2",
        Authorization: "Bearer "+token
    });
    options.headers = headers;
    return options;
}

function getJsonWebToken() {
    let currentTime = new Date().getTime();
    let futureTime = new Date(currentTime + ( 10 * 60 * 1000)).getTime();
    return sys.utils.crypto.jwt.generate(
        {
            iss: config.get("serviceAccountEmail"),
            aud: "https://oauth2.googleapis.com/token",
            scope: "https://www.googleapis.com/auth/drive",
            iat: currentTime,
            exp: futureTime
        },
        config.get("privateKey"),
        "RS256"
    )
}
