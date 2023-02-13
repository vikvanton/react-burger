import { legacy_createStore as createStore } from "redux";
import { store } from "../store/store";
import { rootReducer } from "../reducers";

describe("root reducer an store test", () => {
    let testStore = createStore(rootReducer);

    it("should equal state objects", () => {
        expect(testStore.getState()).toEqual(store.getState());
    });
});
