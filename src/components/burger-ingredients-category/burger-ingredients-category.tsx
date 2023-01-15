import { memo } from "react";
import { forwardRef } from "react";
import styles from "./burger-ingredients-category.module.css";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import { TIngredient } from "../../utils/types";

interface IBurgerIngredientsCategoryProps {
    ingredients: Array<TIngredient>;
    name: string;
    callback: (ingredient: TIngredient) => void;
    extraClass?: string;
}

const BurgerIngredientsCategory = forwardRef<HTMLElement, IBurgerIngredientsCategoryProps>(
    function BurgerIngredientsCategory(
        { ingredients, name, callback, extraClass },
        ref
    ): JSX.Element {
        return (
            <article ref={ref} className={extraClass}>
                <h2 className="text text_type_main-medium mb-6">{name}</h2>
                <ul className={`${styles.grid} ml-4 mr-4`}>
                    {ingredients.map((item) => (
                        <BurgerIngredientsItem
                            key={item._id}
                            ingredient={item}
                            callback={callback}
                        />
                    ))}
                </ul>
            </article>
        );
    }
);

export default memo(BurgerIngredientsCategory);
