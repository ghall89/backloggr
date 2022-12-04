import Head from 'next/head';
import { useUser } from '@auth0/nextjs-auth0';

import Backlog from '../src/components/Backlog';

const BacklogPage = () => {
	const { user } = useUser();

	return (
		<div>
			<Head>
				<title>{`Backloggr - ${user.nickname}'s Backlog`}</title>
			</Head>
			<main>
				<Backlog />
			</main>
		</div>
	);
};

export default BacklogPage;
