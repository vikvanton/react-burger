import { useEffect, useMemo } from "react";
import styles from "./profile-orders.module.css";
import { useAppSelector, useAppDispatch, useOpenModalFunc } from "../../utils/hooks";
import { WS_CONNECTION_START, WS_CONNECTION_STOP } from "../../services/actions/ordersActions";
import InfoMessage from "../info-message/info-message";
import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    selectOrders,
    selectSocketConnected,
    selectSocketError,
} from "../../services/selectors/ordersSelectors";
import OrderCard from "../order-card/order-card";
import { selectCategories } from "../../services/selectors/ingredientsSelectors";
import { TOrderInfo } from "../../utils/types";

function ProfileOrders(): JSX.Element {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(selectOrders);
    const categories = useAppSelector(selectCategories);
    const socketConnected = useAppSelector(selectSocketConnected);
    const socketError = useAppSelector(selectSocketError);
    const openModal = useOpenModalFunc();

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, data: "user" });
        return () => {
            dispatch({ type: WS_CONNECTION_STOP });
        };
    }, [dispatch]);

    const reverseOrders = useMemo((): Array<TOrderInfo> => {
        return [...orders].reverse();
    }, [orders]);

    if (socketError)
        return (
            <InfoMessage text={socketError}>
                <InfoIcon type="error" />
            </InfoMessage>
        );

    return (
        <>
            {socketConnected ? (
                orders.length ? (
                    <section className={`${styles.orders} mt-10`}>
                        <ul className={`${styles.list} custom-scroll`}>
                            {reverseOrders.map((order) => (
                                <li className="mb-6" key={order._id}>
                                    <OrderCard
                                        order={order}
                                        categories={categories}
                                        callback={openModal}
                                        isProfile
                                    />
                                </li>
                            ))}
                        </ul>
                    </section>
                ) : (
                    <InfoMessage text={"Получаем данные с сервера..."}>
                        <InfoIcon type="primary" />
                    </InfoMessage>
                )
            ) : (
                <InfoMessage text={"Отсутствует соединение с сервером"}>
                    <InfoIcon type="error" />
                </InfoMessage>
            )}
        </>
    );
}

export default ProfileOrders;
