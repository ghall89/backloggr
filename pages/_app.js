import PropTypes from 'prop-types'
// import '../src/styles/globals.css'
import '@fontsource/public-sans'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'
import { ContextWrapper } from '../src/AppContext'

config.autoAddCss = false

function App({ Component, pageProps }) {
	return (
		<NextUIProvider>
			<SessionProvider>
				<ContextWrapper>
					<Component {...pageProps} />
				</ContextWrapper>
			</SessionProvider>
		</NextUIProvider>
	)
}

App.propTypes = {
	Component: PropTypes.func.isRequired,
	pageProps: PropTypes.object,
}

App.defaultProps = {
	pageProps: {},
}

export default App
