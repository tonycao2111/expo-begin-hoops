// lessons.ts
export type LessonCategory =
  | "basic"
  | "dribbling"
  | "shooting"
  | "defense"
  | "fitness";

export const CATEGORY_META: Record<LessonCategory, { label: string }> = {
  basic: { label: "Cơ bản" },
  dribbling: { label: "Dẫn bóng" },
  shooting: { label: "Ném rổ" },
  defense: { label: "Phòng thủ" },
  fitness: { label: "Thể lực" },
};

export interface LessonSection {
  title: string;
  image?: string; // require('...')
  body?: string[]; // đoạn văn
  steps?: string[]; // các bước (step-by-step)
  bullets?: string[]; // bullet list
  tips?: string[]; // ghi chú/ coaching cues
  warnings?: string[]; // lỗi thường gặp / cần tránh
  progression?: string[]; // gợi ý nâng độ khó
}

export interface LessonData {
  id: number;
  imgSrc: number; // hero image
  title: string;
  description: string;
  category: LessonCategory;
  duration?: number; // phút
  level?: "beginner" | "intermediate" | "advanced";
  content?: LessonSection[]; // nội dung chi tiết
}

// 👉 Thay các đường dẫn require(...) bằng ảnh thật trong dự án của bạn
export const homeData: LessonData[] = [
  {
    id: 101,
    imgSrc: 0,
    title: "Tư thế & di chuyển cơ bản",
    description:
      "Học tư thế phòng thủ, bước chéo, slide và dừng đột ngột an toàn.",
    category: "basic",
    duration: 8,
    level: "beginner",
    content: [
      {
        title: "Mục tiêu",
        bullets: [
          "Giữ trọng tâm thấp, lưng thẳng, mắt nhìn trước.",
          "Di chuyển ngang (slide) không chụm chân, bước chéo khi cần đổi hướng.",
        ],
        image:"https://thethaothienlong.vn/wp-content/uploads/2022/04/Kich-thuoc-qua-bong-ro-1.jpg"
      },
      {
        title: "Các bước thực hiện",
        steps: [
          "Tư thế ready: gối chùng, mũi chân hướng trước, tay mở ngang ngang hông.",
          "Slide trái–phải: đẩy bằng chân đối diện, không bắt chéo chân.",
          "Dừng đột ngột (jump stop): chạm đất 2 chân cùng lúc, giữ thăng bằng.",
        ],
        tips: [
          "Gót hơi nhấc, cảm giác ‘nhún’ — phản xạ tốt hơn.",
          "Giữ lưng thẳng, mắt nhìn ngẩng để quan sát sân.",
        ],
      },
      {
        title: "Lỗi thường gặp & khắc phục",
        warnings: [
          "Đứng quá cao → hạ trọng tâm; mở rộng chân bằng vai.",
          "Chụm chân khi slide → tập dấu chân kẻ vạch để nhắc khoảng cách.",
        ],
        progression: [
          "Thêm kháng lực dây mini-band ở đầu gối.",
          "Thêm còi/ tín hiệu thay đổi hướng bất ngờ.",
        ],
      },
    ],
  },
  {
    id: 102,
    imgSrc: 0,
    title: "Dẫn bóng tay thuận",
    description:
      "Kiểm soát bóng ở tầm thấp, nhìn lên và đổi tốc độ nhịp nhàng.",
    category: "dribbling",
    duration: 10,
    level: "beginner",
    content: [
      {
        title: "Mục tiêu",
        bullets: [
          "Dẫn bóng tay thuận ổn định ở tầm hông/đùi.",
          "Giữ mắt nhìn trước, không nhìn bóng.",
        ],
      },
      {
        title: "Drill 1: Stationary Low Dribble",
        steps: [
          "Tư thế thấp, dẫn bóng nhanh tầm gối 20–30 lần.",
          "Đổi nhịp chậm–nhanh mỗi 5 lần.",
        ],
        tips: [
          "Cảm giác ‘đè’ bóng bằng ngón tay, không tát lòng bàn tay.",
          "Âm thanh bóng đều và dứt khoát.",
        ],
      },
      {
        title: "Drill 2: Walk & Pace Change",
        steps: [
          "Dẫn bóng khi đi chậm 10m, xoay lại.",
          "Lặp lại nhưng thêm tăng tốc 3m cuối.",
        ],
        warnings: [
          "Ngẩng đầu, tránh cúi người nhìn bóng.",
          "Không để bóng cao quá hông khi tăng tốc.",
        ],
      },
    ],
  },
  {
    id: 103,
    imgSrc: 0,
    title: "Crossover cơ bản",
    description:
      "Thực hành đổi hướng trước người (front crossover) để vượt qua hậu vệ.",
    category: "dribbling",
    duration: 12,
    level: "beginner",
    content: [
      {
        title: "Mục tiêu",
        bullets: [
          "Crossover gọn ở trước người, bóng đi đường chéo thấp.",
          "Bước ‘bán thân’ sang hướng mới ngay sau đổi tay.",
        ],
      },
      {
        title: "Các bước",
        steps: [
          "Dẫn bóng tay thuận, hạ trọng tâm trước khi đổi.",
          "Đẩy bóng chéo sang tay còn lại ngay trước đầu gối.",
          "Bước bùng nổ sang hướng mới (first step), che bóng bằng vai.",
        ],
        tips: [
          "Hông và vai ‘giả’ nhẹ để đánh lừa hậu vệ.",
          "Crossover thấp, nhanh, không vung rộng.",
        ],
      },
      {
        title: "Tiến triển",
        progression: [
          "Thêm cone ở giữa, chạy chữ V qua cone.",
          "Thêm hậu vệ thụ động, rồi chủ động.",
        ],
      },
    ],
  },
  {
    id: 104,
    imgSrc: 0,
    title: "Form ném chuẩn (BEEF)",
    description:
      "Balance–Eyes–Elbow–Follow-through: xây dựng thói quen ném chuẩn xác.",
    category: "shooting",
    duration: 12,
    level: "beginner",
    content: [
      {
        title: "Mục tiêu",
        bullets: [
          "Thăng bằng tốt, mắt ngắm điểm chuẩn (hooks/điểm bảng).",
          "Khuỷu tay thẳng trục, cổ tay búng (snap) thả mềm.",
        ],
      },
      {
        title: "Shadow Shooting (không bóng → có bóng)",
        steps: [
          "Ném không bóng 10–15 lần trước gương/điểm mốc.",
          "Thêm bóng: form shooting cự ly gần 1–2m, 30–50 lần.",
        ],
        tips: [
          "Giữ follow-through 1 giây, 3 ngón (ngón trỏ/giữa) chĩa rổ.",
          "Bóng xuất phát từ ‘pocket’, không kéo từ hông.",
        ],
      },
      {
        title: "Lỗi thường gặp",
        warnings: [
          "Nhảy đổ người về trước → chú ý hạ thăng bằng thẳng trục.",
          "Khuỷu tay xoè ra → tập kẹp khuỷu sát trục vai.",
        ],
      },
    ],
  },
  {
    id: 105,
    imgSrc: 0,
    title: "Layup 3 bước tay phải",
    description:
      "Góc tiếp cận, nhịp chân, điểm đặt bóng vào bảng – tỉ lệ ghi điểm cao.",
    category: "shooting",
    duration: 9,
    level: "beginner",
    content: [
      {
        title: "Nhịp chân & điểm bảng",
        steps: [
          "Bước – bước – nhảy (trái–phải–nhảy với tay phải).",
          "Đặt bóng vào ô vuông bảng (điểm bank) ở góc 45°.",
        ],
        tips: [
          "Ôm bóng gần ngực khi vào khu vực cấm địa.",
          "Mắt nhìn điểm bảng trước khi nhảy.",
        ],
      },
      {
        title: "Drill",
        bullets: [
          "Form layup chậm 10 lần mỗi bên.",
          "Chạy từ vạch ném phạt → layup 10 lần.",
        ],
        progression: [
          "Thêm hậu vệ thụ động, rồi chủ động.",
          "Thêm đổi hướng euro step khi đã thuần thục.",
        ],
      },
    ],
  },
  {
    id: 106,
    imgSrc: 0,
    title: "Phòng thủ 1-1 cơ bản",
    description:
      "Giữ khoảng cách, chặn đường center-line, footwork lateral nhanh.",
    category: "defense",
    duration: 10,
    level: "beginner",
    content: [
      {
        title: "Nguyên tắc",
        bullets: [
          "Luôn ở giữa người–rổ (center-line).",
          "Khoảng cách đủ gần để gây áp lực, không phạm lỗi.",
        ],
      },
      {
        title: "Drill Mirror",
        steps: [
          "Đối mặt, người tấn công dẫn bóng chậm 6–8m.",
          "Người thủ bám ngang, slide theo, không bắt chéo chân.",
        ],
        tips: [
          "Tay gần bóng thấp, tay xa bóng cao che đường chuyền.",
          "Gọi ‘ball–ball’ để tập thói quen giao tiếp.",
        ],
      },
    ],
  },
  {
    id: 107,
    imgSrc: 0,
    title: "Closeout đúng kỹ thuật",
    description:
      "Bật chạy – chậm lại – chùng gối – tay contest, không phạm lỗi.",
    category: "defense",
    duration: 8,
    level: "beginner",
    content: [
      {
        title: "Chuỗi Closeout",
        steps: [
          "Bật chạy nhanh 2/3 quãng, mắt nhìn ngực đối thủ.",
          "Chậm lại bằng bước nhỏ, chùng gối, tay vươn cao contest.",
        ],
        warnings: [
          "Không bay người vào shooter.",
          "Tránh lao bằng gót chân dễ mất trụ.",
        ],
      },
      {
        title: "Tiến triển",
        progression: [
          "Thêm pump fake của đối thủ.",
          "Closeout rồi slide chặn drive 2 bước.",
        ],
      },
    ],
  },
  {
    id: 108,
    imgSrc: 0,
    title: "Thang chân nhanh (Agility Ladder)",
    description:
      "Bài tập tốc độ chân & thăng bằng, cải thiện phản xạ trên sân.",
    category: "fitness",
    duration: 7,
    level: "beginner",
    content: [
      {
        title: "Bài tập",
        steps: [
          "One-in, two-in (một chân/ hai chân) qua từng ô.",
          "Icky shuffle (vào–ra–tiến) nhịp 1–2–3.",
        ],
        tips: [
          "Giữ thân trên ổn định, tay đánh tự nhiên.",
          "Bước nhẹ, chạm đất nhanh.",
        ],
      },
      {
        title: "Tiến triển",
        progression: [
          "Thêm bóng rổ tay không thuận.",
          "Thêm đổi hướng/ xoay 180° ở cuối thang.",
        ],
      },
    ],
  },
  {
    id: 109,
    imgSrc: 0,
    title: "Core cho bóng rổ",
    description:
      "Plank, dead bug, anti-rotation giúp ổn định thân khi va chạm.",
    category: "fitness",
    duration: 8,
    level: "beginner",
    content: [
      {
        title: "Bài tập cốt lõi",
        bullets: ["Plank 3×30s", "Dead bug 3×10 mỗi bên", "Pallof press 3×12"],
        tips: [
          "Lưng trung lập, siết bụng thở đều.",
          "Ưu tiên kiểm soát trước khi tăng tải.",
        ],
      },
    ],
  },
  {
    id: 110,
    imgSrc: 0,
    title: "Ném phạt chuẩn xác",
    description:
      "Routine trước khi ném, nhịp thở, điểm ngắm và follow-through.",
    category: "shooting",
    duration: 6,
    level: "beginner",
    content: [
      {
        title: "Routine 3–5 bước",
        steps: [
          "Đứng đúng vạch, hai chân cân bằng.",
          "2–3 nhịp dribble, hít sâu, mắt ngắm điểm rổ.",
          "Ném, giữ follow-through 1s.",
        ],
      },
      {
        title: "Mẹo & Lỗi thường gặp",
        tips: ["Giữ routine nhất quán.", "Ghi chép tỉ lệ vào sổ."],
        warnings: [
          "Vội vã, đổi routine liên tục.",
          "Thả bóng bằng cả bàn tay (thiếu ‘snap’).",
        ],
      },
    ],
  },
];
