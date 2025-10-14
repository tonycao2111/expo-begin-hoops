import { Animated, Dimensions, Platform } from "react-native";
import {
  Button,
  Text,
  Image,
  Box,
  VStack,
  ScrollView,
  HStack,
} from "@gluestack-ui/themed";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { quizzData } from "../../db/quizz";
import TextBox, { EStatus } from "../../components/common/TextBox";
import { getRandomArray } from "../../utils/function";

const show: { [key: string]: string } = {
  beginner: "Dễ",
  intermediate: "Trung bình",
  advanced: "Khó",
};

// màu chủ đạo cam
const ORANGE = "#F97316"; // cam đậm (tailwind orange-500)
const ORANGE_600 = "#EA580C";
const ORANGE_LIGHT = "#FFE8D6"; // nền nhạt/chip
const TEXT_DARK = "#1F2937";
type Level = "beginner" | "intermediate" | "advanced";
const QuizzScreen = () => {
  const [status, setStatus] = useState<EStatus[]>([
    EStatus.NORMAL,
    EStatus.NORMAL,
    EStatus.NORMAL,
  ]);
  const [next, setNext] = useState(false);
  const [point, setPoint] = useState(0);

  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const [currQues, setCurrQues] = useState(0);

  const level = route.params?.level as Level;

  const [quizzes] = useState(getRandomArray(quizzData[level], 4));
  const onPress = (i: number) => () => {
    const { ans } = quizzes[currQues];
    const newStatus = status.map(() => EStatus.DISABLE);
    if (i === ans) {
      newStatus[i] = EStatus.CORRECT;
      setPoint((p) => p + 1);
    } else {
      newStatus[ans] = EStatus.CORRECT;
      newStatus[i] = EStatus.IN_CORRECT;
    }
    setStatus(newStatus);
    setNext(true);
  };

  const onNext = () => {
    if (currQues < quizzes.length - 1) {
      setCurrQues((i) => i + 1);
      setNext(false);
      setStatus([EStatus.NORMAL, EStatus.NORMAL, EStatus.NORMAL]);
    } else {
      navigation.navigate("QuizzResult", {
        level,
        point,
        length: quizzes.length,
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({ title: `Mức độ ${show[level]}` });
  }, [navigation, level]);

  const screenWidth = Dimensions.get("screen").width;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: ((currQues + 1) / quizzes.length) * 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currQues, quizzes.length]);

  return (
    <ScrollView flex={1} bg="$white" px="$4" py="$4">
      {/* Header nhỏ: câu hiện tại + điểm + chip level */}
      <HStack
        alignItems="center"
        justifyContent="space-between"
        mb="$3"
        px="$1"
      >
        <HStack alignItems="center" space="sm">
          <Text fontSize="$sm" color="$coolGray700">
            Câu {currQues + 1}/{quizzes.length}
          </Text>
          <Box
            px="$2.5"
            py="$1"
            bg={ORANGE_LIGHT}
            borderColor={ORANGE}
            borderWidth={1}
            borderRadius="$full"
          >
            <Text fontSize="$xs" color={ORANGE} fontWeight="700">
              {show[level]}
            </Text>
          </Box>
        </HStack>

        <Text fontSize="$sm" color={ORANGE_600} fontWeight="bold">
          Điểm: {point}
        </Text>
      </HStack>

      {/* Progress cam */}
      <Box
        height={10}
        bg="#FFEDE4"
        borderRadius={999}
        overflow="hidden"
        mb="$4"
      >
        <Animated.View
          style={{
            height: 10,
            backgroundColor: ORANGE,
            width: progressAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
            borderRadius: 999,
          }}
        />
      </Box>

      {/* Ảnh minh họa */}
      <Box
        borderRadius={16}
        overflow="hidden"
        mb="$4"
        bg="$white"
        style={{
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 6 },
            },
            android: { elevation: 4 },
          }),
        }}
      >
        <Image
          alt="quiz-img"
          w="$full"
          h={Math.round((159 / 290) * screenWidth)}
          source={quizzes[currQues].image}
        />
      </Box>

      {/* Câu hỏi */}
      <Box
        bg="$white"
        borderRadius={16}
        px="$4"
        py="$4"
        mb="$4"
        style={{
          borderWidth: 1,
          borderColor: "#FFE0CC",
        }}
      >
        <Text
          fontSize="$lg"
          fontWeight="800"
          color={TEXT_DARK}
          textAlign="center"
        >
          {quizzes[currQues].ques}
        </Text>
      </Box>

      {/* Đáp án (TextBox giữ, nhưng đặt khoảng cách & có thể nhận màu từ status) */}
      <VStack gap="$3" mb="$8">
        {quizzes[currQues].choose.map((item: string, i: number) => (
          <TextBox
            key={`${currQues}-${i}`}
            status={status[i]}
            onPress={onPress(i)}
            content={item}
            next={next}
            // Nếu TextBox hỗ trợ props màu, có thể thêm:
            // primaryColor={ORANGE}
            // correctColor="#16A34A"
            // incorrectColor="#DC2626"
          />
        ))}
      </VStack>

      {/* Nút tiếp tục – cam/white */}
      <Box px="$1">
        <Button
          disabled={!next}
          onPress={onNext}
          bg={ORANGE}
          rounded="$2xl"
          opacity={!next ? 0.6 : 1}
          style={{
            shadowColor: ORANGE,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.25,
            shadowRadius: 12,
            elevation: 6,
          }}
        >
          <Text color="$white" fontSize="$md" fontWeight="700">
            {next && currQues === quizzes.length - 1
              ? "Hoàn thành"
              : "Tiếp tục"}
          </Text>
        </Button>
      </Box>
    </ScrollView>
  );
};

export default QuizzScreen;
