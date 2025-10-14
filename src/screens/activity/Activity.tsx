// App.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, View, Text, Pressable } from "react-native";
import Svg, { Circle, Rect, Line } from "react-native-svg";

const { width: W, height: H } = Dimensions.get("window");

// --- Tham số game (dễ chỉnh) ---
const BALL_R = 14;
const GRAVITY = 1500; // px/s^2
const DRAG = 0.998; // suy hao vận tốc theo thời gian
const FLOOR_Y = H - 90; // sàn
const LAUNCH_SCALE = 3.2; // quy đổi kéo -> vận tốc
const RESET_TIMEOUT = 1200; // ms sau khi ra biên thì reset

// Vành rổ (vẽ bằng rect + line trang trí)
const RIM_W = 80;
const RIM_H = 4;
const RIM_X = W * 0.68 - RIM_W / 2; // giữa màn hình lệch phải
const RIM_Y = H * 0.25;

// Miệng rổ (vùng tính điểm): hẹp hơn vành 2*BALL_R
const SCORE_GATE_X1 = RIM_X + BALL_R * 0.6;
const SCORE_GATE_X2 = RIM_X + RIM_W - BALL_R * 0.6;
const SCORE_GATE_Y1 = RIM_Y + RIM_H + 2;
const SCORE_GATE_Y2 = SCORE_GATE_Y1 + BALL_R * 1.2;

type Vec = { x: number; y: number };

export default function Activity() {
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [shots, setShots] = useState(0);

  const [ball, setBall] = useState<Vec>({ x: W * 0.25, y: FLOOR_Y - BALL_R });
  const vel = useRef<Vec>({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const lastTime = useRef<number | null>(null);
  const [aimStart, setAimStart] = useState<Vec | null>(null);
  const [justScored, setJustScored] = useState(false);
  const resetTimer = useRef<NodeJS.Timeout | null>(null);

  // Game loop
  const step = useCallback(
    (t: number) => {
      if (lastTime.current == null) lastTime.current = t;
      const dt = Math.min(0.033, (t - lastTime.current) / 1000); // sec, clamp 33ms
      lastTime.current = t;

      // tích lũy vận tốc
      vel.current.y += GRAVITY * dt;
      vel.current.x *= DRAG;
      vel.current.y *= DRAG;

      // vị trí mới
      let nx = ball.x + vel.current.x * dt;
      let ny = ball.y + vel.current.y * dt;

      // chạm sàn
      if (ny + BALL_R > FLOOR_Y) {
        ny = FLOOR_Y - BALL_R;
        vel.current.y *= -0.45; // nảy nhẹ
        // ma sát sàn
        vel.current.x *= 0.8;
      }

      // biên trái/phải
      if (nx - BALL_R < 0) {
        nx = BALL_R;
        vel.current.x *= -0.5;
      }
      if (nx + BALL_R > W) {
        nx = W - BALL_R;
        vel.current.x *= -0.5;
      }

      // tính điểm: khi tâm bóng đi qua "cổng" từ trên xuống dưới
      if (
        !justScored &&
        ball.y <= SCORE_GATE_Y1 &&
        ny >= SCORE_GATE_Y2 && // cắt qua vùng
        nx >= SCORE_GATE_X1 &&
        nx <= SCORE_GATE_X2 &&
        vel.current.y > 0 // đang rơi xuống
      ) {
        setJustScored(true);
        setScore((s) => {
          const ns = s + 1;
          setBest((b) => Math.max(b, ns));
          return ns;
        });
        // cho cảm giác "swish": giảm vận tốc dọc
        vel.current.y *= 0.35;
      }

      // nếu bóng rơi ra ngoài đáy (hiếm khi) -> reset
      if (ny - BALL_R > H + 40) {
        scheduleReset();
      }

      setBall({ x: nx, y: ny });
      raf.current = requestAnimationFrame(step);
    },
    [ball.x, ball.y, justScored]
  );

  // vòng lặp
  useEffect(() => {
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [step]);

  // khi bóng đã xuyên rổ đủ thấp -> cho phép ghi điểm lại
  useEffect(() => {
    if (justScored && ball.y < RIM_Y - 40) {
      setJustScored(false);
    }
  }, [ball.y, justScored]);

  const scheduleReset = () => {
    if (resetTimer.current) return;
    resetTimer.current = setTimeout(() => {
      resetTimer.current = null;
      setBall({ x: W * 0.25, y: FLOOR_Y - BALL_R });
      vel.current = { x: 0, y: 0 };
      setJustScored(false);
    }, RESET_TIMEOUT);
  };

  // điều khiển kéo-thả
  const onPointerDown = (e: any) => {
    const { locationX, locationY } = e.nativeEvent;
    setAimStart({ x: locationX, y: locationY });
  };

  const onPointerMove = (e: any) => {
    if (!aimStart) return;
    // hiển thị đường ngắm bằng state ball tạm? -> không cần, chỉ UI
  };

  const onPointerUp = (e: any) => {
    if (!aimStart) return;
    const { locationX, locationY } = e.nativeEvent;
    const dx = aimStart.x - locationX;
    const dy = aimStart.y - locationY;
    // bắn theo vector ngược hướng kéo
    vel.current.x = dx * LAUNCH_SCALE;
    vel.current.y = dy * LAUNCH_SCALE;
    setAimStart(null);
    setShots((s) => s + 1);
  };

  const resetAll = () => {
    setScore(0);
    setShots(0);
    setBest((b) => Math.max(b, 0));
    setBall({ x: W * 0.25, y: FLOOR_Y - BALL_R });
    vel.current = { x: 0, y: 0 };
    setJustScored(false);
  };

  return (
    <View
      style={styles.container}
      onTouchStart={onPointerDown}
      onTouchMove={onPointerMove}
      onTouchEnd={onPointerUp}
    >
      {/* HUD */}
      <View style={styles.hud}>
        <Text style={styles.score}>Score: {score}</Text>
        <Text style={styles.best}>Best: {best}</Text>
        <Text style={styles.shots}>Shots: {shots}</Text>
        <Pressable onPress={resetAll} style={styles.btn}>
          <Text style={styles.btnText}>Reset</Text>
        </Pressable>
      </View>

      {/* Sân bóng & vật thể */}
      <Svg width={W} height={H}>
        {/* Sàn */}
        <Rect x={0} y={FLOOR_Y} width={W} height={H - FLOOR_Y} fill="#f0e7db" />

        {/* Cột bảng rổ */}
        <Rect
          x={RIM_X + RIM_W - 8}
          y={RIM_Y - 60}
          width={6}
          height={60}
          fill="#999"
        />
        {/* Bảng rổ */}
        <Rect
          x={RIM_X + RIM_W - 42}
          y={RIM_Y - 60}
          width={80}
          height={50}
          stroke="#d1d1d1"
          strokeWidth={3}
          fill="#ffffff"
        />
        {/* Ô vuông bảng */}
        <Rect
          x={RIM_X + RIM_W - 18}
          y={RIM_Y - 45}
          width={22}
          height={18}
          stroke="#ff6b00"
          strokeWidth={2}
          fill="transparent"
        />

        {/* Vành rổ */}
        <Rect
          x={RIM_X}
          y={RIM_Y}
          width={RIM_W}
          height={RIM_H}
          fill="#ff6b00"
          rx={2}
        />
        {/* Net (vẽ tượng trưng) */}
        <Line
          x1={RIM_X}
          y1={RIM_Y + RIM_H}
          x2={RIM_X + RIM_W}
          y2={RIM_Y + RIM_H + 24}
          stroke="#ff6b00"
          strokeWidth={1}
        />
        <Line
          x1={RIM_X + RIM_W}
          y1={RIM_Y + RIM_H}
          x2={RIM_X}
          y2={RIM_Y + RIM_H + 24}
          stroke="#ff6b00"
          strokeWidth={1}
        />

        {/* (Ẩn) vùng tính điểm để debug: bật fillOpacity nếu muốn nhìn */}
        {/* <Rect x={SCORE_GATE_X1} y={SCORE_GATE_Y1} width={SCORE_GATE_X2 - SCORE_GATE_X1} height={SCORE_GATE_Y2 - SCORE_GATE_Y1} fill="rgba(0,255,0,0.2)" /> */}

        {/* Bóng */}
        <Circle cx={ball.x} cy={ball.y} r={BALL_R} fill="#ff8a00" />
        <Line
          x1={ball.x - BALL_R * 0.7}
          y1={ball.y - BALL_R * 0.2}
          x2={ball.x + BALL_R * 0.7}
          y2={ball.y + BALL_R * 0.2}
          stroke="#cc6f00"
          strokeWidth={2}
        />
      </Svg>

      {/* Hướng dẫn ngắm bắn */}
      {aimStart && (
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          <Svg width={W} height={H}>
            <Line
              x1={aimStart.x}
              y1={aimStart.y}
              x2={ball.x}
              y2={ball.y}
              stroke="#333"
              strokeDasharray="6,6"
              strokeWidth={2}
            />
          </Svg>
        </View>
      )}

      {/* Chân màn hình */}
      <Text style={styles.tip}>Kéo từ bóng để ngắm — thả để bắn</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  hud: {
    position: "absolute",
    top: 40,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  score: { fontSize: 20, fontWeight: "700", color: "#222" },
  best: { fontSize: 16, fontWeight: "600", color: "#555" },
  shots: { fontSize: 14, color: "#777", marginLeft: "auto", marginRight: 8 },
  btn: {
    backgroundColor: "#222",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnText: { color: "#fff", fontWeight: "700" },
  tip: {
    position: "absolute",
    bottom: 24,
    width: "100%",
    textAlign: "center",
    color: "#666",
  },
});
