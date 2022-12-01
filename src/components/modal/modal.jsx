import { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";

function Modal({ children, header, onClose }) {
    useEffect(() => {
        const escButtonHandler = (e) => {
            if (e.keyCode === 27) {
                onClose();
            }
        };
        document.addEventListener("keydown", escButtonHandler);
        return () => {
            document.removeEventListener("keydown", escButtonHandler);
        };
    }, [onClose]);

    return createPortal(
        <ModalOverlay onClose={onClose}>
            <section
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <header
                    className={`${styles.header} mt-10 ml-10 mr-10 pb-3 pt-3`}
                >
                    {<h1 className="text text_type_main-large">{header}</h1>}
                    <CloseIcon type="primary" onClick={onClose} />
                </header>
                {children}
            </section>
        </ModalOverlay>,
        document.getElementById("modals")
    );
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired,
    header: PropTypes.string,
};

Modal.defaultProps = {
    header: "",
};

export default Modal;
