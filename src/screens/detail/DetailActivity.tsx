import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Box,
  VStack,
  Text,
  HStack,
  ImageBackground,
  SafeAreaView,
} from "@gluestack-ui/themed";
import { ArrowLeft2 } from "iconsax-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import { activity, IActivity } from "../../db/slide-data";

type Props = {} & NativeStackScreenProps<RootStackParams, "DetailActivity">;

const DetailActivity = ({ navigation, route }: Props) => {
  const { id } = route.params;
  const data: IActivity = activity[id];

  // Animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  if (!data) return null;

  return (
    <Box flex={1} bg="#F9FAFB">
      {/* Ảnh nền */}
      <Box style={styles.headerWrapper}>
        <ImageBackground
          source={{ uri: data.image }}
          style={styles.headerBg}
          resizeMode="cover"
        >
          <Box style={styles.overlay} />
          <SafeAreaView>
            <HStack justifyContent="space-between" px={20} pt={20}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft2 size={28} color="#fff" />
              </TouchableOpacity>
            </HStack>
            <VStack px={20} mt={40} mb={20}>
              <Text color="$white" fontSize="$2xl" fontWeight="bold">
                {data.title}
              </Text>
              <Text color="$coolGray100" fontSize="$sm" mt="$1">
                Đối tượng phù hợp: {data.target}
              </Text>
            </VStack>
          </SafeAreaView>
        </ImageBackground>
      </Box>

      {/* Nội dung cuộn */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, paddingHorizontal: 20 }}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            marginTop: 20,
          }}
        >
          <AnimatedSection title="🧰 Dụng cụ cần chuẩn bị">
            {data.material.map((item, idx) => (
              <Bullet key={idx} content={item} />
            ))}
          </AnimatedSection>

          <AnimatedSection title="📝 Hướng dẫn thực hiện">
            {data.instructions.map((step, idx) => (
              <VStack key={idx} gap="$1" mb="$3">
                <Text color="$primary600" fontWeight="bold">
                  {idx + 1}. {step.title}
                </Text>
                <Text color="$coolGray800">{step.body}</Text>
              </VStack>
            ))}
          </AnimatedSection>

          <AnimatedSection title="🌱 Lợi ích của hoạt động">
            {data.benefit.map((item, idx) => (
              <Bullet key={idx} content={item} />
            ))}
          </AnimatedSection>
        </Animated.View>
      </ScrollView>
    </Box>
  );
};

export default DetailActivity;

// -------------------------- Sub-components --------------------------

const AnimatedSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <VStack mb={30}>
    <Text fontSize="$lg" fontWeight="bold" color="$primary600" mb={8}>
      {title}
    </Text>
    <VStack gap={10} ml={4}>
      {children}
    </VStack>
  </VStack>
);

const Bullet = ({ content }: { content: string }) => (
  <HStack alignItems="flex-start" gap="$2">
    <Text fontSize="$md" color="$primary500">
      •
    </Text>
    <Text fontSize="$md" color="$coolGray800">
      {content}
    </Text>
  </HStack>
);

// -------------------------- Styles --------------------------

const styles = StyleSheet.create({
  headerWrapper: {
    height: 250,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: "hidden",
  },
  headerBg: {
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
