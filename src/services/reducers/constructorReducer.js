import {
    ADD_TO_CONSTRUCTOR,
    REMOVE_FROM_CONSTRUCTOR,
    CLEAR_CONSTRUCTOR,
    EXCHANGE_INGREDIENTS,
} from "../actions/constructorActions";

// Начальное состояние
const initialState = {
    // Конструктор, отдельно хранит булку и список ингредиентов
    bun: null,
    list: [],
};
// Редьюсер конструктора
export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        // Добавление в конструктор ингредиента
        case ADD_TO_CONSTRUCTOR: {
            // Если ингредиент булка и ее еще нет в конструкторе
            if (action.data.type === "bun" && !action.data.count) {
                return {
                    ...state,
                    bun: action.data,
                };
                // Остальные типы ингредиентов
            } else if (action.data.type !== "bun") {
                return {
                    ...state,
                    list: [...state.list, action.data],
                };
            } else {
                return state;
            }
        }
        // Удаление из конструктора ингредиента
        case REMOVE_FROM_CONSTRUCTOR: {
            return {
                ...state,
                list: state.list.filter((item) => item.uuid !== action.data),
            };
        }
        // Очистка конструктора после отправки заказа на сервер
        case CLEAR_CONSTRUCTOR: {
            return {
                bun: null,
                list: [],
            };
        }
        // Изменение порядка ингредиентов в конструкторе при сортировке
        case EXCHANGE_INGREDIENTS: {
            const newList = [...state.list];
            let dragItemIndex, dropItemIndex;
            newList.forEach((item, index) => {
                if (item.uuid === action.data.dragItemId) dragItemIndex = index;
                if (item.uuid === action.data.dropItemId) dropItemIndex = index;
            });
            const [dragItem] = newList.splice(dragItemIndex, 1);
            newList.splice(dropItemIndex, 0, dragItem);
            return {
                ...state,
                list: newList,
            };
        }
        default:
            return state;
    }
};
