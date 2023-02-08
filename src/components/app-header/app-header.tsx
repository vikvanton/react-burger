import { memo } from "react";
import styles from "./app-header.module.css";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { selectRefreshToken } from "../../services/selectors/auth";

function AppHeader(): JSX.Element {
    const refreshToken = useAppSelector(selectRefreshToken);

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
                            exact
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
                            isActive={(match, location) =>
                                match?.url === "/profile" ||
                                location.pathname === "/login" ||
                                location.pathname === "/register" ||
                                location.pathname === "/forgot-password" ||
                                location.pathname === "/reset-password"
                            }
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

export default memo(AppHeader);
