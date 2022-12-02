import { useState } from "react";
import { categorizedIngredientShape } from "../../utils/data-prop-types";
import styles from "./burger-ingredients-item.module.css";
import {
    CurrencyIcon,
    Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function BurgerIngredientsItem({ ingredient }) {
    const [modal, setModal] = useState(false);

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    return (
        <>
            <li className={styles.card} onClick={openModal}>
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
            {modal && (
                <Modal header="Детали ингредиента" onClose={closeModal}>
                    <IngredientDetails ingredient={ingredient} />
                </Modal>
            )}
        </>
    );
}

BurgerIngredientsItem.propTypes = {
    ingredient: categorizedIngredientShape.isRequired,
};

export default BurgerIngredientsItem;
