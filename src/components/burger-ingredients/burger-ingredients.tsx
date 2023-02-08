import { useState, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";
import { useIntersectionObserver, useOpenModalFunc } from "../../utils/hooks";
import { selectBun, selectMain, selectSauce } from "../../services/selectors/ingredients";
import { BUN, MAIN, SAUCE } from "../../utils/consts";
import { useAppSelector } from "../../utils/hooks";

function BurgerIngredients(): JSX.Element {
    const bun = useAppSelector(selectBun);
    const main = useAppSelector(selectMain);
    const sauce = useAppSelector(selectSauce);
    const [current, setCurrent] = useState<string>(BUN);
    const bunRef = useRef<HTMLElement>(null);
    const sauceRef = useRef<HTMLElement>(null);
    const mainRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const openModal = useOpenModalFunc();

    useIntersectionObserver(
        containerRef,
        [bunRef, sauceRef, mainRef],
        [BUN, SAUCE, MAIN],
        setCurrent
    );

    const onTabClick = (value: string): void => {
        let element: HTMLElement | null = null;
        switch (value) {
            case BUN:
                element = bunRef.current;
                break;
            case SAUCE:
                element = sauceRef.current;
                break;
            case MAIN:
                element = mainRef.current;
                break;
            default:
        }
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <section className={`${styles.section} ml-5 mr-5`}>
                <h1 className={`text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
                <div className={`${styles.tabs} mb-10`}>
                    <Tab value={BUN} active={current === BUN} onClick={onTabClick}>
                        Булки
                    </Tab>
                    <Tab value={SAUCE} active={current === SAUCE} onClick={onTabClick}>
                        Соусы
                    </Tab>
                    <Tab value={MAIN} active={current === MAIN} onClick={onTabClick}>
                        Начинки
                    </Tab>
                </div>
                <div ref={containerRef} className={`${styles.container} custom-scroll`}>
                    <BurgerIngredientsCategory
                        ingredients={bun}
                        name="Булки"
                        extraClass="mb-10"
                        ref={bunRef}
                        callback={openModal}
                    />
                    <BurgerIngredientsCategory
                        ingredients={sauce}
                        name="Соусы"
                        extraClass="mb-10"
                        ref={sauceRef}
                        callback={openModal}
                    />
                    <BurgerIngredientsCategory
                        ingredients={main}
                        name="Начинки"
                        ref={mainRef}
                        callback={openModal}
                    />
                </div>
            </section>
        </>
    );
}

export default BurgerIngredients;
