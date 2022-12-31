import { useState } from "react";
import styles from "./reset-password.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, Redirect, useHistory } from "react-router-dom";
import ModalOverlay from "../../components/modal-overlay/modal-overlay";
import Modal from "../../components/modal/modal";
import InfoMessage from "../../components/info-message/info-message";
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

function ResetPassword() {
    const location = useLocation();
    const history = useHistory();
    const [form, setForm] = useState({ password: "", code: "" });
    const [formErrors, setFormErrors] = useState({
        password: false,
        code: false,
    });
    const [show, setShow] = useState(false);
    const restorationProcess = useSelector(selectRestorationProcess);
    const restorationComplete = useSelector(selectRestorationComplete);
    const passRestorationRequest = useSelector(selectPassRestorationRequest);
    const passRestorationError = useSelector(selectPassRestorationError);
    const dispatch = useDispatch();

    const onChange = (e) => {
        setFormErrors({ ...formErrors, [e.target.name]: false });
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const closeModal = () => {
        if (passRestorationError) {
            dispatch({ type: CLEAR_PASS_RESTORATION_ERROR });
            return;
        }
        if (restorationComplete) {
            dispatch({ type: PASS_RESTORATION_END });
            history.push("/login", null);
        }
    };

    const onIconClick = () => {
        setShow(!show);
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        const noValidPass =
            !form.password ||
            form.password.length < 6 ||
            form.password.length > 15;
        const checkFormValid = {
            password: noValidPass,
            code: !form.code,
        };
        if (noValidPass || !form.code) {
            setFormErrors(checkFormValid);
            return;
        }
        const data = {
            password: form.password,
            token: form.code,
        };
        dispatch(resetPass(data));
    };

    if (location.state?.prev === "/forgot-password" && restorationProcess)
        return (
            <>
                <section className={styles.login}>
                    <h1 className="mb-6 text text_type_main-medium">
                        Восстановление пароля
                    </h1>
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
                            value={form.code}
                            name="code"
                            error={formErrors.code}
                            errorText="Поле не должно быть пустым"
                            size="default"
                            extraClass="mb-6"
                            autoComplete="code"
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
                        <span className="text_color_inactive">
                            Вспомнили пароль?{" "}
                        </span>
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
