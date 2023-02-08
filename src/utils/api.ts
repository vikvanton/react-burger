import {
    TOrder,
    TAuthType,
    TAuth,
    TToken,
    TEmail,
    TRestorePass,
    ICustomResponse,
    IResponseMessage,
    IIngredientsResponse,
    IOrderResponse,
    ISetAuthResponse,
    IUserDataResponse,
    IRefreshTokensResponse,
    IResponseError,
    TAppDispatch,
} from "./types";
import { NORMA_API } from "./consts";
import { CLEAR_AUTH_SUCCESS, SET_TOKENS } from "../services/actions/auth";

const checkResponse = <T>(response: Response): Promise<T> => {
    return response.ok
        ? (response as ICustomResponse<T>).json()
        : (response as ICustomResponse<IResponseMessage>).json().then(
              (result: IResponseMessage) => Promise.reject({ ...result, status: response.status }),
              () =>
                  Promise.reject({
                      success: false,
                      message: "Ошибка соединения с сервером",
                      status: response.status,
                  })
          );
};

// кастомный запрос с обновлением токенов
const requestWithTokensRefresh = async <R>(
    endpoint: string,
    method: string,
    data: string,
    accessToken: string,
    refreshToken: string,
    dispatch: TAppDispatch
): Promise<R> => {
    // Отправляем запрос с токеном авторизации
    const response = await fetch(`${NORMA_API}${endpoint}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
        },
        body: data,
    });
    try {
        // Проверяем результат и возвращаем, если запрос успешен
        return await checkResponse<R>(response);
    } catch (error) {
        const err = error as IResponseError;
        try {
            // Если ошибка авторизации, обновляем токены
            if (err.status === 401 || err.status === 403) {
                const refreshTokens = await refreshTokensRequest({
                    token: refreshToken,
                });
                dispatch({
                    type: SET_TOKENS,
                    data: {
                        accessToken: refreshTokens.accessToken,
                        refreshToken: refreshTokens.refreshToken,
                    },
                });
                // Повторяем запрос с новым токеном
                const response = await fetch(`${NORMA_API}${endpoint}`, {
                    method: method,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${refreshTokens.accessToken}`,
                    },
                    body: data,
                });
                // Проверяем результат и возвращаем, если запрос успешен
                return await checkResponse<R>(response);
            } else {
                // Если любая другая ошибка, возвращаем ее
                return Promise.reject(err);
            }
        } catch (error) {
            const err = error as IResponseError;
            // Если при повторном запросе снова ошибка авторизации
            // разлогиниваем пользователя
            if (err.status === 401 || err.status === 403) {
                dispatch({ type: CLEAR_AUTH_SUCCESS });
            }
            return Promise.reject(err);
        }
    }
};

// кастомный запрос
const request = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    const response = await fetch(`${NORMA_API}${endpoint}`, options);
    return checkResponse<T>(response);
};

export const getIngredientsRequest = (): Promise<IIngredientsResponse> => {
    return request<IIngredientsResponse>("/ingredients");
};

export const postOrderRequest = (
    data: TOrder,
    accessToken: string,
    refreshToken: string,
    dispatch: TAppDispatch
): Promise<IOrderResponse> => {
    return requestWithTokensRefresh<IOrderResponse>(
        "/orders",
        "POST",
        JSON.stringify(data),
        accessToken,
        refreshToken,
        dispatch
    );
};

export const setAuthRequest = (data: TAuth, type: TAuthType): Promise<ISetAuthResponse> => {
    return request<ISetAuthResponse>(`/auth/${type}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

export const clearAuthRequest = (data: TToken): Promise<IResponseMessage> => {
    return request<IResponseMessage>("/auth/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

export const getUserDataRequest = (token: string): Promise<IUserDataResponse> => {
    return request<IUserDataResponse>("/auth/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
    });
};

export const refreshTokensRequest = (data: TToken): Promise<IRefreshTokensResponse> => {
    return request<IRefreshTokensResponse>("/auth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

export const restorePassRequest = (data: TEmail): Promise<IResponseMessage> => {
    return request<IResponseMessage>("/password-reset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

export const resetPassRequest = (data: TRestorePass): Promise<IResponseMessage> => {
    return request<IResponseMessage>("/password-reset/reset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

export const patchUserRequest = (
    data: TAuth,
    accessToken: string,
    refreshToken: string,
    dispatch: TAppDispatch
): Promise<IUserDataResponse> => {
    return requestWithTokensRefresh<IUserDataResponse>(
        "/auth/user",
        "PATCH",
        JSON.stringify(data),
        accessToken,
        refreshToken,
        dispatch
    );
};
