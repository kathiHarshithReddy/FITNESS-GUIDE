import { useState, useRef } from "react";

const PHASES = [
  {
    id: 1,
    name: "PHASE 1",
    subtitle: "IGNITION",
    weeks: "WEEKS 1–4",
    color: "#FF4500",
    desc: "Build the engine. Supersets + daily HIIT. Your body will be in shock.",
  },
  {
    id: 2,
    name: "PHASE 2",
    subtitle: "INFERNO",
    weeks: "WEEKS 5–8",
    color: "#FF1744",
    desc: "2-a-days kick in. Morning cardio blast + evening iron. No mercy.",
  },
  {
    id: 3,
    name: "PHASE 3",
    subtitle: "SHRED",
    weeks: "WEEKS 9–12",
    color: "#D500F9",
    desc: "Maximum burn. Triple supersets, finisher circuits, abs twice daily.",
  },
];

const DAYS = [
  { id: "mon", label: "MON", full: "Monday" },
  { id: "tue", label: "TUE", full: "Tuesday" },
  { id: "wed", label: "WED", full: "Wednesday" },
  { id: "thu", label: "THU", full: "Thursday" },
  { id: "fri", label: "FRI", full: "Friday" },
  { id: "sat", label: "SAT", full: "Saturday" },
  { id: "sun", label: "SUN", full: "Sunday" },
];

const workouts = {
  mon: {
    label: "CHEST + TRICEPS + ABS",
    icon: "💪",
    morning: {
      title: "MORNING — CARDIO IGNITION (6:00 AM)",
      duration: "35 min",
      color: "#FF9800",
      exercises: [
        { name: "Treadmill Sprint Intervals", detail: "10 × 30s sprint / 30s walk", videoId: "kMMGnHMNMWU", equip: "Treadmill" },
        { name: "Battle Rope Waves", detail: "5 × 45s, 15s rest", videoId: "p9jBcOGvMCQ", equip: "Battle Ropes" },
        { name: "Box Jumps", detail: "4 × 12 explosive", videoId: "52loww6e9ik", equip: "Plyo Box" },
        { name: "Mountain Climbers", detail: "4 × 30s MAX pace", videoId: "nmwgirgXLYM", equip: "Bodyweight" },
      ],
    },
    evening: {
      title: "EVENING — CHEST + TRICEPS DESTRUCTION (6:00 PM)",
      duration: "75 min",
      color: "#FF4500",
      superset_note: "All marked SS are supersets — zero rest between A and B",
      exercises: [
        { name: "A: Barbell Bench Press", detail: "5 × 5 heavy", videoId: "SCVCLChPQp4", equip: "Barbell", ss: "SS1" },
        { name: "B: Wide Push-Ups", detail: "5 × failure", videoId: "IODxDxX7oi4", equip: "Bodyweight", ss: "SS1" },
        { name: "A: Incline Dumbbell Press", detail: "4 × 10", videoId: "8iPEnn-ltC8", equip: "Dumbbells", ss: "SS2" },
        { name: "B: Dumbbell Flyes", detail: "4 × 12", videoId: "eozdVDA78K0", equip: "Dumbbells", ss: "SS2" },
        { name: "A: Cable Crossover", detail: "4 × 15", videoId: "taI4XduLpTk", equip: "Cable Machine", ss: "SS3" },
        { name: "B: Tricep Pushdowns", detail: "4 × 15", videoId: "2-LAMcpzODU", equip: "Cable Machine", ss: "SS3" },
        { name: "A: Skull Crushers", detail: "3 × 12", videoId: "NIXSKkzMEMo", equip: "EZ Bar", ss: "SS4" },
        { name: "B: Diamond Push-Ups", detail: "3 × failure", videoId: "J0DXl_Abh3E", equip: "Bodyweight", ss: "SS4" },
      ],
      finisher: {
        title: "💀 ABS FINISHER (10 min — No Rest)",
        exercises: [
          { name: "Hanging Leg Raises", detail: "3 × 20", videoId: "Pr1ieGZ5atk", equip: "Pull-up Bar" },
          { name: "Cable Crunches", detail: "3 × 20", videoId: "AV5PmtmUPkg", equip: "Cable Machine" },
          { name: "Plank", detail: "3 × 60 sec", videoId: "pSHjTRCQxIw", equip: "Bodyweight" },
        ],
      },
    },
  },
  tue: {
    label: "BACK + BICEPS + ABS",
    icon: "🏋️",
    morning: {
      title: "MORNING — FAT FURNACE (6:00 AM)",
      duration: "35 min",
      color: "#FF9800",
      exercises: [
        { name: "Rowing Machine", detail: "5 × 3 min hard / 1 min easy", videoId: "H0r_OKQG-wE", equip: "Rower" },
        { name: "Burpees", detail: "5 × 15 reps", videoId: "818R3J49Lhg", equip: "Bodyweight" },
        { name: "Jump Rope", detail: "5 min continuous", videoId: "FJmRQ5iTXKE", equip: "Jump Rope" },
        { name: "Bear Crawls", detail: "4 × 20m", videoId: "sSXySszTNuA", equip: "Floor" },
      ],
    },
    evening: {
      title: "EVENING — BACK + BICEPS ANNIHILATION (6:00 PM)",
      duration: "75 min",
      color: "#FF4500",
      superset_note: "All marked SS are supersets — zero rest between A and B",
      exercises: [
        { name: "A: Deadlift", detail: "5 × 5 heavy", videoId: "op9kVnSso6Q", equip: "Barbell", ss: "SS1" },
        { name: "B: Pull-Ups", detail: "5 × max", videoId: "eGo4IYlbE5g", equip: "Pull-up Bar", ss: "SS1" },
        { name: "A: Barbell Bent-Over Row", detail: "4 × 10", videoId: "9efgcAjQe7E", equip: "Barbell", ss: "SS2" },
        { name: "B: Barbell Curls", detail: "4 × 10", videoId: "ykJmrZ5v0Oo", equip: "Barbell", ss: "SS2" },
        { name: "A: Lat Pulldown", detail: "4 × 12", videoId: "CAwf7n6Luuc", equip: "Cable Machine", ss: "SS3" },
        { name: "B: Hammer Curls", detail: "4 × 12", videoId: "zC3nLlEvin4", equip: "Dumbbells", ss: "SS3" },
        { name: "A: Seated Cable Row", detail: "3 × 15", videoId: "GZbfZ033f74", equip: "Cable Machine", ss: "SS4" },
        { name: "B: Concentration Curls", detail: "3 × 15", videoId: "Jvj2wV0vOYU", equip: "Dumbbells", ss: "SS4" },
      ],
      finisher: {
        title: "💀 ABS FINISHER (10 min — No Rest)",
        exercises: [
          { name: "Ab Wheel Rollout", detail: "3 × 15", videoId: "1B9E1NZEBGQ", equip: "Ab Wheel" },
          { name: "Woodchoppers", detail: "3 × 15 each side", videoId: "pAplQXYoiMo", equip: "Cable Machine" },
          { name: "Russian Twists", detail: "3 × 30 total", videoId: "JyUqwkVpsi8", equip: "Plate" },
        ],
      },
    },
  },
  wed: {
    label: "FULL BODY HIIT + CORE",
    icon: "🔥",
    morning: {
      title: "MORNING — METABOLIC SHOCKWAVE (6:00 AM)",
      duration: "40 min",
      color: "#FF9800",
      exercises: [
        { name: "Assault Bike", detail: "Tabata 8 × 20s max / 10s rest", videoId: "cM-xJMpV5KA", equip: "Assault Bike" },
        { name: "Kettlebell Swings", detail: "5 × 20 reps", videoId: "YSxHifyI6s8", equip: "Kettlebell" },
        { name: "Jump Squats", detail: "5 × 15 reps", videoId: "U4s4mEQ5VqU", equip: "Bodyweight" },
        { name: "Sled Push", detail: "6 × 20m sprint", videoId: "0UvNaBQVpq4", equip: "Sled" },
      ],
    },
    evening: {
      title: "EVENING — CORE TOTAL ANNIHILATION (6:00 PM)",
      duration: "60 min",
      color: "#2196F3",
      superset_note: "Circuit format — complete all exercises before resting 90 sec. 5 rounds.",
      exercises: [
        { name: "Hanging Leg Raises", detail: "× 20 per round", videoId: "Pr1ieGZ5atk", equip: "Pull-up Bar", ss: "CIRCUIT" },
        { name: "Ab Wheel Rollout", detail: "× 15 per round", videoId: "1B9E1NZEBGQ", equip: "Ab Wheel", ss: "CIRCUIT" },
        { name: "Cable Crunches", detail: "× 20 per round", videoId: "AV5PmtmUPkg", equip: "Cable Machine", ss: "CIRCUIT" },
        { name: "Pallof Press", detail: "× 12 each side", videoId: "AH_QZLm_0-s", equip: "Cable Machine", ss: "CIRCUIT" },
        { name: "Dragon Flag", detail: "× 8 slow reps", videoId: "njKXkuhY4os", equip: "Bench", ss: "CIRCUIT" },
        { name: "Plank to Push-Up", detail: "× 10 per round", videoId: "WB0j0EaUjO8", equip: "Bodyweight", ss: "CIRCUIT" },
      ],
      finisher: {
        title: "💀 CARDIO FINISHER",
        exercises: [
          { name: "Stairmaster", detail: "15 min steady state", videoId: "mSYMKLwbVNE", equip: "Stairmaster" },
        ],
      },
    },
  },
  thu: {
    label: "LEGS + GLUTES + ABS",
    icon: "🦵",
    morning: {
      title: "MORNING — LEG ACTIVATION (6:00 AM)",
      duration: "30 min",
      color: "#FF9800",
      exercises: [
        { name: "Cycling / Spin Bike", detail: "5 × 4 min hard / 1 min easy", videoId: "5jE6TeFMFKw", equip: "Spin Bike" },
        { name: "Walking Lunges", detail: "4 × 20m weighted", videoId: "L8fvypPrzzs", equip: "Dumbbells" },
        { name: "Broad Jumps", detail: "4 × 10 explosive", videoId: "XzNiN4Ue_pA", equip: "Bodyweight" },
        { name: "Jump Rope Double Unders", detail: "4 × 30 reps", videoId: "YbNqAjZVbNQ", equip: "Jump Rope" },
      ],
    },
    evening: {
      title: "EVENING — LEGS + GLUTES DEMOLITION (6:00 PM)",
      duration: "80 min",
      color: "#FF4500",
      superset_note: "All marked SS are supersets — zero rest between A and B",
      exercises: [
        { name: "A: Barbell Back Squat", detail: "5 × 5 heavy", videoId: "bEv6CCg2BC8", equip: "Barbell", ss: "SS1" },
        { name: "B: Box Jumps", detail: "5 × 10 explosive", videoId: "52loww6e9ik", equip: "Plyo Box", ss: "SS1" },
        { name: "A: Romanian Deadlift", detail: "4 × 10", videoId: "JCXUYuzwNrM", equip: "Barbell", ss: "SS2" },
        { name: "B: Leg Curls", detail: "4 × 12", videoId: "1Tq3QdYUuHs", equip: "Machine", ss: "SS2" },
        { name: "A: Leg Press", detail: "4 × 15 high reps", videoId: "IZxyjW7MPJQ", equip: "Leg Press Machine", ss: "SS3" },
        { name: "B: Calf Raises", detail: "4 × 25", videoId: "gwLzBJYoWlI", equip: "Leg Press Machine", ss: "SS3" },
        { name: "A: Bulgarian Split Squat", detail: "3 × 12 each", videoId: "2C-uNgKwPLE", equip: "Dumbbells", ss: "SS4" },
        { name: "B: Glute Bridges", detail: "3 × 20", videoId: "OUgsJ8-Vi0E", equip: "Barbell", ss: "SS4" },
      ],
      finisher: {
        title: "💀 ABS FINISHER (10 min — No Rest)",
        exercises: [
          { name: "Decline Sit-Ups", detail: "3 × 25", videoId: "1fbU_MkV7NE", equip: "Decline Bench" },
          { name: "Bicycle Crunches", detail: "3 × 40 total", videoId: "9FGilxCbdz8", equip: "Bodyweight" },
          { name: "L-Sit Hold", detail: "3 × 20 sec", videoId: "IUZJoSP66HI", equip: "Parallel Bars" },
        ],
      },
    },
  },
  fri: {
    label: "SHOULDERS + TRAPS + ABS",
    icon: "🎯",
    morning: {
      title: "MORNING — UPPER BURN (6:00 AM)",
      duration: "35 min",
      color: "#FF9800",
      exercises: [
        { name: "Treadmill Incline Walk", detail: "20 min @ 10% incline, max speed", videoId: "HG6Mj0k4n2I", equip: "Treadmill" },
        { name: "Rope Skipping", detail: "5 × 1 min sprint", videoId: "FJmRQ5iTXKE", equip: "Jump Rope" },
        { name: "Push-Up Variations", detail: "4 × 20 mixed types", videoId: "IODxDxX7oi4", equip: "Bodyweight" },
        { name: "Lateral Bound", detail: "4 × 10 each side", videoId: "6CcMEQ6OMLU", equip: "Bodyweight" },
      ],
    },
    evening: {
      title: "EVENING — SHOULDERS + TRAPS SHRED (6:00 PM)",
      duration: "75 min",
      color: "#FF4500",
      superset_note: "All marked SS are supersets — zero rest between A and B",
      exercises: [
        { name: "A: Standing Barbell OHP", detail: "5 × 5 heavy", videoId: "2yjwXTZQDDI", equip: "Barbell", ss: "SS1" },
        { name: "B: Face Pulls", detail: "5 × 15", videoId: "HSoHeSt5oAo", equip: "Cable Machine", ss: "SS1" },
        { name: "A: Arnold Press", detail: "4 × 12", videoId: "6Z15_WdXmVw", equip: "Dumbbells", ss: "SS2" },
        { name: "B: Lateral Raises", detail: "4 × 15", videoId: "3VcKaXpzqRo", equip: "Dumbbells", ss: "SS2" },
        { name: "A: Barbell Shrugs", detail: "4 × 15 heavy", videoId: "g6qbq4Lf1FI", equip: "Barbell", ss: "SS3" },
        { name: "B: Upright Row", detail: "4 × 12", videoId: "um3VCCnBDMU", equip: "Barbell", ss: "SS3" },
        { name: "A: Rear Delt Flyes", detail: "3 × 15", videoId: "EA7u4Q_8HQ0", equip: "Dumbbells", ss: "SS4" },
        { name: "B: Cable Front Raises", detail: "3 × 15", videoId: "ghWFBFa4py8", equip: "Cable Machine", ss: "SS4" },
      ],
      finisher: {
        title: "💀 ABS FINISHER (10 min — No Rest)",
        exercises: [
          { name: "Toes to Bar", detail: "3 × 15", videoId: "6dHvTlaMnWo", equip: "Pull-up Bar" },
          { name: "Side Plank", detail: "3 × 45s each side", videoId: "wqzrb67Dwf8", equip: "Bodyweight" },
          { name: "Seated Leg Raises", detail: "3 × 20", videoId: "l4kQd9eWclE", equip: "Bench" },
        ],
      },
    },
  },
  sat: {
    label: "BEAST MODE — FULL BODY CIRCUIT",
    icon: "💀",
    morning: {
      title: "MORNING — METABOLIC MASSACRE (7:00 AM)",
      duration: "45 min",
      color: "#D500F9",
      exercises: [
        { name: "5K Run", detail: "Target: sub 28 min — ALL OUT", videoId: "kMMGnHMNMWU", equip: "Treadmill/Track" },
        { name: "Battle Rope Alternating", detail: "5 × 40s, 20s rest", videoId: "p9jBcOGvMCQ", equip: "Battle Ropes" },
        { name: "Sprint Stairs", detail: "5 × up and down", videoId: "mSYMKLwbVNE", equip: "Stairs/Stairmaster" },
      ],
    },
    evening: {
      title: "EVENING — BEAST MODE FULL BODY CIRCUIT (4:00 PM)",
      duration: "90 min",
      color: "#D500F9",
      superset_note: "GIANT SET — All 8 exercises back to back. Rest 2 min. 5 rounds. This is the hardest day.",
      exercises: [
        { name: "Barbell Squat", detail: "× 8 reps", videoId: "bEv6CCg2BC8", equip: "Barbell", ss: "GIANT" },
        { name: "Barbell Bench Press", detail: "× 8 reps", videoId: "SCVCLChPQp4", equip: "Barbell", ss: "GIANT" },
        { name: "Deadlift", detail: "× 8 reps", videoId: "op9kVnSso6Q", equip: "Barbell", ss: "GIANT" },
        { name: "Pull-Ups", detail: "× max reps", videoId: "eGo4IYlbE5g", equip: "Pull-up Bar", ss: "GIANT" },
        { name: "Dips", detail: "× max reps", videoId: "2z8JmcrW-As", equip: "Dip Station", ss: "GIANT" },
        { name: "Kettlebell Swings", detail: "× 20 reps", videoId: "YSxHifyI6s8", equip: "Kettlebell", ss: "GIANT" },
        { name: "Box Jumps", detail: "× 10 reps", videoId: "52loww6e9ik", equip: "Plyo Box", ss: "GIANT" },
        { name: "Hanging Leg Raises", detail: "× 15 reps", videoId: "Pr1ieGZ5atk", equip: "Pull-up Bar", ss: "GIANT" },
      ],
      finisher: {
        title: "🔥 WEEK CLOSER",
        exercises: [
          { name: "Farmer's Walk", detail: "4 × 40m heavy", videoId: "rt17lmnaLSM", equip: "Dumbbells/Trap Bar" },
          { name: "L-Sit to Chin-Up", detail: "3 × 8", videoId: "IUZJoSP66HI", equip: "Pull-up Bar" },
        ],
      },
    },
  },
  sun: {
    label: "ACTIVE RECOVERY",
    icon: "🧘",
    morning: null,
    evening: {
      title: "ACTIVE RECOVERY — MOBILITY + STRETCH",
      duration: "30–45 min",
      color: "#4CAF50",
      superset_note: null,
      exercises: [
        { name: "Foam Rolling Full Body", detail: "10 min — all major groups", videoId: "pqGbSMRObpc", equip: "Foam Roller" },
        { name: "Hip Flexor Stretch", detail: "3 × 60s each side", videoId: "YqF6hVZM2eU", equip: "Bodyweight" },
        { name: "Thoracic Spine Rotation", detail: "3 × 10 each side", videoId: "7K9NqGg4Fgg", equip: "Bodyweight" },
        { name: "Pigeon Pose", detail: "3 × 90s each side", videoId: "LRna8bE7bZ0", equip: "Mat" },
        { name: "Light Swimming or Walk", detail: "20 min — easy pace", videoId: "5SKlhtRJgzQ", equip: "Pool/Outdoors" },
      ],
    },
  },
};

const weeklyBurn = [
  { label: "Morning Sessions", val: "~2,100 kcal/wk" },
  { label: "Evening Sessions", val: "~3,500 kcal/wk" },
  { label: "Total Weekly Burn", val: "~5,600 kcal" },
  { label: "Est. Fat Loss/Week", val: "~0.6–0.8 kg" },
];

const ssColors = {
  SS1: "#FF4500",
  SS2: "#FF1744",
  SS3: "#FF6D00",
  SS4: "#E91E63",
  CIRCUIT: "#2196F3",
  GIANT: "#D500F9",
};

export default function BeastModePlan() {
  const [activePhase, setActivePhase] = useState(1);
  const [activeDay, setActiveDay] = useState("mon");
  const [videoModal, setVideoModal] = useState(null);
  const [expandedSection, setExpandedSection] = useState("evening");

  const workout = workouts[activeDay];
  const phase = PHASES.find((p) => p.id === activePhase);

  const VideoModal = ({ videoId, exerciseName }) => (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)",
        zIndex: 9999, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: "20px"
      }}
      onClick={() => setVideoModal(null)}
    >
      <div
        style={{ width: "100%", maxWidth: "760px", background: "#111", borderRadius: "12px", overflow: "hidden", boxShadow: "0 0 60px rgba(255,69,0,0.4)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ background: "#1a1a1a", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#FF4500", fontWeight: 800, fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase" }}>{exerciseName}</span>
          <button onClick={() => setVideoModal(null)} style={{ background: "none", border: "none", color: "#fff", fontSize: "20px", cursor: "pointer", lineHeight: 1 }}>✕</button>
        </div>
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={exerciseName}
          />
        </div>
        <div style={{ background: "#1a1a1a", padding: "8px 16px", textAlign: "right" }}>
          <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noreferrer"
            style={{ color: "#FF4500", fontSize: "12px", textDecoration: "none" }}>Open in YouTube ↗</a>
        </div>
      </div>
    </div>
  );

  const ExerciseCard = ({ ex, isMorning }) => (
    <div style={{
      background: "#161616",
      borderRadius: "10px",
      padding: "12px 14px",
      marginBottom: "8px",
      borderLeft: ex.ss ? `3px solid ${ssColors[ex.ss] || "#FF4500"}` : "3px solid #333",
      display: "flex",
      alignItems: "center",
      gap: "12px"
    }}>
      {ex.ss && (
        <span style={{
          background: ssColors[ex.ss] || "#FF4500",
          color: "#fff",
          fontSize: "9px",
          fontWeight: 800,
          padding: "3px 6px",
          borderRadius: "4px",
          letterSpacing: "0.5px",
          flexShrink: 0,
          whiteSpace: "nowrap"
        }}>{ex.ss}</span>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: "14px", lineHeight: 1.3 }}>{ex.name}</div>
        <div style={{ color: "#888", fontSize: "12px", marginTop: "2px" }}>{ex.detail} · <span style={{ color: "#555" }}>{ex.equip}</span></div>
      </div>
      <button
        onClick={() => setVideoModal({ videoId: ex.videoId, name: ex.name })}
        style={{
          background: "#FF0000",
          border: "none",
          borderRadius: "6px",
          padding: "6px 10px",
          color: "#fff",
          cursor: "pointer",
          fontSize: "11px",
          fontWeight: 800,
          flexShrink: 0,
          letterSpacing: "0.5px"
        }}
      >▶ WATCH</button>
    </div>
  );

  const SectionBlock = ({ section, type }) => {
    if (!section) return null;
    const isOpen = expandedSection === type;
    return (
      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={() => setExpandedSection(isOpen ? null : type)}
          style={{
            width: "100%",
            background: isOpen ? section.color : "#1c1c1c",
            border: `1px solid ${section.color}33`,
            borderRadius: "10px",
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          <div style={{ textAlign: "left" }}>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: "13px", letterSpacing: "1px" }}>{section.title}</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", marginTop: "2px" }}>{section.duration}</div>
          </div>
          <span style={{ color: "#fff", fontSize: "18px" }}>{isOpen ? "▲" : "▼"}</span>
        </button>
        {isOpen && (
          <div style={{ background: "#0f0f0f", border: `1px solid #222`, borderTop: "none", borderRadius: "0 0 10px 10px", padding: "14px" }}>
            {section.superset_note && (
              <div style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: "8px", padding: "10px 12px", marginBottom: "12px", color: "#aaa", fontSize: "11px", lineHeight: 1.5 }}>
                ⚡ {section.superset_note}
              </div>
            )}
            {section.exercises.map((ex, i) => <ExerciseCard key={i} ex={ex} />)}
            {section.finisher && (
              <>
                <div style={{ color: "#FF4500", fontWeight: 800, fontSize: "12px", letterSpacing: "1.5px", margin: "14px 0 8px" }}>{section.finisher.title}</div>
                {section.finisher.exercises.map((ex, i) => <ExerciseCard key={i} ex={ex} />)}
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "'Inter', 'SF Pro', system-ui, sans-serif", padding: "0 0 60px" }}>
      {videoModal && <VideoModal videoId={videoModal.videoId} exerciseName={videoModal.name} />}

      {/* HEADER */}
      <div style={{
        background: "linear-gradient(135deg, #1a0a0a 0%, #0a0a1a 100%)",
        borderBottom: "1px solid #222",
        padding: "24px 20px 20px"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ color: "#FF4500", fontWeight: 900, fontSize: "11px", letterSpacing: "3px", marginBottom: "6px" }}>12-WEEK PROGRAM</div>
          <h1 style={{ margin: 0, fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 900, letterSpacing: "-1px", lineHeight: 1.1 }}>
            BEAST MODE<br />
            <span style={{ color: "#FF4500" }}>2-A-DAY SHRED</span>
          </h1>
          <div style={{ color: "#666", fontSize: "13px", marginTop: "8px" }}>6'3" · 102.6kg · Training-Only Protocol · No Excuses</div>

          {/* CALORIE BURN STRIP */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "8px",
            marginTop: "16px"
          }}>
            {weeklyBurn.map((item, i) => (
              <div key={i} style={{
                background: "#111",
                border: "1px solid #222",
                borderRadius: "8px",
                padding: "10px 12px"
              }}>
                <div style={{ color: "#555", fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase" }}>{item.label}</div>
                <div style={{ color: i === 3 ? "#FF4500" : "#fff", fontWeight: 800, fontSize: "14px", marginTop: "2px" }}>{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px 16px 0" }}>
        {/* PHASE SELECTOR */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ color: "#555", fontSize: "10px", letterSpacing: "2px", marginBottom: "10px", textTransform: "uppercase" }}>Training Phase</div>
          <div style={{ display: "flex", gap: "8px" }}>
            {PHASES.map((ph) => (
              <button
                key={ph.id}
                onClick={() => setActivePhase(ph.id)}
                style={{
                  flex: 1,
                  background: activePhase === ph.id ? ph.color : "#111",
                  border: `1px solid ${activePhase === ph.id ? ph.color : "#222"}`,
                  borderRadius: "10px",
                  padding: "12px 8px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  textAlign: "center"
                }}
              >
                <div style={{ color: "#fff", fontWeight: 900, fontSize: "12px", letterSpacing: "1px" }}>{ph.name}</div>
                <div style={{ color: activePhase === ph.id ? "rgba(255,255,255,0.8)" : "#555", fontSize: "10px", marginTop: "2px", letterSpacing: "1px" }}>{ph.weeks}</div>
                <div style={{ color: activePhase === ph.id ? "rgba(255,255,255,0.9)" : "#444", fontSize: "10px", fontWeight: 700, marginTop: "4px", letterSpacing: "1px" }}>{ph.subtitle}</div>
              </button>
            ))}
          </div>
          {phase && (
            <div style={{ background: "#111", border: `1px solid ${phase.color}33`, borderRadius: "8px", padding: "10px 14px", marginTop: "10px" }}>
              <span style={{ color: phase.color, fontWeight: 700, fontSize: "12px" }}>PHASE {phase.id} — {phase.subtitle}: </span>
              <span style={{ color: "#aaa", fontSize: "12px" }}>{phase.desc}</span>
            </div>
          )}
        </div>

        {/* DAY SELECTOR */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ color: "#555", fontSize: "10px", letterSpacing: "2px", marginBottom: "10px", textTransform: "uppercase" }}>Select Day</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px" }}>
            {DAYS.map((d) => {
              const w = workouts[d.id];
              const isActive = activeDay === d.id;
              const isSun = d.id === "sun";
              return (
                <button
                  key={d.id}
                  onClick={() => { setActiveDay(d.id); setExpandedSection("evening"); }}
                  style={{
                    background: isActive ? (isSun ? "#1b2d1b" : "#1a0a0a") : "#111",
                    border: `1px solid ${isActive ? (isSun ? "#4CAF50" : "#FF4500") : "#222"}`,
                    borderRadius: "8px",
                    padding: "8px 4px",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.2s"
                  }}
                >
                  <div style={{ color: "#aaa", fontSize: "9px", letterSpacing: "1px" }}>{d.label}</div>
                  <div style={{ fontSize: "16px", margin: "3px 0" }}>{w.icon}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* WORKOUT DAY HEADER */}
        <div style={{
          background: "#111",
          border: "1px solid #222",
          borderRadius: "12px",
          padding: "14px 16px",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}>
          <span style={{ fontSize: "28px" }}>{workout.icon}</span>
          <div>
            <div style={{ color: "#555", fontSize: "10px", letterSpacing: "2px" }}>{DAYS.find(d => d.id === activeDay)?.full.toUpperCase()}</div>
            <div style={{ color: "#fff", fontWeight: 900, fontSize: "16px", letterSpacing: "0.5px" }}>{workout.label}</div>
            {workout.morning ? (
              <div style={{ color: "#FF9800", fontSize: "11px", marginTop: "2px", fontWeight: 600 }}>⚡ 2-A-DAY — Morning + Evening</div>
            ) : activeDay === "sun" ? (
              <div style={{ color: "#4CAF50", fontSize: "11px", marginTop: "2px", fontWeight: 600 }}>✅ Active Recovery — You earned it</div>
            ) : null}
          </div>
        </div>

        {/* MORNING SESSION */}
        {workout.morning && (
          <SectionBlock section={workout.morning} type="morning" />
        )}

        {/* EVENING SESSION */}
        <SectionBlock section={workout.evening} type="evening" />

        {/* MOTIVATION BLOCK */}
        <div style={{
          background: "linear-gradient(135deg, #1a0000, #0a0010)",
          border: "1px solid #FF450033",
          borderRadius: "12px",
          padding: "16px",
          marginTop: "16px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "24px", marginBottom: "8px" }}>🔥</div>
          <div style={{ color: "#FF4500", fontWeight: 900, fontSize: "13px", letterSpacing: "2px", marginBottom: "6px" }}>THE ONLY WAY OUT IS THROUGH</div>
          <div style={{ color: "#888", fontSize: "12px", lineHeight: 1.6 }}>
            At 6'3" and 102.6kg, you're burning <strong style={{ color: "#fff" }}>~800 kcal/session</strong> × 2 = <strong style={{ color: "#FF4500" }}>1,600 kcal/day</strong> on training days.
            That's your six-pack showing up whether nutrition is perfect or not.
            <br /><strong style={{ color: "#fff" }}>Consistency beats intensity. Show up every day.</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
