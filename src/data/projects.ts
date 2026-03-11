export interface Project {
  title: string;
  company: string;
  role: string;
  timeline: string;
  description: string;
  outcomes: string[];
  skills: string[];
  technologies?: string[];
}

export const projects: Project[] = [
  {
    title: "Digital Channels & Agile Delivery",
    company: "Woodforest National Bank",
    role: "Senior Business Analyst",
    timeline: "Mar 2018 – Oct 2025",
    description: "Led discovery, requirements, and Agile delivery across six banking applications including IVR modernization, fraud-prevention workflows, and digital channel improvements.",
    outcomes: [
      "Reduced operating costs by 35% by leading IVR redesign that eliminated 2M+ monthly agent calls",
      "Lowered refund and risk exposure by 60% through fraud-prevention workflow enhancements, reducing fraud/error rates by 75%",
      "Improved delivery velocity by 25% across six applications using Azure DevOps and refined Agile ceremonies",
      "Cut development-related defects by 50% by tightening acceptance criteria and strengthening sprint planning",
      "Shortened time-to-market by 30% by clarifying ownership and streamlining delivery across a team of 5",
      "Strengthened security posture by 30% guiding Open Banking API integrations, maintaining 100% PCI compliance"
    ],
    skills: ["Agile Scrum", "Backlog Prioritization", "Stakeholder Management", "KPI Tracking"],
    technologies: ["Azure DevOps", "IVR Systems", "API Integrations", "SQL"]
  },
  {
    title: "Core Banking Migration & Platform Rationalization",
    company: "Woodforest National Bank",
    role: "Senior Business Analyst",
    timeline: "May 2007 – Mar 2018",
    description: "Led end-to-end FIS core-banking migration and designed a Customer Information System from the ground up, enabling branch staff to perform account inquiries without relying on expensive core licenses.",
    outcomes: [
      "Migrated 500K+ accounts with 99.9% data accuracy across Customer Information System, Refunds, IVR, and Branch Services",
      "Avoided $35K in recurring costs by retiring an internal Foreign Deposit solution",
      "Improved transaction processing time by 33% with a new Customer Information System",
      "Accelerated stakeholder sign-off by 45% through improved gap analysis and standardized documentation",
      "Decreased defects by 20% by translating business needs into enterprise requirements, use cases, and UML artifacts",
      "Increased delivery predictability by owning backlog refinement and coordinating UAT across business and technical partners"
    ],
    skills: ["Requirements Analysis", "Process Mapping", "Data Validation", "UAT"],
    technologies: ["FIS Core Banking", "SQL", "UML", "CIS"]
  },
  {
    title: "Airline Catering Platform Reengineering",
    company: "Saggezza",
    role: "Business Analyst",
    timeline: "May 2006 – Sep 2006",
    description: "Reengineered an airline catering platform by redesigning workflows to align with logistics constraints, food safety requirements, and cost reduction goals.",
    outcomes: [
      "Increased operational efficiency by 38% through workflow redesign",
      "Reduced project costs by $1.2M by identifying redundancies and process gaps",
      "Finished 5 months ahead of schedule through scope control and rapid stakeholder decisions",
      "Reduced cycle time by 10% by streamlining handoffs between business teams and engineering",
      "Reduced misinterpretation and rework by 24% by facilitating JAD workshops with 11 stakeholders"
    ],
    skills: ["Process Reengineering", "JAD Facilitation", "Scope Control", "Stakeholder Alignment"],
    technologies: []
  },
  {
    title: "7-Eleven Mobile Ordering Terminal",
    company: "NEC Display Solutions of America",
    role: "Business Analyst",
    timeline: "Sep 2004 – May 2006",
    description: "Authored requirements and designed UI for a manager-facing mobile ordering terminal enabling real-time inventory visibility, sales velocity analysis, and data-driven purchase recommendations for 7-Eleven stores.",
    outcomes: [
      "Increased profit by 26% through new supply chain logic and ordering workflows",
      "Increased stakeholder adoption by 45% with clear documentation and training materials",
      "Improved release readiness and quality outcomes by 31% through validated requirements and acceptance criteria",
      "Ensured SOX compliance with structured validation steps and audit-ready documentation",
      "Won competitive bid due to strength and clarity of proposal; finished on time and $1.2M under budget"
    ],
    skills: ["Requirements Elicitation", "UI/UX Design", "Prototyping", "Vendor Management"],
    technologies: ["Microsoft Analytics", "Mobile Platform", "POS Integration"]
  }
];
