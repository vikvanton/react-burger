import { FormEvent } from "react";
import styles from "./reset-password.module.css";
import { useAppDispatch, useAppSelector, useForm, useShowPass } from "../../utils/hooks";
import { Link, Redirect, useHistory } from "react-router-dom";
import ModalOverlay from "../../components/modal-overlay/modal-overlay";
import Modal from "../../components/modal/modal";
import InfoMessage from "../../components/info-message/info-message";
import { TLocationPrevState, TRestorePass } from "../../utils/types";
import {
    resetPass,
    CLEAR_PASS_RESTORATION_ERROR,
    PASS_RESTORATION_END,
} from "../../services/actions/pass-restoration";
import {
    Input,
    Button,
    InfoIcon,
    CheckMarkIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    selectRestorationProcess,
    selectRestorationComplete,
    selectPassRestorationRequest,
    selectPassRestorationError,
} from "../../services/selectors/pass-restoration";
import { INPUT_FIELD_ERROR, PASS_FIELD_ERROR } from "../../utils/consts";

function ResetPassword(): JSX.Element {
    const history = useHistory<TLocationPrevState>();
    const { formValues, formErrors, isFormValid, onFieldChange } = useForm<TRestorePass>({
        password: "",
        token: "",
    });
    const { showPass, onShowPassIconClick } = useShowPass();
    const restorationProcess = useAppSelector(selectRestorationProcess);
    const restorationComplete = useAppSelector(selectRestorationComplete);
    const passRestorationRequest = useAppSelector(selectPassRestorationRequest);
    const passRestorationError = useAppSelector(selectPassRestorationError);
    const dispatch = useAppDispatch();

    const closeModal = (): void => {
        if (passRestorationError) {
            dispatch({ type: CLEAR_PASS_RESTORATION_ERROR });
            return;
        }
        if (restorationComplete) {
            dispatch({ type: PASS_RESTORATION_END });
            history.push("/login", null);
        }
    };

    const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!isFormValid()) return;
        dispatch(resetPass(formValues));
    };

    if (history.location.state?.prev === "/forgot-password" && restorationProcess)
        return (
            <>
                <section className={styles.login}>
                    <h1 className="mb-6 text text_type_main-medium">Восстановление пароля</h1>
                    <form className="mb-20" onSubmit={onFormSubmit}>
                        <Input
                            type={showPass ? "text" : "password"}
                            placeholder="Введите новый пароль"
                            onChange={onFieldChange}
                            icon={showPass ? "HideIcon" : "ShowIcon"}
                            value={formValues.password}
                            name="password"
                            error={formErrors.password}
                            onIconClick={onShowPassIconClick}
                            errorText={PASS_FIELD_ERROR}
                            size="default"
                            extraClass="mb-6"
                            autoComplete="new-password"
                        />
                        <Input
                            type="text"
                            placeholder="Введите код из письма"
                            onChange={onFieldChange}
                            value={formValues.token}
                            name="token"
                            error={formErrors.token}
                            errorText={INPUT_FIELD_ERROR}
                            size="default"
                            extraClass="mb-6"
                            autoComplete="token"
                        />
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="large"
                            extraClass={styles.btn}
                        >
                            Сохранить
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
                {(passRestorationError || restorationComplete) && (
                    <Modal onClose={closeModal}>
                        {passRestorationError ? (
                            <InfoMessage text={passRestorationError}>
                                <InfoIcon type="error" />
                            </InfoMessage>
                        ) : (
                            <InfoMessage text="Пароль успешно восстановлен">
                                <CheckMarkIcon type="success" />
                            </InfoMessage>
                        )}
                    </Modal>
                )}
            </>
        );
    else return <Redirect to="/forgot-password" />;
}

export default ResetPassword;
