import { TAuthType } from "./types";

export const NORMA_API: string = "https://norma.nomoreparties.space/api";
export const WS_URL: string = "wss://norma.nomoreparties.space/orders";
export const BUN: "bun" = "bun";
export const MAIN: "main" = "main";
export const SAUCE: "sauce" = "sauce";
export const REGISTER: TAuthType = "register";
export const LOGIN: TAuthType = "login";
export const SOCKET_TOKEN_ERROR: "Invalid or missing token" = "Invalid or missing token";
export const INPUT_FIELD_ERROR: string = "Поле не должно быть пустым";
export const PASS_FIELD_ERROR: string = "Пароль должен содержать от 6 до 15 символов";
export const PROFILE_PASS_FIELD_ERROR: string =
    "Пароль должен содержать от 6 до 15 символов. Введите новый пароль для обновления или старый для подтверждения";
export const WS_RECEIVING_DATA: string = "Получаем данные с сервера...";
export const WS_NO_CONNECTION: string = "Отсутствует соединение с сервером";
