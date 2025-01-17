import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useMutation, gql } from '@apollo/client';
import {CREATE_TASK, TASKS_QUERY} from "@/lib/action";
import {router} from "expo-router";


const CreateTask: React.FC<{ refetch: () => void }> = ({ refetch })  => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [createTask, { loading }] = useMutation(CREATE_TASK, {
        refetchQueries: [{ query: TASKS_QUERY }],
    });

    const handleCreate = async () => {
        try {
            const formattedDueDate = new Date(dueDate).toISOString();
            await createTask({ variables: { title, description, completed: false, dueDate:formattedDueDate } });
            router.push('/');
        } catch (err) {
            alert('Failed to create task');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Task</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Due Date (YYYY-MM-DD)"
                value={dueDate}
                onChangeText={setDueDate}
            />
            <Button title={loading ? 'Creating...' : 'Create Task'} onPress={handleCreate} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default CreateTask;
