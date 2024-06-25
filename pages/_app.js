import '../styles/globals.css';
import { useResourcesProvider } from '../components/useResource';

function MyApp({ Component, pageProps }) {
  return (
    <useResourcesProvider>
      <Component {...pageProps} />
    </useResourcesProvider>
  );
}

export default MyApp;
