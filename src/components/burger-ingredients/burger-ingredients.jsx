import { useState, useCallback, useRef, useContext, memo } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";
import AppContext from "../../services/app-context";

const MemoTab = memo(Tab);

function BurgerIngredients() {
    const {
        ingredients: { bun, main, sauce },
        dispatch,
    } = useContext(AppContext);
    const [current, setCurrent] = useState("bun");
    const bunRef = useRef();
    const sauceRef = useRef();
    const mainRef = useRef();

    const onTabClick = useCallback((value) => {
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
    }, []);

    const addToConstructor = useCallback(
        (ingredient) => {
            dispatch({ type: "ADD_TO_CONSTRUCTOR", data: ingredient });
        },
        [dispatch]
    );

    return (
        <section className={`${styles.section} ml-5 mr-5`}>
            <h1 className={`text text_type_main-large mt-10 mb-5`}>
                Соберите бургер
            </h1>
            <div className={`${styles.tabs} mb-10`}>
                <MemoTab
                    value="bun"
                    active={current === "bun"}
                    onClick={onTabClick}
                >
                    Булки
                </MemoTab>
                <MemoTab
                    value="sauce"
                    active={current === "sauce"}
                    onClick={onTabClick}
                >
                    Соусы
                </MemoTab>
                <MemoTab
                    value="main"
                    active={current === "main"}
                    onClick={onTabClick}
                >
                    Начинки
                </MemoTab>
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
