import styles from "./burger-constructor-ingredient.module.css";
import PropTypes from "prop-types";
import { ingredientShape } from "../../utils/data-prop-types";
import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructorIngredient({ item, handleDelete, type, isLocked }) {
    const handleClose = handleDelete ? () => handleDelete(item) : undefined;

    return (
        <>
            {!isLocked && <DragIcon type="primary" />}
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={`${item.name}${
                    type ? (type === "top" ? " (верх)" : " (низ)") : ""
                }`}
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
    handleDelete: PropTypes.func,
    type: PropTypes.oneOf(["top", "bottom"]),
    isLocked: PropTypes.bool,
};

BurgerConstructorIngredient.defaultProps = {
    handleDelete: undefined,
    type: undefined,
    isLocked: undefined,
};

export default BurgerConstructorIngredient;
