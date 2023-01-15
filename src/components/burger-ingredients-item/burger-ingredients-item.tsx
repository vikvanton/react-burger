import { memo } from "react";
import styles from "./burger-ingredients-item.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { TIngredient } from "../../utils/types";

interface IBurgerIngredientsItemProps {
    ingredient: TIngredient;
    callback: (ingredient: TIngredient) => void;
}

function BurgerIngredientsItem({ ingredient, callback }: IBurgerIngredientsItemProps): JSX.Element {
    const [, dragRef, previewRef] = useDrag({
        type: `${ingredient.type === "bun" ? "bun" : "ingredient"}`,
        item: ingredient,
    });

    const onClickHandler = (): void => {
        callback(ingredient);
    };

    return (
        <>
            <li className={styles.card}>
                <div ref={dragRef}>
                    {ingredient.count ? (
                        <Counter count={ingredient.count} size="default" extraClass="m-1" />
                    ) : null}
                    <img
                        src={ingredient.image}
                        alt="Indredient"
                        className={`${styles.image} ml-4`}
                    />
                </div>
                <div className={styles.info} onClick={onClickHandler}>
                    <p className={`${styles.price} mt-2 mb-2`}>
                        <span className="text text_type_digits-default pr-2">
                            {ingredient.price}
                        </span>
                        <CurrencyIcon type="primary" />
                    </p>
                    <p className={`${styles.name} text text_type_main-small`}>{ingredient.name}</p>
                </div>
            </li>
        </>
    );
}

export default memo(BurgerIngredientsItem);
