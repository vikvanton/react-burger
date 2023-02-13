import {
    ORDERS_CONNECTION_CLOSED,
    ORDERS_CONNECTION_SUCCESS,
    ORDERS_ERROR,
    ORDERS_GET_MESSAGE,
    TOrdersActions,
} from "../actions/orders";
import { ordersReducer } from "./orders";

describe("orders reducer test", () => {
    it("should return the initial state", () => {
        expect(ordersReducer(undefined, {} as TOrdersActions)).toEqual({
            orders: [],
            total: 0,
            totalToday: 0,
            socketConnected: false,
            socketError: "",
        });
    });

    it("should handle ORDERS_CONNECTION_SUCCESS", () => {
        expect(
            ordersReducer(
                {
                    orders: [],
                    total: 0,
                    totalToday: 0,
                    socketConnected: false,
                    socketError: "",
                },
                { type: ORDERS_CONNECTION_SUCCESS }
            )
        ).toEqual({
            orders: [],
            total: 0,
            totalToday: 0,
            socketConnected: true,
            socketError: "",
        });
    });

    it("should handle ORDERS_ERROR", () => {
        expect(
            ordersReducer(
                {
                    orders: [],
                    total: 0,
                    totalToday: 0,
                    socketConnected: true,
                    socketError: "",
                },
                { type: ORDERS_ERROR, data: "Socket connection error" }
            )
        ).toEqual({
            orders: [],
            total: 0,
            totalToday: 0,
            socketConnected: false,
            socketError: "Socket connection error",
        });
    });

    it("should handle ORDERS_GET_MESSAGE", () => {
        expect(
            ordersReducer(
                {
                    orders: [],
                    total: 0,
                    totalToday: 0,
                    socketConnected: true,
                    socketError: "",
                },
                {
                    type: ORDERS_GET_MESSAGE,
                    data: {
                        success: true,
                        orders: [
                            {
                                _id: "",
                                ingredients: ["", ""],
                                status: "",
                                name: "",
                                createdAt: "",
                                updatedAt: "",
                                number: 0,
                            },
                        ],
                        total: 1,
                        totalToday: 1,
                    },
                }
            )
        ).toEqual({
            orders: [
                {
                    _id: "",
                    ingredients: ["", ""],
                    status: "",
                    name: "",
                    createdAt: "",
                    updatedAt: "",
                    number: 0,
                },
            ],
            total: 1,
            totalToday: 1,
            socketConnected: true,
            socketError: "",
        });
    });

    it("should handle ORDERS_CONNECTION_CLOSED", () => {
        expect(
            ordersReducer(
                {
                    orders: [
                        {
                            _id: "",
                            ingredients: ["", ""],
                            status: "",
                            name: "",
                            createdAt: "",
                            updatedAt: "",
                            number: 0,
                        },
                    ],
                    total: 1,
                    totalToday: 1,
                    socketConnected: true,
                    socketError: "",
                },
                {
                    type: ORDERS_CONNECTION_CLOSED,
                }
            )
        ).toEqual({
            orders: [],
            total: 0,
            totalToday: 0,
            socketConnected: false,
            socketError: "",
        });
    });
});
