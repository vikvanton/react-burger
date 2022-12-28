import { useState, useCallback, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";
import { SET_VIEW_INGREDIENT } from "../../services/actions/viewIngredientActions";

const bunTab = "bun";
const mainTab = "main";
const sauceTab = "sauce";

function BurgerIngredients() {
    const { bun, main, sauce, ingredientInModal } = useSelector((state) => ({
        ...state.ingredients.categories,
        ...state.viewIngredient,
    }));
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(bunTab);
    const bunRef = useRef();
    const sauceRef = useRef();
    const mainRef = useRef();
    const containerRef = useRef();
    const observer = useRef();
    const history = useHistory();

    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target === bunRef.current) setCurrent(bunTab);
                        if (entry.target === sauceRef.current)
                            setCurrent(sauceTab);
                        if (entry.target === mainRef.current)
                            setCurrent(mainTab);
                    }
                });
            },
            {
                root: containerRef.current,
                rootMargin: "-20% 0% -70% 0%",
            }
        );
        observer.current.observe(bunRef.current);
        observer.current.observe(sauceRef.current);
        observer.current.observe(mainRef.current);
        return () => {
            observer.current.disconnect();
        };
    }, []);

    const onTabClick = (value) => {
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
    };

    const openModal = useCallback(
        (ingredient) => {
            dispatch({ type: SET_VIEW_INGREDIENT, data: ingredient });
            history.push({
                pathname: `/ingredient/${ingredient._id}`,
                state: { background: history.location },
            });
        },
        [dispatch, history]
    );

    const closeModal = () => {
        history.goBack();
    };

    return (
        <>
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
                <div
                    ref={containerRef}
                    className={`${styles.container} custom-scroll`}
                >
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
