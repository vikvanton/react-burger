import { restorePassRequest, resetPassRequest } from "../../utils/api";
import { TAppThunk, TEmail, TResetPassForm } from "../../utils/types";

export const PASS_RESTORATION_REQUEST: "PASS_RESTORATION_REQUEST" = "PASS_RESTORATION_REQUEST";
export const RESTORE_PASS_SUCCESS: "RESTORE_PASS_SUCCESS" = "RESTORE_PASS_SUCCESS";
export const RESET_PASS_SUCCESS: "RESET_PASS_SUCCESS" = "RESET_PASS_SUCCESS";
export const PASS_RESTORATION_END: "PASS_RESTORATION_END" = "PASS_RESTORATION_END";
export const PASS_RESTORATION_ERROR: "PASS_RESTORATION_ERROR" = "PASS_RESTORATION_ERROR";
export const CLEAR_PASS_RESTORATION_ERROR: "CLEAR_PASS_RESTORATION_ERROR" =
    "CLEAR_PASS_RESTORATION_ERROR";

export interface IPassRestorationRequest {
    readonly type: typeof PASS_RESTORATION_REQUEST;
}

export interface IRestorePassSuccess {
    readonly type: typeof RESTORE_PASS_SUCCESS;
}

export interface IResetPassSuccess {
    readonly type: typeof RESET_PASS_SUCCESS;
}

export interface IPassRestorationEnd {
    readonly type: typeof PASS_RESTORATION_END;
}

export interface IPassRestorationError {
    readonly type: typeof PASS_RESTORATION_ERROR;
    readonly data: string;
}

export interface IClearPassRestorationError {
    readonly type: typeof CLEAR_PASS_RESTORATION_ERROR;
}

export type TPassRestorationActions =
    | IPassRestorationRequest
    | IRestorePassSuccess
    | IResetPassSuccess
    | IPassRestorationEnd
    | IPassRestorationError
    | IClearPassRestorationError;

export const restorePass = (data: TEmail): TAppThunk => {
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
            .catch((error) =>
                dispatch({
                    type: PASS_RESTORATION_ERROR,
                    data: error.message,
                })
            );
    };
};

export const resetPass = (data: TResetPassForm<string>): TAppThunk => {
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
                    data:
                        error.message === "Incorrect reset token"
                            ? "Неверный код восстановления"
                            : error.message,
                })
            );
    };
};
