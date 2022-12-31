import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./profile-form.module.css";
import ModalOverlay from "../../components/modal-overlay/modal-overlay";
import Modal from "../../components/modal/modal";
import InfoMessage from "../../components/info-message/info-message";
import {
    patchUser,
    CLEAR_AUTH_ERROR,
} from "../../services/actions/authActions";
import {
    Input,
    Button,
    InfoIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    selectName,
    selectEmail,
    selectAuthRequest,
    selectAuthError,
} from "../../services/selectors/authSelectors";

function ProfileForm() {
    const name = useSelector(selectName);
    const email = useSelector(selectEmail);
    const authRequest = useSelector(selectAuthRequest);
    const authError = useSelector(selectAuthError);
    const dispatch = useDispatch();
    const initialFormData = {
        name,
        email,
        password: "",
    };
    const initialFormErrors = {
        name: false,
        email: false,
        password: false,
    };
    const [formChanging, setFormChanging] = useState(false);
    const [form, setForm] = useState(initialFormData);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [show, setShow] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const onNameEditIconClick = () => {
        setFormChanging(true);
        setTimeout(() => nameRef.current.focus(), 0);
    };

    const onEmailEditIconClick = () => {
        setFormChanging(true);
        setTimeout(() => emailRef.current.focus(), 0);
    };

    const onPasswordEditIconClick = () => {
        setFormChanging(true);
        setTimeout(() => passwordRef.current.focus(), 0);
    };

    const onChange = (e) => {
        setFormErrors({ ...formErrors, [e.target.name]: false });
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onShowIconClick = (e) => {
        setShow(!show);
    };

    const onFormReset = () => {
        setFormChanging(false);
        setForm(initialFormData);
        setFormErrors(initialFormErrors);
        setShow(false);
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        const noValidPass =
            !form.password ||
            form.password.length < 6 ||
            form.password.length > 15;
        const checkFormValid = {
            name: !form.name,
            email: !form.email,
            password: noValidPass,
        };
        if (!form.name || !form.email || noValidPass) {
            setFormErrors(checkFormValid);
            return;
        }
        const data = {
            name: form.name,
            email: form.email,
            password: form.password,
        };
        dispatch(patchUser(data));
    };

    const closeModal = () => {
        dispatch({ type: CLEAR_AUTH_ERROR });
    };

    return (
        <>
            <form className="mt-30" onSubmit={onFormSubmit}>
                <Input
                    type="text"
                    placeholder="Имя"
                    onChange={onChange}
                    icon={!formChanging ? "EditIcon" : undefined}
                    onIconClick={onNameEditIconClick}
                    disabled={!formChanging}
                    value={form.name}
                    name="name"
                    error={formErrors.name}
                    errorText="Поле не должно быть пустым"
                    size="default"
                    extraClass="mb-6"
                    autoComplete="username"
                    ref={nameRef}
                />
                <Input
                    type="email"
                    placeholder="E-mail"
                    onChange={onChange}
                    icon={!formChanging ? "EditIcon" : undefined}
                    onIconClick={onEmailEditIconClick}
                    disabled={!formChanging}
                    value={form.email}
                    name="email"
                    error={formErrors.email}
                    errorText="Поле не должно быть пустым"
                    size="default"
                    extraClass="mb-6"
                    autoComplete="email"
                    ref={emailRef}
                />
                <Input
                    type={show ? "text" : "password"}
                    placeholder="Пароль"
                    onChange={onChange}
                    disabled={!formChanging}
                    icon={
                        !formChanging
                            ? "EditIcon"
                            : show
                            ? "HideIcon"
                            : "ShowIcon"
                    }
                    value={form.password}
                    name="password"
                    error={formErrors.password}
                    onIconClick={
                        !formChanging
                            ? onPasswordEditIconClick
                            : onShowIconClick
                    }
                    errorText="Пароль должен содержать от 6 до 15 символов. Введите новый пароль для обновления или старый для подтверждения"
                    size="default"
                    extraClass="mb-6"
                    autoComplete="new-password"
                    ref={passwordRef}
                />
                {formChanging && (
                    <div className={styles.btnControl}>
                        <Button
                            htmlType="button"
                            type="secondary"
                            size="large"
                            extraClass={styles.btn}
                            onClick={onFormReset}
                        >
                            Отменить
                        </Button>
                        <Button
                            htmlType="submit"
                            type="secondary"
                            size="large"
                            extraClass={styles.btn}
                        >
                            Изменить
                        </Button>
                    </div>
                )}
            </form>
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

export default ProfileForm;
