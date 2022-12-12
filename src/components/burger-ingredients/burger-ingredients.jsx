import { useState, useCallback, useRef, useContext } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";
import AppContext from "../../services/app-context";
import { ADD_TO_CONSTRUCTOR } from "../../services/app-actions";

const bunTab = "bun";
const mainTab = "main";
const sauceTab = "sauce";

function BurgerIngredients() {
    const {
        ingredients: { bun, main, sauce },
        dispatch,
    } = useContext(AppContext);
    const [current, setCurrent] = useState(bunTab);
    const bunRef = useRef();
    const sauceRef = useRef();
    const mainRef = useRef();

    const onTabClick = useCallback((value) => {
        let ref;
        switch (value) {
            case bunTab:
                ref = bunRef;
                break;
            case sauceTab:
                ref = sauceRef;
                break;
            case mainTab:
                ref = mainRef;
                break;
            default:
        }
        ref.current.scrollIntoView({ behavior: "smooth" });
        setCurrent(value);
    }, []);

    const addToConstructor = useCallback(
        (ingredient) => {
            dispatch({ type: ADD_TO_CONSTRUCTOR, data: ingredient });
        },
        [dispatch]
    );

    return (
        <section className={`${styles.section} ml-5 mr-5`}>
            <h1 className={`text text_type_main-large mt-10 mb-5`}>
                Соберите бургер
            </h1>
            <div className={`${styles.tabs} mb-10`}>
                <Tab
                    value={bunTab}
                    active={current === bunTab}
                    onClick={onTabClick}
                >
                    Булки
                </Tab>
                <Tab
                    value={sauceTab}
                    active={current === sauceTab}
                    onClick={onTabClick}
                >
                    Соусы
                </Tab>
                <Tab
                    value={mainTab}
                    active={current === mainTab}
                    onClick={onTabClick}
                >
                    Начинки
                </Tab>
            </div>
            <div className={`${styles.container} custom-scroll`}>
                <BurgerIngredientsCategory
                    ingredients={bun}
                    name="Булки"
                    addToConstructor={addToConstructor}
                    extraClass="mb-10"
                    ref={bunRef}
                />
                <BurgerIngredientsCategory
                    ingredients={sauce}
                    name="Соусы"
                    addToConstructor={addToConstructor}
                    extraClass="mb-10"
                    ref={sauceRef}
                />
                <BurgerIngredientsCategory
                    ingredients={main}
                    name="Начинки"
                    addToConstructor={addToConstructor}
                    ref={mainRef}
                />
            </div>
        </section>
    );
}

export default BurgerIngredients;
