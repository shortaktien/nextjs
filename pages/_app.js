import '../styles/globals.css';
import { ResourcesProvider } from '../components/useResources';

function MyApp({ Component, pageProps }) {
  return (
    <ResourcesProvider>
      <Component {...pageProps} />
    </ResourcesProvider>
  );
}

export default MyApp;
