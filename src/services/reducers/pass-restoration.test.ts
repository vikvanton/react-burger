import {
    CLEAR_PASS_RESTORATION_ERROR,
    PASS_RESTORATION_END,
    PASS_RESTORATION_ERROR,
    PASS_RESTORATION_REQUEST,
    RESET_PASS_SUCCESS,
    RESTORE_PASS_SUCCESS,
    TPassRestorationActions,
} from "../actions/pass-restoration";
import { passRestorationReducer } from "./pass-restoration";

describe("pass-restoration reducer test", () => {
    it("should return the initial state", () => {
        expect(passRestorationReducer(undefined, {} as TPassRestorationActions)).toEqual({
            restorationProcess: false,
            restorationComplete: false,
            passRestorationRequest: false,
            passRestorationError: "",
        });
    });

    it("should handle PASS_RESTORATION_REQUEST", () => {
        expect(
            passRestorationReducer(
                {
                    restorationProcess: false,
                    restorationComplete: false,
                    passRestorationRequest: false,
                    passRestorationError: "",
                },
                { type: PASS_RESTORATION_REQUEST }
            )
        ).toEqual({
            restorationProcess: false,
            restorationComplete: false,
            passRestorationRequest: true,
            passRestorationError: "",
        });
    });

    it("should handle RESTORE_PASS_SUCCESS", () => {
        expect(
            passRestorationReducer(
                {
                    restorationProcess: false,
                    restorationComplete: false,
                    passRestorationRequest: true,
                    passRestorationError: "",
                },
                { type: RESTORE_PASS_SUCCESS }
            )
        ).toEqual({
            restorationProcess: true,
            restorationComplete: false,
            passRestorationRequest: false,
            passRestorationError: "",
        });
    });

    it("should handle RESET_PASS_SUCCESS", () => {
        expect(
            passRestorationReducer(
                {
                    restorationProcess: true,
                    restorationComplete: false,
                    passRestorationRequest: true,
                    passRestorationError: "",
                },
                { type: RESET_PASS_SUCCESS }
            )
        ).toEqual({
            restorationProcess: true,
            restorationComplete: true,
            passRestorationRequest: false,
            passRestorationError: "",
        });
    });

    it("should handle PASS_RESTORATION_END", () => {
        expect(
            passRestorationReducer(
                {
                    restorationProcess: true,
                    restorationComplete: true,
                    passRestorationRequest: false,
                    passRestorationError: "",
                },
                { type: PASS_RESTORATION_END }
            )
        ).toEqual({
            restorationProcess: false,
            restorationComplete: false,
            passRestorationRequest: false,
            passRestorationError: "",
        });
    });

    it("should handle PASS_RESTORATION_ERROR", () => {
        expect(
            passRestorationReducer(
                {
                    restorationProcess: false,
                    restorationComplete: false,
                    passRestorationRequest: true,
                    passRestorationError: "",
                },
                { type: PASS_RESTORATION_ERROR, data: "Error message" }
            )
        ).toEqual({
            restorationProcess: false,
            restorationComplete: false,
            passRestorationRequest: false,
            passRestorationError: "Error message",
        });
    });

    it("should handle CLEAR_PASS_RESTORATION_ERROR", () => {
        expect(
            passRestorationReducer(
                {
                    restorationProcess: false,
                    restorationComplete: false,
                    passRestorationRequest: false,
                    passRestorationError: "Error message",
                },
                { type: CLEAR_PASS_RESTORATION_ERROR }
            )
        ).toEqual({
            restorationProcess: false,
            restorationComplete: false,
            passRestorationRequest: false,
            passRestorationError: "",
        });
    });
});
