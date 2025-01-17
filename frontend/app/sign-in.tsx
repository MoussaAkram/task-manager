import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text, Alert, ScrollView} from 'react-native';
import { useMutation, gql } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Link, router} from "expo-router";
import {LOGIN_MUTATION} from "@/lib/action"
import client from "@/lib/apolloClient";
import {SafeAreaView} from "react-native-safe-area-context";


const SignIn: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [tokenAuth, { loading, error }] = useMutation(LOGIN_MUTATION);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please fill in both fields.');
            return;
        }
            const response = await tokenAuth({ variables: { username, password } });
            const token = response.data?.tokenAuth?.token;

            if (token) {
                await AsyncStorage.setItem('token', token); // Save token securely
                await client.resetStore();
                router.replace('/(root)/(tabs)'); // Navigate to the main screen
            }
        if (error) {
            Alert.alert('Error', error.message || 'An unexpected error occurred.');
        }

    };


    return (
        <SafeAreaView className="h-full">
            <ScrollView>
        <View style={styles.container}>
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button
                title={loading ? 'Logging in...' : 'Login'}
                onPress={handleLogin}
                disabled={loading}
            />

            <Link href='/sign-up'
            >Don't have an account? Sign-up </Link>
            {error && <Text style={styles.error}>Error: {error.message}</Text>}
        </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
});

export default SignIn;
