import { forwardRef } from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients-category.module.css";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import { ingredientShape } from "../../utils/data-prop-types";

const BurgerIngredientsCategoryRef = forwardRef(
    function BurgerIngredientsCategory(
        { ingredients, name, addToConstructor, extraClass },
        ref
    ) {
        return (
            <article ref={ref} className={extraClass || null}>
                <h2 className="text text_type_main-medium mb-6">{name}</h2>
                <ul className={`${styles.grid} ml-4 mr-4`}>
                    {ingredients.map((item) => (
                        <BurgerIngredientsItem
                            key={item._id}
                            ingredient={item}
                            addToConstructor={addToConstructor}
                        />
                    ))}
                </ul>
            </article>
        );
    }
);

BurgerIngredientsCategoryRef.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientShape.isRequired).isRequired,
    name: PropTypes.string.isRequired,
    addToConstructor: PropTypes.func.isRequired,
    extraClass: PropTypes.string,
};

BurgerIngredientsCategoryRef.defaultProps = {
    extraClass: "",
};

export default BurgerIngredientsCategoryRef;
