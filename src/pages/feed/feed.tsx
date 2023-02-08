import { useEffect } from "react";
import styles from "./feed.module.css";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";
import InfoMessage from "../../components/info-message/info-message";
import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    selectOrders,
    selectSocketConnected,
    selectSocketError,
} from "../../services/selectors/orders";
import FeedSummary from "../../components/feed-summary/feed-summary";
import FeedOrders from "../../components/feed-orders/feed-orders";
import {
    WS_ORDERS_CONNECTION_START,
    WS_ORDERS_CONNECTION_STOP,
} from "../../services/actions/orders";
import { WS_NO_CONNECTION, WS_RECEIVING_DATA } from "../../utils/consts";

function Feed(): JSX.Element {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(selectOrders);
    const socketConnected = useAppSelector(selectSocketConnected);
    const socketError = useAppSelector(selectSocketError);

    useEffect(() => {
        dispatch({ type: WS_ORDERS_CONNECTION_START, endpoint: "/all" });
        return () => {
            dispatch({ type: WS_ORDERS_CONNECTION_STOP });
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

export default Feed;
