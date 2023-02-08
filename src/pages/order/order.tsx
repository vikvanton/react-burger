import { useMemo } from "react";
import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { useParams, useRouteMatch } from "react-router";
import InfoMessage from "../../components/info-message/info-message";
import { selectCategories } from "../../services/selectors/ingredients";
import {
    selectOrder,
    selectOrders,
    selectSocketConnected,
    selectSocketError,
} from "../../services/selectors/orders";
import { useAppDispatch, useAppSelector, useOrderData } from "../../utils/hooks";
import OrderInfo from "../../components/order-info/order-info";
import { selectAccessToken } from "../../services/selectors/auth";
import {
    WS_ORDERS_CONNECTION_START,
    WS_ORDERS_CONNECTION_STOP,
} from "../../services/actions/orders";
import { WS_NO_CONNECTION, WS_RECEIVING_DATA } from "../../utils/consts";

function Order() {
    const dispatch = useAppDispatch();
    const accessToken = useAppSelector(selectAccessToken);
    const categories = useAppSelector(selectCategories);
    const socketConnected = useAppSelector(selectSocketConnected);
    const socketError = useAppSelector(selectSocketError);
    const orders = useAppSelector(selectOrders);
    const { id } = useParams<{ id: string }>();
    const getOrder = useMemo(() => selectOrder(id), [id]);
    const order = useAppSelector(getOrder);
    const { orderIngredients, orderSum } = useOrderData(order ? order.ingredients : [], categories);
    const { path } = useRouteMatch();

    useEffect(() => {
        dispatch({
            type: WS_ORDERS_CONNECTION_START,
            endpoint: path === "/profile/orders/:id" ? `?token=${accessToken.slice(7)}` : "/all",
        });
        return () => {
            dispatch({ type: WS_ORDERS_CONNECTION_STOP });
        };
    }, [accessToken, dispatch, path]);

    if (socketError)
        return (
            <InfoMessage text={socketError}>
                <InfoIcon type="error" />
            </InfoMessage>
        );

    return (
        <>
            {socketConnected ? (
                !orders.length ? (
                    <InfoMessage text={WS_RECEIVING_DATA}>
                        <InfoIcon type="primary" />
                    </InfoMessage>
                ) : order ? (
                    <section>
                        <h1
                            style={{ textAlign: "center" }}
                            className="text text_type_digits-default mt-30 pb-3"
                        >{`#${order.number}`}</h1>
                        <OrderInfo order={{ ...order, ingredients: orderIngredients, orderSum }} />
                    </section>
                ) : (
                    <InfoMessage text={"Заказ не найден"}>
                        <InfoIcon type="error" />
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

export default Order;
