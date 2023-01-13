import styles from "./info-message.module.css";
import { ReactElement } from "react";

interface IInfoMessageProps {
    children: ReactElement;
    text?: string;
}

function InfoMessage({ text, children }: IInfoMessageProps): JSX.Element {
    return (
        <section className={`${styles.container} text text_type_main-medium`}>
            {children}
            {text ? <p className="pb-15">{text}</p> : null}
        </section>
    );
}

export default InfoMessage;
