import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
    return (
        <SessionProvider session={pageProps.session}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>{pageProps.title}</title>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
    
            <>
                <Component {...pageProps} />
            </>
        </SessionProvider>
    );
}

export default MyApp;