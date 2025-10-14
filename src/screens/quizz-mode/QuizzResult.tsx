import { Platform, StatusBar, TouchableOpacity, Animated } from "react-native";
import React, { useEffect, useMemo, useRef } from "react";
import { Box, Image, Text, VStack, HStack, Center } from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";

enum EResultType {
  GOOD,
  BAD,
}

// ========== PALETTE CAM – TRẮNG ==========
const ORANGE = "#F97316"; // cam chủ đạo
const ORANGE_600 = "#EA580C"; // cam đậm
const ORANGE_LIGHT = "#FFF3E8"; // nền nhạt
const ORANGE_BORDER = "#FFD9BF"; // viền nhạt
const TEXT_DARK = "#111827";

// (giữ 2 trạng thái nhưng đổi màu theo tông cam)
const RETURN_RESULT = {
  [EResultType.GOOD]: {
    title: "🎉 Tuyệt vời!",
    description: "Bạn đã nắm khá tốt chủ đề này.",
    color: ORANGE_600,
    bgColor: ORANGE_LIGHT,
    // thay bằng hình cam/biểu tượng bóng rổ của bạn nếu có
    logo: require("../../assets/good_logo.png"),
  },
  [EResultType.BAD]: {
    title: "✨ Cố thêm chút nữa!",
    description: "Hãy ôn lại và thử lại lần sau nhé.",
    color: ORANGE_600,
    bgColor: ORANGE_LIGHT,
    logo: require("../../assets/bad_logo.png"),
  },
};

const QuizzResult = () => {
  const route = useRoute<any>();
  const { point, length, level } = route.params ?? {
    point: 0,
    length: 1,
    level: "beginner",
  };
  const navigation = useNavigation<any>();

  const result =
    point >= Math.ceil(length / 2) ? EResultType.GOOD : EResultType.BAD;
  const numWrong = length - point;

  // % đúng để hiện trong donut
  const percent = useMemo(
    () => Math.round((point / Math.max(length, 1)) * 100),
    [point, length]
  );

  // progress “fill” mượt cho thanh nhỏ dưới tiêu đề
  const progressAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: percent,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [percent]);

  return (
    <VStack
      flex={1}
      bg="$white"
      justifyContent="space-between"
      alignItems="center"
      px="$6"
      py="$8"
    >
      {Platform.OS === "android" && <StatusBar barStyle="dark-content" />}

      {/* Header */}
      <VStack alignItems="center" space="md">
        <Image
          source={RETURN_RESULT[result].logo}
          alt="result"
          w={140}
          h={140}
          resizeMode="contain"
        />
        <Text
          fontSize="$3xl"
          fontWeight="900"
          color={RETURN_RESULT[result].color}
        >
          {RETURN_RESULT[result].title}
        </Text>
        <Text fontSize="$md" color="$coolGray700" textAlign="center">
          {RETURN_RESULT[result].description}
        </Text>

        {/* Progress line cam dưới tiêu đề */}
        <Box
          mt="$2"
          w="$full"
          h={8}
          bg={ORANGE_LIGHT}
          borderRadius={999}
          overflow="hidden"
        >
          <Animated.View
            style={{
              height: 8,
              backgroundColor: ORANGE,
              width: progressAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
              borderRadius: 999,
            }}
          />
        </Box>
      </VStack>

      {/* Điểm số dạng “donut” (giả lập bằng 2 vòng) */}
      <Center mt="$6">
        <Center
          w={180}
          h={180}
          borderRadius={999}
          bg="$white"
          style={{
            borderWidth: 10,
            borderColor: ORANGE_BORDER,
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 4,
          }}
        >
          <Center
            w={180}
            h={180}
            borderRadius={999}
            // vòng “fill” phía trên bằng viền cam đậm – tạo cảm giác donut
            style={{
              position: "absolute",
              borderWidth: 10,
              borderColor: ORANGE,
              // dùng clip-path đơn giản bằng rotate + strokeDash (hack: Android/iOS đều ok bằng border dash không? => fallback: hiển thị viền cam đầy)
            }}
          />
          <VStack alignItems="center">
            <Text fontSize="$sm" color="$coolGray500">
              Kết quả
            </Text>
            <Text fontSize="$6xl" fontWeight="900" color={ORANGE_600}>
              {point}/{length}
            </Text>
            <Text fontSize="$sm" color="$coolGray600">
              {percent}% đúng
            </Text>
          </VStack>
        </Center>
      </Center>

      {/* Thống kê phụ – thẻ trắng viền cam */}
      <HStack mt="$8" space="lg">
        <StatCard label="Đúng" value={point} accent={ORANGE} />
        <StatCard label="Sai" value={numWrong} accent="#FCA5A5" />
      </HStack>

      {/* Nút hành động */}
      <VStack w="$full" mt="$8" space="md">
        <TouchableOpacity
          onPress={() => navigation.navigate("QuizzScreen", { level })}
          activeOpacity={0.9}
        >
          <Box bg={ORANGE} py="$3.5" rounded="$2xl" alignItems="center">
            <Text color="$white" fontWeight="800" fontSize="$md">
              🔁 Làm lại bộ câu hỏi
            </Text>
          </Box>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Quizz")}>
          <Box
            py="$3.5"
            rounded="$2xl"
            alignItems="center"
            bg="$white"
            style={{ borderWidth: 1, borderColor: ORANGE_BORDER }}
          >
            <Text color={ORANGE_600} fontWeight="800" fontSize="$md">
              🏀 Về chọn cấp độ
            </Text>
          </Box>
        </TouchableOpacity>
      </VStack>
    </VStack>
  );
};

export default QuizzResult;

// ====== COMPONENTS ======
const StatCard = ({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) => {
  return (
    <VStack
      w={130}
      h={100}
      bg="$white"
      borderRadius={16}
      alignItems="center"
      justifyContent="center"
      style={{ borderWidth: 1, borderColor: ORANGE_BORDER }}
    >
      <Text fontSize="$2xl" fontWeight="900" color={accent}>
        {value}
      </Text>
      <Text fontSize="$sm" color="$coolGray600">
        {label}
      </Text>
    </VStack>
  );
};
