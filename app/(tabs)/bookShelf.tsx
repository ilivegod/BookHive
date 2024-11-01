import Header from "@/components/Header";
import { Menu } from "lucide-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";

const contentTypes = ["Read", "To read", "Currently reading"];

const ContentSelectorScreen = () => {
  const [selectedType, setSelectedType] = useState(contentTypes[0]);

  const handleGoBack = () => {
    console.log("back pressed");
  };

  const handleSelectMenu = () => {
    console.log("menu pressed");
  };

  const renderContent = () => {
    switch (selectedType) {
      case "Read":
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>Latest News Headlines</Text>
            <Text>1. Global economy shows signs of recovery</Text>
            <Text>2. New breakthrough in renewable energy</Text>
            <Text>3. Tech giants announce collaboration on AI ethics</Text>
          </View>
        );
      case "To read":
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>Sports Updates</Text>
            <Text>1. Local team wins championship</Text>
            <Text>2. Record-breaking performance in track and field</Text>
            <Text>3. Upcoming international tournament announced</Text>
          </View>
        );
      case "Currently reading":
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>Entertainment Buzz</Text>
            <Text>1. Blockbuster movie breaks box office records</Text>
            <Text>2. Celebrity couple announces engagement</Text>
            <Text>3. Award-winning TV series renewed for another season</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onBackPress={handleGoBack}
        title="Book Shelf"
        rightButton={{
          onPress: () => handleSelectMenu,
          icon: Menu,
        }}
      />
      <View style={styles.buttonContainer}>
        {contentTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.button,
              selectedType === type && styles.selectedButton,
            ]}
            onPress={() => setSelectedType(type)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedType === type && styles.selectedButtonText,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.contentWrapper}>{renderContent()}</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  selectedButton: {
    backgroundColor: "#007AFF",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  selectedButtonText: {
    color: "#ffffff",
  },
  contentWrapper: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    backgroundColor: "#ffffff",
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default ContentSelectorScreen;
