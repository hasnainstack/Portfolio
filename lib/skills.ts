export type SkillCategory = {
  name: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: "Web & WordPress",
    items: [
      "WordPress",
      "Custom WordPress Development",
      "Elementor",
      "Divi",
      "WooCommerce",
    ],
  },
  {
    name: "Backend & Languages",
    items: ["Backend Development", "Python", "C++"],
  },
  {
    name: "Computer Vision",
    items: [
      "YOLO11 (Detection, Segmentation, Classification)",
      "Roboflow (Annotation & Dataset QA)",
      "CV Model Training & Evaluation",
      "Data Cleaning & Preprocessing",
    ],
  },
  {
    name: "GenAI & Agents",
    items: ["LLMs", "RAG", "AI Agents", "LangChain", "Prompt Engineering"],
  },
  {
    name: "Data & Visualization",
    items: ["TensorFlow", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
  },
];
