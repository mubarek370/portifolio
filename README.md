# Mubarek Ali — 3D Interactive Portfolio

[![GitHub license](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.3-61dafb?logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.186-black?logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff?logo=vite)](https://vitejs.dev/)

An immersive, high-performance personal developer portfolio engineered with **React 19**, **Three.js**, **React Three Fiber**, and **Tailwind CSS v4**. Features interactive 3D scene graphs, custom particle systems, smooth physics tilt interactions, real-world case studies, and a serverless contact dispatch pipeline protected by Google reCAPTCHA v3.

---

## 🌟 Key Features

- **Immersive 3D Graphics:** Real-time 3D desktop workstation canvas, animated floating stars particle backdrop, and an interactive holographic satisfaction emblem using Three.js & `@react-three/fiber`.
- **Dynamic Typewriter Presentation:** Hero section showcasing core specializations across Full-Stack Development, React/Next.js, and Database Architecture.
- **Production Case Studies:** Real applications including:
  - **PulseTrack:** Full-featured health & daily activity tracking suite.
  - **Smart Library System:** Comprehensive digital library & book reservation architecture.
  - **Study Planner:** Intelligent study scheduling and milestone manager.
- **Career Timeline:** Clean neon-indexed milestones spanning full-stack, UI architecture, and API systems.
- **Serverless Contact Pipeline:** Built with **Netlify Functions** and the **Resend API**, delivering inquiries directly to email with **Google reCAPTCHA v3** bot verification.
- **Responsive & Accessible:** Fluid scaling across ultra-wide monitors, laptops, tablets, and mobile viewports with lightweight chunk splitting.

---

## 🛠️ Tech Stack

- **Frontend Core:** React 19, TypeScript, Vite
- **3D & Animation:** Three.js, `@react-three/fiber`, `@react-three/drei`, Framer Motion, Maath
- **Styling:** Tailwind CSS v4, Lucide Icons, Tilt
- **Backend & Serverless:** Netlify Functions (TypeScript), Resend SDK
- **Security & Validation:** Google reCAPTCHA v3, client/server input sanitization

---

## 📁 Project Structure

```bash
muba-portifolio/
  ├── netlify/
  │   └── functions/          # Serverless contact endpoint (contact.ts)
  ├── public/                 # Static assets, 3D glTF models & icons
  ├── src/
  │   ├── assets/             # Project screenshots, tech icons & avatars
  │   ├── components/
  │   │   ├── canvas/         # 3D R3F canvases (Computers, Stars, Ball, Testimonial)
  │   │   ├── hero.tsx        # Hero headline with typewriter
  │   │   ├── about.tsx       # Services & overview
  │   │   ├── experience.tsx  # Interactive milestone timeline
  │   │   ├── works.tsx       # Real-world project showcase
  │   │   ├── feedbacks.tsx   # Amharic testimonial reviews
  │   │   └── contact.tsx     # 3D Earth canvas & reCAPTCHA form
  │   ├── constants/          # Site data, timeline records & project specs
  │   └── styles.ts           # Shared layout utilities
  ├── netlify.toml            # Netlify build & redirect routing config
  ├── package.json
  └── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or `pnpm`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mubarek370/muba-portfolio.git
   cd muba-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   # Resend Email Service
   RESEND_API_KEY="your-resend-api-key"
   RESEND_FROM_EMAIL="Mubarek Portfolio <onboarding@resend.dev>"
   CONTACT_TO_EMAIL="mubarekali974@gmail.com"
   CONTACT_SITE_URL="http://localhost:5173"

   # Google reCAPTCHA v3
   VITE_RECAPTCHA_SITE_KEY="your-recaptcha-site-key"
   RECAPTCHA_SECRET_KEY="your-recaptcha-secret-key"
   RECAPTCHA_MIN_SCORE="0.5"
   ```

4. **Run the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Type Check & Build for Production:**
   ```bash
   npm run check-types
   npm run build
   ```

---

## 🌐 Deployment on Netlify

This project is pre-configured for automated deployment on Netlify via [`netlify.toml`](./netlify.toml).

1. Push your repository to GitHub.
2. In the [Netlify Dashboard](https://app.netlify.com/), click **Add new site** → **Import an existing project** → **GitHub**.
3. Set your build configuration:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. In **Site configuration** → **Environment variables**, add the keys defined in your `.env`.
5. In [Google reCAPTCHA Console](https://www.google.com/recaptcha/admin), add `netlify.app` to your authorized domains.
6. Trigger deploy!

---

## 📬 Contact & Connect

**Mubarek Ali**  
- **Email:** [mubarekali974@gmail.com](mailto:mubarekali974@gmail.com)  
- **GitHub:** [@mubarek370](https://github.com/mubarek370)  

---

## 📄 License

This project is licensed under the [MIT License](LICENSE.md).
