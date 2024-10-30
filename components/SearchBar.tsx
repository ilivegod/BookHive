import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { Search } from "lucide-react-native";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";

interface SearchBarProps {
  onSearch: () => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({
  onSearch,
  value,
  setValue,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={value}
        onChangeText={setValue}
        onSubmitEditing={onSearch}
      />
      <TouchableOpacity style={styles.button} onPress={onSearch}>
        <Search color="#ffffff" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    borderRadius: 8,
    margin: 16,
  },
  input: {
    flex: 1,
    fontSize: 19,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    borderRadius: 4,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 4,
    paddingVertical: 7,
    paddingHorizontal: 7,
    marginLeft: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 4,
  },
});
