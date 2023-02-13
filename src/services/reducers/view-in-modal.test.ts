import { TIngredient, TOrderDeatiledInfo } from "../../utils/types";
import { SET_VIEW_INGREDIENT, SET_VIEW_ORDER, TViewInModalActions } from "../actions/view-in-modal";
import { viewInModalReduser } from "./view-in-modal";

describe("view-in-modal reducer test", () => {
    const mockIngredient: TIngredient = {
        _id: "",
        name: "",
        type: "",
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: "",
        image_mobile: "",
        image_large: "",
        __v: 0,
        count: 0,
    };
    const mockOrder: TOrderDeatiledInfo = {
        _id: "",
        ingredients: [],
        status: "",
        name: "",
        createdAt: "",
        updatedAt: "",
        number: 0,
        orderSum: 0,
    };

    it("should return the initial state", () => {
        expect(viewInModalReduser(undefined, {} as TViewInModalActions)).toEqual({
            ingredientInModal: null,
            orderInModal: null,
        });
    });

    it("should handle SET_VIEW_INGREDIENT", () => {
        expect(
            viewInModalReduser(
                {
                    ingredientInModal: null,
                    orderInModal: null,
                },
                { type: SET_VIEW_INGREDIENT, data: mockIngredient }
            )
        ).toEqual({
            ingredientInModal: mockIngredient,
            orderInModal: null,
        });
    });

    it("should handle SET_VIEW_ORDER", () => {
        expect(
            viewInModalReduser(
                {
                    ingredientInModal: mockIngredient,
                    orderInModal: null,
                },
                { type: SET_VIEW_ORDER, data: mockOrder }
            )
        ).toEqual({
            ingredientInModal: null,
            orderInModal: mockOrder,
        });
    });
});
