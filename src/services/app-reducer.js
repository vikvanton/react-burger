import { v4 } from "uuid";
import {
    ADD_INGREDIENTS,
    ADD_TO_CONSTRUCTOR,
    REMOVE_FROM_CONSTRUCTOR,
    CLEAR_CONSTRUCTOR,
    SAVE_ORDER_NUMBER,
} from "./app-actions";

// Начальное состояние
export const initialState = {
    // Ингредиенты, разбитые по категориям
    // Мне кажется, так будет более оптимально для изменения
    // состояния ингредиентов и ререндере компонентов категорий
    ingredients: {
        bun: [],
        main: [],
        sauce: [],
    },
    // Конструктор, отдельно хранит булку, список ингредиентов и общую сумму заказа
    constructor: {
        bun: null,
        list: [],
        totalSum: 0,
    },
    // Номер заказа
    orderNumber: null,
};
// Редьюсер
export const appReducer = (state, action) => {
    switch (action.type) {
        // Добавление ингредиентов и их сортировка по категориям
        case ADD_INGREDIENTS: {
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
                ingredients: {
                    bun: bun,
                    main: main,
                    sauce: sauce,
                },
            };
        }
        // Добавление в конструктор ингредиента
        case ADD_TO_CONSTRUCTOR: {
            // Если ингредиент булка и еще нет булки в конструкторе
            if (action.data.type === "bun" && !state.constructor.bun) {
                return {
                    ...state,
                    constructor: {
                        ...state.constructor,
                        bun: action.data,
                        totalSum:
                            state.constructor.totalSum + action.data.price * 2,
                    },
                    ingredients: {
                        ...state.ingredients,
                        bun: changeItemCounter(
                            state.ingredients.bun,
                            action.data._id,
                            "+"
                        ),
                    },
                };
                // Если ингредиент булка и уже есть булка в конструкторе (замена булки)
            } else if (
                action.data.type === "bun" &&
                state.constructor.bun._id !== action.data._id
            ) {
                return {
                    ...state,
                    constructor: {
                        ...state.constructor,
                        bun: action.data,
                        totalSum:
                            state.constructor.totalSum -
                            state.constructor.bun.price * 2 +
                            action.data.price * 2,
                    },
                    ingredients: {
                        ...state.ingredients,
                        bun: exchangeBunCounter(
                            state.ingredients.bun,
                            state.constructor.bun._id,
                            action.data._id
                        ),
                    },
                };
                // Остальные типы ингредиентов
            } else if (action.data.type !== "bun") {
                return {
                    ...state,
                    constructor: {
                        ...state.constructor,
                        list: [
                            ...state.constructor.list,
                            { ...action.data, uuid: v4() },
                        ],
                        totalSum:
                            state.constructor.totalSum + action.data.price,
                    },
                    ingredients: {
                        ...state.ingredients,
                        [action.data.type]: changeItemCounter(
                            state.ingredients[action.data.type],
                            action.data._id,
                            "+"
                        ),
                    },
                };
            } else {
                return state;
            }
        }
        // Удаление из конструктора ингредиента
        case REMOVE_FROM_CONSTRUCTOR: {
            return {
                ...state,
                constructor: {
                    ...state.constructor,
                    list: state.constructor.list.filter(
                        (item) => item.uuid !== action.data.uuid
                    ),
                    totalSum: state.constructor.totalSum - action.data.price,
                },
                ingredients: {
                    ...state.ingredients,
                    [action.data.type]: changeItemCounter(
                        state.ingredients[action.data.type],
                        action.data._id,
                        "-"
                    ),
                },
            };
        }
        // Очистка конструктора после отправки заказа на сервер
        case CLEAR_CONSTRUCTOR: {
            return {
                ...state,
                constructor: {
                    bun: null,
                    list: [],
                    totalSum: 0,
                },
                ingredients: clearItemCounter(state.ingredients),
            };
        }
        // Сохранение номера заказа
        case SAVE_ORDER_NUMBER: {
            return {
                ...state,
                orderNumber: action.data,
            };
        }
        default:
            return state;
    }
};
// Ф-ция изменения счетчиков ингредиентов при замене булок
const exchangeBunCounter = (ingredients, oldBunId, newBunId) =>
    ingredients.map((item) => {
        if (item._id === oldBunId) {
            return {
                ...item,
                count: item.count - 1,
            };
        } else if (item._id === newBunId) {
            return {
                ...item,
                count: item.count + 1,
            };
        } else {
            return item;
        }
    });
// Ф-ция изменения счетчика ингредиента при добавлении/удалении в/из конструктор(а)
const changeItemCounter = (ingredients, _id, operation) =>
    ingredients.map((item) => {
        if (item._id === _id) {
            return {
                ...item,
                count: operation === "+" ? item.count + 1 : item.count - 1,
            };
        } else {
            return item;
        }
    });
// Ф-ция очистки счетчиков ингредиентов
const clearItemCounter = (ingredients) => {
    const newIngredients = {};
    for (let category in ingredients) {
        // Флаг изменения счетчика у ингредиентов категории
        let isChanged = false;
        newIngredients[category] = ingredients[category].map((item) => {
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
        if (!isChanged) newIngredients[category] = ingredients[category];
    }
    return newIngredients;
};
