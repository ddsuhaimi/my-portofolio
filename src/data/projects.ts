export type ProjectHighlight = {
  title: string;
  text: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  category: string;
  year: string;
  link?: string;
  linkLabel?: string;
  role: string;
  intro?: string;
  highlights?: ProjectHighlight[];
  closing?: string;
};

export const projects: Project[] = [
  {
    slug: "jagoasn",
    role: "Full-stack development",
    title: "JagoASN",
    summary:
      "An exam preparation site where Indonesian civil service candidates take practice tests, track their results and subscribe to study plans.",
    tags: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Docker"],
    category: "SaaS product",
    year: "Jul 2024",
    link: "https://jagoasn.com",
    linkLabel: "Visit site",
    intro:
      "JagoASN helps people prepare for Indonesian civil service exams with practice tests and performance reports. Candidates can subscribe to a plan and pay through the site.",
    highlights: [
      {
        title: "Subscription plans",
        text: "Candidates choose a subscription plan to access its content and features.",
      },
      {
        title: "Payment integration",
        text: "Candidates pay for subscriptions through the site and manage them from their accounts.",
      },
      {
        title: "Practice tests",
        text: "Practice tests and quizzes let candidates check what they know and track their progress.",
      },
      {
        title: "Performance analytics",
        text: "Results and performance reports show candidates where they need more practice.",
      },
    ],
    closing:
      "JagoASN uses Next.js and Node.js with PostgreSQL, TypeScript and Docker.",
  },
  {
    slug: "chrommandr",
    role: "Browser extension development",
    title: "Chrommandr",
    summary:
      "A browser extension for opening tabs, navigating to URLs and managing bookmarks from a command palette, with support for custom scripts.",
    tags: ["Browser API", "TypeScript"],
    category: "Browser extension",
    year: "Jul 2024",
    link: "https://github.com/ddsuhaimi/chrommandr",
    linkLabel: "View repository",
    intro:
      "Chrommandr puts browser actions in a command palette opened with a keyboard shortcut. It supports tabs, URL navigation and bookmarks, and lets users add commands with their own scripts.",
    highlights: [
      {
        title: "Command palette",
        text: "Open the command palette with a keyboard shortcut.",
      },
      {
        title: "Browser API integration",
        text: "Uses the Browser API to open tabs, navigate to URLs and manage bookmarks.",
      },
      {
        title: "Customization",
        text: "Users can edit commands and add their own scripts.",
      },
      {
        title: "Built with TypeScript",
        text: "The extension is written in TypeScript.",
      },
    ],
  },
  {
    slug: "simrs",
    role: "Full-stack development",
    title: "SimRS",
    summary:
      "Hospital management software for patient registration, medical records and clinical workflows, with lab, radiology, pharmacy, billing and reporting tools.",
    tags: ["TypeScript", "React", "Node.js", "Material UI"],
    category: "Enterprise system",
    year: "Feb 2024",
    intro:
      "SIMRS stands for Sistem Informasi Manajemen Rumah Sakit. The web application connects patient registration and clinical records with the operational tools a hospital uses.",
    highlights: [
      {
        title: "Patient registry & EMR",
        text: "Full patient profiles, automated medical-record numbers, visit history, and demographics with Indonesian address hierarchies.",
      },
      {
        title: "Registration & queueing",
        text: "Patient registration, appointment scheduling, automatic queue numbers, and polyclinic and doctor selection.",
      },
      {
        title: "Clinical workflows",
        text: "Doctor schedules, consultation records, diagnoses (ICD), prescriptions, and in-visit clinical notes.",
      },
      {
        title: "Lab & radiology",
        text: "Order management, tracking results, and result publishing.",
      },
      {
        title: "Pharmacy & inventory",
        text: "Medication dispensing, inventory control, and prescription fulfillment.",
      },
      {
        title: "Inpatient & ward management",
        text: "Bed and ward tracking alongside inpatient monitoring.",
      },
      {
        title: "Billing & cashier",
        text: "Billing, payment processing, insurance (BPJS and private) tracking, invoices, and financial reports.",
      },
      {
        title: "Administration & security",
        text: "Role-based access control, audit trails, master-data management, and protected routes.",
      },
      {
        title: "Reporting & analytics",
        text: "Patient statistics, financial and operational reports, exports to PDF/Excel, and chart visualizations.",
      },
    ],
    closing:
      "Tech stack: React 18, Vite, Material UI, Node.js, TypeScript, MSW (mocking), Recharts, jsPDF/AutoTable, React Router, React Hook Form, Axios, date-fns/dayjs, Yup, and Docker-ready deployment.",
  },
];
