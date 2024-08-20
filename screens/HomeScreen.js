import React, { useState, useContext } from "react";
import { View, Text, Button, FlatList } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { user, logout } = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get("http://192.168.2.127:3000/api/posts", {
        headers: { Authorization: `${token}` },
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };
  fetchPosts();

  return (
    <View>
      <Button
        title="Logout"
        onPress={() => {
          logout;
          navigation.pop();
        }}
      />
      <Button
        title="Create Post"
        onPress={() => navigation.push("CreatePost")}
      />
      <Text>Posts:</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View>
            <Text>Title: {item.title}</Text>
            <Text>Content: {item.content}</Text>
            <Text>------------------------</Text>
          </View>
        )}
      />
    </View>
  );
}
