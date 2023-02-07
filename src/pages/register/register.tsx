import { FormEvent } from "react";
import { useAppDispatch, useAppSelector, useForm, useShowPass } from "../../utils/hooks";
import { setAuth, CLEAR_AUTH_ERROR } from "../../services/actions/authActions";
import styles from "./register.module.css";
import { Link } from "react-router-dom";
import ModalOverlay from "../../components/modal-overlay/modal-overlay";
import Modal from "../../components/modal/modal";
import InfoMessage from "../../components/info-message/info-message";
import { Input, Button, InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { selectAuthRequest, selectAuthError } from "../../services/selectors/authSelectors";
import { INPUT_FIELD_ERROR, PASS_FIELD_ERROR, REGISTER } from "../../utils/consts";
import { TAuth } from "../../utils/types";

function Register(): JSX.Element {
    const { formValues, formErrors, isFormValid, onFieldChange } = useForm<TAuth>({
        name: "",
        email: "",
        password: "",
    });
    const { showPass, onShowPassIconClick } = useShowPass();
    const authRequest = useAppSelector(selectAuthRequest);
    const authError = useAppSelector(selectAuthError);
    const dispatch = useAppDispatch();

    const closeModal = (): void => {
        dispatch({ type: CLEAR_AUTH_ERROR });
    };

    const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!isFormValid()) return;
        dispatch(setAuth(formValues, REGISTER));
    };

    return (
        <>
            <section className={styles.register}>
                <h1 className="mb-6 text text_type_main-medium">Регистрация</h1>
                <form className="mb-20" onSubmit={onFormSubmit}>
                    <Input
                        type="text"
                        placeholder="Имя"
                        onChange={onFieldChange}
                        value={formValues.name as string}
                        name="name"
                        error={formErrors.name}
                        errorText={INPUT_FIELD_ERROR}
                        size="default"
                        extraClass="mb-6"
                        autoComplete="username"
                    />
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
