import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";

function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState("Булки");

    return (
        <section className={`${styles.section} ml-5 mr-5`}>
            <h1 className={`text text_type_main-large mt-10 mb-5`}>
                Соберите бургер
            </h1>
            <div className={`${styles.tabs} mb-10`}>
                <Tab
                    value="Булки"
                    active={current === "Булки"}
                    onClick={setCurrent}
                >
                    Булки
                </Tab>
                <Tab
                    value="Соусы"
                    active={current === "Соусы"}
                    onClick={setCurrent}
                >
                    Соусы
                </Tab>
                <Tab
                    value="Начинки"
                    active={current === "Начинки"}
                    onClick={setCurrent}
                >
                    Начинки
                </Tab>
            </div>
            <div className={`${styles.container} custom-scroll`}>
                <article className="mb-10">
                    <h2 className="text text_type_main-medium mb-6">Булки</h2>
                    <ul className={`${styles.grid} ml-4 mr-4`}>
                        {props.bun.map((item) => (
                            <BurgerIngredientsItem
                                key={item._id}
                                ingredient={item}
                            />
                        ))}
                    </ul>
                </article>
                <article className="mb-10">
                    <h2 className="text text_type_main-medium mb-6">Соусы</h2>
                    <ul className={`${styles.grid} ml-4 mr-4`}>
                        {props.sauce.map((item) => (
                            <BurgerIngredientsItem
                                key={item._id}
                                ingredient={item}
                            />
                        ))}
                    </ul>
                </article>
                <article>
                    <h2 className="text text_type_main-medium mb-6">Начинки</h2>
                    <ul className={`${styles.grid} ml-4 mr-4`}>
                        {props.main.map((item) => (
                            <BurgerIngredientsItem
                                key={item._id}
                                ingredient={item}
                            />
                        ))}
                    </ul>
                </article>
            </div>
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

BurgerIngredients.propTypes = {
    bun: PropTypes.arrayOf(propObjectShape).isRequired,
    main: PropTypes.arrayOf(propObjectShape).isRequired,
    sauce: PropTypes.arrayOf(propObjectShape).isRequired,
};

export default BurgerIngredients;
