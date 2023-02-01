import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderStatus, TOrderDeatiledInfo } from "../../utils/types";
import styles from "./order-info.module.css";

interface IOrderInfo {
    order: TOrderDeatiledInfo;
}

function OrderInfo({ order }: IOrderInfo): JSX.Element {
    return (
        <article className={styles.article}>
            <h3 className="text text_type_main-medium mb-3">{order.name}</h3>
            <p
                className={
                    order.status === "done"
                        ? `${styles.done} text text_type_main-default mb-15`
                        : "text text_type_main-default mb-15"
                }
            >
                {OrderStatus[order.status as keyof typeof OrderStatus]}
            </p>
            <h3 className="text text_type_main-medium mb-6">Состав:</h3>
            <ul className={`${styles.list} custom-scroll`}>
                {order.ingredients.map((ingredient) => (
                    <li key={ingredient._id} className={styles.ingredient}>
                        <span className={styles.image}>
                            <img src={ingredient.image_mobile} alt="img" />
                        </span>
                        <span className={`${styles.name} text text_type_main-default`}>
                            {ingredient.name}
                        </span>
                        <span className={`${styles.orderSum} text text_type_digits-default`}>
                            {ingredient.count} x {ingredient.price}
                            <CurrencyIcon type="primary" />
                        </span>
                    </li>
                ))}
            </ul>
            <div className={styles.footer}>
                <span className={`${styles.date} text text_type_main-default`}>{`${new Date(
                    order.updatedAt
                ).toLocaleString("ru")}`}</span>
                <span className={`${styles.orderSum} text text_type_digits-default`}>
                    {order.orderSum} <CurrencyIcon type="primary" />
                </span>
            </div>
        </article>
    );
}

export default OrderInfo;
