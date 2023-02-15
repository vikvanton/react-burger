import {
    AUTH_ERROR,
    AUTH_REQUEST,
    CLEAR_AUTH_ERROR,
    CLEAR_AUTH_SUCCESS,
    PATCH_USER_SUCCESS,
    SET_AUTH_SUCCESS,
    SET_TOKENS,
    SET_USER_DATA,
    TAuthActions,
} from "../actions/auth";
import { authReducer } from "./auth";

describe("auth reducer test", () => {
    it("should return the initial state", () => {
        expect(authReducer(undefined, {} as TAuthActions)).toEqual({
            accessToken: "",
            refreshToken: "",
            user: null,
            authRequest: false,
            authError: "",
        });
    });

    it("should handle AUTH_REQUEST", () => {
        expect(
            authReducer(
                {
                    accessToken: "",
                    refreshToken: "",
                    user: null,
                    authRequest: false,
                    authError: "",
                },
                { type: AUTH_REQUEST }
            )
        ).toEqual({
            accessToken: "",
            refreshToken: "",
            user: null,
            authRequest: true,
            authError: "",
        });
    });

    it("should handle SET_AUTH_SUCCESS", () => {
        expect(
            authReducer(
                {
                    accessToken: "",
                    refreshToken: "",
                    user: null,
                    authRequest: true,
                    authError: "",
                },
                {
                    type: SET_AUTH_SUCCESS,
                    data: {
                        user: { name: "name", email: "email" },
                        accessToken: "accessToken",
                        refreshToken: "refreshToken",
                    },
                }
            )
        ).toEqual({
            accessToken: "accessToken",
            refreshToken: "refreshToken",
            user: { name: "name", email: "email" },
            authRequest: false,
            authError: "",
        });
    });

    it("should handle CLEAR_AUTH_SUCCESS", () => {
        expect(
            authReducer(
                {
                    accessToken: "accessToken",
                    refreshToken: "refreshToken",
                    user: { name: "name", email: "email" },
                    authRequest: false,
                    authError: "",
                },
                {
                    type: CLEAR_AUTH_SUCCESS,
                }
            )
        ).toEqual({
            accessToken: "",
            refreshToken: "",
            user: null,
            authRequest: false,
            authError: "",
        });
    });

    it("should handle AUTH_ERROR", () => {
        expect(
            authReducer(
                {
                    accessToken: "",
                    refreshToken: "",
                    user: null,
                    authRequest: true,
                    authError: "",
                },
                {
                    type: AUTH_ERROR,
                    data: "auth error",
                }
            )
        ).toEqual({
            accessToken: "",
            refreshToken: "",
            user: null,
            authRequest: false,
            authError: "auth error",
        });
    });

    it("should handle CLEAR_AUTH_ERROR", () => {
        expect(
            authReducer(
                {
                    accessToken: "",
                    refreshToken: "",
                    user: null,
                    authRequest: false,
                    authError: "auth error",
                },
                {
                    type: CLEAR_AUTH_ERROR,
                }
            )
        ).toEqual({
            accessToken: "",
            refreshToken: "",
            user: null,
            authRequest: false,
            authError: "",
        });
    });

    it("should handle SET_USER_DATA", () => {
        expect(
            authReducer(
                {
                    accessToken: "",
                    refreshToken: "",
                    user: null,
                    authRequest: false,
                    authError: "",
                },
                {
                    type: SET_USER_DATA,
                    data: { name: "name", email: "email" },
                }
            )
        ).toEqual({
            accessToken: "",
            refreshToken: "",
            user: { name: "name", email: "email" },
            authRequest: false,
            authError: "",
        });
    });

    it("should handle SET_TOKENS", () => {
        expect(
            authReducer(
                {
                    accessToken: "",
                    refreshToken: "",
                    user: null,
                    authRequest: false,
                    authError: "",
                },
                {
                    type: SET_TOKENS,
                    data: {
                        accessToken: "accessToken",
                        refreshToken: "refreshToken",
                    },
                }
            )
        ).toEqual({
            accessToken: "accessToken",
            refreshToken: "refreshToken",
            user: null,
            authRequest: false,
            authError: "",
        });
    });

    it("should handle PATCH_USER_SUCCESS", () => {
        expect(
            authReducer(
                {
                    accessToken: "accessToken",
                    refreshToken: "refreshToken",
                    user: { name: "name", email: "email" },
                    authRequest: true,
                    authError: "",
                },
                {
                    type: PATCH_USER_SUCCESS,
                    data: { name: "name_patch", email: "email_patch" },
                }
            )
        ).toEqual({
            accessToken: "accessToken",
            refreshToken: "refreshToken",
            user: { name: "name_patch", email: "email_patch" },
            authRequest: false,
            authError: "",
        });
    });
});
