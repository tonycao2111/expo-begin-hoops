// db/slide-data.ts (đã refactor sang bóng rổ)

import { MemberImageProps } from "../screens/home/component/MemberImage";
// Nếu bạn có IData ở nơi khác và còn dùng: giữ nguyên. Ở đây ta không dùng nữa.
// import { IData } from "../types";

export enum EDataType {
  BASIC,
  STORY,
  ACTIVITY,
}

/** ============ HEADER SLIDES (bìa cam không chữ) ============ */
export const headerSlideData: MemberImageProps[] = [
  { name: "slideimg", image: require("../assets/basketball/quizz-img1.png") }, // Footwork
  { name: "slideimg", image: require("../assets/basketball/quizz-img2.png") }, // Ball handling
  { name: "slideimg", image: require("../assets/basketball/quizz-img3.png") }, // Playmaking
];

/** ============ TYPES ============ */
export interface IBlockContent {
  title: string;
  body: string[];
  image?: any;
}

export interface IBasicTopic {
  id: number;
  image: any;
  title: string;
  description: string;
  content: IBlockContent[];
}

// Mở rộng IActivity để tương thích PracticeCard mới (cover/subtitle/badge/accent)
export interface IActivity {
  id: number;
  title: string;
  target: string; // nhóm người học (Giữ để không vỡ code cũ)
  image?: any; // ảnh cũ (fallback)
  cover?: any; // ảnh bìa ưu tiên cho card
  subtitle?: string;
  badge?: string; // Footwork / Handling / Playmaking
  accent?: string; // màu nhấn cam cho card

  material: string[];
  instructions: Array<{
    title: string;
    body: string[];
    image?: any;
  }>;
  benefit: string[];
}

export interface IObjectMap<T> {
  [key: string]: T;
}

/** ============ BASIC: FUNDAMENTALS/TÁC GIẢI THUẬT ============ */

/** ============ ACTIVITY: DRILLS/PRACTICE CARDS ============ */
/** Tông cam–trắng cho PracticeCard */
const ORANGE = "#F97316";

export const activity: IObjectMap<IActivity> = {
  1: {
    id: 1,
    title: "Cone Dribble Series",
    subtitle: "In-and-out · Cross · Between · Behind",
    badge: "Ball Handling",
    accent: ORANGE,
    cover: require("../assets/basketball/quizz-img2.png"),
    target: "Tất cả cấp độ",
    material: ["4–6 cone", "Bóng"],
    instructions: [
      {
        title: "Set up",
        body: [
          "Đặt 4–6 cone thẳng hàng cách nhau 1.5–2m.",
          "Dribble qua từng cone với biến chiêu khác nhau.",
        ],
        image: require("../assets/basketball/quizz-img2.png"),
      },
      {
        title: "Tiến độ",
        body: [
          "Mỗi biến chiêu 3–4 lượt (mỗi tay).",
          "Giữ bóng thấp, mắt nhìn trước, kiểm soát nhịp.",
        ],
      },
    ],
    benefit: ["Tăng kiểm soát bóng 2 tay.", "Cải thiện thay đổi nhịp/tốc độ."],
  },
  2: {
    id: 2,
    title: "Mikan & Reverse Mikan",
    subtitle: "Finishing quanh vành rổ",
    badge: "Finishing",
    accent: ORANGE,
    cover: require("../assets/basketball/quizz-img2.png"),
    target: "Beginner–Intermediate",
    material: ["Bóng"],
    instructions: [
      {
        title: "Mikan cổ điển",
        body: [
          "Đứng dưới rổ, layup luân phiên trái/phải, dùng bảng.",
          "Không nhảy cao – tập nhịp & cảm giác tay.",
        ],
        image: require("../assets/basketball/quizz-img2.png"),
      },
      {
        title: "Reverse Mikan",
        body: ["Đổi phía bảng để tránh block.", "Tập 10–12 mỗi tay, 3 hiệp."],
      },
    ],
    benefit: [
      "Cảm giác bảng & góc chạm.",
      "Cải thiện finishing khi bị contest.",
    ],
  },
  3: {
    id: 3,
    title: "Closeout & Slide",
    subtitle: "Phòng thủ cơ bản hiệu quả",
    badge: "Defense",
    accent: ORANGE,
    cover: require("../assets/basketball/quizz-img1.png"),
    target: "All",
    material: ["Cone (tuỳ chọn)"],
    instructions: [
      {
        title: "Closeout",
        body: [
          "Chạy → chậm dần → chóp chân, tay cao.",
          "Dừng ở khoảng ném, sẵn sàng slide.",
        ],
        image: require("../assets/basketball/quizz-img1.png"),
      },
      {
        title: "Slide 2 hướng",
        body: [
          "Giữ trọng tâm thấp, không bắt chéo.",
          "Slide trái/phải 4–6 lần mỗi hiệp.",
        ],
      },
    ],
    benefit: [
      "Giảm bị beat ở bước đầu.",
      "Tư thế phòng thủ vững, ít phạm lỗi.",
    ],
  },
};
