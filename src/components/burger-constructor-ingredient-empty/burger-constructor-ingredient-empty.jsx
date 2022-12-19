import PropTypes from "prop-types";
import styles from "./burger-constructor-ingredient-empty.module.css";

function BurgerConstructorIngredientEmpty({ type }) {
    const element = (
        <div
            className={`${styles.elementEmpty} ${
                type ? (type === "top" ? styles.top : styles.bottom) : ""
            } text text_type_main-default text_color_inactive`}
        >
            <span>{type ? "Перетащите булку" : "Перетащите ингредиенты"}</span>
        </div>
    );

    if (type) {
        return element;
    } else {
        return <li className={`${styles.ingredient}`}>{element}</li>;
    }
}

BurgerConstructorIngredientEmpty.propTypes = {
    type: PropTypes.oneOf(["top", "bottom"]),
};

BurgerConstructorIngredientEmpty.defaultProps = {
    type: undefined,
};

export default BurgerConstructorIngredientEmpty;
