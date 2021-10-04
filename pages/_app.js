import Head from "next/head";
import Layout from '../components/Layout';
import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>Ontario Post-Secondary Esports | The Future of School Spirit</title>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
    
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default MyApp;