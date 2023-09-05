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

