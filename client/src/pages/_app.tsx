import { AppProps } from 'next/app'
import Head from 'next/head'
import { MantineProvider, ColorScheme } from '@mantine/core'
import Layout from '@/components/Layout'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
	const { Component, pageProps } = props

	return (
		<>
			<Head>
				<title>DAILYCOOKIN</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MantineProvider
				theme={{
					colors: {
            ya: ['#f3f0e9', '#ededef', '#dcdcdc', '#9e9b98', '#212121', '#ffffff', '#3e424c', '#ff393e', '#00a615'],
					},
				}}
				withCSSVariables
				withGlobalStyles
				withNormalizeCSS
			>
				<Provider store={store}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Provider>
			</MantineProvider>
		</>
	)
}
