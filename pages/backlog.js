import Head from 'next/head';
import { useUser } from '@auth0/nextjs-auth0';

import Backlog from '../src/components/Backlog';

const BacklogPage = () => {
	const { user } = useUser();

	return <Backlog />;
};

export default BacklogPage;
