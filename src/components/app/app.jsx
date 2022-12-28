import styles from "./app.module.css";
import { useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
import NotFound from "../../pages/not-found/not-found";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useCheckAuth } from "../../utils/hooks";

function App() {
    const ingredientsRequest = useSelector(
        (state) => state.ingredients.ingredientsRequest
    );
    const { checking, checkAuth } = useCheckAuth();
    const dispatch = useDispatch();
    const location = useLocation();
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
                        <Route path="/ingredient/:id">
                            <Ingredient />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/forgot-password">
                            <ForgotPassword />
                        </Route>
                        <Route path="/reset-password">
                            <ResetPassword />
                        </Route>
                        <ProtectedRoute path="/profile">
                            <Profile />
                        </ProtectedRoute>
                        <Route>
                            <NotFound />
                        </Route>
                    </Switch>
                )}
            </main>
            {checking && <ModalOverlay />}
        </>
    );
}

export default App;
