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
                    <li
                        className={`${styles.item} text text_type_main-default mt-4 mb-4 mr-2 pt-4 pb-4 pl-5 pr-5`}
                    >
                        <span className="mr-2">
                            <BurgerIcon type="primary" />
                        </span>
                        <span>Конструктор</span>
                    </li>
                    <li
                        className={`${styles.item} text text_type_main-default mt-4 mb-4 pt-4 pb-4 pl-5 pr-5 text_color_inactive`}
                    >
                        <span className="mr-2">
                            <ListIcon type="secondary" />
                        </span>
                        <span>Лента заказов</span>
                    </li>
                    <li className={styles.logo}>
                        <Logo />
                    </li>
                    <li
                        className={`${styles.item} text text_type_main-default mt-4 mb-4 pt-4 pb-4 pl-5 pr-5 text_color_inactive`}
                    >
                        <span className="mr-2">
                            <ProfileIcon type="secondary" />
                        </span>
                        <span>Личный кабинет</span>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;
