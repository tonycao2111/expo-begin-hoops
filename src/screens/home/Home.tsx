import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { StatusBar as RNStatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Box,
  HStack,
  VStack,
  Text,
  ScrollView,
  Pressable,
} from "@gluestack-ui/themed";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import {
  CATEGORY_META,
  homeData,
  LessonCategory,
  LessonData,
} from "../../db/animated-slide";
import LessonCardModern from "./component/LessonCard";

const ALL_CHIP = "all" as const;

// chuẩn hoá không dấu cho tìm kiếm tiếng Việt
const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const Home = () => {
  const [selected, setSelected] = useState<LessonCategory | "all">(ALL_CHIP);
  const [qRaw, setQRaw] = useState("");
  const [q, setQ] = useState(""); // debounced/normalized
  const scrollY = useSharedValue(0);

  // Debounce search input ~200ms + normalize không dấu
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setQ(normalize(qRaw)), 200);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [qRaw]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const chips: (typeof ALL_CHIP | LessonCategory)[] = useMemo(
    () => [ALL_CHIP, "basic", "dribbling", "shooting", "defense", "fitness"],
    []
  );

  // Lọc theo chip + từ khoá (không dấu)
  const data: LessonData[] = useMemo(() => {
    const byCat =
      selected === ALL_CHIP
        ? homeData
        : homeData.filter((x) => x.category === selected);

    if (!q) return byCat;

    return byCat.filter((x) => {
      const t = normalize(x.title);
      const d = normalize(x.description);
      return t.includes(q) || d.includes(q);
    });
  }, [selected, q]);

  const Header = useCallback(
    () => (
      <View>
        <SafeAreaView style={{ paddingTop: RNStatusBar.currentHeight || 0 }} />
        {/* Header */}
        <HStack py="$3" alignItems="center" justifyContent="space-between">
          <VStack>
            <Text fontSize="$xs" color="$coolGray500">
              Học bóng rổ
            </Text>
            <Text fontWeight="$bold" fontSize="$3xl" color="$primary600">
              Begin Hoops
            </Text>
          </VStack>
        </HStack>
      </View>
    ),
    [qRaw]
  );

  // Sticky segmented chips (có onPress thật sự)
  const Segmented = () => (
    <Box py="$2" bg="$white">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HStack space="sm">
          {chips.map((c) => {
            const active = c === selected;
            const label = c === ALL_CHIP ? "Tất cả" : CATEGORY_META[c].label;
            return (
              <Pressable
                key={c}
                onPress={() => setSelected(c)}
                accessibilityRole="button"
                accessibilityLabel={`Chọn danh mục ${label}`}
              >
                <Box
                  px="$3"
                  py="$2"
                  rounded="$full"
                  bg={active ? "$primary500" : "$white"}
                  borderWidth={1.25}
                  borderColor={active ? "$primary500" : "$coolGray300"}
                  style={{
                    shadowColor: "#000",
                    shadowOpacity: 0.05,
                    shadowRadius: 6,
                    elevation: 1,
                  }}
                >
                  <Text color={active ? "$white" : "$coolGray700"}>
                    {label}
                  </Text>
                </Box>
              </Pressable>
            );
          })}
        </HStack>
      </ScrollView>
    </Box>
  );

  return (
    <Animated.FlatList
      data={data}
      keyExtractor={(it) => it.id.toString()}
      renderItem={({ item, index }) => (
        <LessonCardModern item={item} index={index} scrollY={scrollY} />
      )}
      ItemSeparatorComponent={() => <Box h="$6" />}
      ListHeaderComponent={
        <>
          <Header />
          <Segmented />
          <Box px="$4" pt="$2" pb="$1">
            <Text fontWeight="$semibold" color="$coolGray800">
              Bài học đề xuất
            </Text>
          </Box>
        </>
      }
      ListEmptyComponent={
        <VStack px="$4" py="$10" alignItems="center" space="sm">
          <Text fontWeight="$semibold" color="$coolGray700">
            Không tìm thấy bài phù hợp
          </Text>
          <Text color="$coolGray500" fontSize="$sm">
            Thử đổi danh mục hoặc từ khóa khác nhé.
          </Text>
        </VStack>
      }
      ListFooterComponent={<Box h="$8" />}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 24,
        backgroundColor: "white",
      }}
      showsVerticalScrollIndicator={false}
      // Sticky chips (Header là block 0, Segmented là block 1)
      initialNumToRender={8}
      windowSize={10}
      removeClippedSubviews
      scrollEventThrottle={16}
      onScroll={onScroll}
    />
  );
};

export default Home;
