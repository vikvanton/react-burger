import {
    useCallback,
    useState,
    useEffect,
    useRef,
    Dispatch,
    SetStateAction,
    RefObject,
    useMemo,
} from "react";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { getUserDataRequest, refreshTokensRequest } from "./api";
import { SET_TOKENS, SET_USER_DATA, CLEAR_AUTH_SUCCESS } from "../services/actions/authActions";
import { selectRefreshToken } from "../services/selectors/authSelectors";
import {
    TAppActions,
    TAppDispatch,
    TAppState,
    TCategories,
    TLocationBackgState,
    TOpenModalFunc,
    TOrderIngredient,
} from "./types";
import { useHistory } from "react-router";

export const useAppSelector: TypedUseSelectorHook<TAppState> = useSelector;

export const useAppDispatch = () => useDispatch<TAppDispatch>();

// Хук для проверки авторизации при старте приложения
export const useCheckAuth = (): {
    checking: boolean;
    checkAuth: () => Promise<void>;
} => {
    const refreshToken = useAppSelector(selectRefreshToken);
    const dispatch = useAppDispatch();
    const [checking, setChecking] = useState<boolean>(true);

    const checkAuth = useCallback(async (): Promise<void> => {
        try {
            if (refreshToken) {
                // Обновлем токены
                const refreshTokens = await refreshTokensRequest({
                    token: refreshToken,
                });
                // Получаем данные
                const userData = await getUserDataRequest(refreshTokens.accessToken);
                dispatch({ type: SET_USER_DATA, data: userData.user });
                dispatch({
                    type: SET_TOKENS,
                    data: {
                        accessToken: refreshTokens.accessToken,
                        refreshToken: refreshTokens.refreshToken,
                    },
                });
            }
        } catch {
            // Если ошибка при обновлении токенов или
            // при попытке получения данных пользователя
            // разлогиниваем пользователя
            dispatch({ type: CLEAR_AUTH_SUCCESS });
        } finally {
            setChecking(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { checking, checkAuth };
};

export const useIntersectionObserver = (
    containerRef: RefObject<HTMLElement>,
    targetRefs: Array<RefObject<HTMLElement>>,
    targetNames: Array<string>,
    setCurrent: Dispatch<SetStateAction<string>>
): void => {
    const observer = useRef<IntersectionObserver>();

    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        targetRefs.forEach((targetRef, index) => {
                            targetRef.current === entry.target && setCurrent(targetNames[index]);
                        });
                    }
                });
            },
            {
                root: containerRef.current,
                rootMargin: "-15% 0% -85% 0%",
            }
        );
        targetRefs.forEach((targetRef) => {
            observer.current?.observe(targetRef.current as Element);
        });
        return () => {
            observer.current?.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

// Хук для получения массива с необходимыми данными ингредиентов
// заказа по их айдишникам и подсчета суммы заказа
export const useOrderData = (
    ingredients: Array<string>,
    categories: TCategories
): {
    orderIngredients: Array<TOrderIngredient>;
    orderSum: number;
} => {
    const result = useMemo((): {
        orderIngredients: Array<TOrderIngredient>;
        orderSum: number;
    } => {
        const orderIngredients: Array<TOrderIngredient> = [];
        let orderSum: number = 0;
        let category: keyof typeof categories;
        ingredients.forEach((ingredient) => {
            let index = orderIngredients.findIndex((item) => item._id === ingredient);
            if (index !== -1) {
                orderIngredients[index].count++;
                orderSum += orderIngredients[index].price;
            } else {
                for (category in categories) {
                    let result = categories[category].find((item) => item._id === ingredient);
                    if (result) {
                        orderIngredients.push({
                            _id: result._id,
                            name: result.name,
                            price: result.price,
                            image_mobile: result.image_mobile,
                            count: 1,
                        });
                        orderSum += result.price;
                        break;
                    }
                }
            }
        });
        return { orderIngredients, orderSum };
    }, [categories, ingredients]);

    return result;
};

// Хук для получения функции открытия модального окна
export const useOpenModalFunc = (): TOpenModalFunc => {
    const dispatch = useAppDispatch();
    const history = useHistory<TLocationBackgState>();

    const openModalFunc = useCallback(
        (action: TAppActions, pathname: string): void => {
            dispatch(action);
            history.push({
                pathname: pathname,
                state: { background: history.location },
            });
        },
        [dispatch, history]
    );

    return openModalFunc;
};
