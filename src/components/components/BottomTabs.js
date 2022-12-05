import { useState } from 'react';
import Router, { useRouter } from 'next/router';

import { Tab, Tabs, Hidden } from '@mui/material';
import {
	CheckBox,
	EmojiEvents,
	FormatListBulleted,
	SportsEsports,
} from '@mui/icons-material';

const BottomTabs = ({ setFilter }) => {
	const { query } = useRouter();
	const [tabState, setTabState] = useState(query.tab || 'not_started');

	const handleTabs = (event, newValue) => {
		setTabState(newValue);
		setFilter(newValue);
	};

	return (
		<Tabs
			sx={{
				position: 'fixed',
				bottom: 0,
				left: 0,
				right: 0,
				backgroundColor: '#24273a',
				paddingBottom: 3,
			}}
			value={tabState}
			onChange={handleTabs}
			variant="fullWidth"
		>
			<Tab
				value="not_started"
				label={<Hidden smDown>Backlog</Hidden>}
				icon={<FormatListBulleted />}
			/>
			<Tab
				value="in_progress"
				label={<Hidden smDown>In Progress</Hidden>}
				icon={<SportsEsports />}
			/>
			<Tab
				value="finished"
				label={<Hidden smDown>Finished</Hidden>}
				icon={<CheckBox />}
			/>
			<Tab
				value="completed"
				label={<Hidden smDown>Completed</Hidden>}
				icon={<EmojiEvents />}
			/>
		</Tabs>
	);
};

export default BottomTabs;
