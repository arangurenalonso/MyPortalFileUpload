import { LoginPage, RegisterPage } from '../pages';
import { RouteDefinition } from '../../../router/router.interface';
import RegistrationConfirmation from '../pages/RegistrationConfirmation';
import EmailConfirmation from '../pages/EmailConfirmation';
import ForgotPassword from '../pages/ForgotPassword';
import PasswordResetLinkSent from '../pages/PasswordResetLinkSent';
import ResetPassword from '../pages/ResetPassword';
import ResetPasswordSuccessfully from '../pages/ResetPasswordSuccessfully';

const authRoutesDefinition: RouteDefinition[] = [
  {
    to: 'login',
    path: 'login',
    Component: LoginPage,
    name: 'Login',
    isShowNavBar: false,
  },
  {
    to: 'forgot-password',
    path: 'forgot-password',
    Component: ForgotPassword,
    name: 'Forgot Password',
    isShowNavBar: false,
  },
  {
    to: 'password-reset-link-sent',
    path: 'password-reset-link-sent',
    Component: PasswordResetLinkSent,
    name: 'Password Reset Link Sent',
    isShowNavBar: false,
  },
  {
    to: 'reset-password',
    path: 'reset-password',
    Component: ResetPassword,
    name: 'Reset Password',
    isShowNavBar: false,
  },
  {
    to: 'reset-password/successfully',
    path: 'reset-password/successfully',
    Component: ResetPasswordSuccessfully,
    name: 'Reset Password Successfully',
    isShowNavBar: false,
  },

  {
    to: 'register',
    path: 'register',
    Component: RegisterPage,
    name: 'Register',
    isShowNavBar: false,
  },
  {
    to: 'register-confirmation',
    path: 'register-confirmation',
    Component: RegistrationConfirmation,
    name: 'Register Confirmation',
    isShowNavBar: false,
  },
  {
    to: 'email-confirmation',
    path: 'email-confirmation',
    Component: EmailConfirmation,
    name: 'Email Confirmation',
    isShowNavBar: false,
  },
];
export default authRoutesDefinition;
