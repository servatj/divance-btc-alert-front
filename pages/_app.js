import 'tailwindcss/tailwind.css'
import Script from 'next/script'

import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import Layout from '../components/Layout'

function getLibrary(provider) {
  return new Web3(provider)
}

function MyApp({ Component, pageProps }) {

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
      <Web3ReactProvider getLibrary={getLibrary}>
        <Layout>
           <Component {...pageProps} />
        </Layout>
      </Web3ReactProvider>
    </>
  )
}

export default MyApp
