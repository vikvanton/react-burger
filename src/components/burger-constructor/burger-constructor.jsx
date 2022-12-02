import { useState } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import { rawIngredientShape } from "../../utils/data-prop-types";
import styles from "./burger-constructor.module.css";
import {
    ConstructorElement,
    DragIcon,
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor({ ingredients }) {
    const [modal, setModal] = useState(false);

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    return (
        <>
            <section className={`${styles.section} ml-5 mr-5 pt-25 pl-4 pr-4`}>
                <ul className={`${styles.list}`}>
                    <li className={`${styles.bun}`}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${ingredients[0].name} (верх)`}
                            price={ingredients[0].price}
                            thumbnail={ingredients[0].image_mobile}
                            extraClass={styles.element}
                        />
                    </li>
                    <ul
                        className={`${styles.list} ${styles.container} custom-scroll mr-8`}
                    >
                        {[2, 3, 4, 5, 7, 10, 11].map((item) => (
                            <li
                                className={`${styles.item} mr-2`}
                                key={ingredients[item]._id}
                            >
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    text={ingredients[item].name}
                                    price={ingredients[item].price}
                                    thumbnail={ingredients[item].image_mobile}
                                    extraClass={styles.element}
                                />
                            </li>
                        ))}
                    </ul>
                    <li className={`${styles.bun}`}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${ingredients[0].name} (низ)`}
                            price={ingredients[0].price}
                            thumbnail={ingredients[0].image_mobile}
                            extraClass={styles.element}
                        />
                    </li>
                </ul>
                <span className={`${styles.summary} mt-10`}>
                    <span className={`${styles.text} mr-10`}>
                        <span className="text text_type_digits-medium pr-2">
                            7500
                        </span>
                        <CurrencyIcon type="primary" />
                    </span>
                    <Button
                        htmlType="button"
                        type="primary"
                        size="large"
                        onClick={openModal}
                    >
                        Оформить заказ
                    </Button>
                </span>
            </section>
            {modal && (
                <Modal onClose={closeModal}>
                    <OrderDetails />
                </Modal>
            )}
        </>
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(rawIngredientShape.isRequired).isRequired,
};

export default BurgerConstructor;
