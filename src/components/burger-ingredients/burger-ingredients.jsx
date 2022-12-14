import { useState, useCallback, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";
import { useIntersectionObserver } from "../../utils/hooks";
import { SET_VIEW_INGREDIENT } from "../../services/actions/viewIngredientActions";
import { selectIngredientInModal } from "../../services/selectors/viewIngredientSelectors";
import {
    selectBun,
    selectMain,
    selectSauce,
} from "../../services/selectors/ingredientsSelectors";

const bunTab = "bun";
const mainTab = "main";
const sauceTab = "sauce";

function BurgerIngredients() {
    const bun = useSelector(selectBun);
    const main = useSelector(selectMain);
    const sauce = useSelector(selectSauce);
    const ingredientInModal = useSelector(selectIngredientInModal);
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(bunTab);
    const bunRef = useRef();
    const sauceRef = useRef();
    const mainRef = useRef();
    const containerRef = useRef();
    const history = useHistory();

    useIntersectionObserver(
        containerRef,
        [bunRef, sauceRef, mainRef],
        [bunTab, sauceTab, mainTab],
        setCurrent
    );

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
                    ???????????????? ????????????
                </h1>
                <div className={`${styles.tabs} mb-10`}>
                    <Tab
                        value={bunTab}
                        active={current === bunTab}
                        onClick={onTabClick}
                    >
                        ??????????
                    </Tab>
                    <Tab
                        value={sauceTab}
                        active={current === sauceTab}
                        onClick={onTabClick}
                    >
                        ??????????
                    </Tab>
                    <Tab
                        value={mainTab}
                        active={current === mainTab}
                        onClick={onTabClick}
                    >
                        ??????????????
                    </Tab>
                </div>
                <div
                    ref={containerRef}
                    className={`${styles.container} custom-scroll`}
                >
                    <BurgerIngredientsCategory
                        ingredients={bun}
                        name="??????????"
                        extraClass="mb-10"
                        ref={bunRef}
                        callback={openModal}
                    />
                    <BurgerIngredientsCategory
                        ingredients={sauce}
                        name="??????????"
                        extraClass="mb-10"
                        ref={sauceRef}
                        callback={openModal}
                    />
                    <BurgerIngredientsCategory
                        ingredients={main}
                        name="??????????????"
                        ref={mainRef}
                        callback={openModal}
                    />
                </div>
            </section>
            {history.location.state?.background && (
                <>
                    {ingredientInModal ? (
                        <Modal header="???????????? ??????????????????????" onClose={closeModal}>
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
