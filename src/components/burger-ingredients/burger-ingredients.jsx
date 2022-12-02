import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { rawIngredientShape } from "../../utils/data-prop-types";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";

function BurgerIngredients({ ingredients }) {
    const [current, setCurrent] = useState("bun");
    const [categories, setCategories] = useState({
        bun: [],
        main: [],
        sauce: [],
    });
    const bunRef = useRef();
    const sauceRef = useRef();
    const mainRef = useRef();

    useEffect(() => {
        const bun = [];
        const main = [];
        const sauce = [];
        ingredients.forEach((item, index) => {
            const newItem = {
                ...item,
                count:
                    index === 0 ||
                    index === 2 ||
                    index === 3 ||
                    index === 4 ||
                    index === 5 ||
                    index === 7 ||
                    index === 10 ||
                    index === 11
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
    }, [ingredients]);

    const onTabClick = (value) => {
        let ref;
        switch (value) {
            case "bun":
                ref = bunRef;
                break;
            case "sauce":
                ref = sauceRef;
                break;
            case "main":
                ref = mainRef;
                break;
            default:
        }
        ref.current.scrollIntoView({ behavior: "smooth" });
        setCurrent(value);
    };

    return (
        <section className={`${styles.section} ml-5 mr-5`}>
            <h1 className={`text text_type_main-large mt-10 mb-5`}>
                Соберите бургер
            </h1>
            <div className={`${styles.tabs} mb-10`}>
                <Tab
                    value="bun"
                    active={current === "bun"}
                    onClick={onTabClick}
                >
                    Булки
                </Tab>
                <Tab
                    value="sauce"
                    active={current === "sauce"}
                    onClick={onTabClick}
                >
                    Соусы
                </Tab>
                <Tab
                    value="main"
                    active={current === "main"}
                    onClick={onTabClick}
                >
                    Начинки
                </Tab>
            </div>
            <div className={`${styles.container} custom-scroll`}>
                <BurgerIngredientsCategory
                    ingredients={categories.bun}
                    name="Булки"
                    extraClass="mb-10"
                    ref={bunRef}
                />
                <BurgerIngredientsCategory
                    ingredients={categories.sauce}
                    name="Соусы"
                    extraClass="mb-10"
                    ref={sauceRef}
                />
                <BurgerIngredientsCategory
                    ingredients={categories.main}
                    name="Начинки"
                    ref={mainRef}
                />
            </div>
        </section>
    );
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(rawIngredientShape.isRequired).isRequired,
};

export default BurgerIngredients;
