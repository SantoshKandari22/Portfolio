import type {
  Profile,
  BoxModelStat,
  ExperienceItem,
  Project,
  Dependencies,
  NavTab,
} from "@/types";

export const PROFILE: Profile = {
  name: "Santosh Kandari",
  role: "Frontend Developer",
  stack: ["React", "Next.js", "TypeScript"],
  location: "Dehradun, Uttarakhand, IN",
  email: "kandarisantosh3@gmail.com",
  phone: "9520320036",
  summary:
    "Frontend developer with ~2 years building responsive, SEO-optimized web applications with React, Next.js and TypeScript. I turn API contracts and design specs into fast, maintainable interfaces \u2014 dashboards, listing platforms, and conversion-focused landing pages.",
};

export const BOX_MODEL_STATS: BoxModelStat[] = [
  { label: "content", value: "Frontend Dev", sub: "current role" },
  { label: "padding", value: "~2 yrs", sub: "professional experience" },
  { label: "border", value: "Dehradun, IN", sub: "based in" },
  { label: "margin", value: "MCA \u00b7 2026", sub: "in progress" },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Career Buddy Club",
    role: "Frontend Developer",
    period: "2024 \u2014 Present",
    file: "career-buddy-club.tsx",
    lines: [
      "Built dynamic dashboards and website modules with Next.js + TypeScript, improving platform scalability and maintainability.",
      "Shipped SEO-friendly dynamic routing for college and course listing pages, growing organic search visibility.",
      "Integrated REST APIs for student dashboards \u2014 skills tracking, performance scores, analytics visualization.",
      "Optimized performance with WebP images and dead-code removal, cutting page load time.",
      "Built responsive UI components with Tailwind CSS and Material UI, raising user engagement.",
    ],
  },
  {
    company: "Brillica Services",
    role: "MERN Stack Intern",
    period: "Prior to 2024",
    file: "brillica-internship.tsx",
    lines: [
      "Built full-stack web applications on the MERN stack (MongoDB, Express, React, Node.js).",
      "Built responsive, accessible UI components and integrated REST APIs end-to-end.",
      "Collaborated cross-functionally with developers and designers to ship new features.",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    name: "College Finder Platform",
    desc: "Dynamic, stream-based college listing platform with SEO-optimized URLs and a reusable MUI component library.",
    stack: ["Next.js", "TypeScript", "Material UI"],
    url: "https://careerbuddyclub.com",
    status: "200",
    statusLabel: "OK",
    method: "GET",
  },
  {
    name: "BFIT Dehradun Admission Landing",
    desc: "Conversion-focused admission landing page, fully responsive with a modern lead-gen layout.",
    stack: ["PHP", "Tailwind CSS"],
    url: "https://admission.bfit.edu.in",
    status: "200",
    statusLabel: "OK",
    method: "GET",
  },
  {
    name: "World of Inanna",
    desc: "Responsive marketing site with an optimized frontend structure and improved page-speed metrics.",
    stack: ["PHP", "HTML5", "Bootstrap", "MySQL", "Razorpay"],
    url: "https://worldofinanna.org",
    status: "200",
    statusLabel: "OK",
    method: "GET",
  },
  {
    name: "Digital Bazaar",
    desc: "Full-stack e-commerce platform \u2014 product listing, cart, and authentication, in an intuitive MERN UX.",
    stack: ["MongoDB", "Express", "React", "Node"],
    url: null,
    status: "304",
    statusLabel: "local build",
    method: "GET",
  },
  {
    name: "School Dashboard System",
    desc: "Admin dashboard for student data, exam results and applications \u2014 filtering, class management, data viz.",
    stack: ["React", "TypeScript"],
    url: null,
    status: "304",
    statusLabel: "local build",
    method: "GET",
  },
];

export const DEPENDENCIES: Dependencies = {
  dependencies: [
    ["react", "^18.x"],
    ["next", "^14.x"],
    ["typescript", "^5.x"],
    ["tailwindcss", "^3.x"],
    ["@mui/material", "^5.x"],
    ["php", "^8.x"],
  ],
  devDependencies: [
    ["git", "latest"],
    ["vscode", "latest"],
    ["xampp", "latest"],
    ["github", "latest"],
  ],
  competencies: [
    "SEO Optimization",
    "Responsive Web Design",
    "REST API Integration",
    "Performance Optimization",
    "Dynamic Routing",
    "Reusable Component Design",
  ],
};

export const TABS: NavTab[] = [
  { id: "elements", label: "Elements" },
  { id: "sources", label: "Sources" },
  { id: "network", label: "Network" },
  { id: "console", label: "Console" },
];

export const EDUCATION = [
  { degree: "Master of Computer Applications (MCA)", period: "2024 \u2014 2026" },
  { degree: "Bachelor of Computer Applications (BCA)", period: "2021 \u2014 2024" },
];
