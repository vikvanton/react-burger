import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { memo } from "react";
import { SET_VIEW_ORDER } from "../../services/actions/view-in-modal";
import { useOrderData } from "../../utils/hooks";
import { OrderStatus, TCategories, TOpenModalFunc, TOrderInfo } from "../../utils/types";
import styles from "./order-card.module.css";

interface IOrderCard {
    order: TOrderInfo;
    categories: TCategories;
    callback: TOpenModalFunc;
    isProfile?: boolean;
}

function OrderCard({ order, categories, callback, isProfile = false }: IOrderCard): JSX.Element {
    const { orderIngredients, orderSum } = useOrderData(order.ingredients, categories);

    const onClickHandler = () => {
        callback(
            {
                type: SET_VIEW_ORDER,
                data: { ...order, ingredients: orderIngredients, orderSum },
            },
            `${isProfile ? `/profile/orders/${order.number}` : `/feed/${order.number}`}`
        );
    };

    return (
        <article className={styles.card} onClick={onClickHandler}>
            <div className={`${styles.header} mb-6`}>
                <span className="text text_type_digits-default">{`#${order.number}`}</span>
                <span className={`${styles.date} text text_type_main-default`}>{`${new Date(
                    order.updatedAt
                ).toLocaleString("ru")}`}</span>
            </div>
            <h3 className="text text_type_main-medium">{order.name}</h3>
            {isProfile && (
                <p
                    className={
                        order.status === "done"
                            ? `${styles.done} text text_type_main-default mt-2`
                            : "text text_type_main-default mt-2"
                    }
                >
                    {OrderStatus[order.status as keyof typeof OrderStatus]}
                </p>
            )}
            <div className={`${styles.summary} mt-6`}>
                <ul className={styles.icons}>
                    {orderIngredients.slice(0, 6).map((orderIngredient, index) => (
                        <li
                            className={`${
                                index === 5 ? `${styles.image} ${styles.imageLast}` : styles.image
                            }`}
                            key={orderIngredient._id}
                            style={{ zIndex: `${orderIngredients.length - index}` }}
                        >
                            {index === 5 && (
                                <span
                                    className={`${styles.imageLastCounter} text text_type_main-default`}
                                    style={{ zIndex: `${orderIngredients.length}` }}
                                >
                                    +{orderIngredients.length - 5}
                                </span>
                            )}
                            <img src={orderIngredient.image_mobile} alt="img" />
                        </li>
                    ))}
                </ul>
                <span className={`${styles.orderSum} text text_type_digits-default`}>
                    {orderSum} <CurrencyIcon type="primary" />
                </span>
            </div>
        </article>
    );
}

export default memo(OrderCard);
