import { Text, TouchableOpacity, View } from 'react-native';
import { ref, set, child, get } from 'firebase/database';
import { db } from './firebaseConfig';
import { useState } from 'react';

export default function App() {
	const [firstName, setFirstName] = useState(null);
	const [lastName, setLastName] = useState(null);
	const dbRef = ref(db);
	async function getData() {
		get(child(dbRef, `users/testuser`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					let user = snapshot.val();
					console.log(user);
					setFirstName(user.firstName);
					setLastName(user.lastName);
				} else {
					console.log('No data available');
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text style={{ fontWeight: 'bold' }}>firstName</Text>
			<Text style={{ marginBottom: 15 }}>{firstName ?? 'undefined'}</Text>
			<Text style={{ fontWeight: 'bold' }}>lastName</Text>
			<Text>{lastName ?? 'undefined'}</Text>

			<TouchableOpacity
				style={{ margin: 25 }}
				onPress={() => {
					set(ref(db, 'users/' + 'testuser'), {
						firstName: 'Test',
						lastName: 'McUser',
					});
				}}
			>
				<Text>Test push to db</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					getData();
				}}
			>
				<Text>Test get from db</Text>
			</TouchableOpacity>
		</View>
	);
}
