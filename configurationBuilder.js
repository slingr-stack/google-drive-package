/****************************************************
 Configuration builder

 The configuration object should be built to configure the package dependencies

 ****************************************************/

let configurationBuilder = function (config) {
    config.oauth = {
        id: 'installationInfo-googledrive-User-'+sys.context.getCurrentUserRecord().id(),
        authUrl: 'https://accounts.google.com/o/oauth2/auth',
        accessTokenUrl: 'https://oauth2.googleapis.com/token',
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        scope: config.scope,
        state: config.state,
        oauthCallback: config.oauthCallback,
        additionalQueryString: 'access_type=offline'
	};
    sys.logs.debug("[googledrive] Configuration builder: " + JSON.stringify(config));
    return config;
}