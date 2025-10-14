import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  View,
  Pressable,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import {
  Button,
  ButtonText,
  ImageBackground,
  Text,
  VStack,
  HStack,
} from "@gluestack-ui/themed";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

type Props = NativeStackScreenProps<RootStackParams, "SplashScreen">;
const { width, height } = Dimensions.get("screen");

const messages = [
  {
    image: require("../../assets/basketball/splash-bg1.png"),
    title: "Chào mừng đến Begin Hoops",
    subtitle: "Mọi hành trình vĩ đại bắt đầu từ cú nảy đầu tiên",
  },
  {
    image: require("../../assets/basketball/splash-bg2.png"),
    title: "Drills thông minh",
    subtitle: "Mỗi ngày một bài tập, kỹ năng của bạn sẽ khác biệt",
  },
  {
    image: require("../../assets/basketball/splash-bg3.png"),
    title: "Theo dõi tiến bộ",
    subtitle: "Cảm giác chiến thắng sẽ đến khi bạn dám bắt đầu 🚀",
  },
];

const HIDE_BALL_ON_LAST = true; // ẩn bóng ở trang cuối nếu muốn

const SplashScreen = ({ navigation }: Props) => {
  const [page, setPage] = useState(0);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const dotAnim = useRef(new Animated.Value(0)).current;
  const ballTranslateY = useRef(new Animated.Value(0)).current;

  const animateIn = () => {
    fadeAnim.setValue(0);
    slideAnim.setValue(30);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 320,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 320,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(dotAnim, {
        toValue: page,
        duration: 240,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
    ]).start();
  };

  const startBallBounce = () => {
    ballTranslateY.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(ballTranslateY, {
          toValue: -24,
          duration: 380,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(ballTranslateY, {
          toValue: 0,
          duration: 260,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    animateIn();
  }, [page]);

  useEffect(() => {
    startBallBounce();
  }, []);

  const onSkip = () => {
    navigation.replace("TabNavigation");
  };

  const onNext = () => {
    if (page < messages.length - 1) {
      setPage((prev) => prev + 1);
    } else {
      navigation.replace("TabNavigation");
    }
  };

  const current = messages[page];

  return (
    <ImageBackground
      source={current.image}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar style="light" />

      <LinearGradient
        colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.55)", "rgba(0,0,0,0.85)"]}
        style={StyleSheet.absoluteFillObject}
      />

      <Animated.View
        style={[
          styles.overlayContent,
          {
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <VStack px="$6" py="$10" flex={1} justifyContent="flex-end" space="lg">
          <VStack space="xs" alignItems="center">
            <Text
              fontSize="$2xl"
              color="$white"
              fontWeight="$bold"
              textAlign="center"
              lineHeight="$2xl"
            >
              {current.title}
            </Text>
            <Text
              fontSize="$md"
              color="$coolGray100"
              textAlign="center"
              lineHeight="$lg"
            >
              {current.subtitle}
            </Text>
          </VStack>

          {/* Pagination dots */}
          <HStack justifyContent="center" alignItems="center" space="xs">
            {messages.map((_, index) => {
              const isActive = index === page;
              return (
                <View key={index} style={styles.dotTrack}>
                  <Animated.View
                    style={[
                      styles.dotFill,
                      isActive && styles.dotFillActive,
                      isActive && { width: 16 },
                    ]}
                  />
                </View>
              );
            })}
          </HStack>

          <HStack justifyContent="space-between" alignItems="center">
            <Pressable
              onPress={onSkip}
              accessibilityRole="button"
              accessibilityLabel="Bỏ qua giới thiệu"
            >
              <Text color="$coolGray100" fontSize="$sm">
                Bỏ qua
              </Text>
            </Pressable>

            <Button onPress={onNext} size="md" accessibilityLabel="Tiếp tục">
              <ButtonText>
                {page === messages.length - 1 ? "Bắt đầu" : "Tiếp"}
              </ButtonText>
            </Button>
          </HStack>
        </VStack>
      </Animated.View>

      {/* Animated basketball accent */}
      {
        <Animated.Image
          source={require("../../assets/basketball/ball.png")}
          style={[
            styles.ball,
            styles.ballBottomLeft,
            {
              transform: [{ translateY: ballTranslateY }],
            },
          ]}
          accessibilityIgnoresInvertColors
          accessible={false}
        />
      }
    </ImageBackground>
  );
};

export default SplashScreen;

const DOT_SIZE = 8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    justifyContent: "flex-end",
    backgroundColor: "#000",
  },
  overlayContent: {
    flex: 1,
  },
  dotTrack: {
    width: 16,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    backgroundColor: "rgba(255,255,255,0.25)",
    overflow: "hidden",
    marginHorizontal: 4,
  },
  dotFill: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    backgroundColor: "rgba(255,255,255,0.45)",
  },
  dotFillActive: {
    backgroundColor: "#fff",
  },
  ball: {
    position: "absolute",
    width: 80,
    height: 80,
    zIndex: 0,
    opacity: 0.95,
  },
  ballBottomLeft: {
    left: 20,
    bottom: 200, // chỉnh cao lên để tránh đụng nút
  },
});
