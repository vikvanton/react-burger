import { useState, useRef, SyntheticEvent, RefObject } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import styles from "./profile-form.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import InfoMessage from "../info-message/info-message";
import { patchUser, CLEAR_AUTH_ERROR } from "../../services/actions/authActions";
import { Input, Button, InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    selectName,
    selectEmail,
    selectAuthRequest,
    selectAuthError,
} from "../../services/selectors/authSelectors";
import { IRegisterForm } from "../../utils/types";

function ProfileForm(): JSX.Element {
    const name = useAppSelector(selectName);
    const email = useAppSelector(selectEmail);
    const authRequest = useAppSelector(selectAuthRequest);
    const authError = useAppSelector(selectAuthError);
    const dispatch = useAppDispatch();
    const initialFormData: IRegisterForm<string> = {
        name,
        email,
        password: "",
    };
    const initialFormErrors: IRegisterForm<boolean> = {
        name: false,
        email: false,
        password: false,
    };
    const [formChanging, setFormChanging] = useState<boolean>(false);
    const [form, setForm] = useState<IRegisterForm<string>>(initialFormData);
    const [formErrors, setFormErrors] = useState<IRegisterForm<boolean>>(initialFormErrors);
    const [show, setShow] = useState<boolean>(false);
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const onNameEditIconClick = (): void => {
        setFormChanging(true);
        setTimeout(() => nameRef.current?.focus(), 0);
    };

    const onEmailEditIconClick = (): void => {
        setFormChanging(true);
        setTimeout(() => emailRef.current?.focus(), 0);
    };

    const onPasswordEditIconClick = (): void => {
        setFormChanging(true);
        setTimeout(() => passwordRef.current?.focus(), 0);
    };

    const onChange = (e: SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;
        setFormErrors({ ...formErrors, [target.name]: false });
        setForm({ ...form, [target.name]: target.value });
    };

    const onShowIconClick = (): void => {
        setShow(!show);
    };

    const onFormReset = (): void => {
        setFormChanging(false);
        setForm(initialFormData);
        setFormErrors(initialFormErrors);
        setShow(false);
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
        const data: IRegisterForm<string> = {
            name: form.name,
            email: form.email,
            password: form.password,
        };
        dispatch(patchUser(data));
    };

    const closeModal = (): void => {
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
                    icon={!formChanging ? "EditIcon" : show ? "HideIcon" : "ShowIcon"}
                    value={form.password}
                    name="password"
                    error={formErrors.password}
                    onIconClick={!formChanging ? onPasswordEditIconClick : onShowIconClick}
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
