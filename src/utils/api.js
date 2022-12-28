const NORMA_API = "https://norma.nomoreparties.space/api";

const checkResponse = (response) => {
    return response.ok
        ? response.json()
        : response.json().then(
              (result) =>
                  Promise.reject({ ...result, status: response.status }),
              () => Promise.reject()
          );
};

export const getIngredientsRequest = async () => {
    const response = await fetch(`${NORMA_API}/ingredients`);
    return checkResponse(response);
};

export const postOrderRequest = async (data) => {
    const response = await fetch(`${NORMA_API}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return checkResponse(response);
};

export const setAuthRequest = async (data, type) => {
    const response = await fetch(`${NORMA_API}/auth/${type}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return checkResponse(response);
};

export const clearAuthRequest = async (data) => {
    const response = await fetch(`${NORMA_API}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return checkResponse(response);
};

export const getUserDataRequest = async (token) => {
    const response = await fetch(`${NORMA_API}/auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
    });
    return checkResponse(response);
};

export const refreshTokensRequest = async (data) => {
    const response = await fetch(`${NORMA_API}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return checkResponse(response);
};

export const restorePassRequest = async (data) => {
    const response = await fetch(`${NORMA_API}/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return checkResponse(response);
};

export const resetPassRequest = async (data) => {
    const response = await fetch(`${NORMA_API}/password-reset/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return checkResponse(response);
};

export const patchUserRequest = async (data, token) => {
    const response = await fetch(`${NORMA_API}/auth/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        body: JSON.stringify(data),
    });
    return checkResponse(response);
};
