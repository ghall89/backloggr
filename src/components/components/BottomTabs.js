import { useState } from 'react';
import Router, { useRouter } from 'next/router';

import { Tab, Tabs, Hidden } from '@mui/material';
import {
	CheckBox,
	EmojiEvents,
	FormatListBulleted,
	SportsEsports,
} from '@mui/icons-material';

const tabs = [
	{
		value: 'not_started',
		label: 'Backlog',
		icon: <FormatListBulleted />,
	},
	{
		value: 'in_progress',
		label: 'In Progress',
		icon: <SportsEsports />,
	},
	{
		value: 'finished',
		label: 'Finished',
		icon: <CheckBox />,
	},
	{
		value: 'completed',
		label: 'Completed',
		icon: <EmojiEvents />,
	},
];

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
			{tabs.map(({ value, label, icon }) => (
				<Tab
					key={value}
					value={value}
					label={<Hidden mdDown>{label}</Hidden>}
					icon={icon}
					iconPosition="start"
				/>
			))}
		</Tabs>
	);
};

export default BottomTabs;
