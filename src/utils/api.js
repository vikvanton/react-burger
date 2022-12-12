const NORMA_API = "https://norma.nomoreparties.space/api";

const checkResponse = (response) => {
    return response.ok ? response.json() : Promise.reject();
};

export const getIngredients = async () => {
    const response = await fetch(`${NORMA_API}/ingredients`);
    return checkResponse(response);
};

export const createOrder = async (data) => {
    const response = await fetch(`${NORMA_API}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return checkResponse(response);
};
