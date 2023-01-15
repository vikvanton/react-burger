import { useState, useCallback, useRef, RefObject } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import { History } from "history";
import IngredientDetails from "../ingredient-details/ingredient-details";
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";
import { useIntersectionObserver } from "../../utils/hooks";
import { SET_VIEW_INGREDIENT } from "../../services/actions/viewIngredientActions";
import { selectIngredientInModal } from "../../services/selectors/viewIngredientSelectors";
import { TIngredient, TLocationBackgState } from "../../utils/types";
import { selectBun, selectMain, selectSauce } from "../../services/selectors/ingredientsSelectors";
import { BUN_TAB, MAIN_TAB, SAUCE_TAB } from "../../utils/consts";

function BurgerIngredients(): JSX.Element {
    const bun: Array<TIngredient> = useSelector<any, Array<TIngredient>>(selectBun);
    const main: Array<TIngredient> = useSelector<any, Array<TIngredient>>(selectMain);
    const sauce: Array<TIngredient> = useSelector<any, Array<TIngredient>>(selectSauce);
    const ingredientInModal: TIngredient = useSelector<any, TIngredient>(selectIngredientInModal);
    const dispatch: any = useDispatch<any>();
    const [current, setCurrent] = useState<string>(BUN_TAB);
    const bunRef: RefObject<HTMLElement> = useRef<HTMLElement>(null);
    const sauceRef: RefObject<HTMLElement> = useRef<HTMLElement>(null);
    const mainRef: RefObject<HTMLElement> = useRef<HTMLElement>(null);
    const containerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const history: History<TLocationBackgState> = useHistory<TLocationBackgState>();

    useIntersectionObserver(
        containerRef,
        [bunRef, sauceRef, mainRef],
        [BUN_TAB, SAUCE_TAB, MAIN_TAB],
        setCurrent
    );

    const onTabClick = (value: string): void => {
        let element: HTMLElement | null = null;
        switch (value) {
            case BUN_TAB:
                element = bunRef.current;
                break;
            case SAUCE_TAB:
                element = sauceRef.current;
                break;
            case MAIN_TAB:
                element = mainRef.current;
                break;
            default:
        }
        element?.scrollIntoView({ behavior: "smooth" });
        setCurrent(value);
    };

    const openModal = useCallback(
        (ingredient: TIngredient): void => {
            dispatch({ type: SET_VIEW_INGREDIENT, data: ingredient });
            history.push({
                pathname: `/ingredient/${ingredient._id}`,
                state: { background: history.location },
            });
        },
        [dispatch, history]
    );

    const closeModal = (): void => {
        history.goBack();
    };

    return (
        <>
            <section className={`${styles.section} ml-5 mr-5`}>
                <h1 className={`text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
                <div className={`${styles.tabs} mb-10`}>
                    <Tab value={BUN_TAB} active={current === BUN_TAB} onClick={onTabClick}>
                        Булки
                    </Tab>
                    <Tab value={SAUCE_TAB} active={current === SAUCE_TAB} onClick={onTabClick}>
                        Соусы
                    </Tab>
                    <Tab value={MAIN_TAB} active={current === MAIN_TAB} onClick={onTabClick}>
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
            {history.location.state?.background && (
                <>
                    {ingredientInModal ? (
                        <Modal header="Детали ингредиента" onClose={closeModal}>
                            <IngredientDetails ingredient={ingredientInModal} />
                        </Modal>
                    ) : (
                        <Redirect to={history.location.pathname} />
                    )}
                </>
            )}
        </>
    );
}

export default BurgerIngredients;
