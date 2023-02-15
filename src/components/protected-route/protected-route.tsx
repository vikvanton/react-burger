import { Redirect, Route } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";
import { selectAccessToken } from "../../services/selectors/auth";
import { ReactElement } from "react";

interface IProtectedRouteProps {
    children: ReactElement;
    path: string;
    exact?: boolean;
    forUnAuth?: boolean;
}

function ProtectedRoute({
    children,
    path,
    exact = false,
    forUnAuth = false,
}: IProtectedRouteProps): JSX.Element {
    const accessToken = useAppSelector(selectAccessToken);

    if (forUnAuth)
        return (
            <Route
                path={path}
                render={() => (accessToken ? <Redirect to="/" /> : children)}
                exact={exact}
            />
        );
    else
        return (
            <Route
                path={path}
                render={({ location }) =>
                    accessToken ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { prev: location.pathname },
                            }}
                        />
                    )
                }
                exact={exact}
            />
        );
}

export default ProtectedRoute;
