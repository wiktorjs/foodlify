import classes from './Form.module.scss';
import Input from './Input';
import { useFormik } from 'formik';
import useValidate from '@/hooks/use-validate';

const username = {
  label: 'Username',
  for: 'username',
  type: 'text',
  placeholder: 'Enter your username',
};

const password = {
  label: 'Password',
  for: 'password',
  type: 'password',
  placeholder: 'Shh... What\'s the secret word?',
};

export default function Form({ query }) {
  const { validateUser } = useValidate();

  const validate = (values) => {
    const errors = {};
    const usernameRegExpValid = /^[a-zA-Z0-9_]{5,15}$/i.test(values.username);
    const passwordRegExpValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(
        values.password
      );

    if (!usernameRegExpValid)
      errors.username = 'Username must be 5-15 chars long and can only contain letters, numbers and underscore.';
    if (!passwordRegExpValid)
      errors.password =
        'Password must be min. 8 chars long, contain at least one number and special character.';

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate,
    onSubmit: async (values) => {
      const credentials = {
        username: values.username,
        password: values.password,
        query
      };
      validateUser(credentials);
    },
  });

  // prettier-ignore
  const hasErrors = formik.touched.password && formik.touched.username && (formik.errors.password || formik.errors.username);
  const usernameIsInvalid = formik.touched.username && formik.errors.username;
  const passwordIsInvalid = formik.touched.password && formik.errors.password;

  return (
    <main className={classes.main}>
      <h2 className={classes.logo}>Foodlify</h2>
      <h3 className={classes.text}>
        {query.type === 'sign-up'
          ? 'Create new account'
          : 'Log into your account'}
      </h3>

      <form
        className={classes['form_container']}
        onSubmit={formik.handleSubmit}
      >
        <Input
          invalid={usernameIsInvalid}
          type={username}
          {...formik.getFieldProps('username')}
        />
        {usernameIsInvalid && (
          <p className={classes.error}>{formik.errors.username}</p>
        )}

        <Input
          invalid={passwordIsInvalid}
          type={password}
          {...formik.getFieldProps('password')}
        />
        {passwordIsInvalid && (
          <p className={classes.error}>{formik.errors.password}</p>
        )}

        <button
          title="Sign In"
          type="submit"
          className={`${classes['sign-in_btn']} ${
            hasErrors ? classes.disabled : ''
          }`}
          disabled={hasErrors ? true : false}
        >
          <span>{query.type === 'sign-up' ? 'Sign Up' : 'Sign In'}</span>
        </button>
      </form>
    </main>
  );
}
