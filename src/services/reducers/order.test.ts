import {
    CLEAR_ORDER_ERROR,
    CLEAR_ORDER_NUMBER,
    POST_ORDER_ERROR,
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    SET_ORDER_ERROR,
    TOrderActions,
} from "../actions/order";
import { orderReducer } from "./order";

describe("order reducer test", () => {
    it("should return the initial state", () => {
        expect(orderReducer(undefined, {} as TOrderActions)).toEqual({
            orderNumber: 0,
            orderRequest: false,
            orderError: "",
        });
    });

    it("should handle POST_ORDER_REQUEST", () => {
        expect(
            orderReducer(
                {
                    orderNumber: 0,
                    orderRequest: false,
                    orderError: "",
                },
                {
                    type: POST_ORDER_REQUEST,
                }
            )
        ).toEqual({
            orderNumber: 0,
            orderRequest: true,
            orderError: "",
        });
    });

    it("should handle POST_ORDER_SUCCESS", () => {
        expect(
            orderReducer(
                {
                    orderNumber: 0,
                    orderRequest: true,
                    orderError: "",
                },
                {
                    type: POST_ORDER_SUCCESS,
                    data: 1,
                }
            )
        ).toEqual({
            orderNumber: 1,
            orderRequest: false,
            orderError: "",
        });
    });

    it("should handle POST_ORDER_ERROR", () => {
        expect(
            orderReducer(
                {
                    orderNumber: 0,
                    orderRequest: true,
                    orderError: "",
                },
                {
                    type: POST_ORDER_ERROR,
                    data: "Order error",
                }
            )
        ).toEqual({
            orderNumber: 0,
            orderRequest: false,
            orderError: "Order error",
        });
    });

    it("should handle SET_ORDER_ERROR", () => {
        expect(
            orderReducer(
                {
                    orderNumber: 0,
                    orderRequest: false,
                    orderError: "",
                },
                {
                    type: SET_ORDER_ERROR,
                    data: "Order error",
                }
            )
        ).toEqual({
            orderNumber: 0,
            orderRequest: false,
            orderError: "Order error",
        });
    });

    it("should handle CLEAR_ORDER_ERROR", () => {
        expect(
            orderReducer(
                {
                    orderNumber: 0,
                    orderRequest: false,
                    orderError: "Order error",
                },
                {
                    type: CLEAR_ORDER_ERROR,
                }
            )
        ).toEqual({
            orderNumber: 0,
            orderRequest: false,
            orderError: "",
        });
    });

    it("should handle CLEAR_ORDER_NUMBER", () => {
        expect(
            orderReducer(
                {
                    orderNumber: 1,
                    orderRequest: false,
                    orderError: "",
                },
                {
                    type: CLEAR_ORDER_NUMBER,
                }
            )
        ).toEqual({
            orderNumber: 0,
            orderRequest: false,
            orderError: "",
        });
    });
});
