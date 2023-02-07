import { TAppState } from "../../utils/types";

export const selectRestorationProcess = (state: TAppState): boolean =>
    state.passRestoration.restorationProcess;

export const selectRestorationComplete = (state: TAppState): boolean =>
    state.passRestoration.restorationComplete;

export const selectPassRestorationRequest = (state: TAppState): boolean =>
    state.passRestoration.passRestorationRequest;

export const selectPassRestorationError = (state: TAppState): string =>
    state.passRestoration.passRestorationError;
