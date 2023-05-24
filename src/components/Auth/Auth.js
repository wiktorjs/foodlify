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
  const {darkTheme} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const sendRequest = async (credentials) => {
    const user = await validateUser(credentials);
    if(!user) return;
    
    dispatch(logIn(user));
    router.back();
  };


  return (
    <main className={`${classes.main} ${darkTheme ? 'dark' : ''}`}>
      <h2 className={classes.logo}>Foodlify</h2>
      <h3 className={classes.text}>
        {query.type === 'sign-up'
          ? 'Create new account'
          : 'Log into your account'}
      </h3>


      {!isLoading && <Form query={query} passCredentials={sendRequest} error={error} />}

      {isLoading && !error && (
        <Loader type="centered" text={`Signing ${query.type.slice(-2)}... || 'Loading'`} />
      )}

    </main>
  );
}
