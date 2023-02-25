import Head from 'next/head'
import Login from '@components/Login'

const LoginPage = () => (
	<div>
		<Head>
			<title>Backloggr - Login</title>
			<meta
				name="description"
				content="A gaming backlog manager built with Next.js!"
			/>
		</Head>
		<main>
			<Login />
		</main>
	</div>
)

export default LoginPage
