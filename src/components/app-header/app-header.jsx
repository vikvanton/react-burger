import React from "react";
import styles from "./app-header.module.css";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.list}>
                    <li className="mt-4 mb-4 mr-2 pt-4 pb-4 pl-5 pr-5">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a
                            href="#"
                            className={`${styles.link} ${styles.linkSelected} text text_type_main-default`}
                        >
                            <BurgerIcon type="primary" />
                            Конструктор
                        </a>
                    </li>
                    <li className="mt-4 mb-4 pt-4 pb-4 pl-5 pr-5">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a
                            href="#"
                            className={`${styles.link} text text_type_main-default text_color_inactive`}
                        >
                            <ListIcon type="secondary" />
                            Лента заказов
                        </a>
                    </li>
                    <li className={styles.logo}>
                        <Logo />
                    </li>
                    <li className="mt-4 mb-4 pt-4 pb-4 pl-5 pr-5">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a
                            href="#"
                            className={`${styles.link} text text_type_main-default text_color_inactive`}
                        >
                            <ProfileIcon type="secondary" />
                            Личный кабинет
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;
