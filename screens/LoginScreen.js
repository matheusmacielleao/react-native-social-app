import React, { useState, useContext } from "react";
import { View, TextInput, Button, SafeAreaView, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { StyleSheet } from "react-native-web";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.push("Home");
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <SafeAreaView style={stylesInput.container}>
      <View style={stylesInput.inputContainer}>
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
        <Button title="Login" onPress={handleLogin} />
        <Button title="Register" onPress={() => navigation.push("Register")} />
      </View>
    </SafeAreaView>
  );
}

export const stylesInput = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
});
