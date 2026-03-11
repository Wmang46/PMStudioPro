export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Business Analysis & Product",
    skills: [
      "Business Analysis",
      "Product Management",
      "Product Ownership",
      "Requirements Analysis",
      "Backlog Prioritization",
      "Process Mapping"
    ]
  },
  {
    category: "Agile & Delivery",
    skills: [
      "Agile Scrum",
      "SAFe",
      "Kanban",
      "Sprint Planning",
      "Release Management",
      "UAT Facilitation"
    ]
  },
  {
    category: "Domain Expertise",
    skills: [
      "Retail Banking",
      "Contact Center Operations",
      "Fraud Prevention",
      "Core Systems Modernization",
      "IVR Systems",
      "Digital Platforms"
    ]
  },
  {
    category: "Technical Skills",
    skills: [
      "SQL",
      "API Integrations",
      "Azure DevOps",
      "AD/Azure AD",
      "Data Analysis",
      "KPI Tracking"
    ]
  },
  {
    category: "Stakeholder & Communication",
    skills: [
      "Stakeholder Management",
      "JAD Facilitation",
      "Cross-functional Leadership",
      "Executive Communication",
      "Gap Analysis",
      "Documentation"
    ]
  },
  {
    category: "Tools & Methods",
    skills: [
      "Azure DevOps",
      "Advanced Microsoft Office",
      "UML",
      "BPMN",
      "Agile Ceremonies",
      "Requirements Traceability"
    ]
  }
];
