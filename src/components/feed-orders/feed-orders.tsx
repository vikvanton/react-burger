import { selectCategories } from "../../services/selectors/ingredientsSelectors";
import { selectOrders } from "../../services/selectors/ordersSelectors";
import { useAppSelector, useOpenModalFunc } from "../../utils/hooks";
import OrderCard from "../order-card/order-card";
import styles from "./feed-orders.module.css";

function FeedOrders(): JSX.Element {
    const orders = useAppSelector(selectOrders);
    const categories = useAppSelector(selectCategories);
    const openModal = useOpenModalFunc();

    return (
        <>
            <section className={styles.feed}>
                <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
                <ul className={`${styles.list} custom-scroll`}>
                    {orders.map((order) => (
                        <li className="mb-4" key={order._id}>
                            <OrderCard order={order} categories={categories} callback={openModal} />
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default FeedOrders;
