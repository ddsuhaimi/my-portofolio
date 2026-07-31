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
	image?: string;
	screenshots?: string[];
	intro?: string;
	highlights?: ProjectHighlight[];
	closing?: string;
};

export const projects: Project[] = [
	{
		slug: "jagoasn",
		title: "JagoASN",
		summary:
			"Online test-prep portal for Indonesian civil service exam candidates, with subscription plans, secure payments, practice tests, and performance analytics.",
		tags: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Docker"],
		category: "SaaS product",
		year: "Jul 2024",
		link: "https://jagoasn.com",
		linkLabel: "Visit site",
		image: "/jagoasn-screenshot.jpg",
		screenshots: ["/jagoasn-1.jpg", "/jagoasn-2.jpg", "/jagoasn-3.jpg", "/jagoasn-4.jpg"],
		intro:
			"JagoASN.com is an online test web portal specifically designed for individuals preparing for civil service exams. The platform offers a variety of features to assist users in their study and exam preparation process.",
		highlights: [
			{
				title: "Subscription plans",
				text: "Users can choose from different subscription plans that provide access to various levels of content and features.",
			},
			{
				title: "Payment integration",
				text: "The platform supports secure payment methods, allowing users to easily subscribe and manage their accounts.",
			},
			{
				title: "Practice tests",
				text: "A wide range of practice tests and quizzes are available to help users gauge their knowledge and track their progress.",
			},
			{
				title: "Performance analytics",
				text: "Detailed analytics and performance reports help users understand their strengths and areas for improvement.",
			},
			{
				title: "User-friendly interface",
				text: "The portal is designed with a user-friendly interface to ensure a seamless and intuitive user experience.",
			},
		],
		closing:
			"By leveraging technologies like Docker, Next.js, Node.js, PostgreSQL, and TypeScript, JagoASN.com provides a robust and scalable platform for its users.",
	},
	{
		slug: "chrommandr",
		title: "Chrommandr",
		summary:
			"Browser extension that adds a universal command palette for opening tabs, navigating URLs, and managing bookmarks, with custom, user-scriptable commands.",
		tags: ["Browser API", "TypeScript"],
		category: "Browser extension",
		year: "Jul 2024",
		link: "https://github.com/ddsuhaimi/chrommandr",
		linkLabel: "View repository",
		image: "/chrommandr-screenshot.jpg",
		screenshots: ["/chrommandr-1.jpg"],
		intro:
			"Chrommandr is a browser extension designed to enhance productivity by providing a command palette interface within the browser. It allows users to perform a variety of actions quickly and efficiently without needing to navigate through menus or remember complex keyboard shortcuts.",
		highlights: [
			{
				title: "Command palette",
				text: "A universal command interface that can be summoned with a keyboard shortcut.",
			},
			{
				title: "Browser API integration",
				text: "Utilizes the Browser API to perform actions such as opening tabs, navigating to URLs, and managing bookmarks.",
			},
			{
				title: "Customization",
				text: "Users can customize commands and add their own scripts to extend the functionality.",
			},
			{
				title: "Built with TypeScript",
				text: "The project is developed using TypeScript, ensuring type safety and improved code quality.",
			},
		],
	},
	{
		slug: "simrs",
		title: "SimRS",
		summary:
			"Full hospital management system covering patient registration, EMR, clinical workflows, lab and radiology, pharmacy, billing, and reporting.",
		tags: ["TypeScript", "React", "Node.js", "Material UI"],
		category: "Enterprise system",
		year: "Feb 2024",
		image: "/simrs-screenshot.jpg",
		screenshots: ["/simrs-1.jpg", "/simrs-screenshot.jpg", "/simrs-2.jpg"],
		intro:
			"SIMRS (Sistem Informasi Manajemen Rumah Sakit) is a web-based hospital management portal that centralizes patient care, clinical workflows, and hospital operations into a single, scalable platform.",
		highlights: [
			{
				title: "Patient registry & EMR",
				text: "Full patient profiles, automated medical-record numbers, visit history, and demographics with Indonesian address hierarchies.",
			},
			{
				title: "Registration & queueing",
				text: "Streamlined patient registration, appointment scheduling, automatic queue-numbering, and polyclinic/doctor selection.",
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
