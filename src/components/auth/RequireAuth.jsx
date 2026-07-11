import { Navigate, useLocation } from "react-router-dom";

/**
 * Gates a route behind login. Unlike redirecting to "/", this sends an
 * unauthenticated visitor to /login and remembers where they were headed
 * (via location state) so they land back there after signing in — the same
 * path handles both "never logged in" and "token expired mid-session".
 */
function RequireAuth({ user, children }) {
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;
