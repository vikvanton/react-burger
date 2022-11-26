import React from "react";
import PropTypes from "prop-types";
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
    ingredient: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
    }).isRequired,
};

export default BurgerIngredientsItem;
