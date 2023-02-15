import {
    ADD_TO_CONSTRUCTOR,
    CLEAR_CONSTRUCTOR,
    EXCHANGE_INGREDIENTS,
    REMOVE_FROM_CONSTRUCTOR,
    TConstructorActions,
} from "../actions/constructor";
import { constructorReducer } from "./constructor";

describe("constructor reducer test", () => {
    it("should return the initial state", () => {
        expect(constructorReducer(undefined, {} as TConstructorActions)).toEqual({
            bun: null,
            list: [],
        });
    });

    it("should handle ADD_TO_CONSTRUCTOR: add to list", () => {
        expect(
            constructorReducer(
                {
                    bun: null,
                    list: [],
                },
                {
                    type: ADD_TO_CONSTRUCTOR,
                    data: {
                        _id: "",
                        name: "",
                        type: "sauce",
                        price: 0,
                        image_mobile: "",
                        uuid: "",
                    },
                }
            )
        ).toEqual({
            bun: null,
            list: [
                {
                    _id: "",
                    name: "",
                    type: "sauce",
                    price: 0,
                    image_mobile: "",
                    uuid: "",
                },
            ],
        });
    });

    it("should handle ADD_TO_CONSTRUCTOR: add new bun", () => {
        expect(
            constructorReducer(
                {
                    bun: null,
                    list: [],
                },
                {
                    type: ADD_TO_CONSTRUCTOR,
                    data: {
                        _id: "1",
                        name: "",
                        type: "bun",
                        price: 0,
                        image_mobile: "",
                        uuid: "",
                    },
                }
            )
        ).toEqual({
            bun: {
                _id: "1",
                name: "",
                type: "bun",
                price: 0,
                image_mobile: "",
                uuid: "",
            },
            list: [],
        });
    });

    it("should handle ADD_TO_CONSTRUCTOR: add already exist bun", () => {
        expect(
            constructorReducer(
                {
                    bun: {
                        _id: "1",
                        name: "",
                        type: "bun",
                        price: 0,
                        image_mobile: "",
                        uuid: "",
                    },
                    list: [],
                },
                {
                    type: ADD_TO_CONSTRUCTOR,
                    data: {
                        _id: "1",
                        name: "",
                        type: "bun",
                        price: 0,
                        image_mobile: "",
                        uuid: "",
                    },
                }
            )
        ).toEqual({
            bun: {
                _id: "1",
                name: "",
                type: "bun",
                price: 0,
                image_mobile: "",
                uuid: "",
            },
            list: [],
        });
    });

    it("should handle REMOVE_FROM_CONSTRUCTOR", () => {
        expect(
            constructorReducer(
                {
                    bun: null,
                    list: [
                        {
                            _id: "",
                            name: "",
                            type: "sauce",
                            price: 0,
                            image_mobile: "",
                            uuid: "1",
                        },
                    ],
                },
                {
                    type: REMOVE_FROM_CONSTRUCTOR,
                    data: "1",
                }
            )
        ).toEqual({
            bun: null,
            list: [],
        });
    });

    it("should handle CLEAR_CONSTRUCTOR", () => {
        expect(
            constructorReducer(
                {
                    bun: {
                        _id: "",
                        name: "",
                        type: "bun",
                        price: 0,
                        image_mobile: "",
                        uuid: "1",
                    },
                    list: [
                        {
                            _id: "",
                            name: "",
                            type: "sauce",
                            price: 0,
                            image_mobile: "",
                            uuid: "2",
                        },
                    ],
                },
                {
                    type: CLEAR_CONSTRUCTOR,
                }
            )
        ).toEqual({
            bun: null,
            list: [],
        });
    });

    it("should handle EXCHANGE_INGREDIENTS", () => {
        expect(
            constructorReducer(
                {
                    bun: null,
                    list: [
                        {
                            _id: "",
                            name: "",
                            type: "sauce",
                            price: 0,
                            image_mobile: "",
                            uuid: "1",
                        },
                        {
                            _id: "",
                            name: "",
                            type: "main",
                            price: 0,
                            image_mobile: "",
                            uuid: "2",
                        },
                    ],
                },
                {
                    type: EXCHANGE_INGREDIENTS,
                    data: { dragItemId: "1", dropItemId: "2" },
                }
            )
        ).toEqual({
            bun: null,
            list: [
                {
                    _id: "",
                    name: "",
                    type: "main",
                    price: 0,
                    image_mobile: "",
                    uuid: "2",
                },
                {
                    _id: "",
                    name: "",
                    type: "sauce",
                    price: 0,
                    image_mobile: "",
                    uuid: "1",
                },
            ],
        });
    });
});
