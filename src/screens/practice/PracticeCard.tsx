import React from "react";
import { Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Box, VStack, Text, Image, HStack } from "@gluestack-ui/themed";
import { IActivity } from "../../db/slide-data";

type PracticeCardProps = {
  item: IActivity & {
    cover?: any; // ảnh bìa ưu tiên
    image?: any; // ảnh fallback từ data cũ
    subtitle?: string; // mô tả ngắn dưới tiêu đề
    badge?: string; // nhãn chuyên mục (Footwork / Handling / Playmaking)
    accent?: string; // màu nhấn tuỳ card
  };
  index: number;
  onPress: () => void;
};

// ====== PALETTE CAM – TRẮNG ======
const ORANGE = "#F97316";
const ORANGE_600 = "#EA580C";
const ORANGE_BORDER = "#FFD9BF";
const TEXT_DARK = "#111827";

// Ảnh fallback theo nhóm chuyên mục (cam, không chữ)
const IMG_FALLBACKS = [
  require("../../assets/basketball/quizz-img1.png"), // Footwork
  require("../../assets/basketball/quizz-img2.png"), // Ball handling & finishing
  require("../../assets/basketball/quizz-img3.png"), // Playmaking & reads
];

const PracticeCard = ({ item, index, onPress }: PracticeCardProps) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.97, { damping: 10 });
  };
  const onPressOut = () => {
    scale.value = withSpring(1, { damping: 10 });
  };

  // Chọn ảnh: ưu tiên item.cover -> item.image -> fallback theo index
  const cover =
    item.cover ??
    item.image ??
    IMG_FALLBACKS[(index - 1) % IMG_FALLBACKS.length];

  const badgeText = item.badge; // có thể set từ màn Practice
  const accent = item.accent ?? ORANGE;

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
      <Animated.View style={[animatedStyle]}>
        <Box
          bg="$white"
          borderRadius={20}
          shadowColor="#000"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.12}
          shadowRadius={6}
          elevation={4}
          overflow="hidden"
          style={{ borderWidth: 1, borderColor: ORANGE_BORDER }}
        >
          {/* Ảnh bìa */}
          <Box position="relative">
            <Image
              source={cover}
              alt="practice-cover"
              w="100%"
              h={160}
              resizeMode="cover"
            />
            {/* Badge góc trái trên (nếu có) */}
            {badgeText ? (
              <Box position="absolute" top={10} left={10}>
                <Box
                  px="$2.5"
                  py="$1"
                  bg="$white"
                  borderRadius="$full"
                  style={{ borderWidth: 1, borderColor: ORANGE_BORDER }}
                >
                  <Text fontSize="$xs" color={accent} fontWeight="$bold">
                    {badgeText}
                  </Text>
                </Box>
              </Box>
            ) : null}
          </Box>

          {/* Nội dung */}
          <VStack p="$3" space="xs">
            <Text
              fontSize="$lg"
              fontWeight="$black"
              color={TEXT_DARK}
              mb="$0.5"
            >
              📘 Bài {index}: {item.title}
            </Text>

            {/* subtitle ưu tiên, nếu không thì dùng target cũ */}
            <Text fontSize="$sm" color="$coolGray700" numberOfLines={2}>
              {item.subtitle ??
                (item as any).target ??
                "Xem chi tiết chiến thuật, drill & ví dụ clip."}
            </Text>

            {/* Footer nhỏ – mô phỏng “đọc tiếp” */}
            <HStack mt="$2" alignItems="center" space="sm">
              <Box h={6} w={6} borderRadius={999} bg={accent} />
              <Text fontSize="$xs" color={accent} fontWeight="$semibold">
                Nhấn để xem chi tiết
              </Text>
            </HStack>
          </VStack>
        </Box>
      </Animated.View>
    </Pressable>
  );
};

export default PracticeCard;
