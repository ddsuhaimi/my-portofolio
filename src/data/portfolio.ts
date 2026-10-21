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
    "I’m Dedi, a software engineer turning complex requirements into clear interfaces and dependable systems.",
  description:
    "Dedi Suhaimi is a software engineer in Indonesia building thoughtful interfaces and dependable systems. Explore JagoASN, Chrommandr, and SimRS.",
  approach:
    "I like the work between the interface and the system: understanding the workflow, making the moving parts fit, and refining the details that people use every day.",
  background:
    "My background in computational mathematics shapes how I approach engineering. I break a problem into smaller parts, question the assumptions, and look for a solution that stays understandable as it grows.",
  education: {
    degree: "Bachelor of Mathematics",
    institution: "Syiah Kuala University",
    date: "November 2020",
    focus: "Computational Mathematics",
  },
  sourceNote:
    "Career dates and descriptions reflect the supplied résumé. “Present” is the résumé’s wording.",
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
    title: "Interfaces & interaction",
    description:
      "Clear, responsive interfaces built around the way people actually work.",
    tools: ["TypeScript", "React", "Vue", "Next.js", "Nuxt", "HTML & CSS"],
  },
  {
    title: "Services & data",
    description:
      "Application logic, APIs, and data models that make the interface dependable.",
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
    title: "Delivery & reliability",
    description:
      "From build configuration to production debugging, with performance in mind.",
    tools: ["Docker", "AWS", "Jenkins", "Webpack", "Vite", "Git"],
  },
];
