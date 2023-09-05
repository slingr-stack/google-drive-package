<table>
    <thead>
    <tr>
        <th>Title</th>
        <th>Last Updated</th>
        <th>Summary</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>Google Drive package</td>
        <td>August 24, 2023</td>
        <td>Detailed description of the API of the Google Drive package.</td>
    </tr>
    </tbody>
</table>

# Overview

The Google Drive endpoint is a global endpoint
(see [Global vs user endpoints](app-development-model-endpoints.html#global-vs-user-endpoints)),
which means that all users in the same organization will share the same connection to the endpoint.

This endpoint allows direct access to the [Google Drive API](https://developers.google.com/drive/api/reference/rest/v3),
through a service account; however, it provides shortcuts and helpers for most common use cases. 
Also, you can see [Google Drive Documentation](https://developers.google.com/drive/api/guides/about-files) for more information.

Some features available in this endpoint are:

- Authentication and authorization
- Direct access to the Google Drive API
- Helpers for API methods
- Flow Steps for common use cases

## Configuration

In order to use the Google Drive endpoint you must create an app in the [Google Developer Console](https://console.developers.google.com)
by following these instructions:

- Create a Google Cloud project for your Google Drive app.
- Access to Google Developer Console
- Access to `API Manager > Library`. Enable `Drive API`.
- Create a service account.
- Download the JSON file with the service account credentials to get the service account private key.

### Service account email

As explained above, this value comes from the credentials file.

### OAuth Scopes

The scopes the service account have access to. Take into account if any scope is selected to which the service account does not have access the endpoint will fail to be authorized to make any requests.

### Private Key

As explained above, this value also comes from the credential file.

# Javascript API

The Javascript API of the googledrive package has three pieces:

- **HTTP requests**: These allow making regular HTTP requests.
- **Shortcuts**: These are helpers to make HTTP request to the API in a more convenient way.
- **Additional Helpers**: These helpers provide additional features that facilitate or improves the package usage in SLINGR.

## HTTP requests
You can make `GET`,`POST`,`DELETE`,`PATCH` requests to the [googledrive API](API_URL_HERE) like this:
```javascript
var response = pkg.googledrive.functions.get('/about')
var response = pkg.googledrive.functions.post('/files/:fileId/watch', body)
var response = pkg.googledrive.functions.post('/files/:fileId/watch')
var response = pkg.googledrive.functions.delete('/drives/:driveId')
var response = pkg.googledrive.functions.patch('/files/:fileId/comments/:commentId/replies/:replyId', body)
var response = pkg.googledrive.functions.patch('/files/:fileId/comments/:commentId/replies/:replyId')
```

Please take a look at the documentation of the [HTTP service](https://github.com/slingr-stack/http-service)
for more information about generic requests.

## Shortcuts

Instead of having to use the generic HTTP methods, you can (and should) make use of the helpers provided in the package:
<details>
    <summary>Click here to see all the helpers</summary>

<br>

* API URL: '/about'
* HTTP Method: 'GET'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.about.get()
```
---
* API URL: '/changes'
* HTTP Method: 'GET'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.changes.get()
```
---
* API URL: '/changes/startPageToken'
* HTTP Method: 'GET'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.changes.startPageToken.get()
```
---
* API URL: '/changes/watch'
* HTTP Method: 'POST'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.changes.watch.post(body)
```
---
* API URL: '/channels/stop'
* HTTP Method: 'POST'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.channels.stop.post(body)
```
---
* API URL: '/drives'
* HTTP Method: 'GET'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.drives.get()
```
---
* API URL: '/drives'
* HTTP Method: 'POST'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.drives.post(body)
```
---
* API URL: '/drives/:driveId'
* HTTP Method: 'GET'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.drives.get()
```
---
* API URL: '/drives/:driveId'
* HTTP Method: 'DELETE'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.drives.delete(driveId)
```
---
* API URL: '/drives/:driveId'
* HTTP Method: 'PATCH'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.drives.patch(driveId, body)
```
---
* API URL: '/drives/:driveId/hide'
* HTTP Method: 'POST'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.drives.hide.post(driveId, body)
```
---
* API URL: '/drives/:driveId/unhide'
* HTTP Method: 'POST'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.drives.unhide.post(driveId, body)
```
---
* API URL: '/files'
* HTTP Method: 'GET'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.get()
```
---
* API URL: '/files'
* HTTP Method: 'POST'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.post(body)
```
---
* API URL: '/files/:fileId'
* HTTP Method: 'GET'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.get()
```
---
* API URL: '/files/:fileId'
* HTTP Method: 'DELETE'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.delete(fileId)
```
---
* API URL: '/files/:fileId'
* HTTP Method: 'PATCH'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.patch(fileId, body)
```
---
* API URL: '/files/generateIds'
* HTTP Method: 'GET'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.generateIds.get()
```
---
* API URL: '/files/trash'
* HTTP Method: 'DELETE'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.trash.delete()
```
---
* API URL: '/files/:fileId/comments'
* HTTP Method: 'GET'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.comments.get()
```
---
* API URL: '/files/:fileId/comments'
* HTTP Method: 'POST'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.comments.post(fileId, body)
```
---
* API URL: '/files/:fileId/copy'
* HTTP Method: 'POST'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.copy.post(fileId, body)
```
---
* API URL: '/files/:fileId/export'
* HTTP Method: 'GET'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.export.get(fileId)
```
---
* API URL: '/files/:fileId/listLabels'
* HTTP Method: 'GET'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.listLabels.get(fileId)
```
---
* API URL: '/files/:fileId/modifyLabels'
* HTTP Method: 'POST'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.modifyLabels.post(fileId, body)
```
---
* API URL: '/files/:fileId/permissions'
* HTTP Method: 'GET'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.permissions.get()
```
---
* API URL: '/files/:fileId/permissions'
* HTTP Method: 'POST'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.permissions.post(fileId, body)
```
---
* API URL: '/files/:fileId/revisions'
* HTTP Method: 'GET'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.revisions.get()
```
---
* API URL: '/files/:fileId/watch'
* HTTP Method: 'POST'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.watch.post(fileId, body)
```
---
* API URL: '/files/:fileId/comments/:commentId'
* HTTP Method: 'GET'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.comments.get(fileId)
```
---
* API URL: '/files/:fileId/comments/:commentId'
* HTTP Method: 'DELETE'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.comments.delete(fileId, commentId)
```
---
* API URL: '/files/:fileId/comments/:commentId'
* HTTP Method: 'PATCH'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.comments.patch(fileId, commentId, body)
```
---
* API URL: '/files/:fileId/permissions/:permissionId'
* HTTP Method: 'GET'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.permissions.get(fileId)
```
---
* API URL: '/files/:fileId/permissions/:permissionId'
* HTTP Method: 'DELETE'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.permissions.delete(fileId, permissionId)
```
---
* API URL: '/files/:fileId/permissions/:permissionId'
* HTTP Method: 'PATCH'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.permissions.patch(fileId, permissionId, body)
```
---
* API URL: '/files/:fileId/revisions/:revisionId'
* HTTP Method: 'GET'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.revisions.get(fileId)
```
---
* API URL: '/files/:fileId/revisions/:revisionId'
* HTTP Method: 'DELETE'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.revisions.delete(fileId, revisionId)
```
---
* API URL: '/files/:fileId/revisions/:revisionId'
* HTTP Method: 'PATCH'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.revisions.patch(fileId, revisionId, body)
```
---
* API URL: '/files/:fileId/comments/:commentId/replies'
* HTTP Method: 'GET'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.comments.replies.get(fileId)
```
---
* API URL: '/files/:fileId/comments/:commentId/replies'
* HTTP Method: 'POST'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.comments.replies.post(fileId, commentId, body)
```
---
* API URL: '/files/:fileId/comments/:commentId/replies/:replyId'
* HTTP Method: 'GET'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.comments.replies.get(fileId, commentId)
```
---
* API URL: '/files/:fileId/comments/:commentId/replies/:replyId'
* HTTP Method: 'DELETE'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.comments.replies.delete(fileId, commentId, replyId)
```
---
* API URL: '/files/:fileId/comments/:commentId/replies/:replyId'
* HTTP Method: 'PATCH'
* More info: https://developers.google.com/drive/api/reference/rest/v3
```javascript
pkg.googledrive.functions.files.comments.replies.patch(fileId, commentId, replyId, body)
```
---

</details>

## Flow Step

As an alternative option to using scripts, you can make use of Flows and Flow Steps specifically created for the package:
<details>
    <summary>Click here to see the Flow Steps</summary>

<br>



### Generic Flow Step

Generic flow step for full use of the entire package and its services.

<h3>Inputs</h3>

<table>
    <thead>
    <tr>
        <th>Label</th>
        <th>Type</th>
        <th>Required</th>
        <th>Default</th>
        <th>Visibility</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>URL (Method)</td>
        <td>choice</td>
        <td>yes</td>
        <td> - </td>
        <td>Always</td>
        <td>
            This is the http method to be used against the endpoint. <br>
            Possible values are: <br>
            <i><strong>GET,POST,DELETE,PATCH</strong></i>
        </td>
    </tr>
    <tr>
        <td>URL (Path)</td>
        <td>choice</td>
        <td>yes</td>
        <td> - </td>
        <td>Always</td>
        <td>
            The url to which this endpoint will send the request. This is the exact service to which the http request will be made. <br>
            Possible values are: <br>
            <i><strong>/about<br>/changes<br>/changes/startPageToken<br>/files/{fileId}/comments<br>/files/{fileId}/comments/{commentId}<br>/drives<br>/drives/{driveId}<br>/files/{fileId}/export<br>/files/generateIds<br>/files<br>/files/{fileId}<br>/files/{fileId}/listLabels<br>/files/{fileId}/permissions<br>/files/{fileId}/permissions/{permissionId}<br>/files/{fileId}/comments/{commentId}/replies<br>/files/{fileId}/comments/{commentId}/replies/{replyId}<br>/files/{fileId}/revisions<br>/files/{fileId}/revisions/{revisionId}<br>/channels/stop<br>/changes/watch<br>/files/{fileId}/comments<br>/drives<br>/drives/{driveId}/hide<br>/drives/{driveId}/unhide<br>/files/{fileId}/copy<br>/files<br>/files/{fileId}/modifyLabels<br>/files/{fileId}/watch<br>/files/{fileId}/permissions<br>/files/{fileId}/comments/{commentId}/replies<br>/files/{fileId}/comments/{commentId}<br>/drives/{driveId}<br>/files/{fileId}<br>/files/trash<br>/files/{fileId}/permissions/{permissionId}<br>/files/{fileId}/comments/{commentId}/replies/{replyId}<br>/files/{fileId}/revisions/{revisionId}<br>/files/{fileId}/comments/{commentId}<br>/drives/{driveId}<br>/files/{fileId}<br>/files/{fileId}/permissions/{permissionId}<br>/files/{fileId}/comments/{commentId}/replies/{replyId}<br>/files/{fileId}/revisions/{revisionId}<br></strong></i>
        </td>
    </tr>
    <tr>
        <td>Headers</td>
        <td>keyValue</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            Used when you want to have a custom http header for the request.
        </td>
    </tr>
    <tr>
        <td>Query Params</td>
        <td>keyValue</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            Used when you want to have a custom query params for the http call.
        </td>
    </tr>
    <tr>
        <td>Body</td>
        <td>json</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            A payload of data can be sent to the server in the body of the request.
        </td>
    </tr>
    <tr>
        <td>Override Settings</td>
        <td>boolean</td>
        <td>no</td>
        <td> false </td>
        <td>Always</td>
        <td></td>
    </tr>
    <tr>
        <td>Follow Redirect</td>
        <td>boolean</td>
        <td>no</td>
        <td> false </td>
        <td> overrideSettings </td>
        <td>Indicates that the resource has to be downloaded into a file instead of returning it in the response.</td>
    </tr>
    <tr>
        <td>Download</td>
        <td>boolean</td>
        <td>no</td>
        <td> false </td>
        <td> overrideSettings </td>
        <td>If true the method won't return until the file has been downloaded, and it will return all the information of the file.</td>
    </tr>
    <tr>
        <td>File name</td>
        <td>text</td>
        <td>no</td>
        <td></td>
        <td> overrideSettings </td>
        <td>If provided, the file will be stored with this name. If empty the file name will be calculated from the URL.</td>
    </tr>
    <tr>
        <td>Full response</td>
        <td> boolean </td>
        <td>no</td>
        <td> false </td>
        <td> overrideSettings </td>
        <td>Include extended information about response</td>
    </tr>
    <tr>
        <td>Connection Timeout</td>
        <td> number </td>
        <td>no</td>
        <td> 5000 </td>
        <td> overrideSettings </td>
        <td>Connect a timeout interval, in milliseconds (0 = infinity).</td>
    </tr>
    <tr>
        <td>Read Timeout</td>
        <td> number </td>
        <td>no</td>
        <td> 60000 </td>
        <td> overrideSettings </td>
        <td>Read a timeout interval, in milliseconds (0 = infinity).</td>
    </tr>
    </tbody>
</table>

<h3>Outputs</h3>

<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>response</td>
        <td>object</td>
        <td>
            Object resulting from the response to the endpoint call.
        </td>
    </tr>
    </tbody>
</table>


</details>

For more information about how shortcuts or flow steps work, and how they are generated, take a look at the [slingr-helpgen tool](https://github.com/slingr-stack/slingr-helpgen).

## Additional Flow Step


<details>
    <summary>Click here to see the Customs Flow Steps</summary>

<br>


### Get All Files or Get One File by Id

Gets a list of files or a single file (with its metadata or content) by id.

<h3>Inputs</h3>

<table>
    <thead>
    <tr>
        <th>Label</th>
        <th>Type</th>
        <th>Required</th>
        <th>Default</th>
        <th>Visibility</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>File ID</td>
        <td> text </td>
        <td>no</td>
        <td> - </td>
        <td> Always </td>
        <td>File ID from GDrive</td>
    </tr>
    </tbody>
</table>

<h3>Outputs</h3>

<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>response</td>
        <td>object</td>
        <td>
            Object resulting from the response to the endpoint call.
        </td>
    </tr>
    </tbody>
</table>


### Create a Files/Update a File

This step creates a new file. The file content can be provided as a json. If the file is provided as a json, it will be converted to a file before uploading it to Google Drive.
[File](https://developers.google.com/drive/api/reference/rest/v3/files#File)

<h3>Inputs</h3>

<table>
    <thead>
    <tr>
        <th>Label</th>
        <th>Type</th>
        <th>Required</th>
        <th>Default</th>
        <th>Visibility</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>Headers</td>
        <td> keyValue </td>
        <td>no</td>
        <td> - </td>
        <td> Always </td>
        <td>Headers to indicate the type.</td>
    </tr>
    <tr>
        <td>Body</td>
        <td> json </td>
        <td>no</td>
        <td> - </td>
        <td> Always </td>
        <td>Metadata or content of File. Must follow the object File of GDrive </td>
    </tr>
    </tbody>
</table>

<h3>Outputs</h3>

<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>response</td>
        <td>object</td>
        <td>
            Object resulting from the response to the endpoint call.
        </td>
    </tr>
    </tbody>
</table>


</details>

## Additional Helpers
*MANUALLY ADD THE DOCUMENTATION OF THESE HELPERS HERE...*

## Events

There are no events for this endpoint.

## About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

## License

This endpoint is licensed under the Apache License 2.0. See the `LICENSE` file for more details.

## Dependencies
* HTTP Service (Latest Version)

# About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

# License

This package is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
