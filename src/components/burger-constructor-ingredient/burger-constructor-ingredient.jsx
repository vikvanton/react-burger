import { memo } from "react";
import styles from "./burger-constructor-ingredient.module.css";
import PropTypes from "prop-types";
import { ingredientShape } from "../../utils/data-prop-types";
import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";

function BurgerConstructorIngredient({
    item,
    handleDelete,
    handleDrop,
    type,
    isLocked,
}) {
    const handleClose = handleDelete ? () => handleDelete(item) : undefined;

    const [{ isDrag }, dragRef] = useDrag({
        type: "itemInConstructor",
        item: { id: item.uuid },
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });

    const [{ isHover }, dropRef] = useDrop({
        accept: "itemInConstructor",
        drop(item) {
            onDropHandler(item.id);
        },
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
    });

    const onDropHandler = (dragIitemId) => {
        handleDrop && handleDrop(dragIitemId, item.uuid);
    };

    const element = (
        <ConstructorElement
            type={type}
            isLocked={isLocked}
            text={`${item.name}${
                type ? (type === "top" ? " (верх)" : " (низ)") : ""
            }`}
            price={item.price}
            thumbnail={item.image_mobile}
            extraClass={`${styles.element}`}
            handleClose={handleClose}
        />
    );

    if (isLocked) {
        return element;
    } else {
        return (
            <li
                ref={dropRef}
                className={`${styles.item} ${
                    (isDrag || isHover) && styles.draggable
                } mr-2`}
            >
                <span className={`${styles.icon}`} ref={dragRef}>
                    <DragIcon type="primary" />
                </span>
                {element}
            </li>
        );
    }
}

BurgerConstructorIngredient.propTypes = {
    item: ingredientShape.isRequired,
    handleDelete: PropTypes.func,
    handleDrop: PropTypes.func,
    type: PropTypes.oneOf(["top", "bottom"]),
    isLocked: PropTypes.bool,
};

BurgerConstructorIngredient.defaultProps = {
    handleDelete: undefined,
    handleDrop: undefined,
    type: undefined,
    isLocked: undefined,
};

export default memo(BurgerConstructorIngredient);
