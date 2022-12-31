import { useParams } from "react-router";
import { useSelector } from "react-redux";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import InfoMessage from "../../components/info-message/info-message";
import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { selectIngredient } from "../../services/selectors/ingredientsSelectors";

function Ingredient() {
    const { id } = useParams();
    const ingredient = useSelector(selectIngredient(id));

    return (
        <>
            {ingredient ? (
                <section>
                    <h1
                        style={{ textAlign: "center" }}
                        className="mt-30 pb-3 text text_type_main-large"
                    >
                        Детали ингредиента
                    </h1>
                    <IngredientDetails ingredient={ingredient} />
                </section>
            ) : (
                <InfoMessage text={"Ингредиент не найден"}>
                    <InfoIcon type="error" />
                </InfoMessage>
            )}
        </>
    );
}

export default Ingredient;
