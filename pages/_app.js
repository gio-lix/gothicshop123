import '../styles/globals.css'
import StoreProvider from "../context/storeProvider";

function MyApp({ Component, pageProps }) {

  return (
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
  )
}

export default MyApp
