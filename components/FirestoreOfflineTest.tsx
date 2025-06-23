import firestore, {
    FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

interface User {
    id: string;
    name: string;
    timestamp?: FirebaseFirestoreTypes.Timestamp;
}

const FirestoreOfflineTest: React.FC = () => {
    const [cachedUsers, setCachedUsers] = useState<User[]>([]);

    const addOfflineUser = async () => {
        try {
            console.log('Adding user (offline test)...');
            await firestore()
                .collection('Users')
                .add({
                    name: 'Offline User',
                    timestamp: firestore.FieldValue.serverTimestamp(),
                });
            console.log('User write queued!');
        } catch (err) {
            console.error('Write failed:', err);
        }
    };

    const fetchFromCache = async () => {
        try {
            console.log('Reading from cache...');
            const snapshot = await firestore()
                .collection('Users')
                .get({ source: 'cache' });

            const users: User[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...(doc.data() as Omit<User, 'id'>),
            }));

            console.log('Cached users:', users);
            setCachedUsers(users);
        } catch (err) {
            console.error('Cache read failed:', err);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Add User (Offline Test)" onPress={addOfflineUser} />
            <View style={styles.spacer} />
            <Button title="Read from Cache" onPress={fetchFromCache} />
            {cachedUsers.map(user => (
                <Text key={user.id}>👤 {user.name}</Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, marginTop: 50 },
    spacer: { height: 20 },
});

export default FirestoreOfflineTest;