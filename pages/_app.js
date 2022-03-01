import 'tailwindcss/tailwind.css'
import Script from 'next/script'
import Layout from '../components/Layout'
import { MoralisProvider } from "react-moralis";


function MyApp({ Component, pageProps }) {
  const SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
  const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script id='ga-analytics'>
        {
          `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `
        }
      </Script>
        <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MoralisProvider>
    </>
  )
}

export default MyApp
