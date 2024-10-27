import RegisterForm from '../views/RegisterForm';
// import SocialLoginButtons from '../views/SocialLoginButtons';
import TextWithLink from '../views/TextWithLink';
import TitleWithThemeToggle from '../views/TitleWithThemeToggle';
import { Divider, Link } from '@mui/material';

const RegisterPage = () => {
  return (
    <>
      <TitleWithThemeToggle title="Register" showWellCome={true} />
      {/* <SocialLoginButtons />
       */}
      <Divider sx={{ my: 3 }}>or</Divider>
      <RegisterForm />
      <Link href="#" variant="body2" underline="hover">
        Forgot your password?
      </Link>
      <TextWithLink
        mainText="Already have an account?"
        linkText="Log in"
        linkHref="/auth/login"
      />
    </>
  );
};

export default RegisterPage;
