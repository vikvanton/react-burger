import React from "react";
import PropTypes from "prop-types";
import { rawIngredientShape } from "../../utils/data-prop-types";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";

function BurgerIngredients({ ingredients }) {
    const [current, setCurrent] = React.useState("bun");
    const [categories, setCategories] = React.useState({
        bun: [],
        main: [],
        sauce: [],
    });
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const bun = [];
        const main = [];
        const sauce = [];
        ingredients.forEach((item, index) => {
            const newItem = {
                ...item,
                count:
                    index === 0 ||
                    index === 1 ||
                    index === 2 ||
                    index === 3 ||
                    index === 4 ||
                    index === 5 ||
                    index === 7 ||
                    index === 10
                        ? 1
                        : 0,
            };
            switch (item.type) {
                case "bun":
                    bun.push(newItem);
                    break;
                case "main":
                    main.push(newItem);
                    break;
                case "sauce":
                    sauce.push(newItem);
                    break;
                default:
            }
        });
        setCategories({
            bun,
            main,
            sauce,
        });
        setLoading(false);
    }, []);

    return (
        <>
            {!loading && (
                <section className={`${styles.section} ml-5 mr-5`}>
                    <h1 className={`text text_type_main-large mt-10 mb-5`}>
                        Соберите бургер
                    </h1>
                    <div className={`${styles.tabs} mb-10`}>
                        <Tab
                            value="bun"
                            active={current === "bun"}
                            onClick={setCurrent}
                        >
                            Булки
                        </Tab>
                        <Tab
                            value="sauce"
                            active={current === "sauce"}
                            onClick={setCurrent}
                        >
                            Соусы
                        </Tab>
                        <Tab
                            value="main"
                            active={current === "main"}
                            onClick={setCurrent}
                        >
                            Начинки
                        </Tab>
                    </div>
                    <div className={`${styles.container} custom-scroll`}>
                        <BurgerIngredientsCategory
                            ingredients={categories.bun}
                            name="Булки"
                            extraClass="mb-10"
                        />
                        <BurgerIngredientsCategory
                            ingredients={categories.sauce}
                            name="Соусы"
                            extraClass="mb-10"
                        />
                        <BurgerIngredientsCategory
                            ingredients={categories.main}
                            name="Начинки"
                        />
                    </div>
                </section>
            )}
        </>
    );
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(rawIngredientShape.isRequired).isRequired,
};

export default BurgerIngredients;
