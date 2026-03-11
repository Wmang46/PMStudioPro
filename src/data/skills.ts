export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Product Strategy",
    skills: [
      "Product Vision & Roadmapping",
      "Product Ownership",
      "OKRs & KPIs",
      "Backlog Prioritization (RICE, MoSCoW)",
      "Build vs. Buy Decisions",
      "Go-to-Market Readiness"
    ]
  },
  {
    category: "Discovery & Delivery",
    skills: [
      "Product Discovery",
      "User Story Mapping",
      "Acceptance Criteria",
      "Sprint Planning & Retrospectives",
      "Release Management",
      "Launch Validation"
    ]
  },
  {
    category: "Agile & Frameworks",
    skills: [
      "Agile Scrum",
      "SAFe",
      "Kanban",
      "Cross-functional Team Leadership",
      "Agile Ceremonies",
      "Continuous Improvement"
    ]
  },
  {
    category: "Domain Expertise",
    skills: [
      "Retail Banking",
      "Contact Center / IVR",
      "Fraud Prevention",
      "Core Systems Modernization",
      "Digital Platforms",
      "Regulatory Compliance (PCI, SOX, AML)"
    ]
  },
  {
    category: "Technical Fluency",
    skills: [
      "SQL & Data Analysis",
      "API Strategy & Integration",
      "Platform Architecture Decisions",
      "Azure DevOps",
      "Data-driven Decision Making",
      "KPI Dashboards & Reporting"
    ]
  },
  {
    category: "Stakeholder Management",
    skills: [
      "Executive Communication",
      "Cross-functional Alignment",
      "Workshop Facilitation",
      "Vendor & Partner Management",
      "Conflict Resolution",
      "Change Management"
    ]
  }
];
