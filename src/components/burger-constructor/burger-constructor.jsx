import React from "react";
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
    const [loading, setLoading] = React.useState(true);
    const [usedIngredients, setUsedIngredients] = React.useState({
        bun: null,
        list: [],
    });

    React.useEffect(() => {
        setUsedIngredients({
            bun: ingredients[0],
            list: [...[1, 2, 3, 4, 5, 7, 10].map((item) => ingredients[item])],
        });
        setLoading(false);
    }, [ingredients]);

    return (
        <>
            {!loading && (
                <section
                    className={`${styles.section} ml-5 mr-5 pt-25 pl-4 pr-4`}
                >
                    <ul className={`${styles.list}`}>
                        <li className={`${styles.bun}`}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${usedIngredients.bun.name} (верх)`}
                                price={usedIngredients.bun.price}
                                thumbnail={usedIngredients.bun.image_mobile}
                                extraClass={styles.element}
                            />
                        </li>
                        <ul
                            className={`${styles.list} ${styles.container} custom-scroll mr-8`}
                        >
                            {usedIngredients.list.map((item) => (
                                <li
                                    className={`${styles.item} mr-2`}
                                    key={item._id}
                                >
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
                                text={`${usedIngredients.bun.name} (низ)`}
                                price={usedIngredients.bun.price}
                                thumbnail={usedIngredients.bun.image_mobile}
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
                        <Button htmlType="button" type="primary" size="large">
                            Оформить заказ
                        </Button>
                    </span>
                </section>
            )}
        </>
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(rawIngredientShape.isRequired).isRequired,
};

export default BurgerConstructor;
