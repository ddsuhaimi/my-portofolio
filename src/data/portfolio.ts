export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
  arrangement?: string;
};
export type Expertise = { title: string; description: string; tools: string[] };
export const profile = {
  name: "Dedi Suhaimi",
  title: "Software Engineer",
  location: "Indonesia",
  email: "dedisuhaimiacc@gmail.com",
  github: "https://github.com/ddsuhaimi",
  linkedin: "https://www.linkedin.com/in/dedi-suhaimi/",
  resume: "/Dedi-Suhaimi-Resume.pdf",
  introduction:
    "I'm Dedi, a software engineer in Indonesia. I work on both the interface and the code behind each product.",
  description:
    "Dedi Suhaimi's software projects include an exam preparation site, a browser tool and hospital management software.",
  approach:
    "I start by understanding what people need to do, then work through the interface and the backend that supports it.",
  background:
    "I studied computational mathematics at Syiah Kuala University. I tend to break a problem into smaller parts before deciding how to build it.",
  education: {
    degree: "Bachelor of Mathematics",
    institution: "Syiah Kuala University",
    date: "November 2020",
    focus: "Computational Mathematics",
  },
  sourceNote:
    "Employment dates are as listed in my résumé.",
} as const;
export const experience: Experience[] = [
  {
    company: "HMI Medical Group",
    role: "Full Stack Software Engineer",
    period: "Jul 2021 — Present",
    arrangement: "Remote",
    description:
      "Led development of three microservices with a team of two engineers. Built frontend and backend features, improved application and API performance, and resolved production issues alongside QA, product, and helpdesk teams.",
  },
  {
    company: "Formulatrix Indonesia",
    role: "Software Engineer",
    period: "Nov 2020 — Jul 2021",
    description:
      "Developed product interfaces and contributed to a shared design system and UI component library. Worked with QA, product, design, and helpdesk teams to improve stability and usability.",
  },
  {
    company: "MIM System",
    role: "Software Engineer",
    period: "May 2020 — Jun 2020",
    arrangement: "Remote",
    description:
      "Built features for a company management web application, maintained a consistent codebase, and migrated the application to a new template.",
  },
];
export const expertise: Expertise[] = [
  {
    title: "Frontend",
    description:
      "Web interfaces with React and Vue, written in TypeScript.",
    tools: ["TypeScript", "React", "Vue", "Next.js", "Nuxt", "HTML & CSS"],
  },
  {
    title: "Backend",
    description:
      "APIs and database-backed applications with Node.js.",
    tools: [
      "Node.js",
      "NestJS",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "RabbitMQ",
    ],
  },
  {
    title: "Builds & deployments",
    description:
      "Build configuration, deployments and production troubleshooting.",
    tools: ["Docker", "AWS", "Jenkins", "Webpack", "Vite", "Git"],
  },
];
