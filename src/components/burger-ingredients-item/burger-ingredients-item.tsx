import { memo } from "react";
import styles from "./burger-ingredients-item.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragPreviewImage, useDrag } from "react-dnd";
import { TIngredient, TOpenModalFunc } from "../../utils/types";
import { SET_VIEW_INGREDIENT } from "../../services/actions/view-in-modal";

interface IBurgerIngredientsItemProps {
    ingredient: TIngredient;
    callback: TOpenModalFunc;
}

function BurgerIngredientsItem({ ingredient, callback }: IBurgerIngredientsItemProps): JSX.Element {
    const [, dragRef, previewRef] = useDrag({
        type: `${ingredient.type === "bun" ? "bun" : "ingredient"}`,
        item: ingredient,
    });

    const onClickHandler = (): void => {
        callback({ type: SET_VIEW_INGREDIENT, data: ingredient }, `/ingredient/${ingredient._id}`);
    };

    return (
        <>
            <li className={styles.card} onClick={onClickHandler}>
                <div ref={dragRef}>
                    {ingredient.count ? (
                        <Counter count={ingredient.count} size="default" extraClass="m-1" />
                    ) : null}
                    <img
                        src={ingredient.image}
                        alt="Indredient"
                        className={`${styles.image} ml-4`}
                    />
                    <DragPreviewImage connect={previewRef} src={ingredient.image} />
                </div>
                <div>
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
