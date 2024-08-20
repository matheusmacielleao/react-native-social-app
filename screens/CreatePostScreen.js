import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { stylesInput } from "./LoginScreen.js";

export default function CreatePostScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreatePost = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const id = await AsyncStorage.getItem("user");
      await axios.post(
        "http://192.168.2.127:3000/api/posts",
        { title, content, id },
        { headers: { Authorization: `${token}` } }
      );
      navigation.pop();
    } catch (error) {
      console.error("Error creating post", error);
    }
  };

  return (
    <View>
      <Text> Title:</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={stylesInput.input}
      />
      <Text> Content:</Text>
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        style={stylesInput.input}
      />
      <Button title="Create Post" onPress={handleCreatePost} />
    </View>
  );
}
