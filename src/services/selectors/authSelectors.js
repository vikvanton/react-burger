export const selectRefreshToken = (state) => state.auth.refreshToken;

export const selectAccessToken = (state) => state.auth.accessToken;

export const selectAuthRequest = (state) => state.auth.authRequest;

export const selectAuthError = (state) => state.auth.authError;

export const selectName = (state) => state.auth.user?.name;

export const selectEmail = (state) => state.auth.user?.email;
