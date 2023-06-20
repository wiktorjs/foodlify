import useValidate from '@/hooks/use-validate';
import { logIn } from '@/store/user-slice';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

export default function useLoginRequest() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { validateUser, isLoading, error } = useValidate();

  const sendRequest = async (credentials) => {
    let user = await validateUser(credentials);

    // If users signs up, send request to sign him in.
    if (credentials.query.type === 'sign-up')
      user = await validateUser({
        ...credentials,
        query: { type: 'sign-in' },
      });

    if (!user) return;

    dispatch(logIn(user));
    sessionStorage.setItem('user', JSON.stringify(user));
    router.push('/');
  };

  return {sendRequest, isLoading, error};
}
