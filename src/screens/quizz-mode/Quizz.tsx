import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  View,
  useWindowDimensions,
} from "react-native";
import {
  Image,
  Box,
  Text,
  VStack,
  HStack,
  Button,
  ButtonText,
  Icon,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Pagination from "./components/Pagination";
import { quizzSlideImg } from "../../db/quizz";

const HEADER_TOP = Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0;

const Quizz = () => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const CARD_H = (426 / 343) * (SCREEN_WIDTH - 32); // tỉ lệ theo ảnh gốc
  const navigation = useNavigation<any>();

  // Reanimated shared value cho Pagination
  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  // Index hiện tại (để hiện caption/level)
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 60 }).current;
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems?.length && viewableItems[0]?.index != null) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const keyExtractor = useCallback((item: any) => String(item.id), []);
  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: SCREEN_WIDTH,
      offset: SCREEN_WIDTH * index,
      index,
    }),
    [SCREEN_WIDTH]
  );

  const activeItem = useMemo(
    () => quizzSlideImg[Math.min(currentIndex, quizzSlideImg.length - 1)],
    [currentIndex]
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", paddingTop: HEADER_TOP }}
    >
      <VStack flex={1} bg="$white">
        {/* Header */}
        <VStack px="$4" pt="$2" pb="$3">
          <Text fontWeight="$semibold" fontSize={"$3xl"} color="$black">
            Câu hỏi kỹ năng bóng rổ
          </Text>
          <Text
            fontWeight="$medium"
            fontSize={"$md"}
            color="$coolGray500"
            mt="$1"
          >
            Chọn cấp độ phù hợp với bạn và bắt đầu luyện tập kiến thức – từ cơ
            bản (footwork) tới nâng cao (playmaking).
          </Text>
          {/* Nhãn cấp độ hiện tại */}
          {activeItem ? (
            <HStack mt="$3" space="sm" alignItems="center">
              <Box
                px="$3"
                py="$1.5"
                bg={
                  activeItem.level === "beginner"
                    ? "$emerald100"
                    : activeItem.level === "intermediate"
                    ? "$amber100"
                    : "$red100"
                }
                borderRadius="$full"
              >
                <Text
                  fontSize="$xs"
                  color={
                    activeItem.level === "beginner"
                      ? "$emerald700"
                      : activeItem.level === "intermediate"
                      ? "$amber700"
                      : "$red700"
                  }
                  fontWeight="$semibold"
                >
                  {activeItem.levelLabel ?? activeItem.level?.toUpperCase()}
                </Text>
              </Box>
              <Text color="$coolGray600" fontSize="$sm" numberOfLines={1}>
                {activeItem.title}
              </Text>
            </HStack>
          ) : null}
        </VStack>

        {/* Slider */}
        <Animated.FlatList
          onScroll={onScroll}
          data={quizzSlideImg}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={16}
          horizontal
          bounces={false}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{}}
          renderItem={({ item }) => {
            return (
              <View style={{ width: SCREEN_WIDTH, alignItems: "center" }}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() =>
                    navigation.navigate("QuizzScreen", { level: item.level })
                  }
                  accessibilityRole="button"
                  accessibilityLabel={`Bắt đầu quiz cấp độ ${
                    item.levelLabel ?? item.level
                  }`}
                >
                  <Box
                    mt="$1"
                    style={styles.cardShadow}
                    borderRadius="$lg"
                    overflow="hidden"
                  >
                    <Image
                      source={item.imgSrc}
                      alt={item.title ?? "quiz image"}
                      resizeMode="cover"
                      style={{
                        width: SCREEN_WIDTH - 32,
                        height: CARD_H,
                      }}
                    />
                    {/* Overlay text + CTA */}
                    <Box
                      position="absolute"
                      bottom="$0"
                      left="$0"
                      right="$0"
                      px="$4"
                      py="$4"
                      bg="rgba(0,0,0,0.35)"
                    >
                      <Text
                        color="$white"
                        fontWeight="$semibold"
                        fontSize="$lg"
                      >
                        {item.title}
                      </Text>
                      <Text
                        color="$coolGray100"
                        fontSize="$sm"
                        mt="$1"
                        numberOfLines={2}
                      >
                        {item.subtitle}
                      </Text>

                      <HStack mt="$3">
                        <Button
                          size="md"
                          bg="$indigo600"
                          px="$4"
                          borderRadius="$full"
                          onPress={() =>
                            navigation.navigate("QuizzScreen", {
                              level: item.level,
                            })
                          }
                        >
                          <ButtonText> Bắt đầu </ButtonText>
                        </Button>
                      </HStack>
                    </Box>
                  </Box>
                </TouchableOpacity>
              </View>
            );
          }}
        />

        {/* Pagination + Caption */}
        <Box px="$8" my="$4">
          <Pagination data={quizzSlideImg} x={x} />
          <Text color="$coolGray600" fontSize="$md" mt="$2">
            {activeItem?.caption ??
              "Tăng IQ bóng rổ: hiểu luật, tư duy chiến thuật, ra quyết định nhanh trong game thực tế."}
          </Text>
        </Box>
      </VStack>
    </SafeAreaView>
  );
};

export default Quizz;

const styles = StyleSheet.create({
  cardShadow: {
    width: "100%",
    borderRadius: 16,
    // bóng nhẹ cho card (Android + iOS)
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 8 },
      },
      android: {
        elevation: 6,
      },
    }),
  },
});
