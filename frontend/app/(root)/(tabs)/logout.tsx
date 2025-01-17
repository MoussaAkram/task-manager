import React from 'react';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from "expo-router";

const Logout: React.FC = () => {
    const handleLogout = async () => {
        await AsyncStorage.removeItem('token'); // Remove token
        router.replace('/sign-in'); // Navigate to Login screen
    };

    return <Button title="Logout" onPress={handleLogout} />;
};

export default Logout;
