import { useState, useRef, FormEvent, RefObject } from "react";
import { useAppDispatch, useAppSelector, useForm, useShowPass } from "../../utils/hooks";
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
import { TAuth } from "../../utils/types";
import { INPUT_FIELD_ERROR, PROFILE_PASS_FIELD_ERROR } from "../../utils/consts";

function ProfileForm(): JSX.Element {
    const name = useAppSelector(selectName);
    const email = useAppSelector(selectEmail);
    const authRequest = useAppSelector(selectAuthRequest);
    const authError = useAppSelector(selectAuthError);
    const dispatch = useAppDispatch();
    const { formValues, formErrors, isFormValid, onFieldChange, setFormValues, setFormErrors } =
        useForm<TAuth>({
            name,
            email,
            password: "",
        });
    const { showPass, setShowPass, onShowPassIconClick } = useShowPass();
    const [formChanging, setFormChanging] = useState<boolean>(false);
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const onEditIconClick = (ref: RefObject<HTMLInputElement>): void => {
        setFormChanging(true);
        setTimeout(() => ref.current?.focus(), 0);
    };

    const onFormReset = (): void => {
        setFormChanging(false);
        setFormValues({
            name,
            email,
            password: "",
        });
        setFormErrors({
            name: false,
            email: false,
            password: false,
        });
        setShowPass(false);
    };

    const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!isFormValid()) return;
        dispatch(patchUser(formValues));
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
                    onChange={onFieldChange}
                    icon={!formChanging ? "EditIcon" : undefined}
                    onIconClick={() => onEditIconClick(nameRef)}
                    disabled={!formChanging}
                    value={formValues.name as string}
                    name="name"
                    error={formErrors.name}
                    errorText={INPUT_FIELD_ERROR}
                    size="default"
                    extraClass="mb-6"
                    autoComplete="username"
                    ref={nameRef}
                />
                <Input
                    type="email"
                    placeholder="E-mail"
                    onChange={onFieldChange}
                    icon={!formChanging ? "EditIcon" : undefined}
                    onIconClick={() => onEditIconClick(emailRef)}
                    disabled={!formChanging}
                    value={formValues.email}
                    name="email"
                    error={formErrors.email}
                    errorText={INPUT_FIELD_ERROR}
                    size="default"
                    extraClass="mb-6"
                    autoComplete="email"
                    ref={emailRef}
                />
                <Input
                    type={showPass ? "text" : "password"}
                    placeholder="Пароль"
                    onChange={onFieldChange}
                    disabled={!formChanging}
                    icon={!formChanging ? "EditIcon" : showPass ? "HideIcon" : "ShowIcon"}
                    value={formValues.password}
                    name="password"
                    error={formErrors.password}
                    onIconClick={
                        !formChanging ? () => onEditIconClick(passwordRef) : onShowPassIconClick
                    }
                    errorText={PROFILE_PASS_FIELD_ERROR}
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
