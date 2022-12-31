export const selectRestorationProcess = (state) =>
    state.passRestoration.restorationProcess;

export const selectRestorationComplete = (state) =>
    state.passRestoration.restorationComplete;

export const selectPassRestorationRequest = (state) =>
    state.passRestoration.passRestorationRequest;

export const selectPassRestorationError = (state) =>
    state.passRestoration.passRestorationError;
