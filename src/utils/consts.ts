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
// Литеральный тип экшена открытия сокет-соединения по умолчанию
export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
// Литеральный тип экшена отправки сокет-сообщения по умолчанию
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";
// Литеральный тип экшена окончания сеанса сокет-соединения по умолчанию
export const WS_CONNECTION_STOP: "WS_CONNECTION_STOP" = "WS_CONNECTION_STOP";
export const NO_ORDERS: string = "Отсутствуют заказы";
