const NORMA_API = "https://norma.nomoreparties.space/api";

const checkResponse = (response) => {
    return response.ok ? response.json() : Promise.reject();
};

export const getIngredients = async () => {
    const response = await fetch(`${NORMA_API}/ingredients`);
    return checkResponse(response);
};
