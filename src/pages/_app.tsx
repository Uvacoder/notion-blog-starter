import { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import 'css/global.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider defaultTheme="system">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
