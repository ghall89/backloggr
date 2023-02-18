const saveUser = user => {};

const userHandler = async (user, setUserData) => {
	if (!user) {
		return 'Error: No user object provided';
	}

	const { id, name, image } = user;

	let res = await fetch(`/api/users?user_ref=${id}`, {
		method: 'GET',
		headers: {},
	});

	res = await res.json();

	if (res.data.length === 0) {
		console.log('No Data');
		const newUser = fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username: name, img_url: image, auth_id: id }),
		});

		setUserData(newUser.json().data[0]);
	} else {
		setUserData(res.data[0]);
	}
};

export default userHandler;
