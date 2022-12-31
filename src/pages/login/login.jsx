import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, CLEAR_AUTH_ERROR } from "../../services/actions/authActions";
import { PASS_RESTORATION_END } from "../../services/actions/passRestorationActions";
import styles from "./login.module.css";
import { Link, Redirect, useLocation } from "react-router-dom";
import ModalOverlay from "../../components/modal-overlay/modal-overlay";
import Modal from "../../components/modal/modal";
import InfoMessage from "../../components/info-message/info-message";
import {
    Input,
    Button,
    InfoIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    selectAccessToken,
    selectAuthRequest,
    selectAuthError,
} from "../../services/selectors/authSelectors";
import { selectRestorationProcess } from "../../services/selectors/passRestorationSelectors";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState({
        email: false,
        password: false,
    });
    const [show, setShow] = useState(false);
    const accessToken = useSelector(selectAccessToken);
    const authRequest = useSelector(selectAuthRequest);
    const authError = useSelector(selectAuthError);
    const restorationProcess = useSelector(selectRestorationProcess);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        restorationProcess && dispatch({ type: PASS_RESTORATION_END });
    }, [dispatch, restorationProcess]);

    const onChange = (e) => {
        setFormErrors({ ...formErrors, [e.target.name]: false });
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onIconClick = () => {
        setShow(!show);
    };

    const closeModal = () => {
        dispatch({ type: CLEAR_AUTH_ERROR });
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        const checkFormValid = {
            email: !form.email,
            password: !form.password,
        };
        if (!form.email || !form.password) {
            setFormErrors(checkFormValid);
            return;
        }
        const data = {
            email: form.email,
            password: form.password,
        };
        dispatch(setAuth(data, "login"));
    };

    if (accessToken) {
        return (
            <Redirect
                to={{
                    pathname: location.state?.prev ? location.state.prev : "/",
                }}
            />
        );
    }

    return (
        <>
            <section className={styles.login}>
                <h1 className="mb-6 text text_type_main-medium">Вход</h1>
                <form className="mb-20" onSubmit={onFormSubmit}>
                    <Input
                        type="email"
                        placeholder="E-mail"
                        onChange={onChange}
                        value={form.email}
                        name="email"
                        error={formErrors.email}
                        errorText="Поле не должно быть пустым"
                        size="default"
                        extraClass="mb-6"
                        autoComplete="email"
                    />
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Пароль"
                        onChange={onChange}
                        icon={show ? "HideIcon" : "ShowIcon"}
                        value={form.password}
                        name="password"
                        error={formErrors.password}
                        onIconClick={onIconClick}
                        errorText="Поле не должно быть пустым"
                        size="default"
                        extraClass="mb-6"
                        autoComplete="current-password"
                    />
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="large"
                        extraClass={styles.btn}
                    >
                        Войти
                    </Button>
                </form>
                <div className="mb-4 text text_type_main-small">
                    <span className="text_color_inactive">
                        Вы новый пользователь?{" "}
                    </span>
                    <Link to="/register" className={styles.link}>
                        Зарегистрироваться
                    </Link>
                </div>
                <div className="text_type_main-small">
                    <span className="text_color_inactive">Забыли пароль? </span>
                    <Link to="/forgot-password" className={styles.link}>
                        Восстановить пароль
                    </Link>
                </div>
            </section>
            {authRequest && <ModalOverlay />}
            {authError && (
                <Modal onClose={closeModal}>
                    <InfoMessage text={authError}>
                        <InfoIcon type="error" />
                    </InfoMessage>
                </Modal>
            )}
        </>
    );
}

export default Login;
