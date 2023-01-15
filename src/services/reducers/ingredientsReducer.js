import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
    INC_INGREDIENT_COUNTER,
    DEC_INGREDIENT_COUNTER,
    CLEAR_INGREDIENTS_COUNTERS,
} from "../actions/ingredientsActions";

// Начальное состояние
const initialState = {
    // Ингредиенты, разбитые по категориям
    // Мне кажется, так будет более оптимально при изменении состояния ингредиентов
    categories: {
        bun: [],
        main: [],
        sauce: [],
    },
    ingredientsRequest: false,
    ingredientsError: undefined,
};
// Редьюсер ингредиентов
export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsError: undefined,
            };
        }
        // Добавление ингредиентов и их сортировка по категориям
        case GET_INGREDIENTS_SUCCESS: {
            const bun = [];
            const main = [];
            const sauce = [];
            action.data.forEach((item) => {
                // Добавление счетчика каждому ингредиенту
                const newElem = { ...item, count: 0 };
                switch (item.type) {
                    case "bun":
                        bun.push(newElem);
                        break;
                    case "main":
                        main.push(newElem);
                        break;
                    case "sauce":
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
            if (action.data.type === "bun" && !action.data.count) {
                return {
                    ...state,
                    categories: {
                        ...state.categories,
                        bun: changeBunCounter(state.categories.bun, action.data.id),
                    },
                };
                // Остальные типы ингредиентов
            } else if (action.data.type !== "bun") {
                return {
                    ...state,
                    categories: {
                        ...state.categories,
                        [action.data.type]: changeIngredientCounter(
                            state.categories[action.data.type],
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
                        state.categories[action.data.type],
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
const changeBunCounter = (bun, id) =>
    bun.map((item) => {
        if (item._id === id) {
            return {
                ...item,
                count: item.count + 1,
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
const changeIngredientCounter = (ingredients, id, operation) =>
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
const clearIngredientsCounters = (categories) => {
    const newCategories = {};
    for (let category in categories) {
        // Флаг изменения счетчика у ингредиентов категории
        let isChanged = false;
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
