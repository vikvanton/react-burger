/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataRequest, refreshTokensRequest } from "./api";
import {
    AUTH_REQUEST,
    CLEAR_AUTH_REQUEST,
    SET_TOKENS,
    SET_USER_DATA,
    CLEAR_AUTH_SUCCESS,
} from "../services/actions/authActions";
// Хук для проверки авторизации
export const useCheckAuth = () => {
    const { accessToken, refreshToken } = useSelector((state) => ({
        accessToken: state.auth.accessToken,
        refreshToken: state.auth.refreshToken,
    }));
    const [checking, setChecking] = useState(true);
    const dispatch = useDispatch();

    const getDataAndTokens = useCallback(async (accessToken, refreshToken) => {
        try {
            // Получаем данные пользователя если есть аксесстокен
            if (accessToken) {
                let userData = await getUserDataRequest(accessToken);
                dispatch({ type: SET_USER_DATA, data: userData.user });
                return true;
            } else throw new Error();
        } catch {
            // Если ошибка при получении данных пользователя или нет аксесстокена
            try {
                // Обновлем токены
                let refreshTokens = await refreshTokensRequest({
                    token: refreshToken,
                });
                // Получаем данные
                let userData = await getUserDataRequest(
                    refreshTokens.accessToken
                );
                dispatch({ type: SET_USER_DATA, data: userData.user });
                dispatch({
                    type: SET_TOKENS,
                    data: {
                        accessToken: refreshTokens.accessToken,
                        refreshToken: refreshTokens.refreshToken,
                    },
                });
                return true;
            } catch {
                return false;
            }
        }
    }, []);

    const checkAuth = useCallback(async () => {
        let result;
        dispatch({ type: AUTH_REQUEST });
        // Если есть аксесстокен или рефрештокен пытаемся получить данные пользователя
        if (accessToken || refreshToken) {
            result = await getDataAndTokens(accessToken, refreshToken);
            // Если попытка неуспешна разлогиниваем пользователя
            !result && dispatch({ type: CLEAR_AUTH_SUCCESS });
        } else {
            result = false;
        }
        dispatch({ type: CLEAR_AUTH_REQUEST });
        setChecking(false);
        return result;
    }, []);

    return { checking, checkAuth };
};
