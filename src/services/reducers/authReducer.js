import {
    AUTH_REQUEST,
    CLEAR_AUTH_REQUEST,
    SET_AUTH_SUCCESS,
    CLEAR_AUTH_SUCCESS,
    AUTH_ERROR,
    CLEAR_AUTH_ERROR,
    SET_USER_DATA,
    SET_TOKENS,
    PATCH_USER_SUCCESS,
} from "../actions/authActions";

const initialState = {
    accessToken: null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    user: null,
    authRequest: false,
    authError: undefined,
};
// Редьюсер авторизации
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_REQUEST: {
            return {
                ...state,
                authRequest: true,
                authError: undefined,
            };
        }
        case CLEAR_AUTH_REQUEST: {
            return {
                ...state,
                authRequest: false,
            };
        }
        case SET_AUTH_SUCCESS: {
            localStorage.setItem("refreshToken", action.data.refreshToken);
            return {
                ...state,
                ...action.data,
                authRequest: false,
            };
        }
        case CLEAR_AUTH_SUCCESS: {
            localStorage.removeItem("refreshToken");
            return {
                ...initialState,
                refreshToken: null,
            };
        }
        case AUTH_ERROR: {
            return {
                ...state,
                authRequest: false,
                authError: action.data,
            };
        }
        case CLEAR_AUTH_ERROR: {
            return {
                ...state,
                authError: undefined,
            };
        }
        case SET_USER_DATA: {
            return {
                ...state,
                user: action.data,
            };
        }
        case SET_TOKENS: {
            localStorage.setItem("refreshToken", action.data.refreshToken);
            return {
                ...state,
                ...action.data,
            };
        }
        case PATCH_USER_SUCCESS: {
            return {
                ...state,
                user: action.data,
                authRequest: false,
            };
        }
        default:
            return state;
    }
};
