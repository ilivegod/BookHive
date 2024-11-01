import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import BookItem from "@/components/BookItem";
import { ChevronDown } from "lucide-react-native";

import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import DropDownPicker from "react-native-dropdown-picker";

const home = () => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = async () => {
    //console.log("search pressed");
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

  const { data: booksData, refetch } = useQuery({
    queryKey: [query],
    queryFn: handleSearch,
    enabled: false,
  });

  const handleCardPress = (id: any) => {
    router.push(`/bookScreen/${id}`);
  };

  const handleGoBack = () => {
    console.log("back pressed");
  };

  //console.log("booksData:", booksData);
  return (
    <SafeAreaView>
      <Header onBackPress={handleGoBack} />

      <SearchBar onSearch={refetch} value={query} setValue={setQuery} />
      <FlatList
        data={booksData}
        renderItem={({ item }) => (
          <BookItem
            coverImage={
              item?.volumeInfo?.imageLinks?.smallThumbnail ||
              "no image available"
            }
            title={item?.volumeInfo?.title}
            author={item?.volumeInfo?.authors?.join(", ")}
            pages={item?.volumeInfo?.pageCount}
            genre={item?.volumeInfo.categories?.join(", ")}
            cardPress={() => handleCardPress(item?.id)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({});
