import { SyntheticEvent, useState } from "react";
import styles from "./reset-password.module.css";
import { History } from "history";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import ModalOverlay from "../../components/modal-overlay/modal-overlay";
import Modal from "../../components/modal/modal";
import InfoMessage from "../../components/info-message/info-message";
import { TLocationPrevState, TResetPassForm } from "../../utils/types";
import {
    resetPass,
    CLEAR_PASS_RESTORATION_ERROR,
    PASS_RESTORATION_END,
} from "../../services/actions/passRestorationActions";
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
} from "../../services/selectors/passRestorationSelectors";

function ResetPassword(): JSX.Element {
    const history: History<TLocationPrevState> = useHistory<TLocationPrevState>();
    const [form, setForm] = useState<TResetPassForm<string>>({ password: "", token: "" });
    const [formErrors, setFormErrors] = useState<TResetPassForm<boolean>>({
        password: false,
        token: false,
    });
    const [show, setShow] = useState(false);
    const restorationProcess: boolean = useSelector<any, boolean>(selectRestorationProcess);
    const restorationComplete: boolean = useSelector<any, boolean>(selectRestorationComplete);
    const passRestorationRequest: boolean = useSelector<any, boolean>(selectPassRestorationRequest);
    const passRestorationError: string = useSelector<any, string>(selectPassRestorationError);
    const dispatch: any = useDispatch<any>();

    const onChange = (e: SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;
        setFormErrors({ ...formErrors, [target.name]: false });
        setForm({ ...form, [target.name]: target.value });
    };

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

    const onIconClick = (): void => {
        setShow(!show);
    };

    const onFormSubmit = (e: SyntheticEvent): void => {
        e.preventDefault();
        const noValidPass: boolean =
            !form.password || form.password.length < 6 || form.password.length > 15;
        const checkFormValid: TResetPassForm<boolean> = {
            password: noValidPass,
            token: !form.token,
        };
        if (noValidPass || !form.token) {
            setFormErrors(checkFormValid);
            return;
        }
        const data: TResetPassForm<string> = {
            password: form.password,
            token: form.token,
        };
        dispatch(resetPass(data));
    };

    if (history.location.state?.prev === "/forgot-password" && restorationProcess)
        return (
            <>
                <section className={styles.login}>
                    <h1 className="mb-6 text text_type_main-medium">Восстановление пароля</h1>
                    <form className="mb-20" onSubmit={onFormSubmit}>
                        <Input
                            type={show ? "text" : "password"}
                            placeholder="Введите новый пароль"
                            onChange={onChange}
                            icon={show ? "HideIcon" : "ShowIcon"}
                            value={form.password}
                            name="password"
                            error={formErrors.password}
                            onIconClick={onIconClick}
                            errorText="Пароль должен содержать от 6 до 15 символов."
                            size="default"
                            extraClass="mb-6"
                            autoComplete="new-password"
                        />
                        <Input
                            type="text"
                            placeholder="Введите код из письма"
                            onChange={onChange}
                            value={form.token}
                            name="token"
                            error={formErrors.token}
                            errorText="Поле не должно быть пустым"
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
