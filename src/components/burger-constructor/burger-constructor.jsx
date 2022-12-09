import { useState, useContext, useCallback, memo } from "react";
import Modal from "../modal/modal";
import ModalOverlay from "../modal-overlay/modal-overlay";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import AppContext from "../../services/app-context";
import { createOrder } from "../../utils/api";
import Error from "../error/error";
import BurgerConstructorIngredient from "../burger-constructor-ingredient/burger-constructor-ingredient";
import {
    ConstructorElement,
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const MemoConstructorElement = memo(ConstructorElement);

function BurgerConstructor() {
    const {
        constructor: { bun, list, totalSum },
        orderNumber,
        dispatch,
    } = useContext(AppContext);
    const [modal, setModal] = useState(false);
    // Признаки загрузки/ошибки пока оставил в компоненте
    // Во второй части перенесу в глобальное состояние
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        if (error) setError("");
        setModal(false);
    };

    const handleDeleteItem = useCallback(
        (item) => {
            dispatch({ type: "REMOVE_FROM_CONSTRUCTOR", data: item });
        },
        [dispatch]
    );

    const handleCreateOrder = () => {
        if (!bun || !list.length) {
            setError(`В бургере должны быть ${!bun ? "булки" : "ингредиенты"}`);
            openModal();
            return;
        }
        const data = {
            ingredients: [bun._id, ...list.map((item) => item._id)],
        };
        // Запрос к серверу пока оставил в компоненте, во второй части переделаю на thunk
        setLoading(true);
        createOrder(data)
            .then((result) => {
                if (result.success) {
                    dispatch({
                        type: "SAVE_ORDER_NUMBER",
                        data: result.order.number,
                    });
                    dispatch({ type: "CLEAR_CONSTRUCTOR" });
                }
            })
            .catch(() => {
                setError("Ошибка соединения с сервером");
            })
            .finally(() => {
                setLoading(false);
                openModal();
            });
    };

    return (
        <>
            <section className={`${styles.section} ml-5 mr-5 pt-25 pl-4 pr-4`}>
                <ul className={`${styles.list}`}>
                    {bun && (
                        <li className={`${styles.bun}`}>
                            <MemoConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image_mobile}
                                extraClass={styles.element}
                            />
                        </li>
                    )}
                    <ul
                        className={`${styles.list} ${styles.container} custom-scroll mr-8`}
                    >
                        {list.map((item) => (
                            <li
                                className={`${styles.item} mr-2`}
                                key={item.uuid}
                            >
                                <BurgerConstructorIngredient
                                    item={item}
                                    handleDelete={handleDeleteItem}
                                />
                            </li>
                        ))}
                    </ul>
                    {bun && (
                        <li className={`${styles.bun}`}>
                            <MemoConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image_mobile}
                                extraClass={styles.element}
                            />
                        </li>
                    )}
                </ul>
                {totalSum ? (
                    <span className={`${styles.summary} mt-10`}>
                        <span className={`${styles.text} mr-10`}>
                            <span className="text text_type_digits-medium pr-2">
                                {totalSum}
                            </span>
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
            {loading && <ModalOverlay />}
            {modal && (
                <Modal onClose={closeModal}>
                    {error ? (
                        <Error text={error} />
                    ) : (
                        <OrderDetails orderNumber={orderNumber} />
                    )}
                </Modal>
            )}
        </>
    );
}

export default BurgerConstructor;
