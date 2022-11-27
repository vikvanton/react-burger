import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients-category.module.css";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import { categorizedIngredientShape } from "../../utils/data-prop-types";

function BurgerIngredientsCategory({ ingredients, name, extraClass }) {
    return (
        <article className={extraClass || null}>
            <h2 className="text text_type_main-medium mb-6">{name}</h2>
            <ul className={`${styles.grid} ml-4 mr-4`}>
                {ingredients.map((item) => (
                    <BurgerIngredientsItem key={item._id} ingredient={item} />
                ))}
            </ul>
        </article>
    );
}

BurgerIngredientsCategory.propTypes = {
    ingredients: PropTypes.arrayOf(categorizedIngredientShape.isRequired)
        .isRequired,
    name: PropTypes.string.isRequired,
    extraClass: PropTypes.string,
};

BurgerIngredientsCategory.defaultProps = {
    extraClass: "",
};

export default BurgerIngredientsCategory;
