import styles from "./modal-overlay.module.css";

interface IModalOverlayProps {
    onClose?: () => void;
}

function ModalOverlay({ onClose }: IModalOverlayProps): JSX.Element {
    return <div className={styles.overlay} onClick={onClose}></div>;
}

export default ModalOverlay;
