import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { SocketProvider } from 'contexts/Socket';
export default function App({ Component, pageProps }: AppProps) {
    return (
        <SocketProvider>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </SocketProvider>
    );
}
