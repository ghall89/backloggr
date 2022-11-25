import { useRouter } from 'next/router';

import Game from '../../src/components/Game';

const GamePage = () => {
	const router = useRouter();
	const { id } = router.query;

	return <Game id={id} />;
};

export default GamePage;
