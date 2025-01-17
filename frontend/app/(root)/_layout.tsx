import React, { useEffect, useState } from 'react';
import {Redirect, Slot} from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text} from "react-native";


const _layout: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('token');
            setIsAuthenticated(!!token);
            setLoading(false);
        };

        checkAuth();
    }, []);


    if (loading) return <Text>Some Text</Text>;
    if (!isAuthenticated) return <Redirect href='/sign-in' />;

    return <Slot />
};

export default _layout;
