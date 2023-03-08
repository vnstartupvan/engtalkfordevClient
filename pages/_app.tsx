import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { store } from '../libs/redux/store';
import { Provider } from 'react-redux';
// import { SocketProvider } from '@libs/Socket';
import { initiateSocket } from '@libs/Socket/room-socket';
export default function App({ Component, pageProps }: AppProps) {
    initiateSocket();
    return (
        // <SocketProvider>
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
