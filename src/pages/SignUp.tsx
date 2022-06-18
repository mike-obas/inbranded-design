import UserAccess from "../components/UserAccess";

function SignUp() {
  return (
    <UserAccess
      titleText="Sign up to start creating designs"
      actionType="sign up"
      otherLink={{linkText: 'Log in', link: '/'}}
      otherText="Already have an account?"
    />
  );
}

export default SignUp;

