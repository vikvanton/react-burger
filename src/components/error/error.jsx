import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./error.module.css";
import PropTypes from "prop-types";

function Error({ text }) {
    return (
        <section className={`${styles.container} text text_type_main-medium`}>
            <InfoIcon type="error" />
            {text ? <p className="pb-15">{text}</p> : null}
        </section>
    );
}

Error.propTypes = {
    text: PropTypes.string,
};

Error.defaultProps = {
    text: "",
};

export default Error;
