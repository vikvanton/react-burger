import { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import NetworkError from "../network-error/network-error";
import { getIngredients } from "../../utils/api";

function App() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        getIngredients()
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
                            <NetworkError />
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
