// STYLES
import '../styles/global.scss'
import styles from '../styles/app.module.scss'

// COMPONENTS
import { Header } from '../components/Header'
import { Player } from '../components/Player'

// CONTEXT
import { PlayerContextProvider } from '../contexts/PlayerContext'

const MyApp = ({ Component, pageProps }) => {
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  )
}

export default MyApp
