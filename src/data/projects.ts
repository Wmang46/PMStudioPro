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
    title: "Digital Banking Product Portfolio",
    company: "Woodforest National Bank",
    role: "Senior Business Analyst (Product Manager responsibilities)",
    timeline: "Mar 2018 – Oct 2025",
    description: "Owned product roadmap and backlog prioritization across six banking products spanning IVR, fraud prevention, and digital channels. Drove discovery, defined OKRs, and led cross-functional delivery from ideation through launch.",
    outcomes: [
      "Reduced operating costs by 35% by defining the product vision for an IVR modernization that eliminated 2M+ monthly agent calls",
      "Cut risk exposure by 60% by prioritizing fraud-prevention features on the roadmap, reducing fraud/error rates by 75%",
      "Increased team velocity by 25% by establishing sprint rituals, refining the backlog, and clarifying product ownership across six products",
      "Reduced defect escape rate by 50% by tightening acceptance criteria and driving a quality-first definition of done",
      "Shortened time-to-market by 30% by streamlining the delivery pipeline and removing blockers for a team of 5",
      "Maintained 100% PCI compliance while guiding Open Banking API integration strategy and platform architecture decisions"
    ],
    skills: ["Product Roadmapping", "Backlog Prioritization", "OKRs & KPIs", "Stakeholder Alignment"],
    technologies: ["Azure DevOps", "IVR Platform", "Open Banking APIs", "SQL"]
  },
  {
    title: "Core Platform Migration & New Product Launch",
    company: "Woodforest National Bank",
    role: "Senior Business Analyst / Product Owner",
    timeline: "May 2007 – Mar 2018",
    description: "Led product strategy for an end-to-end FIS core banking migration and owned the vision, design, and launch of a new Customer Information System, a greenfield product that replaced expensive core licensing with a lightweight, purpose-built solution for 500+ daily branch users.",
    outcomes: [
      "Shipped a zero-to-one product (CIS) that improved transaction processing time by 33% and eliminated core licensing dependency",
      "Migrated 500K+ accounts with 99.9% data accuracy by defining acceptance criteria and orchestrating cross-functional delivery",
      "Avoided $35K in recurring costs by making a build-vs-buy decision to retire an internal Foreign Deposit platform",
      "Accelerated stakeholder alignment by 45% through structured discovery workshops and standardized product artifacts",
      "Reduced defects by 20% by translating product vision into clear user stories, use cases, and testable acceptance criteria",
      "Improved release predictability by owning backlog refinement, sprint planning, and go/no-go launch decisions"
    ],
    skills: ["Product Strategy", "0-to-1 Product Launch", "Build vs. Buy", "User Story Mapping"],
    technologies: ["FIS Core Banking", "SQL", "CIS Platform"]
  },
  {
    title: "Airline Catering Platform Redesign",
    company: "Saggezza",
    role: "Business Analyst / Product Consultant",
    timeline: "May 2006 – Sep 2006",
    description: "Drove product discovery and redesign for an airline catering platform, identifying high-impact workflow optimizations and aligning cross-functional stakeholders around a prioritized delivery roadmap.",
    outcomes: [
      "Increased operational efficiency by 38% by redesigning end-to-end product workflows",
      "Identified $1.2M in cost savings through opportunity mapping and redundancy elimination",
      "Delivered 5 months ahead of schedule by maintaining ruthless scope discipline and fast decision cycles",
      "Reduced handoff friction by 10% by streamlining the product delivery pipeline between business and engineering",
      "Cut rework by 24% by facilitating cross-functional alignment workshops with 11 stakeholders"
    ],
    skills: ["Product Discovery", "Workflow Optimization", "Scope Management", "Cross-functional Leadership"],
    technologies: []
  },
  {
    title: "7-Eleven Mobile Ordering Product",
    company: "NEC Display Solutions of America",
    role: "Business Analyst / Product Lead",
    timeline: "Sep 2004 – May 2006",
    description: "Sole product lead on a competitive-bid engagement to define, design, and deliver a manager-facing mobile product for 7-Eleven, enabling real-time inventory visibility, sales velocity analysis, and data-driven purchasing decisions on the sales floor.",
    outcomes: [
      "Drove 26% profit increase through new supply chain workflows and data-driven ordering features",
      "Achieved 45% user adoption by defining intuitive UX patterns, onboarding flows, and training materials",
      "Improved release quality by 31% by owning acceptance criteria, user validation, and go-to-market readiness",
      "Won the competitive bid by translating 7-Eleven's strategic vision into a compelling, technically grounded product proposal",
      "Delivered on time and $1.2M under budget while managing scope evolution across NEC, Microsoft, and 7-Eleven stakeholders"
    ],
    skills: ["Product Vision", "UX Strategy", "Competitive Positioning", "Multi-vendor Coordination"],
    technologies: ["Microsoft Analytics", "Mobile Platform", "POS Integration"]
  }
];
