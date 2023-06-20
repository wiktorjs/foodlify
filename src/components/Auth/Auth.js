import classes from '../../components/Auth/Form.module.scss';
import Loader from '../UI/Loader';
import Form from './Form';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import useLoginRequest from '@/hooks/use-login-request';

export default function Auth({ query }) {

  const { isLoading, error, sendRequest } = useLoginRequest();

  return (
    <main className={`${classes.main}`}>
      <h2 className={classes.logo}>Foodlify</h2>
      <h3 className={classes.text}>
        {query.type === 'sign-up'
          ? 'Create new account'
          : 'Log into your account'}
      </h3>

      {!isLoading && (
        <Form query={query} passCredentials={(credentials) => sendRequest(credentials, query)} error={error} />
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
