import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  VStack,
  HStack,
  Text,
  ImageBackground,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { Clock, Activity } from "iconsax-react-native";

import { EDataType } from "../../../db/slide-data";
import { CATEGORY_META, LessonData } from "../../../db/animated-slide";

type Props = {
  item: LessonData;
  index: number;
  scrollY: SharedValue<number>;
};

const CARD_H = 220; // chiều cao vùng ảnh (16:9-ish)

const levelToLabel = (lvl?: LessonData["level"]) => {
  switch (lvl) {
    case "intermediate":
      return "Trung cấp";
    case "advanced":
      return "Nâng cao";
    default:
      return "Cơ bản";
  }
};

const LessonCardModern = ({ item, index, scrollY }: Props) => {
  const navigation = useNavigation<any>();

  // Parallax dọc nhẹ
  const aStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [
        (index - 1) * (CARD_H + 16),
        index * (CARD_H + 16),
        (index + 1) * (CARD_H + 16),
      ],
      [-8, 0, 8],
      Extrapolation.CLAMP
    );
    return { transform: [{ translateY }] };
  });

  const durationText = `${item.duration ?? 10} phút`;
  const levelText = levelToLabel(item.level);
  const categoryLabel = CATEGORY_META[item.category]?.label ?? "";

  const goDetail = () =>
    navigation.navigate("Detail", { id: item.id, type: EDataType.BASIC });

  return (
    <TouchableOpacity activeOpacity={0.92} onPress={goDetail}>
      <Animated.View style={[styles.cardShadow, aStyle]}>
        {/* Viền gradient mảnh (premium) */}
        <LinearGradient
          colors={["#FFD1B2", "#F57C00", "#FF9E40"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <VStack bg="$white" rounded="$2xl" overflow="hidden">
            {/* Ảnh 16:9 + overlay */}
            <Box w="100%" h={CARD_H} overflow="hidden">
              <ImageBackground
                source={
                  item.imgSrc === 0
                    ? require("../../../assets/basketball/splash-bg1.png")
                    : item.imgSrc
                }
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
              >
                {/* Chip category góc trên trái */}
                <Box position="absolute" top="$3" left="$3">
                  <HStack
                    px="$3"
                    py="$1"
                    rounded="$full"
                    bg="rgba(255,255,255,0.9)"
                    alignItems="center"
                  >
                    <Text
                      fontSize="$xs"
                      fontWeight="$semibold"
                      color="$coolGray800"
                    >
                      {categoryLabel}
                    </Text>
                  </HStack>
                </Box>

                {/* Overlay gradient dưới để chữ nổi */}
                <LinearGradient
                  colors={["rgba(0,0,0,0.02)", "rgba(0,0,0,0.6)"]}
                  style={StyleSheet.absoluteFillObject}
                />

                {/* Nội dung đè trên ảnh */}
                <VStack
                  position="absolute"
                  bottom="$3"
                  left="$3"
                  right="$3"
                  space="xs"
                >
                  <Text
                    color="$white"
                    fontWeight="$bold"
                    fontSize="$xl"
                    lineHeight="$xl"
                  >
                    {item.title}
                  </Text>

                  <HStack justifyContent="space-between" alignItems="center">
                    <HStack space="md">
                      <HStack alignItems="center" space="xs">
                        <Activity size={16} color="#fff" />
                        <Text color="$coolGray100" fontSize="$xs">
                          {levelText}
                        </Text>
                      </HStack>
                      <HStack alignItems="center" space="xs">
                        <Clock size={16} color="#fff" />
                        <Text color="$coolGray100" fontSize="$xs">
                          {durationText}
                        </Text>
                      </HStack>
                    </HStack>

                    <Button
                      size="sm"
                      rounded="$full"
                      bg="$primary500"
                      onPress={goDetail}
                    >
                      <ButtonText color="$white">Học ngay</ButtonText>
                    </Button>
                  </HStack>
                </VStack>
              </ImageBackground>
            </Box>

            {/* Mô tả ngắn (2 dòng) */}
            <VStack p="$3" space="xs">
              <Text color="$coolGray700" numberOfLines={2}>
                {item.description}
              </Text>
            </VStack>
          </VStack>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default LessonCardModern;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  gradientBorder: {
    borderRadius: 24,
    padding: 1.5, // viền gradient mảnh
  },
});
