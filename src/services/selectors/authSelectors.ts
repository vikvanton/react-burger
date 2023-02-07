import { TAppState } from "../../utils/types";

export const selectRefreshToken = (state: TAppState): string => state.auth.refreshToken;

export const selectAccessToken = (state: TAppState): string => state.auth.accessToken;

export const selectAuthRequest = (state: TAppState): boolean => state.auth.authRequest;

export const selectAuthError = (state: TAppState): string => state.auth.authError;

export const selectName = (state: TAppState): string =>
    state.auth.user ? state.auth.user.name : "";

export const selectEmail = (state: TAppState): string =>
    state.auth.user ? state.auth.user.email : "";
