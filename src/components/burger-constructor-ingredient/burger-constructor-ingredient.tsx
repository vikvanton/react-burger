import { memo } from "react";
import styles from "./burger-constructor-ingredient.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { TConstructorIngredient, TIngredientType } from "../../utils/types";

interface IBurgerConstructorIngredientProps {
    item: TConstructorIngredient;
    handleDelete?: (item: TConstructorIngredient) => void;
    handleDrop?: (dragItemId: string, dropItemId: string) => void;
    type?: TIngredientType;
    isLocked?: boolean;
}

function BurgerConstructorIngredient({
    item,
    handleDelete,
    handleDrop,
    type,
    isLocked,
}: IBurgerConstructorIngredientProps): JSX.Element {
    const handleClose = handleDelete ? (): void => handleDelete(item) : undefined;

    const [{ isDrag }, dragRef] = useDrag({
        type: "itemInConstructor",
        item: { id: item.uuid },
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });

    const [{ isHover }, dropRef] = useDrop({
        accept: "itemInConstructor",
        drop(item: { id: string }) {
            onDropHandler(item.id);
        },
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
    });

    const onDropHandler = (dragIitemId: string): void => {
        handleDrop && handleDrop(dragIitemId, item.uuid);
    };

    const element: JSX.Element = (
        <ConstructorElement
            type={type}
            isLocked={isLocked}
            text={`${item.name}${type ? (type === "top" ? " (верх)" : " (низ)") : ""}`}
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
            <li ref={dropRef}>
                <div
                    className={`${styles.item} ${(isDrag || isHover) && styles.draggable} mr-2`}
                    ref={dragRef}
                >
                    <span className={`${styles.icon}`}>
                        <DragIcon type="primary" />
                    </span>
                    {element}
                </div>
            </li>
        );
    }
}

export default memo(BurgerConstructorIngredient);
