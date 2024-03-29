import { useCallback } from "react";
import Modal from "../modal/modal";
import ModalOverlay from "../modal-overlay/modal-overlay";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import InfoMessage from "../info-message/info-message";
import BurgerConstructorIngredient from "../burger-constructor-ingredient/burger-constructor-ingredient";
import BurgerConstructorIngredientEmpty from "../burger-constructor-ingredient-empty/burger-constructor-ingredient-empty";
import {
    INC_INGREDIENT_COUNTER,
    DEC_INGREDIENT_COUNTER,
    CLEAR_INGREDIENTS_COUNTERS,
} from "../../services/actions/ingredients";
import {
    addToConstructor,
    REMOVE_FROM_CONSTRUCTOR,
    CLEAR_CONSTRUCTOR,
    EXCHANGE_INGREDIENTS,
} from "../../services/actions/constructor";
import {
    postOrder,
    SET_ORDER_ERROR,
    CLEAR_ORDER_ERROR,
    CLEAR_ORDER_NUMBER,
} from "../../services/actions/order";
import { CurrencyIcon, Button, InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import {
    selectConstructorBun,
    selectConstructorList,
    selectTotalSum,
} from "../../services/selectors/constructor";
import {
    selectOrderNumber,
    selectOrderRequest,
    selectOrderError,
} from "../../services/selectors/order";
import { selectAccessToken } from "../../services/selectors/auth";
import { TIngredient, TConstructorIngredient, TOrder } from "../../utils/types";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";

function BurgerConstructor(): JSX.Element {
    const bun = useAppSelector(selectConstructorBun);
    const list = useAppSelector(selectConstructorList);
    const totalSum = useAppSelector(selectTotalSum);
    const orderNumber = useAppSelector(selectOrderNumber);
    const orderRequest = useAppSelector(selectOrderRequest);
    const orderError = useAppSelector(selectOrderError);
    const accessToken = useAppSelector(selectAccessToken);
    const dispatch = useAppDispatch();

    const [{ isDropBunTop }, dropBunTop] = useDrop({
        accept: "bun",
        drop(item: TIngredient) {
            onDropIngredient(item);
        },
        collect: (monitor) => ({
            isDropBunTop: monitor.canDrop(),
        }),
    });

    const [{ isDropBunBottom }, dropBunBottom] = useDrop({
        accept: "bun",
        drop(item: TIngredient) {
            onDropIngredient(item);
        },
        collect: (monitor) => ({
            isDropBunBottom: monitor.canDrop(),
        }),
    });

    const [{ isDropIngredient }, dropIngredient] = useDrop({
        accept: "ingredient",
        drop(item: TIngredient) {
            onDropIngredient(item);
        },
        collect: (monitor) => ({
            isDropIngredient: monitor.canDrop(),
        }),
    });

    const onDropIngredient = (ingredient: TIngredient): void => {
        dispatch(addToConstructor(ingredient));
        dispatch({
            type: INC_INGREDIENT_COUNTER,
            data: { type: ingredient.type, id: ingredient._id, count: ingredient.count },
        });
    };

    const closeModal = (): void => {
        if (orderError) dispatch({ type: CLEAR_ORDER_ERROR });
        if (orderNumber) {
            dispatch({ type: CLEAR_ORDER_NUMBER });
            dispatch({ type: CLEAR_CONSTRUCTOR });
            dispatch({ type: CLEAR_INGREDIENTS_COUNTERS });
        }
    };

    const handleDeleteItem = useCallback(
        (item: TConstructorIngredient): void => {
            dispatch({ type: REMOVE_FROM_CONSTRUCTOR, data: item.uuid });
            dispatch({
                type: DEC_INGREDIENT_COUNTER,
                data: { type: item.type, id: item._id },
            });
        },
        [dispatch]
    );

    const handleCreateOrder = (): void => {
        if (!bun || !list.length) {
            dispatch({
                type: SET_ORDER_ERROR,
                data: `В бургере должны быть ${!bun ? "булки" : "ингредиенты"}`,
            });
            return;
        }
        // Делаем заказ, если есть пользователь.
        if (accessToken) {
            const data: TOrder = {
                ingredients: [
                    bun._id,
                    ...list.map((item: TConstructorIngredient) => item._id),
                    bun._id,
                ],
            };
            dispatch(postOrder(data));
        } else {
            // Если нет, то выводим сообщение. По заданию было редиректить на /логин
            // но мне кажется, так информативнее)
            dispatch({
                type: SET_ORDER_ERROR,
                data: "Войдите чтобы сделать заказ",
            });
        }
    };

    const handleDropItem = useCallback(
        (dragItemId: string, dropItemId: string): void => {
            if (dragItemId === dropItemId) return;
            dispatch({
                type: EXCHANGE_INGREDIENTS,
                data: { dragItemId, dropItemId },
            });
        },
        [dispatch]
    );

    return (
        <>
            <section className={`${styles.section} ml-5 mr-5 pt-25 pl-4 pr-4`}>
                <ul className={`${styles.list}`}>
                    <li
                        ref={dropBunTop}
                        className={`${styles.bun} ${isDropIngredient && styles.drop}`}
                    >
                        {bun ? (
                            <BurgerConstructorIngredient type="top" isLocked={true} item={bun} />
                        ) : (
                            <BurgerConstructorIngredientEmpty type="top" />
                        )}
                    </li>
                    <ul
                        ref={dropIngredient}
                        className={`${styles.list} ${styles.container} ${
                            isDropBunBottom && isDropBunTop && styles.drop
                        } custom-scroll mr-8`}
                    >
                        {list.length ? (
                            list.map((item: TConstructorIngredient) => (
                                <BurgerConstructorIngredient
                                    key={item.uuid}
                                    item={item}
                                    handleDelete={handleDeleteItem}
                                    handleDrop={handleDropItem}
                                />
                            ))
                        ) : (
                            <BurgerConstructorIngredientEmpty />
                        )}
                    </ul>
                    <li
                        ref={dropBunBottom}
                        className={`${styles.bun} ${isDropIngredient && styles.drop}`}
                    >
                        {bun ? (
                            <BurgerConstructorIngredient type="bottom" isLocked={true} item={bun} />
                        ) : (
                            <BurgerConstructorIngredientEmpty type="bottom" />
                        )}
                    </li>
                </ul>
                {totalSum ? (
                    <span className={`${styles.summary} mt-10`}>
                        <span className={`${styles.text} mr-10`}>
                            <span className="text text_type_digits-medium pr-2">{totalSum}</span>
                            <CurrencyIcon type="primary" />
                        </span>
                        <Button
                            htmlType="button"
                            type="primary"
                            size="large"
                            onClick={handleCreateOrder}
                        >
                            Оформить заказ
                        </Button>
                    </span>
                ) : null}
            </section>
            {orderRequest && <ModalOverlay />}
            {(orderNumber || orderError) && (
                <Modal onClose={closeModal}>
                    {orderError ? (
                        <InfoMessage text={orderError}>
                            <InfoIcon type="error" />
                        </InfoMessage>
                    ) : (
                        <OrderDetails orderNumber={orderNumber} />
                    )}
                </Modal>
            )}
        </>
    );
}

export default BurgerConstructor;
