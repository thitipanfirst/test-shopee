import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '@/stores/store'
import { Layouts } from '@/components/common/layout'
import { useRouter } from 'next/router'
import { Noto_Sans_Thai } from 'next/font/google'
import Head from 'next/head'
const NotoSansThai = Noto_Sans_Thai({ subsets: ['latin'] })

export default function App({ Component, pageProps: { session, ...pageProps } }) {
    const router = useRouter()

    return (
        <main className={NotoSansThai.className}>
            <Head>
                <title>BBDashboard</title>
            </Head>
            <Provider store={store}>
                <Layouts>
                    <Component {...pageProps} />
                </Layouts>
            </Provider>
        </main>
    )
}
