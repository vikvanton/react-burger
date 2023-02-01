import styles from "./main-page.module.css";
import { useAppSelector } from "../../utils/hooks";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import InfoMessage from "../../components/info-message/info-message";
import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { selectIngredientsError } from "../../services/selectors/ingredientsSelectors";

function MainPage(): JSX.Element {
    const ingredientsError = useAppSelector(selectIngredientsError);

    return (
        <>
            {ingredientsError ? (
                <InfoMessage text={ingredientsError}>
                    <InfoIcon type="error" />
                </InfoMessage>
            ) : (
                <DndProvider backend={HTML5Backend}>
                    <div className={styles.container}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </div>
                </DndProvider>
            )}
        </>
    );
}

export default MainPage;
