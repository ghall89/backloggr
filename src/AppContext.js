import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { getGames } from '@lib/games'
import userHandler from '@lib/users'

const AppContext = createContext()

export const ContextWrapper = ({ children }) => {
	const { data, status } = useSession()
	const { query, pathname } = useRouter()
	const [userData, setUserData] = useState()
	const [games, setGames] = useState()
	const [loading, setLoading] = useState(true)
	const [filter, setFilter] = useState(query.tab || 'not_started')
	const [tabState, setTabState] = useState(query.tab || 'not_started')

	const user = data?.user

	const handleApi = useCallback(() => {
		setLoading(true)
		setTimeout(async () => {
			const res = await getGames(user?.id)
			setGames(res)
			window.sessionStorage.setItem('games', JSON.stringify(res))
			setLoading(false)
		}, 1000)
	}, [user])

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
	}, [status, handleApi])

	useEffect(() => {
		if (user) {
			userHandler(user, setUserData)
		}
	}, [user])

	return (
		<AppContext.Provider
			value={{
				games,
				handleApi,
				loading,
				user,
				userData,
				filter,
				setFilter,
				tabState,
				setTabState,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export const useAppContext = () => useContext(AppContext)
