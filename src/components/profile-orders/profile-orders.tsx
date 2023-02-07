import { useEffect, useMemo } from "react";
import styles from "./profile-orders.module.css";
import { useAppSelector, useAppDispatch, useOpenModalFunc } from "../../utils/hooks";
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
import { selectAccessToken } from "../../services/selectors/authSelectors";
import {
    WS_ORDERS_CONNECTION_START,
    WS_ORDERS_CONNECTION_STOP,
} from "../../services/actions/ordersActions";
import { WS_NO_CONNECTION, WS_RECEIVING_DATA } from "../../utils/consts";

function ProfileOrders(): JSX.Element {
    const dispatch = useAppDispatch();
    const accessToken = useAppSelector(selectAccessToken);
    const orders = useAppSelector(selectOrders);
    const categories = useAppSelector(selectCategories);
    const socketConnected = useAppSelector(selectSocketConnected);
    const socketError = useAppSelector(selectSocketError);
    const openModal = useOpenModalFunc();

    useEffect(() => {
        dispatch({ type: WS_ORDERS_CONNECTION_START, endpoint: `?token=${accessToken.slice(7)}` });
        return () => {
            dispatch({ type: WS_ORDERS_CONNECTION_STOP });
        };
    }, [accessToken, dispatch]);

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
                    <InfoMessage text={WS_RECEIVING_DATA}>
                        <InfoIcon type="primary" />
                    </InfoMessage>
                )
            ) : (
                <InfoMessage text={WS_NO_CONNECTION}>
                    <InfoIcon type="error" />
                </InfoMessage>
            )}
        </>
    );
}

export default ProfileOrders;
