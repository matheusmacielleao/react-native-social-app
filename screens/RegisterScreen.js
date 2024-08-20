import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import axios from "axios";
import { stylesInput } from "./LoginScreen.js";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://192.168.2.127:3000/api/users", {
        email,
        password,
      });
      navigation.pop();
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <View>
      <Text> Email:</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={stylesInput.input}
      />
      <Text> Password:</Text>

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={stylesInput.input}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
