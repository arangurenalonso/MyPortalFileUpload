import LoginForm from '../views/LoginForm';
// import SocialLoginButtons from '../views/SocialLoginButtons';
import TitleWithThemeToggle from '../views/TitleWithThemeToggle';
import TextWithLink from '../views/TextWithLink';
import { Divider, Link } from '@mui/material';
const LoginPage = () => {
  return (
    <>
      <TitleWithThemeToggle title="Log in" showWellCome={true} />
      {/* <SocialLoginButtons /> */}
      <Divider sx={{ my: 3 }}>or</Divider>
      <LoginForm />
      <Link href="/auth/forgot-password" variant="body2" underline="hover">
        Forgot your password?
      </Link>
      <TextWithLink
        mainText="Don't have an account?"
        linkText="Sign up"
        linkHref="/auth/register"
      />
    </>
  );
};

export default LoginPage;
