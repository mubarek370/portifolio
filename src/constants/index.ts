// Contains constant data for using in website
// ! Don't remove anything from here if not sure

import {
  mobile,
  backend,
  threed,
  database,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  threejs,
  project1,
  project2,
  project3,
  project4,
  project5,
  project6,
  user1,
  user2,
  user3,
  youtube,
  linkedin,
  twitter,
  github,
} from "../assets";

// Navbar Links
export const NAV_LINKS = [
  {
    id: "about",
    title: "About",
    link: null,
  },
  {
    id: "work",
    title: "Work",
    link: null,
  },
  {
    id: "contact",
    title: "Contact",
    link: null,
  },
  {
    id: "source-code",
    title: "Source Code",
    link: "https://github.com/mubarek370",
  },
] as const;

// Services
export const SERVICES = [
  {
    title: "3D & Interactive Web Developer",
    icon: threed,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Database Architect",
    icon: database,
  },
] as const;

// Technologies
export const TECHNOLOGIES = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
] as const;

// Experiences
export const EXPERIENCES = [
  {
    title: "Frontend Developer",
    company_name: "Web & UI Architecture",
    iconBg: "#915eff",
    date: "2022 - 2023",
    milestone: "01",
    points: [
      "Mastered modern JavaScript (ES6+), TypeScript, and component-driven web architectures.",
      "Built interactive, responsive client applications using React, Vite, and Tailwind CSS.",
      "Implemented mobile-first layouts, accessible UI patterns, and optimized cross-browser performance.",
      "Integrated third-party APIs and streamlined frontend state management for seamless user interactions.",
    ],
  },
  {
    title: "Full-Stack & Backend Developer",
    company_name: "Systems & API Engineering",
    iconBg: "#00cea8",
    date: "2023 - 2024",
    milestone: "02",
    points: [
      "Expanded into backend systems engineering with Python, Django, REST Framework, and PostgreSQL.",
      "Architected relational database schemas, role-based access control (RBAC), and authentication flows.",
      "Implemented asynchronous task queues, email automation pipelines, and multi-currency payment gateways (Stripe & Chapa).",
      "Built production-ready server-rendered and API-first architectures focusing on security, performance, and data integrity.",
    ],
  },
  {
    title: "Software Engineer & 3D Web Architect",
    company_name: "Production Applications & Cloud",
    iconBg: "#804dee",
    date: "2024 - Present",
    milestone: "03",
    points: [
      "Developing end-to-end full-stack applications such as PulseTrack, Smart Library, and Study Planner.",
      "Creating immersive 3D graphics and WebGL experiences using Three.js, React Three Fiber, and Framer Motion.",
      "Leveraging cloud databases (Supabase, PostgreSQL) and deploying scalable production apps to Vercel and Render.",
      "Focusing on performance optimization, code splitting, and delivering exceptional developer and user experiences.",
    ],
  },
] as const;

// Testimonials
export const TESTIMONIALS = [
  {
    testimonial:
      "PulseTrack is intuitive, responsive, and incredibly fast. The Supabase integration and habit streak visualizations helped me stay disciplined with my daily workouts. Mubarek’s attention to UI details is outstanding.",
    name: "Yohannes Haile",
    designation: "Product Designer",
    company: "PulseTrack Early User",
    image: user1,
  },
  {
    testimonial:
      "Smart Library solved real inventory challenges for our student community. The role-based permissions, automated book loan tracking, and seamless Chapa payment integration made administration effortless.",
    name: "Rahel Desta",
    designation: "Systems Coordinator",
    company: "Smart Library Community",
    image: user2,
  },
  {
    testimonial:
      "Study Planner made organizing exam schedules and weekly coursework visual and stress-free. Dragging priority cards in the browser works smoothly, and the performance on mobile is top-notch.",
    name: "Robel Abebe",
    designation: "Software Engineer",
    company: "Study Planner Beta Tester",
    image: user3,
  },
] as const;

// Projects
export const PROJECTS = [
  {
    name: "PulseTrack",
    description:
      "A modern, full-stack fitness and habit tracking web application featuring secure Supabase authentication, streak tracking, workout logging, customizable routines, and PostgreSQL Row-Level Security (RLS).",
    tags: [
      {
        name: "react19",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "postgresql",
        color: "pink-text-gradient",
      },
      {
        name: "tailwindcss",
        color: "blue-text-gradient",
      },
    ],
    image: project1,
    source_code_link: "https://github.com/mubarek370/pulsetrack",
    live_site_link: "https://pulsetrack-brown.vercel.app/",
  },
  {
    name: "Smart Library System",
    description:
      "Comprehensive role-based library management platform for Students, Librarians, and Admins. Supports book borrowing workflows, overdue fine payments via Stripe & Chapa, automated Celery notifications, and REST APIs.",
    tags: [
      {
        name: "django6",
        color: "green-text-gradient",
      },
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "postgresql",
        color: "pink-text-gradient",
      },
      {
        name: "bootstrap5",
        color: "blue-text-gradient",
      },
    ],
    image: project2,
    source_code_link: "https://github.com/mubarek370/smart-library",
    live_site_link: "https://smart-library-ersf.onrender.com",
  },
  {
    name: "Study Planner",
    description:
      "An interactive study planner app that lives entirely in your browser, letting you map sessions across the week, drag cards when priorities shift, and visualize preparation time allocation.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "vite",
        color: "green-text-gradient",
      },
      {
        name: "tailwindcss",
        color: "pink-text-gradient",
      },
    ],
    image: project3,
    source_code_link: "https://github.com/mubarek370",
    live_site_link: "https://study-planner-two-fawn.vercel.app/",
  },
] as const;

export const SOCIALS = [
  {
    name: "YouTube",
    icon: youtube,
    link: "https://www.youtube.com",
  },
  {
    name: "Linkedin",
    icon: linkedin,
    link: "https://www.linkedin.com",
  },
  {
    name: "Twitter",
    icon: twitter,
    link: "https://x.com",
  },
  {
    name: "GitHub",
    icon: github,
    link: "https://github.com/mubarek370",
  },
] as const;
