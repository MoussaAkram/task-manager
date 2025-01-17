import React, { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {View, Text, ScrollView, Dimensions, Alert, Image, TextInput, Button, StyleSheet} from "react-native";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "@/lib/apolloClient";
import {useMutation} from "@apollo/client";
import {Register_MUTATION} from "@/lib/action";

const SignUp = () => {

    const [signup, { loading, error }] = useMutation(Register_MUTATION);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if (!email || !username || !password) {
            Alert.alert('Error', 'Please fill in both fields.');
            return;
        }
        const response = await signup({ variables: { email, username, password } });
        const token = response.data?.signup?.success;

        if (token) {
            router.replace('/'); // Navigate to the main screen
        }
        if (error) {
            Alert.alert('Error', error.message || 'An unexpected error occurred.');
        }

    };


    return (
        <SafeAreaView className="h-full">
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
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
                        title={loading ? 'SignUp...' : 'SignUp'}
                        onPress={handleRegister}
                        disabled={loading}
                    />

                    <Link href='/sign-in'
                    >Have an account already? Login </Link>
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

export default SignUp;