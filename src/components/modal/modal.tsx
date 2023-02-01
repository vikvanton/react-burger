import { useEffect, ReactElement } from "react";
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";

interface IModalProps {
    children: ReactElement;
    onClose: () => void;
    header?: string;
    headerExtraClass?: string;
}

function Modal({ children, header, onClose, headerExtraClass }: IModalProps): JSX.Element {
    useEffect(() => {
        const escButtonHandler = (e: KeyboardEvent): void => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", escButtonHandler);
        return () => {
            document.removeEventListener("keydown", escButtonHandler);
        };
    }, [onClose]);

    return createPortal(
        <>
            <section className={styles.modal}>
                <header className={`${styles.header} mt-10 ml-10 mr-10 pb-3 pt-3`}>
                    <h1
                        className={`${
                            headerExtraClass ? `${headerExtraClass}` : "text text_type_main-large"
                        }`}
                    >
                        {header}
                    </h1>
                    <CloseIcon type="primary" onClick={onClose} />
                </header>
                {children}
            </section>
            <ModalOverlay onClose={onClose} />
        </>,
        document.getElementById("modals") as HTMLElement
    );
}

export default Modal;
