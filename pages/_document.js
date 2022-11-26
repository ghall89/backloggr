import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="apple-touch-icon" sizes="180x180" href="/iphone180.png" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
