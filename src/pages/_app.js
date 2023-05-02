import '@/styles/globals.scss';
import '@/styles/typography.scss';
import '@/styles/cssvariables.scss';

import { Montserrat } from 'next/font/google';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
const montserrat = Montserrat({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${montserrat.style.fontFamily}, sans-serif;
          }
        `}
      </style>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
