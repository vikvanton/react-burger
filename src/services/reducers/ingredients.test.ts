import {
    CLEAR_INGREDIENTS_COUNTERS,
    DEC_INGREDIENT_COUNTER,
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    INC_INGREDIENT_COUNTER,
    TIngredientsActions,
} from "../actions/ingredients";
import { ingredientsReducer } from "./ingredients";

describe("ingredients reducer test", () => {
    it("should return the initial state", () => {
        expect(ingredientsReducer(undefined, {} as TIngredientsActions)).toEqual({
            categories: {
                bun: [],
                main: [],
                sauce: [],
            },
            ingredientsRequest: false,
            ingredientsError: "",
        });
    });

    it("should handle GET_INGREDIENTS_REQUEST", () => {
        expect(
            ingredientsReducer(
                {
                    categories: {
                        bun: [],
                        main: [],
                        sauce: [],
                    },
                    ingredientsRequest: false,
                    ingredientsError: "",
                },
                { type: GET_INGREDIENTS_REQUEST }
            )
        ).toEqual({
            categories: {
                bun: [],
                main: [],
                sauce: [],
            },
            ingredientsRequest: true,
            ingredientsError: "",
        });
    });

    it("should handle GET_INGREDIENTS_SUCCESS: add to categories main", () => {
        expect(
            ingredientsReducer(
                {
                    categories: {
                        bun: [],
                        main: [],
                        sauce: [],
                    },
                    ingredientsRequest: true,
                    ingredientsError: "",
                },
                {
                    type: GET_INGREDIENTS_SUCCESS,
                    data: [
                        {
                            _id: "1",
                            name: "",
                            type: "main",
                            proteins: 1,
                            fat: 1,
                            carbohydrates: 1,
                            calories: 1,
                            price: 1,
                            image: "",
                            image_mobile: "",
                            image_large: "",
                            __v: 1,
                        },
                    ],
                }
            )
        ).toEqual({
            categories: {
                bun: [],
                main: [
                    {
                        _id: "1",
                        name: "",
                        type: "main",
                        proteins: 1,
                        fat: 1,
                        carbohydrates: 1,
                        calories: 1,
                        price: 1,
                        image: "",
                        image_mobile: "",
                        image_large: "",
                        __v: 1,
                        count: 0,
                    },
                ],
                sauce: [],
            },
            ingredientsRequest: false,
            ingredientsError: "",
        });
    });

    it("should handle GET_INGREDIENTS_SUCCESS: add to categories bun", () => {
        expect(
            ingredientsReducer(
                {
                    categories: {
                        bun: [],
                        main: [],
                        sauce: [],
                    },
                    ingredientsRequest: true,
                    ingredientsError: "",
                },
                {
                    type: GET_INGREDIENTS_SUCCESS,
                    data: [
                        {
                            _id: "1",
                            name: "",
                            type: "bun",
                            proteins: 1,
                            fat: 1,
                            carbohydrates: 1,
                            calories: 1,
                            price: 1,
                            image: "",
                            image_mobile: "",
                            image_large: "",
                            __v: 1,
                        },
                    ],
                }
            )
        ).toEqual({
            categories: {
                bun: [
                    {
                        _id: "1",
                        name: "",
                        type: "bun",
                        proteins: 1,
                        fat: 1,
                        carbohydrates: 1,
                        calories: 1,
                        price: 1,
                        image: "",
                        image_mobile: "",
                        image_large: "",
                        __v: 1,
                        count: 0,
                    },
                ],
                main: [],
                sauce: [],
            },
            ingredientsRequest: false,
            ingredientsError: "",
        });
    });

    it("should handle GET_INGREDIENTS_SUCCESS: add to categories sauce", () => {
        expect(
            ingredientsReducer(
                {
                    categories: {
                        bun: [],
                        main: [],
                        sauce: [],
                    },
                    ingredientsRequest: true,
                    ingredientsError: "",
                },
                {
                    type: GET_INGREDIENTS_SUCCESS,
                    data: [
                        {
                            _id: "1",
                            name: "",
                            type: "sauce",
                            proteins: 1,
                            fat: 1,
                            carbohydrates: 1,
                            calories: 1,
                            price: 1,
                            image: "",
                            image_mobile: "",
                            image_large: "",
                            __v: 1,
                        },
                    ],
                }
            )
        ).toEqual({
            categories: {
                bun: [],
                main: [],
                sauce: [
                    {
                        _id: "1",
                        name: "",
                        type: "sauce",
                        proteins: 1,
                        fat: 1,
                        carbohydrates: 1,
                        calories: 1,
                        price: 1,
                        image: "",
                        image_mobile: "",
                        image_large: "",
                        __v: 1,
                        count: 0,
                    },
                ],
            },
            ingredientsRequest: false,
            ingredientsError: "",
        });
    });

    it("should handle GET_INGREDIENTS_ERROR", () => {
        expect(
            ingredientsReducer(
                {
                    categories: {
                        bun: [],
                        main: [],
                        sauce: [],
                    },
                    ingredientsRequest: true,
                    ingredientsError: "",
                },
                { type: GET_INGREDIENTS_ERROR, data: "Ingredients error" }
            )
        ).toEqual({
            categories: {
                bun: [],
                main: [],
                sauce: [],
            },
            ingredientsRequest: false,
            ingredientsError: "Ingredients error",
        });
    });

    it("should handle INC_INGREDIENT_COUNTER: inc count when not bun", () => {
        expect(
            ingredientsReducer(
                {
                    categories: {
                        bun: [],
                        main: [
                            {
                                _id: "1",
                                name: "",
                                type: "main",
                                proteins: 1,
                                fat: 1,
                                carbohydrates: 1,
                                calories: 1,
                                price: 1,
                                image: "",
                                image_mobile: "",
                                image_large: "",
                                __v: 1,
                                count: 0,
                            },
                        ],
                        sauce: [],
                    },
                    ingredientsRequest: false,
                    ingredientsError: "",
                },
                {
                    type: INC_INGREDIENT_COUNTER,
                    data: {
                        type: "main",
                        id: "1",
                        count: 0,
                    },
                }
            )
        ).toEqual({
            categories: {
                bun: [],
                main: [
                    {
                        _id: "1",
                        name: "",
                        type: "main",
                        proteins: 1,
                        fat: 1,
                        carbohydrates: 1,
                        calories: 1,
                        price: 1,
                        image: "",
                        image_mobile: "",
                        image_large: "",
                        __v: 1,
                        count: 1,
                    },
                ],
                sauce: [],
            },
            ingredientsRequest: false,
            ingredientsError: "",
        });
    });

    it("should handle INC_INGREDIENT_COUNTER: inc count when add new bun", () => {
        expect(
            ingredientsReducer(
                {
                    categories: {
                        bun: [
                            {
                                _id: "1",
                                name: "",
                                type: "bun",
                                proteins: 1,
                                fat: 1,
                                carbohydrates: 1,
                                calories: 1,
                                price: 1,
                                image: "",
                                image_mobile: "",
                                image_large: "",
                                __v: 1,
                                count: 0,
                            },
                            {
                                _id: "2",
                                name: "",
                                type: "bun",
                                proteins: 1,
                                fat: 1,
                                carbohydrates: 1,
                                calories: 1,
                                price: 1,
                                image: "",
                                image_mobile: "",
                                image_large: "",
                                __v: 1,
                                count: 2,
                            },
                            {
                                _id: "3",
                                name: "",
                                type: "bun",
                                proteins: 1,
                                fat: 1,
                                carbohydrates: 1,
                                calories: 1,
                                price: 1,
                                image: "",
                                image_mobile: "",
                                image_large: "",
                                __v: 1,
                                count: 0,
                            },
                        ],
                        main: [],
                        sauce: [],
                    },
                    ingredientsRequest: false,
                    ingredientsError: "",
                },
                {
                    type: INC_INGREDIENT_COUNTER,
                    data: {
                        type: "bun",
                        id: "1",
                        count: 0,
                    },
                }
            )
        ).toEqual({
            categories: {
                bun: [
                    {
                        _id: "1",
                        name: "",
                        type: "bun",
                        proteins: 1,
                        fat: 1,
                        carbohydrates: 1,
                        calories: 1,
                        price: 1,
                        image: "",
                        image_mobile: "",
                        image_large: "",
                        __v: 1,
                        count: 2,
                    },
                    {
                        _id: "2",
                        name: "",
                        type: "bun",
                        proteins: 1,
                        fat: 1,
                        carbohydrates: 1,
                        calories: 1,
                        price: 1,
                        image: "",
                        image_mobile: "",
                        image_large: "",
                        __v: 1,
                        count: 0,
                    },
                    {
                        _id: "3",
                        name: "",
                        type: "bun",
                        proteins: 1,
                        fat: 1,
                        carbohydrates: 1,
                        calories: 1,
                        price: 1,
                        image: "",
                        image_mobile: "",
                        image_large: "",
                        __v: 1,
                        count: 0,
                    },
                ],
                main: [],
                sauce: [],
            },
            ingredientsRequest: false,
            ingredientsError: "",
        });
    });

    it("should handle INC_INGREDIENT_COUNTER: when bun already added", () => {
        expect(
            ingredientsReducer(
                {
                    categories: {
                        bun: [
                            {
                                _id: "1",
                                name: "",
                                type: "bun",
                                proteins: 1,
                                fat: 1,
                                carbohydrates: 1,
                                calories: 1,
                                price: 1,
                                image: "",
                                image_mobile: "",
                                image_large: "",
                                __v: 1,
                                count: 2,
                            },
                        ],
                        main: [],
                        sauce: [],
                    },
                    ingredientsRequest: false,
                    ingredientsError: "",
                },
                {
                    type: INC_INGREDIENT_COUNTER,
                    data: {
                        type: "bun",
                        id: "1",
                        count: 2,
                    },
                }
            )
        ).toEqual({
            categories: {
                bun: [
                    {
                        _id: "1",
                        name: "",
                        type: "bun",
                        proteins: 1,
                        fat: 1,
                        carbohydrates: 1,
                        calories: 1,
                        price: 1,
                        image: "",
                        image_mobile: "",
                        image_large: "",
                        __v: 1,
                        count: 2,
                    },
                ],
                main: [],
                sauce: [],
            },
            ingredientsRequest: false,
            ingredientsError: "",
        });
    });

    it("should handle DEC_INGREDIENT_COUNTER", () => {
        expect(
            ingredientsReducer(
                {
                    categories: {
                        bun: [],
                        main: [
                            {
                                _id: "1",
                                name: "",
                                type: "main",
                                proteins: 1,
                                fat: 1,
                                carbohydrates: 1,
                                calories: 1,
                                price: 1,
                                image: "",
                                image_mobile: "",
                                image_large: "",
                                __v: 1,
                                count: 1,
                            },
                            {
                                _id: "2",
                                name: "",
                                type: "main",
                                proteins: 1,
                                fat: 1,
                                carbohydrates: 1,
                                calories: 1,
                                price: 1,
                                image: "",
                                image_mobile: "",
                                image_large: "",
                                __v: 1,
                                count: 1,
                            },
                        ],
                        sauce: [],
                    },
                    ingredientsRequest: false,
                    ingredientsError: "",
                },
                {
                    type: DEC_INGREDIENT_COUNTER,
                    data: {
                        type: "main",
                        id: "1",
                    },
                }
            )
        ).toEqual({
            categories: {
                bun: [],
                main: [
                    {
                        _id: "1",
                        name: "",
                        type: "main",
                        proteins: 1,
                        fat: 1,
                        carbohydrates: 1,
                        calories: 1,
                        price: 1,
                        image: "",
                        image_mobile: "",
                        image_large: "",
                        __v: 1,
                        count: 0,
                    },
                    {
                        _id: "2",
                        name: "",
                        type: "main",
                        proteins: 1,
                        fat: 1,
                        carbohydrates: 1,
                        calories: 1,
                        price: 1,
                        image: "",
                        image_mobile: "",
                        image_large: "",
                        __v: 1,
                        count: 1,
                    },
                ],
                sauce: [],
            },
            ingredientsRequest: false,
            ingredientsError: "",
        });
    });

    it("should handle CLEAR_INGREDIENTS_COUNTERS", () => {
        expect(
            ingredientsReducer(
                {
                    categories: {
                        bun: [
                            {
                                _id: "1",
                                name: "",
                                type: "bun",
                                proteins: 1,
                                fat: 1,
                                carbohydrates: 1,
                                calories: 1,
                                price: 1,
                                image: "",
                                image_mobile: "",
                                image_large: "",
                                __v: 1,
                                count: 2,
                            },
                            {
                                _id: "2",
                                name: "",
                                type: "bun",
                                proteins: 1,
                                fat: 1,
                                carbohydrates: 1,
                                calories: 1,
                                price: 1,
                                image: "",
                                image_mobile: "",
                                image_large: "",
                                __v: 1,
                                count: 0,
                            },
                        ],
                        main: [
                            {
                                _id: "3",
                                name: "",
                                type: "main",
                                proteins: 1,
                                fat: 1,
                                carbohydrates: 1,
                                calories: 1,
                                price: 1,
                                image: "",
                                image_mobile: "",
                                image_large: "",
                                __v: 1,
                                count: 5,
                            },
                            {
                                _id: "4",
                                name: "",
                                type: "main",
                                proteins: 1,
                                fat: 1,
                                carbohydrates: 1,
                                calories: 1,
                                price: 1,
                                image: "",
                                image_mobile: "",
                                image_large: "",
                                __v: 1,
                                count: 0,
                            },
                        ],
                        sauce: [
                            {
                                _id: "5",
                                name: "",
                                type: "sauce",
                                proteins: 1,
                                fat: 1,
                                carbohydrates: 1,
                                calories: 1,
                                price: 1,
                                image: "",
                                image_mobile: "",
                                image_large: "",
                                __v: 1,
                                count: 0,
                            },
                            {
                                _id: "6",
                                name: "",
                                type: "sauce",
                                proteins: 1,
                                fat: 1,
                                carbohydrates: 1,
                                calories: 1,
                                price: 1,
                                image: "",
                                image_mobile: "",
                                image_large: "",
                                __v: 1,
                                count: 0,
                            },
                        ],
                    },
                    ingredientsRequest: false,
                    ingredientsError: "",
                },
                {
                    type: CLEAR_INGREDIENTS_COUNTERS,
                }
            )
        ).toEqual({
            categories: {
                bun: [
                    {
                        _id: "1",
                        name: "",
                        type: "bun",
                        proteins: 1,
                        fat: 1,
                        carbohydrates: 1,
                        calories: 1,
                        price: 1,
                        image: "",
                        image_mobile: "",
                        image_large: "",
                        __v: 1,
                        count: 0,
                    },
                    {
                        _id: "2",
                        name: "",
                        type: "bun",
                        proteins: 1,
                        fat: 1,
                        carbohydrates: 1,
                        calories: 1,
                        price: 1,
                        image: "",
                        image_mobile: "",
                        image_large: "",
                        __v: 1,
                        count: 0,
                    },
                ],
                main: [
                    {
                        _id: "3",
                        name: "",
                        type: "main",
                        proteins: 1,
                        fat: 1,
                        carbohydrates: 1,
                        calories: 1,
                        price: 1,
                        image: "",
                        image_mobile: "",
                        image_large: "",
                        __v: 1,
                        count: 0,
                    },
                    {
                        _id: "4",
                        name: "",
                        type: "main",
                        proteins: 1,
                        fat: 1,
                        carbohydrates: 1,
                        calories: 1,
                        price: 1,
                        image: "",
                        image_mobile: "",
                        image_large: "",
                        __v: 1,
                        count: 0,
                    },
                ],
                sauce: [
                    {
                        _id: "5",
                        name: "",
                        type: "sauce",
                        proteins: 1,
                        fat: 1,
                        carbohydrates: 1,
                        calories: 1,
                        price: 1,
                        image: "",
                        image_mobile: "",
                        image_large: "",
                        __v: 1,
                        count: 0,
                    },
                    {
                        _id: "6",
                        name: "",
                        type: "sauce",
                        proteins: 1,
                        fat: 1,
                        carbohydrates: 1,
                        calories: 1,
                        price: 1,
                        image: "",
                        image_mobile: "",
                        image_large: "",
                        __v: 1,
                        count: 0,
                    },
                ],
            },
            ingredientsRequest: false,
            ingredientsError: "",
        });
    });
});
