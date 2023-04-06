import { useMemo } from 'react'
import { Card, Container, Text, Grid } from '@nextui-org/react'

import Layout from '../Layout'

import { useAppContext } from '../../AppContext'

const Main = () => {
	const { games, loading } = useAppContext()

	const nowPlayingMemo = useMemo(() => {
		const arr = []
		if (loading === true || !games) {
			return arr
		}
		games?.forEach((game) => {
			if (game.status === 'in_progress') {
				arr.push(game)
			}
		})
		return arr
	}, [games, loading])

	return (
		<Layout>
			<Container>
				{loading ? null : (
					<>
						<Text h2>Now Playing</Text>
						<div style={{ overflowX: 'scroll', overflowY: 'hidden' }}>
							<Grid.Container gap={2} wrap="nowrap">
								{nowPlayingMemo.map((item) => (
									<Grid>
										<Card variant="flat">
											<Card.Image src={item.img} width={180} />
										</Card>
									</Grid>
								))}
							</Grid.Container>
						</div>
					</>
				)}
			</Container>
		</Layout>
	)
}

export default Main
