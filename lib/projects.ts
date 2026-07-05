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
