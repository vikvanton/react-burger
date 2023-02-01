import styles from "./app.module.css";
import { useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { getIngredients } from "../../services/actions/ingredientsActions";
import AppHeader from "../app-header/app-header";
import MainPage from "../../pages/main-page/main-page";
import Ingredient from "../../pages/ingredient/ingredient";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import ProtectedRoute from "../protected-route/protected-route";
import Feed from "../../pages/feed/feed";
import NotFound from "../../pages/not-found/not-found";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useCheckAuth } from "../../utils/hooks";
import { selectIngredientsRequest } from "../../services/selectors/ingredientsSelectors";
import { TLocationBackgState } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import Order from "../../pages/order/order/order";
import ModalManager from "../modal-manager/modal-manager";

function App(): JSX.Element {
    const ingredientsRequest = useAppSelector(selectIngredientsRequest);
    const { checking, checkAuth } = useCheckAuth();
    const dispatch = useAppDispatch();
    const location = useLocation<TLocationBackgState>();
    const background = location.state?.background;

    useEffect(() => {
        dispatch(getIngredients());
        // Проверяем, авторизован ли пользователь
        checkAuth();
    }, [checkAuth, dispatch]);

    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                {!ingredientsRequest && !checking && (
                    <Switch location={background || location}>
                        <Route path="/" exact>
                            <MainPage />
                        </Route>
                        <Route path="/ingredient/:id" exact>
                            <Ingredient />
                        </Route>
                        <Route path="/feed/:id" exact>
                            <Order />
                        </Route>
                        <Route path="/feed" exact>
                            <Feed />
                        </Route>
                        <Route path="/login" exact>
                            <Login />
                        </Route>
                        <ProtectedRoute path="/register" exact forUnAuth>
                            <Register />
                        </ProtectedRoute>
                        <ProtectedRoute path="/forgot-password" exact forUnAuth>
                            <ForgotPassword />
                        </ProtectedRoute>
                        <ProtectedRoute path="/reset-password" exact forUnAuth>
                            <ResetPassword />
                        </ProtectedRoute>
                        <ProtectedRoute path="/profile/orders/:id" exact>
                            <Order />
                        </ProtectedRoute>
                        <ProtectedRoute path="/profile">
                            <Profile />
                        </ProtectedRoute>
                        <Route>
                            <NotFound />
                        </Route>
                    </Switch>
                )}
            </main>
            <ModalManager />
            {checking && <ModalOverlay />}
        </>
    );
}

export default App;
