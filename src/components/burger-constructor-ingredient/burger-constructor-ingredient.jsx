import { memo } from "react";
import styles from "./burger-constructor-ingredient.module.css";
import PropTypes from "prop-types";
import { ingredientShape } from "../../utils/data-prop-types";
import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructorIngredient({ item, handleDelete }) {
    const handleClose = () => handleDelete(item);

    return (
        <>
            <DragIcon type="primary" />
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
                extraClass={styles.element}
                handleClose={handleClose}
            />
        </>
    );
}

BurgerConstructorIngredient.propTypes = {
    item: ingredientShape.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default memo(BurgerConstructorIngredient);
