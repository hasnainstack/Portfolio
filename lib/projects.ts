export type Project = {
  slug: string;
  code: string; // experiment id, e.g. EXP-003
  title: string;
  status: "Shipped" | "In Progress" | "Experiment";
  tags: string[];
  summary: string;
  problem: string;
  approach: string[];
  architecture: string;
  challenges: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "eduagent",
    code: "EXP-007",
    title: "EduAgent · AI Voice Sales Assistant",
    status: "Shipped",
    tags: ["Voice AI", "Agents", "Full-Stack"],
    summary:
      "Nova — a voice-powered AI admissions counselor for DevNest Academy. Answers questions about courses, fees, scholarships, and enrollments via voice or text.",
    problem:
      "Online academies lose prospective students at the inquiry stage — no one is available 24/7 to answer course, fee, and scholarship questions in a natural, conversational way.",
    approach: [
      "Custom prompt-based tool-calling loop (not LangChain bind_tools) — more reliable with Groq’s Llama 3.3-70b on structured JSON outputs.",
      "Dual voice pipeline: Browser Web Speech API for low-latency text-to-agent, and a WebSocket path using Deepgram STT + gTTS/ElevenLabs for full audio round-trips.",
      "7 agent tools covering course search, fee lookup, scholarship matching, FAQ retrieval, and authenticated enrollment.",
      "JWT auth, SQLite + SQLAlchemy backend, admin panel for course management, and a shopping cart for direct enrollment.",
    ],
    architecture:
      "Browser mic → Web Speech API → POST /chat → NovaAgent (Groq Llama 3.3-70b) → tool-calling loop → response text → SpeechSynthesis → user. WebSocket path: audio → Deepgram STT → agent → gTTS/ElevenLabs → audio bytes → browser playback.",
    challenges: [
      "LangChain bind_tools was unreliable with Llama on Groq — switched to parsing raw JSON tool-call output from the prompt, which proved far more stable.",
      "SQLite connection pool exhaustion under hot-reload — fixed with NullPool to avoid stale connections during development.",
      "Keeping voice latency acceptable across the full STT → LLM → TTS chain — browser SpeechSynthesis as primary TTS eliminated one network hop entirely.",
    ],
    links: [
      { label: "Live demo", href: "https://eduagent-zeta.vercel.app/" },
      { label: "GitHub", href: "https://github.com/hasnainstack/eduagent" },
    ],
  },
  {
    slug: "ai-voice-interviewer",
    code: "EXP-004",
    title: "AI Voice Interviewer",
    status: "In Progress",
    tags: ["Full-Stack", "Realtime", "Generative AI"],
    summary:
      "A web app that conducts live, spoken mock interviews using bidirectional voice streaming.",
    problem:
      "Practicing for technical interviews out loud, with real follow-up questions, is hard to do alone — text-based mock interviews miss timing, tone, and the pressure of a live conversation.",
    approach: [
      "Next.js 14 front end capturing microphone audio and streaming it over a native WebSocket connection.",
      "FastAPI backend brokering the session and relaying audio frames to the Gemini Live API for bidirectional voice.",
      "Custom reconnection logic to recover from dropped sockets mid-interview without losing conversation state.",
      "Typed session objects on both ends to keep the audio/event contract consistent across the socket boundary.",
    ],
    architecture:
      "Browser mic → WebSocket → FastAPI session broker → Gemini Live API (voice in/out) → WebSocket → browser playback, with a session-state store keeping track of turn history for reconnects.",
    challenges: [
      "A silent exception swallow in the FastAPI websocket handler was hiding malformed audio frames — traced with structured logging around every await boundary.",
      "Misconfigured typed API objects meant the client and server disagreed on event shape after a reconnect; fixed by sharing one schema definition.",
      "Reconnection logic initially dropped the last few seconds of audio — solved with a small client-side ring buffer replayed on reconnect.",
    ],
    links: [{ label: "Build spec", href: "#" }],
  },
  {
    slug: "yolo-food-detection-gym-coach",
    code: "EXP-003",
    title: "Food Detection + Gym Coaching Agent",
    status: "Shipped",
    tags: ["Computer Vision", "YOLO", "Agents"],
    summary:
      "A YOLO11-based food/non-food classifier feeding an AI recommendation agent that also coaches gym routines.",
    problem:
      "Generic nutrition apps require manual logging. A camera-first flow that recognizes food automatically removes the biggest source of drop-off: typing everything in by hand.",
    approach: [
      "Trained a YOLO11 image classification model on the food-not-food dataset in Google Colab.",
      "Built and evaluated ML classification models for food vs. non-food frame filtering before the heavier detection pass.",
      "Wired detections into a recommendation agent that suggests meals and adjustments.",
      "Added a gym-coaching component that reasons over logged food and activity to suggest routine changes.",
    ],
    architecture:
      "Camera frame → lightweight food/non-food classifier (pre-filter) → YOLO11 detector → recommendation agent → coaching suggestions surfaced back to the user.",
    challenges: [
      "Balancing the food-not-food dataset to avoid the classifier over-triggering on plain backgrounds.",
      "Keeping inference fast enough for a responsive camera pipeline on modest hardware.",
    ],
    links: [{ label: "Notebook", href: "#" }],
  },
  {
    slug: "interview-ai",
    code: "EXP-005",
    title: "Interview-AI",
    status: "Shipped",
    tags: ["Full-Stack", "Generative AI", "EdTech"],
    summary:
      "An AI-powered mock interview platform that generates role-specific questions, evaluates responses, and coaches users toward interview confidence.",
    problem:
      "Students and fresh graduates struggle to practice interviews realistically — generic question lists don't adapt to the role, and there's no feedback loop to improve communication under pressure.",
    approach: [
      "Generates realistic, role-specific interview questions tailored to the target job and seniority level.",
      "Evaluates user responses with intelligent feedback covering content, clarity, and confidence signals.",
      "Tracks session history so users can see improvement across practice rounds.",
      "Designed an interactive, low-friction UI focused on real-world interview simulation.",
    ],
    architecture:
      "Role/level input → question generation (LLM) → user response capture → evaluation pipeline (scoring + feedback) → session summary card.",
    challenges: [
      "Calibrating question difficulty to role seniority without over-prompting the model on every request.",
      "Keeping feedback actionable rather than generic — required iterative prompt refinement against real user responses.",
    ],
    links: [{ label: "Live demo", href: "#" }],
  },
  {
    slug: "grand-hilton-voice-agent",
    code: "EXP-006",
    title: "Grand Hilton Hotel Voice Agent",
    status: "Shipped",
    tags: ["Voice AI", "Agents", "Full-Stack"],
    summary:
      "A voice-based AI receptionist for hotel operations — handles bookings, cancellations, and room queries through natural speech.",
    problem:
      "Hotel front-desk calls are repetitive and high-volume. A voice agent that understands natural language and has live access to room inventory removes the bottleneck without sacrificing guest experience.",
    approach: [
      "STT/TTS pipeline for fully voice-driven guest interactions with no typing required.",
      "LLM backbone (Gemini / Groq) with function calling so the agent can query and mutate live hotel data mid-conversation.",
      "Real-time room availability checks, AI-assisted booking, and cancellation flows exposed as callable tools.",
      "Analytics dashboard surfacing occupancy trends, booking patterns, and agent interaction metrics.",
    ],
    architecture:
      "Guest speech → STT → LLM (function-calling enabled) → tool layer (availability / booking / cancellation) → TTS → guest, with a management dashboard reading the same data store.",
    challenges: [
      "Latency spikes between STT output and LLM response broke the natural conversation rhythm — mitigated with streaming responses and early TTS buffering.",
      "Function-calling schemas needed tight constraints to prevent the model from hallucinating room IDs that don't exist in the live inventory.",
    ],
    links: [{ label: "Live demo", href: "#" }],
  },
  {
    slug: "pet-mood-analyzer",
    code: "EXP-002",
    title: "Pet Mood Analysis Tool",
    status: "Experiment",
    tags: ["Computer Vision", "Prompt Design"],
    summary:
      "A vision-model tool that reads a photo of a pet and infers likely mood/state.",
    problem:
      "Pet owners often can't tell if a subtle behavior is normal or a sign something's off — a quick, photo-based second opinion helps them decide whether to look closer.",
    approach: [
      "Iterated on the vision prompt design to get consistent, well-calibrated mood readings from a single image.",
      "Redesigned the UI brief around a single upload-and-read flow instead of a multi-step form.",
    ],
    architecture:
      "Image upload → vision model prompt (mood + confidence + short rationale) → simple result card UI.",
    challenges: [
      "Early prompts over-committed to a single mood label; revised to return a ranked short-list with rationale instead.",
    ],
    links: [{ label: "UI brief", href: "#" }],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
