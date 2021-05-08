import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Provider as NextAuthProvider } from 'next-auth/client'

// import '../styles/global.scss'

import GlobalStyles from '../styles/GlobalStyles'

function MyApp({ Component, pageProps }: AppProps) {
  return(
  <NextAuthProvider session={pageProps.session}> 
    <Header />
    <Component {...pageProps} />
    <GlobalStyles />
  </NextAuthProvider>
  )
}

export default MyApp
