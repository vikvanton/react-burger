import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../services/selectors/authSelectors";

function ProtectedRoute({ children, path, forUnAuth }) {
    const accessToken = useSelector(selectAccessToken);

    if (forUnAuth)
        return (
            <Route
                path={path}
                render={() => (accessToken ? <Redirect to="/" /> : children)}
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
            />
        );
}

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
    path: PropTypes.string.isRequired,
    forUnAuth: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
    forUnAuth: false,
};

export default ProtectedRoute;
