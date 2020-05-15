import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ component: Component, ...rest }) {
    const user = useSelector(state => state.user);

    <Route {...rest} render={(props) => (
      user.isAuth === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
};

export default function PrivateUserRoute({ component: Component, ...rest }) {
    const user = useSelector(state => state.user);

    <Route {...rest} render={(props) => (
      user.isAuth === true && user.userData && user.userData == "user"
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
};

export default function PrivateOwnerRoute({ component: Component, ...rest }) {
    const user = useSelector(state => state.user);

    <Route {...rest} render={(props) => (
      user.isAuth === true && user.userData && user.userData == "owner"
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
};

export default function PrivateAdminRoute({ component: Component, ...rest }) {
    const user = useSelector(state => state.user);

    <Route {...rest} render={(props) => (
      user.isAuth === true && user.userData && user.userData == "admin"
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
};

