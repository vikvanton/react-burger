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
} from "./types";
import { NORMA_API } from "./consts";

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

export const getIngredientsRequest = async (): Promise<IIngredientsResponse> => {
    const response: Response = await fetch(`${NORMA_API}/ingredients`);
    return checkResponse<IIngredientsResponse>(response);
};

export const postOrderRequest = async (data: TOrder): Promise<IOrderResponse> => {
    const response: Response = await fetch(`${NORMA_API}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return checkResponse<IOrderResponse>(response);
};

export const setAuthRequest = async (data: TAuth, type: TAuthType): Promise<ISetAuthResponse> => {
    const response: Response = await fetch(`${NORMA_API}/auth/${type}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return checkResponse<ISetAuthResponse>(response);
};

export const clearAuthRequest = async (data: TToken): Promise<IResponseMessage> => {
    const response: Response = await fetch(`${NORMA_API}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return checkResponse<IResponseMessage>(response);
};

export const getUserDataRequest = async (token: string): Promise<IUserDataResponse> => {
    const response: Response = await fetch(`${NORMA_API}/auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
    });
    return checkResponse<IUserDataResponse>(response);
};

export const refreshTokensRequest = async (data: TToken): Promise<IRefreshTokensResponse> => {
    const response: Response = await fetch(`${NORMA_API}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return checkResponse<IRefreshTokensResponse>(response);
};

export const restorePassRequest = async (data: TEmail): Promise<IResponseMessage> => {
    const response: Response = await fetch(`${NORMA_API}/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return checkResponse<IResponseMessage>(response);
};

export const resetPassRequest = async (data: TRestorePass): Promise<IResponseMessage> => {
    const response: Response = await fetch(`${NORMA_API}/password-reset/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return checkResponse<IResponseMessage>(response);
};

export const patchUserRequest = async (data: TAuth, token: string): Promise<IUserDataResponse> => {
    const response: Response = await fetch(`${NORMA_API}/auth/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        body: JSON.stringify(data),
    });
    return checkResponse<IUserDataResponse>(response);
};
