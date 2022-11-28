import React from "react";
import styles from "./app.module.css";
import { rawData } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                <div className={styles.container}>
                    <BurgerIngredients ingredients={rawData} />
                    <BurgerConstructor ingredients={rawData} />
                </div>
            </main>
        </>
    );
}

export default App;
