export type LiveSite = {
  name: string;
  url: string;
  category: string;
  note: string;
  confidence?: number;
};

export const liveSites: LiveSite[] = [
  {
    name: "Kurram Welfare Home",
    url: "https://kwh.org.pk/",
    category: "Nonprofit",
    note: "Donor-facing site for a community welfare organization.",
    confidence: 98.4,
  },
  {
    name: "ReadPakistan",
    url: "https://readpakistan.org.pk/",
    category: "Literacy & Education",
    note: "Knowledge-sharing platform promoting reading culture.",
    confidence: 97.6,
  },
  {
    name: "Securage Security",
    url: "https://secureagesecurity.co.uk",
    category: "Security Services",
    note: "UK manned-guarding and alarm-response company site.",
    confidence: 99.1,
  },
  {
    name: "Future Serve Consultants",
    url: "https://fsoes.com/",
    category: "Consulting",
    note: "Service showcase and lead-gen site with CMS-managed pages.",
    confidence: 97.9,
  },
  {
    name: "Alliance of Excellence",
    url: "https://allianceofe.com/",
    category: "NGO",
    note: "WooCommerce-enabled NGO site with donor and program pages.",
    confidence: 98.7,
  },
];

export type GenAiApp = {
  name: string;
  url: string;
  category: string;
  note: string;
  confidence?: number;
};

export const genAiApps: GenAiApp[] = [
  {
    name: "University Recommender",
    url: "https://universitychatbot.streamlit.app/",
    category: "GenAI",
    note: "Compares universities using sentiment analysis on real student reviews.",
    confidence: 98.2,
  },
  {
    name: "Product Reviewer (Shop Sense)",
    url: "https://shopsense.streamlit.app/",
    category: "GenAI",
    note: "Generates Pros/Cons and a buy verdict for product pages via RAG.",
    confidence: 97.4,
  },
  {
    name: "Interview-AI",
    url: "https://github.com/proghassnain/Interview-Ai",
    category: "GenAI",
    note: "AI-powered mock interview platform with role-specific questions.",
    confidence: 99.0,
  },
  {
    name: "Grand Hilton Hotel Voice Agent",
    url: "https://github.com/proghassnain/call-agent",
    category: "Voice Agent",
    note: "Voice receptionist with STT/TTS, live booking, and analytics.",
    confidence: 97.8,
  },
];
