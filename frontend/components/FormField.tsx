import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";


const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props } : any) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-600 font-pmedium">{title}</Text>

            <View className="w-full h-16 px-4 rounded-2xl border-2 border-black focus:border-gray-600 flex flex-row items-center">
                <TextInput
                    className="flex-1 text-black font-semibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7B7B8B"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword}
                    {...props}
                />
            </View>
        </View>
    );
};

export default FormField;