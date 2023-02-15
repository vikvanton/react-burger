import { TAppState, TOrderInfo } from "../../utils/types";
import { createSelector } from "reselect";

export const selectOrders = (state: TAppState): Array<TOrderInfo> => state.socket.orders;

export const selectOrder = (number: string): ((state: TAppState) => TOrderInfo | undefined) =>
    createSelector(selectOrders, (orders) => {
        return orders.find((order) => order.number.toString() === number);
    });

export const selectTotal = (state: TAppState): number => state.socket.total;

export const selectTotalToday = (state: TAppState): number => state.socket.totalToday;

export const selectSocketConnected = (state: TAppState): boolean => state.socket.socketConnected;

export const selectSocketError = (state: TAppState): string => state.socket.socketError;
