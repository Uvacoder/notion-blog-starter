import 'css/global.css'
import { AppProps } from 'next/app'
import { useAppGA } from 'lib/ga'
import { AppContextProvider } from 'context/app'
import { useMousetrap } from 'hooks/use-mousetrap'
import { isDev } from 'lib/constants'
import { ThemeProvider } from 'next-themes'

const App = ({ Component, pageProps }: AppProps) => {
  if (isDev) {
    useMousetrap([
      {
        keys: ['command+i', 'ctrl+i', 'alt+i'],
        callback: () => document.body.classList.toggle('inspect')
      }
    ])
  }

  useAppGA()

  return (
    <ThemeProvider defaultTheme="system">
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </ThemeProvider>
  )
}

export default App
