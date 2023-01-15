import styles from "./profile.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route } from "react-router";
import { NavLink } from "react-router-dom";
import { clearAuth } from "../../services/actions/authActions";
import NotFound from "../not-found/not-found";
import ProfileForm from "../../components/profile-form/profile-form";
import { selectRefreshToken } from "../../services/selectors/authSelectors";

function Profile(): JSX.Element {
    const refreshToken: string = useSelector<any, string>(selectRefreshToken);
    const dispatch: any = useDispatch<any>();

    const onLogout = (): void => {
        dispatch(clearAuth({ token: refreshToken }));
    };

    return (
        <>
            <section className={styles.profile}>
                <nav className={styles.nav}>
                    <ul className="text text_type_main-medium">
                        <li>
                            <NavLink
                                to="/profile"
                                className={styles.link}
                                activeClassName={styles.linkSelected}
                                exact
                            >
                                Профиль
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/profile/orders"
                                className={styles.link}
                                activeClassName={styles.linkSelected}
                                exact
                            >
                                История заказов
                            </NavLink>
                        </li>
                        <li>
                            <span className={styles.link} onClick={onLogout}>
                                Выход
                            </span>
                        </li>
                    </ul>
                    <p className="text text_type_main-default text_color_inactive">
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </nav>
                <Switch>
                    <Route path="/profile" exact>
                        <ProfileForm />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </section>
        </>
    );
}

export default Profile;
