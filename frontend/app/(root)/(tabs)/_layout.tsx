import {View, Text, Image} from 'react-native'
import React from 'react'
import {Tabs} from "expo-router";


const TabIcon = ({ focused, title }: { focused: boolean; title: string }) => (
    <View className="flex-1 flex flex-col items-center">
        <Text className={`${focused ?
            'text-emerald-800 font-medium' : 'text-black-200 font-semibold'} text-xl w-full text-center mt-1`}>
            {title}
        </Text>
    </View>
)

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'white',
                    position: 'absolute',
                    borderTopColor: '#0061FF1A',
                    borderTopWidth: 1,
                    minHeight: 70,
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'List',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} title="List" />
                    )
                }}
            /><Tabs.Screen
                name="createTask"
                options={{
                    title: 'Create',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} title="Create" />
                    )
                }}
            />
            <Tabs.Screen
                name="logout"
                options={{
                    title: 'Logout',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} title="Logout" />
                    )
                }}
            />
        </Tabs>
    )
}
export default TabsLayout
