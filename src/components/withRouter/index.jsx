import { useParams, useNavigate, useLocation } from "react-router-dom";

const withRouter = (WrappedComponent) => {
  function WithRouterProps(props) {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    return (
      <WrappedComponent {...props} router={{ params, navigate, location }} />
    );
  }

  return WithRouterProps;
};

export default withRouter;
