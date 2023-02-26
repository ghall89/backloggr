import {
	SiNintendoswitch,
	SiPlaystation5,
	SiPlaystation4,
	SiPlaystation3,
	SiPlaystation2,
} from 'react-icons/si'
import { GiRetroController } from 'react-icons/gi'

const PlatformIcon = ({ label }) => {
	switch (label) {
		case 'Nintendo Switch':
			return <SiNintendoswitch />
		case 'PlayStation 2':
			return <SiPlaystation2 />
		case 'PlayStation 3':
			return <SiPlaystation3 />
		case 'PlayStation 4':
			return <SiPlaystation4 />
		case 'PlayStation 5':
			return <SiPlaystation5 />
		default:
			return <GiRetroController />
	}
}

export default PlatformIcon
