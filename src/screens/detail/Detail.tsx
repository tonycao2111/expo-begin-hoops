import React, { useEffect, useMemo, useRef } from "react";
import {
  StyleSheet,
  Animated,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Box,
  VStack,
  Text,
  HStack,
  Image,
  ImageBackground,
  SafeAreaView,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { ArrowLeft2, Clock, Activity } from "iconsax-react-native";
import { StatusBar } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import {
  CATEGORY_META,
  LessonData,
  homeData as LESSONS,
} from "../../db/animated-slide";

// ❗ DỮ LIỆU MỚI

type Props = {} & NativeStackScreenProps<RootStackParams, "Detail">;

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

const Detail = ({ navigation, route }: Props) => {
  const { id } = route.params; // giữ tương thích, bỏ type cũ
  const lesson = useMemo<LessonData | undefined>(
    () => LESSONS.find((l) => l.id === Number(id)),
    [id]
  );

  // Cho phép mở rộng: nếu bạn có "content sections" trong lesson
  // @ts-ignore
  const sections:
    | Array<{
        title: string;
        image?: any;
        body: string[];
      }>
    | undefined = (lesson as any)?.content;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 420,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  if (!lesson) return null;

  const levelText = levelToLabel(lesson.level);
  const durationText = `${lesson.duration ?? 10} phút`;
  const categoryLabel = CATEGORY_META[lesson.category]?.label ?? "";

  return (
    <Box flex={1} bg="$white">
      <StatusBar style="light" />

      {/* Hero Image */}
      <Box style={styles.heroContainer}>
        <ImageBackground
          source={
            lesson.imgSrc == 0
              ? require("../../assets/basketball/splash-bg1.png")
              : lesson.imgSrc
          }
          style={styles.heroImage}
        >
          <Box style={styles.overlay} />
          <SafeAreaView>
            {/* Top bar */}
            <HStack
              px={20}
              pt={20}
              justifyContent="space-between"
              alignItems="center"
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft2 size={28} color="#fff" />
              </TouchableOpacity>
              {/* Chip category ở góc phải */}
              <HStack
                px="$3"
                py="$1.5"
                bg="rgba(255,255,255,0.92)"
                rounded="$full"
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
            </HStack>

            {/* Title & Meta trên hero */}
            <VStack px={20} mt={32} mb={20} space="xs">
              <Text fontSize="$2xl" fontWeight="$bold" color="$white">
                {lesson.title}
              </Text>
              <HStack space="lg" alignItems="center">
                <HStack alignItems="center" space="xs">
                  <Activity size={16} color="#fff" />
                  <Text color="$coolGray100" fontSize="$sm">
                    {levelText}
                  </Text>
                </HStack>
                <HStack alignItems="center" space="xs">
                  <Clock size={16} color="#fff" />
                  <Text color="$coolGray100" fontSize="$sm">
                    {durationText}
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </SafeAreaView>
        </ImageBackground>
      </Box>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            padding: 20,
          }}
        >
          {/* Mô tả ngắn */}
          <Text fontSize="$md" color="$coolGray800" lineHeight={24} mb="$4">
            {lesson.description}
          </Text>

          {/* CTA */}
          <HStack mb="$5">
            <Button size="md" bg="$primary600" rounded="$full">
              <ButtonText color="$white">Bắt đầu học ngay</ButtonText>
            </Button>
          </HStack>

          {/* SECTIONS */}
          {lesson.content?.map((section, idx) => (
            <VStack key={`${section.title}-${idx}`} mb="$6" space="xs">
              <Text fontSize="$lg" fontWeight="$bold" color="$primary600">
                {section.title}
              </Text>

              {/* Ảnh minh họa nếu có */}
              {section.image && (
                <Image
                  source={{uri: section.image}}
                  w="$full"
                  h={200}
                  borderRadius={14}
                  resizeMode="cover"
                  mb="$3"
                  alt="section-img"
                />
              )}

              {/* body (đoạn văn) */}
              {section.body?.map((p, i) => (
                <Text key={`body-${i}`} color="$coolGray700" lineHeight={24}>
                  {p}
                </Text>
              ))}

              {/* steps */}
              {section.steps && section.steps.length > 0 && (
                <VStack mt="$2" space="xs">
                  {section.steps.map((s, i) => (
                    <HStack
                      key={`step-${i}`}
                      space="sm"
                      alignItems="flex-start"
                    >
                      <Box
                        w="$6"
                        h="$6"
                        rounded="$full"
                        bg="$primary500"
                        alignItems="center"
                        justifyContent="center"
                        mt="$0.5"
                      >
                        <Text color="$white" fontWeight="$bold">
                          {i + 1}
                        </Text>
                      </Box>
                      <Text flex={1} color="$coolGray800" lineHeight={22}>
                        {s}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              )}

              {/* bullets */}
              {section.bullets && section.bullets.length > 0 && (
                <VStack mt="$2" space="xs">
                  {section.bullets.map((b, i) => (
                    <HStack key={`bul-${i}`} space="sm" alignItems="flex-start">
                      <Text color="$primary600" mt="$0.5">
                        •
                      </Text>
                      <Text flex={1} color="$coolGray800" lineHeight={22}>
                        {b}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              )}

              {/* tips (callout sáng) */}
              {section.tips && section.tips.length > 0 && (
                <VStack
                  mt="$2"
                  p="$3"
                  bg="$coolGray100"
                  borderWidth={1}
                  borderColor="$coolGray200"
                  rounded="$xl"
                  space="xs"
                >
                  <Text fontWeight="$semibold" color="$coolGray800">
                    Mẹo/Coaching cues
                  </Text>
                  {section.tips.map((t, i) => (
                    <HStack key={`tip-${i}`} space="sm" alignItems="flex-start">
                      <Text color="$primary600" mt="$0.5">
                        –
                      </Text>
                      <Text flex={1} color="$coolGray700" lineHeight={22}>
                        {t}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              )}

              {/* warnings (callout cảnh báo) */}
              {section.warnings && section.warnings.length > 0 && (
                <VStack
                  mt="$2"
                  p="$3"
                  bg="rgba(255,76,76,0.06)"
                  borderWidth={1}
                  borderColor="rgba(255,76,76,0.25)"
                  rounded="$xl"
                  space="xs"
                >
                  <Text fontWeight="$semibold" color="#B00020">
                    Lỗi thường gặp
                  </Text>
                  {section.warnings.map((w, i) => (
                    <HStack
                      key={`warn-${i}`}
                      space="sm"
                      alignItems="flex-start"
                    >
                      <Text color="#B00020" mt="$0.5">
                        !
                      </Text>
                      <Text flex={1} color="$coolGray800" lineHeight={22}>
                        {w}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              )}

              {/* progression (nâng độ khó) */}
              {section.progression && section.progression.length > 0 && (
                <VStack mt="$2" space="xs">
                  <Text fontWeight="$semibold" color="$coolGray800">
                    Tiến triển
                  </Text>
                  {section.progression.map((p, i) => (
                    <HStack
                      key={`prog-${i}`}
                      space="sm"
                      alignItems="flex-start"
                    >
                      <Text color="$primary600" mt="$0.5">
                        ›
                      </Text>
                      <Text flex={1} color="$coolGray800" lineHeight={22}>
                        {p}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              )}
            </VStack>
          ))}
        </Animated.View>
      </ScrollView>
    </Box>
  );
};

export default Detail;

// -------------------------- Style --------------------------
const styles = StyleSheet.create({
  heroContainer: {
    height: 260,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  heroImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.35)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
