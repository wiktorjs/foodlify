import { logIn } from '@/store/user-slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useAutoLogin() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLoggedIn) return;
    const user = sessionStorage.getItem('user');
    user && dispatch(logIn(JSON.parse(user)));
  }, [isLoggedIn, dispatch]);
}
