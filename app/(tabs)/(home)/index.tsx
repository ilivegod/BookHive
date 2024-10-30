import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";

const home = () => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = async () => {
    console.log("search pressed");
    const res = await axios.get(
      "https://www.googleapis.com/books/v1/volumes?",
      {
        params: {
          q: query,
        },
      }
    );

    return res.data.items;
  };

  const handleSeaarch = async () => {
    console.log("search pressed");
  };

  const { data: booksData, refetch } = useQuery({
    queryKey: [query],
    queryFn: handleSearch,
    enabled: false,
  });

  console.log("booksData:", booksData);
  return (
    <View>
      <SearchBar onSearch={refetch} value={query} setValue={setQuery} />
      <Text>welcome home</Text>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({});
