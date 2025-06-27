export const ssoParam = {
    refreshToken: 'refresh_token',
    clientId: 'client_id',
    redirectUri: 'redirect_uri',
    responseType: 'response_type',
    scope: 'scope',
    grantType: 'grant_type',
    code: 'code',
  };
  
  export const authTokenParam = {
    grantType: 'grantType',
    grantValue: 'grantValue',
    redirectUri: 'redirectUri',
  };

  export const ssoParamValue = {
    responseTypeCode: 'code',
    scopeEmail: 'email',
    scopeProfile: 'profile',
    scopeProfileEdit: 'profile.edit',
    scopeOfflineAccess: 'offline_access',
    grantTypeAuthorizationCode: 'authorization_code',
    grantTypeRefreshToken: 'refresh_token',
    openid: 'openid',
  };

  export const API = {
    Token: "/token",
    Logout: "/logout",
  };