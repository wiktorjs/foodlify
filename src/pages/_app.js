import '@/styles/globals.scss';
import '@/styles/typography.scss';
import '@/styles/variables.scss';

import { Montserrat } from 'next/font/google';
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
      <Component {...pageProps} />
    </>
  );
}
