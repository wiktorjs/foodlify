import useValidate from '@/hooks/use-validate';
import classes from '../../components/Auth/Form.module.scss';
import Loader from '../UI/Loader';
import Form from './Form';
import { useDispatch } from 'react-redux';
import { logIn } from '@/store/user-slice';
import { useRouter } from 'next/router';

export default function Auth({ query }) {
  const { isLoading, error, validateUser } = useValidate();
  const dispatch = useDispatch();
  const router = useRouter();

  const sendRequest = async (credentials) => {
    let user = await validateUser(credentials);

    // If users signs up, send request to sign him in.
    if (query.type === 'sign-up') user = await validateUser({...credentials, query: {type: 'sign-in'}});

    if (!user) return;

    dispatch(logIn(user));
    sessionStorage.setItem('user', JSON.stringify(user));
    router.back();
  };

  return (
    <main className={`${classes.main}`}>
      <h2 className={classes.logo}>Foodlify</h2>
      <h3 className={classes.text}>
        {query.type === 'sign-up'
          ? 'Create new account'
          : 'Log into your account'}
      </h3>

      {!isLoading && (
        <Form query={query} passCredentials={sendRequest} error={error} />
      )}

      {isLoading && !error && (
        <Loader
          type="centered"
          text={`Signing ${query.type.slice(-2) || 'Loading'}...`}
        />
      )}
      
    </main>
  );
}
