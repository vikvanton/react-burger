import { memo } from "react";
import PropTypes from "prop-types";
import { ingredientShape } from "../../utils/data-prop-types";
import styles from "./burger-ingredients-item.module.css";
import {
    CurrencyIcon,
    Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, DragPreviewImage } from "react-dnd";

function BurgerIngredientsItem({ ingredient, callback }) {
    const [, dragRef, previewRef] = useDrag({
        type: `${ingredient.type === "bun" ? "bun" : "ingredient"}`,
        item: ingredient,
    });

    const onClickHandler = () => {
        callback(ingredient);
    };

    return (
        <>
            <li className={styles.card}>
                {ingredient.count ? (
                    <Counter
                        count={ingredient.count}
                        size="default"
                        extraClass="m-1"
                    />
                ) : null}
                <img
                    ref={dragRef}
                    src={ingredient.image}
                    alt="Indredient"
                    className={`${styles.image} ml-4`}
                />
                <div className={styles.info} onClick={onClickHandler}>
                    <p className={`${styles.price} mt-2 mb-2`}>
                        <span className="text text_type_digits-default pr-2">
                            {ingredient.price}
                        </span>
                        <CurrencyIcon type="primary" />
                    </p>
                    <p className={`${styles.name} text text_type_main-small`}>
                        {ingredient.name}
                    </p>
                </div>
            </li>
            <DragPreviewImage connect={previewRef} src={ingredient.image} />
        </>
    );
}

BurgerIngredientsItem.propTypes = {
    ingredient: ingredientShape.isRequired,
    callback: PropTypes.func.isRequired,
};

export default memo(BurgerIngredientsItem);
