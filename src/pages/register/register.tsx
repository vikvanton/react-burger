import { SyntheticEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { setAuth, CLEAR_AUTH_ERROR } from "../../services/actions/authActions";
import styles from "./register.module.css";
import { Link } from "react-router-dom";
import ModalOverlay from "../../components/modal-overlay/modal-overlay";
import Modal from "../../components/modal/modal";
import InfoMessage from "../../components/info-message/info-message";
import { Input, Button, InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { selectAuthRequest, selectAuthError } from "../../services/selectors/authSelectors";
import { REGISTER } from "../../utils/consts";
import { IRegisterForm, TAuth } from "../../utils/types";

function Register(): JSX.Element {
    const [form, setForm] = useState<IRegisterForm<string>>({ name: "", email: "", password: "" });
    const [formErrors, setFormErrors] = useState<IRegisterForm<boolean>>({
        name: false,
        email: false,
        password: false,
    });
    const [show, setShow] = useState<boolean>(false);
    const authRequest = useAppSelector(selectAuthRequest);
    const authError = useAppSelector(selectAuthError);
    const dispatch = useAppDispatch();

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
        const noValidPass: boolean =
            !form.password || form.password.length < 6 || form.password.length > 15;
        const checkFormValid: IRegisterForm<boolean> = {
            name: !form.name,
            email: !form.email,
            password: noValidPass,
        };
        if (!form.name || !form.email || noValidPass) {
            setFormErrors(checkFormValid);
            return;
        }
        const data: TAuth = {
            name: form.name,
            email: form.email,
            password: form.password,
        };
        dispatch(setAuth(data, REGISTER));
    };

    return (
        <>
            <section className={styles.register}>
                <h1 className="mb-6 text text_type_main-medium">Регистрация</h1>
                <form className="mb-20" onSubmit={onFormSubmit}>
                    <Input
                        type="text"
                        placeholder="Имя"
                        onChange={onChange}
                        value={form.name}
                        name="name"
                        error={formErrors.name}
                        errorText="Поле не должно быть пустым"
                        size="default"
                        extraClass="mb-6"
                        autoComplete="username"
                    />
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
                        errorText="Пароль должен содержать от 6 до 15 символов"
                        size="default"
                        extraClass="mb-6"
                        autoComplete="new-password"
                    />
                    <Button htmlType="submit" type="primary" size="large" extraClass={styles.btn}>
                        Зарегистрироваться
                    </Button>
                </form>
                <div className="text_type_main-small">
                    <span className="text_color_inactive">Уже зарегистрированы? </span>
                    <Link to="/login" className={styles.link}>
                        Войти
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

export default Register;
