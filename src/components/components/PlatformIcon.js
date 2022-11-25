import {
	SiNintendoswitch,
	SiPlaystation5,
	SiPlaystation4,
	SiPlaystation3,
	SiPlaystation2,
} from 'react-icons/si';
import { GiRetroController } from 'react-icons/gi';

const PlatformIcon = ({ label }) => {
	switch (label) {
		case 'Switch':
			return <SiNintendoswitch />;
		case 'PS2':
			return <SiPlaystation2 />;
		case 'PS3':
			return <SiPlaystation3 />;
		case 'PS4':
			return <SiPlaystation4 />;
		case 'PS5':
			return <SiPlaystation5 />;
		default:
			return <GiRetroController />;
	}
};

export default PlatformIcon;
