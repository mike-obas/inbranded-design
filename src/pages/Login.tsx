import UserAccess from "../components/UserAccess";

function Login() {
  return (
    <UserAccess
      titleText="Login to access your account"
      actionType="login"
      otherLink={{linkText: 'Sign up', link: '/signup'}}
      otherText="Don't have an account yet?"
    />
  );
}

export default Login;

