import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
      />
      <Button title="Create Post" onPress={handleCreatePost} />
    </View>
  );
}
