import { useMemo } from "react";
import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { useParams, useRouteMatch } from "react-router";
import InfoMessage from "../../../components/info-message/info-message";
import { WS_CONNECTION_START, WS_CONNECTION_STOP } from "../../../services/actions/ordersActions";
import { selectCategories } from "../../../services/selectors/ingredientsSelectors";
import {
    selectOrder,
    selectOrders,
    selectSocketConnected,
    selectSocketError,
} from "../../../services/selectors/ordersSelectors";
import { useAppDispatch, useAppSelector, useOrderData } from "../../../utils/hooks";
import OrderInfo from "../../../components/order-info/order-info";
import { TSocketType } from "../../../utils/types";

function Order() {
    const dispatch = useAppDispatch();
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
        const type: TSocketType = path === "/profile/orders/:id" ? "user" : "all";
        dispatch({ type: WS_CONNECTION_START, data: type });
        return () => {
            dispatch({ type: WS_CONNECTION_STOP });
        };
    }, [dispatch, path]);

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
                    <InfoMessage text={"Получаем данные с сервера..."}>
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
                <InfoMessage text={"Отсутствует соединение с сервером"}>
                    <InfoIcon type="error" />
                </InfoMessage>
            )}
        </>
    );
}

export default Order;
