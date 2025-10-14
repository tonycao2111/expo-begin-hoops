import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { VStack, Text, Image, HStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { IData } from "../../../types";
import { EDataType } from "../../../db/slide-data";

type Props = {
  item: IData;
  type: EDataType;
  index: number;
};

const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 24;

const CardItem = ({ item, type }: Props) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.cardWrapper]}
      onPress={() =>
        navigation.navigate("Detail", {
          id: item.id,
          type,
        })
      }
    >
      <VStack
        style={styles.card}
        bg="$white"
        p="$3"
        rounded="$2xl"
        justifyContent="space-between"
      >
        {/* Ảnh và icon */}
        <View style={styles.imageContainer}>
          <Image
            source={item.image}
            alt="image"
            width={cardWidth - 32}
            height={cardWidth - 32}
            rounded="$full"
            style={styles.image}
          />
        </View>

        {/* Tiêu đề */}
        <Text
          fontSize="$md"
          fontWeight="$bold"
          textAlign="center"
          mt="$2"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          📘 {item.title}
        </Text>

        {/* Mô tả */}
        <Text
          fontSize="$sm"
          color="$coolGray600"
          textAlign="center"
          numberOfLines={2}
          ellipsizeMode="tail"
          mt="$1"
        >
          {item.description}
        </Text>

        {/* Nút hành động */}
        <View style={styles.button}>
          <Text fontWeight="$bold" fontSize="$sm" color="$white">
            🚀 Khám phá ngay
          </Text>
        </View>
      </VStack>
    </TouchableOpacity>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  cardWrapper: {
    width: cardWidth,
    marginBottom: 24,
  },
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
  image: {
    borderWidth: 3,
    borderColor: "#10B981",
  },
  button: {
    marginTop: 12,
    backgroundColor: "#34D399", // xanh ngọc
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: "center",
  },
});
