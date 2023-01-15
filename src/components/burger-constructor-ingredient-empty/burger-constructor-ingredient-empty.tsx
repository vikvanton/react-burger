import { memo } from "react";
import styles from "./burger-constructor-ingredient-empty.module.css";
import { TIngredientType } from "../../utils/types";

interface IBurgerConstructorIngredientEmptyProps {
    type?: TIngredientType;
}

function BurgerConstructorIngredientEmpty({
    type,
}: IBurgerConstructorIngredientEmptyProps): JSX.Element {
    const element: JSX.Element = (
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

export default memo(BurgerConstructorIngredientEmpty);
