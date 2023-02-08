import {
    PASS_RESTORATION_REQUEST,
    RESTORE_PASS_SUCCESS,
    RESET_PASS_SUCCESS,
    PASS_RESTORATION_END,
    PASS_RESTORATION_ERROR,
    CLEAR_PASS_RESTORATION_ERROR,
    TPassRestorationActions,
} from "../actions/pass-restoration";

type TPassRestorationState = {
    restorationProcess: boolean;
    restorationComplete: boolean;
    passRestorationRequest: boolean;
    passRestorationError: string;
};

const initialState: TPassRestorationState = {
    restorationProcess: false,
    restorationComplete: false,
    passRestorationRequest: false,
    passRestorationError: "",
};

// Редьюсер восстановления пароля
export const passRestorationReducer = (
    state = initialState,
    action: TPassRestorationActions
): TPassRestorationState => {
    switch (action.type) {
        case PASS_RESTORATION_REQUEST: {
            return {
                ...state,
                passRestorationRequest: true,
                passRestorationError: "",
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
                passRestorationError: "",
            };
        }
        default:
            return state;
    }
};
