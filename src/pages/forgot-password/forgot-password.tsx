import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./forgot-password.module.css";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { Link, Redirect } from "react-router-dom";
import ModalOverlay from "../../components/modal-overlay/modal-overlay";
import Modal from "../../components/modal/modal";
import InfoMessage from "../../components/info-message/info-message";
import {
    restorePass,
    CLEAR_PASS_RESTORATION_ERROR,
} from "../../services/actions/passRestorationActions";
import { Input, Button, InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    selectRestorationProcess,
    selectPassRestorationRequest,
    selectPassRestorationError,
} from "../../services/selectors/passRestorationSelectors";

function ForgotPassword(): JSX.Element {
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<boolean>(false);
    const restorationProcess = useAppSelector(selectRestorationProcess);
    const passRestorationRequest = useAppSelector(selectPassRestorationRequest);
    const passRestorationError = useAppSelector(selectPassRestorationError);
    const dispatch = useAppDispatch();

    const closeModal = (): void => {
        dispatch({ type: CLEAR_PASS_RESTORATION_ERROR });
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmailError(false);
        setEmail(e.target.value);
    };

    const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!email) {
            setEmailError(true);
            return;
        }
        dispatch(restorePass({ email }));
    };

    if (restorationProcess)
        return (
            <Redirect
                to={{
                    pathname: "/reset-password",
                    state: { prev: "/forgot-password" },
                }}
            />
        );

    return (
        <>
            <section className={styles.forgotPass}>
                <h1 className="mb-6 text text_type_main-medium">Восстановление пароля</h1>
                <form className="mb-20" onSubmit={onFormSubmit}>
                    <Input
                        type="email"
                        placeholder="Укажите e-mail"
                        onChange={onChange}
                        value={email}
                        name="email"
                        error={emailError}
                        errorText="Поле не должно быть пустым"
                        size="default"
                        extraClass="mb-6"
                        autoComplete="email"
                    />
                    <Button htmlType="submit" type="primary" size="large" extraClass={styles.btn}>
                        Восстановить
                    </Button>
                </form>
                <div className="text_type_main-small">
                    <span className="text_color_inactive">Вспомнили пароль? </span>
                    <Link to="/login" className={styles.link}>
                        Войти
                    </Link>
                </div>
            </section>
            {passRestorationRequest && <ModalOverlay />}
            {passRestorationError && (
                <Modal onClose={closeModal}>
                    <InfoMessage text={passRestorationError}>
                        <InfoIcon type="error" />
                    </InfoMessage>
                </Modal>
            )}
        </>
    );
}

export default ForgotPassword;
