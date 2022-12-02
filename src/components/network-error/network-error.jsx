import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./network-error.module.css";

function NetworkError() {
    return (
        <section className={`${styles.container} text text_type_main-medium`}>
            <InfoIcon type="error" />
            <p>
                Ошибка загрузки данных. Перезагрузите страницу или зайдите позже
            </p>
        </section>
    );
}

export default NetworkError;
