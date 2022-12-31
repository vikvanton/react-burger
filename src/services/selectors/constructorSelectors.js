export const selectConstructorBun = (state) => state.burgerConstructor.bun;

export const selectConstructorList = (state) => state.burgerConstructor.list;

export const selectTotalSum = (state) =>
    state.burgerConstructor.list.reduce(
        (sum, current) => sum + current.price,
        0
    ) +
    (state.burgerConstructor.bun ? state.burgerConstructor.bun.price * 2 : 0);
