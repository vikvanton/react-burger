import { restorePassRequest, resetPassRequest } from "../../utils/api";

export const PASS_RESTORATION_REQUEST = "PASS_RESTORATION_REQUEST";
export const RESTORE_PASS_SUCCESS = "RESTORE_PASS_SUCCESS";
export const RESET_PASS_SUCCESS = "RESET_PASS_SUCCESS";
export const PASS_RESTORATION_END = "PASS_RESTORATION_END";
export const PASS_RESTORATION_ERROR = "PASS_RESTORATION_ERROR";
export const CLEAR_PASS_RESTORATION_ERROR = "CLEAR_PASS_RESTORATION_ERROR";

export const restorePass = (data) => {
    return (dispatch) => {
        dispatch({ type: PASS_RESTORATION_REQUEST });
        restorePassRequest(data)
            .then((result) => {
                if (result.success) {
                    dispatch({
                        type: RESTORE_PASS_SUCCESS,
                    });
                }
            })
            .catch(() =>
                dispatch({
                    type: PASS_RESTORATION_ERROR,
                    data: "Ошибка соединения с сервером",
                })
            );
    };
};

export const resetPass = (data) => {
    return (dispatch) => {
        dispatch({ type: PASS_RESTORATION_REQUEST });
        resetPassRequest(data)
            .then((result) => {
                if (result.success) {
                    dispatch({
                        type: RESET_PASS_SUCCESS,
                    });
                }
            })
            .catch((error) =>
                dispatch({
                    type: PASS_RESTORATION_ERROR,
                    data: error?.message
                        ? error.message === "Incorrect reset token"
                            ? "Неверный код восстановления"
                            : error.message
                        : "Ошибка соединения с сервером",
                })
            );
    };
};
