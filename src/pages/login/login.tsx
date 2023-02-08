import { useEffect, FormEvent } from "react";
import { useAppDispatch, useAppSelector, useForm, useShowPass } from "../../utils/hooks";
import { setAuth, CLEAR_AUTH_ERROR } from "../../services/actions/auth";
import { PASS_RESTORATION_END } from "../../services/actions/pass-restoration";
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
} from "../../services/selectors/auth";
import { selectRestorationProcess } from "../../services/selectors/pass-restoration";
import { TAuth, TLocationPrevState } from "../../utils/types";
import { INPUT_FIELD_ERROR, LOGIN, PASS_FIELD_ERROR } from "../../utils/consts";

function Login(): JSX.Element {
    const { formValues, formErrors, isFormValid, onFieldChange } = useForm<TAuth>({
        email: "",
        password: "",
    });
    const { showPass, onShowPassIconClick } = useShowPass();
    const accessToken = useAppSelector(selectAccessToken);
    const authRequest = useAppSelector(selectAuthRequest);
    const authError = useAppSelector(selectAuthError);
    const restorationProcess = useAppSelector(selectRestorationProcess);
    const dispatch = useAppDispatch();
    const location = useLocation<TLocationPrevState>();

    useEffect(() => {
        restorationProcess && dispatch({ type: PASS_RESTORATION_END });
    }, [dispatch, restorationProcess]);

    const closeModal = (): void => {
        dispatch({ type: CLEAR_AUTH_ERROR });
    };

    const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!isFormValid()) return;
        dispatch(setAuth(formValues, LOGIN));
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
                        onChange={onFieldChange}
                        value={formValues.email}
                        name="email"
                        error={formErrors.email}
                        errorText={INPUT_FIELD_ERROR}
                        size="default"
                        extraClass="mb-6"
                        autoComplete="email"
                    />
                    <Input
                        type={showPass ? "text" : "password"}
                        placeholder="Пароль"
                        onChange={onFieldChange}
                        icon={showPass ? "HideIcon" : "ShowIcon"}
                        value={formValues.password}
                        name="password"
                        error={formErrors.password}
                        onIconClick={onShowPassIconClick}
                        errorText={PASS_FIELD_ERROR}
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
