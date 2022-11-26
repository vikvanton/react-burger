import React from "react";
import styles from "./app.module.css";
import { rawData } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
    const [loading, setLoading] = React.useState(true);
    const [ingredients, setIngredients] = React.useState({
        bun: [],
        main: [],
        sauce: [],
    });
    const [usedIngredients, setUsedIngredients] = React.useState({
        bun: {},
        list: [],
    });

    React.useEffect(() => {
        const bun = [];
        const main = [];
        const sauce = [];
        rawData.forEach((item) => {
            const newItem = { ...item, count: 0 };
            switch (item.type) {
                case "bun":
                    bun.push(newItem);
                    break;
                case "main":
                    main.push(newItem);
                    break;
                case "sauce":
                    sauce.push(newItem);
                    break;
                default:
            }
        });
        setIngredients({
            bun,
            main,
            sauce,
        });
        setUsedIngredients({
            bun: bun[0],
            list: [
                main[0],
                main[1],
                main[2],
                main[3],
                main[4],
                main[5],
                main[6],
                main[7],
                sauce[1],
                sauce[0],
            ],
        });
        setLoading(false);
    }, []);

    return (
        <>
            {!loading && (
                <>
                    <AppHeader />
                    <main className={styles.main}>
                        <div className={styles.container}>
                            <BurgerIngredients
                                bun={ingredients.bun}
                                main={ingredients.main}
                                sauce={ingredients.sauce}
                            />
                            <BurgerConstructor
                                usedIngredients={usedIngredients}
                            />
                        </div>
                    </main>
                </>
            )}
        </>
    );
}

export default App;
