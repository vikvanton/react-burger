import { useState, useEffect, SyntheticEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { setAuth, CLEAR_AUTH_ERROR } from "../../services/actions/authActions";
import { PASS_RESTORATION_END } from "../../services/actions/passRestorationActions";
import styles from "./login.module.css";
import { Link, Redirect, useLocation } from "react-router-dom";
import ModalOverlay from "../../components/modal-overlay/modal-overlay";
import Modal from "../../components/modal/modal";
import InfoMessage from "../../components/info-message/info-message";
import { Input, Button, InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    selectAccessToken,
    selectAuthRequest,
    selectAuthError,
} from "../../services/selectors/authSelectors";
import { selectRestorationProcess } from "../../services/selectors/passRestorationSelectors";
import { ILoginForm, TAuth, TLocationPrevState } from "../../utils/types";
import { LOGIN } from "../../utils/consts";

function Login(): JSX.Element {
    const [form, setForm] = useState<ILoginForm<string>>({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState<ILoginForm<boolean>>({
        email: false,
        password: false,
    });
    const [show, setShow] = useState<boolean>(false);
    const accessToken = useAppSelector(selectAccessToken);
    const authRequest = useAppSelector(selectAuthRequest);
    const authError = useAppSelector(selectAuthError);
    const restorationProcess = useAppSelector(selectRestorationProcess);
    const dispatch = useAppDispatch();
    const location = useLocation<TLocationPrevState>();

    useEffect(() => {
        restorationProcess && dispatch({ type: PASS_RESTORATION_END });
    }, [dispatch, restorationProcess]);

    const onChange = (e: SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;
        setFormErrors({ ...formErrors, [target.name]: false });
        setForm({ ...form, [target.name]: target.value });
    };

    const onIconClick = (): void => {
        setShow(!show);
    };

    const closeModal = (): void => {
        dispatch({ type: CLEAR_AUTH_ERROR });
    };

    const onFormSubmit = (e: SyntheticEvent): void => {
        e.preventDefault();
        const checkFormValid: ILoginForm<boolean> = {
            email: !form.email,
            password: !form.password,
        };
        if (!form.email || !form.password) {
            setFormErrors(checkFormValid);
            return;
        }
        const data: TAuth = {
            email: form.email,
            password: form.password,
        };
        dispatch(setAuth(data, LOGIN));
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
                    <Button htmlType="submit" type="primary" size="large" extraClass={styles.btn}>
                        Войти
                    </Button>
                </form>
                <div className="mb-4 text text_type_main-small">
                    <span className="text_color_inactive">Вы новый пользователь? </span>
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
