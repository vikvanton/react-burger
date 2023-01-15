import styles from "./ingredient-details.module.css";
import { TIngredient } from "../../utils/types";

interface IIngredientDetailsProps {
    ingredient: TIngredient;
}

function IngredientDetails({ ingredient }: IIngredientDetailsProps): JSX.Element {
    return (
        <article className={`${styles.details} ml-25 mr-25 mb-15`}>
            <img src={ingredient.image_large} alt="Ingredient" className="mb-4" />
            <span className={`${styles.name} text text_type_main-medium mb-8`}>
                {ingredient.name}
            </span>
            <ul className={`${styles.list} text text_type_main-default text_color_inactive`}>
                <li className={`${styles.item}`}>
                    <span>Калории, ккал</span>
                    <span className="text text_type_digits-default">{ingredient.calories}</span>
                </li>
                <li className={`${styles.item}`}>
                    <span>Белки, г</span>
                    <span className="text text_type_digits-default">{ingredient.proteins}</span>
                </li>
                <li className={`${styles.item}`}>
                    <span>Жиры, г</span>
                    <span className="text text_type_digits-default">{ingredient.fat}</span>
                </li>
                <li className={`${styles.item}`}>
                    <span>Углеводы, г</span>
                    <span className="text text_type_digits-default">
                        {ingredient.carbohydrates}
                    </span>
                </li>
            </ul>
        </article>
    );
}

export default IngredientDetails;
