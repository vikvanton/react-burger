import { useEffect, useState, useReducer } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Error from "../error/error";
import { getIngredients } from "../../utils/api";
import AppContext from "../../services/app-context";
import { initialState, appReducer } from "../../services/app-reducer";

function App() {
    const [loading, setLoading] = useState(true);
    // Признаки загрузки/ошибки пока оставил в компоненте
    // Во второй части перенесу в глобальное состояние
    const [error, setError] = useState(false);
    const [state, dispatch] = useReducer(appReducer, initialState);

    useEffect(() => {
        // Запрос к серверу пока оставил в компоненте, во второй части переделаю на thunk
        getIngredients()
            .then((result) => {
                dispatch({ type: "ADD_INGREDIENTS", data: result.data });
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [dispatch]);

    return (
        <>
            {!loading && (
                <>
                    <AppHeader />
                    <main className={styles.main}>
                        {error ? (
                            <Error text={"Ошибка соединения с сервером"} />
                        ) : (
                            <AppContext.Provider value={{ ...state, dispatch }}>
                                <div className={styles.container}>
                                    <BurgerIngredients />
                                    <BurgerConstructor />
                                </div>
                            </AppContext.Provider>
                        )}
                    </main>
                </>
            )}
        </>
    );
}

export default App;
