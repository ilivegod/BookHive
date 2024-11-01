import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ArrowLeft, LucideIcon } from "lucide-react-native";

interface HeaderProps {
  title?: string;
  onBackPress: () => void;
  rightButton?: {
    title?: any;
    onPress: () => void;
    icon?: LucideIcon;
  };
}

export default function Header(
  { title, onBackPress, rightButton }: HeaderProps = { onBackPress: () => {} }
) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <ArrowLeft color="#000" size={24} />
      </TouchableOpacity>
      {title && <Text style={styles.title}>{title}</Text>}
      {rightButton ? (
        <TouchableOpacity
          onPress={rightButton.onPress}
          style={styles.rightButton}
        >
          <Text style={styles.rightButtonText}>{rightButton.title}</Text>

          {rightButton.icon && (
            <rightButton.icon
              color="#007AFF"
              size={20}
              style={styles.rightButtonIcon}
            />
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.rightButtonPlaceholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  rightButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  rightButtonIcon: {
    marginRight: 4,
  },
  rightButtonText: {
    fontSize: 16,
    color: "#007AFF",
  },
  rightButtonPlaceholder: {
    width: 40,
  },
});
