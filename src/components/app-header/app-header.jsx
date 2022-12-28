import styles from "./app-header.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
    const refreshToken = useSelector((state) => state.auth.refreshToken);

    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.list}>
                    <li className="mt-4 mb-4 mr-2 pt-4 pb-4 pl-5 pr-5">
                        <NavLink
                            to="/"
                            className={`${styles.link} text text_type_main-default`}
                            activeClassName={styles.linkSelected}
                            exact
                        >
                            <BurgerIcon type="secondary" />
                            Конструктор
                        </NavLink>
                    </li>
                    <li className="mt-4 mb-4 pt-4 pb-4 pl-5 pr-5">
                        <NavLink
                            to="/feed"
                            className={`${styles.link} text text_type_main-default`}
                            activeClassName={styles.linkSelected}
                        >
                            <ListIcon type="secondary" />
                            Лента заказов
                        </NavLink>
                    </li>
                    <li className={styles.logo}>
                        <Logo />
                    </li>
                    <li className="mt-4 mb-4 pt-4 pb-4 pl-5 pr-5">
                        <NavLink
                            to={refreshToken ? "/profile" : "/login"}
                            className={`${styles.link} text text_type_main-default`}
                            activeClassName={styles.linkSelected}
                            isActive={(match, location) => {
                                return (
                                    match ||
                                    location.pathname === "/register" ||
                                    location.pathname === "/forgot-password" ||
                                    location.pathname === "/reset-password"
                                );
                            }}
                        >
                            <ProfileIcon type="secondary" />
                            {refreshToken ? "Личный кабинет" : "Войти"}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;
