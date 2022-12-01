import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

function ModalOverlay({ children, onClose }) {
    return (
        <div className={styles.overlay} onClick={onClose}>
            {children}
        </div>
    );
}

ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
