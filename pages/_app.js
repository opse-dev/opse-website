import Head from 'next/head';
import '../styles/globals.scss';
import themeConfig from '../styles/theme.config';
import Layout from '../components/Layout';
import { MantineProvider, NormalizeCSS, GlobalStyles } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import Router from 'next/router';
import NProgress from 'nprogress';

NProgress.configure({
    showSpinner: false,
    parent: '#__next',
});
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>{pageProps.title}</title>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <MantineProvider theme={themeConfig}>
                <NormalizeCSS />
                <GlobalStyles />

                <NotificationsProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </NotificationsProvider>
            </MantineProvider>
        </>
    );
}

export default MyApp;
