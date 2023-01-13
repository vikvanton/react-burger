/* eslint-disable react-hooks/exhaustive-deps */
import {
    useCallback,
    useState,
    useEffect,
    useRef,
    Dispatch,
    SetStateAction,
    RefObject,
    MutableRefObject,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataRequest, refreshTokensRequest } from "./api";
import {
    AUTH_REQUEST,
    CLEAR_AUTH_REQUEST,
    SET_TOKENS,
    SET_USER_DATA,
    CLEAR_AUTH_SUCCESS,
} from "../services/actions/authActions";
import { selectAccessToken, selectRefreshToken } from "../services/selectors/authSelectors";
import { IRefreshTokensResponse, IUserDataResponse } from "./types";

// Хук для проверки авторизации
export const useCheckAuth = (): {
    checking: boolean;
    checkAuth: () => Promise<boolean>;
} => {
    const accessToken: string = useSelector<any, string>(selectAccessToken);
    const refreshToken: string = useSelector<any, string>(selectRefreshToken);
    const [checking, setChecking] = useState<boolean>(true);
    const dispatch: any = useDispatch<any>();

    const getDataAndTokens = useCallback(
        async (accessToken: string, refreshToken: string): Promise<boolean> => {
            try {
                // Получаем данные пользователя если есть аксесстокен
                if (accessToken) {
                    let userData: IUserDataResponse = await getUserDataRequest(accessToken);
                    dispatch({ type: SET_USER_DATA, data: userData.user });
                    return true;
                } else throw new Error();
            } catch {
                // Если ошибка при получении данных пользователя или нет аксесстокена
                try {
                    // Обновлем токены
                    let refreshTokens: IRefreshTokensResponse = await refreshTokensRequest({
                        token: refreshToken,
                    });
                    // Получаем данные
                    let userData: IUserDataResponse = await getUserDataRequest(
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
        },
        []
    );

    const checkAuth = useCallback(async (): Promise<boolean> => {
        let result: boolean;
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

export const useIntersectionObserver = (
    containerRef: RefObject<HTMLElement>,
    targetRefs: Array<RefObject<HTMLElement>>,
    targetNames: Array<string>,
    setCurrent: Dispatch<SetStateAction<string>>
): void => {
    const observer: MutableRefObject<IntersectionObserver | undefined> =
        useRef<IntersectionObserver>();

    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries: Array<IntersectionObserverEntry>) => {
                entries.forEach((entry: IntersectionObserverEntry) => {
                    if (entry.isIntersecting) {
                        targetRefs.forEach((targetRef: RefObject<HTMLElement>, index: number) => {
                            targetRef.current === entry.target && setCurrent(targetNames[index]);
                        });
                    }
                });
            },
            {
                root: containerRef.current,
                rootMargin: "-20% 0% -70% 0%",
            }
        );
        targetRefs.forEach((targetRef) => {
            observer.current?.observe(targetRef.current as Element);
        });
        return () => {
            observer.current?.disconnect();
        };
    }, []);
};
