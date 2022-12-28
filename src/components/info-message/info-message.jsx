import styles from "./info-message.module.css";
import PropTypes from "prop-types";

function InfoMessage({ text, children }) {
    return (
        <section className={`${styles.container} text text_type_main-medium`}>
            {children}
            {text ? <p className="pb-15">{text}</p> : null}
        </section>
    );
}

InfoMessage.propTypes = {
    text: PropTypes.string,
    children: PropTypes.element.isRequired,
};

InfoMessage.defaultProps = {
    text: "",
};

export default InfoMessage;
