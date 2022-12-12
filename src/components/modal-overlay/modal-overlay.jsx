import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

function ModalOverlay({ onClose }) {
    return <div className={styles.overlay} onClick={onClose}></div>;
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func,
};

ModalOverlay.defaultProps = {
    onClose: null,
};

export default ModalOverlay;
