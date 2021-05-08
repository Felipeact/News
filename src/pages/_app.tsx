import { AppProps } from 'next/app'
import  { Header } from '../components/Header'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { ThemeProvider } from 'styled-components'
import { useState } from 'react'

// import '../styles/global.scss'

import GlobalStyles from '../styles/GlobalStyles'
import { ThemeName, themes } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  const [ themeName, setThemeName ] = useState<ThemeName>('dark');
  const currentTheme = themes[themeName]

  return(
  <ThemeProvider theme={currentTheme}>
    <NextAuthProvider session={pageProps.session}> 
      <Header themeName={themeName} setThemeName={setThemeName}/>
      <Component {...pageProps} />
      <GlobalStyles />
    </NextAuthProvider>
  </ThemeProvider>
  )
}

export default MyApp
