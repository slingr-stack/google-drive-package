# Overview

Repo: [https://github.com/slingr-stack/google-drive-package](https://github.com/slingr-stack/google-drive-package)

This package allows direct access to the [Google Drive API](https://developers.google.com/drive/api/reference/rest/v3),
through a Client ID OAuth 2.0 account; however, it provides shortcuts and helpers for most common use cases. 
Also, you can refer to the [Google Drive Documentation](https://developers.google.com/drive/api/guides/about-files) for more information.

Some features available in this package are:

- Authentication and authorization
- Direct access to the Google Drive API
- Helpers for API methods
- Listener that catch incoming webhooks from Google Drive

## Configuration

To use the Google Drive package, 
first you must create an app in the [Google Developer Console](https://console.developers.google.com)
then create a Google Cloud project for your Google Drive app, then if you plan to use Service Account authentication method, follow these instructions:

- Enable the Admin SDK API in your Google Cloud project.
- Create a service account and credentials and delegate domain-wide authority to it (assign ONLY the necessary scopes to your service - account) [Click here for instructions](https://cloud.google.com/iam/docs/manage-access-service-accounts?hl=es-419).
- Download the JSON file with the service account credentials to get the service account private key.

Otherwise if you plan to use OAuth 2.0 authentication method:

- Enable the Drive API in your Google Cloud project.
- Create a Client ID OAuth 2.0 account.
- Copy the Client ID and Client Secret of the package.

### OAuth Scopes

Note that the client must have access to the drive resources. If you try to access to a resource that the user does not own
the request will result in a 404 or 403 unauthorized error.

## Configuration Parameters
If you have selected OAuth 2.0 authorization method, these are the field names to use the parameters with dynamic configuration.

Name (Dynamic Config param name) - Type
* Client Id (clientId) - Text
* Client Secret (clientSecret) - Text
* State (state) - Text


#### Authorization Method
Allows to choose between Account Service and OAuth 2.0 authorization methods.

**Name**: `authorizationMethod`
**Type**: buttonsGroup
**Mandatory**: true

#### Service Account Email
The email created for the service account, it shows up when Service Account authorization method is enabled.

**Name**: `serviceAccountEmail`
**Type**: text
**Mandatory**: true

#### Private Key
The private key associated to the service account, it shows up when Service Account authorization method is enabled.

**Name**: `privateKey`
**Type**: password
**Mandatory**: true

#### Client ID
The ID for your client application registered with the API provider, it shows up when OAuth 2.0 authorization method is enabled.

**Name**: `clientId`
**Type**: text
**Mandatory**: true

#### Client Secret
The client secret given to you by the API provider, it shows up when OAuth 2.0 authorization method is enabled.

**Name**: `clientSecret`
**Type**: password
**Mandatory**: true

#### State
An opaque value to prevent cross-site request forgery. it shows up when OAuth 2.0 authorization method is enabled.

**Name**: `state`
**Type**: text
**Mandatory**: false

#### OAuth Callback
The OAuth callback to configure in your Google Drive App. it shows up when OAuth 2.0 authorization method is enabled.

**Name**: `oauthCallback`
**Type**: label

#### Webhooks URL
The URL to configure in webhooks of your Google Drive App.

**Name**: `webhooksUrl`
**Type**: label

### Storage Value And Offline Mode

By default, the `Service Account` authorization method is used. When using this method, you can directly call the following method to retrieve the access token, without requiring any additional actions:

`pkg.googledrive.api.getAccessToken();`

This will return the access token, which will be securely stored in the application's storage and associated with a user by their ID.

If you have enabled the `OAuth 2.0` authorization method, the Google Drive package uses the `&access_type=offline` parameter, which allows the application to request a refresh token. When calling the UI service (for example using an action) to log in to the application:

`pkg.googledrive.api.getAccessToken();`

The Google service will return an object containing both the access token and the refresh token. Each token will be stored in the app's storage (accessible via the Monitor), where you can view them encrypted and associated with the user by ID.

# Javascript API

You can make `GET`,`POST`,`DELETE`,`PATCH` requests to the [Google Drive API](https://developers.google.com/drive/api/reference/rest/v3?hl=es-419) like this:
```javascript
var response = pkg.googledrive.api.get('/about?fields=user')
var response = pkg.googledrive.api.post('/files/:fileId/watch', {
  "id": "<use a unique UUID or any similar unique string>", // Your channel ID. Maximum length: 64 characters. 
  "type": "web_hook",
  "address": "https://mydomain.com/notifications", // Your receiving URL.
  ...
  "token": "target=myApp-myChangesChannelDest", // (Optional) Your changes channel token.
  "expiration": 1426325213000 // (Optional) Your requested channel expiration date and time.
});
var response = pkg.googledrive.api.post('/files/:fileId/watch')
var response = pkg.googledrive.api.delete('/drives/:driveId')
var response = pkg.googledrive.api.patch('/files/:fileId/comments/:commentId/replies/:replyId', body)
var response = pkg.googledrive.api.patch('/files/:fileId/comments/:commentId/replies/:replyId')
```

Please refer to the documentation of the [HTTP service](https://github.com/slingr-stack/http-service)
for more information about generic requests.

## Events

### Webhook

Incoming webhook events are automatically captured by the default listener named `Catch HTTP google drive events`, which can be found below the `Scripts` section. Alternatively, you have the option to create a new package listener. For more information, please refer to the [Listeners Documentation](https://platform-docs.slingr.io/dev-reference/data-model-and-logic/listeners/). Please take a look at the google drive documentation of the [Webhooks](https://developers.google.com/drive/api/guides/push?hl=es-419) for more information.

## Dependencies
* HTTP Service
* Oauth Package

## About Slingr

SLINGR is a low-code rapid application development platform that speeds up development,
with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

## License

This package is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
