import React from "react";
import { categorizedIngredientShape } from "../../utils/data-prop-types";
import styles from "./burger-ingredients-item.module.css";
import {
    CurrencyIcon,
    Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredientsItem({ ingredient }) {
    return (
        <li className={styles.card}>
            {ingredient.count ? (
                <Counter
                    count={ingredient.count}
                    size="default"
                    extraClass="m-1"
                />
            ) : null}
            <img src={ingredient.image} alt="Indredient" className="ml-4" />
            <p className={`${styles.price} mt-2 mb-2`}>
                <span className="text text_type_digits-default pr-2">
                    {ingredient.price}
                </span>
                <CurrencyIcon type="primary" />
            </p>
            <p className={`${styles.name} text text_type_main-small`}>
                {ingredient.name}
            </p>
        </li>
    );
}

BurgerIngredientsItem.propTypes = {
    ingredient: categorizedIngredientShape.isRequired,
};

export default BurgerIngredientsItem;
