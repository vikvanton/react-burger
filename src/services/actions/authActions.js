import {
    setAuthRequest,
    clearAuthRequest,
    patchUserRequest,
    refreshTokensRequest,
} from "../../utils/api";

export const AUTH_REQUEST = "AUTH_REQUEST";
export const CLEAR_AUTH_REQUEST = "CLEAR_AUTH_REQUEST";
export const SET_AUTH_SUCCESS = "SET_AUTH_SUCCESS";
export const CLEAR_AUTH_SUCCESS = "CLEAR_AUTH_SUCCESS";
export const AUTH_ERROR = "AUTH_ERROR";
export const CLEAR_AUTH_ERROR = "CLEAR_AUTH_ERROR";
export const SET_USER_DATA = "SET_USER_DATA";
export const SET_TOKENS = "SET_TOKENS";
export const PATCH_USER_SUCCESS = "PATCH_USER_SUCCESS";

export const setAuth = (data, type) => {
    return (dispatch) => {
        dispatch({ type: AUTH_REQUEST });
        setAuthRequest(data, type)
            .then((result) => {
                if (result.success) {
                    dispatch({
                        type: SET_AUTH_SUCCESS,
                        data: {
                            accessToken: result.accessToken,
                            refreshToken: result.refreshToken,
                            user: result.user,
                        },
                    });
                }
            })
            .catch((error) =>
                dispatch({
                    type: AUTH_ERROR,
                    data: error?.message
                        ? error.message === "User already exists"
                            ? "Пользователь с таким e-mail уже существует"
                            : error.message ===
                              "email or password are incorrect"
                            ? "Некорректные e-mail и (или) пароль"
                            : error.message
                        : "Ошибка соединения с сервером",
                })
            );
    };
};

export const clearAuth = (data) => {
    return (dispatch) => {
        dispatch({ type: AUTH_REQUEST });
        clearAuthRequest(data)
            .then((result) => {
                if (result.success) {
                    dispatch({ type: CLEAR_AUTH_SUCCESS });
                }
            })
            .catch(() =>
                dispatch({
                    type: AUTH_ERROR,
                    data: "Ошибка соединения с сервером",
                })
            );
    };
};

export const patchUser = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: AUTH_REQUEST });
        patchUserRequest(data, getState().auth.accessToken)
            .then(
                (result) => {
                    if (result.success) {
                        dispatch({
                            type: PATCH_USER_SUCCESS,
                            data: result.user,
                        });
                    }
                },
                (error) => {
                    // Если не валидный аксесс токен запускаем обновление токенов
                    if (error?.status === 401 || error?.status === 403) {
                        return refreshTokensRequest({
                            token: getState().auth.refreshToken,
                        });
                    } else {
                        dispatch({
                            type: AUTH_ERROR,
                            data: "Ошибка соединения с сервером",
                        });
                    }
                }
            )
            .then(
                (refreshTokens) => {
                    if (refreshTokens?.success) {
                        dispatch({
                            type: SET_TOKENS,
                            data: {
                                accessToken: refreshTokens.accessToken,
                                refreshToken: refreshTokens.refreshToken,
                            },
                        });
                        // Повторяем запрос с обновленным токеном
                        return patchUserRequest(
                            data,
                            refreshTokens.accessToken
                        );
                    }
                },
                // Если ошибка при обновлении токенов, разлогиниваем пользователя
                () => dispatch({ type: CLEAR_AUTH_SUCCESS })
            )
            .then(
                (result) => {
                    if (result?.success) {
                        dispatch({
                            type: PATCH_USER_SUCCESS,
                            data: result.user,
                        });
                    }
                },
                // Если снова ошибка, останавливаем процесс, чтобы пользователь мог повторить попытку
                () =>
                    dispatch({
                        type: AUTH_ERROR,
                        data: "Ошибка соединения с сервером",
                    })
            );
    };
};
