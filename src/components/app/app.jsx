import { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { INGREDIENTS_API } from "../../utils/api";

function App() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        fetch(INGREDIENTS_API)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error();
                }
            })
            .then((result) => setIngredients(result.data))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            {!loading && (
                <>
                    <AppHeader />
                    <main className={styles.main}>
                        {error ? (
                            <section
                                className={`text text_type_main-medium mt-10`}
                            >
                                <p>
                                    Ошибка загрузки данных. Перезагрузите
                                    страницу или зайдите позже
                                </p>
                            </section>
                        ) : (
                            <div className={styles.container}>
                                <BurgerIngredients ingredients={ingredients} />
                                <BurgerConstructor ingredients={ingredients} />
                            </div>
                        )}
                    </main>
                </>
            )}
        </>
    );
}

export default App;
