import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/icons/iphone180.png" />
				<meta name="theme-color" content="#393a4c" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta charSet="UTF-8" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
