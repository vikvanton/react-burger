import {
    PASS_RESTORATION_REQUEST,
    RESTORE_PASS_SUCCESS,
    RESET_PASS_SUCCESS,
    PASS_RESTORATION_END,
    PASS_RESTORATION_ERROR,
    CLEAR_PASS_RESTORATION_ERROR,
} from "../actions/passRestorationActions";

const initialState = {
    restorationProcess: false,
    restorationComplete: false,
    passRestorationRequest: false,
    passRestorationError: undefined,
};
// Редьюсер восстановления пароля
export const passRestorationReducer = (state = initialState, action) => {
    switch (action.type) {
        case PASS_RESTORATION_REQUEST: {
            return {
                ...state,
                passRestorationRequest: true,
                passRestorationError: undefined,
            };
        }
        case RESTORE_PASS_SUCCESS: {
            return {
                ...state,
                restorationProcess: true,
                passRestorationRequest: false,
            };
        }
        case RESET_PASS_SUCCESS: {
            return {
                ...state,
                restorationComplete: true,
                passRestorationRequest: false,
            };
        }
        case PASS_RESTORATION_END: {
            return initialState;
        }
        case PASS_RESTORATION_ERROR: {
            return {
                ...state,
                passRestorationRequest: false,
                passRestorationError: action.data,
            };
        }
        case CLEAR_PASS_RESTORATION_ERROR: {
            return {
                ...state,
                passRestorationError: undefined,
            };
        }
        default:
            return state;
    }
};
