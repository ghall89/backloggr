import Head from 'next/head'
import { useState, useEffect } from 'react'

import { useSession } from 'next-auth/react'

import { Box, Fab, useMediaQuery } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useTheme } from '@mui/styles'

import { useAppContext } from '../AppContext'
import Layout from './Layout'

import { AddGameModal, GameCards, LoadingOverlay } from './components'
import GameModal from './GameModal'

const Backlog = () => {
	const { data, status } = useSession()
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))

	const { games, loading, filter } = useAppContext()

	const [title, setTitle] = useState('Backlog')
	const [filteredGames, setFilteredGames] = useState()
	const [openModal, setOpenModal] = useState(false)

	const [modalId, setModalId] = useState()
	const [gameModalOpen, setGameModalOpen] = useState(false)

	useEffect(() => {
		if (games) {
			if (filter === 'all') {
				setFilteredGames(games)
			} else {
				const filteredArr = []
				games.forEach((game) => {
					if (game.status.includes(filter)) {
						filteredArr.push(game)
					}
				})
				setFilteredGames(filteredArr)
			}
		}
	}, [games, filter])

	useEffect(() => {
		switch (filter) {
			case 'not_started':
				setTitle('Backlog')
				break
			case 'in_progress':
				setTitle('Playing')
				break
			case 'finished':
				setTitle('Finished')
				break
			case 'completed':
				setTitle('Completed')
				break
		}
	}, [filter])

	const closeGameModal = () => {
		setGameModalOpen(false)
		setModalId(null)
	}

	return (
		<Layout title={title}>
			{!status === 'authenticated' ? null : (
				<>
					{data?.user.name ? (
						<Head>
							<title>
								{`Backloggr - ${data?.user.name.split(' ')[0]}'s Backlog`}
							</title>
						</Head>
					) : null}

					<Box
						sx={{
							width: '100%',
							paddingBottom: { xs: 22, md: 9 },
						}}
					>
						<Box
							sx={{
								margin: 2,
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<Fab
								color="primary"
								aria-label="add game"
								onClick={() => setOpenModal(true)}
								variant={!isMobile ? 'extended' : null}
								sx={{
									position: 'fixed',
									right: 28,
									bottom: { xs: 120, md: 20 },
								}}
							>
								<Add />
								<Box sx={{ ml: 1, display: { xs: 'none', md: 'block' } }}>
									Add Game
								</Box>
							</Fab>
						</Box>
						<GameCards
							games={filteredGames}
							loading={loading}
							setModalId={setModalId}
							setModalOpen={setGameModalOpen}
						/>
					</Box>
					<AddGameModal openModal={openModal} setOpenModal={setOpenModal} />
					<GameModal
						id={modalId}
						open={gameModalOpen}
						modalClose={closeGameModal}
					/>
				</>
			)}
			<LoadingOverlay loading={loading} />
		</Layout>
	)
}

export default Backlog
