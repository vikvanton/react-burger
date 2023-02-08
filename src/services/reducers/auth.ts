import { IUser } from "../../utils/types";
import {
    AUTH_REQUEST,
    SET_AUTH_SUCCESS,
    CLEAR_AUTH_SUCCESS,
    AUTH_ERROR,
    CLEAR_AUTH_ERROR,
    SET_USER_DATA,
    SET_TOKENS,
    PATCH_USER_SUCCESS,
    TAuthActions,
} from "../actions/auth";

type TAuthState = {
    accessToken: string;
    refreshToken: string;
    user: IUser | null;
    authRequest: boolean;
    authError: string;
};

const initialState: TAuthState = {
    accessToken: "",
    refreshToken: localStorage.getItem("refreshToken") || "",
    user: null,
    authRequest: false,
    authError: "",
};

// Редьюсер авторизации
export const authReducer = (state = initialState, action: TAuthActions): TAuthState => {
    switch (action.type) {
        case AUTH_REQUEST: {
            return {
                ...state,
                authRequest: true,
                authError: "",
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
                refreshToken: "",
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
                authError: "",
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
