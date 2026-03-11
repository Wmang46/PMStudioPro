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
    title: "Enterprise SaaS Platform Redesign",
    company: "Example Corp",
    role: "Senior Product Manager",
    timeline: "2023-2024",
    description: "Led discovery and delivery for a complete platform UX overhaul, working with cross-functional teams to reimagine the user experience.",
    outcomes: [
      "Increased user engagement by 45%",
      "Reduced onboarding time from 2 weeks to 3 days",
      "Generated $2M in new revenue"
    ],
    skills: ["User Research", "Roadmapping", "Stakeholder Alignment", "Agile"],
    technologies: ["React", "GraphQL", "Figma"]
  },
  // Additional projects can be added here
];
