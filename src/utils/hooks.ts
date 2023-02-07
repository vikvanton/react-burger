import {
    useCallback,
    useState,
    useEffect,
    useRef,
    Dispatch,
    SetStateAction,
    RefObject,
    useMemo,
    ChangeEvent,
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

// Хук для использования Intersection Observer API
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
// заказа по их айдишникам и подсчета общей суммы заказа
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
        // Массив результатов
        const orderIngredients: Array<TOrderIngredient> = [];
        let orderSum: number = 0;
        let category: keyof typeof categories;
        // Проходим по массиву айдишников ингредиентов
        ingredients.forEach((ingredient) => {
            // Проверяем, нет ли уже такого ингредиента в массиве результатов
            let index = orderIngredients.findIndex((item) => item._id === ingredient);
            // Если есть, то увеличиваем счетчик количества ингредиента и
            // добавляем его стоимость к общей сумме
            if (index !== -1) {
                orderIngredients[index].count++;
                orderSum += orderIngredients[index].price;
                // Если нет, то ищем ингредиент в категориях
            } else {
                for (category in categories) {
                    let result = categories[category].find((item) => item._id === ingredient);
                    // Если нашли в категории, добавляем в массив результатов новый объект
                    // с информацией об ингредиенте и увеличиваем общую сумму
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

// Хук для работы с формой
export const useForm = <T>(
    inputValues: T
): {
    formValues: T;
    formErrors: { [key in keyof T]: boolean };
    setFormValues: Dispatch<SetStateAction<T>>;
    setFormErrors: Dispatch<SetStateAction<{ [key in keyof T]: boolean }>>;
    isFormValid: () => boolean;
    onFieldChange: (e: ChangeEvent<HTMLInputElement>) => void;
} => {
    // Инициализируем объект-состояние полей формы на основе входного объекта
    const [formValues, setFormValues] = useState<T>(inputValues);
    // На основе входного объекта с полями формы создаем объект-состояние
    // для признаков ошибки каждого из полей формы
    const [formErrors, setFormErrors] = useState<{ [key in keyof T]: boolean }>(() => {
        const initialErros: { [key: string]: boolean } = {};
        for (let key in inputValues) {
            initialErros[key] = false;
        }
        return initialErros as { [key in keyof T]: boolean };
    });

    // Ф-ция обработки изменения значения поля формы
    const onFieldChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setFormErrors({ ...formErrors, [e.target.name]: false });
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    // Ф-ция проверки валидности полей формы
    const isFormValid = (): boolean => {
        let isValid: boolean = true;
        const hasFormErrors: { [key: string]: boolean } = {};
        const setFieldError = (key: Extract<keyof T, string>) => {
            hasFormErrors[key] = true;
            isValid = false;
        };
        for (let key in formValues) {
            switch (key) {
                // Если поле пароля, проверяем дополнительно допустимую длину
                case "password":
                    if (
                        !formValues[key] ||
                        (formValues[key] as string).length < 6 ||
                        (formValues[key] as string).length > 15
                    )
                        setFieldError(key);
                    break;
                // Для остальных полей проверяем на пустое значение
                default:
                    if (!formValues[key]) setFieldError(key);
            }
        }
        if (!isValid)
            setFormErrors({ ...formErrors, ...(hasFormErrors as { [key in keyof T]: boolean }) });
        return isValid;
    };

    return { formValues, formErrors, setFormValues, setFormErrors, isFormValid, onFieldChange };
};

// Хук для включения/отключения отображения символов пароля в поле ввода формы
export const useShowPass = (): {
    showPass: boolean;
    setShowPass: Dispatch<SetStateAction<boolean>>;
    onShowPassIconClick: () => void;
} => {
    const [showPass, setShowPass] = useState<boolean>(false);

    const onShowPassIconClick = (): void => {
        setShowPass(!showPass);
    };

    return { showPass, setShowPass, onShowPassIconClick };
};
