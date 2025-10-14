import { ImageSourcePropType } from "react-native";

export interface QuizzData {
  image: ImageSourcePropType;
  ques: string;
  choose: string[];
  ans: number;
}

export const quizzSlideImg = [
  {
    id: 1,
    level: "beginner",
    levelLabel: "Beginner",
    title: "Footwork cơ bản",
    subtitle: "Stance, pivot, jump stop – nền móng di chuyển",
    caption:
      "Làm chủ footwork giúp bạn giữ thăng bằng và dừng-đi mượt mà khi bị kèm.",
    imgSrc: require("../assets/basketball/quizz-img1.png"),
  },
  {
    id: 2,
    level: "intermediate",
    levelLabel: "Intermediate",
    title: "Ball handling & finishing",
    subtitle: "Crossover, hesitation, layup craft",
    caption:
      "Kiểm soát bóng trong áp lực và hoàn thiện ở rổ với nhiều góc tiếp cận.",
    imgSrc: require("../assets/basketball/quizz-img2.png"),
  },
  {
    id: 3,
    level: "advanced",
    levelLabel: "Advanced",
    title: "Playmaking & reads",
    subtitle: "PnR reads, weak-side skip, timing",
    caption:
      "Đọc phòng thủ, tạo lợi thế cho đồng đội và ra quyết định trong 0.5s.",
    imgSrc: require("../assets/basketball/quizz-img3.png"),
  },
];

const IMG_FOOTWORK = require("../assets/basketball/quizz-img1.png");
const IMG_HANDLE = require("../assets/basketball/quizz-img2.png");
const IMG_PLAYMAKE = require("../assets/basketball/quizz-img3.png");

export const quizzData: {
  [key in "beginner" | "intermediate" | "advanced"]: QuizzData[];
} = {
  beginner: [
    {
      image: IMG_FOOTWORK,
      ques: "Tư thế stance cơ bản nên như thế nào?",
      choose: [
        "Chân khép, lưng thẳng",
        "Chân rộng bằng vai, gối khuỵu, trọng tâm thấp",
        "Đứng thẳng, gót nhấc cao",
      ],
      ans: 1,
    },
    {
      image: IMG_FOOTWORK,
      ques: "Pivot đúng là xoay quanh…",
      choose: [
        "Bất kỳ chân nào",
        "Chân trụ đã chọn, không nhấc gót",
        "Cả hai chân lần lượt",
      ],
      ans: 1,
    },
    {
      image: IMG_FOOTWORK,
      ques: "“Jump stop” dùng để…",
      choose: [
        "Dừng đột ngột, giữ thăng bằng",
        "Nhảy ném 3 điểm",
        "Đổi trụ trái phép",
      ],
      ans: 0,
    },
    {
      image: IMG_FOOTWORK,
      ques: "Khi nhận bóng, việc đầu tiên nên làm?",
      choose: [
        "Ngay lập tức dribble",
        "Check không gian & bảo vệ bóng",
        "Quay lưng về rổ",
      ],
      ans: 1,
    },
    {
      image: IMG_FOOTWORK,
      ques: "Traveling xảy ra khi…",
      choose: [
        "Dribble quá nhanh",
        "Di chuyển chân trụ sai quy định",
        "Giữ bóng quá 5s",
      ],
      ans: 1,
    },
    {
      image: IMG_FOOTWORK,
      ques: "Closeout cơ bản yêu cầu…",
      choose: [
        "Chạy thẳng người",
        "Chậm dần, hạ trọng tâm, tay cao",
        "Nhảy thẳng vào người ném",
      ],
      ans: 1,
    },
    {
      image: IMG_FOOTWORK,
      ques: "Box-out khi rebound là…",
      choose: [
        "Đứng nhìn bóng rơi",
        "Chắn vị trí giữa đối thủ và rổ",
        "Nhảy sớm trước khi bóng chạm vành",
      ],
      ans: 1,
    },
    {
      image: IMG_FOOTWORK,
      ques: "Triple-threat gồm…",
      choose: [
        "Chạy–nhảy–ném",
        "Ném–dẫn bóng–chuyền",
        "Cản người–cướp bóng–bịt rổ",
      ],
      ans: 1,
    },
    {
      image: IMG_FOOTWORK,
      ques: "Footwork tốt giúp…",
      choose: [
        "Tăng tốc độ internet",
        "Tạo khoảng trống & tránh phạm luật",
        "Tăng chiều cao tức thì",
      ],
      ans: 1,
    },
    {
      image: IMG_FOOTWORK,
      ques: "Defensive slide đúng…",
      choose: [
        "Bắt chéo chân",
        "Di chuyển ngang, không bắt chéo, trọng tâm thấp",
        "Chạy thẳng lưng cao",
      ],
      ans: 1,
    },
  ],

  intermediate: [
    {
      image: IMG_HANDLE,
      ques: "Mục đích chính của crossover?",
      choose: [
        "Đổi tay ném",
        "Lừa hướng & tạo khoảng trống",
        "Phạm lỗi tấn công",
      ],
      ans: 1,
    },
    {
      image: IMG_HANDLE,
      ques: "Hesitation (hesi) hiệu quả khi…",
      choose: [
        "Giảm tốc đột ngột rồi tăng tốc qua người",
        "Dừng bóng hẳn 2s",
        "Quay lưng giữ bóng",
      ],
      ans: 0,
    },
    {
      image: IMG_HANDLE,
      ques: "Kỹ thuật layup cơ bản tay phải: bước nào sau?",
      choose: ["Trái–phải–nhảy", "Phải–trái–nhảy", "Nhảy tại chỗ"],
      ans: 1,
    },
    {
      image: IMG_HANDLE,
      ques: "Protect dribble tốt nhất là…",
      choose: [
        "Bóng xa người",
        "Bóng thấp, dùng thân và tay không bóng che",
        "Dribble cao ngang ngực",
      ],
      ans: 1,
    },
    {
      image: IMG_HANDLE,
      ques: "Eurostep dùng để…",
      choose: [
        "Đổi hướng trong không trung để tránh block",
        "Ném hook",
        "Chuyền alley-oop",
      ],
      ans: 0,
    },
    {
      image: IMG_HANDLE,
      ques: "Finishing qua big man nên ưu tiên…",
      choose: ["Floater/runner", "Dừng lại pump fake 3 lần", "Ném 3 điểm luôn"],
      ans: 0,
    },
    {
      image: IMG_HANDLE,
      ques: "In-and-out dribble khác crossover ở điểm…",
      choose: [
        "Không đổi tay, giả vờ đổi hướng",
        "Luôn qua giữa chân",
        "Chỉ dùng tay không thuận",
      ],
      ans: 0,
    },
    {
      image: IMG_HANDLE,
      ques: "Reverse layup hữu dụng khi…",
      choose: [
        "Không có bảng",
        "Dùng mặt bảng phía đối diện để tránh block",
        "Ném phạt",
      ],
      ans: 1,
    },
    {
      image: IMG_HANDLE,
      ques: "Spin move an toàn khi…",
      choose: [
        "Đối thủ đứng xa 3m",
        "Đã che chắn tốt & đọc vị trí help defense",
        "Luôn dùng giữa sân",
      ],
      ans: 1,
    },
    {
      image: IMG_HANDLE,
      ques: "Khi bị trap hai người ở biên, lựa chọn tốt là…",
      choose: [
        "Dribble vào góc",
        "Pivot & swing pass cho đồng đội trống",
        "Nhảy chuyền bất kỳ",
      ],
      ans: 1,
    },
  ],

  advanced: [
    {
      image: IMG_PLAYMAKE,
      ques: "PnR basic read: nếu defender under screen với shooter trung bình, lựa chọn tốt?",
      choose: [
        "Pull-up 3 ngay",
        "Reject screen",
        "Sử dụng screen & tấn công midrange mở",
      ],
      ans: 2,
    },
    {
      image: IMG_PLAYMAKE,
      ques: "PnR: big của bạn short roll nhận bóng, weak-side low man xoay vào, read tốt là…",
      choose: [
        "Skip pass ra weak-side corner",
        "Tự layup bất chấp",
        "Back dribble reset",
      ],
      ans: 0,
    },
    {
      image: IMG_PLAYMAKE,
      ques: "Against switch: mismatch guard vs big, phương án ưu tiên?",
      choose: [
        "Iso đánh vào chân chậm hoặc kick-out khi help",
        "Đứng yên chờ đồng đội",
        "Post-up big đối thủ",
      ],
      ans: 0,
    },
    {
      image: IMG_PLAYMAKE,
      ques: "Drive & kick chuẩn cần…",
      choose: [
        "Nhảy rồi tìm người",
        "Đọc help sớm, chuyền đúng nhịp vào pocket/slot",
        "Chuyền bổng cao",
      ],
      ans: 1,
    },
    {
      image: IMG_PLAYMAKE,
      ques: "Spain PnR tạo lợi thế nhờ…",
      choose: [
        "Back screen vào big phòng thủ",
        "Double drag song song",
        "Horns entry",
      ],
      ans: 0,
    },
    {
      image: IMG_PLAYMAKE,
      ques: "Against zone 2-3, vị trí soft spot hiệu quả nhất là…",
      choose: [
        "Short corner & high post",
        "Chỉ perimeter",
        "Ngay dưới rổ giữa 2 big",
      ],
      ans: 0,
    },
    {
      image: IMG_PLAYMAKE,
      ques: "Skip pass weak-side nguy hiểm khi…",
      choose: [
        "No-tag ở corner & help dâng cao",
        "Defender sát người",
        "Không có spacing",
      ],
      ans: 0,
    },
    {
      image: IMG_PLAYMAKE,
      ques: "Hit-ahead pass trong transition giúp…",
      choose: [
        "Chậm nhịp",
        "Tạo áp lực sớm, quyết định trước khi defense set",
        "Mất bóng nhiều hơn",
      ],
      ans: 1,
    },
    {
      image: IMG_PLAYMAKE,
      ques: "Pocket pass khác bounce pass ở…",
      choose: [
        "Đường chuyền ngắn qua khe giữa ball-screen",
        "Luôn nảy đất",
        "Chỉ dùng baseline",
      ],
      ans: 0,
    },
    {
      image: IMG_PLAYMAKE,
      ques: "0.5 rule trong motion offense nghĩa là…",
      choose: [
        "Quyết định trong 0.5s: shoot/pass/drive",
        "Cầm bóng 5s",
        "Chỉ ném 3 điểm",
      ],
      ans: 0,
    },
  ],
};
