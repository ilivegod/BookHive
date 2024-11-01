import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";

import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import moment from "moment";
import RenderHtml from "react-native-render-html";
import Header from "@/components/Header";
import DropDownPicker from "react-native-dropdown-picker";
import { ChevronDown } from "lucide-react-native";

const bookScreen = () => {
  const [buttonTitle, setButtonTitle] = useState("Bookshelf");

  const { id } = useLocalSearchParams();

  const { width } = useWindowDimensions();

  // ###########dropdownLogic############

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Read", value: "Read" },
    { label: "To read", value: "To read" },
    { label: "Currently reading", value: "Currently reading" },
  ]);

  const handleSelectBookShelf = () => {
    console.log("bookshelf pressed");
    setOpen((prev) => !prev);
  };

  const handleNameChange = (value: any) => {
    setValue(value);
    setButtonTitle(value); // Set the button title to the selected item
  };

  const handleGoBack = () => {
    console.log("back pressed");
  };

  const getBook = async () => {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );

    return res.data;
  };

  const { data: bookData } = useQuery({
    queryKey: [id],
    queryFn: getBook,
  });

  //console.log(bookData);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onBackPress={handleGoBack}
        rightButton={{
          title: buttonTitle,
          onPress: () => handleSelectBookShelf(),
          icon: ChevronDown,
        }}
      />
      {open && (
        <DropDownPicker
          style={{
            backgroundColor: "crimson",
          }}
          containerStyle={{
            alignSelf: "center",
            width: "95%",
          }}
          textStyle={{
            fontSize: 15,
          }}
          placeholder="Bookshelf"
          placeholderStyle={{
            color: "black",
            borderWidth: 0,
          }}
          dropDownContainerStyle={{
            backgroundColor: "#dfdfdf",
            borderWidth: 0,
            borderColor: "red",
          }}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={handleNameChange}
          setItems={setItems}
        />
      )}
      <ScrollView>
        <Image
          source={{ uri: bookData?.volumeInfo?.imageLinks?.thumbnail }}
          style={styles.image}
          resizeMode="stretch"
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{bookData?.volumeInfo?.title}</Text>
          {bookData?.volumeInfo?.categories ? (
            <View style={styles.genreContainer}>
              {bookData?.volumeInfo?.categories.map(
                (
                  category:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined,
                  index: React.Key | null | undefined
                ) => (
                  <Text key={index} style={styles.genre}>
                    {category}
                  </Text>
                )
              )}
            </View>
          ) : null}

          <Text style={styles.author}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "#444",
                marginBottom: 16,
              }}
            >
              by
            </Text>{" "}
            {bookData?.volumeInfo?.authors}
          </Text>
          <RenderHtml
            contentWidth={width}
            source={{
              html: `<p style='color:red;'>
        ${bookData?.volumeInfo?.description}
      </p>`,
            }}
          />

          <ThemedText>{bookData?.volumeInfo?.pageCount} pages</ThemedText>
          <ThemedText>
            published by {bookData?.volumeInfo?.publisher} on{" "}
            {moment(bookData?.volumeInfo?.publishedDate).format("LL")}
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default bookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "75%",
    alignSelf: "center",
    height: 300,
    backgroundColor: "red",
    borderRadius: 20,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  genre: {
    fontSize: 14,
    color: "#666",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  author: {
    fontSize: 19,
    fontWeight: "700",
    color: "#444",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
});
