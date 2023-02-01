import { memo } from "react";
import { TOrderNumber } from "../../utils/types";
import styles from "./feed-summary-column.module.css";

interface IFeedSummaryColumn {
    orders: Array<TOrderNumber>;
    done: boolean;
}

function FeedSummaryColumn({ orders, done }: IFeedSummaryColumn): JSX.Element {
    return (
        <div className={styles.statusColumn}>
            <h3 className="text text_type_main-medium mb-6">{done ? "Готовы:" : "В работе:"}</h3>
            <div className={styles.columns}>
                <ul className={styles.listNumbers}>
                    {orders.slice(0, 10).map((order) => (
                        <li
                            key={order._id}
                            className={`${done && styles.numberDone} text text_type_digits-default`}
                        >
                            {order.number}
                        </li>
                    ))}
                </ul>
                <ul className={styles.listNumbers}>
                    {orders.slice(10).map((order) => (
                        <li
                            key={order._id}
                            className={`${done && styles.numberDone} text text_type_digits-default`}
                        >
                            {order.number}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default memo(FeedSummaryColumn);
