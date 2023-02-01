import { useEffect } from "react";
import styles from "./feed.module.css";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";
import { WS_CONNECTION_START, WS_CONNECTION_STOP } from "../../services/actions/ordersActions";
import InfoMessage from "../../components/info-message/info-message";
import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    selectOrders,
    selectSocketConnected,
    selectSocketError,
} from "../../services/selectors/ordersSelectors";
import FeedSummary from "../../components/feed-summary/feed-summary";
import FeedOrders from "../../components/feed-orders/feed-orders";

function Feed(): JSX.Element {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(selectOrders);
    const socketConnected = useAppSelector(selectSocketConnected);
    const socketError = useAppSelector(selectSocketError);

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, data: "all" });
        return () => {
            dispatch({ type: WS_CONNECTION_STOP });
        };
    }, [dispatch]);

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
                    <div className={styles.container}>
                        <FeedOrders />
                        <FeedSummary />
                    </div>
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

export default Feed;
