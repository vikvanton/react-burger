import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Error from "../error/error";
import { getIngredients } from "../../services/actions/ingredientsActions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
    const { ingredientsRequest, ingredientsError } = useSelector((state) => ({
        ingredientsRequest: state.ingredients.ingredientsRequest,
        ingredientsError: state.ingredients.ingredientsError,
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return (
        <>
            {!ingredientsRequest && (
                <>
                    <AppHeader />
                    <main className={styles.main}>
                        {ingredientsError ? (
                            <Error text={ingredientsError} />
                        ) : (
                            <DndProvider backend={HTML5Backend}>
                                <div className={styles.container}>
                                    <BurgerIngredients />
                                    <BurgerConstructor />
                                </div>
                            </DndProvider>
                        )}
                    </main>
                </>
            )}
        </>
    );
}

export default App;
