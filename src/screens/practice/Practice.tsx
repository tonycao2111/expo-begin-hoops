import React from "react";
import { StatusBar, Platform } from "react-native";
import { ScrollView, VStack, Text, Box, HStack } from "@gluestack-ui/themed";
import { activity } from "../../db/slide-data";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams, BottomTabsParams } from "../../navigations/config";
import PracticeCard from "./PracticeCard";

type Props = NativeStackScreenProps<
  RootStackParams & BottomTabsParams,
  "Practice"
>;

const ORANGE = "#F97316";
const ORANGE_600 = "#EA580C";
const ORANGE_BG = "#FFF3E8";
const ORANGE_BORDER = "#FFD9BF";

const activityList = Object.values(activity);

const Practice = ({ navigation }: Props) => {
  const onPracticeDetail = (id: any) => {
    navigation.navigate("DetailActivity", { id });
  };

  return (
    <VStack flex={1} bg="$white">
      {Platform.OS === "android" && <StatusBar barStyle="dark-content" />}

      {/* Header cam–trắng */}
      <Box
        bg={ORANGE_BG}
        px="$4"
        pt="$8"
        pb="$5"
        borderBottomWidth={1}
        borderColor={ORANGE_BORDER}
      >
        <VStack space="xs">
          <HStack alignItems="center" justifyContent="space-between">
            <Text fontSize="$2xl" fontWeight="$black" color={ORANGE_600}>
              📘 Chiến thuật bóng rổ
            </Text>
            <Box
              px="$3"
              py="$1"
              bg="$white"
              borderRadius="$full"
              borderWidth={1}
              borderColor={ORANGE_BORDER}
            >
              <Text fontSize="$xs" color={ORANGE_600} fontWeight="$bold">
                Bộ sưu tập bìa
              </Text>
            </Box>
          </HStack>
          <Text fontSize="$md" color="$coolGray700">
            Tổng hợp các bài viết:{" "}
            <Text fontWeight="$semibold" color={ORANGE_600}>
              Footwork · Ball Handling · Finishing · Playmaking · Reads
            </Text>
          </Text>

          {/* Thanh nhấn mạnh */}
          <Box
            mt="$3"
            h={8}
            bg="$white"
            borderRadius={999}
            overflow="hidden"
            borderWidth={1}
            borderColor={ORANGE_BORDER}
          >
            <Box h="100%" w="40%" bg={ORANGE} borderRadius={999} />
          </Box>
        </VStack>
      </Box>

      {/* Lưới bìa bài viết */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      >
        <VStack gap="$4">
          {activityList.map((item, index) => (
            <PracticeCard
              key={item.id}
              item={{
                ...item,
                // nếu PracticeCard đọc title/desc, đổi copy cho “bài chiến thuật”
                title: item.title ?? `Bài ${index + 1}: Chiến thuật`,
                subtitle:
                  item.subtitle ??
                  "Bìa minh họa – nhấn để xem chi tiết chiến thuật, drill và ví dụ clip.",
                // có thể thêm field badge/label nếu card hỗ trợ
                badge:
                  index % 3 === 0
                    ? "Footwork"
                    : index % 3 === 1
                    ? "Ball Handling"
                    : "Playmaking",
                accent: ORANGE, // nếu PracticeCard nhận accent
              }}
              index={index + 1}
              onPress={() => onPracticeDetail(item.id)}
            />
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default Practice;
