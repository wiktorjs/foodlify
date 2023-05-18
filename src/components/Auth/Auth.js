import useValidate from '@/hooks/use-validate';
import classes from '../../components/Auth/Form.module.scss';
import Loader from '../UI/Loader';
import Form from './Form';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '@/store/user-slice';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Auth({ query }) {
  const { isLoading, error, validateUser } = useValidate();
  const dispatch = useDispatch();
  const router = useRouter();

  const sendRequest = async (credentials) => {
    const user = await validateUser(credentials);
    if(!user) return;
    
    dispatch(logIn(user));
    router.push('/');
  };

  return (
    <main className={classes.main}>
      <h2 className={classes.logo}>Foodlify</h2>
      <h3 className={classes.text}>
        {query.type === 'sign-up'
          ? 'Create new account'
          : 'Log into your account'}
      </h3>

      {isLoading && !error && (
        <Loader type="centered" text={`Signing ${query.type.slice(-2)}...`} />
      )}

      {!isLoading && <Form query={query} passCredentials={sendRequest} error={error} />}
    </main>
  );
}
