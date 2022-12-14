import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, CLEAR_AUTH_ERROR } from "../../services/actions/authActions";
import styles from "./register.module.css";
import { Link, Redirect } from "react-router-dom";
import ModalOverlay from "../../components/modal-overlay/modal-overlay";
import Modal from "../../components/modal/modal";
import InfoMessage from "../../components/info-message/info-message";
import {
    Input,
    Button,
    InfoIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    selectAuthRequest,
    selectAuthError,
} from "../../services/selectors/authSelectors";

function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [formErrors, setFormErrors] = useState({
        name: false,
        email: false,
        password: false,
    });
    const [show, setShow] = useState(false);
    const authRequest = useSelector(selectAuthRequest);
    const authError = useSelector(selectAuthError);
    const dispatch = useDispatch();

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
        dispatch(setAuth(data, "register"));
    };

    return (
        <>
            <section className={styles.register}>
                <h1 className="mb-6 text text_type_main-medium">??????????????????????</h1>
                <form className="mb-20" onSubmit={onFormSubmit}>
                    <Input
                        type="text"
                        placeholder="??????"
                        onChange={onChange}
                        value={form.name}
                        name="name"
                        error={formErrors.name}
                        errorText="???????? ???? ???????????? ???????? ????????????"
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
                        errorText="???????? ???? ???????????? ???????? ????????????"
                        size="default"
                        extraClass="mb-6"
                        autoComplete="email"
                    />
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="????????????"
                        onChange={onChange}
                        icon={show ? "HideIcon" : "ShowIcon"}
                        value={form.password}
                        name="password"
                        error={formErrors.password}
                        onIconClick={onIconClick}
                        errorText="???????????? ???????????? ?????????????????? ???? 6 ???? 15 ????????????????"
                        size="default"
                        extraClass="mb-6"
                        autoComplete="new-password"
                    />
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="large"
                        extraClass={styles.btn}
                    >
                        ????????????????????????????????????
                    </Button>
                </form>
                <div className="text_type_main-small">
                    <span className="text_color_inactive">
                        ?????? ?????????????????????????????????{" "}
                    </span>
                    <Link to="/login" className={styles.link}>
                        ??????????
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
