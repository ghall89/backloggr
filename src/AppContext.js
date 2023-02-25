import { createContext, useContext, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

import { getGames } from '@lib/games'
import userHandler from '@lib/users'

const AppContext = createContext()

export const ContextWrapper = ({ children }) => {
	const { data, status } = useSession()
	const [userData, setUserData] = useState()
	const [games, setGames] = useState()
	const [loading, setLoading] = useState(true)

	const user = data?.user

	const handleApi = () => {
		setLoading(true)
		setTimeout(async () => {
			const res = await getGames(user?.id)
			setGames(res)
			window.sessionStorage.setItem('games', JSON.stringify(res))
			setLoading(false)
		}, 1000)
	}

	useEffect(() => {
		const session = window.sessionStorage.getItem('games')

		if (session) {
			setGames(JSON.parse(session))
			setLoading(false)
			return
		}

		if (status === 'authenticated') {
			handleApi()
		}
	}, [status])

	useEffect(() => {
		if (user) {
			userHandler(user, setUserData)
		}
	}, [user])

	// useEffect(() => console.log(userData), [userData]);

	return (
		<AppContext.Provider value={{ games, handleApi, loading, user, userData }}>
			{children}
		</AppContext.Provider>
	)
}

export const useAppContext = () => useContext(AppContext)
