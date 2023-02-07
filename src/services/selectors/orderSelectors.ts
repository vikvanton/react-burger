import { TAppState } from "../../utils/types";

export const selectOrderNumber = (state: TAppState): number => state.order.orderNumber;

export const selectOrderRequest = (state: TAppState): boolean => state.order.orderRequest;

export const selectOrderError = (state: TAppState): string => state.order.orderError;
