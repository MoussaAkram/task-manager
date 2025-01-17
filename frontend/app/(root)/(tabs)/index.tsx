import React, {useState} from 'react';
import {View, Text, Button, FlatList, StyleSheet, ScrollView, Alert, TextInput, Modal} from 'react-native';
import {useQuery, gql, useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DELETE_TASK, TASKS_QUERY, UPDATE_TASK} from "@/lib/action";
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";
import {Picker} from "@react-native-picker/picker";


interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    dueDate: string;
}

const Index: React.FC = () => {
    const { data, loading, error, refetch } = useQuery(TASKS_QUERY);
    const [deleteTask] = useMutation(DELETE_TASK);
    const [updateTask] = useMutation(UPDATE_TASK);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedCompleted, setUpdatedCompleted] = useState(false);


    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error fetching tasks.</Text>;

    const handleDelete = (id: string) => {
        Alert.alert(
            "Delete Task",
            "Are you sure you want to delete this task?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteTask({ variables: { id } });
                            await refetch();
                        } catch (err) {
                            console.error("Error deleting task", err);
                        }
                    },
                },
            ]
        );
    };

    const handleUpdate = async () => {
        if (!selectedTask) return;
        try {
            await updateTask({
                variables: {
                    id: selectedTask.id,
                    title: updatedTitle || selectedTask.title,
                    description: updatedDescription || selectedTask.description,
                    completed: updatedCompleted || selectedTask.completed,
                    dueDate: selectedTask.dueDate
                        ? new Date(selectedTask.dueDate).toISOString()
                        : null
                },
            });
            await refetch();
            setModalVisible(false);
            setSelectedTask(null);
        } catch (err) {
            console.error("Error updating task", err);
        }
    };

    const openUpdateModal = (task: any) => {
        setSelectedTask(task);
        setUpdatedTitle(task.title);
        setUpdatedDescription(task.description || '');
        setUpdatedCompleted(task.completed);
        setModalVisible(true);
    };

    return (
        <SafeAreaView className='h-full'>
            <View style={styles.container}>
                <FlatList
                    data={data?.tasks || []}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.task}>
                            <View style={styles.taskContent}>
                                <Text>{item.title}</Text>
                                <Text>{item.completed ? 'Completed' : 'Pending'}</Text>
                            </View>
                            <View style={styles.taskActions}>
                                <Button
                                    title="Update"
                                    onPress={() => openUpdateModal(item)}
                                />
                                <Button
                                    title="Delete"
                                    color="red"
                                    onPress={() => handleDelete(item.id)}
                                />
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <Text style={{ textAlign: 'center', marginTop: 20 }}>
                            No tasks available
                        </Text>
                    )}
                />
                <View style={{ marginVertical: 80 }}>
                    <Button
                        title="Add Task"
                        onPress={() => router.push('/(root)/(tabs)/createTask')}
                    />
                </View>
            </View>

            {/* Modal for Update */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Update Task</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={updatedTitle}
                        onChangeText={setUpdatedTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={updatedDescription}
                        onChangeText={setUpdatedDescription}
                        multiline
                    />
                    <Text style={styles.label}>Status</Text>
                    <Picker
                        selectedValue={updatedCompleted}
                        onValueChange={(itemValue) => setUpdatedCompleted(itemValue)}
                    >
                        <Picker.Item label="Pending" value={false} />
                        <Picker.Item label="Completed" value={true} />
                    </Picker>
                    <View style={styles.modalActions}>
                        <Button title="Save" onPress={handleUpdate} />
                        <Button
                            title="Cancel"
                            color="red"
                            onPress={() => {
                                setModalVisible(false);
                                setSelectedTask(null);
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    task: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    taskContent: { flex: 1 },
    taskActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },

});


export default Index;
