import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import {
    ConstructorElement,
    DragIcon,
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor(props) {
    const { bun, list } = props.usedIngredients;
    return (
        <section className={`${styles.section} ml-5 mr-5 pt-25 pl-4 pr-4`}>
            <ul className={`${styles.list}`}>
                <li className={`${styles.bun}`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                        extraClass={styles.element}
                    />
                </li>
                <ul
                    className={`${styles.list} ${styles.container} custom-scroll mr-8`}
                >
                    {list.map((item) => (
                        <li className={`${styles.item} mr-2`} key={item._id}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image_mobile}
                                extraClass={styles.element}
                            />
                        </li>
                    ))}
                </ul>
                <li className={`${styles.bun}`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                        extraClass={styles.element}
                    />
                </li>
            </ul>
            <span className={`${styles.summary} mt-10`}>
                <span className={`${styles.text} mr-10`}>
                    <span className="text text_type_digits-medium pr-2">
                        {"7500"}
                    </span>
                    <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </span>
        </section>
    );
}

const propObjectShape = PropTypes.shape({
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
});

BurgerConstructor.propTypes = {
    usedIngredients: PropTypes.shape({
        bun: propObjectShape.isRequired,
        list: PropTypes.arrayOf(propObjectShape).isRequired,
    }),
};

export default BurgerConstructor;
