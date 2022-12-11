import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="apple-touch-icon" sizes="180x180" href="/iphone180.png" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta charSet="UTF-8" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
