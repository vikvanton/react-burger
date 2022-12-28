import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function ProtectedRoute({ children, path }) {
    const accessToken = useSelector((state) => state.auth.accessToken);

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
};

export default ProtectedRoute;
