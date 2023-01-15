import styles from "./order-details.module.css";
import doneImgPath from "../../images/done.png";

interface IOrderDetailsProps {
    orderNumber: number;
}

function OrderDetails({ orderNumber }: IOrderDetailsProps): JSX.Element {
    return (
        <article className={`${styles.order} mt-4 mb-30 ml-25 mr-25`}>
            <span className={`${styles.number} text text_type_digits-large mb-8`}>
                {orderNumber}
            </span>
            <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
            <img src={doneImgPath} alt="Done" className={`${styles.image} mb-15`} />
            <span className="text text_type_main-default mb-2">Ваш заказ начали готовить</span>
            <span className="text text_type_main-default text_color_inactive">
                Дождитесь готовности на орбитальной станции
            </span>
        </article>
    );
}

export default OrderDetails;
