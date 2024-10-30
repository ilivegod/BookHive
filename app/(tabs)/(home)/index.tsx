import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import BookItem from "@/components/BookItem";

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

  //console.log("booksData:", booksData);
  return (
    <View>
      <SearchBar onSearch={refetch} value={query} setValue={setQuery} />
      <FlatList
        data={booksData}
        renderItem={({ item }) => (
          <BookItem
            coverImage={
              item?.volumeInfo?.imageLinks?.thumbnail || "no image available"
            }
            title={item?.volumeInfo?.title}
            author={item?.volumeInfo?.authors?.join(", ")}
            pages={item?.volumeInfo?.pageCount}
            genre={item?.volumeInfo.categories?.join(", ")}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      {/* <BookItem
        coverImage="https://unsplash.com/photos/books-on-brown-wooden-shelf-Ft_Wn-K5YH8"
        title="Harry Potter and the half blood prince"
        author="J.K Rowlings"
        pages="365 pages"
        genre="Fantasy , adventure"
      /> */}
      <Text>welcome home</Text>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({});
