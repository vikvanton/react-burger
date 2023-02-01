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
import { CLEAR_AUTH_SUCCESS, SET_TOKENS } from "../services/actions/authActions";

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

// fetch с обновлением токенов
const fetchWithTokensRefresh = async <R>(
    url: string,
    method: string,
    data: string,
    accessToken: string,
    refreshToken: string,
    dispatch: TAppDispatch
): Promise<R> => {
    // Отправляем запрос с токеном авторизации
    const response = await fetch(url, {
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
                const response = await fetch(url, {
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

export const getIngredientsRequest = async (): Promise<IIngredientsResponse> => {
    const response = await fetch(`${NORMA_API}/ingredients`);
    return checkResponse<IIngredientsResponse>(response);
};

export const postOrderRequest = async (
    data: TOrder,
    accessToken: string,
    refreshToken: string,
    dispatch: TAppDispatch
): Promise<IOrderResponse> => {
    return fetchWithTokensRefresh<IOrderResponse>(
        `${NORMA_API}/orders`,
        "POST",
        JSON.stringify(data),
        accessToken,
        refreshToken,
        dispatch
    );
};

export const setAuthRequest = async (data: TAuth, type: TAuthType): Promise<ISetAuthResponse> => {
    const response = await fetch(`${NORMA_API}/auth/${type}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return checkResponse<ISetAuthResponse>(response);
};

export const clearAuthRequest = async (data: TToken): Promise<IResponseMessage> => {
    const response = await fetch(`${NORMA_API}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return checkResponse<IResponseMessage>(response);
};

export const getUserDataRequest = async (token: string): Promise<IUserDataResponse> => {
    const response = await fetch(`${NORMA_API}/auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
    });
    return checkResponse<IUserDataResponse>(response);
};

export const refreshTokensRequest = async (data: TToken): Promise<IRefreshTokensResponse> => {
    const response = await fetch(`${NORMA_API}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return checkResponse<IRefreshTokensResponse>(response);
};

export const restorePassRequest = async (data: TEmail): Promise<IResponseMessage> => {
    const response = await fetch(`${NORMA_API}/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return checkResponse<IResponseMessage>(response);
};

export const resetPassRequest = async (data: TRestorePass): Promise<IResponseMessage> => {
    const response = await fetch(`${NORMA_API}/password-reset/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return checkResponse<IResponseMessage>(response);
};

export const patchUserRequest = async (
    data: TAuth,
    accessToken: string,
    refreshToken: string,
    dispatch: TAppDispatch
): Promise<IUserDataResponse> => {
    return fetchWithTokensRefresh<IUserDataResponse>(
        `${NORMA_API}/auth/user`,
        "PATCH",
        JSON.stringify(data),
        accessToken,
        refreshToken,
        dispatch
    );
};
