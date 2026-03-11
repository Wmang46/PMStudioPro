export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Product Strategy",
    skills: [
      "Product Vision & Roadmapping",
      "Market Research & Analysis",
      "Competitive Analysis",
      "Feature Prioritization (RICE, MoSCoW)"
    ]
  },
  {
    category: "Stakeholder Management",
    skills: [
      "Cross-functional Leadership",
      "Executive Communication",
      "Conflict Resolution",
      "Expectation Management"
    ]
  },
  {
    category: "Execution",
    skills: [
      "Agile/Scrum",
      "User Story Writing",
      "Sprint Planning",
      "Release Management"
    ]
  },
  {
    category: "Technical",
    skills: [
      "API Design",
      "SQL",
      "Data Analysis",
      "A/B Testing"
    ]
  },
  {
    category: "Tools",
    skills: [
      "Jira", "Figma", "Amplitude", "Mixpanel", "Miro"
    ]
  }
];
