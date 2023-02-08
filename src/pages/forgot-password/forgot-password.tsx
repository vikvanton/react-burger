import { FormEvent } from "react";
import styles from "./forgot-password.module.css";
import { useAppDispatch, useAppSelector, useForm } from "../../utils/hooks";
import { Link, Redirect } from "react-router-dom";
import ModalOverlay from "../../components/modal-overlay/modal-overlay";
import Modal from "../../components/modal/modal";
import InfoMessage from "../../components/info-message/info-message";
import { restorePass, CLEAR_PASS_RESTORATION_ERROR } from "../../services/actions/pass-restoration";
import { Input, Button, InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    selectRestorationProcess,
    selectPassRestorationRequest,
    selectPassRestorationError,
} from "../../services/selectors/pass-restoration";
import { TEmail } from "../../utils/types";
import { INPUT_FIELD_ERROR } from "../../utils/consts";

function ForgotPassword(): JSX.Element {
    const { formValues, formErrors, isFormValid, onFieldChange } = useForm<TEmail>({ email: "" });
    const restorationProcess = useAppSelector(selectRestorationProcess);
    const passRestorationRequest = useAppSelector(selectPassRestorationRequest);
    const passRestorationError = useAppSelector(selectPassRestorationError);
    const dispatch = useAppDispatch();

    const closeModal = (): void => {
        dispatch({ type: CLEAR_PASS_RESTORATION_ERROR });
    };

    const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!isFormValid()) return;
        dispatch(restorePass(formValues));
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
                        onChange={onFieldChange}
                        value={formValues.email}
                        name="email"
                        error={formErrors.email}
                        errorText={INPUT_FIELD_ERROR}
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
