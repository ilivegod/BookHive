import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

interface BookItemProps {
  coverImage: string;
  title: string;
  author: string;
  pages: string;
  genre: string;
  cardPress: any;
}

export default function BookItem({
  coverImage,
  title,
  author,
  pages,
  genre,
  cardPress,
}: BookItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={cardPress}>
      <Image source={{ uri: coverImage }} style={styles.coverImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>by {author}</Text>
        <Text style={styles.details}>{pages} pages</Text>
        <Text style={styles.details}>{genre}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    marginHorizontal: 10,
    marginVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  coverImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  author: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  details: {
    fontSize: 12,
    color: "#888",
  },
});
