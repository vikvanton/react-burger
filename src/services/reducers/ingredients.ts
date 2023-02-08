import { TCategories, TCountOperation, TIngredient } from "../../utils/types";
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
    INC_INGREDIENT_COUNTER,
    DEC_INGREDIENT_COUNTER,
    CLEAR_INGREDIENTS_COUNTERS,
    TIngredientsActions,
} from "../actions/ingredients";
import { BUN, MAIN, SAUCE } from "../../utils/consts";

type TIngredientsState = {
    categories: TCategories;
    ingredientsRequest: boolean;
    ingredientsError: string;
};

// Начальное состояние
const initialState: TIngredientsState = {
    // Ингредиенты, разбитые по категориям
    // Мне кажется, так будет более оптимально при изменении состояния ингредиентов
    categories: {
        bun: [],
        main: [],
        sauce: [],
    },
    ingredientsRequest: false,
    ingredientsError: "",
};

// Редьюсер ингредиентов
export const ingredientsReducer = (
    state = initialState,
    action: TIngredientsActions
): TIngredientsState => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsError: "",
            };
        }
        // Добавление ингредиентов и их сортировка по категориям
        case GET_INGREDIENTS_SUCCESS: {
            const bun: Array<TIngredient> = [];
            const main: Array<TIngredient> = [];
            const sauce: Array<TIngredient> = [];
            action.data.forEach((item) => {
                // Добавление счетчика каждому ингредиенту
                const newElem: TIngredient = { ...item, count: 0 };
                switch (item.type) {
                    case BUN:
                        bun.push(newElem);
                        break;
                    case MAIN:
                        main.push(newElem);
                        break;
                    case SAUCE:
                        sauce.push(newElem);
                        break;
                    default:
                }
            });
            return {
                ...state,
                categories: {
                    bun,
                    main,
                    sauce,
                },
                ingredientsRequest: false,
            };
        }
        case GET_INGREDIENTS_ERROR: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsError: action.data,
            };
        }
        // Увеличение счетчика ингредиента при добавлении в конструктор
        case INC_INGREDIENT_COUNTER: {
            // Если ингредиент булка и ее еще нет в конструкторе
            if (action.data.type === BUN && !action.data.count) {
                return {
                    ...state,
                    categories: {
                        ...state.categories,
                        bun: changeBunCounter(state.categories.bun, action.data.id),
                    },
                };
                // Остальные типы ингредиентов
            } else if (action.data.type !== BUN) {
                return {
                    ...state,
                    categories: {
                        ...state.categories,
                        [action.data.type]: changeIngredientCounter(
                            state.categories[action.data.type as keyof typeof state.categories],
                            action.data.id,
                            "+"
                        ),
                    },
                };
            } else {
                return state;
            }
        }
        // Уменьшение счетчика ингредиента при удалении из конструктора
        case DEC_INGREDIENT_COUNTER: {
            return {
                ...state,
                categories: {
                    ...state.categories,
                    [action.data.type]: changeIngredientCounter(
                        state.categories[action.data.type as keyof typeof state.categories],
                        action.data.id,
                        "-"
                    ),
                },
            };
        }
        // Очистка счетчиков ингредиентов после отправки заказа на сервер
        case CLEAR_INGREDIENTS_COUNTERS: {
            return {
                ...state,
                categories: clearIngredientsCounters(state.categories),
            };
        }
        default:
            return state;
    }
};

// Ф-ция изменения счетчиков ингредиентов при замене булок
const changeBunCounter = (
    bun: ReadonlyArray<TIngredient>,
    id: string
): ReadonlyArray<TIngredient> =>
    bun.map((item) => {
        if (item._id === id) {
            return {
                ...item,
                count: item.count + 2,
            };
        } else if (item.count) {
            return {
                ...item,
                count: 0,
            };
        } else {
            return item;
        }
    });

// Ф-ция изменения счетчика ингредиента при добавлении/удалении в/из конструктор(а)
const changeIngredientCounter = (
    ingredients: ReadonlyArray<TIngredient>,
    id: string,
    operation: TCountOperation
): ReadonlyArray<TIngredient> =>
    ingredients.map((item) => {
        if (item._id === id) {
            return {
                ...item,
                count: operation === "+" ? item.count + 1 : item.count - 1,
            };
        } else {
            return item;
        }
    });

// Ф-ция очистки счетчиков ингредиентов
const clearIngredientsCounters = (categories: TCategories): TCategories => {
    const newCategories: TCategories = { bun: [], main: [], sauce: [] };
    let category: keyof typeof newCategories;
    for (category in categories) {
        // Флаг изменения счетчика у ингредиентов категории
        let isChanged: boolean = false;
        newCategories[category] = categories[category].map((item) => {
            if (item.count) {
                if (!isChanged) isChanged = true;
                return {
                    ...item,
                    count: 0,
                };
            } else {
                return item;
            }
        });
        // Если счетчики ингредиентов категории не менялись, то оставляем старый массив категории
        if (!isChanged) newCategories[category] = categories[category];
    }
    return newCategories;
};
