# Overview

Repo: [https://github.com/slingr-stack/google-drive-package](https://github.com/slingr-stack/google-drive-package)

This package allows direct access to the [Google Drive API](https://developers.google.com/drive/api/reference/rest/v3),
through a Client ID OAuth 2.0 account; however, it provides shortcuts and helpers for most common use cases. 
Also, you can see [Google Drive Documentation](https://developers.google.com/drive/api/guides/about-files) for more information.

Some features available in this package are:

- Authentication and authorization
- Direct access to the Google Drive API
- Helpers for API methods
- Flow Steps for common use cases

## Configuration

To use the Google Drive package, 
you must create an app in the [Google Developer Console](https://console.developers.google.com)
by following these instructions:

- Create a Google Cloud project for your Google Drive app.
- Access to Google Developer Console
- Access to `API Manager > Library`. Enable `Drive API`.
- Create a Client ID OAuth 2.0 account.
- Copy the Client ID and Client Secret of the package.

### OAuth Scopes

Take into account that the client must have access to the drive resources. If you try to access to a resource that the user does not own
the request will result in a 404 or 403 unauthorized error.

## Configuration Parameters
Field names to use the parameters with dynamic configuration.

Name (Dynamic Config param name) - Type
* Client Id (clientId) - Text
* Client Secret (clientSecret) - Text
* State (state) - Text

### Storage value and Offline mode
The Google Drive package makes use of the &access_type=offline param which allows the application runtime to request a refresh token.
So when calling the UI service to be able to log in to the application

`pkg.googledrive.api.getAccessToken();`

the Google service must return an object with the access token and the refresh token. 
For each of these tokens a record will be created in the app storage (accessible from the Monitor),  
and you will be able to see them encrypted and associated to a user by id. 

# Javascript API

The Javascript API of the googledrive package has two pieces:

- **HTTP requests**
- **Flow steps**

## HTTP requests
You can make `GET`,`POST`,`DELETE`,`PATCH` requests to the [googledrive API](https://developers.google.com/drive/api/reference/rest/v3?hl=es-419) like this:
```javascript
var response = pkg.googledrive.api.get('/about?fields=user')
var response = pkg.googledrive.api.post('/files/:fileId/watch', body)
var response = pkg.googledrive.api.post('/files/:fileId/watch')
var response = pkg.googledrive.api.delete('/drives/:driveId')
var response = pkg.googledrive.api.patch('/files/:fileId/comments/:commentId/replies/:replyId', body)
var response = pkg.googledrive.api.patch('/files/:fileId/comments/:commentId/replies/:replyId')
```

Please take a look at the documentation of the [HTTP service](https://github.com/slingr-stack/http-service)
for more information about generic requests.

## Events

There are no events for this endpoint.

## Dependencies
* HTTP Service (Latest Version)

# About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

# License

This package is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
