import { useMemo } from "react";
import {
    selectOrders,
    selectTotal,
    selectTotalToday,
} from "../../services/selectors/ordersSelectors";
import { useAppSelector } from "../../utils/hooks";
import { TOrderNumber } from "../../utils/types";
import FeedSummaryColumn from "../feed-summary-column/feed-summary-column";
import FeedSummaryInfo from "../feed-summary-info/feed-summary-info";
import styles from "./feed-summary.module.css";

function FeedSummary(): JSX.Element {
    const orders = useAppSelector(selectOrders);
    const total = useAppSelector(selectTotal);
    const totalToday = useAppSelector(selectTotalToday);

    const { doneOrders, pendingOrders } = useMemo((): {
        doneOrders: Array<TOrderNumber>;
        pendingOrders: Array<TOrderNumber>;
    } => {
        const doneOrders: Array<TOrderNumber> = [];
        const pendingOrders: Array<TOrderNumber> = [];
        orders.forEach((order) => {
            if (order.status === "done") doneOrders.push({ _id: order._id, number: order.number });
            if (order.status === "pending")
                pendingOrders.push({ _id: order._id, number: order.number });
        });
        return {
            doneOrders: doneOrders.slice(0, 20),
            pendingOrders: pendingOrders.slice(0, 20),
        };
    }, [orders]);

    return (
        <section className={`${styles.summary} custom-scroll`}>
            <div className={`${styles.wrapper} mt-25 custom-scroll`}>
                <article className={`${styles.status} mb-15`}>
                    <FeedSummaryColumn orders={doneOrders} done={true} />
                    <FeedSummaryColumn orders={pendingOrders} done={false} />
                </article>
                <FeedSummaryInfo text="Выполнено за все время:" sum={total} />
                <FeedSummaryInfo text="Выполнено за сегодня:" sum={totalToday} />
            </div>
        </section>
    );
}

export default FeedSummary;
