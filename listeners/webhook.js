/****************************************************
 Listeners
 ****************************************************/

 listeners.defaultWebhookGoogleDrive = {
    label: 'Catch HTTP google drive events',
    type: 'service',
    options: {
        service: 'http',
        event: 'webhook',
        matching: {
            path: '/googledrive',
        }
    },
    callback: function(event) {
        sys.logs.info('[googledrive] Received Google Drive webhook. Processing and triggering a package event.', event);
        sys.events.triggerEvent('googledrive:webhook', event.data);
    }
};